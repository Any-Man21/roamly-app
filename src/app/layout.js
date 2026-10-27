import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.jsx
export const metadata = {
  title: {
    template: "%s | Roamly", // %s is replaced by the page's title
    default: "Roamly | Explore Your Fantasies", // Fallback if page has no title
  },
  description: "Book your next dream adventure with Roamly. Explore destinations, manage bookings, and travel the world.",
  keywords: ["travel", "bookings", "destinations", "vacation", "roamly"],
  openGraph: {
    title: "Roamly | Explore Your Fantasies",
    description: "Book your next dream adventure with Roamly.",
    images: ["/og-image.jpg"], // Add a generic image in your public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-[#14181c]">
        <Suspense fallback={<div className="h-16" />}> <Navbar /> </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
