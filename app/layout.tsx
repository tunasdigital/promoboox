import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PromoBOOX",
  description: "Achados baratos que valem o clique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}

/**
 * O que alterei:
 * - Troquei roboto.variable por roboto.className no <body>.
 *
 * O que esperar:
 * - A fonte Roboto passa a valer no site inteiro imediatamente.
 *
 * Espera-se com esta alteração que:
 * - Você veja mudança real na tipografia (especialmente em títulos, botões e cards).
 */
