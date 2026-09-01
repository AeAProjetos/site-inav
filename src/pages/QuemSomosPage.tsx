import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Compass, Sparkles, Heart } from 'lucide-react';

export default function QuemSomosPage() {
  return (
    <div className="space-y-16 md:space-y-24 pb-24 overflow-hidden">
      
      {/* Hero Quem Somos */}
      <section className="relative pt-12 md:pt-16 pb-14 bg-gradient-to-b from-primary/5 via-slate-50 to-white border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <Badge variant="outline" className="bg-brandOrange/10 text-brandOrange-dark border-brandOrange/25 px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-brandOrange/20" />
            Nossa Trajetória de Amor
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            25 anos dedicados à primeira infância no Riacho Fundo II
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Uma história iniciada no ano 2000 pelo Sr. Sebastião Valadares de Castro com o propósito inabalável de acolher, alimentar e educar crianças em vulnerabilidade.
          </p>
        </div>
      </section>

      {/* Conteúdo & Foto */}
      <div className="container mx-auto max-w-5xl px-4 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6 text-slate-700 leading-relaxed text-base">
            <h2 className="text-3xl font-display font-bold text-slate-900">
              A Origem do Instituto Nair Valadares
            </h2>
            <p>
              O <strong>Instituto Nair Valadares (INAV)</strong> nasceu no coração do Riacho Fundo II como uma resposta de solidariedade para as mães e pais trabalhadores que não tinham onde deixar seus filhos pequenos com segurança durante a jornada de trabalho.
            </p>
            <p>
              O que começou como uma iniciativa comunitária de afeto cresceu e se profissionalizou. Hoje, atendemos <strong>240 crianças de 02 a 03 anos</strong> em tempo integral, com uma equipe pedagógica multidisciplinar e 4 refeições diárias de alto padrão nutricional.
            </p>
            <div className="pt-2">
              <Button variant="orange" asChild className="gap-2 font-bold shadow-glow-orange rounded-full">
                <Link to="/quer-ajudar">
                  <Heart className="w-4 h-4" />
                  Seja um Apoiador da Causa
                </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-layered-hover border-4 border-white">
              <img
                src="/img/hero_criancas.jpg"
                alt="Educação e carinho no INAV"
                className="w-full h-[360px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Missão, Visão e Valores em Cartões Táteis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transformar a realidade social por meio do acolhimento amoroso e da educação integral na primeira infância, fortalecendo as famílias.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brandGreen/10 text-brandGreen flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ser referência no Distrito Federal em desenvolvimento infantil humanizado, nutrição de qualidade e impacto social comunitário sustentável.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brandOrange/10 text-brandOrange flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Nossos Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Transparência inegociável, amor incondicional ao próximo, respeito aos direitos da criança e compromisso com o desenvolvimento humano.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
