"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Zap, Bot, Cloud, Building2, ArrowRight, Target,
  TrendingUp, ShieldCheck, DollarSign
} from "lucide-react";
import { FadeIn, StaggerChildren, fadeUpItem } from "@/components/FadeIn";

/* ─── Countdown to Aug 15, 2047 ─── */
function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2047-08-15T00:00:00+05:30").getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="flex gap-4 justify-start flex-wrap">
      {units.map((u, i) => (
        <div key={i} className="countdown-block">
          <motion.div
            key={u.value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-extrabold tabular-nums"
            style={{ color: "var(--gold)", fontFamily: "Sora, sans-serif" }}
          >
            {String(u.value).padStart(2, "0")}
          </motion.div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Cost Comparison Visual ─── */
function CostComparison() {
  const bars = [
    { label: "Traditional Agency", cost: 95, color: "#FF6B6B" },
    { label: "Vextor", cost: 22, color: "var(--cyan)" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {bars.map((bar, i) => (
        <FadeIn key={i} delay={i * 0.2}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                {bar.label}
              </span>
              <span className="text-sm font-bold" style={{ color: bar.color, fontFamily: "Sora, sans-serif" }}>
                {bar.cost}% cost
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 10, background: "var(--space-mid)", border: "1px solid var(--border)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.cost}%` }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: "100%", background: bar.color, borderRadius: "9999px" }}
              />
            </div>
          </div>
        </FadeIn>
      ))}
      <FadeIn delay={0.5}>
        <div
          className="mt-2 p-4 rounded-xl flex items-center gap-3"
          style={{ background: "rgba(0,242,255,0.05)", border: "1px solid rgba(0,242,255,0.15)" }}
        >
          <TrendingUp size={18} style={{ color: "var(--cyan)", flexShrink: 0 }} />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            You save <span style={{ color: "var(--cyan)", fontWeight: 700 }}>73%</span> compared to traditional agencies — without compromising quality.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}

/* ─── Advantage Card ─── */
function AdvantageCard({
  icon: Icon,
  title,
  desc,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  badge?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUpItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass glass-hover rounded-2xl p-7 flex flex-col gap-4 relative overflow-hidden"
      style={{
        border: hovered ? "1px solid var(--border-hover)" : "1px solid var(--border)",
        transition: "border-color 0.3s ease",
      }}
    >
      {badge && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: "var(--cyan-dim)", color: "var(--cyan)", border: "1px solid rgba(0,242,255,0.3)" }}
        >
          {badge}
        </div>
      )}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: "var(--cyan-dim)", border: "1px solid rgba(0,242,255,0.2)" }}
      >
        <Icon size={22} style={{ color: "var(--cyan)" }} />
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
    </motion.div>
  );
}

/* ─── City Silhouette SVG ─── */
function CitySilhouette() {
  return (
    <svg
      viewBox="0 0 1200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", opacity: 0.25 }}
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Buildings from right to left */}
      <rect x="0" y="150" width="60" height="150" fill="rgba(0,242,255,0.5)" />
      <rect x="70" y="100" width="40" height="200" fill="rgba(0,242,255,0.6)" />
      <rect x="120" y="60" width="50" height="240" fill="rgba(0,242,255,0.7)" />
      <rect x="130" y="40" width="10" height="30" fill="rgba(0,242,255,0.8)" />
      <rect x="180" y="120" width="70" height="180" fill="rgba(0,242,255,0.5)" />
      <rect x="260" y="80" width="45" height="220" fill="rgba(0,242,255,0.6)" />
      <rect x="280" y="50" width="8" height="40" fill="rgba(0,242,255,0.9)" />
      <rect x="315" y="140" width="55" height="160" fill="rgba(0,242,255,0.4)" />
      <rect x="380" y="70" width="35" height="230" fill="rgba(0,242,255,0.7)" />
      <rect x="390" y="40" width="6" height="35" fill="rgba(0,242,255,1)" />
      <rect x="425" y="110" width="65" height="190" fill="rgba(0,242,255,0.5)" />
      <rect x="500" y="90" width="50" height="210" fill="rgba(0,242,255,0.6)" />
      <rect x="560" y="130" width="40" height="170" fill="rgba(0,242,255,0.4)" />
      <rect x="610" y="60" width="70" height="240" fill="rgba(0,242,255,0.65)" />
      <rect x="625" y="30" width="12" height="35" fill="rgba(0,242,255,0.95)" />
      <rect x="690" y="100" width="45" height="200" fill="rgba(0,242,255,0.5)" />
      <rect x="745" y="140" width="60" height="160" fill="rgba(0,242,255,0.4)" />
      <rect x="815" y="75" width="50" height="225" fill="rgba(0,242,255,0.6)" />
      <rect x="820" y="45" width="10" height="35" fill="rgba(0,242,255,0.9)" />
      <rect x="875" y="115" width="55" height="185" fill="rgba(0,242,255,0.5)" />
      <rect x="940" y="85" width="40" height="215" fill="rgba(0,242,255,0.55)" />
      <rect x="990" y="145" width="70" height="155" fill="rgba(0,242,255,0.4)" />
      <rect x="1070" y="95" width="50" height="205" fill="rgba(0,242,255,0.6)" />
      <rect x="1130" y="120" width="70" height="180" fill="rgba(0,242,255,0.5)" />

      {/* Ground line */}
      <rect x="0" y="298" width="1200" height="2" fill="rgba(0,242,255,0.3)" />

      {/* Window lights */}
      {[120, 260, 380, 610, 815].map((x, i) => (
        <rect key={i} x={x + 8} y={80 + i * 12} width="6" height="6" fill="rgba(0,242,255,0.6)" rx="1" />
      ))}
    </svg>
  );
}

