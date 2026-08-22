import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-2 text-sm"
    >
      <Link
        href="/"
        className="shrink-0 text-muted transition-colors hover:text-foreground"
      >
        <HomeIcon className="h-4 w-4" />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span
            key={item.label}
            className={`flex items-center gap-2 ${isLast ? "min-w-0" : "shrink-0"}`}
          >
            <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-muted" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className="truncate font-medium text-foreground">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
