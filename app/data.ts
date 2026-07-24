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
