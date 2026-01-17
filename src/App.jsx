import React from 'react';
import { sections } from './data/content';
import { motion } from 'framer-motion';
import RippleGrid from './components/ui/RippleGrid';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import { FlipWords } from './components/ui/FlipWords';

const App = () => {
  return (
    <div className="snap-container bg-black text-white">

      {/* --- KATMAN 1: HERO (GİRİŞ) --- */}
      <section className="snap-section flex-col relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <RippleGrid gridColor="#3b82f6" opacity={0.5} rippleIntensity={0.08} />
        </div>
        <div className="relative z-10 text-center pointer-events-none p-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
          >
            Tuğrul Şirin
          </motion.h1>
          <div className="text-xl md:text-3xl text-gray-400 font-light flex flex-col md:flex-row justify-center items-center gap-2">
            <span className="opacity-70">Uzmanlık:</span>
            <FlipWords
              words={["E-Ticaret Yönetimi", "Süreç Otomasyonu", "Veri Analizi", "Entegrasyon Mimarisi"]}
              className="text-blue-400 font-semibold"
            />
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-gray-600 text-sm">
          Aşağı Kaydır ↓
        </div>
      </section>

      {/* --- KATMAN 2: EKOSİSTEM (YÖRÜNGELER) --- */}
      <section className="snap-section flex-col relative border-b border-white/5 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-8">
          <div className="md:w-1/2 text-left mb-10 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Operasyonel <br /> Ekosistem
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Pazaryerleri (Amazon, Trendyol), ERP Sistemleri (Nebim, Logo) ve Entegrasyon araçları arasındaki trafiği yönetiyorum. <br /><br />
              <span className="text-white font-medium">Hedef:</span> Sıfır hata, tam otomasyon.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <OrbitingSkills />
          </div>
        </div>
      </section>

      {/* --- KATMAN 3: VERİ (MATRIX) --- */}
      <section className="snap-section flex-col relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FallingGlitch glitchColors={["#10b981", "#059669", "#34d399"]} />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center p-8 bg-black/60 backdrop-blur-sm rounded-3xl border border-green-500/20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-green-400 font-mono">
            Veri > İçgörü > Karar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 border border-green-500/30 rounded-xl bg-green-900/10">
              <h3 className="text-2xl font-bold text-white mb-2">Analiz</h3>
              <p className="text-gray-400 text-sm">Python & Pandas ile büyük veri setlerini işleme ve temizleme.</p>
            </div>
            <div className="p-6 border border-green-500/30 rounded-xl bg-green-900/10">
              <h3 className="text-2xl font-bold text-white mb-2">Görselleştirme</h3>
              <p className="text-gray-400 text-sm">Looker Studio ve PowerBI ile dinamik dashboardlar.</p>
            </div>
            <div className="p-6 border border-green-500/30 rounded-xl bg-green-900/10">
              <h3 className="text-2xl font-bold text-white mb-2">Otomasyon</h3>
              <p className="text-gray-400 text-sm">Tekrarlayan raporlama süreçlerini otonom hale getirme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- KATMAN 4: YETENEKLER (BENTO) --- */}
      <section className="snap-section flex-col relative overflow-hidden bg-[#0a0a0a]">
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 text-white">
            Teknoloji Yığını
          </h2>
          <MagicBento />
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-xs text-gray-600">
          © 2025 Tuğrul Şirin Portfolio
        </div>
      </section>

    </div>
  );
};

export default App;
