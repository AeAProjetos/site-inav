import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Utensils,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Copy,
  Check,
  Quote,
  Building2
} from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import ImpactSection from '@/components/ui/ImpactSection';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [copiedPix, setCopiedPix] = useState(false);
  const chavePix = "instituto@inav.org.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="pb-24">

      {/* 1. HERO SECTION — FULL-SCREEN MOCKUP */}
      <HeroSection />

      {/* 2. IMPACT SECTION — Scroll-Pinned */}
      <ImpactSection />


      {/* 3. COMO FUNCIONA — 3 PASSOS VISUAIS */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <Badge variant="outline" className="text-xs font-bold px-3.5 py-1 border-brandOrange/30 text-brandOrange-dark">
            Como Funciona
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Uma jornada de cuidado em <span style={{ color: '#F58220' }}>3 etapas</span>
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Do acolhimento à transformação, cada etapa é desenhada com carinho para garantir o melhor desenvolvimento.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
            position: 'relative',
          }}
          className="como-funciona-grid"
        >
          {/* Connector line (desktop only) */}
          <div
            style={{
              position: 'absolute',
              top: '64px',
              left: '16.67%',
              right: '16.67%',
              height: '2px',
              background: 'repeating-linear-gradient(to right, #e2e8f0 0, #e2e8f0 8px, transparent 8px, transparent 16px)',
              zIndex: 0,
            }}
            className="como-funciona-connector"
          />

          {/* Step 1: Acolhemos */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                border: '2px solid #BFDBFE',
              }}
            >
              🤗
            </div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#005CA9',
                marginBottom: '8px',
              }}
            >
              Etapa 01
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Acolhemos
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
              Recebemos crianças de 02 a 03 anos em tempo integral com carinho, segurança e 4 refeições diárias.
            </p>
          </div>

          {/* Step 2: Educamos */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
                border: '2px solid #FED7AA',
              }}
            >
              📚
            </div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#D96B0F',
                marginBottom: '8px',
              }}
            >
              Etapa 02
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Educamos
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
              Desenvolvimento pedagógico lúdico com estímulo psicomotor, contação de histórias e convivência fraterna.
            </p>
          </div>

          {/* Step 3: Transformamos */}
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                border: '2px solid #BBF7D0',
              }}
            >
              🌱
            </div>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#359020',
                marginBottom: '8px',
              }}
            >
              Etapa 03
            </span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Transformamos
            </h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
              Construímos uma base sólida para um futuro cheio de oportunidades, impactando famílias e toda a comunidade.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FRENTES DE ATUAÇÃO / PROJETOS COM BOM ESPAÇAMENTO */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge variant="outline" className="text-xs font-bold px-3.5 py-1 border-primary/30 text-primary">
            Nossas Frentes de Atuação
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Como Transformamos Vidas
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Iniciativas integradas focadas no desenvolvimento infantil e na autonomia das famílias no Riacho Fundo II.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">

          {/* Card 1: Educação Infantil */}
          <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200/80 bg-white flex flex-col justify-between group rounded-3xl">
            <div>
              <div className="h-52 overflow-hidden bg-slate-100">
                <img
                  src="/img/refeicao_rotina.jpg"
                  alt="Alimentação e rotina na creche INAV"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="p-6 md:p-8 pb-3 space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" /> Primeira Infância
                </div>
                <CardTitle className="text-xl font-bold">Educação Infantil</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Estímulo psicomotor, contação de histórias e convivência fraterna em tempo integral com profissionais dedicados.
                </p>
              </CardContent>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button variant="outline" asChild className="w-full justify-between font-semibold text-sm h-11 rounded-xl">
                <Link to="/educacao-infantil">
                  <span>Ver Rotina</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Card 2: Ateliê do Sabor */}
          <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200/80 bg-white flex flex-col justify-between group rounded-3xl">
            <div>
              <div className="h-52 overflow-hidden bg-slate-100">
                <img
                  src="/img/atelie_sabor.jpg"
                  alt="Gastronomia Social do Ateliê do Sabor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardHeader className="p-6 md:p-8 pb-3 space-y-2">
                <div className="flex items-center gap-2 text-brandOrange font-bold text-xs uppercase tracking-wider">
                  <Utensils className="w-4 h-4" /> Geração de Renda
                </div>
                <CardTitle className="text-xl font-bold">Ateliê do Sabor</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Oficinas de panificação e culinária que capacitam mães e responsáveis para conquistar independência financeira.
                </p>
              </CardContent>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button variant="outline" asChild className="w-full justify-between font-semibold text-sm h-11 rounded-xl">
                <Link to="/projetos">
                  <span>Conhecer Projeto</span>
                  <ArrowRight className="w-4 h-4 text-brandOrange" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Card 3: Transparência */}
          <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200/80 bg-white flex flex-col justify-between group rounded-3xl">
            <div>
              <div className="h-52 bg-gradient-to-br from-slate-900 via-primary-dark to-primary p-6 md:p-8 flex flex-col justify-between text-white">
                <ShieldCheck className="w-10 h-10 text-brandGreen" />
                <div>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Governança Aberta</span>
                  <span className="text-lg font-bold text-white block">Prestação de Contas</span>
                </div>
              </div>
              <CardHeader className="p-6 md:p-8 pb-3 space-y-2">
                <div className="flex items-center gap-2 text-brandGreen font-bold text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4" /> Auditoria & Parcerias
                </div>
                <CardTitle className="text-xl font-bold">Transparência Total</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <p className="text-slate-600 text-sm leading-relaxed">
                  Acesse balanços patrimoniais anuais, demonstrativos contábeis e prestação de contas dos termos de fomento.
                </p>
              </CardContent>
            </div>
            <div className="p-6 md:p-8 pt-0">
              <Button variant="outline" asChild className="w-full justify-between font-semibold text-sm h-11 rounded-xl">
                <Link to="/transparencia">
                  <span>Acessar Balanços</span>
                  <ArrowRight className="w-4 h-4 text-brandGreen" />
                </Link>
              </Button>
            </div>
          </Card>

        </div>
      </section>

      {/* 4. DEPOIMENTO HUMANO EM SEÇÃO DEDICADA */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-8">
        <div className="bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-white rounded-3xl p-8 sm:p-12 md:p-16 border border-brandOrange/20 shadow-sm relative">
          <Quote className="w-12 h-12 text-brandOrange/20 absolute top-6 right-6 sm:top-10 sm:right-10" />

          <div className="space-y-6 max-w-3xl">
            <Badge className="bg-brandOrange/15 text-brandOrange-dark border-none font-bold">
              ❤ Histórias Reais
            </Badge>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-display font-medium text-slate-800 leading-relaxed">
              "Ter meu filho no INAV em tempo integral me deu a oportunidade de trabalhar com tranquilidade. Sei que ele é tratado com amor, come bem e aprende todos os dias."
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-brandOrange/15">
              <div className="h-12 w-12 rounded-full bg-brandOrange text-white flex items-center justify-center font-bold text-base shadow-sm">
                M
              </div>
              <div>
                <strong className="block text-slate-900 text-base font-bold">Maria de Fátima</strong>
                <span className="text-xs sm:text-sm text-slate-500">Mãe de aluno do Riacho Fundo II</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOAÇÃO PIX DIRETA COM EXCELENTE ESPAÇAMENTO */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 md:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-7 space-y-5 text-left">
              <Badge className="bg-brandOrange text-white font-bold text-xs border-none px-3 py-1">
                Doação Direta
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
                Apoie o dia a dia das 240 crianças
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
                Qualquer contribuição ajuda diretamente na compra de frutas frescas, materiais pedagógicos e na manutenção das salas de aula.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 text-slate-900 space-y-4 shadow-lg">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-brandOrange/10 flex items-center justify-center text-brandOrange shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block tracking-wider">Chave PIX (E-mail):</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{chavePix}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-700 font-mono text-xs sm:text-sm font-semibold truncate">{chavePix}</span>
                <Button
                  size="sm"
                  onClick={handleCopyPix}
                  className="bg-brandOrange hover:bg-brandOrange-dark text-white shrink-0 gap-1.5 font-bold text-xs h-9 px-4 rounded-lg"
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-4 h-4" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copiar
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center pt-1">
                Favorecido: <strong>Instituto Nair Valadares</strong> • 100% Seguro
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
