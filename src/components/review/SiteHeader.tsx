"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Volume2, VolumeX } from "lucide-react";
import {
  isSoundEnabled,
  setSoundEnabled,
  playMechanicalClick,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

export function SiteHeader() {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundEnabled(nextState);
    setSoundOn(nextState);
    if (nextState) {
      playMechanicalClick(0.12);
    }
    triggerHaptic("light");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#0E1210]/90 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 rounded-lg bg-[#161C18] border border-white/15 p-1 flex items-center justify-center overflow-hidden shadow-sm">
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
            <span className="font-mono text-[9px] block tracking-widest uppercase text-zinc-400">
              POLLYDEVELOPMENT · AMSTERDAM
            </span>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-5 font-mono text-xs">
          <a href="#tap-demo" className="text-zinc-400 hover:text-white transition-colors">
            Simulatie
          </a>
          <a href="#collectie" className="text-zinc-400 hover:text-white transition-colors">
            Collectie
          </a>
          <a href="#hoe-het-werkt" className="text-zinc-400 hover:text-white transition-colors">
            Hoe het werkt
          </a>
          <a href="#roi-calculator" className="text-[#A4C2A9] hover:text-white transition-colors font-medium">
            Bereken Groei
          </a>
          <Link href="/producten" className="text-zinc-400 hover:text-white transition-colors">
            Foto’s
          </Link>
          <a href="#specificaties" className="text-zinc-400 hover:text-white transition-colors">
            Specificaties
          </a>
          <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
            Contact
          </a>
          <a href="#faq" className="text-zinc-400 hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Action Controls: Live Status, Sound Toggle & Tactile CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Availability Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141A16] border border-[#2B392E] font-mono text-[10px] text-zinc-300 shadow-sm select-none">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A4C2A9] opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-[#67826C]" />
            </span>
            <span className="text-zinc-200 font-medium">Joey &amp; Luc online</span>
            <span className="text-zinc-500">·</span>
            <span className="text-[#A4C2A9]">Reactie &lt; 2u</span>
          </div>

          {/* Subtle Audio Micro-Haptics Switch */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={soundOn ? "Geluidseffecten uitschakelen" : "Geluidseffecten inschakelen"}
            className={cn(
              "px-2.5 py-1.5 rounded-full border font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-95",
              soundOn
                ? "bg-white/10 border-white/20 text-zinc-200"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
            )}
          >
            {soundOn ? (
              <>
                <Volume2 className="size-3 text-[#A4C2A9]" />
                <span className="hidden sm:inline">SFX AAN</span>
              </>
            ) : (
              <>
                <VolumeX className="size-3 text-zinc-500" />
                <span className="hidden sm:inline">SFX UIT</span>
              </>
            )}
          </button>

          <a
            href="tel:+31623916558"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black hover:border-white font-mono text-[11px] font-bold transition-all cursor-pointer shadow-sm active:translate-y-0.5"
          >
            <Phone className="size-3 text-zinc-400 group-hover:text-black" />
            <span>Bel Joey of Luc</span>
          </a>

          <a
            href="#collectie"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5F6F2] hover:bg-white text-zinc-950 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:translate-y-0.5"
          >
            <span>Offerte</span>
            <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </header>
  );
}
