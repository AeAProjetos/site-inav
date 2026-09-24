import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Play, X, ZoomIn } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type StructureItem = {
  key: string;
  label: string;
  image?: string;
  imageAlt?: string;
  /** ID do vídeo no YouTube (ex.: "dQw4w9WgXcQ"). Deixe undefined até termos o vídeo real. */
  video?: string;
};

const items: StructureItem[] = [
  {
    key: "salas",
    label: "Salas de atividades",
    image: "/img/estrutura-sala-de-atividades.jpeg",
    imageAlt: "Sala de atividades do INAV organizada e em uso",
  },
  {
    key: "cozinha",
    label: "Cozinha institucional",
    image: "/img/estrutura-cozinha.jpeg",
    imageAlt: "Cozinha institucional do INAV",
  },
  {
    key: "refeitorio",
    label: "Refeitório",
    image: "/img/estrutura-refeitorio.jpeg",
    imageAlt: "Refeitório do INAV em plano aberto",
  },
  {
    key: "brinquedoteca",
    label: "Brinquedoteca",
    image: "/img/estrutura-brinquedoteca.jpeg",
    imageAlt: "Brinquedoteca do INAV com brinquedos organizados",
  },
  {
    key: "leitura",
    label: "Leitura e descanso",
    image: "/img/estrutura-leitura-e-descanso.jpeg",
    imageAlt: "Espaço de leitura e descanso do INAV",
  },
  {
    key: "convivencia",
    label: "Áreas de convivência",
    image: "/img/estrutura-area-de-convivencia.jpeg",
    imageAlt: "Área de convivência do INAV",
  },
];

export function OurStructure() {
  const [activeVideo, setActiveVideo] = useState<StructureItem | null>(null);
  const [activeImage, setActiveImage] = useState<StructureItem | null>(null);

  return (
    <section className="bg-brand-blue-soft py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[400px_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Nossa estrutura"
            title="Espaços para cuidar, aprender e"
            highlight="crescer"
            description="Ambientes preparados para acompanhar diferentes momentos da rotina e do desenvolvimento das crianças."
          />

          <motion.div
            variants={stagger}
            {...revealOnScroll}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {items.map((item) => (
              <motion.div key={item.key} variants={fadeUp}>
                <StructureCell item={item} onOpenVideo={setActiveVideo} onOpenImage={setActiveImage} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {activeVideo?.video && (
        <VideoLightbox
          videoId={activeVideo.video}
          label={activeVideo.label}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {activeImage?.image && (
        <ImageLightbox
          src={activeImage.image}
          alt={activeImage.imageAlt ?? activeImage.label}
          label={activeImage.label}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  );
}

function StructureCell({
  item,
  onOpenVideo,
  onOpenImage,
}: {
  item: StructureItem;
  onOpenVideo: (item: StructureItem) => void;
  onOpenImage: (item: StructureItem) => void;
}) {
  const hasVideo = Boolean(item.video);
  const isClickable = hasVideo || Boolean(item.image);
  const handleOpen = hasVideo ? () => onOpenVideo(item) : () => onOpenImage(item);

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? handleOpen : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
            if (event.key === "Enter" || event.key === " ") handleOpen();
          }
          : undefined
      }
      className={cn(
        "group relative aspect-square overflow-hidden rounded-2xl shadow-soft",
        isClickable && "cursor-pointer",
      )}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.imageAlt ?? item.label}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-blue/25 bg-white/70 text-brand-blue-deep/40">
          <ImageIcon className="size-7" aria-hidden="true" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-wide sm:text-xs">
            Foto em breve
          </span>
        </div>
      )}

      {hasVideo && (
        <span className="absolute inset-0 flex items-center justify-center bg-brand-blue-deep/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lift">
            <Play className="size-5 translate-x-0.5" aria-hidden="true" fill="currentColor" />
          </span>
        </span>
      )}

      {!hasVideo && item.image && (
        <span className="absolute inset-0 flex items-center justify-center bg-brand-blue-deep/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-brand-blue-deep shadow-lift">
            <ZoomIn className="size-5" aria-hidden="true" />
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-deep/85 to-transparent px-3 pb-2.5 pt-8">
        <span className="block text-xs font-extrabold uppercase text-white sm:text-sm">
          {item.label}
        </span>
      </span>
    </div>
  );
}

function useEscapeToClose(onClose: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
}

function VideoLightbox({
  videoId,
  label,
  onClose,
}: {
  videoId: string;
  label: string;
  onClose: () => void;
}) {
  useEscapeToClose(onClose);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="absolute -top-10 right-0 text-white/80 transition-colors hover:text-white"
        >
          <X className="size-7" aria-hidden="true" />
        </button>
        <div className="aspect-video overflow-hidden rounded-xl shadow-lift">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
}

function ImageLightbox({
  src,
  alt,
  label,
  onClose,
}: {
  src: string;
  alt: string;
  label: string;
  onClose: () => void;
}) {
  useEscapeToClose(onClose);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar imagem"
          className="absolute -top-10 right-0 text-white/80 transition-colors hover:text-white"
        >
          <X className="size-7" aria-hidden="true" />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] w-auto rounded-xl object-contain shadow-lift"
        />
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-wide text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}
