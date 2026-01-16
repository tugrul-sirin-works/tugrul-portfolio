import React from 'react';
import { sections } from './data/content';
import { motion } from 'framer-motion';
import Antigravity from './components/ui/Antigravity';
import OrbitingSkills from './components/ui/OrbitingSkills';
import { FlipWords } from './components/ui/FlipWords';

const App = () => {
  return (
    <div className="snap-container bg-brand-dark text-white">

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="snap-section flex-col relative border-b border-white/5"
        >
          {/* --- KATMAN 1: HERO (Antigravity + FlipWords) --- */}
          {index === 0 && (
            <>
              <div className="absolute inset-0 z-0">
                <Antigravity
                  count={100}
                  magnetRadius={20}
                  color="#3b82f6"
                  particleSize={4}
                  autoAnimate={true}
                />
              </div>
              <div className="relative z-10 text-center pointer-events-none">
                <h1 className="text-5xl md:text-8xl font-bold mb-4">
                  Tuğrul Şirin
                </h1>
                <div className="text-2xl md:text-4xl text-gray-400 font-light flex justify-center items-center gap-2">
                  Uzmanlık:
                  <FlipWords words={["E-Ticaret", "Otomasyon", "Veri Analizi", "Entegrasyon"]} />
                </div>
              </div>
            </>
          )}

          {/* --- KATMAN 2: E-TICARET EKOSISTEMI (Orbiting Skills) --- */}
          {index === 1 && (
            <>
              <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-brand-dark to-black" />
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  Operasyonel Ekosistem
                </h2>
                <div className="scale-75 md:scale-100">
                  <OrbitingSkills />
                </div>
                <p className="mt-8 text-gray-400 max-w-lg text-center px-4">
                  Pazaryerleri, ERP ve Entegrasyon araçları arasındaki kusursuz veri akışını yönetiyorum.
                </p>
              </div>
            </>
          )}

          {/* --- KATMAN 3: VERİ & ANALİZ (Şimdilik Boş) --- */}
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
