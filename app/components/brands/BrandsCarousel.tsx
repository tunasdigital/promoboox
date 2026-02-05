// app/components/brands/BrandsCarousel.tsx
"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";

type Brand = {
  id: string;
  label: string;
  logo: string;
};

const BRANDS: Brand[] = [
  { id: "5", label: "Loja", logo: "/imagens/brands/5-Logo-80x80.png" },
  { id: "8", label: "Loja", logo: "/imagens/brands/8-Logo-80x80.png" },
  { id: "21", label: "Loja", logo: "/imagens/brands/21-Logo-80x80.png" },
  { id: "5420", label: "Loja", logo: "/imagens/brands/5420-Logo-80x80.png" },
  { id: "17608", label: "Loja", logo: "/imagens/brands/17608-Logo-80x80.png" },
  { id: "20906", label: "Loja", logo: "/imagens/brands/20906-Logo-80x80.png" },
  { id: "21710", label: "Loja", logo: "/imagens/brands/21710-Logo-80x80.png" },
  { id: "22788", label: "Loja", logo: "/imagens/brands/22788-Logo-80x80.png" },
  { id: "22906", label: "Loja", logo: "/imagens/brands/22906-Logo-80x80.png" },
  { id: "23254", label: "Loja", logo: "/imagens/brands/23254-Logo-80x80.png" },
];

export default function BrandsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopBrands = useMemo(() => [...BRANDS, ...BRANDS], []);

  function scrollBy(px: number) {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: px, behavior: "smooth" });
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-slate-900">
          Lojas parceiras
        </h2>

        {/* Setas */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-240)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(240)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="Próximo"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* fades laterais */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-white to-transparent" />

        {/* TRACK */}
        <div
          ref={trackRef}
          className="group flex gap-10 overflow-x-auto pb-2 no-scrollbar"
        >
          <div className="marquee flex gap-10">
            {loopBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="flex min-w-[96px] items-center justify-center"
              >
                <Image
                  src={brand.logo}
                  alt={`Logo ${brand.id}`}
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* animação */
        .marquee {
          animation: marquee 22s linear infinite;
          will-change: transform;
        }

        .group:hover .marquee {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* ESCONDER SCROLLBAR (cross-browser) */
        .no-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>

      {/**
       * O que alterei:
       * - Removi completamente a scrollbar (Chrome, Firefox, Edge).
       *
       * O que esperar:
       * - Carrossel limpo, sem “barra brega” aparecendo.
       *
       * Espera-se com esta alteração que:
       * - A seção fique premium e 100% marketplace-grade.
       */}
    </section>
  );
}
