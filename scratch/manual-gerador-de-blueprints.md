# Manual do Gerador de Blueprints

Este documento ensina uma IA (Claude, no chat ou no Claude Code) a gerar um
**blueprint** novo — um wireframe anotado, estilo "planta baixa" — para
qualquer tipo de negócio, mantendo sempre o mesmo sistema visual. Ele nasceu
de um conjunto de blueprints feitos para pitches de sites institucionais
(ONGs), mas a estrutura é genérica: funciona para clínica, e-commerce,
restaurante, imobiliária, SaaS, qualquer segmento.

## Como usar

1. Abra uma conversa nova com o Claude (chat ou Claude Code).
2. Cole este arquivo inteiro na conversa.
3. Peça o blueprint, dizendo o tipo de negócio. Exemplo de pedido pronto:

   > Usando o manual acima, gere um Blueprint da Home para uma clínica
   > odontológica. Mantenha exatamente o mesmo sistema visual (cores, fontes,
   > componentes) e a mesma lógica de numeração e notas. Adapte só as seções
   > e os textos ao funil desse tipo de negócio. Gere um único arquivo HTML
   > autocontido, do mesmo jeito que o exemplo do sistema visual abaixo.

4. A IA devolve um `.html` novo, pronto para abrir no navegador ou anexar
   numa proposta. Não precisa de servidor, build nem dependências — é um
   arquivo só, com a fonte vindo do Google Fonts por link.

## O que é um blueprint, neste formato

Não é um mockup visual "bonito" do site final — é uma planta baixa anotada:
cada seção da página vira um par **rascunho + nota numerada**, explicando
"o que tem aqui" e "por quê aqui". Serve para justificar, numa reunião de
proposta, por que a página vai ter aquelas seções naquela ordem, antes de
qualquer decisão de design visual real. O estilo lembra papel de cianotipo
(planta de arquiteto): fundo azul-escuro com grid, linhas técnicas, anotações
em cartões cor de papel, com um vermelho de lápis para os destaques.

## Sistema visual (não muda entre temas)

