"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const startedAt = useMemo(() => Date.now(), []);

  const updateField = (field: keyof typeof formState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          startedAt,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Mesaj gönderilemedi.");
      }

      setStatusMessage("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
      setFormState({ name: "", email: "", message: "", website: "" });
    } catch (error: any) {
      setErrorMessage(error?.message || "Mesaj gönderilemedi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="section" style={{ background: "var(--bg-tertiary)" }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: "start" }}>
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gradient" style={{ fontSize: "calc(2.5rem - 2px)", marginBottom: "1rem" }}>
              İletişim
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>
              Sorularınız veya randevu talepleriniz için bize ulaşın. En kısa sürede dönüş yapalım.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: "rgba(15,23,42,0.06)",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <Phone size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ color: "var(--text-primary)", marginBottom: "0.35rem" }}>Telefon</h3>
                  <div style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <div>+90 342 230 00 44</div>
                    <div>+90 544 230 00 44</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: "rgba(15,23,42,0.06)",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <Mail size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ color: "var(--text-primary)", marginBottom: "0.35rem" }}>E-posta</h3>
                  <a
                    href="mailto:info@megamalimusavirlik.com.tr"
                    style={{ color: "var(--accent-primary)", fontWeight: 600, display: "inline-block" }}
                  >
                    info@megamalimusavirlik.com.tr
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    background: "rgba(15,23,42,0.06)",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <MapPin size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h3 style={{ color: "var(--text-primary)", marginBottom: "0.35rem" }}>Adres</h3>
                  <address style={{ color: "var(--text-secondary)", fontStyle: "normal", lineHeight: "1.6" }}>
                    Değirmiçem Mahallesi, Nişantaşı Sokak,
                    <br />
                    Elit İş Merkezi No.11/36,
                    <br />
                    Şehitkamil/Gaziantep
                  </address>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ background: "#ffffff", borderColor: "var(--border-light)" }}
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Ad Soyad <span style={{ color: "#b91c1c" }}>*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input-field"
                placeholder="Adınız Soyadınız"
                value={formState.name}
                onChange={updateField("name")}
                maxLength={80}
                required
              />
              <div style={{ fontSize: "calc(0.8rem - 2px)", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                {formState.name.length}/80
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                E-posta <span style={{ color: "#b91c1c" }}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field"
                placeholder="ornek@firma.com"
                value={formState.email}
                onChange={updateField("email")}
                maxLength={120}
                required
              />
              <div style={{ fontSize: "calc(0.8rem - 2px)", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                {formState.email.length}/120
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="message" className="input-label">
                Mesaj <span style={{ color: "#b91c1c" }}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="input-field"
                placeholder="Size nasıl yardımcı olabiliriz?"
                value={formState.message}
                onChange={updateField("message")}
                maxLength={1000}
                required
              />
              <div style={{ fontSize: "calc(0.8rem - 2px)", color: "var(--text-muted)", marginTop: "0.35rem" }}>
                {formState.message.length}/1000
              </div>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              <input
                type="text"
                name="website"
                value={formState.website}
                onChange={updateField("website")}
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {errorMessage && <div style={{ color: "#b91c1c", fontSize: "calc(0.9rem - 2px)" }}>{errorMessage}</div>}
              {statusMessage && <div style={{ color: "#15803d", fontSize: "calc(0.9rem - 2px)" }}>{statusMessage}</div>}

              <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
