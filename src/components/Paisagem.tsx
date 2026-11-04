import type { ReactNode } from "react";
import { motion } from "motion/react";

import {
  caminhoIlustracao,
  proporcoes,
  TracoRastro,
  propsDoRastro,
  type NomeIlustracao,
} from "@/components/Ilustracao";
import { cn } from "@/lib/utils";

/** Desenho apoiado numa colina. `chao` é a altura da curva no ponto `centro`. */
type NoChao = { nome: NomeIlustracao; centro: number; chao: number; largura: number };
/** Desenho solto no céu. */
type NoCeu = { nome: NomeIlustracao; x: number; y: number; largura: number };

function DesenhoNoChao({ nome, centro, chao, largura }: NoChao) {
  const altura = largura * proporcoes[nome];
  // Afunda 3 unidades no chão para não parecer flutuar.
  return (
    <image
      href={caminhoIlustracao(nome)}
      x={centro - largura / 2}
      y={chao - altura + 3}
      width={largura}
      height={altura}
    />
  );
}

function DesenhoNoCeu({ nome, x, y, largura }: NoCeu) {
  return (
    <image
      href={caminhoIlustracao(nome)}
      x={x}
      y={y}
      width={largura}
      height={largura * proporcoes[nome]}
    />
  );
}

type QuadroProps = {
  viewBox: string;
  /** Em telas estreitas a faixa é cortada; define que lado fica visível. */
  ancora: "xMinYMax" | "xMaxYMax";
  className?: string;
  children: ReactNode;
};

/** SVG que ocupa a largura toda e desenha o rastro quando aparece na tela. */
function Quadro({ viewBox, ancora, className, children }: QuadroProps) {
  return (
    <motion.svg
      viewBox={viewBox}
      preserveAspectRatio={`${ancora} slice`}
      aria-hidden="true"
      focusable="false"
      {...propsDoRastro}
      className={cn("pointer-events-none block h-auto w-full text-brand-blue-deep/45", className)}
    >
      {children}
    </motion.svg>
  );
}

/* ---------- Home: faixa entre "Nossa Jornada" e o bloco institucional ---------- */

/** Linha do chão. As posições de `chao` abaixo foram calculadas sobre esta curva. */
const CHAO_HOME =
  "M0,190 C220,160 420,158 620,182 C820,206 1020,200 1200,168 C1310,150 1390,150 1440,158";

// Mais elementos nas pontas e o meio mais livre, para a paisagem não pesar.
const plantasHome: NoChao[] = [
  { nome: "arvore", centro: 70, chao: 181, largura: 112 },
  { nome: "arbusto", centro: 175, chao: 172, largura: 96 },
  { nome: "margarida-laranja", centro: 255, chao: 167, largura: 30 },
  { nome: "capim", centro: 300, chao: 166, largura: 34 },
  { nome: "caracol", centro: 420, chao: 167, largura: 64 },
  { nome: "tulipa", centro: 560, chao: 176, largura: 24 },
  { nome: "capim", centro: 820, chao: 196, largura: 30 },
  { nome: "margarida-azul", centro: 960, chao: 194, largura: 28 },
  { nome: "arvore-clara", centro: 1190, chao: 170, largura: 96 },
  { nome: "arvore", centro: 1300, chao: 156, largura: 120 },
  { nome: "arbusto", centro: 1395, chao: 154, largura: 88 },
];

const ceuHome: NoCeu[] = [
  { nome: "borboleta", x: 330, y: 40, largura: 46 },
  { nome: "passarinho", x: 1010, y: 36, largura: 62 },
];

/**
 * Faixa de paisagem da Home: colina, árvores, flores e bichinhos.
 * O chão tem a cor da seção seguinte, para a paisagem "virar" o fundo dela.
 */
