import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export default function ContatoPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-24 overflow-hidden">
      
      {/* Hero Contato */}
      <section className="relative pt-12 md:pt-16 pb-14 bg-gradient-to-b from-primary/5 via-slate-50 to-white border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 text-center space-y-6">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/25 px-3.5 py-1 text-xs font-bold inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            Canais de Atendimento
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Estamos de Portas Abertas
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
            Entre em contato com nossa equipe para dúvidas sobre matrículas, agendamento de visitas, voluntariado ou doações.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Informações Institucionais */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-border/80 shadow-layered bg-white p-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Nossa Sede</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-slate-600">
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Endereço Oficial</strong>
                    <span>QN 08A, Riacho Fundo II<br />Brasília - DF, CEP 71.880-110</span>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-brandOrange/10 text-brandOrange flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Telefone Fixo</strong>
                    <a href="tel:+556133331552" className="hover:text-primary transition-colors">
                      (61) 3333-1552
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-brandGreen/10 text-brandGreen flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">E-mail Institucional</strong>
                    <a href="mailto:instituto@inav.org.br" className="hover:text-primary transition-colors">
                      instituto@inav.org.br
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start border-t pt-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Horário de Funcionamento</strong>
                    <span>Segunda a Sexta: 07h30 às 17h30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banner WhatsApp */}
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl text-white shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 font-bold text-lg">
                <MessageCircle className="w-6 h-6 fill-white/20" />
                Atendimento via WhatsApp
              </div>
              <p className="text-xs text-emerald-50 leading-relaxed">
                Converse diretamente com a coordenação pedagógica do INAV para tirar dúvidas com agilidade.
              </p>
              <Button asChild size="lg" className="w-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold h-12 shadow-md">
                <a href="https://wa.me/5561999999999" target="_blank" rel="noopener noreferrer">
                  Conversar no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Formulário de Mensagem */}
          <div className="lg:col-span-7">
            <Card className="border-border/80 shadow-layered bg-white p-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Envie uma Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-lg font-bold text-emerald-900">Mensagem Enviada com Sucesso!</h3>
                    <p className="text-xs text-emerald-700">
                      Obrigado pelo contato. Nossa equipe responderá o mais breve possível.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="nome">
                        Nome Completo *
                      </label>
                      <Input id="nome" placeholder="Digite seu nome" required className="h-11 rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700" htmlFor="email">
                          E-mail *
                        </label>
                        <Input id="email" type="email" placeholder="seu@email.com" required className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700" htmlFor="telefone">
                          Telefone / WhatsApp
                        </label>
                        <Input id="telefone" placeholder="(61) 99999-9999" className="h-11 rounded-xl" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700" htmlFor="mensagem">
                        Mensagem *
                      </label>
                      <textarea
                        id="mensagem"
                        rows={5}
                        required
                        placeholder="Como podemos te ajudar?"
                        className="w-full rounded-xl border border-input bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      />
                    </div>

                    <Button type="submit" variant="orange" className="w-full gap-2 h-13 text-base font-bold shadow-glow-orange rounded-xl">
                      <Send className="w-4 h-4" /> Enviar Mensagem
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
