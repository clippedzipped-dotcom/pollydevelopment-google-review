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
      detail: "Gemiddelde toename in geverifieerde klantervaringen binnen 30 dagen bij horeca en retail.",
      code: "METRIC_01 // VOL_INCREASE",
      icon: TrendingUp,
    },
    {
      metric: "< 15 ms",
      label: "Inductiesnelheid",
      detail: "Zero-latency overdracht via NXP NTAG215 HF inductie. Direct pop-up melding zonder aparte app.",
      code: "METRIC_02 // HF_LATENCY",
      icon: Zap,
    },
    {
      metric: "100.000+",
      label: "Scans Gegarandeerd",
      detail: "Industriële EEPROM geheugen retentie. Onverwoestbare hardwarematige read-only write-lock.",
      code: "METRIC_03 // READ_ENDURANCE",
      icon: ShieldCheck,
    },
    {
      metric: "0 KB",
      label: "Data Retentie",
      detail: "100% directe verbinding naar jouw officiële Google Review formulier. Geen trackers of tussenpartijen.",
      code: "METRIC_04 // ZERO_LOGGING",
      icon: Lock,
    },
  ];

  const handleCardClick = () => {
    playMechanicalClick(0.06);
    triggerHaptic("light");
  };

  return (
    <section className="relative z-10 py-16 px-4 max-w-7xl mx-auto border-b border-white/10">
      {/* HEADER TELEMETRY BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-8 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#00FF66]" />
          <span className="text-white font-bold">HARDWARE TELEMETRIE &amp; IMPACT INDEX</span>
          <span className="text-zinc-600">· [ POL-REV-2026 ]</span>
        </div>
        <div className="text-zinc-500 flex items-center gap-4">
          <span>GEVALIDEERD OP LOCATIE</span>
          <span className="text-emerald-400 font-bold">100% CONTACTLOOS</span>
        </div>
      </div>

      {/* 4-METRIC GRID WITH SPOTLIGHT ILLUMINATION */}
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
                className="h-full bg-gradient-to-b from-[#0c100d] to-[#070907] border-white/10 hover:border-emerald-500/40 p-6 flex flex-col justify-between group shadow-xl"
                spotlightColor="rgba(0, 255, 102, 0.15)"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-emerald-400 transition-colors">
                      {item.code}
                    </span>
                    <div className="size-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                      <Icon className="size-3.5" />
                    </div>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {item.metric}
                  </div>
                  <div className="font-mono text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2">
                    {item.label}
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  <span>STATUS</span>
                  <span className="text-zinc-300 flex items-center gap-1.5 font-bold">
                    <span className="size-1 rounded-full bg-emerald-400" />
                    ACTIEF GEVERIFIEERD
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
