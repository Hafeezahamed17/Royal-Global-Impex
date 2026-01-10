"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  "/assests/img1.jpeg",
  "/assests/img2.jpeg",
  "/assests/img3.jpeg",
  "/assests/img4.png",
  "/assests/img5.png",
  "/assests/img6.png",
]

export function RunningSection() {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total)
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % total)
  }

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(next, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container relative flex items-center justify-center">
        {/* Left Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          className="absolute left-2 md:left-0 z-10 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Image Frame */}
        <div className="relative w-[92vw] max-w-[900px] h-[220px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-in-out">
          <Image
            key={current}
            src={images[current]}
            alt="Product showcase"
            fill
            className="object-cover transition-opacity duration-700 ease-in-out"
            priority
          />
        </div>

        {/* Right Arrow */}
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="absolute right-2 md:right-0 z-10 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
