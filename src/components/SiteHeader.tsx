import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Heart } from "lucide-react";

import { navigation, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  /* Sobre o hero da home o header é transparente com texto claro. */
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent py-4"
          : "bg-background/95 py-2 shadow-soft backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={`${site.name} — página inicial`}
        >
          <img
            src="/img/logo-inav-header.png"
            alt={`Logotipo do ${site.name}`}
            className={cn(
              "w-auto transition-all duration-300",
              transparent ? "h-14 brightness-0 invert" : "h-12",
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-wide transition-colors",
                  active
                    ? "bg-brand-green text-white"
                    : transparent
                      ? "text-white/90 hover:bg-white/15 hover:text-white"
                      : "text-foreground/75 hover:bg-secondary hover:text-brand-blue-deep",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/quer-ajudar"
            className="warm-gradient hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-cta transition-transform duration-200 hover:scale-[1.04] md:inline-flex"
          >
            <Heart className="size-4" aria-hidden="true" />
            Doar
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              transparent
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-secondary text-brand-blue-deep hover:bg-brand-blue-soft",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
            aria-label="Navegação móvel"
          >
            <div className="mx-4 mt-3 space-y-1 rounded-2xl bg-background p-3 shadow-lift sm:mx-6">
              {navigation.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors",
                      active
                        ? "bg-brand-green text-white"
                        : "text-foreground/80 hover:bg-secondary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
