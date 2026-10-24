import type { Metadata, Viewport } from "next";
import LoadingScreen from "./components/LoadingScreen";
import { siteUrl } from "./lib/site";
import "./globals.css";

const title = "The Empire SMP | Minecraft Survival Server";
const description = "The Empire is a Minecraft survival world. Find your ground, make your mark, and decide what is worth defending.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "The Empire SMP",
  category: "gaming",
  keywords: ["The Empire SMP", "Minecraft SMP", "shared Minecraft survival world", "Minecraft survival server", "Minecraft multiplayer"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Empire SMP",
    title,
    description,
    images: [{ url: "/og-image.png", width: 1731, height: 909, alt: "The Empire SMP — Build your own kingdom in a shared Minecraft survival world" }],
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
