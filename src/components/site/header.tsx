"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navItems: { key: string; href: AppPathname }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "about", href: "/a-propos" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md">
      {/* Barre utilitaire — licence + coordonnées */}
      <div className="hidden bg-brand-navy-deep text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs xl:px-8">
          <p className="flex items-center gap-2 font-medium tracking-wide text-white/80">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-electric" aria-hidden="true" />
            {tCommon("masterElectrician")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={site.emailHref}
              className="flex items-center gap-1.5 text-white/70 transition-colors hover:text-brand-electric"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-brand-electric"
            >
              <Phone className="h-3.5 w-3.5 text-brand-electric" aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div className="border-b border-brand-navy/10">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
          <Link href="/" aria-label={tCommon("companyName")} onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                  pathname === item.href
                    ? "text-brand-electric-dark after:absolute after:inset-x-4 after:-bottom-[1.35rem] after:h-0.5 after:bg-brand-electric"
                    : "text-brand-navy/75 hover:text-brand-navy"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LocaleSwitcher />
            <Link
              href="/contact"
              className="inline-flex h-10 items-center rounded-sm bg-brand-amber px-5 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-brand-navy transition-colors hover:bg-brand-amber-dark"
            >
              {tCommon("requestQuote")}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={site.phoneHref}
              aria-label={tCommon("callUs")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-brand-amber text-brand-navy"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-brand-navy/15 text-brand-navy"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          className="border-b border-brand-navy/10 bg-white px-4 py-4 lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.key} className="border-b border-brand-navy/8 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-1 py-3.5 text-sm font-semibold uppercase tracking-[0.12em]",
                    pathname === item.href
                      ? "text-brand-electric-dark"
                      : "text-brand-navy"
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between pt-4">
              <LocaleSwitcher />
              <a
                href={site.phoneHref}
                className="text-sm font-bold text-brand-navy"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function LocaleSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <Link
      href={pathname as AppPathname}
      locale={locale === "fr" ? "en" : "fr"}
      className="inline-flex items-center px-2 py-1 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-navy/60 transition-colors hover:text-brand-electric-dark"
    >
      {locale === "fr" ? "EN" : "FR"}
      <span className="sr-only">{t("switchLocale")}</span>
    </Link>
  );
}
