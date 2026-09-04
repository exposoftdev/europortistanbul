"""Backend API tests for Europort Istanbul 2026 phase 2."""
import os
import time
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or \
    open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")

API = f"{BASE_URL}/api"


# ---------- exhibitors ----------
def test_exhibitor_facets():
    r = requests.get(f"{API}/exhibitors/facets", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert d["total"] == 384
    for k in ("countries", "categories", "pavilions", "halls"):
        assert isinstance(d[k], list) and len(d[k]) > 0


def test_exhibitors_q_propulsion():
    r = requests.get(f"{API}/exhibitors", params={"q": "propulsion"}, timeout=20)
    assert r.status_code == 200
    d = r.json()
    names = [x["name"] for x in d["items"]]
    assert any("AAA Propulsion" in n for n in names), names


def test_exhibitors_q_stand():
    r = requests.get(f"{API}/exhibitors", params={"q": "3.112"}, timeout=20)
    assert r.status_code == 200
    assert r.json()["total"] >= 1


def test_exhibitors_country_poland():
    r = requests.get(f"{API}/exhibitors", params={"country": "Poland", "limit": 100}, timeout=20)
    assert r.status_code == 200
    assert r.json()["total"] == 10


def test_exhibitors_pavilion_nl():
    r = requests.get(f"{API}/exhibitors", params={"pavilion": "Netherlands Pavilion", "limit": 100}, timeout=20)
    assert r.status_code == 200
    assert r.json()["total"] == 50


def test_exhibitors_pagination():
    r = requests.get(f"{API}/exhibitors", params={"page": 2, "limit": 24}, timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert d["page"] == 2
    assert d["pages"] >= 2


def test_exhibitor_detail():
    r = requests.get(f"{API}/exhibitors/aaa-propulsion-b-v", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert d["slug"] == "aaa-propulsion-b-v"
    assert isinstance(d["related"], list)


def test_exhibitor_404():
    r = requests.get(f"{API}/exhibitors/does-not-exist-xyz", timeout=20)
    assert r.status_code == 404


# ---------- programme ----------
def test_programme_list():
    r = requests.get(f"{API}/programme", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert len(d) == 14
    # sorted by day then start
    keys = [(x["day"], x["start"]) for x in d]
    assert keys == sorted(keys)


def test_programme_track_bosphorus():
    r = requests.get(f"{API}/programme", params={"track": "Bosphorus Series"}, timeout=20)
    assert r.status_code == 200
    assert len(r.json()) == 4


def test_programme_detail():
    r = requests.get(f"{API}/programme/opening-crossing", timeout=20)
    assert r.status_code == 200
    assert r.json()["slug"] == "opening-crossing"


# ---------- news ----------
def test_news_list_no_body():
    r = requests.get(f"{API}/news", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert len(d) == 6
    for item in d:
        assert "body" not in item


def test_news_detail_body():
    r = requests.get(f"{API}/news/africa-pavilion-first-edition", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert "body" in d and len(d["body"]) > 0


# ---------- partners ----------
def test_partners_tiers():
    r = requests.get(f"{API}/partners", timeout=20)
    assert r.status_code == 200
    d = r.json()
    tiers = [g["tier"] for g in d]
    for expected in ["Organisers", "Platinum sponsor", "Gold sponsor", "Silver sponsor", "Supporters", "Media partners"]:
        assert expected in tiers


# ---------- leads ----------
def test_lead_stand_valid():
    payload = {
        "type": "stand", "name": "Test User", "email": "test_stand@example.com",
        "company": "TestCo", "country": "Netherlands", "consent": True,
        "fields": {"stand_size": "25\u201350 m\u00b2"}, "utm": {"utm_source": "test"},
    }
    r = requests.post(f"{API}/leads", json=payload, timeout=20)
    assert r.status_code == 201, r.text
    d = r.json()
    assert d["ok"] is True
    assert d["id"]
    assert d["email_status"] == "skipped"


def test_lead_bogus_type():
    r = requests.post(f"{API}/leads", json={"type": "bogus", "email": "x@example.com", "consent": True}, timeout=20)
    assert r.status_code == 400


def test_lead_no_consent():
    r = requests.post(f"{API}/leads", json={"type": "stand", "email": "y@example.com", "consent": False}, timeout=20)
    assert r.status_code == 400


def test_lead_invalid_email():
    r = requests.post(f"{API}/leads", json={"type": "stand", "email": "not-an-email", "consent": True}, timeout=20)
    assert r.status_code == 422


def test_lead_honeypot():
    r = requests.post(f"{API}/leads", json={"type": "stand", "email": "hp@example.com", "consent": True, "website": "spam.com"}, timeout=20)
    assert r.status_code == 201
    assert r.json()["id"] is None


def test_lead_newsletter_no_consent():
    r = requests.post(f"{API}/leads", json={"type": "newsletter", "email": "news@example.com"}, timeout=20)
    assert r.status_code == 201
    assert r.json()["ok"] is True


def test_lead_stats():
    r = requests.get(f"{API}/leads/stats", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert isinstance(d, dict)
    assert d.get("stand", 0) >= 1


def test_zzz_rate_limit():
    """Run last: 11th request in a minute → 429."""
    statuses = []
    for i in range(12):
        r = requests.post(f"{API}/leads", json={
            "type": "newsletter", "email": f"rl{i}_{int(time.time())}@example.com"
        }, timeout=20)
        statuses.append(r.status_code)
        if r.status_code == 429:
            break
    assert 429 in statuses, statuses
