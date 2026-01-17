import React from 'react';
import { motion } from 'framer-motion';

const DetailSection = ({ title, items, color = "blue" }) => {
    const colorClasses = {
        blue: "border-blue-500/30 text-blue-400 bg-blue-900/10",
        green: "border-green-500/30 text-green-400 bg-green-900/10",
        purple: "border-purple-500/30 text-purple-400 bg-purple-900/10",
        pink: "border-pink-500/30 text-pink-400 bg-pink-900/10",
        orange: "border-orange-500/30 text-orange-400 bg-orange-900/10",
    };

    return (
        <div className="w-full max-w-7xl px-4 flex flex-col items-center justify-center h-full">
            <h3 className={`text-3xl md:text-5xl font-bold mb-12 ${colorClasses[color].split(' ')[1]}`}>
                {title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-8 rounded-3xl border backdrop-blur-md bg-black/40 hover:bg-white/5 transition-all duration-300 ${colorClasses[color].split(' ')[0]}`}
                    >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h4 className="text-xl font-bold text-white mb-3">{item.header}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DetailSection;
