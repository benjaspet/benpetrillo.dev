"use client";

import { useState } from "react";
import ExperienceCarousel from "./experience-carousel";
import Photography from "./photography";
import SidePanel from "./side-panel";

type HomeContentProps = {
  experienceCardWidth: number;
  sidebarWidth: number;
};

export default function HomeContent({ experienceCardWidth, sidebarWidth }: HomeContentProps) {
  const [showPhotography, setShowPhotography] = useState(false);

  if (showPhotography) {
    // sm:px-10 matches the inset the header and calendar use, so the gallery's
    // edges line up with the rest of the page rather than running wider.
    return (
      <div className="flex w-full flex-col gap-4 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium">Photography</p>
          <button
            type="button"
            onClick={() => setShowPhotography(false)}
            className="group hover:text-accent flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.07]"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-zinc-600 group-hover:text-accent"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>
        </div>

        <Photography />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
      <div className="w-full lg:shrink-0" style={{ maxWidth: experienceCardWidth }}>
        <ExperienceCarousel />
      </div>

      <div className="w-full lg:shrink-0" style={{ maxWidth: sidebarWidth }}>
        <SidePanel onOpenPhotography={() => setShowPhotography(true)} />
      </div>
    </div>
  );
}
