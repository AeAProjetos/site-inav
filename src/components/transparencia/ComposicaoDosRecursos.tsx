import type { ReactNode } from "react";

export type Parcela = { nome: string; percentual: number };

const porcento = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * Uma linha por parcela: nome, percentual e uma barra de um tom só sobre a mesma base.
 * O número fica escrito em cada linha, então nada depende de distinguir cores.
 */
export function ComposicaoDosRecursos({
  titulo,
  base,
  parcelas,
  children,
}: {
  titulo: string;
  /** Do que é o percentual, ex.: "do total recebido no ano". */
  base: string;
  parcelas: Parcela[];
  /** Observação no pé do cartão. */
  children?: ReactNode;
}) {
  return (
    <section
      aria-label={`${titulo}, 2025`}
      className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-extrabold uppercase text-brand-blue-deep">{titulo}</h3>
        <span className="rounded-full bg-brand-blue-soft px-3 py-1 font-display text-xs font-extrabold tracking-[0.06em] text-brand-blue-deep">
          2025
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Percentual {base}</p>

      <ul className="mt-6 space-y-4">
        {parcelas.map((parcela) => (
          <li key={parcela.nome}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.95rem] leading-snug text-foreground">{parcela.nome}</span>
              <span className="shrink-0 font-display font-bold tabular-nums text-brand-blue-deep">
                {porcento.format(parcela.percentual)}%
              </span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-brand-blue-soft"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-brand-blue"
                style={{ width: `${Math.max(parcela.percentual, 0.8)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      {children && (
        <p className="mt-6 border-t border-dashed border-border pt-4 text-sm text-muted-foreground">
          {children}
        </p>
      )}
    </section>
  );
}
