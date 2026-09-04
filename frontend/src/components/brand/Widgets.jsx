import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { BRAND } from "@/lib/brand";

export const Counter = ({ value, duration = 1400 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);
  return <span ref={ref}>{n.toLocaleString("en-US")}</span>;
};

export const StatCard = ({ value, label, note }) => (
  <div data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`} className="card-ep p-6 relative overflow-hidden">
    <p className="font-mono text-4xl lg:text-5xl font-medium tracking-tight"><Counter value={value} /></p>
    <p className="mt-2 text-sm font-bold">{label}</p>
    {note && <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{note}</p>}
  </div>
);

export const Swatch = ({ c }) => {
  const [done, setDone] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(c.hex);
    setDone(true);
    toast.success(`${c.hex} copied`);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <div data-testid={`swatch-${c.token}`} className="card-ep overflow-hidden">
      <button type="button" onClick={copy} data-testid={`swatch-copy-${c.token}`} className="w-full h-32 flex items-end justify-between p-4 text-left transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-[1.01]" style={{ background: c.hex, color: c.text }}>
        <span className="font-mono text-sm">{c.hex}</span>
        {done ? <Check size={16} /> : <Copy size={16} className="opacity-70" />}
      </button>
      <div className="p-4 space-y-2">
        <p className="font-bold">{c.name}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{c.role}</p>
        <dl className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground pt-2 border-t border-border">
          <div><dt>RGB</dt><dd className="text-foreground normal-case">{c.rgb}</dd></div>
          <div><dt>CMYK</dt><dd className="text-foreground normal-case">{c.cmyk}</dd></div>
          <div><dt>Pantone</dt><dd className="text-foreground normal-case">{c.pantone}</dd></div>
        </dl>
      </div>
    </div>
  );
};

export const Countdown = () => {
  const [t, setT] = useState(() => Math.max(0, new Date(BRAND.eventStart) - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, new Date(BRAND.eventStart) - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(t / 86400000), h = Math.floor((t / 3600000) % 24), m = Math.floor((t / 60000) % 60), s = Math.floor((t / 1000) % 60);
  return (
    <div data-testid="countdown" className="flex gap-6 font-mono">
      {[["Days", d], ["Hrs", h], ["Min", m], ["Sec", s]].map(([k, v]) => (
        <div key={k}>
          <p className="text-3xl sm:text-4xl font-medium tabular-nums">{String(v).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{k}</p>
        </div>
      ))}
    </div>
  );
};

export const Marquee = ({ items }) => (
  <div className="marquee overflow-hidden border-y border-border py-4" data-testid="marquee">
    <div className="marquee-track">
      {[...items, ...items].map((it, i) => (
        <span key={i} className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          <span className="px-6">{it}</span><span className="w-1.5 h-1.5 rounded-full bg-signal inline-block" />
        </span>
      ))}
    </div>
  </div>
);
