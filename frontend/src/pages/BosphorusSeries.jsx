import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { api, img } from "@/lib/api";
import { track } from "@/lib/track";
import { Eyebrow, Reveal, Contours, CornerMarks } from "@/components/brand/Primitives";
import { SignalFlagRow } from "@/components/brand/SignalFlags";
import { Photo } from "@/components/site/Photo";
import { Chapter, RegisterLink } from "@/components/site/Blocks";
import { SessionCard } from "@/components/site/Cards";

const events = [
  { slug: "opening-crossing", n: "01", t: "The Opening Crossing", d: "Wed 4 Nov · 08:15", img: "bosphorus", label: "BOSTANCI → YENİKAPI", copy: "The show opens on the water. Exhibitors, delegations and press board a dedicated IDO sea bus on the Asian shore and cross to the European side together. Forty-five minutes, one skyline, one welcome. Platinum naming right available." },
  { slug: "tuzla-shipyard-tour", n: "02", t: "Tuzla Shipyard Tour", d: "Fri 6 Nov · 13:30", img: "drydock", label: "TUZLA · 40°49'N 29°18'E", copy: "Two yards in one afternoon: a newbuild slipway and a repair dock in the Tuzla shipyard zone. Sixty places for international visitors, coach from Yenikapı, passport required." },
  { slug: "young-europort-istanbul", n: "03", t: "Young Europort Istanbul", d: "Fri 6 Nov · 10:00", img: "cranes", label: "CAREER DECK · HALL 2", copy: "Guided hall walks, a career panel with yards and suppliers and a speed-networking hour. For students and early-career professionals from maritime faculties." },
  { slug: "meridian-dinner", n: "04", t: "The Meridian Dinner", d: "Thu 5 Nov · 19:30", img: "mosque", label: "BOSPHORUS · BY INVITATION", copy: "Sponsors, shipowners and pavilion leads at a table on the shore of the strait that gives the brand its line." },
];

export default function BosphorusSeries() {
  const [sessions, setSessions] = useState([]);
  useEffect(() => { api.get("/programme", { params: { track: "Bosphorus Series" } }).then((r) => setSessions(r.data)); }, []);
  return (
    <div data-testid="bosphorus-page">
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden rounded-b-lg text-white" style={{ background: "#07255C" }}>
        <Contours className="text-periwinkle" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal><p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#797AAF" }}>Programme · Side events · A Europort Istanbul series</p></Reveal>
            <h1 data-testid="page-title" className="mt-6 text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-[0.95]">
              <Reveal delay={0.1}><span className="block">Bosphorus</span></Reveal>
              <Reveal delay={0.2}><span className="block" style={{ color: "#797AAF" }}>Series.</span></Reveal>
            </h1>
            <Reveal delay={0.3}><p className="mt-8 text-lg sm:text-xl max-w-xl leading-relaxed text-white/80">Four events that take the show out of the hall: onto the water, into the yards, to the next generation and to the table.</p></Reveal>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end"><SignalFlagRow word="BEPZ" size={56} /></div>
        </div>
      </section>

      <div className="divide-y divide-border">
        {events.map((e, i) => (
          <section key={e.slug} id={e.slug} data-testid={`bosphorus-event-${e.slug}`} className="py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
            <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2" : ""}`}><Photo src={img(e.img, 1200)} alt={e.t} label={e.label} ratio="aspect-[5/4]" mask={i % 2 ? "bottom" : "left"} /></div>
            <div className="lg:col-span-6">
              <Eyebrow number={e.n}>{e.d}</Eyebrow>
              <Reveal><h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.02]">{e.t}</h2></Reveal>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{e.copy}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={`/programme/${e.slug}`} data-testid={`bosphorus-detail-${e.slug}`} onClick={() => track("programme_session_view", { session: e.slug })} className="btn-secondary">Details <ArrowRight size={16} /></Link>
                {e.slug === "meridian-dinner" ? <Link to="/exhibit/sponsorship" className="btn-ghost">Sponsor this event</Link> : <RegisterLink content={`bosphorus-${e.slug}`} className="btn-signal">Register to join</RegisterLink>}
              </div>
            </div>
          </section>
        ))}
      </div>

      <Chapter id="schedule" number="05" label="Schedule" title="Four dates, one week.">
        <div className="space-y-3">{sessions.map((s) => <SessionCard key={s.slug} s={s} />)}</div>
        <div className="mt-8 card-ep p-6 relative"><CornerMarks label="SPONSOR" /><p className="eyebrow">Partner the series</p><p className="mt-2 font-bold text-lg">Naming rights for the Opening Crossing and the Meridian Dinner are part of the Platinum and Gold packages.</p><Link to="/exhibit/sponsorship" data-testid="bosphorus-sponsor-cta" className="btn-signal mt-5">Sponsorship enquiry <ArrowRight size={16} /></Link></div>
      </Chapter>
    </div>
  );
}
