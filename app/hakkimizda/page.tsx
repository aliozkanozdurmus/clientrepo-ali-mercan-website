import InteractiveFx from "@/components/interactive-fx";
import { ResponsiveNavigation } from "@/components/responsive-navigation";
import { ContactSection } from "@/components/contact-section";
import { ShieldCheck, Lightbulb, Users2, TrendingUp } from "lucide-react";
import { ResponsiveFooter } from "@/components/responsive-footer";
import { AliMercanSection } from "@/components/alimercan";

const values = [
  {
    title: "Güvenilirlik",
    desc: "Şeffaf ve dürüst hizmet anlayışıyla uzun süreli iş ortaklıkları kuruyoruz.",
    Icon: ShieldCheck,
  },
  {
    title: "Profesyonellik",
    desc: "Uzman kadromuzla mevzuatı, teknolojiyi ve en iyi uygulamaları sürekli takip ediyoruz.",
    Icon: TrendingUp,
  },
  {
    title: "Yenilikçilik",
    desc: "Mali dünyadaki yenilikleri ve teknolojik gelişmeleri müşterilerimizin lehine kullanıyoruz.",
    Icon: Lightbulb,
  },
  {
    title: "Müşteri Odaklılık",
    desc: "Her işletmenin ihtiyacına özel, ölçülebilir ve uygulanabilir çözümler tasarlıyoruz.",
    Icon: Users2,
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <div className="halo" />
        <div className="halo" />
        <div className="halo" />
      </div>
      <div className="noise" aria-hidden="true" />
      <InteractiveFx />

      <main className="page">
        <ResponsiveNavigation />

        <section className="section reveal" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div
              className="about-hero-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.2fr",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <div className="section-header" style={{ textAlign: "left", margin: 0, maxWidth: "none" }}>
                <span className="eyebrow" style={{ color: "var(--accent-secondary)" }}>
                  KURUMSAL
                </span>
                <h1 className="section-title" style={{ fontSize: "clamp(calc(2rem - 2px), calc(6vw - 2px), calc(3.5rem - 2px))" }}>
                  Hakkımızda
                </h1>
                <p className="section-desc" style={{ margin: "0 0 2rem 0", maxWidth: "none", fontSize: "clamp(calc(0.95rem - 2px), calc(2.6vw - 2px), calc(1.1rem - 2px))" }}>
                  Mega Mali Müşavirlik, mali danışmanlık ve müşavirlik hizmetlerinde güvenin adresidir.
                  <br />
                  <br />
                  Amacımız, müşterilerimizin finansal potansiyelini en üst düzeye çıkarmak ve karmaşık mali süreçleri
                  şeffaf, yönetilebilir ve karlı hale getirmektir. Modern teknolojiyi ve köklü deneyimimizi
                  birleştirerek, işletmenize özel stratejik çözümler sunuyoruz.
                </p>
              </div>

              <div className="about-hero-media" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "-20px",
                    background: "radial-gradient(circle at center, var(--accent-secondary) 0%, transparent 70%)",
                    opacity: 0.15,
                    filter: "blur(40px)",
                    zIndex: -1,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img
                    src="/about-hero.png"
                    alt="Ali Mercan Ofis"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      transform: "scale(1.02)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 40%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <AliMercanSection />

        <section className="section reveal">
          <div className="container">
            <div className="grid-2" style={{ gap: "2rem" }}>
              <div className="card">
                <span className="eyebrow">Vizyonumuz</span>
                <h3 style={{ fontSize: "calc(1.5rem - 2px)", marginBottom: "1rem" }}>Güvenilen ve tanınan marka</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Finansal danışmanlık ve mali müşavirlik alanında yenilikçi çözümlerle müşterilerimize değer katmayı hedefliyoruz.
                  Uluslararası alanda tanınan ve güvenilen bir marka olmak en büyük vizyonumuzdur.
                </p>
              </div>

              <div className="card">
                <span className="eyebrow">Misyonumuz</span>
                <h3 style={{ fontSize: "calc(1.5rem - 2px)", marginBottom: "1rem" }}>Özelleştirilmiş çözümler</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Müşterilerimizin mali ihtiyaçlarına yönelik özel çözümler sunarak, finansal hedeflerine ulaşmalarını sağlamak
                  misyonumuzdur. Güncel mevzuat ve teknolojik gelişmeleri yakından takip ederek en etkin ve verimli hizmetleri sunuyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section reveal" style={{ background: "var(--bg-secondary)" }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: "3rem" }}>
              <span className="eyebrow">Değerlerimiz</span>
              <h2 className="section-title">Bizi tanımlayan ilkeler</h2>
            </div>

            <div className="grid-2" style={{ gap: "1.5rem" }}>
              {values.map((item) => (
                <div
                  key={item.title}
                  className="card about-value-card"
                  style={{
                    display: "grid",
                    gap: "0.75rem",
                    gridTemplateColumns: "auto 1fr",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(12,18,32,0.06)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <item.Icon size={24} strokeWidth={1.6} color="var(--accent-primary)" />
                  </div>
                  <div style={{ display: "grid", gap: "0.35rem" }}>
                    <h3 style={{ fontSize: "calc(1.1rem - 2px)" }}>{item.title}</h3>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section reveal">
          <div className="container" style={{ display: "grid", gap: "2rem" }}>
            <div className="card" style={{ display: "grid", gap: "1rem" }}>
              <span className="eyebrow">Ekibimiz</span>
              <h2 className="section-title" style={{ fontSize: "calc(2rem - 2px)" }}>
                Uzman ve deneyimli danışmanlar
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Mega Mali Müşavirlik olarak, alanında uzman ve deneyimli bir ekibe sahibiz. Ekibimiz, müşterilerimize en doğru ve
                güvenilir hizmeti sunmak için sürekli olarak kendini geliştirmekte ve güncel mevzuatı yakından takip etmektedir. Her biri
                kendi alanında uzman danışmanlarımız, işletmenizin mali süreçlerinde size rehberlik etmek için burada.
              </p>
            </div>

            <div className="card" style={{ display: "grid", gap: "1rem" }}>
              <span className="eyebrow">İletişim</span>
              <h2 className="section-title" style={{ fontSize: "calc(2rem - 2px)" }}>
                Birlikte büyümek için hazırız
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Bizimle iletişime geçmek ve hizmetlerimiz hakkında daha detaylı bilgi almak için iletişim formunu kullanabilir veya doğrudan
                bize ulaşabilirsiniz. İşletmenizin mali süreçlerini yönetmek ve sizinle birlikte büyümek için sabırsızlanıyoruz.
              </p>
            </div>
          </div>
        </section>

        <ContactSection />
        <ResponsiveFooter />
      </main>
    </>
  );
}
