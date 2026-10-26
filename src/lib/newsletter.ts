import { createServerFn } from "@tanstack/react-start";

import { inscrever, NewsletterNaoConfigurada } from "@/lib/brevo";

export type ResultadoDaInscricao =
  | { ok: true; pedeConfirmacao: boolean }
  | { ok: false; motivo: "email-invalido" | "sem-consentimento" | "indisponivel" | "erro" };

type Pedido = { email: string; consentimento: boolean; armadilha: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Inscrição na newsletter, chamada pelo formulário do site. */
export const inscreverNaNewsletter = createServerFn({ method: "POST" })
  .inputValidator((dados: Pedido): Pedido => ({
    email: String(dados?.email ?? "")
      .trim()
      .toLowerCase()
      .slice(0, 254),
    consentimento: dados?.consentimento === true,
    armadilha: String(dados?.armadilha ?? ""),
  }))
  .handler(async ({ data }): Promise<ResultadoDaInscricao> => {
    // Campo escondido que só robôs preenchem: finge que deu certo e não faz nada.
    if (data.armadilha) return { ok: true, pedeConfirmacao: true };
    if (!EMAIL.test(data.email)) return { ok: false, motivo: "email-invalido" };
    if (!data.consentimento) return { ok: false, motivo: "sem-consentimento" };

    try {
      const { pedeConfirmacao } = await inscrever(data.email);
      return { ok: true, pedeConfirmacao };
    } catch (erro) {
      console.error(erro);
      return {
        ok: false,
        motivo: erro instanceof NewsletterNaoConfigurada ? "indisponivel" : "erro",
      };
    }
  });
