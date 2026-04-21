"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Martijn Dekker",
    role: "CEO",
    initials: "MD",
    src: "/team/martijn-dekker.jpg",
    objectPosition: "",
    bio: `Martijn Dekker is a senior energy executive with over 30 years of experience leading the design, development, and delivery of large-scale capital projects across upstream, midstream, and downstream energy.
At Aprium, Martijn serves as CEO, responsible for corporate strategy and for leading all project development, engineering, and operations. He ensures the company delivers industrial grade, behind the meter utility systems with the speed, reliability, and execution standards expected by institutional investors
Martijn spent 25 years at Shell, progressing from project manager to senior executive roles with full life cycle responsibility for major energy assets. He led large offshore developments in the Gulf of Mexico, including multi billion dollar projects from feasibility through execution, and later oversaw Shell's global technology portfolio, advancing new technologies and building emerging business lines. In his most recent role, he served as Vice President Strategy & Portfolio for Shell's global Projects and Technology organization, shaping strategy and capital allocation for Shell's multi-billion-dollar annual capital projects program and technology budget.
Across these roles, Martijn managed the capital programs and led large, cross-functional teams through development, EPC execution, and operational handover, with a consistent focus on capital discipline, technical rigor, and delivery certainty.
Martijn is Co-founder and Managing Partner of Aurivos, where he led the acquisition and turnaround of undervalued Permian Basin assets, building an upstream platform with significant growth potential. He also co-founded ZeroSix, a digital platform that helps project developers create high-integrity, verifiable carbon credits in the voluntary carbon market, and serves as a non-executive director of Nasdaq-listed Verde Clean Fuels (VGAS).
Martijn holds an MS in Chemical Engineering from Eindhoven University of Technology and an MS in Business Management from the University of Aberdeen.`,
  },
  {
    name: "Drew Lichter",
    role: "President",
    initials: "DL",
    src: "/team/drew-lichter.jpg",
    objectPosition: "top",
    bio: `Drew is an energy and commodities executive with over 25 years of experience across trading, corporate finance, and commercial leadership. At Aprium, Drew serves as President, responsible for corporate strategy, business development, capital formation, and supply chain. In this role, he leads sales, partnerships, corporate development, financial analysis, commercial structuring, and investor relations.
Drew began his career as an options trader and member of the Chicago Board of Trade. He later served as Desk Head for West Power and Commodity Options at RBC Capital Markets, where he led trading, analytics, and risk management for U.S. power and emissions markets.
Prior to RBC he co-founded and served as EVP of Trading and Risk Management at Northwind Resources, a physical and financial natural gas trading and supply company. Under his leadership, Northwind grew into a top ten trader by volume on the CME and Intercontinental Exchange and a leading commercial and industrial supplier in Midcontinent gas markets, culminating in a successful exit.
He also held roles at AK Steel, where he was responsible for corporate development, commodities risk management, and oversight of subsidiaries and joint ventures, and at Mobius Risk Group, where as VP of Corporate Strategy and Development he advised energy and commodities companies on commercial and risk management strategy while helping build and scale new business lines.
Drew has structured and negotiated long-term offtake agreements, arranged and executed debt and equity financings, and led M&A transactions from sourcing through integration. His experience spans commodities risk management, energy asset optimization, and large-scale capital deployment across both entrepreneurial ventures and large institutional platforms.
He has served as a Board Member and Advisor to privately held companies from start up to scale across mining, trading, clean energy, and electrical steel processing.
Drew holds a BA in Economics from DePauw University.`,
  },
  {
    name: "Michael Neese",
    role: "CTO",
    initials: "MN",
    src: "/team/michael-neese.jpg",
    objectPosition: "50% 20%",
    scale: "170",
    bio: "Michael Neese has more than 30 years of industry expertise across multiple disciplines including water and wastewater treatment, groundwater remediation, aquifer storage and recovery, hazardous waste disposal, power generation and distribution, environmental engineering, and large utilities. Mr. Neese earned a BS in Agricultural Engineering from Texas Tech University.",
  },
  {
    name: "Ondrej Sestak",
    role: "CDO",
    initials: "OS",
    src: "/team/ondrej-sestak.jpg",
    objectPosition: "",
    bio: "Ondrej brings 15 years of technical and commercial experience across energy infrastructure, private equity, and project development to Aprium's platform. Trained as a reservoir and energy engineer at Stanford and UT Austin, he has structured and evaluated complex energy projects across operator, engineering, and investor roles spanning multiple geographies and asset classes. He also serves on the board of a publicly traded data center development company, giving him direct insight into the capital formation and operational requirements that drive successful large-scale digital infrastructure.",
  },
  {
    name: "Eddy van der Paardt",
    role: "Advisor, Strategy and Capital",
    initials: "EP",
    src: "/team/eddy-van-der-paardt.jpg",
    objectPosition: "top",
    bio: "Eddy is an Impact Investor with a mission to empower extraordinary entrepreneurs and businesses to aspire for greatness and improve the world. His investment focus is on early stage investments in disruptive Ag-tech and Clean-tech companies. Eddy offers a unique perspective based on 25 years of experience in founding, building and investing in growth ventures. He co-founded Virtu Capital, an impact investment firm. He previously served as Chief Investment Officer and Head of Strategy for a Family Office. Eddy holds an MBA from Stanford's Graduate School of Business.",
  },
  {
    name: "Rob Condon",
    role: "Accounting & Administration",
    initials: "RC",
    src: "/team/rob-condon.jpg",
    objectPosition: "",
    bio: "Rob Condon has over 30 years of public accounting experience, beginning his career as Senior Manager of Ernst & Young's Houston Entrepreneurial Services group. Rob has deep expertise in managing robust CFO/Controller, FP&A, Fund Administration and back-office functions. Rob earned his BBA in Accounting from University of Houston, and is licensed as a CPA in the state of Texas and is a Certified M&A Advisor.",
  },
  {
    name: "Kevin Paley",
    role: "Advisor, Markets and Commercial",
    initials: "KP",
    src: "/team/kevin-paley.jpg",
    objectPosition: "center 15%",
    bio: `Kevin Paley is a senior energy markets executive with more than 35 years of experience optimizing, trading, and managing risk across power, natural gas, environmental, and broader commodity markets. He currently serves as an adviser and principal investor in businesses across the trading, risk management, and commodities sectors.
Mr. Paley brings deep expertise in power markets, risk management, dispatch economics, structured transactions, and commercial strategy that is directly relevant to behind-the-meter generation and large-scale power solutions for data centers. Over the course of his career, he has consistently built and scaled businesses at the intersection of physical infrastructure, market optionality, and disciplined risk-taking.
From 2008 to 2017, Mr. Paley was a Managing Director and Global Head of Commodities Trading at Royal Bank of Canada, where he founded and expanded the bank’s energy trading and environmental businesses and ultimately oversaw the broader commodities platform. During his tenure, he expanded market presence across multiple ISOs, built an industry-leading environmental desk, restructured and grew the metals business, and significantly enhanced risk reporting and controls.
Earlier in his career, Mr. Paley headed power, environmental, and cross-commodity trading at Lehman Brothers, where he built a high-performing multi-location team. Before that, he served as Senior Vice President and General Manager of Power Trading and Marketing at Cinergy Corp., now Duke Energy, where he helped build the trading and risk platform, transformed the organization’s risk culture, and materially increased profitability. He also served as Vice President of bandwidth markets at Cable & Wireless and head of natural gas trading at Williams Energy.
Mr. Paley earned a B.A. in Economics from Vanderbilt University
`,
  },
];

