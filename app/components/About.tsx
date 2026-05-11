"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cards = [
  {
    title: "The Craft",
    body: "Motion design is not decoration — it's communication. Every frame is a deliberate choice. I work at the intersection of animation, sound, and visual identity to create pieces that don't just look good, they feel right.",
    means: "Cinematic quality on every project, regardless of scope.",
  },
  {
    title: "The Process",
    body: "Every project starts with a story. Before any animation begins, I dig into what you're trying to say and who you're saying it to. Then we find the most cinematic way to tell it.",
    means: "Strategy first, pixels second.",
  },
  {
    title: "Worldwide",
    body: "My studio is based in Germany, but the work travels. I collaborate with brands, agencies, and creators across Europe, the US, and beyond — fully remote, fully async, fully focused.",
    means: "Timezone differences are not a problem. Great work is the priority.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--surface-dark)" }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="text-xs tracking-[0.3em] uppercase mb-10 font-mono"
            style={{ color: "var(--ash)" }}
          >
            About
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-14"
            style={{ color: "var(--canvas)" }}
          >
            About @antonwdmn
          </motion.h2>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-8 max-w-2xl mb-20"
            style={{ color: "var(--ash)" }}
          >
            I started antonwdmn.studio out of a simple obsession — things that move.
            Whether it's the way light shifts through a window or a logo animating into
            existence, I've always been drawn to motion in every form. That obsession turned
            into a brand built on one thing: making visuals feel alive. Based in Germany,
            working with clients worldwide.
          </motion.p>

          {/* Accordion */}
          <motion.div variants={containerVariants}>
            {cards.map((card, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  className={i === cards.length - 1 ? "border-b border-white/[0.08]" : ""}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-7 text-left group"
                  >
                    <motion.span
                      className="text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-200"
                      style={{ color: isOpen ? "var(--canvas)" : "var(--ash)" }}
                      animate={{ color: isOpen ? "#fdfcfc" : "#9a9898" }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.title}
                    </motion.span>

                    <motion.span
                      className="text-xl font-light shrink-0 ml-6"
                      style={{ color: "var(--ash)" }}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pr-12">
                          <p
                            className="text-sm sm:text-base leading-7 mb-6"
                            style={{ color: "var(--mute)" }}
                          >
                            {card.body}
                          </p>
                          <div
                            className="flex items-start gap-3 pt-5"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            <span
                              className="text-xs tracking-widest uppercase mt-0.5 shrink-0 font-mono"
                              style={{ color: "var(--ash)" }}
                            >
                              That means
                            </span>
                            <p
                              className="text-sm font-semibold"
                              style={{ color: "var(--canvas)" }}
                            >
                              "{card.means}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
