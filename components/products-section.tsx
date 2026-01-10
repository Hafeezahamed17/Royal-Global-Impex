import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

// Sample product data
const products = [
  {
    id: 1,
    name: "Agro & Food Products",
    description:
      "A wide range of fresh and processed agricultural food products sourced directly from trusted farms.",
    image: "/assests/agro.png?height=300&width=400",
  },
  {
    id: 2,
    name: "Spices & Seasonings",
    description:
      "Premium Indian spices and seasonings known for authentic flavor, rich aroma, and export-quality standards.",
    image: "/assests/spices.png?height=300&width=400",
  },
  {
    id: 3,
    name: "Rice & Cereals",
    description:
      "High-quality rice varieties and cereals sourced from India’s key growing regions for global markets.",
    image: "/assests/ricespices.png?height=300&width=400",
  },
  {
    id: 4,
    name: "Pulses",
    description:
      "Nutritious pulses and lentils carefully sourced, cleaned, and packaged to meet international standards.",
    image: "/assests/pulses.png?height=300&width=400",
  },
  {
    id: 5,
    name: "Coconut & Coconut Products",
    description:
      "Fresh coconuts and value-added coconut products including oil, powder, and desiccated coconut.",
    image: "/assests/coconut.png?height=300&width=400",
  },
  {
    id: 6,
    name: "Textiles & Readymade Garments",
    description:
      "Quality textiles and readymade garments manufactured with skilled craftsmanship and modern designs.",
    image: "/assests/textiles.png?height=300&width=400",
  },
  {
    id: 7,
    name: "Leather Products",
    description:
      "Durable leather goods such as footwear, bags, and accessories crafted for global export markets.",
    image: "/assests/leather.png?height=300&width=400",
  },
  {
    id: 8,
    name: "Incense Sticks & Pooja Items",
    description:
      "Traditional incense sticks and pooja essentials crafted for religious, spiritual, and daily worship use.",
    image: "/assests/sticks.png?height=300&width=400",
  },
  {
    id: 9,
    name: "Others (as per request)",
    description:
      "A diverse range of additional export products sourced and supplied based on customer requirements, meeting international quality and packaging standards.",
    image: "/assests/catothers.png?height=300&width=400",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="bg-muted py-16 md:py-24">
      <div className="container">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Products
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            We offer a wide range of high-quality products sourced from trusted
            manufacturers around the world. Browse our product categories below.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Header */}
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>

              {/* Content grows */}
              <CardContent className="flex-1">
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>

              {/* Footer pinned to bottom */}
              <CardFooter className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/products/${product.id}`}>
                    View Products
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Don&apos;t see what you&apos;re looking for? Contact us for custom
            sourcing solutions.
          </p>
          <Button asChild>
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
