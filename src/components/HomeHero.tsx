import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";

import { site } from "@/lib/site-config";
import { EASE_SOFT, fadeUp, stagger } from "@/lib/motion-presets";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-brand-blue-deep">
      {/* Foto de capa em full-bleed */}
      <motion.img
        src="/img/hero-bg.jpg"
        alt="Educadora do INAV contando histórias para um grupo de crianças sentadas na sombra de uma árvore"
        className="absolute inset-0 size-full object-cover object-right"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE_SOFT }}
      />

      {/* Véu azul em degradê, saindo da esquerda */}
      <div className="hero-veil absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-40 pt-32 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-lg font-bold tracking-tight text-brand-orange sm:text-xl"
          >
            {site.name}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-3 text-4xl font-extrabold uppercase leading-[0.98] text-white text-balance-pretty sm:text-6xl lg:text-7xl"
          >
            Cuidado que acolhe.
            <br />
            <span className="text-brand-green-light">Educação que transforma.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-lg text-lg font-medium leading-relaxed text-white/90 sm:text-xl"
          >
            Educação, cuidado e oportunidades para o desenvolvimento integral de crianças
            e famílias.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/quer-ajudar"
              className="warm-gradient inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-cta transition-transform duration-200 hover:scale-[1.04]"
            >
              <Heart className="size-4" aria-hidden="true" />
              Quero ajudar
            </Link>
            <Link
              to="/quem-somos"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15"
            >
              Conheça o instituto
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bloco laranja ancorado na base, como no mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: EASE_SOFT }}
        className="absolute bottom-0 right-0 z-10 hidden lg:block"
      >
        <Link
          to="/quer-ajudar"
          className="warm-gradient group flex items-center gap-4 rounded-tl-[3rem] py-8 pl-14 pr-10 text-2xl font-extrabold uppercase tracking-tight text-white shadow-cta xl:text-3xl"
        >
          Seja um doador
          <ArrowRight
            className="size-7 transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>

      {/* Curva orgânica azul na base esquerda */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 text-brand-blue-deep"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="h-24 w-full md:h-32">
          <path
            d="M0,50 C220,140 460,150 700,120 C900,95 1080,120 1440,150 L1440,160 L0,160 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
