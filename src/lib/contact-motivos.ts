import { site } from "@/lib/site-config";

/**
 * Assuntos do formulário de Contato, conforme a copy da KIM (v2, 11/11/2026), que segue as
 * Orientações de 28/09. A dica aparece abaixo do campo quando a pessoa escolhe o assunto.
 * Links que pré-selecionam um assunto usam /contato?assunto=<slug>#formulario.
 * O Amigos INAV não entra aqui: o programa só é citado na própria página (regra de 10/11).
 */
export const assuntos = [
  {
    slug: "doacao",
    label: "Doação",
    dica: "Conte o que pretende doar. A equipe confirma o que o INAV recebe no momento e como fazer a entrega.",
  },
  {
    slug: "parceria",
    label: "Parceria",
    dica: "Apresente a empresa ou a instituição e a ideia de parceria. A equipe retorna para conversar.",
  },
  {
    slug: "educacao-infantil",
    label: "Educação infantil",
    dica: "Vagas: a inscrição é feita pela Central 156, da Secretaria de Educação do DF. Para outras dúvidas sobre a rotina, escreva abaixo.",
  },
  {
    slug: "visita",
    label: "Visita ao instituto",
    dica: `As visitas são combinadas pelo WhatsApp ${site.whatsappDisplay}, que envia as regras. Se preferir escrever aqui, indique dias e horários possíveis.`,
  },
  {
    slug: "opiniao",
    label: "Elogio, sugestão ou reclamação",
    dica: "Sua mensagem chega à equipe. Para denúncias, use o Canal de Ética.",
  },
  { slug: "outro", label: "Outro assunto", dica: undefined },
] as const;

export type SlugDoAssunto = (typeof assuntos)[number]["slug"];

export function assuntoPorSlug(slug: string | undefined) {
  return assuntos.find((assunto) => assunto.slug === slug);
}

export function ehSlugDeAssunto(valor: unknown): valor is SlugDoAssunto {
  return typeof valor === "string" && assuntos.some((assunto) => assunto.slug === valor);
}
