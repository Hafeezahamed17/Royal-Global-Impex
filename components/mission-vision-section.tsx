import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye } from "lucide-react"

export function MissionVisionSection() {
  return (
    <section id="mission-vision" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">
          Our Mission & Vision
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col items-center text-center p-6">
  <CardHeader className="flex flex-col items-center text-center">
    <Target className="h-12 w-12 text-primary mb-4" />
    <CardTitle className="text-2xl">Our Mission</CardTitle>
  </CardHeader>

  <CardContent className="text-center">
    <p className="text-muted-foreground">
      At ROYAL GLOBAL IMPEX, our mission is to bridge the gap between Indian farmers
      and global markets by delivering high-quality agricultural products at
      competitive prices. We are committed to ensuring farm-to-door delivery with
      international packaging standards, providing fresh, safe, and sustainable
      produce while maintaining strong customer relationships and satisfaction.
      We promise to uphold your trust by delivering reliable service.
    </p>
  </CardContent>
</Card>

<Card className="flex flex-col items-center text-center p-6">
  <CardHeader className="flex flex-col items-center text-center">
    <Eye className="h-12 w-12 text-primary mb-4" />
    <CardTitle className="text-2xl">Our Vision</CardTitle>
  </CardHeader>

  <CardContent className="text-center">
    <p className="text-muted-foreground">
      Our vision is to become a globally recognized leader in agricultural exports,
      known for our commitment to quality, integrity, and customer-centric service.
      We aim to revolutionize the industry by setting new benchmarks in pricing,
      quality assurance, and logistics, making Indian agricultural products
      accessible worldwide while supporting farmers' growth and sustainability.

      We envision a world where businesses of all sizes can access global markets
      with ease, contributing to economic growth and prosperity across communities.
    </p>
  </CardContent>
</Card>

        </div>
      </div>
    </section>
  )
}
