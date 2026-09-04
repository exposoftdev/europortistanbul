import { PageHero } from "@/components/site/Blocks";
import { LeadForm, FORMS } from "@/components/site/LeadForm";

const COPY = {
  stand: { eyebrow: "Exhibit · Stand enquiry", title: ["Book your stand.", "Positions in order of enquiry."], lead: "Tell us what you exhibit and how much space you need. The sales team replies with a hall plan proposal within two working days.", aside: [["Shell scheme", "from 12 m²"], ["Space only", "from 50 m²"], ["Pavilion module", "9–18 m²"]] },
  sponsorship: { eyebrow: "Exhibit · Sponsorship", title: ["Own the meridian.", "Platinum to Media."], lead: "From naming the Opening Crossing to a session on the BlueBridge Stage. Tell us your objective; we propose a package.", aside: [["Platinum", "1 available"], ["Gold", "2 available"], ["Silver", "3 available"]] },
  visa: { eyebrow: "Visit · Visa", title: ["Visa invitation letter.", "Issued within five working days."], lead: "Registered visitors and exhibitors from countries requiring a visa for Türkiye can request an official invitation letter from the organiser.", aside: [["Processing", "5 working days"], ["Requirement", "Completed registration"], ["Format", "Signed PDF by e-mail"]] },
  press: { eyebrow: "Media · Accreditation", title: ["Press accreditation.", "Cover the show from the inside."], lead: "Accredited media receive a press badge, access to the press room, the photo archive and interview scheduling with exhibitors and speakers.", aside: [["Press room", "Hall 2, mezzanine"], ["Photo archive", "Daily, 18:00"], ["Contact", "press@europort.com.tr"]] },
};

export default function FormPage({ type }) {
  const c = COPY[type];
  return (
    <div data-testid={`form-page-${type}`}>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} compact />
      <div className="grid lg:grid-cols-12 gap-8 pb-20">
        <div className="lg:col-span-8"><LeadForm type={type} /></div>
        <aside className="lg:col-span-4 space-y-3">
          {c.aside.map(([k, v]) => <div key={k} className="card-ep p-5"><p className="eyebrow">{k}</p><p className="mt-1 font-bold">{v}</p></div>)}
          <div className="card-ep p-5"><p className="eyebrow">What happens next</p><p className="mt-2 text-sm text-muted-foreground">You receive an instant confirmation e-mail. The team answers your {FORMS[type].title.toLowerCase()} within two working days.</p></div>
        </aside>
      </div>
    </div>
  );
}
