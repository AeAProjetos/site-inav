# Plano: Site Institucional do Instituto Nair Valadores (INAV)

## Objetivo

Resolver o gargalo do fluxo Figma → IA e entregar um site institucional moderno, acessível e com animações consistentes, usando a identidade visual INAV já definida.

## O que vamos construir

- 7 páginas: Início, Quem Somos, Educação Infantil, Projetos, Transparência, Quer Ajudar, Contato.
- Design system próprio com as cores INAV (azul, laranja, verde) e tipografia hierárquica.
- Componentes reutilizáveis: header, footer, hero, seções de conteúdo, cards de projetos, botão de doação/PIX, botão flutuante do WhatsApp.
- Animações com Framer Motion (entrada suave, scroll, hover) padronizadas em todos os componentes.
- Navegação SPA com TanStack Router (padrão do projeto atual).
- Layout responsivo (mobile, tablet, desktop) e acessibilidade básica (contraste, foco, roles ARIA).
- Conteúdo em placeholder estruturado para substituição futura.

## Por que o fluxo Figma → IA estava falhando

- Imagens do Figma perdem informações estruturais (fontes exatas, espaçamentos, estados, tokens).
- Exportação de código do Figma gera HTML/CSS estático que não se encaixa diretamente em React + Tailwind + animações.
- IA interpreta visualmente e reproduz "de memória", o que causa diferenças de layout, tipografia e animações.

## Solução proposta

1. **Design directions no Lovable**: criar 2–3 direções visuais renderizadas em HTML/Tailwind diretamente no stack do projeto, usando as cores INAV.
2. **Você escolhe uma direção** (composição, densidade, tom das animações).
3. **Implementação fiel** a partir da direção escolhida, com tokens fixos no CSS e componentes reutilizáveis.
4. **Ajustes finos** via preview, não via reexportação do Figma.

Se você já tiver frames específicos do Figma, pode enviar screenshots como referência de conteúdo/composição, mas a direção visual final será construída e aprovada dentro do Lovable.

## Etapas do trabalho

### 1. Alinhamento de stack

- Confirmar TanStack Start + TanStack Router (o projeto já usa essa stack, diferente do React Router v6 mencionado no briefing).
- Ajustar `src/styles.css` com os tokens INAV e tipografia.

### 2. Direções visuais

- Gerar 2–3 direções de homepage do INAV em HTML/Tailwind.
- Cada direção explorará composição do hero, uso das cores, cards de impacto e tom das animações.
- Apresentar para aprovação.

### 3. Design system e componentes base

- Criar tokens de cor, tipografia, espaçamento e bordas no `src/styles.css`.
- Criar componentes: Header com navegação, Footer, WhatsAppFloat, Hero, SectionHeader, ImpactNumbers, DonationCard, ProjectCard, TestimonialCard, ContactForm.

### 4. Páginas

- Implementar as 7 rotas com conteúdo placeholder estruturado.
- Cada página terá `head()` com título, descrição e metadagens sociais próprios.
- Início terá hero, números de impacto, jornada de 3 etapas e chamada para doação.

### 5. Animações e interatividade

- Padronizar animações de entrada com Framer Motion.
- Adicionar hover states, scroll reveal e transições de página.
- Garantir que animações não quebrem acessibilidade (reduced motion).

### 6. Revisão responsiva

- Testar mobile, tablet e desktop.
- Ajustar tipografia, espaçamentos e navegação mobile.

### 7. Entrega

- Preview funcional das 7 páginas.
- Instruções de como editar textos, imagens e adicionar conteúdo real.

## Decisões pendentes para você

1. **Direção visual**: escolher entre as 2–3 opções que apresentarei.
2. **Logo**: enviar o arquivo da logo do INAV (PNG/SVG com fundo transparente, se possível).
3. **Tom dos textos**: formal/institucional, caloroso/comunitário ou misto? (isso influencia os placeholders).
4. **Página inicial**: prefere uma homepage longa com âncoras ou seções compactas com links para as páginas internas?

