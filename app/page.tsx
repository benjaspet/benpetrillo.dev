import Image from "next/image";
import GitHubCalendar from "./components/github-calendar";
import { CALENDAR_TOTAL_WIDTH, WRAPPER_PADDING } from "./components/calendar-constants";
import SocialLinks from "./components/social-links";
import HomeContent from "./components/home-content";

const EXPERIENCE_CARD_WIDTH = 464;
const ROW_GAP = 32;
// The calendar/header visibly end WRAPPER_PADDING short of main's true edge
// (their own px-10 insets the content), so match that same trailing margin here.
const CONTENT_WIDTH = CALENDAR_TOTAL_WIDTH - WRAPPER_PADDING;
const SIDEBAR_WIDTH = CONTENT_WIDTH - EXPERIENCE_CARD_WIDTH - ROW_GAP;

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center px-8 pt-8 pb-8 sm:px-6 sm:pt-24 sm:pb-6">
      <main
        className="flex w-full flex-col items-start gap-4"
        style={{ maxWidth: CALENDAR_TOTAL_WIDTH }}
      >
        <div className="flex w-full flex-col items-start gap-4">
          {/*
            Two constraints hold this row together: the headshot's top sits on the cap
            height of the name, and the social row's bottom sits on the headshot's
            bottom. Both are driven off the same pair of numbers so they can't drift
            apart:

              CAP_OFFSET  5.5px — the name's cap height relative to its line box top
                          (Geom at 30px/36px, the same at both breakpoints)
              SIZE        the headshot, 96px at base and 128px from sm:

            The headshot is nudged down by CAP_OFFSET, and the text column is given a
            min-height of SIZE + CAP_OFFSET so its bottom edge lands on the image's.
            SocialLinks then uses mt-auto to absorb whatever slack is left over.
            Re-measure both numbers if the name's size or typeface changes.
          */}
          <div className="flex w-full items-start justify-between gap-4 sm:gap-6 sm:px-10">
            <div className="flex min-h-[101.5px] min-w-0 flex-1 flex-col items-start sm:min-h-[133.5px]">
              <div className="flex max-w-lg flex-col gap-0.5 text-left sm:gap-1">
                <p className="text-3xl font-bold sm:hidden">Ben Petrillo</p>
                <p className="hidden text-3xl font-semibold sm:block">Hi, I&apos;m Ben Petrillo</p>

                <p className="hidden text-lg leading-tight font-medium text-zinc-400 sm:block">
                  Software engineer with interest in distributed systems.
                </p>

                <p className="text-base leading-tight font-semibold text-zinc-400 sm:hidden">
                  Building{" "}
                  <a
                    href="https://chewy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    @Chewy
                  </a>
                </p>
                <p className="hidden text-lg leading-tight font-medium text-zinc-500 sm:block">
                  Currently, building{" "}
                  <a
                    href="https://chewy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    @Chewy
                  </a>
                </p>
              </div>

              <SocialLinks />
            </div>
            <Image
              src="/headshot.jpg"
              alt="Ben Petrillo"
              width={128}
              height={128}
              className="ring-accent mt-[5.5px] h-24 w-24 shrink-0 rounded-xl object-cover ring-2 sm:h-32 sm:w-32 sm:ring-0"
              preload
            />
          </div>

          <GitHubCalendar username="bpetrillo-chwy" />

          <div className="flex items-center gap-1.5 text-xs sm:px-10">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 text-zinc-500">
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-shimmer">Yes, these commits are squashed.</span>
          </div>
        </div>

        <HomeContent
          experienceCardWidth={EXPERIENCE_CARD_WIDTH}
          sidebarWidth={SIDEBAR_WIDTH}
        />
      </main>
    </div>
  );
}
