# Bölüm 6 · KPI, İçerik Ritmi ve Yol Haritası

### 6.1 KPI seti (fuara kadar, aylık izlenir)

| KPI | Kaynak | 2026 hedefi (öneri) |
|---|---|---|
| Ön kayıt tıklaması → tamamlanan kayıt | `register_click` / expoffs raporu | 9.000 tıklama → 7.000 kayıt |
| Stand talebi | `stand_enquiry_submit` | 120 nitelikli talep |
| Sponsorluk talebi | `sponsor_enquiry_submit` | 25 |
| Bülten abonesi | `newsletter_subscribe` | 4.000 |
| Katılımcı profil görüntülenmesi | `exhibitor_profile_view` | 40.000 (katılımcıya raporlanır) |
| Kaynak bazlı dönüşüm | GA4 + UTM | LinkedIn %35 · e-posta %30 · partner %20 · organik %15 |
| Organik trafik | Search Console | 3× (yeni içerik ve şema ile) |
| Sayfa hızı | CWV | LCP < 2,0 s · CLS < 0,05 |

### 6.2 İçerik ritmi (Temmuz → Kasım)

| Ay | Odak | Çıktılar |
|---|---|---|
| Temmuz | Marka lansmanı | Yeni site yayında, "Two Continents. One Course." kampanya filmi/kv, LinkedIn kapak seti |
| Ağustos | Katılımcı kapanışı | Pavyon hikâyeleri (NL, CN, PL, Africa), "Why exhibit" vaka içerikleri, erken stand kampanyası |
| Eylül | Ziyaretçi kaydı | Haftalık "Meet the exhibitor" profilleri, BlueBridge konuşmacı duyuruları, SMM sonrası "See you in Istanbul" kampanyası |
| Ekim | Program & lojistik | Oturum takvimi, IDO servisi, otel, vize; geri sayım serisi |
| Kasım | Canlı & sonrası | Günlük haber, fotoğraf, Post Show Report 2026 landing (fuardan 3 hafta sonra) |

### 6.3 Yol haritası

| Faz | Kapsam | Süre | Onay |
|---|---|---|---|
| **1 — bu teslimat** | Rapor, marka kiti, Brand Hub (/brand) | ✔ | Kit ve tema onayı |
| **2** | Site: tüm sayfalar (EN), formlar + Resend, katılımcı dizini, program, haber, partner, light/dark | 2 iterasyon | Tasarım/içerik onayı |
| **3** | Admin panel (JWT), GTM/GA4/Consent Mode, SEO/şema/sitemap/301, çerez katmanı, yayın kontrol listesi | 1–2 iterasyon | Yayın onayı |
| **4** | Bosphorus Series sayfaları, Exhibitor Press, Facts & Figures 2026, opsiyonel ek dil | Fuar sonrası | — |

### 6.4 Organizatörden beklenen girdiler (Faz 2 için)

1. Logo vektör dosyaları (SVG/AI) — şu an PNG'den çalışıyoruz.
2. 2026 katılımcı listesi (CSV: firma, ülke, kategori, pavyon, stand no, logo, açıklama, web).
3. BlueBridge oturum/konuşmacı listesi; MariMatch tarih ve kayıt bağlantısı.
4. Sponsor kademeleri ve mevcut sponsor logoları; destekleyen kurumlar.
5. Fuar ve tersane fotoğrafları (yüksek çözünürlük, 2024 arşivi).
6. GTM/GA4/Meta/LinkedIn hesap ID'leri; Search Console erişimi.
7. Ekip iletişim bilgileri (TR satış / uluslararası satış); yasal metinler (KVKK/GDPR) — taslak sağlanır.
8. Kurum düzeyinde hoş geldin mesajı (Bölüm 2.4 madde 8).

### 6.5 Riskler

- Fotoğraf arşivi gelmezse: dark tema + grafik dil (kontur, koordinat) fotoğrafsız da taşır; stok "el sıkışma" kullanılmaz.
- Vektör logo gelmezse: PNG @4x kullanılır; baskı materyallerinde kalite düşer.
- Kayıt sistemi (expoffs) UTM'leri düşürürse: `outbound_registration_click` olayı ile en azından tıklama ölçülür; expoffs ile dönüşüm geri bildirimi konuşulmalı.
