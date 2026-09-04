import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Eyebrow = ({ number, children, className = "" }) => (
  <p className={`eyebrow ${className}`}>
    {number && <span className="text-foreground/60 mr-2">{number} //</span>}
    {children}
  </p>
);

export const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SectionShell = ({ id, number, label, title, lead, children }) => (
  <section id={id} data-testid={`section-${id}`} className="py-20 lg:py-28 border-t border-border scroll-mt-24">
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-4">
        <Eyebrow number={number}>{label}</Eyebrow>
        <Reveal>
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">{title}</h2>
        </Reveal>
        {lead && <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">{lead}</p>}
      </div>
      <div className="lg:col-span-8 min-w-0">{children}</div>
    </div>
  </section>
);

export const Contours = ({ className = "" }) => (
  <svg viewBox="0 0 800 400" fill="none" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    {[0, 28, 56, 84, 112, 140, 168].map((o, i) => (
      <path
        key={i}
        d={`M-50 ${120 + o} C 120 ${60 + o}, 220 ${200 + o}, 400 ${140 + o} S 680 ${40 + o}, 850 ${160 + o}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity={0.12 - i * 0.012}
      />
    ))}
  </svg>
);

export const CornerMarks = ({ label }) => (
  <>
    {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
      <span key={pos} className={`absolute ${pos} w-3 h-3 border-current opacity-50 ${pos.includes("top") ? "border-t" : "border-b"} ${pos.includes("left") ? "border-l" : "border-r"}`} />
    ))}
    {label && <span className="absolute bottom-3 right-8 font-mono text-[10px] tracking-widest opacity-60">{label}</span>}
  </>
);
