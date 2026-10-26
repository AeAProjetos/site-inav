import { createServerFn } from "@tanstack/react-start";
import type { PortableTextProps } from "@portabletext/react";

import { consultar, imagemDoSanity, type FotoSanity } from "@/lib/sanity";

/** Blog: as publicações vêm do Sanity (painel em https://inav.sanity.studio). Acesso em src/lib/sanity.ts. */

// Mesma lista do painel (studio/schemaTypes/post.ts). Se mudar lá, mude aqui.
// Os tons seguem os papéis das cores da marca: laranja chama para agir, azul informa, verde celebra.
export const tipos = [
  { value: "aviso", title: "Aviso", tom: "laranja" },
  { value: "campanha", title: "Campanha", tom: "laranja" },
  { value: "instagram", title: "Instagram", tom: "azul" },
  { value: "marco", title: "Marco institucional", tom: "azul" },
  { value: "historia", title: "História de transformação", tom: "verde" },
  { value: "parceiro", title: "Parceiro em destaque", tom: "verde" },
] as const;

export type TipoDePost = (typeof tipos)[number]["value"];

export const infoDoTipo = (valor: string) => tipos.find((t) => t.value === valor) ?? tipos[0];

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
  /** Só existe se a autorização de uso de imagem foi marcada no painel. */
  capa?: Capa | undefined;
};

export type PostCompleto = PostResumo & {
  corpo: PortableTextProps["value"];
  linkOriginal?: string | undefined;
  video?: string | undefined;
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
const RESUMO = `"slug": slug.current, titulo, resumo, tipo, publicadoEm, "capa": ${CAPA}`;

type CapaSanity = FotoSanity & {
  alt?: string;
  legenda?: string;
  credito?: string;
};
type ResumoSanity = Omit<PostResumo, "capa"> & { capa?: CapaSanity | null };

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

const paraResumo = ({ capa, ...post }: ResumoSanity): PostResumo => ({
  ...post,
  capa: montarCapa(capa, post.titulo),
});

/** Linha do tempo: as publicações mais recentes primeiro. Se o Sanity não responder, a página mostra um aviso. */
export const listarPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const posts = await consultar<ResumoSanity[]>(
      `*[${VISIVEL}] | order(publicadoEm desc) [0...60] {${RESUMO}}`,
    );
    return { posts: posts.map(paraResumo), erro: false };
  } catch (erro) {
    console.error(erro);
    return { posts: [] as PostResumo[], erro: true };
  }
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

/** Página da publicação, com até 3 outras do mesmo tipo. Devolve null se o endereço não existe. */
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
          })
        | null
      >(`*[${VISIVEL} && slug.current == $slug][0] {${RESUMO}, corpo, linkOriginal, video}`, {
        slug,
      });
      if (!post) return null;

      const relacionados = await consultar<ResumoSanity[]>(
        `*[${VISIVEL} && tipo == $tipo && slug.current != $slug] | order(publicadoEm desc) [0...3] {${RESUMO}}`,
        { tipo: post.tipo, slug },
      );
      const { corpo = [], ...resto } = post;
      return {
        post: {
          ...paraResumo(resto),
          corpo,
          linkOriginal: post.linkOriginal,
          video: post.video,
          minutosDeLeitura: Math.max(1, Math.round(palavras(corpo) / 200)),
        },
        relacionados: relacionados.map(paraResumo),
      };
    },
  );
