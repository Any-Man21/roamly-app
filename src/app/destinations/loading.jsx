export default function Loading() {
  return (
    <div className="bg-slate-50">
      <div className="h-72 animate-pulse bg-gradient-to-br from-[#0f6a85] via-[#1a8fb0] to-sky-400" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="aspect-[4/3] animate-pulse bg-slate-200" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-24 animate-pulse rounded-full bg-slate-100" />
                <div className="h-7 w-28 animate-pulse rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
