import { createServerFn } from "@tanstack/react-start";
import type { PortableTextProps } from "@portabletext/react";

import { consultar, imagemDoSanity, type FotoSanity } from "@/lib/sanity";

/** Blog: as publicações vêm do Sanity (painel em https://inav.sanity.studio). Acesso em src/lib/sanity.ts. */

// Mesma lista do painel (studio/schemaTypes/post.ts). Se mudar lá, mude aqui.
// As cores de cada tipo ficam em src/components/blog/aparencia.ts.
export const tipos = [
  { value: "aviso", title: "Aviso" },
  { value: "campanha", title: "Campanha" },
  { value: "instagram", title: "Instagram" },
  { value: "marco", title: "Marco institucional" },
  { value: "historia", title: "História de transformação" },
  { value: "parceiro", title: "Parceiro em destaque" },
] as const;

export type TipoDePost = (typeof tipos)[number]["value"];

export const infoDoTipo = (valor: string) => tipos.find((t) => t.value === valor) ?? tipos[0];

// Páginas que uma publicação pode indicar no fim do texto (mesma lista de studio/schemaTypes/post.ts).
export const paginasDoSite = {
  "/quem-somos": "Quem Somos",
  "/educacao-infantil": "Educação Infantil",
  "/projetos": "Projetos",
  "/transparencia": "Transparência",
  "/bazar": "Bazar",
  "/contato": "Contato",
} as const;

export type RotaDoSite = keyof typeof paginasDoSite;

const ehRotaDoSite = (rota: unknown): rota is RotaDoSite =>
  typeof rota === "string" && rota in paginasDoSite;

export type Capa = {
  card: string;
  media: string;
  /** 1200 × 630, o formato que WhatsApp e redes sociais leem na prévia do link. */
  compartilhar: string;
  alt: string;
  legenda?: string | undefined;
  credito?: string | undefined;
  lqip?: string | undefined;
};

export type PostResumo = {
  slug: string;
  titulo: string;
  resumo: string;
  tipo: TipoDePost;
  /** Data ISO. */
  publicadoEm: string;
  /** Marcada no painel: aparece no alto do blog e sai da grade. */
  destaque: boolean;
  /** Texto da capa sem foto (até 3 palavras). Sem ele, a capa mostra o nome do tipo. */
  temaCapa?: string | undefined;
  /** Só existe se a autorização de uso de imagem foi marcada no painel. */
  capa?: Capa | undefined;
};

export type PostCompleto = PostResumo & {
  corpo: PortableTextProps["value"];
  linkOriginal?: string | undefined;
  video?: string | undefined;
  fonteTexto?: string | undefined;
  paginaRelacionada?: { rota: RotaDoSite; descricao?: string | undefined } | undefined;
  /** Em minutos, calculado pela contagem de palavras do texto. */
  minutosDeLeitura: number;
};

const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});
export const formatarData = (iso: string) => dataFormatada.format(new Date(iso));

// Uma publicação aparece quando tem tipo e endereço e a data de publicação já chegou.
// Dá para agendar: basta colocar uma data futura no painel.
const VISIVEL = `_type == "post" && defined(slug.current) && defined(titulo) && defined(tipo)
  && defined(publicadoEm) && dateTime(publicadoEm) <= dateTime(now())`;
// A foto só chega ao navegador se a autorização de uso de imagem estiver marcada no painel.
const CAPA = `select(capa.autorizada == true && defined(capa.asset) =>
  capa{asset, crop, hotspot, alt, legenda, credito, "lqip": asset->metadata.lqip})`;
const RESUMO = `"slug": slug.current, titulo, resumo, tipo, publicadoEm,
  "destaque": destaque == true, temaCapa, "capa": ${CAPA}`;

type CapaSanity = FotoSanity & {
  alt?: string;
  legenda?: string;
  credito?: string;
};
type ResumoSanity = Omit<PostResumo, "capa" | "temaCapa"> & {
  capa?: CapaSanity | null;
  temaCapa?: string | null;
};

function montarCapa(capa: CapaSanity | null | undefined, titulo: string): Capa | undefined {
  if (!capa) return undefined;
  const imagem = imagemDoSanity(capa);
  return {
    card: imagem.width(800).height(500).fit("crop").url(),
    media: imagem.width(1400).fit("max").url(),
    compartilhar: imagem.width(1200).height(630).fit("crop").format("jpg").url(),
    alt: capa.alt?.trim() || titulo,
    legenda: capa.legenda,
    credito: capa.credito,
    lqip: capa.lqip,
  };
}

