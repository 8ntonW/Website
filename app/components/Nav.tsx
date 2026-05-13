"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "https://www.instagram.com/antonwdmn.studio/", external: true },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.header
      style={{
        borderBottomColor: `rgba(15,0,0,${borderOpacity.get() * 0.12})`,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a
        href="#hero"
        className="text-sm tracking-widest uppercase text-ink font-bold font-mono"
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.2 }}
        style={{ backdropFilter: "none" }}
      >
        antonwdmn.studio
      </motion.a>

      <nav className="flex items-center gap-8">
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
    </motion.header>
  );
}
