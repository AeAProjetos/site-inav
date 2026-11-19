import { motion } from "motion/react";
import { Instagram } from "lucide-react";

import { SectionHeading } from "@/components/SectionHeading";
import type { PostDoInstagram } from "@/lib/blog";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { instagramLink, site } from "@/lib/site-config";

// Datas só com dia (AAAA-MM-DD): meio-dia em UTC evita que o fuso mude o dia.
const dataCurta = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

/**
 * Seção "No Instagram" (ideia do usuário, 19/11/2026): os 6 posts mais recentes cadastrados no
 * painel, com foto, legenda e data. Cada foto abre o post no Instagram. Sem post, a seção some.
 */
export function NoInstagram({ posts }: { posts: PostDoInstagram[] }) {
  if (posts.length === 0) return null;
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={`@${site.instagram}`}
          title="No"
          highlight="Instagram"
          description="Fotos do dia a dia do INAV. Toque numa foto para ver o post completo."
        />
        <a
          href={instagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-blue px-6 text-sm font-bold uppercase tracking-wide text-brand-blue-deep transition-colors hover:bg-brand-blue hover:text-white"
        >
          <Instagram className="size-4" aria-hidden="true" />
          Seguir @{site.instagram}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
      >
        {posts.map((p) => (
          <motion.li key={p.link} variants={fadeUp}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl focus-visible:outline-none"
            >
              <span className="block overflow-hidden rounded-2xl shadow-soft group-focus-visible:ring-[3px] group-focus-visible:ring-brand-blue">
                <img
                  src={p.src}
                  alt={p.alt}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              {p.legenda && (
                <span className="mt-2 line-clamp-2 block text-sm leading-snug text-foreground/85">
                  {p.legenda}
                </span>
              )}
              {/* Azul-escuro: o azul da marca não chega a 4,5:1 sobre o fundo azul-claro. */}
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-brand-blue-deep">
                <time dateTime={p.data}>{dataCurta.format(new Date(`${p.data}T12:00:00Z`))}</time>
              </span>
              <span className="sr-only"> (abre o post no Instagram, em nova aba)</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
