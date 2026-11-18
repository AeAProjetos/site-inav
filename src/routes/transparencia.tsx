import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import Papa from "papaparse";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { FaixaDeNumeros } from "@/components/FaixaDeNumeros";
import { Cena, Ilustracao } from "@/components/Ilustracao";
import { Biblioteca } from "@/components/transparencia/Biblioteca";
import { ComposicaoDosRecursos } from "@/components/transparencia/ComposicaoDosRecursos";
import { GraficoRepasses } from "@/components/transparencia/GraficoRepasses";
import { documentosPadrao } from "@/lib/transparencia-documentos";
import {
  categoriasComContagem,
  consultaInicial,
  documentosDaPlanilha,
  periodoDoAcervo,
  type Consulta,
  type Documento,
} from "@/lib/transparencia";
import { fadeUp, revealOnScroll } from "@/lib/motion-presets";
import { aoClicar, rolarAte } from "@/lib/rolagem";
import { integrations, site } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/*
 * Página conforme a v5 do designer e do redator (KIM, 11/11/2026). Fotos em
 * Refinamento/Transparencia. Pendências da seção 6 da copy decididas em 12/11/2026 com o que
 * havia: total da SEEDF só com anos fechados (2021 a 2025), auditorias sem "publicadas",
 * diretoria de 2018 e políticas mantidas, lista da v5 publicada, denuncia@ mantido. O resto foi
 * perguntado ao INAV (subvenção de 2025, links dos demonstrativos, composição atual e outros).
 * Respostas de 18/11/2026: 2026 como valor previsto; balanço e DMPL de 2025 fora da lista até
 * virem com tarja; credenciamento de 2018 e CEBAS no arquivo histórico mantidos; as auditorias de
 * 2021 a 2023 entram pela planilha quando forem para o Drive. O resto entra pela planilha ou aqui.
 */

/**
 * Lê a lista de documentos da planilha do Drive (`integrations.transparencySheetCsvUrl`), no
 * servidor. Enquanto a planilha não tiver as colunas novas (categoria, ano, destaque), ou se não
 * abrir, vale a lista da v5 em transparencia-documentos.ts.
 */
/**
 * O CSV pode chegar em UTF-8 (como foi gerado) ou no padrão do Excel no Windows, se alguém abrir
 * e salvar a planilha por lá. Sem isso, "Políticas" viraria "PolÃ­ticas" na página.
 */
function textoDoCsv(bytes: ArrayBuffer) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return new TextDecoder("windows-1252").decode(bytes);
  }
}

const buscarDocumentos = createServerFn({ method: "GET" }).handler(
  async (): Promise<Documento[]> => {
    const csvUrl = integrations.transparencySheetCsvUrl;
    if (!csvUrl) return documentosPadrao;
    try {
      // Com o Drive lento, a página não espera: em 8 s vale a lista padrão.
      const resposta = await fetch(csvUrl, { signal: AbortSignal.timeout(8000) });
      if (!resposta.ok) return documentosPadrao;
      const { data } = Papa.parse<Record<string, string>>(
        textoDoCsv(await resposta.arrayBuffer()),
        {
          header: true,
          skipEmptyLines: true,
          transformHeader: (cabecalho) => cabecalho.trim().toLowerCase(),
        },
      );
      return documentosDaPlanilha(data) ?? documentosPadrao;
    } catch {
      return documentosPadrao;
    }
  },
);

export const Route = createFileRoute("/transparencia")({
  loader: () => buscarDocumentos(),
  head: () => ({
    meta: [
      { title: "Transparência — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Estatuto, auditorias, certificações e parcerias do INAV com o poder público, organizados por assunto e por ano para qualquer pessoa consultar.",
      },
      { property: "og:title", content: "Transparência — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Recursos de 2025, parcerias com a Secretaria de Educação do DF, governança e a biblioteca de documentos do INAV.",
      },
    ],
  }),
  component: TransparenciaPage,
});

const FOTOS = "/img/transparencia";

// Demonstração dos Fluxos de Caixa 2025 (auditada). Só percentuais: os totais lado a lado
// faziam a diferença parecer sobra de caixa (v4 do designer).
const origemDosRecursos = [
  { nome: "Repasses públicos (subvenção governamental)", percentual: 91.4 },
  { nome: "Doações e contribuições", percentual: 7.6 },
  { nome: "Rendimentos financeiros", percentual: 1.0 },
];

