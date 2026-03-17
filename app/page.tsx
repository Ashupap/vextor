"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap, FileX, Activity, Settings, Smartphone, Globe, Server,
  ArrowRight, ChevronRight
} from "lucide-react";
import VectorArrow from "@/components/VectorArrow";
import { FadeIn, StaggerChildren, fadeUpItem } from "@/components/FadeIn";

/* ─── Hero Letter Stagger ─── */
function LetterStagger({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.4 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── SVG Moving Grid ─── */
function MovingGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <motion.div
        className="svg-grid absolute"
        style={{ top: -60, left: -60, right: -60, bottom: -60, opacity: 0.6, willChange: "transform" }}
        animate={{ x: [0, 60], y: [0, 60] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #0A192F 70%)",
        }}
      />
    </div>
  );
}

/* ─── Comparison Slider ─── */
function ComparisonSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!trackRef.current || !handleRef.current || !leftRef.current || !rightRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));

    // Direct DOM manipulation for 60fps performance without React re-renders
    handleRef.current.style.left = `${pct}%`;
    rightRef.current.style.clipPath = `inset(0 0 0 ${pct}%)`;
  };

  return (
    <div
      ref={trackRef}
      className="relative rounded-2xl overflow-hidden select-none cursor-ew-resize"
      style={{
        height: 340,
        border: "1px solid var(--border)",
        userSelect: "none",
        willChange: "transform",
      }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* Left: Legacy chaos */}
      <div
        ref={leftRef}
        className="absolute inset-0 flex flex-col justify-center px-8 gap-4"
        style={{ background: "rgba(30,10,10,0.85)", backdropFilter: "blur(4px)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#FF6B6B" }}>
          Legacy Chaos
        </p>
        {["Paper Registers", "Broken Excel Formulas", "Manual Entry Errors", "Missing Invoices", "Zero Real-time Data"].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ background: "#FF6B6B", opacity: 0.6 }} />
            <span
              className="text-sm line-through"
              style={{ color: "#8B6B6B", filter: `blur(${i * 0.3}px)` }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Vextor Flow — clipped */}
      <div
        ref={rightRef}
        className="absolute inset-0 flex flex-col justify-center px-8 gap-4"
        style={{
          background: "rgba(10,25,47,0.95)",
          clipPath: `inset(0 0 0 50%)`,
          backdropFilter: "blur(16px)",
          willChange: "clip-path",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--cyan)" }}>
          Vextor Flow
        </p>
        {[
          { label: "Sales Today", value: "₹2,84,000", up: true },
          { label: "Inventory Status", value: "✓ Synced", up: true },
          { label: "Pending Invoices", value: "0", up: true },
          { label: "Active Users", value: "24 online", up: true },
          { label: "System Health", value: "99.9% uptime", up: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.label}</span>
            <span className="text-sm font-semibold" style={{ color: "var(--cyan)" }}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* Drag handle */}
      <div
        ref={handleRef}
        className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none"
        style={{
          left: `50%`,
          transform: "translateX(-50%)",
          zIndex: 10,
          width: 2,
          background: "var(--cyan)",
          boxShadow: "0 0 16px var(--cyan-glow)",
          willChange: "left",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full pointer-events-none"
          style={{
            width: 36,
            height: 36,
            background: "var(--cyan)",
            boxShadow: "0 0 24px var(--cyan-glow)",
          }}
        >
          <span style={{ color: "#0A192F", fontSize: 14, fontWeight: 700 }}>⇄</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 text-xs" style={{ color: "#FF6B6B", opacity: 0.8 }}>
        ← Before
      </div>
      <div className="absolute bottom-4 right-4 text-xs" style={{ color: "var(--cyan)", opacity: 0.8 }}>
        After →
      </div>
    </div>
  );
}

/* ─── Bento Tile ─── */
function BentoTile({
  icon: Icon,
  title,
  desc,
  delay,
  accent = false,
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
  accent?: boolean;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUpItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bento-tile glass glass-hover rounded-[32px] p-8 md:p-10 flex flex-col gap-6 cursor-pointer relative ${className}`}
      style={{
        border: hovered ? "1px solid var(--border-hover)" : "1px solid var(--border)",
        transition: "border-color 0.3s ease",
        minHeight: 280,
      }}
    >
      {/* Top-left corner trace */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "var(--cyan)" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-px"
        animate={{ height: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: "var(--cyan)" }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: accent ? "var(--gold-dim)" : "var(--cyan-dim)",
          border: `1px solid ${accent ? "rgba(255,153,51,0.3)" : "rgba(0,242,255,0.2)"}`,
        }}
      >
        <Icon
          size={22}
          style={{ color: accent ? "var(--gold)" : "var(--cyan)" }}
        />
      </div>

      <div>
        <h3
          className="text-lg font-bold mb-2"
          style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {desc}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2" style={{ color: accent ? "var(--gold)" : "var(--cyan)" }}>
        <span className="text-xs font-semibold">Explore</span>
        <ChevronRight size={14} />
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <main style={{ background: "var(--space)" }}>
      {/* ════════ SECTION 1: HERO ════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ paddingTop: 100 }}
      >
        <MovingGrid />

        {/* Orb glows */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,242,255,0.08) 0%, transparent 70%)",
            top: "10%",
            right: "-10%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,153,51,0.05) 0%, transparent 70%)",
            bottom: "20%",
            left: "-5%",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
          {/* Text */}
          <div className="flex flex-col items-start lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0,242,255,0.1)", // Changed from Gold to Cyan
                border: "1px solid rgba(0,242,255,0.25)", // Changed from Gold to Cyan
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--cyan)", animation: "glow-pulse 2s ease-in-out infinite" }} // Changed from Gold to Cyan
              />
              <span className="text-xs font-semibold" style={{ color: "var(--cyan)" }}> // Changed from Gold to Cyan
                Vikshit Bharat 2047 Mission
              </span>
            </motion.div>

            <h1
              className="text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold leading-[1.1] mb-6"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <LetterStagger text="The Tech" />
              <br />
              <span className="text-gradient-cyan">
                <LetterStagger text="Direction" />
              </span>
              <br />
              <LetterStagger text="of a Developed" />
              <br />
              <LetterStagger text="India." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Enterprise-grade software at SME-friendly prices. Powering your
              growth to achieve{" "}
              <span style={{ color: "var(--cyan)" }}>Vikshit Bharat by 2047</span>. // Changed from Gold to Cyan
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-5 w-full"
            >
              <div className="relative">
                <Link
                  href="/contact"
                  className="btn-cyan px-8 py-4 rounded-2xl text-base"
                >
                  <Zap size={18} fill="currentColor" />
                  Grow My Business
                  <ArrowRight size={16} />
                </Link>
                {/* Floating Zap icon */}
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{
                    y: [-4, 4, -4],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ color: "var(--cyan)", opacity: 0.8 }}
                >
                  <Zap size={20} />
                </motion.div>
              </div>

              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                View Services
                <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-14"
            >
              {[
                { num: "500+", label: "SMEs Served" },
                { num: "99.9%", label: "Uptime SLA" },
                { num: "5x", label: "Faster Delivery" },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--cyan)", fontFamily: "Sora, sans-serif" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-[420px]">
              {/* Main card */}
              <div
                className="glass rounded-[32px] p-8 md:p-10 flex flex-col items-center gap-8 w-full"
                style={{
                  boxShadow: "0 0 80px rgba(0,242,255,0.1), 0 32px 64px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--cyan)", opacity: 0.7 }}
                >
                  Vextor Vector Engine
                </div>
                <div className="w-full flex justify-center transform scale-90 sm:scale-100 origin-center">
                  <VectorArrow />
                </div>
                <div
                  className="text-sm text-left leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Pointing Indian SMEs toward a{" "}
                  <span style={{ color: "var(--cyan)" }}>digital future</span> // Changed from Gold to Cyan
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 glass rounded-xl px-4 py-3"
                style={{ border: "1px solid rgba(0,242,255,0.2)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    All systems live
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 glass rounded-xl px-4 py-3"
                style={{ border: "1px solid rgba(0,242,255,0.2)" }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--gold)" }}>🇮🇳</span>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Made for Bharat
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: "linear-gradient(to bottom, var(--border-hover), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ════════ SECTION 2: PAIN POINT ════════ */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-transparent to-[#0D2137]/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-left mb-16">
            <div className="flex items-center justify-start gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "var(--border)" }} />
              <FileX size={18} style={{ color: "var(--text-muted)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                The Problem We Solve
              </span>
              <Activity size={18} style={{ color: "var(--cyan)" }} />
            </div>
            <h2
              className="text-4xl lg:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Stop managing your business{" "}
              <span className="text-gradient-cyan">on paper.</span>
              <br />
              Start leading with{" "}
              <span className="text-gradient-cyan">Data.</span> // Changed from Gold to Cyan
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
              India&apos;s 63 million SMEs lose billions annually to manual processes.
              Drag the slider to see the transformation.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ComparisonSlider />
          </FadeIn>
        </div>
      </section>

      {/* ════════ SECTION 3: BENTO GRID ════════ */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#0D2137]/30 to-transparent">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,242,255,0.03) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-left mb-16">
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--cyan)", opacity: 0.7 }}
            >
              Complete Solution Suite
            </p>
            <h2
              className="text-4xl lg:text-5xl font-extrabold mb-4"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Everything your business needs.{" "}
              <span className="text-gradient-cyan">One platform.</span>
            </h2>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <BentoTile
              icon={Settings}
              title="Workflow Automation"
              desc="Eliminate manual entries. Auto-sync inventory and sales in real-time. Custom CRM, invoicing, and HR — all connected."
              delay={0}
              className="md:col-span-4"
            />
            <BentoTile
              icon={Smartphone}
              title="Mobile Apps"
              desc="Your office in your pocket. Flutter-powered Android & iOS apps. Manage from anywhere, any time."
              delay={0.1}
              className="md:col-span-2"
            />
            <BentoTile
              icon={Globe}
              title="Web & Social Marketing"
              desc="High-converting Next.js React sites + AI-powered social media marketing. Turn visitors into customers."
              delay={0.2}
              className="md:col-span-2"
            />
            <BentoTile
              icon={Server}
              title="Infrastructure & Security"
              desc="Microservices that never crash. Docker-based deployment, Oracle Cloud backups, and bank-grade security."
              delay={0.3}
              className="md:col-span-4"
            />
          </StaggerChildren>

          <FadeIn delay={0.4} className="text-left mt-12">
            <Link
              href="/services"
              className="btn-cyan px-8 py-4 rounded-2xl text-sm"
            >
              Explore All Services
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ════════ FOOTER STRIP ════════ */}
      <footer
        className="py-12 px-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
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
