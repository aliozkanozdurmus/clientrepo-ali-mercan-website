import InteractiveFx from "@/components/interactive-fx";
import { ResponsiveNavigation } from "@/components/responsive-navigation";
import { ServicesDetailSection } from "@/components/services-detail-section";
import { ResponsiveFooter } from "@/components/responsive-footer";


export default function ServicesPage() {
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
            <span className="eyebrow">Hizmetler</span>
            <h1 className="section-title">Finansal mimariyi uçtan uca kuruyoruz.</h1>
            <p className="section-desc">
              Yönetim kurulu raporlama, vergi ve uyum, SGK/bordro, STK danışmanlığı, yeniden yapılandırma ve bağımsız denetim için tek partner.
            </p>
          </div>
        </section>
        <ServicesDetailSection />
        <ResponsiveFooter />
      </main>
    </>
  );
}
