import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Bileşenler
import RippleGrid from './components/ui/RippleGrid';
import { GridScan } from './components/ui/GridScan'; // Yeni Scanner
import Galaxy from './components/ui/Galaxy';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import ScrollVelocity from './components/ui/ScrollVelocity';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText';
import DetailSection from './components/ui/DetailSection';
import TextPressure from './components/ui/TextPressure';

// YÜKLEME EKRANI (PRELOADER)
const Preloader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black flex items-center justify-center"
  >
    <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-6xl font-bold text-white mb-4"
      >
        TŞ
      </motion.div>
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
          className="h-full bg-blue-500"
        />
      </div>
    </div>
  </motion.div>
);

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2.5 saniye sonra siteyi aç
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (idx) => {
    const el = document.getElementsByClassName('snap-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>

      {!loading && (
        <div className="snap-container bg-black text-white" onScroll={(e) => setActiveSection(Math.round(e.target.scrollTop / window.innerHeight))}>

          {/* Yan Navigasyon */}
          <div className="nav-dots">
            {Array.from({ length: 13 }).map((_, idx) => (
              <div key={idx} className={`nav-dot ${activeSection === idx ? 'active' : ''}`} onClick={() => scrollToSection(idx)} />
            ))}
          </div>

          {/* --- 1. GİRİŞ (HERO) --- */}
          <section className="snap-section relative border-b border-white/5 bg-black overflow-hidden flex flex-col justify-center items-center h-screen w-screen">

            {/* 1. RIPPLE GRID (Sürekli Dalgalanma) */}
            <div className="absolute inset-0 z-0 opacity-40">
              <RippleGrid gridColor="#4079ff" opacity={0.5} rippleIntensity={0.05} mouseInteraction={false} />
            </div>

            {/* 2. GRID SCAN (15 Saniyede Bir Geçen Işık) */}
            <GridScan
              scanColor="#00ff41" // Matrix Yeşili veya Mavi
              scanOpacity={0.6}
              scanDuration={2.0}
              scanDelay={10.0}
            />

            {/* 3. TUĞRUL ŞİRİN (Text Pressure - Mouse Etkileşimli) */}
            <div className="relative z-10 w-full max-w-[90vw] h-[300px] flex items-center justify-center">
              <div className="w-full h-full cursor-default select-none">
                <TextPressure
                  text="TUĞRUL ŞİRİN"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#FFFFFF"
                  minFontSize={100}
                  fontFamily="Inter"
                  className="font-thin tracking-tighter"
                />
              </div>
            </div>

            {/* 4. ALT METİNLER */}
            <div className="relative z-20 text-center p-4 max-w-6xl flex flex-col items-center pointer-events-auto mt-8">
              <div className="mb-8">
                <GradientText
                  colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
                  animationSpeed={4}
                  className="text-xl md:text-3xl font-light tracking-[0.2em] uppercase font-sans text-gray-300"
                >
                  E-TİCARET & OTOMASYON SYNERGY
                </GradientText>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-base text-gray-400 bg-white/5 p-3 rounded-full backdrop-blur-md border border-white/10 px-8">
                <span className="opacity-60 font-light">Uzmanlık:</span>
                <FlipWords words={["Operasyon", "Veri Analizi", "Entegrasyon", "AI Agent", "Süreç Yönetimi"]} className="text-white font-medium" />
              </div>
            </div>

            <div className="absolute bottom-10 animate-bounce text-gray-600 text-xs tracking-[0.3em] cursor-pointer z-20 uppercase" onClick={() => scrollToSection(1)}>Keşfet</div>
          </section>

          {/* DİĞER BÖLÜMLER (Aynen Kalıyor) */}
          <section className="snap-section bg-[#030303]">
            <div className="w-full max-w-7xl px-4 text-center">
              <h2 className="text-4xl font-bold mb-12 text-white">Teknolojik Yetkinlikler</h2>
              <MagicBento />
            </div>
          </section>

          <section className="snap-section bg-gradient-to-b from-black to-blue-950/20">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="scale-125 mb-12"><OrbitingSkills /></div>
              <h2 className="text-6xl font-bold text-white mt-8">Operasyonel Merkez</h2>
            </div>
          </section>

          <section className="snap-section bg-[#050505]">
            <DetailSection title="Süreç ve Entegrasyon Ağı" color="blue" items={[
              { icon: "📦", header: "Amazon & Pazaryerleri", desc: "FBA süreçleri, Buybox yönetimi." },
              { icon: "🔗", header: "Entegra & Entegrasyon", desc: "ERP ve Pazaryeri senkronizasyonu." },
              { icon: "⚙️", header: "ERP & Süreç", desc: "Siparişten faturaya süreç yönetimi." }
            ]} />
          </section>

          <section className="snap-section relative overflow-hidden bg-black">
            <FallingGlitch glitchColors={["#00ff41", "#008f11"]} />
            <div className="relative z-10 p-12 bg-black/90 backdrop-blur-xl border border-green-500/50 rounded-3xl text-center">
              <h2 className="text-7xl font-mono font-bold text-[#00ff41]">DATA {'>'} DECISION</h2>
            </div>
          </section>

          <section className="snap-section bg-black">
            <DetailSection title="Uçtan Uca Veri Yönetimi" color="green" items={[
              { icon: "🛠️", header: "Veri Mühendisliği", desc: "SQL/Python ile veri temizleme." },
              { icon: "📊", header: "Business Intelligence", desc: "PowerBI ile görselleştirme." },
              { icon: "🔮", header: "Gelecek Tahmini", desc: "Satış projeksiyonları." }
            ]} />
          </section>

          <section className="snap-section relative p-0 bg-black overflow-hidden">
            <Galaxy />
            <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center h-full">
              <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-2xl">Otonom Sistemler</h2>
              <p className="text-2xl text-purple-200 mt-4 font-light">"Dijital İş Gücü"</p>
            </div>
          </section>

          <section className="snap-section bg-[#080808]">
            <DetailSection title="Yapay Zeka İş Akışları" color="purple" items={[
              { icon: "⚡", header: "n8n Workflow", desc: "Tam otonom süreçler." },
              { icon: "🧠", header: "AI Agents", desc: "Akıllı botlar." },
              { icon: "🕷️", header: "Veri Kazıma", desc: "Apify ile web scraping." }
            ]} />
          </section>

          <section className="snap-section bg-[#050505]">
            <div className="text-center relative z-10">
              <h2 className="text-6xl font-bold text-white mb-10">Özel Çözümler</h2>
              <div className="w-64 h-96 mx-auto bg-gray-900 border-4 border-gray-700 rounded-[3rem] flex items-center justify-center shadow-2xl">
                <span className="text-2xl text-orange-400 font-bold">AppSheet</span>
              </div>
            </div>
          </section>

          <section className="snap-section bg-black">
            <DetailSection title="AppSheet & Mikro SaaS" color="orange" items={[
              { icon: "📱", header: "Mobil Uygulamalar", desc: "Saha satışı ve depo sayımı." },
              { icon: "🧩", header: "Özel Modüller", desc: "ERP ara katman yazılımları." },
              { icon: "🚀", header: "MVP Geliştirme", desc: "Hızlı prototipleme." }
            ]} />
          </section>

          <section className="snap-section bg-black relative flex flex-col justify-center overflow-hidden">
            <h2 className="text-center text-4xl font-bold mb-16 text-pink-500 z-10">Kreatif & Pazarlama</h2>
            <div className="w-full -rotate-3 opacity-80"><ScrollVelocity text="Viral İçerik • Meta Ads • CapCut Otomasyon • " /></div>
            <div className="w-full rotate-3 mt-8 opacity-60"><ScrollVelocity text="Canva • Dijital Pazarlama • Sosyal Medya • " /></div>
          </section>

          <section className="snap-section bg-[#080808]">
            <DetailSection title="İçerik & Reklam Yönetimi" color="pink" items={[
              { icon: "🎬", header: "Otomatik İçerik", desc: "Video otomasyonu." },
              { icon: "🎯", header: "Performans Pazarlama", desc: "Meta/Google Ads." },
              { icon: "🎨", header: "Kreatif Tasarım", desc: "Viral içerikler." }
            ]} />
          </section>

          <section className="snap-section bg-black relative">
            <div className="absolute inset-0 z-0"><RippleGrid opacity={0.1} /></div>
            <div className="relative z-10 text-center">
              <h2 className="text-5xl font-bold mb-8">Birlikte Çalışalım</h2>
              <a href="mailto:tugrul.sirin34@gmail.com" className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform">İletişime Geç</a>
            </div>
          </section>

        </div>
      )}
    </>
  );
};

export default App;
