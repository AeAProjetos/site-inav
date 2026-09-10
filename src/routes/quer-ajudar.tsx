import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Building2, HeartHandshake, MessageCircle, Package } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { PixDonationCard } from "@/components/PixDonationCard";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quer-ajudar")({
  head: () => ({
    meta: [
      { title: "Quer Ajudar — Doe ou apadrinhe | INAV" },
      {
        name: "description",
        content:
          "Doe via PIX ou torne-se padrinho no Instituto Nair Valadares. Cada apoio sustenta o atendimento gratuito.",
      },
      { property: "og:title", content: "Quer Ajudar — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Doação via PIX, apadrinhamento e parcerias empresariais: escolha a forma de apoiar o INAV.",
      },
    ],
  }),
  component: QuerAjudarPage,
});

const itemDonation = {
  icon: Package,
  title: "Doação de itens",
  description:
    "Alimentos não perecíveis, fraldas, produtos de higiene, roupas e material pedagógico em bom estado são bem-vindos.",
  accent: "orange" as const,
};

const involvementAccents = {
  blue: "bg-brand-blue-soft text-brand-blue-deep",
  orange: "bg-brand-orange/12 text-brand-orange",
  green: "bg-brand-green/12 text-brand-green",
};

const involvementWays = [
  {
    slug: "apadrinhamento",
    icon: HeartHandshake,
    title: "Apadrinhamento mensal",
    description:
      "A doação recorrente é o que dá previsibilidade ao instituto. Com ela conseguimos planejar o ano inteiro de atendimento.",
    accent: "blue" as const,
  },
  {
    slug: "parceria",
    icon: Building2,
    title: "Parceria empresarial",
    description:
      "Sua empresa pode adotar um projeto, patrocinar uma frente ou apoiar via incentivo fiscal, com relatório de impacto.",
    accent: "green" as const,
  },
] as const;

function QuerAjudarPage() {
  return (
    <>
      <PageHero
        eyebrow="Quer ajudar"
        title="Seu apoio vira comida, aula e"
        highlight="futuro"
        description="O instituto se mantém com doações de pessoas e empresas que acreditam que a primeira infância é o melhor investimento social possível. Escolha a forma que faz sentido para você."
      />

      {/* Doação direta — ação imediata, sem compromisso continuado */}
      <section id="doacao" className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Doação direta"
            title="Ajude agora, em"
            highlight="poucos segundos"
            description="Sem cadastro, sem burocracia — qualquer valor já ajuda na alimentação e no material pedagógico das crianças."
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch"
          >
            <PixDonationCard />
            <FeatureCard {...itemDonation} className="h-full" />
          </motion.div>
        </div>
      </section>

      {/* Envolvimento — relação contínua, passa por uma conversa */}
      <section id="envolvimento" className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quero me envolver"
            title="Formas de fazer parte da"
            highlight="história"
            description="Apadrinhamento e parceria empresarial são compromissos contínuos — conte pra gente o que faz sentido pra você e seguimos juntos a partir daí."
            align="center"
          />

          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2"
          >
            {involvementWays.map(({ slug, icon: Icon, title, description, accent }) => (
              <motion.div key={slug} variants={fadeUp}>
                <Link
                  to="/contato"
                  search={{ motivo: slug }}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <span
                    className={cn(
                      "inline-flex size-12 items-center justify-center rounded-xl",
                      involvementAccents[accent],
                    )}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-brand-blue-deep">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-orange">
                    Quero conversar
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-10 rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12"
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-extrabold uppercase leading-tight text-brand-blue-deep sm:text-3xl"
            >
              Quer conversar antes de decidir?
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground"
            >
              Fale direto com a equipe pelo WhatsApp. Explicamos como o recurso é aplicado,
              enviamos os relatórios e combinamos uma visita ao instituto.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity duration-200 hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Falar no WhatsApp
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue hover:text-white"
              >
                Página de contato
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
