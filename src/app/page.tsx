import Link from "next/link";
import Image from "next/image";
import { ReviewProductShowroom } from "@/components/review/ReviewProductShowroom";
import { InteractiveTapDemoPhone } from "@/components/review/InteractiveTapDemoPhone";
import { ImpactMetricsRibbon } from "@/components/review/ImpactMetricsRibbon";
import { InteractiveStepsBento } from "@/components/review/InteractiveStepsBento";
import { HardwareOscilloscope } from "@/components/review/HardwareOscilloscope";
import { DirectContactTeam } from "@/components/review/DirectContactTeam";
import { FaqAccordion } from "@/components/review/FaqAccordion";
import { Phone, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070907] text-white font-sans antialiased selection:bg-[#00FF66] selection:text-black overflow-x-clip">
      {/* AMBIENT BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(80,102,84,0.18)_0%,transparent_60%)]"
      />

      {/* FIXED SITE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#070907]/85 border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-8 rounded-lg bg-black border border-emerald-500/50 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_12px_rgba(0,255,102,0.3)]">
              <Image
                src="/images/products/pollydevelopment-logo.png"
                alt="PollyDevelopment Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-display text-sm sm:text-base tracking-tight block uppercase text-white font-bold">
                Google Review Kaarten
              </span>
              <span className="font-mono text-[9px] block tracking-widest uppercase text-emerald-400">
                POLLYDEVELOPMENT // NFC HARDWARE
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
            <a href="#tap-demo" className="text-zinc-400 hover:text-white transition-colors">
              Simulatie
            </a>
            <a href="#hoe-het-werkt" className="text-zinc-400 hover:text-white transition-colors">
              Hoe het werkt
            </a>
            <a href="#collectie" className="text-zinc-400 hover:text-white transition-colors">
              Collectie
            </a>
            <Link href="/producten" className="text-zinc-400 hover:text-white transition-colors">
              Productfoto’s
            </Link>
            <a href="#specificaties" className="text-zinc-400 hover:text-white transition-colors">
              Specificaties
            </a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#faq" className="text-zinc-400 hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs: Direct Call Joey & Luc */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+31623916558"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black hover:border-white font-mono text-[11px] font-bold transition-all cursor-pointer shadow-sm active:translate-y-0.5"
            >
              <Phone className="size-3 text-emerald-400 group-hover:text-black" />
              <span>Bel Joey of Luc</span>
            </a>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.3)] active:translate-y-0.5"
            >
              <span>Offerte</span>
              <ArrowRight className="size-3" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION: Interactive Tap Demo Story (Authentic PollyDevelopment Sticky Scroll Engine) */}
      <InteractiveTapDemoPhone />

      {/* HARDWARE IMPACT & TELEMETRY RIBBON */}
      <ImpactMetricsRibbon />

      {/* INTRO HERO BAND */}
      <section className="relative z-10 py-16 px-4 bg-[#0B0E0C] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            OP DE BALIE · OP JE DEUR OF RAAM · ALTIJD DICHTBIJ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
            EEN GOED MOMENT VERDIENT EEN MAKKELIJKE VOLGENDE STAP.
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

      {/* TECHNICAL HARDWARE BLUEPRINT & RF OSCILLOSCOPE */}
      <HardwareOscilloscope />

      {/* CONTACT SECTION (JOEY & LUC DIRECT DIAL TACTILE COCKPIT) */}
      <DirectContactTeam />

      {/* FAQ SECTION (ANIMATED MOTION ACCORDION) */}
      <FaqAccordion />

      {/* FOOTER */}
      <footer className="relative z-10 py-16 px-4 bg-black border-t border-zinc-900 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-7 rounded bg-emerald-500 text-black font-black flex items-center justify-center text-xs">
              P.
            </div>
            <div>
              <span className="text-zinc-200 block font-bold">
                POLLYDEVELOPMENT // GOOGLE REVIEW NFC TAGS © 2026
              </span>
              <span className="text-[10px] text-zinc-600 block">
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
              className="hover:text-white transition-colors text-emerald-400 font-bold"
            >
              06 23916558
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY DOCK (Bel Joey / Bel Luc) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 p-2 rounded-2xl bg-black/95 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="tel:+31623916558"
          className="flex-1 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow"
        >
          Bel Joey ↗
        </a>
        <a
          href="tel:+31610635256"
          className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow"
        >
          Bel Luc ↗
        </a>
      </div>
    </div>
  );
}
