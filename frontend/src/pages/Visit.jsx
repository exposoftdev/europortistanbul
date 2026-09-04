import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { img, SITE } from "@/lib/api";
import { track } from "@/lib/track";
import { Photo } from "@/components/site/Photo";
import { PageHero, Chapter, RegisterLink, CTABand } from "@/components/site/Blocks";
import { LeadForm } from "@/components/site/LeadForm";

const ics = () => {
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Europort Istanbul//EN", "BEGIN:VEVENT", "DTSTART;VALUE=DATE:20261104", "DTEND;VALUE=DATE:20261107", "SUMMARY:Europort Istanbul 2026", `LOCATION:${SITE.venue}`, "DESCRIPTION:Two Continents. One Course. International maritime exhibition.", "URL:https://europort.com.tr", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" })); a.download = "europort-istanbul-2026.ics"; a.click();
  track("add_to_calendar");
};

const hotels = [["Historic peninsula", "Sultanahmet · Sirkeci", "10 min by metro"], ["Business district", "Levent · Maslak", "35 min by metro"], ["Asian shore", "Kadıköy · Bostancı", "45 min by free IDO sea bus"]];

export default function Visit() {
  return (
    <div data-testid="visit-page">
      <PageHero eyebrow="Visit" title={["300 suppliers. 30 countries.", "Three days on the Bosphorus."]} lead="Entry is free for maritime professionals. Register once, receive your badge by e-mail, walk in. Sessions, MariMatch meetings and the sea bus are included.">
        <div className="card-ep p-6 space-y-3">
          <p className="eyebrow">Registration</p>
          <p className="font-bold text-lg">Free · badge by e-mail</p>
          <RegisterLink content="visit-hero" className="btn-signal w-full justify-center" />
          <button type="button" onClick={ics} data-testid="visit-add-calendar" className="btn-secondary w-full justify-center"><Calendar size={16} /> Add to calendar</button>
        </div>
      </PageHero>

      <Chapter id="why" number="01" label="Why visit" title="Specify, source and sign in three days.">
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Newbuild & repair", "Meet Tuzla, Yalova and Black Sea yards with capacity through 2030."], ["Equipment sourcing", "Propulsion, deck, navigation, coatings, HVAC — 11 product groups, one hall."], ["BlueBridge Forum", "Three days of sessions on retrofit, finance, digital bridge and regional markets."], ["MariMatch", "Pre-scheduled 20-minute B2B meetings, free for registered visitors."]].map(([t, d]) => <div key={t} className="card-ep p-6"><p className="font-bold text-lg">{t}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>)}
        </div>
      </Chapter>

      <Chapter id="travel" number="02" label="Travel" title="Free IDO sea bus. 45 minutes across the strait." lead="Dedicated services from Bostancı and Pendik every show morning, returning at 18:30. Show your badge and board. The 4 November service is the Opening Crossing.">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6"><Photo src={img("bosphorus", 1000)} alt="Ferry crossing the Bosphorus" label="IDO · 08:15 DEP" ratio="aspect-[4/3]" /></div>
          <div className="md:col-span-6 space-y-3 text-sm">
            {[["Bostancı → Yenikapı", "08:15 · 09:00 daily"], ["Pendik → Yenikapı", "08:00 daily"], ["Yenikapı → Asian shore", "18:30 daily"], ["Metro / Marmaray", "Yenikapı station, 200 m"], ["Istanbul Airport", "45 min by road · Havaist bus to Yenikapı"], ["Sabiha Gökçen Airport", "Marmaray from Pendik, 55 min"]].map(([k, v]) => <div key={k} className="card-ep p-4 flex justify-between gap-4"><span className="font-bold">{k}</span><span className="font-mono text-xs text-muted-foreground text-right">{v}</span></div>)}
          </div>
        </div>
      </Chapter>

      <Chapter id="hotels" number="03" label="Hotels" title="Three districts, negotiated rates.">
        <div className="grid md:grid-cols-3 gap-4">
          {hotels.map(([t, a, d]) => <a key={t} href="https://europort.com.tr/accommodation/" target="_blank" rel="noopener noreferrer" data-testid={`hotel-${t.split(" ")[0].toLowerCase()}`} onClick={() => track("outbound_hotel_click", { district: t })} className="card-ep p-6 group hover:border-periwinkle transition-colors"><p className="eyebrow">{a}</p><p className="mt-2 font-bold text-lg group-hover:text-periwinkle transition-colors flex items-center gap-2">{t} <ArrowUpRight size={14} /></p><p className="mt-1 text-sm text-muted-foreground">{d}</p></a>)}
        </div>
      </Chapter>

      <Chapter id="visa" number="04" label="Visa" title="Invitation letter within five working days." lead="Visitors from countries that require a visa for Türkiye can request an official invitation letter once registered.">
        <Link to="/visit/visa" data-testid="visit-visa-link" className="btn-secondary">Request a visa letter <ArrowRight size={16} /></Link>
      </Chapter>

      <Chapter id="interest" number="05" label="Visitor interest" title="Tell us what you are looking for." lead="Optional. Helps us match you to exhibitors and sessions, and keeps you on the pre-show list for hall plans and MariMatch.">
        <LeadForm type="visitor" compact />
      </Chapter>
      <CTABand />
    </div>
  );
}
