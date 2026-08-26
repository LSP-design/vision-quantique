import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <Zap className="mb-6 h-12 w-12 text-brand-electric" aria-hidden="true" />
      <h1 className="mb-3 text-4xl font-extrabold text-brand-navy">
        {t("title")}
      </h1>
      <p className="mb-8 max-w-md text-brand-dark/70">{t("description")}</p>
      <Link
        href="/"
        className="rounded-full bg-brand-amber px-7 py-3.5 font-bold text-brand-navy shadow-lg shadow-brand-amber/25 transition-all hover:scale-[1.03] hover:bg-brand-amber-dark"
      >
        {t("back")}
      </Link>
    </section>
  );
}
