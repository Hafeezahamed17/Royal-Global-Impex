"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase"
import { RefreshCw, LogOut } from "lucide-react"

type FormSubmission = {
  id: string
  type: "contact" | "feedback" | "inquiry"
  data: Record<string, any>
  timestamp: string
}

export default function AdminPage() {
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth()
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const loadSubmissions = async () => {
    setIsLoading(true)
    setError("")

    try {
      const [contactData, feedbackData, inquiryData] = await Promise.all([
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("feedback_submissions").select("*").order("created_at", { ascending: false }),
        supabase.from("product_inquiries").select("*").order("created_at", { ascending: false }),
      ])

      const allSubmissions: FormSubmission[] = []

      if (contactData.data) {
        allSubmissions.push(
          ...contactData.data.map((item: any) => ({
            id: item.id,
            type: "contact" as const,
            data: item,
            timestamp: item.created_at,
          }))
        )
      }

      if (feedbackData.data) {
        allSubmissions.push(
          ...feedbackData.data.map((item: any) => ({
            id: item.id,
            type: "feedback" as const,
            data: item,
            timestamp: item.created_at,
          }))
        )
      }

      if (inquiryData.data) {
        allSubmissions.push(
          ...inquiryData.data.map((item: any) => ({
            id: item.id,
            type: "inquiry" as const,
            data: item,
            timestamp: item.created_at,
          }))
        )
      }

      allSubmissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      setSubmissions(allSubmissions)
    } catch (err: any) {
      console.error("Error loading submissions:", err)
      setError(err.message || "Failed to load submissions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteSubmission = async (id: string, type: string) => {
    try {
      let tableName = ""
      if (type === "contact") tableName = "contact_submissions"
      else if (type === "feedback") tableName = "feedback_submissions"
      else if (type === "inquiry") tableName = "product_inquiries"

      if (tableName) {
        const { error } = await supabase.from(tableName).delete().eq("id", id)

        if (error) throw error

        loadSubmissions()
      }
    } catch (err: any) {
      console.error("Error deleting submission:", err)
      setError(err.message || "Failed to delete submission")
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (err: any) {
      console.error("Logout error:", err)
    }
  }

  const clearAllData = async () => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
      if (error) throw error

      const { error: feedbackError } = await supabase
        .from("feedback_submissions")
        .delete()
      if (feedbackError) throw feedbackError

      const { error: inquiryError } = await supabase
        .from("product_inquiries")
        .delete()
      if (inquiryError) throw inquiryError

      loadSubmissions()
    } catch (err: any) {
      console.error("Error clearing all data:", err)
      setError(err.message || "Failed to clear all data")
    }
  }

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login")
    } else if (!authLoading && isAuthenticated) {
      loadSubmissions()
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Logged in as: {user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadSubmissions} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <Card className="mb-6 border-destructive bg-destructive/10">
            <CardContent className="p-4 text-destructive">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </CardContent>
          </Card>
        )}
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
