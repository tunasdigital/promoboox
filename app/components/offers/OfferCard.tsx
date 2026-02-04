"use client";

type OfferTag = "HOJE" | "VALE";

export type Offer = {
  id: string;
  title: string;
  store: string;
  price: number; // em reais
  oldPrice?: number;
  tags?: OfferTag[];
  href?: string; // por enquanto: link simples (depois vira Lomadee deep-link)
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function OfferCard({
  offer,
  clicks,
  onOpen,
}: {
  offer: Offer;
  clicks: number;
  onOpen: () => void;
}) {
  const tag = offer.tags?.includes("HOJE")
    ? "HOJE"
    : offer.tags?.includes("VALE")
    ? "VALE"
    : null;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* imagem placeholder por enquanto */}
      <div className="aspect-square w-full bg-slate-50" />

      {/* Loja */}
      <div className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700">
        {offer.store.toUpperCase()}
      </div>

      {/* Selo */}
      {tag ? (
        <div
          className={[
            "absolute right-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold text-white",
            tag === "HOJE" ? "bg-emerald-600" : "bg-indigo-600",
          ].join(" ")}
        >
          {tag}
        </div>
      ) : null}

      {/* Cliques */}
      <div className="absolute left-3 top-9 flex items-center gap-1 text-[12px] font-semibold text-slate-700">
        <span aria-hidden>👆</span>
        <span>{clicks}</span>
      </div>

      {/* Conteúdo */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          {formatBRL(offer.price)}
        </div>

        {offer.oldPrice ? (
          <div className="mt-0.5 text-[12px] font-medium text-slate-500 line-through">
            {formatBRL(offer.oldPrice)}
          </div>
        ) : (
          <div className="mt-0.5 text-[12px] font-medium text-slate-500">&nbsp;</div>
        )}

        <div className="mt-1 text-[12px] font-medium text-slate-700">
          {offer.title}
        </div>
      </div>

      {/* Hover/Tap */}
      <div className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          onClick={onOpen}
          className="rounded-xl bg-white px-4 py-3 text-center shadow-sm"
          title="Abrir oferta em nova aba"
        >
          <div className="text-xs font-semibold text-slate-800">Abrir oferta</div>
          <div className="mt-1 text-[11px] text-slate-500">nova aba</div>
        </button>
      </div>

      {/**
       * O que alterei:
       * - Extraí o componente OfferCard (idêntico ao do page.tsx) para /components/offers/OfferCard.tsx.
       * - Mantive o visual, hover, selo, cliques e formatação BRL.
       *
       * O que esperar:
       * - Nada muda ainda na tela (o page.tsx ainda usa o OfferCard interno).
       * - No próximo passo, vamos editar SOMENTE o app/page.tsx para importar este componente e remover o OfferCard interno.
       */}
    </article>
  );
}
