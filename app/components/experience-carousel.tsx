"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Experience = {
  org: string;
  icon: string;
  role: string;
  dates: string;
  description: string;
};

const experience: Experience[] = [
  {
    org: "Chewy",
    icon: "/experience/chewy-icon.png",
    role: "Software Engineer I",
    dates: "June 2026 - Present",
    description: "Pharmacy Business Expansion",
  },
  {
    org: "Fenway Community Center",
    icon: "/experience/fcc.png",
    role: "Software Engineer",
    dates: "Jan - April 2026",
    description: ""
  },
  {
    org: "Chewy",
    icon: "/experience/chewy-icon.png",
    role: "Software Engineer Co-op",
    dates: "June - December 2025",
    description: "Fulfillment Execution Applications",
  },
  {
    org: "FirstGlance, Inc.",
    icon: "/experience/firstglance-icon.png",
    role: "Software Engineer Co-op",
    dates: "Sep - Dec 2024",
    description: "Product, Platform, and Search",
  },
  {
    org: "Northeastern University",
    icon: "/experience/northeastern-icon.png",
    role: "Undergraduate Teaching Assistant",
    dates: "Sep - Dec 2024",
    description: "",
  },
  {
    org: "Generate Product Development",
    icon: "/experience/generate-icon.png",
    role: "Software Technical Lead",
    dates: "Jan - Apr 2025",
    description: "",
  },
  {
    org: "Code4Community",
    icon: "/experience/c4c-icon.png",
    role: "Software Developer",
    dates: "May 2025 - Apr 2026",
    description: "Free software development for Greater Boston non-profits.",
  },
];

const PAGE_SIZE = 4;
const TRANSITION_MS = 500;

function chunk<T>(arr: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages;
}

const pages = chunk(experience, PAGE_SIZE);

const SWIPE_THRESHOLD = 50;

export default function ExperienceCarousel() {
  const [page, setPage] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(pages.length - 1, p + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (deltaX > SWIPE_THRESHOLD) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD) goNext();
  };

  return (
    <div className="w-full sm:px-10">
      <div
        className="w-full max-w-md overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          WebkitMaskImage: "linear-gradient(to right, black calc(100% - 24px), transparent)",
          maskImage: "linear-gradient(to right, black calc(100% - 24px), transparent)",
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${page * 100}%)`,
            transition: `transform ${TRANSITION_MS}ms ease-in-out`,
          }}
        >
          {pages.map((items, pi) => (
            <div key={pi} className="flex w-full shrink-0 flex-col divide-y divide-white/5">
              {items.map((item) => (
                <div key={`${item.org}-${item.role}`} className="flex flex-col gap-1 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.icon}
                      alt={item.org}
                      width={32}
                      height={32}
                      className="shrink-0 rounded-md object-contain"
                    />
                    <div className="flex min-w-0 flex-col">
                      <p className="truncate text-base font-medium">{item.role}</p>
                      <p className="truncate text-sm text-zinc-500">
                        {item.org} · {item.dates}
                      </p>
                    </div>
                  </div>
                  <p className="truncate pl-11 text-sm text-zinc-400">{item.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="mt-3 hidden w-full max-w-md justify-end gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous page"
            onClick={goPrev}
            disabled={page === 0}
            className="hover:border-accent hover:text-accent flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={goNext}
            disabled={page === pages.length - 1}
            className="hover:border-accent hover:text-accent flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-500 transition-colors disabled:pointer-events-none disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
