import type { Metadata } from "next";
import { ColorSessionProvider } from "@/components/color-session";
import "./globals.css";

export const metadata: Metadata = {
  title: "Teksty Oporu",
  description: "teksty oporu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <ColorSessionProvider>{children}</ColorSessionProvider>
      </body>
    </html>
  );
}
