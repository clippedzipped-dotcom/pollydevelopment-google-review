"use client";

import React, { useState, useId } from "react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import { TactileButton } from "@/components/kitchen/TactileButton";
import {
  TrendingUp,
  Star,
  Users,
  Award,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  playTickSound,
  playMechanicalClick,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

interface IndustryPreset {
  label: string;
  icon: string;
  visitors: number;
}

const PRESETS: IndustryPreset[] = [
  { label: "Koffiebar / Horeca", icon: "☕", visitors: 350 },
  { label: "Kapper / Salon", icon: "✂", visitors: 80 },
  { label: "Zorg / Praktijk", icon: "🦷", visitors: 55 },
  { label: "Boetiek / Retail", icon: "🛍", visitors: 190 },
  { label: "Vakman / Garage", icon: "🔧", visitors: 40 },
];

export function ReviewRoiCalculator() {
  const sliderId = useId();
  const [weeklyVisitors, setWeeklyVisitors] = useState<number>(150);
  const [lastTickVal, setLastTickVal] = useState<number>(150);

  // Calculations
  const monthlyVisitors = Math.round(weeklyVisitors * 4.33);
  const traditionalReviews = Math.max(1, Math.round(monthlyVisitors * 0.012)); // ~1.2%
  const nfcReviews = Math.round(monthlyVisitors * 0.138); // ~13.8%
  const monthlyGain = Math.max(0, nfcReviews - traditionalReviews);
  const yearlyGain = monthlyGain * 12;

  // Local SEO ranking estimation
  const rankingEstimate =
    weeklyVisitors >= 300
      ? "#1 in Google Maps (Lokaal)"
      : weeklyVisitors >= 100
      ? "Top 3 Positie in Google Maps"
      : "Top 5 Positie in Regio";

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setWeeklyVisitors(val);
    if (Math.abs(val - lastTickVal) >= 20) {
      playTickSound(0.04);
      triggerHaptic("light");
      setLastTickVal(val);
    }
  };

  const handlePresetClick = (val: number) => {
    setWeeklyVisitors(val);
    playMechanicalClick(0.1);
    triggerHaptic("medium");
  };

  return (
    <section
      id="roi-calculator"
      className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10"
    >
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-2">
            <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
            <span>INTERACTIEVE ROI &amp; GROEI CALCULATOR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            BEREKEN JE RESULTAAT.<br />
            <span className="font-serif italic font-normal text-[#A4C2A9] lowercase capitalize">
              meetbare Google Maps voorsprong.
            </span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          Ondernemers met een fysieke NFC-tag op de balie of menukaart verzamelen tot <strong>11× meer reviews</strong> dan zaken die vertrouwen op mond-tot-mondreclame.
        </p>
      </div>

      {/* INTERACTIVE CALCULATOR BENTO */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: INTERACTIVE CONTROLS */}
        <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#121614] border border-white/10 shadow-2xl space-y-8">
          <div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider mb-3">
              <span className="text-zinc-400 flex items-center gap-2">
                <Users className="size-4 text-[#A4C2A9]" />
                Klanten per week:
              </span>
              <span className="text-2xl font-display font-bold text-white px-3 py-1 rounded-xl bg-black/60 border border-white/15">
                {weeklyVisitors}{" "}
                <span className="text-xs font-mono font-normal text-zinc-400">
                  klanten/wk
                </span>
              </span>
            </div>

            {/* Custom Range Slider with Haptic Feel */}
            <div className="py-4">
              <input
                id={sliderId}
                type="range"
                min="20"
                max="800"
                step="10"
                value={weeklyVisitors}
                onChange={handleSliderChange}
                className="w-full h-3 bg-zinc-800/90 rounded-lg appearance-none cursor-pointer accent-[#A4C2A9] focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F3F5F0] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#A4C2A9] [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(0,0,0,0.8)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:active:scale-125 [&::-webkit-slider-thumb]:transition-transform"
                aria-label="Aantal klanten per week"
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-500 mt-2">
                <span>20 klanten</span>
                <span>250 klanten</span>
                <span>500 klanten</span>
                <span>800+ klanten</span>
              </div>
            </div>

            {/* Industry Presets Quick Selection */}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                Snelkeuze per branche:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetClick(preset.visitors)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl border font-mono text-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95",
                      weeklyVisitors === preset.visitors
                        ? "bg-white text-zinc-950 font-bold border-white shadow"
                        : "bg-black/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                    )}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Value comparison stats */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 block uppercase">
                Traditioneel (Geen NFC)
              </span>
              <span className="text-xl font-display font-bold text-zinc-400">
                ± {traditionalReviews} / mnd
              </span>
              <span className="text-[9px] text-zinc-500 block">
                Slechts ~1.2% zoekt zelf op Google
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1E2620]/90 border border-[#A4C2A9]/40 space-y-1 shadow-md">
              <span className="text-[10px] text-[#A4C2A9] font-bold block uppercase flex items-center gap-1">
                <Zap className="size-3" /> Met Polly NFC
              </span>
              <span className="text-xl font-display font-bold text-white">
                ± {nfcReviews} / mnd
              </span>
              <span className="text-[9px] text-zinc-300 block font-sans">
                Directe tik binnen 3 seconden
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PROJECTED GAIN & HIGH-INTENT CONVERSION CARD */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <SpotlightCard
            className="h-full bg-gradient-to-br from-[#141B16] via-[#101412] to-[#0A0D0B] border-white/15 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative group"
            spotlightColor="rgba(164, 194, 169, 0.12)"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-[#A4C2A9] font-bold">
                  <TrendingUp className="size-3.5" />
                  VERWACHTE GROEI PROGNOSE
                </span>
                <span className="text-white font-bold">100% EENMALIGE AANSCHAF</span>
              </div>

              {/* Big Impact Numbers */}
              <div className="py-6 space-y-4">
                <div className="flex items-baseline gap-3">
                  <motion.span
                    key={monthlyGain}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none"
                  >
                    +{monthlyGain}
                  </motion.span>
                  <div>
                    <span className="font-display text-xl sm:text-2xl font-bold text-[#A4C2A9] block">
                      extra reviews
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      per maand (+{yearlyGain} per jaar)
                    </span>
                  </div>
                </div>

                {/* Score & Ranking Impact Badges */}
                <div className="space-y-2 pt-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Award className="size-4 text-[#FBBC04]" />
                      Lokale Zichtbaarheid:
                    </span>
                    <span className="text-white font-bold">{rankingEstimate}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-zinc-400 flex items-center gap-2">
                      <Star className="size-4 text-[#FBBC04] fill-[#FBBC04]" />
                      Geschatte Google Score:
                    </span>
                    <span className="text-[#A4C2A9] font-bold">
                      4.8 ★ – 4.9 ★ (Geverifieerd)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Conversion Action Block */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <a href="#collectie" className="block w-full">
                <TactileButton
                  variant="white"
                  size="lg"
                  depth={4}
                  className="w-full flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider"
                >
                  <Sparkles className="size-4 text-black" />
                  <span>KIES JOUW NFC HARDWARE &amp; MODEL ↗</span>
                </TactileButton>
              </a>

              <a
                href={`https://wa.me/31623916558?text=${encodeURIComponent(
                  `Hallo Joey en Luc! Ik heb de ROI calculator gebruikt (${weeklyVisitors} klanten/wk, verwachting: +${monthlyGain} reviews/mnd) en wil graag gratis advies en een digitaal drukvoorbeeld voor mijn zaak.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playMechanicalClick()}
                className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:translate-y-0.5"
              >
                <MessageSquare className="size-3.5 text-[#A4C2A9]" />
                <span>WhatsApp Direct voor Vrijblijvend Advies ↗</span>
              </a>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
                <span>✓ Geen abonnement</span>
                <span>✓ Plug &amp; Play geleverd</span>
                <span>✓ Gratis digitaal drukvoorbeeld</span>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
