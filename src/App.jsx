import React from 'react';
import { sections } from './data/content';
import { motion } from 'framer-motion';
import Antigravity from './components/ui/Antigravity';

const App = () => {
  return (
    <div className="snap-container bg-brand-dark text-white">

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="snap-section flex-col relative border-b border-white/5"
        >
          {/* --- KATMAN 1: ÖZEL HERO EFEKTİ (Sadece Giriş Ekranı) --- */}
          {index === 0 && (
            <div className="absolute inset-0 z-0">
              <Antigravity
                count={150} // Mobil performans için sayıyı dengeledik
                magnetRadius={15}
                ringRadius={12}
                color="#3b82f6" // Senin markan olan Mavi tonu
                particleSize={3}
                autoAnimate={true}
              />
            </div>
          )}

          {/* --- KATMAN 2: GENEL ARKA PLAN (Diğer Sayfalar) --- */}
          {index !== 0 && (
            <div className={`absolute inset-0 z-0 opacity-20 bg-gradient-to-br 
              ${section.theme === 'blue' ? 'from-blue-900 via-black to-black' :
                section.theme === 'green' ? 'from-green-900 via-black to-black' :
                  'from-gray-800 via-black to-black'}`}
            />
          )}

          {/* --- KATMAN 3: İÇERİK (Yazılar animasyonun üstünde) --- */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">
            {/* pointer-events-none yaptık ki mouse alttaki animasyonu etkileyebilsin */}

            {/* İkon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-8 p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md pointer-events-auto"
            >
              <section.icon size={48} className="text-white opacity-90" />
            </motion.div>

            {/* Başlık */}
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-2xl"
            >
              {section.title}
            </motion.h2>

            {/* Alt Başlık */}
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto drop-shadow-lg"
            >
              {section.subtitle}
            </motion.p>

            {/* Mobil Scroll İpucu */}
            {index === 0 && (
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-32 opacity-70 text-sm font-mono tracking-widest pointer-events-auto"
              >
                AŞAĞI KAYDIR ↓
              </motion.div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
