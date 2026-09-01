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
  /* PLACEHOLDER — trocar pelos dados oficiais */
  pixKey: "00.000.000/0001-00",
  pixLabel: "CNPJ",
  phone: "(00) 0000-0000",
  whatsapp: "5500000000000",
  whatsappDisplay: "(00) 00000-0000",
  email: "contato@inav.org.br",
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
  { value: "4", label: "Refeições diárias", detail: "nutrição balanceada e acompanhada" },
  { value: "100%", label: "Gratuito", detail: "para todas as famílias atendidas" },
] as const;

export const navigation = [
  { label: "Início", to: "/" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Educação Infantil", to: "/educacao-infantil" },
  { label: "Projetos", to: "/projetos" },
  { label: "Transparência", to: "/transparencia" },
  { label: "Quer Ajudar", to: "/quer-ajudar" },
  { label: "Contato", to: "/contato" },
] as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Olá! Gostaria de saber mais sobre o Instituto Nair Valadares.",
)}`;