/* ─── Main Page ─── */
export default function SMEAdvantagePage() {
  return (
    <main style={{ background: "var(--space)", paddingTop: 100 }}>

      {/* Page Header */}
      <section className="py-32 px-6 text-left relative overflow-hidden">
        <div className="absolute inset-0 svg-grid pointer-events-none" style={{ opacity: 0.4 }} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,242,255,0.05) 0%, transparent 70%)",
          }}
        />
        <FadeIn className="relative z-10 max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--cyan)", opacity: 0.8 }}
          >
            The SME Advantage
          </p>
          <h1
            className="text-5xl lg:text-6xl font-extrabold mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Advanced Tech.{" "}
            <span className="text-gradient-cyan">No Agency Tax.</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
            We democratize enterprise software for India&apos;s 63 million small businesses.
            Here&apos;s how we keep costs honest.
          </p>
        </FadeIn>
      </section>

      {/* Section 1: Why Low Cost */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-transparent to-[#112240]/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn direction="right">
            <h2
              className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Why are we{" "}
              <span className="text-gradient-cyan">significantly cheaper</span>{" "}
              than the competition?
            </h2>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Traditional agencies bloat your bill with unnecessary overheads.
              We stripped all of that — and passed the savings to you.
            </p>

            <StaggerChildren className="flex flex-col gap-6">
              {[
                {
                  icon: Bot,
                  title: "Vibe Coding — 5x Faster Delivery",
                  desc: "We build 5x faster using AI-augmented workflows. Less developer-hours means lower bills without cutting corners.",
                  badge: "AI-Powered",
                },
                {
                  icon: Cloud,
                  title: "Cloud Native — Zero Server Costs",
                  desc: "No expensive physical servers. Oracle Cloud Free Tier + serverless architecture = near-zero infrastructure cost.",
                  badge: undefined,
                },
                {
                  icon: Building2,
                  title: "Lean Ops — No Fancy Offices",
                  desc: "We invest in code, not glass towers. Our remote-first team works globally but bills locally.",
                  badge: undefined,
                },
                {
                  icon: DollarSign,
                  title: "Outcome-Based Pricing",
                  desc: "You pay for results, not retainers. Fixed-scope milestones. No surprise invoices.",
                  badge: "Transparent",
                },
              ].map((card, i) => (
                <AdvantageCard key={i} {...card} />
              ))}
            </StaggerChildren>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="lg:sticky lg:top-32 mt-12 lg:mt-0">
            <div
              className="glass rounded-[32px] p-8 md:p-10"
              style={{ boxShadow: "0 0 60px rgba(0,242,255,0.06)" }}
            >
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck size={20} style={{ color: "var(--cyan)" }} />
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
                >
                  Cost Transparency Report
                </h3>
              </div>
              <CostComparison />

              {/* Pricing tiers preview */}
              <div className="mt-8 flex flex-col gap-3">
                {[
                  { plan: "Starter", price: "₹4,999/mo", desc: "Perfect for solopreneurs" },
                  { plan: "Growth", price: "₹14,999/mo", desc: "Full automation suite", highlight: true },
                  { plan: "Enterprise", price: "Custom", desc: "Multi-location & API" },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl transition-all"
                    style={{
                      background: t.highlight ? "rgba(0,242,255,0.07)" : "var(--space-mid)",
                      border: `1px solid ${t.highlight ? "rgba(0,242,255,0.3)" : "var(--border)"}`,
                    }}
                  >
                    <div>
                      <div
                        className="text-sm font-semibold"
                        style={{
                          color: t.highlight ? "var(--cyan)" : "var(--text-primary)",
                          fontFamily: "Sora, sans-serif",
                        }}
                      >
                        {t.plan}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {t.desc}
                      </div>
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{
                        color: t.highlight ? "var(--cyan)" : "var(--text-secondary)",
                        fontFamily: "Sora, sans-serif",
                      }}
                    >
                      {t.price}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="btn-cyan mt-6 w-full py-4 rounded-2xl text-sm"
              >
                Get Custom Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 2: 2047 Vision Banner */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#112240]/20 to-transparent" style={{ minHeight: 500 }}>
        {/* Background: city silhouette with Ken Burns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="ken-burns absolute inset-0">
            <CitySilhouette />
          </div>
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, var(--space) 0%, rgba(10,25,47,0.6) 40%, rgba(10,25,47,0.75) 70%, var(--space) 100%)",
            }}
          />
          {/* Gold tint */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(255,153,51,0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-start text-left gap-10">
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <Target size={18} style={{ color: "var(--gold)" }} />
              <span
                className="text-xs uppercase tracking-widest font-semibold"
                style={{ color: "var(--gold)" }}
              >
                Vikshit Bharat 2047
              </span>
            </div>

            <h2
              className="text-5xl lg:text-6xl font-extrabold mb-6"
              style={{ fontFamily: "Sora, sans-serif", lineHeight: 1.15 }}
            >
              Target:{" "}
              <span className="text-gradient-gold">1 Million SMEs</span>
              <br />
              Digitized by 2047.
            </h2>

            <p className="text-lg max-w-2xl mb-10" style={{ color: "var(--text-secondary)" }}>
              A developed India needs tech-first businesses. Vextor is here to make enterprise
              digital transformation{" "}
              <span style={{ color: "var(--gold)" }}>affordable for every SME</span>. On the
              75th anniversary of independence, India will stand as a developed nation — powered
              by its small businesses.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div
              className="p-1 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,153,51,0.3), rgba(0,242,255,0.2))",
              }}
            >
              <div
                className="rounded-xl px-8 py-6"
                style={{ background: "rgba(10,25,47,0.9)", backdropFilter: "blur(20px)" }}
              >
                <p
                  className="text-xs uppercase tracking-widest mb-6 text-left"
                  style={{ color: "var(--text-muted)" }}
                >
                  Countdown to Independence Day 2047
                </p>
                <Countdown />
                <p className="text-xs mt-4 text-left" style={{ color: "var(--text-muted)" }}>
                  August 15, 2047 — India@100
                </p>
              </div>
            </FadeIn>

          <FadeIn delay={0.5}>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link
                href="/contact"
                className="btn-cyan flex items-center gap-3 px-8 py-4 rounded-2xl"
              >
                Join the 2047 Mission
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300"
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                View Our Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--cyan)" }}>
              <Zap size={14} fill="#0A192F" color="#0A192F" />
            </div>
            <span className="font-bold" style={{ fontFamily: "Sora, sans-serif", color: "var(--text-secondary)" }}>
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
