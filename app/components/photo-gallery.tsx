"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Photo } from "../data";

const GAP = 4;
// Below this container width a 200px row only fits one or two photos, which
// reads as a list rather than a gallery, so shrink the target row height.
const NARROW_WIDTH = 480;
const TARGET_ROW_HEIGHT_NARROW = 130;
const TARGET_ROW_HEIGHT_WIDE = 200;

type Item = { photo: Photo; index: number };
type Row = { items: Item[]; height: number };

const aspectOf = (photo: Photo) => photo.width / photo.height;

/**
 * Greedy justified layout, the shape Google Photos uses: fill a row with photos
 * at their natural aspect ratios until they overflow the container, then solve
 * for the row height that lands the row exactly on the container width.
 */
export function buildRows(photos: Photo[], containerWidth: number, targetHeight: number): Row[] {
  const rows: Row[] = [];
  let items: Item[] = [];
  let aspectSum = 0;

  photos.forEach((photo, index) => {
    items.push({ photo, index });
    aspectSum += aspectOf(photo);

    const gaps = GAP * (items.length - 1);
    if (aspectSum * targetHeight + gaps >= containerWidth) {
      rows.push({ items, height: (containerWidth - gaps) / aspectSum });
      items = [];
      aspectSum = 0;
    }
  });

  // A trailing partial row keeps the target height rather than stretching a
  // lone photo across the full width.
  if (items.length > 0) {
    rows.push({ items, height: targetHeight });
  }

  return rows;
}

/** One gallery tile. Owns its own loaded flag so a slow photo only shimmers itself. */
function GalleryTile({
  photo,
  width,
  height,
  onOpen,
}: {
  photo: Photo;
  width: number;
  height: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={photo.alt ?? "Open photo"}
      className="group relative shrink-0 overflow-hidden rounded-md bg-white/5"
      style={{ width, height }}
    >
      {!loaded && <div className="shimmer absolute inset-0" />}
      <Image
        src={photo.src}
        alt={photo.alt ?? ""}
        fill
        sizes="(max-width: 480px) 50vw, 400px"
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-all duration-300 group-hover:scale-[1.03] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

/** The expanded view's image. Remounted per photo so the shimmer returns on navigation. */
function LightboxImage({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frame, setFrame] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const measure = () => {
      const box = element.getBoundingClientRect();
      setFrame({ width: box.width, height: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Mirror what object-contain will do, so the shimmer covers exactly the
  // letterboxed area the photo lands in rather than the whole frame.
  const scale =
    frame.width > 0 && frame.height > 0
      ? Math.min(frame.width / photo.width, frame.height / photo.height)
      : 0;

  return (
    <div ref={frameRef} className="relative flex min-h-0 flex-1 items-center justify-center">
      {!loaded && scale > 0 && (
        <div
          className="shimmer rounded-lg"
          style={{ width: photo.width * scale, height: photo.height * scale }}
        />
      )}
      <Image
        src={photo.src}
        alt={photo.alt ?? ""}
        fill
        sizes="100vw"
        onLoad={() => setLoaded(true)}
        className={`object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Measure synchronously on mount so the first painted frame is already
    // justified, then keep up with resizes.
    setContainerWidth(element.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((index) =>
        index === null ? index : (index + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const targetHeight = containerWidth < NARROW_WIDTH ? TARGET_ROW_HEIGHT_NARROW : TARGET_ROW_HEIGHT_WIDE;
  const rows = containerWidth > 0 ? buildRows(photos, containerWidth, targetHeight) : [];
  const openPhoto = openIndex === null ? null : photos[openIndex];

  return (
    <div ref={containerRef} className="flex w-full flex-col" style={{ gap: GAP }}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex" style={{ gap: GAP }}>
          {row.items.map(({ photo, index }) => (
            <GalleryTile
              key={index}
              photo={photo}
              width={row.height * aspectOf(photo)}
              height={row.height}
              onOpen={() => setOpenIndex(index)}
            />
          ))}
        </div>
      ))}

      {openPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 p-3 sm:p-6"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
            <span className="text-xs text-zinc-500">
              {openIndex! + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="hover:text-accent rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <LightboxImage key={openIndex} photo={openPhoto} />

          {photos.length > 1 && (
            <div className="flex shrink-0 items-center justify-center gap-2 pt-3">
              {[
                { delta: -1, label: "Previous photo", path: "M15 18l-6-6 6-6" },
                { delta: 1, label: "Next photo", path: "M9 6l6 6-6 6" },
              ].map((control) => (
                <button
                  key={control.label}
                  type="button"
                  onClick={() => step(control.delta)}
                  aria-label={control.label}
                  className="hover:text-accent rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={control.path} />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
