"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "reveal" | "reveal-left" | "reveal-scale";
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "reveal",
  delay = 0,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once]);

  return (
    <div
      ref={elementRef}
      className={`${animation} ${isVisible ? "active" : ""} ${className}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
