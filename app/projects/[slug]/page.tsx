import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data";
import ProjectHeroImage from "../../components/project-hero-image";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    // min-h-dvh, not min-h-screen: 100vh resolves to the *large* viewport on
    // mobile, i.e. the height with the browser chrome retracted, so the hero
    // never matches what is actually on screen. dvh tracks the visible viewport.
    <div className="relative min-h-dvh w-full overflow-hidden bg-black">
      <ProjectHeroImage src={project.cover} alt={project.name} />

      <div className="project-hero-blur-mask absolute inset-0">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="scale-105 object-cover blur-md"
          aria-hidden
        />
      </div>

      <div className="project-hero-gradient absolute inset-0" />

      <Link
        href="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/70"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3 5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Link>

      <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 p-6 sm:gap-3 sm:p-10">
        <h1 className="text-2xl font-semibold text-white sm:text-4xl">{project.name}</h1>
        <p className="max-w-xl text-sm text-white/80 sm:text-base">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent text-sm text-white/70 transition-colors"
          >
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent text-sm text-white/70 transition-colors"
            >
              Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
