import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundLayer from "@/components/BackgroundLayer";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aprium Energy | Speed to Power, Certainty in Delivery",
  description:
    "Aprium Energy delivers behind-the-meter power and water infrastructure to data centers and industrial users in 18–36 months. Tier IV reliability, no grid dependency.",
  openGraph: {
    title: "Aprium Energy | Speed to Power, Certainty in Delivery",
    description:
      "Aprium Energy delivers behind-the-meter power and water infrastructure to data centers and industrial users in 18–36 months. Tier IV reliability, no grid dependency.",
    type: "website",
    // TODO: add og:image once final asset is provided
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <BackgroundLayer />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
