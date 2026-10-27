"use client";

import React from "react";
import { SpotlightCard } from "@/components/kitchen/SpotlightCard";
import { playMechanicalClick, triggerHaptic } from "@/helpers/sound-effects";
import { TrendingUp, Zap, ShieldCheck, Lock } from "lucide-react";

export function ImpactMetricsRibbon() {
  const metrics = [
    {
      metric: "+38%",
      label: "Review Groei",
      detail: "Gemeten toename in geverifieerde klantervaringen binnen 30 dagen bij horeca, retail en praktijken.",
      tag: "MEETBAAR RESULTAAT",
      icon: TrendingUp,
    },
    {
      metric: "< 15 ms",
      label: "Inductiesnelheid",
      detail: "Zero-latency herkenning via NXP HF inductie. Direct geopend in Safari of Chrome zonder app.",
      tag: "13.560 MHz HF",
      icon: Zap,
    },
    {
      metric: "100.000+",
      label: "Scans Gegarandeerd",
      detail: "Industriële EEPROM geheugenretentie. Beveiligd met een permanente hardwarematige write-lock.",
      tag: "PERMANENT VEILIG",
      icon: ShieldCheck,
    },
    {
      metric: "0 KB",
      label: "Data Retentie",
      detail: "100% directe verbinding naar jouw Google review dialoog. Geen tussenliggende servers of logging.",
      tag: "PRIVACY GEWAARBORGD",
      icon: Lock,
    },
  ];

  const handleCardClick = () => {
    playMechanicalClick(0.06);
    triggerHaptic("light");
  };

  return (
    <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-b border-white/10">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-8 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#A4C2A9]" />
          <span className="text-white font-bold">PRESTATIES &amp; PRIVACY ARCHITECTUUR</span>
        </div>
        <div className="text-zinc-500 flex items-center gap-4">
          <span>AMSTERDAM</span>
          <span className="text-zinc-300">100% CONTACTLOOS</span>
        </div>
      </div>

      {/* 4-METRIC GRID WITH REFINED OPTICAL SPOTLIGHT */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={handleCardClick}
              className="cursor-pointer transition-transform duration-200 active:scale-[0.98]"
            >
              <SpotlightCard
                className="h-full bg-[#121614] border-white/10 hover:border-white/25 p-6 flex flex-col justify-between group shadow-lg"
                spotlightColor="rgba(255, 255, 255, 0.06)"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {item.tag}
                    </span>
                    <div className="size-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-all">
                      <Icon className="size-3.5" />
                    </div>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">
                    {item.metric}
                  </div>
                  <div className="font-mono text-xs uppercase font-bold text-zinc-200 tracking-wider mb-2">
                    {item.label}
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  <span>STATUS</span>
                  <span className="text-zinc-300 flex items-center gap-1.5 font-bold">
                    <span className="size-1 rounded-full bg-[#A4C2A9]" />
                    GEVERIFIEERD
                  </span>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
