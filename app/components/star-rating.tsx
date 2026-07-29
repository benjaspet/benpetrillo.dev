const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

const MAX = 5;
const SIZE = 13;

type StarRatingProps = {
  /** 0–MAX, any fraction. Half steps render as half-filled stars. */
  rating: number;
};

function Stars({ className }: { className: string }) {
  return (
    <span className={`flex w-max gap-0.5 ${className}`}>
      {Array.from({ length: MAX }, (_, index) => (
        <svg key={index} width={SIZE} height={SIZE} viewBox="0 0 24 24" fill="currentColor">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

/**
 * Two stacked rows of identical stars: a dim track, and a filled copy clipped to
 * the rating's width. Clipping rather than picking per-star icons means any
 * fraction works, half stars included, and the two rows can't drift apart.
 */
export default function StarRating({ rating }: StarRatingProps) {
  const clamped = Math.min(Math.max(rating, 0), MAX);

  return (
    <span
      className="relative inline-flex shrink-0"
      role="img"
      aria-label={`${clamped} out of ${MAX} stars`}
    >
      <Stars className="text-zinc-700" />
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${(clamped / MAX) * 100}%` }}
      >
        <Stars className="text-amber-400" />
      </span>
    </span>
  );
}
