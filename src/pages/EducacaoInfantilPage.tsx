import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, UtensilsCrossed, ShieldCheck, Sparkles, SunMedium } from 'lucide-react';

export default function EducacaoInfantilPage() {
  return (
    <div className="space-y-16 md:space-y-24 pb-24 overflow-hidden">
      
      {/* Hero Educação Infantil */}
      <section className="relative pt-12 md:pt-16 pb-14 bg-gradient-to-b from-primary/5 via-slate-50 to-white border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/25 px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Primeira Infância (02 e 03 Anos)
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Educação Infantil em Tempo Integral e Gratuita
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Um ambiente seguro, estimulante e acolhedor onde cada uma das nossas 240 crianças cresce com amor, nutrição balanceada e estímulo pedagógico.
          </p>
        </div>
      </section>

      {/* Seção de Detalhes com Foto */}
      <div className="container mx-auto max-w-5xl px-4 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-layered-hover border-4 border-white">
              <img
                src="/img/refeicao_rotina.jpg"
                alt="Rotina de nutrição e acolhimento no INAV"
                className="w-full h-[380px] object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-slate-700 leading-relaxed text-base">
            <h2 className="text-3xl font-display font-bold text-slate-900">
              Rotina Pensada para o Desenvolvimento Integral
            </h2>
            <p>
              Na primeira infância, cada momento é uma oportunidade de aprendizado e conexão. No INAV, a rotina diária integra brincadeiras dirigidas, contação de histórias, psicomotricidade e hábitos saudáveis de higiene e convivência.
            </p>
            <p>
              As crianças permanecem durante todo o dia sob os cuidados de educadores dedicados, garantindo que os pais possam trabalhar com total tranquilidade.
            </p>
            <div className="pt-2">
              <Button variant="orange" asChild className="gap-2 font-bold shadow-glow-orange rounded-full">
                <Link to="/contato">
                  <SunMedium className="w-4 h-4" />
                  Conheça Nossa Sede Pessoalmente
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 3 Cartões de Destaque da Rotina */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Tempo Integral</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Das 07h30 às 17h30, as crianças participam de atividades estruturadas com horários adequados de soninho, recreação e aprendizado.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brandOrange/10 text-brandOrange flex items-center justify-center font-bold">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">4 Refeições Diárias</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cardápio elaborado por nutricionistas: café da manhã, lanche da manhã, almoço nutritivo e lanche da tarde com frutas frescas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-white hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brandGreen/10 text-brandGreen flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle className="text-xl">Ambiente Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Salas climatizadas e acolhedoras, brinquedoteca com materiais lúdicos não-tóxicos e área externa protegida para recreação ao ar livre.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
