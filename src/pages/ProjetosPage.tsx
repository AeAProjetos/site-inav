import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Utensils, HeartHandshake, Sparkles, Heart } from 'lucide-react';

export default function ProjetosPage() {
  return (
    <div className="space-y-16 md:space-y-24 pb-24 overflow-hidden">
      
      {/* Hero Projetos */}
      <section className="relative pt-12 md:pt-16 pb-14 bg-gradient-to-b from-primary/5 via-slate-50 to-white border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <Badge variant="outline" className="bg-brandOrange/10 text-brandOrange-dark border-brandOrange/25 px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Impacto Comunitário
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Projetos que Geram Futuro e Autonomia
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Além da creche infantil, o INAV desenvolve projetos de gastronomia social e suporte sociofamiliar para transformar a comunidade do Riacho Fundo II.
          </p>
        </div>
      </section>

      {/* Projetos Detalhados */}
      <div className="container mx-auto max-w-5xl px-4 space-y-16">
        
        {/* Projeto 1: Ateliê do Sabor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 md:p-10 border border-border/80 shadow-layered">
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-slate-100">
              <img
                src="/img/atelie_sabor.jpg"
                alt="Oficina de Gastronomia Social do Ateliê do Sabor"
                className="w-full h-[320px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-brandOrange font-bold text-xs uppercase tracking-wider">
              <Utensils className="w-4 h-4" /> Gastronomia Social & Capacitação
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
              Ateliê do Sabor
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              O <strong>Ateliê do Sabor</strong> é a nossa cozinha-escola comunitária, criada para oferecer capacitação profissional em panificação, confeitaria e culinária saudável para mães e responsáveis das crianças atendidas.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Mais do que receitas, o projeto gera autoestima, independência financeira e estimula o empreendedorismo local.
            </p>

            <div className="pt-2">
              <Button variant="orange" asChild className="gap-2 font-bold shadow-glow-orange rounded-full">
                <Link to="/quer-ajudar">
                  <Heart className="w-4 h-4" /> Apoie Este Projeto
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Projeto 2: Sonhos e Vidas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 md:p-10 border border-border/80 shadow-layered">
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            <div className="flex items-center gap-2 text-brandGreen font-bold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" /> Acompanhamento Sociofamiliar
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">
              Sonhos e Vidas
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              O projeto <strong>Sonhos e Vidas</strong> atua no acolhimento direto das famílias em situação de vulnerabilidade, fornecendo assistência social, apoio psicológico e rodas de conversa sobre parentalidade positiva e direitos da infância.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Acreditamos que para transformar a vida de uma criança, precisamos apoiar e fortalecer a sua família por inteiro.
            </p>

            <div className="pt-2">
              <Button variant="green" asChild className="gap-2 font-bold shadow-glow-green rounded-full">
                <Link to="/contato">
                  <HeartHandshake className="w-4 h-4" /> Conheça Mais
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-md border-2 border-slate-100">
              <img
                src="/img/hero_criancas.jpg"
                alt="Projeto Sonhos e Vidas no INAV"
                className="w-full h-[320px] object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
