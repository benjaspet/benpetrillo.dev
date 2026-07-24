"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectHeroImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="shimmer absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className={`object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
