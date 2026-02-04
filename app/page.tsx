"use client";

import { useMemo, useState } from "react";
import OfferCard, { Offer } from "@/app/components/offers/OfferCard";
import TopBar from "@/app/components/layout/TopBar";
import Footer from "@/app/components/layout/Footer";

type OfferTag = "HOJE" | "VALE";

const OFFERS_SEED: Offer[] = [
  {
    id: "1",
    title: "Cabo USB-C Reforçado 2m",
    store: "Kabum",
    price: 19.9,
    oldPrice: 39.9,
    tags: ["VALE"],
    href: "https://www.google.com/search?q=Cabo+USB-C+Refor%C3%A7ado+2m",
  },
  {
    id: "2",
    title: "Mouse Pad XXL Preto",
    store: "Amazon",
    price: 29.9,
    oldPrice: 49.9,
    href: "https://www.google.com/search?q=Mouse+Pad+XXL+Preto",
  },
  {
    id: "3",
    title: "Garrafa Térmica 500ml",
    store: "Mercado Livre",
    price: 39.9,
    tags: ["HOJE"],
    href: "https://www.google.com/search?q=Garrafa+T%C3%A9rmica+500ml",
  },
  {
    id: "4",
    title: "Lâmpada LED 12W",
    store: "Magalu",
    price: 9.9,
    oldPrice: 19.9,
    href: "https://www.google.com/search?q=L%C3%A2mpada+LED+12W",
  },
  {
    id: "5",
    title: "Kit 3 Panos Microfibra",
    store: "Shopee",
    price: 14.9,
    tags: ["HOJE"],
    href: "https://www.google.com/search?q=Kit+3+Panos+Microfibra",
  },
  {
    id: "6",
    title: "Fone Bluetooth Básico",
    store: "Americanas",
    price: 49.9,
    oldPrice: 79.9,
    tags: ["VALE"],
    href: "https://www.google.com/search?q=Fone+Bluetooth+B%C3%A1sico",
  },
  {
    id: "7",
    title: "Suporte de Celular Mesa",
    store: "Amazon",
    price: 24.9,
    href: "https://www.google.com/search?q=Suporte+de+Celular+Mesa",
  },
  {
    id: "8",
    title: "Carregador 20W USB-C",
    store: "Kabum",
    price: 59.9,
    oldPrice: 99.9,
    tags: ["VALE"],
    href: "https://www.google.com/search?q=Carregador+20W+USB-C",
  },
  {
    id: "9",
    title: "Organizador de Cabos",
    store: "Mercado Livre",
    price: 12.9,
    href: "https://www.google.com/search?q=Organizador+de+Cabos",
  },
  {
    id: "10",
    title: "Extensão 3 tomadas",
    store: "Magalu",
    price: 34.9,
    oldPrice: 49.9,
    href: "https://www.google.com/search?q=Extens%C3%A3o+3+tomadas",
  },
  {
    id: "11",
    title: "Copo Térmico Inox",
    store: "Amazon",
    price: 69.9,
    oldPrice: 99.9,
    tags: ["VALE"],
    href: "https://www.google.com/search?q=Copo+T%C3%A9rmico+Inox",
  },
  {
    id: "12",
    title: "Refil Fita Dupla Face",
    store: "Shopee",
    price: 11.9,
    tags: ["HOJE"],
    href: "https://www.google.com/search?q=Refil+Fita+Dupla+Face",
  },
  {
    id: "13",
    title: "Escova Limpa Teclado",
    store: "Mercado Livre",
    price: 18.9,
    href: "https://www.google.com/search?q=Escova+Limpa+Teclado",
  },
  {
    id: "14",
    title: "Mini Lanterna LED",
    store: "Amazon",
    price: 22.9,
    oldPrice: 39.9,
    href: "https://www.google.com/search?q=Mini+Lanterna+LED",
  },
  {
    id: "15",
    title: "Trava Porta Magnética",
    store: "Magalu",
    price: 27.9,
    tags: ["HOJE"],
    href: "https://www.google.com/search?q=Trava+Porta+Magn%C3%A9tica",
  },
  {
    id: "16",
    title: "Kit Chaves Precisão",
    store: "Kabum",
    price: 89.9,
    oldPrice: 129.9,
    tags: ["VALE"],
    href: "https://www.google.com/search?q=Kit+Chaves+Precis%C3%A3o",
  },
];

