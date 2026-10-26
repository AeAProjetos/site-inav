import { site } from "@/lib/site-config";

/**
 * Newsletter pelo Brevo (brevo.com): guarda a lista de inscritos e envia os e-mails.
 * Só use estas funções no servidor (createServerFn ou rotas de servidor): elas leem as chaves
 * das variáveis de ambiente. Passo a passo da configuração em NEWSLETTER.md.
 *
 * Variáveis:
 * - BREVO_API_KEY: chave da API (Brevo > Configurações > Chaves SMTP e API).
 * - BREVO_LISTA_ID: número da lista de inscritos.
 * - BREVO_MODELO_CONFIRMACAO_ID: número do modelo de e-mail de confirmação (dupla confirmação).
 *   Sem ele, a pessoa entra na lista na hora, sem e-mail de confirmação.
 * - BREVO_REMETENTE_EMAIL e BREVO_REMETENTE_NOME: remetente já validado no Brevo.
 * - SITE_URL: endereço do site usado nos links dos e-mails (padrão: o de site-config).
 * - NEWSLETTER_SIMULAR=1: não chama o Brevo, só registra no terminal. Para testar na máquina.
 */

const API = "https://api.brevo.com/v3";

export const simulando = () => process.env["NEWSLETTER_SIMULAR"] === "1";

export const urlDoSite = () => (process.env["SITE_URL"] ?? site.url).replace(/\/+$/, "");

function config() {
  const chave = process.env["BREVO_API_KEY"];
  const lista = Number(process.env["BREVO_LISTA_ID"]);
  const modeloConfirmacao = Number(process.env["BREVO_MODELO_CONFIRMACAO_ID"]) || undefined;
  const remetenteEmail = process.env["BREVO_REMETENTE_EMAIL"];
  const remetenteNome = process.env["BREVO_REMETENTE_NOME"] ?? site.name;
  return { chave, lista, modeloConfirmacao, remetenteEmail, remetenteNome };
}

export class NewsletterNaoConfigurada extends Error {
  constructor(falta: string) {
    super(`Newsletter sem configuração: falta ${falta}.`);
  }
}

async function chamar<T>(caminho: string, init: { method: string; body?: unknown }): Promise<T> {
  const { chave } = config();
  if (!chave) throw new NewsletterNaoConfigurada("BREVO_API_KEY");
  const resposta = await fetch(`${API}${caminho}`, {
    method: init.method,
    headers: {
      "api-key": chave,
      accept: "application/json",
      "content-type": "application/json",
    },
    ...(init.body === undefined ? {} : { body: JSON.stringify(init.body) }),
  });
  if (!resposta.ok) {
    const detalhe = await resposta.text().catch(() => "");
    throw new Error(`O Brevo respondeu ${resposta.status} em ${caminho}: ${detalhe.slice(0, 300)}`);
  }
  // Várias respostas do Brevo vêm vazias (204).
  const texto = await resposta.text();
  return (texto ? JSON.parse(texto) : {}) as T;
}

/**
 * Inscreve um e-mail. Com o modelo de confirmação configurado, o Brevo manda um e-mail pedindo
 * para confirmar, e a pessoa só entra na lista depois de clicar. Devolve se a confirmação foi pedida.
 */
export async function inscrever(email: string): Promise<{ pedeConfirmacao: boolean }> {
  const { lista, modeloConfirmacao } = config();
  if (simulando()) {
    console.info(`[newsletter simulada] inscrição de ${email}`);
    return { pedeConfirmacao: true };
  }
  if (!lista) throw new NewsletterNaoConfigurada("BREVO_LISTA_ID");

  if (modeloConfirmacao) {
    await chamar("/contacts/doubleOptinConfirmation", {
      method: "POST",
      body: {
        email,
        includeListIds: [lista],
        templateId: modeloConfirmacao,
        redirectionUrl: `${urlDoSite()}/newsletter/confirmada`,
      },
    });
    return { pedeConfirmacao: true };
  }

  await chamar("/contacts", {
    method: "POST",
    body: { email, listIds: [lista], updateEnabled: true },
  });
  return { pedeConfirmacao: false };
}

type Campanha = { id: number; name: string };

/** Procura entre as campanhas recentes uma cujo nome contenha a marca (evita enviar o mesmo post duas vezes). */
export async function campanhaJaExiste(marca: string): Promise<boolean> {
  if (simulando()) return false;
  const { campaigns = [] } = await chamar<{ campaigns?: Campanha[] }>(
    "/emailCampaigns?limit=100&offset=0&sort=desc",
    { method: "GET" },
  );
  return campaigns.some((c) => c.name.includes(marca));
}

/**
 * Cria a campanha para a lista de inscritos. Com `agendarPara`, o Brevo envia nessa data;
 * sem, envia na hora. Devolve o número da campanha (0 na simulação).
 */
export async function enviarCampanha(campanha: {
  nome: string;
  assunto: string;
  previa: string;
  html: string;
  agendarPara?: Date | undefined;
}): Promise<number> {
  const { lista, remetenteEmail, remetenteNome } = config();
  if (simulando()) {
    console.info(
      `[newsletter simulada] campanha "${campanha.nome}"`,
      campanha.agendarPara
        ? `agendada para ${campanha.agendarPara.toISOString()}`
        : "enviada na hora",
    );
    return 0;
  }
  if (!lista) throw new NewsletterNaoConfigurada("BREVO_LISTA_ID");
  if (!remetenteEmail) throw new NewsletterNaoConfigurada("BREVO_REMETENTE_EMAIL");

  const { id } = await chamar<{ id: number }>("/emailCampaigns", {
    method: "POST",
    body: {
      name: campanha.nome,
      subject: campanha.assunto,
      previewText: campanha.previa,
      sender: { name: remetenteNome, email: remetenteEmail },
      htmlContent: campanha.html,
      recipients: { listIds: [lista] },
      ...(campanha.agendarPara ? { scheduledAt: campanha.agendarPara.toISOString() } : {}),
    },
  });
  if (!campanha.agendarPara) {
    await chamar(`/emailCampaigns/${id}/sendNow`, { method: "POST" });
  }
  return id;
}
