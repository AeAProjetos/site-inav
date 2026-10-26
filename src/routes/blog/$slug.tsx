import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, ExternalLink, PlayCircle } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Compartilhar } from "@/components/blog/Compartilhar";
import { CorpoDoPost } from "@/components/blog/CorpoDoPost";
import { buscarPost, formatarData, infoDoTipo } from "@/lib/blog";
import { stagger } from "@/lib/motion-presets";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const dados = await buscarPost({ data: params.slug });
    if (!dados) throw notFound();
    return dados;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const titulo = `${post.titulo} — Blog INAV`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: post.resumo },
        { property: "og:type", content: "article" },
        { property: "og:title", content: titulo },
        { property: "og:description", content: post.resumo },
        { property: "article:published_time", content: post.publicadoEm },
        ...(post.capa ? [{ property: "og:image", content: post.capa.compartilhar }] : []),
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <section className="bg-background px-4 pb-24 pt-40 text-center">
      <h1 className="text-3xl font-extrabold uppercase text-brand-blue-deep">
        Publicação não encontrada
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        O endereço pode ter mudado ou a publicação saiu do ar.
      </p>
      <Link
        to="/blog"
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Ver todas as publicações
      </Link>
    </section>
  ),
});

function PostPage() {
  const { post, relacionados } = Route.useLoaderData();

  return (
    <article>
      <PageHero
        compact
        eyebrow={infoDoTipo(post.tipo).title}
        title={post.titulo}
        description={post.resumo}
      />

      <div className="bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time dateTime={post.publicadoEm}>{formatarData(post.publicadoEm)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.minutosDeLeitura} min de leitura
            </span>
          </p>

          {post.capa && (
            <figure className="mt-8 overflow-hidden rounded-3xl bg-surface-tint">
              <img
                src={post.capa.media}
                alt={post.capa.alt}
                width={1400}
                style={post.capa.lqip ? { backgroundImage: `url(${post.capa.lqip})` } : undefined}
                className="w-full bg-cover object-cover"
              />
              {(post.capa.legenda || post.capa.credito) && (
                <figcaption className="px-4 py-2.5 text-xs text-muted-foreground">
                  {post.capa.legenda}
                  {post.capa.credito ? ` · Foto: ${post.capa.credito}` : ""}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mt-2">
            <CorpoDoPost valor={post.corpo} />
          </div>

          {(post.video || post.linkOriginal) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {post.video && (
                <a
                  href={post.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                >
                  <PlayCircle className="size-4" aria-hidden="true" />
                  Assistir ao vídeo
                </a>
              )}
              {post.linkOriginal && (
                <a
                  href={post.linkOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                >
                  Ver publicação original
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <Compartilhar titulo={post.titulo} />
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="bg-surface-tint py-16 sm:py-20" aria-labelledby="titulo-relacionados">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="titulo-relacionados"
              className="text-2xl font-extrabold uppercase leading-[1.05] text-brand-blue-deep sm:text-3xl"
            >
              Veja também
            </h2>
            <motion.ul
              variants={stagger}
              initial="hidden"
              animate="show"
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {relacionados.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      <div className="bg-background py-10 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Todas as publicações
        </Link>
      </div>
    </article>
  );
}
