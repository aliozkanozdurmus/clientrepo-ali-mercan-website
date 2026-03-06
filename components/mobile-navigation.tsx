"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, PanelRightClose, PanelRightOpen } from "lucide-react";

const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "İletişim", href: "/iletisim" },
];

export function MobileNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [portalOpen, setPortalOpen] = useState(false);

    const togglePortal = () => {
        const next = !portalOpen;
        setPortalOpen(next);
        document.documentElement.classList.toggle("portal-open", next);
    };

    const closePortal = () => {
        setPortalOpen(false);
        document.documentElement.classList.remove("portal-open");
    };

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                background: "rgba(247, 245, 239, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--border-light)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem 1.25rem",
                    maxWidth: "100%",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={160}
                        height={60}
                        style={{ height: 40, width: "auto", objectFit: "contain" }}
                        priority
                    />
                </Link>

                {/* Mobile Menu Button */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <button
                        onClick={togglePortal}
                        style={{
                            background: "none",
                            border: "1px solid var(--border-light)",
                            borderRadius: "12px",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--text-primary)",
                        }}
                        aria-label="Bilgi Portalı"
                        type="button"
                    >
                        {portalOpen ? <PanelRightClose size={22} strokeWidth={1.75} /> : <PanelRightOpen size={22} strokeWidth={1.75} />}
                    </button>
                    <button
                        onClick={() => {
                            if (portalOpen) closePortal();
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        style={{
                            background: "none",
                            border: "1px solid var(--border-light)",
                            borderRadius: "12px",
                            padding: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--text-primary)",
                        }}
                        aria-label="Toggle Menu"
                        type="button"
                    >
                        {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "rgba(247, 245, 239, 0.98)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        borderBottom: "1px solid var(--border-light)",
                        padding: "1.5rem 1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        boxShadow: "0 10px 40px -10px rgba(12, 18, 32, 0.15)",
                    }}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "12px",
                                background: "rgba(255, 255, 255, 0.5)",
                                border: "1px solid var(--border-light)",
                                color: "var(--text-primary)",
                                textDecoration: "none",
                                fontSize: "calc(1rem - 2px)",
                                fontWeight: 600,
                                textAlign: "center",
                                transition: "all 0.2s ease",
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://www.hattatmusavir.com/Account/Login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="btn btn-primary"
                        style={{
                            textAlign: "center",
                            width: "100%",
                            justifyContent: "center",
                        }}
                        target="_blank"
                        rel="noreferrer"
                    >
                        E-Mükellef Platformu
                    </Link>
                </div>
            )}
        </header>
    );
}
