/**
 * Fonte única dos "motivos de contato" — usada pelo select do ContactForm
 * e por links que pré-selecionam um motivo via /contato?motivo=<slug>.
 */
export const motivoOptions = [
  { slug: "doacao", label: "Quero doar" },
  { slug: "apoio-mensal", label: "Quero apoiar todo mês (Amigos INAV)" },
  { slug: "parceria", label: "Quero ser parceiro(a) empresarial" },
  { slug: "outro", label: "Outro assunto" },
] as const;

export type MotivoSlug = (typeof motivoOptions)[number]["slug"];

export function motivoLabel(slug: string | undefined): string {
  return motivoOptions.find((m) => m.slug === slug)?.label ?? "";
}
