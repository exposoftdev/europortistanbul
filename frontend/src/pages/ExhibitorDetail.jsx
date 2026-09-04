import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { Eyebrow } from "@/components/brand/Primitives";
import { ExhibitorCard } from "@/components/site/Cards";
import { Empty, CTABand } from "@/components/site/Blocks";

export default function ExhibitorDetail() {
  const { slug } = useParams();
  const [e, setE] = useState(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => { setE(null); api.get(`/exhibitors/${slug}`).then((r) => setE(r.data)).catch(() => setMissing(true)); }, [slug]);
  if (missing) return <Empty>Exhibitor not found. <Link to="/exhibitors" className="underline">Back to directory</Link></Empty>;
  if (!e) return <Empty>Loading…</Empty>;
  return (
    <div data-testid="exhibitor-detail" className="py-14 lg:py-20">
      <Link to="/exhibitors" data-testid="back-to-directory" className="inline-flex items-center gap-2 text-sm font-bold hover:text-periwinkle transition-colors"><ArrowLeft size={14} /> Directory</Link>
      <div className="mt-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <Eyebrow>{e.category}{e.pavilion ? ` · ${e.pavilion}` : ""}</Eyebrow>
          <h1 data-testid="exhibitor-name" className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">{e.name}</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">{e.description}</p>
        </div>
        <div className="lg:col-span-4 space-y-3">
          <div className="card-ep p-5"><p className="eyebrow">Stand</p><p className="mt-1 font-mono text-3xl">{e.stand}</p><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1 flex items-center gap-1"><MapPin size={11} /> {e.hall}</p></div>
          <div className="card-ep p-5"><p className="eyebrow">Country</p><p className="mt-1 font-bold">{e.country}</p></div>
          <div className="card-ep p-5"><p className="eyebrow">Edition</p><p className="mt-1 font-bold">{e.edition} · profile updating for 2026</p></div>
        </div>
      </div>
      {e.related?.length > 0 && <div className="mt-20"><Eyebrow>Also in {e.category}</Eyebrow><div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{e.related.map((r) => <ExhibitorCard key={r.slug} e={r} />)}</div></div>}
      <CTABand />
    </div>
  );
}
