import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

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
    { media: "(prefers-color-scheme: dark)", color: "#0E1210" },
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
    <html
      lang="nl"
      className={`dark scroll-smooth ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
    >
      <body className="antialiased min-h-screen bg-[#0E1210] text-[#F3F5F0] selection:bg-[#506654] selection:text-white font-sans">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
