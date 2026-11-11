import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Canteiro, Cena, Ilustracao } from "@/components/Ilustracao";
import { CarrosselTrajetoria, type Momento } from "@/components/projetos/CarrosselTrajetoria";
import { GaleriaAnos, type FotoDaGaleria } from "@/components/projetos/GaleriaAnos";
import { LinhaDoTempo, type Epoca } from "@/components/projetos/LinhaDoTempo";
import { SeloStatus, type Status } from "@/components/projetos/SeloStatus";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { rolarAte } from "@/lib/rolagem";

/*
 * Página conforme a v5 do designer e do redator (KIM, 10/11/2026), aprovada pelo Renan sem os
 * pedidos de parceria. Fotos e livros em Refinamento/Projetos (nomes de arquivo mantidos).
 * Pendências da seção 7 da nota interna decididas em 11/11/2026: VEPEMA segue como "Aprovado"
 * sem a decisão no acervo, cinco palestras do Vozes Protegidas, total de 12.241, parceiros
 * citados com autorização e os três livros publicados como vieram. A relação entre o Conviver e
 * o Fortalecimento de Vínculos fica para a revisão do designer e do redator.
 */

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Da primeira creche, em 2001, aos projetos de 2026: educação, convivência, esporte, saúde e proteção no Riacho Fundo II. Conheça a trajetória do INAV.",
      },
      { property: "og:title", content: "Projetos — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "26 anos de projetos com a comunidade: linha do tempo, fotos do acervo e os livros de 5, 10 e 15 anos do INAV.",
      },
    ],
  }),
  component: ProjetosPage,
});

const FOTOS = "/img/projetos";

const momentos: Momento[] = [
  {
    periodo: "2000–2002",
    titulo: "O sonho de Dona Nair vira creche",
    status: "documentado",
    texto:
      "A creche abriu em 2001 no Riacho Fundo II. Começou com 30 crianças e terminou 2002 com 100.",
    fonte: "Livro “INAV 5 anos”, p. 4 e 5",
    foto: {
      src: `${FOTOS}/c01_sede_2001_5anos_p4.jpg`,
      alt: "Fachada da Creche Nossa Senhora do Perpétuo Socorro, sede do INAV, nos primeiros anos",
    },
  },
  {
    periodo: "2005",
    titulo: "Três creches, 450 crianças",
    status: "documentado",
    texto:
      "Além da sede, o INAV abriu a João Paulo II, na Candangolândia, e a Irmã Celeste, no Areal.",
    fonte: "Livro “INAV 5 anos”, p. 2, 7 e 8",
    foto: {
      src: `${FOTOS}/c02_irma_celeste_2005_5anos_p8.jpg`,
      alt: "Crianças brincam de cabo de guerra no pátio da Creche Irmã Celeste",
    },
  },
  {
    periodo: "2005",
    titulo: "Cursos para as famílias",
    status: "executado",
    texto:
      "Confeitaria, salgados, eletrônica, tapeçaria e Educação de Adultos para as famílias das crianças.",
    fonte: "Livro “INAV 5 anos”, p. 9",
    foto: {
      src: `${FOTOS}/c03_cursos_eletronica_2005_5anos_p9.jpg`,
      alt: "Aluno do curso de eletrônica trabalha em uma placa de circuito",
    },
  },
  {
    periodo: "2006–2015",
    titulo: "Projeto Conviver",
    status: "documentado",
    texto:
      "Contraturno com reforço escolar, informática, arte e esporte para crianças e adolescentes de 6 a 14 anos.",
    fonte: "Relatório do Projeto Conviver; livro “INAV 10 anos”, p. 41",
    foto: {
      src: `${FOTOS}/c04_conviver_informatica_10anos_p41.jpg`,
      alt: "Crianças e adolescentes do Projeto Conviver em aula na sala de informática",
    },
  },
  {
    periodo: "2010",
    titulo: "Dez anos, 1.100 atendidos",
    status: "documentado",
    texto: "Três unidades, 120 funcionários e o esporte no ginásio: capoeira, caratê e judô.",
    fonte: "Livro “INAV 10 anos”, p. 3 e 42",
    foto: {
      src: `${FOTOS}/c05_capoeira_2010_10anos_p42.jpg`,
      alt: "Roda de capoeira com dezenas de crianças uniformizadas no ginásio do INAV",
    },
  },
  {
    periodo: "2017–2018",
    titulo: "Entrando na Roda",
    status: "documentado",
    texto:
      "Cursos de culinária, panificação, estética, artesanato e informática para a comunidade: 730 atendimentos.",
    fonte: "Histórico “INAV 26 anos”; site anterior",
    foto: {
      src: `${FOTOS}/c06_entrando_na_roda_site_antigo.jpg`,
      alt: "Crianças de touca participam de oficina de culinária no refeitório do INAV",
    },
  },
  {
    periodo: "2025",
    titulo: "Um parquinho renovado",
    status: "aprovado",
    texto: "Projeto contemplado pela VEPEMA (TJDFT) para equipar o parquinho das 240 crianças.",
    fonte: "Projeto VEPEMA “Nossa Instituição Melhor” (06/2025)",
    foto: {
      src: `${FOTOS}/c07_playground_vepema_IMG_1572.jpg`,
      alt: "Menino brinca em cavalinho azul no parquinho do INAV",
    },
  },
  {
    periodo: "2026",
    titulo: "Vozes Protegidas",
    status: "em-execucao",
    texto:
      "Palestras sobre direitos e a rede de proteção para mulheres, famílias e adolescentes, com o Instituto +Brasal.",
    fonte: "Relatório de 01/10/2026; atas de outubro",
    foto: {
      src: `${FOTOS}/c08_vozes_protegidas_IMG_1689.jpg`,
      alt: "Palestra do projeto Vozes Protegidas para adolescentes, no INAV",
    },
  },
];

