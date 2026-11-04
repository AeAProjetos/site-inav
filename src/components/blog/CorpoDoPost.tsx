import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";

/** Só aceita links web, para um endereço colado errado no painel não virar link quebrado ou perigoso. */
const linkSeguro = (href: unknown) =>
  typeof href === "string" && /^(https?:\/\/|mailto:|tel:)/i.test(href) ? href : undefined;

const componentes: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 leading-8 text-foreground/90">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-extrabold uppercase leading-[1.1] text-brand-blue-deep text-balance-pretty sm:text-3xl">
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
