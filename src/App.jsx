import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Bileşenler
import LightRays from './components/ui/LightRays';
import AuroraBackground from './components/ui/Aurora';
import RippleGrid from './components/ui/RippleGrid';
import OrbitingSkills from './components/ui/OrbitingSkills';
import FallingGlitch from './components/ui/FallingGlitch';
import MagicBento from './components/ui/MagicBento';
import ScrollVelocity from './components/ui/ScrollVelocity';
import { FlipWords } from './components/ui/FlipWords';
import GradientText from './components/ui/GradientText';
import DetailSection from './components/ui/DetailSection';

const App = () => {
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = (idx) => {
    const el = document.getElementsByClassName('snap-section')[idx];
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="snap-container bg-black text-white" onScroll={(e) => setActiveSection(Math.round(e.target.scrollTop / window.innerHeight))}>

      {/* Yan Navigasyon (Z-Index Fix) */}
      <div className="nav-dots">
        {Array.from({ length: 13 }).map((_, idx) => (
          <div key={idx} className={`nav-dot ${activeSection === idx ? 'active' : ''}`} onClick={() => scrollToSection(idx)} />
        ))}
      </div>

      {/* --- 1. GİRİŞ (HERO) - DÜZELTİLDİ --- */}
      <section className="snap-section relative border-b border-white/5 bg-black">
        {/* Arka Plan: Mavi Işıklar + Ripple */}
        <div className="absolute inset-0 z-0">
          <LightRays raysColor="#1e40af" speed={0.2} mouseInfluence={0.5} />
          <RippleGrid gridColor="#3b82f6" opacity={0.3} rippleIntensity={0.06} />
        </div>

        <div className="relative z-10 text-center p-4 max-w-6xl flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-8xl md:text-[10rem] font-bold mb-2 tracking-tighter leading-[1] text-apple-gradient pb-6"
          >
            Tuğrul Şirin
          </motion.h1>

          <div className="mb-10 mt-4">
            <GradientText colors={['#60A5FA', '#A78BFA', '#34D399']} animationSpeed={4} className="text-3xl md:text-5xl font-bold tracking-wide uppercase">
              E-TİCARET & OTOMASYON SYNERGY
            </GradientText>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-xl text-gray-400 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            <span className="opacity-70">Uzmanlık:</span>
            <FlipWords
              words={["Operasyon", "Veri Analizi", "Entegrasyon", "AI Agent", "Süreç Yönetimi"]}
              className="text-cyan-400 font-bold"
            />
          </div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-gray-500 text-sm tracking-widest cursor-pointer" onClick={() => scrollToSection(1)}>
          AŞAĞI KAYDIR ↓
        </div>
      </section>

      {/* --- 2. ÖZET (BENTO) - TASARIM İYİLEŞTİRİLDİ --- */}
      <section className="snap-section bg-[#030303]">
        <div className="w-full max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
            Teknolojik Yetkinlikler
          </h2>
          <MagicBento />
        </div>
      </section>

      {/* --- 3. OPERASYON (KAPAK) - ORBIT --- */}
      <section className="snap-section bg-gradient-to-b from-black to-blue-950/20">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <div className="scale-125 md:scale-150 mb-12">
            <OrbitingSkills />
          </div>
          <h2 className="text-6xl font-bold text-white mt-8 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            Operasyonel Merkez
          </h2>
        </div>
      </section>

      {/* --- 4. OPERASYON (DETAY) - ZİNCİR TASARIMI --- */}
      <section className="snap-section bg-[#050505]">
        <DetailSection
          title="Süreç ve Entegrasyon Ağı"
          color="blue"
          items={[
            { icon: "📦", header: "Amazon & Pazaryerleri", desc: "FBA süreçleri, Buybox yönetimi ve Amazon Avrupa/Amerika hesap sağlığı yönetimi." },
            { icon: "🔗", header: "Entegra & Entegrasyon", desc: "30+ Pazaryeri ile ERP (Nebim/Logo) arasında ürün, stok ve fiyat senkronizasyonu." },
            { icon: "⚙️", header: "ERP & Süreç", desc: "Siparişin düşmesinden faturalandırılmasına kadar olan tüm ERP süreçlerinin kurgulanması." }
          ]}
        />
      </section>

      {/* --- 5. VERİ (KAPAK) - MATRIX --- */}
      <section className="snap-section relative overflow-hidden bg-black">
        <FallingGlitch glitchColors={["#00ff41", "#008f11", "#003b00"]} />
        <div className="relative z-10 p-12 bg-black/90 backdrop-blur-xl border border-green-500/50 rounded-3xl text-center shadow-[0_0_50px_rgba(0,255,65,0.2)]">
          <h2 className="text-7xl font-mono font-bold text-[#00ff41] tracking-tighter glitch-text">
            DATA {'>'} DECISION
          </h2>
          <p className="text-green-400/70 font-mono mt-4 text-xl">System: Online // Status: Analyzing...</p>
        </div>
      </section>

      {/* --- 6. VERİ (DETAY) --- */}
      <section className="snap-section bg-black">
        <DetailSection
          title="Veri Laboratuvarı"
          color="green"
          items={[
            { icon: "🐍", header: "Python & Pandas", desc: "Milyonlarca satırlık ham e-ticaret verisinin temizlenmesi ve işlenmesi." },
            { icon: "📊", header: "Görselleştirme", desc: "Looker Studio ve PowerBI ile yönetim için canlı, karar destekli dashboard'lar." },
            { icon: "🤖", header: "Stok & Satış Tahmini", desc: "Geçmiş veriye (Regression) dayalı gelecek dönem stok planlaması." }
          ]}
        />
      </section>

      {/* --- 7. OTOMASYON (KAPAK) - AURORA --- */}
      <section className="snap-section relative p-0 bg-black">
        <AuroraBackground className="w-full h-full">
          <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-7xl font-bold text-white mb-6 drop-shadow-xl"
            >
              Otonom Sistemler
            </motion.h2>
            <p className="text-2xl text-purple-200 mb-8 max-w-2xl font-light">
              "Kendi kendine karar veren, 7/24 çalışan dijital iş gücü."
            </p>
            <div className="flex gap-4">
              <span className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/30">n8n</span>
              <span className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/30">AI Agents</span>
              <span className="px-6 py-2 bg-white/20 rounded-full backdrop-blur-md border border-white/30">Webhook</span>
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* --- 8. OTOMASYON (DETAY) --- */}
      <section className="snap-section bg-[#080808]">
        <DetailSection
          title="Yapay Zeka İş Akışları"
          color="purple"
          items={[
            { icon: "⚡", header: "n8n Workflow", desc: "Tekrarlayan işlerin (Raporlama, Mail, Stok Kontrolü) %100 otonom hale getirilmesi." },
            { icon: "🧠", header: "AI Agents", desc: "Müşteri sorularını yanıtlayan veya rakip analizi yapan akıllı botlar." },
            { icon: "🕷️", header: "Veri Kazıma", desc: "Apify ile rakip fiyat takibi ve otomatik aksiyon alma mekanizmaları." }
          ]}
        />
      </section>

      {/* --- 9. ÇÖZÜMLER (KAPAK) --- */}
      <section className="snap-section bg-[#050505]">
        <div className="text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
          <h2 className="text-6xl font-bold text-white mb-10">Özel Çözümler</h2>

          {/* Mockup Yerine Daha Modern Bir Temsil */}
          <div className="flex justify-center gap-8 items-center">
            <div className="w-64 h-96 bg-gray-900 border-4 border-gray-700 rounded-[3rem] flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:opacity-100 transition-opacity" />
              <span className="text-4xl mb-2">📱</span>
              <span className="font-bold text-xl">AppSheet</span>
              <span className="text-xs text-gray-400 mt-2">Saha & Depo</span>
            </div>
            <div className="text-left space-y-4">
              <h3 className="text-2xl font-bold text-orange-400">Mobil & Web</h3>
              <p className="text-gray-400 max-w-xs">Hazır paketlerin yetmediği yerde, işletmenize özel "Terzi İşi" yazılımlar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 10. ÇÖZÜMLER (DETAY) --- */}
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

      {/* --- 11. KREATİF (KAPAK) - SCROLL VELOCITY --- */}
      <section className="snap-section bg-black relative flex flex-col justify-center overflow-hidden">
        <h2 className="text-center text-4xl font-bold mb-16 text-pink-500 z-10 bg-black/50 p-2 rounded-lg">Kreatif & Pazarlama</h2>
        <div className="w-full -rotate-3 opacity-80">
          <ScrollVelocity text="Viral İçerik • Meta Ads • CapCut Otomasyon • Google Ads • " />
        </div>
        <div className="w-full rotate-3 mt-8 opacity-60">
          <ScrollVelocity text="Canva • Dijital Pazarlama • Sosyal Medya • Trend Analizi • " />
        </div>
      </section>

      {/* --- 12. KREATİF (DETAY) --- */}
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

      {/* --- 13. İLETİŞİM --- */}
      <section className="snap-section bg-black relative">
        <div className="absolute inset-0 z-0"><RippleGrid opacity={0.1} /></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-8">Birlikte Çalışalım</h2>
          <a href="mailto:tugrul.sirin34@gmail.com" className="px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform hover:bg-blue-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            İletişime Geç
          </a>
          <div className="mt-12 flex gap-8 justify-center text-gray-500 font-mono">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Kariyer.net</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
