import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site-config";

/**
 * Política de Privacidade (INAV-028). Escrita a partir da política de 2022 do site antigo, mas
 * descrevendo o que o site novo faz de fato: formulário (Formspree), newsletter (Brevo, com dupla
 * confirmação), sacola do bazar só no navegador, sem cookies de rastreamento.
 * O texto aguarda a aprovação do INAV (pedido P07 do cronograma). Ao mudar o que o site coleta,
 * atualizar esta página e a data abaixo.
 */
const ATUALIZADA_EM = { iso: "2026-10-30", texto: "30 de outubro de 2026" };

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Como o Instituto Nair Valadares trata os dados de quem visita o site, escreve pelo formulário de contato ou assina a newsletter, conforme a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Quais dados o site do INAV recebe, para quê, com quem são compartilhados e como exercer seus direitos.",
      },
    ],
  }),
  component: PoliticaDePrivacidade,
});

function Titulo({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-12 text-2xl font-extrabold uppercase leading-[1.1] text-brand-blue-deep text-balance-pretty sm:text-3xl">
      {children}
    </h2>
  );
}

function Subtitulo({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-xl font-bold leading-snug text-brand-blue-deep">{children}</h3>;
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-5 leading-8 text-foreground/90">{children}</p>;
}

function Lista({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-5 list-disc space-y-2 pl-6 leading-8 text-foreground/90 marker:text-brand-green">
      {children}
    </ul>
  );
}

function LinkExterno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
    >
      {children}
    </a>
  );
}

function EmailDoInav() {
  return (
    <a
      href={`mailto:${site.email}`}
      className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
    >
      {site.email}
    </a>
  );
}

