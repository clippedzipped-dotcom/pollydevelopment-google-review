"use client";

import React, { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/helpers/classname-helper";
import { playMechanicalClick } from "@/helpers/sound-effects";

export interface TactileButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "sm" | "md" | "lg";
  variant?: "emerald" | "void" | "ghost" | "white";
  depth?: number;
  radius?: string;
  enableSound?: boolean;
  children?: ReactNode;
}

export const TactileButton = forwardRef<HTMLButtonElement, TactileButtonProps>(
  (
    {
      children,
      className,
      size = "md",
      variant = "emerald",
      depth = 5,
      radius = "0.75rem",
      enableSound = true,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const sizePadding =
      size === "sm"
        ? "h-8 px-3 text-xs"
        : size === "lg"
        ? "h-12 px-6 text-base tracking-wide"
        : "h-10 px-4 text-sm font-medium";

    // Theme variants for Luc & Joey: Refined Sage, Void, White
    const themeStyles = {
      emerald: {
        face: "#3D4F40",
        highlight: "#506654",
        text: "#FFFFFF",
        base: "#243026",
        shadow: "rgba(0, 0, 0, 0.4)",
      },
      void: {
        face: "#161816",
        highlight: "#2d332d",
        text: "#FAFAFA",
        base: "#0b0c0b",
        shadow: "#040504",
      },
      ghost: {
        face: "#161816",
        highlight: "#262c27",
        text: "var(--theme-accent, #8CAE93)",
        base: "#0b0c0b",
        shadow: "#040504",
      },
      white: {
        face: "#F7F8F5",
        highlight: "#FFFFFF",
        text: "#121614",
        base: "#D8D9D2",
        shadow: "#71717A",
      },
    }[variant];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (enableSound) {
        playMechanicalClick();
      }
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "group/tactile relative inline-grid w-max shrink-0 cursor-pointer select-none border-0 bg-transparent p-0 font-inherit leading-none",
          "focus-visible:outline-2 focus-visible:outline-[#8CAE93] focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45",
          className
        )}
        style={{
          paddingBottom: `${depth}px`,
          ["--tactile-depth" as string]: `${depth}px`,
          ["--tactile-radius" as string]: radius,
          ["--tactile-face" as string]: themeStyles.face,
          ["--tactile-face-highlight" as string]: themeStyles.highlight,
          ["--tactile-content" as string]: themeStyles.text,
          ["--tactile-base" as string]: themeStyles.base,
          ["--tactile-base-shadow" as string]: themeStyles.shadow,
          ...style,
        }}
        {...props}
      >
        {/* Base 3D shadow extrude */}
        <span className="absolute inset-x-0 top-[var(--tactile-depth)] bottom-0 rounded-[var(--tactile-radius)] bg-[var(--tactile-base)] shadow-[inset_0_-1px_0_var(--tactile-base-shadow)]" />

        {/* Front moving tactile face */}
        <span
          className={cn(
            "relative flex items-center justify-center gap-2 rounded-[var(--tactile-radius)] bg-[var(--tactile-face)] font-mono font-bold tracking-tight text-[var(--tactile-content)] shadow-[inset_0_1px_0_var(--tactile-face-highlight)]",
            "transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]",
            "[@media(hover:hover)_and_(pointer:fine)]:group-hover/tactile:translate-y-0.5 group-active/tactile:translate-y-[var(--tactile-depth)]",
            "motion-reduce:transform-none motion-reduce:transition-none",
            sizePadding
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

TactileButton.displayName = "TactileButton";
