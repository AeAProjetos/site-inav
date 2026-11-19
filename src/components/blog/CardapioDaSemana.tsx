import { useId, useState } from "react";

import { navegarComSetas } from "@/lib/abas";
import { refeicoes, type Cardapio } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Texto fixo da nutrição, como na copy do Blog (KIM, 18/11/2026). */
const NOTA =
  "Cardápio elaborado com acompanhamento nutricional. Pode mudar quando houver doação de alimentos perecíveis. Crianças com restrições alimentares, como alergias, recebem os alimentos permitidos conforme laudo médico.";

// As datas do painel chegam como AAAA-MM-DD: meio-dia evita mudar de dia pelo fuso.
const comoData = (iso: string) => new Date(`${iso}T12:00:00`);
const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" });
const diaDaSemana = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

/** "16 a 20 de novembro", ou "30 de novembro a 4 de dezembro" quando muda o mês. */
function nomeDaSemana(c: Cardapio) {
  const ini = comoData(c.inicio);
  const fim = comoData(c.fim);
  return ini.getMonth() === fim.getMonth()
    ? `${ini.getDate()} a ${fim.getDate()} de ${mes.format(fim)}`
    : `${ini.getDate()} de ${mes.format(ini)} a ${fim.getDate()} de ${mes.format(fim)}`;
}

const rotuloDoDia = (iso: string) => {
  const d = comoData(iso);
  const nome = diaDaSemana.format(d).replace(".", "");
  return {
    curto: nome.charAt(0).toUpperCase() + nome.slice(1, 3),
    data: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
  };
};

/** Abre no dia de hoje, se ele estiver na semana; senão, na segunda. */
const diaInicial = (c: Cardapio | undefined, hoje: string) =>
  Math.max(0, c?.dias.findIndex((d) => d.data === hoje) ?? 0);

export function CardapioDaSemana({ cardapios, hoje }: { cardapios: Cardapio[]; hoje: string }) {
  const id = useId();
  const [semana, setSemana] = useState(0);
  const [dia, setDia] = useState(() => diaInicial(cardapios[0], hoje));
  const atual = cardapios[semana];
  if (!atual) return null;
  const diaAtual = atual.dias[dia] ?? atual.dias[0];

  const escolherSemana = (i: number) => {
    setSemana(i);
    setDia(diaInicial(cardapios[i], hoje));
  };

  const aba = (ativa: boolean) =>
    cn(
      "min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue",
      ativa
        ? "bg-white text-brand-blue-deep shadow-soft"
        : "text-muted-foreground hover:text-brand-blue-deep",
    );

  return (
    <div className="rounded-[28px] border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-xl font-extrabold text-brand-blue-deep">Semana de</h3>
        {cardapios.length > 1 ? (
          // A semana troca o conteúdo das abas dos dias, que são as que controlam o painel:
          // aqui bastam botões de alternar (aria-pressed).
          <div
            role="group"
            aria-label="Semana do cardápio"
            className="inline-flex flex-wrap gap-1 rounded-full bg-surface-tint p-1"
          >
            {cardapios.map((c, i) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={i === semana}
                onClick={() => escolherSemana(i)}
                className={aba(i === semana)}
              >
                {nomeDaSemana(c)}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm font-semibold text-brand-blue-deep">{nomeDaSemana(atual)}</p>
        )}
      </div>

      <div
        role="tablist"
        aria-label="Dia da semana"
        className="mt-5 grid grid-cols-5 gap-2"
        onKeyDown={(e) => navegarComSetas(e, atual.dias.length, dia, setDia)}
      >
        {atual.dias.map((d, i) => {
          const r = rotuloDoDia(d.data);
          const ativo = i === dia;
          return (
            <button
              key={d.data}
              id={`${id}-dia-${i}`}
              type="button"
              role="tab"
              aria-selected={ativo}
              aria-controls={`${id}-painel`}
              tabIndex={ativo ? 0 : -1}
              onClick={() => setDia(i)}
              className={cn(
                "flex min-h-11 flex-col items-center rounded-2xl border px-1 py-2 leading-tight transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue",
                ativo
                  ? "border-brand-blue-deep bg-brand-blue-deep text-white"
                  : "border-border text-brand-blue-deep hover:border-brand-blue/40",
              )}
            >
              <span className="font-display text-sm font-extrabold">{r.curto}</span>
              <span
                className={cn(
                  "text-[11px]",
                  ativo ? "text-brand-green-light" : "text-muted-foreground",
                )}
              >
                {r.data}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${id}-painel`}
        role="tabpanel"
        aria-labelledby={`${id}-dia-${dia}`}
        tabIndex={0}
        className="mt-4 rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue"
      >
        {diaAtual?.feriado ? (
          <div className="px-4 py-12 text-center">
            <p className="font-display text-2xl font-extrabold text-brand-blue-deep">Feriado</p>
            <p className="mt-2 text-muted-foreground">{diaAtual.motivo ?? "Não há atendimento."}</p>
          </div>
        ) : (
          <dl className="divide-y divide-border">
            {refeicoes.map((r) => {
              const itens = diaAtual?.itens[r.chave] ?? [];
              return (
                <div key={r.chave} className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[9.5rem_1fr]">
                  <dt>
                    <span className="block font-display font-bold text-brand-blue-deep">
                      {r.nome}
                    </span>
                    <span className="text-xs text-muted-foreground">{r.horario}</span>
                  </dt>
                  <dd className="space-y-1 text-[0.95rem] leading-relaxed text-foreground/85">
                    {itens.length > 0 ? (
                      itens.map((item) => <p key={item}>{item}</p>)
                    ) : (
                      <p>A definir</p>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>

      <p className="mt-2 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {NOTA}
        {atual.fonteUrl && (
          <>
            {" "}
            <a
              href={atual.fonteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              Ver a publicação original
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </>
        )}
      </p>
    </div>
  );
}
