# Europort Istanbul 2026 — PRD

## Original problem statement
Europort İstanbul (maritime exhibition, 4–6 Nov 2026, Yenikapı Expo Center) needs a new website, a maximised brand strategy and a fully renewed brand identity, benchmarked against the world's best maritime shows (SMM Hamburg, Posidonia, Europort Rotterdam, Nor-Shipping, Marintec…). Corporate, unique design; no generic "AI" fonts/colours. Build a brand kit from the website, list global design skills, 100% marketing-ready and trackable. Deliver a report first, then act on it.

## User decisions (approved)
- Phase order: strategy report + brand kit first, website second.
- Typeface: Nunito (logo's own typeface) + IBM Plex Mono for technical labels.
- Keep the existing logo and existing colours (Navy #07255C, Periwinkle #797AAF, White). Single accent: Signal Orange #EA580C.
- Light + Dark themes; dark ground = Europort navy.
- Site language: English only; root URL is English. No Turkish on site. Report written in Turkish.
- Benchmark set includes SMM Hamburg and Posidonia.
- Theme sentence: "Two Continents. One Course." (CTA line: "Set course for Istanbul.")

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion, react-markdown; routes `/`, `/brand`, `/report`.
- Backend: FastAPI; `/api/health`, `/api/brand/tokens`, `/api/report`, `/api/report/{slug}` (serves `/app/report/*.md`, dir from `REPORT_DIR` env).
- MongoDB connected (no collections used yet in Phase 1).
- Design tokens: `/app/design_guidelines.json`, CSS vars in `frontend/src/index.css`, data in `frontend/src/lib/brand.js`.
- Logo assets: `frontend/public/logo-europort-istanbul-{white,navy}.png` (from europort.com.tr; vector requested).

## Personas
Turkish shipyard/supplier (exhibitor), international exhibitor / pavilion coordinator (NL, CN, PL, Africa), shipowner/operator (visitor), sponsor, press, young professional.

## Implemented — Phase 1 (June 2026)
- Strategy report, 6 parts (Turkish) in `/app/report/`: executive summary & audit, global benchmark (13 shows, 20 design skills), brand strategy (Meridian), brand kit, IA + marketing/tracking stack, KPI/content rhythm/roadmap.
- Live Brand Hub `/brand`: strategy, logo rules, colour system (copy HEX), typography, graphic language (contours, corner marks, signal flags, compass, numbering, photo rule), components, motion demo, voice, benchmark table, applications (card, badge, LinkedIn cover, signature).
- Report viewer `/report` (markdown, tabs).
- Home `/` Phase 2 preview: kinetic hero, countdown, marquee, stat counters, 01–08 chapter index.
- Light/dark toggle persisted in localStorage (default dark).

## Implemented — Phase 2 (June 2026)
- Full English site: Home (8 chapters, kinetic hero w/ parallax+tilt, countdown, marquee), Exhibition (about, Facts & Figures, venue, history), Exhibit (packages, pavilions, sponsorship tiers), Visit (why, IDO travel, hotels, visa, visitor-interest form, .ics add-to-calendar), Programme (14 seeded sessions; track/day filters; session detail), Bosphorus Series brand page (Opening Crossing, Tuzla Shipyard Tour, Young Europort, Meridian Dinner), News (6 seeded articles + detail), Media (kit, boilerplate, accreditation), Partners (tiers, media partner logos), Contact, 404.
- Exhibitor directory: 384 real 2024 exhibitors scraped from europort.com.tr, categorised heuristically; search by name/stand, filters country/category/pavilion/hall, pagination, profile page with related.
- Lead forms (stand, sponsorship, visa, press, visitor, contact, newsletter): honeypot, consent, UTM + landing/referrer capture, rate limit 10/min, saved to Mongo `leads`, Resend team+confirmation emails (SKIPPED until RESEND_API_KEY set; LEADS_INBOX test address).
- Tracking: window.dataLayer events (register_click, stand_enquiry_start, *_submit, exhibitor_search, exhibitor_profile_view, programme_session_view, add_to_calendar, outbound_hotel_click, partner_click, press_kit_download, theme, page_view); external registration link carries UTM.
- Lenis smooth scroll, framer-motion reveals, generated maritime photography in /public/img.

## Backlog
P0 (Phase 3): admin JWT login + leads panel (CSV export), exhibitor/news/programme CRUD + CSV import, set RESEND_API_KEY + real LEADS_INBOX, GTM container + Consent Mode v2 cookie layer, sitemap/JSON-LD/301s, legal pages.
P1: hall plan, exhibitor logos/websites from 2026 CSV, speaker names, sponsor logos.
P2 (Phase 4): Exhibitor Press, Facts & Figures 2026, optional extra languages.

## Inputs awaited from organiser
Vector logo, 2026 exhibitor CSV, BlueBridge/MariMatch programme, sponsor logos/tiers, photo archive, GTM/GA4/Meta/LinkedIn IDs, team contacts, legal texts, institutional welcome message.

## Next tasks
1. Client review of Brand Hub and report; confirm theme sentence and Signal Orange accent.
2. Start Phase 2: page scaffolding + forms (Resend) + exhibitor directory.
