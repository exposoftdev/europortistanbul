import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { PageHero, Empty, CTABand } from "@/components/site/Blocks";
import { SessionCard } from "@/components/site/Cards";

const TRACKS = ["All", "BlueBridge", "MariMatch", "Bosphorus Series"];
const DAYS = [["", "All days"], ["2026-11-04", "Wed 4 Nov"], ["2026-11-05", "Thu 5 Nov"], ["2026-11-06", "Fri 6 Nov"]];

export default function Programme() {
  const [all, setAll] = useState([]);
  const [track, setTrack] = useState("All");
  const [day, setDay] = useState("");
  useEffect(() => { api.get("/programme").then((r) => setAll(r.data)); }, []);
  const list = all.filter((s) => (track === "All" || s.track === track) && (!day || s.day === day));

  return (
    <div data-testid="programme-page">
      <PageHero eyebrow="Programme · 4–6 November 2026" title={["Three tracks.", "One stage, one lounge, one strait."]} lead="BlueBridge Maritime Istanbul Forum on the stage in Hall 2, MariMatch B2B meetings in Hall 3, and the Bosphorus Series on the water and in the yards. All sessions are free for registered visitors.">
        <Link to="/programme/bosphorus-series" data-testid="programme-bosphorus-link" className="card-ep p-6 block group hover:border-periwinkle transition-colors">
          <p className="eyebrow">Side events</p><p className="mt-2 text-xl font-extrabold group-hover:text-periwinkle transition-colors">Bosphorus Series</p><p className="mt-1 text-sm text-muted-foreground">Opening Crossing · Tuzla Shipyard Tour · Young Europort · Meridian Dinner</p><span className="btn-ghost mt-4 px-0">Explore <ArrowRight size={14} /></span>
        </Link>
      </PageHero>
      <div className="flex flex-wrap gap-2 items-center justify-between border-y border-border py-4">
        <div className="flex flex-wrap gap-2" data-testid="track-filter">
          {TRACKS.map((t) => <button key={t} type="button" data-testid={`track-${t.toLowerCase().replace(" ", "-")}`} onClick={() => setTrack(t)} className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 rounded-md border transition-colors ${track === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-periwinkle"}`}>{t}</button>)}
        </div>
        <div className="flex flex-wrap gap-2" data-testid="day-filter">
          {DAYS.map(([v, l]) => <button key={v} type="button" data-testid={`day-${v || "all"}`} onClick={() => setDay(v)} className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 rounded-md border transition-colors ${day === v ? "bg-periwinkle text-white border-periwinkle" : "border-border hover:border-periwinkle"}`}>{l}</button>)}
        </div>
      </div>
      <p data-testid="session-count" className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">{list.length} sessions</p>
      <div className="mt-4 space-y-3 pb-10" data-testid="session-list">{list.map((s) => <SessionCard key={s.slug} s={s} />)}</div>
      {list.length === 0 && all.length > 0 && <Empty>No sessions for this selection.</Empty>}
      <CTABand />
    </div>
  );
}
