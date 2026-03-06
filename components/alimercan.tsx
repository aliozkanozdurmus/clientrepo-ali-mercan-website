import Image from "next/image";
import { BadgeCheck, Briefcase, GraduationCap, MapPin } from "lucide-react";

const profileItems = [
  {
    label: "Unvan",
    value: "Financial Advisor - Mali Müşavir",
    Icon: BadgeCheck,
  },
  {
    label: "Kuruluş",
    value: "Mega Mali Müşavirlik ve Danışmanlık",
    Icon: Briefcase,
  },
  {
    label: "Konum",
    value: "Gaziantep, Türkiye",
    Icon: MapPin,
  },
  {
    label: "Eğitim",
    value: "Gaziantep Üniversitesi, Ekonomi Hukuku Yüksek Lisans (2018 - 2019)",
    Icon: GraduationCap,
  },
];

export function AliMercanSection() {
  return (
    <section className="section reveal" style={{ paddingTop: 0 }}>
      <div className="container">
        <div
          className="ali-mercan-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div
            className="ali-mercan-photo"
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border-light)",
              boxShadow: "0 30px 70px -36px rgba(12, 18, 32, 0.35)",
              background: "#fff",
            }}
          >
            <Image
              src="/mercan.jpg"
              alt="Ali Mercan"
              width={720}
              height={860}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div className="ali-mercan-content" style={{ display: "grid", gap: "1.5rem" }}>
            <div>
              <span className="eyebrow" style={{ color: "var(--accent-secondary)" }}>
                Ali Mercan Hakkında
              </span>
              <h2 className="section-title ali-mercan-title" style={{ fontSize: "calc(2.4rem - 2px)", marginBottom: "0.75rem" }}>
                Ali Mercan
              </h2>
              <p className="ali-mercan-desc" style={{ color: "var(--text-secondary)", fontSize: "calc(1.05rem - 2px)", lineHeight: 1.7 }}>
                Finansal danışmanlık ve mali müşavirlik alanında 2014 yılından bu yana, kurumsal yapıları güçlendiren
                şeffaf ve ölçülebilir çözümler üretmektedir.
              </p>
            </div>

            <div className="ali-mercan-meta" style={{ display: "grid", gap: "0.75rem" }}>
              {profileItems.map((item) => (
                <div
                  key={item.label}
                  className="card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "0.9rem",
                    alignItems: "center",
                    padding: "1.2rem 1.4rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "14px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(12,18,32,0.06)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <item.Icon size={20} strokeWidth={1.6} color="var(--accent-primary)" />
                  </div>
                  <div style={{ display: "grid", gap: "0.2rem" }}>
                    <div style={{ fontSize: "calc(0.85rem - 2px)", color: "var(--text-muted)" }}>{item.label}</div>
                    <div style={{ fontSize: "calc(1rem - 2px)", fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="card ali-mercan-highlights"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                padding: "1.4rem",
                background: "rgba(255, 255, 255, 0.75)",
              }}
            >
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <div style={{ fontSize: "calc(0.8rem - 2px)", color: "var(--text-muted)" }}>Deneyim</div>
                <div style={{ fontSize: "calc(1.2rem - 2px)", fontWeight: 700 }}>2014 - Günümüz</div>
              </div>
              <div style={{ display: "grid", gap: "0.25rem" }}>
                <div style={{ fontSize: "calc(0.8rem - 2px)", color: "var(--text-muted)" }}>Uzmanlık</div>
                <div style={{ fontSize: "calc(1.2rem - 2px)", fontWeight: 700 }}>Mali Müşavir</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
