"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Project {
  id: string;
  videoId: string;
  videoHash?: string;
  vimeoUrl: string;
  title: string;
  subtitle: string;
  label: string;
  description: string;
  process: string;
  soundDesign?: string;
}

const projects: Project[] = [
  {
    id: "notebooklm",
    videoId: "1190919770",
    videoHash: "7b7d930e89",
    vimeoUrl: "https://vimeo.com/1190919770/7b7d930e89",
    title: "NotebookLM",
    subtitle: "spec ad — motion design",
    label: "self-initiated",
    description:
      "A self-initiated spec ad created for Google's NotebookLM. Not a client project — made purely to push my craft and explore how AI tools can be brought to life through motion. Every frame designed and animated by me.",
    process:
      "Started with a moodboard of AI-native aesthetics — data flows, emergence, clarity. Built entirely in After Effects with Cinema 4D for the 3D elements. No templates, no plugins — just craft.",
    soundDesign: "Zoltan Monori",
  },
  {
    id: "v0-vercel",
    videoId: "1190920097",
    videoHash: "ba9df1d3de",
    vimeoUrl: "https://vimeo.com/1190920097/ba9df1d3de",
    title: "v0 by Vercel",
    subtitle: "spec ad — motion design",
    label: "self-initiated",
    description:
      "A spec ad for Vercel's v0, built as a portfolio piece to demonstrate how developer tools can be communicated through cinematic motion design. Concept, design, and animation all done in-house.",
    process:
      "The challenge was making something technical feel human and fast. Used kinetic typography and UI motion as the main language — letting the product speak through its own interface.",
  },
  {
    id: "map-animation",
    videoId: "1148947590",
    vimeoUrl: "https://vimeo.com/1148947590",
    title: "Map Animation",
    subtitle: "3D scene — motion design",
    label: "3D scene",
    description:
      "A complex 3D map animation built to prove I can handle real-world, photorealistic scenes — not just flat UI motion. Detailed environment, lighting, and camera work all handled from scratch.",
    process:
      "Built in Cinema 4D with custom shaders and GIS data. The camera path was planned before any geometry was placed — story first, execution second.",
  },
];

function useThumbnail(vimeoUrl: string) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(vimeoUrl)}&width=1280`,
      { signal: controller.signal }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.thumbnail_url) setThumbnail(data.thumbnail_url);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [vimeoUrl]);

  return thumbnail;
}

function ProjectCard({
  project,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  project: Project;
  index: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const thumbnail = useThumbnail(project.vimeoUrl);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group cursor-pointer card-hover"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden mb-5"
        style={{ background: "var(--surface-card)" }}
      >
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        {/* Dim overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: "rgba(32,29,29,0.18)" }}
        />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              border: "1px solid rgba(253,252,252,0.7)",
              background: "rgba(253,252,252,0.1)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="text-canvas text-sm ml-0.5">▶</span>
          </div>
        </div>

        {/* Index badge */}
        <div
          className="absolute top-4 left-4 text-xs tracking-widest font-medium px-2 py-1"
          style={{
            background: "var(--canvas)",
            color: "var(--ash)",
          }}
        >
          {num}
        </div>
      </div>

      {/* Card meta */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-base font-bold tracking-tight mb-1 transition-colors duration-200 group-hover:text-body"
            style={{ color: "var(--ink)" }}
          >
            {project.title}
          </h3>
          <p className="text-xs tracking-wide" style={{ color: "var(--ash)" }}>
            {project.subtitle}
          </p>
        </div>
        <span
          className="text-sm mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: "var(--mute)" }}
        >
          →
        </span>
      </div>
    </article>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  const embedSrc = project.videoHash
    ? `https://player.vimeo.com/video/${project.videoId}?h=${project.videoHash}&title=0&byline=0&portrait=0&badge=0`
    : `https://player.vimeo.com/video/${project.videoId}?title=0&byline=0&portrait=0&badge=0`;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  };

  return (
    <motion.div
      key="detail"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Nav row */}
      <motion.div
        variants={rowVariants}
        className="flex items-center justify-between mb-16"
      >
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200 font-mono"
          style={{ color: "var(--mute)" }}
          whileHover={{ color: "var(--ink)", x: -2 }}
          transition={{ duration: 0.2 }}
        >
          ← projects
        </motion.button>

        <span
          className="text-xs tracking-[0.3em] uppercase font-mono"
          style={{ color: "var(--ash)" }}
        >
          {project.label}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={rowVariants}
        className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.0] mb-8"
        style={{ color: "var(--ink)" }}
      >
        {project.title}
      </motion.h2>

      {/* Subtitle row — credit shares the same vertical baseline when present */}
      <motion.div
        variants={rowVariants}
        className="flex items-start justify-between mb-8"
      >
        <p
          className="text-xs tracking-widest uppercase font-mono"
          style={{ color: "var(--ash)" }}
        >
          {project.subtitle}
        </p>
        {project.soundDesign && (
          <div className="text-left">
            <p
              className="text-xs tracking-widest uppercase font-mono"
              style={{ color: "var(--ash)", opacity: 0.55 }}
            >
              Sound Design by
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: "var(--ash)", opacity: 0.55 }}
            >
              {project.soundDesign}
            </p>
          </div>
        )}
      </motion.div>

      {/* Description */}
      <motion.p
        variants={rowVariants}
        className="text-base sm:text-lg leading-8 max-w-2xl mb-14"
        style={{ color: "var(--body)" }}
      >
        {project.description}
      </motion.p>

      {/* Hairline */}
      <motion.div
        variants={rowVariants}
        className="w-full mb-14"
        style={{ borderTop: "1px solid var(--hairline)" }}
      />

      {/* Vimeo embed */}
      <motion.div
        variants={rowVariants}
        className="relative w-full aspect-video mb-16 overflow-hidden"
        style={{ background: "var(--surface-card)" }}
      >
        <iframe
          src={embedSrc}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </motion.div>

    </motion.div>
  );
}

const sectionItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: i * 0.1 },
  }),
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { amount: 0.1 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("overlay-open", !!selected);
    return () => document.body.classList.remove("overlay-open");
  }, [selected]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX + 15}px`;
      cursor.style.top = `${e.clientY + 15}px`;
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const showCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "1";
      cursorRef.current.style.transform = "scale(1)";
    }
  };
  const hideCursor = () => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
      cursorRef.current.style.transform = "scale(0.8)";
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 scroll-mt-0"
      style={{ background: "var(--canvas)", borderTop: "1px solid var(--hairline)" }}
    >
      {/* Projects grid — always visible behind overlay */}
      <div ref={gridRef} className="max-w-6xl mx-auto w-full">
        <div className="mb-20">
          <motion.p
            custom={0}
            variants={sectionItemVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
            className="text-xs tracking-[0.3em] uppercase mb-4 font-mono"
            style={{ color: "var(--ash)" }}
          >
            Work
          </motion.p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <motion.h2
              custom={1}
              variants={sectionItemVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.0]"
              style={{ color: "var(--ink)" }}
            >
              projects
            </motion.h2>
            <motion.p
              custom={2}
              variants={sectionItemVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="text-sm pb-1 font-mono"
              style={{ color: "var(--ash)" }}
            >
              selected work — 2025 & 2026
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                index={i}
                onClick={() => setSelected(project)}
                onMouseEnter={showCursor}
                onMouseLeave={hideCursor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom PLAY cursor */}
      <div
        ref={cursorRef}
        className="fixed z-[500] pointer-events-none flex items-center justify-center"
        style={{
          top: -200,
          left: -200,
          width: 80,
          height: 30,
          background: "#201d1d",
          borderRadius: 9999,
          opacity: 0,
          transform: "scale(0.8)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <span
          className="font-mono select-none"
          style={{ color: "#fdfcfc", fontSize: 11, letterSpacing: 2 }}
        >
          ▶ PLAY
        </span>
      </div>

      {/* Full-screen detail overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] overflow-y-auto"
            style={{ background: "#fdfcfc" }}
          >
            <div className="max-w-6xl mx-auto px-6 py-16">
              <ProjectDetail project={selected} onBack={() => setSelected(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
