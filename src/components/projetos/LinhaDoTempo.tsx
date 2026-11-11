import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";

import { SeloStatus, type Status } from "@/components/projetos/SeloStatus";
import { fadeUp, revealOnScroll } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export type Acao = {
  periodo: string;
  titulo: string;
  status: Status;
  texto: string;
  /** Número em destaque, ex.: "540 atendimentos". */
  numero?: string;
  detalhes: {
    rotulo: "O que aconteceu" | "Quem foi atendido" | "Por que importou";
    texto: string;
  }[];
  fonte: string;
  /** Marca Pending com o que o INAV ainda precisa confirmar sobre esta ação. */
  aviso?: ReactNode;
};

export type Epoca = {
  periodo: string;
  titulo: string;
  /** Legenda e origem da foto. */
  legenda: string;
  foto: { src: string; alt: string; className?: string };
  acoes: Acao[];
};

/**
 * Uma foto grande por época e, ao lado, as ações daquele período num único painel.
 * A foto alterna de lado a cada época e acompanha a rolagem enquanto as ações passam.
 */
export function LinhaDoTempo({ epocas }: { epocas: Epoca[] }) {
  return (
    <ol className="flex flex-col gap-16 lg:gap-24">
      {epocas.map((epoca, indice) => (
        <li
          key={epoca.periodo}
          className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-12"
        >
          <motion.figure
            variants={fadeUp}
            {...revealOnScroll}
            className={cn(
              // w-full: com o max-h, o 4:5 encolheria a largura e a foto não chegaria à borda da coluna.
              "relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-surface-tint shadow-lift sm:aspect-[16/9] lg:sticky lg:top-28 lg:aspect-[4/5] lg:max-h-[calc(100vh-9rem)]",
              indice % 2 === 1 && "lg:order-2",
            )}
          >
            <img
              src={epoca.foto.src}
              alt={epoca.foto.alt}
              loading="lazy"
              decoding="async"
              className={cn("absolute inset-0 size-full object-cover", epoca.foto.className)}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-deep/90 via-brand-blue-deep/60 to-transparent px-6 pb-6 pt-20 text-white sm:px-7 sm:pb-7">
              <span className="inline-block rounded-full bg-brand-green-light px-3 py-1 font-display text-xs font-extrabold tracking-[0.06em] text-brand-blue-deep">
                {epoca.periodo}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold uppercase leading-[1.05] sm:text-3xl">
                {epoca.titulo}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                {epoca.legenda}
              </p>
            </figcaption>
          </motion.figure>

          <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {epoca.acoes.map((acao) => (
              <ItemDaAcao key={acao.titulo} acao={acao} />
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function ItemDaAcao({ acao }: { acao: Acao }) {
  return (
    <motion.li variants={fadeUp} {...revealOnScroll} className="px-6 py-6 sm:px-7">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <p className="font-display text-sm font-extrabold tracking-[0.04em] text-brand-green">
          {acao.periodo}
        </p>
        <SeloStatus status={acao.status} />
      </div>
      <h4 className="mt-2 text-lg font-extrabold uppercase leading-tight text-brand-blue-deep">
        {acao.titulo}
      </h4>
      <p className="mt-1.5 leading-relaxed text-muted-foreground">{acao.texto}</p>
      {acao.numero && (
        <p className="mt-3 inline-flex rounded-full bg-surface-tint px-3 py-1 text-sm font-bold text-brand-blue-deep">
          {acao.numero}
        </p>
      )}
      {acao.aviso && <div className="mt-3">{acao.aviso}</div>}

      <details className="group mt-4 border-t border-border pt-3">
        <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded text-sm font-bold text-brand-blue transition-colors hover:text-brand-blue-deep [&::-webkit-details-marker]:hidden">
          Ver detalhes
          <Plus className="size-4 group-open:hidden" aria-hidden="true" />
          <Minus className="hidden size-4 group-open:block" aria-hidden="true" />
        </summary>
        <dl className="mt-3 space-y-3">
          {acao.detalhes.map((detalhe) => (
            <div key={detalhe.rotulo}>
              <dt className="text-xs font-bold uppercase tracking-[0.1em] text-brand-blue-deep">
                {detalhe.rotulo}
              </dt>
              <dd className="mt-0.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                {detalhe.texto}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">Fonte: {acao.fonte}</p>
      </details>
    </motion.li>
  );
}
