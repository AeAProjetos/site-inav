# Newsletter do blog

Quem se inscreve no site recebe um e-mail a cada publicação nova do blog. A lista e os envios
ficam no [Brevo](https://www.brevo.com). O código está em `src/lib/brevo.ts`,
`src/lib/newsletter.ts`, `src/lib/email-do-post.ts` e `src/routes/api/newsletter/novo-post.ts`.

## Como funciona

1. A pessoa preenche o formulário no blog ou no rodapé e marca a autorização.
2. O Brevo manda um e-mail de confirmação. Ela só entra na lista depois de clicar no link, que
   leva para `/newsletter/confirmada`.
3. A equipe publica um post no painel do Sanity com "Enviar por e-mail aos inscritos" marcado.
4. O Sanity avisa o site (webhook). O site confere a assinatura do aviso, lê o post de novo no
   Sanity e cria a campanha no Brevo: envia na hora ou agenda para a data do post, se for futura.
5. Cada post é enviado uma vez só. O nome da campanha leva o identificador do post, e o site
   confere as campanhas recentes antes de criar outra.

## Configuração (uma vez)

### 1. Brevo

O ideal é criar a conta com um e-mail do INAV, para a conta ser da instituição.

1. Crie a conta gratuita em brevo.com.
2. **Remetente:** em Remetentes, domínios e IPs, adicione e valide o e-mail que vai aparecer como
   remetente (ex.: contato@inav.org.br). Autenticar o domínio inav.org.br (DKIM e DMARC) evita
   que os e-mails caiam no spam. Isso pede acesso ao DNS do domínio.
3. **Lista:** em Contatos > Listas, crie a lista "Newsletter do site" e anote o número (ID).
4. **E-mail de confirmação:** em Modelos, crie um modelo a partir do modelo padrão de
   "Double opt-in" (ele já tem o link de confirmação `{{ doubleoptin }}`). Anote o número (ID).
5. **Chave da API:** em Configurações > Chaves SMTP e API, gere uma chave.

O plano gratuito envia até 300 e-mails por dia. Se a lista passar disso, cada post vai precisar
de mais de um dia para chegar a todos, ou de um plano pago.

### 2. Variáveis na Vercel

Na conta do INAV, criada em 26/10/2026 com o e-mail do projeto, a lista "Newsletter do site" é a **2** e o modelo "Confirmação da newsletter" é o **1**. O modelo tem a tag `optin` e o botão com o link de double opt-in.

Em Vercel > Project > Settings > Environment Variables (ambiente Production):

| Variável | Valor |
|---|---|
| `BREVO_API_KEY` | a chave da API |
| `BREVO_LISTA_ID` | o número da lista |
| `BREVO_MODELO_CONFIRMACAO_ID` | o número do modelo de confirmação |
| `BREVO_REMETENTE_EMAIL` | o e-mail validado como remetente |
| `BREVO_REMETENTE_NOME` | `Instituto Nair Valadares` |
| `SANITY_WEBHOOK_SECRET` | um texto aleatório e longo, o mesmo do passo 3 |
| `SITE_URL` | `https://site-inav.vercel.app` até o domínio próprio funcionar, depois `https://inav.org.br` |

Depois de salvar, faça um novo deploy para as variáveis valerem. Sem `BREVO_API_KEY` e
`BREVO_LISTA_ID`, o formulário responde que as inscrições ainda não estão abertas.

### 3. Aviso (webhook) no Sanity

Em sanity.io/manage > projeto INAV > API > Webhooks > Create webhook:

| Campo | Valor |
|---|---|
| Name | Newsletter do blog |
| URL | `https://site-inav.vercel.app/api/newsletter/novo-post` (trocar pelo domínio próprio depois) |
| Dataset | production |
| Trigger on | só **Create** |
| Filter | `_type == "post"` |
| Projection | `{_id}` |
| HTTP method | POST |
| Drafts | desligado |
| Secret | o mesmo texto de `SANITY_WEBHOOK_SECRET` |

Só crie o aviso depois que o blog estiver no ar, senão o Sanity chama um endereço que ainda não
existe.

## Testar na máquina, sem enviar e-mail

```
SANITY_DATASET=development NEWSLETTER_SIMULAR=1 SANITY_WEBHOOK_SECRET=segredo-de-teste SITE_URL=http://localhost:8082 bun run dev -- --port 8082
```

Com `NEWSLETTER_SIMULAR=1`, nada vai para o Brevo: a inscrição e a campanha só aparecem no
terminal, e a rota do aviso devolve o HTML do e-mail para conferir.

## Limites conhecidos

- Mudar a data de um post agendado depois de publicado não muda a data do e-mail. Ajuste a
  campanha direto no Brevo.
- Despublicar e publicar de novo o mesmo post não reenvia, desde que a campanha anterior esteja
  entre as 100 mais recentes do Brevo.
- O formulário tem proteção simples contra robôs (campo escondido). Se aparecerem inscrições
  falsas em massa, dá para acrescentar uma verificação como o Cloudflare Turnstile.
