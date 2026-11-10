import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";

import { AmigosForm, type PerfilAmigo } from "@/components/AmigosForm";
import { Cena, Ilustracao } from "@/components/Ilustracao";
import { PageHero } from "@/components/PageHero";
import { PixDonationCard } from "@/components/PixDonationCard";
import { SectionHeading } from "@/components/SectionHeading";
import { WaveDivider } from "@/components/WaveDivider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/amigos-inav")({
  head: () => ({
    meta: [
      { title: "Amigos INAV — Apoio mensal à infância no Riacho Fundo II" },
      {
        name: "description",
        content:
          "Amigos INAV é a rede de pessoas e empresas que apoiam todo mês a educação, o cuidado e a alimentação de crianças pequenas no Riacho Fundo II. Também é possível doar uma vez pelo Pix.",
      },
      { property: "og:title", content: "Amigos INAV — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Faça parte da rede de pessoas e empresas que apoiam o Instituto Nair Valadares todo mês, com prestação de contas aberta.",
      },
    ],
  }),
  component: AmigosInavPage,
});

const SELO = "/img/amigos-inav/selo-amigos-inav.svg";

const numeros = [
  { valor: "240", rotulo: "crianças atendidas por ano" },
  { valor: "5", rotulo: "refeições diárias" },
  { valor: "2000", rotulo: "ano de fundação" },
];

// As fotos são cortes salvos em public/img/amigos-inav. A original da 1ª mostra nomes de crianças
// num painel da parede: ao trocar qualquer foto, conferir se não aparece nome legível.
const apoios = [
  {
    titulo: "Aprender brincando",
    texto: "Materiais e atividades de linguagem, movimento, arte, leitura e descoberta.",
    foto: "/img/amigos-inav/aprender-brincando.jpg",
    alt: "Crianças do INAV montando uma torre de blocos na sala.",
  },
  {
    titulo: "Alimentação e cuidado",
    texto: "Apoio à alimentação planejada e às ações de cuidado do dia a dia.",
    foto: "/img/amigos-inav/alimentacao.jpg",
    alt: "Crianças do INAV comendo frutas à mesa no refeitório.",
  },
  {
    titulo: "Ambientes acolhedores",
    texto: "Salas, brinquedoteca, refeitório e áreas externas seguros e bem cuidados.",
    foto: "/img/amigos-inav/brincadeira-na-areia.jpg",
    alt: "Crianças do INAV brincando no tanque de areia.",
  },
  {
    titulo: "Famílias por perto",
    texto: "Iniciativas que aproximam as famílias e fortalecem os vínculos com a comunidade.",
    foto: "/img/amigos-inav/atividade-a-mesa-educadoras.jpg",
    alt: "Crianças do INAV fazendo atividades em uma mesa vermelha.",
  },
];

const perfisDeApoio: {
  perfil: PerfilAmigo;
  selo: string;
  seloAlt: string;
  titulo: string;
  texto: string;
  chamada: string;
}[] = [
  {
    perfil: "pessoa",
    selo: "/img/amigos-inav/selo-eu-apoio.png",
    seloAlt: "Selo Eu Apoio",
    titulo: "Para você",
    texto:
      "Doe todo mês o valor que fizer sentido para você. Altere ou encerre quando quiser. Aparecer no mural de apoiadores é opcional.",
    chamada: "Quero apoiar todo mês",
  },
  {
    perfil: "empresa",
    selo: "/img/amigos-inav/selo-empresa-amiga.png",
    seloAlt: "Selo Empresa Amiga",
    titulo: "Para empresas e entidades",
    texto:
      "Formalize um apoio mensal com finalidade, valor e período definidos. Sua empresa usa o selo Empresa Amiga durante a vigência.",
    chamada: "Quero que minha empresa participe",
  },
];

const passos = [
  {
    titulo: "Conte que quer participar",
    texto: "Preencha o formulário. A equipe do INAV entra em contato.",
  },
  {
    titulo: "Escolha valor e forma",
    texto: "Conheça os canais oficiais e as regras para alterar ou encerrar.",
  },
  {
    titulo: "Receba as boas-vindas",
    texto: "Agradecimento e comprovante da sua contribuição.",
  },
  {
    titulo: "Acompanhe de perto",
    texto: "Notícias das atividades e prestações de contas nesta página.",
  },
];

