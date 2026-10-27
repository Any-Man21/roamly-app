import { Button } from "@heroui/react";
import Link from "next/link";
import { FaExternalLinkAlt, FaMapMarkerAlt } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// "2026-12-01" -> "Dec 1, 2026"
function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DestinationCard({ destination }) {
  const data = { ...destination.destination, ...destination };
  const {
    _id,
    imageUrl,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    description,
  } = data;

  const details = [duration, formatDate(departureDate)]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/destinations/${_id}`}
      className="group block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a8fb0] border-2 border-transparent transition-colors hover:border-[#1a8fb0] p-4 duration-900 ease-in-out"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={destinationName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-slate-900 transition-colors group-hover:text-[#1a8fb0]">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt />
              {destinationName}
            </div>
          </h3>
          <p className=" text-sm text-slate-800">
            {country}
            {category && ` · ${category}`}
          </p>
        </div>
        <p className="shrink-0 font-semibold text-[#1a8fb0]">
          {money.format(Number(price) || 0)}
        </p>
      </div>

      {duration && (
        <p className="mt-5 text-xs text-slate-900 flex items-center gap-1">
          {" "}
          <SlCalender />
          {duration}
        </p>
      )}

      {description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-900">
          {description}
        </p>
      )}

      {departureDate && (
        <p className="mt-2 text-xs text-slate-500">
          Departing {formatDate(departureDate)}
        </p>
      )}

      {/* FIXED: Removed the nested <Link> tag from here */}
      <div className="mt-4">
        <Button
          variant="primary"
          className={
            "w-full text-slate-800 bg-cyan-500 hover:bg-cyan-300 hover:*:text-cyan-200"
          }
        >
          <FaExternalLinkAlt />
          Book Now!
        </Button>
      </div>
    </Link>
  );
}
