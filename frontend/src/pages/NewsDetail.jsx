import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";
import { Eyebrow } from "@/components/brand/Primitives";
import { CornerMarks } from "@/components/brand/Primitives";
import { Empty, CTABand } from "@/components/site/Blocks";
import { fmtDay } from "@/components/site/Cards";

export default function NewsDetail() {
  const { slug } = useParams();
  const [a, setA] = useState(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => { setA(null); api.get(`/news/${slug}`).then((r) => setA(r.data)).catch(() => setMissing(true)); }, [slug]);
  if (missing) return <Empty>Article not found. <Link to="/news" className="underline">Back to news</Link></Empty>;
  if (!a) return <Empty>Loading…</Empty>;
  return (
    <article data-testid="news-detail" className="py-14 lg:py-20">
      <Link to="/news" data-testid="back-to-news" className="inline-flex items-center gap-2 text-sm font-bold hover:text-periwinkle transition-colors"><ArrowLeft size={14} /> News</Link>
      <div className="mt-8 max-w-3xl">
        <Eyebrow>{a.category} · {fmtDay(a.date)}</Eyebrow>
        <h1 data-testid="article-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">{a.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{a.excerpt}</p>
      </div>
      <div className="mt-10 relative aspect-[21/9] rounded-lg overflow-hidden border border-border text-white"><img src={a.image} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,37,92,0.6), transparent 60%)" }} /><CornerMarks label="EP26 · PRESS" /></div>
      <div className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed">{a.body.split("\n\n").map((p, i) => <p key={i} className={i === 0 ? "text-xl font-semibold" : ""}>{p}</p>)}</div>
      <div className="mt-10 card-ep p-5 max-w-3xl text-sm"><p className="eyebrow">Press contact</p><p className="mt-1 font-mono text-xs">press@europort.com.tr · <Link to="/media" className="underline underline-offset-4">Media kit & accreditation</Link></p></div>
      <CTABand />
    </article>
  );
}
