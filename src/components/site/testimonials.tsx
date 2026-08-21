import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "./reveal";

type Testimonial = {
  quote: string;
  author: string;
  context: string;
};

/*
 * TODO: valider les témoignages avec le client avant publication.
 * Ne PAS inventer de faux témoignages avec de vrais noms — la section
 * reste masquée tant que la liste ci-dessous est vide.
 *
 * Exemple de format attendu :
 * { quote: "…", author: "Prénom N.", context: "Projet résidentiel, Montréal" }
 */
const testimonials: Testimonial[] = [];

export function Testimonials({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-brand-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-brand-navy sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-brand-dark/70">
            {subtitle}
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={item.author} delay={i * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote
                    className="mb-4 h-8 w-8 text-brand-electric"
                    aria-hidden="true"
                  />
                  <blockquote className="mb-4 text-brand-dark/80">
                    « {item.quote} »
                  </blockquote>
                  <footer className="text-sm">
                    <span className="font-semibold text-brand-navy">
                      {item.author}
                    </span>
                    <span className="block text-brand-dark/60">
                      {item.context}
                    </span>
                  </footer>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
