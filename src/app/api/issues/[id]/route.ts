import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issue = await db.issue.findUnique({
      where: { id: params.id },
      include: {
        project: true,
      },
    })

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }

    return NextResponse.json(issue)
  } catch (error) {
    console.error('Error fetching issue:', error)
    return NextResponse.json({ error: 'Failed to fetch issue' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, description, type, severity, status, floor, resolvedAt } = body

    const issue = await db.issue.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(type !== undefined && { type }),
        ...(severity !== undefined && { severity }),
        ...(status !== undefined && { status }),
        ...(floor !== undefined && { floor }),
        ...(resolvedAt !== undefined && { resolvedAt }),
      },
      include: {
        project: true,
      },
    })

    return NextResponse.json(issue)
  } catch (error) {
    console.error('Error updating issue:', error)
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.issue.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting issue:', error)
    return NextResponse.json({ error: 'Failed to delete issue' }, { status: 500 })
  }
}
