import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Apple,
  Baby,
  BookOpen,
  HeartPulse,
  Palette,
  Sun,
  Users,
  Utensils,
} from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

export const Route = createFileRoute("/educacao-infantil")({
  head: () => ({
    meta: [
      { title: "Educação Infantil — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Creche e pré-escola gratuitas com rotina pedagógica estruturada, quatro refeições diárias e atendimento multidisciplinar no INAV.",
      },
      { property: "og:title", content: "Educação Infantil — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Rotina pedagógica, nutrição balanceada e desenvolvimento integral para crianças de creche e pré-escola.",
      },
    ],
  }),
  component: EducacaoInfantilPage,
});

const routine = [
  {
    time: "07h — 08h",
    title: "Acolhida e café da manhã",
    text: "As crianças chegam, são recebidas individualmente pela equipe e fazem a primeira refeição do dia.",
  },
  {
    time: "08h — 11h",
    title: "Atividades pedagógicas",
    text: "Roda de conversa, contação de histórias, alfabetização lúdica e atividades motoras adequadas a cada faixa etária.",
  },
  {
    time: "11h — 13h",
    title: "Almoço e descanso",
    text: "Refeição completa acompanhada por nutricionista, higiene orientada e período de repouso.",
  },
  {
    time: "13h — 15h",
    title: "Oficinas e brincar livre",
    text: "Arte, música, horta e jogos cooperativos — o momento em que a criança escolhe e experimenta.",
  },
  {
    time: "15h — 17h",
    title: "Lanche e encerramento",
    text: "Última refeição, registro do dia com as famílias e saída acompanhada.",
  },
];

const pillars = [
  {
    icon: Baby,
    title: "Creche (0 a 3 anos)",
    description:
      "Cuidado individualizado, estímulo sensorial, desenvolvimento motor e construção do vínculo afetivo em turmas reduzidas.",
    accent: "blue" as const,
  },
  {
    icon: BookOpen,
    title: "Pré-escola (4 e 5 anos)",
    description:
      "Alfabetização lúdica, raciocínio lógico, socialização e preparação para a transição ao ensino fundamental.",
    accent: "green" as const,
  },
  {
    icon: Utensils,
    title: "Quatro refeições diárias",
    description:
      "Café da manhã, almoço, lanche e jantar preparados na cozinha própria, com cardápio elaborado por nutricionista.",
    accent: "orange" as const,
  },
  {
    icon: HeartPulse,
    title: "Atendimento multidisciplinar",
    description:
      "Acompanhamento com psicologia, serviço social, fonoaudiologia e nutrição, conforme a necessidade de cada criança.",
    accent: "blue" as const,
  },
  {
    icon: Palette,
    title: "Desenvolvimento integral",
    description:
      "Arte, movimento, música e convivência entram na rotina com o mesmo peso que o conteúdo pedagógico formal.",
    accent: "green" as const,
  },
  {
    icon: Users,
    title: "Família presente",
    description:
      "Reuniões periódicas, orientação às famílias e canal aberto com a equipe — a criança não é atendida sozinha.",
    accent: "orange" as const,
  },
];

function EducacaoInfantilPage() {
  return (
    <>
      <PageHero
        eyebrow="Educação infantil"
        title="Aprender com barriga cheia e colo"
        highlight="garantido"
        description="Creche e pré-escola gratuitas, em período integral, com rotina pedagógica estruturada e nutrição acompanhada de perto. Educação de qualidade não deveria depender da renda da família — aqui, não depende."
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Como funciona"
            title="Os pilares do nosso"
            highlight="atendimento"
            description="Cada frente foi desenhada para sustentar a outra. Nutrição sem pedagogia não transforma; pedagogia sem nutrição não se sustenta."
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {pillars.map((pillar) => (
              <FeatureCard key={pillar.title} {...pillar} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Rotina diária"
            title="Um dia no"
            highlight="instituto"
            description="A previsibilidade da rotina é parte do cuidado: a criança sabe o que vem a seguir e isso a deixa segura."
          />

          <motion.ol
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-5 lg:grid-cols-5"
          >
            {routine.map((item) => (
              <motion.li
                key={item.time}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue-deep">
                  <Sun className="size-3" aria-hidden="true" />
                  {item.time}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-brand-blue-deep">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="brand-gradient overflow-hidden rounded-3xl px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/15"
            >
              <Apple className="size-7" aria-hidden="true" />
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-2xl text-3xl font-extrabold uppercase leading-tight text-balance-pretty sm:text-4xl"
            >
              Nutrição não é detalhe. É a base de tudo.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-white/85">
              Para muitas das crianças atendidas, as refeições servidas no instituto são as
              principais do dia. Por isso o cardápio é elaborado por nutricionista, preparado
              na cozinha própria e acompanhado individualmente — com atenção especial a
              crianças em risco nutricional.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
