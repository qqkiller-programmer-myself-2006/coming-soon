import type { Metadata } from "next";
import "./globals.css";
import config from "@/config.json";

export const metadata: Metadata = {
  title: config.site.titleTh,
  description: config.site.descriptionTh,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
