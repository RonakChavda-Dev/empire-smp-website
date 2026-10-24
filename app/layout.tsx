import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Empire SMP — Build your own kingdom",
  description: "A griefable Minecraft survival world. Find your ground, make your mark, and decide what is worth defending.",
  applicationName: "Empire SMP",
};

export const viewport: Viewport = { themeColor: "#15121b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
