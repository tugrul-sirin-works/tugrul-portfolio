import React from 'react';
import { sections } from './data/content';
import { motion } from 'framer-motion';

const App = () => {
  return (
    // Ana Kaydırma Konteyneri (Snap Container)
    // CSS dosyamızdaki .snap-container sınıfı burada çalışıyor
    <div className="snap-container bg-brand-dark text-white">

      {sections.map((section, index) => (
        // Her Bir Tam Ekran Bölüm (100vh)
        <section
          key={section.id}
          className="snap-section flex-col relative border-b border-white/5"
        >
          {/* Arka Plan: Her tema için hafif renkli bir gradyan */}
          <div className={`absolute inset-0 z-0 opacity-20 bg-gradient-to-br 
            ${section.theme === 'blue' ? 'from-blue-900 via-black to-black' :
              section.theme === 'green' ? 'from-green-900 via-black to-black' :
                'from-gray-800 via-black to-black'}`}
          />

          {/* İçerik Katmanı (Z-Index ile önde) */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">

            {/* İkon Animasyonu */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <section.icon size={48} className="text-white opacity-90" />
            </motion.div>

            {/* Başlık Animasyonu */}
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
            >
              {section.title}
            </motion.h2>

            {/* Alt Başlık Animasyonu */}
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg md:text-2xl text-gray-400 font-light"
            >
              {section.subtitle}
            </motion.p>

            {/* Mobil için kaydırma ipucu (Sadece ilk slaytta) */}
            {index === 0 && (
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 opacity-50 text-sm"
              >
                Kaydır ↓
              </motion.div>
            )}

          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