const galeria: FotoDaGaleria[] = [
  {
    src: `${FOTOS}/g15_pintura.jpg`,
    alt: "Menina sorri enquanto pinta com pincel",
    ano: "2015",
    legenda: "Arte na educação infantil",
    tamanho: "grande",
  },
  {
    src: `${FOTOS}/g10_maculele.jpg`,
    alt: "Crianças dançam maculelê com bastões e fitas azuis",
    ano: "2010",
    legenda: "Maculelê no Projeto Conviver",
    tamanho: "larga",
    className: "object-[center_35%]",
  },
  {
    src: `${FOTOS}/g10_corda.jpg`,
    alt: "Menina salta corda enquanto colegas observam sentados",
    ano: "2010",
    legenda: "Brincadeiras de corda",
  },
  {
    src: `${FOTOS}/g10_carate.jpg`,
    alt: "Duas jovens de quimono em posição de caratê",
    ano: "2010",
    legenda: "Caratê",
  },
  {
    src: `${FOTOS}/g10_refeitorio.jpg`,
    alt: "Crianças almoçam na mesa comprida do refeitório",
    ano: "2010",
    legenda: "Cinco refeições por dia",
    tamanho: "larga",
  },
  {
    src: `${FOTOS}/g15_junina.jpg`,
    alt: "Crianças com roupas de festa junina",
    ano: "2015",
    legenda: "Festa junina",
  },
  {
    src: `${FOTOS}/a26_vozes_turma_IMG_1724.jpg`,
    alt: "Adolescentes acompanham palestra do Vozes Protegidas",
    ano: "2026",
    legenda: "Vozes Protegidas",
    className: "object-[center_60%]",
  },
];

