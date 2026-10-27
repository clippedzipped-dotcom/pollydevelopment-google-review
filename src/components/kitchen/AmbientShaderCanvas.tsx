"use client";

import React, { useEffect, useRef } from "react";

export function AmbientShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width * 0.5;
    let mouseY = height * 0.3;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Smooth render loop
    const render = () => {
      time += 0.008;

      // Damped mouse follow
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Primary ambient emerald orb
      const grad1 = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.55
      );
      grad1.addColorStop(0, "rgba(0, 255, 102, 0.075)");
      grad1.addColorStop(0.4, "rgba(0, 168, 67, 0.035)");
      grad1.addColorStop(1, "rgba(7, 9, 7, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // 2. Secondary undulating harmonic wave orb (opposite quadrant)
      const secX = width * 0.5 + Math.sin(time * 0.8) * (width * 0.25);
      const secY = height * 0.35 + Math.cos(time * 0.6) * (height * 0.2);
      const grad2 = ctx.createRadialGradient(
        secX,
        secY,
        0,
        secX,
        secY,
        Math.max(width, height) * 0.45
      );
      grad2.addColorStop(0, "rgba(80, 102, 84, 0.08)");
      grad2.addColorStop(0.5, "rgba(20, 35, 25, 0.025)");
      grad2.addColorStop(1, "rgba(7, 9, 7, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle organic flowing filament mesh line
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 255, 102, 0.03)";
      const segments = 16;
      for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        const wave = Math.sin(time + i * 0.4) * 40;
        const y = height * 0.35 + wave + (mouseY - height * 0.35) * 0.1;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
