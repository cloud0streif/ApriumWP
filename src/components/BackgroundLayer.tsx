"use client";

import { useEffect, useRef } from "react";

export default function BackgroundLayer() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Disable parallax on mobile
    if (window.innerWidth < 768) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        // Shift from -15% to +15% of viewport height based on scroll progress
        const offset = (progress - 0.5) * window.innerHeight * 0.3;
        bg.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      className="pointer-events-none fixed z-0 opacity-15"
      style={{
        top: "-15vh",
        left: 0,
        width: "100vw",
        height: "130vh",
        backgroundImage: "url('/images/Aprium_Background_Styling.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        willChange: "transform",
      }}
    />
  );
}
