"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Scroll-driven opacity: blob fades from 1 to 0 as hero scrolls out.
  // Direct DOM write via rAF — no React re-renders, true 60fps.
  const blobContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = ref.current;
    const container = blobContainerRef.current;
    if (!hero || !container) return;

    let rafId: number;

    const update = () => {
      const alpha = Math.max(0, 1 - window.scrollY / hero.clientHeight);
      container.style.opacity = String(alpha);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--canvas)" }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      {/* Blob container — opacity driven directly via rAF scroll listener (no React re-renders).
          Inner divs run CSS keyframe animations independently; no transform conflict. */}
      <div
        ref={blobContainerRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute"
          style={{ width: "75%", height: "75%", top: "5%", left: "-15%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(212,115,55,0.58) 0%, transparent 68%)",
              filter: "blur(55px)",
              animation: "blob1 7s ease-in-out infinite",
            }}
          />
        </div>
        <div
          className="absolute"
          style={{ width: "60%", height: "65%", top: "-15%", right: "-5%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(230,148,72,0.52) 0%, transparent 65%)",
              filter: "blur(65px)",
              animation: "blob2 8s ease-in-out infinite",
            }}
          />
        </div>
        <div
          className="absolute"
          style={{ width: "50%", height: "55%", bottom: "0%", left: "30%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(195,90,38,0.52) 0%, transparent 70%)",
              filter: "blur(70px)",
              animation: "blob3 6s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-ash mb-10 font-mono"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          Portfolio · 2026
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-ink mb-8"
          style={{ whiteSpace: "nowrap" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          antonwdmn.studio
        </motion.h1>

        {/* Availability badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-14"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <motion.span
            style={{ color: "#30d158", fontSize: 10, lineHeight: 1 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ●
          </motion.span>
          <span style={{ color: "#646262", fontSize: 13 }}>Available for projects</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease }}
        >
          {/* Primary — View Work */}
          <motion.a
            href="#projects"
            className="group relative inline-flex items-center justify-between w-48 px-7 py-4 text-xs tracking-widest uppercase font-medium overflow-hidden rounded-full font-mono"
            style={{ background: "#201d1d", color: "#fdfcfc" }}
            whileHover="hover"
          >
            <motion.span
              className="absolute inset-0"
              style={{ background: "#424245" }}
              initial={{ x: "-100%" }}
              variants={{ hover: { x: 0 } }}
              transition={{ duration: 0.4, ease }}
            />
            <span className="relative">View Work</span>
            <motion.span
              className="relative"
              variants={{ hover: { x: 3 } }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Secondary — Contact */}
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center justify-between w-48 px-7 py-4 text-xs tracking-widest uppercase font-medium overflow-hidden rounded-full font-mono"
            style={{ background: "#201d1d", color: "#fdfcfc" }}
            whileHover="hover"
          >
            <motion.span
              className="absolute inset-0"
              style={{ background: "#424245" }}
              initial={{ x: "-100%" }}
              variants={{ hover: { x: 0 } }}
              transition={{ duration: 0.4, ease }}
            />
            <span className="relative">Contact</span>
            <svg
              className="relative"
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#fdfcfc"
            >
              <rect x="0.5" y="0.5" width="13" height="10" rx="1" strokeWidth="1" />
              <path d="M0.5 2L7 6.5L13.5 2" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9 }}
      >
        <motion.span
          style={{ color: "var(--ash)", fontSize: 20, lineHeight: 1 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
