import React, { useState, useEffect, memo } from 'react';

const TextIcon = ({ label, color }) => (
    <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/90 border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-110" style={{ borderColor: color, boxShadow: `0 0 20px ${color}40` }}>
        <span className="text-[10px] md:text-xs font-bold text-white text-center leading-tight px-1">{label}</span>
    </div>
);

const skillsConfig = [
    // İÇ ÇEMBER (Operasyonel)
    { id: 'amazon', orbitRadius: 90, speed: 1.5, label: 'Amazon FBA', color: '#FF9900' },
    { id: 'entegra', orbitRadius: 90, speed: 1.5, label: 'Entegra', color: '#0066CC', phaseShift: 2 },
    { id: 'nebim', orbitRadius: 90, speed: 1.5, label: 'Nebim V3', color: '#FF0000', phaseShift: 4 },

    // DIŞ ÇEMBER (Teknik)
    { id: 'python', orbitRadius: 170, speed: -1, label: 'Python', color: '#306998' },
    { id: 'n8n', orbitRadius: 170, speed: -1, label: 'n8n', color: '#FF6F61', phaseShift: 1.5 },
    { id: 'sql', orbitRadius: 170, speed: -1, label: 'SQL', color: '#00758F', phaseShift: 3 },
    { id: 'excel', orbitRadius: 170, speed: -1, label: 'Excel', color: '#1D6F42', phaseShift: 4.5 }
];

const OrbitingSkill = memo(({ config, angle }) => {
    const x = Math.cos(angle) * config.orbitRadius;
    const y = Math.sin(angle) * config.orbitRadius;

    return (
        <div className="absolute top-1/2 left-1/2"
            style={{ transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`, zIndex: 20 }}>
            <TextIcon label={config.label} color={config.color} />
        </div>
    );
});

const OrbitPath = memo(({ radius }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }} />
));

export default function OrbitingSkills() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let frameId;
        const animate = () => {
            setTime(prev => prev + 0.005); // Dönüş Hızı
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* MERKEZ (CORE) */}
            <div className="absolute z-10 w-24 h-24 bg-blue-600/20 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                <div className="text-center">
                    <span className="block font-bold text-white text-xl">CORE</span>
                    <span className="text-[9px] text-blue-200">HUB</span>
                </div>
            </div>

            <OrbitPath radius={90} />
            <OrbitPath radius={170} />

            {skillsConfig.map(skill => (
                <OrbitingSkill
                    key={skill.id}
                    config={skill}
                    angle={time * skill.speed + (skill.phaseShift || 0)}
                />
            ))}
        </div>
    );
}
