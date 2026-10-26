import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { caminhoDoItem, conservacoes, formatarPreco, type ItemResumo } from "@/lib/bazar";
import { fadeUp } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/** Card da vitrine. Peça reservada fica em preto e branco com a etiqueta "Reservado". */
export function ItemCard({ item }: { item: ItemResumo }) {
  const detalhes = [conservacoes[item.conservacao], item.tamanho && `Tam. ${item.tamanho}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Link
        to="/bazar/$codigo"
        params={{ codigo: caminhoDoItem(item.codigo) }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-tint">
          <img
            src={item.foto.card}
            alt=""
            loading="lazy"
            width={640}
            height={480}
            style={item.foto.lqip ? { backgroundImage: `url(${item.foto.lqip})` } : undefined}
            className={cn(
              "size-full bg-cover object-cover transition-transform duration-500 group-hover:scale-105",
              item.reservado && "grayscale",
            )}
          />
          {item.reservado && (
            <span className="absolute left-2 top-2 rounded-full bg-brand-blue-deep px-2.5 py-1 text-[0.7rem] sm:left-3 sm:top-3 sm:px-3 sm:text-xs font-bold uppercase tracking-wide text-white">
              Reservado
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-5">
          <h3 className="text-sm font-bold leading-snug text-brand-blue-deep sm:text-base">
            {item.nome}
          </h3>
          {detalhes && <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{detalhes}</p>}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-1 pt-3 sm:pt-4">
            <p
              className={cn(
                "text-lg font-extrabold sm:text-xl",
                item.reservado ? "text-muted-foreground" : "text-brand-blue",
              )}
            >
              {formatarPreco(item.preco)}
            </p>
            {item.quantidade > 1 && (
              <p className="text-xs font-semibold text-muted-foreground">
                {item.quantidade} unidades
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
