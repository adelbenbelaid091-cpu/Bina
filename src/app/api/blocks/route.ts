import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get('projectId')

    const where = projectId ? { projectId } : {}

    const blocks = await db.block.findMany({
      where,
      include: {
        floors: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(blocks)
  } catch (error) {
    console.error('Error fetching blocks:', error)
    return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, name } = body

    if (!projectId || !name) {
      return NextResponse.json(
        { error: 'Project ID and name are required' },
        { status: 400 }
      )
    }

    const block = await db.block.create({
      data: {
        projectId,
        name,
      },
      include: {
        floors: true,
      },
    })

    return NextResponse.json(block, { status: 201 })
  } catch (error) {
    console.error('Error creating block:', error)
    return NextResponse.json({ error: 'Failed to create block' }, { status: 500 })
  }
}
