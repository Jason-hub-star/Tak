import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WebsiteLinkageSection from "@/components/sections/WebsiteLinkageSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutSection from "@/components/sections/AboutSection";
import PricingTeaserSection from "@/components/sections/PricingTeaserSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { getAllPortfolios } from "@/lib/content/portfolio";

export default function Home() {
  const portfolios = getAllPortfolios();

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WebsiteLinkageSection />
        <PortfolioSection portfolios={portfolios} />
        <ProcessSection />
        <AboutSection />
        <PricingTeaserSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
