# Site Institucional — INAV

Redesign do site institucional do Instituto Nair Valadares (inav.org.br).

## Stack

- **Build:** Vite
- **Frontend:** HTML5, Vanilla CSS, JavaScript ES6+
- **Hospedagem:** Vercel ou Firebase Hosting

## Estrutura

```
site-inav/
├── public/img/         # Imagens e assets estáticos
├── src/
│   ├── assets/css/     # Estilos (design system)
│   ├── js/components/  # Web Components reutilizáveis
│   ├── content/        # Conteúdo em Markdown
│   └── index.html      # Página principal
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Comandos

```bash
npm install        # Instalar dependências
npm run dev        # Dev server (localhost)
npm run build      # Build para produção
npm run preview    # Preview do build
```