function PoliticaDePrivacidade() {
  return (
    <>
      <PageHero
        eyebrow="Privacidade"
        title="Política de"
        highlight="privacidade"
        description="Como o INAV cuida dos dados de quem visita o site, escreve para a gente ou assina a newsletter."
      />

      <div className="bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            Última atualização: <time dateTime={ATUALIZADA_EM.iso}>{ATUALIZADA_EM.texto}</time>
          </p>

          <P>
            O {site.name} ({site.shortName}), CNPJ {site.cnpj}, é o responsável pelos dados pessoais
            tratados neste site. Esta página explica, em linguagem simples, quais dados recebemos,
            para quê, com quem eles são compartilhados e como você pode exercer seus direitos,
            conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
          </P>

          <Titulo>Em poucas palavras</Titulo>
          <Lista>
            <li>
              O site não usa cookies de publicidade nem ferramentas que acompanham as suas visitas.
            </li>
            <li>
              Só recebemos os dados que você mesmo envia: pelo formulário de contato e pela
              inscrição na newsletter.
            </li>
            <li>Não vendemos seus dados nem os usamos para outros fins.</li>
            <li>Você pode pedir para ver, corrigir ou apagar seus dados quando quiser.</li>
          </Lista>

          <Titulo>Quais dados recebemos e para quê</Titulo>

          <Subtitulo>Formulário de contato</Subtitulo>
          <P>
            Recebemos o seu nome, o seu e-mail, o motivo do contato e a mensagem. Usamos esses dados
            só para responder e acompanhar o seu pedido, seja uma doação, uma parceria, uma visita
            ou uma dúvida. A base legal é o legítimo interesse do INAV em atender quem o procura
            (art. 7º, IX, da LGPD).
          </P>

          <Subtitulo>Newsletter</Subtitulo>
          <P>
            Recebemos só o seu e-mail, para enviar cada publicação nova do blog. A base legal é o
            seu consentimento (art. 7º, I, da LGPD): você marca a caixa de autorização e confirma a
            inscrição pelo link que enviamos por e-mail. Para cancelar, basta clicar no link que
            aparece no fim de cada mensagem.
          </P>

          <Subtitulo>Bazar</Subtitulo>
          <P>
            A sacola do bazar fica guardada só no seu navegador. Ao finalizar, o pedido vira uma
            mensagem de WhatsApp que você mesmo envia ao INAV. O site não guarda pedidos, nomes nem
            dados de pagamento. A conversa no WhatsApp segue a política de privacidade do próprio
            WhatsApp.
          </P>

          <Subtitulo>Doações</Subtitulo>
          <P>
            O site só mostra a chave Pix do INAV. A doação é feita no aplicativo do seu banco, e o
            site não recebe nem guarda dados bancários.
          </P>

          <Subtitulo>Navegação</Subtitulo>
          <P>
            Como em qualquer site, o serviço de hospedagem registra dados técnicos de acesso, como o
            endereço IP, a data, a hora e a página visitada. Esses registros servem apenas para a
            segurança e o bom funcionamento do site.
          </P>

          <P>
            Enviar dados é sempre opcional. Sem eles, só não conseguimos responder ao seu contato ou
            enviar a newsletter.
          </P>

          <Titulo>Cookies e dados no navegador</Titulo>
          <P>
            O site não usa cookies de publicidade nem de estatísticas de visita. A única informação
            guardada no seu navegador é a sacola do bazar, para os itens não sumirem quando você
            muda de página. Você pode apagá-la limpando os dados deste site nas configurações do
            navegador.
          </P>
          <P>
            Os vídeos do site são do YouTube, no modo de privacidade aprimorada, e só carregam
            quando você clica para assistir. A partir daí, o YouTube pode usar os próprios cookies.
          </P>

          <Titulo>Com quem os dados são compartilhados</Titulo>
          <P>
            Para o site funcionar, usamos alguns serviços de outras empresas. Eles tratam os dados
            apenas para prestar o serviço ao INAV:
          </P>
          <Lista>
            <li>
              <strong>Formspree</strong>: entrega as mensagens do formulário de contato por e-mail à
              equipe do INAV.
            </li>
            <li>
              <strong>Brevo</strong>: guarda a lista de e-mails da newsletter e faz os envios.
            </li>
            <li>
              <strong>Vercel</strong>: hospeda o site.
            </li>
            <li>
              <strong>Google Fonts</strong>: fornece as fontes do site. Ao abrir uma página, o seu
              navegador se conecta aos servidores do Google.
            </li>
            <li>
              <strong>YouTube</strong>: só quando você abre um vídeo.
            </li>
          </Lista>
          <P>
            Alguns desses serviços ficam fora do Brasil. Nesses casos, a transferência segue as
            regras da LGPD para o envio de dados a outros países. Fora isso, só compartilhamos dados
            quando a lei ou uma autoridade exigir.
          </P>

          <Titulo>Crianças</Titulo>
          <P>
            O site não coleta dados de crianças. As fotos das crianças atendidas pelo INAV só são
            publicadas com a autorização dos pais ou responsáveis.
          </P>

          <Titulo>Por quanto tempo guardamos</Titulo>
          <Lista>
            <li>
              Mensagens do formulário: pelo tempo necessário para responder e acompanhar o seu
              pedido.
            </li>
            <li>E-mail da newsletter: até você cancelar a inscrição.</li>
          </Lista>

          <Titulo>Seus direitos</Titulo>
          <P>Pela LGPD, você pode pedir ao INAV, a qualquer momento:</P>
          <Lista>
            <li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
            <li>a correção de dados incompletos, errados ou desatualizados;</li>
            <li>
              a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos;
            </li>
            <li>a eliminação dos dados tratados com o seu consentimento;</li>
            <li>a informação sobre com quem compartilhamos seus dados;</li>
            <li>a revogação do consentimento, como cancelar a newsletter;</li>
            <li>a portabilidade dos seus dados a outro serviço.</li>
          </Lista>
          <P>
            Para fazer um pedido, escreva para <EmailDoInav />. Respondemos em até 15 dias. Você
            também pode reclamar à Autoridade Nacional de Proteção de Dados (
            <LinkExterno href="https://www.gov.br/anpd">ANPD</LinkExterno>).
          </P>

          <Titulo>Segurança</Titulo>
          <P>
            Todo o site usa conexão segura (HTTPS). O acesso às mensagens e à lista da newsletter
            fica restrito às pessoas da equipe que precisam deles para responder ou enviar os
            e-mails.
          </P>

          <Titulo>Links para outros sites</Titulo>
          <P>
            O site tem links para outros serviços, como Instagram, WhatsApp e Google Drive, onde
            ficam os documentos da{" "}
            <Link
              to="/transparencia"
              className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
            >
              Transparência
            </Link>
            . Esses serviços têm as próprias políticas de privacidade, e o INAV não controla o que
            acontece neles.
          </P>

          <Titulo>Mudanças nesta política</Titulo>
          <P>
            Podemos atualizar esta política quando o site mudar. A data da última atualização fica
            no topo desta página.
          </P>

          <Titulo>Fale com a gente</Titulo>
          <P>
            Dúvidas sobre os seus dados? Escreva para <EmailDoInav /> ou use a página de{" "}
            <Link
              to="/contato"
              className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
            >
              Contato
            </Link>
            .
          </P>
        </article>
      </div>
    </>
  );
}
