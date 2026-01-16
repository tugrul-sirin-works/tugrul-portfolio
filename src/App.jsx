import React from 'react';
import { sections } from './data/content';
import { motion } from 'framer-motion';
import RippleGrid from './components/ui/RippleGrid'; // Yeni Efekt
import OrbitingSkills from './components/ui/OrbitingSkills';
import { FlipWords } from './components/ui/FlipWords';

const App = () => {
  return (
    <div className="snap-container bg-brand-dark text-white">

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="snap-section flex-col relative border-b border-white/5 overflow-hidden"
        >
          {/* --- KATMAN 1: HERO (Ripple Grid + FlipWords) --- */}
          {index === 0 && (
            <>
              {/* Arka Plan Efekti */}
              <div className="absolute inset-0 z-0">
                <RippleGrid
                  gridColor="#3b82f6" // Mavi ızgara
                  opacity={0.4}
                  rippleIntensity={0.05}
                />
              </div>

              {/* İçerik */}
              <div className="relative z-10 text-center pointer-events-none p-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter"
                >
                  Tuğrul Şirin
                </motion.h1>
                <div className="text-2xl md:text-4xl text-gray-400 font-light flex flex-col md:flex-row justify-center items-center gap-2">
                  <span>Uzmanlık:</span>
                  <FlipWords
                    words={["E-Ticaret", "Otomasyon", "Veri Analizi", "Entegrasyon", "Süreç Yönetimi"]}
                    className="text-brand-accent font-semibold"
                  />
                </div>
              </div>
            </>
          )}

          {/* --- KATMAN 2: E-TICARET EKOSISTEMI (Orbiting Skills) --- */}
          {index === 1 && (
            <>
              <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-brand-dark to-black" />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Operasyonel Ekosistem
                </h2>
                <p className="text-gray-400 max-w-xl text-center mb-8">
                  Pazaryerleri, ERP ve Entegrasyon araçları arasındaki kusursuz veri akışını yönetiyorum.
                </p>
                <div className="scale-75 md:scale-100">
                  <OrbitingSkills />
                </div>
              </div>
            </>
          )}

          {/* --- KATMAN 3 ve Diğerleri --- */}
          {index > 1 && (
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
              <p className="text-gray-400">{section.subtitle}</p>
            </div>
          )}

        </section>
      ))}
    </div>
  );
};

export default App;
