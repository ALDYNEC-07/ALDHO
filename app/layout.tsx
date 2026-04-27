import type { Metadata } from "next";
import {
  El_Messiri,
  Forum,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALDHO",
  description: "ALDHO clothing brand website",
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const elMessiri = El_Messiri({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display-serif",
  weight: ["400", "500", "600", "700"],
});

const forum = Forum({
  subsets: ["latin", "cyrillic"],
  variable: "--font-hero-display",
  weight: "400",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          as="image"
          href="/sequences/aldho-2x-15fps/frame-0001.jpg"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${inter.variable} ${elMessiri.variable} ${forum.variable} ${jetBrainsMono.variable}`}
      >
        <CartProvider>
          <div className="site-shell">
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
