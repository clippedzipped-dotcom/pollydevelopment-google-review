"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Sparkles,
  Wifi,
  ArrowRight,
  RotateCcw,
  Check,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  playNfcTapSound,
  playMechanicalClick,
  playConfirmSound,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { TactileButton } from "@/components/kitchen/TactileButton";
import { cn } from "@/helpers/classname-helper";

interface InteractiveTapDemoPhoneProps {
  businessName?: string;
  className?: string;
}

export function InteractiveTapDemoPhone({
  businessName = "Jouw Zaak",
  className,
}: InteractiveTapDemoPhoneProps) {
  const [step, setStep] = useState<"idle" | "tapping" | "notified" | "review" | "submitted">("idle");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("Fijne service, vriendelijk geholpen door Joey en Luc. Aanrader!");
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const startTapFlow = () => {
    playMechanicalClick();
    playNfcTapSound();
    triggerHaptic("success");
    setStep("tapping");

    setTimeout(() => {
      setStep("notified");
      triggerHaptic("light");
    }, 700);
  };

  const openReviewFromNotification = () => {
    playMechanicalClick();
    triggerHaptic("medium");
    setStep("review");
  };

  const submitReview = () => {
    playConfirmSound();
    triggerHaptic("success");
    setStep("submitted");

    if (typeof window !== "undefined") {
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#FBBC04", "#34A853", "#4285F4", "#EA4335", "#FFFFFF"],
          disableForReducedMotion: true,
        });
      } catch {}
    }
  };

  const resetFlow = () => {
    playMechanicalClick();
    triggerHaptic("light");
    setStep("idle");
  };

  return (
    <div className={cn("w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center", className)}>
      {/* LEFT COLUMN: Narrative Chapters & Steps */}
      <div className="lg:col-span-6 flex flex-col items-start text-left gap-4 max-w-xl">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>EEN KLEIN KAARTJE · EEN GROOT GEBAAR</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-[0.95]">
          GOED GEDAAN?<br />
          <span className="text-emerald-400">LAAT HET HOREN.</span>
        </h2>

        <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
          Van een fijn contact naar een geverifieerde 5-sterren Google review in minder dan 3 seconden. Houd simpelweg een geschikte smartphone tegen jouw NFC kaart of sticker — de reviewpagina opent direct zonder aparte app.
        </p>

        {/* 3 Step Interactive Progress Pills */}
        <div className="w-full grid grid-cols-3 gap-2 pt-2">
          <button
            type="button"
            onClick={resetFlow}
            className={cn(
              "p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
              step === "idle"
                ? "bg-zinc-800 border-emerald-400 text-white shadow-sm"
                : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            )}
          >
            <div className="text-[9px] text-emerald-400 font-bold">STAP 01</div>
            <div className="text-xs font-bold mt-0.5">Kaart Erbij</div>
          </button>

          <button
            type="button"
            onClick={() => setStep("notified")}
            className={cn(
              "p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
              step === "tapping" || step === "notified"
                ? "bg-zinc-800 border-emerald-400 text-white shadow-sm"
                : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            )}
          >
            <div className="text-[9px] text-emerald-400 font-bold">STAP 02</div>
            <div className="text-xs font-bold mt-0.5">NFC Tik</div>
          </button>

          <button
            type="button"
            onClick={() => setStep("review")}
            className={cn(
              "p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
              step === "review" || step === "submitted"
                ? "bg-zinc-800 border-emerald-400 text-white shadow-sm"
                : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            )}
          >
            <div className="text-[9px] text-emerald-400 font-bold">STAP 03</div>
            <div className="text-xs font-bold mt-0.5">5 Sterren Review</div>
          </button>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <TactileButton
            variant="emerald"
            size="lg"
            onClick={startTapFlow}
            data-cursor="[TEST LIVE TIK]"
          >
            <Sparkles className="size-4" />
            <span>TEST LIVE NFC SIMULATIE</span>
          </TactileButton>

          {step !== "idle" && (
            <button
              type="button"
              onClick={resetFlow}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Simulatie</span>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Smartphone Device Mockup */}
      <div className="lg:col-span-6 flex items-center justify-center relative py-6">
        {/* Physical Smartphone Shell */}
        <div className="relative w-[280px] sm:w-[310px] aspect-[1/2.05] rounded-[42px] p-3 bg-[#1e2321] border-4 border-[#3c4642] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(52,168,83,0.15)] overflow-hidden select-none">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-30 flex items-center justify-center">
            <div className="size-2.5 rounded-full bg-zinc-900 ml-auto mr-2" />
          </div>

          {/* Phone Inner Screen */}
          <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#dce5d5] text-[#172a27] font-sans flex flex-col justify-between">
            {/* Status Bar */}
            <div className="relative z-20 px-6 pt-3 flex items-center justify-between font-mono text-[10px] font-bold text-zinc-700">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <span className="text-[9px]">5G</span>
                <span>▰</span>
              </div>
            </div>

            {/* SCREEN STATE: Home Screen / Lock Screen */}
            {step === "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col justify-between p-5 text-center bg-gradient-to-b from-[#e8eee3] via-[#b6c7aa] to-[#5a8066]"
              >
                <div className="mt-8">
                  <span className="font-mono text-xs text-zinc-700 uppercase tracking-widest">
                    DINSDAG 27 OKTOBER
                  </span>
                  <div className="font-display text-5xl font-bold tracking-tight text-zinc-900 mt-1">
                    09:41
                  </div>
                </div>

                {/* Simulated Grid Apps */}
                <div className="grid grid-cols-4 gap-3 px-2 my-auto">
                  {["6", "◉", "@", "♫", "☀", "↗", "≡", "⚙"].map((icon, idx) => (
                    <div
                      key={idx}
                      className="size-11 rounded-2xl bg-white/85 shadow-md flex items-center justify-center text-emerald-950 font-bold text-base"
                    >
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Dock Apps */}
                <div className="p-3 rounded-3xl bg-white/40 backdrop-blur-md grid grid-cols-4 gap-2 mb-4">
                  {["☎", "◎", "≋", "▤"].map((icon, idx) => (
                    <div
                      key={idx}
                      className="size-10 rounded-xl bg-white shadow flex items-center justify-center text-emerald-900 font-bold"
                    >
                      {icon}
                    </div>
                  ))}
                </div>

                {/* Tap Prompt Overlay Banner */}
                <button
                  type="button"
                  onClick={startTapFlow}
                  className="mx-auto px-4 py-2 rounded-full bg-black/80 text-white font-mono text-[10px] font-bold uppercase tracking-wider animate-bounce shadow-lg cursor-pointer"
                >
                  Houd NFC Kaart Hier ↗
                </button>
              </motion.div>
            )}

            {/* SCREEN STATE: Tapping & NFC Notification banner */}
            {(step === "tapping" || step === "notified") && (
              <div className="flex-1 relative flex flex-col justify-between p-5 bg-gradient-to-b from-[#e8eee3] via-[#b6c7aa] to-[#5a8066]">
                {/* Sonar Tap Animation Wave */}
                <AnimatePresence>
                  {step === "tapping" && (
                    <motion.div
                      initial={{ scale: 0.3, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-x-8 top-12 aspect-square rounded-full border-4 border-emerald-400 shadow-[0_0_30px_#00FF66] pointer-events-none z-20"
                    />
                  )}
                </AnimatePresence>

                {/* Drop-down Native iOS Notification */}
                <motion.div
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 18, stiffness: 220 }}
                  onClick={openReviewFromNotification}
                  data-cursor="[TIK OM REVIEW TE OPENEN]"
                  className="mt-6 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 flex items-center gap-3 cursor-pointer z-30 group"
                >
                  <div className="size-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 text-sm">
                    G
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <span className="font-bold text-[11px] text-zinc-900 block truncate">
                      NFC-tag gedetecteerd
                    </span>
                    <span className="text-[10px] text-zinc-500 block truncate">
                      Tik om reviewpagina van {businessName} te openen
                    </span>
                  </div>
                  <ArrowRight className="size-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                </motion.div>

                <div className="text-center my-auto font-mono text-[11px] text-zinc-800 bg-white/40 p-3 rounded-2xl backdrop-blur-sm">
                  <p className="font-bold">NFC TAG ACTIEF (13.56 MHz)</p>
                  <p className="text-[10px] text-zinc-600 mt-1">
                    Tik op de bovenstaande notificatie om de pagina te laden
                  </p>
                </div>

                <div className="mb-4 text-center">
                  <button
                    type="button"
                    onClick={openReviewFromNotification}
                    className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer hover:bg-emerald-700 transition-colors"
                  >
                    Open Reviewpagina ↗
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN STATE: Authentic Google Review Dialog */}
            {step === "review" && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 22, stiffness: 200 }}
                className="flex-1 flex flex-col justify-between p-4 bg-[#FBFDF9] text-zinc-900"
              >
                {/* Browser Address Bar */}
                <div className="py-1.5 px-3 rounded-lg bg-zinc-200/70 text-center font-mono text-[9px] text-zinc-600 truncate border border-zinc-300/60">
                  🔒 g.page/{businessName.toLowerCase().replace(/\s+/g, "")}/review
                </div>

                {/* Google Review Body */}
                <div className="my-auto text-center px-1">
                  {/* Brand Monogram */}
                  <div className="size-11 rounded-2xl bg-emerald-900 text-white font-display font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    {businessName.slice(0, 1).toUpperCase()}
                  </div>

                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider block text-zinc-700">
                    {businessName}
                  </span>

                  <h4 className="font-display text-lg font-bold tracking-tight text-zinc-950 mt-1">
                    Hoe was jouw ervaring?
                  </h4>
                  <p className="font-sans text-[10px] text-zinc-500">
                    Deel je beoordeling met toekomstige bezoekers.
                  </p>

                  {/* Interactive Star Rating */}
                  <div className="flex items-center justify-center gap-1.5 my-3">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const active = (hoverRating ?? rating) >= s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => {
                            setRating(s);
                            playMechanicalClick();
                            triggerHaptic("light");
                          }}
                          className="p-0.5 cursor-pointer transition-transform hover:scale-120"
                        >
                          <Star
                            className={cn(
                              "size-7 transition-colors",
                              active
                                ? "fill-[#FBBC04] text-[#FBBC04] drop-shadow-[0_2px_6px_rgba(251,188,4,0.5)]"
                                : "fill-zinc-300 text-zinc-300"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Editable Review Message Box */}
                  <div className="text-left">
                    <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">
                      JOUW ERVARING:
                    </label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 rounded-xl border border-zinc-300 bg-white font-sans text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none shadow-inner"
                      placeholder="Deel details over je ervaring..."
                    />
                  </div>
                </div>

                {/* Primary Submit Button */}
                <div className="space-y-1.5 pt-2">
                  <button
                    type="button"
                    onClick={submitReview}
                    data-cursor="[PLAATS REVIEW]"
                    className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.98]"
                  >
                    <Send className="size-3.5" />
                    <span>Deel je ervaring</span>
                  </button>
                  <p className="font-mono text-[8px] text-zinc-500 text-center">
                    Fictief voorbeeld · Er wordt geen echte review geplaatst
                  </p>
                </div>
              </motion.div>
            )}

            {/* SCREEN STATE: Submitted Success */}
            {step === "submitted" && (
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 flex flex-col justify-between p-5 bg-white text-zinc-900 text-center"
              >
                <div className="my-auto">
                  <div className="size-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
                    <Check className="size-8" />
                  </div>

                  <h4 className="font-display text-xl font-bold tracking-tight text-zinc-950">
                    Bedankt voor je review!
                  </h4>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].slice(0, rating).map((s) => (
                      <Star key={s} className="size-4 fill-[#FBBC04] text-[#FBBC04]" />
                    ))}
                  </div>
                  <p className="font-sans text-xs text-zinc-600 max-w-[220px] mx-auto mt-2 leading-relaxed">
                    Jouw feedback helpt andere klanten én verhoogt de Google vindbaarheid van {businessName}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetFlow}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-mono text-xs font-bold uppercase tracking-wider shadow cursor-pointer transition-colors"
                >
                  Opnieuw testen ↺
                </button>
              </motion.div>
            )}

            {/* Home Indicator bar */}
            <div className="relative z-20 pb-2 flex justify-center">
              <div className="w-24 h-1 rounded-full bg-zinc-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
