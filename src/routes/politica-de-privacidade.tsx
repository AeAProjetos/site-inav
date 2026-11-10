import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site-config";

/**
 * Política de Privacidade (INAV-028). Escrita a partir da política de 2022 do site antigo, mas
 * descrevendo o que o site novo faz de fato: formulários (Formspree), newsletter (Brevo, com dupla
 * confirmação), sacola do bazar só no navegador, imagens do blog pela Sanity, sem cookies de
 * rastreamento. Versão oficial desde 10/11/2026; os artigos citados foram conferidos no texto das
 * leis no Planalto. Ao mudar o que o site coleta, atualizar esta página e a data abaixo.
 */
const ATUALIZADA_EM = { iso: "2026-11-10", texto: "10 de novembro de 2026" };

const LEIS = {
  constituicao: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
  lgpd: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm",
  marcoCivil: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
  eca: "https://www.planalto.gov.br/ccivil_03/leis/l8069.htm",
  anpd: "https://www.gov.br/anpd",
} as const;

/** Ordem das seções: alimenta o índice do topo e os títulos, para os dois nunca divergirem. */
const SECOES = [
  { id: "em-poucas-palavras", titulo: "Em poucas palavras" },
  { id: "quem-cuida", titulo: "Quem cuida dos seus dados" },
  { id: "dados", titulo: "Quais dados recebemos e para quê" },
  { id: "cookies", titulo: "Cookies e dados no navegador" },
  { id: "compartilhamento", titulo: "Com quem os dados são compartilhados" },
  { id: "criancas", titulo: "Crianças e adolescentes" },
  { id: "prazos", titulo: "Por quanto tempo guardamos" },
  { id: "direitos", titulo: "Seus direitos" },
  { id: "seguranca", titulo: "Segurança e incidentes" },
  { id: "leis", titulo: "As leis e os princípios que seguimos" },
  { id: "glossario", titulo: "Palavras que usamos" },
  { id: "links", titulo: "Links para outros sites" },
  { id: "mudancas", titulo: "Mudanças nesta política" },
  { id: "fale-com-a-gente", titulo: "Fale com a gente" },
] as const;

type SecaoId = (typeof SECOES)[number]["id"];

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Como o Instituto Nair Valadares trata os dados de quem visita o site, usa os formulários ou assina a newsletter, conforme a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Quais dados o site do INAV recebe, para quê, com quem são compartilhados, por quanto tempo ficam guardados e como exercer seus direitos.",
      },
    ],
  }),
  component: PoliticaDePrivacidade,
});

function Titulo({ id }: { id: SecaoId }) {
  const secao = SECOES.find((s) => s.id === id);
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-28 text-2xl font-extrabold uppercase leading-[1.1] text-brand-blue-deep text-balance-pretty sm:text-3xl"
    >
      {secao?.titulo}
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

function Termo({ nome, children }: { nome: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <dt className="font-bold text-brand-blue-deep">{nome}</dt>
      <dd className="mt-1 leading-8 text-foreground/90">{children}</dd>
    </div>
  );
}

const classeLink =
  "font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep";

function LinkExterno({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classeLink}>
      {children}
    </a>
  );
}

function LinkSecao({ id, children }: { id: SecaoId; children: ReactNode }) {
  return (
    <a href={`#${id}`} className={classeLink}>
      {children}
    </a>
  );
}

function EmailDoInav() {
  return (
    <a href={`mailto:${site.email}`} className={classeLink}>
      {site.email}
    </a>
  );
}

