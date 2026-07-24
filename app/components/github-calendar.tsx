"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BLOCK, GAP, SKELETON_WIDTH, SKELETON_HEIGHT } from "./calendar-constants";

type Activity = { date: string; count: number; level: number };
type Cell = { level: number; active: boolean };

const GITHUB_API_BASE = "https://github-contributions-api.jogruber.de/v4/";
const RADIUS = 65;
const MAX_PUSH = 15;
const MAX_SCALE = 1.25;
const EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

function dayOfWeekUTC(iso: string) {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

function buildWeeks(activities: Activity[]): Cell[][] {
  const cells: Cell[] = activities.map((a) => ({ level: a.level, active: true }));

  if (cells.length > 0) {
    const leadingBlanks = dayOfWeekUTC(activities[0].date);
    for (let i = 0; i < leadingBlanks; i++) cells.unshift({ level: -1, active: false });
  }
  while (cells.length % 7 !== 0) cells.push({ level: -1, active: false });

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function GitHubCalendar({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<Cell[][]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const canHoverRef = useRef(false);

  useEffect(() => {
    canHoverRef.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(`${GITHUB_API_BASE}${username}?y=last`)
      .then((res) => res.json())
      .then((json) => {
        const activities: Activity[] = json.contributions ?? [];
        if (!cancelled) {
          setWeeks(buildWeeks(activities));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [weeks]);

  const applyBubble = (mx: number, my: number) => {
    const nodes = gridRef.current?.querySelectorAll<HTMLDivElement>("[data-cell]");
    nodes?.forEach((el) => {
      const cx = Number(el.dataset.cx);
      const cy = Number(el.dataset.cy);
      const dx = cx - mx;
      const dy = cy - my;
      const dist = Math.hypot(dx, dy);
      const t = Math.max(0, 1 - dist / RADIUS);

      const scale = 1 + t * (MAX_SCALE - 1);

      if (t === 0 || dist < 1) {
        el.style.transform = `translate(0px, 0px) scale(${scale.toFixed(3)})`;
        return;
      }

      const push = t * MAX_PUSH;
      const nx = dx / dist;
      const ny = dy / dist;
      el.style.transform = `translate(${(nx * push).toFixed(2)}px, ${(ny * push).toFixed(2)}px) scale(${scale.toFixed(3)})`;
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canHoverRef.current) return;
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => applyBubble(mx, my));
  };

  const handleMouseLeave = () => {
    const nodes = gridRef.current?.querySelectorAll<HTMLDivElement>("[data-cell]");
    nodes?.forEach((el) => {
      el.style.transform = "translate(0px, 0px) scale(1)";
    });
  };

  if (loading) {
    return (
      <div className="max-w-full overflow-hidden py-2 sm:px-10">
        <div
          className="shimmer rounded-lg"
          style={{ width: SKELETON_WIDTH, height: SKELETON_HEIGHT }}
        />
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="no-scrollbar max-w-full overflow-x-auto py-2 sm:px-10">
      <div
        ref={gridRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex"
        style={{ gap: GAP }}
      >
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
            {week.map((cell, di) =>
              cell.active ? (
                <div
                  key={di}
                  data-cell
                  data-cx={wi * (BLOCK + GAP) + BLOCK / 2}
                  data-cy={di * (BLOCK + GAP) + BLOCK / 2}
                  className="rounded-full will-change-transform"
                  style={{
                    width: BLOCK,
                    height: BLOCK,
                    backgroundColor: LEVEL_COLORS[cell.level],
                    transition: `transform 500ms ${EASE}`,
                  }}
                />
              ) : (
                <div key={di} style={{ width: BLOCK, height: BLOCK }} />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
