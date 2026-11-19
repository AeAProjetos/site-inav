import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

import type { FotoDoCarrossel } from "@/lib/blog";
import { cn } from "@/lib/utils";

const INTERVALO = 5000;

/**
 * Fotos em rolagem lateral com encaixe (scroll-snap), setas e pontos. Troca sozinha a cada 5 s,
 * pausa com o mouse em cima ou com o foco dentro, e não troca sozinha com redução de movimento.
 * O botão de pausar atende quem usa toque ou leitor de tela (WCAG 2.2.2).
 */
export function CarrosselDeFotos({ fotos, rotulo }: { fotos: FotoDoCarrossel[]; rotulo: string }) {
  const trilho = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [emFoco, setEmFoco] = useState(false);
  const [parado, setParado] = useState(false);
  const reduzirMovimento = useReducedMotion();
  const total = fotos.length;
  const pausado = emFoco || parado;
  const trocaSozinha = !reduzirMovimento && total > 1;

  const irPara = (indice: number) => {
    const el = trilho.current;
    if (!el || total === 0) return;
    const alvo = (indice + total) % total;
    el.scrollTo({ left: alvo * el.clientWidth, behavior: reduzirMovimento ? "auto" : "smooth" });
    setAtual(alvo);
  };

  useEffect(() => {
    if (pausado || !trocaSozinha) return;
    const id = window.setInterval(() => {
      const el = trilho.current;
      if (!el) return;
      const proximo = (Math.round(el.scrollLeft / el.clientWidth) + 1) % total;
      el.scrollTo({ left: proximo * el.clientWidth, behavior: "smooth" });
      setAtual(proximo);
    }, INTERVALO);
    return () => window.clearInterval(id);
  }, [pausado, trocaSozinha, total]);

  // Quem arrasta com o dedo muda a foto sem as setas: o ponto ativo acompanha a rolagem.
  const aoRolar = () => {
    const el = trilho.current;
    if (el) setAtual(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (total === 0) return null;

  const seta =
    "absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-blue-deep shadow-soft transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue";

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={rotulo}
      className="relative overflow-hidden rounded-[28px] bg-brand-blue-soft shadow-lift"
      onMouseEnter={() => setEmFoco(true)}
      onMouseLeave={() => setEmFoco(false)}
      onFocus={() => setEmFoco(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEmFoco(false);
      }}
    >
      <div
        ref={trilho}
        onScroll={aoRolar}
        className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((foto, i) => (
          <figure
            key={foto.src}
            role="group"
            aria-roledescription="foto"
            aria-label={`${i + 1} de ${total}`}
            className="relative h-full w-full shrink-0 snap-start"
          >
            <img
              src={foto.src}
              alt={foto.alt}
              loading={i === 0 ? "eager" : "lazy"}
              width={900}
              height={1125}
              className="size-full object-cover"
            />
            {foto.legenda && (
              <figcaption className="absolute bottom-14 left-4 max-w-[calc(100%-2rem)] rounded-full bg-brand-blue-deep/85 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                {foto.legenda}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className={cn(seta, "left-4")}
            onClick={() => irPara(atual - 1)}
            aria-label="Foto anterior"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn(seta, "right-4")}
            onClick={() => irPara(atual + 1)}
            aria-label="Próxima foto"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
          {trocaSozinha && (
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/95 text-brand-blue-deep shadow-soft transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue"
              onClick={() => setParado((p) => !p)}
              aria-label={
                parado
                  ? "Continuar a troca automática das fotos"
                  : "Pausar a troca automática das fotos"
              }
            >
              {parado ? (
                <Play className="size-4" aria-hidden="true" />
              ) : (
                <Pause className="size-4" aria-hidden="true" />
              )}
            </button>
          )}
          {/* Área de toque de 44 px em volta de cada ponto. */}
          <div className="absolute inset-x-0 bottom-1 flex justify-center">
            {fotos.map((foto, i) => (
              <button
                key={foto.src}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === atual ? "true" : undefined}
                className="group/ponto inline-flex size-11 items-center justify-center focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full bg-white shadow transition-all group-focus-visible/ponto:ring-[3px] group-focus-visible/ponto:ring-brand-blue",
                    i === atual ? "w-6" : "w-2 opacity-60",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
