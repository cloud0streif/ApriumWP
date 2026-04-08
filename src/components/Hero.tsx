"use client";

import { useState } from "react";
import Image from "next/image";
import TickerStrip from "./TickerStrip";
import ContactModal from "./ContactModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
      {/* Left side — text content */}
      <div className="flex flex-1 flex-col justify-center px-6 py-8 lg:w-[55%] lg:px-16 lg:py-12" style={{ backgroundColor: "rgba(255, 255, 255, 0.82)" }}>
        <div className="mx-auto w-full max-w-2xl">
          {/* Primary headline */}
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-aprium-purple lg:text-5xl">
            Speed to Power.
            <br />
            Certainty in Delivery.
          </h1>

          {/* Single bold supporting line */}
          <p className="mt-6 text-lg text-gray-600 lg:text-xl">
            Behind-the-meter power and water solutions for data centers and industrial users.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-aprium-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              Start a Conversation
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
