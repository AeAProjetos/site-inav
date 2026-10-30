/**
 * Dados institucionais centralizados.
 * Substitua os valores marcados como PLACEHOLDER pelos dados oficiais do INAV.
 */

export const site = {
  name: "Instituto Nair Valadares",
  shortName: "INAV",
  tagline: "Cuidado que acolhe. Educação que transforma.",
  description:
    "OSC sem fins lucrativos dedicada ao acolhimento, nutrição e educação infantil gratuita para crianças e famílias em situação de vulnerabilidade social.",
  url: "https://inav.org.br",
  /** Confirmado pelo INAV em 30/10/2026. */
  cnpj: "04.192.012/0001-16",
  /** A chave Pix é o próprio CNPJ, conferida no app do banco em 30/10/2026 (recebedor no BRB). */
  pixKey: "04.192.012/0001-16",
  pixLabel: "CNPJ",
  pixBank: "BRB",
  /* PLACEHOLDER — trocar pelos dados oficiais */
  phone: "(00) 0000-0000",
  whatsapp: "5500000000000",
  whatsappDisplay: "(00) 00000-0000",
  email: "contato@inav.org.br",
  instagram: "instituicaoinav",
  address: {
    street: "Rua Exemplo, 000 — Bairro",
    city: "Cidade",
    state: "UF",
    zip: "00000-000",
  },
  hours: "Segunda a sexta, das 7h às 17h",
} as const;

export const impactStats = [
  { value: "240+", label: "Crianças atendidas", detail: "todos os dias, gratuitamente" },
  { value: "25+", label: "Anos de história", detail: "de dedicação à comunidade" },
  { value: "5", label: "Refeições diárias", detail: "nutrição balanceada e acompanhada" },
  { value: "+10.000", label: "Crianças, adolescentes e famílias", detail: "beneficiadas" },
] as const;

export const navigation = [
  { label: "Início", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Educação Infantil", to: "/educacao-infantil" },
  { label: "Projetos", to: "/projetos" },
  { label: "Transparência", to: "/transparencia" },
  { label: "Bazar", to: "/bazar" },
  { label: "Blog", to: "/blog" },
  { label: "Quer Ajudar", to: "/quer-ajudar" },
  { label: "Contato", to: "/contato" },
] as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Olá! Gostaria de saber mais sobre o Instituto Nair Valadares.",
)}`;

export const instagramLink = `https://www.instagram.com/${site.instagram}/`;

/**
 * Integrações externas — preencher quando as contas estiverem criadas.
 */
export const integrations = {
  /**
   * PLACEHOLDER — crie um formulário em https://formspree.io, copie a URL do
   * endpoint (formato "https://formspree.io/f/xxxxxxxx") e cole aqui.
   * Enquanto vazio, o formulário de contato fica desabilitado com um aviso.
   */
  formspreeEndpoint: "https://formspree.io/f/xdeozbay",
  /**
   * CSV com os documentos de transparência: "Planilha de alimentação -
   * Trasparencia.csv", no Drive do projeto (compartilhado com qualquer pessoa
   * com o link). Colunas na primeira linha: titulo | nota | link, separadas
   * por ";" ou "," (o Papa.parse detecta). link = URL pública do PDF no Drive.
   * Para atualizar sem mudar esta URL, substitua o arquivo no Drive em
   * Gerenciar versões → Enviar nova versão (manter o mesmo nome e o mesmo ID).
   * Também aceita a URL CSV de uma planilha Google publicada na web.
   * Enquanto vazio, a página usa a lista estática de fallback.
   */
  transparencySheetCsvUrl:
    "https://drive.google.com/uc?export=download&id=1Rp-RkYZErWu7HFal_7OKhvbexBx4U001",
} as const;
