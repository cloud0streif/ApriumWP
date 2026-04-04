"use client";

import { useEffect, useRef } from "react";

const whyItems = [
  {
    bold: "Electricity delivered in 18–36 months",
    rest: "vs. 48–180",
  },
  {
    bold: "Tier IV reliability",
    rest: "independent of grid constraints",
  },
  {
    bold: "Reduces exposure to grid congestion and instability",
    rest: "as load growth strains intermittent heavy ISOs",
  },
  {
    bold: "Cost competitive",
    rest: "versus fully loaded firmed grid pricing",
  },
  {
    bold: "Mitigation of price risk",
    rest: "— BTM pricing is all-in and known; grid pricing is uncertain given load step changes",
  },
  {
    bold: "Scales without re-entering interconnection queues",
    rest: "",
  },
  {
    bold: "No impact on community electricity pricing,",
    rest: "with potential to lower electric bills if backup generation is interconnected as peaking units in the future",
  },
];

const howItems = [
  {
    bold: "Interconnect queues eliminated",
    rest: "and permitting processes streamlined",
  },
  {
    bold: "Fully redundant design,",
    rest: "with multiple trains",
  },
  {
    bold: "Repeatable Process:",
    rest: "300 MW frame blocks, 20 MW modular recip blocks",
  },
  {
    bold: "Redundant fuel supply,",
    rest: "including onsite for Tier 4",
  },
  {
    bold: "Water expertise",
    rest: "allows builds in water-constrained locations",
  },
  {
    bold: "Avoids interconnect, capacity, and transmission costs;",
    rest: "EPC pricing is fully loaded",
  },
  {
    bold: "Efficient utilization of backup generation,",
    rest: "with interconnection as peakers as regulations allow",
  },
  {
    bold: "We own and operate assets,",
    rest: "aligning risk and incentives with customers",
  },
];

function CheckItem({ bold, rest }: { bold: string; rest: string }) {
  return (
    <div className="flex gap-3 rounded-md px-3 py-3 transition-colors hover:bg-aprium-orange/5" style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}>
      {/* Orange checkmark */}
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-aprium-orange"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-sm leading-relaxed text-aprium-black">
        <span className="font-bold">{bold}</span>
        {rest && ` ${rest}`}
      </p>
    </div>
  );
}

export default function BTMSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("btm-col-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cols = section.querySelectorAll(".btm-col");
    cols.forEach((col) => observer.observe(col));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-btm" className="px-6 py-10 lg:px-10 lg:py-16" style={{ backgroundColor: "rgba(247, 247, 247, 0.75)" }}>
      <div className="mx-auto max-w-7xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            Behind the Meter Power
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>

        {/* Two columns */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Why column */}
          <div className="btm-col translate-x-[-40px] opacity-0 transition-all duration-700 ease-out">
            <div className="mb-6 rounded-lg bg-gradient-to-r from-[#2a3a8f] to-aprium-purple px-5 py-3">
              <h3 className="text-lg font-bold text-white">Why</h3>
            </div>
            <div className="space-y-1">
              {whyItems.map((item) => (
                <CheckItem key={item.bold} bold={item.bold} rest={item.rest} />
              ))}
            </div>
          </div>

          {/* How column */}
          <div className="btm-col translate-x-[40px] opacity-0 transition-all duration-700 ease-out">
            <div className="mb-6 rounded-lg bg-gradient-to-r from-[#2a3a8f] to-aprium-purple px-5 py-3">
              <h3 className="text-lg font-bold text-white">How</h3>
            </div>
            <div className="space-y-1">
              {howItems.map((item) => (
                <CheckItem key={item.bold} bold={item.bold} rest={item.rest} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
