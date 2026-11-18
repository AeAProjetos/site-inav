import type { ReactNode } from "react";

export type RepasseDoAno = {
  ano: string;
  /** Em milhões de reais. */
  valor: number;
  /** Valor previsto, ainda não fechado: coluna listrada e asterisco no ano. */
  parcial?: boolean;
};

const milhoes = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Colunas de uma série só, a partir do zero, com o valor no topo de cada coluna.
 * O leitor de tela recebe a mesma informação numa tabela.
 */
export function GraficoRepasses({
  titulo,
  subtitulo,
  dados,
  children,
}: {
  titulo: string;
  subtitulo: string;
  dados: RepasseDoAno[];
  /** Notas e fontes abaixo do gráfico. */
  children?: ReactNode;
}) {
  const maior = Math.max(...dados.map((d) => d.valor));

  return (
    <figure className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <figcaption>
        <p className="font-display text-base font-extrabold uppercase text-brand-blue-deep">
          {titulo}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{subtitulo}</p>
      </figcaption>

      <div aria-hidden="true">
        <div className="mt-8 grid h-56 grid-cols-6 items-end gap-2 border-b border-border sm:h-64 sm:gap-4">
          {dados.map((d) => (
            <div key={d.ano} className="flex h-full flex-col items-center justify-end">
              <span className="mb-2 font-display text-xs font-bold text-brand-blue-deep sm:text-sm">
                {milhoes.format(d.valor)}
              </span>
              <span
                // Ano com valor previsto: mesma cor, em listras, para não parecer valor menor.
                className={`block w-full max-w-6 rounded-t-[4px] ${d.parcial ? "bg-[repeating-linear-gradient(135deg,var(--brand-blue)_0_4px,color-mix(in_oklab,var(--brand-blue)_55%,white)_4px_8px)]" : "bg-brand-blue"}`}
                style={{ height: `${(d.valor / maior) * 82}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-6 gap-2 sm:gap-4">
          {dados.map((d) => (
            <span
              key={d.ano}
              className="text-center text-xs font-semibold text-muted-foreground sm:text-sm"
            >
              {d.ano}
              {d.parcial && "*"}
            </span>
          ))}
        </div>
      </div>

      <table className="sr-only">
        <caption>
          {titulo}, {subtitulo}
        </caption>
        <thead>
          <tr>
            <th scope="col">Ano</th>
            <th scope="col">Valor em milhões de reais</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((d) => (
            <tr key={d.ano}>
              <th scope="row">{d.ano}</th>
              <td>
                {milhoes.format(d.valor)}
                {d.parcial && " (valor previsto)"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {children && (
        <div className="mt-6 space-y-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {children}
        </div>
      )}
    </figure>
  );
}
