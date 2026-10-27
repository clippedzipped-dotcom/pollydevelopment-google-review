import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { REVIEW_PRODUCTS } from "@/data/review-products";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import { AmbientShaderCanvas } from "@/components/kitchen/AmbientShaderCanvas";
import { SiteHeader } from "@/components/review/SiteHeader";
import { Phone, ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Google Review producten & foto’s | PollyDevelopment",
  description:
    "Bekijk de originele productfoto's van onze Google Review NFC stickers, kaarten en tafeldisplays. Leverbaar in eigen huisstijl.",
};

export default function ProductenPage() {
  const products = Object.values(REVIEW_PRODUCTS);

  return (
    <div className="relative min-h-screen bg-[#0E1210] text-[#F3F5F0] font-sans antialiased selection:bg-[#506654] selection:text-white overflow-x-hidden">
      {/* AMBIENT SHADER CANVAS */}
      <AmbientShaderCanvas />

      {/* HEADER */}
      <SiteHeader />

      {/* INTRO HERO */}
      <section className="pt-32 sm:pt-40 pb-16 px-4 max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#A4C2A9]">
            <span className="size-1.5 rounded-full bg-[#8CAE93]" />
            <span>DE ORIGINELE PRODUCTVOORBEELDEN</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-tight">
            VAN DICHTBIJ.<br />
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize">
              in detail en textuur.
            </span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            Bekijk de oorspronkelijke foto’s van onze stickers, kaarten en tafeldisplays. Ook leverbaar in jouw exacte huisstijl, met logo of QR-code. Uitvoering, prijs en staffels bespreken we samen.
          </p>
          <div className="pt-2">
            <Link
              href="/#collectie"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#A4C2A9] hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              <span>Terug naar de 3D showroom &amp; studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID PHOTO SHOWCASE WITH SPOTLIGHT CARDS */}
      <section className="pb-28 px-4 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <SpotlightCard
              key={p.id}
              className="bg-[#121614]/90 border-zinc-800 p-0 overflow-hidden flex flex-col justify-between group shadow-2xl"
              spotlightColor="rgba(255, 255, 255, 0.08)"
            >
              {/* Product Photo with Glass Effect */}
              <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src={p.originalImage}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 font-mono text-[9px] uppercase tracking-wider text-[#A4C2A9] font-bold">
                  {`${p.number} · ${p.title}`}
                </div>
              </div>

              {/* Product Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    <strong>{p.tagline}</strong> {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500 text-[10px] uppercase">
                    {p.dimensions}
                  </span>
                  <a
                    href="tel:+31623916558"
                    className="font-bold text-[#A4C2A9] hover:underline flex items-center gap-1"
                  >
                    <span>Vraag advies aan</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/31623916558?text=${encodeURIComponent(
                      `Hallo Joey! Ik zag de foto's van de ${p.title} op de site en heb interesse voor mijn bedrijf.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare className="size-3.5 text-[#A4C2A9]" />
                    <span>WhatsApp voor sample ↗</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-xs text-zinc-500 max-w-xl mx-auto">
          De foto&apos;s tonen voorbeelden van de producttypen. Formaat, opdruk en uitvoering stemmen we vooraf samen af. Alle producten worden op maat geproduceerd.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-black border-t border-zinc-900 font-mono text-xs text-zinc-500 text-center relative z-10 pb-24 sm:pb-12">
        <p>© 2026 PollyDevelopment · Onafhankelijke aanbieder. Google is een merk van Google LLC.</p>
        <p className="mt-2 text-zinc-600">
          Bel Joey op 06 23916558 of Luc op 06 10635256
        </p>
      </footer>

      {/* MOBILE STICKY DOCK */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-50 p-2.5 rounded-2xl bg-[#0E1210]/95 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col gap-1.5 select-none">
        <div className="flex items-center justify-between px-1.5 text-[9px] font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#A4C2A9] animate-pulse" />
            <strong className="text-zinc-200">Joey &amp; Luc</strong> online
          </span>
          <span className="text-[#A4C2A9]">Reactie &lt; 2u</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <a
            href="https://wa.me/31623916558?text=Hallo%20Joey,%20ik%20heb%20de%20productfoto's%20bekeken%20en%20wil%20graag%20advies."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-[#F5F6F2] hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="size-3.5" />
            <span>WhatsApp ↗</span>
          </a>
          <a
            href="tel:+31623916558"
            className="flex-1 py-2.5 rounded-xl bg-[#2A372C] hover:bg-[#344436] text-[#F3F5F0] border border-[#405444] font-mono text-xs font-bold uppercase tracking-wider text-center active:scale-[0.98] shadow flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Phone className="size-3.5 text-[#A4C2A9]" />
            <span>Bel Direct ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
