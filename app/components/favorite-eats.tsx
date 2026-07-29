"use client";

import { useEffect, useState } from "react";
import StarRating from "./star-rating";
import { mapsUrl, restaurants } from "../data";

export default function FavoriteEats() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group hover:text-accent flex w-full items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-white/[0.07]"
      >
        <span className="flex-1">Favorite Eats</span>
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
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorite-eats-title"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-md flex-col rounded-t-2xl bg-zinc-950 ring-1 ring-white/10 sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 pb-3">
              <div className="flex flex-col gap-0.5">
                <h2 id="favorite-eats-title" className="text-base font-semibold">
                  Favorite Eats
                </h2>
                <p className="text-xs text-zinc-500">
                  Boston and the Cape, rated by me. Tap one to open it in Google Maps.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="hover:text-accent shrink-0 rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10"
              >
                <svg
                  width="14"
                  height="14"
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

            <div className="no-scrollbar flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto px-5 pt-1 pb-5">
              {restaurants.map((restaurant) => (
                <a
                  key={restaurant.name}
                  href={mapsUrl(restaurant)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1.5 rounded-lg bg-white/[0.04] px-3 py-2.5 transition-colors hover:bg-white/[0.08]"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="group-hover:text-accent truncate text-sm font-medium transition-colors">
                        {restaurant.name}
                      </span>
                      <span className="truncate text-xs text-zinc-500">
                        {restaurant.cuisine} · {restaurant.neighborhood}
                      </span>
                    </span>
                    <StarRating rating={restaurant.rating} />
                  </span>

                  {restaurant.comment && (
                    <span className="border-l border-white/10 pl-2 text-xs leading-snug text-zinc-400">
                      {restaurant.comment}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
