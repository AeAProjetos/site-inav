import { motion } from "motion/react";

import { impactStats } from "@/lib/site-config";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";

export function ImpactStats() {
  return (
    <section className="bg-brand-blue-deep pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-5">
        <motion.dl
          variants={stagger}
          {...revealOnScroll}
          className="grid grid-cols-2 gap-x-30 gap-y-40 lg:grid-cols-4"
        >
          {impactStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold text-brand-green-light sm:text-5xl lg:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-balance-pretty text-sm font-bold uppercase tracking-wide text-white sm:text-base">
                  {stat.label}
                </span>
                <span className="mt-1 block text-xs text-white/60 sm:text-sm">
                  {stat.detail}
                </span>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}