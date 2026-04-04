"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const items = [
  { title: "Speed to Electricity", descriptor: "Projects scale at your pace, not the grid\u2019s" },
  { title: "Tier IV+ Reliability", descriptor: "Best-in-class uptime without grid exposure" },
  { title: "100\u2013600 MW BTM Builds", descriptor: "Bridging gensets and GW-scale IPPs" },
  { title: "Fixed Long-Term Offtake", descriptor: "Competitive and certain pricing" },
  { title: "No Ratepayer Impact", descriptor: "Potential net benefit if dispatched as peakers" },
  { title: "Power & Water", descriptor: "BTM utilities for data centers and industrial users" },
];

function TickerItem({ item, className }: { item: typeof items[number]; className: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center justify-center px-4">
        <p className="pl-4 text-left text-base font-semibold italic leading-snug text-white lg:text-2xl lg:leading-snug">
          {item.title}
        </p>
        <div className="my-1.5 h-px w-12 bg-aprium-orange" />
        <p className="pr-4 text-right text-sm font-light italic leading-snug text-white/80 lg:text-xl lg:leading-snug">
          {item.descriptor}
        </p>
      </div>
    </div>
  );
}

export default function TickerStrip() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const advance = useCallback(() => {
    setActive((current) => {
      setPrev(current);
      return (current + 1) % items.length;
    });
    timeoutRef.current = setTimeout(() => setPrev(null), 400);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, 8000);
    return () => clearInterval(timer);
  }, [paused, advance]);

  return (
    <div
      className="w-full bg-aprium-purple/75 backdrop-blur-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[120px] overflow-hidden">
        {/* Text area — vertically centered in upper ~80% */}
        <div className="absolute inset-x-0 top-0 bottom-[30px] w-full">
          {/* Outgoing item */}
          {prev !== null && (
            <TickerItem
              key={`out-${prev}`}
              item={items[prev]}
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[400ms] ease-in-out"
            />
          )}
          {/* Active item */}
          <TickerItem
            key={`in-${active}`}
            item={items[active]}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-[400ms] ease-in-out ticker-fade-in"
          />
        </div>

        {/* Dot indicators — halfway between text and bottom of strip */}
        <div className="absolute bottom-[15px] left-0 right-0 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setPrev(active);
                setActive(i);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setPrev(null), 400);
              }}
              className={`h-1.5 w-1.5 rounded-full transition-colors sm:h-2 sm:w-2 ${
                i === active ? "bg-aprium-orange" : "bg-white/60"
              }`}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
