import { Skeleton } from "@/components/ui/skeleton";

export default function ChaptersLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Skeleton className="h-8 w-24 mb-6 rounded-lg" />

      <div className="flex items-start gap-5 mb-8">
        <Skeleton className="w-20 h-28 rounded-xl shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      </div>

      <Skeleton className="h-px w-full mb-6" />

      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4"
          >
            <Skeleton className="size-10 rounded-lg shrink-0" />
            <Skeleton className="h-5 flex-1" />
            <Skeleton className="size-5 shrink-0 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
