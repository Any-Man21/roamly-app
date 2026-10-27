export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f7f8f5] flex items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4">
        {/* A spinning loader to show the user something is happening */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#176b57]" />
        <p className="text-slate-500 font-medium animate-pulse">
          Loading your travel journal...
        </p>
      </div>
    </div>
  );
}
