import { useTranslations } from "next-intl";
import { Phone, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

/**
 * Barre d'action fixe en bas d'écran sur mobile — appel direct et
 * demande de soumission toujours à portée de pouce.
 */
export function MobileCtaBar() {
  const t = useTranslations("common");

  return (
    <>
      {/* Espace réservé pour ne pas masquer le bas de page */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-brand-navy/10 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <a
          href={site.phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-navy text-sm font-bold text-white transition-transform active:scale-95"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {t("callUs")}
        </a>
        <Link
          href="/contact"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-amber text-sm font-bold text-brand-navy transition-transform active:scale-95"
        >
          <Zap className="h-4 w-4" aria-hidden="true" />
          {t("freeQuoteShort")}
        </Link>
      </div>
    </>
  );
}
