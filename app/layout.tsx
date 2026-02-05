import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "PromoBOOX",
  description: "Achados baratos que valem o clique.",
  icons: {
    icon: "/imagens/icon.png",
    shortcut: "/imagens/icon.png",
    apple: "/imagens/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}

/*
  O que alterei:
  - Mantive Roboto como fonte base.
  - Ajustei metadata (title/description) para PromoBOOX.
  - Defini favicon via metadata.icons apontando para /imagens/icon.png.

  O que esperar:
  - Ícone aparecer na aba do navegador (talvez precise hard refresh).
  - Título da aba ficar “PromoBOOX”.

  Espera-se com esta alteração que:
  - O favicon pare de “sumir” e fique consistente no Vercel também.
*/
