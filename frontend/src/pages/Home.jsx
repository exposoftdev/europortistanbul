import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { BRAND, PAVILIONS, STATS } from "@/lib/brand";
import { Eyebrow, Reveal, Contours, CornerMarks } from "@/components/brand/Primitives";
import { Countdown, Marquee, StatCard } from "@/components/brand/Widgets";

const sections = [
  ["01", "Why Istanbul", "The Bosphorus meridian, Tuzla shipyards, two continents."],
  ["02", "Show in numbers", "Interactive Post Show Report 2024."],
  ["03", "Exhibit", "Packages, pavilions, stand enquiry."],
  ["04", "Visit", "Registration, free IDO sea bus, hotels, visa letter."],
  ["05", "Programme", "BlueBridge Maritime Forum · MariMatch · Bosphorus Series."],
  ["06", "Country pavilions", "Netherlands · China · Poland · Africa."],
  ["07", "News & media", "Newsroom, press kit, accreditation."],
  ["08", "Partners", "Sponsor tiers, supporters, media partners."],
];

export default function Home() {
  return (
    <div data-testid="home-page">
      <section className="relative pt-16 pb-20 lg:pt-28 lg:pb-28 overflow-hidden">
        <Contours className="text-periwinkle" />
        <div className="relative grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <Reveal><Eyebrow>{BRAND.coordinates} · {BRAND.venue}</Eyebrow></Reveal>
            <h1 data-testid="hero-theme" className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02]">
              <Reveal delay={0.1}><span className="block">Two Continents.</span></Reveal>
              <Reveal delay={0.2}><span className="block text-periwinkle">One Course.</span></Reveal>
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                The international maritime exhibition where European technology meets the shipbuilding power of Türkiye — in the only city that stands on two continents.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/brand" data-testid="hero-cta-brand" className="btn-signal">Open the Brand Hub <ArrowRight size={16} /></Link>
                <Link to="/report" data-testid="hero-cta-report" className="btn-secondary"><FileText size={16} /> Read the strategy report</Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <div className="card-ep p-6 relative">
              <CornerMarks label="EP26" />
              <Eyebrow>Doors open</Eyebrow>
              <p className="mt-2 font-bold text-lg">{BRAND.dates}</p>
              <div className="mt-6"><Countdown /></div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={[...PAVILIONS.map((p) => `${p.name} pavilion`), "Free IDO sea bus · 45 min", "BlueBridge Maritime Forum", "MariMatch B2B", "Part of the Europort family"]} />

      <section className="py-20 lg:py-28">
        <Eyebrow number="02">The show in numbers · 2024</Eyebrow>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-border" data-testid="phase2-index">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Phase 2 · Website</Eyebrow>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">Editorial flow, eight numbered chapters.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">This preview shows the hero, ticker and stat system of the new site. The full marketing site is built in Phase 2 on the tokens defined in the Brand Hub.</p>
          </div>
          <ol className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {sections.map(([n, t, d]) => (
              <li key={n} className="bg-card p-6 group transition-colors duration-300 hover:bg-muted">
                <span className="font-mono text-xs text-periwinkle">{n} //</span>
                <p className="mt-2 font-bold text-lg">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
