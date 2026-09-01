import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAVIGATION_LINKS = [
  { label: 'Início', path: '/' },
  { label: 'Quem Somos', path: '/quem-somos' },
  { label: 'Educação Infantil', path: '/educacao-infantil' },
  { label: 'Projetos Sociais', path: '/projetos' },
  { label: 'Transparência Pública', path: '/transparencia' },
  { label: 'Fale Conosco', path: '/contato' },
] as const;

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      
      {/* Banner de Conversão Acolhedor (Warm Gradient Call to Action) */}
      <div className="bg-gradient-to-r from-primary via-primary-dark to-slate-900 border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandOrange text-white text-xs font-bold shadow-sm">
                ❤ Faça a Diferença Hoje
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Transforme o futuro de 240 crianças com a gente
              </h3>
              <p className="text-slate-200 text-base md:text-lg leading-relaxed">
                Sua ajuda garante alimentação de qualidade, material pedagógico e acolhimento seguro no Riacho Fundo II.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="orange"
                size="lg"
                asChild
                className="gap-2 shadow-glow-orange h-13 px-8 text-base font-bold rounded-full"
              >
                <Link to="/quer-ajudar">
                  <Heart className="w-5 h-5 fill-white/20 text-white" />
                  Quero Fazer uma Doação
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">

          {/* Col 1: Logo & Missão */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-block bg-white p-3 rounded-2xl shadow-md">
              <img
                src="/img/logo-inav.png"
                alt="Instituto Nair Valadares"
                className="h-12 w-auto object-contain"
              />
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              O <strong>Instituto Nair Valadares (INAV)</strong> é uma organização sem fins lucrativos dedicada ao acolhimento e educação infantil gratuita em tempo integral no Riacho Fundo II, Brasília-DF.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/inavoficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Oficial do INAV"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-brandOrange hover:text-white hover:border-brandOrange transition-all duration-200"
              >
                <InstagramIcon className="h-4 w-4" />
                <span>@inavoficial</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navegação */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brandOrange pl-3">
              Navegação
            </h4>
            <nav aria-label="Links rápidos do rodapé">
              <ul className="space-y-2.5 text-sm">
                {NAVIGATION_LINKS.map(({ label, path }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-150"
                    >
                      <span>•</span> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Contato Oficial */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-brandGreen pl-3">
              Atendimento & Sede
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex gap-3 items-start">
                <MapPin className="h-4 w-4 text-brandGreen shrink-0 mt-1" />
                <span>QN 08A, Riacho Fundo II<br />Brasília - DF, CEP 71.880-110</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-brandOrange shrink-0" />
                <a href="tel:+556133331552" className="hover:text-white transition-colors font-medium">
                  (61) 3333-1552
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-primary-light shrink-0" />
                <a href="mailto:instituto@inav.org.br" className="hover:text-white transition-colors font-medium">
                  instituto@inav.org.br
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="w-full bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 justify-between"
              >
                <Link to="/transparencia">
                  <span>Portal da Transparência</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="border-t border-slate-900 bg-black/40">
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
            <p>© {currentYear} Instituto Nair Valadares — CNPJ Institucional Auditado. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacidade" className="hover:text-slate-300 transition-colors">
                Privacidade
              </Link>
              <span>•</span>
              <Link to="/termos" className="hover:text-slate-300 transition-colors">
                Termos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
