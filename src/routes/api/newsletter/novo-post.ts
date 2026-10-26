import { createFileRoute } from "@tanstack/react-router";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { formatarData, infoDoTipo, postParaNewsletter } from "@/lib/blog";
import { campanhaJaExiste, enviarCampanha, simulando, urlDoSite } from "@/lib/brevo";
import { emailDoPost } from "@/lib/email-do-post";

const responder = (corpo: Record<string, unknown>, status = 200) =>
  Response.json(corpo, { status });

// Se a data da publicação estiver mais de 10 minutos no futuro, o e-mail é agendado para ela.
const MARGEM_PARA_AGENDAR = 10 * 60 * 1000;

/**
 * Recebe o aviso (webhook) do Sanity quando uma publicação do blog é criada e manda o e-mail
 * para os inscritos da newsletter. Configuração do aviso em NEWSLETTER.md.
 *
 * Proteções: só aceita avisos assinados com SANITY_WEBHOOK_SECRET, lê a publicação de novo no
 * Sanity (não confia no conteúdo do aviso) e não envia duas vezes o mesmo post.
 */
export const Route = createFileRoute("/api/newsletter/novo-post")({
  server: {
    handlers: {
      // Aberta no navegador, a rota só explica que espera o aviso do Sanity.
      GET: () =>
        Response.json(
          { erro: "use POST: esta rota recebe o aviso do Sanity" },
          { status: 405, headers: { Allow: "POST" } },
        ),
      POST: async ({ request }) => {
        const segredo = process.env["SANITY_WEBHOOK_SECRET"];
        if (!segredo) return responder({ erro: "SANITY_WEBHOOK_SECRET não configurado" }, 500);

        const corpo = await request.text();
        const assinatura = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
        const valido = await isValidSignature(corpo, assinatura, segredo).catch(() => false);
        if (!valido) return responder({ erro: "assinatura inválida" }, 401);

        let id: unknown;
        try {
          id = (JSON.parse(corpo) as { _id?: unknown })._id;
        } catch {
          return responder({ erro: "corpo inválido" }, 400);
        }
        if (typeof id !== "string" || id.startsWith("drafts.") || id.startsWith("versions.")) {
          return responder({ ignorado: "não é uma publicação publicada" });
        }

        try {
          const post = await postParaNewsletter(id);
          if (!post) return responder({ ignorado: "publicação não encontrada ou incompleta" });
          if (!post.enviarNewsletter) return responder({ ignorado: "envio desmarcado no painel" });

          const marca = `[${id}]`;
          if (await campanhaJaExiste(marca)) return responder({ ignorado: "e-mail já enviado" });

          const data = new Date(post.publicadoEm);
          const agendarPara = data.getTime() > Date.now() + MARGEM_PARA_AGENDAR ? data : undefined;
          const site = urlDoSite();
          const html = emailDoPost({
            urlDoSite: site,
            titulo: post.titulo,
            resumo: post.resumo,
            tipo: infoDoTipo(post.tipo).title,
            data: formatarData(post.publicadoEm),
            link: `${site}/blog/${post.slug}?utm_source=newsletter&utm_medium=email`,
            capa: post.capa ? { url: post.capa.media, alt: post.capa.alt } : undefined,
          });

          const campanha = await enviarCampanha({
            nome: `Blog: ${post.titulo.slice(0, 120)} ${marca}`,
            assunto: post.titulo,
            previa: post.resumo,
            html,
            agendarPara,
          });

          return responder({
            campanha,
            ...(agendarPara ? { agendadoPara: agendarPara.toISOString() } : { enviado: true }),
            // Na simulação, devolve o e-mail montado para conferir.
            ...(simulando() ? { simulado: true, html } : {}),
          });
        } catch (erro) {
          console.error(erro);
          return responder({ erro: "falha ao enviar a newsletter" }, 500);
        }
      },
    },
  },
});
