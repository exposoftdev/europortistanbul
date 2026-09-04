import { X } from "lucide-react";
import { LOGO_DONTS } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";

export const LogoSection = () => (
  <SectionShell id="logo" number="02" label="Logo" title="The existing mark, used with discipline." lead="The compass symbol and the Nunito wordmark stay exactly as they are. What changes is the consistency: two approved versions, a fixed clear space, minimum sizes, and a short list of things that never happen.">
    <div className="grid md:grid-cols-2 gap-4">
      <figure data-testid="logo-on-navy" className="rounded-lg p-10 grid place-items-center min-h-[220px]" style={{ background: "#07255C" }}>
        <img src="/logo-europort-istanbul-white.png" alt="Europort Istanbul logo, white on navy" className="w-full max-w-[300px]" />
        <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-widest" style={{ color: "#797AAF" }}>A · White on Europort Navy — primary</figcaption>
      </figure>
      <figure data-testid="logo-on-white" className="rounded-lg p-10 grid place-items-center min-h-[220px] border border-border" style={{ background: "#FFFFFF" }}>
        <img src="/logo-europort-istanbul-navy.png" alt="Europort Istanbul logo, navy pill on white" className="w-full max-w-[300px]" />
        <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-widest" style={{ color: "#797AAF" }}>B · Navy pill on light surfaces</figcaption>
      </figure>
    </div>

    <div className="mt-6 grid md:grid-cols-12 gap-4">
      <div className="md:col-span-7 card-ep p-8">
        <p className="eyebrow">Clear space · ½X</p>
        <div className="mt-6 relative mx-auto max-w-[360px]">
          <div className="border border-dashed border-periwinkle/60 p-8 rounded">
            <div className="relative">
              <img src="/logo-europort-istanbul-navy.png" alt="" className="w-full" />
              {["-top-7 left-1/2 -translate-x-1/2", "-bottom-7 left-1/2 -translate-x-1/2", "top-1/2 -left-8 -translate-y-1/2", "top-1/2 -right-8 -translate-y-1/2"].map((pos) => (
                <span key={pos} className={`absolute ${pos} font-mono text-[10px] text-periwinkle`}>½X</span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">X is the height of the compass symbol. Nothing enters the clear space: no type, no partner logos, no image edges.</p>
      </div>
      <div className="md:col-span-5 space-y-4">
        <div className="card-ep p-6">
          <p className="eyebrow">Minimum size</p>
          <div className="mt-4 flex items-end gap-6">
            <div><img src="/logo-europort-istanbul-navy.png" alt="" style={{ width: 120 }} /><p className="font-mono text-[10px] mt-2 text-muted-foreground">120 px · digital</p></div>
            <div><p className="font-mono text-2xl">32 mm</p><p className="font-mono text-[10px] text-muted-foreground">print</p></div>
          </div>
        </div>
        <div className="card-ep p-6">
          <p className="eyebrow">Files</p>
          <ul className="mt-3 text-sm space-y-1.5">
            <li className="flex justify-between"><span>White · PNG @4x</span><span className="font-mono text-xs text-muted-foreground">available</span></li>
            <li className="flex justify-between"><span>Navy pill · PNG @2x</span><span className="font-mono text-xs text-muted-foreground">available</span></li>
            <li className="flex justify-between"><span>Vector · SVG / AI</span><span className="font-mono text-xs text-signal">requested</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-6 card-ep p-6">
      <p className="eyebrow">Never</p>
      <ul data-testid="logo-donts" className="mt-4 grid sm:grid-cols-2 gap-3">
        {LOGO_DONTS.map((d) => (
          <li key={d} className="flex gap-3 text-sm"><X size={16} className="text-signal shrink-0 mt-0.5" />{d}</li>
        ))}
      </ul>
    </div>
  </SectionShell>
);
