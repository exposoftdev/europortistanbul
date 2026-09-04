import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eyebrow } from "@/components/brand/Primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Report() {
  const [parts, setParts] = useState([]);
  const [active, setActive] = useState(null);
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/report`).then((r) => { setParts(r.data); setActive(r.data[0]?.slug); }).catch(() => setError("Report index could not be loaded."));
  }, []);

  useEffect(() => {
    if (!active) return;
    setDoc(null);
    axios.get(`${API}/report/${active}`).then((r) => setDoc(r.data)).catch(() => setError("Report part could not be loaded."));
  }, [active]);

  return (
    <div data-testid="report-page" className="py-16 lg:py-24 grid lg:grid-cols-12 gap-12">
      <aside className="lg:col-span-3">
        <Eyebrow>Phase 1 · Strategy report</Eyebrow>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Europort Istanbul 2026</h1>
        <p className="mt-2 text-sm text-muted-foreground">Report language: Turkish (client). Site language: English.</p>
        <nav className="mt-8 flex flex-col gap-1 lg:sticky lg:top-28" data-testid="report-nav">
          {parts.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              data-testid={`report-tab-${i + 1}`}
              onClick={() => setActive(p.slug)}
              className={`text-left px-3 py-2.5 rounded-md text-sm transition-colors duration-300 border-l-2 ${active === p.slug ? "border-signal bg-muted font-bold" : "border-transparent hover:bg-muted text-muted-foreground"}`}
            >
              <span className="font-mono text-[10px] mr-2 text-periwinkle">{String(i + 1).padStart(2, "0")}</span>{p.title.replace(/^Bölüm \d+ · /, "").replace(/^Europort İstanbul 2026 — /, "")}
            </button>
          ))}
        </nav>
      </aside>
      <article className="lg:col-span-9 min-w-0 prose-ep" data-testid="report-content">
        {error && <p data-testid="report-error" className="text-destructive">{error}</p>}
        {!doc && !error && <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Loading…</p>}
        {doc && <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>}
      </article>
    </div>
  );
}
