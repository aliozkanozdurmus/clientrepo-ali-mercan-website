"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Menu, Search, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      style={{
        background: scrolled ? "rgba(247, 245, 239, 0.8)" : "rgba(247, 245, 239, 0.6)",
        borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
        backdropFilter: "blur(18px) saturate(140%)",
        WebkitBackdropFilter: "blur(18px) saturate(140%)",
      }}
    >
      <div
        className="container nav-content"
        style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: "1.5rem" }}
      >
        <Link href="/" className="nav-logo" style={{ display: "inline-flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={240}
            height={90}
            style={{ height: 54, width: "auto", objectFit: "contain", borderRadius: 0 }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links" style={{ justifyContent: "center", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="nav-link">
              {link.name}
            </Link>
          ))}
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              style={{
                background: "none",
                border: "1px solid var(--border-light)",
                borderRadius: "12px",
                padding: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
              aria-label="Arama"
            >
              <Search size={16} strokeWidth={1.7} />
            </button>
            {searchOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  minWidth: 260,
                  background: "rgba(255,255,255,0.96)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "14px",
                  boxShadow: "0 24px 80px -36px rgba(12,18,32,0.35)",
                  padding: "12px",
                  display: "grid",
                  gap: "0.6rem",
                  zIndex: 2000,
                }}
              >
                <label style={{ fontSize: "calc(0.85rem - 2px)", color: "var(--text-muted)" }}>Sitede ara</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.4rem" }}>
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Örn: vergi, sgk, hizmet"
                    style={{
                      padding: "0.65rem 0.75rem",
                      borderRadius: "10px",
                      border: "1px solid var(--border-light)",
                      outline: "none",
                      fontSize: "calc(0.95rem - 2px)",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: "0.55rem 0.7rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                    onClick={() => {
                      if (!query.trim()) return;
                      const target = document.querySelector(`[data-searchable*="${query.trim().toLowerCase()}"]`);
                      if (target) {
                        (target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    aria-label="Ara"
                  >
                    <Search size={16} strokeWidth={1.7} />
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link
            href="https://www.hattatmusavir.com/Account/Login"
            className="btn btn-primary"
            style={{ padding: "8px 20px", fontSize: "calc(0.9rem - 2px)" }}
            target="_blank"
            rel="noreferrer"
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ExternalLink size={16} strokeWidth={1.75} />
              E-Mükellef Platformu
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
          type="button"
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border-light)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              boxShadow: "0 20px 50px -20px rgba(12, 18, 32, 0.3)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: "calc(1.1rem - 2px)" }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://www.hattatmusavir.com/Account/Login"
              className="btn btn-primary"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textAlign: "center" }}
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <ExternalLink size={16} strokeWidth={1.75} />
                E-Mükellef Platformu
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
