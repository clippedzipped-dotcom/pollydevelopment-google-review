"use client";

import React, { useState } from "react";
import {
  ReviewColorSwatch,
  REVIEW_PRODUCTS,
  COLOR_SWATCHES,
} from "@/data/review-products";
import { GoogleReviewCard3D } from "@/components/review/GoogleReviewCard3D";
import {
  ReceiptPrinter,
  type ReceiptPrinterStage,
} from "@/components/kitchen/ReceiptPrinter";
import { HoldToConfirmButton } from "@/components/kitchen/HoldToConfirmButton";
import {
  Phone,
  MessageSquare,
  Printer,
  Check,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import {
  playMechanicalClick,
  playTabSwitch,
  playConfirmSound,
  playPrinterSound,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

interface ReviewProductShowroomProps {
  onOpenTapDemo?: () => void;
  className?: string;
}

const TIERS = [
  { id: "sample", label: "1 - 5 stuks", sub: "Proefserie" },
  { id: "popular", label: "10 - 25 stuks", sub: "Meest gekozen" },
  { id: "scale", label: "50+ stuks", sub: "Filialen / Horeca" },
];

export function ReviewProductShowroom({
  onOpenTapDemo,
  className,
}: ReviewProductShowroomProps) {
  const [selectedProductId, setSelectedProductId] = useState<"sticker" | "card" | "display">("card");
  const [selectedColor, setSelectedColor] = useState<ReviewColorSwatch>("sage");
  const [selectedTier, setSelectedTier] = useState(TIERS[1]);
  const [showLogo, setShowLogo] = useState(true);
  const [showQr, setShowQr] = useState(true);
  const [businessName, setBusinessName] = useState("Jouw Zaak");
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");

  // Receipt printer state
  const [receiptStage, setReceiptStage] = useState<ReceiptPrinterStage>("complete");

  const product = REVIEW_PRODUCTS[selectedProductId];
  const swatch = COLOR_SWATCHES[selectedColor];

  const handleProductSelect = (id: "sticker" | "card" | "display") => {
    playTabSwitch();
    triggerHaptic("light");
    setSelectedProductId(id);
  };

  const handleColorSelect = (color: ReviewColorSwatch) => {
    playMechanicalClick();
    triggerHaptic("light");
    setSelectedColor(color);
  };

  const handlePrintQuote = () => {
    playPrinterSound();
    triggerHaptic("medium");
    setReceiptStage("processing");
    setTimeout(() => {
      setReceiptStage("printing");
      setTimeout(() => {
        setReceiptStage("complete");
        playConfirmSound();
        triggerHaptic("success");
      }, 1600);
    }, 500);
  };

  return (
    <div className={cn("w-full space-y-12", className)}>
      {/* SECTION INTRO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>DE COLLECTIE · DRIE VORMEN HELEMAAL VAN JOU</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[0.95]">
            JOUW HUISSTIJL.<br />
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize tracking-normal">
              Tangible Hardware.
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          Beweeg de producten in 3D, probeer een voorbeeldkleur en test jouw logo of QR-code op de opdruk. Stickers, kaarten en tafeldisplays zijn allemaal leverbaar in jouw exacte merkkleuren.
        </p>
      </div>

      {/* PRODUCT FORM FACTOR INDEX TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
        {(Object.keys(REVIEW_PRODUCTS) as ("sticker" | "card" | "display")[]).map((key) => {
          const p = REVIEW_PRODUCTS[key];
          const isSelected = selectedProductId === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleProductSelect(key)}
              data-cursor={`[BEKIJK ${p.title.toUpperCase()}]`}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all cursor-pointer font-bold tracking-wider uppercase active:scale-[0.98]",
                isSelected
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                  : "bg-black/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
              )}
            >
              <span className="text-[10px] opacity-60">{p.number} /</span>
              <span>{p.title}</span>
            </button>
          );
        })}
      </div>

      {/* STUDIO CONTROLS & CUSTOMIZER PANEL */}
      <div className="p-6 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl grid md:grid-cols-12 gap-6 items-center">
        {/* 01: Color Swatches */}
        <div className="md:col-span-5 space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center justify-between">
            <span>01 / KIES EEN KLEUR</span>
            <span className="text-white font-bold">{swatch.name}</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(COLOR_SWATCHES) as ReviewColorSwatch[]).map((cKey) => {
              const sw = COLOR_SWATCHES[cKey];
              const isSelected = selectedColor === cKey;
              return (
                <button
                  key={cKey}
                  type="button"
                  onClick={() => handleColorSelect(cKey)}
                  data-cursor={`[KLEUR ${sw.dutchName.toUpperCase()}]`}
                  className={cn(
                    "p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-[0.97]",
                    isSelected
                      ? "ring-2 ring-white border-white shadow-md bg-white/10"
                      : "border-zinc-800 hover:border-zinc-600 bg-zinc-900/50"
                  )}
                >
                  <div
                    className="size-5 rounded-full border border-black/40 shadow-inner"
                    style={{ backgroundColor: sw.primaryBg }}
                  />
                  <span className="font-mono text-[9px] uppercase font-bold text-zinc-300">
                    {sw.dutchName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 02: Opdruk & Toggles */}
        <div className="md:col-span-4 space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
            02 / BEKIJK DE OPDRUK
          </label>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => {
                setShowLogo(!showLogo);
                playMechanicalClick();
                triggerHaptic("light");
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer active:scale-[0.98]",
                showLogo
                  ? "bg-white/10 text-white border-white/25 shadow-sm"
                  : "bg-black/40 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              <div
                className={cn(
                  "size-4 rounded border flex items-center justify-center",
                  showLogo ? "bg-[#506654] border-[#67826C] text-white" : "border-zinc-600"
                )}
              >
                {showLogo && <Check className="size-3 stroke-[3]" />}
              </div>
              <span>Met Logo</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setShowQr(!showQr);
                playMechanicalClick();
                triggerHaptic("light");
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl border font-mono text-xs font-bold transition-all cursor-pointer active:scale-[0.98]",
                showQr
                  ? "bg-white/10 text-white border-white/25 shadow-sm"
                  : "bg-black/40 text-zinc-500 border-zinc-800 hover:text-zinc-300"
              )}
            >
              <div
                className={cn(
                  "size-4 rounded border flex items-center justify-center",
                  showQr ? "bg-[#506654] border-[#67826C] text-white" : "border-zinc-600"
                )}
              >
                {showQr && <Check className="size-3 stroke-[3]" />}
              </div>
              <span>Met QR-Code</span>
            </button>
          </div>
        </div>

        {/* 03: Bedrijfsnaam Input */}
        <div className="md:col-span-3 space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
            03 / BEDRIJFSNAAM
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Jouw Zaak"
            className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-black/40 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20"
          />
        </div>

        {/* Studio Status Notification line */}
        <div className="md:col-span-12 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>
              Voorbeeld: <strong className="text-white">{swatch.dutchName}</strong>, {showLogo ? "met" : "zonder"} logo en {showQr ? "met" : "zonder"} QR-code. Formaat: {product.formFactor}.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "3d" ? "photo" : "3d")}
            className="text-zinc-300 hover:text-white underline cursor-pointer"
          >
            {viewMode === "3d" ? "Bekijk originele productfoto ↗" : "Terug naar 3D huisstijl ↗"}
          </button>
        </div>
      </div>

      {/* MAIN SPECIMEN SHOWCASE: 3D Card vs Technical Blueprint Grid */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: 3D Hardware Specimen Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-b from-black/80 to-[#0A0D0B] p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[480px]">
            {/* Top Scene Caption */}
            <div className="w-full flex items-center justify-between font-mono text-[10px] text-zinc-400 mb-4 pb-2 border-b border-white/5">
              <span>MODEL · {product.number} {product.title.toUpperCase()}</span>
              <span>13.560 MHz HF NFC</span>
            </div>

            {/* The 3D Component */}
            <GoogleReviewCard3D
              product={product}
              colorSwatch={selectedColor}
              businessName={businessName}
              showLogo={showLogo}
              showQr={showQr}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode(viewMode === "3d" ? "photo" : "3d")}
              onTapSuccess={onOpenTapDemo || handlePrintQuote}
              className="my-auto w-full"
            />

            {/* Bottom Caption */}
            <div className="mt-6 text-center font-mono text-[9px] text-zinc-500">
              Beweeg de muis voor real-time 3D lichtreflectie · Tik op het product voor interactieve simulatie
            </div>
          </div>
        </div>

        {/* Right: Technical Blueprint & Direct Ordering */}
        <div className="lg:col-span-5 space-y-6">
          {/* Blueprint Specs Card */}
          <div className="p-6 rounded-3xl border border-zinc-800 bg-[#0A0D0B] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                {product.title}
              </span>
              <span className="text-[#A4C2A9] font-bold">
                {product.priceNote}
              </span>
            </div>

            <p className="font-sans text-sm text-zinc-300 leading-relaxed">
              <strong>{product.tagline}</strong> {product.description}
            </p>

            {/* Technical Spec Sheet Rows */}
            <div className="divide-y divide-zinc-900 font-mono text-xs pt-1">
              {product.specs.map((spec, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-zinc-200 text-right font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Dial CTAs for Joey and Luc */}
            <div className="pt-3 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+31623916558"
                  onClick={() => playMechanicalClick()}
                  className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-white hover:text-black hover:border-white transition-all text-left flex flex-col justify-between group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 group-hover:text-zinc-600 font-mono mb-1">
                    <span>SALES &amp; ADVIES</span>
                    <Phone className="size-3 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Bel Joey</span>
                    <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-600">
                      +31 6 2391 6558
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+31610635256"
                  onClick={() => playMechanicalClick()}
                  className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-white hover:text-black hover:border-white transition-all text-left flex flex-col justify-between group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 group-hover:text-zinc-600 font-mono mb-1">
                    <span>DESIGN &amp; HUISSTIJL</span>
                    <Phone className="size-3 group-hover:text-zinc-900" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Bel Luc</span>
                    <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-600">
                      +31 6 1063 5256
                    </span>
                  </div>
                </a>
              </div>

              {/* Indicatief Aantal Selector */}
              <div className="space-y-1.5 pt-1">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>INDICATIEF AANTAL</span>
                  <span className="text-white font-bold">{selectedTier.label}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => {
                        setSelectedTier(tier);
                        playMechanicalClick();
                        triggerHaptic("light");
                      }}
                      className={cn(
                        "px-2 py-2 rounded-xl border font-mono text-[9px] uppercase transition-all cursor-pointer text-center",
                        selectedTier.id === tier.id
                          ? "bg-white text-zinc-950 font-bold border-white shadow-sm"
                          : "bg-black/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                      )}
                    >
                      <div className="truncate font-bold">{tier.label}</div>
                      <div className="text-[7.5px] opacity-75 font-normal truncate">{tier.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Tactile WhatsApp Quotation CTA & Free Proof Lead Magnet */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handlePrintQuote();
                    playMechanicalClick();
                    triggerHaptic("medium");
                    const url = `https://wa.me/31623916558?text=${encodeURIComponent(
                      `Hallo Joey en Luc! Ik wil graag een vrijblijvende offerte aanvragen voor ${selectedTier.label} (${selectedTier.sub}) Google Review NFC tags (${product.title}, kleur ${swatch.name}) voor ${businessName}.`
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F5F6F2] hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <MessageSquare className="size-4" />
                  <span>VRAAG VRIJBLIJVEND OFFERTE AAN</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playMechanicalClick();
                    triggerHaptic("medium");
                    const url = `https://wa.me/31610635256?text=${encodeURIComponent(
                      `Hallo Luc! Ik stuur hierbij graag mijn logo voor een gratis digitaal drukvoorbeeld van de Google Review NFC tags (${product.title}, kleur ${swatch.name}) voor ${businessName}.`
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:translate-y-0.5 cursor-pointer"
                >
                  <Sparkles className="size-3.5 text-[#A4C2A9]" />
                  <span>Gratis digitaal proefontwerp met logo ↗</span>
                </button>

                {/* Trust & Value Guarantees */}
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-zinc-800 font-mono text-[9px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Geen abonnement (eenmalig)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Proefontwerp binnen 2 uur</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Plug &amp; Play voorgeprogrammeerd</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-[#A4C2A9] shrink-0" />
                    <span>Levenslange chipgarantie</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 px-1">
                  <span>* Print automatisch specificatiebon</span>
                  <a
                    href={`https://wa.me/31623916558?text=${encodeURIComponent(
                      `Hallo Joey en Luc! Ik heb interesse in de Google Review NFC tags (${product.title}, kleur ${swatch.name}) voor ${businessName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMechanicalClick()}
                    className="text-zinc-400 hover:text-white underline cursor-pointer"
                  >
                    Direct appen ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Thermal Receipt Order Specimen (The Kitchen pattern) */}
          <div className="p-5 rounded-3xl border border-zinc-800 bg-black/60 shadow-xl space-y-3">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Printer className="size-3.5 text-[#A4C2A9]" />
                <span className="font-bold text-white">ORDER SPECIFICATIE BON</span>
              </span>
              <button
                type="button"
                onClick={handlePrintQuote}
                className="text-[9px] px-2 py-0.5 rounded border border-zinc-700 hover:border-zinc-500 text-zinc-300 transition-colors cursor-pointer"
              >
                [PRINT BON]
              </button>
            </div>

            <ReceiptPrinter.Root stage={receiptStage} feedMotion="stepped">
              <ReceiptPrinter.Machine className="p-3 bg-[#111411]">
                <ReceiptPrinter.Screen className="p-2 mb-2 bg-black/90">
                  <ReceiptPrinter.Status />
                </ReceiptPrinter.Screen>
                <ReceiptPrinter.Output className="min-h-[14rem]">
                  <ReceiptPrinter.Paper className="p-4 text-zinc-900 bg-[#FAF9F5] shadow-xl text-[10px] space-y-2 font-mono">
                    <div className="text-center pb-2 border-b border-dashed border-zinc-400">
                      <span className="font-bold block tracking-widest text-[11px]">
                        POLLYDEVELOPMENT · REVIEW TAGS
                      </span>
                      <span className="text-[9px] text-zinc-600 block">
                        AMSTERDAM · NEDERLAND &amp; BELGIË
                      </span>
                      <span className="text-[8px] text-zinc-500 block">
                        TEL JOEY: 06 23916558 · TEL LUC: 06 10635256
                      </span>
                    </div>

                    <div className="space-y-1 text-[9px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-600">PRODUCT:</span>
                        <span className="font-bold text-black uppercase">{product.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">KLEUR:</span>
                        <span className="font-bold text-black uppercase">{swatch.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">AANTAL:</span>
                        <span className="font-bold text-black uppercase">{selectedTier.label} ({selectedTier.sub})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">OPDRUK:</span>
                        <span>{showLogo ? "Logo" : "Geen Logo"} · {showQr ? "QR-Code" : "Geen QR"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">KLANT:</span>
                        <span className="font-bold text-black uppercase">{businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-600">STATUS:</span>
                        <span className="font-bold text-zinc-900">OFFERTE OP AANVRAAG</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-dashed border-zinc-400 text-center text-[8px] text-zinc-500">
                      * ALLE ORDERS OP MAAT INCLUSIEF DIGITAAL PROEFVOORBEELD *
                    </div>
                  </ReceiptPrinter.Paper>
                </ReceiptPrinter.Output>
              </ReceiptPrinter.Machine>
            </ReceiptPrinter.Root>
          </div>
        </div>
      </div>
    </div>
  );
}
