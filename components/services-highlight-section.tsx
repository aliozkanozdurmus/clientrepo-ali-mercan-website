"use client";

import { motion } from "framer-motion";
import { LineChart, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

type Highlight = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const highlights: Highlight[] = [
  {
    title: "Muhasebe ve Raporlama",
    description: "Mizanlar, yönetim raporları ve kararları hızlandıran net görünürlük.",
    Icon: LineChart,
  },
  {
    title: "Vergi ve Uyum Güvencesi",
    description: "Mevzuat takibi, beyanname disiplini ve risk kontrolü.",
    Icon: ShieldCheck,
  },
  {
    title: "Stratejik Büyüme Desteği",
    description: "Teşvik, yatırım ve finansal planlamada ölçeklenebilir yol haritası.",
    Icon: Sparkles,
  },
];

export function ServicesHighlightSection() {
  return (
    <section id="hizmetler-ozet" className="section" style={{ background: "var(--bg-tertiary)" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 10% 20%, rgba(202, 160, 79, 0.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(15, 23, 42, 0.14), transparent 40%)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(90deg, rgba(15, 23, 42, 0.04) 0, rgba(15, 23, 42, 0.04) 1px, transparent 1px, transparent 80px)",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid-2" style={{ alignItems: "stretch", gap: "3.5rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: "grid", alignContent: "center", gap: "1.6rem" }}
          >
            <div>
              <span className="eyebrow">Hizmetler</span>
              <h2 className="section-title" style={{ marginBottom: "0.85rem" }}>
                Hakkımızdan sonra hızlı bir hizmet özeti
              </h2>
              <p className="section-desc" style={{ margin: 0 }}>
                Kısa ve net: düzen, uyum ve büyüme hattını tek bakışta görmeniz için.
              </p>
            </div>

            <div style={{ display: "grid", gap: "0.75rem" }}>
                {[
                  { label: "Güvenilir Süreç", value: "Planlı, ölçülebilir, izlenebilir." },
                  { label: "Şeffaf Raporlama", value: "Okunabilir tablolar, hızlı aksiyon." },
                  { label: "Hızlı Geri Dönüş", value: "Net iletişim, pratik çözüm." },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "160px 1fr",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "0.85rem 1.1rem",
                    borderRadius: "18px",
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <span style={{ fontSize: "calc(0.85rem - 2px)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                    {item.label}
                  </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "calc(0.95rem - 2px)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div style={{ display: "grid", gap: "1.6rem" }}>
            {highlights.map((item, index) => {
              const IconComp = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.1rem",
                    alignItems: "start",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-40%",
                      right: "-10%",
                      width: "220px",
                      height: "220px",
                      background: "radial-gradient(circle at center, rgba(202, 160, 79, 0.18), transparent 65%)",
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(12, 18, 32, 0.06)",
                      border: "1px solid var(--border-light)",
                      boxShadow: "0 14px 30px -20px rgba(12, 18, 32, 0.4)",
                    }}
                  >
                    <IconComp size={26} strokeWidth={1.6} color="var(--accent-primary)" />
                  </div>
                  <div style={{ display: "grid", gap: "0.35rem" }}>
                    <h3 style={{ fontSize: "calc(1.2rem - 2px)" }}>{item.title}</h3>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
