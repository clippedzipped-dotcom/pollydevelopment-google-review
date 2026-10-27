"use client";

import { useEffect, useState } from "react";
import { cn } from "@/helpers/classname-helper";

type ScrambleTextProps = {
  children: string;
  className?: string;
  intervalMs?: number;
  triggerKey?: string | number;
};

const ENCRYPTED_TEXT_CHARS = "010101<>#@$%*&[]{}|/\\_+=~?!X89";
const MAX_REVEAL_STEPS = 36;

type ScrambleMode = "random" | "stable";

function getTextSegments(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

function getRandomEncryptedTextChar() {
  return ENCRYPTED_TEXT_CHARS[Math.floor(Math.random() * ENCRYPTED_TEXT_CHARS.length)];
}

function getStableEncryptedTextChar(segment: string, index: number) {
  let hash = index + 1;
  for (const character of segment) {
    hash = (hash * 31 + (character.codePointAt(0) ?? 0)) % 2147483647;
  }
  return ENCRYPTED_TEXT_CHARS[hash % ENCRYPTED_TEXT_CHARS.length];
}

function getEncryptedTextChar(segment: string, index: number, mode: ScrambleMode) {
  if (mode === "stable") {
    return getStableEncryptedTextChar(segment, index);
  }
  return getRandomEncryptedTextChar();
}

function shouldPreserveSegment(segment: string) {
  return segment.trim() === "";
}

function scrambleSegments(segments: string[], revealedCount: number, mode: ScrambleMode) {
  return segments
    .map((character, index) => {
      if (shouldPreserveSegment(character) || index < revealedCount) {
        return character;
      }
      return getEncryptedTextChar(character, index, mode);
    })
    .join("");
}

function scrambleText(text: string, revealedCount: number, mode: ScrambleMode) {
  return scrambleSegments(getTextSegments(text), revealedCount, mode);
}

function getRevealStep(segmentCount: number) {
  return Math.max(1, Math.ceil(segmentCount / MAX_REVEAL_STEPS));
}

function shouldReduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrambleText({
  children,
  className,
  intervalMs = 28,
  triggerKey,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(() => scrambleText(children, 0, "stable"));

  useEffect(() => {
    const segments = getTextSegments(children);
    if (segments.length === 0 || intervalMs <= 0 || shouldReduceMotion()) {
      setDisplayText(children);
      return;
    }

    let revealedCount = 0;
    const revealStep = getRevealStep(segments.length);
    setDisplayText(scrambleSegments(segments, revealedCount, "random"));

    const timer = window.setInterval(() => {
      revealedCount = Math.min(segments.length, revealedCount + revealStep);
      setDisplayText(scrambleSegments(segments, revealedCount, "random"));
      if (revealedCount >= segments.length) {
        window.clearInterval(timer);
      }
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [children, intervalMs, triggerKey]);

  return (
    <span className={cn("inline-block font-mono", className)}>
      <span aria-hidden="true">{displayText}</span>
      <span aria-atomic="true" aria-live="polite" className="sr-only">
        {children}
      </span>
    </span>
  );
}
