# Site do INAV

Site do Instituto Nair Valadares, uma OSC de educação infantil gratuita no Riacho Fundo II (DF). Usa TanStack Start, React 19, Tailwind v4 e motion, com o Sanity (bazar e blog), o Formspree (formulários) e o Brevo (newsletter). É publicado na Vercel. O repositório no GitHub é **público**.

Este arquivo guarda as regras estáveis e vale para a sessão principal e para os agentes de `.claude/agents/`. As decisões de cada página, o status e as respostas do INAV ficam na memória do Claude Code (`project_inav_*`, `feedback_*`), e o mapa do projeto é `scratch/handoff.md`, que fica fora do Git. Não apague nem reescreva memórias: acrescente ou atualize a do assunto.

## Regras do conteúdo e do visual

- **Sem voluntariado** como forma de ajudar. É uma regra de proteção às crianças, vinda do próprio INAV.
- **Cores com função:** o laranja fica só nas chamadas de doação. O azul é institucional, e o verde é educação e transparência. Os botões institucionais são azuis, brancos ou com contorno.
- **Nada de cara de IA:**
  - Evite cartões repetidos com ícone em caixinha colorida e barra colorida na lateral de cartão.
  - Prefira um painel único com divisórias, linhas clicáveis, numerais grandes ou o sistema de cores do site.
  - Confira isso antes de mostrar o trabalho.
- **Nunca escreva nome de criança:** nem em texto, alt, legenda, comentário de código, commit ou relatório. Foto que mostra nome (painel, crachá, caderno) só entra recortada.
- **Dados de contato e institucionais só em `src/lib/site-config.ts`:** telefones, e-mails, endereço, horário, CNPJ, Pix, WhatsApp, mapa e endpoints dos formulários. As páginas e o rodapé importam de lá, sem número ou e-mail escrito na página.
- **Tudo o que depende do INAV leva `<Pending>`** (`src/components/Pending.tsx`): dado a confirmar, foto que falta, item "publicar após validar". `bun run pendencias` lista todos e precisa sair vazio antes de ir para a main.
- **Fotos:**
  - Não repita foto entre páginas.
  - As fotos de cada página ficam em `public/img/<página>/`, sem metadados e com tamanho adequado.
  - Alt descritivo e sem nomes. Foto decorativa usa `alt=""`.
- **Ilustrações:**
  - Use as que já existem em `public/ilustracoes/`, pelos componentes `Ilustracao`, `Cena` e `Canteiro`. Não crie SVG novo.
  - Os bichinhos soltos aparecem só a partir de `xl` (1280 px).
  - O jardim acima do rodapé já vem do `SiteFooter` (`PaisagemRodape`).
- **Amigos INAV:**
  - O programa é apresentado só na própria página (`/amigos-inav`) e no menu.
  - Botões de doação de outras páginas podem levar a `/amigos-inav`, como o "Quero Doar" da Home e o "Seja um parceiro" do cabeçalho.
  - Fora dessa página, não crie seções, assuntos de formulário nem chamadas com o nome do programa.
  - O nome é sempre "Amigos INAV".
- **Textos:**
  - Português do Brasil.
  - A copy aprovada do designer e do redator é a base. Toda mudança de texto vai para o relatório.
  - Não prometa o que o INAV não confirmou: prazo de resposta, anonimato, "respondemos a todos".
- **Formulários:** em teste, nunca envie mensagem real.
  - Intercepte `formspree.io` no navegador.
  - Nunca envie a newsletter, que vai ao Brevo pelo servidor e não dá para interceptar.
  - Envio real só com o OK do usuário.

## Componentes para reutilizar

- `PageHero` faz o topo das páginas internas:
  - `background` põe uma foto em tela cheia sob o véu azul, com `credit` opcional. `aside` põe uma foto em quadro. Não use os dois juntos.
  - Outras props: `actions`, `titleClassName`, `compact`.
- `SectionHeading` faz o título de seção (`eyebrow`, `title` + `highlight`, `description`, `align`, `tone`).
- `FaixaDeNumeros` é a faixa azul sobre foto com quatro números, usada em Projetos e Transparência.
- `Pending` e `PendingPhoto` marcam o que falta.
- `Ilustracao`, `Cena` e `Canteiro` ficam em `Ilustracao.tsx`. `PaisagemHome` e `PaisagemRodape` ficam em `Paisagem.tsx`.
- Outros componentes:
  - `ClosingBanner`
  - `PhotoGallery`
  - `ImageLightbox`
  - `WaveDivider`
  - `PixDonationCard`
  - `ContactForm`
  - `AmigosForm`
  - `InscricaoNewsletter`
