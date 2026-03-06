import InteractiveFx from "@/components/interactive-fx";
import { ResponsiveNavigation } from "@/components/responsive-navigation";
import { ContactSection } from "@/components/contact-section";
import { ResponsiveFooter } from "@/components/responsive-footer";


export default function ContactPage() {
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
        <section className="section reveal">
          <div className="section-header">
            <span className="eyebrow">İletişim</span>
            <h1 className="section-title">Takvim açalım.</h1>
            <p className="section-desc">
              Kısa bir not bırakın, 24 saat içinde dönüş yapıp ilk toplantı slotunu paylaşalım.
            </p>
          </div>
        </section>
        <ContactSection />
        <ResponsiveFooter />
      </main>
    </>
  );
}
