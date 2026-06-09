import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { FractionalFiveStoreProvider } from "@/lib/fractional-five-store";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FractionalFive",
  description: "Structured fractional delivery for independent B2B operators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FractionalFiveStoreProvider>{children}</FractionalFiveStoreProvider>
      </body>
    </html>
  );
}
