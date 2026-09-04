import { TYPE_SCALE } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";

const weights = [300, 400, 600, 700, 800, 900];

export const TypographySection = () => (
  <SectionShell id="type" number="04" label="Typography" title="Nunito, the logo's own typeface." lead="The wordmark is set in Nunito, so the whole interface speaks with the logo's voice — rounded terminals, wide apertures, six weights. IBM Plex Mono carries anything that reads like an instrument: coordinates, stand numbers, timestamps, chapter labels.">
    <div className="card-ep divide-y divide-border" data-testid="type-scale">
      {TYPE_SCALE.map((t) => (
        <div key={t.name} className="grid md:grid-cols-12 gap-4 p-5 items-baseline">
          <div className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-periwinkle">{t.name}</p>
            <p className="font-mono text-[10px] text-muted-foreground mt-1">{t.spec}</p>
          </div>
          <p className={`md:col-span-9 ${t.cls} break-words`}>{t.sample}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="card-ep p-6">
        <p className="eyebrow">Nunito weights</p>
        <div className="mt-4 space-y-1">
          {weights.map((w) => (
            <p key={w} className="text-2xl flex items-baseline gap-4" style={{ fontWeight: w }}><span className="font-mono text-xs text-muted-foreground w-8">{w}</span>Bosphorus</p>
          ))}
        </div>
      </div>
      <div className="card-ep p-6">
        <p className="eyebrow">IBM Plex Mono · instrument type</p>
        <div className="mt-4 font-mono space-y-3">
          <p className="text-3xl">41°00'N 28°57'E</p>
          <p className="text-sm">HALL 2 · STAND B-114 · 04.11.2026 10:00</p>
          <p className="text-xs uppercase tracking-[0.2em] text-periwinkle">02 // THE SHOW IN NUMBERS</p>
          <p className="text-5xl tabular-nums">5,734</p>
        </div>
        <ul className="mt-6 text-xs text-muted-foreground space-y-1.5">
          <li>Headlines in sentence case. Uppercase only in mono tags.</li>
          <li>Tracking: display −2%, body 0, mono tags +20%.</li>
          <li>Banned: Inter, Roboto, Arial, Helvetica, Space Grotesk, Poppins, Montserrat.</li>
        </ul>
      </div>
    </div>
  </SectionShell>
);
