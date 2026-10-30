import { useId } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/** Proporção (altura / largura) de cada desenho de public/ilustracoes. */
export const proporcoes = {
  abelha: 90 / 120,
  arbusto: 70 / 120,
  "arvore-clara": 160 / 120,
  arvore: 160 / 120,
  borboleta: 80 / 100,
  capim: 50 / 60,
  caracol: 94 / 124,
  joaninha: 1,
  lagarta: 88 / 156,
  libelula: 92 / 130,
  "margarida-azul": 120 / 60,
  "margarida-laranja": 120 / 60,
  nuvem: 90 / 210,
  passarinho: 92 / 104,
  sol: 1,
  tulipa: 110 / 50,
} as const;

export type NomeIlustracao = keyof typeof proporcoes;

export const caminhoIlustracao = (nome: NomeIlustracao) => `/ilustracoes/${nome}.svg`;

type IlustracaoProps = {
  nome: NomeIlustracao;
  /** Posição e largura, ex.: "absolute right-8 top-6 w-20". */
  className?: string;
};

/** Desenho decorativo: leitores de tela ignoram e ele não bloqueia cliques. */
export function Ilustracao({ nome, className }: IlustracaoProps) {
  return (
    <img
      src={caminhoIlustracao(nome)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("pointer-events-none h-auto select-none", className)}
    />
  );
}

// Devagar e em ritmo constante, como um bichinho passeando.
const desenhar: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 3.2, delay: 0.3, ease: "easeInOut" } },
};

// Com "reduzir movimento", o rastro aparece inteiro de uma vez.
const desenharSemMovimento: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0 } },
};

/**
 * O tracejado em si, para usar dentro de um <motion.svg> que controla as variantes
 * "hidden" e "show" (ver `propsDoRastro`).
 */
export function TracoRastro({ d }: { d: string }) {
  const mascara = `rastro-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const reduzir = useReducedMotion();

  return (
    <g fill="none">
      {/* A máscara revela o tracejado aos poucos; animar o próprio tracejado desmancharia os traços. */}
      <mask id={mascara} maskUnits="userSpaceOnUse">
        <motion.path
          d={d}
          variants={reduzir ? desenharSemMovimento : desenhar}
          stroke="white"
          strokeWidth={10}
          strokeLinecap="round"
        />
      </mask>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="9 11"
        mask={`url(#${mascara})`}
      />
    </g>
  );
}

/** Props do <motion.svg> que desenha o rastro uma vez, quando ele aparece na tela. */
// Começa igual no servidor e no navegador (sem depender de "reduzir movimento"), para não dar erro de hidratação.
export const propsDoRastro = {
  initial: "hidden",
  whileInView: "show",
  // Só começa com o rastro inteiro na tela e fora do terço de baixo, ou seja, quando a pessoa já chegou nele.
  viewport: { once: true, amount: "all", margin: "0px 0px -30% 0px" },
} as const;

type Peca = { nome: NomeIlustracao; className: string };

/**
 * Combinações prontas: um desenho de base (que define o tamanho) e peças encaixadas nele.
 * As posições das peças são em % da base, então a cena escala junto com a largura.
 */
const cenas = {
  "sol-e-nuvem": {
    base: "sol",
    pecas: [{ nome: "nuvem", className: "bottom-[8%] -left-[24%] w-[122%]" }],
  },
  "duas-nuvens": {
    base: "nuvem",
    pecas: [{ nome: "nuvem", className: "-right-[30%] top-[55%] w-[55%]" }],
  },
  "passarinho-na-arvore": {
    base: "arvore",
    pecas: [{ nome: "passarinho", className: "-top-[12%] left-[34%] w-[40%]" }],
  },
  "abelha-na-margarida": {
    base: "margarida-laranja",
    pecas: [{ nome: "abelha", className: "-top-[16%] left-[70%] w-[130%]" }],
  },
  "borboleta-na-tulipa": {
    base: "tulipa",
    pecas: [{ nome: "borboleta", className: "-left-[110%] -top-[24%] w-[150%]" }],
  },
  "caracol-no-arbusto": {
    base: "arbusto",
    pecas: [{ nome: "caracol", className: "-right-[22%] bottom-0 w-[48%]" }],
  },
  "joaninha-na-flor": {
    base: "margarida-azul",
    pecas: [{ nome: "joaninha", className: "-right-[55%] top-[40%] w-[60%]" }],
  },
} satisfies Record<string, { base: NomeIlustracao; pecas: Peca[] }>;

export type NomeCena = keyof typeof cenas;

type CenaProps = {
  nome: NomeCena;
  /** Posição e largura da base, ex.: "right-[5%] top-8 w-20". Por padrão só aparece em telas largas. */
  className?: string;
};

/** Combinação de desenhos (ex.: sol atrás da nuvem). Vai dentro de um elemento com `relative`. */
export function Cena({ nome, className }: CenaProps) {
  const { base, pecas } = cenas[nome];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 hidden lg:block", className)}
    >
      <Ilustracao nome={base} className="block w-full" />
      {pecas.map((peca, i) => (
        <Ilustracao key={i} nome={peca.nome} className={cn("absolute", peca.className)} />
      ))}
    </div>
  );
}

const larguraNoCanteiro: Partial<Record<NomeIlustracao, string>> = {
  arbusto: "w-24",
  "arvore-clara": "w-20",
  arvore: "w-24",
  capim: "w-8",
  caracol: "w-14",
  joaninha: "w-9",
  lagarta: "w-16",
  "margarida-azul": "w-7",
  "margarida-laranja": "w-7",
  tulipa: "w-6",
};

type CanteiroProps = {
  itens: NomeIlustracao[];
  /** Posição, ex.: "left-[3%]". Fica apoiado na base da seção. */
  className?: string;
};

/** Grupinho de plantas e bichinhos apoiado na base de uma seção, só em telas largas. */
export function Canteiro({ itens, className }: CanteiroProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-0 -z-10 hidden items-end gap-1.5 lg:flex",
        className,
      )}
    >
      {itens.map((nome, i) => (
        <Ilustracao
          key={`${nome}-${i}`}
          nome={nome}
          className={cn("shrink-0", larguraNoCanteiro[nome] ?? "w-12")}
        />
      ))}
    </div>
  );
}
