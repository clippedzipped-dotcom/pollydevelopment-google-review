import Link from "next/link";
import { SiteHeader } from "@/components/review/SiteHeader";
import { AmbientShaderCanvas } from "@/components/kitchen/AmbientShaderCanvas";
import { ReviewProductShowroom } from "@/components/review/ReviewProductShowroom";
import { InteractiveTapDemoPhone } from "@/components/review/InteractiveTapDemoPhone";
import { ImpactMetricsRibbon } from "@/components/review/ImpactMetricsRibbon";
import { ComparisonMatrix } from "@/components/review/ComparisonMatrix";
import { InteractiveStepsBento } from "@/components/review/InteractiveStepsBento";
import { ReviewRoiCalculator } from "@/components/review/ReviewRoiCalculator";
import { HardwareOscilloscope } from "@/components/review/HardwareOscilloscope";
import { DirectContactTeam } from "@/components/review/DirectContactTeam";
import { FaqAccordion } from "@/components/review/FaqAccordion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0E1210] text-[#F3F5F0] font-sans antialiased selection:bg-[#506654] selection:text-white overflow-x-clip">
      {/* AMBIENT CURSOR-REACTIVE SHADER CANVAS (Subtle natural light) */}
      <AmbientShaderCanvas />

      {/* FIXED SITE HEADER (With Web Audio Sound Controller) */}
      <SiteHeader />

      {/* HERO SECTION: Interactive Tap Demo Story (Authentic PollyDevelopment Sticky Scroll Engine) */}
      <InteractiveTapDemoPhone />

      {/* HARDWARE IMPACT & TELEMETRY RIBBON */}
      <ImpactMetricsRibbon />

      {/* COMPARISON MATRIX: Traditional Paper vs PollyDevelopment NFC */}
      <ComparisonMatrix />

      {/* INTRO HERO BAND */}
      <section className="relative z-10 py-16 px-4 bg-[#131815] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-xs text-[#A4C2A9] uppercase tracking-widest">
            OP DE BALIE · OP JE DEUR OF RAAM · ALTIJD DICHTBIJ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
            EEN GOED MOMENT VERDIENT EEN{" "}
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize">
              moeiteloze stap.
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Kies de Google Review tag die bij jouw zaak past. Wij regelen de technische NDEF-koppeling, het grafische drukwerk in jouw huiskleur en de levering volledig in overleg met jou.
          </p>
        </div>
      </section>

      {/* THE COLLECTION SHOWROOM */}
      <section
        id="collectie"
        className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10"
      >
        <ReviewProductShowroom />
      </section>

      {/* HOE HET WERKT (INTERACTIVE 3-STEP BENTO GRID) */}
      <InteractiveStepsBento />

      {/* INTERACTIVE REVIEW ROI & GROWTH CALCULATOR */}
      <ReviewRoiCalculator />

      {/* TECHNICAL HARDWARE BLUEPRINT & RF OSCILLOSCOPE */}
      <HardwareOscilloscope />

      {/* CONTACT SECTION (JOEY & LUC DIRECT DIAL TACTILE COCKPIT) */}
      <DirectContactTeam />

      {/* FAQ SECTION (ANIMATED MOTION ACCORDION) */}
      <FaqAccordion />

      {/* FOOTER */}
      <footer className="relative z-10 py-16 px-4 bg-[#0A0D0B] border-t border-zinc-900 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded bg-[#3D4F40] text-white font-bold flex items-center justify-center text-xs">
              P.
            </div>
            <div>
              <span className="text-zinc-200 block font-bold">
                POLLYDEVELOPMENT · GOOGLE REVIEW NFC HARDWARE © 2026
              </span>
              <span className="text-[10px] text-zinc-500 block">
                Onafhankelijke aanbieder van premium NFC hardware. Google is een geregistreerd handelsmerk van Google LLC.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/producten" className="hover:text-white transition-colors">
              Productfoto&apos;s
            </Link>
            <a
              href="https://googlereview.pollydevelopment.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Originele Pagina ↗
            </a>
            <a
              href="tel:+31623916558"
              className="hover:text-white transition-colors text-zinc-300 font-bold"
            >
              06 23916558
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY DOCK (WhatsApp & Direct Bellen) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 p-2 rounded-2xl bg-[#0E1210]/95 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="https://wa.me/31623916558?text=Hallo%20Joey,%20ik%20heb%20interesse%20in%20Google%20Review%20NFC%20kaarten%20voor%20mijn%20bedrijf."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-[#F5F6F2] hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow flex items-center justify-center gap-1.5"
        >
          <span>WhatsApp ↗</span>
        </a>
        <a
          href="tel:+31623916558"
          className="flex-1 py-2.5 rounded-xl bg-[#2A372C] hover:bg-[#344436] text-[#F3F5F0] border border-[#405444] font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow flex items-center justify-center gap-1.5"
        >
          <span>Bel Direct ↗</span>
        </a>
      </div>
    </div>
  );
}
