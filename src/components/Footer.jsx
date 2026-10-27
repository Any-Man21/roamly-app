"use client";

import { useState } from "react";
import Link from "next/link";
import { logoFont } from "@/lib/font";
import { useEffect } from "react";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
];

const SUPPORT_LINKS = [
  { href: "/help", label: "Help Center" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const SOCIALS = [
  {
    label: "Roamly on X",
    href: "https://x.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Roamly on LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    label: "Roamly on Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0] rounded";
const footerLink = `text-sm text-slate-400 transition-colors hover:text-white ${focusRing}`;
const headingClass = "mb-4 text-sm font-semibold text-white";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      // TODO: connect your newsletter endpoint, for example:
      // const res = await fetch("/api/newsletter", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error("Request failed");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        {/* Brand */}
        <div className="mb-12 max-w-xl">
          <Link
            href="/"
            aria-label="Roamly home"
            className={` ${logoFont.className} inline-block text-4xl font-extrabold leading-none tracking-tight text-[#1a8fb0] sm:text-5xl ${focusRing}`}
          >
            Roamly
          </Link>
          <p className="mt-4 text-[15px] leading-relaxed">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-x-12">
          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Newsletter</h2>
            <p className="mb-4 max-w-sm text-sm leading-relaxed">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form
              onSubmit={handleSubscribe}
              noValidate={false}
              className="max-w-sm"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900 focus-within:border-[#1a8fb0] focus-within:ring-1 focus-within:ring-[#1a8fb0]">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle" && status !== "loading")
                      setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe to newsletter"
                  className="m-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#1a8fb0] text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={`mt-2 min-h-5 text-xs ${
                  status === "error" ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {status === "success" &&
                  "Thanks for subscribing. Check your inbox soon."}
                {status === "error" &&
                  "Something went wrong. Please try again."}
              </p>
            </form>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className={headingClass}>Quick links</h2>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h2 className={headingClass}>Support</h2>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Contact us</h2>
            <ul className="space-y-3">
              <li>
                <a href="tel:+17869011622" className={footerLink}>
                  +1 786 901 1622
                </a>
              </li>
              <li>
                <a href="mailto:info@roamly.com" className={footerLink}>
                  info@roamly.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-5 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-sm">© {year} Roamly. All rights reserved.</p>

          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
