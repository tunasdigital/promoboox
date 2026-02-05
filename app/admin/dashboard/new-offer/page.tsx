'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Link as LinkIcon, Tag, DollarSign, Image as ImageIcon, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewOfferPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Estados para capturar os dados do formulário
  const [formData, setFormData] = useState({
    productUrl: '',
    price: '',
    store: 'Amazon',
    imageUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Chamada real para a API de ofertas que criamos no passo anterior
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // Resetar formulário após sucesso
        setFormData({
          productUrl: '',
          price: '',
          store: 'Amazon',
          imageUrl: ''
        });
        // Esconder mensagem de sucesso após 4 segundos
        setTimeout(() => setSuccess(false), 4000);
      } else {
        throw new Error(result.error || 'Erro desconhecido ao salvar');
      }
    } catch (err: any) {
      console.error('Falha na submissão:', err);
      setError('Não foi possível salvar a oferta. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-10 font-sans text-[#0f172a]">
      <header className="max-w-3xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 text-[#3b67ad] text-sm font-bold hover:underline mb-2 transition-all"
          >
            <ArrowLeft size={16} /> Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-black tracking-tight italic text-[#3b67ad]">Nova Oferta</h1>
          <p className="text-[#64748b] text-sm mt-1 font-medium">Cadastre ofertas que geram valor para o seu público.</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto relative">
        {/* Alertas de Feedback (Sucesso ou Erro) */}
        {success && (
          <div className="absolute -top-16 left-0 right-0 bg-[#22c55e] text-white p-4 rounded-2xl flex items-center justify-center gap-3 animate-bounce shadow-lg shadow-green-500/20 z-50 border-2 border-white">
            <CheckCircle2 size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">Publicado com Sucesso no Redis!</span>
          </div>
        )}

        {error && (
          <div className="absolute -top-16 left-0 right-0 bg-[#ef4444] text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-500/20 z-50">
            <AlertCircle size={20} />
            <span className="font-bold text-sm uppercase tracking-widest">{error}</span>
          </div>
        )}

        <div className="bg-[#ffffff] rounded-[2rem] border border-[#e2e8f0] p-10 shadow-sm transition-all hover:shadow-md">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Campo de Link */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-3">
                Link do Produto (Loja Parceira)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#cbd5e1] group-focus-within:text-[#3b67ad] transition-colors">
                  <LinkIcon size={20} />
                </div>
                <input 
                  required
                  type="url" 
                  value={formData.productUrl}
                  onChange={(e) => setFormData({...formData, productUrl: e.target.value})}
                  placeholder="Ex: https://lmdee.link/exemplo"
                  className="w-full pl-14 pr-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-[#3b67ad]/10 focus:border-[#3b67ad] outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preço */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-3">
                  Preço de Oferta (R$)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#cbd5e1] group-focus-within:text-[#3b67ad] transition-colors">
                    <DollarSign size={20} />
                  </div>
                  <input 
                    required
                    type="text" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Ex: 41,94"
                    className="w-full pl-14 pr-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-[#3b67ad]/10 focus:border-[#3b67ad] outline-none text-sm font-medium transition-all"
                  />
                </div>
              </div>

              {/* Loja Select */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-3">
                  Loja / Parceiro
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#cbd5e1] group-focus-within:text-[#3b67ad] transition-colors">
                    <Tag size={20} />
                  </div>
                  <select 
                    value={formData.store}
                    onChange={(e) => setFormData({...formData, store: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-[#3b67ad]/10 focus:border-[#3b67ad] outline-none text-sm font-bold appearance-none transition-all cursor-pointer"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Kabum">Kabum</option>
                    <option value="Magalu">Magalu</option>
                    <option value="Shopee">Shopee</option>
                    <option value="Mercado Livre">Mercado Livre</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Imagem URL */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-3">
                URL da Imagem (Objetiva)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#cbd5e1] group-focus-within:text-[#3b67ad] transition-colors">
                  <ImageIcon size={20} />
                </div>
                <input 
                  required
                  type="text" 
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://beta.lomadee.com.br/..."
                  className="w-full pl-14 pr-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl focus:ring-4 focus:ring-[#3b67ad]/10 focus:border-[#3b67ad] outline-none text-sm font-medium transition-all"
                />
              </div>
            </div>

            {/* Botão de Envio */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 transition-all shadow-xl ${
                loading 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-[#3b67ad] text-[#ffffff] hover:bg-[#2d528b] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <span className="animate-pulse italic">Gravando no Redis...</span>
              ) : (
                <>
                  <Send size={18} />
                  Publicar na Vitrine
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}