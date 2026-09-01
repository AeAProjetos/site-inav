# Site Institucional — INAV

Site institucional e plataforma de captação do Instituto Nair Valadares (INAV), OSC sem fins lucrativos dedicada à educação infantil integral e ao fortalecimento comunitário no Riacho Fundo II (Brasília/DF).

## Stack

- **Framework:** TanStack Start (SSR) + TanStack Router (rotas por arquivo em `src/routes/`)
- **UI:** React 19, Tailwind CSS v4, Radix UI / shadcn, Framer Motion
- **Build:** Vite + Nitro (preset `vercel`)
- **Gerenciador de pacotes:** bun

## Desenvolvimento

```sh
bun install
bun run dev
```

Outros scripts: `bun run build`, `bun run lint`, `bun run format`.

## Estrutura

```text
src/
├── routes/           # Páginas (roteamento por arquivo)
├── components/        # Componentes de seção e layout
│   └── ui/             # Componentes de UI (shadcn)
├── lib/
│   └── site-config.ts  # Dados institucionais, navegação, chave PIX etc.
└── styles.css          # Tokens de design (cores, tipografia, raios)
public/img/             # Fotos e logo oficiais
```

## Conteúdo pendente

Textos e dados de contato (telefone, endereço, chave PIX, Instagram) em `src/lib/site-config.ts` e nas páginas ainda são placeholders — aguardando confirmação oficial junto à instituição antes da publicação.
