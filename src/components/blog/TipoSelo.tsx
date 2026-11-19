import { aparenciaDoTipo } from "@/components/blog/aparencia";
import { infoDoTipo } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Selo colorido com o tipo da publicação (Aviso, Instagram, Marco institucional...). */
export function TipoSelo({ tipo, className }: { tipo: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        aparenciaDoTipo(tipo).cor,
        className,
      )}
    >
      {infoDoTipo(tipo).title}
    </span>
  );
}
