import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import { SeloStatus, type Status } from "@/components/projetos/SeloStatus";
import { cn } from "@/lib/utils";

export type Momento = {
  periodo: string;
  titulo: string;
  status: Status;
  texto: string;
  fonte: string;
  foto: { src: string; alt: string; className?: string };
  /** Marca Pending com o que o INAV ainda precisa confirmar sobre este momento. */
  aviso?: ReactNode;
};

const INTERVALO_MS = 7000;

const botaoControle =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-brand-blue-deep transition-colors duration-200 hover:border-brand-blue hover:text-brand-blue";

/**
 * Um momento por vez: foto à esquerda e texto à direita (no celular, foto em cima).
 * Passa sozinho a cada 7 s; para com o mouse em cima, com o foco dentro ou no botão de pausa.
 * Com "reduzir movimento", começa parado. Setas do teclado e deslizar o dedo também trocam.
 */
export function CarrosselTrajetoria({ momentos, rotulo }: { momentos: Momento[]; rotulo: string }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [emEspera, setEmEspera] = useState(false);
  const reduzirMovimento = useReducedMotion();
  const total = momentos.length;
  const rodando = !pausado && !emEspera && total > 1;
  const toqueInicial = useRef<number | null>(null);

  // No efeito, e não no estado inicial, para o servidor e o navegador começarem iguais.
  useEffect(() => {
    if (reduzirMovimento) setPausado(true);
  }, [reduzirMovimento]);

  const ir = useCallback((indice: number) => setAtual(((indice % total) + total) % total), [total]);

  useEffect(() => {
    if (!rodando) return;
    const id = window.setTimeout(() => ir(atual + 1), INTERVALO_MS);
    return () => window.clearTimeout(id);
  }, [rodando, atual, ir]);

  const aoTeclar = (event: KeyboardEvent<HTMLDivElement>) => {
    const destinos: Record<string, number> = {
      ArrowRight: atual + 1,
      ArrowLeft: atual - 1,
      Home: 0,
      End: total - 1,
    };
    const destino = destinos[event.key];
    if (destino === undefined) return;
    event.preventDefault();
    ir(destino);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={rotulo}
      tabIndex={0}
      onKeyDown={aoTeclar}
      onMouseEnter={() => setEmEspera(true)}
      onMouseLeave={() => setEmEspera(false)}
      onFocus={() => setEmEspera(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setEmEspera(false);
      }}
      onTouchStart={(event) => {
        toqueInicial.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const inicio = toqueInicial.current;
        const fim = event.changedTouches[0]?.clientX;
        toqueInicial.current = null;
        if (inicio === null || fim === undefined || Math.abs(fim - inicio) < 40) return;
        ir(fim < inicio ? atual + 1 : atual - 1);
      }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift"
    >
      {/* Todos os momentos na mesma célula da grade: a altura é a do maior e nada pula na troca. */}
      <div className="grid" aria-live={rodando ? "off" : "polite"}>
        {momentos.map((momento, indice) => {
          const ativo = indice === atual;
          return (
            <figure
              key={momento.titulo}
              role="group"
              aria-roledescription="slide"
              aria-label={`${indice + 1} de ${total}`}
              aria-hidden={!ativo}
              inert={!ativo}
              className={cn(
                "col-start-1 row-start-1 grid transition-[opacity,visibility] duration-700 lg:grid-cols-[1.25fr_0.75fr]",
                ativo ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <div className="relative aspect-[4/3] bg-surface-tint lg:aspect-auto lg:min-h-[500px]">
                <img
                  src={momento.foto.src}
                  alt={momento.foto.alt}
                  loading={indice === 0 ? undefined : "lazy"}
                  decoding="async"
                  className={cn("absolute inset-0 size-full object-cover", momento.foto.className)}
                />
              </div>
              <figcaption className="flex flex-col px-6 pb-24 pt-7 sm:px-8 lg:justify-center lg:px-11 lg:pt-12">
                <p className="font-display text-sm font-extrabold tracking-[0.06em] text-brand-green">
                  {momento.periodo}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold uppercase leading-[1.1] text-brand-blue-deep sm:text-[1.75rem]">
                  {momento.titulo}
                </h3>
                <SeloStatus status={momento.status} className="mt-3 self-start" />
                <p className="mt-4 leading-relaxed text-muted-foreground sm:text-[1.05rem]">
                  {momento.texto}
                </p>
                {momento.aviso && <div className="mt-3">{momento.aviso}</div>}
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
                  {momento.fonte}
                </p>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="absolute inset-x-6 bottom-6 flex items-center gap-2.5 sm:inset-x-8 lg:left-[calc(62.5%+2.75rem)] lg:right-8">
        <button
          type="button"
          onClick={() => ir(atual - 1)}
          aria-label="Momento anterior"
          className={botaoControle}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setPausado((valor) => !valor)}
          aria-label={pausado ? "Retomar a passagem automática" : "Pausar a passagem automática"}
          className={botaoControle}
        >
          {pausado ? (
            <Play className="size-4 fill-current" aria-hidden="true" />
          ) : (
            <Pause className="size-4 fill-current" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={() => ir(atual + 1)}
          aria-label="Próximo momento"
          className={botaoControle}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
        {/* Entre 1024 e 1280 px a coluna de texto é estreita: o contador sai e os pontos encolhem. */}
        <span
          className="hidden min-w-10 text-sm font-bold tabular-nums text-brand-blue-deep sm:inline lg:hidden xl:inline"
          aria-hidden="true"
        >
          {atual + 1} / {total}
        </span>

        <div className="ml-auto flex">
          {momentos.map((momento, indice) => (
            <button
              key={momento.titulo}
              type="button"
              onClick={() => ir(indice)}
              aria-label={`Momento ${indice + 1}: ${momento.periodo}, ${momento.titulo}`}
              aria-current={indice === atual ? "true" : undefined}
              className="group flex h-11 w-3.5 items-center px-0.5 sm:w-[1.125rem] lg:w-3.5 xl:w-[1.125rem]"
            >
              <span
                className={cn(
                  "block h-1.5 w-full rounded-full transition-colors duration-300",
                  indice === atual ? "bg-brand-green" : "bg-border group-hover:bg-brand-green/45",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Barra do tempo até a próxima troca; some quando a passagem está parada. */}
      {rodando && (
        <motion.span
          key={atual}
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVALO_MS / 1000, ease: "linear" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
