// The values match the dropdowns in the banner
export const DURATION_RANGES = {
  "1-3": { label: "1–3 days", min: 1, max: 3 },
  "4-7": { label: "4–7 days", min: 4, max: 7 },
  "8-plus": { label: "8+ days", min: 8, max: Infinity },
};

export const BUDGET_RANGES = {
  "0-1000": { label: "Up to $1,000", min: 0, max: 1000 },
  "1000-3000": { label: "$1,000 – $3,000", min: 1000, max: 3000 },
  "3000-plus": { label: "$3,000+", min: 3000, max: Infinity },
};

// Old records stored their fields inside a nested "destination" object
export function normalizeDestination(item) {
  return { ...item.destination, ...item };
}

// "7 Days / 6 Nights" -> 7, "2 weeks" -> 14, anything else -> null
export function parseDays(duration) {
  const match = String(duration ?? "").match(/(\d+)/);
  if (!match) return null;
  const n = Number(match[1]);
  return /week/i.test(String(duration)) ? n * 7 : n;
}

// Returns the destinations that match the search, with their fields normalized
export function filterDestinations(
  destinations,
  { location = "", duration = "", budget = "" } = {},
) {
  const durationRange = DURATION_RANGES[duration];
  const budgetRange = BUDGET_RANGES[budget];

  // Every word you type must appear in the name, country or category
  const words = location.toLowerCase().split(/\s+/).filter(Boolean);

  return destinations.map(normalizeDestination).filter((d) => {
    if (words.length > 0) {
      const haystack =
        `${d.destinationName ?? ""} ${d.country ?? ""} ${d.category ?? ""}`.toLowerCase();
      if (!words.every((word) => haystack.includes(word))) return false;
    }

    if (durationRange) {
      const days = parseDays(d.duration);
      if (days === null || days < durationRange.min || days > durationRange.max) {
        return false;
      }
    }

    if (budgetRange) {
      const price = Number(d.price);
      if (!Number.isFinite(price) || price < budgetRange.min || price > budgetRange.max) {
        return false;
      }
    }

    return true;
  });
}