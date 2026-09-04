import { COLORS } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";
import { Swatch } from "@/components/brand/Widgets";

const Panel = ({ mode, bg, card, fg, muted, border }) => (
  <div data-testid={`theme-panel-${mode}`} className="rounded-lg p-6 border" style={{ background: bg, color: fg, borderColor: border }}>
    <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#797AAF" }}>{mode} theme</p>
    <p className="mt-3 text-2xl font-black tracking-tight">Set course for Istanbul.</p>
    <p className="mt-2 text-sm" style={{ color: muted }}>4–6 November 2026 · Yenikapı Expo Center</p>
    <div className="mt-5 rounded-md p-4 border" style={{ background: card, borderColor: border }}>
      <p className="font-mono text-xs" style={{ color: muted }}>Hall 2 · Stand B-114</p>
      <p className="font-bold mt-1">Exhibitor card surface</p>
    </div>
    <div className="mt-5 flex gap-3">
      <span className="inline-flex h-10 px-5 items-center rounded-md text-sm font-bold" style={{ background: "#EA580C", color: "#fff" }}>Register</span>
      <span className="inline-flex h-10 px-5 items-center rounded-md text-sm font-bold border" style={{ borderColor: border }}>Book a stand</span>
    </div>
  </div>
);

export const ColorSection = () => (
  <SectionShell id="color" number="03" label="Colour" title="Three colours from the logo, one signal." lead="Navy, periwinkle and white come straight from the existing logo files. Signal Orange is the only addition: the colour of maritime signal flags, reserved for the single primary action on any screen. No gradients, no violet, no neon. Click a swatch to copy its HEX.">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {COLORS.map((c) => <Swatch key={c.token} c={c} />)}
    </div>

    <div className="mt-10">
      <p className="eyebrow">Two themes, one system</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <Panel mode="dark" bg="#07255C" card="#051D4A" fg="#F8FAFC" muted="#B8C0D6" border="#2A4477" />
        <Panel mode="light" bg="#F8FAFC" card="#FFFFFF" fg="#07255C" muted="#4F5D7A" border="#DCE1EA" />
      </div>
    </div>

    <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
      {[
        ["Ratio", "60 / 30 / 10", "Ground · type and surfaces · signal accent"],
        ["Contrast", "WCAG AA", "All text ≥ 4.5:1 in both themes; Signal on navy 4.6:1"],
        ["Rule", "One signal per screen", "The accent marks the primary action only"],
      ].map(([k, v, d]) => (
        <div key={k} className="card-ep p-5">
          <p className="eyebrow">{k}</p>
          <p className="mt-2 font-mono text-lg">{v}</p>
          <p className="mt-1 text-muted-foreground text-xs">{d}</p>
        </div>
      ))}
    </div>
  </SectionShell>
);
