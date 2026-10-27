"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/helpers/classname-helper";

interface TicketProps {
  children: ReactNode;
  className?: string;
  badge?: string;
  serialNumber?: string;
}

export function Ticket({
  children,
  className,
  badge = "NFC PASS",
  serialNumber = "LJ-7702",
}: TicketProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`
            : "rotateX(0deg) rotateY(0deg) translateY(0)",
          transition: isHovered ? "none" : "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-800 bg-[#111311] text-zinc-100 shadow-xl",
          className
        )}
      >
        {/* Left and Right Perforated Notches */}
        <div
          aria-hidden="true"
          className="absolute -left-3 top-1/2 -mt-3 size-6 rounded-full bg-[#090b09] border border-zinc-800 z-20"
        />
        <div
          aria-hidden="true"
          className="absolute -right-3 top-1/2 -mt-3 size-6 rounded-full bg-[#090b09] border border-zinc-800 z-20"
        />

        {/* Content */}
        <div className="p-4 sm:p-5">{children}</div>

        {/* Perforated separator line */}
        <div className="relative w-full border-t border-dashed border-zinc-700/60 my-1" />

        {/* Ticket stub footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 font-mono text-[10px] tracking-widest text-zinc-400">
          <span className="text-[#A4C2A9] font-medium">{badge}</span>
          <span>{serialNumber}</span>
          <span className="opacity-70">VALID 2026-2027</span>
        </div>
      </div>
    </div>
  );
}

interface StampProps {
  children: ReactNode;
  className?: string;
  tag?: string;
}

export function Stamp({ children, className, tag = "OFFICIAL" }: StampProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2 rounded-md border border-[#67826C]/40 bg-[#506654]/15 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider text-[#A4C2A9] uppercase",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-[#8CAE93]" />
      <span>{tag}</span>
      {children}
    </div>
  );
}
