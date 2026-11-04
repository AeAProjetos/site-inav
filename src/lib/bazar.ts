import { createServerFn } from "@tanstack/react-start";
import { consultar, imagemDoSanity, type FotoSanity } from "@/lib/sanity";

/** Bazar: os itens vêm do Sanity (painel em https://inav.sanity.studio). Acesso em src/lib/sanity.ts. */

// Mesmas listas do painel (studio/schemaTypes/itemBazar.ts). Se mudar lá, mude aqui.
export const categorias = [
  { title: "Roupas e calçados", value: "roupas-calcados" },
  { title: "Casa e móveis", value: "casa-moveis" },
  { title: "Eletrônicos e eletrodomésticos", value: "eletronicos" },
  { title: "Brinquedos e livros", value: "brinquedos-livros" },
  { title: "Higiene e beleza", value: "higiene-beleza" },
  { title: "Outros", value: "outros" },
] as const;

export const conservacoes: Record<string, string> = {
  novo: "Novo",
  otimo: "Usado, em ótimo estado",
  marcas: "Usado, com marcas de uso",
};

export const nomeDaCategoria = (valor: string) =>
  categorias.find((c) => c.value === valor)?.title ?? "Outros";

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const formatarPreco = (valor: number) => reais.format(valor);

/** "2026-10-28" vira "28/10". */
export const diaEMes = (data: string) => data.split("-").reverse().slice(0, 2).join("/");

export type Foto = { card: string; media: string; grande: string; lqip?: string | undefined };

export type ItemResumo = {
  codigo: string;
  nome: string;
  categoria: string;
  conservacao: string;
  tamanho?: string;
  preco: number;
  /** 1 para peça única; mais que 1 para itens com estoque. */
  quantidade: number;
  reservado: boolean;
  foto: Foto;
};

export type ItemCompleto = Omit<ItemResumo, "foto"> & {
  descricao?: string;
  validade?: string;
  reservadoAte?: string;
  fotos: Foto[];
};

// Um item aparece no site enquanto não foi vendido, tem unidades e não passou da validade.
// Datas do painel valem até o fim do dia, no horário de Brasília.
const fimDoDia = (campo: string) => `dateTime(${campo} + "T23:59:59-03:00") < dateTime(now())`;
const VISIVEL = `_type == "itemBazar" && defined(codigo) && defined(nome) && count(fotos) > 0
  && situacao != "vendido" && quantidade > 0 && !(defined(validade) && ${fimDoDia("validade")})`;
const RESERVADO = `situacao == "reservado" && quantidade == 1
  && !(defined(reservadoAte) && ${fimDoDia("reservadoAte")})`;
const FOTO = `{asset, crop, hotspot, "lqip": asset->metadata.lqip}`;
const RESUMO = `codigo, nome, categoria, conservacao, tamanho, preco, quantidade,
  "reservado": ${RESERVADO}, "foto": fotos[0]${FOTO}`;

function montarFoto(foto: FotoSanity): Foto {
  const imagem = imagemDoSanity(foto);
  return {
    card: imagem.width(640).height(480).fit("crop").url(),
    media: imagem.width(1100).fit("max").url(),
    grande: imagem.width(1800).fit("max").url(),
    lqip: foto.lqip,
  };
}

type ResumoSanity = Omit<ItemResumo, "foto"> & { foto: FotoSanity };

const paraResumo = ({ foto, ...item }: ResumoSanity): ItemResumo => ({
  ...item,
  foto: montarFoto(foto),
});

// Peças reservadas vão para o fim da vitrine.
const reservadosPorUltimo = (a: ItemResumo, b: ItemResumo) =>
  Number(a.reservado) - Number(b.reservado);

/** Vitrine: todos os itens à venda. Se o Sanity não responder, a página mostra um aviso. */
export const listarItens = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const itens = await consultar<ResumoSanity[]>(
      `*[${VISIVEL}] | order(_createdAt desc) {${RESUMO}}`,
    );
    return { itens: itens.map(paraResumo).sort(reservadosPorUltimo), erro: false };
  } catch (erro) {
    console.error(erro);
    return { itens: [] as ItemResumo[], erro: true };
  }
});

const codigoValido = (codigo: unknown) =>
  typeof codigo === "string" && /^bz-\d{3,}$/i.test(codigo) ? codigo.toUpperCase() : null;

/** Página do item. Devolve null se o código não existe ou o item saiu do bazar. */
export const buscarItem = createServerFn({ method: "GET" })
  .inputValidator((codigo: string) => codigoValido(codigo))
  .handler(async ({ data: codigo }): Promise<ItemCompleto | null> => {
    if (!codigo) return null;
    const item = await consultar<(Omit<ItemCompleto, "fotos"> & { fotos: FotoSanity[] }) | null>(
      `*[${VISIVEL} && codigo == $codigo][0] {
        codigo, nome, categoria, conservacao, tamanho, preco, quantidade, descricao, validade,
        reservadoAte, "reservado": ${RESERVADO}, "fotos": fotos[]${FOTO}
      }`,
      { codigo },
    );
    return item ? { ...item, fotos: item.fotos.map(montarFoto) } : null;
  });

/** Sacola: confere na hora quais itens continuam à venda, com preço e estoque atuais. */
export const conferirItens = createServerFn({ method: "GET" })
  .inputValidator((codigos: string[]) =>
    codigos
      .slice(0, 50)
      .map(codigoValido)
      .filter((c): c is string => c !== null),
  )
  .handler(async ({ data: codigos }) => {
    if (codigos.length === 0) return [] as ItemResumo[];
    const itens = await consultar<ResumoSanity[]>(
      `*[${VISIVEL} && codigo in $codigos] {${RESUMO}}`,
      { codigos },
    );
    return itens.map(paraResumo);
  });

/** Endereço da página do item: /bazar/bz-001. */
export const caminhoDoItem = (codigo: string) => codigo.toLowerCase();
