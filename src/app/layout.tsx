import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://googlereview.pollydevelopment.nl"),
  title: "Google Review NFC tags kopen | PollyDevelopment",
  description:
    "Google Review NFC tags voor bedrijven in Nederland en België. Stickers, kaarten en displays, kleine en grote oplages in eigen huisstijl. Bel voor een prijsopgave.",
  applicationName: "PollyDevelopment Google Review NFC",
  authors: [{ name: "Joey te Wierik" }, { name: "Luc" }],
  keywords: [
    "Google Review NFC",
    "NFC review kaart",
    "Google Review sticker",
    "Google Review tafeldisplay",
    "NFC tags kopen",
    "PollyDevelopment",
    "Reviews verzamelen",
  ],
  openGraph: {
    title: "Google Review NFC tags kopen | PollyDevelopment",
    description:
      "NFC stickers, review kaarten en tafeldisplays voor Nederland en België. Kleine en grote aanvragen: bel PollyDevelopment.",
    type: "website",
    locale: "nl_NL",
    siteName: "PollyDevelopment",
    images: [
      {
        url: "/images/products/review-card.png",
        width: 900,
        height: 600,
        alt: "Google Review NFC Kaarten",
      },
    ],
  },
  icons: {
    icon: "/images/products/pollydevelopment-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0e9" },
    { media: "(prefers-color-scheme: dark)", color: "#070907" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[#070907] text-white selection:bg-[#00FF66] selection:text-black">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