const paraResumo = ({ capa, temaCapa, ...post }: ResumoSanity): PostResumo => ({
  ...post,
  temaCapa: temaCapa?.trim() || undefined,
  capa: montarCapa(capa, post.titulo),
});

// Cardápio da semana: as 5 refeições têm horário fixo, e o painel guarda só os itens.
export const refeicoes = [
  { chave: "cafe", nome: "Café da manhã", horario: "8h às 8h35" },
  { chave: "colacao", nome: "Colação", horario: "9h45 às 10h" },
  { chave: "almoco", nome: "Almoço", horario: "11h às 12h" },
  { chave: "lanche", nome: "Lanche", horario: "14h30 às 14h50" },
  { chave: "jantar", nome: "Jantar", horario: "16h às 16h45" },
] as const;

export type ChaveDaRefeicao = (typeof refeicoes)[number]["chave"];

export type DiaDoCardapio = {
  /** Data no formato AAAA-MM-DD. */
  data: string;
  feriado: boolean;
  motivo?: string | undefined;
  /** Itens de cada refeição, um por linha no painel. */
  itens: Partial<Record<ChaveDaRefeicao, string[]>>;
};

export type FotoDoCarrossel = { src: string; alt: string; legenda?: string | undefined };

export type Cardapio = {
  id: string;
  inicio: string;
  fim: string;
  fonteUrl?: string | undefined;
  dias: DiaDoCardapio[];
  fotos: FotoDoCarrossel[];
};

export type Projeto = {
  nome: string;
  parceiro?: string | undefined;
  situacao: "aprovado" | "em-execucao";
  destaque?: string | undefined;
  texto?: string | undefined;
};

type DiaSanity = { data: string; feriado?: boolean; motivo?: string } & Partial<
  Record<ChaveDaRefeicao, string>
>;
type CardapioSanity = {
  _id: string;
  inicio: string;
  fim: string;
  fonteUrl?: string;
  dias?: DiaSanity[] | null;
  fotos?: (FotoSanity & { alt?: string; legenda?: string })[] | null;
};

/** Hoje no horário de Brasília, no formato AAAA-MM-DD. */
export const hojeEmBrasilia = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());

