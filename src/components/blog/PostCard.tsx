import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { TipoSelo } from "@/components/blog/TipoSelo";
import { formatarData, infoDoTipo, type PostResumo } from "@/lib/blog";
import { fadeUp } from "@/lib/motion-presets";

// Sem foto, o topo do card vira uma capa só de texto, na cor do tipo (contraste conferido para letra grande).
const capaSemFoto = {
  laranja: "bg-brand-orange text-white",
  azul: "bg-brand-blue-soft text-brand-blue-deep",
  verde: "bg-brand-blue-deep text-brand-green-light",
} as const;

/** Card da linha do tempo. Com foto, o tipo vai num selo; sem foto, vira a capa do card. */
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
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        {/* Sem foto, a capa de texto fica mais baixa no celular para a lista não ficar comprida demais. */}
        <div
          className={`relative overflow-hidden bg-brand-blue-soft ${post.capa ? "aspect-[16/10]" : "aspect-[5/2] sm:aspect-[16/10]"}`}
        >
          {post.capa ? (
            <img
              src={post.capa.card}
              alt=""
              loading="lazy"
              width={800}
              height={500}
              style={post.capa.lqip ? { backgroundImage: `url(${post.capa.lqip})` } : undefined}
              className="size-full bg-cover object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <p
              className={`flex size-full items-end p-5 text-2xl font-extrabold uppercase leading-[1.05] text-balance-pretty sm:text-3xl ${capaSemFoto[infoDoTipo(post.tipo).tom]}`}
            >
              {infoDoTipo(post.tipo).title}
            </p>
          )}
          {post.capa && <TipoSelo tipo={post.tipo} className="absolute left-3 top-3" />}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-brand-blue-deep text-balance-pretty">
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
