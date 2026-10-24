import type { Metadata, Viewport } from "next";
import LoadingScreen from "./components/LoadingScreen";
import { siteUrl } from "./lib/site";
import "./globals.css";

const title = "Empire SMP | Griefable Minecraft Survival Server";
const description = "Join Empire SMP, a griefable Minecraft survival server. Survive, build a settlement, form alliances, and make your mark in a world with real risk.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "Empire SMP",
  category: "gaming",
  keywords: ["Empire SMP", "Minecraft SMP", "Minecraft survival server", "griefable SMP", "Minecraft multiplayer"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Empire SMP",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Empire SMP — Build your own kingdom in a griefable Minecraft survival world" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = { themeColor: "#15121b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body suppressHydrationWarning><LoadingScreen />{children}</body></html>;
}
