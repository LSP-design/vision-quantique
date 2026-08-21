# Électricité Vision Quantique — Site web officiel

Site web professionnel bilingue (FR/EN) pour **Électricité Vision Quantique**, entreprise d'électricité résidentielle, commerciale et industrielle au Grand Montréal, dirigée par **Leroy Joseph, Maître Électricien certifié CMEQ**.

## Stack technique

- **Next.js 15** (App Router, TypeScript, pages statiques)
- **Tailwind CSS v4** — couleurs de marque configurées via `@theme` dans `src/app/globals.css`
- **next-intl** — bilinguisme FR (défaut) / EN avec URLs localisées (`/fr/a-propos` ↔ `/en/about`)
- **framer-motion** — animations d'apparition au défilement
- **lucide-react** — icônes
- Composants UI inspirés de **shadcn/ui** (`src/components/ui`)

Les polices (Space Grotesk + Inter) sont chargées via des balises `<link>` classiques dans le `<head>` plutôt que `next/font/google`, afin que le build fonctionne aussi dans les environnements sans accès réseau.

## Lancer le projet localement

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000) (redirection automatique vers `/fr`).

Pour valider le build de production :

```bash
npm run build
npm start
```

## Structure

```
messages/           Traductions FR et EN (tout le contenu du site)
src/i18n/           Configuration next-intl (locales, routes localisées)
src/app/[locale]/   Pages : accueil, services (+3 sous-pages), à propos, contact
src/app/api/contact Route API du formulaire de contact
src/components/     Composants site (header, footer, hero…) et UI de base
src/lib/site.ts     Coordonnées de l'entreprise (téléphone, courriel, zone)
```

## SEO

- Metadata complètes par page (title, description, Open Graph, hreflang)
- `sitemap.xml` et `robots.txt` générés dynamiquement (toutes les routes × 2 langues)
- Données structurées JSON-LD de type `Electrician` (référencement local Google)

## Formulaire de contact

La route `POST /api/contact` valide les champs et journalise chaque soumission. L'envoi de courriels via **Resend** est prêt mais désactivé par défaut : voir les commentaires dans `src/app/api/contact/route.ts` et `.env.example`.

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

- `NEXT_PUBLIC_SITE_URL` — URL publique du site (sitemap, Open Graph)
- `RESEND_API_KEY` / `CONTACT_EMAIL_TO` — optionnels, pour activer l'envoi de courriels

## Déployer sur Vercel

1. [vercel.com/new](https://vercel.com/new) → importer le repo `LSP-design/vision-quantique`
2. Preset **Next.js** (détecté automatiquement), aucune configuration supplémentaire requise
3. Ajouter la variable `NEXT_PUBLIC_SITE_URL` avec le domaine final
4. Déployer — chaque push sur `main` redéploie automatiquement

Les en-têtes de sécurité de base sont définis dans `vercel.json`.

## À confirmer avec le client

- Zone de service exacte (par défaut : « Grand Montréal et environs »)
- Nombre exact d'années d'expérience (placeholder : « Plus de 10 ans »)
- Heures d'ouverture
- Témoignages clients (la section existe mais reste masquée tant qu'aucun témoignage validé n'est fourni — voir `src/components/site/testimonials.tsx`)
- Logo vectoriel officiel (une recréation SVG du « V » éclair est utilisée en attendant)
