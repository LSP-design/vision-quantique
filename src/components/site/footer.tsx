import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <footer className="bg-brand-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              {t("tagline")}
            </p>
            <p className="mt-6 inline-flex items-start gap-2.5 rounded-2xl bg-white/[0.06] px-5 py-3.5 text-sm font-semibold text-white/85">
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-electric"
                aria-hidden="true"
              />
              {t("cmeqNote")}
            </p>
          </div>

          <nav aria-label={t("navigation")} className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-extrabold text-white/40">
              {t("navigation")}
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className="text-white/70 transition-colors hover:text-brand-electric">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/70 transition-colors hover:text-brand-electric">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white/70 transition-colors hover:text-brand-electric">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 transition-colors hover:text-brand-electric">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t("services")} className="lg:col-span-2">
            <h3 className="mb-5 text-sm font-extrabold text-white/40">
              {t("services")}
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="/services/residentiel"
                  className="text-white/70 transition-colors hover:text-brand-electric"
                >
                  {tNav("residential")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-white/70 transition-colors hover:text-brand-electric"
                >
                  {tNav("commercial")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/industriel"
                  className="text-white/70 transition-colors hover:text-brand-electric"
                >
                  {tNav("industrial")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="mb-5 text-sm font-extrabold text-white/40">
              {t("contact")}
            </h3>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 font-bold text-white transition-colors hover:text-brand-electric"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-brand-electric"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/70">
                <MapPin className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                {/* TODO: confirmer la zone de service exacte avec le client */}
                {tCommon("serviceArea")}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45">
          <p>
            © {new Date().getFullYear()} {tCommon("companyName")}. {t("rights")}
          </p>
          <p>
            {site.owner} — {tCommon("masterElectrician")}
          </p>
        </div>
      </div>
    </footer>
  );
}
