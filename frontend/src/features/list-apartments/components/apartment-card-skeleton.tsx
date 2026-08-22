export function ApartmentCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-surface sm:flex-row">
      <div className="aspect-[16/10] w-full shrink-0 bg-surface-muted sm:aspect-auto sm:w-[300px]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-1/3 rounded bg-surface-muted" />
        <div className="h-5 w-2/3 rounded bg-surface-muted" />
        <div className="h-3 w-1/4 rounded bg-surface-muted" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded bg-surface-muted" />
          <div className="h-6 w-20 rounded bg-surface-muted" />
        </div>
        <div className="mt-auto h-6 w-1/3 rounded bg-surface-muted" />
      </div>
    </div>
  );
}
