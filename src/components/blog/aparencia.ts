import {
  Camera,
  Handshake,
  Heart,
  Landmark,
  Megaphone,
  Sprout,
  type LucideIcon,
} from "lucide-react";

import type { TipoDePost } from "@/lib/blog";

/*
 * Cor de cada tipo de publicação: a capa sem foto, o selo sobre a foto e o ícone da capa.
 * Sem laranja, que fica só para as chamadas de doação. Contraste AA conferido em texto pequeno
 * (selo de 12 px em negrito): o verde dos parceiros é mais escuro que o da marca por isso.
 */
export const aparencia: Record<TipoDePost, { cor: string; icone: LucideIcon }> = {
  aviso: { cor: "bg-[#FFF1D6] text-[#8A4B00]", icone: Megaphone },
  campanha: { cor: "bg-brand-blue text-white", icone: Heart },
  instagram: { cor: "bg-[#E3F5DC] text-[#1F6B1F]", icone: Camera },
  marco: { cor: "bg-brand-blue-soft text-brand-blue-deep", icone: Landmark },
  historia: { cor: "bg-brand-blue-deep text-brand-green-light", icone: Sprout },
  parceiro: { cor: "bg-[#267A27] text-white", icone: Handshake },
};

export const aparenciaDoTipo = (tipo: string) => aparencia[tipo as TipoDePost] ?? aparencia.marco;
