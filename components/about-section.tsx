"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="hakkimizda" className="section">
      <div className="container">
        <div className="grid-2 about-section-grid">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative" }}
            className="about-image-wrapper"
          >
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "0 20px 50px -30px rgba(12, 18, 32, 0.35)",
                border: "1px solid var(--border-light)",
                background: "#ffffff",
              }}
            >
              <Image
                src="/about-visual.png"
                alt="Ali Mercan ve Ekibi"
                width={600}
                height={400}
                style={{ width: "100%", display: "block" }}
              />
            </div>
            <div
              className="about-decorative-box"
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "-20px",
                width: "150px",
                height: "150px",
                border: "2px solid var(--accent-secondary)",
                zIndex: -1,
                borderRadius: "var(--radius-md)",
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title text-gradient" style={{ fontSize: "calc(2.5rem - 2px)", marginBottom: "1.5rem" }}>
              Hakkımızda
            </h2>

            <div style={{ color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p>
                Mega Mali Müşavirlik, finansal süreçlerinizde doğru ve güvenilir rehberlik sunarak sürdürülebilir büyümenize katkı sağlar.
                Uzman kadromuz, mevzuat ve teknolojiyi bütünleştirerek işletmenize özel, ölçülebilir sonuçlar üretir.
              </p>
            </div>

            <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <div className="eyebrow" style={{ marginBottom: 4 }}>Vizyon & Misyon</div>
                <p style={{ color: "var(--text-secondary)" }}>
                  Müşterilerimize özel, teknoloji destekli çözümlerle değer katmak ve uluslararası ölçekte güvenilen bir iş ortağı olmak.
                </p>
              </div>

              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Değerlerimiz</div>
                <div className="about-values-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "grid", gap: "0.4rem" }}>
                    <li><strong>Güvenilirlik:</strong> Şeffaf ve dürüst.</li>
                    <li><strong>Profesyonellik:</strong> Yüksek standart.</li>
                  </ul>
                  <ul style={{ color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "grid", gap: "0.4rem" }}>
                    <li><strong>Yenilikçilik:</strong> Güncel teknoloji.</li>
                    <li><strong>Odaklılık:</strong> Sonuç odaklı.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
