"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { appMode, toggleAppMode } = useTheme();

  return (
    <button
      onClick={toggleAppMode}
      className="relative flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-500 group overflow-hidden border border-transparent hover:border-primary/20 hover:bg-primary/5 cursor-pointer"
      aria-label="Toggle App Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun 
          className={`absolute w-5 h-5 text-warning transition-all duration-500 transform ${
            appMode === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
          }`} 
        />
        <Moon 
          className={`absolute w-5 h-5 text-primary-light transition-all duration-500 transform ${
            appMode === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
          }`} 
        />
      </div>
      <span className="text-muted group-hover:text-foreground transition-colors">
        {appMode === "light" ? "Solar Mode" : "Lunar Mode"}
      </span>
      
      {/* Animated background glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
        appMode === "light" ? "bg-warning" : "bg-primary"
      }`} />
    </button>
  );
}
