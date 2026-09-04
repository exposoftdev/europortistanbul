import { BRAND, PAVILIONS } from "@/lib/brand";
import { SectionShell, CornerMarks, Contours } from "@/components/brand/Primitives";

const alternatives = [
  ["Two Continents. One Course.", "Selected", "Evolves the current line. Maritime language: a course is a heading and an agenda."],
  ["Set course for Istanbul.", "CTA line", "Used under the theme on every call to action and on print."],
  ["Where maritime worlds meet.", "Reserve", "Safe and descriptive; too close to SMM and Nor-Shipping."],
];

export const StrategySection = () => (
  <SectionShell id="strategy" number="01" label="Strategy" title="Meridian: one line from Rotterdam to the Bosphorus." lead="The line from Rotterdam's 4°E to Istanbul's 29°E joins the two ends of the Europort family. In Istanbul that line cuts across two continents. Everything in the identity — the compass in the logo, the coordinates, the pavilion strategy — hangs on it.">
    <div className="relative card-ep p-8 lg:p-12 overflow-hidden">
      <Contours className="text-periwinkle" />
      <CornerMarks label={BRAND.coordinates} />
      <p className="eyebrow">Theme sentence · 2026 campaign</p>
      <p data-testid="strategy-theme" className="relative mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">Two Continents.<br /><span className="text-periwinkle">One Course.</span></p>
      <p className="relative mt-6 font-mono text-sm text-muted-foreground">{BRAND.cta}</p>
    </div>

    <div className="mt-6 grid md:grid-cols-3 gap-4">
      {alternatives.map(([t, s, d]) => (
        <div key={t} className="card-ep p-5">
          <span className={`font-mono text-[10px] uppercase tracking-widest ${s === "Selected" ? "text-signal" : "text-muted-foreground"}`}>{s}</span>
          <p className="mt-2 font-bold">{t}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 grid md:grid-cols-2 gap-8">
      <div>
        <p className="eyebrow">Positioning</p>
        <p className="mt-3 text-lg leading-relaxed">Europort Istanbul is the international maritime exhibition where European technology meets the shipbuilding power of Türkiye and the growth markets of Asia, Africa and the Black Sea — in the only city that stands on two continents.</p>
      </div>
      <div>
        <p className="eyebrow">Brand architecture</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex gap-3"><span className="font-mono text-periwinkle">00</span> Europort — Rotterdam, since 1942</li>
          <li className="flex gap-3"><span className="font-mono text-periwinkle">01</span> Europort Istanbul — regional edition, same logo system</li>
          <li className="flex gap-3"><span className="font-mono text-periwinkle">02</span> BlueBridge Maritime Istanbul Forum — conference (periwinkle)</li>
          <li className="flex gap-3"><span className="font-mono text-periwinkle">03</span> MariMatch @ Europort Istanbul — B2B matchmaking (signal)</li>
          <li className="flex gap-3"><span className="font-mono text-periwinkle">04</span> Bosphorus Series — proposed side events</li>
        </ul>
      </div>
    </div>

    <div className="mt-10">
      <p className="eyebrow">Country pavilions · coordinate labels</p>
      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
        {PAVILIONS.map((p) => (
          <div key={p.code} className="bg-card p-5" data-testid={`pavilion-${p.code}`}>
            <p className="font-mono text-2xl font-medium">{p.code}</p>
            <p className="mt-1 font-bold text-sm">{p.name}</p>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1">{p.coord}</p>
          </div>
        ))}
      </div>
    </div>
  </SectionShell>
);
