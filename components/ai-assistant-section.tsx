import { AiChatbot } from "@/components/aichatbot";

export function AiAssistantSection() {
  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div style={{ display: "grid", gap: "2.5rem" }}>
          <div style={{ display: "grid", gap: "1.5rem", textAlign: "center" }}>
            <div>
              <h2 className="section-title text-gradient" style={{ marginBottom: "1rem" }}>
                Yapay Zeka Asistanı
              </h2>
              <p className="section-desc" style={{ margin: "0 auto", maxWidth: "760px" }}>
                Vergi, SGK ve teşvik soruları için anında destek alın. Veni AI, mevzuat ve kurum deneyimiyle bağlamsal yanıtlar sunar.
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center" }}>
              {["Vergi", "SGK", "Teşvik", "Yatırım", "Yapılandırma"].map((label) => (
                <span
                  key={label}
                  style={{
                    padding: "0.45rem 0.9rem",
                    borderRadius: "999px",
                    background: "rgba(202, 160, 79, 0.14)",
                    border: "1px solid rgba(202, 160, 79, 0.25)",
                    fontSize: "calc(0.85rem - 2px)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: "1rem", justifyItems: "center" }}>
            <div
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "0 24px 60px -32px rgba(12, 18, 32, 0.3)",
                display: "grid",
                gap: "1.5rem",
                justifyItems: "center",
              }}
            >
              <AiChatbot variant="embedded" />

              <p style={{ color: "var(--text-muted)", fontSize: "calc(0.85rem - 2px)", textAlign: "center" }}>
                Asistan, soruları netleştirmek için takip soruları sorabilir ve sizi uygun danışmanlık kanalına yönlendirir.{" "}
                <a
                  href="https://veniplatform.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--accent-primary)", textDecoration: "underline" }}
                >
                  Veni AI tarafından geliştirilmiştir.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
