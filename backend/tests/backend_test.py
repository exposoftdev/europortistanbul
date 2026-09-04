"""Backend API tests for Europort Istanbul 2026 phase 1."""
import os
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/") or \
    open("/app/frontend/.env").read().split("REACT_APP_BACKEND_URL=")[1].split("\n")[0].strip().rstrip("/")

API = f"{BASE_URL}/api"


def test_health():
    r = requests.get(f"{API}/health", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"


def test_brand_tokens():
    r = requests.get(f"{API}/brand/tokens", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "colors" in data
    assert len(data["colors"]) == 5
    hexes = [c["hex"].upper() for c in data["colors"]]
    assert "#07255C" in hexes


def test_report_index():
    r = requests.get(f"{API}/report", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 6
    for item in data:
        assert "slug" in item and "title" in item


def test_report_part_valid():
    slug = "01-yonetici-ozeti-ve-mevcut-durum"
    r = requests.get(f"{API}/report/{slug}", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert data["slug"] == slug
    assert isinstance(data["content"], str)
    assert len(data["content"]) > 100


def test_report_part_missing():
    r = requests.get(f"{API}/report/does-not-exist", timeout=15)
    assert r.status_code == 404


def test_report_part_traversal():
    r = requests.get(f"{API}/report/..%2Fetc", timeout=15)
    assert r.status_code in (400, 404)
    # also test literal
    r2 = requests.get(f"{API}/report/../etc", timeout=15, allow_redirects=False)
    assert r2.status_code in (400, 404, 307, 308)
