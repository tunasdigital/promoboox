'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Tag, Settings, BarChart3, PlusCircle, Trash2, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca as ofertas reais do Vercel KV via API
  useEffect(() => {
    async function fetchAdminOffers() {
      try {
        const response = await fetch('/api/offers');
        const data = await response.json();
        setOffers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar ofertas no admin:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminOffers();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      {/* Sidebar - Cor Nano Banana */}
      <aside className="w-64 bg-[#3b67ad] text-[#ffffff] p-6 flex flex-col gap-8 shadow-xl">
        <div className="flex items-center gap-3 px-2">
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

        <nav className="flex flex-col gap-1.5 text-[#ffffff]/80 text-sm font-medium">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-[#ffffff]/10 text-[#ffffff] rounded-xl transition-all">
            <LayoutDashboard size={18} />
            Visão Geral
          </Link>
          <Link href="/admin/dashboard/new-offer" className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group">
            <PlusCircle size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            Nova Oferta
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group w-full text-left">
            <Tag size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            Categorias
          </button>
          <button className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#ffffff]/10 hover:text-[#ffffff] rounded-xl transition-all group w-full text-left">
            <BarChart3 size={18} className="text-[#ffffff]/60 group-hover:text-[#ffffff]" />
            Métricas
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#ffffff]/10 flex items-center gap-3 px-2">
           <div className="w-8 h-8 bg-[#facc15] rounded-full flex items-center justify-center text-[10px] font-bold text-[#3b67ad]">TS</div>
           <div className="flex flex-col text-white leading-tight">
             <span className="text-xs font-bold">Tunas</span>
             <span className="text-[10px] text-white/60">Admin Master</span>
           </div>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-10 text-[#0f172a]">
          <div>
            <h1 className="text-3xl font-black tracking-tight italic">Dashboard</h1>
            <p className="text-[#64748b] text-sm mt-1">Gerencie seu inventário de ofertas reais no Redis.</p>
          </div>
          <div className="flex gap-3">
             <span className="px-4 py-1.5 bg-[#ffffff] border border-[#e2e8f0] text-[#475569] text-[11px] font-bold rounded-full flex items-center gap-2 shadow-sm">
               <span className="w-2 h-2 bg-[#facc15] rounded-full animate-pulse"></span>
               DB: PROMO-DB ATIVO
             </span>
          </div>
        </header>

        {/* Cards de Status com dados reais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Ofertas Ativas</p>
            <p className="text-4xl font-black text-slate-900">{offers.length}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm opacity-50">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Cliques Totais</p>
            <p className="text-4xl font-black text-slate-900">0</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm opacity-50">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Conversão Est.</p>
            <p className="text-4xl font-black text-slate-900">0%</p>
          </div>
        </div>

        {/* Tabela de Inventário */}
        <div className="bg-white rounded-[2rem] border border-[#e2e8f0] shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8fafc] border-b border-[#e2e8f0]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Produto</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Loja</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">Preço</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#94a3b8] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[#94a3b8] italic">Carregando dados...</td></tr>
              ) : offers.map((offer: any) => (
                <tr key={offer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 relative bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        {offer.imageUrl && <Image src={offer.imageUrl} alt="" fill className="object-cover" unoptimized />}
                      </div>
                      <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">ID: {offer.id.slice(-4)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase">{offer.store}</span>
                  </td>
                  <td className="px-6 py-4 font-black text-[#3b67ad] text-sm">R$ {offer.price}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <a href={offer.productUrl} target="_blank" className="p-2 text-slate-400 hover:text-[#3b67ad]"><ExternalLink size={18} /></a>
                    <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}