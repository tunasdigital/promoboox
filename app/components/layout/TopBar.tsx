"use client";

type TopBarProps = {
  subtitle: string; // (mantido no tipo para não quebrar o page.tsx, mas não exibimos mais)
  clicksTotal: number;
  offersCount: number;
  onRefresh: () => void;
  onResetClicks: () => void;
};

export default function TopBar({
  subtitle, // intencionalmente não usado agora
  clicksTotal,
  offersCount,
  onRefresh,
  onResetClicks,
}: TopBarProps) {
  return (
    <header className="w-full border-b border-slate-200">
      {/* Faixa azul full-bleed */}
      <div className="w-full bg-blue-600">
        {/* Navbar mais baixa */}
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/imagens/logo_promo2.png"
              alt="PromoBOOX"
              className="h-9 w-auto rounded-lg"
            />
          </div>

          {/* Links (somente Ofertas + Enviar oferta) */}
          <nav className="ml-4 hidden items-center gap-5 md:flex">
            <a
              href="#ofertas"
              className="text-sm font-semibold text-white/90 transition hover:text-white"
            >
              Ofertas
            </a>

            <a
              href="#enviar"
              className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white/25"
            >
              Enviar oferta
            </a>
          </nav>

          {/* Métricas (sempre no desktop) */}
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-xs text-white/90 md:block">
              Mostrando{" "}
              <span className="font-semibold text-white">{offersCount}</span>{" "}
              ofertas <span className="mx-2 text-white/40">|</span>
              Cliques:{" "}
              <span className="font-semibold text-white">{clicksTotal}</span>
            </div>

            {/* CTA (amarelo) */}
            <button
              type="button"
              onClick={onRefresh}
              className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-extrabold text-slate-900 transition hover:bg-yellow-500"
              title="Embaralha as ofertas (vitrine viva)"
            >
              Atualizar vitrine
            </button>

            <button
              type="button"
              onClick={onResetClicks}
              className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              title="Zera o contador de cliques"
            >
              Zerar cliques
            </button>
          </div>
        </div>
      </div>

      {/*
        O que alterei:
        - Removi os links "Como funciona" e "Sobre" (mantive só Ofertas + Enviar oferta).
        - Removi o subtitle da UI (mantive no tipo/props para não quebrar o page.tsx).
        - Reduzi a altura da navbar (py-5 -> py-3) e a logo (h-11 -> h-9).
        - Troquei o botão "Atualizar vitrine" para amarelo (bg-yellow-400/500) para combinar com o produto.

        O que esperar:
        - Navbar mais compacta e com mais espaço para a vitrine.
        - CTA principal (Atualizar vitrine) mais bonito e coerente.
        - Layout geral mais limpo e focado no core (ofertas + ação).
        
        Espera-se com esta alteração que:
        - O topo pare de dominar a página e a vitrine ganhe protagonismo.
      */}
    </header>
  );
}
