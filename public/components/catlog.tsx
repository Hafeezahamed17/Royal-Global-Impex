"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

const catalogs = [
  {
    id: 1,
    title: "ODOP of India",
    description:
      "Official One District One Product (ODOP) catalog showcasing India’s district-wise export strengths and specialty products.",
    file: "/catalogs/ODOP of India.pdf",
  },
  {
    id: 2,
    title: "ODOP of Tamil Nadu",
    description:
      "Comprehensive ODOP catalog highlighting Tamil Nadu’s district-specific products and export opportunities.",
    file: "/catalogs/ODOP of Tamil Nadu.pdf",
  },
]

export function CatalogSection() {
  return (
    <section id="catalog" className="bg-muted py-16 md:py-24">
      <div className="container">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Catalogs
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            View or download our official ODOP catalogs to explore district-wise export opportunities.
          </p>
        </div>

        {/* Catalog Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {catalogs.map((catalog) => (
            <Card key={catalog.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">
                  {catalog.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 flex-1">
                <p className="text-muted-foreground">
                  {catalog.description}
                </p>

                {/* PDF Preview */}
                <div className="relative w-full h-64 border rounded-md overflow-hidden bg-background">
                  <iframe
                    src={catalog.file}
                    className="w-full h-full"
                    title={catalog.title}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Button asChild variant="outline" className="flex-1">
                    <a
                      href={catalog.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </a>
                  </Button>

                  <Button asChild className="flex-1">
                    <a href={catalog.file} download>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
