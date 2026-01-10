import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Image from "next/image"


export function HeroSection() {
  return (
    <section className="relative">
      <Navbar />
      <div className="container flex flex-col items-center justify-center space-y-4 py-32 text-center md:py-36 lg:py-40">
        {/* Larger logo in hero section */}
        <div className="relative h-24 w-24 mb-6">
        <Image
  src="/assests/logo.png"
  alt="Royal Global Impex Logo"
  fill
  className="object-contain"
  priority
/>

        </div>

        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Royal Global Impex</h1>
        <p className="text-xl text-muted-foreground md:text-2xl">Global Trade, Royal Standard</p>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Your trusted partner for international import and export solutions. We connect businesses worldwide with
          premium products and services.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild size="lg">
            <a href="#products">Our Products</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
