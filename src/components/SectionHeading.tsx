import { motion } from "motion/react";

import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      {...revealOnScroll}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "text-sm font-bold uppercase tracking-[0.18em]",
            tone === "light" ? "text-brand-green-light" : "text-brand-orange",
          )}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        variants={fadeUp}
        className={cn(
          "mt-3 text-3xl font-extrabold uppercase leading-[1.05] text-balance-pretty sm:text-4xl lg:text-5xl",
          tone === "light" ? "text-white" : "text-brand-blue-deep",
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-brand-green">{highlight}</span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "light" ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
