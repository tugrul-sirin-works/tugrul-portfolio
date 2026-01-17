import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sections } from './data/content';

// Bileşenler
import LightRays from './components/ui/LightRays';
import Aurora from './components/ui/Aurora';
import RippleGrid from './components/ui/RippleGrid';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText'; // YENİ EKLENDİ

const App = () => {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = (e) => {
    const scrollPosition = e.target.scrollTop;
    const windowHeight = window.innerHeight;
    const current = Math.round(scrollPosition / windowHeight);
    setActiveSection(current);
  };

  const scrollToSection = (idx) => {
    const el = document.getElementsByClassName('snap-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snap-container bg-black text-white" onScroll={handleScroll}>

      {/* Yan Navigasyon */}
      <div className="nav-dots">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className={`nav-dot ${activeSection === idx ? 'active' : ''}`}
            onClick={() => scrollToSection(idx)}
          />
        ))}
      </div>

      {/* 1. GİRİŞ (HERO) - YENİLENMİŞ SLOGAN */}
      <section className="snap-section flex-col relative border-b border-white/5">
        <LightRays raysColor="#3b82f6" speed={0.4} />
        <div className="absolute inset-0 z-0 opacity-30">
          <RippleGrid gridColor="#ffffff" opacity={0.3} rippleIntensity={0.04} />
        </div>

        <div className="relative z-10 text-center p-4 max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter leading-tight text-white"
          >
            Tuğrul Şirin
          </motion.h1>

          {/* YENİ GRADIENT TEXT BURADA */}
          <div className="mb-8">
            <GradientText
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={6}
              showBorder={false}
              className="text-3xl md:text-5xl font-bold tracking-wide"
            >
              E-TİCARET & OTOMASYON
            </GradientText>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-xl text-gray-400 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10 inline-flex">
            <span className="opacity-70">Uzmanlık:</span>
            <FlipWords
              words={["Süreç Mimarisi", "Veri Analizi", "Entegrasyon", "AI Agent Sistemleri"]}
              className="text-cyan-400 font-bold"
            />
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce text-gray-500 text-sm tracking-widest cursor-pointer" onClick={() => scrollToSection(1)}>
          KEŞFET ↓
        </div>
      </section>

      {/* 2. ÖZET (OVERVIEW) */}
      <section className="snap-section flex-col bg-[#080808]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Büyük Resim</h2>
          <MagicBento />
        </div>
      </section>

      {/* 3. OPERASYON (Orbiting Skills) */}
      <section className="snap-section flex-col bg-gradient-to-b from-black to-blue-950/30">
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Operasyonel Merkez
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl text-center text-lg">
            Pazaryerleri (Amazon, Trendyol), ERP Sistemleri (Nebim, Logo) ve Entegrasyon araçları arasındaki veri trafiğini yöneten merkezi beyin.
          </p>
          <div className="scale-90 md:scale-110">
            <OrbitingSkills />
          </div>
        </div>
      </section>

      {/* 4. VERİ (Matrix) */}
      <section className="snap-section flex-col relative overflow-hidden">
        <FallingGlitch glitchColors={["#10b981", "#34d399", "#059669"]} />
        <div className="relative z-10 p-8 md:p-12 bg-black/70 backdrop-blur-xl border border-green-500/30 rounded-3xl text-center max-w-5xl shadow-2xl shadow-green-900/20">
          <h2 className="text-5xl md:text-7xl font-mono font-bold text-green-400 mb-8 tracking-tighter">DATA {'>'} DECISION</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-green-950/30 border border-green-500/20 rounded-xl hover:bg-green-900/40 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2">Analiz (SQL)</h3>
              <p className="text-green-200/70 text-sm">Python & Pandas ile ham veriyi işleyip temizleme.</p>
            </div>
            <div className="p-6 bg-green-950/30 border border-green-500/20 rounded-xl hover:bg-green-900/40 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2">Görselleştirme</h3>
              <p className="text-green-200/70 text-sm">Looker Studio ile canlı ve dinamik dashboardlar.</p>
            </div>
            <div className="p-6 bg-green-950/30 border border-green-500/20 rounded-xl hover:bg-green-900/40 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-2">Tahminleme</h3>
              <p className="text-green-200/70 text-sm">Geçmiş veriye dayalı stok ve satış projeksiyonları.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OTOMASYON (Aurora) */}
      <section className="snap-section flex-col relative bg-black">
        <Aurora />
        <div className="relative z-10 text-center max-w-5xl px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Otonom Sistemler (n8n)
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            "İnsan hatasını sıfıra indiren, 7/24 çalışan ve kendi kendine karar veren yapay zeka ajanları."
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {['Webhook', 'Data Filter', 'AI Agent', 'API Request', 'Slack Notify'].map((node, i) => (
              <div key={i} className="flex items-center">
                <div className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm hover:bg-purple-600/50 transition-colors">
                  {node}
                </div>
                {i < 4 && <div className="w-8 h-0.5 bg-white/20 mx-1"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ÇÖZÜMLER (AppSheet) */}
      <section className="snap-section flex-col bg-[#050505]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl w-full px-8 items-center">
          <div className="text-left">
            <h2 className="text-5xl font-bold mb-8 text-white">Özel Çözümler</h2>
            <p className="text-gray-400 mb-8 text-lg">Hazır paketlerin yetmediği yerde, işletmenize özel "Terzi İşi" yazılımlar.</p>
            <ul className="space-y-6 text-gray-300 text-xl">
              <li className="flex items-center gap-4">
                <span className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" /> AppSheet ile Saha Uygulamaları
              </li>
              <li className="flex items-center gap-4">
                <span className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" /> Özel WMS (Depo) Modülleri
              </li>
              <li className="flex items-center gap-4">
                <span className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" /> Mikro-SaaS Araçlar
              </li>
            </ul>
          </div>
          <div className="h-[500px] bg-gradient-to-tr from-blue-900/40 to-black rounded-[40px] border border-blue-500/30 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="z-10 bg-black/80 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              <span className="text-2xl font-bold text-blue-400">AppSheet</span> <span className="text-white">Dashboard</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. İLETİŞİM */}
      <section className="snap-section flex-col bg-black relative">
        <div className="absolute inset-0 z-0">
          <RippleGrid gridColor="#525252" opacity={0.2} rippleIntensity={0.02} />
        </div>
        <div className="text-center z-10 p-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-10 text-white tracking-tighter">Vizyonu Gerçeğe Dönüştürelim.</h2>

          <a href="mailto:tugrul.sirin34@gmail.com" className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-white px-12 font-medium text-black transition-all duration-300 hover:w-80 hover:bg-blue-500 hover:text-white">
            <span className="mr-2 text-xl font-bold">İletişime Geç</span>
            <div className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
              →
            </div>
          </a>

          <div className="mt-16 flex gap-8 justify-center text-gray-500 font-mono text-sm">
            <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="#" className="hover:text-white transition-colors">GITHUB</a>
            <a href="#" className="hover:text-white transition-colors">KARIYER.NET</a>
          </div>
          <div className="mt-8 text-xs text-gray-700">© 2025 Tuğrul Şirin</div>
        </div>
      </section>

    </div>
  );
};

export default App;
