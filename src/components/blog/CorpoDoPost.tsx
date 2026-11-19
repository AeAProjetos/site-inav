import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";

/** Só aceita links web, para um endereço colado errado no painel não virar link quebrado ou perigoso. */
const linkSeguro = (href: unknown) =>
  typeof href === "string" && /^(https?:\/\/|mailto:|tel:)/i.test(href) ? href : undefined;

type Numero = { _key?: string; valor?: string; rotulo?: string };

// Colunas por quantidade de números (2 a 4). No celular, sempre 2 por linha.
const colunas: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

/** Bloco de números do painel: um só painel com divisórias, e o último número em verde. */
function BlocoDeNumeros({ value }: { value?: { itens?: Numero[] } }) {
  const itens = (value?.itens ?? []).filter((i) => i?.valor?.trim());
  if (itens.length === 0) return null;
  return (
    <dl
      className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border ${colunas[itens.length] ?? "sm:grid-cols-4"}`}
    >
      {itens.map((item, i) => (
        // O rótulo vem antes no HTML (dt antes de dd) e o valor aparece primeiro na tela.
        <div
          key={item._key ?? i}
          className="flex flex-col-reverse justify-end bg-surface-tint p-4 sm:p-5"
        >
          <dt className="mt-1 text-sm leading-snug text-muted-foreground">{item.rotulo}</dt>
          <dd
            // Verde escuro do pacote (#2E8F2F): o verde da marca não chega a 3:1 sobre fundo claro.
            className={`font-display text-2xl font-extrabold ${i === itens.length - 1 ? "text-[#2E8F2F]" : "text-brand-blue-deep"}`}
          >
            {item.valor}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const componentes: PortableTextComponents = {
  types: {
    dados: BlocoDeNumeros,
  },
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-[1.75] text-foreground/90 sm:text-lg">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-display text-2xl font-extrabold leading-tight text-brand-blue-deep text-balance-pretty sm:text-[1.75rem]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold leading-snug text-brand-blue-deep">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-brand-green pl-5 text-lg italic leading-8 text-brand-blue-deep">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 leading-8 marker:text-brand-green">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 leading-8 marker:font-bold marker:text-brand-blue">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = linkSeguro(value?.href);
      if (!href) return <>{children}</>;
      const externo = /^https?:/i.test(href);
      return (
        <a
          href={href}
          {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
        >
          {children}
        </a>
      );
    },
  },
};

/** Texto da publicação, escrito no painel do Sanity, com o visual do site. */
export function CorpoDoPost({ valor }: { valor: PortableTextProps["value"] }) {
  return <PortableText value={valor} components={componentes} />;
}
