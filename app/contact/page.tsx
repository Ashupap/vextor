"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, ClipboardList, Building, Phone, CheckCircle,
  ChevronRight, ChevronLeft, AlertCircle, MessageCircle
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

/* ─── Types ─── */
type Bottleneck = "manual" | "website" | "crashes" | "";
type Industry = string;

interface FormState {
  bottleneck: Bottleneck;
  industry: Industry;
  scale: string;
  whatsapp: string;
  name: string;
}

/* ─── Step Indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            animate={{
              background: i < current
                ? "var(--cyan)"
                : i === current
                ? "var(--cyan)"
                : "var(--space-mid)",
              scale: i === current ? 1.2 : 1,
              boxShadow: i === current ? "0 0 12px var(--cyan-glow)" : "none",
            }}
            className="step-dot rounded-full"
            style={{
              width: 10,
              height: 10,
              border: `1px solid ${i <= current ? "var(--cyan)" : "var(--border)"}`,
            }}
          />
          {i < total - 1 && (
            <div
              className="h-px w-8 transition-all duration-500"
              style={{
                background: i < current ? "var(--cyan)" : "var(--border)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Step 1: Bottleneck ─── */
function Step1({
  value,
  onChange,
}: {
  value: Bottleneck;
  onChange: (v: Bottleneck) => void;
}) {
  const options = [
    {
      id: "manual" as Bottleneck,
      icon: ClipboardList,
      label: "Manual Work",
      desc: "Spreadsheets, paper records, manual data entry",
    },
    {
      id: "website" as Bottleneck,
      icon: Building,
      label: "Bad Website / No Online Presence",
      desc: "Outdated site or no digital presence at all",
    },
    {
      id: "crashes" as Bottleneck,
      icon: AlertCircle,
      label: "Server Crashes / Tech Failures",
      desc: "System downtime costing you money and trust",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h3
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
      >
        What is your biggest bottleneck?
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        Select the challenge that hurts your business the most.
      </p>
      {options.map((opt) => (
        <motion.button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex items-start gap-4 p-5 rounded-2xl text-left w-full transition-all duration-200"
          style={{
            background:
              value === opt.id
                ? "rgba(0,242,255,0.08)"
                : "var(--space-mid)",
            border: `1px solid ${value === opt.id ? "var(--cyan)" : "var(--border)"}`,
            boxShadow: value === opt.id ? "0 0 20px rgba(0,242,255,0.1)" : "none",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              background:
                value === opt.id ? "var(--cyan-dim)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${value === opt.id ? "rgba(0,242,255,0.3)" : "var(--border)"}`,
            }}
          >
            <opt.icon
              size={18}
              style={{ color: value === opt.id ? "var(--cyan)" : "var(--text-muted)" }}
            />
          </div>
          <div>
            <div
              className="font-semibold text-sm"
              style={{
                color: value === opt.id ? "var(--cyan)" : "var(--text-primary)",
                fontFamily: "Sora, sans-serif",
              }}
            >
              {opt.label}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              {opt.desc}
            </div>
          </div>
          {value === opt.id && (
            <CheckCircle
              size={18}
              style={{ color: "var(--cyan)", marginLeft: "auto", flexShrink: 0 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

/* ─── Step 2: Business Info ─── */
function Step2({
  industry,
  scale,
  onIndustry,
  onScale,
}: {
  industry: string;
  scale: string;
  onIndustry: (v: string) => void;
  onScale: (v: string) => void;
}) {
  const industries = [
    "Retail / Trading",
    "Manufacturing",
    "Wholesale / Distribution",
    "Restaurant / F&B",
    "Healthcare / Clinic",
    "Education / Coaching",
    "Real Estate",
    "IT Services",
    "Other",
  ];

  const scales = [
    { label: "Solopreneur", desc: "Just me" },
    { label: "Micro", desc: "2–10 employees" },
    { label: "Small", desc: "11–50 employees" },
    { label: "Medium", desc: "51–200 employees" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3
        className="text-2xl font-bold"
        style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
      >
        Tell us about your business
      </h3>

      <div>
        <label
          className="block text-sm font-medium mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Industry
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => onIndustry(ind)}
              className="px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200"
              style={{
                background:
                  industry === ind ? "rgba(0,242,255,0.08)" : "var(--space-mid)",
                border: `1px solid ${industry === ind ? "var(--cyan)" : "var(--border)"}`,
                color: industry === ind ? "var(--cyan)" : "var(--text-secondary)",
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Business Scale
        </label>
        <div className="grid grid-cols-2 gap-3">
          {scales.map((s) => (
            <button
              key={s.label}
              onClick={() => onScale(s.label)}
              className="p-4 rounded-xl text-left transition-all duration-200"
              style={{
                background: scale === s.label ? "rgba(0,242,255,0.08)" : "var(--space-mid)",
                border: `1px solid ${scale === s.label ? "var(--cyan)" : "var(--border)"}`,
              }}
            >
              <div
                className="text-sm font-semibold"
                style={{
                  color: scale === s.label ? "var(--cyan)" : "var(--text-primary)",
                  fontFamily: "Sora, sans-serif",
                }}
              >
                {s.label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {s.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Contact ─── */
function Step3({
  name,
  whatsapp,
  onName,
  onWhatsapp,
}: {
  name: string;
  whatsapp: string;
  onName: (v: string) => void;
  onWhatsapp: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3
        className="text-2xl font-bold"
        style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
      >
        How should we reach you?
      </h3>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        A Solution Architect will WhatsApp you within 2 hours.
      </p>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Rahul Sharma"
          className="w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: "var(--space-mid)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            caretColor: "var(--cyan)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--cyan)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,242,255,0.08)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          WhatsApp Number
        </label>
        <div className="flex gap-3">
          <div
            className="flex items-center justify-center px-4 rounded-xl text-sm font-semibold"
            style={{
              background: "var(--space-mid)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
            }}
          >
            🇮🇳 +91
          </div>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => onWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="98765 43210"
            className="flex-1 px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "var(--space-mid)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              caretColor: "var(--cyan)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--cyan)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,242,255,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          We only use this for your free consultation. No spam, ever.
        </p>
      </div>
    </div>
  );
}

/* ─── Step 4: Success ─── */
function StepSuccess({ name, whatsapp }: { name: string; whatsapp: string }) {
  const message = encodeURIComponent(
    `Hi Vextor! I'm ${name}. I'd like to discuss digital transformation for my business. My number is +91${whatsapp}.`
  );
  const waUrl = `https://wa.me/919999999999?text=${message}`;

  return (
    <div className="flex flex-col items-start text-left gap-6 py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "var(--gold-dim)",
          border: "2px solid var(--gold)",
          boxShadow: "0 0 40px rgba(255,153,51,0.2)",
        }}
      >
        <CheckCircle size={40} style={{ color: "var(--gold)" }} />
      </motion.div>

      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        >
          Request Received!
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          {name ? `Thanks, ${name}! ` : ""}A Solution Architect will reach you on WhatsApp within 2 hours.
        </p>
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm transition-all"
        style={{
          background: "#25D366",
          color: "#fff",
          boxShadow: "0 4px 24px rgba(37,211,102,0.4)",
          fontFamily: "Sora, sans-serif",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(37,211,102,0.6)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.4)"; }}
      >
        <MessageCircle size={18} />
        Chat on WhatsApp Now
      </a>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        Or call us: <span style={{ color: "var(--cyan)" }}>+91 99999 99999</span>
      </p>
    </div>
  );
}

/* ─── Main Smart Quote Form ─── */
function SmartQuoteForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    bottleneck: "",
    industry: "",
    scale: "",
    whatsapp: "",
    name: "",
  });

  const TOTAL_STEPS = 3;

  const canAdvance = () => {
    if (step === 0) return !!form.bottleneck;
    if (step === 1) return !!form.industry && !!form.scale;
    if (step === 2) return form.whatsapp.length === 10 && form.name.length > 1;
    return false;
  };

  const handleSubmit = () => {
    // Move to success state
    setStep(3);
  };

  return (
    <div
      className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        boxShadow: "0 0 80px rgba(0,242,255,0.08)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,242,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {step < 3 && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  Step {step + 1} of {TOTAL_STEPS}
                </p>
              </div>
              <StepIndicator current={step} total={TOTAL_STEPS} />
            </div>
          </>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <Step1
                value={form.bottleneck}
                onChange={(v) => setForm((f) => ({ ...f, bottleneck: v }))}
              />
            )}
            {step === 1 && (
              <Step2
                industry={form.industry}
                scale={form.scale}
                onIndustry={(v) => setForm((f) => ({ ...f, industry: v }))}
                onScale={(v) => setForm((f) => ({ ...f, scale: v }))}
              />
            )}
            {step === 2 && (
              <Step3
                name={form.name}
                whatsapp={form.whatsapp}
                onName={(v) => setForm((f) => ({ ...f, name: v }))}
                onWhatsapp={(v) => setForm((f) => ({ ...f, whatsapp: v }))}
              />
            )}
            {step === 3 && (
              <StepSuccess name={form.name} whatsapp={form.whatsapp} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex items-center justify-between mt-8 gap-4">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: "var(--space-mid)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={step === TOTAL_STEPS - 1 ? handleSubmit : () => setStep((s) => s + 1)}
              disabled={!canAdvance()}
              className="btn-cyan flex items-center gap-2 px-8 py-3 rounded-xl text-sm flex-1 justify-center"
              style={{
                opacity: canAdvance() ? 1 : 0.4,
                cursor: canAdvance() ? "pointer" : "not-allowed",
              }}
            >
              {step === TOTAL_STEPS - 1 ? "Get My Free Quote" : "Continue"}
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Contact Info Cards ─── */
function ContactCards() {
  const cards = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+91 99999 99999",
      sub: "Response within 2 hours",
      color: "#25D366",
      href: "https://wa.me/919999999999",
    },
    {
      icon: Phone,
      title: "Phone / Call",
      value: "+91 99999 99999",
      sub: "Mon–Sat, 9am–8pm IST",
      color: "var(--cyan)",
      href: "tel:+919999999999",
    },
    {
      icon: Building,
      title: "Based in",
      value: "India",
      sub: "Serving SMEs nationwide",
      color: "var(--cyan)", // Changed from Gold to Cyan
      href: undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card, i) => (
        <FadeIn key={i} delay={i * 0.1} direction="left">
          {card.href ? (
            <a
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass glass-hover rounded-2xl p-5 flex items-center gap-4 cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}40`,
                }}
              >
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {card.title}
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
                >
                  {card.value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {card.sub}
                </div>
              </div>
            </a>
          ) : (
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${card.color}18`,
                  border: `1px solid ${card.color}40`,
                }}
              >
                <card.icon size={18} style={{ color: card.color }} />
              </div>
              <div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {card.title}
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
                >
                  {card.value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {card.sub}
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function ContactPage() {
  return (
    <main style={{ background: "var(--space)", paddingTop: 100 }}>
      {/* Header */}
      <section className="py-32 px-6 text-left relative overflow-hidden bg-gradient-to-b from-transparent to-[#112240]/20">
        <div className="absolute inset-0 svg-grid pointer-events-none" style={{ opacity: 0.4 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,242,255,0.05) 0%, transparent 70%)",
          }}
        />
        <FadeIn className="relative z-10 max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--cyan)", opacity: 0.7 }}
          >
            Growth Engine
          </p>
          <h1
            className="text-5xl lg:text-6xl font-extrabold mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Get Your{" "}
            <span className="text-gradient-cyan">Free Quote</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Tell us about your business in 3 steps. A Solution Architect will reach
            you on WhatsApp with a custom growth plan.
          </p>
        </FadeIn>
      </section>

      {/* Form + Contact Info */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#112240]/20 to-transparent">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <FadeIn direction="right" className="w-full lg:w-2/3">
            <SmartQuoteForm />
          </FadeIn>

          <div className="flex flex-col gap-8 w-full lg:w-1/3 lg:sticky lg:top-32">
            <FadeIn direction="left">
              <div>
                <h2
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
                >
                  Chat with a Solution Architect
                </h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  Prefer to talk directly? We are available on WhatsApp now.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hi%20Vextor!%20I%27d%20like%20to%20discuss%20how%20you%20can%20help%20digitize%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold text-sm w-full justify-center transition-all"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
                    fontFamily: "Sora, sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(37,211,102,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.35)";
                  }}
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
              </div>
            </FadeIn>

            <ContactCards />

            {/* Trust indicators */}
            <FadeIn direction="left" delay={0.3}>
              <div
                className="glass rounded-2xl p-6"
                style={{ border: "1px solid rgba(0,242,255,0.15)" }} // Changed from Gold border to Cyan
              >
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "var(--cyan)", opacity: 0.8 }} // Changed from Gold to Cyan
                >
                  Why SMEs Trust Vextor
                </p>
                {[
                  "Free consultation, no commitment",
                  "Fixed-price milestones — no surprise bills",
                  "First prototype in 7 days",
                  "Dedicated WhatsApp support channel",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                    <CheckCircle
                      size={14}
                      style={{ color: "var(--cyan)", marginTop: 2, flexShrink: 0 }} // Changed from Gold to Cyan
                    />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--cyan)" }}
            >
              <Zap size={14} fill="#0A192F" color="#0A192F" />
            </div>
            <span
              className="font-bold"
              style={{ fontFamily: "Sora, sans-serif", color: "var(--text-secondary)" }}
            >
              Vex<span style={{ color: "var(--cyan)" }}>tor</span>
            </span>
          </div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 Vextor Technologies Pvt. Ltd. · Powering Vikshit Bharat 2047
          </p>
          <div className="flex gap-6">
            {["Home", "Services", "SME Advantage", "Contact"].map((l) => (
              <Link
                key={l}
                href={l === "Home" ? "/" : `/${l.toLowerCase().replace(" ", "-")}`}
                className="text-xs transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--cyan)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
