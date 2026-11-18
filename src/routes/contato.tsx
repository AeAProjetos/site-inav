import { useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Baby,
  Check,
  ChevronRight,
  CircleCheck,
  Clock,
  Copy,
  FileText,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Pending } from "@/components/Pending";
import { SectionHeading } from "@/components/SectionHeading";
import { Cena, Ilustracao } from "@/components/Ilustracao";
import { ehSlugDeAssunto, type SlugDoAssunto } from "@/lib/contact-motivos";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { aoClicar, rolarAte } from "@/lib/rolagem";
import {
  ethicsMailto,
  fullAddress,
  instagramLink,
  landlineLink,
  mapsLink,
  site,
  visitWhatsappLink,
  whatsappLink,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

/*
 * Página conforme a v2 da copy e do layout da KIM (11/11/2026), em Refinamento/Contato.
 * Adaptado: botões do topo brancos e sem laranja, canais num painel com divisórias, assuntos em
 * cards verticais com ícone solto e links azuis (18/11),
 * envio real pelo Formspree, sem prazo de resposta, mapa sem incorporação e Canal de Ética por
 * e-mail (sem rota /etica e sem a promessa de anonimato, que só um formulário próprio daria).
 * Os pontos que dependem do INAV estão marcados com o componente Pending.
 */

const FOTOS = "/img/contato";

type ContatoSearch = { assunto?: SlugDoAssunto | undefined };

export const Route = createFileRoute("/contato")({
  validateSearch: (search: Record<string, unknown>): ContatoSearch => {
    const assunto = search["assunto"];
    return { assunto: ehSlugDeAssunto(assunto) ? assunto : undefined };
  },
  head: () => ({
    meta: [
      { title: "Contato — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Fale com o INAV pelo WhatsApp, telefone, e-mail ou formulário. Endereço no Riacho Fundo II, horário de atendimento, visitas e Canal de Ética.",
      },
      { property: "og:title", content: "Contato — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "WhatsApp, telefone, e-mail e endereço do INAV, o caminho certo para cada assunto e o Canal de Ética.",
      },
    ],
  }),
  component: ContatoPage,
});

/** "Riacho Fundo II, Brasília" vira bairro e cidade, para o destaque do topo. */
const [bairro, cidade] = site.address.city.split(", ");

const linkDeTexto =
  "group inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-blue transition-colors hover:text-brand-blue-deep";

const setaDoLink = (
  <ArrowRight
    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  />
);

const novaAba = <span className="sr-only"> (abre em nova aba)</span>;

type Canal = {
  icone: LucideIcon;
  rotulo: string;
  valor: string;
  acao: string;
  href: string;
  externo?: boolean;
};

const canais: Canal[] = [
  {
    icone: MessageCircle,
    rotulo: "WhatsApp",
    valor: site.whatsappDisplay,
    acao: "Abrir conversa",
    href: whatsappLink,
    externo: true,
  },
  {
    icone: Phone,
    rotulo: "Telefone",
    valor: site.landline,
    acao: "Ligar",
    href: landlineLink,
  },
  {
    icone: Mail,
    rotulo: "E-mail",
    valor: site.email,
    acao: "Escrever",
    href: `mailto:${site.email}`,
  },
  {
    icone: Instagram,
    rotulo: "Instagram",
    valor: `@${site.instagram}`,
    acao: "Ver perfil",
    href: instagramLink,
    externo: true,
  },
];

function ContatoPage() {
  const { assunto: assuntoDaUrl } = Route.useSearch();
  const [assunto, setAssunto] = useState<SlugDoAssunto | "">(assuntoDaUrl ?? "");
  // Um link para /contato?assunto=... com a página já aberta troca a URL sem remontar a página:
  // o assunto acompanha a mudança.
  const [assuntoDaUrlAnterior, setAssuntoDaUrlAnterior] = useState(assuntoDaUrl);
  if (assuntoDaUrl !== assuntoDaUrlAnterior) {
    setAssuntoDaUrlAnterior(assuntoDaUrl);
    if (assuntoDaUrl) setAssunto(assuntoDaUrl);
  }

  /** Para os links que abrem o formulário com um assunto já escolhido. */
  const escreverSobre = (slug: SlugDoAssunto) =>
    aoClicar(() => {
      setAssunto(slug);
      rolarAte("formulario");
    });

  return (
    <>
      {/* 01 — Abertura */}
      <PageHero
        eyebrow="Contato"
        title="Fale com"
        highlight="o INAV"
        titleClassName="lg:text-5xl xl:text-6xl"
        description="Quer conhecer o trabalho do INAV, tirar uma dúvida sobre a educação infantil ou propor uma parceria? Escolha o canal mais adequado."
        aside={
          <img
            src={`${FOTOS}/topo-menino-no-triciclo.jpg`}
            alt="Menino do INAV brinca em um triciclo no parquinho de grama sintética."
            className="size-full object-cover object-[center_40%]"
          />
        }
        // No celular a foto vem antes do título, como no layout do designer.
        asideClassName="-order-1 aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl shadow-lift lg:order-none lg:max-w-none lg:rounded-[28px]"
        actions={
          <div>
            <div className="flex flex-wrap gap-3">
              {/* Laranja fica para as doações: aqui o botão principal é branco. */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-blue-deep shadow-lift transition-transform duration-200 hover:scale-[1.03] sm:w-auto"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Chamar no WhatsApp
                {novaAba}
              </a>
              <a
                href="#formulario"
                onClick={aoClicar(() => rolarAte("formulario"))}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/45 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white/15 sm:w-auto"
              >
                Enviar mensagem
                <ArrowDown
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6">
              <li>
                <span className="block font-display text-lg font-extrabold leading-tight text-brand-green-light">
                  {site.horario.dias}
                </span>
                <span className="text-sm text-white/75">{site.horario.horas}</span>
              </li>
              <li>
                <span className="block font-display text-lg font-extrabold leading-tight text-brand-green-light">
                  {bairro}
                </span>
                <span className="text-sm text-white/75">
                  {cidade} ({site.address.state})
                </span>
              </li>
            </ul>
          </div>
        }
      />

      {/* 02 — Canais de atendimento */}
      <section className="relative isolate overflow-hidden bg-background pb-20 pt-14 sm:pb-24 sm:pt-16">
        <Cena nome="sol-e-nuvem" className="right-[6%] top-8 w-20 lg:hidden xl:block" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Canais de atendimento"
            title="Escolha como"
            highlight="prefere falar"
            align="center"
            className="max-w-4xl"
          />
          {/* Um painel só, com linhas finas entre os canais. No celular cada canal é uma linha. */}
          <motion.ul
            variants={fadeUp}
            {...revealOnScroll}
            className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-soft sm:grid-cols-2 lg:grid-cols-4"
          >
            {canais.map(({ icone: Icone, rotulo, valor, acao, href, externo }) => (
              <li key={rotulo} className="bg-card">
                <a
                  href={href}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noopener noreferrer" : undefined}
                  className="group flex h-full items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-blue-soft/40 sm:flex-col sm:items-start sm:gap-0 sm:p-7"
                >
                  <Icone className="size-6 shrink-0 text-brand-blue" aria-hidden="true" />
                  <span className="min-w-0 flex-1 sm:mt-5 sm:flex-none">
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      {rotulo}
                    </span>
                    <span className="mt-1 block font-display text-lg font-extrabold leading-snug text-brand-blue-deep [overflow-wrap:anywhere]">
                      {valor}
                    </span>
                  </span>
                  <span className="hidden items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-blue sm:mt-auto sm:inline-flex sm:pt-5">
                    {acao}
                    {setaDoLink}
                  </span>
                  <ChevronRight
                    className="size-5 shrink-0 text-brand-blue sm:hidden"
                    aria-hidden="true"
                  />
                  {externo && novaAba}
                </a>
              </li>
            ))}
          </motion.ul>
          <p className="mt-6 flex items-start justify-center gap-2 text-center text-sm text-muted-foreground">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand-green" aria-hidden="true" />
            Atendimento de {site.hours.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* 03 — Por assunto */}
      <section className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24">
        <Cena nome="duas-nuvens" className="left-[4%] top-12 w-32 lg:hidden xl:block" />
        <Ilustracao
          nome="joaninha"
          className="absolute right-[6%] top-14 -z-10 hidden w-10 rotate-12 xl:block"
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Por assunto"
            title="Encontre o"
            highlight="caminho certo"
            description="Alguns assuntos têm um canal próprio. Confira antes de escrever."
            align="center"
            className="max-w-4xl"
          />
          {/* Cards verticais, como no layout (decisão de 18/11): ícone solto, sem caixinha, e links azuis. */}
          <motion.ul
            variants={stagger}
            {...revealOnScroll}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Caminho
              icone={Baby}
              titulo="Vaga na educação infantil"
              acao={
                <Link to="/educacao-infantil" className={linkDeTexto}>
                  Educação Infantil
                  {setaDoLink}
                </Link>
              }
            >
              <p>
                A inscrição é feita pela mãe ou responsável legal na Central 156, da Secretaria de
                Educação do DF.
              </p>
              <details className="group mt-4 border-t border-border pt-3">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded text-sm font-bold text-brand-blue [&::-webkit-details-marker]:hidden">
                  Ver detalhes
                  <Plus className="size-4 group-open:hidden" aria-hidden="true" />
                  <Minus className="hidden size-4 group-open:block" aria-hidden="true" />
                </summary>
                <p className="mt-2 text-[0.95rem]">
                  O INAV atende crianças de 2 e 3 anos, em período integral. Depois da inscrição
                  pelo 156, a validação é feita na unidade indicada pela Coordenação Regional de
                  Ensino, com os documentos da criança e do responsável.
                </p>
              </details>
            </Caminho>

            <Caminho
              icone={FileText}
              titulo="Documentos e prestação de contas"
              acao={
                <Link to="/transparencia" className={linkDeTexto}>
                  Transparência
                  {setaDoLink}
                </Link>
              }
            >
              <p>
                Estatuto, auditorias, parcerias públicas e certidões ficam reunidos na página
                Transparência.
              </p>
            </Caminho>

            <Caminho
              icone={Heart}
              titulo="Doações, parcerias e visitas"
              acao={
                <a
                  href="?assunto=parceria#formulario"
                  onClick={escreverSobre("parceria")}
                  className={linkDeTexto}
                >
                  Escrever para a equipe
                  {setaDoLink}
                </a>
              }
            >
              <p>
                Conte o que tem em mente pelo formulário ou pelo{" "}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
                >
                  WhatsApp
                  {novaAba}
                </a>
                . A equipe responde e combina os próximos passos.
              </p>
            </Caminho>

            <Caminho
              icone={ShieldAlert}
              titulo="Denúncias"
              escuro
              acao={
                <a
                  href="#etica"
                  onClick={aoClicar(() => rolarAte("etica"))}
                  className={cn(linkDeTexto, "text-brand-green-light hover:text-white")}
                >
                  Canal de Ética
                  {setaDoLink}
                </a>
              }
            >
              <p>
                Condutas contrárias ao Código de Ética vão para o Canal de Ética, que garante
                sigilo.
              </p>
            </Caminho>
          </motion.ul>
        </div>
      </section>

      {/* 04 — Formulário */}
      <section
        id="formulario"
        // tabIndex -1: recebe o foco no fim da rolagem, para o Tab seguir a partir daqui.
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-background py-20 focus:outline-none sm:py-24"
      >
        <Ilustracao
          nome="passarinho"
          className="absolute left-[4%] top-6 -z-10 hidden w-14 xl:block"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Formulário"
              title="Envie sua"
              highlight="mensagem"
              description="Preencha os campos e escolha o assunto. A resposta chega pelo e-mail informado."
            />
            <motion.ul variants={stagger} {...revealOnScroll} className="mt-8 space-y-3">
              <Lembrete>Para vagas na creche, a inscrição é pela Central 156.</Lembrete>
              <Lembrete>
                Para denúncias, use o{" "}
                <a
                  href="#etica"
                  onClick={aoClicar(() => rolarAte("etica"))}
                  className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
                >
                  Canal de Ética
                </a>
                .
              </Lembrete>
              <Lembrete>Seus dados servem só para responder a esta mensagem.</Lembrete>
            </motion.ul>
          </div>

          <ContactForm assunto={assunto} onAssuntoChange={setAssunto} />
        </div>
      </section>

      {/* 05 — Onde estamos e visitas */}
      <section className="relative isolate overflow-hidden bg-surface-tint py-20 sm:py-24">
        <Ilustracao
          nome="libelula"
          className="absolute right-[5%] top-10 -z-10 hidden w-14 xl:block"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <motion.figure
            variants={fadeUp}
            {...revealOnScroll}
            className="relative overflow-hidden rounded-3xl shadow-lift"
          >
            <img
              src={`${FOTOS}/sede-vista-do-patio.jpg`}
              alt="Prédio da sede do INAV visto do pátio, com jardim, árvores e céu azul."
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-brand-blue-deep/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              Sede do INAV, no {bairro}
            </figcaption>
          </motion.figure>

          <div>
            <SectionHeading eyebrow="Onde estamos" title="Venha nos" highlight="visitar" />
            <motion.div variants={fadeUp} {...revealOnScroll}>
              <address className="mt-6 text-lg not-italic leading-relaxed text-foreground/85">
                {site.address.street}
                <br />
                {site.address.city} ({site.address.state})
                <br />
                CEP {site.address.zip}
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors duration-200 hover:bg-brand-blue-deep"
                >
                  <MapPin className="size-4" aria-hidden="true" />
                  Abrir no mapa
                  {novaAba}
                </a>
                <CopiarEndereco />
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <h3 className="text-lg font-extrabold uppercase text-brand-blue-deep">
                  Visitas ao instituto
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  As visitas são combinadas com antecedência pelo WhatsApp, em horário que preserve
                  a rotina e a segurança das crianças. As regras chegam na conversa.
                </p>
                <a
                  href={visitWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkDeTexto, "mt-4")}
                >
                  Combinar uma visita
                  {setaDoLink}
                  {novaAba}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 06 — Canal de Ética. Última seção antes do rodapé: sem canteiro. */}
      <section
        id="etica"
        tabIndex={-1}
        className="relative isolate scroll-mt-20 overflow-hidden bg-brand-blue-deep py-20 text-white focus:outline-none sm:py-28"
      >
        <img
          src={`${FOTOS}/etica-criancas-no-tatame.jpg`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-blue-deep/95 via-brand-blue-deep/85 to-brand-blue-deep/60"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <SectionHeading
            eyebrow="Canal de Ética"
            title="Denúncias têm"
            highlight="canal próprio"
            description="O Canal de Ética recebe relatos sobre falhas no atendimento, fraudes, atos ilícitos e descumprimento de princípios éticos e políticas internas."
            tone="light"
          />

          <motion.div
            variants={fadeUp}
            {...revealOnScroll}
            className="rounded-3xl bg-card p-7 text-foreground shadow-lift sm:p-9"
          >
            <h3 className="flex items-center gap-2 text-xl font-extrabold uppercase leading-tight text-brand-blue-deep">
              <ShieldCheck className="size-6 shrink-0 text-brand-blue" aria-hidden="true" />
              Sigilo e análise imparcial
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Os relatos são analisados de forma imparcial e confidencial pelo Comitê de Ética e
              Conduta.
            </p>
            <p className="mt-5 font-display text-lg font-extrabold text-brand-blue [overflow-wrap:anywhere]">
              {site.ethicsEmail}
            </p>
            <a
              href={ethicsMailto}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-brand-blue-deep sm:w-auto"
            >
              <Mail className="size-4" aria-hidden="true" />
              Escrever para o Canal de Ética
            </a>
            <Pending className="mt-4 block">
              testar se {site.ethicsEmail} recebe e saber quem lê (copy, pendência 7; pergunta 8 ao
              INAV, de 12/11)
            </Pending>
          </motion.div>
        </div>
      </section>
    </>
  );
}

type CaminhoProps = {
  icone: LucideIcon;
  titulo: string;
  acao: ReactNode;
  /** O card das denúncias fica escuro, como o Canal de Ética no fim da página. */
  escuro?: boolean;
  children: ReactNode;
};

/** Card vertical de "Por assunto": o link fica sempre no pé, alinhado entre os cards. */
function Caminho({ icone: Icone, titulo, acao, escuro, children }: CaminhoProps) {
  return (
    <motion.li
      variants={fadeUp}
      className={cn(
        "flex h-full flex-col rounded-3xl border p-7 shadow-soft",
        escuro ? "border-brand-blue-deep bg-brand-blue-deep" : "border-border bg-card",
      )}
    >
      <Icone
        className={cn("size-7", escuro ? "text-brand-green-light" : "text-brand-blue")}
        strokeWidth={1.8}
        aria-hidden="true"
      />
      <h3
        className={cn(
          "mt-5 font-display text-lg font-extrabold uppercase leading-tight",
          escuro ? "text-white" : "text-brand-blue-deep",
        )}
      >
        {titulo}
      </h3>
      <div
        className={cn(
          "mt-2 text-[0.95rem] leading-relaxed",
          escuro ? "text-white/80" : "text-muted-foreground",
        )}
      >
        {children}
      </div>
      <div className="mt-auto pt-6">{acao}</div>
    </motion.li>
  );
}

function Lembrete({ children }: { children: ReactNode }) {
  return (
    <motion.li
      variants={fadeUp}
      className="flex items-start gap-3 leading-relaxed text-foreground/85"
    >
      <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-green" aria-hidden="true" />
      <span>{children}</span>
    </motion.li>
  );
}

/** Copia o endereço numa linha só. Se o navegador não deixar, pede para selecionar o texto. */
function CopiarEndereco() {
  const [estado, setEstado] = useState<"pronto" | "copiado" | "falhou">("pronto");
  const timer = useRef<number | undefined>(undefined);

  const copiar = async () => {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(fullAddress);
      setEstado("copiado");
    } catch {
      setEstado("falhou");
    }
    timer.current = window.setTimeout(() => setEstado("pronto"), 2400);
  };

  return (
    <>
      <button
        type="button"
        onClick={copiar}
        className="inline-flex items-center gap-2 rounded-full border-2 border-brand-blue/30 bg-card px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors duration-200 hover:border-brand-blue"
      >
        {estado === "copiado" ? (
          <Check className="size-4 text-brand-green" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        {estado === "copiado" ? "Endereço copiado" : "Copiar endereço"}
      </button>
      <p
        role="status"
        className={estado === "falhou" ? "w-full text-sm text-muted-foreground" : "sr-only"}
      >
        {estado === "copiado" && "Endereço copiado."}
        {estado === "falhou" && "Não foi possível copiar. Selecione o endereço acima."}
      </p>
    </>
  );
}
