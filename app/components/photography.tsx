import PhotoGallery from "./photo-gallery";
import { trips } from "../data";

const monthYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

// Parsed as UTC so a "2025-03-14" date can't slip to February in a west-of-GMT
// timezone.
const formatTripDate = (date: string) => monthYear.format(new Date(`${date}T00:00:00Z`));

export default function Photography() {
  const ordered = [...trips].sort((a, b) => b.date.localeCompare(a.date));

  if (ordered.length === 0) {
    return <p className="text-sm text-zinc-500 sm:px-10">Coming soon.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {ordered.map((trip) => (
        <section key={trip.slug} className="flex w-full flex-col gap-3">
          <header className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <h2 className="text-lg font-semibold">{trip.name}</h2>
            <p className="text-sm text-zinc-500">
              {trip.location} · {formatTripDate(trip.date)} · {trip.photos.length}{" "}
              {trip.photos.length === 1 ? "photo" : "photos"}
            </p>
          </header>

          <PhotoGallery photos={trip.photos} />
        </section>
      ))}
    </div>
  );
}
