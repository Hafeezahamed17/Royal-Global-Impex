import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample certificates - replace with your actual certificates
const certificates = [
  {
    id: 1,
    name: "IEC",
    description: "Import Export Code issued by the Government of India, authorizing international trade operations.",
    image: "/assests/iec.png?height=200&width=300",
  },
  {
    id: 2,
    name: "MSME",
    description: "Registration under the Ministry of Micro, Small and Medium Enterprises, Government of India.",
    image: "/assests/msme.jpeg?height=200&width=300",
  },
  {
    id: 3,
    name: "APEDA",  
    description: "Registration with APEDA for export of agricultural and processed food products from India.",
    image: "/assests/apeda.png?height=200&width=300",
  },
  {
    id: 4,
    name: "Spice Board",
    description: "Certification and registration from the Spice Board of India for spice exports and quality compliance.",
    image: "/assests/spiceboard.jpeg?height=200&width=300",
  },
]


export function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Certificates</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            We maintain the highest standards of quality and compliance. Our certifications demonstrate our commitment
            to excellence in all aspects of our business.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="text-center">
              <div className="p-6">
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardHeader className="p-0">
                  <CardTitle className="text-xl">{certificate.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <p className="text-muted-foreground">{certificate.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
