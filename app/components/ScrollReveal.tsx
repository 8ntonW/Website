"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const init = () =>
      document
        .querySelectorAll<Element>(".reveal:not(.visible)")
        .forEach((el) => io.observe(el));

    init();
    const t = setTimeout(init, 300);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return null;
}
