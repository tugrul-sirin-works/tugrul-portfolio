import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sections } from './data/content';

// Bileşenler
import RippleGrid from './components/ui/RippleGrid'; // Hero için (Garanti çalışır)
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import { FlipWords } from './components/ui/FlipWords';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Scroll takibi için
  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const windowHeight = window.innerHeight;
    const current = Math.round(scrollPosition / windowHeight);
    setActiveSection(current);
  };

  return (
    <div className="snap-container bg-black text-white" onScroll={handleScroll}>

      {/* Yan Navigasyon Noktaları */}
      <div className="nav-dots">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className={`nav-dot ${activeSection === idx ? 'active' : ''}`}
            onClick={() => document.getElementsByClassName('snap-section')[idx].scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* 1. GİRİŞ (HERO) */}
      <section className="snap-section flex-col relative border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <RippleGrid gridColor="#3b82f6" opacity={0.6} rippleIntensity={0.05} />
        </div>
        <div className="relative z-10 text-center p-4 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter leading-normal pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 drop-shadow-2xl">
            Tuğrul Şirin
          </h1>
          <div className="text-2xl md:text-4xl font-light text-blue-400 mb-6 font-mono tracking-widest">
            E-TİCARET & OTOMASYON <span className="font-bold text-white">SYNERGY</span>
          </div>
          <div className="flex justify-center items-center gap-2 text-xl text-gray-400">
            Uzmanlık:
            <FlipWords
              words={["Süreç Mimarisi", "Veri Analizi", "Entegrasyon", "AI Agent Sistemleri"]}
              className="text-white font-semibold"
            />
          </div>
        </div>
      </section>

      {/* 2. ÖZET (OVERVIEW) - Magic Bento */}
      <section className="snap-section flex-col bg-[#080808]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-10 text-center">Büyük Resim</h2>
          <MagicBento />
        </div>
      </section>

      {/* 3. OPERASYON (Orbiting Skills) */}
      <section className="snap-section flex-col bg-gradient-to-b from-black to-blue-950/20">
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-5xl font-bold mb-4 text-center">Operasyonel Merkez</h2>
          <p className="text-gray-400 mb-8 max-w-xl text-center">
            Amazon, Trendyol ve ERP sistemleri arasındaki veri trafiğini yöneten merkezi beyin.
          </p>
          <div className="scale-90 md:scale-110">
            <OrbitingSkills />
          </div>
        </div>
      </section>

      {/* 4. VERİ (Matrix) */}
      <section className="snap-section flex-col relative">
        <div className="absolute inset-0 z-0">
          <FallingGlitch glitchColors={["#10b981", "#34d399"]} />
        </div>
        <div className="relative z-10 p-10 bg-black/80 backdrop-blur-md border border-green-500/30 rounded-2xl text-center max-w-4xl">
          <h2 className="text-6xl font-mono font-bold text-green-400 mb-6">DATA &gt; DECISION</h2>
          <div className="grid grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-bold text-white">SQL & Python</h3>
              <p className="text-green-300/70 text-sm">Ham veriyi işleme</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Looker Studio</h3>
              <p className="text-green-300/70 text-sm">Görselleştirme</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Tahminleme</h3>
              <p className="text-green-300/70 text-sm">Stok & Satış</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OTOMASYON (Aurora) */}
      <section className="snap-section flex-col relative bg-black">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="relative z-10 text-center max-w-4xl">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Otonom Sistemler (n8n)
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            "İnsan hatasını sıfıra indiren, kendi kendine karar veren yapay zeka ajanları."
          </p>
          {/* Buraya n8n node şeması görseli veya efekti gelecek */}
          <div className="w-full h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <span className="text-purple-400 animate-pulse">Workflow Visualizer Loading...</span>
          </div>
        </div>
      </section>

      {/* 6. ÇÖZÜMLER (AppSheet & Özel) */}
      <section className="snap-section flex-col bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full px-6 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">Özel Çözümler</h2>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full" /> AppSheet ile Saha Uygulamaları
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full" /> Özel WMS Modülleri
              </li>
              <li className="flex items-center gap-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full" /> Mikro-SaaS Araçlar
              </li>
            </ul>
          </div>
          <div className="h-96 bg-gradient-to-tr from-blue-900 to-black rounded-3xl border border-blue-500/30 flex items-center justify-center">
            Mockup Gelecek
          </div>
        </div>
      </section>

      {/* 7. KREATİF & İLETİŞİM */}
      <section className="snap-section flex-col bg-black relative">
        <div className="text-center z-10">
          <h2 className="text-6xl font-bold mb-8">Vizyonu Gerçeğe Dönüştürelim.</h2>
          <a href="mailto:tugrul.sirin34@gmail.com" className="inline-block px-10 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform">
            İletişime Geç
          </a>
          <div className="mt-12 flex gap-6 justify-center text-gray-500">
            <span>LinkedIn</span>
            <span>GitHub</span>
            <span>Kariyer.net</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
