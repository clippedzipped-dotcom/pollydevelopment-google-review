"use client";

import React, { useState } from "react";
import { TactileButton } from "@/components/kitchen/TactileButton";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import {
  Phone,
  MessageSquare,
  Copy,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";
import { playMechanicalClick, triggerHaptic } from "@/helpers/sound-effects";

export function DirectContactTeam() {
  const [copiedPerson, setCopiedPerson] = useState<string | null>(null);

  const handleCopy = (phone: string, person: string) => {
    playMechanicalClick();
    triggerHaptic("light");
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedPerson(person);
      setTimeout(() => setCopiedPerson(null), 2500);
    });
  };

  return (
    <section id="contact" className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT COLUMN: INTRO */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00FF66]" />
            <span>VANDAAG BEREIKBAAR VOOR ADVIES &amp; OFFERTES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.92]">
            LATEN WE<br />
            <span className="text-emerald-400">CONTACT MAKEN.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
            Wij zijn Joey en Luc, de twee gezichten achter PollyDevelopment. Geen anonieme ticketbox of keuzemenu: bel of app ons rechtstreeks voor advies, een snelle proefdruk of een scherpe offerte.
          </p>

          <div className="space-y-2 pt-2 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-300">
              <Clock className="size-4 text-emerald-400" />
              <span>Reactie binnen 2 uur tijdens werkdagen</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles className="size-4 text-emerald-400" />
              <span>Vrijblijvend digitaal drukvoorbeeld van jouw logo</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TACTILE COCKPIT CARDS */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
          {/* JOEY'S CARD */}
          <SpotlightCard
            className="bg-[#0C0F0C] border-white/15 p-6 flex flex-col justify-between shadow-2xl relative group"
            spotlightColor="rgba(0, 255, 102, 0.15)"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="size-14 rounded-2xl bg-black border border-emerald-500/40 text-emerald-400 font-display text-2xl font-bold flex items-center justify-center shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                  J.
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+31623916558", "Joey")}
                  title="Kopieer telefoonnummer"
                  className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedPerson === "Joey" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                  Joey
                </h3>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                  COMMERCIEEL &amp; ADVIES
                </span>
              </div>

              <p className="font-mono text-xs text-emerald-400 mt-1">
                Aanvragen, aantallen &amp; offertes.
              </p>
              <p className="font-sans text-xs text-zinc-400 mt-3 leading-relaxed">
                Neem contact op met Joey voor advies over producttypes, koppeling aan je Google profiel en maatwerkstaffels.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-white/5">
              <a href="tel:+31623916558" className="block w-full">
                <TactileButton
                  variant="emerald"
                  size="md"
                  depth={4}
                  className="w-full flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <Phone className="size-3.5 text-black" />
                  <span>Bel 06 23916558</span>
                </TactileButton>
              </a>

              <a
                href="https://wa.me/31623916558?text=Hallo%20Joey,%20ik%20heb%20interesse%20in%20Google%20Review%20NFC%20kaarten%20voor%20mijn%20bedrijf."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:translate-y-0.5"
              >
                <MessageSquare className="size-3.5 text-emerald-400" />
                <span>WhatsApp Joey ↗</span>
              </a>
            </div>
          </SpotlightCard>

          {/* LUC'S CARD */}
          <SpotlightCard
            className="bg-[#0C0F0C] border-white/15 p-6 flex flex-col justify-between shadow-2xl relative group"
            spotlightColor="rgba(255, 255, 255, 0.12)"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="size-14 rounded-2xl bg-black border border-white/30 text-white font-display text-2xl font-bold flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  L.
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+31610635256", "Luc")}
                  title="Kopieer telefoonnummer"
                  className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedPerson === "Luc" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                  Luc
                </h3>
                <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-white/10 border border-white/20 text-zinc-300 font-bold">
                  DESIGN &amp; PROEFDRUK
                </span>
              </div>

              <p className="font-mono text-xs text-zinc-300 mt-1">
                Huisstijl, logo &amp; opmaak.
              </p>
              <p className="font-sans text-xs text-zinc-400 mt-3 leading-relaxed">
                Neem contact op met Luc voor vragen over vectorlogo&apos;s, PMS merkkleuren, QR-codes en grafische proefdrukken.
              </p>
            </div>

            <div className="space-y-2.5 pt-6 border-t border-white/5">
              <a href="tel:+31610635256" className="block w-full">
                <TactileButton
                  variant="white"
                  size="md"
                  depth={4}
                  className="w-full flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <Phone className="size-3.5 text-black" />
                  <span>Bel 06 10635256</span>
                </TactileButton>
              </a>

              <a
                href="https://wa.me/31610635256?text=Hallo%20Luc,%20ik%20wil%20graag%20overleggen%20over%20een%20opdruk%20en%20proefdruk%20voor%20Google%20Review%20tags."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:translate-y-0.5"
              >
                <MessageSquare className="size-3.5 text-emerald-400" />
                <span>WhatsApp Luc ↗</span>
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
