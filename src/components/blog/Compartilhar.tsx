import { useEffect, useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";

/** Compartilhar a publicação: menu do celular quando existir, WhatsApp e copiar o link. */
export function Compartilhar({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);
  const [temMenuNativo, setTemMenuNativo] = useState(false);
  // O menu de compartilhar do celular só existe no navegador, então é detectado depois da primeira exibição.
  useEffect(() => setTemMenuNativo(typeof navigator.share === "function"), []);
  // Evita diferença entre servidor e navegador: o endereço só é lido quando alguém clica.
  const endereco = () => window.location.href;

  const botao =
    "inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-brand-blue-deep transition-colors hover:border-brand-blue/40 hover:bg-secondary";

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(endereco());
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2500);
    } catch {
      window.prompt("Copie o link:", endereco());
    }
  };

  const compartilhar = async () => {
    try {
      await navigator.share({ title: titulo, url: endereco() });
    } catch {
      /* quem cancela o compartilhamento não precisa de aviso */
    }
  };

  const abrirWhatsApp = () => {
    const texto = `${titulo} ${endereco()}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      role="group"
      aria-label="Compartilhar esta publicação"
    >
      <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
        Compartilhar
      </span>
      {temMenuNativo && (
        <button type="button" onClick={compartilhar} className={botao}>
          <Share2 className="size-4" aria-hidden="true" />
          Enviar
        </button>
      )}
      <button type="button" onClick={abrirWhatsApp} className={botao}>
        <MessageCircle className="size-4" aria-hidden="true" />
        WhatsApp
      </button>
      <button type="button" onClick={copiar} className={botao} aria-live="polite">
        {copiado ? (
          <Check className="size-4 text-brand-green" aria-hidden="true" />
        ) : (
          <Link2 className="size-4" aria-hidden="true" />
        )}
        {copiado ? "Link copiado" : "Copiar link"}
      </button>
    </div>
  );
}
