import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const AUTOPLAY_INTERVAL_MS = 5000;

function initialsFor(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = testimonials[activeIndex];

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  if (!active) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex min-h-80 flex-col justify-center rounded-2xl bg-card p-8 shadow-lift"
        >
          <Quote className="size-8 text-brand-orange/40" aria-hidden="true" />
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">“{active.quote}”</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-sm font-bold text-brand-blue-deep">
              {initialsFor(active.name)}
            </span>
            <div>
              <p className="text-sm font-bold text-brand-blue-deep">{active.name}</p>
              <p className="text-sm text-muted-foreground">{active.role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {testimonials.length > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver depoimento de ${testimonial.name}`}
              aria-current={index === activeIndex}
              className={cn(
                "size-2.5 rounded-full transition-colors",
                index === activeIndex ? "bg-brand-orange" : "bg-border hover:bg-brand-orange/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
