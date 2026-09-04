import json
import re
from pathlib import Path

ROOT = Path(__file__).parent

COUNTRY_FIX = {
    "Turkiye": "Türkiye", "Uae": "United Arab Emirates", "Dubai": "United Arab Emirates", "England": "United Kingdom",
    "United Kingdom\u200b": "United Kingdom", "Usa": "United States", "New Zeland": "New Zealand", "Norway / Scotland": "Norway",
}
PAVILIONS = {"The Netherlands": "Netherlands Pavilion", "China": "China Pavilion", "Poland": "Poland Pavilion"}
CATEGORIES = [
    ("Shipyards & Shipbuilding", r"shipyard|tersane|gemi|shipbuild|yacht|yat|marine construction|ship repair"),
    ("Propulsion & Engines", r"propulsion|engine|motor|diesel|thruster|gear|turbo|shaft|propeller|pervane"),
    ("Electrical & Automation", r"kablo|cable|elektrik|electric|electronic|automation|otomasyon|control|kontrol|switchboard"),
    ("Navigation & Digital", r"navigation|radar|communication|telekom|satellite|software|yaz[ıi]l[ıi]m|digital|data|system"),
    ("Coatings & Corrosion", r"paint|boya|coating|corrosion|anti"),
    ("Deck, Pumps & Hydraulics", r"pump|pompa|valve|vana|pipe|boru|hydraulic|hidrolik|winch|vin[çc]|crane|deck|anchor|chain"),
    ("Materials & Steel", r"steel|[çc]elik|metal|alumin|welding|kaynak|forge|casting|d[öo]k[üu]m"),
    ("Safety & Fire", r"safety|fire|yang[ıi]n|life|rescue|security|survival"),
    ("Interiors & HVAC", r"insulation|izolasyon|hvac|klima|interior|furniture|mobilya|door|window|pencere|kap[ıi]|glass|cam"),
    ("Institutions & Media", r"chamber|association|birli[ğg]i|odas[ıi]|ministry|agency|universit|institute|media|medya|magazine|dergi|news|haber|publish|yay[ıi]n"),
]


def _category(name: str) -> str:
    n = name.lower()
    for cat, pat in CATEGORIES:
        if re.search(pat, n):
            return cat
    return "Equipment & Components"


def _slug(s: str) -> str:
    s = s.lower().replace("ü", "u").replace("ö", "o").replace("ş", "s").replace("ç", "c").replace("ğ", "g").replace("ı", "i")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


SMALL = {"ve", "and", "of", "the", "de", "van", "der", "co", "ltd", "inc", "srl", "spa", "as", "sa", "bv", "ab", "oy", "sp", "zo", "sl"}


def _name(raw: str) -> str:
    words = []
    for w in re.sub(r"\s+", " ", raw).strip().split(" "):
        core = re.sub(r"[^A-Za-z]", "", w)
        words.append(w.upper() if 0 < len(core) <= 3 and core.lower() not in SMALL and core.isalpha() else w)
    return " ".join(words)


def load_exhibitors() -> list[dict]:
    raw = json.loads((ROOT / "seed_exhibitors_2024.json").read_text(encoding="utf-8"))
    out, seen = [], set()
    for r in raw:
        name = _name(r["name"])
        country = COUNTRY_FIX.get(r["country"], r["country"])
        stand = re.sub(r"(?i)stand\s*no\.?:?\s*", "", r["stand"]).strip()
        hall = f"Hall {stand[0]}" if stand[:1].isdigit() else "Hall 2"
        slug = _slug(name)
        if slug in seen or not slug:
            continue
        seen.add(slug)
        out.append({
            "slug": slug, "name": name, "country": country, "stand": stand, "hall": hall, "category": _category(name),
            "pavilion": PAVILIONS.get(country), "edition": 2024,
            "description": f"{name} exhibited at Europort Istanbul 2024 from {country}, {hall}, stand {stand}. The 2026 profile will be updated by the exhibitor.",
            "website": None,
        })
    return out


SPEAKER_TBA = {"name": "Speaker to be announced", "role": ""}

