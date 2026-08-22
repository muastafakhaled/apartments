"use client";

import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Container } from "@/shared/components/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-16">
      <div className="mx-auto grid max-w-md place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-surface-muted text-muted">
          <ExclamationTriangleIcon className="h-7 w-7" />
        </div>
        <h1 className="text-lg font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="mt-1 text-sm text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-5">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Try again
          </button>
        </div>
      </div>
    </Container>
  );
}
