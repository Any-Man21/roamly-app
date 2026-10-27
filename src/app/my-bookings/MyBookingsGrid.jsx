"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookingDelete } from "@/components/BookingDelete";

const CONFIRMATION_DURATION = 120_000;

function ConfirmationTimer({ bookedAt }) {
  const [secondsLeft, setSecondsLeft] = useState(null);

  useEffect(() => {
    if (!bookedAt) return;

    const bookingTime = new Date(bookedAt).getTime();

    if (!Number.isFinite(bookingTime)) return;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((bookingTime + CONFIRMATION_DURATION - Date.now()) / 1000),
      );

      setSecondsLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [bookedAt]);

  const confirmed = secondsLeft === 0;
  const minutes = secondsLeft === null ? 0 : Math.floor(secondsLeft / 60);
  const seconds = secondsLeft === null ? 0 : secondsLeft % 60;
  const progress = secondsLeft === null ? 0 : ((120 - secondsLeft) / 120) * 100;

  const timerUnavailable = !bookedAt || secondsLeft === null;

  return (
    <div
      className={`rounded-xl border p-4 transition-colors duration-500 ${
        confirmed
          ? "border-emerald-200 bg-emerald-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              confirmed
                ? "bg-emerald-500"
                : timerUnavailable
                  ? "bg-slate-400"
                  : "animate-pulse bg-amber-500"
            }`}
          />

          <span
            className={`text-sm font-semibold ${
              confirmed
                ? "text-emerald-800"
                : timerUnavailable
                  ? "text-slate-600"
                  : "text-amber-800"
            }`}
          >
            {confirmed
              ? "Booking confirmed"
              : timerUnavailable
                ? "Confirmation time unavailable"
                : "Awaiting confirmation"}
          </span>
        </div>

        <span className="shrink-0 font-mono text-sm font-bold tabular-nums">
          {confirmed
            ? "CONFIRMED"
            : timerUnavailable
              ? "--:--"
              : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0",
                )}`}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/5">
        <motion.div
          className={`h-full rounded-full ${
            confirmed ? "bg-emerald-500" : "bg-amber-500"
          }`}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-600">
        {confirmed
          ? "Your two-minute confirmation period has ended."
          : timerUnavailable
            ? "The booking creation time is missing or invalid."
            : "Confirmation completes two minutes after booking."}
      </p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Not specified";

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (match) {
    return new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const date = new Date(value);

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return value;
}

function BookingTicket({ booking, index }) {
  const price = Number(booking.price);

  const validPrice =
    booking.price !== null &&
    booking.price !== undefined &&
    booking.price !== "" &&
    Number.isFinite(price);

  const bookingReference = String(booking._id || "PENDING")
    .slice(-6)
    .toUpperCase();

  const bookedAt = booking.bookedAt ?? booking.createdAt;

  const travellerCount =
    booking.numberOfPersons ??
    booking.travellers ??
    booking.travelers ??
    booking.persons ??
    booking.numberOfPeople;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.4),
        ease: "easeOut",
      }}
      className="group overflow-hidden rounded-2xl border border-[#e5e4dc] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-[#203c30]/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* Destination image */}
        <div className="relative h-44 overflow-hidden bg-[#e8ece5] sm:h-56 md:h-full md:min-h-[420px]">
          {booking.imageURL ? (
            <Image
              src={booking.imageURL}
              alt={booking.destinationName || "Travel destination"}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 280px, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-44 items-center justify-center text-4xl">
              🌍
            </div>
          )}

          <div className="absolute inset-0 hidden bg-gradient-to-t from-[#10261d]/80 via-transparent to-black/10 md:block" />

          <div className="absolute left-4 top-4 hidden rounded-md border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm md:block">
            Trip {String(index + 1).padStart(2, "0")}
          </div>

          <div className="absolute inset-x-5 bottom-5 hidden text-white md:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/75">
              {booking.country || "Your destination"}
            </p>

            <h2 className="mt-1 text-2xl font-semibold leading-tight">
              {booking.destinationName || "Untitled destination"}
            </h2>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white md:hidden">
            <p className="text-xs font-medium uppercase tracking-wider text-white/80">
              {booking.country || "Your destination"}
            </p>
            <p className="mt-1 font-semibold">
              {booking.destinationName || "Untitled destination"}
            </p>
          </div>
        </div>

        {/* Booking receipt */}
        <div className="min-w-0 p-4 sm:p-6 lg:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#728073]">
                  Booking #{bookingReference}
                </span>

                <span className="rounded-full bg-[#eef3ed] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#45644e]">
                  Trip {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-2 break-words text-lg font-bold leading-tight text-[#203c30] sm:text-xl">
                {booking.destinationName || "Untitled destination"}
              </h3>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {[booking.country, booking.category]
                  .filter(Boolean)
                  .join(" · ") || "Your travel itinerary"}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 sm:text-[10px]">
                Price / person
              </p>

              <p className="mt-1 text-lg font-bold text-[#203c30] sm:text-xl">
                {!validPrice
                  ? "—"
                  : price === 0
                    ? "Free"
                    : `$${price.toLocaleString("en-US")}`}
              </p>
            </div>
          </div>

          {/* Travel details */}
          <div className="my-5 grid grid-cols-2 gap-3 border-y border-dashed border-[#dcded5] py-5 sm:grid-cols-3 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                Departure
              </p>
              <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                {formatDate(booking.departureRequest)}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                Duration
              </p>
              <p className="mt-2 break-words text-sm font-semibold text-slate-800">
                {booking.duration || "Not specified"}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                Travellers
              </p>
              <p className="mt-2 flex items-center gap-2 break-words text-sm font-semibold text-slate-800">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4 shrink-0 text-[#176b57]"
                  aria-hidden="true"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-3a4 4 0 0 1 0 8m1 3h4v-2a4 4 0 0 0-3-3.87"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {travellerCount != null &&
                Number.isFinite(Number(travellerCount))
                  ? `${travellerCount} ${
                      Number(travellerCount) === 1 ? "person" : "people"
                    }`
                  : "Not specified"}
              </p>
            </div>

            <div className="col-span-2 min-w-0 sm:col-span-3">
              <p className="text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                Booking reference
              </p>
              <p className="mt-2 truncate font-mono text-sm font-semibold text-slate-800">
                {bookingReference}
              </p>
            </div>
          </div>

          {booking.description && (
            <p className="mb-5 line-clamp-2 text-sm leading-6 text-slate-500">
              {booking.description}
            </p>
          )}

          <ConfirmationTimer bookedAt={bookedAt} />

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-400">
              Keep your itinerary close. Your next story awaits.
            </p>

            {/* FIXED: Changed <button> to <div> to prevent nested button hydration error */}
            <div className="inline-flex w-full shrink-0 items-center justify-center rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 sm:w-auto sm:py-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  d="M3 6h18M8 6V4h8v2m-11 0 1 14h12l1-14M10 10v6m4-6v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <BookingDelete
                bookingId={booking._id}
                destinationName={booking.destinationName}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function MyBookingsGrid({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[#dcded5] bg-white/70 px-6 py-16 text-center">
        <div className="text-4xl">🌍</div>
        <h2 className="mt-5 text-2xl font-bold text-[#203c30]">
          No trips on your itinerary
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Your next adventure is waiting to be booked.
        </p>
      </div>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.createdAt ?? a.bookedAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? b.bookedAt ?? 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-5">
      {sortedBookings.map((booking, index) => (
        <BookingTicket key={booking._id} booking={booking} index={index} />
      ))}
    </div>
  );
}
