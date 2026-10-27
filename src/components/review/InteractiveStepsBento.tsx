"use client";

import React, { useState } from "react";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import { BorderBeam } from "@/components/kitchen/BorderBeam";
import {
  playMechanicalClick,
  playNfcTapSound,
  playConfirmSound,
  triggerHaptic,
} from "@/helpers/sound-effects";
import {
  Layers,
  Radio,
  Star,
  CheckCircle2,
  Lock,
  Sparkles,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/helpers/classname-helper";

export function InteractiveStepsBento() {
  // Step 1: Selected quantity tier preview
  const [selectedTier, setSelectedTier] = useState<"10" | "25" | "50+">("25");

  // Step 2: Contactless simulation trigger state
  const [tapActive, setTapActive] = useState(false);
  const [tapTimestamp, setTapTimestamp] = useState<string | null>(null);

  // Step 3: Interactive review star rating
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewPosted, setReviewPosted] = useState(false);

  const handleTestTap = () => {
    playNfcTapSound();
    triggerHaptic("success");
    setTapActive(true);
    setTapTimestamp(new Date().toLocaleTimeString("nl-NL", { hour12: false }));
    setTimeout(() => {
      setTapActive(false);
    }, 3200);
  };

  const handleStarClick = (score: number) => {
    playMechanicalClick(0.1);
    triggerHaptic("light");
    setRating(score);
  };

  const handlePostReview = () => {
    playConfirmSound(0.15);
    triggerHaptic("success");
    setReviewPosted(true);
    setTimeout(() => {
      setReviewPosted(false);
    }, 4000);
  };

  return (
    <section id="hoe-het-werkt" className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>3-STAPS ERVARING · VAN TIK TOT REPUTATIE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
            GEEN ZOEKTRAJECT.<br />
            <span className="text-emerald-400">DIRECT BIJ DE REVIEW.</span>
          </h2>
        </div>
        <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed">
          Iedere tevreden klant heeft tegenwoordig een smartphone in zijn hand of broekzak. Maak van elk positief contactmoment een directe 5-sterren review zonder drempels.
        </p>
      </div>

      {/* 3-STEP BENTO GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CARD 01: HARDWARE KOPPELING */}
        <SpotlightCard
          className="bg-[#0A0D0B] border-white/10 p-7 flex flex-col justify-between relative group"
          spotlightColor="rgba(0, 255, 102, 0.12)"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                STAP 01 // KOPPELING
              </span>
              <Layers className="size-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            </div>

            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Koppel jouw bedrijf.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Wij configureren elke NTAG-chip hardwarematig met jouw unieke Google Bedrijfsprofiel review-URL en vergrendelen deze definitief.
            </p>

            {/* Micro Hardware Blueprint */}
            <div className="p-4 rounded-2xl bg-black/70 border border-zinc-800 space-y-3 font-mono text-[11px]">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-500">CHIP MODULE</span>
                <span className="text-white font-bold">NXP NTAG215 (504B)</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-500">WRITE-LOCK</span>
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Lock className="size-3" />
                  PERMANENT READ-ONLY
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-zinc-500">FERRIET LAAG</span>
                <span className="text-zinc-300">ANTI-METAAL ISOLATIE</span>
              </div>

              {/* Tier Selector Buttons */}
              <div className="pt-2 border-t border-zinc-900">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">
                  Selecteer indicatieve oplage:
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["10", "25", "50+"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => {
                        playMechanicalClick(0.06);
                        setSelectedTier(tier);
                      }}
                      className={cn(
                        "py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer font-bold text-[10px]",
                        selectedTier === tier
                          ? "bg-emerald-500 text-black border-emerald-400 shadow-sm"
                          : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white"
                      )}
                    >
                      {tier} stuks
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span>PROEFDRUKKEN INCL.</span>
            <span className="text-emerald-400 font-bold">100% OP MAAT</span>
          </div>
        </SpotlightCard>

        {/* CARD 02: CONTACTLOZE TIK MET LIVE INTERACTIE */}
        <SpotlightCard
          className="bg-[#0A0D0B] border-emerald-500/30 p-7 flex flex-col justify-between relative group shadow-[0_0_30px_rgba(0,255,102,0.06)]"
          spotlightColor="rgba(0, 255, 102, 0.2)"
        >
          <BorderBeam size={180} duration={8} colorFrom="#00FF66" colorTo="#008833" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                STAP 02 // 13.560 MHz INDUCTIE
              </span>
              <Radio className="size-4 text-emerald-400 animate-pulse" />
            </div>

            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Telefoon erbij.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              De bezoeker houdt een iPhone of Android smartphone bij het NFC-symbool. Binnen 15 milliseconden verschijnt de linkmelding. Zonder speciale app.
            </p>

            {/* Interactive Pulse Simulator */}
            <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/20 relative overflow-hidden text-center space-y-3">
              <div className="size-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 relative">
                <Smartphone className="size-6 relative z-10" />
                {tapActive && (
                  <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-75" />
                )}
              </div>

              {tapActive ? (
                <div className="font-mono text-xs text-emerald-400 font-bold space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-400" />
                    <span>NFC INDUCTIE DETECTIE</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-normal">
                    Signaal ontvangen om {tapTimestamp} (11 ms latentie)
                  </div>
                </div>
              ) : (
                <div className="font-mono text-[11px] text-zinc-400">
                  Bereik: 0 – 45 mm inductieveld (ISO/IEC 14443-A)
                </div>
              )}

              <button
                type="button"
                onClick={handleTestTap}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,102,0.35)] active:translate-y-0.5"
              >
                {tapActive ? "Signaal Actief..." : "Test 13.560 MHz Tik ↗"}
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span>IOS &amp; ANDROID READY</span>
            <span className="text-emerald-400 font-bold">&lt; 15 MS RESPONSTIJD</span>
          </div>
        </SpotlightCard>

        {/* CARD 03: 5-STERREN REVIEW ERVARING */}
        <SpotlightCard
          className="bg-[#0A0D0B] border-white/10 p-7 flex flex-col justify-between relative group"
          spotlightColor="rgba(255, 215, 0, 0.12)"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-[10px] font-bold text-amber-400 tracking-widest uppercase">
                STAP 03 // BEOORDELING
              </span>
              <Sparkles className="size-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
            </div>

            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-2">
              Deel een review.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
              Het officiële Google beoordelingsvenster opent automatisch. Met één tik kiest je klant 5 sterren en schrijft een korte toelichting.
            </p>

            {/* Interactive 5-Star Review Widget */}
            <div className="p-4 rounded-2xl bg-black/80 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-zinc-300 font-mono text-xs">
                <span className="font-bold">Google Reviews</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  {rating}.0 / 5.0
                </span>
              </div>

              {/* Star row */}
              <div className="flex items-center justify-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => handleStarClick(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125 active:scale-95"
                    >
                      <Star
                        className={cn(
                          "size-7 transition-colors",
                          isFilled
                            ? "text-[#FBBC05] fill-[#FBBC05] drop-shadow-[0_0_8px_rgba(251,188,5,0.6)]"
                            : "text-zinc-700"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {reviewPosted ? (
                <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-center font-mono text-[11px] text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="size-3.5" />
                  <span>Review succesvol online geplaatst!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handlePostReview}
                  className="w-full py-2 rounded-lg bg-white/10 hover:bg-white hover:text-black text-zinc-200 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-98"
                >
                  Plaats Review Demo
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
            <span>OFFICIEEL GOOGLE VENSTER</span>
            <span className="text-amber-400 font-bold">100% AUTHENTIEK</span>
          </div>
        </SpotlightCard>
      </div>

      {/* FOOTER NOTICE BANNER */}
      <div className="mt-8 p-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 text-center font-mono text-[11px] text-zinc-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="text-emerald-400 font-bold">COMPATIBILITEIT:</span>
        <span>Werkt direct met alle moderne iPhones (XR t/m 16 Pro) en Android toestellen met ingeschakelde NFC.</span>
      </div>
    </section>
  );
}
