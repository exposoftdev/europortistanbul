import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { PAVILIONS } from "@/lib/brand";
import { SectionShell, EASE } from "@/components/brand/Primitives";
import { Marquee } from "@/components/brand/Widgets";

const lines = ["41°00'N 28°57'E", "Two Continents.", "One Course."];

export const MotionSection = () => {
  const [key, setKey] = useState(0);
  return (
    <SectionShell id="motion" number="07" label="Motion" title="Heavy, controlled, like plotting a course." lead="One easing curve — cubic-bezier(0.16, 1, 0.3, 1) — and durations between 600 and 900 ms. Lines are revealed through a mask, one after another. Tickers drift. Nothing bounces. Everything respects prefers-reduced-motion.">
      <div className="card-ep p-8 lg:p-10 relative overflow-hidden" data-testid="motion-demo">
        <button type="button" onClick={() => setKey((k) => k + 1)} data-testid="motion-replay" className="absolute top-4 right-4 btn-ghost h-9 px-3 text-xs"><RotateCcw size={14} /> Replay</button>
        <AnimatePresence mode="wait">
          <motion.div key={key}>
            {lines.map((l, i) => (
              <div key={l} className="overflow-hidden">
                <motion.p
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: EASE }}
                  className={i === 0 ? "font-mono text-sm text-periwinkle mb-3" : "text-4xl lg:text-6xl font-black tracking-tight leading-[1.05]"}
                >
                  {l}
                </motion.p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4"><Marquee items={[...PAVILIONS.map((p) => `${p.name} pavilion`), "BlueBridge Maritime Forum", "MariMatch B2B", "Free IDO sea bus"]} /></div>

      <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
        {[
          ["Easing", "expoOut", "cubic-bezier(0.16, 1, 0.3, 1)"],
          ["Stagger", "80–120 ms", "Between lines of one headline"],
          ["Ticker", "25 s / cycle", "Pauses on hover"],
        ].map(([k, v, d]) => (
          <div key={k} className="card-ep p-5"><p className="eyebrow">{k}</p><p className="mt-2 font-mono text-lg">{v}</p><p className="mt-1 text-xs text-muted-foreground">{d}</p></div>
        ))}
      </div>
    </SectionShell>
  );
};
