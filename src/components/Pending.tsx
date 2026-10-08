import type { ReactNode } from "react";
import { Camera } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Marcas de conteúdo que ainda falta receber da instituição.
 * Usam amarelo de alerta (fora da paleta da marca) para nunca serem confundidas
 * com o design final. Nenhuma pode chegar à main: `bun run pendencias` lista todas.
 */

export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-md border-2 border-dashed border-amber-500 bg-amber-50 px-2 py-0.5 text-sm font-semibold normal-case leading-snug tracking-normal text-amber-900",
        className,
      )}
    >
      Preencher: {children}
    </span>
  );
}

export function PendingPhoto({ description, className }: { description: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50 p-6 text-center text-amber-900",
        className,
      )}
    >
      <Camera className="size-8" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-wide">Foto pendente</span>
      <span className="max-w-xs text-sm leading-snug">{description}</span>
    </div>
  );
}
