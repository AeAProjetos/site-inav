import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function useEscapeToClose(onClose: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
}

/** Foto ampliada. Com `onPrev`/`onNext`, mostra setas e aceita as setas do teclado. */
export function ImageLightbox({
  src,
  alt,
  label,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  alt: string;
  label: string;
  onClose: () => void;
  onPrev?: (() => void) | undefined;
  onNext?: (() => void) | undefined;
}) {
  useEscapeToClose(onClose);

  useEffect(() => {
    if (!onPrev && !onNext) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onPrev, onNext]);

  const navButton =
    "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-blue-deep shadow-lift transition-colors hover:bg-white";

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
        {onPrev && (
          <button type="button" onClick={onPrev} aria-label="Foto anterior" className={`${navButton} left-3`}>
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
        )}
        {onNext && (
          <button type="button" onClick={onNext} aria-label="Próxima foto" className={`${navButton} right-3`}>
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        )}
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-wide text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}
