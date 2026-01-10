import { ContactPopup } from "@/components/contact-popup"
import { HeroSection } from "@/components/hero-section"
import { RunningSection } from "@/components/running-section"
import { AboutSection } from "@/components/about-section"
import { MissionVisionSection } from "@/components/mission-vision-section"
import { CatalogSection } from "@/components/catlog"
import { ProductsSection } from "@/components/products-section"
import { CertificatesSection } from "@/components/certificates-section"
import { FeedbackSection } from "@/components/feedback-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ContactPopup />
      <HeroSection />
      <RunningSection />
      <AboutSection />
      <MissionVisionSection />
      <CatalogSection />
      <ProductsSection />
      <CertificatesSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
