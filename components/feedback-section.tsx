"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rating: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Create submission object
    const submission = {
      ...formData,
    }

    console.log("[v0] Submitting feedback data:", submission)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'feedback',
          ...submission,
        }),
      })

      if (response.ok) {
        console.log("[v0] Feedback submission successful")

        // Show confirmation
        alert("Thank you for your feedback!")

        // Reset form
        setFormData({
          name: "",
          email: "",
          rating: "",
          message: "",
        })
        setError("")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }
    } catch (error: any) {
      console.error("[v0] Error submitting feedback form:", error)
      setError(error.message || "There was an error submitting your feedback. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="feedback" className="bg-muted py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Feedback</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            We value your opinion and are constantly striving to improve our services. Please take a moment to share
            your thoughts with us.
          </p>
        </div>
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Help us serve you better by providing your feedback.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  disabled={isLoading}
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
                  placeholder="Your email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label>How would you rate your experience with us?</Label>
                <RadioGroup value={formData.rating} onValueChange={handleRatingChange} className="flex space-x-4" disabled={isLoading}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="excellent" disabled={isLoading} />
                    <Label htmlFor="excellent">Excellent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" disabled={isLoading} />
                    <Label htmlFor="good">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="average" id="average" disabled={isLoading} />
                    <Label htmlFor="average">Average</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" disabled={isLoading} />
                    <Label htmlFor="poor">Poor</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Feedback</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please share your thoughts, suggestions, or concerns"
                  rows={5}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
