import { Reveal } from "./reveal";

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-electric-dark">
      <div className="circuit-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-electric/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <span className="mb-5 inline-block rounded-full border border-brand-electric/40 bg-brand-electric/10 px-4 py-1.5 text-sm font-semibold text-brand-electric">
            {badge}
          </span>
          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/80">
            {subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
