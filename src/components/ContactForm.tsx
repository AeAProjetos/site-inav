import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { integrations, whatsappLink } from "@/lib/site-config";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

const motivos = [
  "Quero doar",
  "Quero ser voluntário(a)",
  "Quero ser parceiro(a) empresarial",
  "Outro assunto",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus-visible:border-brand-blue";
const labelClasses = "text-xs font-bold uppercase tracking-wide text-foreground/80";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const configured = integrations.formspreeEndpoint.length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");

    try {
      const response = await fetch(integrations.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-brand-green" aria-hidden="true" />
        <p className="text-lg font-bold text-brand-blue-deep">Mensagem enviada!</p>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Obrigado pelo contato. Nossa equipe responde em breve.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={stagger}
      {...revealOnScroll}
      onSubmit={handleSubmit}
      aria-label="Formulário de contato"
      className="grid gap-5 rounded-2xl border border-border bg-card p-7 shadow-soft sm:p-9"
    >
      <motion.div variants={fadeUp} className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Nome
          </label>
          <input id="name" name="name" type="text" required className={fieldClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-mail
          </label>
          <input id="email" name="email" type="email" required className={fieldClasses} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <label htmlFor="motivo" className={labelClasses}>
          Motivo do contato
        </label>
        <select id="motivo" name="motivo" required defaultValue="" className={fieldClasses}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {motivos.map((motivo) => (
            <option key={motivo} value={motivo}>
              {motivo}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={fadeUp}>
        <label htmlFor="mensagem" className={labelClasses}>
          Mensagem
        </label>
        <textarea id="mensagem" name="mensagem" required rows={5} className={fieldClasses} />
      </motion.div>

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
          Formulário ainda em configuração — por enquanto, fale pelo WhatsApp ou e-mail acima.
        </p>
      )}

      <motion.button
        variants={fadeUp}
        type="submit"
        disabled={!configured || status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-colors duration-200 hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:opacity-50"
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
