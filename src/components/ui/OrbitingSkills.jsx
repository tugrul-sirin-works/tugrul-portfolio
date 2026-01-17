import React, { useState, useEffect, memo } from 'react';

// Özel Text İkon Bileşeni (Logosu olmayanlar için şık text kutusu)
const TextIcon = ({ label, color }) => (
    <div className="flex items-center justify-center w-full h-full rounded-full bg-black/80 border border-white/20" style={{ borderColor: color }}>
        <span className="text-[10px] font-bold text-white text-center leading-tight px-1">{label}</span>
    </div>
);

const skillsConfig = [
    // İç Çember (Operasyonel)
    { id: 'amazon', orbitRadius: 90, size: 50, speed: 1.5, label: 'Amazon', color: '#FF9900', type: 'text' },
    { id: 'entegra', orbitRadius: 90, size: 50, speed: 1.5, label: 'Entegra', color: '#0066CC', type: 'text', phaseShift: 2 },
    { id: 'nebim', orbitRadius: 90, size: 50, speed: 1.5, label: 'Nebim V3', color: '#FF0000', type: 'text', phaseShift: 4 },

    // Dış Çember (Teknik & Araçlar)
    { id: 'python', orbitRadius: 160, size: 45, speed: -1, label: 'Python', color: '#306998', type: 'text' },
    { id: 'n8n', orbitRadius: 160, size: 45, speed: -1, label: 'n8n', color: '#FF6F61', type: 'text', phaseShift: 1.5 },
    { id: 'sql', orbitRadius: 160, size: 45, speed: -1, label: 'SQL', color: '#00758F', type: 'text', phaseShift: 3 },
    { id: 'excel', orbitRadius: 160, size: 45, speed: -1, label: 'Excel', color: '#1D6F42', type: 'text', phaseShift: 4.5 }
];

const OrbitingSkill = memo(({ config, angle }) => {
    const x = Math.cos(angle) * config.orbitRadius;
    const y = Math.sin(angle) * config.orbitRadius;

    return (
        <div className="absolute top-1/2 left-1/2 transition-transform duration-100 ease-linear"
            style={{
                width: `${config.size}px`,
                height: `${config.size}px`,
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                zIndex: 20
            }}>
            <TextIcon label={config.label} color={config.color} />
        </div>
    );
});

const OrbitPath = memo(({ radius }) => (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }} />
));

export default function OrbitingSkills() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let frameId;
        const animate = () => {
            setTime(prev => prev + 0.005);
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
            {/* Merkez */}
            <div className="absolute z-10 w-20 h-20 bg-brand-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-accent/50 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <span className="font-bold text-white text-xl">Core</span>
            </div>

            {/* Yörüngeler */}
            <OrbitPath radius={90} />
            <OrbitPath radius={160} />

            {/* Yetenekler */}
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
