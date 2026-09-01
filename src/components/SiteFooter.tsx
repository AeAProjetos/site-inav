import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { navigation, site } from "@/lib/site-config";
import { WaveDivider } from "@/components/WaveDivider";

export function SiteFooter() {
  return (
    <footer className="relative">
      <WaveDivider variant="up" className="text-brand-blue-deep" height="md" />

      <div className="bg-brand-blue-deep text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
          <div>
            <img
              src="/img/logo-inav-header.png"
              alt={`Logotipo do ${site.name}`}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              {site.description}
            </p>
            <p className="mt-5 text-xs uppercase tracking-widest text-brand-green-light">
              Organização da Sociedade Civil sem fins lucrativos
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-green-light">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-green-light">
              Fale conosco
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city} — {site.address.state}, {site.address.zip}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <a className="transition-colors hover:text-white" href={`tel:${site.phone}`}>
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <a className="transition-colors hover:text-white" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p>
              © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            </p>
            <p>Feito com carinho para transformar vidas.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
