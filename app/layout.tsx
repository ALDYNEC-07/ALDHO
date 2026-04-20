import type { Metadata } from "next";
import {
  Abril_Fatface,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
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

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril-fatface",
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
      <body
        className={`${inter.variable} ${abrilFatface.variable} ${jetBrainsMono.variable}`}
      >
        <div className="site-shell">
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
