import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teksty Oporu",
  description: "teksty oporu",
  // temporary, to avoid indexing
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
