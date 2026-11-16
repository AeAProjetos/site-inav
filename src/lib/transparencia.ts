/** Biblioteca de documentos da página Transparência: tipos, categorias, leitura da planilha e busca. */

export type Documento = {
  titulo: string;
  nota: string;
  ano: string;
  categoria: string;
  /** Sem link público, a linha mostra "PDF ainda indisponível". */
  link?: string | undefined;
  /** Ordem dos documentos de referência em "Todos" (1 primeiro). Só vale se houver link. */
  destaque?: number | undefined;
};

/** Ordem das categorias nos filtros. Categorias novas da planilha entram depois destas. */
export const ordemDasCategorias = [
  "Institucional",
  "Políticas e ética",
  "Certificações e registros",
  "Contas e auditorias",
  "Parcerias públicas",
  "Prestações de contas aprovadas",
  "Arquivo histórico",
] as const;

export type Consulta = { busca: string; categoria: string; ano: string };

export const consultaInicial: Consulta = { busca: "", categoria: "", ano: "" };

/** Sem acento e em minúsculas, para "auditoria" achar "Auditória" e vice-versa. */
export const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * A planilha é editada à mão: só aceita link https ou caminho do próprio site
 * (ex.: /livros/...). Qualquer outra coisa vira "PDF ainda indisponível".
 */
export function linkSeguro(link: string | undefined) {
  const valor = (link ?? "").trim();
  if (valor.startsWith("https://")) return valor;
  if (valor.startsWith("/") && !valor.startsWith("//")) return valor;
  return undefined;
}

/** Aceita a categoria com ou sem acento e com qualquer caixa; desconhecida fica como veio. */
export function categoriaPadronizada(categoria: string) {
  const alvo = normalizar(categoria.trim());
  return ordemDasCategorias.find((nome) => normalizar(nome) === alvo) ?? categoria.trim();
}

/**
 * Converte as linhas da planilha (colunas titulo, nota, link, categoria, ano, destaque).
 * Devolve `null` se a planilha ainda for a antiga, sem a coluna categoria: aí vale a lista padrão.
 */
export function documentosDaPlanilha(linhas: Record<string, string>[]): Documento[] | null {
  if (linhas.length === 0 || !("categoria" in (linhas[0] ?? {}))) return null;
  const documentos = linhas
    .map((linha): Documento => {
      const destaque = Number.parseInt(linha["destaque"] ?? "", 10);
      return {
        titulo: (linha["titulo"] ?? "").trim(),
        nota: (linha["nota"] ?? "").trim(),
        ano: (linha["ano"] ?? "").trim(),
        categoria: categoriaPadronizada(linha["categoria"] ?? "") || "Arquivo histórico",
        link: linkSeguro(linha["link"]),
        destaque: Number.isFinite(destaque) && destaque > 0 ? destaque : undefined,
      };
    })
    .filter((documento) => documento.titulo.length > 0);
  return documentos.length > 0 ? documentos : null;
}

/** Categorias presentes, na ordem fixa, com a contagem de cada uma. */
export function categoriasComContagem(documentos: Documento[]) {
  const contagem = new Map<string, number>();
  for (const documento of documentos) {
    contagem.set(documento.categoria, (contagem.get(documento.categoria) ?? 0) + 1);
  }
  const conhecidas = ordemDasCategorias.filter((nome) => contagem.has(nome));
  const novas = [...contagem.keys()].filter(
    (nome) => !(ordemDasCategorias as readonly string[]).includes(nome),
  );
  return [...conhecidas, ...novas].map((nome) => ({ nome, total: contagem.get(nome) ?? 0 }));
}

/** Do mais antigo ao mais recente, ex.: "2000–2026". */
export function periodoDoAcervo(documentos: Documento[]) {
  const anos = documentos
    .map((documento) => Number.parseInt(documento.ano, 10))
    .filter(Number.isFinite);
  if (anos.length === 0) return "";
  return `${Math.min(...anos)}–${Math.max(...anos)}`;
}

/**
 * Filtra pela busca (título e nota, sem acento), categoria e ano. Em "Todos", os documentos
 * de referência com link vêm primeiro; o resto segue a ordem da planilha.
 */
export function filtrarDocumentos(documentos: Documento[], consulta: Consulta) {
  const busca = normalizar(consulta.busca.trim());
  const comPosicao = documentos.map((documento, posicao) => ({ documento, posicao }));
  return comPosicao
    .filter(
      ({ documento }) =>
        (!consulta.categoria || documento.categoria === consulta.categoria) &&
        (!consulta.ano || documento.ano === consulta.ano) &&
        (!busca || normalizar(`${documento.titulo} ${documento.nota}`).includes(busca)),
    )
    .sort((a, b) => {
      const peso = ({ documento }: (typeof comPosicao)[number]) =>
        !consulta.categoria && documento.link && documento.destaque
          ? documento.destaque
          : Number.POSITIVE_INFINITY;
      return peso(a) - peso(b) || a.posicao - b.posicao;
    })
    .map(({ documento }) => documento);
}
