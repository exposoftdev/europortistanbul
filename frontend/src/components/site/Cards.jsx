import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { track } from "@/lib/track";

const fmtDay = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

export const ExhibitorCard = ({ e }) => (
  <Link to={`/exhibitors/${e.slug}`} data-testid={`exhibitor-card-${e.slug}`} onClick={() => track("exhibitor_profile_view", { exhibitor: e.slug })}
    className="card-ep p-5 flex flex-col gap-3 group transition-[border-color,transform] duration-300 hover:border-periwinkle hover:-translate-y-0.5">
    <div className="flex justify-between items-start gap-3">
      <p className="font-bold leading-snug group-hover:text-periwinkle transition-colors">{e.name}</p>
      <span className="font-mono text-[10px] tracking-widest shrink-0 border border-border rounded px-1.5 py-0.5">{e.stand}</span>
    </div>
    <p className="text-xs text-muted-foreground">{e.country}</p>
    <div className="mt-auto flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider">
      <span className="px-2 py-0.5 rounded bg-muted">{e.category}</span>
      {e.pavilion && <span className="px-2 py-0.5 rounded bg-periwinkle text-white">{e.pavilion.replace(" Pavilion", "")}</span>}
    </div>
  </Link>
);

export const SessionCard = ({ s }) => (
  <Link to={`/programme/${s.slug}`} data-testid={`session-card-${s.slug}`} onClick={() => track("programme_session_view", { session: s.slug })}
    className="card-ep p-5 grid sm:grid-cols-12 gap-4 group transition-colors duration-300 hover:border-periwinkle">
    <div className="sm:col-span-3 font-mono text-xs">
      <p className="text-periwinkle uppercase tracking-widest">{fmtDay(s.day)}</p>
      <p className="mt-1 text-lg">{s.start}<span className="text-muted-foreground">–{s.end}</span></p>
    </div>
    <div className="sm:col-span-9">
      <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${s.track === "MariMatch" ? "bg-signal text-white" : s.track === "Bosphorus Series" ? "bg-navy text-white dark:bg-white dark:text-navy" : "bg-periwinkle text-white"}`}>{s.track}</span>
      <p className="mt-2 font-bold text-lg leading-snug group-hover:text-periwinkle transition-colors">{s.title}</p>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.summary}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><MapPin size={11} /> {s.venue}</p>
    </div>
  </Link>
);

export const NewsCard = ({ a, big = false }) => (
  <Link to={`/news/${a.slug}`} data-testid={`news-card-${a.slug}`} onClick={() => track("article_view", { article: a.slug })} className="group flex flex-col gap-4">
    <div className={`relative overflow-hidden rounded-lg border border-border ${big ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
      <img src={a.image} alt="" className="w-full h-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(7,37,92,0.75) 0%, transparent 55%)" }} />
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white">{a.category} · {fmtDay(a.date)}</span>
    </div>
    <div>
      <p className={`font-extrabold tracking-tight leading-snug group-hover:text-periwinkle transition-colors ${big ? "text-2xl" : "text-lg"}`}>{a.title}</p>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
    </div>
  </Link>
);

export const LinkRow = ({ to, children, testId }) => (
  <Link to={to} data-testid={testId} className="flex items-center justify-between py-4 border-b border-border group hover:text-periwinkle transition-colors">
    <span className="font-bold">{children}</span><ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
);

export const Meta = ({ icon: Icon = Clock, children }) => (
  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><Icon size={11} /> {children}</p>
);

export { fmtDay };
