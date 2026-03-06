"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FileText, Receipt, ShieldPlus, Building2, Layers, PieChart, Sparkles, type LucideIcon } from "lucide-react";

type Service = {
    title: string;
    description: string;
    Icon: LucideIcon;
};

const coreServices: Service[] = [
    {
        title: "Entegre Muhasebe ve Finansal Raporlama",
        description:
            "Tüm mali işlemlerinizin Tek Düzen Hesap Planı ve uluslararası standartlara (UFRS/TFRS) uygun olarak kaydedilmesi, aylık ve yıllık mizanların hazırlanması, yönetim raporlarının (Bilanço, Gelir Tablosu, Nakit Akım) sunulması.",
        Icon: FileText,
    },
    {
        title: "Vergi Yönetimi ve Tasdik Hizmetleri",
        description:
            "Kurumlar Vergisi, KDV, Muhtasar ve Damga Vergisi beyannamelerinin eksiksiz hazırlanması. Vergi risklerinin analizi, tam tasdik süreçleri ve iade/mahsup işlemlerinin etkin yönetimi.",
        Icon: Receipt,
    },
    {
        title: "SGK ve Bordro Danışmanlığı",
        description: "İşe giriş/çıkış bildirgeleri, aylık prim ve hizmet belgelerinin düzenlenmesi, iş hukukuna uyum danışmanlığı, teşvik analizleri ve bordro süreçlerinin yasal mevzuata tam uyumla yürütülmesi.",
        Icon: ShieldPlus,
    },
    {
        title: "Kurumsal Reorganizasyon ve Yapılanma",
        description: "Şirket birleşmeleri, bölünmeleri, tür değişiklikleri ve tasfiye süreçlerinin yönetimi. Aile şirketlerinde kurumsallaşma ve sürdürülebilir yönetim yapılarının inşası.",
        Icon: Building2,
    },
];

const strategicLines: Service[] = [
    {
        title: "İleri Düzey Vergi Planlaması",
        description:
            "Vergi yükünüzü yasal sınırlar içinde optimize eden stratejik planlama. Transfer fiyatlandırması, örtülü sermaye analizleri ve uluslararası vergi anlaşmalarının işletmenize entegrasyonu.",
        Icon: Layers,
    },
    {
        title: "Finansal Analiz ve Bütçe Yönetimi",
        description:
            "Gelecek projeksiyonları, nakit akış tahminleri, bütçe-gerçekleşen analizleri ve maliyet muhasebesi sistemlerinin kurulumu ile veri odaklı karar alma mekanizmalarının güçlendirilmesi.",
        Icon: PieChart,
    },
    {
        title: "Yatırım Teşvik ve Devlet Destekleri",
        description:
            "Sanayi ve Teknoloji Bakanlığı, KOSGEB ve İhracat destekleri başta olmak üzere, işletmenize uygun devlet teşviklerinin belirlenmesi, proje dosyalarının hazırlanması ve süreç takibi.",
        Icon: Sparkles,
    },
];

export function ServicesDetailSection() {
    return (
        <section id="hizmetler-detay" className="section" style={{ background: "var(--bg-secondary)" }}>
            {/* Creative Background */}
            <div
                style={{ position: "absolute", top: 0, right: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}
            >
                <Image src="/services-visual.png" alt="Service Bg" fill style={{ objectFit: "cover", opacity: 0.08 }} />
                <div
                    style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--bg-secondary), transparent, var(--bg-secondary))" }}
                />
            </div>

            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gradient"
                        style={{ fontSize: "calc(2.5rem - 2px)", marginBottom: "1rem" }}
                    >
                        Kapsamlı Çözüm Ortağınız
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ color: "var(--text-secondary)", maxWidth: "800px", margin: "0 auto", fontSize: "calc(1.1rem - 2px)" }}
                    >
                        Mega Mali Müşavirlik olarak, işletmenizin yaşam döngüsünün her aşamasında derinlemesine teknik bilgi ve sektörel deneyimimizle yanınızdayız.
                        Mali yapınızı güçlendiren, riskleri minimize eden ve sürdürülebilir büyümeyi destekleyen bütünleşik bir hizmet anlayışı sunuyoruz.
                    </motion.p>
                </div>

                <div className="grid-2 services-detail-grid" style={{ gap: "2rem" }}>
                    {coreServices.map((service, index) => {
                        const IconComp = service.Icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="card"
                                style={{ display: "grid", gap: "1rem", gridTemplateColumns: "auto 1fr", alignItems: "start", padding: "2.5rem" }}
                            >
                                <div
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: "20px",
                                        display: "grid",
                                        placeItems: "center",
                                        background: "rgba(12,18,32,0.06)",
                                        border: "1px solid var(--border-light)",
                                    }}
                                >
                                    <IconComp size={32} strokeWidth={1.5} color="var(--accent-primary)" />
                                </div>
                                <div style={{ display: "grid", gap: "0.5rem" }}>
                                    <h3 style={{ fontSize: "calc(1.35rem - 2px)" }}>{service.title}</h3>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{service.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="services-strategic-grid" style={{ marginTop: "6rem", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "center" }}>
                    <div style={{ display: "grid", gap: "1.5rem" }}>
                        <div className="section-header services-strategic-header" style={{ textAlign: "left", margin: 0, maxWidth: "none" }}>
                            <span className="eyebrow">Stratejik Hatlar</span>
                            <h3 className="section-title" style={{ fontSize: "calc(2rem - 2px)" }}>
                                İleri Düzey Danışmanlık ve Planlama
                            </h3>
                            <p className="section-desc" style={{ maxWidth: "100%", margin: 0 }}>
                                Geleneksel mali müşavirlik hizmetlerinin ötesine geçerek, işletmenizin stratejik hedeflerine ulaşması için
                                özel kurgulanmış finansal yönetim ve planlama çözümleri üretiyoruz.
                            </p>
                        </div>
                    </div>

                    <motion.div
                        className="services-featured-box"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            position: "relative",
                            borderRadius: "24px",
                            overflow: "hidden",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <img
                            src="/services-featured.png"
                            alt="Stratejik Danışmanlık"
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                transform: "scale(1.02)",
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 40%)",
                                pointerEvents: "none",
                            }}
                        />
                    </motion.div>
                </div>

                <div style={{ marginTop: "3rem" }}>

                    <div className="grid-3">
                        {strategicLines.map((line, index) => {
                            const IconComp = line.Icon;
                            return (
                                <motion.div
                                    key={line.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className="card"
                                    style={{ position: "relative", overflow: "hidden", padding: "2.5rem" }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "1.5rem",
                                            right: "1.5rem",
                                            fontWeight: 700,
                                            color: "var(--text-muted)",
                                            letterSpacing: "0.08em",
                                            opacity: 0.4
                                        }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </div>
                                    <div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: "18px",
                                            display: "grid",
                                            placeItems: "center",
                                            background: "rgba(12,18,32,0.06)",
                                            border: "1px solid var(--border-light)",
                                            marginBottom: "1.25rem",
                                        }}
                                    >
                                        <IconComp size={28} strokeWidth={1.5} color="var(--accent-primary)" />
                                    </div>
                                    <h3 style={{ fontSize: "calc(1.35rem - 2px)", marginBottom: "0.75rem" }}>{line.title}</h3>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{line.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