SESSIONS = [
    {"slug": "opening-ceremony", "track": "BlueBridge", "title": "Opening ceremony: Two continents, one course", "day": "2026-11-04", "start": "10:30", "end": "11:15", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Official opening of Europort Istanbul 2026 with the organisers, the Istanbul Chamber of Shipping and pavilion delegations.", "speakers": [{"name": "To be announced", "role": "Ministry of Transport and Infrastructure"}, {"name": "To be announced", "role": "Rotterdam Ahoy"}], "tags": ["Opening"]},
    {"slug": "turkiye-shipbuilding-outlook", "track": "BlueBridge", "title": "Türkiye's shipbuilding outlook 2027–2030: order books, exports, capacity", "day": "2026-11-04", "start": "11:30", "end": "12:30", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Where the Tuzla, Yalova and Black Sea yards stand in the global order book — and what European owners are asking for.", "speakers": [{"name": "To be announced", "role": "Turkish Shipbuilders' Association (GİSBİR)"}, {"name": "To be announced", "role": "Shipyard CEO panel"}], "tags": ["Shipbuilding", "Markets"]},
    {"slug": "decarbonisation-retrofit", "track": "BlueBridge", "title": "Retrofit economics: methanol, batteries and wind on existing fleets", "day": "2026-11-04", "start": "14:00", "end": "15:15", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Owners, class and equipment makers on the retrofit business case under FuelEU Maritime and EU ETS.", "speakers": [{"name": "To be announced", "role": "Classification society"}, {"name": "To be announced", "role": "Dutch propulsion manufacturer"}], "tags": ["Decarbonisation", "Retrofit"]},
    {"slug": "black-sea-corridor", "track": "BlueBridge", "title": "The Black Sea and Caspian corridor: ports, ferries, offshore supply", "day": "2026-11-04", "start": "15:45", "end": "16:45", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Regional trade flows and the vessels they will need, from ro-pax to shallow-draft supply.", "speakers": [SPEAKER_TBA], "tags": ["Markets", "Ports"]},
    {"slug": "africa-pavilion-forum", "track": "BlueBridge", "title": "Africa Pavilion forum: fleet renewal and coastal infrastructure", "day": "2026-11-05", "start": "10:30", "end": "11:45", "venue": "BlueBridge Stage, Hall 2",
     "summary": "First-edition forum with African maritime administrations and operators on procurement, training and finance.", "speakers": [{"name": "To be announced", "role": "African maritime administration"}], "tags": ["Africa", "Pavilions"]},
    {"slug": "autonomy-and-digital-bridge", "track": "BlueBridge", "title": "Digital bridge: autonomy, remote operations and cyber resilience", "day": "2026-11-05", "start": "12:00", "end": "13:00", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Navigation and automation suppliers on what is shipping now versus what is still a pilot.", "speakers": [SPEAKER_TBA], "tags": ["Digital", "Navigation"]},
    {"slug": "yacht-and-special-purpose", "track": "BlueBridge", "title": "Yachts and special-purpose vessels: Türkiye's top-five position", "day": "2026-11-05", "start": "14:30", "end": "15:30", "venue": "BlueBridge Stage, Hall 2",
     "summary": "Superyacht, fishing, tug and workboat builders on design partnerships with Northern Europe.", "speakers": [SPEAKER_TBA], "tags": ["Yachts", "Shipbuilding"]},
    {"slug": "finance-and-insurance", "track": "BlueBridge", "title": "Financing the transition: banks, ECAs and leasing for newbuilds", "day": "2026-11-06", "start": "11:00", "end": "12:00", "venue": "BlueBridge Stage, Hall 2",
     "summary": "How export credit and green finance structures are changing newbuild decisions.", "speakers": [SPEAKER_TBA], "tags": ["Finance"]},
    {"slug": "marimatch-b2b", "track": "MariMatch", "title": "MariMatch @ Europort Istanbul — pre-scheduled B2B meetings", "day": "2026-11-05", "start": "10:00", "end": "17:00", "venue": "MariMatch Lounge, Hall 3",
     "summary": "Enterprise Europe Network brokerage event. Register your profile, select partners, meet in 20-minute slots. Free for exhibitors and registered visitors.", "speakers": [{"name": "Enterprise Europe Network", "role": "Host"}], "tags": ["B2B", "Matchmaking"]},
    {"slug": "marimatch-briefing", "track": "MariMatch", "title": "MariMatch briefing: how to get 12 qualified meetings in a day", "day": "2026-11-04", "start": "16:00", "end": "16:30", "venue": "MariMatch Lounge, Hall 3",
     "summary": "Short briefing for first-time participants on profiles, scheduling and follow-up.", "speakers": [{"name": "Enterprise Europe Network", "role": "Host"}], "tags": ["B2B"]},
    {"slug": "opening-crossing", "track": "Bosphorus Series", "title": "The Opening Crossing — IDO sea bus from Bostancı to Yenikapı", "day": "2026-11-04", "start": "08:15", "end": "09:15", "venue": "Bostancı IDO Pier → Yenikapı",
     "summary": "The show opens on the water. Exhibitors, delegations and press board the dedicated IDO service on the Asian shore and cross to the European side together — coffee, a short welcome and the skyline at first light.", "speakers": [], "tags": ["Networking", "Signature"]},
    {"slug": "tuzla-shipyard-tour", "track": "Bosphorus Series", "title": "Tuzla Shipyard Tour", "day": "2026-11-06", "start": "13:30", "end": "17:30", "venue": "Departs Yenikapı Expo Center",
     "summary": "Guided visit to two Tuzla yards: a newbuild slipway and a repair dock. Limited to 60 international visitors; pre-registration and passport required.", "speakers": [], "tags": ["Tour", "Shipyards"]},
    {"slug": "young-europort-istanbul", "track": "Bosphorus Series", "title": "Young Europort Istanbul — students and early-career professionals", "day": "2026-11-06", "start": "10:00", "end": "13:00", "venue": "Hall 2, Career Deck",
     "summary": "Guided hall walks, a career panel with shipyards and suppliers, and a speed-networking hour with exhibitors. In partnership with maritime faculties.", "speakers": [], "tags": ["Careers", "Community"]},
    {"slug": "meridian-dinner", "track": "Bosphorus Series", "title": "The Meridian Dinner", "day": "2026-11-05", "start": "19:30", "end": "23:00", "venue": "Bosphorus waterfront, by invitation",
     "summary": "Invitation dinner for sponsors, shipowners and pavilion leads on the shore of the strait that gives the brand its line.", "speakers": [], "tags": ["Invitation", "Sponsors"]},
]

NEWS = [
    {"slug": "africa-pavilion-first-edition", "title": "Africa Pavilion joins Europort Istanbul 2026 for the first time", "date": "2026-05-20", "category": "Pavilions", "image": "/img/tuzla-shipyard.jpg",
     "excerpt": "Maritime administrations and operators from the continent will exhibit together in Hall 2, with a dedicated forum on 5 November.",
     "body": "Europort Istanbul 2026 will host an Africa Pavilion for the first time in the show's history.\n\nThe pavilion brings administrations, port operators and shipowners from West, North and East Africa into direct contact with Turkish and European yards and suppliers. A dedicated BlueBridge forum on 5 November covers fleet renewal, coastal infrastructure and training.\n\n\"Türkiye already builds for African owners. Bringing the buyers into the hall closes the loop,\" said the organisers.\n\nCountry pavilions confirmed for 2026: the Netherlands, China, Poland and Africa."},
    {"slug": "netherlands-pavilion-returns", "title": "Netherlands Pavilion returns with the largest national delegation", "date": "2026-05-06", "category": "Pavilions", "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600&q=70",
     "excerpt": "Dutch propulsion, dredging and maritime technology companies will again form the biggest overseas group in Istanbul.",
     "body": "The Netherlands Pavilion — a fixture of Europort Istanbul and a natural extension of the Rotterdam mother show — returns in 2026 with propulsion, deck equipment, dredging and maritime software companies.\n\nDutch exhibitors accounted for the largest overseas group in 2024. Pavilion applications for 2026 are open through the stand enquiry form."},
    {"slug": "bluebridge-forum-2026-programme", "title": "BlueBridge Maritime Istanbul Forum announces 2026 programme themes", "date": "2026-04-22", "category": "Programme", "image": "/img/vessel-dusk.jpg",
     "excerpt": "Retrofit economics, the Black Sea corridor, digital bridges and financing the transition head the three-day agenda.",
     "body": "The conference programme of Europort Istanbul, BlueBridge Maritime Istanbul Forum, runs on all three show days on the BlueBridge Stage in Hall 2.\n\n2026 themes: Türkiye's shipbuilding outlook, retrofit economics under FuelEU Maritime, the Black Sea and Caspian corridor, the Africa Pavilion forum, digital bridge and cyber resilience, yachts and special-purpose vessels, and financing the transition.\n\nSessions are free for registered visitors. Speakers will be announced from September."},
    {"slug": "free-ido-service", "title": "Free IDO sea bus connects the Asian shore to Yenikapı in 45 minutes", "date": "2026-04-10", "category": "Visit", "image": "/img/bosphorus-ferry.jpg",
     "excerpt": "Dedicated services from Bostancı and Pendik run on all three show days. Show your registration badge and board.",
     "body": "Visitors and exhibitors staying on the Asian side of Istanbul can reach Yenikapı Expo Center by sea. Dedicated IDO sea bus services depart from Bostancı and Pendik every morning of the show and return in the evening.\n\nThe service is free with a visitor badge or exhibitor pass. The 4 November morning service doubles as the Opening Crossing of the Bosphorus Series."},
    {"slug": "post-show-report-2024", "title": "Post Show Report 2024: 441 exhibitors, 52 visitor countries, 80% return intent", "date": "2026-03-18", "category": "Facts", "image": "/img/aerial-harbour.jpg",
     "excerpt": "The 2024 edition set records for international participation. The full report is available on the Exhibition page.",
     "body": "Europort Istanbul 2024 closed with 441 exhibitors from 35 countries and 5,734 professional visitors from 52 countries.\n\n80% of visitors stated they intend to return in 2026; 74% hold purchasing authority or influence. Top visitor countries after Türkiye: the Netherlands, Greece, Germany, Italy, Egypt and the United Arab Emirates.\n\nThe interactive Facts & Figures page is now live."},
    {"slug": "registration-open", "title": "Visitor registration opens — entry is free for professionals", "date": "2026-03-02", "category": "Visit", "image": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&q=70",
     "excerpt": "Register online, receive your badge by e-mail, and skip the queue at Yenikapı.",
     "body": "Online registration for Europort Istanbul 2026 is open. Professional visitors enter free of charge on all three days.\n\nRegistered visitors receive their badge by e-mail, access to MariMatch B2B meetings, BlueBridge sessions and the free IDO sea bus."},
]

A = "https://europort.com.tr/assets/2021/09/"
PARTNERS = [
    {"tier": "Organisers", "name": "Rotterdam Ahoy · Bonn Yayıncılık", "logo": A + "ahoy-bonn-logo.png", "url": "https://www.europort.nl", "order": 1},
    {"tier": "Supporters", "name": "İMEAK Chamber of Shipping", "logo": A + "deniz-ticaret-odasi.png", "url": None, "order": 1},
    {"tier": "Platinum sponsor", "name": "Available", "logo": None, "url": None, "order": 1},
    {"tier": "Gold sponsor", "name": "Available", "logo": None, "url": None, "order": 1},
    {"tier": "Gold sponsor", "name": "Available", "logo": None, "url": None, "order": 2},
    {"tier": "Silver sponsor", "name": "Available", "logo": None, "url": None, "order": 1},
    {"tier": "Silver sponsor", "name": "Available", "logo": None, "url": None, "order": 2},
    {"tier": "Silver sponsor", "name": "Available", "logo": None, "url": None, "order": 3},
] + [
    {"tier": "Media partners", "name": n, "logo": A + f, "url": None, "order": i}
    for i, (n, f) in enumerate([("HANSA International Maritime Journal", "hansa-news.png"), ("SeaNews", "seanews.png"), ("Deniz Endüstri", "deniz-endustri.png"), ("Vira Haber", "vira-haber.png"), ("Robban Assafina", "robban-assafina.png"), ("Naftika Chronika", "nayftika_xronika.png"), ("Boatbuilder", "boatbuilder.png"), ("Netasea", "netasea.png"), ("B2B Medya", "b2b-medya.png")], 1)
]
