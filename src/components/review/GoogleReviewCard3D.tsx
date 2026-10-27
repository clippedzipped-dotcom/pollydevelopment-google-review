"use client";

import React, { useState, useRef, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import QRCode from "qrcode";
import {
  Wifi,
  Sparkles,
  RotateCw,
  Eye,
  CheckCircle2,
  Star,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  ReviewProduct,
  ReviewColorSwatch,
  COLOR_SWATCHES,
} from "@/data/review-products";
import { cn } from "@/helpers/classname-helper";
import {
  playNfcTapSound,
  playMechanicalClick,
  playCardWhoosh,
  triggerHaptic,
} from "@/helpers/sound-effects";

interface GoogleReviewCard3DProps {
  product: ReviewProduct;
  colorSwatch: ReviewColorSwatch;
  businessName?: string;
  showLogo?: boolean;
  showQr?: boolean;
  customLogoUrl?: string | null;
  viewMode?: "3d" | "photo";
  onToggleViewMode?: () => void;
  onTapSuccess?: () => void;
  className?: string;
}

export function GoogleReviewCard3D({
  product,
  colorSwatch,
  businessName = "JOUW BEDRIJF",
  showLogo = true,
  showQr = true,
  customLogoUrl,
  viewMode = "3d",
  onToggleViewMode,
  onTapSuccess,
  className,
}: GoogleReviewCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [tapWaves, setTapWaves] = useState<number[]>([]);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const swatch = COLOR_SWATCHES[colorSwatch];

  // Generate live SVG/dataUrl QR code
  useEffect(() => {
    QRCode.toDataURL(
      "https://googlereview.pollydevelopment.nl/#tap-demo",
      {
        margin: 1,
        width: 180,
        color: {
          dark: swatch.id === "obsidian" ? "#000000" : "#17201C",
          light: "#FFFFFF",
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [swatch.id]);

  // Mobile Device Gyroscope Tilt Physics (Awwwards standard)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const gamma = Math.max(-20, Math.min(20, e.gamma));
      const beta = Math.max(-20, Math.min(20, e.beta - 45));

      setRotateY(gamma * 0.65);
      setRotateX(-beta * 0.65);
      setGlarePos({
        x: 50 + gamma * 1.6,
        y: 50 + beta * 1.6,
        opacity: 0.35,
      });
    };

    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || viewMode === "photo") return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 16;
    const rY = ((x - centerX) / centerX) * 16;

    setRotateX(rX);
    setRotateY(rY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.38,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const triggerNfcTap = () => {
    if (isTapping) return;
    setIsTapping(true);
    playNfcTapSound();
    triggerHaptic("success");

    setTapWaves([1, 2, 3]);

    if (typeof window !== "undefined") {
      try {
        confetti({
          particleCount: 40,
          spread: 65,
          origin: { y: 0.58 },
          colors: ["#FBBC04", "#34A853", "#4285F4", "#EA4335", "#FFFFFF"],
          disableForReducedMotion: true,
        });
      } catch {
        // fallback safe
      }
    }

    setTimeout(() => {
      setIsTapping(false);
      setTapWaves([]);
      onTapSuccess?.();
    }, 1100);
  };

  const handleFlip = () => {
    playMechanicalClick();
    playCardWhoosh();
    triggerHaptic("medium");
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={cn("relative flex flex-col items-center select-none", className)}>
      {/* 3D Perspective Stage */}
      <div
        className="relative py-4 w-full flex items-center justify-center"
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sonar Radio Wave Rings on NFC Tap */}
        <AnimatePresence>
          {tapWaves.map((wave) => (
            <motion.div
              key={wave}
              initial={{ scale: 0.85, opacity: 0.95 }}
              animate={{ scale: 2.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, delay: (wave - 1) * 0.16, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 -m-6 rounded-[2.5rem] border-2 border-[#8CAE93]/70 shadow-[0_0_25px_rgba(140,174,147,0.3)] z-30"
            />
          ))}
        </AnimatePresence>

        {/* View Mode: Original Photo vs 3D Custom Specimen */}
        {viewMode === "photo" ? (
          <div className="relative w-[340px] sm:w-[400px] aspect-[85.6/53.98] rounded-2xl overflow-hidden border border-zinc-700/80 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
            <Image
              src={product.originalImage}
              alt={product.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 340px, 400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-mono text-[9px] uppercase tracking-wider text-zinc-300">
              ORIGINELE PRODUCTFOTO
            </div>

            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between font-mono text-[10px] text-zinc-300">
              <span className="font-bold uppercase">{product.title}</span>
              <button
                type="button"
                onClick={onToggleViewMode}
                className="px-2.5 py-1 rounded-md bg-white text-black font-bold text-[9px] uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Naar 3D Huisstijl ↗
              </button>
            </div>
          </div>
        ) : (
          /* THE 3D TACTILE HARDWARE BODY */
          <motion.div
            ref={cardRef}
            animate={{
              rotateY: isFlipped ? 180 + rotateY : rotateY,
              rotateX: isFlipped ? -rotateX : rotateX,
            }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 170,
            }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={triggerNfcTap}
            data-cursor="[TIK NFC SIMULATIE]"
            className={cn(
              "relative cursor-pointer transition-shadow duration-300",
              product.id === "sticker"
                ? "w-[280px] sm:w-[310px] aspect-square rounded-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(80,102,84,0.35)]"
                : product.id === "display"
                ? "w-[310px] sm:w-[350px] aspect-[80/120] rounded-2xl shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_35px_rgba(80,102,84,0.3)]"
                : "w-[340px] sm:w-[400px] aspect-[85.6/53.98] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(80,102,84,0.35)]"
            )}
          >
            {/* FRONT FACE */}
            <div
              style={{
                backfaceVisibility: "hidden",
                background: `linear-gradient(135deg, ${swatch.primaryBg} 0%, ${swatch.secondaryBg} 100%)`,
              }}
              className={cn(
                "absolute inset-0 flex flex-col justify-between overflow-hidden border p-5 sm:p-6 transition-colors duration-300",
                product.id === "sticker" ? "rounded-full" : "rounded-2xl",
                swatch.border,
                swatch.textColor
              )}
            >
              {/* Holographic Iridescent Glare Layer */}
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

              {/* Concentric NFC Antenna Coil Traces on Stickers */}
              {product.id === "sticker" && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 rounded-full border border-white/20 opacity-30 flex items-center justify-center"
                >
                  <div className="size-4/5 rounded-full border border-dashed border-white/25" />
                </div>
              )}

              {/* Top Row: Brand & NFC Wave Symbol */}
              <div className="relative z-10 flex items-center justify-between">
                {/* Logo + Business Header */}
                <div className="flex items-center gap-2.5">
                  {showLogo && (
                    <div className="relative size-8 sm:size-9 rounded-lg bg-black/40 border border-white/20 p-1 flex items-center justify-center overflow-hidden shadow-sm">
                      {customLogoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={customLogoUrl}
                          alt="Custom Logo"
                          className="size-full object-contain"
                        />
                      ) : (
                        <Image
                          src="/images/products/pollydevelopment-logo.png"
                          alt="Logo"
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      )}
                    </div>
                  )}
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-bold uppercase block opacity-80">
                      GOOGLE REVIEW
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-black tracking-tight uppercase block leading-none mt-0.5">
                      {businessName}
                    </span>
                  </div>
                </div>

                {/* NFC Contactless Wave Chip */}
                <div className="flex items-center gap-1.5">
                  <div className="size-7 sm:size-8 rounded-full bg-black/40 border border-white/25 flex items-center justify-center shadow-inner">
                    <Wifi className="size-3.5 sm:size-4 rotate-90 text-white" />
                  </div>
                </div>
              </div>

              {/* Center: Five Golden Google Stars & Slogan */}
              <div className="relative z-10 my-auto text-center py-2">
                {/* Google Multicolor Review Stars */}
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="size-5 sm:size-6 fill-[#FBBC04] text-[#FBBC04] drop-shadow-[0_2px_8px_rgba(251,188,4,0.45)] transition-transform hover:scale-115"
                    />
                  ))}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight leading-tight">
                  {product.defaultTitle}
                  <span className="block opacity-90">{product.defaultSubtitle}</span>
                </h3>

                <p className="mt-1 font-mono text-[10px] tracking-widest uppercase opacity-75">
                  TIK MET JE TELEFOON · REVIEW DIRECT
                </p>
              </div>

              {/* Bottom Row: Hardware Specifications, UID & Optional QR */}
              <div className="relative z-10 flex items-end justify-between border-t border-white/15 pt-2.5 font-mono text-[9px] sm:text-[10px]">
                <div>
                  <span className="block text-[8px] uppercase tracking-widest opacity-60">
                    TECHNOLOGIE
                  </span>
                  <span className="font-bold tracking-wider">
                    NXP NTAG215 · 13.56 MHz
                  </span>
                </div>

                {/* Optional mini QR code on front if display or card */}
                {showQr && qrDataUrl && product.id !== "sticker" && (
                  <div className="size-8 sm:size-9 rounded bg-white p-0.5 shadow">
                    <Image
                      src={qrDataUrl}
                      alt="Review QR Code"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                )}

                <div className="text-right">
                  <span className="block text-[8px] uppercase tracking-widest opacity-60">
                    STANDAARD
                  </span>
                  <span className="font-bold text-[#FBBC04]">
                    ISO/IEC 14443-A
                  </span>
                </div>
              </div>
            </div>

            {/* BACK FACE (180deg) */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: `linear-gradient(135deg, ${swatch.secondaryBg} 0%, #080A09 100%)`,
              }}
              className={cn(
                "absolute inset-0 flex flex-col justify-between overflow-hidden border p-5 sm:p-6 transition-colors duration-300",
                product.id === "sticker" ? "rounded-full" : "rounded-2xl",
                swatch.border,
                "text-white"
              )}
            >
              {/* Magnetic stripe simulation for PVC card */}
              {product.id === "card" && (
                <div className="-mx-6 -mt-2 h-9 bg-black border-y border-zinc-800 flex items-center px-6">
                  <div className="w-full h-2 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 opacity-60" />
                </div>
              )}

              {/* Center: Scannable QR Code & Instructions */}
              <div className="my-auto flex flex-col items-center justify-center text-center">
                {qrDataUrl && showQr ? (
                  <div className="p-2 rounded-xl bg-white shadow-xl mb-2">
                    <Image
                      src={qrDataUrl}
                      alt="Google Review QR Code"
                      width={96}
                      height={96}
                      className="size-20 sm:size-24 object-contain"
                    />
                  </div>
                ) : (
                  <div className="size-20 rounded-full border border-dashed border-white/40 flex items-center justify-center mb-2">
                    <Wifi className="size-8 rotate-90 text-[#8CAE93]" />
                  </div>
                )}

                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  GEEN APARTE APP VEREIST
                </span>
                <p className="mt-1 font-mono text-[9px] text-zinc-400 max-w-[220px] leading-relaxed">
                  Houd de bovenkant van een iPhone of het midden van een Android tegen het logo.
                </p>
              </div>

              {/* Back Footer */}
              <div className="border-t border-white/10 pt-2 flex items-center justify-between font-mono text-[8px] text-zinc-400">
                <span>POLLYDEVELOPMENT · AMSTERDAM</span>
                <span className="text-zinc-400">FLIP OM VOORKANT TE ZIEN ↺</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interactive Controls below Card */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={triggerNfcTap}
          disabled={isTapping}
          data-cursor="[SIMULEER NFC TIK]"
          className={cn(
            "relative group flex items-center gap-2 rounded-full px-5 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 select-none cursor-pointer",
            isTapping
              ? "bg-[#FBBC04] text-black shadow-md"
              : "bg-black/90 hover:bg-white text-white hover:text-black border border-white/20 shadow-md"
          )}
        >
          {isTapping ? (
            <>
              <CheckCircle2 className="size-3.5 animate-bounce" />
              <span>NFC TAG GEDETECTEERD</span>
            </>
          ) : (
            <>
              <Sparkles className="size-3.5 text-[#FBBC04]" />
              <span>SIMULEER TELEFOON TIK</span>
            </>
          )}
        </button>

        {viewMode === "3d" && (
          <button
            type="button"
            onClick={handleFlip}
            data-cursor="[FLIP 180°]"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs text-zinc-300 hover:text-white border border-zinc-800 bg-black/60 hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <RotateCw className="size-3.5" />
            <span>{isFlipped ? "Voorkant" : "Achterkant & QR"}</span>
          </button>
        )}

        {onToggleViewMode && (
          <button
            type="button"
            onClick={onToggleViewMode}
            data-cursor="[TOGGLE FOTO / 3D]"
            className="flex items-center gap-1.5 rounded-full px-4 py-2 font-mono text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Eye className="size-3.5" />
            <span>{viewMode === "3d" ? "Originele Foto" : "3D Huisstijl"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