const epocas: Epoca[] = [
  {
    periodo: "2000–2005",
    titulo: "Origem",
    legenda: "Parquinho da creche · livro “INAV 5 anos”",
    foto: {
      src: `${FOTOS}/g05_parque.jpg`,
      alt: "Crianças descem o escorregador do parquinho da creche",
    },
    acoes: [
      {
        periodo: "2002–2009",
        titulo: "Serviço de Convivência",
        status: "documentado",
        texto:
          "Primeiro convênio com a Secretaria de Desenvolvimento Social, para o cuidado diário de crianças pequenas.",
        numero: "100 crianças em 2002 · 470 por ano a partir de 2006",
        detalhes: [
          {
            rotulo: "Quem foi atendido",
            texto: "Crianças de 0 a 5 anos: 100 em 2002, 420 em 2005 e 470 por ano de 2006 a 2009.",
          },
          {
            rotulo: "Por que importou",
            texto: "Garantiu cuidado diário a centenas de famílias trabalhadoras.",
          },
        ],
        fonte: "Atendimentos realizados por convênio 2002–2026",
      },
      {
        periodo: "2005",
        titulo: "Creches João Paulo II e Irmã Celeste",
        status: "documentado",
        texto:
          "Novas creches na Candangolândia e no Areal levaram o atendimento a outras duas comunidades.",
        numero: "450 crianças nas três creches",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "A João Paulo II (10/08) foi reformada com recursos do INAV; a Irmã Celeste (15/09) teve apoio do Instituto Candango de Solidariedade e do CDCA/DF.",
          },
          {
            rotulo: "Quem foi atendido",
            texto: "90 e 120 crianças de 3 a 6 anos, respectivamente.",
          },
        ],
        fonte: "Livro “INAV 5 anos”, p. 2, 7 e 8",
      },
      {
        periodo: "2005–2008",
        titulo: "Estrutura para crescer",
        status: "executado",
        texto:
          "Cozinha industrial, refeitório, ginásio, banheiros e sala profissionalizante, com a Secretaria de Ação Social.",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "Pavilhão com cozinha e refeitório, além de câmeras (2005); computadores (2006); ginásio, arquibancada e mobiliário (2007); banheiros, depósito de alimentos e sala profissionalizante (2008).",
          },
          {
            rotulo: "Por que importou",
            texto: "Criou a estrutura que sustenta o atendimento até hoje.",
          },
        ],
        fonte: "“Projetos executados INAV” 2005 a 2008",
      },
      {
        periodo: "2005–2008",
        titulo: "Convênio Família e cursos",
        status: "documentado",
        texto: "Palestras, oficinas e cursos profissionalizantes para as famílias das crianças.",
        numero: "540 atendimentos",
        detalhes: [
          { rotulo: "Quem foi atendido", texto: "163 famílias em 2005 e 377 em 2007." },
          { rotulo: "Por que importou", texto: "Estendeu o cuidado das crianças às famílias." },
        ],
        fonte: "Livro “INAV 5 anos”, p. 9; Atendimentos 2002–2026",
      },
    ],
  },
  {
    periodo: "2006–2010",
    titulo: "Expansão",
    legenda: "Futebol no ginásio · livro “INAV 10 anos”",
    foto: {
      src: `${FOTOS}/g10_futebol.jpg`,
      alt: "Crianças jogam futebol no ginásio pintado com grafites",
    },
    acoes: [
      {
        periodo: "2006–2015",
        titulo: "Projeto Conviver",
        status: "documentado",
        texto: "Contraturno escolar com reforço, informática, arte, dança, música e esportes.",
        numero: "550 participantes em 2009",
        detalhes: [
          {
            rotulo: "Quem foi atendido",
            texto:
              "Crianças e adolescentes de 6 a 14 anos: 150 na abertura, em 2006, e 550 em 2009.",
          },
          {
            rotulo: "Por que importou",
            texto: "Ofereceu um lugar seguro e com aprendizagem fora do horário escolar.",
          },
        ],
        fonte: "Relatório do Projeto Conviver; Atividades realizadas 2009",
      },
      {
        periodo: "2007",
        titulo: "Protagonismo juvenil com a OIT",
        status: "executado",
        texto:
          "Ações com a Organização Internacional do Trabalho contra a violência sexual infantojuvenil.",
        detalhes: [
          { rotulo: "Quem foi atendido", texto: "Adolescentes atendidos pelo INAV." },
          {
            rotulo: "Por que importou",
            texto: "Primeira ação documentada do INAV na proteção contra a violência.",
          },
        ],
        fonte: "“Projetos executados INAV” 2007",
      },
      {
        periodo: "2009–2010",
        titulo: "Educação infantil e esporte",
        status: "documentado",
        texto:
          "Início da educação infantil integral com a Secretaria de Educação e do caratê de competição.",
        numero: "916 atendidos em 2009 · 1.100 em 2010",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "Em 2010, o INAV sediou um torneio de caratê, e atletas do projeto disputaram competições fora do DF.",
          },
          {
            rotulo: "Por que importou",
            texto: "Consolidou a educação infantil e deu ao esporte papel de formação.",
          },
        ],
        fonte: "Atividades realizadas 2009; livro “INAV 10 anos”, p. 3; matérias de 2010 e 2011",
      },
    ],
  },
  {
    periodo: "2011–2016",
    titulo: "Parcerias que ampliam",
    legenda: "Orquestra do INAV · livro “INAV 15 anos”",
    foto: {
      src: `${FOTOS}/g15_orquestra.jpg`,
      alt: "Crianças e adolescentes tocam saxofone, escaleta e tambores no ginásio",
    },
    acoes: [
      {
        periodo: "2013",
        titulo: "Cozinha reequipada e festa julina",
        status: "executado",
        texto: "Novos equipamentos para a cozinha e uma festa julina aberta à cidade.",
        numero: "Cerca de 2 mil pessoas na festa",
        detalhes: [
          {
            rotulo: "Por que importou",
            texto: "Melhorou a produção das refeições e aproximou a comunidade.",
          },
        ],
        fonte: "“Projetos executados INAV” 2013; matéria de 2013",
      },
      {
        periodo: "2014",
        titulo: "Orquestra INAV e Mais Saúde",
        status: "executado",
        texto: "Oficinas de música com a Casa Azul e exames com o Instituto Sabin.",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "Oficinas com recursos do Grupo de Cônjuges de Chefes de Missão e campanhas de Páscoa e “Espalhe Amor”.",
          },
          {
            rotulo: "Quem foi atendido",
            texto: "Adolescentes (música), alunos e comunidade (exames).",
          },
        ],
        fonte: "“Projetos executados INAV” 2014; Jornal de Brasília, 2014",
      },
      {
        periodo: "2015",
        titulo: "15 anos e o Conviver ampliado",
        status: "executado",
        texto:
          "Parceria com a Casa Azul somou preparação para o trabalho, serviço social e psicologia ao contraturno.",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "O livro dos 15 anos registra a rotina da educação infantil, com o programa “Desperdício Zero”, música e meio ambiente.",
          },
        ],
        fonte: "Relatório “INAV 15 anos” (2015)",
      },
      {
        periodo: "2015–2017",
        titulo: "Saúde perto de casa",
        status: "executado",
        // O texto da v5 citava "pediatras voluntários": o site não menciona voluntariado (regra do INAV).
        texto:
          "Exames com o Sabin, trailer odontológico do Seconci-DF e consultas com a Sociedade de Pediatria.",
        numero: "150 exames registrados",
        detalhes: [
          {
            rotulo: "Por que importou",
            texto: "Aproximou cuidados de saúde de quem tinha pouco acesso.",
          },
        ],
        fonte: "Termos de parceria Sabin, Seconci e Sociedade de Pediatria",
      },
    ],
  },
  {
    periodo: "2017–2020",
    titulo: "Qualificação e estrutura",
    legenda: "Espaço recreativo coberto (Termo de Fomento 13/2019), foto de 2026",
    foto: {
      src: `${FOTOS}/a26_espaco_recreativo_IMG_2217.jpg`,
      alt: "Parquinho coberto do INAV, com brinquedos coloridos",
    },
    acoes: [
      {
        periodo: "2017–2018",
        titulo: "Entrando na Roda",
        status: "documentado",
        texto:
          "Cursos para a comunidade com a Casa Azul Felipe Augusto e o Senac (Ateliê do Sabor).",
        numero: "730 atendimentos",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto: "Culinária, panificação, estética, artesanato e informática.",
          },
          { rotulo: "Por que importou", texto: "Abriu caminhos de renda para as famílias." },
        ],
        fonte: "Histórico “INAV 26 anos”; site anterior",
      },
      {
        periodo: "2018–2019",
        titulo: "Veículo e espaço recreativo",
        status: "executado",
        texto:
          "Com o Fundo dos Direitos da Criança do DF: veículo para doações e o parquinho coberto.",
        numero: "196 crianças e suas famílias",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "Termo de Colaboração 39/2018 (veículo) e Termo de Fomento 13/2019 (espaço recreativo).",
          },
          {
            rotulo: "Por que importou",
            texto: "Garantiu a logística das doações e um lugar seguro para brincar.",
          },
        ],
        fonte: "Termo 39/2018; Termo de Fomento 13/2019",
      },
      {
        periodo: "2019",
        titulo: "Oficina de drone e selos",
        status: "executado",
        texto:
          "Oficina de drone com o Café Pilotis; Selo Social DF e certificado Phomenta de transparência.",
        detalhes: [{ rotulo: "Quem foi atendido", texto: "Jovens da comunidade." }],
        fonte: "“Projetos executados INAV” 2019; certificados de 2019",
      },
    ],
  },
  {
    periodo: "2021–2026",
    titulo: "Saúde, proteção e infraestrutura",
    legenda: "Refeitório do INAV, 2026",
    foto: {
      src: `${FOTOS}/a26_refeitorio_IMG_1379.jpg`,
      alt: "Crianças almoçam no refeitório do INAV em 2026",
      className: "object-[center_60%]",
    },
    acoes: [
      {
        periodo: "2021–2026",
        titulo: "Saúde Bucal",
        status: "documentado",
        texto:
          "Consultório odontológico no INAV, com o Rotary Club de Park Way Águas Claras e a UCB.",
        numero: "Cerca de 500 atendimentos",
        detalhes: [
          {
            rotulo: "Quem foi atendido",
            texto: "Crianças e adolescentes do Riacho Fundo II, de agosto de 2021 a julho de 2026.",
          },
        ],
        fonte: "Atestado do Rotary, Ofício 004/2026",
      },
      {
        periodo: "2023–2025",
        titulo: "Doações e Bolos Saudáveis",
        status: "documentado",
        texto: "Cestas básicas do Instituto +Brasal e capacitação de mulheres da comunidade.",
        numero: "50 cestas · 10 mulheres capacitadas",
        detalhes: [
          { rotulo: "Por que importou", texto: "Apoio direto às famílias e geração de renda." },
        ],
        fonte: "“Projetos executados INAV” 2023; Atendimentos 2002–2026",
      },
      {
        periodo: "2025",
        titulo: "VEPEMA: parquinho e câmeras",
        status: "aprovado",
        texto:
          "Dois projetos contemplados pela VEPEMA (TJDFT): brinquedos para o parquinho e câmeras de segurança.",
        numero: "240 crianças",
        detalhes: [
          {
            rotulo: "O que aconteceu",
            texto:
              "“Nossa Instituição Melhor” (R$ 48.756,40) e modernização das câmeras (R$ 55.496,20).",
          },
          {
            rotulo: "Por que importou",
            texto: "Viabiliza brincar com segurança e o monitoramento de todo o espaço.",
          },
        ],
        fonte: "Projetos VEPEMA de 11/06/2025 e 28/10/2025",
      },
      {
        periodo: "2026",
        titulo: "Vozes Protegidas",
        status: "em-execucao",
        texto: "Cinco palestras sobre direitos e a rede de proteção, com cartilha e folder.",
        numero: "1.000 cartilhas · 1.000 folders",
        detalhes: [
          {
            rotulo: "Quem foi atendido",
            texto: "Mulheres, famílias, cuidadores e adolescentes do Riacho Fundo II.",
          },
          {
            rotulo: "Por que importou",
            texto: "Mostra à comunidade onde buscar ajuda em casos de violência.",
          },
        ],
        fonte: "Relatório de 01/10/2026; atas de 07/10 e 14/10/2026",
      },
    ],
  },
];

