import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/api";
import { STATS } from "@/lib/brand";
import { StatCard } from "@/components/brand/Widgets";
import { Photo } from "@/components/site/Photo";
import { PageHero, Chapter, CTABand } from "@/components/site/Blocks";

const editions = [["2024", "441 exhibitors · 35 countries · 5,734 visitors · 52 countries"], ["2022", "Return after the pandemic; Netherlands and China pavilions"], ["2018–2020", "Consolidation at Yenikapı; BlueBridge forum launched"], ["1942", "Europort founded in Rotterdam — the mother show"]];

export default function Exhibition() {
  return (
    <div data-testid="exhibition-page">
      <PageHero eyebrow="The exhibition" title={["The maritime meeting point", "between Europe and Asia."]} lead="Europort Istanbul is the regional edition of Europort Rotterdam — an international exhibition for shipbuilding, ship repair, equipment and services, held every two years on the European shore of the Bosphorus.">
        <Photo src={img("port", 1000)} alt="Port cranes" label="YENİKAPI · 41°00'N" ratio="aspect-[4/3]" />
      </PageHero>

      <Chapter id="about" number="01" label="About" title="What happens here.">
        <div className="grid md:grid-cols-2 gap-8 text-base leading-relaxed">
          <p>Shipyards, shipowners, operators, naval architects and equipment suppliers meet over three days to specify, source and sign. The exhibition floor is organised by product group; the BlueBridge Stage runs the conference in parallel; MariMatch schedules one-to-one meetings.</p>
          <p>Türkiye is a top-five builder of yachts and special-purpose vessels and a major ship-repair hub between the Black Sea and the Mediterranean. Europort Istanbul is where that industry meets its European suppliers and its regional customers in one place.</p>
        </div>
      </Chapter>

      <Chapter id="facts" number="02" label="Facts & Figures 2024" title="Audited, not estimated.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{STATS.map((s) => <StatCard key={s.label} {...s} />)}</div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="card-ep p-6">
            <p className="eyebrow">Visitor profile</p>
            <ul className="mt-3 text-sm space-y-2">
              {[["Shipyards & ship repair", 31], ["Shipowners & operators", 22], ["Equipment & suppliers", 19], ["Naval architecture & class", 9], ["Ports, agencies & institutions", 11], ["Other", 8]].map(([l, p]) => (
                <li key={l} className="flex items-center gap-3"><span className="w-28 shrink-0 font-mono text-xs">{p}%</span><span className="flex-1 h-1.5 bg-muted rounded overflow-hidden"><span className="block h-full bg-periwinkle" style={{ width: `${p * 3}%` }} /></span><span className="w-44 text-xs text-muted-foreground">{l}</span></li>
              ))}
            </ul>
          </div>
          <div className="card-ep p-6">
            <p className="eyebrow">Top visitor countries after Türkiye</p>
            <ol className="mt-3 grid grid-cols-2 gap-2 text-sm">{["Netherlands", "Greece", "Germany", "Italy", "Egypt", "UAE", "Romania", "Bulgaria", "Azerbaijan", "Nigeria"].map((c, i) => <li key={c} className="flex gap-2"><span className="font-mono text-xs text-periwinkle">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}</ol>
            <p className="mt-4 text-xs text-muted-foreground">80% intend to return · 74% purchasing authority or influence.</p>
          </div>
        </div>
      </Chapter>

      <Chapter id="venue" number="03" label="Venue" title="Yenikapı Expo Center." lead="On the Marmara shore of the historic peninsula. Metro, Marmaray rail and the IDO sea bus terminal are at the door; the airport is 45 minutes by road.">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7"><Photo src={img("galata", 1200)} alt="Istanbul historic peninsula" label="41°00'N 28°57'E" ratio="aspect-[16/10]" /></div>
          <div className="md:col-span-5 space-y-3 text-sm">
            {[["Halls", "Halls 1–5 · single level · 25,000 m² gross"], ["Opening hours", "10:00–18:00 daily · 4–6 November 2026"], ["Access", "Yenikapı metro & Marmaray · IDO terminal 200 m"], ["Address", "Yenikapı Expo Center, Fatih, Istanbul"]].map(([k, v]) => <div key={k} className="card-ep p-4"><p className="eyebrow">{k}</p><p className="mt-1 font-bold">{v}</p></div>)}
          </div>
        </div>
      </Chapter>

      <Chapter id="history" number="04" label="Europort family" title="Rotterdam since 1942. Istanbul since 2009.">
        <ol className="divide-y divide-border border-y border-border">{editions.map(([y, d]) => <li key={y} className="py-4 grid sm:grid-cols-12 gap-3"><span className="sm:col-span-3 font-mono text-lg">{y}</span><span className="sm:col-span-9 text-sm text-muted-foreground">{d}</span></li>)}</ol>
        <a href="https://www.europort.nl" target="_blank" rel="noopener noreferrer" data-testid="exhibition-europort-nl" className="btn-secondary mt-6">Europort Rotterdam <ArrowRight size={16} /></a>
      </Chapter>
      <CTABand />
    </div>
  );
}