const aplicacaoDosRecursos = [
  { nome: "Salários e encargos", percentual: 67.6 },
  { nome: "Fornecedores de bens e serviços", percentual: 25.1 },
  { nome: "Outros pagamentos", percentual: 5.2 },
  { nome: "Despesas gerais, administrativas e financeiras", percentual: 2.1 },
];

// Planilha "Valores totais recebidos por convênio e por período" (INAV), em milhões de reais.
const repassesDaSeedf = [
  { ano: "2021", valor: 2.46 },
  { ano: "2022", valor: 2.49 },
  { ano: "2023", valor: 2.68 },
  { ano: "2024", valor: 2.87 },
  { ano: "2025", valor: 2.98 },
  { ano: "2026", valor: 3.09, parcial: true },
];

const numeros = [
  // Só anos fechados: o valor de 2026 é o previsto (INAV, 18/11/2026), quase igual ao valor anual do 3º aditivo.
  { valor: "R$ 13,48 mi", rotulo: "recebidos da Secretaria de Educação do DF de 2021 a 2025" },
  { valor: "4", rotulo: "auditorias independentes, a mais recente de 2025, sem ressalvas" },
  { valor: "9", rotulo: "prestações de contas aprovadas pela SEEDF, de 2009 a 2024" },
  { valor: "2027", rotulo: "validade do registro definitivo no CDCA/DF" },
];

const instancias = [
  {
    ordem: "01",
    nome: "Assembleia Geral",
    texto: "Órgão máximo. Elege a diretoria e o conselho fiscal e aprova as contas do ano.",
    detalhe:
      "Formada pelos associados com direito a voto. Reúne-se ao menos uma vez por ano para apreciar o relatório da diretoria e homologar as contas e o balanço. Pode determinar inspeções e auditorias.",
    fonte: "Estatuto, arts. 13 a 16",
  },
  {
    ordem: "02",
    nome: "Conselho Fiscal",
    texto: "Acompanha a gestão financeira e emite parecer sobre as contas.",
    detalhe:
      "Três membros titulares e um suplente, eleitos pela Assembleia Geral, com mandato de quatro anos, coincidente com o da diretoria.",
    fonte: "Estatuto, arts. 21 a 27",
  },
  {
    ordem: "03",
    nome: "Diretoria",
    texto: "Coordena a gestão do dia a dia e presta contas à Assembleia.",
    detalhe:
      "Órgão de coordenação geral e operacional. Elabora o regimento do INAV e apresenta o relatório anual de atividades.",
    fonte: "Estatuto, arts. 4 e 28",
  },
  {
    ordem: "Ética",
    nome: "Comitê de Ética e Conduta",
    texto: "Aplica o Código de Ética e apura denúncias com sigilo.",
    detalhe:
      "Colegiado interdisciplinar e independente, de caráter consultivo e educativo, previsto em regimento próprio.",
    fonte: "Regimento do Comitê de Ética e Conduta, art. 1º",
    etica: true,
  },
];

const politicas = [
  { nome: "Compras", texto: "Três orçamentos e regularidade fiscal antes de cada aquisição." },
  {
    nome: "Contratação de pessoas",
    texto: "Critérios claros para contratar e desligar colaboradores.",
  },
  {
    nome: "Serviços terceirizados",
    texto: "Princípios, critérios e alçadas para contratar terceiros.",
  },
  { nome: "Comunicação", texto: "Diretrizes para falar com famílias, parceiros e imprensa." },
];

// Links testados em 12/11/2026. Os órgãos mudam endereços com frequência: testar a cada revisão.
const certidoes = [
  {
    orgao: "Receita Federal e PGFN",
    nome: "Tributos federais e Dívida Ativa da União",
    link: "https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cnpj",
  },
  {
    orgao: "Caixa Econômica Federal",
    nome: "Regularidade do FGTS",
    link: "https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf",
  },
  {
    orgao: "Tribunal Superior do Trabalho",
    nome: "Débitos trabalhistas",
    link: "https://cndt-certidao.tst.jus.br/inicio.faces",
  },
  {
    orgao: "Receita do Distrito Federal",
    nome: "Débitos com o Distrito Federal",
    link: "https://ww1.receita.fazenda.df.gov.br/cidadao/certidoes/Certidao",
  },
];

