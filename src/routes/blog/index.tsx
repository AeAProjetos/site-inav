import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { CartaoNewsletter } from "@/components/InscricaoNewsletter";
import { Cena, Ilustracao } from "@/components/Ilustracao";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CardapioDaSemana } from "@/components/blog/CardapioDaSemana";
import { CarrosselDeFotos } from "@/components/blog/CarrosselDeFotos";
import { CapaDoPost, PostCard } from "@/components/blog/PostCard";
import { TipoSelo } from "@/components/blog/TipoSelo";
import { SeloStatus } from "@/components/projetos/SeloStatus";
import { carregarBlog, formatarData, tipos, type PostResumo } from "@/lib/blog";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { aoClicar, rolarAte } from "@/lib/rolagem";
import { cn } from "@/lib/utils";

/*
 * Página conforme a v3.2 da copy, do layout e da especificação da KIM (18/11/2026), em
 * Refinamento/Blog. Notícias, cardápios e projetos vêm do Sanity. Adaptado: os 6 tipos de
 * publicação do site no lugar das 5 categorias do pacote (decisão do usuário, 19/11), sem laranja
 * fora das doações, e o arquivo 2017–2023 fica para depois.
 * Pendências da copy decididas pelo usuário em 19/11: as datas das notícias são as do redator; o
 * Vozes Protegidas fica com "3 de 5 palestras"; as notícias sem foto ficam com a capa gráfica; a
 * equipe do projeto atualiza o cardápio no painel; o carrossel fica com as cinco fotos do acervo.
 */

const TITULO = "Blog — Instituto Nair Valadares";
const DESCRICAO =
  "Notícias, projetos e cardápio da semana do Instituto Nair Valadares, no Riacho Fundo II.";

export const Route = createFileRoute("/blog/")({
  loader: () => carregarBlog(),
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRICAO },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRICAO },
    ],
  }),
  component: BlogPage,
});

const POR_VEZ = 9;

const botaoBranco =
  "inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep shadow-lift transition-transform duration-200 hover:scale-[1.03] sm:w-auto";
const botaoVazado =
  "group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15 sm:w-auto";

/** "2025 e 2026", ou só "2026", a partir das datas das publicações. */
function anosDasPublicacoes(posts: PostResumo[]) {
  const anos = [...new Set(posts.map((p) => p.publicadoEm.slice(0, 4)))].sort();
  if (anos.length <= 1) return anos[0] ?? "";
  return `${anos.slice(0, -1).join(", ")} e ${anos.at(-1)}`;
}

