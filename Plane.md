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
