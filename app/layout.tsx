import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Game Hosting",
  description: "Browse and play web games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <AppProviders>
          <Header />

          <main className="pt-16">{children}</main>

          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
