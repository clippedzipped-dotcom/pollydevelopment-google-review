"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
} from "react";
import { cn } from "@/helpers/classname-helper";
import { playPrinterSound } from "@/helpers/sound-effects";

export type ReceiptPrinterStage = "processing" | "printing" | "complete";
export type ReceiptFeedMotion = "smooth" | "stepped";

export type ReceiptPrinterRootProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  animate?: boolean;
  children: ReactNode;
  feedMotion?: ReceiptFeedMotion;
  stage: ReceiptPrinterStage;
};

type ReceiptPrinterContextValue = {
  animate: boolean;
  feedMotion: ReceiptFeedMotion;
  shouldMove: boolean;
  stage: ReceiptPrinterStage;
};

const ReceiptPrinterContext = createContext<ReceiptPrinterContextValue | null>(null);

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;
const receiptToothCount = 36;
const receiptToothDepth = 5;

// Jagged tooth points for realistic torn thermal paper
const receiptToothPoints = Array.from(
  { length: receiptToothCount * 2 },
  (_, index) => {
    const x = 100 - ((index + 1) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? "100%" : `calc(100% - ${receiptToothDepth}px)`;
    return `${x}% ${y}`;
  }
).join(", ");

const receiptClipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${receiptToothDepth}px), ${receiptToothPoints})`;

const printingTransformKeyframes = [
  "translateY(calc(-100% + 2px))",
  "translateY(-90%)",
  "translateY(-90%)",
  "translateY(-78%)",
  "translateY(-78%)",
  "translateY(-65%)",
  "translateY(-65%)",
  "translateY(-50%)",
  "translateY(-50%)",
  "translateY(-35%)",
  "translateY(-35%)",
  "translateY(-20%)",
  "translateY(-20%)",
  "translateY(-8%)",
  "translateY(-8%)",
  "translateY(0%)",
];

const printingKeyframeTimes = [
  0, 0.08, 0.12, 0.22, 0.26, 0.36, 0.4, 0.5, 0.54, 0.65, 0.69, 0.8, 0.84, 0.94,
  0.97, 1,
];

function useReceiptPrinter(component: string) {
  const context = useContext(ReceiptPrinterContext);
  if (!context) {
    throw new Error(`${component} must be used inside ReceiptPrinter.Root.`);
  }
  return context;
}

export function ReceiptPrinterRoot({
  "aria-label": ariaLabel = "Receipt printer",
  animate = true,
  children,
  className,
  feedMotion = "stepped",
  stage,
  ...props
}: ReceiptPrinterRootProps) {
  const shouldReduceMotion = useReducedMotion();
  const context = {
    animate,
    feedMotion,
    shouldMove: animate && !shouldReduceMotion,
    stage,
  };

  useEffect(() => {
    if (stage === "printing") {
      playPrinterSound();
      const interval = setInterval(() => {
        playPrinterSound();
      }, 260);
      const timer = setTimeout(() => clearInterval(interval), 1600);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [stage]);

  return (
    <ReceiptPrinterContext.Provider value={context}>
      <section
        aria-label={ariaLabel}
        className={cn(
          "relative isolate flex w-full max-w-md flex-col items-center",
          className
        )}
        data-stage={stage}
        {...props}
      >
        {children}
      </section>
    </ReceiptPrinterContext.Provider>
  );
}

export function ReceiptPrinterMachine({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-2xl border border-zinc-800 bg-[#121412] p-4 pb-6 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.8)]",
        className
      )}
      {...props}
    >
      {children}
      {/* Printer slot feed slit */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-3 z-40 h-2 rounded-sm border border-black bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]"
      />
    </div>
  );
}

export function ReceiptPrinterScreen({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "relative z-10 isolate overflow-hidden rounded-xl border border-zinc-900 bg-black/90 p-3 text-zinc-100 shadow-inner",
        className
      )}
      {...props}
    >
      <div className="relative z-10 font-mono text-xs">{children}</div>
    </div>
  );
}

export function ReceiptPrinterStatus({
  className,
  label,
  ...props
}: ComponentPropsWithoutRef<"div"> & { label?: string }) {
  const { animate, stage } = useReceiptPrinter("ReceiptPrinter.Status");
  const isComplete = stage === "complete";

  const defaultLabels: Record<ReceiptPrinterStage, string> = {
    processing: "ESTABLISHING NFC HANDSHAKE...",
    printing: "DISPENSING THERMAL RECEIPT...",
    complete: "NFC CONTACT CERTIFIED & READY",
  };

  return (
    <div
      className={cn("flex min-w-0 items-center justify-between gap-3", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="relative grid size-4 shrink-0 place-items-center">
          <AnimatePresence initial={false} mode="sync">
            {isComplete ? (
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="col-start-1 row-start-1 text-[#8CAE93]"
                initial={{ opacity: 0, scale: 0.8 }}
                key="complete"
                transition={{ duration: animate ? 0.2 : 0, ease: easeOut }}
              >
                <CheckCircle2 className="size-4" />
              </motion.span>
            ) : (
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="col-start-1 row-start-1 text-zinc-400"
                initial={{ opacity: 0, scale: 0.8 }}
                key="working"
                transition={{ duration: animate ? 0.2 : 0, ease: easeOut }}
              >
                <Loader2 className="size-4 animate-spin text-[#8CAE93]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="font-mono text-[11px] tracking-wider text-zinc-300">
          {label ?? defaultLabels[stage]}
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
        <span className="inline-block size-1.5 rounded-full bg-[#8CAE93]" />
        <span>13.56 MHz</span>
      </div>
    </div>
  );
}

export function ReceiptPrinterPaper({
  children,
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "relative z-10 min-h-80 bg-[#f7f8f6] px-6 pt-6 pb-9 font-mono text-zinc-950 shadow-[0_15px_30px_rgba(0,0,0,0.5)] select-text",
        className
      )}
      style={{ clipPath: receiptClipPath, ...style }}
      {...props}
    >
      {children}
    </article>
  );
}

export function ReceiptPrinterOutput({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const { animate, feedMotion, shouldMove, stage } = useReceiptPrinter(
    "ReceiptPrinter.Output"
  );
  const isReceiptVisible = stage !== "processing";
  const shouldUseSteppedFeed =
    feedMotion === "stepped" && stage === "printing" && shouldMove;

  return (
    <div
      className={cn(
        "relative z-50 -mt-2 min-h-[26rem] w-[calc(90%+1rem)] max-w-full overflow-hidden px-4",
        className
      )}
      {...props}
    >
      {isReceiptVisible ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 -top-1 z-20 h-2 bg-black/80 blur-[4px]"
        />
      ) : null}
      <motion.div
        animate={{
          opacity: isReceiptVisible ? 1 : 0,
          transform:
            stage === "printing" && shouldMove
              ? shouldUseSteppedFeed
                ? printingTransformKeyframes
                : "translateY(0%)"
              : isReceiptVisible || !shouldMove
              ? "translateY(0%)"
              : "translateY(calc(-100% + 2px))",
        }}
        aria-hidden={stage !== "complete"}
        className="relative isolate transition-shadow duration-300"
        initial={false}
        transition={{
          opacity: { duration: animate ? 0.2 : 0, ease: easeOut },
          transform: {
            duration: shouldMove ? 1.8 : 0,
            ease: shouldUseSteppedFeed ? "linear" : easeInOut,
            times: shouldUseSteppedFeed ? printingKeyframeTimes : undefined,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const ReceiptPrinter = {
  Root: ReceiptPrinterRoot,
  Machine: ReceiptPrinterMachine,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
};
