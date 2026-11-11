import { cn } from "@/lib/utils";

/** Situação de cada ação da página Projetos, conforme os documentos do acervo do INAV. */
export type Status = "documentado" | "executado" | "aprovado" | "em-execucao";

const rotuloDoStatus: Record<Status, string> = {
  documentado: "Resultado documentado",
  executado: "Executado",
  aprovado: "Aprovado",
  "em-execucao": "Em execução",
};

// Laranja fica só para as chamadas de doação: "Aprovado" (ainda sem execução) é o selo vazado.
const tons: Record<Status, string> = {
  documentado: "bg-brand-green/15 text-brand-blue-deep",
  executado: "bg-brand-blue-soft text-brand-blue-deep",
  aprovado: "text-brand-blue-deep ring-1 ring-inset ring-brand-blue-deep/35",
  "em-execucao": "bg-brand-green-light text-brand-blue-deep",
};

export function SeloStatus({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.1em]",
        tons[status],
        className,
      )}
    >
      {rotuloDoStatus[status]}
    </span>
  );
}
