import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MessageCircle, Search } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { ComoFunciona } from "@/components/bazar/ComoFunciona";
import { ItemCard } from "@/components/bazar/ItemCard";
import { categorias, listarItens } from "@/lib/bazar";
import { stagger } from "@/lib/motion-presets";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bazar/")({
  loader: () => listarItens(),
  head: () => ({
    meta: [
      { title: "Bazar solidário — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Produtos a preços acessíveis no bazar do Instituto Nair Valadares. Escolha os itens, envie o pedido pelo WhatsApp e retire no INAV.",
      },
      { property: "og:title", content: "Bazar solidário — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Encontre produtos a preços acessíveis e ajude a fortalecer as atividades do Instituto Nair Valadares.",
      },
    ],
  }),
  component: BazarPage,
});

/** Busca sem diferenciar maiúsculas nem acentos ("fogao" encontra "Fogão"). */
const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function BazarPage() {
  const { itens, erro } = Route.useLoaderData();
  const [categoria, setCategoria] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  // Só mostra os filtros das categorias que têm itens no momento.
  const categoriasComItens = categorias.filter((c) => itens.some((i) => i.categoria === c.value));
  const visiveis = useMemo(() => {
    const termo = normalizar(busca.trim());
    return itens.filter(
      (item) =>
        (!categoria || item.categoria === categoria) &&
        (!termo || normalizar(`${item.nome} ${item.codigo}`).includes(termo)),
    );
  }, [itens, categoria, busca]);

  const filtro = (ativo: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
      ativo
        ? "bg-brand-blue text-white"
        : "border border-border bg-background text-foreground/80 hover:border-brand-blue/40 hover:text-brand-blue-deep",
    );

  return (
    <>
      <PageHero
        eyebrow="Bazar solidário"
        title="Boas oportunidades, um propósito"
        highlight="maior"
        description="Encontre produtos a preços acessíveis e ajude a fortalecer as atividades do Instituto Nair Valadares."
      />

      <section className="bg-background py-16 sm:py-20" aria-labelledby="titulo-vitrine">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="titulo-vitrine"
            className="text-3xl font-extrabold uppercase leading-[1.05] text-brand-blue-deep sm:text-4xl"
          >
            Itens <span className="text-brand-green">disponíveis</span>
          </h2>

          {itens.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
                <button
                  type="button"
                  className={filtro(categoria === null)}
                  aria-pressed={categoria === null}
                  onClick={() => setCategoria(null)}
                >
                  Todos
                </button>
                {categoriasComItens.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={filtro(categoria === c.value)}
                    aria-pressed={categoria === c.value}
                    onClick={() => setCategoria(c.value)}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
              <label className="relative block w-full lg:max-w-xs">
                <span className="sr-only">Buscar item pelo nome</span>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar item…"
                  className="h-11 w-full rounded-full border border-border bg-background pl-11 pr-4 text-base outline-none transition-colors focus:border-brand-blue"
                />
              </label>
            </div>
          )}

          {itens.length > 0 && (
            <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
              {visiveis.length === 1 ? "1 item" : `${visiveis.length} itens`}
            </p>
          )}

          {visiveis.length > 0 ? (
            <motion.ul
              variants={stagger}
              initial="hidden"
              animate="show"
              className="mt-4 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visiveis.map((item) => (
                <ItemCard key={item.codigo} item={item} />
              ))}
            </motion.ul>
          ) : itens.length > 0 ? (
            <div className="mt-6 rounded-2xl bg-surface-tint px-6 py-12 text-center">
              <p className="font-semibold text-brand-blue-deep">Nenhum item encontrado.</p>
              <button
                type="button"
                onClick={() => {
                  setCategoria(null);
                  setBusca("");
                }}
                className="mt-4 text-sm font-bold uppercase tracking-wide text-brand-blue hover:text-brand-blue-deep"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl bg-surface-tint px-6 py-14 text-center">
              <p className="text-lg font-semibold text-brand-blue-deep">
                {erro
                  ? "Não conseguimos carregar os itens agora. Tente de novo em alguns minutos."
                  : "Nenhum item no bazar neste momento."}
              </p>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Novos itens chegam com frequência. Se procura algo específico, fale com a equipe.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      <ComoFunciona />
    </>
  );
}
