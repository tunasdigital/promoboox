"use client";

import React from "react";
import Image from "next/image";

// Tipagem atualizada para refletir os dados reais do banco Redis
export interface Offer {
  id: string;
  title?: string;
  store: string;
  price: number | string;
  oldPrice?: number | string;
  imageUrl: string;      // Sincronizado com formData do Dashboard
  productUrl: string;    // Sincronizado com formData do Dashboard
  tags?: string[];
  clicks?: number;
}

interface OfferCardProps {
  offer: Offer;
  clicks: number;
  onOpen: () => void;
}

export default function OfferCard({ offer, clicks, onOpen }: OfferCardProps) {
  // Fallback para garantir que sempre haja uma imagem, mesmo em erros de cadastro
  const displayImage = offer.imageUrl || "/imagens/placeholder.png";

  return (
    <div 
      onClick={onOpen}
      className="group relative bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
    >
      {/* Badge de Loja e Clicks */}
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-tighter">
          {offer.store}
        </span>
        <div className="flex flex-col items-end">
          {offer.tags?.includes("VALE") && (
            <span className="bg-[#0051FF] text-white text-[9px] font-black px-2 py-0.5 rounded-md mb-1">
              VALE
            </span>
          )}
          <span className="text-[9px] font-bold text-slate-400">Cliques: {clicks}</span>
        </div>
      </div>

      {/* Imagem do Produto - Usando a URL real do banco */}
      <div className="relative w-full aspect-square mb-4 flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden">
        <Image
          src={displayImage}
          alt={offer.title || "Oferta PromoBOOX"}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          unoptimized // Útil para imagens externas da Lomadee
        />
      </div>

      {/* Informações de Preço */}
      <div className="space-y-1">
        {offer.oldPrice && (
          <span className="text-xs text-slate-400 line-through font-medium">
            R$ {offer.oldPrice}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-slate-900">R$ {offer.price}</span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium leading-tight line-clamp-2 mt-2">
          {offer.title || `Oferta especial na ${offer.store}`}
        </p>
      </div>

      {/* Overlay Amarelo de Feedback (Branding) */}
      <div className="absolute inset-0 bg-[#facc15] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none" />
    </div>
  );
}