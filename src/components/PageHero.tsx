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
  /** Foto (ou outro elemento) exibida à direita do texto no desktop e abaixo dele no celular. */
  aside?: ReactNode;
};

/** Cabeçalho padrão das páginas internas, com a curva orgânica da marca. */
export function PageHero({ eyebrow, title, highlight, description, aside }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-blue-deep pb-4 pt-32 sm:pt-40">
      <div
        className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-blue/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 left-1/4 size-80 rounded-full bg-brand-green/15 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className={cn(
          "relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8",
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
            // Sem cn() aqui: o tailwind-merge confunde text-balance-pretty com cor e descarta o text-white.
            // Com foto ao lado a coluna de texto é mais estreita; título menor para caber em 2 linhas.
            className={`max-w-3xl text-4xl font-extrabold uppercase leading-[1] text-white text-balance-pretty sm:text-5xl ${
              aside ? "lg:text-[2.5rem] xl:text-[2.75rem]" : "lg:text-6xl"
            }`}
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
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            {description}
          </motion.p>
        </div>

        {aside && (
          <motion.div
            variants={fadeUp}
            className="aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-lift lg:max-w-none"
          >
            {aside}
          </motion.div>
        )}
      </motion.div>

      <WaveDivider variant="down" className="text-background" height="md" />
    </section>
  );
}
