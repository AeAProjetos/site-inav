import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sprout, Music, BookMarked, Users2, Dumbbell, Handshake } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { revealOnScroll, stagger } from "@/lib/motion-presets";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Horta comunitária, ateliê do saber, música, esporte e apoio às famílias: conheça os projetos que o INAV desenvolve com crianças e comunidade.",
      },
      { property: "og:title", content: "Projetos — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Projetos de cultura, esporte, alimentação e apoio familiar que ampliam o impacto do instituto para além da sala de aula.",
      },
    ],
  }),
  component: ProjetosPage,
});

const projects = [
  {
    icon: Sprout,
    title: "Horta comunitária",
    description:
      "As crianças plantam, cuidam e colhem. Parte do alimento vai para a cozinha do instituto e a outra parte vai para casa com as famílias.",
    accent: "green" as const,
  },
  {
    icon: BookMarked,
    title: "Ateliê do saber",
    description:
      "Espaço de leitura, contação de histórias e produção de livros artesanais feitos pelas próprias crianças.",
    accent: "blue" as const,
  },
  {
    icon: Music,
    title: "Musicalização",
    description:
      "Ritmo, percussão e canto em grupo — desenvolvendo coordenação, escuta e pertencimento desde os primeiros anos.",
    accent: "orange" as const,
  },
  {
    icon: Dumbbell,
    title: "Corpo em movimento",
    description:
      "Atividades psicomotoras e jogos cooperativos que trabalham coordenação, equilíbrio e convivência sem competição.",
    accent: "blue" as const,
  },
  {
    icon: Users2,
    title: "Família em rede",
    description:
      "Rodas de conversa, orientação social e encaminhamento a serviços públicos para as famílias atendidas.",
    accent: "green" as const,
  },
  {
    icon: Handshake,
    title: "Comunidade parceira",
    description:
      "Ações conjuntas com escolas, empresas e voluntários do bairro, ampliando o alcance do trabalho do instituto.",
    accent: "orange" as const,
  },
];

function ProjetosPage() {
  return (
    <>
      <PageHero
        eyebrow="Projetos"
        title="O cuidado não para na porta da"
        highlight="sala"
        description="Nossos projetos ampliam a experiência das crianças e alcançam as famílias e a comunidade ao redor. São frentes contínuas, com equipe dedicada e resultados acompanhados."
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frentes ativas"
            title="Projetos em"
            highlight="andamento"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <FeatureCard key={project.title} {...project} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quer apoiar um projeto?"
            title="Empresas e pessoas podem adotar uma"
            highlight="frente"
            description="Cada projeto tem um custo mensal conhecido e um relatório de resultados. Sua empresa pode apoiar uma frente inteira e acompanhar de perto o que ela gera."
            align="center"
          />
          <a
            href="/quer-ajudar"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-orange px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity duration-200 hover:opacity-90"
          >
            Quero apoiar um projeto
          </a>
        </div>
      </section>
    </>
  );
}
