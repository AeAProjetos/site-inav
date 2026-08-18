export const mockDocumentos = [
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

function renderDocumentos(lista) {
  const container = document.getElementById("documents-list");
  const countBadge = document.getElementById("results-count");

  if (!container || !countBadge) return;

  countBadge.textContent = `${lista.length} documento(s) encontrado(s)`;

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhum documento encontrado com os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = lista
    .map(
      (doc) => `
    <article class="doc-card" id="${doc.id}">
      <div class="doc-header">
        <span class="doc-category">${doc.categoriaLabel}</span>
        <span class="doc-year">${doc.ano}</span>
      </div>
      <h3 class="doc-title">${doc.titulo}</h3>
      <p class="doc-desc">${doc.descricao}</p>
      <div class="doc-footer">
        <span class="doc-meta">Publicado em: ${doc.dataPublicacao} (${doc.formato} • ${doc.tamanho})</span>
        <div class="doc-actions">
          <a href="${doc.arquivoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" aria-label="Visualizar ${doc.titulo}">
            Visualizar
          </a>
          <a href="${doc.arquivoUrl}" download class="btn btn-primary" aria-label="Baixar ${doc.titulo}">
            Baixar
          </a>
        </div>
      </div>
    </article>
  `
    )
    .join("");
}

function filtrarDocumentos() {
  const searchVal = document.getElementById("search-input")?.value.toLowerCase().trim() || "";
  const catVal = document.getElementById("category-filter")?.value || "todas";
  const yearVal = document.getElementById("year-filter")?.value || "todos";

  const filtrados = mockDocumentos.filter((doc) => {
    const matchSearch =
      doc.titulo.toLowerCase().includes(searchVal) ||
      doc.descricao.toLowerCase().includes(searchVal);
    const matchCat = catVal === "todas" || doc.categoria === catVal;
    const matchYear = yearVal === "todos" || doc.ano === yearVal;

    return matchSearch && matchCat && matchYear;
  });

  renderDocumentos(filtrados);
}

document.addEventListener("DOMContentLoaded", () => {
  renderDocumentos(mockDocumentos);

  document.getElementById("search-input")?.addEventListener("input", filtrarDocumentos);
  document.getElementById("category-filter")?.addEventListener("change", filtrarDocumentos);
  document.getElementById("year-filter")?.addEventListener("change", filtrarDocumentos);
});
