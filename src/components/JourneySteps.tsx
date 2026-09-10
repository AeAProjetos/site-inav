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
    image: "/img/hero_criancas.jpg",
    imageAlt: "Crianças brincando com blocos coloridos em sala de aula do INAV",
  },
  {
    icon: Sprout,
    step: "02",
    title: "Nutrir",
    description:
      "Cinco refeições diárias balanceadas, acompanhamento nutricional e cuidado multidisciplinar para que o corpo e a mente tenham base para crescer.",
    image: "/img/refeicao_rotina.jpg",
    imageAlt: "Educadora acompanhando crianças durante a refeição no instituto",
  },
  {
    icon: GraduationCap,
    step: "03",
    title: "Transformar",
    description:
      "Educação infantil gratuita e de qualidade, oficinas culturais e apoio às famílias — construindo autonomia que dura a vida toda.",
    image: "/img/atelie_sabor.jpg",
    imageAlt: "Mães em oficina do Ateliê do Sabor, preparando pães na padaria comunitária",
  },
];

export function JourneySteps() {
  return (
    <motion.ol
      variants={stagger}
      {...revealOnScroll}
      className="grid gap-6 md:grid-cols-3"
    >
      {steps.map(({ icon: Icon, step, title, description, image, imageAlt }) => (
        <motion.li
          key={step}
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group overflow-hidden rounded-2xl border border-border bg-[rgba(188, 218, 255, 1)] shadow-soft transition-shadow duration-300 hover:shadow-lift"
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
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-extrabold uppercase text-brand-blue-deep">
                {title}
              </h3>
              <span className="inline-flex items-center rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Passo {step}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}
