"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container } from "./container";

const NAV_LINKS = [
  { label: "Buy", href: "/", active: true },
  { label: "Rent", href: "/" },
  { label: "New Projects", href: "/" },
  { label: "Sell", href: "/" },
  { label: "About", href: "/" },
];

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="flex items-center gap-2" onClick={onClick}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
        M
      </span>
      <span className="text-lg font-bold tracking-tight text-foreground">
        maskan
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "border-b-2 border-primary pb-1 text-sm font-semibold text-foreground"
                  : "text-sm font-medium text-muted transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-surface-muted md:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </Container>

      <Transition show={menuOpen}>
        <Dialog onClose={setMenuOpen} className="relative z-50 md:hidden">
          <TransitionChild
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-foreground/30" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            enter="transition ease-out duration-200"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 left-0 flex w-4/5 max-w-xs flex-col bg-surface shadow-xl">
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <Logo onClick={() => setMenuOpen(false)} />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-surface-muted"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={
                      link.active
                        ? "rounded-lg px-3 py-3 text-sm font-semibold text-foreground"
                        : "rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-muted"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </header>
  );
}