const legenda: Status[] = ["documentado", "executado", "aprovado", "em-execucao"];

const numeros = [
  { valor: "12.241", rotulo: "atendimentos desde 2002" },
  { valor: "4.430", rotulo: "no contraturno de 6 a 14 anos" },
  { valor: "3.801", rotulo: "na educação infantil integral" },
  { valor: "2.730", rotulo: "na convivência de 0 a 5 anos" },
];

// Mesmos nomes de arquivo enviados pelo designer, como pede a nota interna.
const livros = [
  {
    ano: "2005",
    titulo: "INAV 5 anos",
    texto: "A origem do instituto, as três creches e os cursos para as famílias.",
    paginas: 14,
    arquivo: "INAV_5_anos_2005.pdf",
    tamanho: "3 MB",
    capa: `${FOTOS}/capa_5anos.jpg`,
  },
  {
    ano: "2010",
    titulo: "INAV 10 anos",
    texto: "Ensaio fotográfico das três unidades e do Projeto Conviver.",
    paginas: 50,
    arquivo: "INAV_10_anos_2010.pdf",
    tamanho: "10 MB",
    capa: `${FOTOS}/capa_10anos.jpg`,
  },
  {
    ano: "2015",
    titulo: "INAV 15 anos",
    texto: "A rotina da educação infantil, as festas e o Conviver ampliado.",
    paginas: 26,
    arquivo: "INAV_15_anos_2015.pdf",
    tamanho: "4 MB",
    capa: `${FOTOS}/capa_15anos.jpg`,
  },
];

