"use client";

import { useEffect, useRef, useState } from "react";

const blocks = [
  {
    headline: "Power in 18–36 Months",
    subheadline: "Not the 4–10 years of traditional grid-tied builds",
    details: [
      "Interconnection queues eliminated entirely",
      "Permitting processes streamlined through established regulatory relationships",
    ],
  },
  {
    headline: "Up to Tier IV Reliability, Grid-Independent",
    subheadline: "Best-in-class uptime with zero exposure to grid instability",
    details: [
      "Fully redundant design with multiple independent generation trains",
      "Redundant fuel supply including onsite storage for up to Tier IV continuity",
    ],
  },
  {
    headline: "Insulated From Grid Congestion",
    subheadline: "As load growth strains ISO infrastructure, BTM customers are unaffected",
    details: [
      "No dependence on transmission capacity or grid dispatch priority",
      "Protected from the cascading instability of intermittent-heavy grid operators",
    ],
  },
  {
    headline: "Cost Competitive With the Grid",
    subheadline: "Fully loaded BTM pricing matches or beats firmed grid alternatives",
    details: [
      "Eliminates interconnect, capacity, and transmission cost layers",
      "EPC pricing is all-in — no hidden escalators or ancillary charges",
    ],
  },
  {
    headline: "Price Certainty",
    subheadline: "Fixed, known pricing in a market defined by uncertainty",
    details: [
      "BTM contracts are all-in and fixed with gas adder — grid pricing shifts unpredictably with load step changes",
      "Aprium owns and operates assets, directly aligning our incentives with customer outcomes",
    ],
  },
  {
    headline: "Scales On Your Timeline",
    subheadline: "No re-entering interconnection queues as your load grows",
    details: [
      "Repeatable modular process: 300 MW frame blocks and 20 MW reciprocating engine blocks",
      "Water infrastructure expertise enables development in constrained locations",
    ],
  },
  {
    headline: "Zero Community Rate Impact",
    subheadline: "No ratepayer burden — with the potential to actively lower local bills",
    details: [
      "BTM generation has no effect on community electricity pricing",
      "Backup capacity can be interconnected as peaking units as regulations allow, benefiting the broader grid",
    ],
  },
];

export default function BTMSection() {
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
      { threshold: 0.08 }
    );

    const items = section.querySelectorAll(".fade-in-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-4xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            Behind the Meter Power
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>

        {/* Card stack with subtle gradient overlay */}
        <div
          className="flex flex-col gap-3 rounded-2xl p-3 lg:p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(61,17,82,0.03) 0%, rgba(247,148,29,0.03) 100%)",
          }}
        >
          {blocks.map((block, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={block.headline}
                className="fade-in-item translate-y-4 opacity-0 transition-all duration-500 ease-out"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="rounded-xl transition-all duration-200 ease-out"
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
                    className={`group flex w-full items-start justify-between gap-4 rounded-xl px-6 py-5 text-left transition-all duration-200 ${
                      isOpen
                        ? "border-l-4 border-l-aprium-orange"
                        : "border-l-4 border-l-transparent hover:border-l-aprium-orange"
                    }`}
                  >
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold text-aprium-purple">
                        {block.headline}
                      </h3>
                      <p className="mt-1 text-base font-normal text-gray-500">
                        {block.subheadline}
                      </p>
                    </div>

                    {/* +/× toggle */}
                    <span
                      className="mt-1 shrink-0 text-2xl leading-none text-aprium-orange"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Expandable details — slide + fade, all on one element */}
                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                      transition: "max-height 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="px-6 pb-6 pt-2">
                      {block.details.map((detail) => (
                        <p
                          key={detail}
                          className="flex items-start gap-2 py-1 pl-4 text-sm leading-relaxed text-gray-600"
                        >
                          <span className="mt-0.5 shrink-0 text-aprium-orange">
                            &rsaquo;
                          </span>
                          {detail}
                        </p>
                      ))}
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
