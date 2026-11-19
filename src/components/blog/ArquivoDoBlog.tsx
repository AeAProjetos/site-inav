import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import { navegarComSetas } from "@/lib/abas";
import type { ItemDoArquivo } from "@/lib/arquivo-do-blog";
import { fadeUp, revealOnScroll } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

const POR_ANO = 5;

// Datas só com dia (AAAA-MM-DD): meio-dia em UTC evita que o fuso mude o dia.
const dataPorExtenso = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const formatar = (iso: string) => dataPorExtenso.format(new Date(`${iso}T12:00:00Z`));

/**
 * Publicações do site anterior (por enquanto, de 2020 a 2023): abas por ano e uma linha do tempo em que o "Ler"
 * abre o texto ali mesmo. Os endereços antigos redirecionam para cá (src/lib/enderecos-antigos.ts).
 */
export function ArquivoDoBlog({ itens }: { itens: ItemDoArquivo[] }) {
  const id = useId();
  const anos = useMemo(
    () =>
      [...new Set(itens.map((i) => i.data.slice(0, 4)))]
        .sort((a, b) => b.localeCompare(a))
        .map((ano) => ({ ano, itens: itens.filter((i) => i.data.startsWith(ano)) })),
    [itens],
  );
  const [aba, setAba] = useState(0);
  const [todos, setTodos] = useState(false);
  const atual = anos[aba];
  if (!atual) return null;
  const visiveis = todos ? atual.itens : atual.itens.slice(0, POR_ANO);
  const restantes = atual.itens.length - visiveis.length;
  const primeiro = anos.at(-1)?.ano;
  const ultimo = anos[0]?.ano;

  const escolher = (i: number) => {
    setAba(i);
    setTodos(false);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <SectionHeading
          eyebrow="Arquivo"
          title="Publicações"
          highlight={`de ${primeiro} a ${ultimo}`}
          description="As notícias do site anterior continuam disponíveis: eventos, campanhas, doações e parcerias registrados pelo INAV."
        />
        <motion.dl
          variants={fadeUp}
          {...revealOnScroll}
          className="mt-8 flex gap-10 border-t border-border pt-6"
        >
          {[
            { valor: itens.length, rotulo: "publicações no arquivo" },
            { valor: anos.length, rotulo: "anos de registros" },
          ].map((n) => (
            // Rótulo antes do valor no HTML (dt antes de dd); na tela o número vem primeiro.
            <div key={n.rotulo} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 max-w-[9rem] text-xs font-bold uppercase leading-snug tracking-wide text-brand-blue-deep">
                {n.rotulo}
              </dt>
              {/* Verde escuro do pacote (#2E8F2F): o verde da marca não chega a 3:1 sobre branco. */}
              <dd className="font-display text-4xl font-extrabold text-[#2E8F2F]">{n.valor}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div variants={fadeUp} {...revealOnScroll}>
        <div
          role="tablist"
          aria-label="Ano das publicações"
          className="flex flex-wrap gap-2"
          onKeyDown={(e) => navegarComSetas(e, anos.length, aba, escolher)}
        >
          {anos.map((a, i) => {
            const ativo = i === aba;
            return (
              <button
                key={a.ano}
                id={`${id}-ano-${i}`}
                type="button"
                role="tab"
                aria-selected={ativo}
                aria-controls={`${id}-painel`}
                tabIndex={ativo ? 0 : -1}
                onClick={() => escolher(i)}
                className={cn(
                  "flex min-h-11 min-w-[6.5rem] flex-col items-start rounded-2xl border px-4 py-2 text-left leading-tight transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue",
                  ativo
                    ? "border-brand-blue-deep bg-brand-blue-deep text-white"
                    : "border-border bg-card text-brand-blue-deep hover:border-brand-blue/40",
                )}
              >
                <span className="font-display font-extrabold">{a.ano}</span>
                <span
                  className={cn(
                    "text-[11px]",
                    ativo ? "text-brand-green-light" : "text-muted-foreground",
                  )}
                >
                  {a.itens.length} {a.itens.length === 1 ? "publicação" : "publicações"}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-painel`}
          role="tabpanel"
          aria-labelledby={`${id}-ano-${aba}`}
          tabIndex={0}
          className="mt-6 rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue"
        >
          <ol className="relative ml-2 border-l-2 border-brand-blue-soft">
            {visiveis.map((item) => (
              <li
                key={item.id}
                className="relative border-b border-border py-4 pl-7 last:border-b-0"
              >
                <span
                  className="absolute -left-[9px] top-5 size-4 rounded-full border-[3px] border-brand-green bg-card"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold uppercase tracking-wide text-brand-blue">
                  <time dateTime={item.data}>{formatar(item.data)}</time>
                </p>
                {item.texto ? (
                  <details className="group mt-1">
                    <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 rounded focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue [&::-webkit-details-marker]:hidden">
                      <span className="font-display font-bold leading-snug text-brand-blue-deep">
                        {item.titulo}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1 pt-0.5 text-xs font-bold uppercase tracking-wide text-brand-blue">
                        <span className="group-open:hidden">Ler</span>
                        <span className="hidden group-open:inline">Fechar</span>
                        <ChevronDown
                          className="size-4 transition-transform duration-200 group-open:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                    </summary>
                    <p className="mt-2 leading-relaxed text-foreground/85">{item.texto}</p>
                  </details>
                ) : (
                  <p className="mt-1 font-display font-bold leading-snug text-brand-blue-deep">
                    {item.titulo}
                  </p>
                )}
              </li>
            ))}
          </ol>
          {restantes > 0 && (
            <button
              type="button"
              onClick={() => setTodos(true)}
              className="mt-4 min-h-11 rounded-full border border-brand-blue px-6 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors hover:bg-brand-blue hover:text-white"
            >
              Ver as outras {restantes} de {atual.ano}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
