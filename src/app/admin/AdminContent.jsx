"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useAnimationControls,
} from "framer-motion";
import {
  AlertDialog,
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";

/* ------------------------------------------------------------------ */
/* Config and helpers                                                  */
/* ------------------------------------------------------------------ */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const TOKEN_KEY = "roamly-admin-token";
const POLL_MS = 10_000; // how often the list checks for changes

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatDate(iso) {
  if (!iso || typeof iso !== "string") return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const bookingTotal = (b) =>
  (Number(b.price) || 0) * (Number(b.travelers || b.travellers || 1) || 1);

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function Icon({ children, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const LockIcon = ({ size }) => (
  <Icon size={size}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Icon>
);
const EyeIcon = ({ off = false }) => (
  <Icon size={20}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M3 3l18 18" />}
  </Icon>
);
const RefreshIcon = ({ spinning }) => (
  <span className={spinning ? "inline-flex animate-spin" : "inline-flex"}>
    <Icon size={16}>
      <path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4" />
    </Icon>
  </span>
);
const TrashIcon = () => (
  <Icon size={16}>
    <path d="M3 6h18M8 6V4h8v2m-11 0 1 14h12l1-14M10 10v6m4-6v6" />
  </Icon>
);
const LogoutIcon = () => (
  <Icon size={16}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </Icon>
);
const SearchIcon = () => (
  <Icon size={18}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
const TicketIcon = () => (
  <Icon size={20}>
    <path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3Z" />
    <path d="M13 5v14" strokeDasharray="2 3" />
  </Icon>
);
const ClockIcon = () => (
  <Icon size={20}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
const CheckIcon = () => (
  <Icon size={20}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5" />
  </Icon>
);
const WalletIcon = () => (
  <Icon size={20}>
    <path d="M3 7a2 2 0 0 1 2-2h13v4" />
    <path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2Z" />
    <circle cx="16" cy="14.5" r="1" />
  </Icon>
);

function Spinner() {
  return (
    <svg
      className="h-[18px] w-[18px] animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Password screen                                                     */
/* ------------------------------------------------------------------ */

function LoginScreen({ onLogin, notice }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const controls = useAnimationControls();

  const onSubmit = async (e) => {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    setIsPending(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 429)
        throw new Error("Too many attempts. Please wait a minute.");
      if (res.status === 401) throw new Error("Incorrect password.");
      if (!res.ok) throw new Error("Something went wrong.");

      const { token } = await res.json();
      onLogin(token);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      controls.start({
        x: [0, -10, 10, -6, 6, 0],
        transition: { duration: 0.4 },
      });
    }
  };

  return (
    <div className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1a8fb0]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="w-full max-w-md"
      >
        <motion.div animate={controls}>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400 px-6 pb-10 pt-8 text-center text-white">
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/20 backdrop-blur"
              >
                <LockIcon size={30} />
              </motion.span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
                Admin access
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Enter the admin password to manage bookings.
              </p>
            </div>
            <div className="-mt-4 rounded-t-3xl bg-white p-6 sm:p-8">
              {notice && (
                <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {notice}
                </p>
              )}
              <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
                <TextField
                  isRequired
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                >
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      variant="secondary"
                      placeholder="Enter admin password"
                      className="w-full rounded-2xl pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                    >
                      <EyeIcon off={showPassword} />
                    </button>
                  </div>
                  <FieldError />
                </TextField>
                <AnimatePresence initial={false}>
                  {error && (
                    <motion.p
                      key={error}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  type="submit"
                  variant="primary"
                  isPending={isPending}
                  className="w-full rounded-2xl bg-[#1a8fb0] py-6 text-base font-semibold text-white transition-colors hover:bg-[#136f89]"
                >
                  {isPending ? <Spinner /> : <LockIcon size={18} />}
                  {isPending ? "Checking..." : "Unlock dashboard"}
                </Button>
              </Form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard pieces                                                    */
/* ------------------------------------------------------------------ */

const ROW_GRID =
  "lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_132px]";

function StatCard({ icon, label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 26, delay }}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1a8fb0]/10 text-[#1a8fb0]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-2xl font-extrabold tracking-tight text-slate-900">
          {value}
        </p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const confirmed = status === "confirmed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${confirmed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${confirmed ? "bg-emerald-500" : "animate-pulse bg-amber-500"}`}
      />
      {confirmed ? "Confirmed" : "Pending"}
    </span>
  );
}

function CellLabel({ children }) {
  return (
    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
      {children}
    </p>
  );
}

function DeleteBooking({ booking, onDelete }) {
  const [isPending, setIsPending] = useState(false);
  const confirm = async () => {
    setIsPending(true);
    await onDelete(booking);
    setIsPending(false);
  };
  return (
    <AlertDialog>
      <Button
        variant="outline"
        className="w-full rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
      >
        <TrashIcon /> Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This permanently removes the booking for{" "}
                <strong>{booking.destinationName}</strong>. This can't be
                undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Keep booking
              </Button>
              <Button
                slot="close"
                variant="danger"
                isPending={isPending}
                onPress={confirm}
              >
                Delete booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

function BookingRow({ booking, onDelete }) {
  const reference = String(booking._id).slice(-6).toUpperCase();
  const travelers = Number(booking.travelers || booking.travellers || 1);
  const bookedAt = booking.bookedAt ?? booking.createdAt;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:items-center lg:gap-6 lg:px-5 ${ROW_GRID}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#1a8fb0] to-sky-300">
          {booking.imageURL && (
            <img
              src={booking.imageURL}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">
            {booking.destinationName || "Untitled"}
          </p>
          <p className="truncate text-xs text-slate-500">
            {[booking.country, booking.duration].filter(Boolean).join(" · ") ||
              "—"}
          </p>
          <p className="mt-0.5 font-mono text-[11px] text-slate-400">
            #{reference}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:contents">
        <div className="min-w-0">
          <CellLabel>Booked by</CellLabel>
          <p className="truncate text-sm font-semibold text-slate-900">
            {booking.userName || "Unknown"}
          </p>
        </div>
        <div className="min-w-0">
          <CellLabel>Booked on</CellLabel>
          <p className="text-sm font-semibold text-slate-900">
            {formatDateTime(bookedAt)}
          </p>
        </div>
        <div className="min-w-0">
          <CellLabel>Departure</CellLabel>
          <p className="text-sm font-semibold text-slate-900">
            {formatDate(booking.departureRequest)}
          </p>
          <p className="text-xs text-slate-500">
            {travelers} traveler{travelers > 1 ? "s" : ""}
          </p>
        </div>
        <div className="min-w-0">
          <CellLabel>Total</CellLabel>
          <p className="text-base font-extrabold text-[#1a8fb0]">
            {money.format(bookingTotal(booking))}
          </p>
          <div className="mt-1">
            <StatusBadge status={booking.status} />
          </div>
        </div>
      </div>
      <DeleteBooking booking={booking} onDelete={onDelete} />
    </motion.li>
  );
}

function ListSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <li
          key={i}
          className="h-28 animate-pulse rounded-2xl bg-slate-200/70"
        />
      ))}
    </ul>
  );
}

const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
];

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */

function Dashboard({ token, onLogout }) {
  const [bookings, setBookings] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const authHeaders = useMemo(
    () => ({ authorization: `Bearer ${token}` }),
    [token],
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/admin/bookings`, {
        headers: authHeaders,
        cache: "no-store",
      });
      if (res.status === 401) {
        onLogout("Your session expired.");
        return;
      }
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();

      // --- START: THE CALCULATED STATUS FIX ---
      const now = Date.now();
      const processed = data.map((booking) => {
        const bookedAt = booking.bookedAt ?? booking.createdAt;
        const bookingTime = new Date(bookedAt).getTime();
        const confirmed =
          Number.isFinite(bookingTime) && now >= bookingTime + 120_000;
        return { ...booking, status: confirmed ? "confirmed" : "pending" };
      });
      // --- END: THE CALCULATED STATUS FIX ---

      setBookings(processed);
      setLoadError(false);
      setLastUpdated(new Date());
    } catch (err) {
      setLoadError(true);
    }
  }, [authHeaders, onLogout]);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  const refresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleDelete = async (booking) => {
    try {
      const res = await fetch(`${API_URL}/admin/bookings/${booking._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!res.ok && res.status !== 404) throw new Error("Delete failed");
      setBookings((prev) => (prev ?? []).filter((b) => b._id !== booking._id));
      toast.success("Booking deleted");
    } catch (err) {
      toast.danger("Couldn't delete booking");
    }
  };

  const stats = useMemo(() => {
    const list = bookings ?? [];
    return {
      total: list.length,
      pending: list.filter((b) => b.status === "pending").length,
      confirmed: list.filter((b) => b.status === "confirmed").length,
      value: list.reduce((sum, b) => sum + bookingTotal(b), 0),
    };
  }, [bookings]);

  const visible = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return (bookings ?? []).filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (words.length === 0) return true;
      const haystack = [
        b.destinationName,
        b.country,
        b.userName,
        b.category,
        String(b._id).slice(-6),
      ]
        .join(" ")
        .toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [bookings, query, filter]);

  const counts = {
    all: stats.total,
    pending: stats.pending,
    confirmed: stats.confirmed,
  };

  return (
    <div className="relative isolate overflow-hidden bg-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1a8fb0]/15 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Admin dashboard
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live: checks for changes every {POLL_MS / 1000}s
              </span>
              {lastUpdated && (
                <span className="text-slate-400">
                  Updated {lastUpdated.toLocaleTimeString("en-US")}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onPress={refresh}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RefreshIcon spinning={refreshing} /> Refresh
            </Button>
            <Button
              variant="outline"
              onPress={() => onLogout()}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LogoutIcon /> Log out
            </Button>
          </div>
        </motion.header>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <StatCard
            icon={<TicketIcon />}
            label="Total bookings"
            value={stats.total}
          />
          <StatCard
            icon={<ClockIcon />}
            label="Pending"
            value={stats.pending}
            delay={0.06}
          />
          <StatCard
            icon={<CheckIcon />}
            label="Confirmed"
            value={stats.confirmed}
            delay={0.12}
          />
          <StatCard
            icon={<WalletIcon />}
            label="Total booking value"
            value={money.format(stats.value)}
            delay={0.18}
          />
        </div>
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#1a8fb0] focus-within:ring-2 focus-within:ring-[#1a8fb0]/20 lg:w-96">
            <span className="text-slate-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bookings..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </label>
          <div role="group" className="flex gap-2">
            {FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === value ? "border-[#1a8fb0] bg-[#1a8fb0] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#1a8fb0] hover:text-[#1a8fb0]"}`}
              >
                {label}{" "}
                <span
                  className={
                    filter === value ? "text-white/80" : "text-slate-400"
                  }
                >
                  {counts[value]}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          {bookings === null && !loadError && <ListSkeleton />}
          {bookings === null && loadError && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-lg font-semibold text-slate-900">
                We couldn't load the bookings
              </p>
              <Button
                variant="primary"
                onPress={refresh}
                className="mt-6 rounded-full bg-[#1a8fb0] px-6 py-2.5 text-sm font-semibold text-white"
              >
                Try again
              </Button>
            </div>
          )}
          {bookings && bookings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-lg font-semibold text-slate-900">
                No bookings yet
              </p>
            </div>
          )}
          {bookings && bookings.length > 0 && visible.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Nothing matches
              </p>
            </div>
          )}
          {visible.length > 0 && (
            <>
              <div
                aria-hidden="true"
                className={`hidden gap-6 px-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:grid ${ROW_GRID}`}
              >
                <span>Trip</span>
                <span>Booked by</span>
                <span>Booked on</span>
                <span>Departure</span>
                <span>Total / status</span>
                <span></span>
              </div>
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {visible.map((booking) => (
                    <BookingRow
                      key={booking._id}
                      booking={booking}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [checked, setChecked] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      setToken(sessionStorage.getItem(TOKEN_KEY));
    } catch {}
    setChecked(true);
  }, []);

  const handleLogin = useCallback((newToken) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, newToken);
    } catch {}
    setNotice("");
    setToken(newToken);
  }, []);

  const handleLogout = useCallback((message = "") => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {}
    setNotice(message);
    setToken(null);
  }, []);

  if (!checked) return <div className="min-h-[calc(100vh-4rem)] bg-slate-50" />;

  return (
    <MotionConfig reducedMotion="user">
      {token ? (
        <Dashboard token={token} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} notice={notice} />
      )}
    </MotionConfig>
  );
}
