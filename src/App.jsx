import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Bileşenler
import RippleGrid from './components/ui/RippleGrid';
import Galaxy from './components/ui/Galaxy';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import ScrollVelocity from './components/ui/ScrollVelocity';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText';
import DetailSection from './components/ui/DetailSection';
import TextPressure from './components/ui/TextPressure';

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

      {/* --- 1. GİRİŞ (HERO) - TAM EKRAN RIPPLE + TEXT PRESSURE --- */}
      <section className="snap-section relative border-b border-white/5 bg-black overflow-hidden flex flex-col justify-center items-center h-screen w-screen">

        {/* KATMAN 1: RIPPLE GRID (Tam Ekran Arka Plan) */}
        {/* z-0 ve pointer-events-auto: Mouse'u direkt alır */}
        <div className="absolute inset-0 z-0 opacity-60">
          <RippleGrid
            gridColor="#4079ff"
            rippleIntensity={0.05} // Standart dalgalanma
            mouseInteraction={true}
          />
        </div>

        {/* KATMAN 2: TUĞRUL ŞİRİN (Text Pressure) */}
        {/* pointer-events-none: Mouse buradan GEÇER ve arkadaki Ripple'a değer */}
        <div className="relative z-10 w-full max-w-7xl h-[300px] flex items-center justify-center pointer-events-none">
          <div className="w-full h-full">
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
            />
          </div>
        </div>

        {/* KATMAN 3: ALT İÇERİKLER */}
        {/* pointer-events-auto: Linklere tıklanabilsin */}
        <div className="relative z-20 text-center p-4 max-w-6xl flex flex-col items-center pointer-events-auto -mt-4">
          <div className="mb-8">
            <GradientText
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={4}
              className="text-2xl md:text-4xl font-bold tracking-wide uppercase font-mono"
            >
              E-TİCARET & OTOMASYON SYNERGY
            </GradientText>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-lg text-gray-400 bg-black/70 p-3 rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl">
            <span className="opacity-70">Uzmanlık:</span>
            <FlipWords
              words={["Operasyon", "Veri Analizi", "Entegrasyon", "AI Agent", "Süreç Yönetimi"]}
              className="text-cyan-400 font-bold"
            />
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce text-gray-500 text-sm tracking-widest cursor-pointer z-30 pointer-events-auto" onClick={() => scrollToSection(1)}>
          AŞAĞI KAYDIR ↓
        </div>
      </section>

      {/* --- 2. ÖZET (BENTO) --- */}
      <section className="snap-section bg-[#030303]">
        <div className="w-full max-w-7xl px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">Teknolojik Yetkinlikler</h2>
          <MagicBento />
        </div>
      </section>

      {/* --- 3. OPERASYON (KAPAK) --- */}
      <section className="snap-section bg-gradient-to-b from-black to-blue-950/20">
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="scale-125 mb-12"><OrbitingSkills /></div>
          <h2 className="text-6xl font-bold text-white mt-8">Operasyonel Merkez</h2>
        </div>
      </section>

      {/* --- 4. OPERASYON (DETAY) --- */}
      <section className="snap-section bg-[#050505]">
        <DetailSection title="Süreç ve Entegrasyon Ağı" color="blue" items={[
          { icon: "📦", header: "Amazon & Pazaryerleri", desc: "FBA süreçleri, Buybox yönetimi." },
          { icon: "🔗", header: "Entegra & Entegrasyon", desc: "ERP ve Pazaryeri senkronizasyonu." },
          { icon: "⚙️", header: "ERP & Süreç", desc: "Siparişten faturaya süreç yönetimi." }
        ]} />
      </section>

      {/* --- 5. VERİ (KAPAK) --- */}
      <section className="snap-section relative overflow-hidden bg-black">
        <FallingGlitch glitchColors={["#00ff41", "#008f11"]} />
        <div className="relative z-10 p-12 bg-black/90 backdrop-blur-xl border border-green-500/50 rounded-3xl text-center">
          <h2 className="text-7xl font-mono font-bold text-[#00ff41]">DATA {'>'} DECISION</h2>
        </div>
      </section>

      {/* --- 6. VERİ (DETAY) --- */}
      <section className="snap-section bg-black">
        <DetailSection title="Veri Laboratuvarı" color="green" items={[
          { icon: "🐍", header: "Python & Pandas", desc: "Büyük veri işleme ve temizleme." },
          { icon: "📊", header: "Görselleştirme", desc: "Looker Studio dashboardları." },
          { icon: "🤖", header: "Tahminleme", desc: "Stok ve satış projeksiyonları." }
        ]} />
      </section>

      {/* --- 7. OTOMASYON (KAPAK) - GALAXY EFEKTİ --- */}
      <section className="snap-section relative p-0 bg-black overflow-hidden">
        <Galaxy />
        <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center h-full">
          <h2 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-2xl">
            Otonom Sistemler
          </h2>
          <p className="text-2xl text-purple-200 mt-4 font-light">"Kendi kendine karar veren dijital iş gücü."</p>
        </div>
      </section>

      {/* --- 8. OTOMASYON (DETAY) --- */}
      <section className="snap-section bg-[#080808]">
        <DetailSection title="Yapay Zeka İş Akışları" color="purple" items={[
          { icon: "⚡", header: "n8n Workflow", desc: "Tam otonom süreçler." },
          { icon: "🧠", header: "AI Agents", desc: "Akıllı botlar ve asistanlar." },
          { icon: "🕷️", header: "Veri Kazıma", desc: "Apify ile web scraping." }
        ]} />
      </section>

      {/* --- 9. ÇÖZÜMLER (KAPAK) --- */}
      <section className="snap-section bg-[#050505]">
        <div className="text-center relative z-10">
          <h2 className="text-6xl font-bold text-white mb-10">Özel Çözümler</h2>
          <div className="w-64 h-96 mx-auto bg-gray-900 border-4 border-gray-700 rounded-[3rem] flex items-center justify-center shadow-2xl">
            <span className="text-2xl text-orange-400 font-bold">AppSheet</span>
          </div>
        </div>
      </section>

      {/* --- 10. ÇÖZÜMLER (DETAY) --- */}
      <section className="snap-section bg-black">
        <DetailSection title="AppSheet & Mikro SaaS" color="orange" items={[
          { icon: "📱", header: "Mobil Uygulamalar", desc: "Saha satışı ve depo sayımı." },
          { icon: "🧩", header: "Özel Modüller", desc: "ERP ara katman yazılımları." },
          { icon: "🚀", header: "MVP Geliştirme", desc: "Hızlı prototipleme." }
        ]} />
      </section>

      {/* --- 11. KREATİF (KAPAK) --- */}
      <section className="snap-section bg-black relative flex flex-col justify-center overflow-hidden">
        <h2 className="text-center text-4xl font-bold mb-16 text-pink-500 z-10">Kreatif & Pazarlama</h2>
        <div className="w-full -rotate-3 opacity-80"><ScrollVelocity text="Viral İçerik • Meta Ads • CapCut Otomasyon • " /></div>
        <div className="w-full rotate-3 mt-8 opacity-60"><ScrollVelocity text="Canva • Dijital Pazarlama • Sosyal Medya • " /></div>
      </section>

      {/* --- 12. KREATİF (DETAY) --- */}
      <section className="snap-section bg-[#080808]">
        <DetailSection title="İçerik & Reklam Yönetimi" color="pink" items={[
          { icon: "🎬", header: "Otomatik İçerik", desc: "n8n ile video otomasyonu." },
          { icon: "🎯", header: "Performans Pazarlama", desc: "Meta ve Google Ads yönetimi." },
          { icon: "🎨", header: "Kreatif Tasarım", desc: "Viral odaklı içerikler." }
        ]} />
      </section>

      {/* --- 13. İLETİŞİM --- */}
      <section className="snap-section bg-black relative">
        <div className="absolute inset-0 z-0"><RippleGrid opacity={0.1} /></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-8">Birlikte Çalışalım</h2>
          <a href="mailto:tugrul.sirin34@gmail.com" className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform">İletişime Geç</a>
        </div>
      </section>

    </div>
  );
};

export default App;
