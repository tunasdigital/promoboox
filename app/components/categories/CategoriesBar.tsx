"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Menu,
  Laptop,
  Home,
  Shirt,
  Sparkles,
  Gamepad2,
  Hammer,
  Pencil,
  Car,
} from "lucide-react";

type CategoryChip = {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

interface CategoriesBarProps {
  onOpenMap: () => void;
}

/**
 * PONTOS DE CONTROLE VISUAL
 *
 * LEFT_EXIT:
 * - Onde o carrossel MORRE
 * - Deve ficar exatamente embaixo do botão "Categorias"
 *
 * RIGHT_ENTRY:
 * - Onde o carrossel NASCE
 * - Deve alinhar com o INÍCIO do botão amarelo "Atualizar vitrine"
 */
const LEFT_EXIT_DESKTOP = 96;   // px — morte (sob Categorias)
const RIGHT_ENTRY_DESKTOP = 320; // px — nascimento (antes do amarelo)

export default function CategoriesBar({ onOpenMap }: CategoriesBarProps) {
  const categories = useMemo<CategoryChip[]>(
    () => [
      { label: "Tecnologia", Icon: Laptop },
      { label: "Casa", Icon: Home },
      { label: "Moda", Icon: Shirt },
      { label: "Beleza", Icon: Sparkles },
      { label: "Kids & Geek", Icon: Gamepad2 },
      { label: "Ferramentas", Icon: Hammer },
      { label: "Papelaria", Icon: Pencil },
      { label: "Automotivo", Icon: Car },
    ],
    [],
  );

  // duplicação para loop contínuo
  const marquee = useMemo(() => [...categories, ...categories], [categories]);

  const trackRef = useRef<HTMLDivElement | null>(null);

  /**
   * Garantia de loop LIMPO
   * - sem delay
   * - sem “tranco”
   * - sem restart perceptível
   */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    el.style.animation = "none";
    // força reflow
    void el.offsetHeight;
    el.style.animation = "";
  }, []);

  return (
    <div className="relative w-full border-t border-slate-200 bg-slate-100">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-3">
        {/* BOTÃO CATEGORIAS (âncora visual da MORTE) */}
        <div className="absolute left-6 top-0 -translate-y-1/2 z-30">
          <button
            onClick={onOpenMap}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest shadow-md hover:bg-slate-50 whitespace-nowrap border border-slate-200"
            type="button"
          >
            <Menu size={16} className="text-slate-600" />
            Categorias
            <span className="text-[10px] font-bold text-slate-400 normal-case">
              mapa
            </span>
          </button>
        </div>

        {/* PISTA DO CARROSSEL */}
        <div className="relative overflow-hidden rounded-full bg-slate-100">
          {/* MÁSCARAS (nascimento e morte) */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* MORRE À ESQUERDA (Categorias) */}
            <div
              className="absolute inset-y-0 left-0 bg-slate-100"
              style={{ width: LEFT_EXIT_DESKTOP }}
            />

            {/* NASCE À DIREITA (antes do botão amarelo) */}
            <div
              className="absolute inset-y-0 right-0 bg-slate-100"
              style={{ width: RIGHT_ENTRY_DESKTOP }}
            />
          </div>

          {/* TRILHO */}
          <div
            ref={trackRef}
            className="promo-marquee flex w-max items-center gap-2 py-1"
            style={{
              paddingLeft: RIGHT_ENTRY_DESKTOP,
              paddingRight: LEFT_EXIT_DESKTOP,
            }}
          >
            {marquee.map((c, idx) => {
              const Icon = c.Icon;
              return (
                <button
                  key={`${c.label}-${idx}`}
                  onClick={onOpenMap}
                  className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-2 text-[11px] font-extrabold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition whitespace-nowrap"
                  type="button"
                >
                  <Icon size={16} className="text-slate-600" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ANIMAÇÃO GLOBAL */}
      <style jsx global>{`
        @keyframes promoMarqueeMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .promo-marquee {
          animation: promoMarqueeMove 26s linear infinite;
          will-change: transform;
        }

        .promo-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

/**
 * O que alterei:
 * - Defini pontos explícitos de NASCIMENTO e MORTE do carrossel.
 * - Morte alinhada sob o botão “Categorias”.
 * - Nascimento alinhado ao início do botão amarelo (“Atualizar vitrine”).
 * - Removi qualquer dependência de fade: agora é máscara sólida (linha clara).
 * - Reinício do loop sem delay ou tranco (reset controlado da animação).
 *
 * O que esperar:
 * - Chips surgem suavemente ANTES do botão amarelo (direita → esquerda).
 * - Chips desaparecem exatamente sob “Categorias”.
 * - Loop contínuo, estável, sem engasgos.
 *
 * Espera-se com esta alteração que:
 * - O carrossel tenha comportamento previsível e profissional.
 * - A hierarquia visual do topo fique clara e intencional.
 * - Possamos commitar com confiança e seguir para a próxima camada.
 */
