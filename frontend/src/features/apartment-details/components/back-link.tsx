import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back to listings
    </Link>
  );
}
