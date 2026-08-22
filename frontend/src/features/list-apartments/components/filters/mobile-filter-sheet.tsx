"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FilterValues } from "./filter-bar";
import { FilterPanel } from "./filter-panel";

interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  values: FilterValues;
  activeCount: number;
  resultCount: number;
  onChange: (key: keyof FilterValues, value: string) => void;
  onClear: () => void;
}

/** Bottom-drawer filters, shown only below the `lg` breakpoint. */
export function MobileFilterSheet({
  open,
  onClose,
  values,
  activeCount,
  resultCount,
  onChange,
  onClear,
}: MobileFilterSheetProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-x-0 bottom-0 flex max-h-[90vh] flex-col">
        <DialogPanel className="flex max-h-[90vh] flex-col overflow-hidden rounded-t-2xl border-t border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="text-base font-semibold text-foreground">
              Filters
            </span>
            <div className="flex items-center gap-3">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                aria-label="Close filters"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-muted hover:text-foreground"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto px-5 py-4">
            <FilterPanel
              values={values}
              onChange={onChange}
              onClear={onClear}
              hideHeading
            />
          </div>

          <div className="border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white"
            >
              Show {resultCount} {resultCount === 1 ? "result" : "results"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
