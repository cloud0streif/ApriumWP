"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const photoStrip = [
  { src: "/photos/power-plant.jpg", alt: "Power Plant" },
  { src: "/photos/offshore-rig.jpg", alt: "Offshore Rig" },
  { src: "/photos/turbine.jpg", alt: "Turbine" },
  { src: "/photos/water-processing.jpg", alt: "Water Processing" },
];

const capabilities = [
  {
    title: "Project Development",
    description: "Experience delivering $500M+ complex infrastructure projects.",
  },
  {
    title: "Critical Equipment Access",
    description: "Secured OEM relationships for constrained turbines, generators, transformers, and switchgear.",
  },
  {
    title: "Engineering & EPC Support",
    description: "Access to critical engineering and EPC capacity for rapid deployment.",
  },
  {
    title: "Technical Expertise",
    description: "Deep knowledge in power, water, and gas systems integration.",
  },
  {
    title: "Regulatory & Permitting",
    description: "Established permitting contacts across key markets.",
  },
  {
    title: "Gas Supply & PPA Execution",
    description: "Gas supply and PPA structuring, pricing, and execution.",
  },
  {
    title: "Project Finance",
    description: "Capital structure expertise for large-scale builds.",
  },
  {
    title: "Data Center Knowledge",
    description: "Networking, broadband, and data center infrastructure experience.",
  },
  {
    title: "Scalable Controls",
    description: "Financial, regulatory, and operational controls for public and highly regulated customers.",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      { threshold: 0.1 }
    );

    const items = section.querySelectorAll(".fade-in-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 lg:py-16" style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            Capabilities
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>
      </div>

      {/* Photo strip banner — full bleed */}
      <div className="mb-6 py-6" style={{ backgroundColor: "#1A0A2E" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {photoStrip.map((photo, i) => (
              <div
                key={photo.alt}
                className={`relative h-36 overflow-hidden rounded-lg border-2 border-aprium-orange/60 lg:h-44 ${
                  i === 1 || i === 3 ? "hidden lg:block" : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Mobile: click-to-expand accordion (matches BTM style) */}
        <div className="flex flex-col gap-3 py-6 sm:hidden">
          {capabilities.map((cap, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={cap.title}
                className="fade-in-item translate-y-4 opacity-0 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="rounded-xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
                    borderRadius: "12px",
                    boxShadow: isOpen
                      ? "0 6px 32px rgba(61, 17, 82, 0.12)"
                      : "0 4px 24px rgba(61, 17, 82, 0.08)",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-all duration-200 ${
                      isOpen
                        ? "border-l-4 border-l-aprium-orange"
                        : "border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="shrink-0 text-3xl font-bold leading-none text-aprium-orange/20">
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-bold text-aprium-purple">
                        {cap.title}
                      </h3>
                    </div>
                    <span
                      className="shrink-0 text-xl leading-none text-aprium-orange"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transition: "max-height 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="px-6 pb-6 pt-1">
                      <p className="text-sm leading-relaxed text-gray-600">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop/tablet: hover-to-reveal card grid */}
        <div className="hidden gap-6 py-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => {
            const cardZ = 50 - i;

            return (
              <div
                key={cap.title}
                className="fade-in-item relative translate-y-6 opacity-0 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${i * 60}ms`, zIndex: cardZ }}
              >
                {/* Fixed-height grid slot */}
                <div
                  className="group relative"
                  style={{ height: "120px", overflow: "visible" }}
                >
                  {/* Card — absolutely positioned, expands downward on hover */}
                  <div
                    className="absolute left-0 right-0 top-0 rounded-lg border border-gray-200 bg-white transition-all duration-250 ease-out group-hover:scale-[1.04]"
                    style={{
                      minHeight: "120px",
                      boxShadow: "0 2px 12px rgba(61, 17, 82, 0.08)",
                      transition: "transform 250ms ease, box-shadow 250ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(61,17,82,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(61, 17, 82, 0.08)";
                    }}
                  >
                    {/* Orange top accent */}
                    <div className="absolute left-0 right-0 top-0 h-1 rounded-t-lg bg-aprium-orange" />
                    <div className="relative flex min-h-[120px] w-full items-center p-8">
                      {/* Ghost number */}
                      <span className="absolute left-4 select-none text-8xl font-bold leading-none text-aprium-orange/10 transition-all duration-300 group-hover:text-aprium-orange/30">
                        {i + 1}
                      </span>
                      {/* Text content */}
                      <div className="relative ml-20">
                        <h3 className="text-xl font-bold text-gray-900">
                          {cap.title}
                        </h3>
                      </div>
                    </div>

                    {/* Descriptor — expands on hover */}
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-200 ease-out group-hover:max-h-[200px] group-hover:opacity-100">
                      <div className="px-8 pb-6">
                        <p className="text-sm leading-relaxed text-gray-500">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
