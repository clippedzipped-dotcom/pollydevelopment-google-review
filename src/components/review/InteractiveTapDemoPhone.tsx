"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
} from "motion/react";
import QRCode from "qrcode";
import {
  Star,
  Wifi,
  RotateCcw,
  Play,
  Pause,
  Check,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  CreditCard,
  Layers,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  playNfcTapSound,
  playMechanicalClick,
  playTickSound,
  playConfirmSound,
  triggerHaptic,
  setSoundEnabled,
} from "@/helpers/sound-effects";
import { TactileButton } from "@/components/kitchen/TactileButton";
import { cn } from "@/helpers/classname-helper";

interface InteractiveTapDemoPhoneProps {
  initialBusinessName?: string;
  className?: string;
}

const PRESET_BUSINESSES = [
  "Grand Café De Waag",
  "Joey & Luc Barber",
  "PollyDevelopment",
  "Autobedrijf Jansen",
];

export function InteractiveTapDemoPhone({
  initialBusinessName = "Grand Café De Waag",
  className,
}: InteractiveTapDemoPhoneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [cardMode, setCardMode] = useState<"photo" | "specimen">("photo");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState(
    "Fijne service, vriendelijk geholpen door Joey en Luc. Aanrader!"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  // Generate QR code for the specimen card
  useEffect(() => {
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetUrl = `https://googlereview.pollydevelopment.nl/r/${slug}`;
    QRCode.toDataURL(targetUrl, {
      margin: 1,
      width: 140,
      color: {
        dark: "#172a27",
        light: "#FFFFFF",
      },
    })
      .then(setQrCodeDataUrl)
      .catch(() => {});
  }, [businessName]);

  // SCROLL-SCRUBBING ENGINE
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    restDelta: 0.0005,
  });

  // Manual motion value used when simulation or step buttons are clicked
  const manualProgress = useMotionValue(0);
  const [isManualControl, setIsManualControl] = useState(false);

  // Sync scroll to manual motion value when user is scrolling
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (!isManualControl) {
        manualProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, isManualControl, manualProgress]);

  // Active Progress Value (drives all transforms)
  const activeProgress = manualProgress;

  // Track progress state for chapter highlight and audio cues
  const [currentProgressNum, setCurrentProgressNum] = useState(0);
  const hasPlayedTapRef = useRef(false);
  const lastStarCountRef = useRef(0);

  useEffect(() => {
    const unsubscribe = activeProgress.on("change", (p) => {
      setCurrentProgressNum(p);

      // AUDIO TRIGGER 1: NFC Tap contact threshold at progress ~0.35
      if (p >= 0.33 && p <= 0.45) {
        if (!hasPlayedTapRef.current) {
          hasPlayedTapRef.current = true;
          if (soundOn) playNfcTapSound();
          triggerHaptic("success");
        }
      } else if (p < 0.2) {
        hasPlayedTapRef.current = false;
      }

      // AUDIO TRIGGER 2: Star cascade clicks between 0.65 and 0.85
      if (p >= 0.65 && p <= 0.88) {
        const starIndex = Math.min(
          5,
          Math.max(0, Math.floor((p - 0.65) / 0.04) + 1)
        );
        if (starIndex !== lastStarCountRef.current && starIndex > lastStarCountRef.current) {
          lastStarCountRef.current = starIndex;
          if (soundOn) playTickSound(0.06);
        }
      } else if (p < 0.6) {
        lastStarCountRef.current = 0;
      }
    });
    return () => unsubscribe();
  }, [activeProgress, soundOn]);

  // MOTION TRANSFORMS (Faithfully mapped from PollyDevelopment hero.js & hero.css)

  // 1. Phone Transforms
  const phoneX = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [52, 52, -135, -12, -12, -12]
  );
  const phoneY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [-24, -24, 26, -6, -6, -6]
  );
  const phoneRotateZ = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [12, 12, -7, -3, -3, -3]
  );
  const phoneRotateY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [-16, -16, 8, 0, 0, 0]
  );
  const phoneScale = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [1, 1, 1.04, 1.03, 1.03, 1.03]
  );

  // 2. Card Transforms
  const cardY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [0, 0, -10, 14, 14, 14]
  );
  const cardRotateZ = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [-9, -9, 3, -7, -7, -7]
  );
  const cardScale = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [1, 1, 1.04, 1, 1, 1]
  );

  // 3. Tap Sonar Ring
  const ringOpacity = useTransform(
    activeProgress,
    [0, 0.32, 0.35, 0.42, 0.46, 1],
    [0, 0, 0.85, 0.45, 0, 0]
  );
  const ringScale = useTransform(
    activeProgress,
    [0, 0.32, 0.35, 0.44, 1],
    [0.45, 0.45, 0.9, 1.85, 1.85]
  );

  // 4. Phone Screen Transitions
  const notifOpacity = useTransform(
    activeProgress,
    [0, 0.33, 0.37, 0.48, 0.53, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const notifY = useTransform(
    activeProgress,
    [0, 0.33, 0.37, 0.48, 0.53, 1],
    [-16, -16, 0, 0, -14, -14]
  );

  const homeOpacity = useTransform(
    activeProgress,
    [0, 0.48, 0.57, 1],
    [1, 1, 0, 0]
  );
  const homeY = useTransform(
    activeProgress,
    [0, 0.48, 0.57, 1],
    [0, 0, -18, -18]
  );

  const reviewOpacity = useTransform(
    activeProgress,
    [0, 0.5, 0.59, 1],
    [0, 0, 1, 1]
  );
  const reviewY = useTransform(
    activeProgress,
    [0, 0.5, 0.59, 1],
    [26, 26, 0, 0]
  );
  const reviewScale = useTransform(
    activeProgress,
    [0, 0.5, 0.59, 1],
    [0.97, 0.97, 1, 1]
  );

  // 5. Left Chapters Fade
  const chap1Opacity = useTransform(activeProgress, [0, 0.18, 0.28, 1], [1, 1, 0, 0]);
  const chap1Y = useTransform(activeProgress, [0, 0.18, 0.28, 1], [0, 0, -22, -22]);

  const chap2Opacity = useTransform(
    activeProgress,
    [0, 0.24, 0.32, 0.52, 0.59, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const chap2Y = useTransform(
    activeProgress,
    [0, 0.24, 0.32, 0.52, 0.59, 1],
    [22, 22, 0, 0, -22, -22]
  );

  const chap3Opacity = useTransform(activeProgress, [0, 0.54, 0.62, 1], [0, 0, 1, 1]);
  const chap3Y = useTransform(activeProgress, [0, 0.54, 0.62, 1], [22, 22, 0, 0]);

  // Auto-play simulation runner
  const runSimulation = () => {
    setIsManualControl(true);
    setIsSimulating(true);
    playMechanicalClick();
    triggerHaptic("medium");

    manualProgress.set(0);
    animate(manualProgress, 1, {
      duration: 5.4,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setIsSimulating(false);
      },
    });
  };

  const jumpToStep = (target: number) => {
    setIsManualControl(true);
    setIsSimulating(false);
    playMechanicalClick();
    triggerHaptic("light");

    animate(manualProgress, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const resetSimulation = () => {
    setIsManualControl(false);
    setIsSimulating(false);
    setIsSubmitted(false);
    playMechanicalClick();
    triggerHaptic("light");
    manualProgress.set(0);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playMechanicalClick();
  };

  const handleReviewSubmit = () => {
    if (soundOn) playConfirmSound();
    triggerHaptic("success");
    setIsSubmitted(true);

    if (typeof window !== "undefined") {
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FBBC04", "#34A853", "#4285F4", "#EA4335", "#FFFFFF"],
          disableForReducedMotion: true,
        });
      } catch {}
    }
  };

  // Determine current active chapter index
  const activeChapter =
    currentProgressNum < 0.25 ? 1 : currentProgressNum < 0.56 ? 2 : 3;

  // Star illumination calculation from scroll progress
  const animatedStarsCount =
    currentProgressNum < 0.66
      ? 0
      : currentProgressNum < 0.70
      ? 1
      : currentProgressNum < 0.74
      ? 2
      : currentProgressNum < 0.78
      ? 3
      : currentProgressNum < 0.82
      ? 4
      : 5;

  return (
    <section
      id="tap-demo"
      ref={containerRef}
      className={cn("tap-story tap-live relative w-full border-b border-white/10", className)}
    >
      {/* STICKY STAGE (Locked into viewport while scrubbing 340svh) */}
      <div className="tap-stage sticky top-0 h-screen min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-[#070907]">
        {/* Ambient Stage Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(38,62,48,0.35)_0%,transparent_65%)]"
        />

        {/* 2-Column Responsive Layout */}
        <div className="tap-layout w-full max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 pt-16 sm:pt-20">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Narrative Chapters, Live Customizer & Tactile Controls       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left z-20 max-w-xl">
            {/* Kicker Eyebrow */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-3">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EEN KLEIN KAARTJE · EEN GROOT GEBAAR</span>
            </div>

            {/* Cross-fading Sticky Story Chapters */}
            <div className="tap-chapters relative min-h-[220px] sm:min-h-[240px] w-full">
              {/* Chapter 1: Ruststand */}
              <motion.div
                style={{ opacity: chap1Opacity, y: chap1Y }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-start transition-none pointer-events-none",
                  activeChapter === 1 && "pointer-events-auto"
                )}
              >
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
                  GOED GEDAAN?<br />
                  <span className="text-emerald-400">LAAT HET HOREN.</span>
                </h1>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-md">
                  Van een fijn contact naar een eerlijke Google review. Met één simpele tik op jouw gepersonaliseerde NFC-kaart of sticker.
                </p>
              </motion.div>

              {/* Chapter 2: Contact Tik */}
              <motion.div
                style={{ opacity: chap2Opacity, y: chap2Y }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-start transition-none pointer-events-none",
                  activeChapter === 2 && "pointer-events-auto"
                )}
              >
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
                  TELEFOON ERBIJ.<br />
                  <span className="text-emerald-400">PAGINA OPEN.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-md">
                  Houd een geschikte smartphone bij het pasje. De reviewpagina van jouw bedrijf opent binnen 1 seconde, zonder app of handmatig typen.
                </p>
              </motion.div>

              {/* Chapter 3: 5 Sterren Ervaring */}
              <motion.div
                style={{ opacity: chap3Opacity, y: chap3Y }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-start transition-none pointer-events-none",
                  activeChapter === 3 && "pointer-events-auto"
                )}
              >
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
                  HUN ERVARING.<br />
                  <span className="text-emerald-400">JOUW VERHAAL.</span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed max-w-md">
                  Je klant kiest zelf de gewenste sterren en deelt direct een mening. Test het live in de smartphone hiernaast!
                </p>
              </motion.div>
            </div>

            {/* LIVE BUSINESS NAME CUSTOMIZER (The Kitchen New Element) */}
            <div className="w-full p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-xl mt-2 mb-3">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="size-3" />
                  LIVE VOORBEELD BEDRIJF:
                </span>
                <span className="text-zinc-500">REALTIME UPDATE OP TOESTEL</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Voer jouw zaak in..."
                  className="flex-1 bg-black/60 border border-zinc-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />

                <div className="hidden sm:flex items-center gap-1">
                  {PRESET_BUSINESSES.slice(0, 2).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setBusinessName(preset);
                        playMechanicalClick();
                      }}
                      className={cn(
                        "px-2 py-1 rounded-lg font-mono text-[9px] uppercase transition-colors cursor-pointer border",
                        businessName === preset
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                          : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white"
                      )}
                    >
                      {preset.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP SCRUBBER PILLS (The Kitchen Skeuomorfisme 2.0) */}
            <div className="w-full grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => jumpToStep(0.05)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
                  activeChapter === 1
                    ? "bg-zinc-800 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="text-[9px] text-emerald-400 font-bold">STAP 01</div>
                <div className="text-xs font-bold mt-0.5 truncate">01. Ruststand</div>
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(0.38)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
                  activeChapter === 2
                    ? "bg-zinc-800 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="text-[9px] text-emerald-400 font-bold">STAP 02</div>
                <div className="text-xs font-bold mt-0.5 truncate">02. NFC Tik</div>
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(0.78)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer",
                  activeChapter === 3
                    ? "bg-zinc-800 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="text-[9px] text-emerald-400 font-bold">STAP 03</div>
                <div className="text-xs font-bold mt-0.5 truncate">03. 5 Sterren</div>
              </button>
            </div>

            {/* ACTION ROW & TOOL BAR */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5 w-full">
              {/* Simulation Play / Pause Button */}
              <TactileButton
                variant="emerald"
                size="md"
                onClick={runSimulation}
                data-cursor="[SPEEL SIMULATIE AF]"
              >
                {isSimulating ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                <span>{isSimulating ? "SIMULATIE BEZIG..." : "SPEEL SIMULATIE AF"}</span>
              </TactileButton>

              {/* Reset Button */}
              {currentProgressNum > 0.05 && (
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                  title="Herstart simulatie naar beginstand"
                >
                  <RotateCcw className="size-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              {/* Card Specimen Switcher */}
              <button
                type="button"
                onClick={() => {
                  setCardMode(cardMode === "photo" ? "specimen" : "photo");
                  playMechanicalClick();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-emerald-400 font-mono text-xs transition-colors cursor-pointer ml-auto"
                title="Wissel kaartweergave"
              >
                {cardMode === "photo" ? (
                  <>
                    <CreditCard className="size-3.5 text-emerald-400" />
                    <span>3D Specimen ↗</span>
                  </>
                ) : (
                  <>
                    <Layers className="size-3.5 text-emerald-400" />
                    <span>Originele Foto ↗</span>
                  </>
                )}
              </button>

              {/* Web Audio Mute / Unmute Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={soundOn ? "Geluid aan (Web Audio Synthesizer)" : "Geluid gedempt"}
              >
                {soundOn ? <Volume2 className="size-3.5 text-emerald-400" /> : <VolumeX className="size-3.5" />}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Authentic 3D Stage with NFC Card, Ring & Smartphone Mockup  */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] select-none">
            {/* Visual Tap Demo Stage Canvas */}
            <div className="tap-demo relative w-full h-[460px] sm:h-[520px]">
              {/* Radial ambient stage floor reflection */}
              <div className="tap-surface" />

              {/* ------------------------------------------------------------- */}
              {/* THE NFC CARD (Reacts with 3D tilt & elevation upon tap contact) */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={{
                  y: cardY,
                  rotateZ: cardRotateZ,
                  scale: cardScale,
                }}
                className="nfc-card"
              >
                {cardMode === "photo" ? (
                  /* Original Authentic PollyDevelopment Cutout Photo */
                  <div className="nfc-photo">
                    <Image
                      src="/images/products/review-card.png"
                      alt="PollyDevelopment NFC Review Kaart"
                      width={900}
                      height={600}
                      priority
                      className="object-cover select-none pointer-events-none"
                    />
                  </div>
                ) : (
                  /* High-Craft 3D Tactile Specimen (The Kitchen Skeuomorfisme 2.0) */
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1b2b24] to-[#0c1612] border border-emerald-500/40 p-3 shadow-2xl flex flex-col justify-between text-white overflow-hidden relative">
                    <div className="flex items-center justify-between">
                      <div className="size-5 rounded-md bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center">
                        <Wifi className="size-3 text-emerald-400 rotate-90" />
                      </div>
                      <span className="font-mono text-[8px] text-emerald-400 tracking-wider">
                        NFC 13.56 MHz
                      </span>
                    </div>

                    <div className="my-auto text-center px-1">
                      <div className="size-7 rounded-lg bg-black/60 border border-emerald-400/30 flex items-center justify-center mx-auto mb-1">
                        <span className="font-display text-emerald-400 text-xs font-bold">
                          {businessName.slice(0, 1).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-display text-[11px] font-bold uppercase tracking-tight block truncate text-zinc-100">
                        {businessName}
                      </span>
                      <div className="flex items-center justify-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="size-2.5 fill-[#FBBC04] text-[#FBBC04]" />
                        ))}
                      </div>
                    </div>

                    {qrCodeDataUrl ? (
                      <div className="mx-auto size-12 bg-white p-1 rounded-md shadow">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={qrCodeDataUrl}
                          alt="Review QR Code"
                          className="size-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-10" />
                    )}

                    <div className="text-center font-mono text-[7px] text-zinc-400 uppercase tracking-widest">
                      PollyDevelopment
                    </div>
                  </div>
                )}
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* CONTACT SONAR BURST RING (Expands & pulses at tap point)       */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={{
                  opacity: ringOpacity,
                  scale: ringScale,
                }}
                className="tap-ring pointer-events-none"
              />

              {/* ------------------------------------------------------------- */}
              {/* THE SMARTPHONE DEVICE (Flies in, connects, and opens review)   */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={{
                  x: phoneX,
                  y: phoneY,
                  rotateZ: phoneRotateZ,
                  rotateY: phoneRotateY,
                  scale: phoneScale,
                }}
                className="demo-phone"
              >
                {/* Phone Glass Inner Screen */}
                <div className="phone-screen relative">
                  {/* Status Bar */}
                  <div className="phone-status">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[8px]">5G</span>
                      <span>▰</span>
                    </div>
                  </div>

                  {/* Dynamic Island Notch */}
                  <div className="phone-island" />

                  {/* SCREEN 1: Home Wallpaper & iOS Apps (Fades out after tap) */}
                  <motion.div
                    style={{
                      opacity: homeOpacity,
                      y: homeY,
                    }}
                    className="phone-home"
                  >
                    <div className="home-date text-zinc-800 font-medium">
                      Dinsdag 27 oktober
                    </div>
                    <div className="home-clock text-zinc-950">09:41</div>

                    <div className="home-apps">
                      <span className="app-calendar">27</span>
                      <span className="app-camera">◉</span>
                      <span className="app-mail">@</span>
                      <span className="app-music">♫</span>
                      <span className="app-weather">☀</span>
                      <span className="app-map">↗</span>
                      <span className="app-notes">≡</span>
                      <span className="app-settings">⚙</span>
                    </div>

                    <div className="home-dock">
                      <span>☎</span>
                      <span>◎</span>
                      <span>≋</span>
                      <span>▤</span>
                    </div>
                  </motion.div>

                  {/* DROP-DOWN NATIVE NOTIFICATION (Slides down at NFC tap) */}
                  <motion.div
                    style={{
                      opacity: notifOpacity,
                      y: notifY,
                    }}
                    onClick={() => jumpToStep(0.78)}
                    className="phone-notification cursor-pointer group"
                    title="Tik om review direct te openen"
                  >
                    <span className="notification-icon bg-emerald-100 text-emerald-900 border border-emerald-300">
                      G
                    </span>
                    <div className="text-left flex-1 min-w-0">
                      <strong className="text-zinc-950 font-bold block truncate">
                        NFC-tag gedetecteerd
                      </strong>
                      <span className="text-zinc-600 truncate block">
                        Open reviewpagina van {businessName}
                      </span>
                    </div>
                    <ArrowRight className="size-3 text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                  </motion.div>

                  {/* SCREEN 2: Google Review Web Page (Authentic Form) */}
                  <motion.div
                    style={{
                      opacity: reviewOpacity,
                      y: reviewY,
                      scale: reviewScale,
                    }}
                    className="phone-review"
                  >
                    {/* Simulated Browser Address Bar */}
                    <div className="browser-address">
                      🔒 g.page/{businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}/review
                    </div>

                    {/* Review Page Body */}
                    <div className="review-page">
                      {!isSubmitted ? (
                        <>
                          {/* Business Monogram & Title */}
                          <div className="review-brand">
                            {businessName.slice(0, 1).toUpperCase()}
                          </div>
                          <p className="review-business truncate px-2">{businessName}</p>

                          <h3>
                            Hoe was jouw<br />ervaring?
                          </h3>
                          <p className="text-zinc-500 text-[8px]">
                            Deel je beoordeling met toekomstige bezoekers.
                          </p>

                          {/* 5 Golden Interactive Stars */}
                          <div className="review-stars flex justify-center gap-1 my-2">
                            {[1, 2, 3, 4, 5].map((s) => {
                              // If user interacted manually, use `rating`; otherwise use animated cascade
                              const isGold =
                                (hoverRating ?? (rating || animatedStarsCount)) >= s;
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  onMouseEnter={() => setHoverRating(s)}
                                  onMouseLeave={() => setHoverRating(null)}
                                  onClick={() => {
                                    setRating(s);
                                    if (soundOn) playMechanicalClick();
                                    triggerHaptic("light");
                                  }}
                                  className="cursor-pointer transition-transform hover:scale-125 focus:outline-none p-0.5"
                                  aria-label={`${s} sterren`}
                                >
                                  <Star
                                    className={cn(
                                      "size-4 sm:size-5 transition-colors",
                                      isGold
                                        ? "fill-[#FBBC04] text-[#FBBC04] drop-shadow-[0_1px_4px_rgba(251,188,4,0.4)]"
                                        : "fill-[#b4bdb1] text-[#b4bdb1]"
                                    )}
                                  />
                                </button>
                              );
                            })}
                          </div>

                          {/* Editable Message Box */}
                          <div className="review-message text-left">
                            <textarea
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              rows={2}
                              className="w-full bg-transparent border-0 text-[8px] text-zinc-800 leading-tight focus:outline-none resize-none p-0"
                              placeholder="Schrijf je ervaring..."
                            />
                          </div>

                          {/* Tactile Review Submit Button */}
                          <button
                            type="button"
                            onClick={handleReviewSubmit}
                            className="review-submit w-full cursor-pointer transition-transform active:scale-[0.97] flex items-center justify-center gap-1.5"
                          >
                            <Send className="size-2.5" />
                            <span>Deel je ervaring</span>
                          </button>

                          <p className="review-disclaimer text-[7px] text-zinc-400 mt-2">
                            Fictief interactief voorbeeld · Er wordt geen review geplaatst.
                          </p>
                        </>
                      ) : (
                        /* Submitted Success State */
                        <div className="py-6 flex flex-col items-center justify-center text-center">
                          <div className="size-10 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-2 animate-bounce">
                            <Check className="size-6" />
                          </div>
                          <h4 className="font-bold text-xs text-zinc-900">
                            Bedankt voor je review!
                          </h4>
                          <div className="flex items-center justify-center gap-0.5 my-1.5">
                            {[1, 2, 3, 4, 5].slice(0, rating).map((s) => (
                              <Star key={s} className="size-3 fill-[#FBBC04] text-[#FBBC04]" />
                            ))}
                          </div>
                          <p className="text-[8px] text-zinc-500 leading-tight max-w-[170px] mx-auto">
                            Jouw feedback helpt andere klanten én verhoogt de Google vindbaarheid van {businessName}.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsSubmitted(false)}
                            className="mt-3 px-3 py-1 rounded-md bg-zinc-800 text-white font-mono text-[8px] uppercase tracking-wider hover:bg-black cursor-pointer"
                          >
                            Opnieuw testen ↺
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Home Indicator */}
                  <div className="home-indicator" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom of Stage */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/5">
          <motion.div
            style={{ scaleX: activeProgress }}
            className="h-full bg-emerald-400 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
