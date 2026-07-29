export type Photo = {
  /** Path under public/, e.g. "/photography/msc-ocean-cay/IMG_0484.JPG". */
  src: string;
  /**
   * Intrinsic pixel dimensions. The gallery needs the aspect ratio up front to
   * lay out justified rows, so both are required even though CSS sizes the image.
   */
  width: number;
  height: number;
  alt?: string;
};

export type Trip = {
  slug: string;
  name: string;
  location: string;
  /** ISO date (YYYY-MM-DD). Trips render most recent first. */
  date: string;
  photos: Photo[];
};

/**
 * [filename, width, height] in capture order. Dimensions are the files' real
 * pixel sizes (none carry an EXIF rotation), and the gallery needs them up front
 * to solve its justified rows before the images load.
 */
const OCEAN_CAY: [string, number, number][] = [
  ["IMG_0484.JPG", 6000, 3375],
  ["IMG_0551.JPG", 2555, 1703],
  ["IMG_0564.JPG", 2622, 1475],
  ["IMG_0575.JPG", 2622, 1748],
  ["IMG_0585.JPG", 2622, 1748],
  ["IMG_0587.JPG", 2622, 1748],
  ["IMG_0692.JPG", 2622, 1748],
  ["IMG_0694.JPG", 2608, 1738],
  ["IMG_0698.JPG", 2622, 1748],
  ["IMG_0702.JPG", 2622, 1748],
  ["IMG_0705.JPG", 4800, 3600],
  ["IMG_0708.JPG", 2622, 1748],
  ["IMG_0711.JPG", 2622, 1748],
  ["IMG_0714.JPG", 2615, 1743],
  ["IMG_0719.JPG", 2608, 1738],
  ["IMG_0726.JPG", 2622, 1748],
  ["IMG_0740.JPG", 1835, 1224],
  ["IMG_0745.JPG", 2622, 1748],
  ["IMG_0747.JPG", 2622, 1748],
  ["IMG_0750.JPG", 2622, 1748],
  ["IMG_0752.JPG", 2622, 1748],
  ["IMG_0755.JPG", 2622, 1748],
  ["IMG_0761.JPG", 2622, 1748],
  ["IMG_0767.JPG", 2622, 1748],
  ["IMG_0770.JPG", 2622, 1748],
  ["IMG_0785.JPG", 2622, 1748],
  ["IMG_0791.JPG", 6000, 4000],
  ["IMG_0792.JPG", 6000, 4000],
  ["IMG_0794.JPG", 2622, 1748],
  ["IMG_0796.JPG", 2622, 1748],
  ["IMG_0798.JPG", 6000, 4000],
  ["IMG_0800.JPG", 6000, 4000],
  ["IMG_0813.JPG", 2615, 1743],
  ["IMG_0822.JPG", 2622, 1748],
  ["IMG_0825.JPG", 2608, 1738],
  ["IMG_0828.JPG", 2622, 1748],
  ["IMG_0829.JPG", 2622, 1748],
  ["IMG_0837.JPG", 2622, 1748],
  ["IMG_0838.JPG", 2622, 1748],
  ["IMG_0840.JPG", 2622, 1748],
  ["IMG_0850.JPG", 2622, 1748],
  ["IMG_0852.JPG", 2622, 1748],
  ["IMG_0854.JPG", 2622, 1748],
  ["IMG_0857.JPG", 2608, 1738],
  ["IMG_0859.JPG", 2622, 1748],
  ["IMG_0861.JPG", 2622, 1748],
  ["IMG_0865.JPG", 2622, 1748],
  ["IMG_0866.JPG", 2622, 1748],
  ["IMG_0872.JPG", 2622, 1748],
  ["IMG_0874.JPG", 2622, 1748],
  ["IMG_0882.JPG", 2622, 1748],
  ["IMG_0885.JPG", 2622, 1748],
  ["IMG_0891.JPG", 2622, 1748],
  ["IMG_0894.JPG", 2622, 1748],
];

/**
 * Trips render most recent first, so the order here does not matter.
 */
export const trips: Trip[] = [
  {
    slug: "msc-ocean-cay",
    name: "MSC Ocean Cay",
    location: "Ocean Cay Marine Reserve, Bahamas",
    date: "2026-05-05",
    photos: OCEAN_CAY.map(([file, width, height]) => ({
      src: `/photography/msc-ocean-cay/${file}`,
      width,
      height,
    })),
  },
];

export type Restaurant = {
  name: string;
  neighborhood: string;
  cuisine: string;
  /** My own rating, 0–5 in half-star steps. */
  rating: number;
  /** My own note on the place. Omit or leave empty to hide the line. */
  comment?: string;
};

/** Google Maps deep link for a restaurant's listing. */
export const mapsUrl = ({ name, neighborhood }: Restaurant) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name}, ${neighborhood}, MA`,
  )}`;

// The `rating` and `comment` values below are PLACEHOLDERS — they are presented as
// your opinions, so set them to your real ones.
export const restaurants: Restaurant[] = [
  {
    name: "Giacomo's",
    neighborhood: "North End",
    cuisine: "Italian",
    rating: 4.5,
    comment: "Add your notes here.",
  },
  {
    name: "Maggiano's Little Italy",
    neighborhood: "Back Bay",
    cuisine: "Italian",
    rating: 4,
    comment: "Add your notes here.",
  },
  {
    name: "Holy Cow Ice Cream Cafe",
    neighborhood: "Dennis Port",
    cuisine: "Ice cream",
    rating: 4.5,
    comment: "Add your notes here.",
  },
  {
    name: "The Seafood Shanty",
    neighborhood: "Bourne",
    cuisine: "Seafood",
    rating: 4,
    comment: "Add your notes here.",
  },
];

export type Project = {
  slug: string;
  name: string;
  cover: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "platemate",
    name: "PlateMate",
    cover: "/projects/platemate-cover.png",
    description:
      "A data-driven meal insight platform that lets customers rate dishes individually, giving restaurants actionable data to improve their menus.",
    stack: ["Go", "MongoDB", "React Native"],
    github: "https://github.com/GenerateNU/platemate",
  },
  {
    slug: "the-lb-blueprint",
    name: "The LB Blueprint",
    cover: "/projects/thelbb-cover.jpg",
    description:
      "A responsive landing page and registration system for an elite linebacker training program founded by 9-year NFL veteran Dannell Ellerbe.",
    stack: ["TypeScript", "Next.js", "TailwindCSS"],
    github: "https://github.com/benjaspet/the-lb-blueprint",
    live: "https://the-lb-blueprint.vercel.app",
  },
  {
    slug: "nightlife",
    name: "Nightlife",
    cover: "/projects/nightlife-cover.jpg",
    description:
      "A mobile app for nightlife discovery, helping users decide where to spend their nights out based on interest-specific, user-driven ratings.",
    stack: ["Go", "React Native", "PostgreSQL"],
    github: "https://github.com/GenerateNU/nightlife",
  },
];