const calendario = [
  { quando: "A cada contribuição", oQue: "Confirmação e comprovante enviados ao apoiador." },
  { quando: "Todo mês, até o dia 20", oQue: "Resumo financeiro do mês anterior e notícias." },
  { quando: "A cada trimestre", oQue: "Síntese de arrecadação, aplicação e atividades." },
  { quando: "Até 30 de abril", oQue: "Relatório anual de atividades e contas." },
  { quando: "Até 30 de junho", oQue: "Relatório de auditoria independente." },
];

// Preencher quando sair o primeiro balanço do programa.
const resumoFinanceiro = [
  { rotulo: "Mês de referência", valor: "—" },
  { rotulo: "Entradas", valor: "—" },
  { rotulo: "Saídas por categoria", valor: "—" },
  { rotulo: "Saldo final", valor: "—" },
];

const perguntas = [
  {
    pergunta: "Qual é o valor da contribuição?",
    resposta:
      "Você escolhe. O que importa é a regularidade: todo apoio mensal ajuda o INAV a planejar.",
  },
  {
    pergunta: "Posso alterar ou cancelar?",
    resposta: "Sim. É só falar com a equipe pelo canal informado na adesão.",
  },
  {
    pergunta: "A doação dá desconto no Imposto de Renda?",
    resposta: "Não. O programa recebe doações diretas ao INAV, que não geram dedução fiscal.",
  },
  {
    pergunta: "O selo é um certificado?",
    resposta:
      "Não. Ele identifica, durante a vigência do apoio, quem faz parte da rede Amigos INAV.",
  },
  {
    pergunta: "Vou apoiar uma criança específica?",
    resposta:
      "Não. O apoio é dirigido à instituição e fortalece a rotina de todas as crianças atendidas.",
  },
  {
    pergunta: "Preciso aparecer no mural?",
    resposta:
      "Não. A divulgação do nome ou da marca é opcional e só acontece com a sua autorização.",
  },
  {
    pergunta: "Ao doar, me torno associado do INAV?",
    resposta: "Não. A doação não torna o apoiador associado da instituição.",
  },
  {
    pergunta: "Como sei que o dinheiro foi bem usado?",
    resposta:
      "Pelas prestações de contas publicadas nesta página, com resumos mensais, relatórios e documentos.",
  },
];

const botaoPrincipal =
  "warm-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-cta transition-transform duration-200 hover:scale-[1.04]";
const botaoContorno =
  "inline-flex items-center justify-center gap-2 rounded-full border border-brand-blue/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue hover:text-white";