const botaoDeAtalho =
  "inline-flex items-center rounded-full border-[1.5px] border-white/40 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/10";

const linkDeTexto =
  "group inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-blue transition-colors hover:text-brand-blue-deep";

function TransparenciaPage() {
  const documentos = Route.useLoaderData();
  const [consulta, setConsulta] = useState<Consulta>(consultaInicial);

  /** Abre a biblioteca já filtrada (atalhos do topo, termos, políticas, fontes). */
  const abrirBiblioteca = (filtro: Partial<Consulta>) => {
    setConsulta({ ...consultaInicial, ...filtro });
    rolarAte("documentos");
  };

  const destaques = [
    { valor: String(documentos.length), rotulo: "documentos" },
    { valor: String(categoriasComContagem(documentos).length), rotulo: "categorias" },
    { valor: periodoDoAcervo(documentos), rotulo: "período do acervo" },
  ];

  return (
    <>
      {/* 01 — Abertura */}
      <PageHero
        eyebrow="Transparência"
        title="Gestão aberta,"
        highlight="documentos à mão"
        description="Estatuto, auditorias, certificações e parcerias com o poder público, organizados por assunto e por ano para qualquer pessoa consultar."
        aside={
          <img
            src={`${FOTOS}/topo-criancas-no-tapete.jpg`}
            alt="Crianças do INAV sentadas sobre um tapete colorido no gramado, sorrindo"
            className="size-full object-cover object-[center_65%]"
          />
        }
        // No celular a foto vem antes do título, como no layout do designer.
        asideClassName="-order-1 aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-lift lg:order-none lg:max-w-none lg:rounded-[28px]"
        actions={
          <div>
            {/* Laranja fica para as doações: aqui o botão principal é branco. */}
            <a
              href="#documentos"
              onClick={aoClicar(() => rolarAte("documentos"))}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep shadow-lift transition-transform duration-200 hover:scale-[1.03]"
            >
              Consultar documentos
              <ArrowDown
                className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <nav aria-label="Atalhos da página" className="mt-4 flex flex-wrap gap-2">
              <a
                href="#documentos"
                onClick={aoClicar(() => abrirBiblioteca({ categoria: "Contas e auditorias" }))}
                className={botaoDeAtalho}
              >
                Contas e auditorias
              </a>
              <a
                href="#termo-089"
                onClick={aoClicar(() => rolarAte("termo-089"))}
                className={botaoDeAtalho}
              >
                Parceria vigente
              </a>
              <a
                href="#certidoes"
                onClick={aoClicar(() => rolarAte("certidoes"))}
                className={botaoDeAtalho}
              >
                Certidões
              </a>
              <a
                href="#etica"
                onClick={aoClicar(() => rolarAte("etica"))}
                className={botaoDeAtalho}
              >
                Canal de ética
              </a>
            </nav>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
              {destaques.map((item) => (
                <div key={item.rotulo} className="flex flex-col-reverse">
                  <dt className="text-sm text-white/75">{item.rotulo}</dt>
                  <dd className="font-display text-2xl font-extrabold leading-tight text-brand-green-light">
                    {item.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      {/* 02 — Recursos e prestação de contas */}
      <section
        id="recursos"
        className="relative isolate overflow-hidden bg-background pb-20 pt-14 sm:pb-24 sm:pt-16"
      >
        <Cena nome="sol-e-nuvem" className="right-[6%] top-8 w-20 lg:hidden xl:block" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Exercício 2025"
            title="Recursos e"
            highlight={"prestação de contas"}
            description="Consulte as fontes de recursos do INAV, os principais grupos de pagamentos e as demonstrações financeiras auditadas de 2025."
            align="center"
            className="max-w-3xl"
          />
          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="mt-12 grid gap-6 lg:grid-cols-2"
          >
            <ComposicaoDosRecursos
              titulo="Origem dos recursos"
              base="do total recebido no ano"
              parcelas={origemDosRecursos}
            />
            <ComposicaoDosRecursos
              titulo="Aplicação dos recursos"
              base="dos pagamentos das atividades do ano"
              parcelas={aplicacaoDosRecursos}
            >
              A demonstração registra, à parte, as compras de equipamentos e bens permanentes.
            </ComposicaoDosRecursos>
          </motion.div>
          <div className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            <p>
              Fonte:{" "}
              <a
                href="#documentos"
                onClick={aoClicar(() => abrirBiblioteca({ busca: "fluxos de caixa 2025" }))}
                className="font-semibold text-brand-blue underline underline-offset-4"
              >
                Demonstração dos Fluxos de Caixa 2025
              </a>
              , exercício de 01/01 a 31/12/2025, auditada sem ressalvas. Os valores totais estão na
              demonstração completa.
            </p>
            <a
              href="#documentos"
              onClick={aoClicar(() => abrirBiblioteca({ categoria: "Contas e auditorias" }))}
              className={cn(linkDeTexto, "mt-3")}
            >
              Ver as contas e auditorias
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </section>

      {/* 03 — Parcerias com o poder público */}
      <section
        id="parcerias"
        className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24"
      >
        <Ilustracao
          nome="borboleta"
          className="absolute left-[4%] top-12 -z-10 hidden w-12 -rotate-6 xl:block"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Parcerias com o poder público"
              title="Educação infantil"
              highlight="em parceria com o DF"
              description="Desde 2017, termos de colaboração com a Secretaria de Educação do DF custeiam o atendimento gratuito das crianças. Cada termo tem plano de trabalho, aditivos e prestação de contas publicados."
            />
            <ul className="mt-8 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <li>
                <a
                  id="termo-089"
                  href="#documentos"
                  onClick={aoClicar(() => abrirBiblioteca({ busca: "089/2023" }))}
                  className="group block scroll-mt-28 px-6 py-5 transition-colors hover:bg-surface-tint/60 sm:px-7"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-brand-green-light px-3 py-1 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-brand-blue-deep">
                      Vigente
                    </span>
                    <span className="font-display text-sm font-extrabold text-brand-green">
                      09/02/2023 a 08/02/2028
                    </span>
                  </span>
                  <span className="mt-2 block font-display text-lg font-extrabold uppercase text-brand-blue-deep">
                    Termo de Colaboração nº 089/2023
                  </span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">
                    Termo, 3 aditivos e homologações trimestrais da SEEDF, a mais recente de abril
                    de 2026.
                  </span>
                  <span className={cn(linkDeTexto, "mt-3")}>
                    Ver os documentos
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#documentos"
                  onClick={aoClicar(() => abrirBiblioteca({ busca: "133/2017" }))}
                  className="group block px-6 py-5 transition-colors hover:bg-surface-tint/60 sm:px-7"
                >
                  <span className="font-display text-sm font-extrabold text-brand-green">
                    2017–2023 · encerrado
                  </span>
                  <span className="mt-2 block font-display text-lg font-extrabold uppercase text-brand-blue-deep">
                    Termo de Colaboração nº 133/2017
                  </span>
                  <span className="mt-1 block leading-relaxed text-muted-foreground">
                    Termo, 5 aditivos e prestação de contas aprovada em 2024.
                  </span>
                  <span className={cn(linkDeTexto, "mt-3")}>
                    Ver os documentos
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <motion.div variants={fadeUp} {...revealOnScroll}>
            <GraficoRepasses
              titulo="Valores recebidos da SEEDF"
              subtitulo="em milhões de reais, por ano · 2021 a 2026"
              dados={repassesDaSeedf}
            >
              <p>
                Total de 2021 a 2025: R$ 13.478.712,22. Fonte: planilha “Valores totais recebidos
                por convênio e por período” (INAV).
                <br />* 2026: valor previsto, de R$ 3.091.841,16, praticamente igual ao valor anual
                do 3º aditivo.
              </p>
              <p className="border-t border-border pt-3">
                <strong className="text-foreground">2025:</strong> R$ 2,98 milhões recebidos da
                SEEDF, segundo a planilha. Na demonstração dos fluxos de caixa de 2025, a linha
                “Subvenção governamental” soma R$ 3,02 milhões (91,4% de R$ 3,30 milhões). São
                registros de documentos diferentes.
              </p>
            </GraficoRepasses>
          </motion.div>
        </div>
      </section>

      {/* 04 — Números sobre foto */}
      <FaixaDeNumeros
        rotulo="Em números"
        titulo={
          <>
            Contas que <span>se conferem</span>
          </>
        }
        numeros={numeros}
        valoresLongos
        foto={{
          src: `${FOTOS}/numeros-patio-sob-as-arvores.jpg`,
          className: "object-[center_45%]",
        }}
        nota="Fontes: valores recebidos por termo e por ano; relatórios de auditoria de 2021 a 2023 e de 2025; aprovações de prestação de contas; certificado de registro do CDCA/DF."
      />

      {/* 05 — Governança */}
      <section
        id="governanca"
        className="relative isolate overflow-hidden bg-background py-20 sm:py-24"
      >
        <Ilustracao
          nome="joaninha"
          className="absolute right-[6%] top-14 -z-10 hidden w-10 rotate-12 xl:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Governança"
            title="Decisões colegiadas,"
            highlight="contas revisadas"
            description="O estatuto do INAV divide a gestão em três instâncias. Um comitê independente cuida da ética."
            align="center"
          />
          {/* Um painel só, com divisórias: as quatro instâncias lidas lado a lado. */}
          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="mt-14 grid divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:grid-cols-4 lg:divide-x lg:divide-y-0"
          >
            {instancias.map((instancia) => (
              <article
                key={instancia.nome}
                className={cn(
                  "flex flex-col p-7 lg:p-8",
                  instancia.etica && "bg-brand-blue-deep text-white",
                )}
              >
                <p
                  className={cn(
                    "font-display text-sm font-extrabold uppercase tracking-[0.12em]",
                    instancia.etica ? "text-brand-green-light" : "text-brand-green",
                  )}
                >
                  {instancia.ordem}
                </p>
                <h3
                  className={cn(
                    "mt-2 text-lg font-extrabold uppercase leading-tight",
                    instancia.etica ? "text-white" : "text-brand-blue-deep",
                  )}
                >
                  {instancia.nome}
                </h3>
                <p
                  className={cn(
                    "mt-2 leading-relaxed",
                    instancia.etica ? "text-white/80" : "text-muted-foreground",
                  )}
                >
                  {instancia.texto}
                </p>
                {/* mt-auto: o "Ver detalhes" fica na mesma altura nas quatro colunas. */}
                <div className="mt-auto pt-5" />
                <details
                  className={cn(
                    "group border-t pt-3",
                    instancia.etica ? "border-white/15" : "border-border",
                  )}
                >
                  <summary
                    className={cn(
                      "inline-flex cursor-pointer list-none items-center gap-1.5 rounded text-sm font-bold [&::-webkit-details-marker]:hidden",
                      instancia.etica ? "text-brand-green-light" : "text-brand-blue",
                    )}
                  >
                    Ver detalhes
                    <Plus className="size-4 group-open:hidden" aria-hidden="true" />
                    <Minus className="hidden size-4 group-open:block" aria-hidden="true" />
                  </summary>
                  <p
                    className={cn(
                      "mt-3 text-[0.95rem] leading-relaxed",
                      instancia.etica ? "text-white/85" : "text-muted-foreground",
                    )}
                  >
                    {instancia.detalhe}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-xs",
                      instancia.etica ? "text-white/60" : "text-muted-foreground/80",
                    )}
                  >
                    Fonte: {instancia.fonte}
                  </p>
                </details>
              </article>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="mt-8 rounded-3xl bg-surface-tint p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-extrabold uppercase text-brand-blue-deep">
                Políticas que orientam a gestão
              </h3>
              <a
                href="#documentos"
                onClick={aoClicar(() => abrirBiblioteca({ categoria: "Políticas e ética" }))}
                className={linkDeTexto}
              >
                Ver todas
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {politicas.map((politica) => (
                <div key={politica.nome} className="border-t border-border pt-4">
                  <dt className="font-display font-bold text-brand-blue-deep">{politica.nome}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {politica.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>

      {/* 06 — Biblioteca de documentos */}
      <section
        id="documentos"
        // tabIndex -1: recebe o foco quando um atalho abre a biblioteca.
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-background pb-20 pt-6 focus:outline-none sm:pb-24 sm:pt-8"
      >
        <Ilustracao
          nome="passarinho"
          className="absolute left-[4%] top-8 -z-10 hidden w-14 xl:block"
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho compacto: a busca e o primeiro resultado aparecem na primeira tela. */}
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange">
            Documentos
          </p>
          <h2 className="mt-2 text-2xl font-extrabold uppercase leading-[1.1] text-brand-blue-deep sm:text-[2.1rem]">
            Todos os documentos, <span className="text-brand-green">em um só lugar</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Busque pelo nome ou filtre por assunto e por ano. Os documentos de referência aparecem
            primeiro.
          </p>
          <div className="mt-6">
            <Biblioteca documentos={documentos} consulta={consulta} onConsulta={setConsulta} />
          </div>
        </div>
      </section>

      {/* 07 — Certidões */}
      <section
        id="certidoes"
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-surface-tint py-20 focus:outline-none sm:py-24"
      >
        <Ilustracao
          nome="libelula"
          className="absolute right-[6%] top-14 -z-10 hidden w-14 xl:block"
        />
        <Cena nome="duas-nuvens" className="left-[4%] top-16 w-32 lg:hidden xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Certidões"
            title="Regularidade conferida"
            highlight={"direto na fonte"}
            description="As certidões vencem e são renovadas ao longo do ano. Consulte a versão atual no site de cada órgão, com o CNPJ do INAV."
            align="center"
            className="max-w-3xl"
          />
          <div className="mt-8 text-center">
            <CopiarCnpj />
          </div>
          {/* gap-px sobre fundo de borda: linhas finas entre as células em qualquer número de colunas. */}
          <ul className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {certidoes.map((certidao) => (
              <li key={certidao.orgao} className="bg-card">
                <a
                  href={certidao.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Consultar ${certidao.nome} no site: ${certidao.orgao} (abre em nova aba)`}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-brand-blue-soft/40 sm:p-7"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
                    {certidao.orgao}
                  </span>
                  <span className="mt-2 font-display text-lg font-extrabold uppercase leading-snug text-brand-blue-deep">
                    {certidao.nome}
                  </span>
                  <span className={cn(linkDeTexto, "mt-auto pt-5")}>
                    Consultar
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 — Dúvidas e Canal de Ética. Última seção antes do rodapé: sem canteiro. */}
      <section
        id="etica"
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-brand-blue-deep py-20 text-white focus:outline-none sm:py-28"
      >
        <img
          src={`${FOTOS}/fecho-vista-aerea-do-patio.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/85 to-brand-blue-deep/60"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Dúvidas"
              title="Não encontrou"
              highlight="o que procurava?"
              description="Peça o documento à equipe do INAV. Respondemos pelos canais oficiais."
              tone="light"
            />
            <motion.div variants={fadeUp} {...revealOnScroll} className="mt-8">
              <Link
                to="/contato"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15"
              >
                Entre em contato
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="rounded-3xl bg-card p-7 text-foreground shadow-lift sm:p-9"
          >
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-brand-blue">
              <ShieldCheck className="size-5" aria-hidden="true" />
              Canal de Ética
            </p>
            <h3 className="mt-3 text-2xl font-extrabold uppercase leading-tight text-brand-blue-deep">
              Relate com sigilo
            </h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Para relatar, com sigilo, condutas contrárias ao Código de Ética do INAV.
            </p>
            <a
              href={`mailto:${site.ethicsEmail}`}
              className="mt-5 inline-flex max-w-full items-center gap-2 break-all rounded-full bg-brand-blue px-6 py-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-brand-blue-deep"
            >
              {site.ethicsEmail}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/** Copia só os números do CNPJ: os campos dos órgãos aceitam assim, com ou sem máscara. */
function CopiarCnpj() {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(site.cnpj.replace(/\D/g, ""));
    } catch {
      /* Sem permissão de área de transferência: o número continua visível no botão. */
    }
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2400);
  };

  return (
    <button
      type="button"
      onClick={copiar}
      aria-label={`Copiar o CNPJ ${site.cnpj}`}
      className="inline-flex max-w-full items-center gap-2 rounded-full border-[1.5px] border-border bg-card py-2 pl-4 pr-2 shadow-soft transition-colors hover:border-brand-blue sm:gap-3 sm:pl-5"
    >
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
        CNPJ
      </span>
      {/* Numa linha só: quebrado, o número fica difícil de conferir. */}
      <span className="whitespace-nowrap font-display text-base font-extrabold text-brand-blue-deep sm:text-lg">
        {site.cnpj}
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-4 py-2 text-xs font-bold uppercase tracking-wide text-white">
        {copiado ? (
          <>
            <Check className="size-3.5" aria-hidden="true" />
            Copiado
          </>
        ) : (
          <>
            <Copy className="size-3.5" aria-hidden="true" />
            Copiar
          </>
        )}
      </span>
      <span className="sr-only" role="status">
        {copiado ? "CNPJ copiado" : ""}
      </span>
    </button>
  );
}
