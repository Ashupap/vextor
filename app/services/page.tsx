"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Settings, Smartphone, Globe, Server, Cpu,
  ArrowRight, CheckCircle, Zap, Database, Shield, Cloud,
  BarChart3, FileText, Users, Package, RefreshCw
} from "lucide-react";
import { FadeIn, StaggerChildren, fadeUpItem } from "@/components/FadeIn";

/* ─── Animated Flowchart ─── */
function FlowChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { icon: FileText, label: "Form Input", color: "var(--cyan)" },
    { icon: RefreshCw, label: "Auto Sync", color: "#7B61FF" },
    { icon: Database, label: "Cloud Storage", color: "var(--cyan)" },
    { icon: BarChart3, label: "Insights", color: "#22c55e" },
  ];

  return (
    <div ref={ref} className="flex items-center justify-center gap-0 flex-wrap">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.3 + 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
              style={{
                background: `${step.color}18`,
                border: `1px solid ${step.color}40`,
              }}
            >
              <step.icon size={24} style={{ color: step.color }} />
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={inView ? {
                  boxShadow: [
                    `0 0 0 0 ${step.color}40`,
                    `0 0 0 10px ${step.color}00`,
                  ],
                } : {}}
                transition={{
                  delay: i * 0.3 + 0.8,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </div>
            <span className="text-xs font-semibold text-left" style={{ color: "var(--text-secondary)" }}>
              {step.label}
            </span>
          </motion.div>

          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.3 + 0.6, duration: 0.4 }}
              className="w-12 h-px mx-2"
              style={{
                background: "linear-gradient(to right, var(--border), var(--cyan-dim))",
                transformOrigin: "left",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center" style={{ height: 520 }}>
      {/* Background glow */}
      <div
        className="absolute"
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,242,255,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Phone body */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{ willChange: "transform" }}
      >
        <div
          className="rounded-[48px] overflow-hidden relative"
          style={{
            width: 240,
            height: 480,
            background: "#0D0D0D",
            border: "2px solid rgba(255,255,255,0.15)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full z-20"
            style={{ width: 80, height: 28, background: "#000" }}
          />

          {/* Screen content */}
          <div
            className="absolute inset-0 flex flex-col"
            style={{ background: "var(--space)", padding: "52px 16px 20px" }}
          >
            {/* App header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-bold" style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}>
                  Vextor Admin
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>Good morning, Rahul</div>
              </div>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "var(--cyan-dim)" }}
              >
                <span className="text-xs font-bold" style={{ color: "var(--cyan)" }}>R</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: "Revenue", value: "₹2.4L", color: "var(--cyan)" },
                { label: "Orders", value: "47", color: "var(--cyan)" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3"
                  style={{ background: "var(--space-mid)", border: "1px solid var(--border)" }}
                >
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                  <div
                    className="text-sm font-bold mt-1"
                    style={{ color: s.color, fontFamily: "Sora, sans-serif" }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini chart bars */}
            <div
              className="rounded-xl p-3 mb-3"
              style={{ background: "var(--space-mid)", border: "1px solid var(--border)" }}
            >
              <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Weekly Sales</div>
              <div className="flex items-end gap-1" style={{ height: 40 }}>
                {[60, 80, 45, 90, 70, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: i === 6
                        ? "var(--cyan)"
                        : "rgba(0,242,255,0.25)",
                      borderRadius: "3px 3px 0 0",
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div
              className="rounded-xl p-3"
              style={{ background: "var(--space-mid)", border: "1px solid var(--border)", flex: 1 }}
            >
              <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>Recent Orders</div>
              {[
                { name: "Rajesh Steel Works", amt: "₹18,400" },
                { name: "Patel Traders", amt: "₹6,200" },
              ].map((o, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <span style={{ fontSize: 9, color: "var(--text-secondary)" }}>{o.name}</span>
                  <span style={{ fontSize: 9, color: "var(--cyan)", fontWeight: 600 }}>{o.amt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 80, height: 4, background: "rgba(255,255,255,0.3)" }}
          />
        </div>

        {/* Side buttons */}
        <div
          className="absolute rounded-r-sm"
          style={{
            right: -3,
            top: 120,
            width: 3,
            height: 50,
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-4 glass rounded-xl px-3 py-2"
        style={{ border: "1px solid rgba(0,242,255,0.2)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#22c55e" }} />
          <span style={{ fontSize: 10, color: "var(--text-secondary)" }}>Flutter + iOS</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-4 glass rounded-xl px-3 py-2"
        style={{ border: "1px solid rgba(0,242,255,0.2)" }}
      >
        <span style={{ color: "var(--cyan)", fontSize: 10 }}>Offline-first ✓</span>
      </motion.div>
    </div>
  );
}

/* ─── Pulsing CPU ─── */
function PulsingCPU() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 200 }}>
      {[80, 110, 140].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(0,242,255,${0.4 - i * 0.12})`,
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "var(--cyan-dim)",
          border: "1px solid rgba(0,242,255,0.4)",
          boxShadow: "0 0 30px var(--cyan-glow)",
        }}
      >
        <Cpu size={28} style={{ color: "var(--cyan)" }} />
      </div>
    </div>
  );
}

/* ─── Feature Check List ─── */
function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={fadeUpItem}
          className="flex items-start gap-3"
        >
          <CheckCircle size={16} style={{ color: "var(--cyan)", marginTop: 2, flexShrink: 0 }} />
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ─── Section Header ─── */
function SectionTag({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
      style={{
        background: "var(--cyan-dim)",
        border: "1px solid rgba(0,242,255,0.2)",
      }}
    >
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--cyan)" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ServicesPage() {
  return (
    <main style={{ background: "var(--space)", paddingTop: 100 }}>

      {/* ── Page Header ── */}
      <section className="py-32 px-6 text-left relative overflow-hidden">
        <div
          className="absolute inset-0 svg-grid pointer-events-none"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,242,255,0.05) 0%, transparent 70%)",
          }}
        />
        <FadeIn className="relative z-10 max-w-7xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--cyan)", opacity: 0.7 }}
          >
            Infrastructure Suite
          </p>
          <h1
            className="text-5xl lg:text-6xl font-extrabold mb-6"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            Services Built for{" "}
            <span className="text-gradient-cyan">Bharat&apos;s</span>{" "}
            Businesses
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "var(--text-secondary)" }}>
            From Bahi-Khata to cloud. We build the full stack so you can focus on growing.
          </p>
        </FadeIn>
      </section>

      {/* ── Section 1: Workflow Automation ── */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-transparent to-[#112240]/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="right">
            <SectionTag label="01 · Workflow Automation" />
            <h2
              className="text-4xl font-extrabold mb-6 leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              From <span className="text-gradient-cyan">Bahi-Khata</span>
              <br />to Cloud.
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Replace every spreadsheet, paper register, and WhatsApp reminder with a unified digital backbone.
              Real-time data. Zero manual errors. Total visibility.
            </p>
            <StaggerChildren>
              <FeatureList items={[
                "Custom CRM — Track every lead, deal, and customer interaction",
                "Automated Invoicing — GST-compliant, one-click invoice generation",
                "Inventory Tracking — Real-time stock sync across all channels",
                "HR Management — Attendance, payroll, and leave automation",
                "Custom Dashboards — Business insights in one glance",
              ]} />
            </StaggerChildren>
            <div className="mt-10">
              <Link
                href="/contact"
                className="btn-cyan px-8 py-4 rounded-2xl text-sm"
              >
                Automate My Business
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="mt-12 lg:mt-0">
            <div
              className="glass rounded-[32px] p-8 lg:p-12"
              style={{ boxShadow: "0 0 60px rgba(0,242,255,0.06)" }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-8 text-left"
                style={{ color: "var(--text-muted)" }}
              >
                Data Pipeline
              </p>
              <FlowChart />

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { label: "Manual Errors", before: "Daily", after: "Zero", color: "var(--cyan)" },
                  { label: "Report Time", before: "2 hours", after: "Instant", color: "var(--cyan)" },
                  { label: "Accuracy", before: "71%", after: "99.9%", color: "#22c55e" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 text-left"
                    style={{ background: "var(--space-mid)", border: "1px solid var(--border)" }}
                  >
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                    <div className="text-xs line-through" style={{ color: "var(--text-muted)" }}>{s.before}</div>
                    <div className="text-sm font-bold" style={{ color: s.color, fontFamily: "Sora, sans-serif" }}>
                      {s.after}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ borderTop: "1px solid var(--border)" }}
      />

      {/* ── Section 2: Mobile & Web ── */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#112240]/20 to-transparent">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="right" className="order-2 lg:order-1 mt-12 lg:mt-0">
            <PhoneMockup />
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="order-1 lg:order-2">
            <SectionTag label="02 · Mobile & Web" />
            <h2
              className="text-4xl font-extrabold mb-6 leading-tight"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Cross-Platform{" "}
              <span className="text-gradient-cyan">Performance.</span>
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your business deserves interfaces as premium as your products.
              We build pixel-perfect apps and blazing-fast websites optimized for India&apos;s mobile-first users.
            </p>
            <StaggerChildren>
              <FeatureList items={[
                "Flutter-based Android & iOS apps — one codebase, two platforms",
                "Next.js 15 websites — LCP < 1.2s, fully SEO-optimized",
                "Offline-first architecture for low-connectivity areas",
                "Admin dashboards with real-time data visualization",
                "WhatsApp & SMS integration for customer communication",
              ]} />
            </StaggerChildren>
            <div className="mt-10 flex gap-4 flex-wrap">
              <div
                className="px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "var(--cyan-dim)", color: "var(--cyan)", border: "1px solid rgba(0,242,255,0.2)" }}
              >
                Flutter 3.x
              </div>
              <div
                className="px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "var(--cyan-dim)", color: "var(--cyan)", border: "1px solid rgba(0,242,255,0.2)" }}
              >
                Next.js 15
              </div>
              <div
                className="px-4 py-2 rounded-xl text-xs font-semibold"
                style={{ background: "var(--cyan-dim)", color: "var(--cyan)", border: "1px solid rgba(0,242,255,0.2)" }}
              >
                TypeScript Strict
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ borderTop: "1px solid var(--border)" }}
      />

      {/* ── Section 3: Infrastructure ── */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-transparent to-[#112240]/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn direction="right">
              <SectionTag label="03 · Infrastructure & Microservices" />
              <h2
                className="text-4xl font-extrabold mb-6 leading-tight"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Enterprise Power.{" "}
                <span className="text-gradient-cyan">Zero Bloat.</span>
              </h2>
              <p className="text-base mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We build the backbone; you reap the rewards.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                No expensive on-premise servers. No vendor lock-in. Just clean, scalable
                cloud infrastructure that grows with you — at a fraction of traditional cost.
              </p>
              <StaggerChildren>
                <FeatureList items={[
                  "Docker-based containerized deployment — zero downtime releases",
                  "Microservice architecture — independent scaling per module",
                  "Automated backups on Oracle Cloud Free Tier",
                  "Bank-grade TLS encryption + OAuth2 authentication",
                  "99.9% uptime SLA with automated failover",
                ]} />
              </StaggerChildren>

              <div
                className="mt-12 p-8 rounded-[24px]"
                style={{
                  background: "linear-gradient(135deg, rgba(0,242,255,0.05), rgba(255,153,51,0.05))",
                  border: "1px solid rgba(0,242,255,0.15)",
                }}
              >
                <p
                  className="text-xl font-bold italic"
                  style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
                >
                  &ldquo;We build the backbone;{" "}
                  <span className="text-gradient-cyan">you reap the rewards.&rdquo;</span>
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="mt-12 lg:mt-0">
              <div className="glass rounded-[32px] p-8 lg:p-12 flex flex-col items-center gap-10">
                <PulsingCPU />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  {[
                    { icon: Shield, label: "Security", value: "Bank-grade TLS" },
                    { icon: Cloud, label: "Backups", value: "Oracle Cloud" },
                    { icon: RefreshCw, label: "Deployment", value: "Docker CI/CD" },
                    { icon: Database, label: "Database", value: "PostgreSQL + Redis" },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-4 flex flex-col gap-2"
                      style={{ background: "var(--space-mid)", border: "1px solid var(--border)" }}
                    >
                      <Icon size={16} style={{ color: "var(--cyan)" }} />
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
                      <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#112240]/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div
              className="glass rounded-3xl p-12 text-left relative overflow-hidden"
              style={{ boxShadow: "0 0 80px rgba(0,242,255,0.08)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,242,255,0.06) 0%, transparent 70%)",
                }}
              />
              <Zap size={40} style={{ color: "var(--cyan)", marginBottom: 24 }} />
              <h2
                className="text-3xl font-extrabold mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Ready to transform your business?
              </h2>
              <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
                Get a free consultation and custom roadmap. No commitment required.
              </p>
              <Link
                href="/contact"
                className="btn-cyan px-10 py-4 rounded-2xl"
              >
                Get My Free Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
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
