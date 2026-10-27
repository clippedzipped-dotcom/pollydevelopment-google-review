"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/helpers/classname-helper";

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(0, 255, 102, 0.12)",
  radius = 450,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0D0B] p-6 text-zinc-100",
        "transition-colors duration-300 hover:border-white/25",
        className
      )}
    >
      {/* Radial Spotlight Glow over the background */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
        }}
        aria-hidden="true"
      />

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
