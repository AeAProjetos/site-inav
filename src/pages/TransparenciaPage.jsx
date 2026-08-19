import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, FileDown, Eye } from 'lucide-react';

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
    tamanho: "1.8 MB"
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
    tamanho: "950 KB"
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
    tamanho: "420 KB"
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
    tamanho: "3.2 MB"
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
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <header className="mb-12 text-center md:text-left space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-primary">
          Portal da Transparência
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed text-balance">
          Acompanhe a aplicação de recursos, balanços contábeis e relatórios do INAV com total clareza e responsabilidade.
        </p>
      </header>

      <section className="bg-card border rounded-xl p-6 shadow-sm mb-10 space-y-6" aria-label="Filtros de Documentos">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <label htmlFor="search" className="sr-only">Buscar documentos</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input 
              id="search"
              type="text" 
              placeholder="Buscar por título ou descrição…" 
              className="pl-10 h-12 focus-visible:ring-2"
              autoComplete="off"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-3">
            <label htmlFor="category" className="sr-only">Categoria</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="h-12 focus-visible:ring-2">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                <SelectItem value="contabil">Balanços e Contabilidade</SelectItem>
                <SelectItem value="recursos">Execução de Verbas e Parcerias</SelectItem>
                <SelectItem value="rh">Cargos, Funções e Remuneração</SelectItem>
                <SelectItem value="institucional">Estatutos e Atas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor="year" className="sr-only">Exercício (Ano)</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" className="h-12 focus-visible:ring-2">
                <SelectValue placeholder="Exercício (Ano)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os anos</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Documentos Públicos</h2>
          <Badge variant="secondary" className="tabular-nums font-medium text-sm">
            {filteredDocs.length} {filteredDocs.length === 1 ? 'documento' : 'documentos'}
          </Badge>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 border rounded-xl border-dashed bg-muted/30">
            <div className="p-4 bg-muted rounded-full">
              <Search className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-medium">Nenhum documento encontrado</h3>
            <p className="text-muted-foreground max-w-sm">
              Não encontramos nenhum arquivo que corresponda aos filtros atuais. Tente usar termos diferentes ou limpar os filtros.
            </p>
            <Button variant="outline" onClick={() => { setSearch(''); setCategory('todas'); setYear('todos'); }} className="mt-2 focus-visible:ring-2">
              Limpar todos os filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <Card key={doc.id} className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
                <CardHeader className="space-y-2 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                      {doc.categoriaLabel}
                    </Badge>
                    <span className="text-sm font-medium tabular-nums text-muted-foreground bg-muted px-2 py-1 rounded-md">
                      {doc.ano}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-snug line-clamp-2">
                    {doc.titulo}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 text-pretty">
                    {doc.descricao}
                  </p>
                </CardContent>
                
                <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t bg-muted/10 rounded-b-xl">
                  <div className="text-xs text-muted-foreground flex flex-col gap-1 tabular-nums">
                    <span>Publicado em: {doc.dataPublicacao}</span>
                    <span className="font-medium">{doc.formato} • {doc.tamanho.replace(' ', '\u00A0')}</span>
                  </div>
                  <div className="flex w-full sm:w-auto gap-2">
                    <Button variant="outline" size="sm" asChild className="w-full sm:w-auto focus-visible:ring-2">
                      <a href={doc.arquivoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visualizar ${doc.titulo}`}>
                        <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                        Visualizar
                      </a>
                    </Button>
                    <Button size="sm" asChild className="w-full sm:w-auto focus-visible:ring-2">
                      <a href={doc.arquivoUrl} download aria-label={`Baixar ${doc.titulo}`}>
                        <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
                        Baixar
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
