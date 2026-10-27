export const sectionClass =
  "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8";

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span className="inline-flex rounded-full bg-[#1a8fb0]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#136f89]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
