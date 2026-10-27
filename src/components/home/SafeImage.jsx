"use client";

import { useState } from "react";

// The parent needs the `group` class for the hover zoom.
// Pass a positioning class in className ("relative aspect-..." or "absolute inset-0").
export default function SafeImage({
  src,
  alt,
  fallback = "🌍",
  gradient = "from-[#1a8fb0] to-sky-300",
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      {failed || !src ? (
        <div
          className="absolute inset-0 grid place-items-center text-6xl"
          aria-hidden="true"
        >
          {fallback}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
    </div>
  );
}
