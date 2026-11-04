import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";

import { SeletorDeQuantidade } from "@/components/bazar/SeletorDeQuantidade";
import { caminhoDoItem, conferirItens, formatarPreco, type ItemResumo } from "@/lib/bazar";
import { sacola, useSacola, type LinhaDaSacola } from "@/lib/sacola";
import { site } from "@/lib/site-config";

export const Route = createFileRoute("/bazar/sacola")({
  head: () => ({
    meta: [{ title: "Sua sacola — Bazar INAV" }, { name: "robots", content: "noindex" }],
  }),
  component: SacolaPage,
});

type Linha = LinhaDaSacola & { item?: ItemResumo | undefined };

/** Só entra no pedido o que continua à venda e não está reservado por outra pessoa. */
const disponivel = (linha: Linha): linha is Linha & { item: ItemResumo } =>
  Boolean(linha.item && !linha.item.reservado);

function montarMensagem(linhas: (Linha & { item: ItemResumo })[], nome: string) {
  const itens = linhas.map(({ item, quantidade }) => {
    const qtd = quantidade > 1 ? `${quantidade}x ` : "";
    return `• ${qtd}${item.codigo} · ${item.nome} · ${formatarPreco(item.preco * quantidade)}`;
  });
  const total = linhas.reduce((soma, l) => soma + l.item.preco * l.quantidade, 0);
  return [
    "Olá! Quero reservar estes itens do Bazar INAV:",
    ...itens,
    `Total: ${formatarPreco(total)}`,
    ...(nome.trim() ? [`Nome: ${nome.trim()}`] : []),
  ].join("\n");
}

