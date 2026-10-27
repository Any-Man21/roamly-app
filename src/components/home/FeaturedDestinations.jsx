// import Link from "next/link";
// import DestinationCard from "@/components/DestinationCard";
// import Reveal from "./Reveal";
// import { SectionHeading, sectionClass } from "./ui";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// async function getFeatured() {
//   try {
//     const res = await fetch(`${API_URL}/destinations`, {
//       cache: "no-store",
//       signal: AbortSignal.timeout(5000),
//     });
//     if (!res.ok) throw new Error(`Server responded with ${res.status}`);
//     const data = await res.json();
//     if (!Array.isArray(data)) return [];

//     // MongoDB ids start with a timestamp, so this sorts newest first
//     return [...data]
//       .sort((a, b) => String(b._id).localeCompare(String(a._id)))
//       .slice(0, 6);
//   } catch (err) {
//     console.error("Failed to load featured destinations:", err);
//     return [];
//   }
// }

// export function FeaturedSkeleton() {
//   return (
//     <section className="bg-slate-50">
//       <div className={sectionClass}>
//         <div className="mx-auto h-24 max-w-xl animate-pulse rounded-2xl bg-slate-200/70" />
//         <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div
//               key={i}
//               className="aspect-[4/3] animate-pulse rounded-2xl bg-slate-200/70"
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default async function FeaturedDestinations() {
//   const destinations = await getFeatured();

//   if (destinations.length === 0) return null;

//   return (
//     <section className="bg-slate-50">
//       <div className={sectionClass}>
//         <SectionHeading
//           eyebrow="Featured trips"
//           title="Popular right now"
//           subtitle="Fresh additions to Roamly, picked for travelers who want something unforgettable."
//         />

//         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
//           {destinations.map((destination, i) => (
//             <Reveal key={destination._id} delay={(i % 3) * 0.08}>
//               <DestinationCard destination={destination} />
//             </Reveal>
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <Link
//             href="/destinations"
//             className="inline-flex items-center justify-center rounded-full bg-[#1a8fb0] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
//           >
//             View all destinations
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { SectionHeading, sectionClass } from "./ui";
import FeaturedWheel from "@/components/FeaturedWheel"; // Import the new wheel

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getFeatured() {
  try {
    const res = await fetch(`${API_URL}/destinations`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return [...data]
      .sort((a, b) => String(b._id).localeCompare(String(a._id)))
      .slice(0, 8);
  } catch (err) {
    console.error("Failed to load featured destinations:", err);
    return [];
  }
}

// --- ADDED THIS BACK IN ---
export function FeaturedSkeleton() {
  return (
    <section className="bg-slate-50">
      <div className={sectionClass}>
        {/* Skeleton for the Heading */}
        <div className="mx-auto max-w-xl space-y-4">
          <div className="h-4 w-24 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-4 w-full bg-slate-200 rounded-full animate-pulse" />
        </div>

        {/* Skeleton for the Wheel */}
        <div className="mt-20 flex justify-center items-center h-[500px]">
          <div className="relative w-64 h-64 sm:w-96 sm:h-96 rounded-full border-8 border-slate-200 animate-pulse" />
          <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default async function FeaturedDestinations() {
  const destinations = await getFeatured();

  if (destinations.length === 0) return null;

  return (
    <section className="bg-slate-50">
      <div className={sectionClass}>
        <SectionHeading
          eyebrow="Featured trips"
          title="Popular right now"
          subtitle="Fresh additions to Roamly, picked for travelers who want something unforgettable."
        />

        <div className="mt-10">
          <FeaturedWheel destinations={destinations} />
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center rounded-full bg-[#1a8fb0] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#136f89] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a8fb0]"
          >
            View all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
