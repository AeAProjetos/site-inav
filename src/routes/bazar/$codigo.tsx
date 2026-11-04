import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronRight, MapPin, ShoppingBag } from "lucide-react";

import { Galeria } from "@/components/bazar/Galeria";
import { SeletorDeQuantidade } from "@/components/bazar/SeletorDeQuantidade";
import {
  buscarItem,
  conservacoes,
  diaEMes,
  formatarPreco,
  nomeDaCategoria,
  type ItemCompleto,
} from "@/lib/bazar";
import { sacola, useSacola } from "@/lib/sacola";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/bazar/$codigo")({
  loader: async ({ params }) => {
    const item = await buscarItem({ data: params.codigo });
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData: item }) => {
    if (!item) return {};
    const titulo = `${item.nome} — Bazar INAV`;
    const descricao = `${formatarPreco(item.preco)} · ${conservacoes[item.conservacao] ?? ""}. Retirada no Instituto Nair Valadares.`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: descricao },
        { property: "og:title", content: titulo },
        { property: "og:description", content: descricao },
        ...(item.fotos[0] ? [{ property: "og:image", content: item.fotos[0].media }] : []),
      ],
    };
  },
  component: ItemPage,
});

function ItemPage() {
  const item = Route.useLoaderData();

  const ficha = [
    ["Estado", conservacoes[item.conservacao]],
    ["Tamanho", item.tamanho],
    ["Validade", item.validade?.split("-").reverse().join("/")],
    ["Unidades", item.quantidade > 1 ? String(item.quantidade) : undefined],
    ["Código", item.codigo],
  ].filter((linha): linha is [string, string] => Boolean(linha[1]));

  return (
    <section className="bg-background pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Você está em" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-brand-blue-deep">
                Início
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link to="/bazar" className="hover:text-brand-blue-deep">
                Bazar
              </Link>
            </li>
            <li
              aria-current="page"
              className="flex items-center gap-1.5 font-semibold text-brand-blue-deep"
            >
              <ChevronRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
              {item.nome}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Galeria
            key={item.codigo}
            fotos={item.fotos}
            nome={item.nome}
            reservado={item.reservado}
          />

          <div>
            <p className="inline-block rounded-full bg-brand-blue-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue-deep">
              {nomeDaCategoria(item.categoria)}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] text-brand-blue-deep text-balance-pretty sm:text-4xl">
              {item.nome}
            </h1>
            <p className="mt-4 text-4xl font-extrabold text-brand-blue">
              {formatarPreco(item.preco)}
            </p>

            {item.descricao && (
              <p className="mt-6 whitespace-pre-line leading-relaxed text-foreground/85">
                {item.descricao}
              </p>
            )}

            <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
              {ficha.map(([rotulo, valor]) => (
                <div key={rotulo} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-muted-foreground">{rotulo}</dt>
                  <dd className="text-right font-semibold text-brand-blue-deep">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              {item.reservado ? <AvisoDeReserva item={item} /> : <AdicionarASacola item={item} />}
            </div>

            <div className="mt-6 flex gap-3 rounded-2xl bg-surface-tint p-5">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-blue" aria-hidden="true" />
              <div className="text-sm leading-relaxed">
                <p className="font-bold text-brand-blue-deep">Retirada no INAV</p>
                <p className="mt-1 text-muted-foreground">
                  Depois que você enviar o pedido pelo WhatsApp, a equipe confirma a reserva e
                  combina a retirada. {site.hours}.
                </p>
              </div>
            </div>

            <Link
              to="/bazar"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar ao bazar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AvisoDeReserva({ item }: { item: ItemCompleto }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <p className="font-bold text-brand-blue-deep">
        Peça reservada{item.reservadoAte ? ` até ${diaEMes(item.reservadoAte)}` : ""}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Se a reserva não for confirmada, a peça volta para o bazar.
      </p>
    </div>
  );
}

function AdicionarASacola({ item }: { item: ItemCompleto }) {
  const linhas = useSacola();
  const naSacola = linhas.find((l) => l.codigo === item.codigo)?.quantidade ?? 0;
  const restantes = item.quantidade - naSacola;
  const [quantidade, setQuantidade] = useState(1);
  const pecaUnica = item.quantidade === 1;

  if (restantes <= 0) {
    return (
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <p className="inline-flex items-center gap-2 font-semibold text-brand-blue-deep">
          <Check className="size-5 text-brand-green" aria-hidden="true" />
          {pecaUnica ? "Este item está na sua sacola" : `${naSacola} unidades na sua sacola`}
        </p>
        <Link
          to="/bazar/sacola"
          className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
        >
          Ver sacola
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {!pecaUnica && (
          <SeletorDeQuantidade
            valor={Math.min(quantidade, restantes)}
            maximo={restantes}
            onChange={setQuantidade}
            rotulo={item.nome}
          />
        )}
        <button
          type="button"
          onClick={() => {
            sacola.adicionar(item.codigo, Math.min(quantidade, restantes), item.quantidade);
            setQuantidade(1);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors hover:bg-brand-blue-deep"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          Adicionar à sacola
        </button>
      </div>
      {naSacola > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Você já tem {naSacola} na sacola.{" "}
          <Link
            to="/bazar/sacola"
            className="font-semibold text-brand-blue hover:text-brand-blue-deep"
          >
            Ver sacola
          </Link>
        </p>
      )}
    </div>
  );
}
