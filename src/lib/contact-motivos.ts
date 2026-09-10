/**
 * Fonte única dos "motivos de contato" — usada pelo select do ContactForm
 * e pelos links de /quer-ajudar que pré-selecionam um motivo via
 * /contato?motivo=<slug>.
 */
export const motivoOptions = [
  { slug: "doacao", label: "Quero doar" },
  { slug: "apadrinhamento", label: "Quero ser padrinho/madrinha (apadrinhamento mensal)" },
  { slug: "parceria", label: "Quero ser parceiro(a) empresarial" },
  { slug: "outro", label: "Outro assunto" },
] as const;

export type MotivoSlug = (typeof motivoOptions)[number]["slug"];

export function motivoLabel(slug: string | undefined): string {
  return motivoOptions.find((m) => m.slug === slug)?.label ?? "";
}
