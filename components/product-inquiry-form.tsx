"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ProductInquiryFormProps = {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    description: string
    price?: number
    image?: string
  } | null
}

export function ProductInquiryForm({ isOpen, onClose, product }: ProductInquiryFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    country: "",
    quantity: "",
    shippingMethod: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create submission object
    const submission = {
      ...formData,
      productId: product?.id,
      productName: product?.name,
      productDescription: product?.description,
      productPrice: product?.price,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      type: "inquiry",
    }

    console.log("Saving inquiry data:", submission) // Debug log

    try {
      // Get existing submissions from localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem("inquirySubmissions") || "[]")

      // Add new submission
      const updatedSubmissions = [...existingSubmissions, submission]

      // Save to localStorage
      localStorage.setItem("inquirySubmissions", JSON.stringify(updatedSubmissions))

      console.log("Inquiry submissions saved:", updatedSubmissions) // Debug log

      // Show confirmation
      alert("Your inquiry has been submitted. We'll get back to you soon!")

      // Reset form and close dialog
      setFormData({
        customerName: "",
        email: "",
        country: "",
        quantity: "",
        shippingMethod: "",
        message: "",
      })
      onClose()
    } catch (error) {
      console.error("Error saving inquiry submission:", error)
      alert("There was an error submitting your inquiry. Please try again.")
    }
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Inquiry</DialogTitle>
          <DialogDescription>Please fill out the form below to inquire about this product.</DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-md mb-4">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          {product.price && <p className="font-medium mt-2">${product.price.toFixed(2)}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Your country"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Required quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingMethod">Preferred Shipping Method</Label>
            <Select
              value={formData.shippingMethod}
              onValueChange={(value) => handleSelectChange("shippingMethod", value)}
            >
              <SelectTrigger id="shippingMethod">
                <SelectValue placeholder="Select shipping method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="air">Air Freight</SelectItem>
                <SelectItem value="ship">Ship Freight</SelectItem>
                <SelectItem value="courier">Courier</SelectItem>
                <SelectItem value="postal">Postal Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any specific requirements or questions"
              rows={3}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Inquiry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
