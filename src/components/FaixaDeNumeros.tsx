import type { ReactNode } from "react";
import { motion } from "motion/react";

import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type FaixaDeNumerosProps = {
  rotulo: string;
  /** Título com o destaque em verde já marcado, ex.: <>Mais de <span>12 mil</span>...</>. */
  titulo: ReactNode;
  numeros: { valor: string; rotulo: string }[];
  /** Foto de fundo, sob o véu azul. */
  foto: { src: string; className?: string };
  /** Nota de rodapé da faixa (fontes, método). */
  nota?: ReactNode;
  /** Números longos (ex.: "R$ 16,57 mi") usam um corpo menor para caber em quatro colunas. */
  valoresLongos?: boolean;
  children?: ReactNode;
};

/** Faixa azul sobre foto com quatro números grandes. Usada em Projetos e Transparência. */
export function FaixaDeNumeros({
  rotulo,
  titulo,
  numeros,
  foto,
  nota,
  valoresLongos,
  children,
}: FaixaDeNumerosProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-blue-deep py-20 text-white sm:py-28">
      <img
        src={foto.src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={cn("absolute inset-0 -z-10 size-full object-cover", foto.className)}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-deep/95 to-brand-blue-deep/85"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} {...revealOnScroll}>
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
          >
            {rotulo}
          </motion.p>
          {/* text-balance-pretty fora do cn(): o tailwind-merge acha que é cor. */}
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-extrabold uppercase leading-[1.05] text-balance-pretty sm:text-4xl lg:text-5xl [&_span]:text-brand-green-light"
          >
            {titulo}
          </motion.h2>
        </motion.div>

        <motion.dl
          variants={stagger}
          {...revealOnScroll}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8"
        >
          {numeros.map((numero) => (
            // Na tela o número vem primeiro; para o leitor de tela, o rótulo (dt) vem antes.
            <motion.div
              key={numero.rotulo}
              variants={fadeUp}
              className="flex flex-col-reverse justify-end border-t border-white/25 pt-5"
            >
              <dt className="mt-3 text-sm leading-snug text-white/85 sm:text-base">
                {numero.rotulo}
              </dt>
              <dd
                className={cn(
                  "font-display font-extrabold leading-none tracking-tight text-brand-green-light",
                  valoresLongos ? "text-[1.7rem] sm:text-4xl xl:text-5xl" : "text-4xl sm:text-5xl",
                )}
              >
                {numero.valor}
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        {nota && <p className="mt-10 text-sm text-white/65">{nota}</p>}
        {children}
      </div>
    </section>
  );
}
