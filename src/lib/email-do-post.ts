/**
 * HTML do e-mail que a newsletter manda a cada publicação nova do blog.
 * Feito com tabelas e estilos embutidos, o formato que Gmail, Outlook e celulares entendem.
 * O link de descadastro usa a marcação {{ unsubscribe }}, que o Brevo troca pelo link de cada pessoa.
 */

const cores = {
  azulProfundo: "#004580",
  azul: "#0077C8",
  laranja: "#F36F21",
  tinta: "#132231",
  textoSecundario: "#596979",
  fundo: "#F0F9FD",
  borda: "#D6E2EA",
};

const escapar = (texto: string) =>
  texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type DadosDoEmail = {
  urlDoSite: string;
  titulo: string;
  resumo: string;
  tipo: string;
  data: string;
  link: string;
  capa?: { url: string; alt: string } | undefined;
};

export function emailDoPost(d: DadosDoEmail): string {
  const fonte = "Arial, Helvetica, sans-serif";
  const capa = d.capa
    ? `<tr><td style="padding:0"><a href="${escapar(d.link)}"><img src="${escapar(d.capa.url)}" alt="${escapar(d.capa.alt)}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border:0" /></a></td></tr>`
    : "";

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapar(d.titulo)}</title>
</head>
<body style="margin:0;padding:0;background:${cores.fundo}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${cores.fundo}">
<tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid ${cores.borda};border-radius:16px;overflow:hidden">
<tr><td style="padding:24px 32px;border-bottom:4px solid ${cores.laranja}">
<a href="${escapar(d.urlDoSite)}"><img src="${escapar(d.urlDoSite)}/img/logo-inav-header.png" alt="Instituto Nair Valadares" height="56" style="display:block;height:56px;width:auto;border:0" /></a>
</td></tr>
${capa}
<tr><td style="padding:32px 32px 8px;font-family:${fonte}">
<p style="margin:0 0 12px;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${cores.laranja}">${escapar(d.tipo)} · ${escapar(d.data)}</p>
<h1 style="margin:0 0 16px;font-size:26px;line-height:1.2;color:${cores.azulProfundo}">${escapar(d.titulo)}</h1>
<p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:${cores.tinta}">${escapar(d.resumo)}</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:${cores.azul}">
<a href="${escapar(d.link)}" style="display:inline-block;padding:14px 28px;font-family:${fonte};font-size:14px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#FFFFFF;text-decoration:none">Ler a publicação completa</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:32px;font-family:${fonte};font-size:12px;line-height:1.6;color:${cores.textoSecundario}">
Você recebe este e-mail porque se inscreveu na newsletter do Instituto Nair Valadares.<br />
<a href="{{ unsubscribe }}" style="color:${cores.textoSecundario}">Não quero mais receber estes e-mails</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}
