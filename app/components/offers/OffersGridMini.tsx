"use client";

import OfferCard, { Offer } from "./OfferCard";

export default function OffersGridMini({
  offers,
  clicksById,
  onOpenOffer,
}: {
  offers: Offer[];
  clicksById: Record<string, number>;
  onOpenOffer: (offer: Offer) => void;
}) {
  return (
    <section
      className="mx-auto w-full px-6 py-10 bg-[var(--mini-bg)]"
      style={{
        // 🎨 COR DA DOBRA (clique no quadrado para abrir o picker)
        ["--mini-bg" as any]: "#e8f4ff",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">
            Dobra teste (mini cards)
          </h2>

          <span className="text-xs text-slate-500">7 por linha (XL)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              clicks={clicksById[offer.id] ?? 0}
              onOpen={() => onOpenOffer(offer)}
              variant="mini"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * O que alterei:
 * - Criei uma variável CSS local (--mini-bg) direto no componente.
 * - Apliquei o background usando bg-[var(--mini-bg)].
 *
 * O que esperar:
 * - O VS Code abre o color picker ao clicar no hex.
 * - A cor afeta SOMENTE essa dobra.
 *
 * Espera-se com esta alteração que:
 * - Você possa testar rapidamente fundos diferentes sem “sujar” o tema global.
 */
