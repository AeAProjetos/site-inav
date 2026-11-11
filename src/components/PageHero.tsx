import type { ReactNode } from "react";
import { motion } from "motion/react";

import { EASE_SOFT, fadeUp, stagger } from "@/lib/motion-presets";
import { WaveDivider } from "@/components/WaveDivider";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  /** Título menor, para títulos longos como o de uma publicação do blog. */
  compact?: boolean;
  /** Foto (ou outro elemento) exibida à direita do texto no desktop e abaixo dele no celular. */
  aside?: ReactNode;
  /** Substitui o enquadramento padrão (foto 4:3) do `aside`, para peças como um selo. */
  asideClassName?: string;
  /** Ajusta o tamanho do título, para títulos curtos que ficariam pequenos ao lado do `aside`. */
  titleClassName?: string;
  /** Botões e links logo abaixo da descrição. */
  actions?: ReactNode;
  /** Foto de fundo em tela cheia, com o véu azul por cima. Não combina com `aside`. */
  background?: {
    src: string;
    alt: string;
    /** Enquadramento da foto, ex.: "object-[center_35%]". */
    className?: string;
    /** Crédito da foto, no canto de baixo à direita. */
    credit?: string;
  };
};

/** Cabeçalho padrão das páginas internas, com a curva orgânica da marca. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  compact,
  aside,
  asideClassName,
  titleClassName,
  actions,
  background,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-blue-deep pt-32 sm:pt-40">
      {background ? (
        <>
          <img
            src={background.src}
            alt={background.alt}
            className={cn("absolute inset-0 size-full object-cover", background.className)}
          />
          {/* No celular o texto ocupa a largura toda: o véu fecha de baixo para cima. */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/85 to-brand-blue-deep/70 lg:hidden"
            aria-hidden="true"
          />
          <div className="hero-veil absolute inset-0 hidden lg:block" aria-hidden="true" />
        </>
      ) : (
        <>
          <div
            className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-blue/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 left-1/4 size-80 rounded-full bg-brand-green/15 blur-3xl"
            aria-hidden="true"
          />
        </>
      )}

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={cn(
          "relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8",
          background && "pb-20 lg:pb-28",
          aside &&
            "grid gap-10 lg:grid-cols-[1fr_minmax(0,380px)] lg:items-center xl:grid-cols-[1fr_minmax(0,460px)]",
        )}
      >
        <div>
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            // text-balance-pretty fica fora do cn(): o tailwind-merge acha que é cor e apagaria o text-white.
            // Com foto ao lado a coluna de texto é mais estreita; título menor para caber em 2 linhas.
            className={`${cn(
              "max-w-3xl font-extrabold uppercase text-white",
              compact
                ? "text-3xl leading-[1.08] sm:text-4xl lg:text-5xl"
                : "text-4xl leading-[1] sm:text-5xl",
              !compact && (aside ? "lg:text-[2.5rem] xl:text-[2.75rem]" : "lg:text-6xl"),
              titleClassName,
            )} text-balance-pretty`}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-brand-green-light">{highlight}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ ease: EASE_SOFT }}
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed",
              background ? "text-white/90" : "text-white/80",
            )}
          >
            {description}
          </motion.p>
          {actions && (
            <motion.div variants={fadeUp} className="mt-8">
              {actions}
            </motion.div>
          )}
        </div>

        {aside && (
          <motion.div
            variants={fadeUp}
            className={
              asideClassName ??
              "aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-lift lg:max-w-none"
            }
          >
            {aside}
          </motion.div>
        )}
      </motion.div>

      {background?.credit && (
        <p className="absolute bottom-20 right-4 text-xs text-white/70 sm:right-6 md:bottom-28 lg:right-8">
          {background.credit}
        </p>
      )}

      {/* relative: a onda fica por cima dos brilhos decorativos e termina rente ao fim do topo. */}
      <WaveDivider variant="down" className="relative -mb-px text-background" height="md" />
    </section>
  );
}
