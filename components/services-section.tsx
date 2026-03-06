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
    title: "Muhasebe Kayıtları ve Mali Tablolar",
    description:
      "Muhasebe kayıtlarını düzenli ve doğru tutuyor, mali tabloları şeffaf ve güvenilir biçimde hazırlıyoruz.",
    Icon: FileText,
  },
  {
    title: "Vergi Beyannameleri",
    description:
      "Vergi mevzuatına uygun beyannameleri zamanında teslim ediyor, vergi yükümlülüklerinizi minimize edecek stratejik danışmanlık sağlıyoruz.",
    Icon: Receipt,
  },
  {
    title: "SGK İşlemleri",
    description: "Prim, bordrolama ve tüm SGK süreçlerinde eksiksiz ve doğru yönetim için uzman danışmanlık sunuyoruz.",
    Icon: ShieldPlus,
  },
  {
    title: "Kurumsal Yeniden Yapılandırma",
    description: "Mali ve operasyonel yapınızı daha verimli hale getirmek için yeniden yapılandırma planları tasarlıyoruz.",
    Icon: Building2,
  },
];

const strategicLines: Service[] = [
  {
    title: "Vergi Danışmanlığı",
    description:
      "Vergi avantajlarından yararlanmanız için stratejik planlama, risk yönetimi, mevzuat takibi ve uyum denetimi.",
    Icon: Layers,
  },
  {
    title: "Mali Danışmanlık",
    description:
      "Bütçeleme, finansal analiz ve mali stratejiyle performansı artırıyor; büyüme ve kârlılık hedeflerinize yönelik raporlama sağlıyoruz.",
    Icon: PieChart,
  },
  {
    title: "Yatırım Teşvik Danışmanlığı",
    description:
      "Yatırım teşvikleri ve indirimli KV sürecinde projelerinizi finansal olarak cazip hale getiriyor, başvuru ve takipte yanınızdayız.",
    Icon: Sparkles,
  },
];

export function ServicesSection() {
  return (
    <section id="hizmetler" className="section" style={{ background: "var(--bg-secondary)" }}>
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
            Hizmetlerimiz ve Danışmanlıklarımız
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: "var(--text-secondary)", maxWidth: "720px", margin: "0 auto" }}
          >
            Muhasebe kayıtlarından vergi stratejilerine, SGK süreçlerinden yatırım teşviklerine kadar uçtan uca mali çözümler sunuyoruz.
            Her adımda mevzuata uyumlu, ölçülebilir ve hızlı hareket ediyoruz.
          </motion.p>
        </div>

        <div className="grid-2" style={{ gap: "1.5rem" }}>
          {coreServices.map((service, index) => {
            const IconComp = service.Icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card service-card"
                style={{ display: "grid", gap: "1rem" }}
              >
                <div className="service-card-content" style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "auto 1fr", alignItems: "start" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(12,18,32,0.06)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <IconComp size={26} strokeWidth={1.6} color="var(--accent-primary)" />
                  </div>
                  <div style={{ display: "grid", gap: "0.4rem" }}>
                    <h3 style={{ fontSize: "calc(1.2rem - 2px)" }}>{service.title}</h3>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{service.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div style={{ marginTop: "3rem" }}>
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="eyebrow">Stratejik Hatlar</span>
            <h3 className="section-title" style={{ fontSize: "calc(2rem - 2px)" }}>
              Derinleşen danışmanlık alanları
            </h3>
          </div>

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
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      right: "1.5rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(12,18,32,0.06)",
                      border: "1px solid var(--border-light)",
                      marginBottom: "1rem",
                    }}
                  >
                    <IconComp size={26} strokeWidth={1.6} color="var(--accent-primary)" />
                  </div>
                  <h3 style={{ fontSize: "calc(1.25rem - 2px)", marginBottom: "0.5rem" }}>{line.title}</h3>
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{line.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
