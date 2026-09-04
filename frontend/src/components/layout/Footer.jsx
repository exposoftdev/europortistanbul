import { Link } from "react-router-dom";
import { SITE } from "@/lib/api";
import { NAV } from "./Navbar";
import { NewsletterForm } from "@/components/site/LeadForm";

export const Footer = () => (
  <footer data-testid="site-footer" className="border-t border-border mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">Europort family · Rotterdam since 1942</p>
        <p className="mt-4 text-3xl sm:text-4xl font-black tracking-tight leading-[1.05]">{SITE.theme}</p>
        <p className="mt-3 text-sm text-muted-foreground">Bridging Continents, Connecting Maritime Worlds</p>
        <div className="mt-8 max-w-sm">
          <p className="text-xs font-bold mb-2">Show news, once a month. No filler.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="lg:col-span-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm content-start">
        {NAV.map(([to, label]) => <Link key={to} to={to} data-testid={`footer-${label.toLowerCase()}`} className="py-1 hover:text-periwinkle transition-colors">{label}</Link>)}
        <Link to="/media" className="py-1 hover:text-periwinkle transition-colors">Media</Link>
        <Link to="/programme/bosphorus-series" className="py-1 hover:text-periwinkle transition-colors">Bosphorus Series</Link>
        <Link to="/brand" className="py-1 hover:text-periwinkle transition-colors">Brand Hub</Link>
        <Link to="/report" className="py-1 hover:text-periwinkle transition-colors">Strategy report</Link>
      </div>
      <div className="lg:col-span-4 grid sm:grid-cols-2 gap-8 text-sm">
        <div>
          <p className="eyebrow">Event</p>
          <p className="mt-3 font-bold">{SITE.dates}</p>
          <p className="text-muted-foreground">{SITE.venue}</p>
          <p className="mt-3 font-mono text-xs">{SITE.email}</p>
          <p className="font-mono text-xs">{SITE.phone}</p>
        </div>
        <div>
          <p className="eyebrow">Position</p>
          <p data-testid="footer-coordinates" className="mt-3 font-mono text-sm">{SITE.coordinates}</p>
          <p className="text-muted-foreground">Bosphorus meridian</p>
        </div>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap gap-4 justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>© 2026 Europort Istanbul · Organised by Rotterdam Ahoy & Bonn Yayıncılık</span>
        <span>Privacy · Cookies · Terms</span>
      </div>
    </div>
  </footer>
);
