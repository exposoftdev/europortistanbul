import { BANNED_WORDS, VOICE_PAIRS } from "@/lib/brand";
import { SectionShell } from "@/components/brand/Primitives";

export const VoiceSection = () => (
  <SectionShell id="voice" number="08" label="Voice" title="Short sentences. Numbers. One nautical word." lead="The brand speaks like an engineer who has been to sea: decisive, precise, unhurried. No marketing filler. When there is a number, use the number.">
    <div className="space-y-3" data-testid="voice-pairs">
      {VOICE_PAIRS.map((p, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
          <div className="bg-card p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Before</p><p className="mt-2 text-sm line-through decoration-signal/70 text-muted-foreground">{p.before}</p></div>
          <div className="bg-card p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-periwinkle">After</p><p className="mt-2 font-bold">{p.after}</p></div>
        </div>
      ))}
    </div>
    <div className="mt-6 grid md:grid-cols-2 gap-4">
      <div className="card-ep p-6">
        <p className="eyebrow">Rules</p>
        <ul className="mt-3 text-sm space-y-2">
          <li>Sentence case in headlines. Uppercase only in mono tags.</li>
          <li>At most one nautical term per sentence: course, chart, berth, meridian, signal.</li>
          <li>"Bridging" survives only in the corporate descriptor line.</li>
          <li>Address the reader directly. Say what happens next.</li>
        </ul>
      </div>
      <div className="card-ep p-6">
        <p className="eyebrow">Banned</p>
        <div className="mt-3 flex flex-wrap gap-2">{BANNED_WORDS.map((w) => <span key={w} className="font-mono text-xs px-2.5 py-1 rounded border border-border line-through text-muted-foreground">{w}</span>)}</div>
      </div>
    </div>
  </SectionShell>
);
