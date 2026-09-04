import { SITE } from "@/lib/api";
import { PageHero } from "@/components/site/Blocks";
import { LeadForm } from "@/components/site/LeadForm";
import { CornerMarks } from "@/components/brand/Primitives";

const team = [["International sales", "Exhibitors outside Türkiye, pavilions", "sales@europort.com.tr"], ["Türkiye sales", "Yerli katılımcılar", "tr@europort.com.tr"], ["Visitors & programme", "Registration, BlueBridge, MariMatch", "visit@europort.com.tr"], ["Press", "Accreditation, interviews, media kit", "press@europort.com.tr"]];

export default function Contact() {
  return (
    <div data-testid="contact-page">
      <PageHero eyebrow="Contact" title={["Talk to the team.", "Two working days, or sooner."]} lead="Choose a topic and write. Every message is logged, acknowledged instantly and answered by the person responsible." compact />
      <div className="grid lg:grid-cols-12 gap-8 pb-20">
        <div className="lg:col-span-7"><LeadForm type="contact" /></div>
        <aside className="lg:col-span-5 space-y-3">
          {team.map(([t, d, m]) => <div key={t} className="card-ep p-5"><p className="eyebrow">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p><p className="mt-2 font-mono text-xs">{m}</p></div>)}
          <div className="card-ep p-5 relative overflow-hidden" style={{ background: "#07255C", color: "#fff" }}>
            <CornerMarks label={SITE.coordinates} />
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#797AAF" }}>Venue</p>
            <p className="mt-2 font-bold">{SITE.venue}</p>
            <p className="text-sm text-white/70 mt-1">Yenikapı metro & Marmaray · IDO terminal 200 m</p>
            <a href="https://maps.google.com/?q=Yenikapı+Expo+Center" target="_blank" rel="noopener noreferrer" data-testid="contact-map-link" className="btn h-10 mt-4 border border-white/40 text-white hover:bg-white hover:text-navy">Open in maps</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
