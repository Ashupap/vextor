"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/sme-advantage", label: "SME Advantage" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4"
        style={{ paddingTop: "16px" }}
      >
        <nav
          className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(10,25,47,0.92)"
              : "rgba(10,25,47,0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,242,255,0.12)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,242,255,0.05)"
              : "none",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--cyan)", boxShadow: "0 0 16px var(--cyan-glow)" }}
            >
              <Zap size={16} fill="#0A192F" color="#0A192F" />
            </div>
            <span
              className="text-lg font-bold tracking-wide"
              style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
            >
              Vex<span style={{ color: "var(--cyan)" }}>tor</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:text-[var(--text-primary)]"
                  style={{
                    color: isActive ? "var(--cyan)" : "var(--text-secondary)",
                    background: isActive ? "rgba(0,242,255,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan-glow)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="btn-cyan px-6 py-2.5 rounded-xl text-sm shadow-md"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-secondary)" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[90px] left-4 right-4 z-40 rounded-2xl p-4 flex flex-col gap-2"
            style={{
              background: "rgba(10,25,47,0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,242,255,0.15)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: pathname === link.href ? "var(--cyan)" : "var(--text-secondary)",
                  background:
                    pathname === link.href
                      ? "rgba(0,242,255,0.08)"
                      : "transparent",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-cyan px-5 py-3 rounded-xl text-sm text-center mt-2"
            >
              Get a Free Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
