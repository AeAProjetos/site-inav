import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, revealOnScroll, stagger } from "@/lib/motion-presets";
import { site, whatsappLink } from "@/lib/site-config";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Instituto Nair Valadares" },
      {
        name: "description",
        content:
          "Fale com o Instituto Nair Valadares: endereço, telefone, e-mail, WhatsApp e horário de atendimento para doadores, parceiros e famílias.",
      },
      { property: "og:title", content: "Contato — Instituto Nair Valadares" },
      {
        property: "og:description",
        content:
          "Endereço, telefone, e-mail e WhatsApp do INAV. Agende uma visita ou fale com nossa equipe.",
      },
    ],
  }),
  component: ContatoPage,
});

const fullAddress = `${site.address.street}, ${site.address.city} — ${site.address.state}, CEP ${site.address.zip}`;

const channels = [
  {
    icon: MapPin,
    label: "Endereço",
    value: fullAddress,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
  },
  {
    icon: Phone,
    label: "Telefone",
    value: site.whatsappDisplay,
    href: `tel:${site.phone}`,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: whatsappLink,
  },
];

function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="A porta está sempre"
        highlight="aberta"
        description="Quer doar, propor uma parceria, ser voluntário ou conhecer o instituto de perto? Escolha o canal que preferir — respondemos a todos."
      />

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Canais de atendimento"
            title="Fale com a nossa"
            highlight="equipe"
            align="center"
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <motion.div variants={stagger} {...revealOnScroll} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    variants={fadeUp}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
                  >
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue-deep">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
                        {label}
                      </span>
                      <span className="mt-1.5 block leading-relaxed text-foreground/85">
                        {value}
                      </span>
                    </span>
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                {...revealOnScroll}
                className="mt-5 flex items-start gap-4 rounded-2xl border border-border bg-surface-tint p-7"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/12 text-brand-green">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
                    Horário de atendimento
                  </span>
                  <span className="mt-1.5 block leading-relaxed text-foreground/85">
                    {site.hours}
                  </span>
                </span>
              </motion.div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-surface-tint py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Visite o instituto"
            title="Ver de perto muda a"
            highlight="percepção"
            description="Agendamos visitas para doadores, empresas parceiras e voluntários interessados. Basta enviar uma mensagem e combinamos o melhor dia."
            align="center"
          />
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-soft transition-opacity duration-200 hover:opacity-90"
          >
            Agendar uma visita
          </a>
        </div>
      </section>
    </>
  );
}
