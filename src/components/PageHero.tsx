import { motion } from "motion/react";

import { EASE_SOFT, fadeUp, stagger } from "@/lib/motion-presets";
import { WaveDivider } from "@/components/WaveDivider";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  /** Título menor, para títulos longos como o de uma publicação do blog. */
  compact?: boolean;
};

/** Cabeçalho padrão das páginas internas, com a curva orgânica da marca. */
export function PageHero({ eyebrow, title, highlight, description, compact }: PageHeroProps) {
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
        className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          // text-balance-pretty fica fora do cn(): o tailwind-merge acha que é cor e apagaria o text-white.
          className={`${cn(
            "mt-3 max-w-3xl font-extrabold uppercase text-white",
            compact
              ? "text-3xl leading-[1.08] sm:text-4xl lg:text-5xl"
              : "text-4xl leading-[1] sm:text-5xl lg:text-6xl",
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
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
        >
          {description}
        </motion.p>
      </motion.div>

      <WaveDivider variant="down" className="text-background" height="md" />
    </section>
  );
}
