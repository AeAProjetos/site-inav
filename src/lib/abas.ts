import type { KeyboardEvent } from "react";

/**
 * Setas do teclado entre as abas (role="tab") de um tablist, como pede o padrão de abas do
 * WAI-ARIA: esquerda e direita andam e dão a volta, Home vai para a primeira e End para a última.
 * Usado no cardápio da semana e no arquivo do blog.
 */
export function navegarComSetas(
  e: KeyboardEvent<HTMLElement>,
  total: number,
  atual: number,
  ir: (i: number) => void,
) {
  const passo = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  const destino =
    passo !== undefined
      ? (atual + passo + total) % total
      : e.key === "Home"
        ? 0
        : e.key === "End"
          ? total - 1
          : null;
  if (destino === null) return;
  e.preventDefault();
  ir(destino);
  e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[destino]?.focus();
}
