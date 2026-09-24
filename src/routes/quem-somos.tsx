import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { Compass, Eye, HeartHandshake } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ClosingBanner } from "@/components/ClosingBanner";
import { OurStructure } from "@/components/OurStructure";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Conheça a história, a missão, a visão e os valores do Instituto Nair Valadares, OSC dedicada à educação infantil gratuita há mais de 25 anos.",
      },
      { property: "og:title", content: "Quem Somos — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Mais de 25 anos de acolhimento, nutrição e educação infantil gratuita para crianças em vulnerabilidade social.",
      },
    ],
  }),
  component: QuemSomosPage,
});

const timelineAccents = {
  orange: {
    line: "bg-brand-orange",
    ring: "border-brand-orange",
    text: "text-brand-orange",
  },
  blue: {
    line: "bg-brand-blue",
    ring: "border-brand-blue",
    text: "text-brand-blue",
  },
  green: {
    line: "bg-brand-green",
    ring: "border-brand-green",
    text: "text-brand-green",
  },
} as const;

const timeline = [
  {
    period: "2000–2009",
    title: "O começo",
    text: "O INAV nasce no Riacho Fundo II e inicia sua atuação junto a crianças e famílias. Nesse período, amplia sua estrutura e desenvolve novas atividades socioeducativas, fortalecendo sua presença na comunidade.",
    image: "/img/2000-2009.jpg",
    imageAlt: "Registro histórico do INAV entre 2000 e 2009",
    accent: "orange" as const,
  },
  {
    period: "2010–2019",
    title: "Novas possibilidades",
    text: "A atuação se diversifica com iniciativas nas áreas de educação, cultura, esporte, saúde, formação e inclusão. Novos projetos e parcerias ampliam as oportunidades oferecidas a crianças, adolescentes e famílias.",
    image: "/img/2010-2019.jpg",
    imageAlt: "Registro histórico do INAV entre 2010 e 2019",
    accent: "blue" as const,
  },
  {
    period: "2020–2026",
    title: "O INAV hoje",
    text: "O Instituto fortalece sua atuação por meio de novas parcerias e iniciativas, mantendo o cuidado e a educação como bases do seu trabalho e ampliando ações voltadas às necessidades das crianças, famílias e da comunidade.",
    image: "/img/2020-2026.jpg",
    imageAlt: "Registro atual do INAV, entre 2020 e 2026",
    accent: "green" as const,
  },
];

const principleAccents = {
  orange: {
    text: "text-brand-orange",
    line: "bg-brand-orange",
    numeral: "text-brand-orange/[0.08]",
  },
  blue: {
    text: "text-brand-blue",
    line: "bg-brand-blue",
    numeral: "text-brand-blue/[0.08]",
  },
  green: {
    text: "text-brand-green",
    line: "bg-brand-green",
    numeral: "text-brand-green/[0.08]",
  },
} as const;

const values = [
  {
    icon: HeartHandshake,
    title: "Missão",
    description:
      "Promover educação de excelência, contribuindo para o desenvolvimento integral das crianças em um ambiente seguro e acolhedor.",
    accent: "orange" as const,
  },
  {
    icon: Eye,
    title: "Visão",
    description:
      "Contribuir para a redução das desigualdades sociais e ampliar oportunidades por meio da educação e do desenvolvimento social.",
    accent: "blue" as const,
  },
  {
    icon: Compass,
    title: "Valores",
    description:
      "Ética, Respeito, Humanismo, Responsabilidade Social e Transparência",
    accent: "green" as const,
  },
];

// Exemplos fictícios de início — troque pelos depoimentos reais (nome, função e frase de
// pessoas da equipe) quando tiver.
const teamTestimonials = [
  {
    quote:
      "Trabalhar no INAV é ver, todos os dias, o quanto a educação pode abrir caminhos. Aqui a gente cresce junto com as crianças.",
    name: "Camila Ferreira",
    role: "Educadora — INAV",
  },
  {
    quote:
      "Eu vi criança chegar sem falar e sair daqui cantando. É isso que a gente faz — devolve infância para quem quase perdeu ela.",
    name: "Roberta Lima",
    role: "Coordenação pedagógica — INAV",
  },
  {
    quote:
      "Trabalhar aqui é entender que o prato de comida e a aula de leitura são a mesma coisa: as duas alimentam.",
    name: "Juliana Alves",
    role: "Equipe de nutrição — INAV",
  },
];

function QuemSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Uma história feita de"
        highlight="gente"
        description="O Instituto Nair Valadares é uma Organização da Sociedade Civil sem fins lucrativos, fundada em 2000 e dedicada à educação, ao cuidado e ao desenvolvimento social."
      />

      {/* Linha do tempo */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Linha do tempo"
            title="Mais de duas décadas de"
            highlight="dedicação"
            description="Cada etapa do instituto foi construída junto com a comunidade, no ritmo das necessidades reais das famílias atendidas."
          />

          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 flex gap-8 overflow-x-auto pb-4 sm:gap-10 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
          >
            {timeline.map((item, index) => {
              const accent = timelineAccents[item.accent];
              const isFirst = index === 0;
              const isLast = index === timeline.length - 1;
              return (
                <motion.div
                  key={item.period}
                  variants={fadeUp}
                  className="w-64 shrink-0 sm:w-72 lg:w-auto"
                >
                  <div className="overflow-hidden rounded-2xl shadow-soft">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="aspect-[4/3] size-full object-cover"
                    />
                  </div>

                  <div className="relative mt-6 h-1.5">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0",
                        accent.line,
                        isFirst && "rounded-l-full",
                        isLast && "rounded-r-full",
                        !isLast && "w-[calc(100%+2rem)] sm:w-[calc(100%+2.5rem)]",
                        isLast && "w-full",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-background",
                        accent.ring,
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-6">
                    <p className={cn("text-sm font-bold uppercase tracking-[0.18em]", accent.text)}>
                      {item.period}
                    </p>
                    <h3 className="mt-2 text-xl font-extrabold uppercase text-brand-blue-deep">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Missão, visão, valores */}
      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nossos princípios"
            title="O que nos move todos os"
            highlight="dias"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          >
            {values.map((value, index) => (
              <PrincipleColumn key={value.title} {...value} index={index + 1} />
            ))}
          </motion.div>
        </div>
      </section>

      <OurStructure />

      {/* Nossa gente */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-2xl border border-border shadow-soft lg:grid-cols-[3fr_2fr]">
            <motion.div
              variants={fadeUp}
              {...revealOnScroll}
              className="relative min-h-[320px] lg:min-h-[460px]"
            >
              <img
                src="/img/equipe_funcionarios.jpg"
                alt="Equipe do INAV reunida, em momento de união do time"
                className="absolute inset-0 size-full object-cover"
              />
            </motion.div>

            <div className="flex flex-col justify-center gap-7 bg-surface-tint p-8 lg:p-12">
              <SectionHeading
                eyebrow="Nossa gente"
                title="Quem faz essa história"
                highlight="acontecer"
                className="max-w-none"
              />

              <TestimonialCarousel testimonials={teamTestimonials} />
            </div>
          </div>
        </div>
      </section>

      <ClosingBanner />
    </>
  );
}

function PrincipleColumn({
  icon: Icon,
  title,
  description,
  accent,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: keyof typeof principleAccents;
  index: number;
}) {
  const colors = principleAccents[accent];

  return (
    <motion.div variants={fadeUp} className="relative overflow-hidden p-8 lg:p-10">
      <span
        className={cn(
          "pointer-events-none absolute -top-5 right-3 select-none font-display text-[6rem] font-black leading-none",
          colors.numeral,
        )}
        aria-hidden="true"
      >
        0{index}
      </span>

      <div className="relative">
        <span className={cn("block h-1 w-10 rounded-full", colors.line)} aria-hidden="true" />
        <div className="mt-4 flex items-center gap-2">
          <Icon className={cn("size-5", colors.text)} aria-hidden="true" />
          <p className={cn("text-xs font-bold uppercase tracking-[0.2em]", colors.text)}>
            {title}
          </p>
        </div>
        <p className="mt-4 text-base font-normal leading-relaxed text-muted-foreground lg:text-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
