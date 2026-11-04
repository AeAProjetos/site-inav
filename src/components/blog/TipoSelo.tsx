import { infoDoTipo } from "@/lib/blog";
import { cn } from "@/lib/utils";

const tons = {
  laranja: "bg-brand-orange text-white",
  azul: "bg-brand-blue-soft text-brand-blue-deep",
  verde: "bg-brand-green text-white",
} as const;

/** Selo colorido com o tipo da publicação (Aviso, Instagram, História...). */
export function TipoSelo({ tipo, className }: { tipo: string; className?: string }) {
  const info = infoDoTipo(tipo);
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        tons[info.tom],
        className,
      )}
    >
      {info.title}
    </span>
  );
}
