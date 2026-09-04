import { BENCHMARK } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";

export const BenchmarkSection = () => (
  <SectionShell id="benchmark" number="09" label="Benchmark" title="Where SMM and Posidonia set the bar — and where we pass it." lead="SMM Hamburg (1–4 Sept 2026) and Posidonia (Athens) were studied page by page alongside Europort Rotterdam, Nor-Shipping and Marintec. The full 13-show matrix is in the report. This is the short version.">
    <div className="card-ep overflow-x-auto" data-testid="benchmark-table">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-left">
            <th className="p-4 border-b-2 border-border font-medium">Criterion</th>
            <th className="p-4 border-b-2 border-border font-medium">SMM Hamburg</th>
            <th className="p-4 border-b-2 border-border font-medium">Posidonia</th>
            <th className="p-4 border-b-2 border-border font-medium text-periwinkle">Europort Istanbul · target</th>
          </tr>
        </thead>
        <tbody>
          {BENCHMARK.map((r) => (
            <tr key={r.criterion} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
              <td className="p-4 font-bold">{r.criterion}</td>
              <td className="p-4 text-muted-foreground">{r.smm}</td>
              <td className="p-4 text-muted-foreground">{r.pos}</td>
              <td className="p-4 font-semibold">{r.ep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="card-ep p-6">
        <p className="eyebrow">Taken from SMM</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Conference sub-brands, tiered sponsors with an "endorsing associations" row (GİSBİR and GMO already appear there), a head-of-state welcome, and "transport included" as a headline benefit — our free IDO sea bus told the same way.</p>
      </div>
      <div className="card-ep p-6">
        <p className="eyebrow">Taken from Posidonia</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">A side-event brand that turns the show into a city week (Games → Bosphorus Series), an Exhibitor Press feed that gives exhibitors real marketing value, and a dedicated Facts & Figures landing page.</p>
      </div>
    </div>
  </SectionShell>
);
