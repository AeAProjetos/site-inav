import { motion } from "motion/react";
import { HandHeart, Sprout, GraduationCap } from "lucide-react";

import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

const steps = [
  {
    icon: HandHeart,
    step: "01",
    title: "Acolher",
    description:
      "A criança e a família chegam ao instituto e são recebidas por uma equipe que escuta, avalia e entende cada realidade antes de qualquer coisa.",
  },
  {
    icon: Sprout,
    step: "02",
    title: "Nutrir",
    description:
      "Quatro refeições diárias balanceadas, acompanhamento nutricional e cuidado multidisciplinar para que o corpo e a mente tenham base para crescer.",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Transformar",
    description:
      "Educação infantil gratuita e de qualidade, oficinas culturais e apoio às famílias — construindo autonomia que dura a vida toda.",
  },
];

export function JourneySteps() {
  return (
    <motion.ol
      variants={stagger}
      {...revealOnScroll}
      className="grid gap-6 md:grid-cols-3"
    >
      {steps.map(({ icon: Icon, step, title, description }) => (
        <motion.li
          key={step}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft transition-shadow duration-300 hover:shadow-lift"
        >
          <span
            className="pointer-events-none absolute -right-3 -top-5 font-display text-8xl font-extrabold text-brand-blue-soft"
            aria-hidden="true"
          >
            {step}
          </span>
          <span className="relative inline-flex size-12 items-center justify-center rounded-xl bg-brand-green/12 text-brand-green">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="relative mt-5 text-xl font-extrabold uppercase text-brand-blue-deep">
            {title}
          </h3>
          <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
