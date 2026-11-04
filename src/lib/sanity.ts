import { createImageUrlBuilder } from "@sanity/image-url";

/**
 * Acesso ao Sanity, compartilhado pelo bazar e pelo blog (painel em https://inav.sanity.studio).
 * O site no ar lê o dataset "production". Para ver os itens e posts de exemplo na sua máquina,
 * rode o site com SANITY_DATASET=development (ex.: SANITY_DATASET=development bun run dev).
 *
 * Só use estas funções dentro de createServerFn: elas leem variáveis de ambiente do servidor.
 */
export const projectId = "2k4u015k";
const apiVersion = "v2026-10-01";
export const dataset = () => process.env["SANITY_DATASET"] ?? "production";

/**
 * Consulta GROQ pela API pública. Usa o CDN (rápido, pode atrasar alguns segundos depois de uma
 * publicação); com `semCache`, lê direto da API, para quando o dado acabou de ser publicado.
 * Falha com erro se o Sanity não responder.
 */
export async function consultar<T>(
  query: string,
  params: Record<string, unknown> = {},
  { semCache = false }: { semCache?: boolean } = {},
): Promise<T> {
  const host = semCache ? "api.sanity.io" : "apicdn.sanity.io";
  const url = new URL(`https://${projectId}.${host}/${apiVersion}/data/query/${dataset()}`);
  url.searchParams.set("query", query);
  for (const [nome, valor] of Object.entries(params)) {
    url.searchParams.set(`$${nome}`, JSON.stringify(valor));
  }
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error(`O Sanity respondeu ${resposta.status}`);
  return ((await resposta.json()) as { result: T }).result;
}

/** Monta endereços de imagem otimizados (formato automático) a partir de uma foto do Sanity. */
export const imagemDoSanity = (
  foto: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0],
) => createImageUrlBuilder({ projectId, dataset: dataset() }).image(foto).auto("format");

export type FotoSanity = Parameters<typeof imagemDoSanity>[0] & { lqip?: string };
