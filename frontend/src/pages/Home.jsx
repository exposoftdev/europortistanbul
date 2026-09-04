import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { api, img, SITE } from "@/lib/api";
import { PAVILIONS, STATS } from "@/lib/brand";
import { track } from "@/lib/track";
import { Eyebrow, Reveal, Contours, CornerMarks } from "@/components/brand/Primitives";
import { Countdown, Marquee, StatCard } from "@/components/brand/Widgets";
import { SignalFlagRow } from "@/components/brand/SignalFlags";
import { Photo } from "@/components/site/Photo";
import { Chapter, RegisterLink, CTABand } from "@/components/site/Blocks";
import { SessionCard, NewsCard, LinkRow } from "@/components/site/Cards";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const o = useTransform(scrollY, [0, 500], [1, 0]);
  return (
    <section className="relative pt-14 lg:pt-20 pb-16 lg:pb-24 overflow-hidden min-h-[calc(100vh-5rem)] flex flex-col justify-between">
      <Contours className="text-periwinkle" />
      <motion.div style={{ y, opacity: o }} className="relative grid lg:grid-cols-12 gap-10 items-center flex-1">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>{SITE.coordinates} · {SITE.venue}</Eyebrow></Reveal>
          <h1 data-testid="hero-theme" className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[0.98]">
            <Reveal delay={0.1}><span className="block">Two Continents.</span></Reveal>
            <Reveal delay={0.22}><span className="block text-periwinkle">One Course.</span></Reveal>
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">The international maritime exhibition where European technology meets the shipbuilding power of Türkiye — in the only city that stands on two continents.</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <RegisterLink content="hero" />
              <Link to="/exhibit" data-testid="hero-cta-exhibit" onClick={() => track("stand_enquiry_start", { cta_id: "hero" })} className="btn-secondary">Why exhibit <ArrowRight size={16} /></Link>
              <span className="hidden sm:block ml-2"><SignalFlagRow word="EPIB" size={36} /></span>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 relative">
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <Photo src={img("istanbul", 1200)} alt="Istanbul skyline over the Bosphorus" label="ISTANBUL · 41°N" ratio="aspect-[4/5]" tilt parallax={40} mask="bottom" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }} className="card-ep p-5 absolute -bottom-6 -left-4 sm:-left-10 w-[min(88%,340px)] shadow-2xl">
            <CornerMarks label="EP26" />
            <Eyebrow>Doors open · {SITE.dates}</Eyebrow>
            <div className="mt-3"><Countdown /></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const manifesto = [
  "Türkiye builds. Its yards rank among the world's top five for yachts and special-purpose vessels, and the order books run to 2030.",
  "The region buys. Black Sea, Caspian, Eastern Mediterranean, North and West Africa — fleets that need to be renewed, repaired and re-powered.",
  "Europe supplies. Propulsion, deck, navigation, coatings and finance, arriving with the Rotterdam show's eighty years behind them.",
  "Istanbul is the one place where all three stand in the same hall.",
];

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    api.get("/programme").then((r) => setSessions(r.data.filter((s) => s.track === "BlueBridge").slice(0, 3)));
    api.get("/news", { params: { limit: 3 } }).then((r) => setNews(r.data));
  }, []);

  return (
    <div data-testid="home-page">
      <Hero />
      <Marquee items={[...PAVILIONS.map((p) => `${p.name} pavilion`), "Free IDO sea bus · 45 min", "BlueBridge Maritime Forum", "MariMatch B2B", "Bosphorus Series", "Part of the Europort family"]} />

      <Chapter id="why" number="01" label="Why Istanbul" title="One meridian, three markets.">
        <div className="grid md:grid-cols-12 gap-8">
          <ol className="md:col-span-7 space-y-8">
            {manifesto.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="flex gap-5"><span className="font-mono text-xs text-periwinkle pt-1.5">0{i + 1}</span><p className={`leading-relaxed ${i === 3 ? "text-2xl font-extrabold tracking-tight" : "text-lg"}`}>{m}</p></li>
              </Reveal>
            ))}
          </ol>
          <div className="md:col-span-5"><Photo src={img("drydock", 1000)} alt="Ship in drydock" label="TUZLA · 40°49'N" ratio="aspect-[3/4]" /></div>
        </div>
      </Chapter>

      <Chapter id="numbers" number="02" label="The show in numbers" title="2024, counted." lead="Every figure below is from the audited Post Show Report of the 2024 edition. 2026 targets: 500 exhibitors, 7,000 visitors.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{STATS.map((s) => <StatCard key={s.label} {...s} />)}</div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[["80%", "intend to return in 2026"], ["74%", "hold purchasing authority"], ["52", "visitor countries"]].map(([v, l]) => (
            <div key={l} className="card-ep p-5"><p className="font-mono text-3xl">{v}</p><p className="text-sm text-muted-foreground mt-1">{l}</p></div>
          ))}
        </div>
        <Link to="/exhibition#facts" data-testid="home-facts-link" className="btn-secondary mt-6">Facts & Figures 2024 <ArrowRight size={16} /></Link>
      </Chapter>

      <Chapter id="exhibit" number="03" label="Exhibit" title="Meet 7,000 decision-makers from 50+ countries — at home or a three-hour flight away.">
        <div className="grid md:grid-cols-2 gap-4">
          {[["Shell scheme from 12 m²", "Turnkey stand, badge allocation, directory profile, MariMatch access.", "/exhibit"], ["Space only from 50 m²", "Raw space for custom builds; hall plan positions released to early bookers.", "/exhibit"], ["Country pavilions", "Netherlands, China, Poland and Africa. National branding with shared services.", "/exhibit#pavilions"], ["Sponsorship", "Platinum to Media. Own the Opening Crossing, the badge or the BlueBridge Stage.", "/exhibit/sponsorship"]].map(([t, d, to]) => (
            <Link key={t} to={to} className="card-ep p-6 group hover:border-periwinkle transition-colors"><p className="font-bold text-lg group-hover:text-periwinkle transition-colors">{t}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p></Link>
          ))}
        </div>
        <Link to="/exhibit/enquiry" data-testid="home-stand-cta" onClick={() => track("stand_enquiry_start", { cta_id: "home-03" })} className="btn-signal mt-6">Book your stand <ArrowRight size={16} /></Link>
      </Chapter>

      <Chapter id="visit" number="04" label="Visit" title="300 suppliers. 30 countries. Three days, one hall." lead="Entry is free for professionals. Register once, receive your badge by e-mail, board the free IDO sea bus.">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6"><Photo src={img("bosphorus", 1000)} alt="Bosphorus ferry" label="IDO · BOSTANCI → YENİKAPI" ratio="aspect-[4/3]" /></div>
          <div className="md:col-span-6 flex flex-col">
            <LinkRow to="/visit" testId="home-visit-travel">Travel & free IDO sea bus</LinkRow>
            <LinkRow to="/visit#hotels" testId="home-visit-hotels">Partner hotels</LinkRow>
            <LinkRow to="/visit/visa" testId="home-visit-visa">Visa invitation letter</LinkRow>
            <LinkRow to="/exhibitors" testId="home-visit-exhibitors">Search the exhibitor directory</LinkRow>
            <div className="mt-6"><RegisterLink content="home-04" /></div>
          </div>
        </div>
      </Chapter>

      <Chapter id="programme" number="05" label="Programme" title="BlueBridge, MariMatch and the Bosphorus Series." lead="Three tracks: the conference, the B2B matchmaking day and the side events that turn the show into a city week.">
        <div className="space-y-3">{sessions.map((s) => <SessionCard key={s.slug} s={s} />)}</div>
        <div className="mt-6 flex flex-wrap gap-3"><Link to="/programme" data-testid="home-programme-link" className="btn-secondary">Full programme <ArrowRight size={16} /></Link><Link to="/programme/bosphorus-series" data-testid="home-bosphorus-link" className="btn-ghost">Bosphorus Series</Link></div>
      </Chapter>

      <Chapter id="pavilions" number="06" label="Country pavilions" title="Four national stages between two continents.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {PAVILIONS.map((p) => (
            <Link key={p.code} to={p.code === "AF" ? "/exhibit#pavilions" : `/exhibitors?pavilion=${encodeURIComponent(p.name + " Pavilion")}`} data-testid={`home-pavilion-${p.code}`} onClick={() => track("pavilion_view", { pavilion: p.code })} className="bg-card p-6 hover:bg-muted transition-colors group">
              <p className="font-mono text-3xl font-medium group-hover:text-periwinkle transition-colors">{p.code}</p>
              <p className="mt-2 font-bold">{p.name}</p>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground mt-1">{p.coord}</p>
            </Link>
          ))}
        </div>
      </Chapter>

      <Chapter id="news" number="07" label="News" title="From the newsroom.">
        <div className="grid md:grid-cols-3 gap-6">{news.map((a) => <NewsCard key={a.slug} a={a} />)}</div>
        <Link to="/news" data-testid="home-news-link" className="btn-secondary mt-8">All news <ArrowRight size={16} /></Link>
      </Chapter>

      <Chapter id="partners" number="08" label="Partners" title="Organised by Rotterdam Ahoy and Bonn Yayıncılık." lead="Supported by the Istanbul & Marmara, Aegean, Mediterranean, Black Sea Regions Chamber of Shipping and the international trade press.">
        <div className="grid sm:grid-cols-3 gap-4">
          {[["Platinum", "1 partner"], ["Gold", "2 partners"], ["Silver", "3 partners"]].map(([t, n]) => (
            <Link key={t} to="/exhibit/sponsorship" className="card-ep p-6 hover:border-periwinkle transition-colors"><p className="eyebrow">{t}</p><p className="mt-2 font-bold">{n} · available</p></Link>
          ))}
        </div>
        <Link to="/partners" data-testid="home-partners-link" className="btn-secondary mt-6">All partners <ArrowRight size={16} /></Link>
      </Chapter>

      <CTABand />
    </div>
  );
}
