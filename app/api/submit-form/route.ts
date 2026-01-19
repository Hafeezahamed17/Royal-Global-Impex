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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    // Validate required fields
    if (!type || !['contact', 'feedback', 'inquiry'].includes(type)) {
      return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 })
    }

    // Read existing submissions
    const submissions = JSON.parse(fs.readFileSync(submissionsFile, 'utf8'))

    // Create new submission
    const submission = {
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: new Date().toISOString(),
    }

    // Add to submissions
    submissions.push(submission)

    // Write back to file
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2))

    console.log(`New ${type} submission saved:`, submission)

    return NextResponse.json({ success: true, id: submission.id })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
  }
}
