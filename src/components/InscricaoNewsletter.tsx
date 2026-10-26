import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { inscreverNaNewsletter, type ResultadoDaInscricao } from "@/lib/newsletter";
import { cn } from "@/lib/utils";

type Estado = { fase: "parado" | "enviando" } | { fase: "pronto"; resultado: ResultadoDaInscricao };

const mensagensDeErro = {
  "email-invalido": "Confira o e-mail digitado.",
  "sem-consentimento": "Marque a caixa para autorizar o envio dos e-mails.",
  indisponivel: "As inscrições ainda não estão abertas. Tente de novo em breve.",
  erro: "Não foi possível fazer a inscrição agora. Tente de novo em alguns minutos.",
} as const;

/**
 * Inscrição na newsletter (um e-mail a cada publicação nova do blog).
 * "cartao" vai nas páginas do blog; "rodape" é a versão compacta do rodapé.
 */
export function InscricaoNewsletter({ variante }: { variante: "cartao" | "rodape" }) {
  const id = useId();
  const [estado, setEstado] = useState<Estado>({ fase: "parado" });
  const [email, setEmail] = useState("");

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    setEstado({ fase: "enviando" });
    try {
      const resultado = await inscreverNaNewsletter({
        data: {
          email,
          consentimento: dados.get("consentimento") === "sim",
          armadilha: String(dados.get("site") ?? ""),
        },
      });
      setEstado({ fase: "pronto", resultado });
    } catch {
      setEstado({ fase: "pronto", resultado: { ok: false, motivo: "erro" } });
    }
  }

  const noRodape = variante === "rodape";
  const resultado = estado.fase === "pronto" ? estado.resultado : null;

  if (resultado?.ok) {
    return (
      <div
        role="status"
        className={cn(
          "flex gap-3",
          noRodape ? "text-sm text-white/85" : "rounded-2xl bg-white/10 p-5 text-white",
        )}
      >
        <CheckCircle2
          className="mt-0.5 size-5 shrink-0 text-brand-green-light"
          aria-hidden="true"
        />
        <p className="leading-relaxed">
          {resultado.pedeConfirmacao ? (
            <>
              <strong className="font-bold">Quase lá!</strong> Enviamos um e-mail para{" "}
              <strong className="font-bold">{email}</strong>. Clique no link dele para confirmar a
              inscrição.
            </>
          ) : (
            <>
              <strong className="font-bold">Inscrição feita!</strong> Você vai receber as próximas
              novidades do INAV por e-mail.
            </>
          )}
        </p>
      </div>
    );
  }

  const enviando = estado.fase === "enviando";

  return (
    <form onSubmit={enviar} noValidate className={cn(noRodape ? "space-y-3" : "space-y-4")}>
      <div className={cn("flex flex-col gap-3", !noRodape && "sm:flex-row")}>
        <label htmlFor={`${id}-email`} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={resultado?.ok === false && resultado.motivo === "email-invalido"}
          aria-describedby={resultado && !resultado.ok ? `${id}-erro` : undefined}
          className={cn(
            "w-full min-w-0 rounded-full border border-white/25 bg-white px-5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-brand-orange",
            // Só o cartão põe campo e botão lado a lado; no rodapé ficam um embaixo do outro.
            noRodape ? "h-11" : "h-12 sm:flex-1",
          )}
        />
        <button
          type="submit"
          disabled={enviando}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold uppercase tracking-wide text-white shadow-cta transition-opacity hover:opacity-90 disabled:opacity-70",
            noRodape ? "h-11" : "h-12",
          )}
        >
          {enviando && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {enviando ? "Enviando…" : "Quero receber"}
        </button>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-white/75">
        <input
          type="checkbox"
          name="consentimento"
          value="sim"
          required
          className="mt-0.5 size-4 shrink-0 accent-brand-orange"
        />
        <span>
          Autorizo o INAV a me enviar e-mails com as novidades do blog. Posso cancelar quando
          quiser, pelo link no fim de cada e-mail.
        </span>
      </label>

      {/* Campo escondido: pessoas não veem nem preenchem; robôs costumam preencher. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Não preencha este campo
          <input type="text" name="site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {resultado && !resultado.ok && (
        <p id={`${id}-erro`} role="alert" className="text-sm font-semibold text-brand-orange">
          {mensagensDeErro[resultado.motivo]}
        </p>
      )}
    </form>
  );
}

/** Cartão azul com o convite e o formulário, usado no fim das páginas do blog. */
export function CartaoNewsletter() {
  return (
    <section
      aria-labelledby="titulo-newsletter"
      className="relative isolate overflow-hidden rounded-3xl bg-brand-blue-deep p-7 text-white sm:p-10"
    >
      <div
        className="absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-brand-blue/40 blur-3xl"
        aria-hidden="true"
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-10">
        <div>
          <h2
            id="titulo-newsletter"
            className="text-2xl font-extrabold uppercase leading-[1.05] sm:text-3xl"
          >
            Receba as novidades{" "}
            <span className="whitespace-nowrap text-brand-green-light">por e-mail</span>
          </h2>
          <p className="mt-3 leading-relaxed text-white/80">
            Um e-mail a cada publicação nova: avisos, campanhas e histórias do INAV.
          </p>
        </div>
        <InscricaoNewsletter variante="cartao" />
      </div>
    </section>
  );
}
