import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ApartmentListItem } from "../types";
import { ApartmentCard } from "./apartment-card";
import { ApartmentCardSkeleton } from "./apartment-card-skeleton";

function StateBox({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-surface-muted text-muted">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ApartmentList({
  items,
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: {
  items: ApartmentListItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry: () => void;
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ApartmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <StateBox
        icon={<ExclamationTriangleIcon className="h-7 w-7" />}
        title="Something went wrong"
        description={errorMessage ?? "We couldn't load apartments right now."}
        action={
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Try again
          </button>
        }
      />
    );
  }

  if (items.length === 0) {
    return (
      <StateBox
        icon={<HomeIcon className="h-7 w-7" />}
        title="No apartments found"
        description="Try adjusting your search or filters to see more results."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
}
