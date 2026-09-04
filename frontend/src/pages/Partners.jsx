import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { track } from "@/lib/track";
import { PageHero, CTABand, Empty } from "@/components/site/Blocks";
import { Eyebrow } from "@/components/brand/Primitives";

const SIZE = { Organisers: "h-24", "Platinum sponsor": "h-24", "Gold sponsor": "h-20", "Silver sponsor": "h-16", Supporters: "h-20", "Media partners": "h-14" };

export default function Partners() {
  const [groups, setGroups] = useState(null);
  useEffect(() => { api.get("/partners").then((r) => setGroups(r.data)); }, []);
  return (
    <div data-testid="partners-page">
      <PageHero eyebrow="Partners" title={["Organisers, sponsors, supporters,", "and the trade press."]} lead="Size encodes rank. Platinum, Gold and Silver positions for 2026 are open.">
        <Link to="/exhibit/sponsorship" data-testid="partners-sponsor-cta" className="card-ep p-6 block group hover:border-periwinkle transition-colors"><p className="eyebrow">Sponsorship</p><p className="mt-2 text-xl font-extrabold group-hover:text-periwinkle transition-colors">Own the meridian</p><span className="btn-ghost mt-3 px-0">Enquire <ArrowRight size={14} /></span></Link>
      </PageHero>
      {!groups && <Empty>Loading…</Empty>}
      <div className="divide-y divide-border">
        {groups?.map((g) => (
          <section key={g.tier} data-testid={`tier-${g.tier.toLowerCase().replace(/\s+/g, "-")}`} className="py-12 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3"><Eyebrow>{g.tier}</Eyebrow><p className="mt-2 font-mono text-xs text-muted-foreground">{g.items.length} {g.items.length === 1 ? "position" : "positions"}</p></div>
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {g.items.map((p, i) => p.name === "Available" ? (
                <Link key={i} to="/exhibit/sponsorship" className={`card-ep ${SIZE[g.tier]} grid place-items-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-dashed hover:border-signal hover:text-signal transition-colors`}>Available</Link>
              ) : (
                <a key={i} href={p.url || "#"} target={p.url ? "_blank" : undefined} rel="noopener noreferrer" onClick={() => track("partner_click", { partner: p.name })} className={`card-ep ${SIZE[g.tier]} grid place-items-center p-4 bg-white hover:border-periwinkle transition-colors`} title={p.name}>
                  {p.logo ? <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" /> : <span className="text-xs font-bold text-navy text-center">{p.name}</span>}
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
      <CTABand />
    </div>
  );
}