function BioModal({
  member,
  onClose,
}: {
  member: (typeof teamMembers)[number];
  onClose: () => void;
}) {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const animClass = closing ? "opacity-0 scale-95" : "opacity-100 scale-100";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 sm:items-center ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative flex w-full max-h-[90vh] flex-col rounded-t-xl rounded-b-none bg-white shadow-2xl transition-all duration-200 ease-out sm:mx-4 sm:max-w-lg sm:max-h-[85vh] sm:rounded-xl ${animClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (photo, name, title) — stays visible while bio scrolls */}
        <div className="relative border-b border-gray-200 px-8 pb-4 pt-8">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Photo */}
          <div className="mb-4 flex justify-center">
            {member.src ? (
              <div className="h-24 w-24 overflow-hidden rounded-lg border-2 border-aprium-purple">
                <Image
                  src={member.src}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                  style={{
                    ...(member.objectPosition ? { objectPosition: member.objectPosition } : {}),
                    ...(member.scale
                      ? {
                          transform: `scale(${Number(member.scale) / 100})`,
                          transformOrigin: member.objectPosition || "center",
                        }
                      : {}),
                  }}
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-aprium-purple bg-aprium-purple/5">
                <span className="text-2xl font-bold text-aprium-purple">{member.initials}</span>
              </div>
            )}
          </div>

          {/* Name and title */}
          <h3 className="text-center text-lg font-bold text-aprium-purple">{member.name}</h3>
          <p className="text-center text-sm text-aprium-orange">{member.role}</p>
        </div>

        {/* Scrollable bio region */}
        <div className="bio-scroll min-h-0 flex-1 overflow-y-auto px-8 pb-8 pt-4">
          {member.bio ? (
            member.bio
              .split("\n")
              .filter((p) => p.trim())
              .map((paragraph, i) => (
                <p key={i} className="mb-4 text-sm leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))
          ) : (
            <p className="text-center text-sm italic text-gray-400">Bio coming soon.</p>
          )}
        </div>

        {/* Bottom fade gradient — anchored to the card, over the scroll region */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 rounded-b-xl bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
}

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[number] | null>(null);

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
    <section className="px-6 py-10 lg:px-10 lg:py-16" style={{ backgroundColor: "rgba(247, 247, 247, 0.75)" }}>
      <div className="mx-auto max-w-7xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">
            Who We Are
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
        </div>

        {/* Team grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <div
              key={member.name}
              className="fade-in-item translate-y-6 opacity-0 transition-all duration-500 ease-out"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                onClick={() => setSelectedMember(member)}
                className="w-full text-left"
              >
                <div className="group rounded-lg bg-white p-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  {member.src ? (
                    <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-lg border-2 border-aprium-purple">
                      <Image
                        src={member.src}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                        style={{
                          ...(member.objectPosition ? { objectPosition: member.objectPosition } : {}),
                          ...(member.scale
                            ? {
                                transform: `scale(${Number(member.scale) / 100})`,
                                transformOrigin: member.objectPosition || "center",
                              }
                            : {}),
                        }}
                      />
                    </div>
                  ) : (
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
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bio modal */}
      {selectedMember && (
        <BioModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </section>
  );
}
