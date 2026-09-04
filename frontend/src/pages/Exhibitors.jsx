import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { api } from "@/lib/api";
import { track } from "@/lib/track";
import { PageHero, Empty } from "@/components/site/Blocks";
import { ExhibitorCard } from "@/components/site/Cards";

const FILTERS = [["country", "Country", "countries"], ["category", "Category", "categories"], ["pavilion", "Pavilion", "pavilions"], ["hall", "Hall", "halls"]];

export default function Exhibitors() {
  const [params, setParams] = useSearchParams();
  const [facets, setFacets] = useState(null);
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [q, setQ] = useState(params.get("q") || "");
  const page = Number(params.get("page") || 1);

  useEffect(() => { api.get("/exhibitors/facets").then((r) => setFacets(r.data)); }, []);
  useEffect(() => {
    const p = Object.fromEntries(params.entries());
    api.get("/exhibitors", { params: { ...p, limit: 24 } }).then((r) => setData(r.data));
    if (p.q) track("exhibitor_search", { query: p.q });
  }, [params]);

  const setParam = (k, v) => { const n = new URLSearchParams(params); v ? n.set(k, v) : n.delete(k); n.delete("page"); setParams(n); };
  const submit = (e) => { e.preventDefault(); setParam("q", q.trim()); };
  const active = FILTERS.filter(([k]) => params.get(k));

  return (
    <div data-testid="exhibitors-page">
      <PageHero eyebrow={`Exhibitor directory · ${facets?.total ?? "—"} companies · 2024 list, 2026 updating`} title={["Who is exhibiting.", "Search by name, stand, country."]} compact />
      <form onSubmit={submit} className="card-ep p-3 flex gap-2" data-testid="exhibitor-search-form">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} data-testid="exhibitor-search-input" placeholder="Company name or stand number (e.g. 3.112)" className="field pl-9 border-0 bg-transparent" /></div>
        <button type="submit" data-testid="exhibitor-search-submit" className="btn-primary">Search</button>
      </form>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {FILTERS.map(([k, label, key]) => (
          <select key={k} value={params.get(k) || ""} onChange={(e) => setParam(k, e.target.value)} data-testid={`filter-${k}`} className="field">
            <option value="">{label} · all</option>
            {(facets?.[key] || []).map((f) => <option key={f.value} value={f.value}>{f.value} ({f.count})</option>)}
          </select>
        ))}
      </div>
      {(active.length > 0 || params.get("q")) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          {params.get("q") && <button type="button" onClick={() => { setQ(""); setParam("q", ""); }} className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-border flex items-center gap-1">"{params.get("q")}" <X size={10} /></button>}
          {active.map(([k]) => <button key={k} type="button" data-testid={`clear-${k}`} onClick={() => setParam(k, "")} className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-periwinkle text-white flex items-center gap-1">{params.get(k)} <X size={10} /></button>)}
          <button type="button" data-testid="clear-all" onClick={() => { setQ(""); setParams({}); }} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground underline underline-offset-4">Clear all</button>
        </div>
      )}
      <p data-testid="exhibitor-count" className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">{data.total} results · page {page} of {data.pages}</p>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10" data-testid="exhibitor-grid">
        {data.items.map((e) => <ExhibitorCard key={e.slug} e={e} />)}
      </div>
      {data.items.length === 0 && <Empty>No exhibitors match. Clear a filter or try a shorter search.</Empty>}
      {data.pages > 1 && (
        <div className="flex gap-2 justify-center pb-20" data-testid="pagination">
          <button type="button" disabled={page <= 1} onClick={() => setParams((p) => { const n = new URLSearchParams(p); n.set("page", page - 1); return n; })} data-testid="page-prev" className="btn-secondary disabled:opacity-40">Previous</button>
          <button type="button" disabled={page >= data.pages} onClick={() => setParams((p) => { const n = new URLSearchParams(p); n.set("page", page + 1); return n; })} data-testid="page-next" className="btn-secondary disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
