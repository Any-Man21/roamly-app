import Link from "next/link";
import { Fredoka } from "next/font/google";

const wordmarkFont = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const SIZES = {
  md: { icon: "h-9 w-9", text: "text-[28px]", gap: "gap-2" },
  lg: {
    icon: "h-12 w-12 sm:h-14 sm:w-14",
    text: "text-4xl sm:text-5xl",
    gap: "gap-2.5",
  },
};

// The icon on its own. It takes its color from the surrounding text color.
export function LogoMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 42"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* soft ground shadow */}
      <ellipse
        cx="20"
        cy="39.5"
        rx="7"
        ry="1.8"
        fill="currentColor"
        opacity="0.18"
      />
      {/* map pin */}
      <path
        d="M20 38S6 26.5 6 16a14 14 0 0 1 28 0c0 10.5-14 22-14 22Z"
        fill="currentColor"
      />
      {/* paper plane */}
      <g transform="translate(12.5 8.5) scale(0.62)">
        <path d="M22 2 15 22l-4-9-9-4 20-7Z" fill="#fff" />
        <path
          d="M22 2 11 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function Logo({ size = "md", className = "" }) {
  const s = SIZES[size];

  return (
    <Link
      href="/"
      aria-label="Roamly home"
      className={`group inline-flex items-center ${s.gap} rounded text-[#1a8fb0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0] ${className}`}
    >
      <LogoMark
        className={`${s.icon} shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-6`}
      />
      <span
        className={`${wordmarkFont.className} ${s.text} font-semibold leading-none tracking-tight`}
      >
        Roamly
      </span>
    </Link>
  );
}
