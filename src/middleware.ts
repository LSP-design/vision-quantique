import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Toutes les routes sauf les API, les internes Next.js et les fichiers statiques
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
  // Exécute le middleware sur le runtime Node.js plutôt que sur l'Edge
  // Runtime : contourne un plantage observé uniquement sur l'Edge Runtime réel
  // de Vercel (non reproductible en local), confirmé via les logs runtime
  // ("error/edge-middleware").
  runtime: "nodejs",
};
