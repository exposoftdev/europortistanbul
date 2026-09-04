from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import re
import logging
from fastapi import FastAPI, APIRouter, HTTPException
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
REPORT_DIR = Path(os.environ['REPORT_DIR'])

app = FastAPI(title="Europort Istanbul API")
api_router = APIRouter(prefix="/api")

BRAND_TOKENS = {
    "brand": "Europort Istanbul 2026",
    "theme_sentence": "Two Continents. One Course.",
    "cta_line": "Set course for Istanbul.",
    "coordinates": "41°00'N 28°57'E",
    "dates": {"start": "2026-11-04", "end": "2026-11-06", "venue": "Yenikapı Expo Center, Istanbul"},
    "typography": {"primary": "Nunito", "technical": "IBM Plex Mono"},
    "colors": [
        {"token": "navy", "name": "Europort Navy", "hex": "#07255C", "rgb": "7, 37, 92", "cmyk": "100, 85, 25, 45", "pantone": "2757 C"},
        {"token": "periwinkle", "name": "Europort Periwinkle", "hex": "#797AAF", "rgb": "121, 122, 175", "cmyk": "50, 45, 10, 0", "pantone": "2101 C"},
        {"token": "signal", "name": "Signal Orange", "hex": "#EA580C", "rgb": "234, 88, 12", "cmyk": "0, 75, 100, 0", "pantone": "1585 C"},
        {"token": "white", "name": "Chart White", "hex": "#FFFFFF", "rgb": "255, 255, 255", "cmyk": "0, 0, 0, 0", "pantone": "—"},
        {"token": "mist", "name": "Nautical Mist", "hex": "#E2E8F0", "rgb": "226, 232, 240", "cmyk": "12, 8, 5, 0", "pantone": "Cool Gray 1 C"},
    ],
    "themes": ["light", "dark"],
}


def _report_files():
    return sorted(p for p in REPORT_DIR.glob("*.md"))


def _title(path: Path) -> str:
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("#"):
            return re.sub(r"^#+\s*", "", line).strip()
    return path.stem


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "europort-istanbul"}


@api_router.get("/brand/tokens")
async def brand_tokens():
    return BRAND_TOKENS


@api_router.get("/report")
async def report_index():
    return [{"slug": p.stem, "title": _title(p)} for p in _report_files()]


@api_router.get("/report/{slug}")
async def report_part(slug: str):
    if not re.fullmatch(r"[a-z0-9\-]+", slug):
        raise HTTPException(status_code=400, detail="Invalid slug")
    path = REPORT_DIR / f"{slug}.md"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Report part not found")
    return {"slug": slug, "title": _title(path), "content": path.read_text(encoding="utf-8")}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
