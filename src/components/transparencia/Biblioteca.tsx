import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";

import {
  categoriasComContagem,
  filtrarDocumentos,
  type Consulta,
  type Documento,
} from "@/lib/transparencia";
import { cn } from "@/lib/utils";

const PRIMEIRA_LEVA = 10;
const LEVA_SEGUINTE = 15;

type BibliotecaProps = {
  documentos: Documento[];
  /** Controlada pela página: os atalhos do topo e das seções abrem a biblioteca já filtrada. */
  consulta: Consulta;
  onConsulta: (consulta: Consulta) => void;
};

/**
 * Busca por nome, filtro por ano e por categoria, e a lista em levas ("Mostrar mais").
 * Documento sem link público mostra "PDF ainda indisponível", nunca um botão quebrado.
 */
export function Biblioteca({ documentos, consulta, onConsulta }: BibliotecaProps) {
  // A leva vale para a consulta em que foi aberta: nova busca ou novo filtro volta para a primeira.
  const [leva, setLeva] = useState({ consulta, limite: PRIMEIRA_LEVA });
  const limite = leva.consulta === consulta ? leva.limite : PRIMEIRA_LEVA;
  const categorias = useMemo(() => categoriasComContagem(documentos), [documentos]);
  const anos = useMemo(
    () => [...new Set(documentos.map((d) => d.ano).filter(Boolean))].sort().reverse(),
    [documentos],
  );
  const resultado = useMemo(() => filtrarDocumentos(documentos, consulta), [documentos, consulta]);
  const visiveis = resultado.slice(0, limite);

  const mudar = (parte: Partial<Consulta>) => onConsulta({ ...consulta, ...parte });

  return (
    <div>
      <div className="flex gap-2 sm:gap-3">
        <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border-[1.5px] border-border bg-card px-4 transition-colors focus-within:border-brand-blue sm:h-14 sm:px-6">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            value={consulta.busca}
            onChange={(event) => mudar({ busca: event.target.value })}
            placeholder="Buscar documento"
            aria-label="Buscar documento pelo nome"
            className="w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <select
          value={consulta.ano}
          onChange={(event) => mudar({ ano: event.target.value })}
          aria-label="Filtrar por ano"
          className="h-12 shrink-0 cursor-pointer rounded-full border-[1.5px] border-border bg-card px-3 text-sm font-semibold text-brand-blue-deep sm:h-14 sm:px-5 sm:text-[0.95rem]"
        >
          <option value="">Todos os anos</option>
          {anos.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
      </div>

      {/* No celular os filtros rolam de lado, numa linha só. */}
      <div
        role="group"
        aria-label="Filtrar por categoria"
        className="-mr-4 mt-3 flex gap-2 overflow-x-auto pb-1.5 [scrollbar-width:none] sm:mr-0 sm:flex-wrap sm:overflow-visible"
      >
        {[{ nome: "", total: documentos.length }, ...categorias].map(({ nome, total }) => {
          const ativa = consulta.categoria === nome;
          return (
            <button
              key={nome || "todos"}
              type="button"
              aria-pressed={ativa}
              onClick={() => mudar({ categoria: nome })}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors",
                ativa
                  ? "border-brand-blue-deep bg-brand-blue-deep text-white"
                  : "border-border bg-card text-brand-blue-deep hover:border-brand-blue",
              )}
            >
              {nome || "Todos"}
              <span
                className={cn(
                  "rounded-full px-2 text-xs font-bold tabular-nums",
                  ativa ? "bg-white/15 text-white" : "bg-surface-tint text-muted-foreground",
                )}
              >
                {total}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {resultado.length > 0 &&
          `Mostrando ${visiveis.length} de ${resultado.length} documento${resultado.length > 1 ? "s" : ""}`}
      </p>

      <ul className="mt-2 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {visiveis.length === 0 ? (
          <li className="px-6 py-10 text-center text-muted-foreground">
            Nenhum documento encontrado. Tente outro termo ou{" "}
            <Link
              to="/contato"
              className="font-semibold text-brand-blue underline underline-offset-4"
            >
              fale com a equipe
            </Link>
            .
          </li>
        ) : (
          visiveis.map((documento) => (
            <li
              key={`${documento.titulo}-${documento.ano}-${documento.link ?? ""}`}
              className="grid gap-x-6 gap-y-2 px-5 py-4 transition-colors hover:bg-surface-tint/60 sm:px-6 md:grid-cols-[1fr_auto_auto] md:items-center"
            >
              <div className="min-w-0">
                <p className="font-display font-bold leading-snug text-brand-blue-deep">
                  {documento.titulo}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">{documento.nota}</p>
              </div>
              <p className="flex items-center gap-2 md:justify-end">
                <span className="font-display text-sm font-extrabold text-brand-green">
                  {documento.ano}
                </span>
                <span className="whitespace-nowrap rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-bold text-brand-blue-deep">
                  {documento.categoria}
                </span>
              </p>
              <div>
                {documento.link ? (
                  <a
                    href={documento.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${documento.titulo} (${documento.ano}) em nova aba`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] border-brand-blue/30 px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:border-brand-blue hover:bg-brand-blue hover:text-white"
                  >
                    Abrir PDF
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-block whitespace-nowrap rounded-full border-[1.5px] border-dashed border-border bg-muted px-4 py-2 text-xs font-bold text-muted-foreground">
                    PDF ainda indisponível
                  </span>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {resultado.length > limite && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setLeva({ consulta, limite: limite + LEVA_SEGUINTE })}
            className="inline-flex items-center rounded-full border-2 border-brand-blue-deep px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:bg-brand-blue-deep hover:text-white"
          >
            Mostrar mais
          </button>
        </div>
      )}
    </div>
  );
}
