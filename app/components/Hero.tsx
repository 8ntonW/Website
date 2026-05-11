"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.9,
      ease,
    },
  }),
};

const headline = "antonwdmn.studio";
const words = headline.split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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

      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(32,29,29,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-ash mb-10 font-mono"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          Portfolio · 2026
        </motion.p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-ink mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.3em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          className="text-lg sm:text-xl text-mute max-w-lg leading-relaxed mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease }}
        >
          I create cinematic visual stories for brands.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease }}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 origin-top"
          style={{ background: "var(--ash)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
