import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, Check, Building, HandHeart, Heart, ShieldCheck } from 'lucide-react';

export default function QuerAjudarPage() {
  const [copied, setCopied] = useState(false);
  const chavePix = "instituto@inav.org.br";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(chavePix);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-24 overflow-hidden">
      
      {/* Hero Quer Ajudar */}
      <section className="relative pt-12 md:pt-16 pb-14 bg-gradient-to-b from-brandOrange/5 via-slate-50 to-white border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <Badge variant="outline" className="bg-brandOrange/10 text-brandOrange-dark border-brandOrange/25 px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-brandOrange/20" />
            Faça Parte Desta Transformação
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Como Você Pode Ajudar o INAV
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Sua doação garante alimentação saudável, material pedagógico e acolhimento em tempo integral para 240 crianças do Riacho Fundo II.
          </p>
        </div>
      </section>

      {/* Grid de Formas de Apoio */}
      <div className="container mx-auto max-w-5xl px-4 space-y-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card PIX em Destaque */}
          <div className="lg:col-span-6">
            <Card className="border-brandOrange/30 shadow-layered bg-gradient-to-b from-white via-orange-50/20 to-orange-50/40 h-full flex flex-col justify-between p-2">
              <CardHeader className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-brandOrange text-white flex items-center justify-center shadow-md shadow-brandOrange/30">
                  <QrCode className="w-7 h-7" />
                </div>
                <Badge className="bg-brandOrange text-white font-bold w-fit border-none">
                  Doação Instantânea
                </Badge>
                <CardTitle className="text-2xl font-bold">PIX Direto na Conta Oficial</CardTitle>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Qualquer valor ajuda diretamente a garantir o almoço, frutas e materiais das crianças.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-white rounded-2xl p-4 border border-brandOrange/20 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Chave PIX Oficial (E-mail):
                  </span>
                  
                  <div className="flex items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm break-all">
                    <span className="text-slate-800 font-semibold">{chavePix}</span>
                    <Button
                      size="sm"
                      variant="orange"
                      onClick={handleCopyPix}
                      className="shrink-0 gap-1.5 font-bold h-9"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-white" /> Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copiar Chave
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p><strong>Favorecido:</strong> Instituto Nair Valadares</p>
                  <p><strong>Finalidade:</strong> Manutenção e Alimentação Infantil</p>
                  <p className="flex items-center gap-1 text-emerald-700 font-semibold pt-1">
                    <ShieldCheck className="w-4 h-4" /> Conta institucional auditada anualmente
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Outras Formas de Apoio */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            {/* Parcerias Corporativas */}
            <Card className="border-border/80 bg-white hover:shadow-warm-md transition-shadow">
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl">Parcerias Corporativas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sua empresa pode apadrinhar turmas inteiras, financiar melhorias na cozinha comunitária do Ateliê do Sabor ou doar materiais institucionais com selo de responsabilidade social.
                </p>
              </CardContent>
            </Card>

            {/* Doação de Alimentos e Brinquedos */}
            <Card className="border-border/80 bg-white hover:shadow-warm-md transition-shadow">
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brandGreen/10 text-brandGreen flex items-center justify-center font-bold">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl">Doação de Alimentos & Brinquedos</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Recebemos com gratidão alimentos não perecíveis, leite em pó, fraldas descartáveis, livros infantis e brinquedos educativos diretamente na nossa sede.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
