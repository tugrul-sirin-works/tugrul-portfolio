import React from 'react';

const Card = ({ title, subtitle, items, color }) => {
    const colors = {
        purple: "from-purple-500/20 to-blue-500/10 border-purple-500/30",
        blue: "from-blue-500/20 to-cyan-500/10 border-blue-500/30",
        green: "from-green-500/20 to-emerald-500/10 border-green-500/30",
        pink: "from-pink-500/20 to-rose-500/10 border-pink-500/30",
    };

    return (
        <div className={`relative overflow-hidden rounded-3xl p-6 border bg-gradient-to-br transition-transform hover:scale-[1.02] ${colors[color]}`}>
            <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
            <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item, idx) => (
                    <span key={idx} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded bg-white/10 text-white/80 border border-white/5">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

const MagicBento = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-4">
            <div className="col-span-1 lg:col-span-2">
                <Card title="Otomasyon & AI" subtitle="n8n & AI Agent Sistemleri" items={["n8n", "Zapier", "OpenAI", "Claude", "Vibe Coding"]} color="purple" />
            </div>
            <div className="col-span-1">
                <Card title="Entegrasyon" subtitle="ERP - Pazaryeri Köprüsü" items={["Entegra", "Nebim V3", "Logo", "StockMount"]} color="blue" />
            </div>
            <div className="col-span-1">
                <Card title="Kreatif" subtitle="Otomatik İçerik" items={["CapCut", "Canva API", "Meta Ads"]} color="pink" />
            </div>
            <div className="col-span-1 lg:col-span-4">
                <Card title="Veri & Raporlama" subtitle="Büyük Veri Analizi ve Dashboard" items={["Python", "Pandas", "SQL", "Looker Studio", "Excel Advanced"]} color="green" />
            </div>
        </div>
    );
};

export default MagicBento;