## Fora do escopo inicial (pode ser adicionado depois)

- Backend para doações online (PIX dinâmico, gateway de pagamento).
- CMS para edição de conteúdo.
- Área logada de administrador.
- Integração com banco de dados real para formulários.

## Resultado esperado

Site navegável, visualmente alinhado à identidade INAV, com animações consistentes e estrutura pronta para você substituir placeholders por conteúdo real em poucos minutos.

---

## Blog institucional — plano de implementação

*Definido em 2026-09-10, a partir de uma sessão de ideação antes da implementação.*

### Objetivo

Criar uma página de Blog que funcione como mural de atualizações do instituto — avisos, posts curados do Instagram e outras histórias — sem exigir que alguém mexa em código pra publicar conteúdo novo.

### Estrutura de conteúdo

- Uma **linha do tempo única** em `/blog`, sem abas separadas por tipo.
- Cada item tem um campo **tipo**, exibido como selo colorido no card (mesmo padrão visual dos badges já usados no site, ex. "Passo 01/02/03" do Nossa Jornada):
  - Aviso
  - Instagram
  - História de transformação
  - Marco institucional
  - Campanha/convite sazonal
  - Parceiro em destaque

### Fonte de conteúdo: Notion

- O INAV mantém uma base no Notion em visualização **Galeria** (cards com foto de capa — mais intuitivo que planilha pra quem não é técnico).
- Publicar um post novo = criar uma página no Notion, arrastar a foto, escrever o texto, marcar o tipo. Sem coluna/linha de planilha.
- No código, a leitura segue **o mesmo padrão já usado na Transparência** (busca no servidor via `createServerFn`, sem expor a chamada ao cliente) — só troca a fonte de CSV pelo SDK do Notion. Não exige reescrever a arquitetura do projeto.
- **Dependência nova**: `@notionhq/client` (SDK oficial, leve) — a única biblioteca nova prevista em todo esse pacote.

### Instagram

- **Curadoria manual** dentro da própria base do Notion (colar link, legenda e foto do post).
- Descartada a integração com a API oficial do Instagram nesta fase: exigiria conta Business/Creator, App Review no Facebook Developers e renovação periódica de token — manutenção desproporcional ao porte da equipe.

### Páginas

- **`/blog`** — listagem: filtro por tipo (pills, client-side), grid de cards reaproveitando o layout visual dos cards de "Nossa Jornada" (foto no topo, selo de categoria flutuante, título, resumo), botão "carregar mais" sem paginação complexa.
- **`/blog/$slug`** — post individual: `PageHero` com o tipo como eyebrow, corpo do texto, compartilhamento (WhatsApp + copiar link, via Web Share API nativa — sem dependência nova), posts relacionados (filtro simples por tipo, sem lib de busca).

### Newsletter

- **Fase 1 (entra neste pacote)**: captura de e-mail reaproveitando a integração do Formspree já configurada no site — sem dependência nova.
- **Fase 2 (backlog, não decidido)**: disparo automático de campanha a cada post novo — exige escolher uma ferramenta de e-mail marketing dedicada (Mailchimp, Brevo, etc.). Não bloqueia o lançamento do blog.

### Funcionalidades já cobertas com o que está instalado (sem dependência nova)

- Tempo de leitura (cálculo por contagem de palavras).
- Datas formatadas — `date-fns`, já no projeto.
- Compartilhamento social — Web Share API + links diretos.
- Feedback de "link copiado" — `sonner`, já no projeto.
- Posts relacionados — filtro simples no array já carregado.

### Decisões fechadas nesta rodada

1. Linha do tempo única, não separada por tipo.
2. Notion como fonte de conteúdo (não Google Sheets, não MDX no repositório).
3. Instagram por curadoria manual, não API oficial.
4. Newsletter entra no escopo, mas só a captura de e-mail por enquanto.
