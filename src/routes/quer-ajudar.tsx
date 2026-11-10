import { createFileRoute, redirect } from "@tanstack/react-router";

/** Endereço antigo da página Amigos INAV: mantido para não quebrar links já divulgados. */
export const Route = createFileRoute("/quer-ajudar")({
  beforeLoad: () => {
    throw redirect({ to: "/amigos-inav", statusCode: 301 });
  },
});
