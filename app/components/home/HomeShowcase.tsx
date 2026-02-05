"use client";

import { useMemo, useState, useEffect } from "react";
import OfferCard, { Offer } from "@/app/components/offers/OfferCard";
import TopBar from "@/app/components/layout/TopBar";
import Footer from "@/app/components/layout/Footer";
import BrandsCarousel from "@/app/components/brands/BrandsCarousel";
import OffersGridMini from "@/app/components/offers/OffersGridMini";

type OfferTag = "HOJE" | "VALE";
type PriceFilter = "ALL" | "50" | "100" | "200";
type TagFilter = "ALL" | "HOJE" | "VALE";

export default function HomeShowcase() {
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("ALL");
  const [tagFilter, setTagFilter] = useState<TagFilter>("ALL");
  const [offers, setOffers] = useState<Offer[]>([]); 
  const [loading, setLoading] = useState(true);
  const [clicksTotal, setClicksTotal] = useState(0);
  const [clicksById, setClicksById] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch('/api/offers');
        const data = await response.json();
        setOffers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar vitrine:', error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  const filtered = useMemo(() => {
    let list = [...offers];
    if (priceFilter !== "ALL") {
      const cap = Number(priceFilter);
      list = list.filter((o) => Number(o.price) <= cap);
    }
    if (tagFilter !== "ALL") {
      list = list.filter((o) => o.tags?.includes(tagFilter as OfferTag));
    }
    return list;
  }, [offers, priceFilter, tagFilter]);

  function handleRefreshShowcase() {
    setLoading(true);
    fetch('/api/offers')
      .then(res => res.json())
      .then(data => setOffers(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
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
    if (offer.productUrl) {
      window.open(offer.productUrl, "_blank", "noopener,noreferrer");
    }
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

      {/* COMPONENTE SENDO CHAMADO AQUI */}
      <FiltersBar
        priceFilter={priceFilter}
        tagFilter={tagFilter}
        onTogglePrice={(next) => setPriceFilter((p) => (p === next ? "ALL" : next))}
        onToggleTag={(next) => setTagFilter((t) => (t === next ? "ALL" : next))}
      />

      <div id="ofertas" className="py-4" />

      {loading ? (
        <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center italic text-slate-400 font-bold animate-pulse">
          Sincronizando com promo-db...
        </div>
      ) : (
        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-20">
            {filtered.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                clicks={clicksById[offer.id] ?? 0}
                onOpen={() => handleOpenOffer(offer)}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-black italic mb-6">Dobra teste (mini cards)</h2>
            <OffersGridMini
              offers={filtered}
              clicksById={clicksById}
              onOpenOffer={handleOpenOffer}
            />
          </div>
        </section>
      )}

      <BrandsCarousel />
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
    <section className="mx-auto mt-4 w-full max-w-6xl px-6 pb-2">
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
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}