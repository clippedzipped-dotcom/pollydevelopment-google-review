import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { REVIEW_PRODUCTS } from "@/data/review-products";
import { Phone, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Google Review producten & foto’s | PollyDevelopment",
  description:
    "Bekijk de originele productfoto's van onze Google Review NFC stickers, kaarten en tafeldisplays. Leverbaar in eigen huisstijl.",
};

export default function ProductenPage() {
  const products = Object.values(REVIEW_PRODUCTS);

  return (
    <div className="relative min-h-screen bg-[#070907] text-white font-sans antialiased selection:bg-[#00FF66] selection:text-black overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#070907]/85 border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-black border border-emerald-500/50 p-1 flex items-center justify-center overflow-hidden shadow">
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
                POLLYDEVELOPMENT // PRODUCTEN
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span>Naar de interactieve studio</span>
            </Link>

            <a
              href="tel:+31623916558"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-black font-mono text-[11px] font-bold uppercase tracking-wider"
            >
              <Phone className="size-3" />
              <span>Bel Joey of Luc</span>
            </a>
          </div>
        </div>
      </header>

      {/* INTRO HERO */}
      <section className="pt-32 sm:pt-40 pb-16 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl space-y-4">
          <p className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            DE ORIGINELE PRODUCTVOORBEELDEN
          </p>
          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-tight">
            VAN DICHTBIJ.<br />
            <span className="text-emerald-400">IN BEELD.</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            Bekijk de oorspronkelijke foto’s van onze stickers, kaarten en tafeldisplays. Ook leverbaar in jouw huisstijl, met logo of QR-code. Uitvoering, prijs en beschikbaarheid bespreken we samen.
          </p>
          <div className="pt-2">
            <Link
              href="/#collectie"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 hover:underline"
            >
              <span>Terug naar de interactieve collectie</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID PHOTO SHOWCASE */}
      <section className="pb-28 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl border border-zinc-800 bg-black/60 shadow-2xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Product Photo with Glass Effect */}
              <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
                <Image
                  src={p.originalImage}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                  {p.number} // {p.title}
                </div>
              </div>

              {/* Product Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
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
                    className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Prijs op aanvraag</span>
                    <ArrowRight className="size-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-xs text-zinc-500 max-w-xl mx-auto">
          De foto&apos;s tonen voorbeelden van de producttypen. Formaat, opdruk en uitvoering stemmen we vooraf samen af. Alle producten worden op maat geproduceerd.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 bg-black border-t border-zinc-900 font-mono text-xs text-zinc-500 text-center">
        <p>© 2026 PollyDevelopment · Onafhankelijke aanbieder. Google is een merk van Google LLC.</p>
        <p className="mt-2 text-zinc-600">
          Bel Joey op 06 23916558 of Luc op 06 10635256
        </p>
      </footer>
    </div>
  );
}
