import { Zap, Database, ShoppingCart, Layers } from 'lucide-react';

export const sections = [
    {
        id: "hero",
        title: "Tuğrul Şirin",
        subtitle: "E-Ticaret Operasyon & Otomasyon Mimarı",
        theme: "dark",
        icon: Zap
    },
    {
        id: "ecosystem",
        title: "Operasyonel Ekosistem",
        subtitle: "Pazaryerleri > Entegrasyon > ERP Döngüsü",
        theme: "blue",
        icon: ShoppingCart,
        details: "Amazon, Trendyol, Hepsiburada pazaryerleri ile Entegra, Nebim V3 ve Logo arasındaki veri akışını ve stok yönetimini kusursuzlaştırıyorum."
    },
    {
        id: "data",
        title: "Veri Analizi & Süreç",
        subtitle: "Kaosu Anlamlı Veriye Dönüştürme",
        theme: "green",
        icon: Database,
        details: "Python, SQL ve Excel kullanarak karmaşık verileri analiz ediyor, Looker Studio ile görselleştirip stratejik kararlara dönüştürüyorum."
    },
    {
        id: "skills",
        title: "Teknik Yetkinlikler",
        subtitle: "Kullandığım Araçlar & Teknolojiler",
        theme: "purple",
        icon: Layers
    }
];
