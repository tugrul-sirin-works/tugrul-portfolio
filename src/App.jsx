import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Bileşenler
import RippleGrid from './components/ui/RippleGrid';
import { GridScan } from './components/ui/GridScan';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import ScrollVelocity from './components/ui/ScrollVelocity';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText';
import DetailSection from './components/ui/DetailSection';
import TextPressure from './components/ui/TextPressure';
import Galaxy from './components/ui/Galaxy';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTunnel, setShowTunnel] = useState(false);

  useEffect(() => {
    // 1. Preloader süresi
    const loadTimer = setTimeout(() => setLoading(false), 2000);

    // 2. Tünel Efekti Döngüsü (15 saniyede bir)
    const tunnelLoop = setInterval(() => {
      setShowTunnel(true); // Aç
      setTimeout(() => setShowTunnel(false), 6000); // 6 saniye sonra kapat
    }, 15000);

    return () => {
      clearTimeout(loadTimer);
      clearInterval(tunnelLoop);
    };
  }, []);

  const scrollToSection = (idx) => {
    const el = document.getElementsByClassName('snap-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* --- PRELOADER (ARTİSTİK SPINNER) --- */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="loader-container"
          >
            <div className="spinner"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="snap-container bg-black text-white" onScroll={(e) => setActiveSection(Math.round(e.target.scrollTop / window.innerHeight))}>

          <div className="nav-dots">
            {Array.from({ length: 13 }).map((_, idx) => (
              <div key={idx} className={`nav-dot ${activeSection === idx ? 'active' : ''}`} onClick={() => scrollToSection(idx)} />
            ))}
          </div>

          {/* --- 1. GİRİŞ (HERO) --- */}
          <section className="snap-section relative bg-black overflow-hidden flex flex-col justify-center items-center h-screen w-screen">

            {/* KATMAN 1: RIPPLE GRID (MAVİ - HEP VAR) */}
            <div className="absolute inset-0 z-0 opacity-40">
              <RippleGrid gridColor="#0088ff" rippleIntensity={0.04} mouseInteraction={true} />
            </div>

            {/* KATMAN 2: GRID SCAN (MOR TÜNEL - ARA SIRA GELİR) */}
            <div
              className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-[2000ms] ease-in-out"
              style={{ opacity: showTunnel ? 0.8 : 0 }}
            >
              <GridScan scanColor="#bd00ff" />
            </div>

            {/* KATMAN 3: TUĞRUL ŞİRİN (İNCE, ZARİF, KÜÇÜK) */}
            <div className="relative z-10 w-full max-w-4xl h-[200px] flex items-center justify-center select-none pointer-events-none">
              <div className="w-full h-full">
                <TextPressure
                  text="TUĞRUL ŞİRİN"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={false}  // Genişliği zorlama (Daha dar olsun)
                  weight={true}
                  italic={false} // İtalik olmasın, düz dursun
                  textColor="#FFFFFF"
                  minFontSize={70} // Çok büyük değil
                />
              </div>
            </div>

            {/* KATMAN 4: ALT METİNLER */}
            <div className="relative z-20 text-center p-4 max-w-6xl flex flex-col items-center pointer-events-auto">
              <div className="mb-6">
                <GradientText
                  colors={['#ffffff', '#bd00ff', '#0088ff']}
                  animationSpeed={6}
                  className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase font-sans text-gray-300"
                >
                  E-TİCARET & OTOMASYON SYNERGY
                </GradientText>
              </div>

              <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-sm text-gray-400 bg-white/5 p-2 px-6 rounded-full backdrop-blur-md border border-white/10 shadow-xl">
                <span className="opacity-60 font-light">Uzmanlık:</span>
                <FlipWords
                  words={["Veri Analizi", "Entegrasyon", "AI Agent", "Süreç Yönetimi"]}
                  className="text-white font-medium"
                />
              </div>
            </div>

            <div className="absolute bottom-10 animate-bounce text-gray-500 text-[10px] tracking-[0.3em] cursor-pointer z-30 uppercase opacity-70" onClick={() => scrollToSection(1)}>
              Keşfet
            </div>
          </section>

          {/* DİĞER BÖLÜMLER AYNEN DEVAM... */}
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
