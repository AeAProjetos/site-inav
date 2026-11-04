import { motion } from "motion/react";

import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { site } from "@/lib/site-config";

const passos = [
  {
    titulo: "Escolha os itens",
    texto:
      "Coloque na sacola o que quiser levar. Nos produtos com várias unidades, escolha quantas.",
  },
  {
    titulo: "Envie pelo WhatsApp",
    texto:
      "A sacola monta a mensagem com os códigos dos itens. A equipe confirma a reserva e combina a retirada.",
  },
  {
    titulo: "Pague e retire no INAV",
    texto: `Pague na retirada ou adiante por Pix, que a equipe envia ao confirmar a reserva. ${site.hours}.`,
  },
];

export function ComoFunciona() {
  return (
    <section className="bg-surface-tint py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Como funciona o" highlight="bazar" />
        <motion.ol
          variants={stagger}
          {...revealOnScroll}
          className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {passos.map((passo, i) => (
            <motion.li
              key={passo.titulo}
              variants={fadeUp}
              className="border-t-2 border-border pt-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-brand-green text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-extrabold uppercase text-brand-blue-deep">
                {passo.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{passo.texto}</p>
            </motion.li>
          ))}
        </motion.ol>
        <p className="mt-10 text-sm text-muted-foreground">
          Peças únicas ficam reservadas por 2 dias úteis. Se a reserva não for confirmada, a peça
          volta para o bazar.
        </p>
      </div>
    </section>
  );
}
