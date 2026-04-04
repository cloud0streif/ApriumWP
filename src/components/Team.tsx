"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const teamMembers = [
  { name: "Martijn Dekker", role: "CEO", initials: "MD", src: "/team/martijn-dekker.jpg", objectPosition: "" },
  { name: "Michael Neese", role: "CTO", initials: "MN", src: "/team/michael-neese.jpg", objectPosition: "50% 20%", scale: "170" },
  { name: "Drew Lichter", role: "President", initials: "DL", src: "/team/drew-lichter.jpg", objectPosition: "top" },
  { name: "Ondrej Sestak", role: "CDO", initials: "OS", src: "/team/ondrej-sestak.jpg", objectPosition: "" },
  {
    name: "Eddy van der Paardt",
    role: "Advisor, Strategy and Capital",
    initials: "EP",
    src: "/team/eddy-van-der-paardt.jpg",
    objectPosition: "top",
  },
  {
    name: "Rob Condon",
    role: "Accounting and Administration",
    initials: "RC",
    src: "/team/rob-condon.png",
    objectPosition: "",
  },
  {
    name: "Kevin Paley",
    role: "Advisor, Markets and Commercial",
    initials: "KP",
    src: "/team/kevin-paley.jpg",
    objectPosition: "center 15%",
  },
  {
    name: "Werner, Ayers, McDonald",
    role: "Legal",
    initials: "WA",
    src: "/team/wam-logo.png",
    objectPosition: "",
    isLogo: true,
  },
];

export default function Team() {
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
    <section id="our-team" className="px-6 py-10 lg:px-10 lg:py-16" style={{ backgroundColor: "rgba(247, 247, 247, 0.75)" }}>
      <div className="mx-auto max-w-7xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            Who We Are
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>

        {/* Intro blurb */}
        <p className="mx-auto mb-12 max-w-3xl text-center text-sm leading-relaxed text-gray-600 md:text-base">
          We have led $10B+ of power, water, and gas infrastructure development.
          We have traded and marketed physical and financial power at scale across
          the USA, as well as key feedstocks and environmental attributes. We have
          led divisions at global companies and have a track record of successful
          execution as entrepreneurs.
        </p>

        {/* Team grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="fade-in-item translate-y-6 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="group rounded-lg bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                {member.src ? (
                  <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-lg border-2 border-aprium-purple">
                    <Image
                      src={member.src}
                      alt={member.name}
                      width={112}
                      height={112}
                      className={`h-full w-full ${member.isLogo ? "object-contain p-3" : "object-cover"}`}
                      style={{
                        ...(member.objectPosition ? { objectPosition: member.objectPosition } : {}),
                        ...(member.scale ? {
                          transform: `scale(${Number(member.scale) / 100})`,
                          transformOrigin: member.objectPosition || "center",
                        } : {}),
                      }}
                    />
                  </div>
                ) : (
                  /* Initials fallback for members without photos */
                  <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-lg border-2 border-aprium-purple bg-aprium-purple/5">
                    <span className="text-2xl font-bold text-aprium-purple">
                      {member.initials}
                    </span>
                  </div>
                )}
                <h3 className="text-sm font-bold text-aprium-purple">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-aprium-orange">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
