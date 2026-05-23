"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "https://www.instagram.com/antonwdmn.studio/", external: true },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const [open, setOpen] = useState(false);

  // Close on resize past mobile breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        style={{
          borderBottomColor: `rgba(15,0,0,${borderOpacity.get() * 0.12})`,
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-5 border-b"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href="#hero"
          className="text-sm tracking-widest uppercase text-ink font-bold font-mono"
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          .studio
        </motion.a>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs tracking-widest uppercase text-mute relative group font-mono"
              whileHover={{ color: "#201d1d" }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ink group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden relative z-50 flex flex-col items-center justify-center w-10 h-10 gap-[6px]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            className="block h-px w-5 bg-ink"
            animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="block h-px w-5 bg-ink"
            animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: "var(--canvas)" }}
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-2xl tracking-widest uppercase font-bold font-mono"
                  style={{ color: "var(--ink)" }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ opacity: 0.45 }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