function BlogPage() {
  const { posts, erro, cardapios, projetos, ano, hoje } = Route.useLoaderData();
  const [tipo, setTipo] = useState<string | null>(null);
  const [mostrando, setMostrando] = useState(POR_VEZ);

  // A marcada como destaque mais recente sobe para o alto e sai da grade.
  const destaque = posts.find((p) => p.destaque);
  const grade = useMemo(() => posts.filter((p) => p !== destaque), [posts, destaque]);
  const contagem = useMemo(
    () =>
      tipos
        .map((t) => ({ ...t, total: grade.filter((p) => p.tipo === t.value).length }))
        .filter((t) => t.total > 0),
    [grade],
  );
  const filtrados = useMemo(
    () => (tipo ? grade.filter((p) => p.tipo === tipo) : grade),
    [grade, tipo],
  );
  const visiveis = filtrados.slice(0, mostrando);
  const fotosDoCarrossel = cardapios.find((c) => c.fotos.length > 0)?.fotos ?? [];

  // O filtro reinicia a contagem em 9, como pede a especificação.
  const escolher = (valor: string | null) => {
    setTipo(valor);
    setMostrando(POR_VEZ);
  };

  const filtro = (ativo: boolean) =>
    cn(
      "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-blue focus-visible:ring-offset-2",
      ativo
        ? "bg-brand-blue text-white"
        : "border border-border bg-card text-brand-blue-deep hover:border-brand-blue/40",
    );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notícias"
        highlight="do INAV"
        titleClassName="lg:text-5xl xl:text-6xl"
        description="Comunicados, projetos, parcerias e a rotina da educação infantil do Instituto Nair Valadares, com o cardápio da semana servido às crianças."
        aside={
          <img
            src="/img/blog/abertura-roda-com-tv.jpg"
            alt="Crianças sentadas no tatame da sala, assistindo a uma atividade."
            width={1400}
            height={1400}
            className="size-full object-cover"
          />
        }
        // No celular a foto vem antes do título, em 4:3; no computador, quadrada à direita.
        asideClassName="-order-1 aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-lift lg:order-none lg:aspect-square lg:max-w-none lg:rounded-[28px]"
        actions={
          <div>
            <div className="flex flex-wrap gap-3">
              {/* Laranja fica para as doações: aqui o botão principal é branco. */}
              <a
                href="#noticias"
                onClick={aoClicar(() => rolarAte("noticias"))}
                className={botaoBranco}
              >
                Ver notícias
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
              {cardapios.length > 0 && (
                <a
                  href="#cardapio"
                  onClick={aoClicar(() => rolarAte("cardapio"))}
                  className={botaoVazado}
                >
                  Cardápio da semana
                </a>
              )}
            </div>
            {posts.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
                <li>
                  <span className="block font-display text-lg font-extrabold leading-tight text-brand-green-light">
                    {posts.length} {posts.length === 1 ? "notícia" : "notícias"}
                  </span>
                  <span className="text-sm text-white/75">
                    publicadas em {anosDasPublicacoes(posts)}
                  </span>
                </li>
                {cardapios.length > 0 && (
                  <li>
                    <span className="block font-display text-lg font-extrabold leading-tight text-brand-green-light">
                      Toda semana
                    </span>
                    <span className="text-sm text-white/75">o cardápio das crianças</span>
                  </li>
                )}
              </ul>
            )}
          </div>
        }
      />

      {/* 02 — Em destaque */}
      {destaque && (
        <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20">
          <Cena nome="sol-e-nuvem" className="right-[5%] top-8 hidden w-24 xl:block" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.p
              variants={fadeUp}
              {...revealOnScroll}
              className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
            >
              Em destaque
            </motion.p>
            <motion.div
              variants={fadeUp}
              {...revealOnScroll}
              whileHover={{ y: -3 }}
              className="mt-5"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: destaque.slug }}
                className="group grid overflow-hidden rounded-[28px] border border-border bg-card shadow-soft transition-shadow duration-300 hover:shadow-lift lg:grid-cols-[1.15fr_1fr]"
              >
                <CapaDoPost
                  post={destaque}
                  semSelo
                  className="aspect-[16/10] lg:aspect-auto lg:min-h-80"
                  temaClassName="text-3xl sm:text-4xl"
                />
                <div className="flex flex-col p-7 sm:p-10">
                  <TipoSelo tipo={destaque.tipo} className="self-start" />
                  <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight text-brand-blue-deep text-balance-pretty sm:text-4xl">
                    {destaque.titulo}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{destaque.resumo}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                    <time
                      dateTime={destaque.publicadoEm}
                      className="text-xs font-semibold uppercase tracking-wide text-brand-blue"
                    >
                      {formatarData(destaque.publicadoEm)}
                    </time>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-blue">
                      Ler notícia
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* 03 — Cardápio da semana */}
      {cardapios.length > 0 && (
        <section
          id="cardapio"
          tabIndex={-1}
          className="relative isolate scroll-mt-20 overflow-hidden bg-surface-tint py-20 focus:outline-none sm:py-24"
        >
          <Ilustracao
            nome="passarinho"
            className="absolute left-[4%] top-8 -z-10 hidden w-12 xl:block"
          />
          <Cena nome="duas-nuvens" className="right-[6%] top-14 hidden w-28 xl:block" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Alimentação"
              title="Cardápio"
              highlight="da semana"
              description="As crianças recebem cinco refeições por dia, das 8h às 16h45, com acompanhamento nutricional."
            />
            <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              {fotosDoCarrossel.length > 0 && (
                <motion.div variants={fadeUp} {...revealOnScroll}>
                  <CarrosselDeFotos fotos={fotosDoCarrossel} rotulo="Fotos das turmas" />
                </motion.div>
              )}
              <motion.div
                variants={fadeUp}
                {...revealOnScroll}
                className={cn(fotosDoCarrossel.length === 0 && "lg:col-span-2")}
              >
                <CardapioDaSemana cardapios={cardapios} hoje={hoje} />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 04 — Projetos do ano */}
      {projetos.length > 0 && (
        <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24">
          <Ilustracao
            nome="libelula"
            className="absolute right-[5%] top-10 -z-10 hidden w-14 xl:block"
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={`Projetos em ${ano}`}
              title="Aprovados e"
              highlight="em execução"
              className="max-w-4xl"
            />
            <motion.ul
              variants={stagger}
              {...revealOnScroll}
              className="mt-10 grid gap-5 md:grid-cols-3"
            >
              {projetos.map((p) => (
                <motion.li
                  key={p.nome}
                  variants={fadeUp}
                  className="flex flex-col rounded-[22px] border border-border bg-card p-7 shadow-soft"
                >
                  <SeloStatus status={p.situacao} className="self-start" />
                  <h3 className="mt-5 font-display text-xl font-extrabold text-brand-blue-deep">
                    {p.nome}
                  </h3>
                  {p.parceiro && (
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-blue">
                      {p.parceiro}
                    </p>
                  )}
                  {p.texto && (
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                      {p.texto}
                    </p>
                  )}
                  {p.destaque && (
                    // Verde escuro do pacote (#2E8F2F): o verde da marca não chega a 3:1 sobre branco.
                    <p className="mt-auto pt-6 font-display text-2xl font-extrabold text-[#2E8F2F]">
                      {p.destaque}
                    </p>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* 05 — Todas as notícias */}
      <section
        id="noticias"
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-surface-tint py-20 focus:outline-none sm:py-24"
      >
        <Ilustracao nome="abelha" className="absolute left-[4%] top-8 -z-10 hidden w-12 xl:block" />
        <Cena nome="duas-nuvens" className="right-[6%] top-16 hidden w-28 xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Notícias" title="Todas as" highlight="notícias" />

          {contagem.length > 1 && (
            // No celular as pílulas rolam de lado, sem quebrar em várias linhas.
            <div
              className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
              role="group"
              aria-label="Filtrar notícias por tipo"
            >
              <button
                type="button"
                className={filtro(tipo === null)}
                aria-pressed={tipo === null}
                onClick={() => escolher(null)}
              >
                Todas <span className="text-xs opacity-80">{grade.length}</span>
              </button>
              {contagem.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={filtro(tipo === t.value)}
                  aria-pressed={tipo === t.value}
                  onClick={() => escolher(t.value)}
                >
                  {t.title} <span className="text-xs opacity-80">{t.total}</span>
                </button>
              ))}
            </div>
          )}

          {visiveis.length > 0 ? (
            <>
              <motion.ul
                key={tipo ?? "todas"}
                variants={stagger}
                initial="hidden"
                animate="show"
                // 3 colunas no computador, 2 no tablet e 1 no celular (a especificação pede a troca perto de 1100 px).
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {visiveis.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </motion.ul>
              <p className="mt-8 text-center text-sm text-muted-foreground" aria-live="polite">
                Mostrando {visiveis.length} de {filtrados.length}{" "}
                {filtrados.length === 1 ? "notícia" : "notícias"}
              </p>
              {filtrados.length > mostrando && (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    onClick={() => setMostrando((n) => n + POR_VEZ)}
                    className="min-h-11 rounded-full border border-brand-blue px-7 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    Ver mais notícias
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-8 rounded-2xl bg-card px-6 py-14 text-center">
              <p className="text-lg font-semibold text-brand-blue-deep">
                {erro
                  ? "Não conseguimos carregar as notícias agora. Tente de novo em alguns minutos."
                  : "Ainda não há notícias por aqui."}
              </p>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                {erro
                  ? "Se o problema continuar, fale com a equipe do INAV."
                  : "Volte em breve: as notícias do INAV aparecem aqui assim que forem publicadas."}
              </p>
            </div>
          )}

          {/* 07 — Newsletter (o arquivo 2017–2023, seção 06 da copy, fica para depois) */}
          <div className="relative mt-20">
            <Ilustracao nome="borboleta" className="absolute -top-12 left-2 hidden w-12 xl:block" />
            <CartaoNewsletter />
          </div>
        </div>
      </section>
    </>
  );
}
