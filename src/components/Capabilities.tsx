"use client";

import { useEffect, useRef } from "react";
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
    description: "Regulatory expertise and established permitting contacts across key markets.",
  },
  {
    title: "Gas Supply & PPA Execution",
    description: "Gas supply and PPA structuring, pricing, and execution.",
  },
  {
    title: "Project Finance",
    description: "Project finance and capital structure expertise for large-scale builds.",
  },
  {
    title: "Data Center Knowledge",
    description: "Networking, broadband, and data center infrastructure experience.",
  },
  {
    title: "Scalable Controls",
    description: "Able to scale financial, regulatory, and operational controls to meet the needs of public and highly regulated customers.",
  },
];

export default function Capabilities() {
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
      { threshold: 0.1 }
    );

    const items = section.querySelectorAll(".fade-in-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="capabilities" className="px-6 py-10 lg:px-10 lg:py-16" style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
      <div className="mx-auto max-w-7xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            What It Takes to Develop BTM Utilities at Scale
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>

        {/* Photo strip banner */}
        <div className="mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-aprium-purple via-aprium-purple-mid to-aprium-orange/80 p-2">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {photoStrip.map((photo, i) => (
              <div
                key={photo.alt}
                className={`relative h-36 overflow-hidden rounded border-2 border-aprium-orange/60 lg:h-40 ${
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

        {/* Capability cards grid */}
        <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className="fade-in-item translate-y-6 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="group relative flex h-full min-h-[140px] overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:border-aprium-orange hover:shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}>
                {/* Orange top accent */}
                <div className="absolute left-0 right-0 top-0 h-1 rounded-t-lg bg-aprium-orange" />
                <div className="relative flex w-full items-center p-8">
                  {/* Ghost number */}
                  <span className="absolute left-4 select-none text-8xl font-bold leading-none text-aprium-orange/10 transition-all duration-300 group-hover:text-aprium-orange/30">
                    {i + 1}
                  </span>
                  {/* Text content */}
                  <div className="relative ml-20">
                    <h3 className="text-xl font-bold text-gray-900">
                      {cap.title}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-gray-500">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout bar */}
        <div className="mt-6 rounded-lg bg-aprium-purple px-8 py-10 text-center">
          <p className="mx-auto max-w-3xl text-base italic leading-relaxed text-white md:text-xl">
            &ldquo;Few firms have the depth to deliver true behind-the-meter
            utilities at scale. Aprium does — combining development, engineering,
            and commercial execution into a single platform.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
