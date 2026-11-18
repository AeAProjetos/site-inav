---
name: refinar-pagina
description: Refina uma página do site do INAV a partir do pacote do designer em Refinamento/<Página>/, com os agentes leitor-refinamento, preparador-fotos, verificador-visual, revisor-padrao e auditor-dados. Use /refinar-pagina <Página> para refinar, ou /refinar-pagina <Página> decisoes para aplicar as respostas do INAV e as decisões do usuário.
argument-hint: <Página> [decisoes]
disable-model-invocation: true
---

# /refinar-pagina

Argumentos: `$ARGUMENTS`

- Se a última palavra for `decisoes` ou `decisões`, use o **modo decisões** (fim deste arquivo). O resto é o nome da página.
- O nome pode ter espaço ("Quem Somos"). Encontre a pasta com `Glob Refinamento/*`, sem diferenciar maiúsculas, acentos e espaços.
- O slug fica em minúsculas, sem acento, com hífen.

| Página | slug | Rota atual |
|---|---|---|
| Início | `inicio` | `src/routes/index.tsx` (HomeHero, ImpactStats, JourneySteps, SectionPreviewGrid, PixDonationCard, PaisagemHome, WaveDivider) |
| Quem Somos | `quem-somos` | `src/routes/quem-somos.tsx` |
| Bazar | `bazar` | `src/routes/bazar/` (index, $codigo, sacola), `src/lib/bazar.ts`, `src/components/bazar/` |
| Blog | `blog` | `src/routes/blog/` (index, $slug), `src/lib/blog.ts`, `src/components/blog/` |

As regras estão no `CLAUDE.md`. As decisões e o status estão na memória (`project_inav_*`). Leia as memórias da página e as que a copy tocar.

**Quem faz o quê:**
- Os agentes leem, preparam fotos e conferem.
- **Decisão e implementação nunca são delegadas:** quem decide e escreve o código é a sessão principal.
- Não releia o que um agente já resumiu. Abra o arquivo só no trecho que ele apontou.

## Pare e pergunte (AskUserQuestion) quando

- um item exigir rota nova, backend ou serviço de terceiro;
- um dado da copy divergir do site-config ou de outra página publicada e a divergência não estiver entre as pendências da copy. A divergência listada nas pendências segue a copy, leva `<Pending>` e não para o trabalho;
- algo contrariar uma decisão registrada na memória ou uma regra do `CLAUDE.md`.

Junte as perguntas numa chamada só, com a opção recomendada em primeiro lugar.

## Modo refinar

### a. Branch

1. Rode `git fetch origin` e `git status --short`. Se houver mudança fora das pastas que nunca vão para o Git e fora do `src/routeTree.gen.ts`, pergunte o que fazer com ela.
2. Procure branches com commit e não publicadas:
   ```bash
   for b in $(git for-each-ref --format='%(refname:short)' refs/heads); do
     n=$(git rev-list --count origin/main..$b); [ "$n" -gt 0 ] && echo "$b: $n commit(s) fora da main — $(git log -1 --format='%h %s' $b)"
   done
   ```
   Ignore as que `project_inav_branches` ou o handoff dão como já publicadas.
3. Se sobrar alguma, pergunte, com estas opções:
   - "Publicar <branch> antes": siga o fluxo do `CLAUDE.md`, e a resposta vale como o OK dessa publicação;
   - "Nova branch parte de <branch>";
   - "Nova branch parte da main".
4. Crie a branch:
   ```bash
   git checkout -- src/routeTree.gen.ts && git checkout -b <slug>-v5 <origin/main ou a branch escolhida>
   ```

### b. Leitura e fotos (em paralelo)

Mande as duas chamadas do Agent na mesma mensagem:

- **`leitor-refinamento`:** "Página <Página>, slug <slug>, pacote `Refinamento/<Pasta>/`, rota atual <arquivos>, pasta de memória <caminho da seção Memory do seu prompt de sistema>."
- **`preparador-fotos`**, só se o pacote tiver imagens: "Página <Página>, slug <slug>, imagens em `<pasta de imagens do pacote>`. Seções pelo prefixo do nome do arquivo."

Espere os dois relatórios.

### c. Decidir e implementar (na sessão principal)

1. Leia os relatórios. Leia na `copy.txt` só os trechos que eles apontaram.
2. Decida as adaptações pelo `CLAUDE.md`:
   - cores com função e sem cara de IA;
   - os componentes existentes;
   - os dados no site-config;
   - as ilustrações existentes;
   - as fotos de `public/img/<slug>/`.
