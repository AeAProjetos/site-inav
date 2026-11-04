import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Images, ZoomIn } from "lucide-react";

import { ImageLightbox } from "@/components/Lightbox";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  /** Sem `src`, a célula mostra o `placeholder` no lugar da foto. */
  src?: string;
  alt: string;
  placeholder?: ReactNode;
};

const VISIBLE = 5;

/**
 * Grade com uma foto grande e quatro menores. Clicar abre a foto ampliada com setas
 * para percorrer todas; acima de cinco fotos aparece o botão "Ver mais fotos".
 */
export function PhotoGallery({ items }: { items: GalleryItem[] }) {
  const photos = items.filter((item): item is GalleryItem & { src: string } => Boolean(item.src));
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? undefined : photos[openIndex];
  const hasMore = photos.length > VISIBLE;

  return (
    <>
      <motion.div
        variants={stagger}
        {...revealOnScroll}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {items.slice(0, VISIBLE).map((item, index) => {
          const photoIndex = item.src ? photos.indexOf(item as GalleryItem & { src: string }) : -1;
          return (
            <motion.div
              key={item.src ?? `pendente-${index}`}
              variants={fadeUp}
              className={cn(
                "aspect-square",
                index === 0 && "col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto",
              )}
            >
              {item.src ? (
                <button
                  type="button"
                  onClick={() => setOpenIndex(photoIndex)}
                  aria-label={`Ampliar foto: ${item.alt}`}
                  className="group relative block size-full cursor-pointer overflow-hidden rounded-2xl shadow-soft"
                >
                  {/* absolute: a foto preenche a célula sem ditar a altura da grade (uma foto em pé abriria vãos). */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-brand-blue-deep/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lift">
                      <ZoomIn className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              ) : (
                item.placeholder
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setOpenIndex(VISIBLE < photos.length ? VISIBLE : 0)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue-deep px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue-deep hover:text-white"
          >
            <Images className="size-4" aria-hidden="true" />
            Ver mais fotos ({photos.length})
          </button>
        </div>
      )}

      {open && openIndex !== null && (
        <ImageLightbox
          src={open.src}
          alt={open.alt}
          label={`${openIndex + 1} de ${photos.length}`}
          onClose={() => setOpenIndex(null)}
          onPrev={
            photos.length > 1
              ? () => setOpenIndex((openIndex - 1 + photos.length) % photos.length)
              : undefined
          }
          onNext={
            photos.length > 1 ? () => setOpenIndex((openIndex + 1) % photos.length) : undefined
          }
        />
      )}
    </>
  );
}