export function PaisagemHome() {
  return (
    <div aria-hidden="true" className="pointer-events-none bg-background">
      <Quadro viewBox="0 0 1440 240" ancora="xMaxYMax" className="min-h-[120px]">
        <path d={`${CHAO_HOME} L1440,240 L0,240 Z`} className="fill-surface-tint" />
        {/* O fundo da colina é quase branco; a linha marca onde fica o chão. */}
        <path
          d={CHAO_HOME}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          className="stroke-brand-blue-soft"
        />
        <TracoRastro d="M640,140 C700,170 770,150 780,110 C790,72 740,70 742,100 C744,132 830,128 900,92 C940,72 975,66 1004,70" />
        {plantasHome.map((p, i) => (
          <DesenhoNoChao key={i} {...p} />
        ))}
        {ceuHome.map((p) => (
          <DesenhoNoCeu key={p.nome} {...p} />
        ))}
      </Quadro>
    </div>
  );
}

/* ---------- Rodapé: colinas verdes que terminam no azul do rodapé ---------- */

const COLINA_DE_TRAS =
  "M0,206 C240,168 520,160 800,184 C1040,204 1240,176 1440,168 L1440,340 L0,340 Z";
const COLINA_DA_FRENTE =
  "M0,262 C300,240 560,246 820,262 C1080,278 1260,252 1440,248 L1440,340 L0,340 Z";
// Passa 6 unidades da borda de baixo para cobrir a emenda de meio pixel com o fundo do rodapé.
// O SVG fica atrás do texto do rodapé (sem z-index), então essa sobra nunca cobre os títulos.
const INICIO_DO_RODAPE =
  "M0,312 C360,292 720,296 1080,308 C1260,314 1380,306 1440,302 L1440,346 L0,346 Z";

// Na colina verde-clara: árvores, flores e capim (caules verdes aparecem sobre ela).
const naColinaDeTras: NoChao[] = [
  { nome: "arvore", centro: 130, chao: 189, largura: 120 },
  { nome: "arvore-clara", centro: 225, chao: 180, largura: 84 },
  { nome: "capim", centro: 470, chao: 173, largura: 30 },
  { nome: "margarida-laranja", centro: 560, chao: 171, largura: 30 },
  { nome: "tulipa", centro: 640, chao: 174, largura: 26 },
  { nome: "margarida-azul", centro: 720, chao: 178, largura: 30 },
  { nome: "capim", centro: 860, chao: 188, largura: 30 },
  { nome: "margarida-laranja", centro: 960, chao: 191, largura: 30 },
  { nome: "tulipa", centro: 1040, chao: 190, largura: 26 },
  { nome: "margarida-azul", centro: 1130, chao: 187, largura: 30 },
  { nome: "arvore-clara", centro: 1290, chao: 177, largura: 104 },
  { nome: "tulipa", centro: 1385, chao: 171, largura: 24 },
];

// Na colina verde só entram bichinhos com contorno. Arbusto e capim somem nas duas colinas.
const naColinaDaFrente: NoChao[] = [
  { nome: "lagarta", centro: 620, chao: 252, largura: 72 },
  // No celular a faixa mostra até ~880; o caracol fica antes disso.
  { nome: "caracol", centro: 820, chao: 262, largura: 60 },
];

const ceuRodape: NoCeu[] = [
  { nome: "borboleta", x: 380, y: 64, largura: 44 },
  { nome: "abelha", x: 1000, y: 52, largura: 58 },
];

/**
 * Paisagem que abre o rodapé de todas as páginas. Os desenhos ficam sobre o fundo
 * claro e as colinas verdes; o azul-escuro só começa embaixo, onde está o texto.
 */
export function PaisagemRodape() {
  return (
    <Quadro viewBox="0 0 1440 340" ancora="xMinYMax" className="min-h-[150px] overflow-visible">
      <TracoRastro d="M760,150 C800,176 860,166 866,134 C872,104 832,100 836,124 C842,150 900,140 940,112 C962,96 980,88 1000,84" />
      <path d={COLINA_DE_TRAS} className="fill-brand-green-light" />
      {naColinaDeTras.map((p, i) => (
        <DesenhoNoChao key={i} {...p} />
      ))}
      <path d={COLINA_DA_FRENTE} className="fill-brand-green" />
      {naColinaDaFrente.map((p, i) => (
        <DesenhoNoChao key={i} {...p} />
      ))}
      <path d={INICIO_DO_RODAPE} className="fill-brand-blue-deep" />
      {ceuRodape.map((p) => (
        <DesenhoNoCeu key={p.nome} {...p} />
      ))}
    </Quadro>
  );
}
