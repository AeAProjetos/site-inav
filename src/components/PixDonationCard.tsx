import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, QrCode } from "lucide-react";

import { site } from "@/lib/site-config";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

export function PixDonationCard() {
  const [copied, setCopied] = useState(false);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(site.pixKey);
    } catch {
      /* Ambientes sem permissão de clipboard: a chave segue visível na tela. */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <motion.div
      variants={stagger}
      {...revealOnScroll}
      className="warm-gradient relative overflow-hidden rounded-3xl px-6 py-10 text-white shadow-cta sm:px-12 sm:py-14"
    >
      <div
        className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-10 size-72 rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[0.18em] text-white/80"
          >
            Doe agora
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-3xl font-extrabold uppercase leading-tight text-balance-pretty sm:text-4xl"
          >
            Sua doação vira prato de comida, livro e acolhimento
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-lg text-white/85">
            Qualquer valor faz diferença. Com o PIX, sua contribuição chega ao instituto
            em segundos e vai direto para a alimentação, o material pedagógico e o
            cuidado diário das crianças.
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl bg-white/15 p-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white/85">
            <QrCode className="size-4" aria-hidden="true" />
            Chave PIX ({site.pixLabel})
          </div>
          <p className="mt-3 break-all font-display text-xl font-bold sm:text-2xl">
            {site.pixKey}
          </p>
          <button
            type="button"
            onClick={copyKey}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-orange transition-transform duration-200 hover:scale-[1.03]"
          >
            {copied ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                Chave copiada!
              </>
            ) : (
              <>
                <Copy className="size-4" aria-hidden="true" />
                Copiar chave
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-white/70" role="status">
            {copied ? "Cole a chave no app do seu banco." : "\u00a0"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
