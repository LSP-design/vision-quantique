"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Phone, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-brand-navy/8 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={tCommon("companyName")} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-electric",
                pathname === item.href
                  ? "text-brand-electric"
                  : "text-brand-navy"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-2.5 text-sm font-bold text-brand-navy shadow-lg shadow-brand-amber/20 transition-colors hover:bg-brand-amber-dark"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            href={site.phoneHref}
            aria-label={tCommon("callUs")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-amber text-brand-navy"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-navy/15 text-brand-navy"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-brand-navy/8 bg-white px-4 py-4 lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-base font-medium",
                    pathname === item.href
                      ? "bg-brand-electric/10 text-brand-electric"
                      : "text-brand-navy hover:bg-brand-cream"
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-brand-navy/8 pt-3">
              <LocaleSwitcher />
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
      className="inline-flex items-center rounded-lg border border-brand-navy/15 px-3 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-electric hover:text-brand-electric"
    >
      {t("switchLocale")}
    </Link>
  );
}
