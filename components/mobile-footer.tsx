"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function MobileFooter() {
    return (
        <footer
            style={{
                background: "var(--bg-secondary)",
                borderTop: "1px solid var(--border-light)",
                padding: "2rem 0 1.5rem",
            }}
        >
            <div className="container" style={{ padding: "0 1.25rem" }}>
                {/* Logo & Description */}
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <Link href="/" style={{ display: "inline-block", marginBottom: "1rem" }}>
                        <Image
                            src="/logo.png"
                            alt="Mega Mali Müşavirlik"
                            width={180}
                            height={70}
                            style={{ height: 48, width: "auto" }}
                        />
                    </Link>
                    <p style={{ color: "var(--text-secondary)", fontSize: "calc(0.9rem - 2px)", lineHeight: 1.6, maxWidth: "300px", margin: "0 auto" }}>
                        Mali danışmanlık ve müşavirlik hizmetlerinde güvenin adresi.
                    </p>
                </div>

                {/* Quick Links */}
                <div style={{ marginBottom: "2rem" }}>
                    <div style={{ fontSize: "calc(0.75rem - 2px)", fontWeight: 700, letterSpacing: "0.03em", color: "var(--text-muted)", marginBottom: "0.75rem", textAlign: "center" }}>
                        Hızlı Bağlantılar
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <Link href="/hakkimizda" style={{ padding: "0.65rem", textAlign: "center", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none", fontSize: "calc(0.9rem - 2px)", fontWeight: 600 }}>
                            Hakkımızda
                        </Link>
                        <Link href="/hizmetler" style={{ padding: "0.65rem", textAlign: "center", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none", fontSize: "calc(0.9rem - 2px)", fontWeight: 600 }}>
                            Hizmetler
                        </Link>
                        <Link href="/iletisim" style={{ padding: "0.65rem", textAlign: "center", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none", fontSize: "calc(0.9rem - 2px)", fontWeight: 600 }}>
                            İletişim
                        </Link>
                        <Link href="https://www.hattatmusavir.com/Account/Login" target="_blank" rel="noreferrer" style={{ padding: "0.65rem", textAlign: "center", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none", fontSize: "calc(0.9rem - 2px)", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                            E-Mükellef <ExternalLink size={14} />
                        </Link>
                    </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: "2rem" }}>
                    <div style={{ fontSize: "calc(0.75rem - 2px)", fontWeight: 700, letterSpacing: "0.03em", color: "var(--text-muted)", marginBottom: "0.75rem", textAlign: "center" }}>
                        İletişim Bilgileri
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <a href="tel:+905442300044" style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.75rem", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "10px", background: "rgba(196,154,79,0.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                                <Phone size={16} strokeWidth={1.7} color="var(--accent-primary)" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "calc(0.75rem - 2px)", color: "var(--text-muted)" }}>Telefon</div>
                                <div style={{ fontSize: "calc(0.9rem - 2px)", fontWeight: 600 }}>+90 544 2300044</div>
                            </div>
                        </a>

                        <a href="mailto:info@megamalimusavirlik.com.tr" style={{ display: "flex", alignItems: "center", gap: "0.65rem", padding: "0.75rem", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)", color: "var(--text-primary)", textDecoration: "none" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "10px", background: "rgba(196,154,79,0.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                                <Mail size={16} strokeWidth={1.7} color="var(--accent-primary)" />
                            </div>
                            <div style={{ flex: 1, overflow: "hidden" }}>
                                <div style={{ fontSize: "calc(0.75rem - 2px)", color: "var(--text-muted)" }}>E-posta</div>
                                <div style={{ fontSize: "calc(0.85rem - 2px)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>info@megamalimusavirlik.com.tr</div>
                            </div>
                        </a>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", padding: "0.75rem", borderRadius: "10px", background: "rgba(255,255,255,0.5)", border: "1px solid var(--border-light)" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "10px", background: "rgba(196,154,79,0.1)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                                <MapPin size={16} strokeWidth={1.7} color="var(--accent-primary)" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: "calc(0.75rem - 2px)", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Adres</div>
                        <div style={{ fontSize: "calc(0.85rem - 2px)", fontWeight: 500, lineHeight: 1.5, color: "var(--text-primary)" }}>
                            Değirmiçem Mah., Nişantaşı Sok., Elit İş Merkezi No.11/36, Şehitkamil/Gaziantep
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid var(--border-light)",
                        boxShadow: "0 16px 36px -28px rgba(12,18,32,0.35)",
                        background: "#fff",
                        marginTop: "0.75rem",
                    }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.549356475872!2d37.37211539999999!3d37.0682208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e12bc63323bb%3A0x452ab875f6c612f7!2zTUVHQSBNYWxpIE3DvMWfYXZpcmxpayB2ZSBEYW7EscWfbWFubMSxayAtIEFsaSBNRVJDQU4!5e0!3m2!1str!2str!4v1770245644055!5m2!1str!2str"
                        width="100%"
                        height="200"
                        style={{ border: 0, display: "block" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mega Mali Müşavirlik Konum"
                    />
                </div>
            </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "1.25rem", textAlign: "center" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "calc(0.8rem - 2px)" }}>
                © 2026 Mega Mali Müşavirlik. Tüm hakları saklıdır. İzinsiz kopyalanamaz veya dağıtılamaz.
            </div>
                    <div style={{ marginTop: "0.75rem", fontSize: "calc(0.7rem - 2px)", color: "var(--text-muted)" }}>
                        <a
                            href="https://veniplatform.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-shimmer"
                            style={{ color: "var(--accent-primary)", textDecoration: "none" }}
                        >
                            Veni AI Yapay Zeka Teknolojileri tarafından geliştirilmiştir.
                        </a>{" "}
                        <span className="text-shimmer">— veniplatform.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
