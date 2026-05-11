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
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const thumbnail = useThumbnail(project.vimeoUrl);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="group cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease }}
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
    </motion.article>
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
    ? `https://player.vimeo.com/video/${project.videoId}?h=${project.videoHash}&autoplay=1&color=201d1d&byline=0&portrait=0&title=0&dnt=1`
    : `https://player.vimeo.com/video/${project.videoId}?autoplay=1&color=201d1d&byline=0&portrait=0&title=0&dnt=1`;

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

      {/* Subtitle */}
      <motion.p
        variants={rowVariants}
        className="text-xs tracking-widest uppercase mb-8 font-mono"
        style={{ color: "var(--ash)" }}
      >
        {project.subtitle}
      </motion.p>

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

      {/* Process section */}
      <motion.div
        variants={rowVariants}
        className="pt-12"
        style={{ borderTop: "1px solid var(--hairline)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6 font-mono"
          style={{ color: "var(--ash)" }}
        >
          process_
        </p>
        <p
          className="text-base leading-8 max-w-2xl"
          style={{ color: "var(--mute)" }}
        >
          {project.process}
        </p>
      </motion.div>
    </motion.div>
  );
}

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-10%" });

  const handleSelect = (project: Project) => {
    setSelected(project);
    setTimeout(
      () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  };

  const handleBack = () => {
    setSelected(null);
    setTimeout(
      () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 scroll-mt-0"
      style={{ background: "var(--canvas)", borderTop: "1px solid var(--hairline)" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
            >
              {/* Section header */}
              <motion.div
                ref={headerRef}
                variants={gridContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="mb-20"
              >
                <motion.p
                  variants={gridItemVariants}
                  className="text-xs tracking-[0.3em] uppercase mb-4 font-mono"
                  style={{ color: "var(--ash)" }}
                >
                  Work
                </motion.p>
                <motion.div
                  variants={gridItemVariants}
                  className="flex items-end justify-between gap-8 flex-wrap"
                >
                  <h2
                    className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.0]"
                    style={{ color: "var(--ink)" }}
                  >
                    projects
                  </h2>
                  <p
                    className="text-sm pb-1 font-mono"
                    style={{ color: "var(--ash)" }}
                  >
                    selected work — 2025 & 2026
                  </p>
                </motion.div>
              </motion.div>

              {/* Cards grid */}
              <motion.div
                variants={gridContainerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14"
              >
                {projects.map((project, i) => (
                  <motion.div key={project.id} variants={gridItemVariants}>
                    <ProjectCard
                      project={project}
                      index={i}
                      onClick={() => handleSelect(project)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              <ProjectDetail project={selected} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
