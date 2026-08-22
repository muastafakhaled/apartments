import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function ApartmentsPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const button =
    "flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </button>

      <span className="text-sm text-muted">
        Page <span className="font-semibold text-foreground">{page}</span> of{" "}
        {totalPages}
      </span>

      <button
        type="button"
        className={button}
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
