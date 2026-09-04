import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PageHero, CTABand, Empty } from "@/components/site/Blocks";
import { NewsCard } from "@/components/site/Cards";

export default function News() {
  const [items, setItems] = useState(null);
  useEffect(() => { api.get("/news").then((r) => setItems(r.data)); }, []);
  const [first, ...rest] = items || [];
  return (
    <div data-testid="news-page">
      <PageHero eyebrow="News & media" title={["From the newsroom.", "Pavilions, programme, practicalities."]} compact />
      {!items && <Empty>Loading…</Empty>}
      {first && <div className="grid lg:grid-cols-12 gap-8"><div className="lg:col-span-8"><NewsCard a={first} big /></div><div className="lg:col-span-4 space-y-8">{rest.slice(0, 2).map((a) => <NewsCard key={a.slug} a={a} />)}</div></div>}
      <div className="mt-16 grid md:grid-cols-3 gap-8">{rest.slice(2).map((a) => <NewsCard key={a.slug} a={a} />)}</div>
      <CTABand />
    </div>
  );
}
