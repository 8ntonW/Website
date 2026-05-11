"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const inputBase =
  "w-full bg-transparent border-b py-3 text-sm text-ink placeholder:text-ash outline-none transition-all duration-300 focus:border-ink";

function Field({
  label,
  required,
  type = "text",
  placeholder,
  name,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        className="block text-xs tracking-widest uppercase mb-2 transition-colors duration-200 font-mono"
        style={{ color: focused ? "var(--ink)" : "var(--ash)" }}
        htmlFor={name}
      >
        {label}
        {required && <span className="ml-0.5 text-ink">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputBase}
        style={{
          borderBottomColor: focused ? "var(--ink)" : "var(--hairline)",
        }}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        className="block text-xs tracking-widest uppercase mb-2 transition-colors duration-200 font-mono"
        style={{ color: focused ? "var(--ink)" : "var(--ash)" }}
        htmlFor={name}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputBase + " appearance-none cursor-pointer pr-6"}
        style={{
          borderBottomColor: focused ? "var(--ink)" : "var(--hairline)",
          background: "transparent",
          color: "var(--body)",
        }}
      >
        <option value="" disabled selected hidden>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        className="absolute right-0 bottom-3.5 pointer-events-none text-ash text-xs"
      >
        ↓
      </span>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [agreed, setAgreed] = useState(false);

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--canvas)" }}
    >
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.p
            variants={itemVariants}
            className="text-xs tracking-[0.3em] uppercase text-ash mb-8 font-mono"
          >
            Contact
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-5xl font-bold text-ink leading-[1.05] tracking-tight mb-4"
          >
            Let's build something
            <br />
            worth watching.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base leading-relaxed mb-16"
            style={{ color: "var(--mute)" }}
          >
            Tell me about your project and I'll come back with availability
            and next steps — usually within 48 hours.
          </motion.p>

          {/* Form */}
          <motion.form
            variants={containerVariants}
            className="space-y-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Row 1 */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-8"
            >
              <Field label="Your Name" name="name" required placeholder="Jane Smith" />
              <Field label="Your Phone Number" name="phone" type="tel" placeholder="+1 555 000 0000" />
            </motion.div>

            {/* Row 2 */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-8"
            >
              <Field label="Company Name" name="company" required placeholder="Acme Studio" />
              <Field label="Company Website" name="website" type="url" required placeholder="https://acme.studio" />
            </motion.div>

            {/* Row 3 */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-8"
            >
              <Select
                label="What is your primary goal?"
                name="goal"
                options={[
                  "Brand awareness",
                  "Product launch",
                  "Social content",
                  "Internal comms",
                  "Film / documentary",
                  "Other",
                ]}
              />
              <Select
                label="Current production state?"
                name="state"
                options={[
                  "Just an idea",
                  "Brief ready",
                  "Script / concept done",
                  "Pre-production",
                  "Already in production",
                ]}
              />
            </motion.div>

            {/* Row 4 */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-8"
            >
              <Select
                label="Estimated Investment"
                name="budget"
                options={[
                  "< €1,500",
                  "€1,500 – €3,000",
                  "€3,000 – €5,000",
                  "€5,000 – €10,000",
                  "€10,000+",
                  "Not sure yet",
                ]}
              />
              <div>
                <label
                  className="block text-xs tracking-widest uppercase text-ash mb-2 font-mono"
                  htmlFor="deadline"
                >
                  Desired Deadline
                </label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className={inputBase}
                  style={{ borderBottomColor: "var(--hairline)", colorScheme: "light" }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = "var(--ink)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = "var(--hairline)")
                  }
                />
              </div>
            </motion.div>

            {/* Textarea */}
            <motion.div variants={itemVariants}>
              <label
                className="block text-xs tracking-widest uppercase text-ash mb-2"
                htmlFor="notes"
              >
                Anything else I should know?
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Reference films, moodboards, specific requirements..."
                className="w-full bg-transparent border-b py-3 text-sm text-ink placeholder:text-ash outline-none resize-none transition-all duration-300"
                style={{ borderBottomColor: "var(--hairline)" }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderBottomColor = "var(--ink)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderBottomColor = "var(--hairline)")
                }
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <Field
                label="Work Email"
                name="email"
                type="email"
                required
                placeholder="jane@acme.studio"
              />
            </motion.div>

            {/* Checkbox */}
            <motion.label
              variants={itemVariants}
              className="flex items-start gap-4 cursor-pointer group"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                onClick={() => setAgreed(!agreed)}
                className="mt-0.5 w-4 h-4 border shrink-0 flex items-center justify-center transition-colors duration-200"
                style={{
                  borderColor: agreed ? "var(--ink)" : "var(--ash)",
                  background: agreed ? "var(--ink)" : "transparent",
                }}
              >
                {agreed && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    className="text-canvas"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span className="text-sm" style={{ color: "var(--mute)" }}>
                I agree to the processing of my data
              </span>
            </motion.label>

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                type="submit"
                className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm tracking-widest uppercase font-medium text-canvas overflow-hidden rounded-full font-mono"
                style={{ background: "var(--ink)" }}
                whileHover="hover"
                whileTap={{ scale: 0.99 }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ background: "var(--body)" }}
                  initial={{ x: "-100%" }}
                  variants={{ hover: { x: 0 } }}
                  transition={{ duration: 0.4, ease }}
                />
                <span className="relative">Check Availability</span>
                <motion.span
                  className="relative"
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div
            variants={itemVariants}
            className="mt-24 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ borderTop: "1px solid var(--hairline)" }}
          >
            <p className="text-xs" style={{ color: "var(--ash)" }}>
              © 2026 Anton Weidemann. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: "var(--ash)" }}>
              Munich, Germany
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
