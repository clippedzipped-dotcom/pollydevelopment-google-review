"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/helpers/classname-helper";

interface ScrollFadeListProps<TItem> {
  items: readonly TItem[];
  renderItem: (item: TItem, index: number) => ReactNode;
  getKey: (item: TItem, index: number) => string;
  className?: string;
  maxHeight?: string;
}

export function ScrollFadeList<TItem>({
  items,
  renderItem,
  getKey,
  className,
  maxHeight = "360px",
}: ScrollFadeListProps<TItem>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollUp(scrollTop > 4);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Top fade gradient */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#0a0c0a] to-transparent transition-opacity duration-200",
          canScrollUp ? "opacity-100" : "opacity-0"
        )}
      />

      <div
        ref={containerRef}
        style={{ maxHeight }}
        className="overflow-y-auto pr-1 space-y-2.5 [scrollbar-width:thin] [scrollbar-color:#22c55e44_transparent]"
      >
        {items.map((item, index) => (
          <div key={getKey(item, index)}>{renderItem(item, index)}</div>
        ))}
      </div>

      {/* Bottom fade gradient */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-[#0a0c0a] to-transparent transition-opacity duration-200",
          canScrollDown ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
