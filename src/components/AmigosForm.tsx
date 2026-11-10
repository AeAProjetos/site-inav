import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { integrations, whatsappLink } from "@/lib/site-config";

export type PerfilAmigo = "pessoa" | "empresa";

type Status = "idle" | "submitting" | "success" | "error";

const perfis: { valor: PerfilAmigo; rotulo: string }[] = [
  { valor: "pessoa", rotulo: "Pessoa" },
  { valor: "empresa", rotulo: "Empresa ou entidade" },
];

const fieldClasses =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand-blue";
const labelClasses = "text-xs font-bold uppercase tracking-wide text-foreground/80";
const linkClasses =
  "font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-blue-deep";

type AmigosFormProps = {
  perfil: PerfilAmigo;
  onPerfilChange: (perfil: PerfilAmigo) => void;
};

/**
 * Manifestação de interesse no programa: não processa pagamento. A mensagem chega à equipe pelo
 * formulário próprio no Formspree, entregue ao financeiro, e a equipe combina a forma de contribuir.
 * Ao mudar os campos, atualizar a Política de Privacidade.
 */
export function AmigosForm({ perfil, onPerfilChange }: AmigosFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const configured = integrations.amigosFormspreeEndpoint.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setStatus("submitting");
    try {
      const response = await fetch(integrations.amigosFormspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(event.currentTarget),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-card p-10 text-center shadow-soft"
      >
        <CheckCircle2 className="size-10 text-brand-green" aria-hidden="true" />
        <p className="text-lg font-bold text-brand-blue-deep">Recebemos o seu interesse!</p>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Obrigado por querer fazer parte. A equipe do INAV vai entrar em contato com você.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Formulário de interesse no Amigos INAV"
      className="grid gap-5 rounded-2xl bg-card p-6 text-foreground shadow-soft sm:p-8"
    >
      <input type="hidden" name="motivo" value="Amigos INAV" />
      <input type="hidden" name="_subject" value="Novo interesse no Amigos INAV" />
      {/* Campo-isca: invisível para pessoas; o Formspree descarta o envio se vier preenchido. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

      <fieldset>
        <legend className={labelClasses}>Você é</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {perfis.map(({ valor, rotulo }) => (
            <label
              key={valor}
              className="flex cursor-pointer items-center justify-center rounded-xl border border-input px-4 py-3 text-sm font-medium text-muted-foreground transition-colors has-checked:border-brand-blue has-checked:bg-brand-blue-soft has-checked:font-bold has-checked:text-brand-blue-deep has-focus-visible:ring-2 has-focus-visible:ring-brand-blue"
            >
              <input
                type="radio"
                name="perfil"
                value={rotulo}
                checked={perfil === valor}
                onChange={() => onPerfilChange(valor)}
                className="sr-only"
              />
              {rotulo}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="amigo-nome" className={labelClasses}>
          {perfil === "empresa" ? "Nome da empresa ou entidade" : "Seu nome"}
        </label>
        <input
          id="amigo-nome"
          name="name"
          type="text"
          required
          autoComplete={perfil === "empresa" ? "organization" : "name"}
          className={fieldClasses}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="amigo-email" className={labelClasses}>
            E-mail
          </label>
          <input
            id="amigo-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="amigo-telefone" className={labelClasses}>
            Telefone ou WhatsApp
          </label>
          <input
            id="amigo-telefone"
            name="telefone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="amigo-mensagem" className={labelClasses}>
          Quer contar algo para a equipe? (opcional)
        </label>
        <textarea id="amigo-mensagem" name="mensagem" rows={3} className={fieldClasses} />
      </div>

      <div className="grid gap-3">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            name="autoriza_contato"
            value="Sim"
            required
            className="mt-1 size-4 shrink-0 accent-brand-blue"
          />
          <span>
            Autorizo o INAV a usar estes dados para entrar em contato sobre o programa Amigos INAV,
            conforme a{" "}
            <Link to="/politica-de-privacidade" className={linkClasses}>
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            name="autoriza_mural"
            value="Sim"
            className="mt-1 size-4 shrink-0 accent-brand-blue"
          />
          <span>Opcional: autorizo publicar meu nome ou marca no mural de apoiadores.</span>
        </label>
      </div>

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

      <button
        type="submit"
        disabled={!configured || status === "submitting"}
        className="warm-gradient inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-cta transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Enviar meu interesse
          </>
        )}
      </button>
    </form>
  );
}
