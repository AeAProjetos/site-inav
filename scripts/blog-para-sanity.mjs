// Converte o conteúdo do pacote do Blog (KIM, 18/11/2026) para o formato de importação do Sanity
// (um documento por linha, .ndjson). O conteúdo em si fica fora do Git, em Refinamento/Blog.
//
// Uso, na raiz do projeto:
//   node scripts/blog-para-sanity.mjs [pasta-do-conteudo] [arquivo-de-saida]
// Depois, na pasta studio:
//   npx sanity dataset import <arquivo-de-saida> --dataset development --replace
// Troque "development" por "production" só na publicação, com o OK do usuário.
// Atenção: no dataset "development", o webhook de prévia da newsletter pode estar ligado; os posts
// entram com enviarNewsletter = false, e a rota ignora quem tem o envio desmarcado.
//
// Os ids são fixos (post-<slug>, cardapio-<id>, projeto-<nome>): importar de novo com --replace
// substitui os mesmos documentos, sem duplicar. Todo post entra com o envio da newsletter desligado.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const raiz = resolve(import.meta.dirname, "..");
const conteudo = resolve(
  process.argv[2] ?? join(raiz, "Refinamento/Blog/05_Pacote para o webdesign/01_Conteudo"),
);
const saida = resolve(process.argv[3] ?? join(raiz, "scratch/refinamento/blog/importar.ndjson"));
const pastaDasFotos = join(raiz, "public/img/blog");

const ler = (arquivo) => JSON.parse(readFileSync(join(conteudo, arquivo), "utf8"));

// Os 5 assuntos do pacote viram os 6 tipos do site (decisão do usuário, 19/11/2026).
const tipoPorCategoria = {
  institucional: "marco",
  comunicados: "aviso",
  parcerias: "parceiro",
  educacao: "educacao",
  projetos: "historia",
};
const tipoPorSlug = {
  "projeto-cozinha-eficiente-e-aprovado-pela-vepema": "marco",
  "inav-acolhe-e-aprovado-pela-cema-do-mpdft": "marco",
  "mcdia-feliz-2026-100-vouchers-revertidos-em-lanches": "campanha",
};

// Fotos do pacote já preparadas em public/img/blog (sem metadados), com a descrição para leitor de tela.
const fotos = {
  "imagens/f_mural.jpg": {
    arquivo: "destaque-mural-fotos-antigas.jpg",
    alt: "Parede com painéis de fotos antigas do instituto, entre eles o do Projeto Conviver",
  },
  "imagens/f_cozinha.jpg": {
    arquivo: "noticia-cozinha-equipe.jpg",
    alt: "Cozinha do instituto com duas cozinheiras trabalhando",
  },
  "imagens/f_consultorio.jpg": {
    arquivo: "noticia-consultorio-odontologico.jpg",
    alt: "Consultório odontológico do instituto, com cadeira e equipamentos",
  },
  "imagens/ig_baile.jpg": {
    arquivo: "noticia-baile-menino-fantasiado.jpg",
    alt: "Menino fantasiado de palhaço, com outras crianças sentadas atrás",
  },
  "imagens/c1_parquinho.jpg": { arquivo: "cardapio-parquinho-menina-com-flor.jpg" },
  "imagens/c2_mesa.jpg": { arquivo: "cardapio-mesa-atividade-com-feijao.jpg" },
  "imagens/c4_descanso.jpg": { arquivo: "cardapio-descanso-sala-colchonetes.jpg" },
  "imagens/c6_descanso2.jpg": { arquivo: "cardapio-descanso-sala-canto.jpg" },
  "imagens/c5_frutas.jpg": { arquivo: "cardapio-frutas-bananas-e-melao.jpg" },
};

function imagem(origem, campos) {
  const foto = fotos[origem];
  if (!foto) throw new Error(`Foto sem correspondência em public/img/blog: ${origem}`);
  const caminho = join(pastaDasFotos, foto.arquivo);
  if (!existsSync(caminho)) throw new Error(`Foto não encontrada: ${caminho}`);
  return {
    _type: "image",
    _sanityAsset: `image@${pathToFileURL(caminho).href}`,
    // Fotos enviadas pelo INAV para publicação no site.
    autorizada: true,
    ...(foto.alt ? { alt: foto.alt } : {}),
    ...campos,
  };
}

let chave = 0;
const k = () => `k${(chave++).toString(36)}`;

const bloco = (texto, style) => ({
  _type: "block",
  _key: k(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: k(), text: texto, marks: [] }],
});

function corpo(blocos) {
  return blocos.map((b) => {
    if (b.tipo === "paragrafo") return bloco(b.texto, "normal");
    if (b.tipo === "intertitulo") return bloco(b.texto, "h2");
    if (b.tipo === "dados")
      return {
        _type: "dados",
        _key: k(),
        itens: b.itens.map((i) => ({
          _type: "numero",
          _key: k(),
          valor: i.valor,
          rotulo: i.rotulo,
        })),
      };
    throw new Error(`Bloco desconhecido: ${b.tipo}`);
  });
}

