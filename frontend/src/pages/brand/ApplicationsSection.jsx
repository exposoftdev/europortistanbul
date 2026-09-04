import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { SectionShell, CornerMarks } from "@/components/brand/Primitives";
import { SignalFlagRow } from "@/components/brand/SignalFlags";

const N = "#07255C", P = "#797AAF", S = "#EA580C";

export const ApplicationsSection = () => (
  <SectionShell id="applications" number="10" label="Applications" title="The system on card, badge and screen." lead="Rendered in CSS at proportion so the rules can be checked before print files are produced. Print-ready templates follow once vector logo files arrive.">
    <div className="grid md:grid-cols-2 gap-4">
      <div data-testid="app-business-card" className="space-y-3">
        <p className="eyebrow">Business card · 85 × 55 mm</p>
        <div className="aspect-[85/55] rounded-md p-5 flex flex-col justify-between relative" style={{ background: N }}>
          <img src="/logo-europort-istanbul-white.png" alt="" className="w-32" />
          <p className="font-mono text-[10px] tracking-widest" style={{ color: P }}>{BRAND.coordinates}</p>
        </div>
        <div className="aspect-[85/55] rounded-md p-5 flex flex-col justify-between border border-border" style={{ background: "#fff", color: N }}>
          <div><p className="font-black text-lg leading-tight">Name Surname</p><p className="text-xs" style={{ color: P }}>International Sales Manager</p></div>
          <div className="font-mono text-[10px] leading-relaxed"><p>name@europort.com.tr</p><p>+90 216 000 00 00 · europort.com.tr</p></div>
        </div>
      </div>

      <div data-testid="app-badge" className="space-y-3">
        <p className="eyebrow">Badge · 105 × 148 mm</p>
        <div className="aspect-[105/148] rounded-md overflow-hidden border border-border flex flex-col" style={{ background: "#fff", color: N }}>
          <div className="p-5 flex items-center justify-between" style={{ background: N }}>
            <img src="/logo-europort-istanbul-white.png" alt="" className="w-28" />
            <span className="font-mono text-[10px] tracking-widest" style={{ color: P }}>EP26</span>
          </div>
          <div className="flex-1 p-5 flex flex-col justify-center">
            <p className="text-3xl font-black leading-none tracking-tight">Name</p>
            <p className="text-3xl font-black leading-none tracking-tight">Surname</p>
            <p className="mt-3 text-sm font-bold">Company Shipyard A.Ş.</p>
            <p className="font-mono text-[10px] tracking-widest mt-1" style={{ color: P }}>TÜRKİYE · HALL 2 · B-114</p>
          </div>
          <div className="px-5 py-3 text-white font-black tracking-widest text-sm text-center" style={{ background: S }}>EXHIBITOR</div>
        </div>
        <p className="text-xs text-muted-foreground">Colour strip: Exhibitor = signal · Visitor = navy · Press = periwinkle · Speaker = white on navy.</p>
      </div>
    </div>

    <div className="mt-8" data-testid="app-linkedin">
      <p className="eyebrow mb-3">LinkedIn cover · 1584 × 396</p>
      <div className="aspect-[4/1] rounded-md relative overflow-hidden p-6 sm:p-10 flex items-center" style={{ background: N, color: "#fff" }}>
        <CornerMarks label={BRAND.coordinates} />
        <div className="flex-1">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] mb-2" style={{ color: P }}>4–6 NOVEMBER 2026 · YENİKAPI EXPO CENTER</p>
          <p className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02]">Two Continents. <span style={{ color: P }}>One Course.</span></p>
        </div>
        <div className="hidden sm:block"><SignalFlagRow word="EPIB" size={44} /></div>
      </div>
    </div>

    <div className="mt-8 grid md:grid-cols-2 gap-4">
      <div data-testid="app-signature" className="card-ep p-6">
        <p className="eyebrow mb-4">E-mail signature</p>
        <div className="flex gap-4 items-start text-sm">
          <div className="w-1 self-stretch rounded" style={{ background: S }} />
          <div>
            <p className="font-black">Name Surname</p>
            <p className="text-muted-foreground text-xs">International Sales · Europort Istanbul</p>
            <p className="font-mono text-[11px] mt-2">+90 216 000 00 00 · name@europort.com.tr</p>
            <p className="font-mono text-[10px] tracking-widest mt-2" style={{ color: P }}>TWO CONTINENTS. ONE COURSE. · 4–6 NOV 2026</p>
          </div>
        </div>
      </div>
      <div className="card-ep p-6 flex flex-col justify-between">
        <div>
          <p className="eyebrow">Next</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Roll-up 850×2000, stand fascia band, newsletter header, presentation cover and press release template are specified in the report and produced in Phase 2 alongside the website.</p>
        </div>
        <Link to="/report" data-testid="app-report-link" className="btn-secondary mt-6 self-start">Read the report <ArrowRight size={16} /></Link>
      </div>
    </div>
  </SectionShell>
);
