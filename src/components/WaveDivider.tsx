import { cn } from "@/lib/utils";

type WaveDividerProps = {
  /** Direção da curva: "down" fecha a seção acima, "up" abre a seção abaixo. */
  variant?: "down" | "up";
  /** Classe de cor de preenchimento, ex: "text-background". */
  className?: string;
  height?: "sm" | "md" | "lg";
};

const heights = {
  sm: "h-10 md:h-14",
  md: "h-16 md:h-24",
  lg: "h-24 md:h-36",
};

/**
 * Curva orgânica que separa as seções — assinatura visual do site do INAV.
 * A cor vem de `currentColor`, então basta aplicar `text-<token>`.
 */
export function WaveDivider({
  variant = "down",
  className,
  height = "md",
}: WaveDividerProps) {
  const path =
    variant === "down"
      ? "M0,40 C240,110 480,110 720,70 C960,30 1200,10 1440,52 L1440,120 L0,120 Z"
      : "M0,80 C240,10 480,10 720,50 C960,90 1200,110 1440,68 L1440,0 L0,0 Z";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none w-full leading-none", heights[height], className)}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        focusable="false"
      >
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