function SacolaPage() {
  const linhasSalvas = useSacola();
  const [montada, setMontada] = useState(false);
  const [nome, setNome] = useState("");
  const [enviado, setEnviado] = useState(false);
  useEffect(() => setMontada(true), []);

  const codigos = linhasSalvas.map((l) => l.codigo).sort();
  const {
    data: itens,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["bazar-sacola", codigos],
    queryFn: () => conferirItens({ data: codigos }),
    enabled: montada && codigos.length > 0,
  });

  // Se o estoque baixou desde que o item entrou na sacola, ajusta a quantidade.
  useEffect(() => {
    for (const linha of linhasSalvas) {
      const item = itens?.find((i) => i.codigo === linha.codigo);
      if (item && linha.quantidade > item.quantidade) {
        sacola.definirQuantidade(linha.codigo, item.quantidade);
      }
    }
  }, [itens, linhasSalvas]);

  const linhas: Linha[] = linhasSalvas.map((l) => ({
    ...l,
    item: itens?.find((i) => i.codigo === l.codigo),
  }));
  const validas = linhas.filter(disponivel);
  const total = validas.reduce((soma, l) => soma + l.item.preco * l.quantidade, 0);
  const carregando = !montada || (codigos.length > 0 && isPending);
  const linkDoPedido = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(montarMensagem(validas, nome))}`;

  return (
    <section className="min-h-[70vh] bg-background pb-20 pt-28 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/bazar"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Continuar no bazar
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1] text-brand-blue-deep sm:text-5xl">
          Sua <span className="text-brand-green">sacola</span>
        </h1>

        {carregando ? (
          <div className="mt-10 space-y-4" aria-busy="true" aria-label="Carregando a sacola">
            {[0, 1].map((n) => (
              <div key={n} className="h-24 animate-pulse rounded-2xl bg-surface-tint" />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-2xl bg-surface-tint px-6 py-14 text-center">
            <p className="text-lg font-semibold text-brand-blue-deep">
              Não conseguimos conferir os itens agora. Tente de novo em alguns minutos.
            </p>
          </div>
        ) : enviado ? (
          <PedidoEnviado />
        ) : linhas.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-surface-tint px-6 py-14 text-center">
            <ShoppingBag className="mx-auto size-10 text-brand-blue" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-brand-blue-deep">
              Sua sacola está vazia.
            </p>
            <Link
              to="/bazar"
              className="mt-6 inline-flex rounded-full bg-brand-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-blue-deep"
            >
              Ver os itens do bazar
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <ul className="divide-y divide-border border-y border-border">
              {linhas.map((linha) => (
                <LinhaDaPagina key={linha.codigo} linha={linha} />
              ))}
            </ul>

            <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-3xl font-extrabold text-brand-blue-deep">
                  {formatarPreco(total)}
                </span>
              </div>

              <label
                htmlFor="nome-sacola"
                className="mt-6 block text-sm font-semibold text-brand-blue-deep"
              >
                Seu nome <span className="font-normal text-muted-foreground">(opcional)</span>
              </label>
              <input
                id="nome-sacola"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-base outline-none transition-colors focus:border-brand-blue"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Vai só na mensagem do WhatsApp. O site não guarda seus dados.
              </p>

              {validas.length > 0 ? (
                <a
                  href={linkDoPedido}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setEnviado(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Enviar pedido pelo WhatsApp
                </a>
              ) : (
                <p className="mt-6 text-sm font-semibold text-brand-blue-deep">
                  Nenhum item da sacola está disponível agora.
                </p>
              )}

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Pague na retirada ou por Pix, que a equipe envia ao confirmar a reserva. Retirada no
                INAV. {site.hours}.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function LinhaDaPagina({ linha }: { linha: Linha }) {
  const { item, codigo, quantidade } = linha;
  const indisponivel = !item || item.reservado;

  return (
    <li className="flex gap-4 py-5">
      {item ? (
        <Link
          to="/bazar/$codigo"
          params={{ codigo: caminhoDoItem(codigo) }}
          className="shrink-0"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={item.foto.card}
            alt=""
            className={`size-20 rounded-xl object-cover sm:size-24 ${indisponivel ? "grayscale" : ""}`}
          />
        </Link>
      ) : (
        <div className="size-20 shrink-0 rounded-xl bg-surface-tint sm:size-24" />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {item ? (
            <Link
              to="/bazar/$codigo"
              params={{ codigo: caminhoDoItem(codigo) }}
              className="font-bold text-brand-blue-deep hover:text-brand-blue"
            >
              {item.nome}
            </Link>
          ) : (
            <p className="font-bold text-brand-blue-deep">Item {codigo}</p>
          )}
          <p className="mt-0.5 text-sm text-muted-foreground">
            {codigo}
            {item && !indisponivel && ` · ${formatarPreco(item.preco)} cada`}
          </p>
          {indisponivel && (
            <p className="mt-2 text-sm font-semibold text-brand-orange">
              {item?.reservado ? "Reservado por outra pessoa" : "Não está mais disponível"}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:flex-col sm:items-end">
          {item && !indisponivel && item.quantidade > 1 && (
            <SeletorDeQuantidade
              valor={quantidade}
              maximo={item.quantidade}
              onChange={(n) => sacola.definirQuantidade(codigo, n)}
              rotulo={item.nome}
            />
          )}
          {item && !indisponivel && (
            <p className="font-extrabold text-brand-blue-deep">
              {formatarPreco(item.preco * quantidade)}
            </p>
          )}
          <button
            type="button"
            onClick={() => sacola.remover(codigo)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand-blue-deep"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Remover
          </button>
        </div>
      </div>
    </li>
  );
}

function PedidoEnviado() {
  const navigate = useNavigate();
  return (
    <div className="mt-10 rounded-2xl bg-surface-tint px-6 py-12 text-center sm:px-12">
      <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-brand-green text-white">
        <Check className="size-7" aria-hidden="true" />
      </span>
      <h2 className="mt-5 text-2xl font-extrabold uppercase text-brand-blue-deep">
        Agora é só enviar a mensagem
      </h2>
      <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted-foreground">
        O pedido abriu no WhatsApp. Depois de enviar, a equipe do INAV confirma a reserva e combina
        a retirada com você.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            sacola.esvaziar();
            void navigate({ to: "/bazar" });
          }}
          className="rounded-full bg-brand-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-blue-deep"
        >
          Já enviei, esvaziar a sacola
        </button>
        <Link
          to="/bazar"
          className="rounded-full border-2 border-brand-blue-deep px-7 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors hover:bg-brand-blue-deep hover:text-white"
        >
          Voltar ao bazar
        </Link>
      </div>
    </div>
  );
}
