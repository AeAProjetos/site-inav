# Design System: Instituto Nair Valadares (INAV)

Site institucional de uma OSC de educação infantil gratuita. Este arquivo descreve
o sistema visual em uso; os valores técnicos estão em `src/styles.css` (tokens) e
`src/lib/motion-presets.ts` (animação). Se os dois divergirem, o código manda e este
arquivo deve ser corrigido.

## 1. Visual Theme & Atmosphere

Institucional e acolhedor: transmite confiança para quem doa e calor para as
famílias. Fundo claro, títulos fortes em maiúsculas, fotos reais da instituição no
centro da narrativa e as três cores da marca com papéis bem separados.

- **Densidade 4/10:** equilibrada, com respiro generoso entre seções.
- **Variância 4/10:** layouts alternados (texto e foto lado a lado, grades, listas),
  sem composições caóticas.
- **Movimento 4/10:** revelações suaves ao rolar a página, sem loops decorativos.

Público: doadores e parceiros (funil principal: conhecer, confiar, doar) e famílias
da comunidade.

## 2. Color Palette & Roles

As três cores da marca são a identidade do INAV. Cada uma tem um papel fixo; não
trocar os papéis.

- **Azul INAV** (#0077C8): cor primária. Botões de navegação institucional, links,
  ícones de apoio.
- **Azul profundo** (#004580): títulos sobre fundo claro, topo das páginas
  internas, faixa de números da Home, rodapé.
- **Laranja INAV** (#F36F21): ação e afeto. Rótulo acima dos títulos, botões
  "Quero doar" e "Seja um parceiro", contorno de foco do teclado.
- **Laranja quente** (#FF6442): só como ponta final do degradê laranja (cartão PIX).
- **Verde INAV** (#3EBD37): palavra em destaque no fim dos títulos sobre fundo
  claro, item ativo do menu, botão de WhatsApp.
- **Verde claro** (#84D43F): palavra em destaque e números sobre fundo escuro.
- **Branco** (#FFFFFF): fundo padrão das seções.
- **Fundo azulado** (#F0F9FD): seções alternadas.
- **Azul bem claro** (#DBEEFA): fundo de seções e cards de destaque.
- **Tinta** (#132231): texto principal.
- **Texto secundário** (#596979): descrições e textos de apoio.
- **Borda** (#D6E2EA): linhas de 1px, divisórias de listas.
- **Âmbar de pendência** (padrão `amber` do Tailwind): exclusivo das marcas
  "Preencher:" e "Foto pendente". Nunca aparece no site publicado.

Nunca usar roxo, neon, brilho externo ou preto puro (#000000).

## 3. Typography Rules

- **Títulos:** Archivo, peso 800, MAIÚSCULAS, espaçamento -0.02em, entrelinha 1.0
  a 1.05. A última palavra (ou expressão) do título vai em verde. Tamanhos: título
  de página 36/48/60px (celular/tablet/desktop); título de seção 30/36/48px.
  Título de página com no máximo 2 linhas no desktop.
- **Texto:** Hind, peso 400, 16 a 18px, entrelinha folgada, largura máxima de cerca
  de 65 caracteres.
- **Manuscrita:** Caveat, peso 700, para uma única frase por página (no
  encerramento), com sublinhado verde desenhado à mão.
- **Rótulo acima do título:** Hind 14px, bold, maiúsculas, espaçamento 0.18em, em
  laranja. Usar com moderação: no máximo um a cada três seções nas páginas novas
  ou revisadas. O título sozinho basta.

## 4. Component Stylings

- **Botões:** pílula (totalmente arredondados), texto 14px bold em maiúsculas.
  Primário preenchido (laranja para doação e parceria, azul para navegação).
  Secundário com contorno de 2px em azul profundo, que se preenche no hover. A seta
  à direita desliza levemente no hover.
- **Cards:** raio de 14 a 16px, sombra suave tingida de azul
  (`0 10px 30px -12px`, azul a 28%), que cresce no hover. Usar só quando a elevação
  comunica algo; sempre que possível, preferir listas com divisórias ou texto solto.
- **Topo das páginas internas (PageHero):** fundo azul profundo com brilhos
  desfocados em azul e verde, onda branca na base, foto real opcional à direita.
- **Título de seção (SectionHeading):** rótulo opcional, título com destaque verde,
  descrição curta.
- **Encerramento (ClosingBanner):** foto à direita esmaecendo para o fundo, título,
  texto e um botão de contorno; frase manuscrita opcional.
- **Fotos:** cantos arredondados (16px), recorte `cover`. Ao clicar, abrem ampliadas
  (lightbox) com Esc para fechar e setas quando há mais de uma.
- **Foco do teclado:** contorno laranja de 3px com 2px de afastamento em todo
  elemento interativo.
- **Formulários:** rótulo acima do campo, erro em texto abaixo, nunca `alert()`.

## 5. Layout Principles

- Contêiner com largura máxima de 1280px e margens laterais de 16/24/32px.
- Seções com 80 a 96px de espaço vertical; fundos alternando entre branco, azulado
  e azul bem claro.
- Onda orgânica (WaveDivider) entre o topo azul e o conteúdo, e antes do rodapé.
- No máximo duas seções seguidas no formato texto e foto lado a lado.
- Tudo vira uma coluna abaixo de 768px (ou 1024px nas grades mais largas), sem
  rolagem horizontal em nenhuma largura.
- Texto nunca em cima do rosto de uma criança na foto.

## 6. Motion & Interaction

- Biblioteca: motion (`motion/react`), com as variantes de `motion-presets.ts`.
- Entrada padrão: opacidade de 0 para 1 e deslocamento de 24px para cima, 0.6s,
  curva `[0.22, 1, 0.36, 1]`; listas em cascata de 0.09s.
- Revelação ao rolar acontece uma vez só, quando 20% do bloco aparece.
- Hover de cards: sobe 6px com mola (rigidez 260, amortecimento 22).
- Carrossel de depoimentos: troca a cada 5s e pausa com o mouse em cima.
- Respeitar "reduzir movimento" do sistema: sem deslocamentos e sem troca
  automática do carrossel.
- Sem loops infinitos decorativos, sem parallax, sem cursor personalizado.

## 6b. Ilustrações

- **Onde estão:** `public/ilustracoes/` (bichinhos, céu, flores e plantas em SVG,
  nas cores do INAV, mais amarelo `#FFC83D` e marrom `#B8814F` só nos desenhos).
  Os arquivos vão sem metadados para ficarem leves.
- **Componentes:** `Ilustracao` (um desenho solto), `Cena` (combinações prontas,
  como sol atrás da nuvem, passarinho na árvore, caracol saindo do arbusto),
  `Canteiro` (flores, plantas e bichinhos na base de uma seção) e `Paisagem`
  (faixa da Home e abertura do rodapé).
- **Rastro tracejado:** só nas duas paisagens. Nas seções, os bichinhos ficam
  soltos, sem rastro.
- **Espiando:** desenhos podem sair por trás de fotos e cards (árvore atrás da
  foto, sol atrás do card do PIX, caracol em cima de um card). Nunca por trás de
  texto.
- **Por seção:** no máximo dois pontos (um bichinho ou cena num canto livre e um
  canteiro ou desenho espiando). Céu com nuvens e sol nas seções de título
  centralizado.
- **Última seção antes do rodapé:** sem canteiro (repetiria a paisagem do rodapé).
- **Rodapé:** paisagem com duas colinas verdes que terminam no azul do rodapé.
  Desenhos nunca ficam sobre o azul-escuro: o contorno deles é dessa cor e some.
- **Contraste:** desenho verde-claro não vai sobre a colina verde-clara, e o
  mesmo vale para o verde.
- **Telas:** ao lado de títulos, só a partir de 1280px; canteiros e desenhos
  espiando a partir de 1024px; no celular ficam só as paisagens.
- **Animação:** o rastro desenha uma vez, em 3,2s, e só começa quando está
  inteiro na tela e fora do terço de baixo. Com "reduzir movimento", aparece pronto.
- **Acessibilidade:** decoração tem `alt=""`, `aria-hidden` e não bloqueia cliques.

## 7. Anti-Patterns (Banned)

- Cards repetidos com ícone dentro de uma caixa, em fileira de 3 colunas iguais.
- Barras coloridas de destaque no topo ou na lateral de cards arredondados.
- Rótulo laranja acima de todas as seções.
- Fotos de banco ou geradas por IA apresentadas como se fossem do INAV.
- Imagens de exemplo genéricas (picsum, Unsplash) no lugar de fotos reais: usar a
  marca "Foto pendente" até a foto chegar.
- Números inventados ou arredondados: todo número vem da instituição.
- Clichês de texto de IA ("jornada transformadora", "potencializar", "não é só X,
  é Y") e emojis.
- Voluntariado como forma de ajudar: regra de proteção às crianças definida pelo
  INAV.

## Decisões que divergem das skills de design do projeto

As skills `design-taste-frontend`, `redesign-existing-projects` e
`stitch-design-taste` são genéricas. Neste projeto valem estas exceções:

- **Três cores de marca, não uma só:** azul, laranja e verde são a identidade do
  INAV, com os papéis da seção 2.
- **Títulos em maiúsculas** fazem parte da identidade.
- **Ícones Lucide** continuam (trocar a biblioteca não traz ganho para o projeto).
- **Sem modo escuro por enquanto:** os tokens `.dark` existem em `styles.css`, mas
  não estão ativos.
- **Sem animação em loop permanente** e **sem foto dentro do título**.
