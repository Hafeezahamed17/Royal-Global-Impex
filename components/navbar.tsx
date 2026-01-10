"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 🔒 Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      {/* HEADER */}
      <header
        className={clsx(
          "sticky top-0 z-50 w-full border-b",
          isMenuOpen
            ? "bg-white"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <Image
                src="/assests/logo.png"
                alt="Royal Global Impex Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-black">
              Royal Global Impex
            </span>
          </Link>

          {/* Desktop Nav */}
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
            {/* ❌ Admin link REMOVED */}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-white text-black md:hidden flex flex-col">
          {/* Top Bar */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <span className="text-lg font-bold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 text-lg font-medium">
            <Link href="/#about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/#mission-vision" onClick={() => setIsMenuOpen(false)}>
              Mission & Vision
            </Link>
            <Link href="/#products" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
            <Link href="/#certificates" onClick={() => setIsMenuOpen(false)}>
              Certificates
            </Link>
            <Link href="/#feedback" onClick={() => setIsMenuOpen(false)}>
              Feedback
            </Link>
            <Link href="/#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            {/* ❌ Admin link REMOVED */}
          </nav>
        </div>
      )}
    </>
  )
}
