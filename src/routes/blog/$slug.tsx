import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, FileText, PlayCircle } from "lucide-react";

import { Cena, Ilustracao } from "@/components/Ilustracao";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { Compartilhar } from "@/components/blog/Compartilhar";
import { CorpoDoPost } from "@/components/blog/CorpoDoPost";
import { TipoSelo } from "@/components/blog/TipoSelo";
import { buscarPost, formatarData, infoDoTipo, paginasDoSite } from "@/lib/blog";
import { site } from "@/lib/site-config";
import { stagger } from "@/lib/motion-presets";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const dados = await buscarPost({ data: params.slug });
    if (!dados) throw notFound();
    return dados;
  },
  head: ({ loaderData }) => {
    // Endereço que não existe: a aba ganha título mesmo assim.
    if (!loaderData) return { meta: [{ title: "Notícia não encontrada — Blog do INAV" }] };
    const { post } = loaderData;
    const titulo = `${post.titulo} — Blog do INAV`;
    // Até 158 caracteres, como pede a especificação: o resto o Google corta.
    const descricao =
      post.resumo.length > 158 ? `${post.resumo.slice(0, 157).trimEnd()}…` : post.resumo;
    const artigo = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: post.titulo,
      description: descricao,
      datePublished: post.publicadoEm,
      ...(post.capa ? { image: [post.capa.compartilhar] } : {}),
      publisher: { "@type": "Organization", name: site.name },
    };
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { property: "og:type", content: "article" },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
        { property: "article:published_time", content: post.publicadoEm },
        ...(post.capa ? [{ property: "og:image", content: post.capa.compartilhar }] : []),
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(artigo) }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <section className="bg-background px-4 pb-24 pt-40 text-center">
      <h1 className="text-3xl font-extrabold uppercase text-brand-blue-deep">
        Notícia não encontrada
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        O endereço pode ter mudado ou a notícia saiu do ar.
      </p>
      <Link
        to="/blog"
        hash="noticias"
        className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Todas as notícias
      </Link>
    </section>
  ),
});

function PostPage() {
  const { post, relacionados } = Route.useLoaderData();
  const tipo = infoDoTipo(post.tipo).title;

  return (
    <article>
      <PageHero
        compact
        title={post.titulo}
        // O título da notícia fica em caixa baixa, como no layout; o das seções segue em caixa alta.
        titleClassName="normal-case lg:text-[3.25rem] lg:leading-[1.05]"
        description={post.resumo}
        topo={
          <div className="flex flex-col items-start gap-4">
            <nav aria-label="Trilha">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                <li>
                  <Link
                    to="/blog"
                    className="font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>{tipo}</li>
              </ol>
            </nav>
            <TipoSelo tipo={post.tipo} className="bg-white text-brand-blue-deep" />
          </div>
        }
        actions={
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-brand-green-light" aria-hidden="true" />
              <time dateTime={post.publicadoEm}>{formatarData(post.publicadoEm)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-brand-green-light" aria-hidden="true" />
              {post.minutosDeLeitura} min de leitura
            </span>
          </p>
        }
      />

      <div className="relative isolate bg-background pb-16 sm:pb-20">
        <Ilustracao
          nome="joaninha"
          className="absolute right-[6%] top-[28rem] -z-10 hidden w-10 xl:block"
        />

        {/* A capa sobe sobre a onda do topo, como no layout. */}
        {post.capa && (
          <figure className="relative z-10 mx-auto -mt-12 max-w-5xl px-4 sm:-mt-20 sm:px-6">
            <img
              src={post.capa.media}
              alt={post.capa.alt}
              width={1400}
              style={post.capa.lqip ? { backgroundImage: `url(${post.capa.lqip})` } : undefined}
              className="max-h-[36rem] w-full rounded-[28px] bg-cover object-cover shadow-lift"
            />
            {(post.capa.legenda || post.capa.credito) && (
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {post.capa.legenda && (
                  <span className="font-semibold text-brand-blue-deep">{post.capa.legenda} </span>
                )}
                {post.capa.credito && `Foto: ${post.capa.credito}.`}
              </figcaption>
            )}
          </figure>
        )}

        <div className="mx-auto max-w-[740px] px-4 pt-6 sm:px-6 sm:pt-10">
          <CorpoDoPost valor={post.corpo} />

          {post.paginaRelacionada && (
            <Link
              to={post.paginaRelacionada.rota}
              className="group mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-lift sm:flex-nowrap sm:p-6"
            >
              <FileText
                className="size-6 shrink-0 text-brand-blue"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-display font-bold text-brand-blue-deep">
                  {paginasDoSite[post.paginaRelacionada.rota]}
                </span>
                {post.paginaRelacionada.descricao && (
                  <span className="text-sm text-muted-foreground">
                    {post.paginaRelacionada.descricao}
                  </span>
                )}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-blue">
                Abrir a página
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          )}

          {(post.fonteTexto || post.linkOriginal) && (
            <p className="mt-6 text-muted-foreground">
              Fonte:{" "}
              {post.linkOriginal ? (
                <a
                  href={post.linkOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
                >
                  {post.fonteTexto ?? "publicação original"}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              ) : (
                post.fonteTexto
              )}
              .
            </p>
          )}

          {post.video && (
            <a
              href={post.video}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
            >
              <PlayCircle className="size-4" aria-hidden="true" />
              Assistir ao vídeo
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          )}

          <div className="mt-10 border-t border-border pt-8">
            <Compartilhar titulo={post.titulo} />
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section
          className="relative isolate overflow-hidden bg-surface-tint py-16 sm:py-20"
          aria-labelledby="titulo-relacionados"
        >
          <Ilustracao
            nome="passarinho"
            className="absolute left-[4%] top-8 -z-10 hidden w-12 xl:block"
          />
          <Cena nome="duas-nuvens" className="right-[6%] top-14 hidden w-28 xl:block" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div id="titulo-relacionados">
                <SectionHeading eyebrow="Leia também" title="Outras" highlight="notícias" />
              </div>
              <Link
                to="/blog"
                hash="noticias"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue-deep hover:text-brand-blue"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Todas as notícias
              </Link>
            </div>
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
    </article>
  );
}
