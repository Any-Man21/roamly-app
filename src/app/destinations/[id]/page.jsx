import Link from "next/link";
import { notFound } from "next/navigation";
import { EditModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// export const metadata = { title: "Destination | Roamly" };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function getDestination(id) {
  try {
    // 1. TRY to get the token, but don't crash if it's not there
    let token = null;
    try {
      const tokenData = await auth.api.getToken({
        headers: await headers(),
      });
      token = tokenData?.token;
    } catch (authErr) {
      // We ignore auth errors here because the destination page is public
      console.log("Guest accessing page: no token found.");
    }

    // 2. Build the headers (only add authorization if we actually have a token)
    const requestHeaders = {};
    if (token) {
      requestHeaders["authorization"] = `Bearer ${token}`;
    }

    // 3. Fetch the data
    const res = await fetch(`${API_URL}/destinations/${id}`, {
      headers: requestHeaders,
      cache: "no-store",
    });

    if (res.status === 404 || res.status === 400) return { missing: true };
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    // Handle both formats (nested .destination or flat data)
    return { destination: { ...data.destination, ...data } };
  } catch (err) {
    console.error("Failed to load destination:", err);
    return { error: true };
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const { destination } = await getDestination(id);

  if (!destination) {
    return { title: "Destination Not Found | Roamly" };
  }

  return {
    title: destination.destinationName, // This becomes "Paris | Roamly"
    description: `Book your trip to ${destination.destinationName}, ${destination.country}. ${destination.description.slice(0, 150)}...`,
    openGraph: {
      images: [destination.imageUrl], // Shows the destination image when shared on WhatsApp/Twitter
    },
  };
}

export default async function DestinationDetailsPage({ params }) {
  const { id } = await params;
  const { destination, missing, error } = await getDestination(id);

  if (missing) notFound();
  if (error)
    return <div className="p-10 text-center">Error loading destination.</div>;

  const { imageUrl, destinationName, country, category, price, description } =
    destination;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex justify-between mb-6">
        <Link href="/destinations" className="text-blue-600">
          ← All Destinations
        </Link>
        <div className="flex gap-2">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>
      </div>

      <div className="aspect-video overflow-hidden rounded-3xl mb-8">
        <img
          src={imageUrl}
          alt={destinationName}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold">{destinationName}</h1>
      <p className="text-slate-600">
        {country} · {category}
      </p>
      <p className="mt-4 text-lg">{description}</p>

      <div className="mt-10">
        <BookingCard destination={destination} />
      </div>
    </div>
  );
}
