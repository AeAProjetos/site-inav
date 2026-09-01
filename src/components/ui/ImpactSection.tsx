/**
 * ImpactSection — Flood / Curtain Reveal Effect
 *
 * A seção "inunda" a tela de baixo para cima usando clip-path animado
 * via useScroll + useTransform do Framer Motion, cobrindo a Hero como
 * uma cortina escura. Os 4 cards aparecem com stagger após o reveal.
 *
 * Referência: Constantinos Haritos — Flood Effect Page Transition
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/* ── Dados ── */

interface ImpactCardData {
  id: string;
  number: string;
  label: string;
  image: string;
  imageAlt: string;
}

const IMPACT_CARDS: ImpactCardData[] = [
  {
    id: 'criancas',
    number: '240',
    label: 'Crianças Assistidas',
    image: '/img/hero_criancas.jpg',
    imageAlt: 'Crianças em atividades na Creche INAV',
  },
  {
    id: 'anos',
    number: '25+',
    label: 'Anos de Fundação',
    image: '/img/refeicao_rotina.jpg',
    imageAlt: 'História e rotina de cuidado no INAV',
  },
  {
    id: 'refeicoes',
    number: '4',
    label: 'Refeições ao Dia',
    image: '/img/atelie_sabor.jpg',
    imageAlt: 'Refeições balanceadas preparadas no INAV',
  },
  {
    id: 'gratuito',
    number: '100%',
    label: 'Gratuito Para Todos',
    image: '/img/hero_criancas.jpg',
    imageAlt: 'Acolhimento comunitário gratuito no INAV',
  },
];

/* ── Variants (Stagger) ── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 60,
      damping: 15,
    },
  },
};

/* ── Componente ── */

export default function ImpactSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Rastreia o scroll da seção relativo ao viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  // Anima o clip-path de "cortado embaixo" → "totalmente visível"
  // inset(porcentagem-topo 0% 0% 0%) — quando topo=100% a seção está escondida; quando topo=0% está revelada
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced
      ? ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
      : ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  );

  // Parallax sutil no conteúdo interno (sobe junto com a cortina)
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [60, 0]
  );

  return (
    <div ref={sectionRef} className="relative z-10">
      <motion.section
        id="impacto"
        style={{ clipPath }}
        className="bg-primary-dark rounded-[2.5rem]"
      >
        <motion.div
          style={{ y: contentY }}
          className="container mx-auto max-w-7xl px-04 mt-10 sm:px-10 lg:px-10 py- md:py-20 lg:py-24"
        >

          {/* ── Heading alinhado à esquerda ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.10 }}
            transition={{ duration: 0.7, ease: [0.10, 1, 0.36, 1] }}
            className="mb-10 md:mb-14 max-w-xl"
          >
            <span className="block text-base font-bold tracking-[0.30em] uppercase text-brandOrange mb-10 mt-">
              Nosso Impacto
            </span>
            <h2 className="font-display text-3xl sm:text-3xl lg:text-[3.75rem] font-black text-white leading-[0.95] tracking-tight">
              Números que traduzem{' '}
              <br className="hidden sm:block" />
              uma história de cuidado
            </h2>
          </motion.div>

          {/* ── Grid 4 colunas ── */}
          <motion.div
            variants={containerVariants}
            initial={prefersReduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {IMPACT_CARDS.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="relative overflow-hidden rounded-3xl shadow-2xl group aspect-[3/4]"
              >
                {/* Imagem */}
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay Escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10" />

                {/* Texto */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 lg:p-7">
                  <span className="font-display text-5xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-none tracking-tight mb-1.5">
                    {item.number}
                  </span>
                  <span className="text-sm text-neutral-300 font-medium leading-snug">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.section>
    </div>
  );
}