const linhas = (texto?: string) =>
  (texto ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

function paraCardapio(c: CardapioSanity): Cardapio {
  return {
    id: c._id,
    inicio: c.inicio,
    fim: c.fim,
    fonteUrl: c.fonteUrl,
    dias: (c.dias ?? []).map((d) => ({
      data: d.data,
      feriado: d.feriado === true,
      motivo: d.motivo,
      itens: Object.fromEntries(refeicoes.map((r) => [r.chave, linhas(d[r.chave])])),
    })),
    fotos: (c.fotos ?? []).map((f) => ({
      src: imagemDoSanity(f).width(900).height(1125).fit("crop").url(),
      alt: f.alt?.trim() || f.legenda || "",
      legenda: f.legenda,
    })),
  };
}

const CARDAPIO = `_id, inicio, fim, fonteUrl, dias[]{data, feriado, motivo, cafe, colacao, almoco, lanche, jantar},
  "fotos": fotos[autorizada == true && defined(asset)]{asset, crop, hotspot, alt, legenda}`;

/**
 * Página do blog: publicações, as duas semanas de cardápio mais recentes (a atual e a anterior)
 * e os projetos do ano. Cada parte falha sozinha: sem resposta do Sanity, a seção some ou avisa.
 */
export const carregarBlog = createServerFn({ method: "GET" }).handler(async () => {
  const hoje = hojeEmBrasilia();
  const [posts, cardapios, projetos] = await Promise.allSettled([
    consultar<ResumoSanity[]>(`*[${VISIVEL}] | order(publicadoEm desc) [0...90] {${RESUMO}}`),
    consultar<CardapioSanity[]>(
      `*[_type == "cardapio" && defined(inicio) && inicio <= $hoje] | order(inicio desc) [0...2] {${CARDAPIO}}`,
      { hoje },
    ),
    consultar<Projeto[]>(
      `*[_type == "projeto" && ano == $ano && defined(nome) && defined(situacao)] | order(ordem asc)
        {nome, parceiro, situacao, destaque, texto}`,
      { ano: Number(hoje.slice(0, 4)) },
    ),
  ]);
  for (const r of [posts, cardapios, projetos])
    if (r.status === "rejected") console.error(r.reason);
  return {
    posts: posts.status === "fulfilled" ? posts.value.map(paraResumo) : [],
    erro: posts.status === "rejected",
    cardapios: cardapios.status === "fulfilled" ? cardapios.value.map(paraCardapio) : [],
    projetos: projetos.status === "fulfilled" ? projetos.value : [],
    ano: Number(hoje.slice(0, 4)),
    hoje,
  };
});

const slugValido = (slug: unknown) =>
  typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;

/** Conta as palavras do texto para estimar o tempo de leitura. */
const palavras = (corpo: PortableTextProps["value"]) => {
  const blocos: unknown[] = Array.isArray(corpo) ? corpo : [corpo];
  let total = 0;
  for (const bloco of blocos) {
    const filhos = (bloco as { children?: unknown } | null)?.children;
    if (!Array.isArray(filhos)) continue;
    for (const filho of filhos) {
      const texto = (filho as { text?: unknown } | null)?.text;
      if (typeof texto === "string") total += texto.split(/\s+/).filter(Boolean).length;
    }
  }
  return total;
};

/**
 * Página da publicação, com 3 outras: primeiro as do mesmo tipo, completando com as mais recentes.
 * Devolve null se o endereço não existe.
 */
export const buscarPost = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slugValido(slug))
  .handler(
    async ({ data: slug }): Promise<{ post: PostCompleto; relacionados: PostResumo[] } | null> => {
      if (!slug) return null;
      const post = await consultar<
        | (ResumoSanity & {
            corpo?: PortableTextProps["value"];
            linkOriginal?: string;
            video?: string;
            fonteTexto?: string;
            paginaRelacionada?: { rota?: string; descricao?: string } | null;
          })
        | null
      >(
        `*[${VISIVEL} && slug.current == $slug][0] {${RESUMO}, corpo, linkOriginal, video, fonteTexto,
          paginaRelacionada}`,
        { slug },
      );
      if (!post) return null;

      // A mesma consulta traz as do mesmo tipo antes das outras (o "select" vale 1 ou 0).
      const relacionados = await consultar<ResumoSanity[]>(
        `*[${VISIVEL} && slug.current != $slug]
          | order(select(tipo == $tipo => 1, 0) desc, publicadoEm desc) [0...3] {${RESUMO}}`,
        { tipo: post.tipo, slug },
      );
      const { corpo = [], fonteTexto, paginaRelacionada, ...resto } = post;
      return {
        post: {
          ...paraResumo(resto),
          corpo,
          linkOriginal: post.linkOriginal,
          video: post.video,
          fonteTexto: fonteTexto?.trim() || undefined,
          paginaRelacionada: ehRotaDoSite(paginaRelacionada?.rota)
            ? { rota: paginaRelacionada.rota, descricao: paginaRelacionada.descricao }
            : undefined,
          // 180 palavras por minuto, como pede a especificação do Blog (KIM, 18/11/2026).
          minutosDeLeitura: Math.max(1, Math.round(palavras(corpo) / 180)),
        },
        relacionados: relacionados.map(paraResumo),
      };
    },
  );

/**
 * Para a newsletter: busca uma publicação pelo identificador, mesmo agendada para o futuro,
 * direto da API (sem cache), porque o aviso do Sanity chega logo depois da publicação.
 * Só para uso no servidor.
 */
export async function postParaNewsletter(
  id: string,
): Promise<(PostResumo & { enviarNewsletter: boolean }) | null> {
  const post = await consultar<(ResumoSanity & { enviarNewsletter?: boolean | null }) | null>(
    `*[_type == "post" && _id == $id && defined(slug.current) && defined(titulo) && defined(tipo)
      && defined(publicadoEm)][0] {${RESUMO}, enviarNewsletter}`,
    { id },
    { semCache: true },
  );
  if (!post) return null;
  const { enviarNewsletter, ...resto } = post;
  // Publicações criadas antes desta opção existir contam como "enviar".
  return { ...paraResumo(resto), enviarNewsletter: enviarNewsletter !== false };
}
