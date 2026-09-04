# Bölüm 4 · Marka Kiti

Canlı sürüm: `/brand` (Brand Hub). Bu bölüm kitin yazılı referansıdır.

### 4.1 Logo

- **Ana logo:** Mevcut Europort Istanbul logosu korunur (pusula/yarım-daire sembol + Nunito wordmark + tarih satırı).
- **Sürümler:** (a) Beyaz — navy ve koyu fotoğraf zemininde; (b) Navy pill — açık zeminde (logonun kendi navy dikdörtgeni ile). Tek renk siyah sürüm yalnızca faks/damga gibi zorunlu hâllerde.
- **Güvenli alan:** Sembolün yüksekliğinin %50'si (½X) her yönde boş kalır.
- **Minimum boyut:** Dijital 120 px genişlik; baskı 32 mm.
- **Yasaklar:** Yeniden renklendirme, gradyan, gölge, döndürme, oran bozma, sembolü wordmark'tan ayırıp tek başına büyük kullanma (favicon ve sosyal avatar hariç), yoğun fotoğraf üstüne maskesiz yerleştirme, başka logolarla kilitleme.
- **Dosyalar:** Vektör (SVG/AI) organizatörden beklenmektedir; Faz 1 PNG @4x ile çalışır.

### 4.2 Renk sistemi

| Token | Ad | HEX | RGB | CMYK | Pantone (en yakın) | Rol |
|---|---|---|---|---|---|---|
| navy | Europort Navy | #07255C | 7 37 92 | 100 85 25 45 | 2757 C | Dark tema zemini, light temada birincil metin ve buton |
| periwinkle | Europort Periwinkle | #797AAF | 121 122 175 | 50 45 10 0 | 2101 C | İkincil vurgu, alt başlık, kenarlık, BlueBridge alt kimliği |
| signal | Signal Orange | #EA580C | 234 88 12 | 0 75 100 0 | 1585 C | Tek CTA aksanı (Register / Book stand), canlı gösterge, geri sayım |
| white | Chart White | #FFFFFF | 255 255 255 | 0 0 0 0 | — | Light tema kart zemini, dark temada başlık |
| mist | Nautical Mist | #E2E8F0 | 226 232 240 | 12 8 5 0 | Cool Gray 1 C | Kontur çizgileri, ayraçlar, light tema kenarlık |

Kurallar: Aksan (signal) bir ekranda en fazla bir birincil eylemde. Gradyan yok; navy düz zemin. Menekşe/mor, neon, pastel yok. Her iki temada WCAG AA (metin ≥ 4.5:1).

**Light tema:** zemin #F8FAFC, kart #FFFFFF, metin #07255C, ikincil metin hsl(220 25% 42%).
**Dark tema:** zemin #07255C, kart #051D4A, metin #F8FAFC, ikincil metin hsl(220 20% 75%), kenarlık hsl(220 40% 30%).

### 4.3 Tipografi

- **Nunito** (300–900): Tüm başlıklar, arayüz, gövde. Logonun wordmark yazı tipidir; marka ile arayüz aynı sesi konuşur.
- **IBM Plex Mono** (400–600): Koordinatlar, stand numaraları, tarih damgaları, bölüm numaraları ("01 // WHY ISTANBUL"), istatistik rakamları.
- Ölçek: Display 60/64 Black · H1 48/52 Black · H2 36/40 ExtraBold · H3 24/30 Bold · Lead 20/32 Regular · Body 16/26 Regular · Small 14/20 · Tag 12 Mono, %20 harf aralığı, büyük harf.
- Başlıklar cümle düzeninde; tamamı büyük harf yalnızca mono etiketlerde.
- Yasak: Inter, Roboto, Arial, Helvetica, Space Grotesk, Geist, Poppins, Montserrat.

### 4.4 Izgara, boşluk, yüzey

- 12 kolon, asimetrik: 8+4 (görsel + teknik akış) ve 4+8 (başlık + içerik). Konteyner max-w-7xl.
- Bölüm dikey boşluğu 80–112 px; kart iç boşluğu 24–48 px.
- Kart: 1 px düz kenarlık, en fazla 8 px köşe yarıçapı. Glass yalnızca üst navigasyonda (blur 16–24 px).
- Dark yüzeylerde %2 film grain.

### 4.5 Grafik dil

Batimetri kontur çizgileri (%8–12 opaklık), koordinat ızgarası köşe işaretleri, marka renklerinde geometrik işaret flamaları (bölüm ayraçları ve pavyonlar), yavaş dönen minimal pusula (60 s), iki haneli numaralı bölüm etiketleri. Fotoğraf: gerçek tersane/fuar/Boğaz kareleri; navy'ye doğru maske; stok "el sıkışma" yasak.

### 4.6 Hareket

Easing `cubic-bezier(0.16, 1, 0.3, 1)`; süre 600–900 ms; maskeli satır açılışı (stagger 80 ms); marquee 25 s/döngü; sayaçlar mono; `prefers-reduced-motion` saygı. Sıçrama/elastik yok.

### 4.7 Ton ve dil

Bölüm 3.5. Kısa cümle, rakam, tek denizci terimi. Yasaklı kelimeler: unique opportunity, world-class, synergy, cutting-edge, unparalleled.

### 4.8 Uygulamalar (Brand Hub'da CSS ile canlı)

Kartvizit (ön: navy + beyaz logo; arka: koordinat + isim), yaka kartı (Exhibitor / Visitor / Press renk şeridi), LinkedIn kapak (1584×396), e-posta imzası, e-bülten başlığı, sunum kapağı, stand cephesi bandı, roll-up (850×2000), basın bülteni şablonu.
