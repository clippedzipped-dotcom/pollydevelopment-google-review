"use client";

import React from "react";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import { Check, X, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { playMechanicalClick, triggerHaptic } from "@/helpers/sound-effects";

interface ComparisonRow {
  aspect: string;
  traditional: string;
  polly: string;
  traditionalCheck: boolean;
  pollyCheck: boolean;
}

const COMPARISONS: ComparisonRow[] = [
  {
    aspect: "Klantactie om review te openen",
    traditional: "Klant moet Google openen, zaaknaam intypen en scrollen naar reviewvenster",
    polly: "1 contactloze tik met iPhone of Android (direct het 5-sterren venster open)",
    traditionalCheck: false,
    pollyCheck: true,
  },
  {
    aspect: "Tijd benodigd voor bezoeker",
    traditional: "60 – 120 seconden (hoge uitval / frictie)",
    polly: "< 3 seconden (90% minder drempel)",
    traditionalCheck: false,
    pollyCheck: true,
  },
  {
    aspect: "Conversieratio bij tevreden klanten",
    traditional: "1% tot 2% (slechts een enkeling neemt de moeite)",
    polly: "14% tot 22% (direct tijdens het afrekenen of verlaten)",
    traditionalCheck: false,
    pollyCheck: true,
  },
  {
    aspect: "Maandelijkse abonnementskosten",
    traditional: "Vaak €39 tot €89 per maand bij softwaretools",
    polly: "€0 per maand · Eenmalige hardware-aanschaf",
    traditionalCheck: false,
    pollyCheck: true,
  },
  {
    aspect: "Weer- en slijtvastheid",
    traditional: "Papier en laminaat scheurt, vervaagt en kreukt snel",
    polly: "IP68 water- & stofdicht PVC / acryl met krasvaste toplaag",
    traditionalCheck: false,
    pollyCheck: true,
  },
  {
    aspect: "Hardwarematige chipbeveiliging",
    traditional: "Geen beveiliging; QR kan overplakt worden",
    polly: "Permanente NXP write-lock (onwijzigbaar & veilig)",
    traditionalCheck: false,
    pollyCheck: true,
  },
];

export function ComparisonMatrix() {
  const handleHover = () => {
    playMechanicalClick(0.04);
  };

  return (
    <section id="vergelijking" className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>WAAROM HET WERKT · DE VERGELIJKING</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            HET VERSCHIL.<br />
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize">
              in eenvoud en effect.
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          Waarom papieren kaartjes in de prullenbak belanden en een PollyDevelopment NFC tag vanzelf reviews verzamelt.
        </p>
      </div>

      {/* COMPARISON TABLE ON DESKTOP & CARDS ON MOBILE */}
      <SpotlightCard
        className="bg-[#121614] border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
        spotlightColor="rgba(255, 255, 255, 0.05)"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/10 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400">
          <div className="col-span-12 sm:col-span-4">ASPECT</div>
          <div className="col-span-6 sm:col-span-4 text-zinc-500">TRADITIONEEL / PAPIER</div>
          <div className="col-span-6 sm:col-span-4 text-[#A4C2A9] font-bold">
            POLLYDEVELOPMENT NFC
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {COMPARISONS.map((row, idx) => (
            <div
              key={idx}
              onMouseEnter={handleHover}
              className="grid grid-cols-12 gap-4 py-4 sm:py-5 text-xs sm:text-sm items-center hover:bg-white/[0.02] transition-colors rounded-xl px-2 -mx-2"
            >
              {/* Aspect */}
              <div className="col-span-12 sm:col-span-4 font-mono font-bold text-white text-xs sm:text-sm">
                {row.aspect}
              </div>

              {/* Traditional */}
              <div className="col-span-12 sm:col-span-4 text-zinc-400 font-sans flex items-start gap-2">
                <span className="size-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                  <X className="size-2.5" />
                </span>
                <span className="leading-snug">{row.traditional}</span>
              </div>

              {/* PollyDevelopment NFC */}
              <div className="col-span-12 sm:col-span-4 text-[#F3F5F0] font-sans flex items-start gap-2 font-medium">
                <span className="size-4 rounded-full bg-[#A4C2A9]/20 text-[#A4C2A9] border border-[#A4C2A9]/30 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                  <Check className="size-2.5 stroke-[3]" />
                </span>
                <span className="leading-snug">{row.polly}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="size-4 text-[#A4C2A9]" />
            <span>100% tevredenheidsgarantie: kosteloos annuleren als het proefontwerp niet bevalt.</span>
          </div>

          <a
            href="#collectie"
            onClick={() => {
              playMechanicalClick();
              triggerHaptic("medium");
            }}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F3F5F0] text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="size-3.5 text-zinc-950" />
            <span>Bekijk de Collectie ↗</span>
          </a>
        </div>
      </SpotlightCard>
    </section>
  );
}
