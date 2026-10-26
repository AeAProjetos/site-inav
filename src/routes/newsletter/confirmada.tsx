import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/newsletter/confirmada")({
  head: () => ({
    meta: [
      { title: "Inscrição confirmada — Instituto Nair Valadares" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: InscricaoConfirmada,
});

/** Página aberta pelo link do e-mail de confirmação da newsletter. */
function InscricaoConfirmada() {
  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title="Inscrição"
        highlight="confirmada"
        description="Obrigado! A partir de agora você recebe por e-mail cada publicação nova do blog do INAV."
      />
      <section className="bg-background pb-24 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Para cancelar, é só clicar em “Não quero mais receber estes e-mails” no fim de qualquer
            mensagem.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Ver as publicações
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