function ProjetosPage() {
  return (
    <>
      {/* 01 — Abertura */}
      <PageHero
        eyebrow="Projetos"
        title="26 anos de projetos"
        highlight="com a comunidade"
        description="Da primeira creche, em 2001, aos projetos de 2026: educação, convivência, esporte, saúde e proteção no Riacho Fundo II."
        background={{
          src: `${FOTOS}/g15_bolas.jpg`,
          alt: "Crianças do INAV jogam bolas coloridas para o alto, em 2015",
          className: "object-[center_35%]",
          credit: "Foto: livro “INAV 15 anos” (2015)",
        }}
        actions={
          <a
            href="#trajetoria"
            onClick={(event) => {
              // Com Ctrl, Shift ou Cmd o navegador abre o link como sempre (nova aba, janela).
              if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              rolarAte("trajetoria");
            }}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15"
          >
            Conheça a trajetória
            <ArrowDown
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        }
      />

      {/* 02 — Momentos da trajetória */}
      <section
        id="trajetoria"
        // tabIndex -1: recebe o foco no fim da rolagem, para o Tab seguir a partir daqui.
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-background pb-20 pt-14 focus:outline-none sm:pb-24 sm:pt-16"
      >
        <Cena nome="sol-e-nuvem" className="right-[6%] top-6 w-20 lg:hidden xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Trajetória"
            title="Momentos que"
            highlight="contam a nossa história"
            align="center"
          />
          <motion.div variants={fadeUp} {...revealOnScroll} className="mt-12">
            <CarrosselTrajetoria momentos={momentos} rotulo="Trajetória do INAV em oito momentos" />
          </motion.div>
        </div>
      </section>

      {/* 03 — Galeria */}
      <section className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24">
        <Ilustracao
          nome="borboleta"
          className="absolute left-[5%] top-14 -z-10 hidden w-12 -rotate-6 xl:block"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Galeria" title="26 anos" highlight="em imagens" align="center" />
          <div className="mt-12">
            <GaleriaAnos fotos={galeria} />
          </div>
        </div>
      </section>

      {/* 04 — Linha do tempo. overflow-x-clip, e não hidden: a foto de cada época é sticky. */}
      <section
        id="linha-do-tempo"
        className="relative isolate overflow-x-clip bg-background py-20 sm:py-24"
      >
        <Ilustracao
          nome="libelula"
          className="absolute right-[6%] top-16 -z-10 hidden w-14 xl:block"
        />
        <Canteiro itens={["margarida-azul", "capim", "margarida-laranja"]} className="left-[3%]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Linha do tempo"
            title="Tudo o que já fizemos,"
            // Espaço que não quebra: "época" não fica sozinha na última linha do celular.
            highlight={"época por época"}
            align="center"
          />
          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="mx-auto mt-6 max-w-2xl text-center"
          >
            <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Situação das ações">
              {legenda.map((status) => (
                <li key={status}>
                  <SeloStatus status={status} />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              A etiqueta de cada ação mostra o que os documentos do acervo registram.
            </p>
          </motion.div>
          <div className="mt-14">
            <LinhaDoTempo epocas={epocas} />
          </div>
        </div>
      </section>

      {/* 05 — Números sobre foto */}
      <section className="relative isolate overflow-hidden bg-brand-blue-deep py-20 text-white sm:py-28">
        <img
          src={`${FOTOS}/g15_roda.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-deep/95 to-brand-blue-deep/85"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} {...revealOnScroll}>
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
            >
              2002–2026
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-3xl font-extrabold uppercase leading-[1.05] text-balance-pretty sm:text-4xl lg:text-5xl"
            >
              Mais de <span className="text-brand-green-light">12 mil</span> atendimentos
              registrados
            </motion.h2>
          </motion.div>

          <motion.dl
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8"
          >
            {numeros.map((numero) => (
              // Na tela o número vem primeiro; para o leitor de tela, o rótulo (dt) vem antes.
              <motion.div
                key={numero.rotulo}
                variants={fadeUp}
                className="flex flex-col-reverse justify-end border-t border-white/25 pt-5"
              >
                <dt className="mt-3 text-sm leading-snug text-white/85 sm:text-base">
                  {numero.rotulo}
                </dt>
                <dd className="font-display text-4xl font-extrabold leading-none tracking-tight text-brand-green-light sm:text-5xl">
                  {numero.valor}
                </dd>
              </motion.div>
            ))}
          </motion.dl>

          <p className="mt-10 text-sm text-white/65">
            Atendimentos somados ano a ano. A mesma pessoa pode ter sido atendida em mais de um ano.
          </p>
        </div>
      </section>

      {/* 06 — Acervo institucional. Última seção antes do rodapé: sem canteiro, por causa da paisagem. */}
      <section
        id="acervo"
        className="relative isolate overflow-hidden bg-background py-20 sm:py-24"
      >
        <Cena nome="duas-nuvens" className="left-[4%] top-10 w-32 lg:hidden xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* max-w-3xl: no desktop o título cabe numa linha; no celular, "em livro" desce junto. */}
          <SectionHeading
            eyebrow="Acervo institucional"
            title="A nossa história"
            highlight={"em livro"}
            align="center"
            className="max-w-3xl"
          />
          <motion.ul
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {livros.map((livro) => (
              <motion.li
                key={livro.arquivo}
                variants={fadeUp}
                className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
              >
                {/* absolute: a capa em pé (5 anos) não estica o cartão além do 4:3. */}
                <div className="relative aspect-[4/3] border-b border-border bg-surface-tint">
                  <img
                    src={livro.capa}
                    alt={`Capa do livro ${livro.titulo}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-sm font-extrabold tracking-[0.04em] text-brand-green">
                    {livro.ano}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold uppercase text-brand-blue-deep">
                    {livro.titulo}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {livro.texto}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground/80">{livro.paginas} páginas</p>
                  <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
                    <a
                      href={`/livros/${livro.arquivo}`}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-brand-blue-deep"
                    >
                      Ler online
                      <span className="sr-only">: {livro.titulo}, abre em outra aba</span>
                    </a>
                    <a
                      href={`/livros/${livro.arquivo}`}
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:border-brand-blue hover:text-brand-blue"
                    >
                      Baixar
                      <span className="text-xs font-semibold normal-case tracking-normal text-muted-foreground">
                        PDF, {livro.tamanho}
                      </span>
                      <span className="sr-only">: {livro.titulo}</span>
                    </a>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
