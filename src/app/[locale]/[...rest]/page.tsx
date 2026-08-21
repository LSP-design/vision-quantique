import { notFound } from "next/navigation";

// Attrape toutes les routes inconnues sous /[locale] et affiche la page 404 localisée
export default function CatchAllPage() {
  notFound();
}
