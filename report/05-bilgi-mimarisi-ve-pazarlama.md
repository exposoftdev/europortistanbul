# Bölüm 5 · Bilgi Mimarisi ve Pazarlama/İzleme Altyapısı (Faz 2–3 kapsamı)

### 5.1 Sayfa haritası (yalnızca İngilizce, kök adres = ana sayfa)

```
/                      Home — kinetic hero, 01–08 numaralı bölümler
/exhibition            About · Türkiye maritime · Venue (Yenikapı) · Past editions · Europort family
/exhibition/facts      Facts & Figures 2024 (interaktif Post Show Report)
/exhibit               Why exhibit · Packages · Country pavilions · Sponsorship tiers
/exhibit/enquiry       Stand enquiry form
/exhibit/sponsorship   Sponsorship enquiry form
/visit                 Why visit · Registration (external, tracked) · Travel & IDO · Hotels · Visa letter
/exhibitors            Searchable directory (country, category, pavilion, hall/stand)
/exhibitors/:slug      Exhibitor profile
/programme             BlueBridge · MariMatch · Bosphorus Series · day/venue filter
/programme/:slug       Session / speaker
/news                  News feed · Press releases · Exhibitor press
/news/:slug            Article
/media                 Press kit · Photo gallery · Accreditation form
/partners              Sponsors by tier · Supporters · Endorsing associations · Media partners
/contact               Team (TR sales / international sales) · Form · Map
/brand                 Brand Hub (Faz 1 teslimatı, canlı)
/legal/privacy · /legal/cookies · /legal/terms
/admin                 Lead & content panel (tek yönetici, JWT)
```

### 5.2 Ana sayfa bölüm akışı

| # | Bölüm | İçerik | CTA / Olay |
|---|---|---|---|
| Hero | Two Continents. One Course. | Tarih, mekân, geri sayım, tek CTA | `register_click` |
| 01 | Why Istanbul | Meridian hikâyesi, Boğaz, Türk tersaneleri | — |
| 02 | Show in numbers | 441 · 35 · 5.734 · 52 · %80 (2024) — animasyonlu sayaç | `facts_view` |
| 03 | Exhibit | Paketler, pavyonlar, "Book your stand" | `stand_enquiry_start` |
| 04 | Visit | IDO 45 dk ücretsiz, otel, vize | `register_click`, `outbound_hotel_click` |
| 05 | Programme | BlueBridge, MariMatch, Bosphorus Series | `programme_session_view` |
| 06 | Country pavilions | NL · CN · PL · Africa (koordinat etiketli) | `pavilion_view` |
| 07 | News | Son 3 haber | `article_view` |
| 08 | Partners | Kademeli logolar, Europort family bandı | `partner_click` |
| Footer | Bülten, sosyal, koordinat imzası, yasal | `newsletter_subscribe` |

### 5.3 Formlar ve veri akışı

Stand enquiry · Sponsorship · Visitor interest · Visa letter · Press accreditation · Newsletter · Contact.
Her gönderim: MongoDB `leads` (tür, alanlar, `utm_*`, `referrer`, `landing_page`, `consent`, `created_at`) → ekibe Resend e-postası → gönderene onay e-postası → `dataLayer.push` dönüşüm olayı. Spam koruması: honeypot + hız limiti.

### 5.4 İzleme ve pazarlama altyapısı

- **GTM tek konteyner**; GA4, Meta Pixel, LinkedIn Insight Tag GTM içinde. ID'ler panelden girilir.
- **Consent Mode v2** — kategorili çerez katmanı (Necessary / Analytics / Marketing). Onay yokken pazarlama etiketleri çalışmaz.
- **Olay sözlüğü (dataLayer):**
  `register_click`, `stand_enquiry_start`, `stand_enquiry_submit`, `sponsor_enquiry_submit`, `newsletter_subscribe`, `brochure_download`, `exhibitor_profile_view`, `exhibitor_search`, `programme_session_view`, `add_to_calendar`, `outbound_hotel_click`, `outbound_registration_click`, `theme_toggle`, `partner_click`, `press_kit_download`.
  Her olay `page_section`, `cta_id`, `theme` (light/dark), `utm_campaign` parametreleri taşır.
- **UTM standardı:** `utm_source` (linkedin, newsletter, partner-xxx, print-qr) · `utm_medium` (social, email, referral, qr) · `utm_campaign` (ep26-<hedef>-<ay>) · `utm_content` (varyant). Kampanya adlandırma kılavuzu panelde.
- **QR kodları:** Basılı her materyal `?utm_source=print&utm_medium=qr&utm_content=<materyal>` ile ölçülür.
- **SEO:** Event / Organization / Article / BreadcrumbList JSON-LD; otomatik sitemap; OG görselleri (dark tema hero); eski URL'lerden 301 haritası.
- **Performans/erişilebilirlik:** Core Web Vitals yeşil; WCAG AA (her iki tema); `prefers-reduced-motion` desteği.
- **Opsiyonel:** Microsoft Clarity, Search Console, CRM webhook (HubSpot/Zoho), LinkedIn Lead Gen eşleştirme.

### 5.5 Yönetim paneli

Lead listesi (tür/durum filtresi, CSV), katılımcı dizini CRUD + CSV içe aktarım, haber, program oturumları, partner logoları ve kademeleri, indirilebilir dosyalar, izleme ID'leri, site ayarları (tarih, sayaç, CTA linki).
