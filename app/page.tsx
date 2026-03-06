import { ResponsiveNavigation } from "@/components/responsive-navigation";
import { Hero } from "@/components/hero";
import { AiAssistantSection } from "@/components/ai-assistant-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { ServicesHighlightSection } from "@/components/services-highlight-section";
import { NewsSection } from "@/components/news-section";
import { ContactSection } from "@/components/contact-section";
import { SidePanel } from "@/components/side-panel";
import { ResponsiveFooter } from "@/components/responsive-footer";

export default function HomePage() {
  return (
    <div className="side-panel-active">
      <SidePanel />
      <main style={{ position: "relative", zIndex: 1 }} className="main-content-shift">
        <ResponsiveNavigation />
        <Hero />
        <AiAssistantSection />
        <AboutSection />
        <ServicesHighlightSection />
        <ServicesSection />
        <NewsSection />
        <ContactSection />
        <ResponsiveFooter />
      </main>
    </div>
  );
}
