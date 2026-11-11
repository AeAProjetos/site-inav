import { animate } from "motion/react";

// Começa e termina devagar: a página desliza até a seção, sem tranco na saída nem na chegada.
const CURVA = [0.65, 0, 0.35, 1] as const;

const INTERRUPCOES = ["wheel", "touchstart", "mousedown", "keydown"] as const;

/**
 * Rola a página com suavidade até o elemento com o `id` dado, respeitando o `scroll-margin-top`
 * dele (o espaço do cabeçalho fixo). Para se a pessoa rolar, tocar ou teclar no meio do caminho.
 * Com "reduzir movimento", vai direto. No fim, o foco passa para o destino, como num link de
 * âncora: o destino precisa de `tabIndex={-1}`.
 */
export function rolarAte(id: string) {
  const alvo = document.getElementById(id);
  if (!alvo) return;

  const margem = Number.parseFloat(getComputedStyle(alvo).scrollMarginTop) || 0;
  const destino = Math.max(0, alvo.getBoundingClientRect().top + window.scrollY - margem);
  const focar = () => alvo.focus({ preventScroll: true });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, destino);
    focar();
    return;
  }

  // Cerca de 0,9 s para a altura de um topo de página; trajetos longos chegam a 1,2 s.
  const distancia = Math.abs(destino - window.scrollY);
  const animacao = animate(window.scrollY, destino, {
    duration: Math.min(1.2, 0.6 + distancia / 2000),
    ease: CURVA,
    onUpdate: (y) => window.scrollTo(0, y),
  });

  let interrompida = false;
  const soltar = () => INTERRUPCOES.forEach((evento) => window.removeEventListener(evento, parar));
  function parar() {
    interrompida = true;
    animacao.stop();
    soltar();
  }
  INTERRUPCOES.forEach((evento) => window.addEventListener(evento, parar, { passive: true }));

  void animacao.then(() => {
    soltar();
    if (!interrompida) focar();
  });
}
