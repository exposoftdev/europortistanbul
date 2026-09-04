import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { Eyebrow } from "@/components/brand/Primitives";
import { Empty, RegisterLink } from "@/components/site/Blocks";
import { fmtDay, Meta } from "@/components/site/Cards";

export default function SessionDetail() {
  const { slug } = useParams();
  const [s, setS] = useState(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => { setS(null); api.get(`/programme/${slug}`).then((r) => setS(r.data)).catch(() => setMissing(true)); }, [slug]);
  if (missing) return <Empty>Session not found. <Link to="/programme" className="underline">Back to programme</Link></Empty>;
  if (!s) return <Empty>Loading…</Empty>;
  return (
    <div data-testid="session-detail" className="py-14 lg:py-20">
      <Link to="/programme" data-testid="back-to-programme" className="inline-flex items-center gap-2 text-sm font-bold hover:text-periwinkle transition-colors"><ArrowLeft size={14} /> Programme</Link>
      <div className="mt-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <Eyebrow>{s.track} · {s.tags.join(" · ")}</Eyebrow>
          <h1 data-testid="session-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">{s.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">{s.summary}</p>
          {s.speakers.length > 0 && (
            <div className="mt-10"><Eyebrow>Speakers</Eyebrow>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">{s.speakers.map((sp, i) => <li key={i} className="card-ep p-4 flex gap-3 items-center"><span className="w-10 h-10 rounded-full bg-periwinkle/30 border border-periwinkle shrink-0" /><div><p className="font-bold text-sm">{sp.name}</p><p className="text-xs text-muted-foreground">{sp.role}</p></div></li>)}</ul>
            </div>
          )}
        </div>
        <div className="lg:col-span-4 space-y-3">
          <div className="card-ep p-5 space-y-3"><Meta icon={Calendar}>{fmtDay(s.day)}</Meta><Meta icon={Clock}>{s.start}–{s.end}</Meta><Meta icon={MapPin}>{s.venue}</Meta></div>
          <div className="card-ep p-5"><p className="eyebrow">Access</p><p className="mt-1 text-sm">Free with visitor registration or exhibitor pass.</p><div className="mt-4"><RegisterLink content={`session-${s.slug}`} className="btn-signal w-full justify-center" /></div></div>
        </div>
      </div>
    </div>
  );
}
