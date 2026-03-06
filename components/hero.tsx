"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import InteractiveFx from "./interactive-fx";

export function Hero() {
  return (
    <section
      className="section hero-section"
      style={{ minHeight: "85vh", paddingTop: "100px", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}
    >
      <InteractiveFx />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: "clamp(calc(2.5rem - 2px), calc(8vw - 2px), calc(4rem - 2px))", marginBottom: "1.5rem" }} className="hero-title">
              <span className="text-shimmer">Profesyonel Danışmanlık,</span> <br />
              <span className="text-accent-gradient">Güvenli Gelecek.</span>
            </h1>
            <p
              style={{ fontSize: "calc(1.25rem - 2px)", color: "var(--text-secondary)", marginBottom: "2.5rem", marginInline: "auto", maxWidth: "600px" }}
            >
              Finansal strateji, vergi uyumu, SGK/bordro ve yeniden yapılandırma için ölçülebilir, berrak çözümler sunuyoruz.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <Link href="/hizmetler" className="btn btn-primary">
                Hizmetler
              </Link>
              <Link href="/iletisim" className="btn btn-secondary">
                İletişim
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
