"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          {/* Logo placeholder - replace with your actual logo */}
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/assests/logo.png" // Replace with your actual logo filename
              alt="Royal Global Impex Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold">Royal Global Impex</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/#about" className="text-sm font-medium hover:text-primary">
            About Us
          </Link>
          <Link href="/#mission-vision" className="text-sm font-medium hover:text-primary">
            Mission & Vision
          </Link>
          <Link href="/#products" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
          <Link href="/#certificates" className="text-sm font-medium hover:text-primary">
            Certificates
          </Link>
          <Link href="/#feedback" className="text-sm font-medium hover:text-primary">
            Feedback
          </Link>
          <Link href="/#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
          <Link href="/admin" className="text-sm font-medium hover:text-primary">
            Admin
          </Link>
        </nav>
        <Button variant="outline" size="icon" className="md:hidden bg-transparent" onClick={() => setIsMenuOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background md:hidden">
            <div className="flex h-16 items-center justify-end px-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="flex justify-center py-4">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                  <Image
                    src="/your-logo.png" // Replace with your actual logo filename
                    alt="Royal Global Impex Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Royal Global Impex</span>
              </Link>
            </div>
            <nav className="grid gap-2 px-4 py-4 text-center">
              <Link
                href="/#about"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/#mission-vision"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Mission & Vision
              </Link>
              <Link
                href="/#products"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/#certificates"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Certificates
              </Link>
              <Link
                href="/#feedback"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </Link>
              <Link
                href="/#contact"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin"
                className="py-2 text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
