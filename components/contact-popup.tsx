"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after 2 seconds when site is opened
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Get form data from the form elements
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    // Create submission object
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      source: "popup",
      type: "contact",
    }

    console.log("Saving contact popup data:", data) // Debug log

    try {
      // Get existing submissions from localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")

      // Add new submission
      const updatedSubmissions = [...existingSubmissions, data]

      // Save to localStorage
      localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions))

      console.log("Contact submissions saved:", updatedSubmissions) // Debug log

      // Show confirmation
      alert("Your message has been sent. We'll get back to you soon!")

      // Reset form and close popup
      form.reset()
      setIsOpen(false)
    } catch (error) {
      console.error("Error saving contact submission:", error)
      alert("There was an error submitting your message. Please try again.")
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
          <div className="space-y-2">
            <Label htmlFor="popup-name">Name</Label>
            <Input id="popup-name" name="name" placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-email">Email</Label>
            <Input id="popup-email" name="email" type="email" placeholder="Your email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-phone">Phone</Label>
            <Input id="popup-phone" name="phone" placeholder="Your phone number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="popup-message">Message</Label>
            <Textarea id="popup-message" name="message" placeholder="How can we help you?" required />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
