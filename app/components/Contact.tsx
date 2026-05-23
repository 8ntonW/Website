"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const contactItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.1 },
  }),
};

const successContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const successItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const inputBase =
  "w-full border-b py-3 text-sm outline-none transition-all duration-300 placeholder:text-mute";

const borderIdle = "rgba(255,255,255,0.12)";
const borderFocus = "rgba(255,255,255,0.6)";
const inputStyle = { background: "#302c2c", color: "#fdfcfc" };

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
        className="block text-xs tracking-widest uppercase mb-2 font-bold font-mono"
        style={{ color: "#fdfcfc" }}
        htmlFor={name}
      >
        {label}
        {required && <span className="ml-0.5">*</span>}
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
          ...inputStyle,
          borderBottomColor: focused ? borderFocus : borderIdle,
        }}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  return (
    <div className="relative">
      <label
        className="block text-xs tracking-widest uppercase mb-2 font-bold font-mono"
        style={{ color: "#fdfcfc" }}
        htmlFor={name}
      >
        {label}
        {required && <span className="ml-0.5">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setHasValue(e.target.value !== "")}
        className={inputBase + " appearance-none cursor-pointer pr-6"}
        style={{
          ...inputStyle,
          color: hasValue ? "#fdfcfc" : "#646262",
          borderBottomColor: focused ? borderFocus : borderIdle,
        }}
      >
        <option value="" disabled selected hidden>
          Select...
        </option>
        {options.map((o) => (
          <option key={o} value={o} style={{ background: "#302c2c", color: "#fdfcfc" }}>
            {o}
          </option>
        ))}
      </select>
      <span
        className="absolute right-0 bottom-3.5 pointer-events-none text-xs"
        style={{ color: "#fdfcfc" }}
      >
        ↓
      </span>
    </div>
  );
}

