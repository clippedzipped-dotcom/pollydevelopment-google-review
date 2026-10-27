"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Volume2, VolumeX, Menu, X, MessageSquare } from "lucide-react";
import {
  isSoundEnabled,
  setSoundEnabled,
  playMechanicalClick,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { cn } from "@/helpers/classname-helper";

export function SiteHeader() {
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playMechanicalClick();
              triggerHaptic("light");
            }}
            aria-label="Navigatiemenu openen of sluiten"
            className="lg:hidden p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer active:scale-95 ml-1"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Tactile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0E1210]/98 backdrop-blur-2xl p-5 shadow-2xl space-y-5 animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Live status badge in drawer */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#141A16] border border-[#2B392E] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A4C2A9] opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-[#67826C]" />
              </span>
              <span className="text-zinc-200 font-bold">Joey &amp; Luc online</span>
            </div>
            <span className="text-[#A4C2A9] font-bold text-[10px]">Reactie &lt; 2 uur</span>
          </div>

          {/* Navigation Links Grid */}
          <nav className="grid grid-cols-2 gap-2 font-mono text-xs">
            {[
              { href: "#tap-demo", label: "Simulatie", sub: "Interactieve demo" },
              { href: "#collectie", label: "Collectie", sub: "3D Customizer" },
              { href: "#hoe-het-werkt", label: "Hoe het werkt", sub: "3 stappen" },
              { href: "#roi-calculator", label: "Bereken Groei", sub: "ROI prognose" },
              { href: "/producten", label: "Productfoto's", sub: "Echte samples", isRoute: true },
              { href: "#specificaties", label: "Specificaties", sub: "13.56 MHz HF" },
              { href: "#contact", label: "Contact", sub: "Direct advies" },
              { href: "#faq", label: "FAQ", sub: "Veelgestelde vragen" },
            ].map((item) => {
              const Comp = item.isRoute ? Link : "a";
              return (
                <Comp
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    playMechanicalClick();
                    triggerHaptic("light");
                  }}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors block text-left"
                >
                  <div className="font-bold text-white uppercase text-[11px]">{item.label}</div>
                  <div className="text-[9px] text-zinc-400 mt-0.5">{item.sub}</div>
                </Comp>
              );
            })}
          </nav>

          {/* Direct Dial Cards */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              Direct Bellen:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+31623916558"
                onClick={() => playMechanicalClick()}
                className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 text-left block"
              >
                <div className="font-mono text-[9px] text-zinc-400">SALES &amp; ADVIES</div>
                <div className="font-bold text-xs text-white mt-0.5">Bel Joey ↗</div>
                <div className="font-mono text-[9px] text-zinc-400">06 23916558</div>
              </a>
              <a
                href="tel:+31610635256"
                onClick={() => playMechanicalClick()}
                className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 text-left block"
              >
                <div className="font-mono text-[9px] text-zinc-400">DESIGN &amp; HUISSTIJL</div>
                <div className="font-bold text-xs text-white mt-0.5">Bel Luc ↗</div>
                <div className="font-mono text-[9px] text-zinc-400">06 10635256</div>
              </a>
            </div>

            <a
              href="https://wa.me/31623916558?text=Hallo%20Joey%20en%20Luc!%20Ik%20wil%20graag%20advies%20over%20Google%20Review%20NFC%20tags%20voor%20mijn%20bedrijf."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setMobileMenuOpen(false);
                playMechanicalClick();
              }}
              className="w-full py-3 rounded-xl bg-[#F5F6F2] text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="size-4" />
              <span>WhatsApp Direct voor Vrijblijvend Advies ↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
