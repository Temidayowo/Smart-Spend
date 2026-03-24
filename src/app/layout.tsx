import type { Metadata } from "next";
import Providers from "@/components/providers/providers";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Spend Smart — Take Control of Your Money",
    template: "%s | Spend Smart",
  },
  description:
    "Spend Smart helps you track expenses, set budgets, and uncover insights that turn financial stress into financial confidence.",
  keywords: [
    "expense tracker",
    "budget app",
    "personal finance",
    "money management",
    "spending insights",
    "financial goals",
    "save money",
  ],
  authors: [{ name: "Spend Smart" }],
  creator: "Spend Smart",
  metadataBase: new URL("https://smartspend-expensetracker.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smartspend-expensetracker.vercel.app",
    siteName: "Spend Smart",
    title: "Spend Smart — Take Control of Your Money",
    description:
      "Track expenses, set budgets, and uncover insights that turn financial stress into financial confidence.",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Spend Smart — Expense Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spend Smart — Take Control of Your Money",
    description:
      "Track expenses, set budgets, and uncover insights that turn financial stress into financial confidence.",
    images: ["/icon.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
