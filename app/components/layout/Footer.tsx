"use client";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-3">
        {/* Marca */}
        <div>
          <img
            src="/imagens/logo_promo2.png"
            alt="PromoBOOX"
            className="mb-4 h-10 w-auto"
          />
          <p className="text-sm text-slate-600">
            O PromoBOOX é uma vitrine de achados baratos, curados para
            economizar seu tempo e destacar ofertas que realmente
            <strong> valem o clique</strong>.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#ofertas" className="hover:text-slate-900">
                Ofertas
              </a>
            </li>
            <li>
              <a href="#enviar" className="hover:text-slate-900">
                Enviar oferta
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-slate-900">
                Como funciona
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-slate-900">
                Sobre o PromoBOOX
              </a>
            </li>
          </ul>
        </div>

        {/* Transparência */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">
            Transparência
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Links podem conter afiliados</li>
            <li>Preços sujeitos a alteração</li>
            <li>Ofertas por tempo limitado</li>
          </ul>
        </div>
      </div>

      {/* Barra final */}
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PromoBOOX · Achados baratos que valem o
        clique.
      </div>
    </footer>
  );
}
