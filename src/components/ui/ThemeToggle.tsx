"use client";

import React from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { appMode, toggleAppMode } = useTheme();

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => toggleAppMode(e)}
      className="relative flex items-center justify-between w-full px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all group overflow-hidden border border-white/[0.03] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] active:border-primary/40 cursor-pointer"
      aria-label="Toggle App Theme"
    >
      {/* Background Glow Layer */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${
        appMode === "light" ? "bg-warning" : "bg-primary"
      }`} />
      
      {/* Animated Scan Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="relative w-6 h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {appMode === "light" ? (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-warning filter drop-shadow-[0_0_8px_rgba(253,203,110,0.4)]"
              >
                <Sun size={20} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: -90, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-primary-light filter drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              >
                <Moon size={20} strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-white/40 group-hover:text-white transition-colors">
          {appMode === "light" ? "Solar" : "Lunar"}
        </span>
      </div>

      <div className="relative z-10 p-1.5 rounded-lg bg-black/40 border border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
        <Sparkles size={12} className={appMode === "light" ? "text-warning" : "text-primary"} />
      </div>
    </motion.button>
  );
}
