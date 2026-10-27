import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingsGrid from "./MyBookingsGrid";
import {
  BookingsHeader,
  EmptyBookings,
  ErrorState,
  SignedOutState,
} from "@/components/BookingStates";

export const metadata = {
  title: "My Bookings | Roamly",
  description: "View your bookings and manage your account.",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Shared page frame with the soft background glow
function PageShell({ children }) {
  return (
    <main className="relative isolate overflow-hidden bg-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1a8fb0]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl"
      />
      <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {children}
      </div>
    </main>
  );
}

async function MyBookingsContent() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  const user = session?.user;

  if (!user) {
    return (
      <PageShell>
        <SignedOutState />
      </PageShell>
    );
  }

  // null means the request failed, an array (maybe empty) means it worked
  let bookings = null;

  try {
    // Only ask for a token once we know someone is logged in
    const { token } = await auth.api.getToken({ headers: requestHeaders });

    const res = await fetch(`${API_URL}/bookings/${user.id}`, {
      cache: "no-store",
      headers: { authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    bookings = Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to load bookings:", err);
  }

  return (
    <PageShell>
      <BookingsHeader count={bookings?.length ?? 0} />

      {bookings === null ? (
        <ErrorState />
      ) : bookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <MyBookingsGrid bookings={bookings} />
      )}
    </PageShell>
  );
}

export default function MyBookingPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <div className="space-y-4" aria-hidden="true">
            <div className="h-10 w-64 animate-pulse rounded-xl bg-slate-200/70" />
            <div className="h-72 animate-pulse rounded-3xl bg-slate-200/70" />
          </div>
        </PageShell>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}