// O "fonte_texto" do pacote traz notas internas da designer (aba, relatório, ofício).
// No site só entra a fonte pública: o post do INAV no Instagram, com link.
const instagram = (url) => typeof url === "string" && /instagram\.com\/p\//.test(url);

const posts = ler("noticias.json").map((n) => {
  const tipo = tipoPorSlug[n.slug] ?? tipoPorCategoria[n.categoria];
  if (!tipo) throw new Error(`Categoria sem tipo: ${n.categoria}`);
  const credito = n.capa?.credito?.replace(/^Foto:\s*/i, "").replace(/\.$/, "");
  return {
    _id: `post-${n.slug}`,
    _type: "post",
    titulo: n.titulo,
    slug: { _type: "slug", current: n.slug },
    tipo,
    destaque: Boolean(n.destaque),
    temaCapa: n.tema_capa_grafica,
    resumo: n.resumo,
    // Só a data vem no pacote: meio-dia no horário de Brasília.
    publicadoEm: new Date(`${n.data_publicacao}T12:00:00-03:00`).toISOString(),
    enviarNewsletter: false,
    ...(n.capa?.arquivo
      ? { capa: imagem(n.capa.arquivo, { legenda: n.capa.legenda, credito }) }
      : {}),
    corpo: corpo(n.corpo),
    ...(n.pagina_relacionada?.rota
      ? {
          paginaRelacionada: {
            rota: n.pagina_relacionada.rota,
            descricao: n.pagina_relacionada.descricao,
          },
        }
      : {}),
    ...(instagram(n.fonte_url)
      ? { fonteTexto: "publicação do INAV no Instagram", linkOriginal: n.fonte_url }
      : {}),
  };
});

// "16/11" + o ano do título da semana ("16 a 20 de novembro de 2026") viram "2026-11-16".
const iso = (ddmm, ano) => {
  const [d, m] = ddmm.split("/");
  return `${ano}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
};
const avisoDeFeriado = {
  "20/11": "Dia Nacional de Zumbi e da Consciência Negra. Não há atendimento.",
};

const pacoteDoCardapio = ler("cardapios.json");
const semanas = [...pacoteDoCardapio.semanas].sort((a, b) => b.id.localeCompare(a.id));
const cardapios = semanas.map((s, indice) => {
  const ano = s.semana.match(/(\d{4})/)?.[1];
  if (!ano) throw new Error(`Semana sem ano: ${s.semana}`);
  const dias = s.dias.map((d) => {
    const dia = { _type: "dia", _key: k(), data: iso(d.data, ano), feriado: Boolean(d.feriado) };
    if (d.feriado) return { ...dia, motivo: avisoDeFeriado[d.data] ?? "Não há atendimento." };
    for (const r of d.refeicoes) dia[r.chave] = r.itens.join("\n");
    return dia;
  });
  return {
    _id: `cardapio-${s.id}`,
    _type: "cardapio",
    inicio: dias[0].data,
    fim: dias.at(-1).data,
    dias,
    ...(s.fonte_url ? { fonteUrl: s.fonte_url } : {}),
    // As fotos do carrossel ficam na semana mais recente; as outras usam as dela.
    ...(indice === 0
      ? {
          fotos: pacoteDoCardapio.carrossel.map((f) => ({
            ...imagem(f.arquivo, { legenda: f.legenda, alt: f.alt }),
            _key: k(),
          })),
        }
      : {}),
  };
});

const situacao = { Aprovado: "aprovado", "Em execução": "em-execucao" };
const projetos = ler("projetos_2026.json").map((p, indice) => ({
  _id: `projeto-${p.nome
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`,
  _type: "projeto",
  nome: p.nome,
  parceiro: p.parceiro,
  situacao:
    situacao[p.status] ??
    (() => {
      throw new Error(`Situação desconhecida: ${p.status}`);
    })(),
  destaque: p.valor,
  texto: p.texto,
  ano: 2026,
  ordem: indice + 1,
}));

const documentos = [...posts, ...cardapios, ...projetos];
mkdirSync(dirname(saida), { recursive: true });
writeFileSync(saida, documentos.map((d) => JSON.stringify(d)).join("\n") + "\n", "utf8");

const porTipo = posts.reduce((a, p) => ({ ...a, [p.tipo]: (a[p.tipo] ?? 0) + 1 }), {});
console.log(
  `${posts.length} posts (${JSON.stringify(porTipo)}), ${cardapios.length} cardápios, ${projetos.length} projetos`,
);
console.log(`Gravado: ${saida}`);
