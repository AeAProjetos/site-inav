import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BookOpen, HeartHandshake, Sprout } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ClosingBanner } from "@/components/ClosingBanner";
import { PhotoGallery, type GalleryItem } from "@/components/PhotoGallery";
import { Canteiro, Cena, Ilustracao } from "@/components/Ilustracao";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

/*
 * Estrutura conforme o documento do designer (INAV-026), publicada em 10/11/2026. O que
 * ainda depende de informação da instituição ficou fora da página (ver comentários abaixo);
 * nunca publicar `Pending`/`PendingPhoto`: `bun run pendencias` precisa sair vazio.
 */

export const Route = createFileRoute("/educacao-infantil")({
  head: () => ({
    meta: [
      { title: "Educação Infantil — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Creche gratuita para crianças de 2 a 3 anos, em período integral, com educação, cinco refeições diárias e acompanhamento das famílias no INAV.",
      },
      { property: "og:title", content: "Educação Infantil — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Educação, alimentação e cuidado na mesma rotina: creche gratuita em período integral, das 7h30 às 17h30.",
      },
    ],
  }),
  component: EducacaoInfantilPage,
});

const accents = {
  orange: { text: "text-brand-orange", ring: "border-brand-orange" },
  blue: { text: "text-brand-blue", ring: "border-brand-blue" },
  green: { text: "text-brand-green", ring: "border-brand-green" },
} as const;

const accentCycle = ["orange", "blue", "green"] as const;

const facts: { label: string; value: ReactNode; detail?: ReactNode }[] = [
  { label: "Faixa etária", value: "2 a 3 anos" },
  { label: "Período", value: "Integral", detail: "Das 7h30 às 17h30" },
  { label: "Custo", value: "Gratuito", detail: "Sem mensalidade para as famílias" },
  { label: "Turmas", value: "Maternal I e II" },
];

const beyondClassroom = [
  {
    icon: BookOpen,
    title: "Educação",
    text: "Rodas de conversa, histórias, música, movimento e propostas pedagógicas pensadas para a idade de cada turma.",
    accent: "orange" as const,
  },
  {
    icon: HeartHandshake,
    title: "Cuidado e acolhimento",
    text: "Higiene, descanso e atenção individual fazem parte da rotina. A criança passa o dia com adultos que conhecem o seu jeito e as suas necessidades.",
    accent: "blue" as const,
  },
  {
    icon: Sprout,
    title: "Desenvolvimento integral",
    text: "Brincar, conviver e se expressar têm o mesmo peso que aprender conteúdos. É assim que crescem a autonomia, a linguagem e a coordenação.",
    accent: "green" as const,
  },
];

// Resumo da "Rotina diária" enviada pelo INAV em 10/11/2026 (15 momentos em 6 passos).
// As refeições aparecem completas na seção "Alimentação também é cuidado".
const dayRoutine: { time?: string; title: string; text: string }[] = [
  {
    time: "7h30",
    title: "Chegada",
    text: "As professoras recebem as crianças nas salas, com brinquedos para a acolhida. Depois, café da manhã no refeitório.",
  },
  {
    time: "8h35",
    title: "Atividades",
    text: "Rodas de conversa, música, histórias e experiências. No fim da manhã, parque e cama elástica.",
  },
  {
    time: "11h",
    title: "Almoço",
    text: "Almoço no refeitório e escovação dos dentes, com acompanhamento da equipe.",
  },
  {
    time: "12h",
    title: "Descanso",
    text: "Duas horas de soneca, respeitando o ritmo de cada criança.",
  },
  {
    time: "14h",
    title: "Brincadeiras",
    text: "Lanche, banho e brincadeiras orientadas com brinquedos pedagógicos.",
  },
  {
    time: "17h às 17h30",
    title: "Saída",
    text: "Depois do jantar, as crianças são entregues aos pais ou responsáveis autorizados.",
  },
];

// Saúde: lista "Faculdades parceiras 2026" do INAV; atuação e nomes confirmados em 10/11/2026.
const familyTopics: { title: string; text: string }[] = [
  {
    title: "Diálogo com os responsáveis",
    text: "Reuniões, conversas no dia a dia e um canal aberto com a equipe.",
  },
  {
    title: "Acompanhamento",
    text: "O desenvolvimento de cada criança é acompanhado e compartilhado com a família.",
  },
  {
    title: "Atendimento de saúde",
    text: "Estagiários de nutrição, psicologia, medicina, odontologia, terapia ocupacional e enfermagem atendem as crianças e orientam as famílias, em estágio supervisionado.",
  },
  {
    title: "Faculdades parceiras",
    text: "Anhanguera, ICESP, UDF, UnB e Universidade Católica de Brasília.",
  },
];

