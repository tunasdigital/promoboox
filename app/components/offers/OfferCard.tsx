"use client";

type OfferTag = "HOJE" | "VALE";

export type Offer = {
  id: string;
  title: string;
  store: string;
  price: number; // em reais
  oldPrice?: number;
  tags?: OfferTag[];
  href?: string; // por enquanto: link simples
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
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border bg-white",
        "border-slate-200 transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg",
        "focus-within:ring-2 focus-within:ring-yellow-400/30",
      ].join(" ")}
    >
      {/* imagem placeholder por enquanto */}
      <div className="relative aspect-square w-full bg-slate-50">
        {/* brilho amarelo sutil no hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-yellow-400/20 blur-2xl" />
        </div>

        {/* micro-zoom sutil (sem imagem ainda, mas já prepara o efeito) */}
        <div className="absolute inset-0 scale-[1.01] transition-transform duration-200 group-hover:scale-[1.04]" />
      </div>

      {/* Loja */}
      <div className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm">
        {offer.store.toUpperCase()}
      </div>

      {/* Selo */}
      {tag ? (
        <div
          className={[
            "absolute right-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold text-white shadow-sm",
            tag === "HOJE" ? "bg-emerald-600" : "bg-indigo-600",
          ].join(" ")}
        >
          {tag}
        </div>
      ) : null}

      {/* Cliques */}
      <div className="absolute left-3 top-9 text-[11px] font-semibold text-slate-700">
        Cliques: <span className="text-slate-900">{clicks}</span>
      </div>

      {/* Conteúdo */}
      <div className="absolute bottom-3 left-3 right-3">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-slate-950">
          {formatBRL(offer.price)}
        </div>

        {offer.oldPrice ? (
          <div className="mt-0.5 text-[12px] font-medium text-slate-500 line-through">
            {formatBRL(offer.oldPrice)}
          </div>
        ) : (
          <div className="mt-0.5 text-[12px] font-medium text-slate-500">
            &nbsp;
          </div>
        )}

        <div className="mt-1 text-[12px] font-medium text-slate-700 line-clamp-2">
          {offer.title}
        </div>
      </div>

      {/* Hover overlay amarelo (marca) */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/80 via-yellow-400/40 to-transparent" />

        <div className="absolute inset-0 grid place-items-center">
          <button
            type="button"
            onClick={onOpen}
            className={[
              "rounded-xl bg-white px-4 py-3 text-center shadow-md",
              "transition-all duration-150",
              "hover:-translate-y-0.5 hover:shadow-lg",
              "active:scale-[0.97]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            ].join(" ")}
            title="Abrir oferta em nova aba"
          >
            <div className="text-xs font-semibold text-slate-900">
              Abrir oferta
            </div>
            <div className="mt-1 text-[11px] text-slate-600">nova aba</div>
          </button>
        </div>
      </div>

      {/**
       * O que alterei:
       * - Corrigi o OfferCard.tsx (estava quebrando o build com string/JSX incompleto).
       * - Mantive micro-efeitos de hover e troquei o overlay para amarelo da marca.
       *
       * O que esperar:
       * - Build volta a compilar sem “Unterminated string constant”.
       * - Hover fica com energia amarela (sem degradê escuro).
       *
       * Espera-se com esta alteração que:
       * - O card continue premium e mais alinhado ao branding PromoBOOX.
       */}
    </article>
  );
}
