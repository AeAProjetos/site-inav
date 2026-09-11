import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { HomeHero } from "@/components/HomeHero";
import { ImpactStats } from "@/components/ImpactStats";
import { JourneySteps } from "@/components/JourneySteps";
import { PixDonationCard } from "@/components/PixDonationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionPreviewGrid } from "@/components/SectionPreviewGrid";
import { WaveDivider } from "@/components/WaveDivider";
import { fadeUp, revealOnScroll } from "@/lib/motion-presets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instituto Nair Valadares — Cuidado que acolhe, educação que transforma" },
      {
        name: "description",
        content:
          "O INAV oferece educação infantil, nutrição e acolhimento gratuitos para centenas de crianças em vulnerabilidade social. Conheça e apoie.",
      },
      {
        property: "og:title",
        content: "Instituto Nair Valadares — Cuidado que acolhe, educação que transforma",
      },
      {
        property: "og:description",
        content:
          "Educação infantil, nutrição e acolhimento gratuitos para centenas de crianças e famílias. Doe ou apadrinhe.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHero />
      <ImpactStats />
      <WaveDivider variant="down" height="sm" className="-mt-px bg-brand-blue-deep text-background" />

      {/* Jornada em 3 etapas */}
      <section className="bg-background py-30 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="NOSSA JORNADA"
            title="UM CUIDADO QUE ACOMPANHA"
            highlight="CADA ETAPA DO DESENVOLVIMENTO"
            description="Educação, alimentação e acolhimento fazem parte de uma atuação integrada, pensada para o desenvolvimento das crianças e o fortalecimento de suas famílias."
            align="center"
          />
          <div className="mt-10">
            <JourneySteps />
          </div>
        </div>
      </section>

      {/* Bloco institucional */}
      <section className="bg-surface-tint py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Instituto Nair Valadares"
              title="Uma casa aberta para quem mais"
              highlight="precisa"
              description="O INAV é uma organização sem fins lucrativos dedicada à educação e ao cuidado de crianças, com uma atuação que também fortalece famílias e comunidades.
Educação infantil, alimentação, acolhimento e desenvolvimento fazem parte de um trabalho construído para oferecer novas possibilidades desde os primeiros anos de vida."
            />

            <motion.div variants={fadeUp} {...revealOnScroll} className="mt-8">
              <Link
                to="/quem-somos"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors duration-200 hover:bg-brand-blue-deep"
              >
                Conheça nossa história
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="relative overflow-hidden rounded-2xl border border-border shadow-soft"
          >
            <img
              src="/img/Colaboradora_01.jpeg"
              alt="Educadora auxiliando crianças em atividade pedagógica em sala de aula do INAV"
              className="aspect-[4/5] size-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-xl bg-brand-orange p-5 shadow-lift">
              <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">
                Cada criança é acolhida em sua individualidade, em um ambiente onde
                educação, cuidado e atenção fazem parte da mesma rotina.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seções internas */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-1">
          <SectionHeading
            eyebrow="Explore o instituto"
            title="CONHEÇA MAIS SOBRE O"
            highlight="inav"
            align="center"
          />
          <div className="mt-10">
            <SectionPreviewGrid />
          </div>
        </div>
      </section>

      {/* PIX */}
      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PixDonationCard />
        </div>
      </section>
    </>
  );
}
