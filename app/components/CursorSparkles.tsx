"use client";

import { useEffect, useRef } from "react";

const colors = ["#fff8ee", "#f4cfdf", "#ffe5a3", "#bc5e87"];

export default function CursorSparkles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastSpawn = 0;
    const animations = new Set<Animation>();

    const clearSparkles = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      container.replaceChildren();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const now = performance.now();
      if (now - lastSpawn < 28 || animations.size >= 32) return;
      lastSpawn = now;

      const sparkle = document.createElement("span");
      sparkle.className = "cursor-sparkle";
      sparkle.style.left = `${event.clientX}px`;
      sparkle.style.top = `${event.clientY}px`;
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
      const size = 7 + Math.random() * 8;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      container.appendChild(sparkle);

      const driftX = (Math.random() - 0.5) * 36;
      const driftY = 12 + Math.random() * 24;
      const rotation = Math.random() * 90;
      const animation = sparkle.animate(
        [
          { opacity: 0, transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(.3)` },
          { opacity: 1, offset: 0.15 },
          { opacity: 0, transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rotation + 90}deg) scale(0)` },
        ],
        { duration: 650 + Math.random() * 200, easing: "ease-out" },
      );
      animations.add(animation);
      animation.onfinish = () => {
        animations.delete(animation);
        sparkle.remove();
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", clearSparkles);
    reducedMotion.addEventListener("change", clearSparkles);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", clearSparkles);
      reducedMotion.removeEventListener("change", clearSparkles);
      clearSparkles();
    };
  }, []);

  return <div ref={containerRef} className="cursor-sparkles" aria-hidden="true" />;
}