// Fotos do site antigo do INAV, de 2018 a 2023, escolhidas e confirmadas em 04/11/2026.
const gallery: GalleryItem[] = [
  { src: "/img/ei-galeria-sala.jpg", alt: "Criança pintando um desenho na sala" },
  { src: "/img/ei-galeria-ao-ar-livre.jpg", alt: "Crianças dançando no gramado do INAV" },
  { src: "/img/ei-galeria-refeicao.jpg", alt: "Crianças sentadas no tapete durante um lanche" },
  {
    src: "/img/ei-galeria-grupo.jpg",
    alt: "Turma em fila no gramado com trabalhos feitos em sala",
  },
  {
    src: "/img/ei-galeria-arraia.jpg",
    alt: "Crianças com roupas de festa junina no Arraiá do INAV",
  },
  {
    src: "/img/ei-galeria-tapete.jpg",
    alt: "Turma reunida no tapete do gramado na Semana da Criança",
  },
  { src: "/img/ei-galeria-bolinhas.jpg", alt: "Menino brincando na piscina de bolinhas" },
  { src: "/img/ei-galeria-lanche.jpg", alt: "Crianças lanchando numa mesa ao ar livre" },
];

function EducacaoInfantilPage() {
  return (
    <>
      {/* 01 — Abertura */}
      <PageHero
        title="Educação infantil que acolhe, cuida e"
        highlight="desenvolve"
        description="Creche gratuita para crianças de 2 a 3 anos, em período integral, com educação, alimentação e cuidado reunidos na mesma rotina."
        aside={
          <img
            src="/img/ei-topo.jpg"
            alt="Crianças sorrindo em volta de uma mesa na sala do INAV"
            className="size-full object-cover"
          />
        }
      />

      {/* 02 — Como funciona */}
      <section className="bg-background pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
            Como funciona o atendimento
          </h2>
          <motion.dl
            variants={stagger}
            {...revealOnScroll}
            className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-border py-8 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border"
          >
            {facts.map((fact) => (
              <motion.div key={fact.label} variants={fadeUp} className="lg:px-8 lg:first:pl-0">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-xl font-extrabold uppercase text-brand-blue-deep">
                  {fact.value}
                </dd>
                {fact.detail && (
                  <dd className="mt-1 text-sm text-muted-foreground">{fact.detail}</dd>
                )}
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* 03 — Muito além da sala de aula */}
      <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
        <Ilustracao
          nome="abelha"
          className="absolute right-[5%] top-10 -z-10 hidden w-12 -rotate-6 xl:block"
        />
        <Canteiro itens={["margarida-azul", "capim", "margarida-laranja"]} className="left-[3%]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[400px_1fr] lg:gap-16 lg:px-8">
          <SectionHeading
            title="Muito além da sala de"
            highlight="aula"
            description="Na educação infantil, aprender passa pelo brincar, pelo cuidado e pela convivência. A rotina do INAV junta essas frentes no mesmo dia."
          />

          <motion.ul
            variants={stagger}
            {...revealOnScroll}
            className="divide-y divide-border border-y border-border"
          >
            {beyondClassroom.map(({ icon: Icon, title, text, accent }) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="grid gap-3 py-7 sm:grid-cols-[40px_1fr] sm:gap-6"
              >
                <Icon className={cn("size-7", accents[accent].text)} aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-extrabold uppercase text-brand-blue-deep">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* 04 — Um dia no INAV */}
      <section className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24">
        <Cena nome="sol-e-nuvem" className="right-[6%] top-10 w-20 lg:hidden xl:block" />
        <Canteiro itens={["capim", "caracol"]} className="right-[4%]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Um dia no"
            highlight="INAV"
            description="Uma rotina previsível ajuda a criança a se sentir segura: ela sabe o que vem depois."
          />

          {/* Vertical no celular, horizontal no desktop */}
          <motion.ol
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-10 lg:grid-cols-6 lg:gap-6"
          >
            {dayRoutine.map((step, index) => {
              const accent = accents[accentCycle[index % accentCycle.length]!];
              const isLast = index === dayRoutine.length - 1;
              return (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  className="relative pl-10 lg:pl-0 lg:pt-10"
                >
                  {!isLast && (
                    <span
                      className="absolute -bottom-10 left-[9px] top-5 w-0.5 bg-brand-blue/20 lg:bottom-auto lg:-right-6 lg:left-5 lg:top-[9px] lg:h-0.5 lg:w-auto"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "absolute left-0 top-0.5 size-5 rounded-full border-4 bg-surface-tint lg:top-0",
                      accent.ring,
                    )}
                    aria-hidden="true"
                  />
                  {/* Sem horário, a linha vazia só existe no desktop, para os títulos ficarem alinhados. */}
                  <div
                    className={cn(
                      "text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground",
                      !step.time && "hidden lg:block",
                    )}
                    aria-hidden={step.time ? undefined : true}
                  >
                    {step.time ?? " "}
                  </div>
                  <h3 className={cn("mt-2 text-lg font-extrabold uppercase", accent.text)}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </section>

      {/* 05 — Alimentação também é cuidado */}
      <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          {/* Árvore atrás da foto, com o passarinho na copa. */}
          <Cena nome="passarinho-na-arvore" className="-top-[4.75rem] left-16 w-28" />
          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lift"
          >
            <img
              src="/img/estrutura-cozinha.jpeg"
              alt="Cozinha institucional do INAV, onde as refeições são preparadas"
              className="size-full object-cover"
            />
          </motion.div>

          <div>
            <SectionHeading
              title="Alimentação também é"
              highlight="cuidado"
              description="Para muitas crianças, as refeições servidas no INAV são as principais do dia. Todas são preparadas na cozinha do próprio instituto."
            />

            <motion.div
              variants={fadeUp}
              {...revealOnScroll}
              className="mt-8 flex items-center gap-5 border-t border-border pt-8"
            >
              <span className="font-display text-7xl font-extrabold leading-none text-brand-orange">
                5
              </span>
              <div>
                <p className="text-lg font-extrabold uppercase text-brand-blue-deep">
                  refeições por dia
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Café da manhã, colação, almoço, lanche da tarde e jantar.
                </p>
              </div>
            </motion.div>

            <p className="mt-6 leading-relaxed text-muted-foreground">
              Todas as refeições têm acompanhamento nutricional.
            </p>
          </div>
        </div>
      </section>

      {/* 06 — A família também faz parte */}
      <section className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24">
        <Canteiro itens={["lagarta", "capim", "tulipa"]} className="left-[3%]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center lg:px-8">
          <div>
            <SectionHeading
              title="A família também faz parte desse"
              highlight="cuidado"
              description="O que a criança vive no INAV continua em casa. A equipe conversa com os responsáveis, orienta as famílias e acompanha cada etapa do desenvolvimento."
            />

            <motion.dl
              variants={stagger}
              {...revealOnScroll}
              className="mt-8 divide-y divide-border border-y border-border"
            >
              {familyTopics.map((topic) => (
                <motion.div
                  key={topic.title}
                  variants={fadeUp}
                  className="grid gap-1 py-5 sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <dt className="font-extrabold uppercase text-brand-blue-deep">{topic.title}</dt>
                  <dd className="leading-relaxed text-muted-foreground">{topic.text}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lift"
          >
            {/* Foto deitada: no formato 4:3 cabem os pais e a filha, que fica na ponta direita. */}
            <img
              src="/img/ei-familia.jpg"
              alt="Mãe, pai e filha com o rosto pintado na festa Minha Família, Meu Tesouro"
              className="size-full object-cover object-right"
            />
          </motion.div>
        </div>
      </section>

      {/* 07 — O dia a dia em imagens */}
      <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
        <Cena nome="duas-nuvens" className="left-[4%] top-12 w-32 lg:hidden xl:block" />
        <Ilustracao nome="sol" className="absolute right-[7%] top-10 -z-10 hidden w-16 xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="O dia a dia em" highlight="imagens" align="center" />
          <div className="mt-12">
            <PhotoGallery items={gallery} />
          </div>
        </div>
      </section>

      {/* 08 — Encerramento */}
      <ClosingBanner
        title="O trabalho"
        highlight="continua"
        description="O trabalho do INAV vai além da educação infantil. Conheça os projetos e iniciativas desenvolvidos com crianças, famílias e comunidade."
        ctaLabel="Conhecer projetos"
        ctaTo="/projetos"
        image={{
          src: "/img/ei-encerramento.jpg",
          alt: "Três meninos com chapéu de palha e camisa xadrez no Arraiá do INAV",
        }}
      />
    </>
  );
}
