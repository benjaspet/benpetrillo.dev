import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geom = localFont({
  src: "./fonts/Geom-Variable.ttf",
  variable: "--font-geom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Petrillo",
  description: "Software engineer with interest in distributed systems. Currently building @Chewy.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicons/fav.png",
        href: "/favicons/fav.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicons/fav.png",
        href: "/favicons/fav.png",
      },
    ],
  },
  openGraph: {
    images: [
      {
        url: "/headshot.jpg",
        width: 1200,
        height: 627,
        alt: "Ben Petrillo",
      },
    ],
  },
  metadataBase: new URL("https://benpetrillo.dev"),
};

export const viewport: Viewport = {
  themeColor: "#0b6db8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geom.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
