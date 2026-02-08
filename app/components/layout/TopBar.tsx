"use client";

import type { ElementType, FormEvent } from "react";
import { useState } from "react";
import { Flame, Zap, CheckCircle2, Search, User } from "lucide-react";

// ✅ Camada 02 (desacoplada)
import CategoriesBar from "../categories/CategoriesBar";

// ✅ Overlay desacoplado (Mapa)
import CategoriesMap from "../categories/CategoriesMap";

type TopBarProps = {
  subtitle: string;
  clicksTotal: number;
  offersCount: number;
  onRefresh: () => void;
  onResetClicks: () => void;
};

export default function TopBar({
  subtitle,
  clicksTotal,
  offersCount,
  onRefresh,
  onResetClicks,
}: TopBarProps) {
  const [query, setQuery] = useState("");

  // ✅ Controle do overlay (desacoplado e limpo)
  const [isCategoriesMapOpen, setIsCategoriesMapOpen] = useState(false);

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    const url = q
      ? `https://www.google.com/search?q=${encodeURIComponent(q)}`
      : "https://www.google.com";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleOpenCategoriesMap() {
    setIsCategoriesMapOpen(true);
  }

  function handleCloseCategoriesMap() {
    setIsCategoriesMapOpen(false);
  }

  function handleSelectCategory(label: string) {
    // ✅ Por enquanto só fecha (próximo passo: filtrar, navegar, etc.)
    // Mantém desacoplado: TopBar não precisa saber de "categorias internas".
    console.log("Categoria selecionada:", label);
  }

  return (
    <header className="w-full border-b border-slate-200">
      {/* =========================
          CAMADA 00 — Identidade + Busca
         ========================= */}
      <div className="w-full bg-blue-600">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-5 px-6 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/imagens/logo_promo3.png"
              alt="PromoBOOX"
              className="h-9 w-auto"
              draggable={false}
            />
          </a>

          {/* Busca */}
          <form
            onSubmit={handleSearch}
            className="ml-2 flex w-full items-center gap-3"
          >
            <div className="relative w-full">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque ofertas, produtos ou lojas"
                className="h-10 w-full rounded-full bg-white px-5 pr-32 text-sm text-slate-900 placeholder:text-slate-400 outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 inline-flex h-8 items-center gap-2 rounded-full bg-blue-800 px-4 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                <Search size={16} />
                Buscar
              </button>
            </div>

            <a
              href="#entrar"
              className="hidden items-center gap-2 text-sm font-semibold text-white/95 transition hover:text-white md:inline-flex"
            >
              <User size={16} />
              Entrar
            </a>
          </form>
        </div>

        {/* =========================
            CAMADA 01 — Decisão rápida (TRAVADA)
           ========================= */}
        <div className="w-full bg-blue-700">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-2">
            {/* Links principais (travados) */}
            <nav className="flex items-center gap-6">
              <NavLink href="#ofertas" icon={Flame} label="Ofertas" />
              <NavLink href="#oferta-do-dia" icon={Zap} label="Oferta do Dia" />
              <NavLink
                href="#vale-a-pena"
                icon={CheckCircle2}
                label="Vale a pena"
              />

              <a
                href="#enviar"
                className="rounded-full bg-black/75 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-black/85"
              >
                Enviar oferta
              </a>
            </nav>

            {/* Métricas + botões */}
            <div className="ml-auto flex items-center gap-4">
              <div className="hidden text-xs text-white/90 md:block">
                Mostrando{" "}
                <span className="font-semibold text-white">{offersCount}</span>{" "}
                ofertas <span className="mx-2 text-white/40">|</span> Cliques{" "}
                <span className="font-semibold text-white">{clicksTotal}</span>
              </div>

              <button
                type="button"
                onClick={onRefresh}
                className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300"
              >
                Atualizar vitrine
              </button>

              <button
                type="button"
                onClick={onResetClicks}
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Zerar cliques
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          CAMADA 02 — Categorias (DESACOPLADA)
         ========================= */}
      <CategoriesBar onOpenMap={handleOpenCategoriesMap} />

      {/* Subtítulo */}
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="text-sm text-slate-600">{subtitle}</div>
      </div>

      {/* =========================
          OVERLAY — CategoriesMap (DESACOPLADO)
         ========================= */}
      <CategoriesMap
        isOpen={isCategoriesMapOpen}
        onClose={handleCloseCategoriesMap}
        onSelectCategory={handleSelectCategory}
      />

      {/**
       * O que alterei:
       * - Pluguei o CategoriesMap com estado real (isCategoriesMapOpen).
       * - CategoriesBar agora abre o overlay (onOpenMap -> setIsCategoriesMapOpen(true)).
       * - Fechamento centralizado via onClose.
       * - Mantive desacoplado: TopBar só controla abrir/fechar; o mapa se resolve sozinho.
       *
       * O que esperar:
       * - Ao clicar em “Categorias (mapa)”, o overlay abre.
       * - ESC e clique fora fecham.
       * - Selecionar uma categoria fecha e loga no console (base para próxima etapa).
       *
       * Espera-se com esta alteração que:
       * - O fluxo de navegação por categorias esteja restaurado e estável.
       * - A arquitetura em camadas fique preservada (TopBar sem poluição).
       */}
    </header>
  );
}

function NavLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: ElementType;
  label: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
    >
      <Icon size={16} />
      {label}
    </a>
  );
}
