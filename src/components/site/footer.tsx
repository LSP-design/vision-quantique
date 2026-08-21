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
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo light />
            <p className="text-sm leading-relaxed text-white/70">{t("tagline")}</p>
            <p className="flex items-start gap-2 text-sm text-brand-electric">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {t("cmeqNote")}
            </p>
          </div>

          <nav aria-label={t("navigation")}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
              {t("navigation")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-brand-electric">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/80 hover:text-brand-electric">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-white/80 hover:text-brand-electric">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-brand-electric">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={t("services")}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
              {t("services")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services/residentiel"
                  className="text-white/80 hover:text-brand-electric"
                >
                  {tNav("residential")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/commercial"
                  className="text-white/80 hover:text-brand-electric"
                >
                  {tNav("commercial")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/industriel"
                  className="text-white/80 hover:text-brand-electric"
                >
                  {tNav("industrial")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/50">
              {t("contact")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 text-white/80 hover:text-brand-electric"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-2.5 text-white/80 hover:text-brand-electric"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-white/80">
                <MapPin className="h-4 w-4 shrink-0 text-brand-electric" aria-hidden="true" />
                {/* TODO: confirmer la zone de service exacte avec le client */}
                {tCommon("serviceArea")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {tCommon("companyName")} — {site.owner},{" "}
          {tCommon("masterElectrician")}. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
