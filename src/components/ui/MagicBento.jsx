import React from 'react';

const Card = ({ title, subtitle, items, color }) => (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/20 blur-[50px] rounded-full -mr-16 -mt-16 transition-opacity group-hover:opacity-100`}></div>
        <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
        <div className="flex flex-wrap gap-2">
            {items.map((item, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/5 text-gray-300">
                    {item}
                </span>
            ))}
        </div>
    </div>
);

const MagicBento = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mx-auto p-4">
            <div className="col-span-1 md:col-span-2">
                <Card
                    title="Otomasyon & AI"
                    subtitle="İş süreçlerini hızlandıran yapılar"
                    items={["n8n", "Zapier", "OpenAI API", "Make.com", "Vibe Coding"]}
                    color="purple"
                />
            </div>
            <div className="col-span-1">
                <Card
                    title="Kreatif Araçlar"
                    subtitle="Görsel & Video Üretimi"
                    items={["CapCut", "Canva", "Photoshop", "Fal.ai"]}
                    color="pink"
                />
            </div>
            <div className="col-span-1">
                <Card
                    title="Entegrasyon"
                    subtitle="ERP ve Pazaryeri Bağlantıları"
                    items={["Entegra", "Nebim V3", "Logo", "StockMount"]}
                    color="blue"
                />
            </div>
            <div className="col-span-1 md:col-span-2">
                <Card
                    title="Veri Analitiği"
                    subtitle="Büyük veriyi anlama ve raporlama"
                    items={["Python", "Pandas", "Looker Studio", "Excel Advanced", "Google Sheets"]}
                    color="green"
                />
            </div>
        </div>
    );
};

export default MagicBento;
