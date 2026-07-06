export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]" role="status" aria-live="polite" aria-label="Loading page">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-800 rounded-full animate-spin" aria-hidden="true" />
        <span className="text-gray-600 text-sm">Loading...</span>
      </div>
    </div>
  );
}
