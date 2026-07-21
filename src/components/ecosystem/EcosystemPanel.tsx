"use client";

/**
 * EcosystemPanel — the only client island in the ecosystem banner.
 *
 * Owns the "Explore all products" trigger and the directory it opens:
 *   - desktop (md+): a floating panel anchored to the right of the site grid,
 *     directly under the sticky bar. The page behind stays scrollable and
 *     interactive — it is a popover, not a modal overlay.
 *   - mobile: a bottom sheet over a dimmed backdrop, with body-scroll lock.
 *
 * The directory body is a lazily-loaded chunk (`next/dynamic`), so none of its
 * markup or data ships until the panel is first opened. Nothing about the
 * banner's own rendering depends on this component hydrating.
 *
 * Accessibility: dialog semantics, focus moved in on open, focus trap while
 * open, Escape to close, outside pointer-down to close, focus returned to the
 * trigger on close.
 */
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import {
  CURRENT_PRODUCT_ID,
  ECOSYSTEM_COPY,
  trackEcosystemEvent,
} from "@/lib/ecosystem/config";
import { ChevronDownIcon, CloseIcon } from "./icons";

/**
 * Lazily loaded so the product directory is not part of the initial bundle.
 * `ssr: false` is safe: this component only ever renders while the panel is
 * open, which cannot happen during server rendering.
 */
const EcosystemDirectory = dynamic(() => import("./EcosystemDirectory"), {
  ssr: false,
  loading: () => (
    <p className="py-8 text-center text-[13px] text-stone" role="status">
      Loading products…
    </p>
  ),
});

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const MOBILE_QUERY = "(max-width: 767px)";

export function EcosystemPanel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const pathname = usePathname();

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollLock = useRef<{ overflow: string; paddingRight: string } | null>(
    null,
  );

  // Portals need the DOM; only enable after mount to avoid an SSR mismatch.
  useEffect(() => setMounted(true), []);

  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    if (scrollLock.current) return; // already locked
    if (!window.matchMedia(MOBILE_QUERY).matches) return; // sheet only
    const body = document.body;
    scrollLock.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLock.current) return;
    document.body.style.overflow = scrollLock.current.overflow;
    document.body.style.paddingRight = scrollLock.current.paddingRight;
    scrollLock.current = null;
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    unlockScroll();
    // Return focus to the trigger once the panel has unmounted — but only if
    // the dismissing interaction did not place focus somewhere itself. On
    // desktop the page behind stays interactive, so dismissing may well be
    // the user clicking a background link or field; reclaiming focus
    // unconditionally would yank it away a frame later (WCAG 2.4.3). After
    // the panel unmounts, focus having fallen back to <body> is the signal
    // that nothing else claimed it.
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (!active || active === document.body || active === document.documentElement) {
        triggerRef.current?.focus();
      }
    });
  }, [unlockScroll]);

  const openPanel = useCallback(() => {
    setOpen(true);
    lockScroll();
    trackEcosystemEvent("ecosystem_panel_open", {
      sourceProduct: CURRENT_PRODUCT_ID,
      placement: "ecosystem-bar",
      currentPath:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, [lockScroll]);

  // Close on client-side route change — without stealing focus, since the new
  // page legitimately owns focus at that point.
  useEffect(() => {
    setOpen(false);
    unlockScroll();
  }, [pathname, unlockScroll]);

  // Move focus into the panel once it renders.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Escape to close + focus trap.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      const inPanel = active instanceof Node && panel.contains(active);
      // If focus has escaped the panel (e.g. a click on non-focusable padding
      // moved it to <body>), pull it back rather than let Tab leave.
      if (!inPanel) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, close]);

  // Outside pointer-down closes (covers both the popover and the sheet).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return; // the trigger toggles
      close();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, close]);

  // Keep the scroll lock aligned with the breakpoint while open: the mobile
  // sheet locks body scroll, the desktop popover does not. Heals a resize
  // across the `md` boundary while the panel is open.
  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => (mql.matches ? lockScroll() : unlockScroll());
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open, lockScroll, unlockScroll]);

  // Safety: always release the scroll lock on unmount.
  useEffect(() => unlockScroll, [unlockScroll]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openPanel())}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          // The bar is 48px tall, so the control is 30px; `after` stretches the
          // touch target to the full bar height without affecting layout.
          "relative inline-flex h-[30px] shrink-0 items-center gap-1.5 border border-rule px-2.5 sm:px-3",
          "text-[10px] uppercase tracking-[0.16em] text-charcoal-100",
          "transition-colors duration-150 motion-reduce:transition-none",
          "hover:border-bronze hover:text-bronze",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
          "after:absolute after:inset-x-0 after:-inset-y-[9px] after:content-['']",
          open && "border-bronze text-bronze",
        )}
      >
        <span className="hidden sm:inline">{ECOSYSTEM_COPY.cta}</span>
        <span className="sm:hidden">{ECOSYSTEM_COPY.ctaShort}</span>
        <ChevronDownIcon
          size={12}
          className={cn(
            "shrink-0 transition-transform duration-150 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      {mounted &&
        open &&
        createPortal(
          // `pointer-events-none` on the frame keeps the desktop page behind
          // the popover fully interactive; only the sheet backdrop and the
          // panel itself opt back in.
          <div className="pointer-events-none fixed inset-0 z-[80]">
            {/* Sheet scrim (mobile only). It deliberately starts below the
                ecosystem bar rather than at inset-0: the bar must stay
                visible at all times, and leaving it uncovered keeps the
                trigger a real toggle instead of something the scrim
                swallows. Tapping the scrim still dismisses. */}
            <div
              aria-hidden="true"
              className="pointer-events-auto absolute inset-x-0 bottom-0 top-[var(--ecosystem-bar-height)] bg-charcoal/25 md:hidden"
            />

            {/* Positioning frame. Mirrors the site's `wide` container so the
                popover's right edge lands on the same grid line as the header
                nav; full-bleed on mobile, where it is a bottom sheet. */}
            <div className="absolute inset-x-0 bottom-0 md:bottom-auto md:top-[calc(var(--ecosystem-bar-height)+0.5rem)]">
              <div className="mx-auto flex w-full max-w-[88rem] justify-end md:px-8 lg:px-12">
                <div
                  ref={panelRef}
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${ECOSYSTEM_COPY.identity} — all products`}
                  className={cn(
                    "pointer-events-auto w-full overflow-y-auto overscroll-contain bg-white",
                    "border-t border-rule shadow-[0_-12px_40px_-28px_rgba(15,20,25,0.45)]",
                    "max-h-[82vh] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4",
                    "md:w-[min(46rem,100%)] md:border md:px-6 md:pb-6 md:pt-5",
                    "md:shadow-[0_18px_50px_-28px_rgba(15,20,25,0.4)]",
                    "md:max-h-[calc(100vh-var(--ecosystem-bar-height)-3rem)]",
                  )}
                >
                  <div className="mb-4 flex items-start justify-between gap-4 border-b border-rule pb-3">
                    <div className="min-w-0">
                      <p className="font-serif text-[15px] text-charcoal">
                        {ECOSYSTEM_COPY.identity}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-stone">
                        {ECOSYSTEM_COPY.tagline}
                      </p>
                    </div>
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      className={cn(
                        "-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-stone",
                        "transition-colors duration-150 motion-reduce:transition-none hover:text-charcoal",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
                      )}
                    >
                      <CloseIcon size={18} />
                      <span className="sr-only">Close product directory</span>
                    </button>
                  </div>

                  <EcosystemDirectory />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
