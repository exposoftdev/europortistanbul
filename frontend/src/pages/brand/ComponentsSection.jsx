import { ArrowRight } from "lucide-react";
import { STATS } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";
import { StatCard } from "@/components/brand/Widgets";

const tiers = [["Platinum", 2, "h-16"], ["Gold", 3, "h-14"], ["Silver", 4, "h-12"], ["Media", 6, "h-10"]];

export const ComponentsSection = () => (
  <SectionShell id="components" number="06" label="Components" title="A measurable component library." lead="Every element below is the production component, not a mock-up. Each carries a data-testid and, in Phase 2, a dataLayer event name so marketing can trace every click back to a campaign.">
    <div className="card-ep p-6">
      <p className="eyebrow">Buttons · one signal per screen</p>
      <div className="mt-4 flex flex-wrap gap-3" data-testid="component-buttons">
        <button type="button" className="btn-signal" data-testid="btn-signal">Register now <ArrowRight size={16} /></button>
        <button type="button" className="btn-primary" data-testid="btn-primary">Book your stand</button>
        <button type="button" className="btn-secondary" data-testid="btn-secondary">Download brochure</button>
        <button type="button" className="btn-ghost" data-testid="btn-ghost">Add to calendar</button>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">events: register_click · stand_enquiry_start · brochure_download · add_to_calendar</p>
    </div>

    <div className="mt-4">
      <p className="eyebrow mb-3">Stat cards · IBM Plex Mono counters</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{STATS.map((s) => <StatCard key={s.label} {...s} />)}</div>
    </div>

    <blockquote data-testid="component-quote" className="mt-4 card-ep p-8 lg:p-10 border-l-4 border-l-signal">
      <p className="text-xl lg:text-2xl font-bold leading-snug tracking-tight">“Every two years Europort puts Istanbul at the centre of the maritime world between two continents.”</p>
      <footer className="mt-5 flex items-center gap-4">
        <span className="w-10 h-10 rounded-full bg-periwinkle/30 border border-periwinkle" />
        <div><p className="font-bold text-sm">Name Surname</p><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Chief Executive · Shipyard</p></div>
      </footer>
    </blockquote>

    <div className="mt-4 grid md:grid-cols-2 gap-4">
      <form className="card-ep p-6 space-y-4" onSubmit={(e) => e.preventDefault()} data-testid="component-form">
        <p className="eyebrow">Form fields · stand enquiry</p>
        <div><label className="text-xs font-bold" htmlFor="f-company">Company</label><input id="f-company" className="field mt-1.5" placeholder="Shipyard or supplier name" data-testid="field-company" /></div>
        <div><label className="text-xs font-bold" htmlFor="f-size">Stand size</label>
          <select id="f-size" className="field mt-1.5" data-testid="field-size" defaultValue=""><option value="" disabled>Select</option><option>12–24 m²</option><option>25–50 m²</option><option>50+ m²</option><option>Country pavilion</option></select></div>
        <label className="flex items-start gap-3 text-xs text-muted-foreground"><input type="checkbox" className="mt-0.5 accent-[#EA580C]" data-testid="field-consent" /> I agree to be contacted about Europort Istanbul 2026. GDPR / KVKK notice.</label>
        <button type="submit" className="btn-signal w-full justify-center" data-testid="form-submit">Send enquiry</button>
      </form>
      <div className="space-y-4">
        <div className="card-ep p-6" data-testid="component-badges">
          <p className="eyebrow">Badges and indicators</p>
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-signal text-signal"><span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />Registration open</span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-periwinkle text-white">BlueBridge</span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-border">Hall 2 · B-114</span>
            <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-muted">NL pavilion</span>
          </div>
        </div>
        <div className="card-ep p-6" data-testid="component-tiers">
          <p className="eyebrow">Sponsor tiers · size encodes rank</p>
          <div className="mt-4 space-y-3">
            {tiers.map(([t, n, h]) => (
              <div key={t}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{t}</p>
                <div className="flex gap-2">{Array.from({ length: n }).map((_, i) => <div key={i} className={`flex-1 ${h} rounded border border-border bg-muted/60`} />)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SectionShell>
);
