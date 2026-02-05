// app/components/offers/OffersGridMini.tsx
"use client";

import { useMemo } from "react";
import type { Offer } from "@/app/components/offers/OfferCard";

type Props = {
  offers: Offer[];
  onOpenOffer: (offer: Offer) => void;
  title?: string;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/**
 * DOBRA 02 — MINI GRID (estilo “milliondollarhomepage”)
 * Regra visual:
 * - tile bem pequeno
 * - (por enquanto) logo = iniciais + cor; depois você troca por imagem real
 * - imagem do produto = placeholder (depois vira <img src=...>)
 * - preção embaixo
 *
 * Grid:
 * - Até XL: 10 por linha
 * - Sempre dentro de max-w-6xl (NUNCA extrema a extrema)
 */
export default function OffersGridMini({
  offers,
  onOpenOffer,
  title = "Dobra teste (mini cards)",
}: Props) {
  // só pra garantir “a mesma vitrine” e evitar ficar enorme: pega um recorte
  const slice = useMemo(() => offers.slice(0, 30), [offers]);

  return (
    <section className="w-full bg-sky-50/70 py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h3 className="text-sm font-extrabold text-slate-900">{title}</h3>
          <div className="text-[11px] font-semibold text-slate-500">
            10 por linha (XL)
          </div>
        </div>

        {/* “mosaico” */}
        <div
          className={[
            "grid gap-3",
            "grid-cols-4",
            "sm:grid-cols-6",
            "md:grid-cols-8",
            "xl:grid-cols-10",
          ].join(" ")}
        >
          {slice.map((offer) => (
            <MiniTile key={offer.id} offer={offer} onOpen={() => onOpenOffer(offer)} />
          ))}
        </div>
      </div>

      {/**
       * O que alterei:
       * - Transformei a dobra 02 em um “mosaico” de tiles pequenos (estilo milliondollarhomepage).
       * - Removi excesso de texto dentro do mini card: agora é só “logo”, imagem (placeholder) e preço.
       * - Limitei a largura com max-w-6xl + px-6 (não fica extrema a extrema).
       * - Ajustei o grid para chegar em 10 colunas no XL.
       *
       * O que esperar:
       * - Os mini cards ficam realmente mini e “diferentões”, com leitura rápida.
       * - A dobra 02 vira uma área visual de alto volume (bem “pixel grid”).
       *
       * Espera-se com esta alteração que:
       * - Você valide a ideia do “mosaico de achados” antes de colocar imagem real + logo real por loja.
       */}
    </section>
  );
}

function MiniTile({ offer, onOpen }: { offer: Offer; onOpen: () => void }) {
  const initials = getInitials(offer.store);
  const accent = getAccentByStore(offer.store);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white text-left",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/40",
      ].join(" ")}
      title={offer.title}
    >
      {/* “logo” (placeholder) — depois você troca por <img src="/imagens/brands/..." /> */}
      <div className="absolute left-1.5 top-1.5 z-10">
        <div
          className={[
            "grid h-6 w-6 place-items-center rounded-full text-[10px] font-extrabold text-white shadow-sm",
            accent,
          ].join(" ")}
        >
          {initials}
        </div>
      </div>

      {/* imagem do produto (placeholder) */}
      <div className="relative aspect-square w-full bg-slate-100">
        {/* brilho amarelo da marca no hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-yellow-400/25 blur-2xl" />
        </div>

        {/* “thumb” fake — só pra dar sensação de produto */}
        <div className="absolute inset-3 rounded-lg bg-white/55 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]" />
      </div>

      {/* preção */}
      <div className="px-2 pb-2 pt-1.5">
        <div className="text-[13px] font-extrabold tracking-tight text-slate-900">
          {formatBRL(offer.price)}
        </div>
      </div>
    </button>
  );
}

function getInitials(store: string) {
  const s = (store ?? "").trim();
  if (!s) return "•";
  const parts = s.split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase().slice(0, 2);
}

function getAccentByStore(store: string) {
  const key = (store ?? "").toLowerCase();

  // cores “aproximadas” das marcas (placeholder)
  if (key.includes("amazon")) return "bg-slate-900";
  if (key.includes("magalu")) return "bg-sky-500";
  if (key.includes("kabum") || key.includes("kaBuM".toLowerCase())) return "bg-orange-500";
  if (key.includes("shopee")) return "bg-orange-600";
  if (key.includes("mercado")) return "bg-yellow-500";
  if (key.includes("americanas")) return "bg-red-600";

  return "bg-slate-700";
}
