"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RefreshCw } from "lucide-react"

type FormSubmission = {
  id: string
  type: "contact" | "feedback" | "inquiry"
  data: Record<string, any>
  timestamp: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Simple authentication - in a real app, use proper authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in a real app, use proper authentication
    if (password === "R0yal4123") {
      setIsAuthenticated(true)
      setError("")
      loadSubmissions()
    } else {
      setError("Invalid password")
    }
  }

  const loadSubmissions = async () => {
    setIsLoading(true)
    console.log("Loading submissions...") // Debug log

    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer admin-token-R0yal4123',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const submissionsData = result.submissions.map((submission: any) => ({
          id: submission.id,
          type: submission.type,
          data: submission.data,
          timestamp: submission.timestamp,
        }))

        console.log("Fetched submissions:", submissionsData) // Debug log
        setSubmissions(submissionsData)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch submissions')
      }
    } catch (error) {
      console.error("Error loading submissions:", error)
      setError("Failed to load submissions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubmission = async (id: string, type: string) => {
    try {
      const response = await fetch(`/api/admin/submissions?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer admin-token-R0yal4123',
        },
      })

      if (response.ok) {
        console.log(`Deleted ${type} submission with id: ${id}`) // Debug log
        loadSubmissions() // Refresh the list
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete submission')
      }
    } catch (error) {
      console.error("Error deleting submission:", error)
      alert("Failed to delete submission")
    }
  }

  const clearAllData = async () => {
    if (confirm("Are you sure you want to clear all submissions? This action cannot be undone.")) {
      try {
        // Since we don't have a clear all API, we'll delete submissions one by one
        // In a real app, you'd have a clear all endpoint
        const submissionsToDelete = [...submissions]
        for (const submission of submissionsToDelete) {
          await fetch(`/api/admin/submissions?id=${submission.id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer admin-token-R0yal4123',
            },
          })
        }
        setSubmissions([])
        alert("All submissions have been cleared.")
        loadSubmissions() // Refresh to confirm
      } catch (error) {
        console.error("Error clearing data:", error)
        alert("Failed to clear all data")
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your password to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && <p className="text-destructive">{error}</p>}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadSubmissions} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="destructive" onClick={clearAllData}>
              Clear All Data
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{submissions.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{submissions.filter((s) => s.type === "contact").length}</div>
              <div className="text-sm text-muted-foreground">Contact</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{submissions.filter((s) => s.type === "feedback").length}</div>
              <div className="text-sm text-muted-foreground">Feedback</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{submissions.filter((s) => s.type === "inquiry").length}</div>
              <div className="text-sm text-muted-foreground">Inquiries</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Submissions ({submissions.length})</TabsTrigger>
            <TabsTrigger value="contact">
              Contact Form ({submissions.filter((s) => s.type === "contact").length})
            </TabsTrigger>
            <TabsTrigger value="feedback">
              Feedback Form ({submissions.filter((s) => s.type === "feedback").length})
            </TabsTrigger>
            <TabsTrigger value="inquiry">
              Product Inquiries ({submissions.filter((s) => s.type === "inquiry").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-6">
              {isLoading ? (
                <p>Loading submissions...</p>
              ) : submissions.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No submissions yet.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Submissions will appear here when users fill out the contact, feedback, or inquiry forms.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                submissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>
                            {submission.type === "contact"
                              ? "Contact Form"
                              : submission.type === "feedback"
                                ? "Feedback Form"
                                : "Product Inquiry"}{" "}
                            Submission
                          </CardTitle>
                          <CardDescription>
                            Submitted on {new Date(submission.timestamp).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSubmission(submission.id, submission.type)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {Object.entries(submission.data).map(([key, value]) => {
                          if (key === "id" || key === "timestamp" || key === "type") return null
                          return (
                            <div key={key} className="grid grid-cols-3 gap-4">
                              <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                              <div className="col-span-2">{String(value)}</div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-6">
              {submissions.filter((s) => s.type === "contact").length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No contact form submissions yet.</p>
                  </CardContent>
                </Card>
              ) : (
                submissions
                  .filter((s) => s.type === "contact")
                  .map((submission) => (
                    <Card key={submission.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Contact Form Submission</CardTitle>
                            <CardDescription>
                              Submitted on {new Date(submission.timestamp).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSubmission(submission.id, submission.type)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {Object.entries(submission.data).map(([key, value]) => {
                            if (key === "id" || key === "timestamp" || key === "type") return null
                            return (
                              <div key={key} className="grid grid-cols-3 gap-4">
                                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                                <div className="col-span-2">{String(value)}</div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-6">
              {submissions.filter((s) => s.type === "feedback").length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No feedback form submissions yet.</p>
                  </CardContent>
                </Card>
              ) : (
                submissions
                  .filter((s) => s.type === "feedback")
                  .map((submission) => (
                    <Card key={submission.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Feedback Form Submission</CardTitle>
                            <CardDescription>
                              Submitted on {new Date(submission.timestamp).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSubmission(submission.id, submission.type)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {Object.entries(submission.data).map(([key, value]) => {
                            if (key === "id" || key === "timestamp" || key === "type") return null
                            return (
                              <div key={key} className="grid grid-cols-3 gap-4">
                                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                                <div className="col-span-2">{String(value)}</div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="inquiry">
            <div className="space-y-6">
              {submissions.filter((s) => s.type === "inquiry").length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No product inquiries yet.</p>
                  </CardContent>
                </Card>
              ) : (
                submissions
                  .filter((s) => s.type === "inquiry")
                  .map((submission) => (
                    <Card key={submission.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Product Inquiry</CardTitle>
                            <CardDescription>
                              Submitted on {new Date(submission.timestamp).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSubmission(submission.id, submission.type)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {Object.entries(submission.data).map(([key, value]) => {
                            if (key === "id" || key === "timestamp" || key === "type") return null
                            return (
                              <div key={key} className="grid grid-cols-3 gap-4">
                                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                                <div className="col-span-2">{String(value)}</div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
