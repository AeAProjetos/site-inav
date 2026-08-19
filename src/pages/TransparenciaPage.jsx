import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, FileDown, Eye, FileText, Calendar, FilterX, Building2, Users, FileBarChart } from 'lucide-react';

const mockDocumentos = [
  {
    id: "doc-01",
    titulo: "Balanço Patrimonial Anual 2025",
    categoria: "contabil",
    categoriaLabel: "Contabilidade",
    ano: "2025",
    mes: "12",
    dataPublicacao: "15/01/2026",
    descricao: "Demonstrações contábeis e parecer da auditoria independente referente ao exercício de 2025.",
    arquivoUrl: "#",
    formato: "PDF",
    tamanho: "1.8 MB",
    icone: FileBarChart
  },
  {
    id: "doc-02",
    titulo: "Relatório de Execução de Parcerias - Q4 2025",
    categoria: "recursos",
    categoriaLabel: "Execução de Verbas",
    ano: "2025",
    mes: "12",
    dataPublicacao: "10/01/2026",
    descricao: "Detalhamento da aplicação de termos de fomento e parcerias com a SEDES-DF.",
    arquivoUrl: "#",
    formato: "PDF",
    tamanho: "950 KB",
    icone: FileText
  },
  {
    id: "doc-03",
    titulo: "Tabela de Cargos, Funções e Remunerações 2026",
    categoria: "rh",
    categoriaLabel: "Recursos Humanos",
    ano: "2026",
    mes: "01",
    dataPublicacao: "02/02/2026",
    descricao: "Quadro funcional institucional com cargos, faixas de remuneração e atribuições.",
    arquivoUrl: "#",
    formato: "PDF",
    tamanho: "420 KB",
    icone: Users
  },
  {
    id: "doc-04",
    titulo: "Estatuto Social e Ata de Eleição da Diretoria",
    categoria: "institucional",
    categoriaLabel: "Institucional",
    ano: "2024",
    mes: "08",
    dataPublicacao: "20/08/2024",
    descricao: "Estatuto registrado em cartório e ata da atual composição da diretoria executiva.",
    arquivoUrl: "#",
    formato: "PDF",
    tamanho: "3.2 MB",
    icone: Building2
  }
];

export default function TransparenciaPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [year, setYear] = useState("todos");

  const filteredDocs = useMemo(() => {
    return mockDocumentos.filter(doc => {
      const matchSearch = doc.titulo.toLowerCase().includes(search.toLowerCase()) || 
                          doc.descricao.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "todas" || doc.categoria === category;
      const matchYear = year === "todos" || doc.ano === year;
      return matchSearch && matchCat && matchYear;
    });
  }, [search, category, year]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl relative z-10">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Governança e Responsabilidade
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight text-balance">
              Portal da Transparência
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-pretty max-w-2xl">
              Acompanhe a aplicação de recursos, balanços contábeis e relatórios do Instituto Nair Valadares com total clareza.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-8 max-w-6xl relative z-20 space-y-10">
        
        {/* Filtros em formato de Toolbar Flutuante */}
        <Card className="p-4 md:p-6 shadow-lg shadow-slate-200/50 border-slate-200/60 bg-white/80 backdrop-blur-xl" aria-label="Filtros de Busca">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:flex-1">
              <label htmlFor="search" className="sr-only">Buscar documentos</label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden="true" />
              <Input 
                id="search"
                type="text" 
                placeholder="Pesquisar documentos..." 
                className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-primary/30 text-base"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-64">
              <label htmlFor="category" className="sr-only">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="h-12 bg-white border-slate-200 focus-visible:ring-primary/30">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  <SelectItem value="contabil">Contabilidade</SelectItem>
                  <SelectItem value="recursos">Execução de Verbas</SelectItem>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="institucional">Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label htmlFor="year" className="sr-only">Exercício (Ano)</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year" className="h-12 bg-white border-slate-200 focus-visible:ring-primary/30">
                  <SelectValue placeholder="Exercício" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  <SelectItem value="todos">Todos os anos</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Listagem de Resultados */}
        <section aria-live="polite" className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Resultados Encontrados</h2>
            <Badge variant="outline" className="tabular-nums font-semibold text-sm px-3 py-1 bg-white">
              {filteredDocs.length} {filteredDocs.length === 1 ? 'item' : 'itens'}
            </Badge>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/50">
              <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Search className="h-8 w-8 text-slate-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum documento encontrado</h3>
              <p className="text-slate-500 max-w-md mb-6">
                Sua busca não retornou resultados. Experimente utilizar outros termos ou remover os filtros aplicados.
              </p>
              <Button onClick={() => { setSearch(''); setCategory('todas'); setYear('todos'); }} className="gap-2">
                <FilterX className="h-4 w-4" />
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredDocs.map((doc) => {
                const Icon = doc.icone || FileText;
                return (
                  <Card key={doc.id} className="group flex flex-col h-full bg-white hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 border-slate-200/60 overflow-hidden">
                    <CardHeader className="space-y-4 pb-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none transition-colors">
                          {doc.categoriaLabel}
                        </Badge>
                        <div className="flex items-center text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border">
                          <Calendar className="mr-1.5 h-3.5 w-3.5" />
                          <span className="tabular-nums">{doc.ano}</span>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="hidden sm:flex mt-1 h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors">
                          {doc.titulo}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-slate-600 line-clamp-3 text-pretty pl-0 sm:pl-16">
                        {doc.descricao}
                      </p>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 pt-5 pb-5 border-t bg-slate-50/50 mt-4">
                      <div className="text-xs text-slate-500 flex flex-col gap-1 w-full sm:w-auto pl-0 sm:pl-16">
                        <span className="font-medium text-slate-700">Publicado: <span className="tabular-nums">{doc.dataPublicacao}</span></span>
                        <span>{doc.formato} • {doc.tamanho.replace(' ', '\u00A0')}</span>
                      </div>
                      <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-auto gap-2">
                        <Button variant="outline" size="sm" asChild className="w-full sm:w-auto bg-white hover:bg-slate-100 focus-visible:ring-primary/30">
                          <a href={doc.arquivoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visualizar ${doc.titulo}`}>
                            <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                            Visualizar
                          </a>
                        </Button>
                        <Button size="sm" asChild className="w-full sm:w-auto shadow-none hover:shadow-md transition-shadow focus-visible:ring-primary/30">
                          <a href={doc.arquivoUrl} download aria-label={`Baixar ${doc.titulo}`}>
                            <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                            Baixar
                          </a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
