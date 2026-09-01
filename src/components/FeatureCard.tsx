import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { fadeUp } from "@/lib/motion-presets";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "blue" | "orange" | "green";
  className?: string;
};

const accents = {
  blue: "bg-brand-blue-soft text-brand-blue-deep",
  orange: "bg-brand-orange/12 text-brand-orange",
  green: "bg-brand-green/12 text-brand-green",
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "blue",
  className,
}: FeatureCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-xl",
          accents[accent],
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-brand-blue-deep">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.article>
  );
}
