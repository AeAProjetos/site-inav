import { useSyncExternalStore } from "react";

/**
 * Sacola do bazar. Fica só no navegador de quem está comprando (localStorage): o site não
 * guarda pedidos nem dados pessoais. O pedido vira uma mensagem de WhatsApp para o INAV.
 */
export type LinhaDaSacola = { codigo: string; quantidade: number };

const CHAVE = "inav-bazar-sacola";
const VAZIA: LinhaDaSacola[] = [];

let linhas: LinhaDaSacola[] = VAZIA;
let carregada = false;
const ouvintes = new Set<() => void>();

function ler(): LinhaDaSacola[] {
  try {
    const salvas: unknown = JSON.parse(localStorage.getItem(CHAVE) ?? "[]");
    if (!Array.isArray(salvas)) return VAZIA;
    return salvas.filter(
      (l): l is LinhaDaSacola =>
        typeof l?.codigo === "string" && Number.isInteger(l?.quantidade) && l.quantidade > 0,
    );
  } catch {
    return VAZIA;
  }
}

function gravar(novas: LinhaDaSacola[]) {
  linhas = novas;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(novas));
  } catch {
    // Navegador sem armazenamento (aba anônima, por exemplo): a sacola vale até fechar a página.
  }
  ouvintes.forEach((avisar) => avisar());
}

function assinar(avisar: () => void) {
  ouvintes.add(avisar);
  // Mantém a sacola igual entre abas abertas do site.
  const deOutraAba = (evento: StorageEvent) => {
    if (evento.key !== CHAVE) return;
    linhas = ler();
    avisar();
  };
  window.addEventListener("storage", deOutraAba);
  return () => {
    ouvintes.delete(avisar);
    window.removeEventListener("storage", deOutraAba);
  };
}

function atual() {
  if (!carregada) {
    linhas = ler();
    carregada = true;
  }
  return linhas;
}

export function useSacola() {
  return useSyncExternalStore(assinar, atual, () => VAZIA);
}

/** Total de unidades, para o número no ícone da sacola. */
export function useUnidadesNaSacola() {
  return useSacola().reduce((soma, linha) => soma + linha.quantidade, 0);
}

export const sacola = {
  /** Soma à quantidade que já estava na sacola, sem passar do estoque. */
  adicionar(codigo: string, quantidade: number, maximo: number) {
    const existente = atual().find((l) => l.codigo === codigo);
    const nova = Math.min((existente?.quantidade ?? 0) + quantidade, maximo);
    sacola.definirQuantidade(codigo, nova);
  },
  definirQuantidade(codigo: string, quantidade: number) {
    if (quantidade <= 0) return sacola.remover(codigo);
    const lista = atual();
    gravar(
      lista.some((l) => l.codigo === codigo)
        ? lista.map((l) => (l.codigo === codigo ? { ...l, quantidade } : l))
        : [...lista, { codigo, quantidade }],
    );
  },
  remover(codigo: string) {
    gravar(atual().filter((l) => l.codigo !== codigo));
  },
  esvaziar() {
    gravar(VAZIA);
  },
};