export default function Contact() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.05 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(false);
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  const item = (i: number) => ({
    custom: i,
    variants: contactItemVariants,
    initial: "hidden" as const,
    animate: isInView ? "visible" : "hidden",
  });

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 sm:pt-[120px]"
      style={{ background: "#201d1d" }}
    >
      <div ref={sectionRef} className="max-w-3xl mx-auto w-full">
        {submitted ? (
          <motion.div
            className="flex flex-col items-center text-center py-24"
            variants={successContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={successItemVariants} style={{ fontSize: 60, color: "#fdfcfc", lineHeight: 1, marginBottom: 32 }}>
              ✓
            </motion.div>
            <motion.h2
              variants={successItemVariants}
              className="text-3xl sm:text-5xl font-bold tracking-tight mb-5"
              style={{ color: "#fdfcfc" }}
            >
              Thanks for reaching out.
            </motion.h2>
            <motion.p
              variants={successItemVariants}
              className="text-base leading-relaxed max-w-sm mb-8"
              style={{ color: "#9a9898" }}
            >
              I'll be in touch within 48 hours — keep an eye on your inbox.
            </motion.p>
            <motion.p
              variants={successItemVariants}
              className="text-sm mb-14"
              style={{ color: "#646262" }}
            >
              — Anton
            </motion.p>
            <motion.a
              variants={successItemVariants}
              href="#hero"
              className="text-xs tracking-widest uppercase font-mono"
              style={{ color: "#fdfcfc" }}
            >
              ← Back to portfolio
            </motion.a>
          </motion.div>
        ) : (<>
        <motion.h2
          {...item(0)}
          className="text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-4"
          style={{ color: "#fdfcfc" }}
        >
          Let's build something
          <br />
          worth watching.
        </motion.h2>

        <motion.p
          {...item(1)}
          className="text-base leading-relaxed mb-16"
          style={{ color: "#9a9898" }}
        >
          Tell me about your project and I'll come back with availability
          and next steps — usually within 48 hours.
        </motion.p>

        {/* Form */}
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <motion.div {...item(2)} className="grid sm:grid-cols-2 gap-8">
            <Field label="Your Name" name="name" required placeholder="Jane Smith" />
            <Field label="Your Phone Number" name="phone" type="tel" placeholder="+1 555 000 0000" />
          </motion.div>

          {/* Row 2 */}
          <motion.div {...item(3)} className="grid sm:grid-cols-2 gap-8">
            <Field label="Company Name" name="company" required placeholder="Acme Studio" />
            <Field label="Company Website" name="website" type="url" placeholder="https://acme.studio" />
          </motion.div>

          {/* Row 3 */}
          <motion.div {...item(4)} className="grid sm:grid-cols-2 gap-8">
            <Select
              label="What is your primary goal?"
              name="goal"
              required
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
              required
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
          <motion.div {...item(5)} className="grid sm:grid-cols-2 gap-8">
            <Select
              label="Estimated Investment"
              name="budget"
              required
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
                className="block text-xs tracking-widest uppercase mb-2 font-bold font-mono"
                style={{ color: "#fdfcfc" }}
                htmlFor="deadline"
              >
                Desired Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                className={inputBase}
                style={{ ...inputStyle, borderBottomColor: borderIdle, colorScheme: "dark" }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = borderFocus)}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = borderIdle)}
              />
            </div>
          </motion.div>

          {/* Textarea */}
          <motion.div {...item(6)}>
            <label
              className="block text-xs tracking-widest uppercase mb-2 font-bold font-mono"
              style={{ color: "#fdfcfc" }}
              htmlFor="notes"
            >
              Anything else I should know?
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Reference films, moodboards, specific requirements..."
              className={inputBase + " resize-none"}
              style={{ ...inputStyle, borderBottomColor: borderIdle }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = borderFocus)}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = borderIdle)}
            />
          </motion.div>

          {/* Email */}
          <motion.div {...item(7)}>
            <Field
              label="Work Email"
              name="email"
              type="email"
              required
              placeholder="jane@acme.studio"
            />
          </motion.div>

          {/* Checkbox */}
          <motion.label {...item(8)} className="flex items-start gap-4 cursor-pointer group">
            <button
              type="button"
              role="checkbox"
              aria-checked={agreed}
              onClick={() => setAgreed(!agreed)}
              className="mt-0.5 w-4 h-4 border shrink-0 flex items-center justify-center transition-colors duration-200"
              style={{
                borderColor: agreed ? "#fdfcfc" : "rgba(255,255,255,0.3)",
                background: agreed ? "#fdfcfc" : "transparent",
              }}
            >
              {agreed && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="#201d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span className="text-sm" style={{ color: "#9a9898" }}>
              I agree to the processing of my data
            </span>
          </motion.label>

          {/* Submit */}
          <motion.div {...item(9)} className="pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm tracking-widest uppercase font-medium overflow-hidden rounded-full font-mono"
              style={{ background: "#fdfcfc", color: "#201d1d", opacity: loading ? 0.6 : 1 }}
              whileHover={loading ? undefined : "hover"}
              whileTap={loading ? undefined : { scale: 0.99 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ background: "#e4e0e0" }}
                initial={{ x: "-100%" }}
                variants={{ hover: { x: 0 } }}
                transition={{ duration: 0.4, ease }}
              />
              <span className="relative">{loading ? "Sending…" : "Check Availability"}</span>
              {!loading && (
                <motion.span
                  className="relative"
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              )}
            </motion.button>
            {formError && (
              <p className="mt-4 text-sm text-center" style={{ color: "#ff6b6b" }}>
                Something went wrong. Please try again.
              </p>
            )}
          </motion.div>
        </form>

        {/* Footer */}
        <motion.div
          {...item(10)}
          className="mt-24 pt-10 pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-0">
            <a
              href="https://www.notion.so/Impressum-1fb3d6682ed3806c89b5cb4a12a44c0e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "#646262" }}
            >
              Impressum
            </a>
            <span className="text-xs" style={{ color: "#646262" }}>&nbsp;·&nbsp;</span>
            <a
              href="https://www.notion.so/Datenschutzerkl-rung-Privacy-Policy-1fb3d6682ed380b69c69f65002c0ba22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: "#646262" }}
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-xs" style={{ color: "#9a9898" }}>
            Dresden, Germany
          </p>
        </motion.div>
        </>)}
      </div>
    </section>
  );
}
