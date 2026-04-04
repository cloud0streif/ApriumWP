"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TickerStrip from "./TickerStrip";
import ContactModal from "./ContactModal";

const valueProps = [
  {
    icon: (
      <svg className="h-6 w-6 text-aprium-orange" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "Explosive Demand Growth",
    description:
      "AI, data centers, and industrial reshoring are driving record power and water requirements that can’t be met through traditional means.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-aprium-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "BTM Utilities Platform",
    description:
      "Aprium provides integrated power and water infrastructure directly to customers—bypassing grid and permitting barriers while ensuring Tier-IV reliability.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-aprium-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11l-3-3m0 0l-3 3m3-3v8M5.5 16A3.5 3.5 0 012 12.5 3.5 3.5 0 015.5 9c.418 0 .822.073 1.196.207A5.5 5.5 0 0112 4a5.5 5.5 0 015.304 4.207A3.5 3.5 0 0122 12.5 3.5 3.5 0 0118.5 16" />
      </svg>
    ),
    title: "Speed-to-Power Advantage",
    description:
      "18\u201336 months vs. 4\u201310 years for traditional grid-tied builds, unlocking billions of dollars in deferred demand.",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-aprium-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Execution at Scale",
    description:
      "$10 B+ track record across energy, water, and gas; secured OEM and EPC capacity; and end-to-end commercial expertise.",
  },
];

export default function Hero() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero-card-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = cards.querySelectorAll(".hero-card");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
      {/* Left side — text content */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:w-[55%] lg:px-16 lg:py-12" style={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}>
        <div className="mx-auto w-full max-w-2xl">
          {/* Pull quote */}
          <blockquote className="border-l-4 border-aprium-orange pl-5">
            <p className="text-base italic leading-relaxed text-aprium-purple-mid lg:text-lg">
              &ldquo;AI&rsquo;s natural limit is electricity, not chips. The US
              is currently expected to need another 92 gigawatts of power to
              support the AI Revolution.&rdquo;
            </p>
            <cite className="mt-2 block text-sm font-medium not-italic text-aprium-purple/70">
              &mdash; Eric Schmidt, former Google CEO, July 2025
            </cite>
          </blockquote>

          {/* Divider */}
          <hr className="my-8 border-gray-200" />

          {/* Primary headline */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-aprium-purple lg:text-5xl">
            Speed to Power.
            <br />
            Certainty in Delivery.
          </h1>
          <p className="mb-8 mt-2 text-lg font-normal text-gray-500">
            Meeting Unprecedented Demand With Speed, Resilience, and
            Profitability
          </p>

          {/* Value prop cards */}
          <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
            {valueProps.map((prop, i) => (
              <div
                key={prop.title}
                className="hero-card rounded-lg border-l-4 border-aprium-orange bg-gray-50 p-4 opacity-0 translate-y-4 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  {prop.icon}
                  <h3 className="text-sm font-bold text-aprium-black">
                    {prop.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-gray-600">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-aprium-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Learn More
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>

      {/* Right side — image panel */}
      <div className="relative h-64 overflow-hidden lg:h-auto lg:w-[45%]">
        <Image
          src="/photos/control-room.jpg"
          alt="Power plant control room"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-aprium-purple/40" />
        {/* Ticker strip overlay — 1/3 from top */}
        <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2">
          <TickerStrip />
        </div>
        {/* TODO: confirm final logo size with design */}
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/aprium_simple_logo.png"
            alt="Aprium Energy"
            width={280}
            height={280}
            className="w-[80px] md:w-[180px] lg:w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}
