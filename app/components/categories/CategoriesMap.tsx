"use client";

import { useEffect, useMemo } from "react";
import {
  X,
  Sparkles,
  LayoutGrid,
  Map as MapIcon,
  ArrowRight,
} from "lucide-react";

type Category = {
  label: string;
  description?: string;
};

type CategoriesMapProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (label: string) => void;
};

export default function CategoriesMap({
  isOpen,
  onClose,
  onSelectCategory,
}: CategoriesMapProps) {
  const categories = useMemo<Category[]>(
    () => [
      { label: "Tecnologia", description: "Gadgets, periféricos, setup." },
      { label: "Casa", description: "Utilidades, organização, conforto." },
      { label: "Moda", description: "Vestuário, calçados, acessórios." },
      { label: "Beleza", description: "Cuidados pessoais, skincare." },
      { label: "Kids & Geek", description: "Jogos, colecionáveis, diversão." },
      { label: "Ferramentas", description: "DIY, manutenção, oficina." },
      { label: "Papelaria", description: "Estudos, escritório, criatividade." },
      { label: "Automotivo", description: "Carro, moto, acessórios." },
    ],
    [],
  );

  // ESC fecha
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Bloqueia scroll do body enquanto aberto
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSelect(label: string) {
    onSelectCategory?.(label);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar mapa de categorias"
        className="absolute inset-0 bg-black/50"
      />

      {/* Painel */}
      <div className="absolute left-1/2 top-16 w-[min(980px,92vw)] -translate-x-1/2">
        <div className="rounded-3xl border border-white/10 bg-white shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <MapIcon size={18} />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-slate-900">
                  Mapa de Categorias
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Aqui nasce o seu plano.
                  <span className="ml-2 text-slate-400">
                    (exploração sem poluição no topo)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="px-6 py-6">
            {/* “Território livre” / placeholder institucional */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-slate-700">
                <LayoutGrid size={16} className="text-slate-600" />
                Território livre
              </div>

              <div className="mt-2 text-sm text-slate-600">
                Este espaço é propositalmente aberto para evoluir para:
              </div>

              <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-slate-600" />
                  Constelações e mapas mentais
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-slate-600" />
                  Tiles e exploração não-linear
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-slate-600" />
                  Animações suaves e camadas
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={16} className="text-slate-600" />
                  Trilhas por intenção (modes)
                </li>
              </ul>
            </div>

            {/* Lista clicável (base útil já agora) */}
            <div className="mt-6">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                Categorias disponíveis
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {categories.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => handleSelect(c.label)}
                    className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:bg-slate-50"
                  >
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">
                        {c.label}
                      </div>
                      {c.description ? (
                        <div className="mt-1 text-sm text-slate-600">
                          {c.description}
                        </div>
                      ) : null}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition group-hover:text-slate-800">
                      Ver
                      <ArrowRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-6 py-4">
            <div className="text-xs text-slate-500">
              Dica: pressione <span className="font-semibold">ESC</span> para
              fechar.
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-950"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: centraliza melhor */}
      <div className="absolute inset-x-0 bottom-4 mx-auto w-[min(980px,92vw)] md:hidden">
        <div className="rounded-2xl bg-white/80 px-4 py-3 text-xs text-slate-700 backdrop-blur">
          Toque fora do painel para fechar.
        </div>
      </div>
    </div>
  );
}

/**
 * O que alterei:
 * - Criei o overlay CategoriesMap 100% desacoplado (isOpen/onClose).
 * - Fechamento por ESC e clique no backdrop.
 * - Bloqueio de scroll do body enquanto aberto.
 * - Estrutura “território livre” + lista clicável já útil hoje.
 *
 * O que esperar:
 * - Um modal/painel premium, limpo, consistente com o topo.
 * - Base pronta para evoluir para constelações/tiles sem retrabalho.
 *
 * Espera-se com esta alteração que:
 * - O TopBar apenas “dispare” o mapa (sem lógica interna de categorias).
 * - Você tenha um overlay confiável e estável para explorar categorias.
 */
