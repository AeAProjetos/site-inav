import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Quote } from "lucide-react";

import { HomeHero } from "@/components/HomeHero";
import { ImpactStats } from "@/components/ImpactStats";
import { JourneySteps } from "@/components/JourneySteps";
import { PixDonationCard } from "@/components/PixDonationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionPreviewGrid } from "@/components/SectionPreviewGrid";
import { WaveDivider } from "@/components/WaveDivider";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

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
          "Educação infantil, nutrição e acolhimento gratuitos para centenas de crianças e famílias. Doe, apadrinhe ou seja voluntário.",
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
      <WaveDivider variant="down" className="-mt-px bg-brand-blue-deep text-background" />

      {/* Jornada em 3 etapas */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nossa jornada"
            title="Três passos que mudam"
            highlight="uma história"
            description="Do primeiro acolhimento à transformação real, cada etapa é pensada para atender a criança por inteiro — e a família junto com ela."
            align="center"
          />
          <div className="mt-14">
            <JourneySteps />
          </div>
        </div>
      </section>

      {/* Bloco institucional */}
      <section className="bg-surface-tint py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <SectionHeading
            eyebrow="Instituto Nair Valadares"
            title="Uma casa aberta para quem mais"
            highlight="precisa"
            description="Somos uma Organização da Sociedade Civil sem fins lucrativos. Há mais de 25 anos oferecemos educação infantil gratuita, alimentação balanceada e acompanhamento multidisciplinar para crianças e famílias em situação de vulnerabilidade social."
          />

          <motion.div variants={stagger} {...revealOnScroll} className="space-y-5">
            <motion.blockquote
              variants={fadeUp}
              className="relative rounded-2xl border border-border bg-card p-8 shadow-soft"
            >
              <Quote className="size-8 text-brand-orange/30" aria-hidden="true" />
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                Aqui a criança não recebe só uma vaga. Ela recebe comida quente, colo,
                escuta e um lugar onde alguém sabe o nome dela.
              </p>
              <footer className="mt-5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep">
                Equipe pedagógica do INAV
              </footer>
            </motion.blockquote>

            <motion.div variants={fadeUp}>
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
          </motion.div>
        </div>
      </section>

      {/* Seções internas */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore o instituto"
            title="O que acontece"
            highlight="por aqui"
            align="center"
          />
          <div className="mt-14">
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
