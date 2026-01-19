import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const submissionsFile = path.join(dataDir, 'submissions.json')

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize submissions file if it doesn't exist
if (!fs.existsSync(submissionsFile)) {
  fs.writeFileSync(submissionsFile, JSON.stringify([]))
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - in a real app, use proper authentication
    const authHeader = request.headers.get('authorization')
    if (authHeader !== 'Bearer admin-token-R0yal4123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Read submissions
    const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf8'))

    // Sort by timestamp descending
    submissions.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Simple authentication
    const authHeader = request.headers.get('authorization')
    if (authHeader !== 'Bearer admin-token-R0yal4123') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Submission ID required' }, { status: 400 })
    }

    // Read submissions
    const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf8'))

    // Filter out the submission
    const filteredSubmissions = submissions.filter((s: any) => s.id !== id)

    // Write back
    fs.writeFileSync(submissionsFile, JSON.stringify(filteredSubmissions, null, 2))

    console.log(`Deleted submission with id: ${id}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting submission:', error)
    return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 })
  }
}
