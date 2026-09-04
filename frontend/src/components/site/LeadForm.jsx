import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { getUtm, track } from "@/lib/track";

const BASE = [
  { k: "name", label: "Full name", req: true },
  { k: "email", label: "Work e-mail", type: "email", req: true },
  { k: "company", label: "Company", req: true },
  { k: "country", label: "Country", req: true },
  { k: "phone", label: "Phone (with country code)" },
];

export const FORMS = {
  stand: { title: "Stand enquiry", event: "stand_enquiry_submit", extra: [
    { k: "stand_size", label: "Stand size", options: ["12–24 m²", "25–50 m²", "51–100 m²", "100+ m²", "Country pavilion"] },
    { k: "products", label: "Products / services to exhibit" },
  ], message: "Anything we should know (location preference, previous participation…)" },
  sponsorship: { title: "Sponsorship enquiry", event: "sponsor_enquiry_submit", extra: [
    { k: "tier", label: "Tier of interest", options: ["Platinum", "Gold", "Silver", "Media", "Bosphorus Series", "Not sure yet"] },
    { k: "objective", label: "Main objective", options: ["Brand visibility", "Lead generation", "Thought leadership", "Hosting a delegation"] },
  ], message: "Tell us about your goals for Istanbul" },
  visa: { title: "Visa invitation letter", event: "visa_request_submit", extra: [
    { k: "passport_country", label: "Passport country", req: true },
    { k: "role", label: "You are attending as", options: ["Visitor", "Exhibitor", "Press", "Speaker"] },
  ], message: "Full name as in passport and passport number (optional at this stage)" },
  press: { title: "Press accreditation", event: "press_accreditation_submit", extra: [
    { k: "outlet", label: "Media outlet", req: true },
    { k: "media_type", label: "Media type", options: ["Trade press", "Daily / news", "Broadcast", "Online / blog", "Freelance"] },
  ], message: "Coverage plans, interview requests" },
  visitor: { title: "Visitor interest", event: "visitor_interest_submit", extra: [
    { k: "interest", label: "Primary interest", options: ["Newbuild", "Repair & retrofit", "Equipment sourcing", "Conference", "B2B meetings"] },
    { k: "days", label: "Days you plan to attend", options: ["4 Nov", "5 Nov", "6 Nov", "All three days"] },
  ], message: "What are you looking for in Istanbul?" },
  contact: { title: "Contact the team", event: "contact_submit", extra: [
    { k: "topic", label: "Topic", options: ["Exhibiting", "Visiting", "Sponsorship", "Programme", "Press", "Other"] },
  ], message: "Your message", reqMessage: true },
};

const Field = ({ f, value, onChange }) => (
  <div>
    <label htmlFor={`lf-${f.k}`} className="text-xs font-bold">{f.label}{f.req && <span className="text-signal"> *</span>}</label>
    {f.options ? (
      <select id={`lf-${f.k}`} data-testid={`lead-field-${f.k}`} className="field mt-1.5" value={value} required={f.req} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>{f.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input id={`lf-${f.k}`} data-testid={`lead-field-${f.k}`} type={f.type || "text"} className="field mt-1.5" value={value} required={f.req} onChange={(e) => onChange(e.target.value)} />
    )}
  </div>
);

export const LeadForm = ({ type, compact = false }) => {
  const cfg = FORMS[type];
  const [v, setV] = useState({ consent: false, website: "", message: "" });
  const [state, setState] = useState("idle");
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  const submit = async (e) => {
    e.preventDefault();
    if (!v.consent) return toast.error("Please accept the privacy notice.");
    setState("busy");
    const fields = Object.fromEntries(cfg.extra.map((f) => [f.k, v[f.k] || ""]));
    try {
      const r = await api.post("/leads", { type, name: v.name, email: v.email, company: v.company || "", country: v.country || "", phone: v.phone || "", message: v.message, fields, consent: true, website: v.website, utm: getUtm(), page: window.location.pathname });
      track(cfg.event, { lead_type: type, email_status: r.data.email_status });
      setState("done");
    } catch (err) {
      setState("idle");
      toast.error(err.response?.data?.detail || "Could not send. Please try again.");
    }
  };

  if (state === "done") return (
    <div data-testid="lead-success" className="card-ep p-8 lg:p-10 border-l-4 border-l-signal">
      <p className="eyebrow">Received</p>
      <p className="mt-3 text-2xl font-black tracking-tight flex items-center gap-3"><Check className="text-signal" /> Thank you. Course set.</p>
      <p className="mt-3 text-muted-foreground">We have your {cfg.title.toLowerCase()}. A confirmation is on its way to {v.email}; the team replies within two working days.</p>
    </div>
  );

  return (
    <form onSubmit={submit} data-testid={`lead-form-${type}`} className={`card-ep ${compact ? "p-6" : "p-6 lg:p-8"} space-y-4`}>
      <div><p className="eyebrow">{cfg.title}</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {BASE.map((f) => <Field key={f.k} f={f} value={v[f.k] || ""} onChange={set(f.k)} />)}
        {cfg.extra.map((f) => <Field key={f.k} f={f} value={v[f.k] || ""} onChange={set(f.k)} />)}
      </div>
      <div>
        <label htmlFor="lf-message" className="text-xs font-bold">{cfg.message}{cfg.reqMessage && <span className="text-signal"> *</span>}</label>
        <textarea id="lf-message" data-testid="lead-field-message" rows={compact ? 3 : 4} className="field mt-1.5 h-auto py-3" value={v.message} required={cfg.reqMessage} onChange={(e) => set("message")(e.target.value)} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website")(e.target.value)} className="hidden" aria-hidden="true" />
      <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
        <input type="checkbox" data-testid="lead-field-consent" className="mt-0.5 accent-[#EA580C]" checked={v.consent} onChange={(e) => set("consent")(e.target.checked)} />
        I agree that Europort Istanbul may store this information and contact me about the 2026 exhibition (GDPR / KVKK). <span className="text-signal">*</span>
      </label>
      <button type="submit" disabled={state === "busy"} data-testid="lead-submit" className="btn-signal w-full sm:w-auto justify-center disabled:opacity-60">
        {state === "busy" ? "Sending…" : `Send ${cfg.title.toLowerCase()}`} <ArrowRight size={16} />
      </button>
    </form>
  );
};

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leads", { type: "newsletter", email, consent: true, utm: getUtm(), page: window.location.pathname });
      track("newsletter_subscribe"); setDone(true);
    } catch { toast.error("Could not subscribe. Check the address."); }
  };
  if (done) return <p data-testid="newsletter-success" className="text-sm font-bold flex items-center gap-2"><Check size={16} className="text-signal" /> You are on the list.</p>;
  return (
    <form onSubmit={submit} data-testid="newsletter-form" className="flex gap-2">
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Work e-mail" data-testid="newsletter-email" className="field" />
      <button type="submit" data-testid="newsletter-submit" className="btn-primary shrink-0">Subscribe</button>
    </form>
  );
};
