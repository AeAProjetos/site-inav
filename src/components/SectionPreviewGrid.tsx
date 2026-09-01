import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Users, BookOpen, Sparkles, FileText } from "lucide-react";

import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

const previews = [
  {
    to: "/quem-somos" as const,
    icon: Users,
    title: "Quem Somos",
    description:
      "Mais de duas décadas construindo uma rede de cuidado no coração da comunidade.",
  },
  {
    to: "/educacao-infantil" as const,
    icon: BookOpen,
    title: "Educação Infantil",
    description:
      "Creche e pré-escola gratuitas, com rotina pedagógica e nutrição acompanhada.",
  },
  {
    to: "/projetos" as const,
    icon: Sparkles,
    title: "Projetos",
    description:
      "Horta comunitária, ateliê do saber e oficinas que envolvem crianças e famílias.",
  },
  {
    to: "/transparencia" as const,
    icon: FileText,
    title: "Transparência",
    description:
      "Relatórios, balanços e prestações de contas abertos a quem confia no instituto.",
  },
];

export function SectionPreviewGrid() {
  return (
    <motion.div
      variants={stagger}
      {...revealOnScroll}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      {previews.map(({ to, icon: Icon, title, description }) => (
        <motion.div key={to} variants={fadeUp}>
          <Link
            to={to}
            className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/40 hover:shadow-lift"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue-deep transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-extrabold uppercase text-brand-blue-deep">
              {title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-orange">
              Ver mais
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
