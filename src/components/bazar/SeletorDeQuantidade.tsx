import { Minus, Plus } from "lucide-react";

type SeletorDeQuantidadeProps = {
  valor: number;
  maximo: number;
  onChange: (valor: number) => void;
  /** Nome do item, para o leitor de tela dizer de qual quantidade se trata. */
  rotulo: string;
};

/** Botões de menos e mais para itens com várias unidades. */
export function SeletorDeQuantidade({ valor, maximo, onChange, rotulo }: SeletorDeQuantidadeProps) {
  const botao =
    "inline-flex size-10 items-center justify-center rounded-full text-brand-blue-deep transition-colors hover:bg-brand-blue-soft disabled:pointer-events-none disabled:opacity-35";

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${rotulo}`}
      className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-1"
    >
      <button
        type="button"
        className={botao}
        onClick={() => onChange(valor - 1)}
        disabled={valor <= 1}
        aria-label="Diminuir"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-8 text-center font-bold text-brand-blue-deep">
        {valor}
      </output>
      <button
        type="button"
        className={botao}
        onClick={() => onChange(valor + 1)}
        disabled={valor >= maximo}
        aria-label="Aumentar"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
