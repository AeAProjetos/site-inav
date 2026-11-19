import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { aparenciaDoTipo } from "@/components/blog/aparencia";
import { TipoSelo } from "@/components/blog/TipoSelo";
import { formatarData, infoDoTipo, type PostResumo } from "@/lib/blog";
import { fadeUp } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/**
 * Capa da publicação: a foto, com o selo do tipo, ou, sem foto autorizada, a capa gráfica na cor
 * do tipo, com o ícone, o nome do tipo e o tema. A capa gráfica é decorativa (aria-hidden): o título
 * do card já diz tudo.
 */
export function CapaDoPost({
  post,
  className,
  temaClassName,
  semSelo,
}: {
  post: PostResumo;
  className?: string;
  temaClassName?: string;
  /** No destaque o selo já aparece ao lado do título. */
  semSelo?: boolean;
}) {
  if (post.capa) {
    return (
      <div className={cn("relative overflow-hidden bg-brand-blue-soft", className)}>
        <img
          src={post.capa.card}
          alt=""
          loading="lazy"
          width={800}
          height={500}
          style={post.capa.lqip ? { backgroundImage: `url(${post.capa.lqip})` } : undefined}
          className="size-full bg-cover object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!semSelo && <TipoSelo tipo={post.tipo} className="absolute left-3 top-3" />}
      </div>
    );
  }
  const { cor, icone: Icone } = aparenciaDoTipo(post.tipo);
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex flex-col justify-between overflow-hidden p-5",
        cor,
        className,
      )}
    >
      <span className="absolute -bottom-16 -right-10 -z-10 size-48 rounded-full bg-current opacity-10" />
      <Icone className="size-7" strokeWidth={1.8} />
      <span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] opacity-90">
          {infoDoTipo(post.tipo).title}
        </span>
        <span
          className={cn(
            "mt-1 block font-display text-2xl font-extrabold uppercase leading-[1.05]",
            temaClassName,
          )}
        >
          {post.temaCapa ?? infoDoTipo(post.tipo).title}
        </span>
      </span>
    </div>
  );
}

/** Card da grade de notícias: inteiro clicável, sobe um pouco ao passar o mouse. */
export function PostCard({ post }: { post: PostResumo }) {
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <CapaDoPost post={post} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-bold leading-snug text-brand-blue-deep text-balance-pretty">
            {post.titulo}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.resumo}
          </p>
          <time
            dateTime={post.publicadoEm}
            className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wide text-brand-blue"
          >
            {formatarData(post.publicadoEm)}
          </time>
        </div>
      </Link>
    </motion.li>
  );
}