3. Se houver um ponto de parada ou uma escolha que é do usuário (ex.: formato do topo, texto que muda o sentido), pergunte antes de implementar essa parte.
4. Implemente. Cada item "publicar após validar" leva um `<Pending>` com o número da pendência da copy.
5. Rode tipos e lint enquanto trabalha.

### d. Conferência (em paralelo)

Confira que o servidor responde (`curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/`). Se não responder, suba `bun run dev` em segundo plano.

Mande as três chamadas na mesma mensagem:

- **`verificador-visual`:** "URL http://localhost:8080/<rota>, slug <slug>. Teste em especial: <formulários, parâmetros, âncoras, botões>."
- **`revisor-padrao`:** "Diff de `git merge-base origin/main HEAD` contra a árvore de trabalho, mais os arquivos novos: <lista>. Slug <slug>, pasta de memória <caminho>."
- **`auditor-dados`:** "Página <Página>, slug <slug>, arquivos <lista>, copy em `scratch/refinamento/<slug>/copy.txt`, pasta de memória <caminho>."

### e. Corrigir

1. Corrija o que os agentes acharam e o que você concordar que é problema.
2. Rode de novo só o agente que achou o problema, pedindo "confira só estes itens: ...".
3. Faça no máximo 2 rodadas. O que sobrar vai para o relatório.
4. No fim, rode `git checkout -- src/routeTree.gen.ts`, se mudou só o fim de linha.

### f. Relatório final, curto, em português

1. **O que foi implementado.**
2. **O que foi adaptado em relação ao designer, e por quê.**
3. **Dados a confirmar com o INAV:** numerados, com o lugar onde aparecem na página. Separe o que a copy já pedia do que você encontrou.
4. **Dúvidas que o usuário decide**, inclusive o OK para o commit.

### g. Memória e handoff

- **Memória:** crie `project_inav_<slug_com_underscore>_v5.md`, no formato das outras e com `name: project-inav-<slug>-v5`. Registre:
  - a branch e o status;
  - as decisões do usuário;
  - as adaptações;
  - os Pendings;
  - o "How to apply".

  Depois acrescente a linha no `MEMORY.md` e atualize `project_inav_branches`.
- **Handoff (`scratch/handoff.md`):** atualize:
  - a seção 1 (branches com trabalho pendente);
  - a linha da página na tabela da seção 2;
  - as perguntas ao INAV na seção 6.

### h. Commit e publicação

- Só com o OK do usuário, um OK para cada coisa.
- Siga o fluxo do `CLAUDE.md`:
  1. Adicione os arquivos pelo nome. Lembre das fotos novas, que não estão rastreadas, e das fotos apagadas.
  2. `bun run pendencias` vazio para publicar.
  3. `merge-base --is-ancestor`.
  4. `push <branch>:main`.
  5. Confira o deploy pela API do GitHub.

## Modo decisões (`/refinar-pagina <Página> decisoes`)

As respostas do INAV e as decisões do usuário vêm na mesma mensagem ou na anterior.

1. **Prepare:**
   - Leia `project_inav_<slug>_v5` e rode `bun run pendencias`.
   - Se a branch `<slug>-v5` ainda não foi publicada, trabalhe nela. Se já foi, crie `<slug>-ajustes` a partir de `origin/main`.
   - Restaure o `routeTree` antes de trocar de branch.
2. **Ligue cada resposta a um item:** um `<Pending>`, um dado do site-config ou um texto.
   - Se uma resposta for ambígua (ex.: "mantém" pode ser manter o dado ou manter o Pending), siga o sentido literal da pergunta que foi feita e diga isso no relatório. Se nem assim estiver claro, pergunte.
   - O que o usuário diz que "fica com o INAV" ou "fica como está" não muda.
3. **Aplique:**
   - tire os `<Pending>` confirmados;
   - atualize os dados em `src/lib/site-config.ts`, inclusive os comentários com a data da confirmação;
   - ajuste os textos.
4. **Confira:** rode em paralelo o `revisor-padrao` e o `auditor-dados`. Se a mudança mexeu em link, botão ou layout, rode também o `verificador-visual`, só nesses itens.
5. **Relate:** o que mudou, os Pendings que sobraram e as perguntas que ficaram sem resposta.
6. **Atualize** a memória `project_inav_<slug>_v5` e o handoff.
7. **Commit e publicação** só com o OK, como no passo h.
