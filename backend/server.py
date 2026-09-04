from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import re
import logging
from typing import Optional
from fastapi import FastAPI, APIRouter, HTTPException, Request, Query
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from models import Exhibitor, Session, Article, Partner, Lead, LeadIn, LEAD_TYPES
from emailer import send_lead_emails
import seed_data

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
REPORT_DIR = Path(os.environ['REPORT_DIR'])

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="Europort Istanbul API")
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)


@app.exception_handler(RateLimitExceeded)
async def _rate_limited(request, exc):
    from fastapi.responses import JSONResponse
    return JSONResponse(status_code=429, content={"detail": "Too many requests. Please try again in a minute."})


api = APIRouter(prefix="/api")

BRAND_TOKENS = {
    "brand": "Europort Istanbul 2026", "theme_sentence": "Two Continents. One Course.", "cta_line": "Set course for Istanbul.",
    "coordinates": "41°00'N 28°57'E",
    "dates": {"start": "2026-11-04", "end": "2026-11-06", "venue": "Yenikapı Expo Center, Istanbul"},
    "typography": {"primary": "Nunito", "technical": "IBM Plex Mono"},
    "colors": [
        {"token": "navy", "name": "Europort Navy", "hex": "#07255C"}, {"token": "periwinkle", "name": "Europort Periwinkle", "hex": "#797AAF"},
        {"token": "signal", "name": "Signal Orange", "hex": "#EA580C"}, {"token": "white", "name": "Chart White", "hex": "#FFFFFF"},
        {"token": "mist", "name": "Nautical Mist", "hex": "#E2E8F0"},
    ],
    "themes": ["light", "dark"],
}


@app.on_event("startup")
async def seed():
    if await db.exhibitors.count_documents({}) == 0:
        await db.exhibitors.insert_many([Exhibitor(**e).to_mongo() for e in seed_data.load_exhibitors()])
        await db.exhibitors.create_index([("name", "text"), ("country", "text"), ("category", "text"), ("stand", "text")])
        await db.exhibitors.create_index("slug", unique=True)
    if await db.sessions.count_documents({}) == 0:
        await db.sessions.insert_many([Session(**s).to_mongo() for s in seed_data.SESSIONS])
    if await db.news.count_documents({}) == 0:
        await db.news.insert_many([Article(**a).to_mongo() for a in seed_data.NEWS])
    if await db.partners.count_documents({}) == 0:
        await db.partners.insert_many([Partner(**p).to_mongo() for p in seed_data.PARTNERS])
    await db.leads.create_index("created_at")
    logger.info("Seed check complete")


# ---------- meta ----------
@api.get("/health")
async def health():
    return {"status": "ok", "service": "europort-istanbul"}


@api.get("/brand/tokens")
async def brand_tokens():
    return BRAND_TOKENS


def _title(path: Path) -> str:
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("#"):
            return re.sub(r"^#+\s*", "", line).strip()
    return path.stem


@api.get("/report")
async def report_index():
    return [{"slug": p.stem, "title": _title(p)} for p in sorted(REPORT_DIR.glob("*.md"))]


@api.get("/report/{slug}")
async def report_part(slug: str):
    if not re.fullmatch(r"[a-z0-9\-]+", slug):
        raise HTTPException(status_code=400, detail="Invalid slug")
    path = REPORT_DIR / f"{slug}.md"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Report part not found")
    return {"slug": slug, "title": _title(path), "content": path.read_text(encoding="utf-8")}


# ---------- exhibitors ----------
@api.get("/exhibitors/facets")
async def exhibitor_facets():
    async def facet(field):
        rows = await db.exhibitors.aggregate([{"$match": {field: {"$ne": None}}}, {"$group": {"_id": f"${field}", "n": {"$sum": 1}}}, {"$sort": {"n": -1, "_id": 1}}]).to_list(200)
        return [{"value": r["_id"], "count": r["n"]} for r in rows]
    return {"countries": await facet("country"), "categories": await facet("category"), "pavilions": await facet("pavilion"), "halls": await facet("hall"),
            "total": await db.exhibitors.count_documents({})}


