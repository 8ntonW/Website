"use client";

import { useEffect } from "react";

export default function ScrollDampener() {
  useEffect(() => {
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number;
    let animating = false;

    const maxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    // Lerp toward targetY at 12% per frame — smooth deceleration without overshoot
    const tick = () => {
      currentY += (targetY - currentY) * 0.12;
      window.scrollTo(0, currentY);

      if (Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        window.scrollTo(0, targetY);
        currentY = targetY;
        animating = false;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(maxScroll(), targetY + e.deltaY * 0.7));
      if (!animating) {
        animating = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Re-sync if scroll changed via keyboard, anchor link, or programmatic scroll
    const onScroll = () => {
      if (!animating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
