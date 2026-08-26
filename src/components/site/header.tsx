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
    <header className="sticky top-0 z-50 border-b border-brand-navy/8 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={tCommon("companyName")} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors",
                pathname === item.href
                  ? "bg-brand-electric/10 text-brand-electric-dark"
                  : "text-brand-navy/75 hover:bg-brand-soft hover:text-brand-navy"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-brand-navy/12 px-4 py-2.5 text-sm font-bold text-brand-navy transition-all hover:border-brand-electric hover:text-brand-electric-dark"
          >
            <Phone className="h-4 w-4 text-brand-electric" aria-hidden="true" />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-brand-amber px-5 py-2.5 text-sm font-bold text-brand-navy shadow-lg shadow-brand-amber/25 transition-all hover:scale-[1.03] hover:bg-brand-amber-dark"
          >
            {tCommon("freeQuoteShort")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/12 text-brand-navy"
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
                    "block rounded-xl px-4 py-3 text-base font-semibold",
                    pathname === item.href
                      ? "bg-brand-electric/10 text-brand-electric-dark"
                      : "text-brand-navy hover:bg-brand-soft"
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
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
      className="inline-flex items-center rounded-full px-3 py-2 text-sm font-bold text-brand-navy/55 transition-colors hover:text-brand-electric-dark"
    >
      {locale === "fr" ? "EN" : "FR"}
      <span className="sr-only">{t("switchLocale")}</span>
    </Link>
  );
}
