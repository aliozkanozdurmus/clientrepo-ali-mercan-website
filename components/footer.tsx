"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(145deg, rgba(15,23,42,0.06), rgba(196,154,79,0.04)), var(--bg-secondary)",
        borderTop: "1px solid var(--border-light)",
        marginTop: "auto",
      }}
    >
      <div className="container" style={{ display: "grid", gap: "3rem", padding: "3.5rem 0" }}>
        {/* Newsletter */}
        <div
          className="footer-newsletter"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "1.5rem",
            alignItems: "center",
            padding: "1.75rem 2rem",
            borderRadius: "var(--radius-lg)",
            background: "rgba(255,255,255,0.55)",
            border: "1px solid var(--border-light)",
            boxShadow: "0 24px 70px -36px rgba(12,18,32,0.28)",
          }}
        >
          <div style={{ display: "grid", gap: "0.4rem" }}>
            <div className="eyebrow" style={{ marginBottom: 0, color: "var(--text-muted)" }}>
              Bülten
            </div>
            <div style={{ fontSize: "calc(1.5rem - 2px)", fontWeight: 700, letterSpacing: "-0.02em" }}>Vergi & Finans Notları</div>
            <div style={{ color: "var(--text-secondary)" }}>Kısa özetler, mevzuat güncellemeleri ve piyasa kılavuzları.</div>
          </div>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <input
              placeholder="E-posta adresiniz"
              style={{
                height: 48,
                padding: "0 18px",
                borderRadius: "14px",
                border: "1px solid rgba(15,23,42,0.12)",
                background: "#fff",
                color: "var(--text-primary)",
                fontSize: "calc(0.98rem - 2px)",
                outline: "none",
                boxShadow: "0 18px 40px -28px rgba(12,18,32,0.35)",
              }}
            />
            <button
              className="btn btn-primary"
              style={{ padding: "12px 18px", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "none" }}
              type="submit"
            >
              Abone Ol <ArrowRight size={16} strokeWidth={1.7} />
            </button>
          </form>
        </div>

        {/* Main rows */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gap: "2.5rem",
            gridTemplateColumns: "1.25fr 1fr 1fr",
          }}
        >
          {/* Brand */}
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center" }}>
              <Image src="/logo.png" alt="Mega Mali Müşavirlik" width={200} height={70} style={{ height: 52, width: "auto" }} />
            </div>
            <div style={{ color: "var(--text-secondary)" }}>
              Bağımsız denetim, vergi, SGK ve yeniden yapılandırma süreçlerinde şeffaf, ölçülebilir rehberlik.
            </div>
          </div>

          {/* Resources */}
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div className="eyebrow" style={{ marginBottom: "0.25rem", color: "var(--text-muted)" }}>
              Kaynaklar
            </div>
            <Link className="nav-link" href="/hizmetler" style={{ fontWeight: 600 }}>
              Hizmetler
            </Link>
            <Link className="nav-link" href="/hakkimizda" style={{ fontWeight: 600 }}>
              Hakkımızda
            </Link>
            <Link className="nav-link" href="/#hizmetler" style={{ fontWeight: 600 }}>
              Çözümler
            </Link>
            <Link className="nav-link" href="/#hakkimizda" style={{ fontWeight: 600 }}>
              Referans yaklaşımı
            </Link>
          </div>

          {/* Contact */}
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <div className="eyebrow" style={{ marginBottom: "0.25rem", color: "var(--text-muted)" }}>
              İletişim
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--text-primary)", fontWeight: 700 }}>
              <Mail size={18} strokeWidth={1.6} />
              <a href="mailto:info@megamalimusavirlik.com.tr">info@megamalimusavirlik.com.tr</a>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--text-primary)", fontWeight: 700 }}>
              <Phone size={18} strokeWidth={1.6} />
              <a href="tel:+903422300044">+90 342 230 00 44</a>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "var(--text-secondary)" }}>
              <MapPin size={18} strokeWidth={1.6} style={{ marginTop: "2px" }} />
              <div>
                Değirmiçem Mah. Nişantaşı Sok. Elit İş Merkezi No.11/36 <br />
                Şehitkamil / Gaziantep
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid var(--border-light)",
            boxShadow: "0 22px 55px -34px rgba(12,18,32,0.4)",
            background: "#fff",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.549356475872!2d37.37211539999999!3d37.0682208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e12bc63323bb%3A0x452ab875f6c612f7!2zTUVHQSBNYWxpIE3DvMWfYXZpcmxpayB2ZSBEYW7EscWfbWFubMSxayAtIEFsaSBNRVJDQU4!5e0!3m2!1str!2str!4v1770245644055!5m2!1str!2str"
            width="100%"
            height="320"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mega Mali Müşavirlik Konum"
          />
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid var(--border-light)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "calc(0.9rem - 2px)",
          }}
        >
          © 2026 Mega Mali Müşavirlik. Tüm hakları saklıdır. İzinsiz kopyalanamaz veya dağıtılamaz.
        </div>

        {/* Made By */}
        <div style={{ textAlign: "center", fontSize: "calc(0.85rem - 2px)", color: "var(--text-muted)", opacity: 0.9, marginTop: "1.5rem" }}>
          <a
            href="https://veniplatform.com"
            target="_blank"
            rel="noreferrer"
            className="text-shimmer"
            style={{ color: "var(--text-secondary)" }}
          >
            Veni AI Yapay Zeka Teknolojileri tarafından geliştirilmiştir.
          </a>{" "}
          <span className="text-shimmer">— veniplatform.com</span>
        </div>
      </div>
    </footer>
  );
}
