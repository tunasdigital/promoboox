// app/page.tsx
import HomeShowcase from "@/app/components/home/HomeShowcase";

export default function Page() {
  return <HomeShowcase />;
}

/**
 * O que alterei:
 * - Transformei a page.tsx em um wrapper mínimo, delegando tudo para <HomeShowcase />.
 *
 * O que esperar:
 * - page.tsx bem pequena e fácil de manter.
 *
 * Espera-se com esta alteração que:
 * - Fique trivial adicionar/remover dobras sem inflar o arquivo principal.
 */