function PoliticaDePrivacidade() {
  const { address } = site;

  return (
    <>
      <PageHero
        eyebrow="Privacidade"
        title="Política de"
        highlight="privacidade"
        description="Como o INAV cuida dos dados de quem visita o site, escreve para a gente, participa do Amigos INAV ou assina a newsletter."
      />

      <div className="bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-sm text-muted-foreground">
            Última atualização: <time dateTime={ATUALIZADA_EM.iso}>{ATUALIZADA_EM.texto}</time>
          </p>

          <P>
            Esta política vale para o site do {site.name} ({site.shortName}). Ela explica, em
            linguagem simples, quais dados pessoais recebemos, para quê, com quem eles são
            compartilhados, por quanto tempo ficam guardados e como você pode exercer seus direitos,
            conforme a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, a LGPD).
          </P>

          <nav aria-labelledby="nesta-pagina" className="mt-8 border-y border-border py-6">
            <p
              id="nesta-pagina"
              className="text-sm font-bold uppercase tracking-[0.18em] text-brand-orange"
            >
              Nesta página
            </p>
            <ol className="mt-4 list-decimal pl-5 text-sm leading-6 marker:text-muted-foreground sm:columns-2 sm:gap-10">
              {SECOES.map((secao) => (
                <li key={secao.id} className="mb-2 break-inside-avoid">
                  <a
                    href={`#${secao.id}`}
                    className="text-brand-blue underline-offset-4 hover:text-brand-blue-deep hover:underline"
                  >
                    {secao.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Titulo id="em-poucas-palavras" />
          <Lista>
            <li>
              O site não usa cookies de publicidade nem ferramentas que acompanham as suas visitas.
            </li>
            <li>
              Só recebemos os dados que você mesmo envia: pelo formulário de contato, pelo
              formulário do Amigos INAV e pela inscrição na newsletter.
            </li>
            <li>
              Usamos esses dados só para o que está explicado aqui. Não vendemos, alugamos nem
              emprestamos seus dados a ninguém.
            </li>
            <li>O site não pede dados de crianças nem dados sensíveis, como saúde ou religião.</li>
            <li>
              Você pode pedir para ver, corrigir ou apagar seus dados quando quiser, sem pagar nada.
            </li>
          </Lista>

          <Titulo id="quem-cuida" />
          <P>
            O responsável pelos dados pessoais tratados neste site, que a LGPD chama de controlador,
            é o {site.name}, organização da sociedade civil sem fins lucrativos, inscrita no CNPJ
            sob o nº {site.cnpj}, com sede na {address.street}, {address.city} – {address.state},
            CEP {address.zip}.
          </P>
          <P>
            Os pedidos e as dúvidas sobre dados pessoais são atendidos pela equipe do INAV pelo
            e-mail <EmailDoInav />, que é o nosso canal de comunicação com os titulares de dados.
          </P>
          <P>
            Para o site funcionar, algumas empresas tratam dados em nome do INAV, como o serviço que
            entrega as mensagens dos formulários. A LGPD chama essas empresas de operadoras. Elas
            estão listadas em{" "}
            <LinkSecao id="compartilhamento">Com quem os dados são compartilhados</LinkSecao>.
          </P>

          <Titulo id="dados" />

          <Subtitulo>Formulário de contato</Subtitulo>
          <P>
            Recebemos o seu nome, o seu e-mail, o motivo do contato e a mensagem. Usamos esses dados
            só para responder e acompanhar o seu pedido, seja uma doação, uma parceria, uma visita
            ou uma dúvida. A base legal é o legítimo interesse do INAV em atender quem o procura
            (art. 7º, IX, da LGPD).
          </P>

          <Subtitulo>Programa Amigos INAV</Subtitulo>
          <P>
            Recebemos o seu nome ou o da sua empresa, o seu e-mail, o seu telefone ou WhatsApp, se
            você é pessoa ou empresa e a mensagem, se escrever uma. Usamos esses dados só para falar
            com você sobre a sua participação no programa. A base legal é o seu consentimento (art.
            7º, I, da LGPD): você marca a caixa de autorização ao enviar o formulário.
          </P>
          <P>
            O seu nome ou a sua marca só aparecem no mural de apoiadores se você marcar a
            autorização própria para isso. Essa autorização é opcional e pode ser retirada a
            qualquer momento.
          </P>
          <P>
            Se você combinar um apoio mensal, os dados necessários para registrar as suas
            contribuições passam a fazer parte dos registros financeiros do INAV, que as leis
            contábeis e fiscais obrigam a manter (art. 7º, II, da LGPD).
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
            dados de pagamento.
          </P>
          <P>
            Pelo WhatsApp, o INAV recebe o seu nome e o seu número e os usa só para combinar o seu
            pedido. A base legal é o atendimento a um pedido feito por você (art. 7º, V, da LGPD). A
            conversa segue também a política de privacidade do próprio WhatsApp.
          </P>

          <Subtitulo>Doações</Subtitulo>
          <P>
            O site só mostra a chave Pix do INAV. A doação é feita no aplicativo do seu banco, e o
            site não recebe nem guarda dados bancários.
          </P>
          <P>
            Depois da doação, o extrato do INAV mostra os dados que o banco informa, como o nome de
            quem doou. Eles ficam nos registros financeiros do INAV, pelo tempo que as leis
            contábeis e fiscais exigem (art. 7º, II, da LGPD).
          </P>

          <Subtitulo>Navegação</Subtitulo>
          <P>
            Como em qualquer site, o serviço de hospedagem registra dados técnicos de acesso, como o
            endereço IP, a data, a hora e a página visitada. Esses registros servem apenas para a
            segurança e o bom funcionamento do site. A base legal é o legítimo interesse do INAV em
            manter o site seguro e no ar (art. 7º, IX, da LGPD).
          </P>

          <Subtitulo>Dados sensíveis</Subtitulo>
          <P>
            A LGPD chama de sensíveis os dados sobre origem racial ou étnica, religião, opinião
            política, filiação a sindicato ou a organização religiosa, filosófica ou política,
            saúde, vida sexual, dados genéticos e biométricos (art. 5º, II). O site não pede nenhum
            deles. Pedimos que você também não os escreva nas mensagens.
          </P>

          <P>
            Enviar dados é sempre opcional. Se você preferir não enviar, a única consequência é que
            não conseguiremos responder ao seu contato, falar sobre o Amigos INAV ou enviar a
            newsletter.
          </P>

          <Titulo id="cookies" />
          <P>
            O site não usa cookies de publicidade nem de estatísticas de visita. Por isso não há
            aviso de cookies: não existem cookies opcionais para você aceitar ou recusar. A única
            informação guardada no seu navegador é a sacola do bazar, para os itens não sumirem
            quando você muda de página. Você pode apagá-la limpando os dados deste site nas
            configurações do navegador.
          </P>
          <P>
            Os vídeos do site são do YouTube, no modo de privacidade aprimorada, e só carregam
            quando você clica para assistir. A partir daí, o YouTube pode usar os próprios cookies.
          </P>

          <Titulo id="compartilhamento" />
          <P>Para o site funcionar, usamos alguns serviços de outras empresas:</P>
          <Lista>
            <li>
              <strong>Formspree</strong>: entrega as mensagens dos formulários do site por e-mail à
              equipe do INAV.
            </li>
            <li>
              <strong>Brevo</strong>: guarda a lista de e-mails da newsletter e faz os envios.
            </li>
            <li>
              <strong>Vercel</strong>: hospeda o site.
            </li>
            <li>
              <strong>Sanity</strong>: guarda os textos e as imagens do blog. Ao abrir o blog, o seu
              navegador baixa as imagens dos servidores da Sanity.
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
            A Formspree, a Brevo, a Vercel e a Sanity tratam os dados só para prestar o serviço ao
            INAV. O Google e o YouTube seguem também as próprias políticas de privacidade.
          </P>
          <P>
            Esses serviços ficam fora do Brasil, principalmente nos Estados Unidos e na União
            Europeia. Nesses casos, a transferência segue as regras da LGPD para o envio de dados a
            outros países (arts. 33 a 36) e a Resolução CD/ANPD nº 19/2024, que regulamenta o
            assunto.
          </P>
          <P>
            Fora isso, só compartilhamos dados quando uma lei, uma decisão judicial ou uma
            autoridade exigir.
          </P>

          <Titulo id="criancas" />
          <P>
            A LGPD determina que os dados de crianças e adolescentes sejam tratados sempre no melhor
            interesse deles (art. 14). O Estatuto da Criança e do Adolescente garante o direito ao
            respeito, que inclui a preservação da imagem e da identidade (art. 17). No site, isso
            quer dizer:
          </P>
          <Lista>
            <li>
              O site é feito para adultos e não pede dados de crianças, que o ECA define como as
              pessoas de até 12 anos incompletos.
            </li>
            <li>
              Se soubermos que uma criança enviou dados pelo site sem a autorização dos pais ou
              responsáveis, vamos apagá-los.
            </li>
            <li>
              As fotos das crianças atendidas só são publicadas com a autorização dos pais ou
              responsáveis, e o site não mostra o nome delas junto às fotos.
            </li>
            <li>
              Pais e responsáveis podem pedir a retirada de uma foto a qualquer momento, pelo e-mail{" "}
              <EmailDoInav />.
            </li>
          </Lista>
          <P>
            Os dados das crianças e das famílias atendidas, como os da matrícula, não passam pelo
            site. Eles são tratados pelo INAV no dia a dia do atendimento.
          </P>

          <Titulo id="prazos" />
          <Lista>
            <li>
              Mensagens do formulário de contato: pelo tempo necessário para responder e acompanhar
              o seu pedido.
            </li>
            <li>
              Dados do Amigos INAV: enquanto durar o seu apoio ou até você pedir para apagar,
              ressalvado o que a lei obrigar a guardar.
            </li>
            <li>E-mail da newsletter: até você cancelar a inscrição.</li>
            <li>
              Registros de doações e contribuições: pelo prazo que as leis contábeis e fiscais
              exigem.
            </li>
            <li>
              Registros técnicos de acesso: por pouco tempo, conforme as regras do serviço de
              hospedagem.
            </li>
          </Lista>
          <P>
            O Formspree guarda uma cópia das mensagens dos formulários por tempo limitado, conforme
            o plano contratado. A cópia que chega por e-mail fica com a equipe do INAV pelos prazos
            acima.
          </P>
          <P>
            Quando o prazo acaba, os dados são apagados ou anonimizados, ou seja, deixam de
            identificar você. A LGPD só permite guardá-los por mais tempo em casos como o
            cumprimento de uma obrigação legal (arts. 15 e 16).
          </P>

          <Titulo id="direitos" />
          <P>Pela LGPD (art. 18), você pode pedir ao INAV, a qualquer momento:</P>
          <Lista>
            <li>a confirmação de que tratamos seus dados;</li>
            <li>o acesso aos seus dados;</li>
            <li>a correção de dados incompletos, errados ou desatualizados;</li>
            <li>
              a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou
              tratados em desacordo com a lei;
            </li>
            <li>a portabilidade dos seus dados a outro serviço, conforme as regras da ANPD;</li>
            <li>
              a eliminação dos dados tratados com o seu consentimento, menos os que a lei obriga a
              guardar;
            </li>
            <li>
              a informação sobre as entidades públicas e privadas com quem compartilhamos dados;
            </li>
            <li>
              a informação sobre a possibilidade de não dar o consentimento e sobre o que acontece
              se você não der;
            </li>
            <li>
              a revogação do consentimento, como cancelar a newsletter ou tirar o seu nome do mural.
            </li>
          </Lista>
          <P>
            Você também pode se opor a um tratamento feito sem o seu consentimento, como o do
            formulário de contato, se ele não estiver de acordo com a LGPD (art. 18, § 2º). O site
            não toma decisões automáticas sobre você.
          </P>

          <Subtitulo>Como fazer um pedido</Subtitulo>
          <P>
            Escreva para <EmailDoInav /> dizendo o que você quer. Para proteger seus dados, podemos
            pedir uma confirmação de que o pedido é mesmo seu. O atendimento é gratuito (art. 18, §
            5º).
          </P>
          <P>
            Confirmamos de forma simples se tratamos os seus dados. Se você pedir uma declaração
            completa, com a origem dos dados e a finalidade do uso, ela sai em até 15 dias, contados
            do seu pedido (art. 19).
          </P>
          <P>
            Retirar uma autorização é gratuito e tão fácil quanto dar. O que foi feito enquanto ela
            valia continua válido (art. 8º, § 5º).
          </P>
          <P>
            Se não ficar satisfeito com a nossa resposta, você pode reclamar à Autoridade Nacional
            de Proteção de Dados (<LinkExterno href={LEIS.anpd}>ANPD</LinkExterno>) ou a um órgão de
            defesa do consumidor, como o Procon (art. 18, §§ 1º e 8º).
          </P>

          <Titulo id="seguranca" />
          <P>
            Todo o site usa conexão segura (HTTPS). O acesso às mensagens, à lista da newsletter e
            aos dados do Amigos INAV fica restrito às pessoas da equipe que precisam deles para
            responder, enviar os e-mails ou cuidar das contribuições. Os formulários têm proteção
            contra envios automáticos.
          </P>
          <P>
            O site nunca pede senhas nem dados de cartão ou de conta bancária. Desconfie de qualquer
            mensagem em nome do INAV que peça esses dados.
          </P>
          <P>
            Se acontecer um incidente de segurança que possa trazer risco ou dano relevante a você,
            o INAV vai comunicar a ANPD e as pessoas afetadas, como manda o art. 48 da LGPD, nos
            prazos da Resolução CD/ANPD nº 15/2024.
          </P>

          <Titulo id="leis" />
          <P>O cuidado com os dados no site segue estas normas:</P>
          <Lista>
            <li>
              a <LinkExterno href={LEIS.constituicao}>Constituição Federal</LinkExterno>, que desde
              2022 garante a proteção dos dados pessoais, inclusive nos meios digitais, como direito
              fundamental (art. 5º, LXXIX);
            </li>
            <li>
              a <LinkExterno href={LEIS.lgpd}>Lei Geral de Proteção de Dados Pessoais</LinkExterno>{" "}
              (Lei nº 13.709/2018), a principal lei sobre o tema;
            </li>
            <li>
              o <LinkExterno href={LEIS.marcoCivil}>Marco Civil da Internet</LinkExterno> (Lei nº
              12.965/2014), que garante informações claras sobre o uso dos seus dados e proíbe
              repassá-los a terceiros sem o seu consentimento, fora os casos previstos em lei (art.
              7º);
            </li>
            <li>
              o <LinkExterno href={LEIS.eca}>Estatuto da Criança e do Adolescente</LinkExterno> (Lei
              nº 8.069/1990), que protege a imagem e a identidade das crianças (art. 17);
            </li>
            <li>
              as resoluções da <LinkExterno href={LEIS.anpd}>ANPD</LinkExterno>, como a de
              comunicação de incidentes de segurança (nº 15/2024) e a de transferência de dados a
              outros países (nº 19/2024).
            </li>
          </Lista>

          <Subtitulo>Os princípios da LGPD</Subtitulo>
          <P>
            A LGPD lista dez princípios que valem para todo uso de dados pessoais (art. 6º). No site
            do INAV, eles significam:
          </P>
          <Lista>
            <li>
              <strong>Finalidade</strong>: usamos seus dados só para os fins explicados nesta
              página.
            </li>
            <li>
              <strong>Adequação</strong>: o uso combina com o que foi informado a você.
            </li>
            <li>
              <strong>Necessidade</strong>: pedimos só o mínimo para cada finalidade.
            </li>
            <li>
              <strong>Livre acesso</strong>: você pode consultar, de graça e com facilidade, quais
              dados temos e como os usamos.
            </li>
            <li>
              <strong>Qualidade dos dados</strong>: mantemos seus dados corretos e atualizados.
            </li>
            <li>
              <strong>Transparência</strong>: explicamos tudo de forma clara, como nesta página.
            </li>
            <li>
              <strong>Segurança</strong>: protegemos os dados contra acessos indevidos, perdas e
              vazamentos.
            </li>
            <li>
              <strong>Prevenção</strong>: agimos antes para evitar danos.
            </li>
            <li>
              <strong>Não discriminação</strong>: nunca usamos dados para discriminar ninguém.
            </li>
            <li>
              <strong>Responsabilização e prestação de contas</strong>: mostramos o que fazemos para
              cumprir a lei.
            </li>
          </Lista>

          <Titulo id="glossario" />
          <P>Os termos abaixo são definidos pela LGPD (art. 5º):</P>
          <dl>
            <Termo nome="Dado pessoal">
              Qualquer informação que identifica você ou permite identificar, como o nome, o e-mail
              ou o telefone.
            </Termo>
            <Termo nome="Dado pessoal sensível">
              Dado sobre origem racial ou étnica, religião, opinião política, filiação a sindicato
              ou a organização religiosa, filosófica ou política, saúde, vida sexual, dado genético
              ou biométrico.
            </Termo>
            <Termo nome="Titular">A pessoa a quem os dados se referem, ou seja, você.</Termo>
            <Termo nome="Tratamento">
              Qualquer uso de dados, como coletar, guardar, consultar, compartilhar ou apagar.
            </Termo>
            <Termo nome="Controlador">Quem decide como os dados são usados. Aqui, o INAV.</Termo>
            <Termo nome="Operador">
              Quem trata dados em nome do controlador, como os serviços que fazem o site funcionar.
            </Termo>
            <Termo nome="Consentimento">
              A sua autorização livre, informada e inequívoca para um uso específico dos seus dados.
            </Termo>
            <Termo nome="Anonimização">
              O processo que faz um dado deixar de identificar você.
            </Termo>
            <Termo nome="ANPD">
              A Autoridade Nacional de Proteção de Dados, órgão federal que fiscaliza o cumprimento
              da LGPD.
            </Termo>
          </dl>

          <Titulo id="links" />
          <P>
            O site tem links para outros serviços, como Instagram, WhatsApp e Google Drive, onde
            ficam os documentos da{" "}
            <Link to="/transparencia" className={classeLink}>
              Transparência
            </Link>
            . Esses serviços têm as próprias políticas de privacidade, e o INAV não controla o que
            acontece neles.
          </P>

          <Titulo id="mudancas" />
          <P>
            Podemos atualizar esta política quando o site ou a lei mudarem. A data da última
            atualização fica no topo desta página. Se uma mudança alterar o uso de dados que você
            autorizou, avisaremos antes, e você poderá retirar a autorização.
          </P>
          <P>Esta política segue as leis brasileiras.</P>

          <Titulo id="fale-com-a-gente" />
          <P>
            Dúvidas sobre os seus dados? Escreva para <EmailDoInav /> ou use a página de{" "}
            <Link to="/contato" className={classeLink}>
              Contato
            </Link>
            .
          </P>
        </article>
      </div>
    </>
  );
}
