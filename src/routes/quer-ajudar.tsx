import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { HandCoins, HeartHandshake, Building2, Package, Users, ArrowRight } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { PixDonationCard } from "@/components/PixDonationCard";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/quer-ajudar")({
  head: () => ({
    meta: [
      { title: "Quer Ajudar — Doe, apadrinhe ou seja voluntário | INAV" },
      {
        name: "description",
        content:
          "Doe via PIX, torne-se padrinho, firme uma parceria empresarial ou seja voluntário no Instituto Nair Valadares. Cada apoio sustenta o atendimento gratuito.",
      },
      { property: "og:title", content: "Quer Ajudar — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Doação via PIX, apadrinhamento, parcerias empresariais e voluntariado: escolha a forma de apoiar o INAV.",
      },
    ],
  }),
  component: QuerAjudarPage,
});

const ways = [
  {
    icon: HandCoins,
    title: "Doação pontual",
    description:
      "Qualquer valor ajuda. Uma doação única já cobre refeições, material pedagógico e itens de higiene para as crianças.",
    accent: "orange" as const,
  },
  {
    icon: HeartHandshake,
    title: "Apadrinhamento mensal",
    description:
      "A doação recorrente é o que dá previsibilidade ao instituto. Com ela conseguimos planejar o ano inteiro de atendimento.",
    accent: "blue" as const,
  },
  {
    icon: Building2,
    title: "Parceria empresarial",
    description:
      "Sua empresa pode adotar um projeto, patrocinar uma frente ou apoiar via incentivo fiscal, com relatório de impacto.",
    accent: "green" as const,
  },
  {
    icon: Package,
    title: "Doação de itens",
    description:
      "Alimentos não perecíveis, fraldas, produtos de higiene, roupas e material pedagógico em bom estado são bem-vindos.",
    accent: "orange" as const,
  },
  {
    icon: Users,
    title: "Voluntariado",
    description:
      "Doe tempo e talento: oficinas, apoio administrativo, manutenção, comunicação ou eventos. Toda ajuda entra numa escala organizada.",
    accent: "blue" as const,
  },
];

function QuerAjudarPage() {
  return (
    <>
      <PageHero
        eyebrow="Quer ajudar"
        title="Seu apoio vira comida, aula e"
        highlight="futuro"
        description="O instituto se mantém com doações de pessoas e empresas que acreditam que a primeira infância é o melhor investimento social possível. Escolha a forma que faz sentido para você."
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Formas de apoiar"
            title="Cinco maneiras de fazer"
            highlight="diferença"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {ways.map((way) => (
              <FeatureCard key={way.title} {...way} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PixDonationCard />
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold uppercase leading-tight text-brand-blue-deep sm:text-4xl"
            >
              Quer conversar antes de decidir?
            </motion.h2>
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
                Falar no WhatsApp
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue hover:text-white"
              >
                Página de contato
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
