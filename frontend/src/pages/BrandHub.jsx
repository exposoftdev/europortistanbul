import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eyebrow } from "@/components/brand/Primitives";
import { StrategySection } from "./brand/StrategySection";
import { LogoSection } from "./brand/LogoSection";
import { ColorSection } from "./brand/ColorSection";
import { TypographySection } from "./brand/TypographySection";
import { GraphicSection } from "./brand/GraphicSection";
import { ComponentsSection } from "./brand/ComponentsSection";
import { MotionSection } from "./brand/MotionSection";
import { VoiceSection } from "./brand/VoiceSection";
import { BenchmarkSection } from "./brand/BenchmarkSection";
import { ApplicationsSection } from "./brand/ApplicationsSection";

const toc = [
  ["strategy", "Strategy"], ["logo", "Logo"], ["color", "Colour"], ["type", "Typography"], ["graphic", "Graphic language"],
  ["components", "Components"], ["motion", "Motion"], ["voice", "Voice"], ["benchmark", "Benchmark"], ["applications", "Applications"],
];

export default function BrandHub() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 150);
  }, [hash]);
  return (
    <div data-testid="brand-hub-page">
      <header className="pt-16 lg:pt-24 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow>Brand Hub · System v1.0 · Phase 1 deliverable</Eyebrow>
          <h1 data-testid="brand-hub-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">Europort Istanbul<br />brand system.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">Existing logo and colours, carried into a complete identity: Nunito typography, a light and a dark theme built on Europort Navy, a nautical graphic language and a measurable component library. Toggle the theme in the header to inspect both modes.</p>
        </div>
        <nav data-testid="brand-toc" className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
          {toc.map(([id, l], i) => (
            <a key={id} href={`#${id}`} data-testid={`toc-${id}`} className="font-mono text-[11px] uppercase tracking-widest px-3 py-2 rounded-md border border-border hover:border-periwinkle hover:text-periwinkle transition-colors duration-300">
              {String(i + 1).padStart(2, "0")} {l}
            </a>
          ))}
        </nav>
      </header>
      <StrategySection />
      <LogoSection />
      <ColorSection />
      <TypographySection />
      <GraphicSection />
      <ComponentsSection />
      <MotionSection />
      <VoiceSection />
      <BenchmarkSection />
      <ApplicationsSection />
    </div>
  );
}
