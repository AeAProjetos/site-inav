import { useState } from "react";
import { motion } from "motion/react";

import { ImageLightbox } from "@/components/Lightbox";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export type FotoDaGaleria = {
  src: string;
  alt: string;
  ano: string;
  legenda: string;
  /** "grande" ocupa 2 × 2 células; "larga", 2 × 1. Sem tamanho, 1 célula. */
  tamanho?: "grande" | "larga";
  /** Enquadramento, ex.: "object-[center_35%]". */
  className?: string;
};

/** Grade em mosaico com ano e legenda sobre cada foto. Clicar amplia; as setas percorrem todas. */
export function GaleriaAnos({ fotos }: { fotos: FotoDaGaleria[] }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const foto = aberta === null ? undefined : fotos[aberta];

  return (
    <>
      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="grid auto-rows-[150px] grid-cols-2 gap-2.5 sm:auto-rows-[200px] sm:gap-3.5 lg:auto-rows-[230px] lg:grid-cols-4"
      >
        {fotos.map((item, indice) => (
          <motion.li
            key={item.src}
            variants={fadeUp}
            className={cn(
              item.tamanho === "grande" && "col-span-2 row-span-2",
              item.tamanho === "larga" && "col-span-2",
            )}
          >
            <button
              type="button"
              onClick={() => setAberta(indice)}
              aria-label={`Ampliar foto de ${item.ano}: ${item.alt}`}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl bg-surface-tint shadow-soft"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={cn(
                  "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105",
                  item.className,
                )}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-deep/90 to-transparent px-3 pb-3 pt-10 text-left text-[0.8rem] leading-snug text-white sm:px-4 sm:pb-3.5 sm:text-[0.95rem]">
                <span className="mb-1.5 table rounded-full bg-brand-green-light px-2.5 py-0.5 font-display text-[11px] font-extrabold tracking-[0.06em] text-brand-blue-deep">
                  {item.ano}
                </span>
                {item.legenda}
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>

      {foto && aberta !== null && (
        <ImageLightbox
          src={foto.src}
          alt={foto.alt}
          label={`${foto.legenda} · ${foto.ano}`}
          onClose={() => setAberta(null)}
          onPrev={() => setAberta((aberta - 1 + fotos.length) % fotos.length)}
          onNext={() => setAberta((aberta + 1) % fotos.length)}
        />
      )}
    </>
  );
}
