import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { listarPosts, tipos } from "@/lib/blog";
import { stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  loader: () => listarPosts(),
  head: () => ({
    meta: [
      { title: "Blog — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Avisos, campanhas, histórias e conquistas do Instituto Nair Valadares, da mais recente para a mais antiga.",
      },
      { property: "og:title", content: "Blog — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Acompanhe o que acontece no INAV: avisos, campanhas, histórias de transformação e parceiros.",
      },
    ],
  }),
  component: BlogPage,
});

const POR_VEZ = 9;

function BlogPage() {
  const { posts, erro } = Route.useLoaderData();
  const [tipo, setTipo] = useState<string | null>(null);
  const [mostrando, setMostrando] = useState(POR_VEZ);

  // Só mostra os filtros dos tipos que têm publicação no momento.
  const tiposComPosts = tipos.filter((t) => posts.some((p) => p.tipo === t.value));
  const filtrados = useMemo(
    () => (tipo ? posts.filter((p) => p.tipo === tipo) : posts),
    [posts, tipo],
  );
  const visiveis = filtrados.slice(0, mostrando);

  const escolher = (valor: string | null) => {
    setTipo(valor);
    setMostrando(POR_VEZ);
  };

  const filtro = (ativo: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      ativo
        ? "bg-brand-blue text-white"
        : "border border-border bg-background text-foreground/80 hover:border-brand-blue/40 hover:text-brand-blue-deep",
    );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="O que acontece no"
        highlight="INAV"
        description="Avisos, campanhas, histórias e conquistas do Instituto Nair Valadares, da mais recente para a mais antiga."
      />

      <section className="bg-background py-16 sm:py-20" aria-labelledby="titulo-linha-do-tempo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="titulo-linha-do-tempo" className="sr-only">
            Publicações
          </h2>

          {posts.length > 0 && tiposComPosts.length > 1 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
              <button
                type="button"
                className={filtro(tipo === null)}
                aria-pressed={tipo === null}
                onClick={() => escolher(null)}
              >
                Todas
              </button>
              {tiposComPosts.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={filtro(tipo === t.value)}
                  aria-pressed={tipo === t.value}
                  onClick={() => escolher(t.value)}
                >
                  {t.title}
                </button>
              ))}
            </div>
          )}

          {visiveis.length > 0 ? (
            <>
              <motion.ul
                key={tipo ?? "todas"}
                variants={stagger}
                initial="hidden"
                animate="show"
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visiveis.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </motion.ul>
              {filtrados.length > mostrando && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setMostrando((n) => n + POR_VEZ)}
                    className="rounded-full border border-brand-blue px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    Ver mais publicações
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-8 rounded-2xl bg-surface-tint px-6 py-14 text-center">
              <p className="text-lg font-semibold text-brand-blue-deep">
                {erro
                  ? "Não conseguimos carregar as publicações agora. Tente de novo em alguns minutos."
                  : "Ainda não há publicações por aqui."}
              </p>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                {erro
                  ? "Se o problema continuar, fale com a equipe do INAV."
                  : "Volte em breve: os avisos e as histórias do INAV aparecem aqui assim que forem publicados."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
