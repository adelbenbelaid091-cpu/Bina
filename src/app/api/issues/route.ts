import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')
    const status = searchParams.get('status')
    const severity = searchParams.get('severity')

    const where: any = {}
    if (projectId) where.projectId = projectId
    if (status) where.status = status
    if (severity) where.severity = severity

    const issues = await db.issue.findMany({
      where,
      include: {
        project: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(issues)
  } catch (error) {
    console.error('Error fetching issues:', error)
    return NextResponse.json({ error: 'Failed to fetch issues' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, title, description, type, severity, floor } = body

    if (!projectId || !title) {
      return NextResponse.json(
        { error: 'Project ID and title are required' },
        { status: 400 }
      )
    }

    const issue = await db.issue.create({
      data: {
        projectId,
        title,
        description,
        type: type || 'other',
        severity: severity || 'medium',
        floor,
      },
      include: {
        project: true,
      },
    })

    return NextResponse.json(issue, { status: 201 })
  } catch (error) {
    console.error('Error creating issue:', error)
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 })
  }
}