@api.get("/exhibitors")
async def list_exhibitors(q: str = "", country: str = "", category: str = "", pavilion: str = "", hall: str = "",
                          page: int = Query(1, ge=1), limit: int = Query(24, ge=1, le=100)):
    f = {}
    if q.strip():
        f["$or"] = [{"name": {"$regex": re.escape(q.strip()), "$options": "i"}}, {"stand": {"$regex": re.escape(q.strip()), "$options": "i"}}]
    for k, v in (("country", country), ("category", category), ("pavilion", pavilion), ("hall", hall)):
        if v:
            f[k] = v
    total = await db.exhibitors.count_documents(f)
    docs = await db.exhibitors.find(f).sort("name", 1).skip((page - 1) * limit).limit(limit).to_list(limit)
    return {"items": [Exhibitor.from_mongo(d).model_dump() for d in docs], "total": total, "page": page, "pages": max(1, -(-total // limit))}


@api.get("/exhibitors/{slug}")
async def get_exhibitor(slug: str):
    doc = await db.exhibitors.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Exhibitor not found")
    ex = Exhibitor.from_mongo(doc)
    related = await db.exhibitors.find({"category": ex.category, "slug": {"$ne": slug}}).limit(4).to_list(4)
    return {**ex.model_dump(), "related": [Exhibitor.from_mongo(r).model_dump() for r in related]}


# ---------- programme ----------
@api.get("/programme")
async def list_sessions(track: str = "", day: str = ""):
    f = {}
    if track:
        f["track"] = track
    if day:
        f["day"] = day
    docs = await db.sessions.find(f).sort([("day", 1), ("start", 1)]).to_list(200)
    return [Session.from_mongo(d).model_dump() for d in docs]


@api.get("/programme/{slug}")
async def get_session(slug: str):
    doc = await db.sessions.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Session not found")
    return Session.from_mongo(doc).model_dump()


# ---------- news ----------
@api.get("/news")
async def list_news(limit: int = Query(20, ge=1, le=50)):
    docs = await db.news.find({}).sort("date", -1).limit(limit).to_list(limit)
    return [Article.from_mongo(d).model_dump(exclude={"body"}) for d in docs]


@api.get("/news/{slug}")
async def get_news(slug: str):
    doc = await db.news.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article.from_mongo(doc).model_dump()


# ---------- partners ----------
@api.get("/partners")
async def list_partners():
    docs = await db.partners.find({}).sort("order", 1).to_list(200)
    order = ["Organisers", "Platinum sponsor", "Gold sponsor", "Silver sponsor", "Supporters", "Media partners"]
    grouped = {t: [] for t in order}
    for d in docs:
        p = Partner.from_mongo(d).model_dump()
        grouped.setdefault(p["tier"], []).append(p)
    return [{"tier": t, "items": items} for t, items in grouped.items()]


# ---------- leads ----------
@api.post("/leads", status_code=201)
@limiter.limit("10/minute")
async def create_lead(request: Request, payload: LeadIn):
    if payload.website:
        return {"ok": True, "id": None, "email_status": "skipped"}
    if payload.type not in LEAD_TYPES:
        raise HTTPException(status_code=400, detail="Unknown lead type")
    if payload.type != "newsletter" and not payload.consent:
        raise HTTPException(status_code=400, detail="Consent is required")
    lead = Lead(**payload.model_dump(exclude={"website"}))
    res = await db.leads.insert_one(lead.to_mongo())
    status = await send_lead_emails(lead.model_dump())
    await db.leads.update_one({"_id": res.inserted_id}, {"$set": {"email_status": status}})
    return {"ok": True, "id": str(res.inserted_id), "email_status": status}


@api.get("/leads/stats")
async def lead_stats():
    rows = await db.leads.aggregate([{"$group": {"_id": "$type", "n": {"$sum": 1}}}]).to_list(20)
    return {r["_id"]: r["n"] for r in rows}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
