"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(false);
  const phone = "919999999999"; // Replace with actual number
  const message = encodeURIComponent(
    "Hi Vextor! I'd like to discuss how you can help digitize my business."
  );
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-7 right-7 z-[9999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-xl px-4 py-3 flex items-center gap-3 max-w-[220px]"
          >
            <div className="flex flex-col">
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--cyan)", fontFamily: "Sora, sans-serif" }}
              >
                Chat with us now
              </span>
              <span className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Talk to a Solution Architect
              </span>
            </div>
            <button
              onClick={() => setTooltip(false)}
              style={{ color: "var(--text-muted)" }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse rings */}
      <div className="relative">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "rgba(37,211,102,0.3)",
            animation: "pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
          }}
        />
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={26} fill="#fff" color="#fff" />
        </a>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
