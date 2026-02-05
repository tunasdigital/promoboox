'use client';

import React from 'react';
import Image from 'next/image';
import { LayoutDashboard, Tag, Settings, BarChart3, PlusCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      {/* Sidebar - Cor sugerida pelo Nano Banana (Tom Profissional Deep Blue/Slate) */}
      <aside className="w-64 bg-[#3b67ad] text-[#ffffff] p-6 flex flex-col gap-8 shadow-xl">
        <div className="flex items-center gap-3 px-2">
          {/* Logo Oficial com caminho corrigido para public/imagens/ */}
          <div className="relative w-40 h-12">
            <Image 
              src="/imagens/logo_promo3.png" 
              alt="PromoBOOX Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 text-[#ffffff]/80">
          <button className="flex items-center gap-3 px-3 py-2.5 bg-[#ffffff]/10 text-[#ffffff] rounded-xl font-medium transition-all">
            <LayoutDashboard size={18} />
            <span className="text-sm">Visão Geral</span>
          </button>
          
          <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group">
            <PlusCircle size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            <span className="text-sm">Nova Oferta</span>
          </button>
          
          <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group">
            <Tag size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            <span className="text-sm">Categorias</span>
          </button>
          
          <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group">
            <BarChart3 size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            <span className="text-sm">Métricas</span>
          </button>

          <div className="mt-6 pt-6 border-t border-[#ffffff]/10">
            <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group w-full text-left">
              <Settings size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
              <span className="text-sm">Configuração API</span>
            </button>
          </div>
        </nav>

        {/* User Badge - Bottom */}
        <div className="mt-auto pt-6 border-t border-[#ffffff]/10 flex items-center gap-3 px-2">
           <div className="w-8 h-8 bg-[#facc15] rounded-full flex items-center justify-center text-[10px] font-bold text-[#3b67ad]">
             TS
           </div>
           <div className="flex flex-col">
             <span className="text-xs font-bold text-[#ffffff]">Tunas</span>
             <span className="text-[10px] text-[#ffffff]/60">Admin Master</span>
           </div>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-10 text-[#0f172a]">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Dashboard</h1>
            <p className="text-[#64748b] text-sm mt-1">Bem-vindo à central de inteligência do PromoBOOX.</p>
          </div>
          <div className="flex gap-3">
             <span className="px-4 py-1.5 bg-[#ffffff] border border-[#e2e8f0] text-[#475569] text-[11px] font-bold rounded-full flex items-center gap-2 shadow-sm">
               <span className="w-2 h-2 bg-[#facc15] rounded-full animate-pulse"></span>
               LOMADEE: AGUARDANDO KEY
             </span>
          </div>
        </header>

        {/* Cards de Status Rápido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-[#ffffff] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest mb-2">Ofertas Ativas</p>
            <p className="text-4xl font-black text-[#0f172a]">0</p>
          </div>
          <div className="bg-[#ffffff] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest mb-2">Cliques Totais</p>
            <p className="text-4xl font-black text-[#0f172a]">0</p>
          </div>
          <div className="bg-[#ffffff] p-8 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[#94a3b8] text-[10px] uppercase font-black tracking-widest mb-2">Conversão Est.</p>
            <p className="text-4xl font-black text-[#0f172a]">0%</p>
          </div>
        </div>

        {/* Placeholder para Listagem */}
        <div className="bg-[#ffffff] border-2 border-dashed border-[#e2e8f0] rounded-[2rem] h-80 flex flex-col items-center justify-center text-[#94a3b8] gap-6 group hover:border-[#3b67ad]/20 transition-all">
          <div className="w-16 h-16 bg-[#f8fafc] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlusCircle size={32} className="text-[#cbd5e1] group-hover:text-[#3b67ad]" />
          </div>
          <div className="text-center font-bold">
            <p className="text-[#475569]">Nenhuma oferta processada</p>
            <p className="text-sm font-normal text-[#64748b]">Aguardando conexão com a API Social Soul para automação.</p>
          </div>
          <button className="px-6 py-3 bg-[#3b67ad] text-[#ffffff] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#2d528b] transition-all shadow-lg shadow-[#3b67ad]/10">
            Adicionar Oferta Manual
          </button>
        </div>
      </main>
    </div>
  );
}