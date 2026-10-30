import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

import { inscrever, NewsletterNaoConfigurada, urlDoSite } from "@/lib/brevo";

// Endereços onde o site roda. O link de confirmação volta para o mesmo endereço da inscrição;
// fora desta lista, usa o SITE_URL.
const ENDERECO_DO_SITE =
  /^(?:https:\/\/(?:www\.)?inav\.org\.br|https:\/\/site-inav(?:-[a-z0-9-]+)?\.vercel\.app|http:\/\/localhost:\d+)$/;

function enderecoDaInscricao(): string {
  const origem = getRequestUrl().origin;
  return ENDERECO_DO_SITE.test(origem) ? origem : urlDoSite();
}

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
      const { pedeConfirmacao } = await inscrever(data.email, enderecoDaInscricao());
      return { ok: true, pedeConfirmacao };
    } catch (erro) {
      console.error(erro);
      return {
        ok: false,
        motivo: erro instanceof NewsletterNaoConfigurada ? "indisponivel" : "erro",
      };
    }
  });
