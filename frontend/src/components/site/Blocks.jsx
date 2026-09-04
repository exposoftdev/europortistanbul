import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, Contours } from "@/components/brand/Primitives";
import { REGISTER_URL } from "@/lib/api";
import { track, withUtm } from "@/lib/track";

export const PageHero = ({ eyebrow, title, lead, children, compact = false }) => (
  <section className={`relative ${compact ? "pt-14 pb-10" : "pt-16 lg:pt-24 pb-14 lg:pb-20"} overflow-hidden`}>
    <Contours className="text-periwinkle" />
    <div className="relative grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <h1 data-testid="page-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">
          {(Array.isArray(title) ? title : [title]).map((l, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}><span className={`block ${i === 1 ? "text-periwinkle" : ""}`}>{l}</span></Reveal>
          ))}
        </h1>
        {lead && <Reveal delay={0.3}><p className="mt-7 text-lg text-muted-foreground max-w-2xl leading-relaxed">{lead}</p></Reveal>}
      </div>
      {children && <div className="lg:col-span-4">{children}</div>}
    </div>
  </section>
);

export const Chapter = ({ id, number, label, title, lead, children, className = "" }) => (
  <section id={id} data-testid={`chapter-${id}`} className={`py-20 lg:py-28 border-t border-border scroll-mt-24 ${className}`}>
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-4">
        <Eyebrow number={number}>{label}</Eyebrow>
        <Reveal><h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">{title}</h2></Reveal>
        {lead && <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">{lead}</p>}
      </div>
      <div className="lg:col-span-8 min-w-0">{children}</div>
    </div>
  </section>
);

export const RegisterLink = ({ className = "btn-signal", content = "cta", children = "Register free" }) => (
  <a
    href={withUtm(REGISTER_URL, content)}
    target="_blank"
    rel="noopener noreferrer"
    data-testid={`register-link-${content}`}
    onClick={() => track("register_click", { cta_id: content })}
    className={className}
  >
    {children} <ArrowUpRight size={16} />
  </a>
);

export const CTABand = () => (
  <section data-testid="cta-band" className="relative overflow-hidden rounded-lg border border-border my-16 lg:my-24" style={{ background: "#07255C", color: "#fff" }}>
    <Contours className="text-periwinkle" />
    <div className="relative p-8 lg:p-14 grid lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#797AAF" }}>4–6 November 2026 · Yenikapı Expo Center</p>
        <p className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02]">Set course <span style={{ color: "#797AAF" }}>for Istanbul.</span></p>
      </div>
      <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
        <RegisterLink content="band" />
        <Link to="/exhibit/enquiry" data-testid="cta-band-stand" onClick={() => track("stand_enquiry_start", { cta_id: "band" })} className="btn h-11 border border-white/40 text-white hover:bg-white hover:text-navy">Book your stand <ArrowRight size={16} /></Link>
      </div>
    </div>
  </section>
);

export const Empty = ({ children }) => <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground py-10">{children}</p>;
