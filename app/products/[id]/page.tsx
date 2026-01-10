"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getProductById, getProductItems } from "@/lib/products"
import { ProductInquiryForm } from "@/components/product-inquiry-form"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false)

  const product = getProductById(Number.parseInt(params.id))
  const productItems = getProductItems(Number.parseInt(params.id))

  const handleInquire = (product: any) => {
    setSelectedProduct(product)
    setIsInquiryFormOpen(true)
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Button asChild>
            <Link href="/#products">Back to Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative h-64 w-full md:w-1/2 md:h-80">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <Button asChild>
                  <Link href="#contact-us">Contact for Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Products in this Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      {item.price && <span className="font-semibold">${item.price.toFixed(2)}</span>}
                      <Button variant="outline" size="sm" onClick={() => handleInquire(item)}>
                        Inquire
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-us" className="bg-muted py-12">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">Interested in our products?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our sales team for pricing information, bulk orders, or custom requirements.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />

      <ProductInquiryForm
        isOpen={isInquiryFormOpen}
        onClose={() => setIsInquiryFormOpen(false)}
        product={selectedProduct}
      />
    </div>
  )
}
