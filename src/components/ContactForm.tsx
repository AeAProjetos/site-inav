import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { integrations, whatsappLink } from "@/lib/site-config";
import { assuntoPorSlug, assuntos, type SlugDoAssunto } from "@/lib/contact-motivos";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

type Status = "idle" | "submitting" | "success" | "error";

/** Nomes dos campos enviados ao Formspree. O `email` vira o "responder para" da mensagem. */
type Campo = "name" | "email" | "telefone" | "assunto" | "mensagem" | "consentimento";
type Erros = Partial<Record<Campo, string>>;

/** Ordem dos campos na tela: o foco vai para o primeiro que falta. */
const ORDEM: Campo[] = ["name", "email", "telefone", "assunto", "mensagem", "consentimento"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(dados: FormData): Erros {
  const texto = (campo: string) => String(dados.get(campo) ?? "").trim();
  const erros: Erros = {};

  if (!texto("name")) erros.name = "Informe o seu nome.";

  const email = texto("email");
  if (!email) erros.email = "Informe o seu e-mail.";
  else if (!EMAIL.test(email))
    erros.email = "Confira o e-mail. Ele precisa ter @ e domínio, como nome@exemplo.com.";

  // Opcional: só confere se a pessoa escreveu algo.
  const digitos = texto("telefone").replace(/\D/g, "");
  if (digitos && (digitos.length < 10 || digitos.length > 13)) {
    erros.telefone = "Confira o telefone, com o DDD.";
  }

  if (!texto("assunto")) erros.assunto = "Escolha o assunto.";
  if (!texto("mensagem")) erros.mensagem = "Escreva a sua mensagem.";
  if (!dados.get("consentimento")) {
    erros.consentimento = "Marque a autorização para que a equipe possa responder.";
  }

  return erros;
}

const idDo = (campo: Campo) => `contato-${campo}`;
const idDoErro = (campo: Campo) => `contato-${campo}-erro`;

const fieldClasses =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand-blue aria-[invalid=true]:border-destructive";
/** Campos de uma linha: a mesma altura para a caixa de texto e a lista de assuntos. */
const lineFieldClasses = `${fieldClasses} h-12`;
const labelClasses = "text-xs font-bold uppercase tracking-wide text-foreground/80";

function Obrigatorio() {
  return (
    <span className="text-destructive" aria-hidden="true">
      {" "}
      *
    </span>
  );
}

function MensagemDeErro({ campo, erros }: { campo: Campo; erros: Erros }) {
  const erro = erros[campo];
  if (!erro) return null;
  return (
    <p
      id={idDoErro(campo)}
      className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-destructive"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {erro}
    </p>
  );
}

type ContactFormProps = {
  /** Assunto escolhido. Fica na página para que links como "Combinar uma visita" o preencham. */
  assunto: SlugDoAssunto | "";
  onAssuntoChange: (assunto: SlugDoAssunto | "") => void;
};

export function ContactForm({ assunto, onAssuntoChange }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [erros, setErros] = useState<Erros>({});
  // Depois da primeira tentativa de envio, os avisos se atualizam enquanto a pessoa corrige.
  const [tentou, setTentou] = useState(false);
  const tituloDoSucesso = useRef<HTMLHeadingElement>(null);
  const focarNomeAoVoltar = useRef(false);
  const configured = integrations.formspreeEndpoint.length > 0;
  const escolhido = assuntoPorSlug(assunto);

  useEffect(() => {
    if (status === "success") tituloDoSucesso.current?.focus();
    if (status === "idle" && focarNomeAoVoltar.current) {
      focarNomeAoVoltar.current = false;
      document.getElementById(idDo("name"))?.focus();
    }
  }, [status]);

  const ajuda = (campo: Campo, ...outros: string[]) => {
    const ids = [...outros, erros[campo] ? idDoErro(campo) : ""].filter(Boolean);
    return {
      id: idDo(campo),
      "aria-invalid": erros[campo] ? true : undefined,
      "aria-describedby": ids.length ? ids.join(" ") : undefined,
    };
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const encontrados = validar(data);
    // flushSync: os avisos já estão na tela quando o foco chega ao campo, e o leitor de tela os lê.
    flushSync(() => {
      setTentou(true);
      setErros(encontrados);
    });
    const primeiro = ORDEM.find((campo) => encontrados[campo]);
    if (primeiro) {
      const campo = document.getElementById(idDo(primeiro));
      // No centro da tela: na borda de cima, o cabeçalho fixo cobriria o campo.
      campo?.focus({ preventScroll: true });
      campo?.scrollIntoView({ block: "center" });
      return;
    }

    if (!configured) return;

    // Campo-isca preenchido: é robô. Mostra a confirmação sem enviar nada.
    if (String(data.get("_gotcha") ?? "")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(integrations.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function enviarOutra() {
    focarNomeAoVoltar.current = true;
    setTentou(false);
    setErros({});
    onAssuntoChange("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center gap-3 rounded-3xl border border-brand-green/30 bg-brand-green/10 p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-brand-green" aria-hidden="true" />
        <h3
          ref={tituloDoSucesso}
          tabIndex={-1}
          className="text-lg font-bold text-brand-blue-deep focus:outline-none"
        >
          Mensagem recebida.
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Obrigado por escrever. A equipe do INAV responde pelo e-mail informado.
        </p>
        <button
          type="button"
          onClick={enviarOutra}
          className="mt-3 inline-flex items-center justify-center rounded-full border-2 border-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-blue transition-colors duration-200 hover:bg-brand-blue hover:text-white"
        >
          Enviar outra mensagem
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={stagger}
      {...revealOnScroll}
      onSubmit={handleSubmit}
      onChange={(event) => {
        if (tentou) setErros(validar(new FormData(event.currentTarget)));
      }}
      // A validação é a nossa, com aviso em cada campo; o navegador não mostra os balões dele.
      noValidate
      aria-label="Formulário de contato"
      className="relative grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-9"
    >
      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={idDo("name")} className={labelClasses}>
            Nome
            <Obrigatorio />
          </label>
          <input
            {...ajuda("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className={lineFieldClasses}
          />
          <MensagemDeErro campo="name" erros={erros} />
        </div>
        <div>
          <label htmlFor={idDo("email")} className={labelClasses}>
            E-mail
            <Obrigatorio />
          </label>
          <input
            {...ajuda("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={lineFieldClasses}
          />
          <MensagemDeErro campo="email" erros={erros} />
        </div>
      </motion.div>

      {/* A dica fica no mesmo bloco da linha: vazia, não abre um espaço a mais no formulário. */}
      <motion.div variants={fadeUp}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={idDo("telefone")} className={labelClasses}>
              Telefone{" "}
              <span className="font-medium normal-case tracking-normal text-muted-foreground">
                (opcional)
              </span>
            </label>
            <input
              {...ajuda("telefone")}
              name="telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={lineFieldClasses}
            />
            <MensagemDeErro campo="telefone" erros={erros} />
          </div>
          <div>
            <label htmlFor={idDo("assunto")} className={labelClasses}>
              Assunto
              <Obrigatorio />
            </label>
            {/* O valor de cada opção é o nome do assunto: é o que chega no e-mail do Formspree. */}
            <select
              {...ajuda("assunto", "contato-assunto-dica")}
              name="assunto"
              value={escolhido?.label ?? ""}
              onChange={(event) => {
                const label = event.target.value;
                onAssuntoChange(assuntos.find((item) => item.label === label)?.slug ?? "");
              }}
              required
              className={lineFieldClasses}
            >
              <option value="" disabled>
                Selecione
              </option>
              {assuntos.map(({ slug, label }) => (
                <option key={slug} value={label}>
                  {label}
                </option>
              ))}
            </select>
            <MensagemDeErro campo="assunto" erros={erros} />
          </div>
        </div>

        {/* Sempre na página, para o leitor de tela anunciar a dica quando o assunto muda. */}
        <div id="contato-assunto-dica" aria-live="polite">
          {escolhido?.dica && (
            <p className="mt-4 rounded-xl bg-brand-blue-soft/50 px-4 py-3 text-sm leading-relaxed text-brand-blue-deep">
              {escolhido.dica}
            </p>
          )}
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <label htmlFor={idDo("mensagem")} className={labelClasses}>
          Mensagem
          <Obrigatorio />
        </label>
        <textarea
          {...ajuda("mensagem")}
          name="mensagem"
          required
          rows={5}
          className={fieldClasses}
        />
        <MensagemDeErro campo="mensagem" erros={erros} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="flex items-start gap-3">
          <input
            {...ajuda("consentimento")}
            name="consentimento"
            type="checkbox"
            value="Sim"
            required
            className="mt-0.5 size-4 shrink-0 accent-brand-blue"
          />
          <label
            htmlFor={idDo("consentimento")}
            className="text-sm leading-relaxed text-foreground/80"
          >
            Autorizo o INAV a usar meus dados para responder a esta mensagem, conforme a{" "}
            <Link
              to="/politica-de-privacidade"
              className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep"
            >
              Política de Privacidade
            </Link>
            .
            <Obrigatorio />
          </label>
        </div>
        <MensagemDeErro campo="consentimento" erros={erros} />
      </motion.div>

      {/* Campo-isca contra robôs: fora da tela e fora do Tab. O Formspree descarta envios com ele. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 size-px overflow-hidden">
        <label htmlFor="contato-site">Site</label>
        <input id="contato-site" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input
        type="hidden"
        name="_subject"
        value={`Contato pelo site: ${escolhido?.label ?? "sem assunto"}`}
      />

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm font-medium text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            Não conseguimos enviar agora. Tente novamente ou fale pelo{" "}
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp
            </a>
            .
          </span>
        </p>
      )}

      {!configured && (
        <p role="status" className="text-sm text-muted-foreground">
          Formulário ainda em configuração. Por enquanto, fale pelo WhatsApp ou pelo e-mail.
        </p>
      )}

      <motion.button
        variants={fadeUp}
        type="submit"
        disabled={!configured || status === "submitting"}
        // Azul: o laranja do site fica para as chamadas de doação.
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors duration-200 hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Enviar mensagem
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
