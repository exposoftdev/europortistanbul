import { Compass } from "lucide-react";
import { SectionShell, Contours, CornerMarks } from "@/components/brand/Primitives";
import { SignalFlagRow } from "@/components/brand/SignalFlags";

const Tile = ({ title, note, children, testId }) => (
  <div data-testid={testId} className="card-ep p-6 relative overflow-hidden min-h-[220px] flex flex-col">
    <div className="flex-1 relative">{children}</div>
    <p className="mt-4 font-bold text-sm relative">{title}</p>
    <p className="text-xs text-muted-foreground relative">{note}</p>
  </div>
);

export const GraphicSection = () => (
  <SectionShell id="graphic" number="05" label="Graphic language" title="Charts, contours, flags and coordinates." lead="The visual vocabulary comes from the instruments of navigation, not from decoration. Every device below is drawn in code, so it scales from a favicon to a stand façade without a single raster asset.">
    <div className="grid sm:grid-cols-2 gap-4">
      <Tile testId="gfx-contours" title="Bathymetric contours" note="SVG depth curves at 8–12% opacity behind hero and chapter headers.">
        <div className="relative h-32 text-periwinkle"><Contours /></div>
      </Tile>
      <Tile testId="gfx-corners" title="Coordinate corner marks" note="1 px corner brackets with a lat/long or code stamp. Frames photography and cards.">
        <div className="relative h-32 border border-border/60 rounded"><CornerMarks label="41°00'N 28°57'E" /></div>
      </Tile>
      <Tile testId="gfx-flags" title="Signal flags in brand colours" note="International code flags redrawn in navy, periwinkle, signal and white. Section dividers, pavilion badges.">
        <div className="h-32 flex items-center"><SignalFlagRow word="EPIBCZ" size={64} /></div>
      </Tile>
      <Tile testId="gfx-compass" title="Compass, 60-second rotation" note="Minimal geometric rose in background overlays. Respects reduced-motion.">
        <div className="h-32 grid place-items-center text-periwinkle"><Compass size={88} strokeWidth={1} className="compass-spin" /></div>
      </Tile>
      <Tile testId="gfx-numbering" title="Numbered editorial flow" note="Two-digit chapter labels in IBM Plex Mono. The signature of the site's structure.">
        <div className="h-32 flex flex-col justify-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
          <p><span className="text-periwinkle">01 //</span> Why Istanbul</p>
          <p><span className="text-periwinkle">02 //</span> The show in numbers</p>
          <p><span className="text-periwinkle">03 //</span> Exhibit</p>
          <p className="text-muted-foreground">… 08 // Partners</p>
        </div>
      </Tile>
      <Tile testId="gfx-photo" title="Photography rule" note="Real shipyards, halls and the Bosphorus, masked into navy from one edge. No stock handshakes.">
        <div className="h-32 rounded overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1602575051429-c502cac0d3e8?crop=entropy&cs=srgb&fm=jpg&q=60&w=800" alt="Drydock shipyard" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #07255C 0%, rgba(7,37,92,0.55) 45%, transparent 100%)" }} />
          <p className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-white">TUZLA · 40°49'N 29°18'E</p>
        </div>
      </Tile>
    </div>
  </SectionShell>
);
