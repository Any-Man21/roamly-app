import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import {
  BUDGET_RANGES,
  DURATION_RANGES,
  filterDestinations,
} from "@/lib/destinationSearch";

export const metadata = { title: "Destinations | Roamly" };

// A search parameter can be a string or an array of strings
const first = (value) => (Array.isArray(value) ? value[0] : value);

const DestinationsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const location = (first(params?.location) ?? "").trim();
  const durationKey = first(params?.duration) ?? "";
  const budgetKey = first(params?.budget) ?? "";

  let destinations = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    destinations = await res.json();
  } catch (err) {
    console.error("Failed to load destinations:", err);
  }

  // Search: filters by location, duration and budget (all optional)
  const durationRange = DURATION_RANGES[durationKey];
  const budgetRange = BUDGET_RANGES[budgetKey];
  const hasFilters = Boolean(location || durationRange || budgetRange);

  const results = filterDestinations(destinations, {
    location,
    duration: durationKey,
    budget: budgetKey,
  });

  const activeFilters = [
    location && `“${location}”`,
    durationRange?.label,
    budgetRange?.label,
  ].filter(Boolean);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Destinations
        </h1>
        <p className="mt-2 text-slate-600">
          Hand-picked trips for your next adventure.
        </p>
      </header>

      {/* Search summary */}
      {hasFilters && destinations.length > 0 && (
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <p aria-live="polite" className="mr-1 text-sm text-slate-600">
              <strong className="text-slate-900">{results.length}</strong>{" "}
              {results.length === 1 ? "result" : "results"} for
            </p>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="rounded-full bg-[#1a8fb0]/10 px-3 py-1 text-xs font-semibold text-[#136f89]"
              >
                {filter}
              </span>
            ))}
          </div>

          <Link
            href="/destinations"
            className="text-sm font-semibold text-[#1a8fb0] hover:underline"
          >
            Clear search
          </Link>
        </div>
      )}

      {destinations.length === 0 ? (
        <p className="text-slate-600">No destinations to show right now.</p>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Nothing available
          </p>
          <p className="mt-2 text-sm text-slate-600">
            We couldn&apos;t find any trips matching your search. Try a
            different place, duration or budget.
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-flex rounded-full bg-[#1a8fb0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#136f89]"
          >
            Show all destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-15 sm:grid-cols-2 lg:grid-cols-3 ">
          {results.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </section>
  );
};

export default DestinationsPage;
