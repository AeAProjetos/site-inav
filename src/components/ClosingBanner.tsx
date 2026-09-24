import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, revealOnScroll } from "@/lib/motion-presets";

// Foto provisória — trocar pela foto definitiva do encerramento.
const CLOSING_IMAGE = "/img/hero_criancas.jpg";
const CLOSING_IMAGE_ALT = "Crianças brincando com blocos coloridos em sala de aula do INAV";

export function ClosingBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="relative h-64 sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[72%]">
        <img src={CLOSING_IMAGE} alt={CLOSING_IMAGE_ALT} className="size-full object-cover" />
        <div
          className="absolute inset-0 hidden bg-gradient-to-r from-background via-background/60 to-transparent lg:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:min-h-[520px] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <SectionHeading
            title={"Uma história que\nsegue em"}
            highlight="movimento."
            description="Conheça os projetos e iniciativas que fazem parte da atuação do INAV e veja como você também pode contribuir."
          />

          <motion.div variants={fadeUp} {...revealOnScroll} className="mt-8">
            <Link
              to="/projetos"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-blue-deep px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue-deep hover:text-white"
            >
              Conheça nossos projetos
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          {...revealOnScroll}
          className="mt-10 w-fit font-script text-4xl font-bold leading-none text-brand-blue-deep sm:text-5xl lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:-rotate-6 lg:text-6xl [text-shadow:0_0_14px_rgb(255_255_255/0.85),0_0_4px_rgb(255_255_255/0.9)]"
        >
          Mais infâncias possíveis.
          <svg
            viewBox="0 0 220 14"
            fill="none"
            className="mt-2 h-3 w-full text-brand-green"
            aria-hidden="true"
          >
            <path
              d="M2 9 C 50 2, 120 2, 218 8"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </motion.p>
      </div>
    </section>
  );
}
