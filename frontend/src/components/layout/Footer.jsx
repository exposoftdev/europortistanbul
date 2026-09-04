import { BRAND } from "@/lib/brand";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-border mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="eyebrow">Europort family · Rotterdam since 1942</p>
        <p className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-[1.05]">{BRAND.theme}</p>
        <p className="mt-3 text-sm text-muted-foreground">{BRAND.legacyLine}</p>
      </div>
      <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8 text-sm">
        <div>
          <p className="eyebrow">Event</p>
          <p className="mt-3 font-bold">{BRAND.dates}</p>
          <p className="text-muted-foreground">{BRAND.venue}</p>
        </div>
        <div>
          <p className="eyebrow">Position</p>
          <p data-testid="footer-coordinates" className="mt-3 font-mono text-sm">{BRAND.coordinates}</p>
          <p className="text-muted-foreground">Bosphorus meridian</p>
        </div>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-4 justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>© 2026 Europort Istanbul · Phase 1 · Brand system v1.0</span>
        <span>Privacy · Cookies · Terms — Phase 3</span>
      </div>
    </div>
  </footer>
);
