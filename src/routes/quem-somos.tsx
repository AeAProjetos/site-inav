import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Compass, Eye, HeartHandshake, Quote } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

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

const timeline = [
  {
    year: "Fundação",
    title: "O primeiro acolhimento",
    text: "O instituto nasce do desejo de garantir que nenhuma criança do bairro ficasse sem um lugar seguro durante o dia.",
  },
  {
    year: "Crescimento",
    title: "Da casa à estrutura",
    text: "O atendimento se expande, chegam as primeiras salas de aula, a cozinha própria e a equipe pedagógica permanente.",
  },
  {
    year: "Consolidação",
    title: "Reconhecimento e parcerias",
    text: "Convênios públicos, certificações do terceiro setor e parcerias com empresas ampliam o alcance do trabalho.",
  },
  {
    year: "Hoje",
    title: "240+ crianças por dia",
    text: "Educação infantil gratuita, quatro refeições diárias, atendimento multidisciplinar e projetos que envolvem toda a família.",
  },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Missão",
    description:
      "Promover o desenvolvimento integral de crianças em situação de vulnerabilidade social por meio de educação, nutrição e acolhimento gratuitos e de qualidade.",
    accent: "orange" as const,
  },
  {
    icon: Eye,
    title: "Visão",
    description:
      "Ser referência regional em educação infantil no terceiro setor, reconhecida pela transparência, pelo cuidado humano e pelo impacto duradouro nas famílias atendidas.",
    accent: "blue" as const,
  },
  {
    icon: Compass,
    title: "Valores",
    description:
      "Dignidade em primeiro lugar, transparência em cada real recebido, escuta ativa das famílias, respeito à infância e compromisso com a comunidade.",
    accent: "green" as const,
  },
];

function QuemSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Uma história feita de"
        highlight="gente"
        description="O Instituto Nair Valadares é uma Organização da Sociedade Civil sem fins lucrativos. Nasceu da percepção simples de que cuidar de uma criança é cuidar de uma família inteira."
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

          <motion.ol
            variants={stagger}
            {...revealOnScroll}
            className="relative mt-14 space-y-8 border-l-2 border-brand-blue-soft pl-8 sm:pl-10"
          >
            {timeline.map((item) => (
              <motion.li key={item.year} variants={fadeUp} className="relative">
                <span
                  className="absolute -left-[2.6rem] top-1 size-4 rounded-full border-4 border-background bg-brand-green sm:-left-[3.1rem]"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-brand-blue-deep">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
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
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {values.map((value) => (
              <FeatureCard key={value.title} {...value} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Depoimentos"
            title="Quem vive o instituto por"
            highlight="dentro"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 md:grid-cols-2"
          >
            {[
              {
                quote:
                  "Eu vi criança chegar sem falar e sair daqui cantando. É isso que a gente faz — devolve infância para quem quase perdeu ela.",
                author: "Coordenação pedagógica",
              },
              {
                quote:
                  "Trabalhar aqui é entender que o prato de comida e a aula de leitura são a mesma coisa: as duas alimentam.",
                author: "Equipe de nutrição",
              },
            ].map((item) => (
              <motion.blockquote
                key={item.author}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-8 shadow-soft"
              >
                <Quote className="size-8 text-brand-orange/30" aria-hidden="true" />
                <p className="mt-4 text-lg leading-relaxed text-foreground/85">
                  {item.quote}
                </p>
                <footer className="mt-5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep">
                  {item.author}
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
