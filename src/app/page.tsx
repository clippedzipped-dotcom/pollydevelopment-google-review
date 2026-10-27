import Link from "next/link";
import Image from "next/image";
import { ReviewProductShowroom } from "@/components/review/ReviewProductShowroom";
import { InteractiveTapDemoPhone } from "@/components/review/InteractiveTapDemoPhone";
import { REVIEW_FAQS } from "@/data/review-products";
import {
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

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
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
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
              Hoe het werkt
            </a>
            <a href="#collectie" className="text-zinc-400 hover:text-white transition-colors">
              De Collectie
            </a>
            <Link href="/producten" className="text-zinc-400 hover:text-white transition-colors">
              Productfoto’s
            </Link>
            <a href="#specificaties" className="text-zinc-400 hover:text-white transition-colors">
              Specificaties
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

      {/* INTRO BAND */}
      <section className="relative z-10 py-16 px-4 bg-[#0B0E0C] border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            OP DE BALIE · OP JE DEUR OF RAAM · ALTIJD DICHTBIJ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
            EEN GOED MOMENT VERDIENT EEN MAKKELIJKE VOLGENDE STAP.
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Kies de Google Review tag die bij jouw zaak past. Wij regelen de technische koppeling, het grafische drukwerk en de levering volledig in overleg met jou.
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

      {/* HOE HET WERKT (3 DUIDELIJKE STAPPEN) */}
      <section
        id="hoe-het-werkt"
        className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10"
      >
        <div className="max-w-xl mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>EENVOUDIG &amp; BETROUWBAAR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            VAN EEN TIK NAAR EEN ERVARING.
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            Een Google Review tag verlaagt de drempel voor jouw tevreden klanten. Geen gedoe met handmatig zoeken op Google:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-zinc-800 bg-black/60 shadow-xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-xs text-emerald-400 font-bold block">
              STAP 01
            </span>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Koppel jouw bedrijf.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We bespreken je productkeuze (stickers, kaarten of tafeldisplays), de gewenste aantallen en de link naar je Google Bedrijfsprofiel.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-800 bg-black/60 shadow-xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-xs text-emerald-400 font-bold block">
              STAP 02
            </span>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Telefoon erbij.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Je klant houdt een smartphone bij de tag. Binnen 200 milliseconden verschijnt de melding op het scherm. Zonder aparte app.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-800 bg-black/60 shadow-xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-xs text-emerald-400 font-bold block">
              STAP 03
            </span>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Deel een review.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Jouw reviewformulier opent direct met 5 sterren. De klant deelt binnen enkele seconden een eerlijke ervaring die direct online staat.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-center font-mono text-[11px] text-zinc-400">
          Geen aparte NFC-app nodig op geschikte toestellen. Voor het plaatsen van een review zijn internet en een Google-account nodig.
        </div>
      </section>

      {/* TECHNICAL HARDWARE BLUEPRINT */}
      <section
        id="specificaties"
        className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span>HARDWARE &amp; PRIVACY ARCHITECTUUR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              GEPRODUCEERD CONFORM ISO 14443-A.
            </h2>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              Onze tags maken gebruik van originele NXP semiconductors. Geen tussenliggende servers die persoonsgegevens loggen. Het signaal wordt 100% direct doorgegeven naar jouw officiële Google Review link.
            </p>

            <div className="p-4 rounded-2xl border border-zinc-800 bg-black/60 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span>NXP NTAG215 / NTAG216</span>
                <span>ORIGINEEL SEMICONDUCTOR</span>
              </div>
              <p className="font-sans text-xs text-zinc-400">
                Garantie op meer dan 100.000 leesacties en 10 jaar gegevensbehoud. Uitgerust met hardwarematige write-lock zodat de link nooit overschreven kan worden.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#0A0D0B] overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-black/80 border-b border-zinc-800 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              <span className="font-bold text-white">HARDWARE SPECIFICATIE MATRIX</span>
              <span>POLLYDEVELOPMENT 2026</span>
            </div>

            <div className="divide-y divide-zinc-900 font-mono text-xs">
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">FREQUENTIE</span>
                <span className="col-span-7 text-zinc-200">13.560 MHz High-Frequency Inductie</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">CHIP MODULE</span>
                <span className="col-span-7 text-emerald-400 font-bold">NXP NTAG215 (NFC Forum Type 2/4)</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">LEESAFSTAND</span>
                <span className="col-span-7 text-zinc-200">0 – 45 mm (Touch-Contact Geoptimaliseerd)</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">RESPONSTIJD</span>
                <span className="col-span-7 text-zinc-200">&lt; 15 milliseconden zero-latency</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">BEVEILIGING</span>
                <span className="col-span-7 text-zinc-200">Hardwarematige Read-Only Write Lock</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">WATERBESTENDIGHEID</span>
                <span className="col-span-7 text-zinc-200">IP68 (Epoxy Stickers) / Waterdicht PVC</span>
              </div>
              <div className="grid grid-cols-12 px-6 py-3.5">
                <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">ANTI-METAAL LAAG</span>
                <span className="col-span-7 text-zinc-200">Inclusief ferriet schild voor metalen deuren &amp; balies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION (JOEY & LUC DIRECT DIAL) */}
      <section
        id="contact"
        className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span>PERSOONLIJK CONTACT</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              LATEN WE<br />
              <span className="text-emerald-400">CONTACT MAKEN.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
              Wij zijn Joey en Luc, de twee gezichten achter PollyDevelopment. Bel ons voor advies, een prijsopgave of je bestelling.
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-400">
              Een kleine oplage voor jouw zaak of een grote aanvraag voor je team: we denken graag met je mee.
            </p>
          </div>

          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {/* Person Card: Joey */}
            <div className="p-6 rounded-3xl border border-zinc-800 bg-black/80 shadow-2xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-2xl bg-zinc-800 text-white font-display text-2xl font-bold flex items-center justify-center mb-3">
                  J.
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Joey
                </h3>
                <p className="font-mono text-xs text-emerald-400 mt-0.5">
                  Voor je vragen, productkeuze en aanvraag.
                </p>
                <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                  Bel Joey voor advies over aantallen, koppelingen en offertes.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:+31623916558"
                  className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow cursor-pointer active:scale-[0.98]"
                >
                  <Phone className="size-3.5" />
                  <span>Bel +31 6 2391 6558</span>
                </a>
                <a
                  href="https://wa.me/31623916558"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="size-3.5 text-emerald-400" />
                  <span>WhatsApp Joey</span>
                </a>
              </div>
            </div>

            {/* Person Card: Luc */}
            <div className="p-6 rounded-3xl border border-zinc-800 bg-black/80 shadow-2xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-2xl bg-zinc-800 text-white font-display text-2xl font-bold flex items-center justify-center mb-3">
                  L.
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Luc
                </h3>
                <p className="font-mono text-xs text-emerald-400 mt-0.5">
                  Voor je vragen, productkeuze en aanvraag.
                </p>
                <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                  Bel Luc voor huisstijlen, kleuren, vectorlogo&apos;s en proefdrukken.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href="tel:+31610635256"
                  className="w-full py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow cursor-pointer active:scale-[0.98]"
                >
                  <Phone className="size-3.5" />
                  <span>Bel +31 6 1063 5256</span>
                </a>
                <a
                  href="https://wa.me/31610635256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageSquare className="size-3.5 text-emerald-400" />
                  <span>WhatsApp Luc</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (VEELGESTELDE VRAGEN) */}
      <section
        id="faq"
        className="relative z-10 py-24 px-4 max-w-4xl mx-auto border-b border-white/10"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>ALLES WAT JE MOET WETEN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white">
            GOED OM TE WETEN.
          </h2>
        </div>

        <div className="space-y-3">
          {REVIEW_FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group p-5 rounded-2xl border border-zinc-800 bg-black/60 shadow-md transition-all open:border-emerald-500/50 open:bg-zinc-900/60"
            >
              <summary className="font-mono text-sm sm:text-base font-bold text-zinc-100 flex items-center justify-between cursor-pointer select-none">
                <span>{faq.q}</span>
                <ChevronDown className="size-4 text-zinc-500 transition-transform group-open:rotate-180 group-open:text-emerald-400 shrink-0 ml-3" />
              </summary>
              <p className="mt-3 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

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
                Onafhankelijke aanbieder. Google is een geregistreerd handelsmerk van Google LLC.
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
              Live Website ↗
            </a>
            <a
              href="tel:+31623916558"
              className="hover:text-white transition-colors"
            >
              06 23916558
            </a>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY DOCK (Bel Joey / Bel Luc) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 p-2 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-between gap-2">
        <a
          href="tel:+31623916558"
          className="flex-1 py-2.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98]"
        >
          Bel Joey ↗
        </a>
        <a
          href="tel:+31610635256"
          className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-black font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98]"
        >
          Bel Luc ↗
        </a>
      </div>
    </div>
  );
}
