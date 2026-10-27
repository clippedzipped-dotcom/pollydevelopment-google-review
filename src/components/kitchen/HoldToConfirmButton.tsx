"use client";

import { useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Check, ShieldAlert } from "lucide-react";
import { cn } from "@/helpers/classname-helper";
import { playMechanicalClick, triggerHaptic } from "@/helpers/sound-effects";

type HoldToConfirmButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "onClick"
> & {
  children?: ReactNode;
  confirmedContent?: ReactNode;
  duration?: number;
  onConfirm: (input: "keyboard" | "pointer") => void;
  resetAfter?: number;
};

type HoldStatus = "confirmed" | "holding" | "idle";

export function HoldToConfirmButton({
  children = "HOLD TO CONNECT",
  className,
  confirmedContent,
  disabled,
  duration = 1400,
  onConfirm,
  resetAfter = 2200,
  ...buttonProps
}: HoldToConfirmButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const confirmTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const inputModeRef = useRef<"keyboard" | "pointer">("pointer");
  const isHoldingRef = useRef(false);
  const [inputMode, setInputMode] = useState<"keyboard" | "pointer" | null>(null);
  const [status, setStatus] = useState<HoldStatus>("idle");
  const shouldReduceMotion = useReducedMotion();

  const clearConfirmTimer = useCallback(() => {
    if (confirmTimerRef.current === null) return;
    window.clearTimeout(confirmTimerRef.current);
    confirmTimerRef.current = null;
  }, []);

  const completeHold = useCallback(() => {
    if (!isHoldingRef.current) return;
    isHoldingRef.current = false;
    activePointerIdRef.current = null;
    clearConfirmTimer();
    setStatus("confirmed");
    triggerHaptic("success");
    playMechanicalClick();
    onConfirm(inputModeRef.current);
    if (resetAfter > 0) {
      resetTimerRef.current = window.setTimeout(() => {
        setStatus("idle");
        resetTimerRef.current = null;
      }, resetAfter);
    }
  }, [clearConfirmTimer, onConfirm, resetAfter]);

  const cancelHold = useCallback(() => {
    if (!isHoldingRef.current) return;
    isHoldingRef.current = false;
    activePointerIdRef.current = null;
    clearConfirmTimer();
    setStatus("idle");
  }, [clearConfirmTimer]);

  const startHold = useCallback(
    (input: "keyboard" | "pointer") => {
      if (disabled || status === "confirmed" || isHoldingRef.current) return;
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      inputModeRef.current = input;
      setInputMode(input);
      isHoldingRef.current = true;
      setStatus("holding");
      triggerHaptic("light");
      confirmTimerRef.current = window.setTimeout(completeHold, duration);
    },
    [completeHold, disabled, duration, status]
  );

  useEffect(() => {
    return () => {
      clearConfirmTimer();
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, [clearConfirmTimer]);

  useEffect(() => {
    if (disabled) cancelHold();
  }, [cancelHold, disabled]);

  function releasePointerCapture(pointerId: number) {
    const button = buttonRef.current;
    if (button?.hasPointerCapture(pointerId)) {
      button.releasePointerCapture(pointerId);
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0 || disabled) return;
    activePointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    startHold("pointer");
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!isHoldingRef.current || activePointerIdRef.current !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const boundaryPadding = 12;
    const isOutside =
      event.clientX < rect.left - boundaryPadding ||
      event.clientX > rect.right + boundaryPadding ||
      event.clientY < rect.top - boundaryPadding ||
      event.clientY > rect.bottom + boundaryPadding;
    if (isOutside) {
      cancelHold();
      releasePointerCapture(event.pointerId);
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLButtonElement>) {
    if (activePointerIdRef.current !== event.pointerId) return;
    cancelHold();
    releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    startHold("keyboard");
  }

  function handleKeyUp(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    cancelHold();
  }

  const isConfirmed = status === "confirmed";
  const isHolding = status === "holding";

  const overlayStyle = {
    clipPath: isHolding ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    transitionDuration:
      shouldReduceMotion || inputMode === "keyboard"
        ? "0ms"
        : isHolding
        ? `${duration}ms`
        : "180ms",
    transitionProperty: "clip-path",
    transitionTimingFunction: isHolding ? "linear" : "cubic-bezier(0.23, 1, 0.32, 1)",
  };

  return (
    <button
      {...buttonProps}
      aria-busy={isHolding}
      className={cn(
        "relative isolate inline-flex h-10 min-w-44 touch-none cursor-pointer select-none items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-[#161B18] px-4 font-mono font-medium text-xs tracking-wider text-zinc-200 outline-none transition-[transform,border-color,background-color,color] duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:ring-[#8CAE93] focus-visible:ring-offset-2 focus-visible:ring-offset-black data-[input=pointer]:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        isConfirmed && "bg-[#506654] text-white border-[#67826C]",
        className
      )}
      data-input={inputMode}
      disabled={disabled}
      onBlur={cancelHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onLostPointerCapture={cancelHold}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      ref={buttonRef}
      type="button"
    >
      {isConfirmed ? (
        <span className="relative flex items-center justify-center gap-2 font-bold uppercase">
          {confirmedContent ?? (
            <>
              <Check className="size-4 stroke-[3]" />
              AUTHENTICATED
            </>
          )}
        </span>
      ) : (
        <>
          <span className="relative flex items-center justify-center gap-2">
            <ShieldAlert className="size-3.5 opacity-70" />
            {children}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center gap-2 bg-[#506654] px-4 font-bold text-white"
            style={overlayStyle}
          >
            <ShieldAlert className="size-3.5" />
            {children}
          </span>
        </>
      )}
    </button>
  );
}
