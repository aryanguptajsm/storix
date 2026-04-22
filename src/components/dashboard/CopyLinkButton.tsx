"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Copy, Check, Link as LinkIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function CopyLinkButton({ username }: { username: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/store/${username}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Store link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button 
        variant="secondary" 
        className={`relative group h-12 px-6 rounded-2xl transition-all duration-500 overflow-hidden border border-white/[0.05] ${
          copied 
            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" 
            : "bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white"
        }`}
        onClick={handleCopy}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              className="flex items-center gap-2"
            >
              <Check size={16} strokeWidth={3} />
              <span className="text-[11px] font-black uppercase tracking-widest">Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                 <LinkIcon size={16} className="group-hover:rotate-12 transition-transform" />
                 <div className="absolute -top-1 -right-1">
                    <Sparkles size={8} className="text-primary animate-pulse" />
                 </div>
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">Global Link</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Glow */}
        {copied && (
          <div className="absolute inset-0 bg-emerald-500/5 blur-xl animate-pulse" />
        )}
      </Button>
    </motion.div>
  );
}
