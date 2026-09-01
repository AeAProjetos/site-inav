import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { FileText, ShieldCheck, PieChart, Scale, Download } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

export const Route = createFileRoute("/transparencia")({
  head: () => ({
    meta: [
      { title: "Transparência — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Relatórios anuais, demonstrações financeiras, certidões e prestação de contas do Instituto Nair Valadares, aberta a doadores e parceiros.",
      },
      { property: "og:title", content: "Transparência — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Prestação de contas aberta: relatórios de atividades, balanços financeiros e documentos institucionais do INAV.",
      },
    ],
  }),
  component: TransparenciaPage,
});

const commitments = [
  {
    icon: ShieldCheck,
    title: "Governança",
    description:
      "Diretoria eleita em assembleia, conselho fiscal atuante e estatuto social registrado — decisões colegiadas e documentadas.",
    accent: "blue" as const,
  },
  {
    icon: PieChart,
    title: "Aplicação dos recursos",
    description:
      "Cada doação é destinada às frentes de educação, nutrição e manutenção do atendimento, com detalhamento em relatório.",
    accent: "green" as const,
  },
  {
    icon: Scale,
    title: "Conformidade legal",
    description:
      "Certidões negativas em dia, escrituração contábil regular e auditoria das contas apresentadas aos órgãos competentes.",
    accent: "orange" as const,
  },
];

const documents = [
  { label: "Relatório anual de atividades", note: "Publicação anual" },
  { label: "Demonstrações financeiras", note: "Balanço patrimonial e DRE" },
  { label: "Estatuto social", note: "Documento constitutivo" },
  { label: "Certidões e registros", note: "Documentação regular" },
];

function TransparenciaPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparência"
        title="Contas abertas para quem"
        highlight="confia"
        description="Quem doa tem o direito de saber exatamente para onde o recurso vai. Publicamos relatórios, balanços e documentos institucionais para que qualquer pessoa possa conferir."
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nossos compromissos"
            title="Como cuidamos de cada"
            highlight="real"
            align="center"
          />
          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="mt-14 grid gap-6 md:grid-cols-3"
          >
            {commitments.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Documentos"
            title="Prestação de contas"
            highlight="pública"
            description="Os documentos abaixo podem ser solicitados a qualquer momento pelo nosso canal de contato enquanto a área de downloads é publicada."
          />

          <motion.ul variants={stagger} {...revealOnScroll} className="mt-12 space-y-4">
            {documents.map((doc) => (
              <motion.li
                key={doc.label}
                variants={fadeUp}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue-deep">
                    <FileText className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-bold text-brand-blue-deep">{doc.label}</p>
                    <p className="text-sm text-muted-foreground">{doc.note}</p>
                  </div>
                </div>
                <a
                  href="/contato"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-blue/30 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue hover:text-white"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Solicitar
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
