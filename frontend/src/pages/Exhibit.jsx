import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { img } from "@/lib/api";
import { PAVILIONS } from "@/lib/brand";
import { track } from "@/lib/track";
import { Photo } from "@/components/site/Photo";
import { PageHero, Chapter, CTABand } from "@/components/site/Blocks";

const packages = [
  ["Shell scheme", "from 12 m²", ["Walls, fascia, carpet, lighting", "Exhibitor badges", "Directory profile + logo", "MariMatch access"]],
  ["Space only", "from 50 m²", ["Raw space for custom build", "Priority positions for early bookers", "Rigging on request", "All shell benefits"]],
  ["Pavilion module", "9–18 m² per company", ["Shared national branding", "Lounge and meeting points", "Coordinator support", "Group visibility package"]],
];
const tiers = [["Platinum", "1", "Opening Crossing naming, badge & lanyard, hero placement, BlueBridge keynote slot"], ["Gold", "2", "Hall entrance, registration area, session sponsorship, newsletter feature"], ["Silver", "3", "Directory & app placement, aisle banners, social series"], ["Media", "open", "Reciprocal visibility for trade press and portals"]];

export default function Exhibit() {
  return (
    <div data-testid="exhibit-page">
      <PageHero eyebrow="Exhibit" title={["Türkiye builds.", "The region buys. Be in the room."]} lead="Reach shipyards, owners and operators from 50+ countries with three days of face-to-face selling, a searchable directory profile and pre-scheduled B2B meetings.">
        <div className="card-ep p-6">
          <p className="eyebrow">Early booking</p>
          <p className="mt-2 font-bold text-lg">Positions released in order of enquiry.</p>
          <Link to="/exhibit/enquiry" data-testid="exhibit-hero-cta" onClick={() => track("stand_enquiry_start", { cta_id: "exhibit-hero" })} className="btn-signal mt-5 w-full justify-center">Book your stand <ArrowRight size={16} /></Link>
        </div>
      </PageHero>

      <Chapter id="why" number="01" label="Why exhibit" title="Five reasons with numbers attached.">
        <div className="grid sm:grid-cols-2 gap-4">
          {[["5,734", "professional visitors in 2024 — 74% with purchasing authority"], ["52", "visitor countries; the Netherlands, Greece and Germany lead the overseas list"], ["#5", "Türkiye's global rank in yacht and special-purpose newbuilding"], ["3 h", "flight radius covering the Black Sea, Caspian, Gulf and North Africa"], ["1", "Bosphorus. No other maritime show is held on two continents."]].map(([v, l]) => (
            <div key={l} className="card-ep p-6"><p className="font-mono text-4xl">{v}</p><p className="mt-2 text-sm text-muted-foreground">{l}</p></div>
          ))}
        </div>
      </Chapter>

      <Chapter id="packages" number="02" label="Packages" title="Three ways to take space.">
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map(([t, s, items]) => (
            <div key={t} className="card-ep p-6 flex flex-col"><p className="eyebrow">{s}</p><p className="mt-2 text-xl font-extrabold">{t}</p>
              <ul className="mt-4 space-y-2 text-sm flex-1">{items.map((i) => <li key={i} className="flex gap-2"><Check size={14} className="text-signal mt-1 shrink-0" />{i}</li>)}</ul>
              <Link to="/exhibit/enquiry" className="btn-secondary mt-6 justify-center" onClick={() => track("stand_enquiry_start", { cta_id: `pkg-${t}` })}>Enquire</Link></div>
          ))}
        </div>
      </Chapter>

      <Chapter id="pavilions" number="03" label="Country pavilions" title="A national stage between two continents." lead="Pavilions receive shared branding, a lounge, coordinator support and a dedicated forum slot on the BlueBridge Stage. Africa joins for the first time in 2026.">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5"><Photo src={img("aerial", 1000)} alt="Ship repair harbour from above" label="PAVILIONS · HALL 2" ratio="aspect-[4/5]" /></div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden self-start">
            {PAVILIONS.map((p) => <div key={p.code} className="bg-card p-6"><p className="font-mono text-3xl">{p.code}</p><p className="mt-2 font-bold">{p.name}</p><p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1">{p.coord}</p></div>)}
          </div>
        </div>
      </Chapter>

      <Chapter id="sponsorship" number="04" label="Sponsorship" title="Own the meridian.">
        <div className="divide-y divide-border border-y border-border">
          {tiers.map(([t, n, d]) => <div key={t} className="py-5 grid sm:grid-cols-12 gap-3 items-baseline"><p className="sm:col-span-3 text-xl font-extrabold">{t}</p><p className="sm:col-span-2 font-mono text-xs text-periwinkle">{n} available</p><p className="sm:col-span-7 text-sm text-muted-foreground">{d}</p></div>)}
        </div>
        <Link to="/exhibit/sponsorship" data-testid="exhibit-sponsorship-cta" className="btn-signal mt-6">Sponsorship enquiry <ArrowRight size={16} /></Link>
      </Chapter>
      <CTABand />
    </div>
  );
}
