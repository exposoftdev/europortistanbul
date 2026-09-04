import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { track } from "@/lib/track";
import { PageHero, Chapter } from "@/components/site/Blocks";

const kit = [["Logo pack", "White & navy PNG @4x · vector on request", "/logo-europort-istanbul-white.png"], ["Key facts 2024", "One page, PDF-ready copy", "/exhibition#facts"], ["Brand guidelines", "Colours, type, usage rules", "/brand"], ["Boilerplate", "Corporate descriptor and theme line", "#boilerplate"]];

export default function Media() {
  return (
    <div data-testid="media-page">
      <PageHero eyebrow="Media" title={["Press room.", "Everything in one place."]} lead="Accreditation, the media kit, the photo archive and the boilerplate. Press contact: press@europort.com.tr.">
        <Link to="/media/accreditation" data-testid="media-accreditation-cta" className="card-ep p-6 block group hover:border-periwinkle transition-colors"><p className="eyebrow">Accreditation</p><p className="mt-2 text-xl font-extrabold group-hover:text-periwinkle transition-colors">Apply for a press badge</p><span className="btn-ghost mt-3 px-0">Apply <ArrowRight size={14} /></span></Link>
      </PageHero>
      <Chapter id="kit" number="01" label="Media kit" title="Download, don't ask.">
        <div className="grid sm:grid-cols-2 gap-4">
          {kit.map(([t, d, href]) => <a key={t} href={href} data-testid={`media-kit-${t.split(" ")[0].toLowerCase()}`} onClick={() => track("press_kit_download", { item: t })} className="card-ep p-6 flex justify-between gap-4 group hover:border-periwinkle transition-colors"><div><p className="font-bold text-lg group-hover:text-periwinkle transition-colors">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div><Download size={18} className="shrink-0 text-muted-foreground" /></a>)}
        </div>
      </Chapter>
      <Chapter id="boilerplate" number="02" label="Boilerplate" title="Copy and paste.">
        <div className="card-ep p-6 lg:p-8 space-y-4 text-base leading-relaxed">
          <p><strong>Europort Istanbul</strong> is the international maritime exhibition for shipbuilding, ship repair, equipment and services, held every two years at Yenikapı Expo Center, Istanbul. The 2026 edition takes place on 4–6 November under the theme <em>Two Continents. One Course.</em> and features country pavilions from the Netherlands, China, Poland and — for the first time — Africa, the BlueBridge Maritime Istanbul Forum, MariMatch B2B meetings and the Bosphorus Series of side events.</p>
          <p>Europort Istanbul is the regional edition of Europort Rotterdam (est. 1942) and is organised by Rotterdam Ahoy and Bonn Yayıncılık with the support of the Istanbul & Marmara, Aegean, Mediterranean, Black Sea Regions Chamber of Shipping.</p>
          <p className="font-mono text-xs text-muted-foreground">Bridging Continents, Connecting Maritime Worlds · europort.com.tr</p>
        </div>
      </Chapter>
    </div>
  );
}
