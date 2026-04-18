"use client";

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  /** Additional CSS classes for the card container */
  className?: string;
  /** Background color for the spotlight effect (should include alpha for transparency) */
  spotlightColor?: string;
}

/**
 * SpotlightCard - A premium interactive card component with a mouse-following light effect.
 * 
 * Features:
 * - Dynamic radial gradient spotlight following cursor
 * - Noise texture overlay for high-fidelity aesthetics
 * - Hover & Focus state transitions
 * - Optimized with useCallback and relative positioning
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  // Default to Storix Primary Emerald with low opacity
  spotlightColor = 'rgba(16, 185, 129, 0.2)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  }, []);

  const handleMouseEnter = () => setOpacity(0.6);
  const handleMouseLeave = () => setOpacity(0);
  const handleFocus = () => setOpacity(0.6);
  const handleBlur = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "relative rounded-2xl border border-white/5 bg-[#0A0A0E] overflow-hidden p-8 group transition-colors duration-300 hover:border-white/10 outline-none",
        className
      )}
    >
      {/* Noise Texture Overlay for Storix Aesthetic */}
      <div 
        className="absolute inset-0 noise-subtle opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-500" 
        aria-hidden="true"
      />
      
      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`
        }}
        aria-hidden="true"
      />
      
      {/* Content wrapper to ensure it stays above the spotlight */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;