type PriceFilter = "ALL" | "50" | "100" | "200";
type TagFilter = "ALL" | "HOJE" | "VALE";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HomePage() {
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("ALL");
  const [tagFilter, setTagFilter] = useState<TagFilter>("ALL");
  const [seed, setSeed] = useState(() => shuffle(OFFERS_SEED));
  const [clicksTotal, setClicksTotal] = useState(0);
  const [clicksById, setClicksById] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    let list = [...seed];

    if (priceFilter !== "ALL") {
      const cap = Number(priceFilter);
      list = list.filter((o) => o.price <= cap);
    }

    if (tagFilter !== "ALL") {
      list = list.filter((o) => o.tags?.includes(tagFilter as OfferTag));
    }

    return list;
  }, [seed, priceFilter, tagFilter]);

  function handleRefreshShowcase() {
    setSeed(shuffle(OFFERS_SEED));
  }

  function handleResetClicks() {
    setClicksTotal(0);
    setClicksById({});
  }

  function handleOpenOffer(offer: Offer) {
    setClicksTotal((n) => n + 1);
    setClicksById((prev) => ({
      ...prev,
      [offer.id]: (prev[offer.id] ?? 0) + 1,
    }));

    window.open(
      offer.href ?? "https://www.google.com",
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar
        subtitle="Achados baratos que valem o clique."
        clicksTotal={clicksTotal}
        offersCount={filtered.length}
        onRefresh={handleRefreshShowcase}
        onResetClicks={handleResetClicks}
      />

      <FiltersBar
        priceFilter={priceFilter}
        tagFilter={tagFilter}
        onTogglePrice={(next: "50" | "100" | "200") =>
          setPriceFilter((p) => (p === next ? "ALL" : next))
        }
        onToggleTag={(next: "HOJE" | "VALE") =>
          setTagFilter((t) => (t === next ? "ALL" : next))
        }
      />

      {/* Âncora: Ofertas */}
      <div id="ofertas" />
      <OffersGrid
        offers={filtered}
        clicksById={clicksById}
        onOpenOffer={handleOpenOffer}
      />

      {/* Seções mínimas (para links do footer funcionarem já) */}
      <section
        id="como-funciona"
        className="mx-auto w-full max-w-6xl px-6 pb-10"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Como funciona</h2>
          <p className="mt-2 text-sm text-slate-600">
            O PromoBOOX é uma vitrine viva: você vê ofertas baratas, clica e abre em
            nova aba. Alguns links podem ser afiliados — quando você compra, a gente
            pode receber uma comissão (sem custo extra para você).
          </p>
        </div>
      </section>

      <section id="sobre" className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Sobre</h2>
          <p className="mt-2 text-sm text-slate-600">
            Curadoria simples, foco em preço baixo e rotação rápida. O objetivo é
            economizar tempo: achados que “valem o clique”.
          </p>
        </div>
      </section>

      <section id="enviar" className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Enviar oferta</h2>
          <p className="mt-2 text-sm text-slate-600">
            Em breve: um formulário rápido para você sugerir ofertas e ajudar a
            vitrine a ficar cada vez melhor.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =============================
   COMPONENTES AUXILIARES
============================= */

function FiltersBar({
  priceFilter,
  tagFilter,
  onTogglePrice,
  onToggleTag,
}: {
  priceFilter: PriceFilter;
  tagFilter: TagFilter;
  onTogglePrice: (next: "50" | "100" | "200") => void;
  onToggleTag: (next: "HOJE" | "VALE") => void;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="flex flex-wrap gap-2">
        {(["50", "100", "200"] as const).map((p) => (
          <FilterChip
            key={p}
            label={`Até R$ ${p}`}
            active={priceFilter === p}
            onClick={() => onTogglePrice(p)}
          />
        ))}
        <div className="mx-2 h-6 w-px bg-slate-200" />
        {(["HOJE", "VALE"] as const).map((t) => (
          <FilterChip
            key={t}
            label={t === "HOJE" ? "Hoje" : "Vale muito"}
            active={tagFilter === t}
            onClick={() => onToggleTag(t)}
          />
        ))}
      </div>
    </section>
  );
}

function OffersGrid({
  offers,
  clicksById,
  onOpenOffer,
}: {
  offers: Offer[];
  clicksById: Record<string, number>;
  onOpenOffer: (offer: Offer) => void;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            clicks={clicksById[offer.id] ?? 0}
            onOpen={() => onOpenOffer(offer)}
          />
        ))}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm font-semibold transition",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

/**
 * O que alterei:
 * - Removi o FooterNote antigo e integrei o novo <Footer />.
 * - Criei âncoras reais para os links do footer: #ofertas, #como-funciona, #sobre, #enviar.
 * - Removi o texto “solto” que você colou no final do arquivo (isso quebraria o build).
 * - Tipos dos handlers (sem any) para ficar mais estável e previsível.
 *
 * O que esperar:
 * - Footer novo aparecendo no final.
 * - Links do footer rolando para seções reais.
 * - Build estável (sem erro de parsing).
 *
 * Espera-se com esta alteração que:
 * - O site fique com navegação “produto de verdade” e pronto para crescer (estilo Buscapé).
 */
