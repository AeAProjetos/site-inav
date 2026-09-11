import { motion } from "motion/react";
import { HandHeart, Sprout, GraduationCap } from "lucide-react";

import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

const steps = [
  {
    icon: HandHeart,
    step: "01",
    title: "Escuta e acompanhamento",
    description:
      "Cada criança é recebida com atenção às suas necessidades, em um ambiente seguro, acolhedor e preparado para o seu desenvolvimento.",
    image: "/img/hero_criancas.jpg",
    imageAlt: "Crianças brincando com blocos coloridos em sala de aula do INAV",
  },
  {
    icon: Sprout,
    step: "02",
    title: "Alimentação e cuidado",
    description:
      "Cinco refeições diárias e acompanhamento nutricional contribuem para uma rotina saudável e para o desenvolvimento integral das crianças.",
    image: "/img/refeicao_rotina.jpg",
    imageAlt: "Educadora acompanhando crianças durante a refeição no instituto",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Aprendizagem e desenvolvimento",
    description:
      "A educação infantil em período integral une experiências pedagógicas, convivência e cuidado para favorecer o desenvolvimento nos primeiros anos de vida.",
    image: "/img/atelie_sabor.jpg",
    imageAlt: "Mães em oficina do Ateliê do Sabor, preparando pães na padaria comunitária",
  },
];

export function JourneySteps() {
  return (
    <motion.ol
      variants={stagger}
      {...revealOnScroll}
      className="grid gap-10 md:grid-cols-3"
    >
      {steps.map(({ icon: Icon, step, title, description, image, imageAlt }) => (
        <motion.li
          key={step}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group overflow-hidden rounded-2xl border border-border bg-[rgba(107, 173, 253, 1)] shadow-soft transition-shadow duration-300 hover:shadow-lift"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 inline-flex size-12 items-center justify-center rounded-xl bg-brand-green text-white shadow-lift">
              <Icon className="size-6" aria-hidden="true" />
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-lx font-extrabold uppercase text-brand-blue-deep text-center">
              {title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-center">
              {description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
