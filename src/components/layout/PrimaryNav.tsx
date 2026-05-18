"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type NavItem = { slug: string; label: string };

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav({ items }: { items: ReadonlyArray<NavItem> }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-7 text-sm">
        {items.map((item) => {
          const href = `/${item.slug}`;
          const active = isActive(pathname, href);
          return (
            <li key={item.slug}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center border-b border-transparent pb-1 transition-colors",
                  active
                    ? "border-bronze text-bronze"
                    : "text-charcoal-100 hover:text-bronze",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function MobileNav({ items }: { items: ReadonlyArray<NavItem> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape; close on outside click.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    function onClick(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  return (
    <div ref={panelRef} className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-none border border-rule px-3 text-sm text-charcoal-100 transition-colors hover:border-bronze hover:text-bronze"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-rule bg-ivory shadow-sm"
      >
        <ul className="mx-auto flex max-w-[88rem] flex-col px-5 sm:px-8">
          {items.map((item) => {
            const href = `/${item.slug}`;
            const active = isActive(pathname, href);
            return (
              <li key={item.slug} className="border-b border-rule last:border-b-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[48px] items-center font-serif text-lg",
                    active ? "text-bronze" : "text-charcoal hover:text-bronze",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
