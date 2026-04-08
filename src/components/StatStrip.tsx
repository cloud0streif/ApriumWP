"use client";

import { useEffect, useRef } from "react";

const stats = [
  {
    stat: "18–36 Mo",
    label: "Speed to Power",
    descriptor: "vs. 4–15 years for traditional grid-tied builds",
  },
  {
    stat: "Tier IV",
    label: "Grid-Independent Reliability",
    descriptor: "Best-in-class uptime with zero grid exposure",
  },
  {
    stat: "$10B+",
    label: "Execution Track Record",
    descriptor: "Across energy, water, and gas infrastructure",
  },
  {
    stat: "100–600 MW",
    label: "BTM Build Scale",
    descriptor: "Fully behind-the-meter, no grid dependency",
  },
];

export default function StatStrip() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = section.querySelectorAll(".fade-in-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative"
      style={{ backgroundColor: "#1A0A2E", minHeight: "220px", paddingTop: "64px", paddingBottom: "80px" }}
    >
      {/* Top and bottom orange rules */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-aprium-orange" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-aprium-orange" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10" ref={sectionRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, i) => (
            <div
              key={item.label}
              className={`fade-in-item translate-y-4 opacity-0 transition-all duration-500 ease-out ${
                i < stats.length - 1
                  ? "lg:border-r lg:border-white/15"
                  : ""
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="group relative px-6 py-6 text-center lg:py-0">
                {/* Stat number */}
                <p
                  className="text-5xl font-bold text-aprium-orange transition-all duration-250"
                  style={{ textShadow: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow =
                      "0 0 20px rgba(247,148,29,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = "none";
                  }}
                >
                  {item.stat}
                </p>

                {/* Label */}
                <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-white">
                  {item.label}
                </p>

                {/* Descriptor — absolutely positioned, no layout shift */}
                <p
                  className="pointer-events-none absolute left-0 right-0 text-center text-sm font-normal text-white/70 opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100"
                  style={{ bottom: "-28px" }}
                >
                  {item.descriptor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