- Em `projetos/`: `CarrosselTrajetoria`, `LinhaDoTempo`, `GaleriaAnos`, `SeloStatus`. Em `transparencia/`: `Biblioteca`, `ComposicaoDosRecursos`, `GraficoRepasses`.
- Em `src/lib/`:
  - `motion-presets` (`fadeUp`, `stagger`, `revealOnScroll`)
  - `rolagem` (`rolarAte`, `aoClicar`)
  - `utils` (`cn`)
  - `site-config` (`whatsappLinkWith`, `mapsLink`, `landlineLink`, `ethicsMailto` e outros)

## Comandos

- `bun run dev` sobe o site em http://localhost:8080. Também: `bun run build` e `bun run pendencias`.
- Tipos: `./node_modules/.bin/tsc.exe --noEmit -p .` (o `npx tsc` não funciona aqui).
- Lint sem o ruído de CRLF: `npx eslint --rule '{"prettier/prettier": ["error", {"endOfLine": "auto"}]}' <arquivos>`.
- Scripts em `.claude/scripts/`, rodados com `powershell -NoProfile -ExecutionPolicy Bypass -File <script>`:
  - `ler-docx.ps1` lê a copy.
  - `otimizar-fotos.ps1` prepara as fotos.
  - `comparar-fotos.ps1` encontra fotos repetidas.

## Git e publicação

- **Nunca use `git add -A` nem `git add .`.** Adicione pelo nome os arquivos da página.
- **Nunca vão para o Git:**
  - `Refinamento/`, que é material do designer com dados internos.
  - `public/img/Page Quero ajudar/`, porque a foto original mostra nomes de crianças.
  - `ilustracoes-*/` e `.playwright-cli/`.
  - `scratch/` e `.agents/`, que já estão no `.gitignore`.
- **Vão para o Git junto com o código:** este `CLAUDE.md`, `.claude/agents/`, `.claude/skills/refinar-pagina/` e `.claude/scripts/`. O resto de `.claude/` fica local, pelo `.gitignore`.
- **Commit e publicação só com o OK do usuário**, um OK para cada. Os agentes nunca fazem commit.
- **Fluxo:**
  1. Crie a branch a partir de `origin/main`, porque a `main` local fica parada (a publicação é por `push <branch>:main`): `git fetch origin && git checkout -b <página>-v5 origin/main`.
  2. Faça o commit só dos arquivos da página, com mensagem `feat: ...` em português.
  3. `bun run pendencias` precisa sair vazio.
  4. `git merge-base --is-ancestor origin/main <branch>` precisa sair 0.
  5. Publique com `git push origin <branch>:main`.
  6. Confira o deploy com `curl -s https://api.github.com/repos/AeAProjetos/site-inav/commits/<sha>/status` até o `state` ficar `success`. A Vercel pode bloquear o deploy sem avisar no terminal.

## Armadilhas do ambiente

- **routeTree:** o servidor local e o build reescrevem `src/routeTree.gen.ts`, só no fim de linha. Antes de trocar de branch ou fazer commit, rode `git checkout -- src/routeTree.gen.ts`. Se a página criou rota nova, confira antes com `git diff --ignore-cr-at-eol`.
- **TanStack:** `@tanstack/react-start`, `react-router` e `router-plugin` têm versão fixa e sobem juntos, da mesma release. Nunca use `DANGEROUSLY_DEPLOY_VULNERABLE_*`.
- **Drive:** `drive.usercontent.google.com` não abre desta rede. Para conferir a planilha da Transparência, olhe o site publicado.
- **Sem poppler nem Python:** leia `.docx` por PowerShell (`ler-docx.ps1`) e prefira a copy em `.docx` ao PDF. O HTML navegável do designer tem imagens embutidas, então leia só com Grep.
- **`cn()` (tailwind-merge):** trata `text-balance-pretty` como cor e derruba uma das duas classes. Passe essa classe fora do `cn()`.
- **Windows:** o Git usa `autocrlf`, com a árvore em CRLF e o índice em LF. O `gh` e a CLI da Vercel não estão instalados.

## Processo de refinamento

`/refinar-pagina <Página>` (`.claude/skills/refinar-pagina/`) faz o refinamento a partir do pacote `Refinamento/<Página>/`, com os agentes de `.claude/agents/`:

- `leitor-refinamento` lê o pacote.
- `preparador-fotos` prepara as fotos.
- `verificador-visual` confere a página no navegador.
- `revisor-padrao` confere o padrão do código.
- `auditor-dados` confere os dados.

A sessão principal decide as adaptações e implementa. Decisão e implementação nunca são delegadas. `/refinar-pagina <Página> decisoes` aplica as respostas do INAV e as decisões do usuário.

**As skills de `.claude/skills/` que apontam para `.agents/skills/` não são o padrão deste site.** É o caso de `design-taste-frontend`, `redesign-existing-projects`, `stitch-design-taste` e das `vercel-*`. Quando uma delas conflitar com este arquivo, vale este arquivo. Não publique pela CLI nem pelas skills da Vercel (`deploy-to-vercel`, `vercel-cli-with-tokens`): a publicação é só por `git push origin <branch>:main`.