function AmigosInavPage() {
  // Os links "Para você" e "Para empresas" já deixam o formulário com o perfil certo.
  const [perfil, setPerfil] = useState<PerfilAmigo>("pessoa");

  return (
    <>
      <PageHero
        eyebrow="Programa de Apoio à Infância"
        title="Amigos"
        highlight="INAV"
        titleClassName="lg:text-6xl xl:text-7xl"
        description="Uma rede de pessoas e empresas que apoiam o Instituto Nair Valadares todo mês. Sua contribuição ajuda a manter, com regularidade, a educação, o cuidado e a alimentação de crianças pequenas no Riacho Fundo II."
        actions={
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#participe" className={botaoPrincipal}>
                <Heart className="size-4" aria-hidden="true" />
                Quero ser Amigo INAV
              </a>
              <a
                href="#prestacao-de-contas"
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15"
              >
                Veja como prestamos contas
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
            <a
              href="#doacao"
              className="mt-5 inline-block text-sm font-semibold text-white/85 underline underline-offset-4 hover:text-white"
            >
              Prefere doar uma vez? Vá direto para o Pix
            </a>
          </>
        }
        asideClassName="-order-1 size-32 rounded-full bg-white p-1.5 shadow-lift sm:size-40 lg:order-none lg:size-72 lg:justify-self-center lg:p-3 xl:size-80"
        aside={
          <img src={SELO} alt="Selo Amigos INAV" width={320} height={320} className="size-full" />
        }
      />

      {/* Por que todo mês */}
      <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20">
        <Ilustracao
          nome="libelula"
          className="absolute left-[6%] top-16 -z-10 hidden w-14 xl:block"
        />
        <Cena nome="sol-e-nuvem" className="right-[6%] top-10 w-20 lg:hidden xl:block" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por que todo mês"
            title="Cuidar da infância exige"
            highlight="continuidade"
            description="Alimentação, materiais pedagógicos, ambientes seguros e uma equipe preparada precisam estar presentes todos os dias, não só em épocas de campanha. Quando o apoio chega todo mês, o INAV planeja com mais segurança: organiza compras, cuida da manutenção e amplia ações com antecedência."
            align="center"
            className="max-w-3xl"
          />
          <motion.p
            variants={fadeUp}
            {...revealOnScroll}
            className="mt-8 inline-block rounded-3xl bg-brand-blue-soft px-6 py-3.5 font-display font-bold text-brand-blue-deep sm:rounded-full sm:px-8"
          >
            Um apoio que continua. Um cuidado que não para.
          </motion.p>
        </div>
      </section>

      {/* Quem é o INAV */}
      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Instituto Nair Valadares"
              title="Cuidando de crianças"
              highlight="desde 2000"
              description="O INAV nasceu no Riacho Fundo II, em homenagem a Dona Nair Valadares. Desde 2002, oferece educação infantil gratuita, em período integral, a crianças de 2 e 3 anos."
            />
            <motion.div variants={stagger} {...revealOnScroll}>
              <motion.dl variants={fadeUp} className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
                {numeros.map(({ valor, rotulo }) => (
                  <div key={rotulo} className="flex flex-col-reverse justify-end">
                    <dt className="mt-2 text-[0.7rem] font-bold uppercase leading-snug text-brand-blue-deep sm:text-xs">
                      {rotulo}
                    </dt>
                    <dd className="font-display text-3xl font-extrabold leading-none text-brand-green sm:text-5xl">
                      {valor}
                    </dd>
                  </div>
                ))}
              </motion.dl>
              <motion.p variants={fadeUp} className="mt-3 text-xs text-muted-foreground">
                Dados de 2024 e 2025.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-7">
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
          <motion.img
            variants={fadeUp}
            {...revealOnScroll}
            src="/img/amigos-inav/atividade-a-mesa.jpg"
            alt="Crianças do INAV em atividade à mesa na sala."
            width={1000}
            height={800}
            loading="lazy"
            className="-order-1 aspect-[5/4] w-full rounded-3xl object-cover shadow-lift lg:order-none"
          />
        </div>
      </section>

      {/* Para onde vai o apoio */}
      <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
        <Ilustracao
          nome="borboleta"
          className="absolute right-[5%] top-14 -z-10 hidden w-11 rotate-6 xl:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Para onde vai o seu apoio"
            title="O que o seu apoio"
            highlight="ajuda a manter"
            description="Os recursos entram no planejamento anual do INAV e são aplicados conforme orçamento aprovado, com documentação de cada despesa."
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            {apoios.map(({ titulo, texto, foto, alt }) => (
              <motion.article
                key={titulo}
                variants={fadeUp}
                className="group flex overflow-hidden rounded-2xl bg-brand-blue-soft sm:block"
              >
                <div className="w-2/5 shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-full">
                  <img
                    src={foto}
                    alt={alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6 sm:text-center">
                  <h3 className="font-extrabold uppercase leading-snug text-brand-blue-deep">
                    {titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            {...revealOnScroll}
            className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground"
          >
            Uma parte dos recursos cobre a gestão responsável do programa, como contabilidade e
            auditoria, com custos divulgados por categoria.
          </motion.p>
        </div>
      </section>

      {/* Pessoa ou empresa */}
      <section
        id="participar"
        className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24"
      >
        <Cena nome="duas-nuvens" className="left-[4%] top-12 w-32 lg:hidden xl:block" />
        <Ilustracao
          nome="abelha"
          className="absolute right-[7%] top-20 -z-10 hidden w-12 -rotate-6 xl:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quero me envolver"
            title="Escolha como"
            highlight="fazer parte"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mx-auto mt-12 grid max-w-4xl gap-6 sm:mt-14 md:grid-cols-2"
          >
            {perfisDeApoio.map((item) => (
              <motion.div
                key={item.perfil}
                variants={fadeUp}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft sm:p-8"
              >
                <img
                  src={item.selo}
                  alt={item.seloAlt}
                  width={72}
                  height={72}
                  loading="lazy"
                  className="size-[4.5rem]"
                />
                <h3 className="mt-5 text-lg font-bold text-brand-blue-deep">{item.titulo}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
                <a
                  href="#participe"
                  onClick={() => setPerfil(item.perfil)}
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-orange"
                >
                  {item.chamada}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-background pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Passo a passo"
            title="Como"
            highlight="funciona"
            align="center"
          />
          <motion.ol
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-7 lg:grid-cols-4"
          >
            {passos.map(({ titulo, texto }, i) => (
              <motion.li key={titulo} variants={fadeUp} className="text-center">
                <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-brand-blue-soft font-display text-xl font-extrabold text-brand-blue-deep sm:size-16 sm:text-2xl">
                  {i + 1}
                </span>
                <h3 className="font-bold leading-snug text-brand-blue-deep">{titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{texto}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Prestação de contas */}
      <section id="prestacao-de-contas" className="bg-brand-blue-deep">
        <WaveDivider variant="up" className="-mt-px text-background" height="md" />
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          <SectionHeading
            eyebrow="Transparência"
            title="Você acompanha"
            highlight="cada passo"
            description="Cada contribuição é registrada e conciliada. As informações são publicadas aqui, em linguagem simples, sem precisar de cadastro."
            align="center"
            tone="light"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid items-center gap-6 sm:mt-14 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <motion.dl
              variants={fadeUp}
              className="rounded-3xl border border-white/15 bg-white/[0.07] px-6 py-2 sm:px-8"
            >
              {calendario.map(({ quando, oQue }) => (
                <div
                  key={quando}
                  className="grid gap-1 border-b border-white/12 py-4 last:border-0 sm:grid-cols-[13rem_1fr] sm:gap-5"
                >
                  <dt className="font-display text-sm font-bold uppercase text-brand-green-light">
                    {quando}
                  </dt>
                  <dd className="text-[0.95rem] text-white/85">{oQue}</dd>
                </div>
              ))}
            </motion.dl>
            <motion.div variants={fadeUp} className="rounded-3xl bg-card p-7 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
                Resumo financeiro
              </p>
              <dl className="mt-4">
                {resumoFinanceiro.map(({ rotulo, valor }) => (
                  <div
                    key={rotulo}
                    className="flex justify-between border-b border-border py-3 text-sm text-muted-foreground"
                  >
                    <dt>{rotulo}</dt>
                    <dd className="font-bold text-brand-blue-deep">{valor}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-foreground">
                O primeiro resumo financeiro será publicado aqui até o dia 20 do mês seguinte ao
                início das contribuições.
              </p>
              <Link
                to="/transparencia"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-orange"
              >
                Ver documentos de transparência
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <WaveDivider variant="down" className="-mb-px text-background" height="md" />
      </section>

      {/* Mural de apoiadores */}
      <section className="relative isolate overflow-hidden bg-background pb-20 pt-10 sm:pb-24 sm:pt-14">
        <Ilustracao
          nome="passarinho"
          className="absolute left-[7%] top-24 -z-10 hidden w-14 xl:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Mural de apoiadores"
            title="Quem já"
            highlight="faz parte"
            description="Pessoas e empresas que apoiam o INAV e autorizaram a divulgação do seu nome ou marca."
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-surface-tint p-8 text-center sm:mt-12 sm:p-11"
          >
            <motion.img
              variants={fadeUp}
              src={SELO}
              alt=""
              width={84}
              height={84}
              loading="lazy"
              className="mx-auto size-[5.25rem]"
            />
            <motion.h3
              variants={fadeUp}
              className="mt-5 text-xl font-bold leading-snug text-brand-blue-deep sm:text-2xl"
            >
              Os primeiros Amigos INAV vão aparecer aqui.
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-1.5 text-muted-foreground">
              Que tal ser um deles?
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6">
              <a href="#participe" className={botaoContorno}>
                Quero ser Amigo INAV
              </a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 text-sm text-muted-foreground">
              Quem preferir pode apoiar de forma anônima.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Dúvidas"
            title="Perguntas"
            highlight="frequentes"
            align="center"
          />
          <motion.div variants={fadeUp} {...revealOnScroll} className="mt-10 sm:mt-12">
            <Accordion
              type="single"
              collapsible
              defaultValue="0"
              className="grid gap-3"
            >
              {perguntas.map(({ pergunta, resposta }, i) => (
                <AccordionItem
                  key={pergunta}
                  value={String(i)}
                  className="rounded-2xl border border-border bg-card px-5 sm:px-6"
                >
                  <AccordionTrigger className="gap-4 py-5 font-display text-base font-bold text-brand-blue-deep hover:no-underline">
                    {pergunta}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Formulário: não processa pagamento, a equipe combina a forma de contribuir. */}
      <section id="participe" className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="warm-gradient relative overflow-hidden rounded-3xl px-5 py-10 text-white shadow-cta sm:px-12 sm:py-14"
          >
            <div
              className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-sm font-bold uppercase tracking-[0.18em] text-white/85"
                >
                  Seja Amigo INAV
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="mt-3 text-3xl font-extrabold uppercase leading-[1.05] text-balance-pretty sm:text-4xl lg:text-5xl"
                >
                  Faça parte de quem cuida da infância todo mês
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-4 text-white/90 sm:text-lg">
                  Deixe seu contato. A equipe do INAV vai conversar com você sobre a melhor forma de
                  participar.
                </motion.p>
              </div>
              <motion.div variants={fadeUp}>
                <AmigosForm perfil={perfil} onPerfilChange={setPerfil} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outras formas de ajudar. Última seção antes do rodapé: sem canteiro, para não repetir a paisagem. */}
      <section
        id="doacao"
        className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24"
      >
        <Ilustracao
          nome="joaninha"
          className="absolute right-[6%] top-16 -z-10 hidden w-9 xl:block"
        />
        <Cena nome="duas-nuvens" className="left-[4%] top-12 w-32 lg:hidden xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Outras formas de ajudar"
            title="Prefere doar"
            highlight="uma vez?"
            description="Sem cadastro e sem compromisso: qualquer valor já ajuda na alimentação e no material pedagógico das crianças. Para doar todo mês, é só preencher o formulário acima."
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-[1.4fr_1fr] lg:items-stretch"
          >
            <PixDonationCard comQrCode />
            <div className="grid gap-6">
              <motion.div
                id="bazar"
                variants={fadeUp}
                className="flex flex-col justify-center rounded-3xl bg-brand-blue-soft p-7 sm:p-8"
              >
                <h3 className="text-2xl font-extrabold uppercase leading-tight text-brand-blue-deep">
                  Compre no bazar <span className="text-brand-green">solidário</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Escolha pelo site, envie o pedido pelo WhatsApp e retire no INAV. Cada compra
                  ajuda a fortalecer as atividades do instituto.
                </p>
                <div className="mt-5">
                  <Link
                    to="/bazar"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors duration-200 hover:bg-brand-blue-deep"
                  >
                    Conhecer o bazar
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="flex flex-col justify-center rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-8"
              >
                <h3 className="text-2xl font-extrabold uppercase leading-tight text-brand-blue-deep">
                  Quer conversar antes de decidir?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Fale direto com a equipe pelo WhatsApp. Explicamos como o recurso é aplicado,
                  enviamos os relatórios e combinamos uma visita ao instituto.
                </p>
                <div className="mt-5">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity duration-200 hover:opacity-90"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
