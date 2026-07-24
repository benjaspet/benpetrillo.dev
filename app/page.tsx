import Image from "next/image";
import GitHubCalendar from "./components/github-calendar";
import { CALENDAR_TOTAL_WIDTH, WRAPPER_PADDING } from "./components/calendar-constants";
import SocialLinks from "./components/social-links";
import ExperienceCarousel from "./components/experience-carousel";
import SidePanel from "./components/side-panel";
import Footer from "./components/footer";

const EXPERIENCE_CARD_WIDTH = 464;
const ROW_GAP = 32;
// The calendar/header visibly end WRAPPER_PADDING short of main's true edge
// (their own px-10 insets the content), so match that same trailing margin here.
const SIDEBAR_WIDTH = CALENDAR_TOTAL_WIDTH - WRAPPER_PADDING - EXPERIENCE_CARD_WIDTH - ROW_GAP;

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center px-8 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-6">
      <main
        className="flex w-full flex-col items-start gap-4"
        style={{ maxWidth: CALENDAR_TOTAL_WIDTH }}
      >
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between gap-4 sm:gap-6 sm:px-10">
              <div className="flex max-w-lg flex-col gap-1 text-left">
                <p className="text-3xl font-bold sm:hidden">Ben Petrillo</p>
                <p className="hidden text-3xl font-semibold sm:block">Hi, I&apos;m Ben Petrillo</p>

                <p className="hidden text-lg leading-tight font-medium text-zinc-400 sm:block">
                  Software engineer with interest in distributed systems.
                </p>

                <p className="text-base font-semibold text-zinc-400 sm:hidden">
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
              <Image
                src="/headshot.jpg"
                alt="Ben Petrillo"
                width={112}
                height={112}
                className="ring-accent h-24 w-24 shrink-0 rounded-xl object-cover ring-2 sm:h-28 sm:w-28 sm:ring-0"
                priority
              />
            </div>

            <SocialLinks />
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

        <div className="flex w-full flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:shrink-0" style={{ maxWidth: EXPERIENCE_CARD_WIDTH }}>
            <ExperienceCarousel />
          </div>

          <div className="w-full lg:shrink-0" style={{ maxWidth: SIDEBAR_WIDTH }}>
            <SidePanel />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
