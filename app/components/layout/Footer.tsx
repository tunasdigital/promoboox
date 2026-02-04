"use client";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Marca */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img
                src="/imagens/logo_promo2.png"
                alt="PromoBOOX"
                className="h-9 w-auto rounded-lg"
              />
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                PromoBOOX
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              Achados baratos que valem o clique. Curadoria simples, vitrine viva e
              monetização por links afiliados.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Vitrine Viva
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="Navegação">
              <FooterLink href="#ofertas">Ofertas</FooterLink>
              <FooterLink href="#enviar">Enviar oferta</FooterLink>
              <FooterLink href="#como-funciona">Como funciona</FooterLink>
              <FooterLink href="#sobre">Sobre</FooterLink>
            </FooterCol>

            <FooterCol title="Transparência">
              <FooterLink href="/termos">Termos de uso</FooterLink>
              <FooterLink href="/privacidade">Privacidade</FooterLink>
              <FooterLink href="/contato">Contato</FooterLink>
            </FooterCol>

            <FooterCol title="Produto">
              <FooterLink href="/afiliados">Como ganhamos</FooterLink>
              <FooterLink href="/lojas">Lojas/Parceiros</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </FooterCol>
          </div>
        </div>

        {/* Linha final */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} PromoBOOX. Todos os direitos reservados.</span>

          <span className="md:text-right">
            PromoBOOX é uma vitrine de ofertas com links afiliados. Preços e disponibilidade
            podem mudar a qualquer momento.
          </span>
        </div>
      </div>

      {/*
        O que alterei:
        - Criei um Footer novo com identidade PromoBOOX (azul + detalhe amarelo).
        - Recoloquei no Footer os links removidos da navbar (Como funciona, Sobre).
        - Adicionei colunas de “Transparência” e “Produto” para escalar depois.

        O que esperar:
        - Um rodapé com cara de produto, organizado e pronto pra crescer.
        - Links âncora (#como-funciona/#sobre) prontos para quando você criar as seções.
      */}
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-sm font-extrabold text-slate-900">{title}</div>
      <div className="mt-3 flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
    >
      {children}
    </a>
  );
}
