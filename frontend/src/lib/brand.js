export const BRAND = {
  name: "Europort Istanbul 2026",
  theme: "Two Continents. One Course.",
  cta: "Set course for Istanbul.",
  legacyLine: "Bridging Continents, Connecting Maritime Worlds",
  coordinates: "41°00'N 28°57'E",
  dates: "4–6 November 2026",
  venue: "Yenikapı Expo Center, Istanbul",
  eventStart: "2026-11-04T10:00:00+03:00",
};

export const COLORS = [
  { token: "navy", name: "Europort Navy", hex: "#07255C", rgb: "7 · 37 · 92", cmyk: "100 · 85 · 25 · 45", pantone: "2757 C", role: "Dark theme ground. Primary text and buttons in light theme.", text: "#FFFFFF" },
  { token: "periwinkle", name: "Europort Periwinkle", hex: "#797AAF", rgb: "121 · 122 · 175", cmyk: "50 · 45 · 10 · 0", pantone: "2101 C", role: "Secondary hue. Subheads, borders, BlueBridge sub-brand.", text: "#FFFFFF" },
  { token: "signal", name: "Signal Orange", hex: "#EA580C", rgb: "234 · 88 · 12", cmyk: "0 · 75 · 100 · 0", pantone: "1585 C", role: "The single CTA accent. One primary action per screen.", text: "#FFFFFF" },
  { token: "white", name: "Chart White", hex: "#FFFFFF", rgb: "255 · 255 · 255", cmyk: "0 · 0 · 0 · 0", pantone: "—", role: "Light theme cards. Headlines on navy.", text: "#07255C" },
  { token: "mist", name: "Nautical Mist", hex: "#E2E8F0", rgb: "226 · 232 · 240", cmyk: "12 · 8 · 5 · 0", pantone: "Cool Gray 1 C", role: "Contour lines, dividers, light theme borders.", text: "#07255C" },
];

export const TYPE_SCALE = [
  { name: "Display", cls: "text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]", spec: "60 / 64 · Black 900", sample: "Two Continents." },
  { name: "H1", cls: "text-4xl lg:text-5xl font-black tracking-tight", spec: "48 / 52 · Black 900", sample: "Set course for Istanbul" },
  { name: "H2", cls: "text-3xl lg:text-4xl font-extrabold tracking-tight", spec: "36 / 40 · ExtraBold 800", sample: "The show in numbers" },
  { name: "H3", cls: "text-2xl font-bold tracking-tight", spec: "24 / 30 · Bold 700", sample: "Country pavilions" },
  { name: "Lead", cls: "text-lg lg:text-xl font-normal leading-relaxed", spec: "20 / 32 · Regular 400", sample: "300 exhibitors. 7,000 visitors. Three days on the Bosphorus." },
  { name: "Body", cls: "text-base leading-relaxed", spec: "16 / 26 · Regular 400", sample: "Europort Istanbul connects Turkish and overseas shipbuilders, shipping companies and equipment suppliers." },
  { name: "Small", cls: "text-sm", spec: "14 / 20 · Regular 400", sample: "Free IDO sea bus from Bostancı and Pendik. 45 minutes to Yenikapı." },
  { name: "Tag", cls: "font-mono text-xs uppercase tracking-[0.2em] font-medium", spec: "12 · IBM Plex Mono 500 · +20%", sample: "01 // Why Istanbul · Hall 2 · Stand B-114" },
];

export const STATS = [
  { value: 441, label: "Exhibitors", note: "2024 edition" },
  { value: 35, label: "Exhibitor countries" },
  { value: 5734, label: "Visitors" },
  { value: 52, label: "Visitor countries" },
];

export const PAVILIONS = [
  { code: "NL", name: "Netherlands", coord: "51°55'N 4°28'E" },
  { code: "CN", name: "China", coord: "31°13'N 121°28'E" },
  { code: "PL", name: "Poland", coord: "54°21'N 18°38'E" },
  { code: "AF", name: "Africa", coord: "First edition" },
];

export const BANNED_WORDS = ["unique opportunity", "world-class", "synergy", "cutting-edge", "unparalleled", "don't miss"];

export const VOICE_PAIRS = [
  { before: "Don't miss this unique opportunity to network with industry leaders!", after: "300 exhibitors. 7,000 visitors. Three days on the Bosphorus." },
  { before: "Europort Istanbul is the leading world-class maritime event in the region.", after: "The only maritime exhibition held on two continents." },
  { before: "Register now for free and enjoy cutting-edge innovations!", after: "Registration is open. Entry is free. Set course for Istanbul." },
];

export const BENCHMARK = [
  { criterion: "Single theme sentence", smm: "driving the maritime transition", pos: "Setting the industry course", ep: "Two Continents. One Course." },
  { criterion: "Conference sub-brands", smm: "GMEC · MS&D · Maritime Future Summit", pos: "Conferences & Seminars", ep: "BlueBridge Forum · MariMatch" },
  { criterion: "Sponsor tiers", smm: "Main → Platinum → Gold → Bronze → Endorsing", pos: "Sponsorships page", ep: "Platinum → Gold → Silver → Media → Institutional" },
  { criterion: "Side-event brand", smm: "—", pos: "Posidonia Games (6 events)", ep: "Bosphorus Series (proposed)" },
  { criterion: "Leader quotes", smm: "SCHOTTEL, Wärtsilä, VULKAN, Everllence", pos: "Union of Greek Shipowners", ep: "Shipyards · owners · pavilion leads" },
  { criterion: "Transport story", smm: "Public transport in ticket", pos: "—", ep: "Free IDO sea bus, 45 min" },
  { criterion: "Exhibitor press room", smm: "Press releases", pos: "Exhibitor Press feed", ep: "Phase 3" },
  { criterion: "Light / dark theme", smm: "—", pos: "—", ep: "Yes — differentiator" },
  { criterion: "Brand font = logo font", smm: "Yes", pos: "No", ep: "Yes — Nunito" },
  { criterion: "Consent Mode v2", smm: "Yes", pos: "Yes (CookieYes)", ep: "Phase 3" },
];

export const LOGO_DONTS = [
  "Do not recolour or apply gradients",
  "Do not add shadows or outlines",
  "Do not rotate or distort proportions",
  "Do not separate the symbol from the wordmark (favicon excepted)",
  "Do not place on busy photography without a navy mask",
  "Do not lock up with partner logos",
];

export const EVENTS = [
  "register_click", "stand_enquiry_submit", "sponsor_enquiry_submit", "newsletter_subscribe",
  "brochure_download", "exhibitor_profile_view", "programme_session_view", "add_to_calendar",
  "outbound_hotel_click", "theme_toggle", "partner_click", "press_kit_download",
];
