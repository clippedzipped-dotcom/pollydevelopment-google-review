"use client";

import React, { useState, useRef, useEffect, type MouseEvent } from "react";
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
  RotateCw,
  Disc,
  Monitor,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  COLOR_SWATCHES,
  ReviewColorSwatch,
  REVIEW_PRODUCTS,
} from "@/data/review-products";
import {
  playNfcTapSound,
  playMechanicalClick,
  playTickSound,
  playConfirmSound,
  playTabSwitch,
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
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Business Customizer state
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [cardMode, setCardMode] = useState<"3d" | "photo">("3d");
  const [selectedProductId, setSelectedProductId] = useState<"card" | "sticker" | "display">("card");
  const [selectedColor, setSelectedColor] = useState<ReviewColorSwatch>("sage");
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D Tilt & Specular Glare state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Spotlight stage position for living ambient lighting
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Review interaction state inside phone
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState(
    "Fijne service, vriendelijk geholpen door Joey en Luc. Aanrader!"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const swatch = COLOR_SWATCHES[selectedColor];
  const product = REVIEW_PRODUCTS[selectedProductId];

  // Generate dynamic QR code for the business review slug
  useEffect(() => {
    const slug = businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const targetUrl = `https://googlereview.pollydevelopment.nl/r/${slug || "review"}`;
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

  // SCROLL-SCRUBBING ENGINE (Snappy 260svh container track)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.0005,
  });

  // Track manual simulation progress override
  const manualProgress = useMotionValue(0);
  const [isManualControl, setIsManualControl] = useState(false);

  // Reset manual lock-out on real user scroll
  useEffect(() => {
    const handleScrollIntent = () => {
      setIsManualControl(false);
      setIsSimulating(false);
    };
    window.addEventListener("wheel", handleScrollIntent, { passive: true });
    window.addEventListener("touchmove", handleScrollIntent, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleScrollIntent);
      window.removeEventListener("touchmove", handleScrollIntent);
    };
  }, []);

  // Sync scroll progress to motion value
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (!isManualControl) {
        manualProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, isManualControl, manualProgress]);

  const activeProgress = manualProgress;

  // Track progress numbers for step indicators & procedural audio triggers
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

  // MOTION TRANSFORMS (Calibrated kinematics for authentic physical contact & phone focus)

  // 1. Phone Transforms (Meets card on tap, then straightens up into clear review focus)
  const phoneX = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [0, 0, -28, 0, 0, 0]
  );
  const phoneY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [0, 0, 16, -4, -4, -4]
  );
  const phoneRotateZ = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [8, 8, -4, 0, 0, 0]
  );
  const phoneRotateY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [-10, -10, 6, 0, 0, 0]
  );
  const phoneScale = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.54, 0.72, 1],
    [1, 1, 1.02, 1.05, 1.05, 1.05]
  );

  // 2. Card Transforms (Translates towards phone top edge at tap, then rests back)
  const cardX = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.52, 0.75, 1],
    [0, 0, 85, 20, 8, 0]
  );
  const cardY = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.52, 0.75, 1],
    [0, 0, -14, 10, 10, 10]
  );
  const cardRotateZ = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.52, 0.75, 1],
    [-8, -8, 5, -5, -5, -5]
  );
  const cardScale = useTransform(
    activeProgress,
    [0, 0.15, 0.36, 0.52, 0.75, 1],
    [1, 1, 1.04, 0.98, 0.98, 0.98]
  );
  const cardOpacity = useTransform(
    activeProgress,
    [0, 0.45, 0.60, 1],
    [1, 1, 0.9, 0.85]
  );

  // 3. Tap Sonar Ring (Centered at the NFC antenna contact point)
  const ringOpacity = useTransform(
    activeProgress,
    [0, 0.32, 0.36, 0.44, 0.50, 1],
    [0, 0, 1, 0.4, 0, 0]
  );
  const ringScale = useTransform(
    activeProgress,
    [0, 0.32, 0.36, 0.46, 1],
    [0.35, 0.35, 1, 2.2, 2.2]
  );

  // 4. Phone Screen Transitions
  const notifOpacity = useTransform(
    activeProgress,
    [0, 0.25, 0.32, 0.50, 0.56, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const notifY = useTransform(
    activeProgress,
    [0, 0.25, 0.32, 0.50, 0.56, 1],
    [-18, -18, 0, 0, -12, -12]
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

  // 5. Left Story Chapters
  const chap1Opacity = useTransform(activeProgress, [0, 0.18, 0.28, 1], [1, 1, 0, 0]);
  const chap1Y = useTransform(activeProgress, [0, 0.18, 0.28, 1], [0, 0, -20, -20]);

  const chap2Opacity = useTransform(
    activeProgress,
    [0, 0.24, 0.32, 0.52, 0.59, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const chap2Y = useTransform(
    activeProgress,
    [0, 0.24, 0.32, 0.52, 0.59, 1],
    [20, 20, 0, 0, -20, -20]
  );

  const chap3Opacity = useTransform(activeProgress, [0, 0.54, 0.62, 1], [0, 0, 1, 1]);
  const chap3Y = useTransform(activeProgress, [0, 0.54, 0.62, 1], [20, 20, 0, 0]);

  // Stage Mouse Move for Living Spotlight & 3D Specimen Tilt
  const handleStageMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  // Card Mouse Move for 3D Specimen Glare & Tilt
  const handleCardMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || cardMode !== "3d") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleCardMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleFlipCard = () => {
    playMechanicalClick();
    triggerHaptic("medium");
    setIsFlipped(!isFlipped);
  };

  // Run auto simulation
  const runSimulation = () => {
    setIsManualControl(true);
    setIsSimulating(true);
    playMechanicalClick();
    triggerHaptic("medium");

    manualProgress.set(0);
    animate(manualProgress, 1, {
      duration: 4.8,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        setIsSimulating(false);
      },
    });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const targetScroll = currentScroll + rect.top;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const jumpToStep = (target: number) => {
    setIsManualControl(true);
    setIsSimulating(false);
    playMechanicalClick();
    triggerHaptic("light");

    animate(manualProgress, target, {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    });

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const targetScroll =
        currentScroll +
        rect.top +
        (containerRef.current.offsetHeight - window.innerHeight) * target;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const resetSimulation = () => {
    setIsManualControl(false);
    setIsSimulating(false);
    setIsSubmitted(false);
    playMechanicalClick();
    triggerHaptic("light");
    manualProgress.set(0);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      window.scrollTo({ top: currentScroll + rect.top, behavior: "smooth" });
    }
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
          particleCount: 50,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#FBBC04", "#34A853", "#4285F4", "#EA4335", "#FFFFFF"],
          disableForReducedMotion: true,
        });
      } catch {}
    }
  };

  const activeChapter =
    currentProgressNum < 0.25 ? 1 : currentProgressNum < 0.56 ? 2 : 3;

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
      className={cn(
        "tap-story relative w-full h-[260svh] border-b border-white/10 bg-[#070907] overflow-x-clip",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* AMBIENT LIVING ATMOSPHERE & CAD TECHNICAL GRID (The Kitchen Standard)     */}
      {/* ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_65%_35%,rgba(0,255,102,0.06)_0%,rgba(38,62,48,0.22)_35%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-20 cad-grid-pattern"
      />

      {/* ========================================================================= */}
      {/* STICKY STAGE VIEWPORT (100svh pinned during 260svh scrub)                 */}
      {/* ========================================================================= */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        className="sticky top-0 h-screen min-h-[100svh] w-full flex items-center justify-center overflow-hidden z-10"
      >
        {/* Dynamic Living Cursor Spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(650px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 255, 102, 0.08) 0%, rgba(38, 62, 48, 0.05) 40%, transparent 80%)`,
          }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10 pt-16 sm:pt-20">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Narrative Chapters, Live Customizer & Tactile Controls       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left z-20 max-w-xl">
            {/* Kicker Eyebrow with Radar Pulse */}
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2 sm:mb-3">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00FF66]" />
              <span>NFC HARDWARE SPECIMEN // 3D SCROLLYTELLING</span>
            </div>

            {/* Cross-fading Narrative Chapters */}
            <div className="relative min-h-[190px] sm:min-h-[210px] w-full">
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
                  <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(0,255,102,0.25)]">
                    LAAT HET HOREN.
                  </span>
                </h1>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-3 sm:mt-4 leading-relaxed max-w-md">
                  Van een fijn klantcontact naar een geverifieerde 5-sterren Google review. Met één simpele tik op jouw 3D-ontworpen NFC-kaart, sticker of tafeldisplay.
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
                  <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(0,255,102,0.25)]">
                    PAGINA OPEN.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-3 sm:mt-4 leading-relaxed max-w-md">
                  Houd een geschikte smartphone tegen de NFC-chip. De officiële Google reviewpagina opent binnen 200 milliseconden zonder aparte app.
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
                  <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(0,255,102,0.25)]">
                    JOUW VERHAAL.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-zinc-400 mt-3 sm:mt-4 leading-relaxed max-w-md">
                  Je klant kiest zelf de gewenste sterren en deelt direct een ervaring. Test de interactieve review live in het telefoonscherm hiernaast!
                </p>
              </motion.div>
            </div>

            {/* LIVE CUSTOMIZER & 3D STUDIO CONTROLS (The Kitchen Standard) */}
            <div className="w-full p-3 sm:p-4 rounded-2xl bg-[#0c100e]/85 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_45px_rgba(0,0,0,0.85)] mt-1 mb-3 space-y-3">
              {/* Header with Product Form-Factor Selector */}
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="size-3" />
                  3D HARDWARE VORMFACTOR:
                </span>

                {/* Form-Factor Segmented Control */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/60 border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProductId("card");
                      playTabSwitch();
                      triggerHaptic("light");
                    }}
                    className={cn(
                      "px-2 py-0.5 rounded-md font-mono text-[8px] uppercase transition-all cursor-pointer flex items-center gap-1",
                      selectedProductId === "card"
                        ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    )}
                  >
                    <CreditCard className="size-2.5" />
                    <span>Pasje</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProductId("sticker");
                      playTabSwitch();
                      triggerHaptic("light");
                    }}
                    className={cn(
                      "px-2 py-0.5 rounded-md font-mono text-[8px] uppercase transition-all cursor-pointer flex items-center gap-1",
                      selectedProductId === "sticker"
                        ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    )}
                  >
                    <Disc className="size-2.5" />
                    <span>Sticker</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProductId("display");
                      playTabSwitch();
                      triggerHaptic("light");
                    }}
                    className={cn(
                      "px-2 py-0.5 rounded-md font-mono text-[8px] uppercase transition-all cursor-pointer flex items-center gap-1",
                      selectedProductId === "display"
                        ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    )}
                  >
                    <Monitor className="size-2.5" />
                    <span>Display</span>
                  </button>
                </div>
              </div>

              {/* Business Name Input & Presets */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Voer jouw zaak in..."
                  className="flex-1 bg-black/60 border border-zinc-700/80 rounded-xl px-3 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
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
                          : "bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:text-white"
                      )}
                    >
                      {preset.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Color Swatch & Card Mode Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-zinc-500 uppercase">Kleur:</span>
                  {(Object.keys(COLOR_SWATCHES) as ReviewColorSwatch[]).map((cKey) => {
                    const c = COLOR_SWATCHES[cKey];
                    const isSelected = selectedColor === cKey;
                    return (
                      <button
                        key={cKey}
                        type="button"
                        onClick={() => {
                          setSelectedColor(cKey);
                          playMechanicalClick();
                          triggerHaptic("light");
                        }}
                        style={{ backgroundColor: c.primaryBg }}
                        className={cn(
                          "size-5 rounded-full border transition-all cursor-pointer relative",
                          isSelected
                            ? "border-emerald-400 scale-125 shadow-[0_0_10px_#00FF66]"
                            : "border-zinc-700 hover:scale-110 opacity-70 hover:opacity-100"
                        )}
                        title={c.name}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 m-auto size-1.5 rounded-full bg-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  {cardMode === "3d" && (
                    <button
                      type="button"
                      onClick={handleFlipCard}
                      className="flex items-center gap-1 text-[9px] text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <RotateCw className="size-2.5" />
                      <span>{isFlipped ? "Voorkant" : "Draai om 180°"}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setCardMode(cardMode === "3d" ? "photo" : "3d");
                      playMechanicalClick();
                    }}
                    className="text-[9px] text-emerald-400 hover:underline uppercase tracking-wider cursor-pointer"
                  >
                    {cardMode === "3d" ? "📷 Originele Foto" : "✨ 3D Specimen"}
                  </button>
                </div>
              </div>
            </div>

            {/* STEP SCRUBBER PILLS (With Active LED Indicators) */}
            <div className="w-full grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => jumpToStep(0.05)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer select-none",
                  activeChapter === 1
                    ? "bg-zinc-800/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-all",
                      activeChapter === 1
                        ? "bg-emerald-400 shadow-[0_0_6px_#00FF66]"
                        : "bg-zinc-700"
                    )}
                  />
                  <span className="text-[9px] text-emerald-400 font-bold">STAP 01</span>
                </div>
                <div className="text-xs font-bold mt-0.5 truncate">01. Ruststand</div>
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(0.38)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer select-none",
                  activeChapter === 2
                    ? "bg-zinc-800/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-all",
                      activeChapter === 2
                        ? "bg-emerald-400 shadow-[0_0_6px_#00FF66]"
                        : "bg-zinc-700"
                    )}
                  />
                  <span className="text-[9px] text-emerald-400 font-bold">STAP 02</span>
                </div>
                <div className="text-xs font-bold mt-0.5 truncate">02. NFC Tik</div>
              </button>

              <button
                type="button"
                onClick={() => jumpToStep(0.78)}
                className={cn(
                  "p-2 sm:p-2.5 rounded-xl border text-left font-mono transition-all cursor-pointer select-none",
                  activeChapter === 3
                    ? "bg-zinc-800/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                    : "bg-black/40 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-all",
                      activeChapter === 3
                        ? "bg-emerald-400 shadow-[0_0_6px_#00FF66]"
                        : "bg-zinc-700"
                    )}
                  />
                  <span className="text-[9px] text-emerald-400 font-bold">STAP 03</span>
                </div>
                <div className="text-xs font-bold mt-0.5 truncate">03. 5 Sterren</div>
              </button>
            </div>

            {/* ACTION ROW & TOOL BAR */}
            <div className="pt-3 flex flex-wrap items-center gap-2.5 w-full">
              <TactileButton
                variant="emerald"
                size="md"
                onClick={runSimulation}
                data-cursor="[SPEEL SIMULATIE AF]"
              >
                {isSimulating ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                <span>{isSimulating ? "SIMULATIE BEZIG..." : "SPEEL SIMULATIE AF"}</span>
              </TactileButton>

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

              <a
                href="#collectie"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white font-mono text-xs transition-colors ml-auto"
              >
                <span>Bekijk Collectie</span>
                <ArrowRight className="size-3 text-emerald-400" />
              </a>

              {/* Sound Equalizer Visualizer Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={soundOn ? "Geluid aan (Web Audio Synthesizer)" : "Geluid gedempt"}
              >
                {soundOn ? (
                  <>
                    <Volume2 className="size-3.5 text-emerald-400" />
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                      <span className="w-0.5 h-3 bg-emerald-400 animate-pulse delay-75" />
                      <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse delay-150" />
                    </div>
                  </>
                ) : (
                  <VolumeX className="size-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: 3D Hardware Specimen + Phone Contact Stage                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] select-none">
            {/* Dedicated Stage Box with Perspective */}
            <div
              className="relative w-full max-w-[560px] h-[460px] sm:h-[520px] flex items-center justify-center"
              style={{ perspective: 1400 }}
            >
              {/* Radial ambient stage floor reflection */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(38,62,48,0.45)_0%,transparent_70%)] pointer-events-none"
              />

              {/* ------------------------------------------------------------- */}
              {/* THE 3D NFC SPECIMEN (Card, Sticker, or Display)                */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  x: cardX,
                  y: cardY,
                  rotateZ: cardRotateZ,
                  scale: cardScale,
                  opacity: cardOpacity,
                  transformStyle: "preserve-3d",
                }}
                animate={
                  cardMode === "3d"
                    ? {
                        rotateX: isFlipped ? -rotateX : rotateX,
                        rotateY: isFlipped ? 180 + rotateY : rotateY,
                      }
                    : {}
                }
                transition={{
                  type: "spring",
                  damping: 24,
                  stiffness: 180,
                }}
                className={cn(
                  "absolute z-10 cursor-pointer transition-shadow",
                  cardMode === "photo"
                    ? "nfc-card"
                    : selectedProductId === "sticker"
                    ? "left-[6%] sm:left-[10%] top-[24%] sm:top-[26%] size-[220px] sm:size-[250px] rounded-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(80,102,84,0.35)]"
                    : selectedProductId === "display"
                    ? "left-[6%] sm:left-[10%] top-[20%] sm:top-[22%] w-[230px] sm:w-[260px] aspect-[80/120] rounded-2xl shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_35px_rgba(80,102,84,0.3)]"
                    : "left-[4%] sm:left-[8%] top-[24%] sm:top-[26%] w-[250px] sm:w-[290px] aspect-[85.6/53.98] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(80,102,84,0.3)]"
                )}
              >
                {cardMode === "photo" ? (
                  /* Original PollyDevelopment Photographic Cutout */
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
                  /* THE HIGH-CRAFT 3D SPECIMEN (Front & Back in 3D Space) */
                  <>
                    {/* FRONT FACE */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        background: `linear-gradient(135deg, ${swatch.primaryBg} 0%, ${swatch.secondaryBg} 100%)`,
                      }}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-between overflow-hidden border p-4 sm:p-5 transition-colors duration-300",
                        selectedProductId === "sticker" ? "rounded-full" : "rounded-2xl",
                        swatch.border,
                        swatch.textColor
                      )}
                    >
                      {/* Holographic Specular Glare */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-200"
                        style={{
                          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(251, 188, 4, 0.25) 35%, transparent 70%)`,
                          opacity: glarePos.opacity,
                        }}
                      />

                      {/* Substrate Brushed Micro-Texture */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-15"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px)",
                        }}
                      />

                      {/* Concentric NFC Antenna Coil for Stickers */}
                      {selectedProductId === "sticker" && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-3 rounded-full border border-white/20 opacity-30 flex items-center justify-center"
                        >
                          <div className="size-4/5 rounded-full border border-dashed border-white/25" />
                        </div>
                      )}

                      {/* Top Row: Business Brand & NFC Contact Wave */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded-lg bg-black/50 border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-sm">
                            <Image
                              src="/images/products/pollydevelopment-logo.png"
                              alt="Logo"
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <span className="font-mono text-[8px] tracking-[0.2em] font-bold uppercase block opacity-75">
                              GOOGLE REVIEW
                            </span>
                            <span className="font-mono text-[11px] sm:text-xs font-black tracking-tight uppercase block leading-none truncate max-w-[140px]">
                              {businessName}
                            </span>
                          </div>
                        </div>

                        <div className="size-6 sm:size-7 rounded-full bg-black/40 border border-white/25 flex items-center justify-center shadow-inner">
                          <Wifi className="size-3 sm:size-3.5 rotate-90 text-white" />
                        </div>
                      </div>

                      {/* Center: 5 Google Golden Stars & Slogan */}
                      <div className="relative z-10 my-auto text-center py-1">
                        <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="size-4 sm:size-4.5 fill-[#FBBC04] text-[#FBBC04] drop-shadow-[0_1px_4px_rgba(251,188,4,0.4)]"
                            />
                          ))}
                        </div>

                        <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-tight leading-tight">
                          Review Ons Op Google
                        </h3>
                        <p className="font-mono text-[8px] tracking-widest uppercase opacity-75 mt-0.5">
                          Houd telefoon hier ↗
                        </p>
                      </div>

                      {/* Bottom Row: Hardware Specifications & Mini QR */}
                      <div className="relative z-10 flex items-end justify-between border-t border-white/15 pt-1.5 font-mono text-[8px]">
                        <div>
                          <span className="block text-[7px] uppercase tracking-widest opacity-60">
                            NFC HARDWARE
                          </span>
                          <span className="font-bold tracking-wider">
                            NTAG215 · 13.56 MHz
                          </span>
                        </div>

                        {qrCodeDataUrl && selectedProductId !== "sticker" && (
                          <div className="size-7 rounded bg-white p-0.5 shadow">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={qrCodeDataUrl}
                              alt="Review QR"
                              className="size-full object-contain"
                            />
                          </div>
                        )}

                        <div className="text-right">
                          <span className="block text-[7px] uppercase tracking-widest opacity-60">
                            STANDAARD
                          </span>
                          <span className="font-bold text-[#FBBC04]">
                            ISO 14443-A
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE (180deg Flip) */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: `linear-gradient(135deg, ${swatch.secondaryBg} 0%, #080A09 100%)`,
                      }}
                      className={cn(
                        "absolute inset-0 flex flex-col justify-between overflow-hidden border p-4 sm:p-5 transition-colors duration-300",
                        selectedProductId === "sticker" ? "rounded-full" : "rounded-2xl",
                        swatch.border,
                        "text-white"
                      )}
                    >
                      {/* Magnetic Stripe Graphic */}
                      {selectedProductId !== "sticker" && (
                        <div className="-mx-5 -mt-1 h-6 bg-black/90 border-y border-zinc-800" />
                      )}

                      {/* Concentric Copper Antenna Coil Traces */}
                      <div className="my-auto flex items-center justify-between px-2">
                        <div className="space-y-1 font-mono text-[8px]">
                          <div className="text-emerald-400 font-bold">
                            POLLYDEVELOPMENT
                          </div>
                          <div className="text-zinc-400">
                            TAG-UID: 04:A2:8F:9C:12
                          </div>
                          <div className="text-zinc-500 text-[7px]">
                            DIRECT CLOUD LINK · NO MIDDLEWARE
                          </div>
                        </div>

                        {qrCodeDataUrl && (
                          <div className="size-10 sm:size-11 rounded-lg bg-white p-1 shadow-md">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={qrCodeDataUrl}
                              alt="Review QR"
                              className="size-full object-contain"
                            />
                          </div>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-1.5 flex items-center justify-between font-mono text-[7px] text-zinc-400 uppercase">
                        <span>MADE IN THE NETHERLANDS</span>
                        <span className="text-emerald-400">ENCRYPTION VERIFIED</span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* CONTACT SONAR BURST RING (Expands from the contact point)      */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={{
                  opacity: ringOpacity,
                  scale: ringScale,
                }}
                className="absolute z-15 left-[42%] sm:left-[44%] top-[12%] sm:top-[14%] size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400 pointer-events-none shadow-[0_0_35px_rgba(0,255,102,0.9),inset_0_0_20px_rgba(0,255,102,0.5)]"
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
                className="absolute z-20 left-[48%] sm:left-[50%] top-[4%] sm:top-[6%] w-[190px] sm:w-[216px] h-[390px] sm:h-[442px] p-[6px] sm:p-[7px] rounded-[34px] sm:rounded-[36px] bg-[#242c2a] shadow-[inset_0_0_0_2px_#56605c,0_30px_60px_rgba(0,0,0,0.85)]"
              >
                {/* Phone Glass Inner Screen */}
                <div className="phone-screen relative w-full h-full rounded-[28px] overflow-hidden bg-[#dce5d5] text-[#172a27]">
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
                    <div className="home-date text-zinc-800 font-medium text-[9px] sm:text-[10px]">
                      Dinsdag 27 oktober
                    </div>
                    <div className="home-clock text-zinc-950 font-bold text-3xl sm:text-4xl tracking-tight my-1 sm:my-2">
                      09:41
                    </div>

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

                  {/* DROP-DOWN NATIVE NOTIFICATION (Slides down from Dynamic Island at NFC tap) */}
                  <motion.div
                    style={{
                      opacity: notifOpacity,
                      y: notifY,
                    }}
                    onClick={() => jumpToStep(0.78)}
                    className="absolute top-[40px] inset-x-2 z-30 p-2 sm:p-2.5 rounded-2xl bg-white/92 backdrop-blur-xl border border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.22)] cursor-pointer group flex items-center gap-2 select-none active:scale-[0.98] transition-transform"
                    title="Tik om review direct te openen"
                  >
                    <div className="size-6 sm:size-7 rounded-xl bg-gradient-to-br from-white to-zinc-100 border border-zinc-200 shadow-sm flex items-center justify-center shrink-0">
                      <svg className="size-3.5 sm:size-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[7px] uppercase font-bold text-zinc-500 tracking-wider">
                        <span>GOOGLE KAARTEN</span>
                        <span className="font-normal text-zinc-400">nu</span>
                      </div>
                      <strong className="text-zinc-950 font-bold block truncate text-[9px] leading-tight">
                        NFC-tag gedetecteerd
                      </strong>
                      <span className="text-zinc-600 truncate block text-[7.5px] leading-tight">
                        Tik om reviewpagina van {businessName} te openen
                      </span>
                    </div>
                    <div className="size-4 sm:size-5 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-700 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                      <ArrowRight className="size-2.5" />
                    </div>
                  </motion.div>

                  {/* SCREEN 2: Google Review In-App Web View (Authentic Experience) */}
                  <motion.div
                    style={{
                      opacity: reviewOpacity,
                      y: reviewY,
                      scale: reviewScale,
                    }}
                    className="absolute inset-0 bg-[#F8F9FA] z-20 flex flex-col pt-9 pb-4 px-2.5 select-none text-zinc-900"
                  >
                    {/* Simulated Safari / Chrome URL Bar */}
                    <div className="w-full h-5 sm:h-5.5 rounded-full bg-zinc-200/90 border border-zinc-300/80 px-2 flex items-center justify-between text-[7px] font-mono text-zinc-600 mb-1.5 shadow-inner shrink-0">
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <span className="text-[6.5px]">🔒</span>
                        <span className="truncate">g.page/{businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}/review</span>
                      </span>
                      <span className="text-[7.5px] text-zinc-400">↻</span>
                    </div>

                    {/* Review Sheet Content */}
                    <div className="flex-1 flex flex-col justify-between overflow-hidden bg-white rounded-2xl border border-zinc-200/90 p-2.5 sm:p-3 shadow-md">
                      {!isSubmitted ? (
                        <>
                          <div>
                            {/* Header with Google Brand & Business Identity */}
                            <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-zinc-100">
                              <div className="size-6 sm:size-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                                {businessName.slice(0, 1).toUpperCase()}
                              </div>
                              <div className="text-left min-w-0 flex-1">
                                <div className="flex items-center gap-1">
                                  <span className="text-[9.5px] sm:text-[10px] font-bold text-zinc-900 truncate block">
                                    {businessName}
                                  </span>
                                  <span className="size-2.5 rounded-full bg-blue-500 text-white text-[6px] flex items-center justify-center shrink-0" title="Geverifieerd">
                                    ✓
                                  </span>
                                </div>
                                <span className="text-[7px] sm:text-[7.5px] text-zinc-500 block">
                                  Google-beoordeling · Openbaar
                                </span>
                              </div>
                            </div>

                            <div className="text-center my-1">
                              <h4 className="text-[10.5px] sm:text-[11px] font-bold text-zinc-900 leading-tight">
                                Hoe was jouw ervaring?
                              </h4>
                              <p className="text-[7px] sm:text-[7.5px] text-zinc-500">
                                Deel je beoordeling met toekomstige bezoekers
                              </p>

                              {/* 5 Golden Interactive Stars */}
                              <div className="flex justify-center items-center gap-1 my-1.5 sm:my-2">
                                {[1, 2, 3, 4, 5].map((s) => {
                                  const isGold = (hoverRating ?? (rating || animatedStarsCount)) >= s;
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
                                      className="cursor-pointer transition-transform hover:scale-125 active:scale-95 focus:outline-none p-0.5"
                                      aria-label={`${s} sterren`}
                                    >
                                      <Star
                                        className={cn(
                                          "size-3.5 sm:size-4 transition-colors",
                                          isGold
                                            ? "fill-[#FBBC04] text-[#FBBC04] drop-shadow-[0_1px_4px_rgba(251,188,4,0.5)]"
                                            : "fill-zinc-200 text-zinc-300"
                                        )}
                                      />
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="text-[7.5px] sm:text-[8px] font-semibold text-amber-600 mb-1.5">
                                {rating === 5
                                  ? "★★★★★ Uitstekend (5 van 5)"
                                  : `${rating} van de 5 sterren`}
                              </div>

                              {/* Simulated Review Text Input */}
                              <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-1.5 text-left mb-1.5">
                                <textarea
                                  value={reviewText}
                                  onChange={(e) => setReviewText(e.target.value)}
                                  rows={2}
                                  className="w-full bg-transparent border-0 text-[7.5px] sm:text-[8px] text-zinc-800 leading-tight focus:outline-none resize-none p-0 placeholder-zinc-400 font-sans"
                                  placeholder="Deel details over jouw ervaring bij deze zaak..."
                                />
                              </div>
                            </div>
                          </div>

                          {/* Tactile Google Blue Submit Button */}
                          <div>
                            <button
                              type="button"
                              onClick={handleReviewSubmit}
                              className="w-full py-1.5 sm:py-2 px-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-[8.5px] sm:text-[9px] shadow-[0_2px_6px_rgba(26,115,232,0.35)] transition-all active:scale-[0.97] flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Send className="size-2.5" />
                              <span>Plaats review op Google</span>
                            </button>
                            <span className="block text-[6.5px] text-zinc-400 text-center mt-1">
                              Fictief interactief voorbeeld · Geen data verzonden
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Submitted Success State */
                        <div className="h-full flex flex-col items-center justify-center text-center py-3">
                          <div className="size-9 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mb-1.5 animate-bounce shadow-sm">
                            <Check className="size-4 stroke-[3]" />
                          </div>
                          <h4 className="font-bold text-[11px] text-zinc-900 leading-tight">
                            Bedankt voor je review!
                          </h4>
                          <div className="flex items-center justify-center gap-0.5 my-1">
                            {[1, 2, 3, 4, 5].slice(0, rating).map((s) => (
                              <Star key={s} className="size-2.5 fill-[#FBBC04] text-[#FBBC04]" />
                            ))}
                          </div>
                          <p className="text-[7px] text-zinc-600 leading-relaxed max-w-[150px] mx-auto">
                            Jouw 5-sterren review is gekoppeld en verhoogt direct de Google Maps vindbaarheid van {businessName}.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSubmitted(false);
                              playTickSound();
                            }}
                            className="mt-2.5 px-3 py-1 rounded-full bg-zinc-900 hover:bg-black text-white font-mono text-[7px] uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95"
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
            className="h-full bg-emerald-400 origin-left shadow-[0_0_10px_#00FF66]"
          />
        </div>
      </div>
    </section>
  );
}
