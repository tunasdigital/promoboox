"use client";

import { useMemo, useState } from "react";
import {
  Flame,
  Zap,
  CheckCircle2,
  Search,
  User,
} from "lucide-react";

type TopBarProps = {
  subtitle: string;
  clicksTotal: number;
  offersCount: number;
  onRefresh: () => void;
  onResetClicks: () => void;
};

type Category = { label: string; href: string };

export default function TopBar({
  subtitle,
  clicksTotal,
  offersCount,
  onRefresh,
  onResetClicks,
}: TopBarProps) {
  const categories: Category[] = useMemo(
    () => [
      { label: "Casa & Utilidades", href: "#casa" },
      { label: "Eletrônicos", href: "#eletronicos" },
      { label: "Informática", href: "#informatica" },
      { label: "Acessórios", href: "#acessorios" },
      { label: "Ferramentas", href: "#ferramentas" },
      { label: "Ofertas do Dia", href: "#oferta-do-dia" },
    ],
    [],
  );

  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    const url = q
      ? `https://www.google.com/search?q=${encodeURIComponent(q)}`
      : "https://www.google.com";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <header className="w-full border-b border-slate-200">
      {/* Faixa azul topo */}
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

        {/* Linha inferior estilo Buscapé */}
        <div className="w-full bg-blue-700">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-6 py-2">
            {/* Categorias */}
            <div className="relative">
              <details className="group">
                <summary className="cursor-pointer list-none select-none text-sm font-semibold text-white/95 transition hover:text-white">
                  ☰ Categorias
                </summary>

                <div className="absolute left-0 top-9 z-50 w-64 rounded-2xl border border-white/10 bg-white p-2 shadow-lg">
                  {categories.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </details>
            </div>

            {/* Links principais */}
            <nav className="flex items-center gap-6">
              <NavLink href="#ofertas" icon={Flame} label="Ofertas" />
              <NavLink href="#oferta-do-dia" icon={Zap} label="Oferta do Dia" />
              <NavLink href="#vale-a-pena" icon={CheckCircle2} label="Vale a pena" />

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

      {/* Subtítulo */}
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
        <div className="text-sm text-slate-600">{subtitle}</div>
      </div>

      {/**
       * O que alterei:
       * - Removi TODOS os emojis.
       * - Adicionei ícones Lucide (finos, modernos) apenas onde faz sentido.
       * - Categorias voltou para ☰ clássico.
       *
       * O que esperar:
       * - Navbar mais premium, limpa e profissional.
       *
       * Espera-se com esta alteração que:
       * - O topo pareça produto grande (Buscapé / Magalu / Zoom-level).
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
  icon: React.ElementType;
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
