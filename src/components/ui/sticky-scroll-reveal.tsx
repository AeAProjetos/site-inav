/**
 * StickyScroll — Padrão Aceternity UI corrigido
 *
 * CORREÇÃO CRÍTICA: useScroll({ container: ref }) — o scroll é INTERNO.
 * O container tem altura fixa + overflow-y: auto. O conteúdo esquerdo
 * é mais alto que o container, criando scroll interno. O conteúdo direito
 * fica sticky dentro desse scroll interno.
 */

import React, { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StickyScrollContent {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyScrollContent[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div
      ref={ref}
      className="relative flex h-[32rem] justify-between gap-8 overflow-y-auto rounded-3xl px-6 py-4 md:px-10 md:py-6 scrollbar-hide"
      style={{
        background: 'hsl(38, 44%, 98%)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* ── Coluna esquerda: textos que rolam ── */}
      <div className="relative flex-1 max-w-lg">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="my-16 first:mt-4 last:mb-4 md:my-24"
          >
            <motion.h3
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              transition={{ duration: 0.35 }}
              className="font-display text-2xl font-bold text-slate-900 md:text-3xl leading-tight"
            >
              {item.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              transition={{ duration: 0.35 }}
              className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-500"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        {/* Espaço extra para garantir que o último item consiga ativar */}
        <div className="h-32" />
      </div>

      {/* ── Coluna direita: card visual sticky ── */}
      <div
        className={cn(
          'sticky top-0 hidden h-[28rem] w-[22rem] flex-shrink-0 overflow-hidden rounded-3xl shadow-2xl lg:block xl:h-[28rem] xl:w-[28rem]',
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
