type RequestErrorContext = {
  path?: string;
  method?: string;
};

/**
 * Journalise le détail complet des erreurs serveur (utile pour diagnostiquer
 * les plantages spécifiques à l'infra de build/runtime Vercel).
 */
export async function onRequestError(
  err: Error & { digest?: string; cause?: unknown },
  request: RequestErrorContext,
  context: unknown
) {
  console.error(
    "[onRequestError]",
    JSON.stringify(
      {
        path: request?.path,
        method: request?.method,
        message: err?.message,
        digest: err?.digest,
        stack: err?.stack,
        cause: err?.cause,
        context,
      },
      null,
      2
    )
  );
}