Isto é a base fixa. Ao gerar um blueprint novo, comece copiando este bloco
`<style>` inteiro e só ajuste o conteúdo (textos, número de seções, itens da
legenda) — nunca as cores, fontes ou nomes de classe abaixo, para que
qualquer blueprint gerado por este manual continue com a cara da família.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@600;700&display=swap">
<style>
  :root{
    --blue-deep:#0f3454;
    --blue-mid:#18507a;
    --blue-line:#c3e2ff;
    --blue-line-dim:rgba(195,226,255,0.34);
    --blue-line-faint:rgba(195,226,255,0.14);
    --paper:#f3eee1;
    --paper-dim:#e7ddc8;
    --ink:#20222a;
    --ink-dim:#5a5f6e;
    --pencil:#d6472a;
    --pencil-dim:rgba(214,71,42,0.16);
    --mono:'IBM Plex Mono', ui-monospace, 'SF Mono', Consolas, monospace;
    --sans:'IBM Plex Sans', system-ui, -apple-system, sans-serif;
    --cond:'IBM Plex Sans Condensed', 'IBM Plex Sans', system-ui, sans-serif;
  }

  *{box-sizing:border-box;}
  body{
    background-color:var(--blue-deep);
    background-image:
      linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size:26px 26px;
    color:var(--blue-line);
    font-family:var(--sans);
  }

  h1,h2,h3{font-family:var(--cond); font-weight:700; text-wrap:balance; margin:0;}
  p{margin:0;}

  .sheet{
    max-width:1180px;
    margin:0 auto;
    padding-inline:max(16px, 5vw);
    padding-block:40px 72px;
  }

  /* ---------- title block ---------- */
  .titleblock{
    border:2px solid var(--blue-line);
    border-radius:10px;
    padding:26px 26px 24px;
    display:grid;
    gap:22px;
    margin-bottom:30px;
    background:rgba(255,255,255,.025);
  }
  @media (min-width:800px){
    .titleblock{grid-template-columns:1.5fr 1fr; align-items:end;}
  }
  .titleblock .eyebrow{
    font-family:var(--mono); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase;
    color:var(--pencil); font-weight:600;
  }
  .titleblock h1{font-size:clamp(1.7rem, 4vw, 2.5rem); color:var(--blue-line); margin-top:8px; letter-spacing:-.01em;}
  .titleblock .lede{margin-top:12px; color:var(--blue-line-dim); max-width:48ch; line-height:1.55; font-size:.96rem;}

  .titleblock-meta{
    display:grid; grid-template-columns:repeat(2,1fr); gap:14px 22px;
    border-top:1px dashed var(--blue-line-dim); padding-top:16px;
  }
  @media (min-width:800px){
    .titleblock-meta{border-top:none; border-left:1px dashed var(--blue-line-dim); padding-top:0; padding-left:26px; grid-template-columns:1fr 1fr;}
  }
  .titleblock-meta dt{font-family:var(--mono); font-size:.65rem; letter-spacing:.1em; text-transform:uppercase; color:var(--blue-line-dim);}
  .titleblock-meta dd{margin:3px 0 0; font-weight:600; font-size:.88rem; color:var(--blue-line);}

  /* ---------- browser chrome ---------- */
  .chrome{
    border:1.5px dashed var(--blue-line-dim);
    border-bottom:none;
    border-radius:8px 8px 0 0;
    padding:9px 14px;
    display:flex; align-items:center; gap:8px;
  }
  .chrome .dot{width:8px;height:8px;border-radius:50%;border:1.3px solid var(--blue-line-dim);}
  .chrome .url{
    margin-left:6px; font-family:var(--mono); font-size:.72rem; color:var(--blue-line-dim);
    letter-spacing:.02em;
  }

  /* ---------- cross-reference a outro blueprint (opcional) ---------- */
  .crossref{
    border:1.5px dashed var(--blue-line-dim);
    border-top:none;
    border-radius:0;
    padding:10px 20px;
    display:flex; gap:10px; align-items:baseline; flex-wrap:wrap;
    background:rgba(255,255,255,.015);
  }
  .crossref .tag{
    font-family:var(--mono); font-size:.66rem; letter-spacing:.08em; text-transform:uppercase;
    color:var(--blue-line-dim); font-weight:600; white-space:nowrap;
  }
  .crossref p{font-family:var(--mono); font-size:.78rem; color:var(--blue-line-dim); line-height:1.5;}
  .crossref em{color:var(--blue-line); font-style:normal;}

  /* ---------- grid principal ---------- */
  .blueprint-grid{
    display:grid;
    grid-template-columns:300px 1fr;
    gap:14px 26px;
    align-items:stretch;
    border:1.5px dashed var(--blue-line-dim);
    border-top:none;
    border-radius:0 0 8px 8px;
    padding:20px;
  }
  @media (max-width:780px){
    .blueprint-grid{grid-template-columns:1fr; gap:10px;}
  }

  .swatch{
    position:relative;
    border:1px dashed var(--blue-line-dim);
    border-radius:6px;
    padding:14px;
    min-height:110px;
    display:flex; flex-direction:column; gap:10px; justify-content:center;
  }
  .swatch .tag{
    position:absolute; top:8px; right:10px;
    font-family:var(--mono); font-size:.68rem; color:var(--blue-line-dim); letter-spacing:.04em;
  }
  .swatch .caption{
    font-family:var(--mono); font-size:.62rem; text-transform:uppercase; letter-spacing:.08em;
    color:var(--blue-line-dim); margin-top:2px;
  }

  .ph-line{height:7px; border-radius:2px; background:var(--blue-line-dim);}
  .ph-line.tiny{height:5px;}
  .ph-line.w-30{width:30%;} .ph-line.w-40{width:40%;} .ph-line.w-45{width:45%;}
  .ph-line.w-55{width:55%;} .ph-line.w-65{width:65%;} .ph-line.w-70{width:70%;} .ph-line.w-90{width:90%;}

  .ph-box{border:1.3px dashed var(--blue-line-dim); border-radius:4px;}

  .ph-image{
    border:1.3px dashed var(--blue-line-dim); border-radius:4px; overflow:hidden;
    background:
      linear-gradient(to bottom right, transparent calc(50% - 0.75px), var(--blue-line-faint) calc(50% - 0.75px), var(--blue-line-faint) calc(50% + 0.75px), transparent calc(50% + 0.75px)),
      linear-gradient(to bottom left, transparent calc(50% - 0.75px), var(--blue-line-faint) calc(50% - 0.75px), var(--blue-line-faint) calc(50% + 0.75px), transparent calc(50% + 0.75px));
  }

  .ph-dot{width:14px; height:14px; border-radius:50%; border:1.3px solid var(--blue-line-dim);}

  /* pílulas de CTA: preenchida = ação principal no contexto, contornada = secundária */
  .cta-row{display:flex; align-items:center; gap:8px; flex-wrap:wrap; justify-content:center;}
  .cta-pill{
    font-family:var(--mono); font-size:.68rem; font-weight:600; white-space:nowrap;
    border:1.5px solid var(--pencil); border-radius:999px; padding:6px 14px;
    color:var(--pencil); background:var(--pencil-dim);
  }
  .cta-pill--ghost{
    border-style:dashed; border-color:var(--blue-line-dim); color:var(--blue-line-dim);
    background:transparent; font-weight:500;
  }

  /* ---------- anotações ---------- */
  .note{
    background:var(--paper); color:var(--ink);
    border-radius:8px; padding:18px 20px 20px;
    box-shadow:0 8px 18px rgba(0,0,0,.28);
    position:relative;
  }
  .note-num{
    display:inline-flex; align-items:center; justify-content:center;
    width:26px; height:26px; border-radius:50%;
    border:1.6px solid var(--pencil); color:var(--pencil);
    font-family:var(--mono); font-weight:600; font-size:.78rem;
    position:absolute; top:-13px; left:18px; background:var(--paper);
  }
  .note h2{font-size:1.05rem; color:var(--ink); margin-top:6px; letter-spacing:.01em;}
  .note .kicker{
    font-family:var(--mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase;
    color:var(--pencil); font-weight:600; margin-top:14px;
  }
  .note p.body{margin-top:5px; font-size:.9rem; line-height:1.55; color:var(--ink-dim);}
  .note.note--cta{border:1.5px solid var(--pencil);}
  .note.note--cta .note-num{background:var(--pencil); color:var(--paper); border-color:var(--pencil);}

  /* ---------- callout de detalhe (comportamento transversal) ---------- */
  .detail{
    margin-top:16px;
    border:1.5px dashed var(--pencil);
    border-radius:8px;
    padding:14px 18px;
    display:flex; gap:12px; align-items:baseline; flex-wrap:wrap;
    background:var(--pencil-dim);
  }
  .detail .tag{
    font-family:var(--mono); font-size:.68rem; letter-spacing:.08em; color:var(--pencil); font-weight:700;
    white-space:nowrap;
  }
  .detail p{font-size:.88rem; color:var(--blue-line); line-height:1.5;}
  .detail + .detail{margin-top:10px;}

  /* ---------- legenda ---------- */
  .legend{margin-top:44px;}
  .legend h2{font-size:1.3rem; color:var(--blue-line);}
  .legend .sub{margin-top:6px; color:var(--blue-line-dim); font-size:.9rem;}
  .legend-grid{
    margin-top:20px; display:grid; grid-template-columns:1fr; gap:14px;
  }
  @media (min-width:640px){ .legend-grid{grid-template-columns:1fr 1fr;} }
  .legend-item{
    border:1px dashed var(--blue-line-dim); border-radius:8px; padding:16px 18px;
    display:flex; gap:14px; align-items:flex-start;
  }
  .legend-glyph{
    flex:none; width:34px; height:34px; border-radius:6px;
    border:1.3px dashed var(--blue-line-dim); display:flex; align-items:center; justify-content:center;
    font-family:var(--mono); font-size:.74rem; color:var(--pencil); font-weight:700;
  }
  .legend-item h3{font-size:.92rem; color:var(--blue-line); letter-spacing:.01em;}
  .legend-item p{margin-top:4px; font-size:.84rem; color:var(--blue-line-dim); line-height:1.5;}

  /* ---------- rodapé da folha ---------- */
  .sheetfooter{
    margin-top:40px; padding-top:20px; border-top:1px dashed var(--blue-line-dim);
    font-family:var(--mono); font-size:.78rem; color:var(--blue-line-dim); line-height:1.6;
  }
  .sheetfooter strong{color:var(--blue-line); font-weight:600;}

  /* ---------- impressão / exportar PDF ---------- */
  @media print{
    @page{size:A4 landscape; margin:10mm;}
    *{
      -webkit-print-color-adjust:exact !important;
      print-color-adjust:exact !important;
      color-adjust:exact !important;
    }
    .sheet{max-width:none; padding-block:0;}
    .chrome{break-after:avoid;}
    .titleblock{break-after:avoid;}
    .swatch, .note, .detail, .legend-item{break-inside:avoid;}
    .legend, .sheetfooter{break-before:avoid;}
  }
</style>
```

## A receita de cada blueprint (a estrutura HTML)

Dentro de `<div class="sheet">`, sempre nesta ordem:

1. **`.titleblock`** — eyebrow ("Guia de referência — visão geral"), `<h1>`
   com o nome do blueprint, uma `.lede` de 1 frase, e `.titleblock-meta`
   com 4 pares rótulo/valor (ex.: Desenho, Escala, Rev., Aplicação).
2. **`.chrome`** — barra fake de navegador com 3 bolinhas e uma `.url` tipo
   `suaempresa.com.br — página inicial`.
3. **`.crossref`** (opcional) — uma linha citando outro blueprint da mesma
   família, se houver (ex.: o do cabeçalho/navegação).
4. **`.blueprint-grid`** — o corpo principal. Para cada seção da página real,
   um par: uma `.swatch` (rascunho da seção, com `.ph-line`/`.ph-box`/
   `.ph-image`/`.cta-row` e uma `<span class="tag">§ 0N</span>` no canto) e,
   logo depois, um `<article class="note">` com:
   - `<span class="note-num">0N</span>` (mesmo número da seção)
   - `<h2>` com o nome da seção
   - `<p class="kicker">O que tem aqui</p>` + `<p class="body">`
   - `<p class="kicker">Por quê aqui</p>` + `<p class="body">`
   Se a seção é o pedido de conversão final, use `class="note note--cta"`
   na nota para o destaque vermelho na borda.
5. **`.detail`** (1 a 3) — comportamentos que atravessam a página inteira e
   não são uma seção própria (ex.: botão flutuante de WhatsApp, chat, barra
   fixa de promoção).
6. **`.legend`** — fecha com "Legenda — princípios gerais": um `<h2>`, uma
   `.sub` de 1 frase, e 4 `.legend-item` (glifo + título + 1 frase) com os
   princípios que guiaram a ordem das seções daquele blueprint específico.
7. **`.sheetfooter`** — 1 parágrafo: "Como usar: ..." explicando que a
   estrutura muda por cliente, mas a lógica do funil não.

## Como adaptar a estrutura por tipo de negócio

O que muda de um blueprint para outro **não é o visual — é o funil**: quais
seções existem, em que ordem, e o que cada `.note` argumenta em "por quê
aqui". Antes de gerar, pense no funil de decisão daquele tipo de negócio
(o que o visitante precisa saber, sentir e confirmar, em ordem, até a ação
final) — geralmente: **emoção/identificação → prova do que é → explicação
do que oferece → prova social/confiança → pedido de ação → legitimidade**.

Pontos de partida por segmento (ajuste livremente ao cliente real):

| Segmento | Seções sugeridas, em ordem |
|---|---|
| ONG / instituto social (exemplo já pronto) | Hero → Quem Somos → Áreas de Atuação → Impacto (números) → Histórias → Parceiros → CTA Final (Seja parceiro / Doe Agora) → Rodapé |
| Clínica / consultório | Hero → Especialidades/tratamentos → Corpo clínico (quem atende) → Depoimentos de pacientes → Convênios aceitos → CTA (Agendar consulta) → Rodapé |
| Restaurante | Hero → Cardápio em destaque → Ambiente (fotos) → Avaliações/depoimentos → CTA (Reservar mesa / Pedir delivery) → Localização e horário → Rodapé |
| Imobiliária | Hero com busca → Diferenciais da imobiliária → Imóveis em destaque → Depoimentos de clientes → CTA (Falar com corretor) → Rodapé |
| E-commerce | Hero com produto/coleção → Categorias em destaque → Produtos mais vendidos → Diferenciais (frete, troca, garantia) → Avaliações → CTA (Ver coleção / Assinar newsletter) → Rodapé |
| SaaS / serviço B2B | Hero com proposta de valor → Como funciona (3 passos) → Recursos principais → Prova social (logos de clientes/cases) → Planos e preços → CTA (Teste grátis / Fale com vendas) → Rodapé |

Isso é ponto de partida, não regra fixa — o número de seções pode variar
(5 a 9 é o normal), assim como os nomes. O que **não muda**:

## Regras que nunca mudam, mesmo trocando o tema

- Numeração sequencial `§ 01`, `§ 02`... igual nos dois lados do par
  swatch/nota.
- Cada seção é sempre um par swatch + nota lado a lado, nunca uma sem a
  outra.
- Toda nota tem exatamente os 2 blocos "O que tem aqui" / "Por quê aqui" —
  é isso que transforma wireframe em argumento de venda.
- Quando uma seção tem duas ações, uma é sempre visualmente primária
  (`.cta-pill` preenchida) e a outra secundária (`.cta-pill--ghost`),
  nunca as duas competindo em pé de igualdade.
- A seção de conversão final usa `.note--cta` para o destaque vermelho.
- A cor de destaque (`--pencil`, vermelho) é só para anotação/callout —
  nunca decora o "site de mentira" dentro das `.swatch`, que fica sempre
  monocromático em azul-linha. Isso mantém claro que aquilo é rascunho, não
  o visual final.
- A legenda fecha sempre com princípios do funil daquele blueprint
  específico (podem ser outros 4, adaptados ao segmento).
- Um arquivo HTML autocontido por blueprint, com o link de fonte do Google
  Fonts no topo — sem build, sem dependência externa além da fonte.

## Prompt pronto para colar (depois deste manual)

```
Usando o manual acima, gere um Blueprint da Home para [tipo de negócio:
ex. clínica odontológica de bairro, cores neutras]. Mantenha exatamente o
mesmo sistema visual (cores, fontes, componentes, classes CSS) e a mesma
lógica de par swatch+nota numerada com "O que tem aqui" / "Por quê aqui".
Adapte as seções ao funil desse tipo de negócio — pode usar a sugestão da
tabela como ponto de partida, mas ajuste ao caso real. Gere um único
arquivo HTML autocontido, pronto para abrir no navegador.
```
