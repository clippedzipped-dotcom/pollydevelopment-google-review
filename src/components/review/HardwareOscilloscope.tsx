"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  playMechanicalClick,
  playNfcTapSound,
  playTickSound,
  playConfirmSound,
  triggerHaptic,
} from "@/helpers/sound-effects";
import { Copy, Check, Activity, ShieldCheck, Cpu, Lock } from "lucide-react";
import { HoldToConfirmButton } from "@/components/kitchen/HoldToConfirmButton";

export function HardwareOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [waveMode, setWaveMode] = useState<"sine" | "ask">("sine");
  const [writeLocked, setWriteLocked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle oscilloscope grid lines
      ctx.strokeStyle = "rgba(0, 255, 102, 0.08)";
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Center Baseline
      ctx.strokeStyle = "rgba(0, 255, 102, 0.25)";
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Render 13.560 MHz RF Sine / ASK Wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = pulseActive ? "#00FF66" : "#00dd55";
      ctx.shadowColor = "#00FF66";
      ctx.shadowBlur = pulseActive ? 14 : 6;

      const midY = height / 2;
      const amplitude = pulseActive ? 32 : 22;
      const frequency = 0.045;

      for (let x = 0; x < width; x++) {
        // Apply ASK modulation dips if in ask mode or pulse active
        let mod = 1.0;
        if (waveMode === "ask" || pulseActive) {
          const bitPos = (x + offset * 2) % 120;
          if (bitPos > 60 && bitPos < 90) {
            mod = 0.15; // 100% ASK pause
          }
        }

        const y = midY + Math.sin((x + offset) * frequency) * amplitude * mod;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Reset shadow for next draw
      ctx.shadowBlur = 0;

      offset += pulseActive ? 3.5 : 1.8;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [pulseActive, waveMode]);

  const handlePulse = () => {
    playNfcTapSound();
    triggerHaptic("medium");
    setPulseActive(true);
    setTimeout(() => {
      setPulseActive(false);
    }, 1200);
  };

  const handleToggleWaveMode = () => {
    playTickSound();
    setWaveMode((prev) => (prev === "sine" ? "ask" : "sine"));
  };

  const handleCopySpecs = () => {
    playMechanicalClick();
    const specsText = `POLLYDEVELOPMENT NFC SPECIFICATIES:
- Frequentie: 13.560 MHz High-Frequency Inductie (ISO/IEC 14443-A)
- Chip Module: NXP Semiconductors NTAG215 (NFC Forum Type 2)
- Geheugen: 504 Bytes Read-Write EEPROM
- Beveiliging: Hardwarematige Permanent Write-Lock
- Responstijd: < 15ms Zero-Latency
- Bereik: 0 - 45mm
- Waterbestendigheid: IP68 Stofdicht & Waterdicht
- Ferriet Isolatie: Geschikt voor metalen deuren en balies`;

    navigator.clipboard.writeText(specsText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <section id="specificaties" className="relative z-10 py-24 px-4 max-w-7xl mx-auto border-b border-white/10">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ARCHITECTURE CONTEXT */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-emerald-400 mb-2">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HARDWARE &amp; PRIVACY ARCHITECTUUR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-white leading-[0.95]">
              GEPRODUCEERD CONFORM<br />
              <span className="text-emerald-400">ISO/IEC 14443-A.</span>
            </h2>
            <p className="font-sans text-sm text-zinc-400 mt-4 leading-relaxed">
              Onze tags maken uitsluitend gebruik van originele NXP Semiconductors chips. Geen middleware, geen tracking en geen persoonsgegevens opslag. Het signaal wordt 100% direct doorgegeven naar jouw officiële Google Review dialoog.
            </p>
          </div>

          {/* Interactive Oscilloscope Display Screen */}
          <div className="p-4 rounded-3xl border border-emerald-500/30 bg-black shadow-[0_0_25px_rgba(0,255,102,0.08)] relative overflow-hidden">
            {/* Screen Caliper Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-[10px] uppercase text-zinc-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Activity className="size-3" />
                <span>OSCILLOSCOOP // 13.560 MHz</span>
              </div>
              <span className="text-zinc-500">[ REALTIME SIMULATIE ]</span>
            </div>

            {/* Canvas */}
            <div className="py-2">
              <canvas
                ref={canvasRef}
                width={420}
                height={120}
                className="w-full h-[120px] rounded-xl bg-[#060806] border border-zinc-900"
              />
            </div>

            {/* Screen Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 gap-2">
              <button
                type="button"
                onClick={handlePulse}
                className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer active:translate-y-0.5"
              >
                Puls Signaal ↗
              </button>
              <button
                type="button"
                onClick={handleToggleWaveMode}
                className="py-1.5 px-3 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 font-mono text-[11px] uppercase transition-all cursor-pointer"
              >
                Modus: {waveMode === "sine" ? "Carrier Wave" : "ASK Data Burst"}
              </button>
            </div>
          </div>

          {/* Hardware Lock Guarantee Box with Interactive OTP Simulation */}
          <div className="p-5 rounded-2xl border border-zinc-800 bg-black/60 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu className="size-4" />
                NXP NTAG215 / NTAG216
              </span>
              <span>ORIGINEEL SEMICONDUCTOR</span>
            </div>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Gegarandeerd meer dan 100.000 contactloze leesacties en 10 jaar gegevensretentie. Definitief vergrendeld met een 32-bit hardwarematige OTP write-lock.
            </p>

            <div className="pt-2 border-t border-zinc-900">
              <HoldToConfirmButton
                duration={1200}
                onConfirm={() => {
                  setWriteLocked(true);
                  playConfirmSound(0.2);
                  triggerHaptic("success");
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-[11px] font-bold uppercase transition-all cursor-pointer flex items-center justify-center"
              >
                {writeLocked ? (
                  <span className="text-emerald-400 flex items-center justify-center gap-1.5 font-bold">
                    <Lock className="size-3.5" />
                    CHIP DEFINITIEF READ-ONLY VERGRENDELD
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5 text-zinc-300">
                    <Lock className="size-3.5 text-emerald-400" />
                    TEST 32-BIT OTP WRITE-LOCK (HOU 1.2S VAST)
                  </span>
                )}
              </HoldToConfirmButton>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HARDWARE SPECIFICATION MATRIX */}
        <div className="lg:col-span-7 rounded-3xl border border-zinc-800 bg-[#0A0D0B] overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-black/90 border-b border-zinc-800 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span className="font-bold text-white">HARDWARE SPECIFICATIE MATRIX</span>
            </div>
            <button
              type="button"
              onClick={handleCopySpecs}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer text-[10px]"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Gekopieerd!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Kopieer Specs</span>
                </>
              )}
            </button>
          </div>

          <div className="divide-y divide-zinc-900 font-mono text-xs">
            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">DRAAGGOLF FREQUENTIE</span>
              <span className="col-span-7 text-white font-bold flex items-center gap-2">
                <span>13.560 MHz</span>
                <span className="text-[10px] font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  HF ISM BAND
                </span>
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">SEMICONDUCTOR CHIP</span>
              <span className="col-span-7 text-emerald-400 font-bold">
                NXP NTAG215 (NFC Forum Type 2 Tag)
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">GEHEUGENCAPACITEIT</span>
              <span className="col-span-7 text-zinc-200">
                504 Bytes User EEPROM (Direct NDEF URI format)
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">EFFECTIEVE LEESAFSTAND</span>
              <span className="col-span-7 text-zinc-200">
                0 – 45 mm (Touch-inductie geoptimaliseerd voor balies)
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">RESPONSTIJD</span>
              <span className="col-span-7 text-emerald-400 font-bold">
                &lt; 15 milliseconden zero-latency inductie
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">HARDWARE WRITE LOCK</span>
              <span className="col-span-7 text-zinc-200 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Definitieve OTP Read-Only vergrendeling
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">WATER- &amp; STOFDICHTHEID</span>
              <span className="col-span-7 text-zinc-200">
                IP68 (Epoxy Stickers) / Krasvast Acryl Tafeldisplays
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">ANTI-METAAL ISOLATIE</span>
              <span className="col-span-7 text-zinc-200">
                Geïntegreerde ferriet afscherming voor metalen deuren en balies
              </span>
            </div>

            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors">
              <span className="col-span-5 text-zinc-500 uppercase text-[10px] tracking-wider">TEMPERATUURBEREIK</span>
              <span className="col-span-7 text-zinc-200">
                -25°C tot +70°C (Geschikt voor buitengebruik op etalageruiten)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
