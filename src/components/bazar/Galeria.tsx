import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Foto } from "@/lib/bazar";
import { cn } from "@/lib/utils";

type GaleriaProps = { fotos: Foto[]; nome: string; reservado: boolean };

/** Foto principal com miniaturas. Clicar abre a foto ampliada; Esc fecha e as setas trocam. */
export function Galeria({ fotos, nome, reservado }: GaleriaProps) {
  const [atual, setAtual] = useState(0);
  const [ampliada, setAmpliada] = useState(false);
  const foto = fotos[atual];
  const textoAlt = (i: number) => `${nome}, foto ${i + 1} de ${fotos.length}`;
  if (!foto) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setAmpliada(true)}
        aria-label={`Ampliar ${textoAlt(atual)}`}
        className="block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-surface-tint"
      >
        <img
          src={foto.media}
          alt={textoAlt(atual)}
          style={foto.lqip ? { backgroundImage: `url(${foto.lqip})` } : undefined}
          className={cn("aspect-[4/3] w-full bg-cover object-contain", reservado && "grayscale")}
        />
      </button>

      {fotos.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {fotos.map((f, i) => (
            <li key={f.card}>
              <button
                type="button"
                onClick={() => setAtual(i)}
                aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                aria-current={i === atual}
                className={cn(
                  "block w-full overflow-hidden rounded-xl border-2 transition-colors",
                  i === atual ? "border-brand-blue" : "border-transparent hover:border-border",
                )}
              >
                <img
                  src={f.card}
                  alt=""
                  loading="lazy"
                  className={cn("aspect-[4/3] w-full object-cover", reservado && "grayscale")}
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {ampliada && (
        <FotoAmpliada
          fotos={fotos}
          inicial={atual}
          textoAlt={textoAlt}
          onClose={(ultima) => {
            setAtual(ultima);
            setAmpliada(false);
          }}
        />
      )}
    </div>
  );
}

function FotoAmpliada({
  fotos,
  inicial,
  textoAlt,
  onClose,
}: {
  fotos: Foto[];
  inicial: number;
  textoAlt: (i: number) => string;
  onClose: (ultima: number) => void;
}) {
  const [i, setI] = useState(inicial);
  const total = fotos.length;
  const passar = useCallback((passo: number) => setI((n) => (n + passo + total) % total), [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(i);
      if (event.key === "ArrowRight") passar(1);
      if (event.key === "ArrowLeft") passar(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [i, onClose, passar]);

  const seta =
    "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={textoAlt(i)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      onClick={() => onClose(i)}
    >
      <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={() => onClose(i)}
          aria-label="Fechar foto"
          className="absolute -top-10 right-0 text-white/80 transition-colors hover:text-white"
        >
          <X className="size-7" aria-hidden="true" />
        </button>
        <img
          src={fotos[i]?.grande}
          alt={textoAlt(i)}
          className="max-h-[85vh] w-auto rounded-xl object-contain shadow-lift"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => passar(-1)}
              aria-label="Foto anterior"
              className={cn(seta, "left-3")}
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => passar(1)}
              aria-label="Próxima foto"
              className={cn(seta, "right-3")}
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-sm font-semibold uppercase tracking-wide text-white/80">
              {i + 1} de {total}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
