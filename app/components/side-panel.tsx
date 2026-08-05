import Link from "next/link";
import Accordion from "./accordion";
import { projects } from "../data";

const languages = ["Java", "Go", "TypeScript", "Python", "Groovy", "HTML/CSS", "Lisp"];

const technologies = [
  "React",
  "React Native",
  "Next.js",
  "Spring Boot",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "AWS Lambda",
  "S3",
  "ECS",
  "Terraform",
  "Jenkins",
  "Helm",
  "Kubernetes",
  "Nix",
  "Playwright",
  "JUnit",
  "Jest",
  "Git",
];

// --stagger-index is what spaces each pill's entrance apart; the animation
// itself is keyed off the data-stagger-open the Accordion puts on its content.
function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={item}
          style={{ "--stagger-index": i } as React.CSSProperties}
          className="stagger-pill rounded-md bg-white/5 px-2 py-0.5 text-xs text-zinc-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

type SidePanelProps = {
  onOpenPhotography: () => void;
};

export default function SidePanel({ onOpenPhotography }: SidePanelProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Accordion title="Languages" defaultOpen>
        <TagList items={languages} />
      </Accordion>

      <Accordion title="Technologies">
        <TagList items={technologies} />
      </Accordion>

      <button
        type="button"
        onClick={onOpenPhotography}
        className="group hover:text-accent flex w-full items-center gap-2 rounded-xl bg-white/[0.04] px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-white/[0.07]"
      >
        <span className="flex-1">Photography</span>
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

      <div className="flex w-full flex-col gap-2">
        <p className="px-4 py-2 text-sm font-medium">Projects</p>
        <div className="flex flex-col gap-1.5">
          {projects.map((project) => (
            <Link
              key={project.name}
              href={`/projects/${project.slug}`}
              className="group hover:text-accent flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-white/[0.07]"
            >
              <span className="text-zinc-600">•</span>
              <span className="min-w-0 flex-1 truncate">{project.name}</span>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
