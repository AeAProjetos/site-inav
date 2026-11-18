/**
 * Dados institucionais centralizados.
 * Substitua os valores marcados como PLACEHOLDER pelos dados oficiais do INAV.
 */

/** Horário confirmado em 04/11/2026. Em duas partes para o topo do Contato. */
const horario = { dias: "Segunda a sexta", horas: "das 7h30 às 17h30" } as const;

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
  /** Celular do INAV para WhatsApp e pedidos do bazar (30/10/2026). */
  whatsapp: "5561993949017",
  whatsappDisplay: "(61) 99394-9017",
  /** Telefone fixo do cartão do CNPJ, confirmado em 18/11/2026. No Contato e no rodapé. */
  landline: "(61) 3333-1552",
  landlineTel: "+556133331552",
  /* PLACEHOLDER — trocar pelos dados oficiais */
  email: "contato@inav.org.br",
  /** Canal de Ética, como no site antigo. Mantido na Transparência em 12/11/2026. */
  ethicsEmail: "denuncia@inav.org.br",
  instagram: "instituicaoinav",
  /** Endereço e horário confirmados em 04/11/2026. */
  address: {
    street: "QN 08A, Conjunto 04 e 05, Lotes 01 e 02",
    city: "Riacho Fundo II, Brasília",
    state: "DF",
    zip: "71880-110",
  },
  hours: `${horario.dias}, ${horario.horas}`,
  horario,
} as const;

/**
 * Meta de crianças do 3º aditivo do Termo de Colaboração com a SEEDF (2026), em uso desde
 * 18/11/2026. Antes era 240. O INAV vai confirmar o número atual de matrículas.
 * Usado na Home e no Amigos INAV. O 240 de Projetos descreve o projeto VEPEMA como foi aprovado.
 */
export const criancasAtendidas = 234;

export const impactStats = [
  {
    value: String(criancasAtendidas),
    label: "Crianças atendidas",
    detail: "todos os dias, gratuitamente",
  },
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
  { label: "Amigos INAV", to: "/amigos-inav" },
  { label: "Contato", to: "/contato" },
] as const;

/** Conversa no WhatsApp do INAV com a primeira mensagem já escrita. */
export const whatsappLinkWith = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const whatsappLink = whatsappLinkWith(
  "Olá! Gostaria de saber mais sobre o Instituto Nair Valadares.",
);

/** As visitas são combinadas pelo WhatsApp, que envia as regras (INAV, 18/11/2026). */
export const visitWhatsappLink = whatsappLinkWith(
  "Olá! Gostaria de combinar uma visita ao Instituto Nair Valadares.",
);

export const instagramLink = `https://www.instagram.com/${site.instagram}/`;

export const landlineLink = `tel:${site.landlineTel}`;

/** O e-mail já abre com o assunto preenchido. */
export const ethicsMailto = `mailto:${site.ethicsEmail}?subject=${encodeURIComponent("Canal de Ética")}`;

/** Endereço em uma linha, para copiar. */
export const fullAddress = `${site.address.street}, ${site.address.city} - ${site.address.state}, CEP ${site.address.zip}`;

/** Busca no Google Maps pelo nome e pelo endereço, como pede a copy do Contato. Sem mapa incorporado. */
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.name}, ${site.address.street}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`,
)}`;

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
  /** Formulário próprio do programa Amigos INAV: entrega em financeiro@inav.org.br. */
  amigosFormspreeEndpoint: "https://formspree.io/f/mdeeqknl",
  /**
   * CSV com os documentos de transparência: "Planilha de alimentação -
   * Trasparencia (v5, 72 documentos).csv", no Drive do projeto (compartilhado
   * com qualquer pessoa com o link), desde 16/11/2026. Colunas na primeira
   * linha: titulo | nota | link | categoria | ano | destaque, separadas por
   * ";" ou "," (o Papa.parse detecta). link = URL pública do PDF no Drive;
   * destaque = ordem dos documentos de referência (1 primeiro).
   * Para atualizar sem mudar esta URL, substitua o arquivo no Drive em
   * Gerenciar versões → Enviar nova versão (manter o mesmo nome e o mesmo ID).
   * Também aceita a URL CSV de uma planilha Google publicada na web.
   * Sem a coluna categoria, ou se o arquivo não abrir, a página usa a lista de
   * src/lib/transparencia-documentos.ts.
   */
  transparencySheetCsvUrl:
    "https://drive.google.com/uc?export=download&id=1En5pahSWJ0x09i5aICNDb9k9diL3BCeh",
} as const;
