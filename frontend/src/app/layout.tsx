import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Devanta — Portfolio from GitHub",
    template: "%s · Devanta",
  },
  description:
    "Paste a GitHub profile. Devanta builds a colorful, styled portfolio from public repos—three templates, instant preview.",
  applicationName: "Devanta",
  keywords: ["GitHub", "portfolio", "developer", "resume", "Devanta", "Next.js"],
  authors: [{ name: "Devanta" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Devanta",
    title: "Devanta — Portfolio from GitHub",
    description:
      "Turn public GitHub data into a polished portfolio. Three themes, one paste.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devanta — Portfolio from GitHub",
    description:
      "Turn public GitHub data into a polished portfolio. Three themes, one paste.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
