import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Bileşenler
import LightRays from './components/ui/LightRays';
import Aurora from './components/ui/Aurora';
import RippleGrid from './components/ui/RippleGrid';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import ScrollVelocity from './components/ui/ScrollVelocity';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText';
import DetailSection from './components/ui/DetailSection'; // Yeni Standart Kart Yapısı

const App = () => {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (idx) => {
    const el = document.getElementsByClassName('snap-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snap-container bg-black text-white" onScroll={(e) => setActiveSection(Math.round(e.target.scrollTop / window.innerHeight))}>

      {/* Yan Navigasyon */}
      <div className="nav-dots">
        {Array.from({ length: 13 }).map((_, idx) => (
          <div key={idx} className={`nav-dot ${activeSection === idx ? 'active' : ''}`} onClick={() => scrollToSection(idx)} />
        ))}
      </div>

      {/* 1. GİRİŞ (HERO) */}
      <section className="snap-section border-b border-white/5">
        <LightRays raysColor="#3b82f6" speed={0.4} />
        <div className="absolute inset-0 z-0 opacity-30"><RippleGrid gridColor="#ffffff" opacity={0.3} rippleIntensity={0.04} /></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter text-white">Tuğrul Şirin</h1>
          <div className="mb-8">
            <GradientText colors={['#40ffaa', '#4079ff', '#40ffaa']} animationSpeed={6} className="text-3xl md:text-5xl font-bold">
              E-TİCARET & OTOMASYON SYNERGY
            </GradientText>
          </div>
          <div className="text-xl text-gray-400 flex justify-center gap-2">
            <FlipWords words={["Operasyon", "Veri Analizi", "Entegrasyon", "AI Agent"]} className="text-cyan-400 font-bold" />
          </div>
        </div>
      </section>

      {/* 2. ÖZET (BENTO) */}
      <section className="snap-section bg-[#080808]">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Büyük Resim</h2>
          <MagicBento />
        </div>
      </section>

      {/* 3. OPERASYON (KAPAK) */}
      <section className="snap-section bg-black relative">
        <div className="absolute inset-0 z-0 opacity-20 bg-blue-900/20" />
        <div className="scale-125 md:scale-150 mb-8 pointer-events-none"><OrbitingSkills /></div>
        <div className="relative z-10 text-center mt-20">
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Operasyonel Merkez</h2>
          <p className="text-gray-500 mt-2">Detaylar ↓</p>
        </div>
      </section>

      {/* 4. OPERASYON (DETAY) */}
      <section className="snap-section bg-[#050505]">
        <DetailSection
          title="Süreç ve Entegrasyon"
          color="blue"
          items={[
            { icon: "📦", header: "Amazon & Pazaryerleri", desc: "FBA süreçleri, Buybox yönetimi ve Amazon Avrupa/Amerika hesap sağlığı yönetimi." },
            { icon: "🔄", header: "Entegra & Entegrasyon", desc: "30+ Pazaryeri ile ERP (Nebim/Logo) arasında ürün, stok ve fiyat senkronizasyonu." },
            { icon: "🏭", header: "ERP & Süreç", desc: "Siparişin düşmesinden faturalandırılmasına kadar olan tüm ERP süreçlerinin kurgulanması." }
          ]}
        />
      </section>

      {/* 5. VERİ (KAPAK) */}
      <section className="snap-section relative overflow-hidden">
        <FallingGlitch glitchColors={["#10b981", "#34d399"]} />
        <div className="relative z-10 p-10 bg-black/80 backdrop-blur-md border border-green-500/30 rounded-2xl text-center">
          <h2 className="text-7xl font-mono font-bold text-green-400 tracking-tighter">DATA {'>'} DECISION</h2>
        </div>
      </section>

      {/* 6. VERİ (DETAY) */}
      <section className="snap-section bg-black">
        <DetailSection
          title="Veri Analitiği Laboratuvarı"
          color="green"
          items={[
            { icon: "🐍", header: "Python & Pandas", desc: "Milyonlarca satırlık ham e-ticaret verisinin temizlenmesi ve işlenmesi." },
            { icon: "📊", header: "Görselleştirme", desc: "Looker Studio ve PowerBI ile yönetim için canlı, karar destekli dashboard'lar." },
            { icon: "📈", header: "Stok & Satış Tahmini", desc: "Geçmiş veriye (Regression) dayalı gelecek dönem stok planlaması." }
          ]}
        />
      </section>

      {/* 7. OTOMASYON (KAPAK) */}
      <section className="snap-section bg-black relative">
        <Aurora />
        <div className="relative z-10 text-center">
          <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Otonom Sistemler</h2>
          <p className="text-xl text-gray-300 mt-4">n8n & AI Agents</p>
        </div>
      </section>

      {/* 8. OTOMASYON (DETAY) */}
      <section className="snap-section bg-[#080808]">
        <DetailSection
          title="Yapay Zeka & Otomasyon"
          color="purple"
          items={[
            { icon: "🤖", header: "n8n Workflow", desc: "Tekrarlayan işlerin (Raporlama, Mail, Stok Kontrolü) %100 otonom hale getirilmesi." },
            { icon: "🧠", header: "AI Agents", desc: "Kendi kendine karar veren, müşteri sorularını yanıtlayan veya rakip analizi yapan botlar." },
            { icon: "🕷️", header: "Veri Kazıma (Scraping)", desc: "Apify ile rakip fiyat ve ürün takibi, otomatik aksiyon alma." }
          ]}
        />
      </section>

      {/* 9. ÇÖZÜMLER (KAPAK) */}
      <section className="snap-section bg-[#050505]">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-white mb-8">Özel Çözümler</h2>
          <div className="h-[400px] w-[300px] mx-auto bg-gray-800 rounded-[40px] border-4 border-gray-600 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-blue-900/50">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000')] bg-cover opacity-50"></div>
            <span className="relative z-10 font-bold text-2xl">AppSheet Demo</span>
          </div>
        </div>
      </section>

      {/* 10. ÇÖZÜMLER (DETAY) */}
      <section className="snap-section bg-black">
        <DetailSection
          title="AppSheet & Mikro SaaS"
          color="orange"
          items={[
            { icon: "📱", header: "Mobil Uygulamalar", desc: "Saha satışı, depo sayımı gibi özel ihtiyaçlar için hızlı mobil çözümler." },
            { icon: "🧩", header: "Özel Modüller", desc: "ERP'nin yetmediği yerde devreye giren ara katman yazılımları." },
            { icon: "🚀", header: "MVP Geliştirme", desc: "Fikirlerinizi kodsuz (No-Code) altyapılarla hızlıca canlıya alma." }
          ]}
        />
      </section>

      {/* 11. KREATİF (KAPAK) */}
      <section className="snap-section bg-black relative flex flex-col justify-center">
        <h2 className="text-center text-4xl font-bold mb-12 text-pink-500">Kreatif & Pazarlama</h2>
        <div className="w-full rotate-[-5deg]">
          <ScrollVelocity text="Viral İçerik • Meta Ads • CapCut Otomasyon • Google Ads • " />
        </div>
        <div className="w-full rotate-[5deg] mt-4 opacity-50">
          <ScrollVelocity text="Canva • Dijital Pazarlama • Sosyal Medya • " />
        </div>
      </section>

      {/* 12. KREATİF (DETAY) */}
      <section className="snap-section bg-[#080808]">
        <DetailSection
          title="İçerik & Reklam Yönetimi"
          color="pink"
          items={[
            { icon: "🎬", header: "Otomatik İçerik", desc: "n8n ile trendleri yakalayıp CapCut/Canva şablonlarına otomatik içerik basma." },
            { icon: "🎯", header: "Performans Pazarlama", desc: "Meta (Facebook/Instagram) ve Google Ads reklamlarının optimizasyonu." },
            { icon: "🎨", header: "Kreatif Tasarım", desc: "Dikkat çekici görseller ve viral odaklı video kurguları." }
          ]}
        />
      </section>

      {/* 13. İLETİŞİM */}
      <section className="snap-section bg-black relative">
        <div className="absolute inset-0 z-0"><RippleGrid opacity={0.1} /></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-8">Birlikte Çalışalım</h2>
          <a href="mailto:tugrul.sirin34@gmail.com" className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform hover:bg-blue-500 hover:text-white">
            İletişime Geç
          </a>
          <div className="mt-12 flex gap-8 justify-center text-gray-500">
            <span>LinkedIn</span> <span>GitHub</span> <span>Kariyer.net</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
