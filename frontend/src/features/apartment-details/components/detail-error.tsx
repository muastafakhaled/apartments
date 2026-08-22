import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Container } from "@/shared/components/container";
import { BackLink } from "./back-link";

export function DetailError({ notFound }: { notFound: boolean }) {
  return (
    <Container className="py-16">
      <div className="mx-auto grid max-w-md place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-surface-muted text-muted">
          <ExclamationTriangleIcon className="h-7 w-7" />
        </div>
        <h1 className="text-lg font-semibold text-foreground">
          {notFound ? "Apartment not found" : "Something went wrong"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {notFound
            ? "This listing may have been removed or never existed."
            : "We couldn't load this apartment right now."}
        </p>
        <div className="mt-5">
          <BackLink />
        </div>
      </div>
    </Container>
  );
}
