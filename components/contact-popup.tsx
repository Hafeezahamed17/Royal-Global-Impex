"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase"

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    // Show popup after 2 seconds when site is opened
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Get form data from the form elements
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Create submission object
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      source: "popup",
    }

    console.log("[v0] Saving contact popup data:", data)

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase.from("contact_submissions").insert([data])

      if (supabaseError) {
        throw supabaseError
      }

      console.log("[v0] Contact popup saved to Supabase")

      // Show confirmation
      alert("Your message has been sent. We'll get back to you soon!")

      // Reset form and close popup
      form.reset()
      setIsOpen(false)
    } catch (err: any) {
      console.error("[v0] Error saving contact submission:", err)
      setError(err.message || "There was an error submitting your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
          <SheetDescription>
            Get in touch with Royal Global Impex. Fill out this form and we&apos;ll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="popup-name">Name</Label>
            <Input id="popup-name" name="name" placeholder="Your name" required disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-email">Email</Label>
            <Input
              id="popup-email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-phone">Phone</Label>
            <Input id="popup-phone" name="phone" placeholder="Your phone number" disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-message">Message</Label>
            <Textarea
              id="popup-message"
              name="message"
              placeholder="How can we help you?"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
