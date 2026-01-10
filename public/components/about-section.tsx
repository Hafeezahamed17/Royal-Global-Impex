import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="bg-muted py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Us
            </h2>

            {/* 🔹 About content (changed color) */}
            <p className="mt-4 text-foreground">
              Royal Global Impex is a budding merchant exporter and sourcing partner
              from India, delivering high-quality products to global markets at
              competitive value.
            </p>

            <p className="mt-4 text-foreground">
              We act as professional sourcing agents, connecting international
              buyers directly with India’s key production regions. By following
              India’s One District One Product (ODOP) strength model, we source
              products from their natural hubs to ensure the best quality and
              pricing.
            </p>

            <p className="mt-4 text-foreground font-bold">
  Why Choose ROYAL GLOBAL IMPEX?
</p>



            {/* 🔹 Why Choose content (changed color) */}
            <p className="mt-4 text-foreground">
              We focus on direct farm and production-unit sourcing, quality
              inspection, competitive price negotiation, export-standard
              packaging, and end-to-end coordination from procurement to shipment.
            </p>

            <p className="mt-4 text-foreground">
              Driven by transparency, reliability, and long-term partnerships,
              Royal Global Impex makes sourcing from India simple, efficient, and
              profitable for buyers worldwide.
            </p>
          </div>

          <div className="flex-1">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[400px]">
              <Image
                src="/assests/about.jpeg?height=400&width=600"
                alt="About Royal Global Impex"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Global Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With an eye on global trade, we serve customers across various
                countries, adapting to diverse market demands and offering a
                seamless export experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We maintain strict quality control measures to ensure all products
                meet international standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our client-centric approach ensures we deliver solutions tailored
                to your specific needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
