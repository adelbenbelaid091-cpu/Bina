import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const blockId = searchParams.get('blockId')

    const where = blockId ? { blockId } : {}

    const floors = await db.floor.findMany({
      where,
      include: {
        block: true,
      },
      orderBy: {
        floorNumber: 'asc',
      },
    })

    return NextResponse.json(floors)
  } catch (error) {
    console.error('Error fetching floors:', error)
    return NextResponse.json({ error: 'Failed to fetch floors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      blockId,
      floorNumber,
      floorName,
      notes,
      concreteDate,
      concreteReview,
      groOeuvreProgress,
      cetProgress,
      cesProgress,
    } = body

    if (!blockId || !floorNumber) {
      return NextResponse.json(
        { error: 'Block ID and floor number are required' },
        { status: 400 }
      )
    }

    const floor = await db.floor.create({
      data: {
        blockId,
        floorNumber,
        floorName: floorName || null,
        notes: notes || null,
        concreteDate: concreteDate ? new Date(concreteDate) : null,
        concreteReview: concreteReview || null,
        groOeuvreProgress: groOeuvreProgress || 0,
        cetProgress: cetProgress || 0,
        cesProgress: cesProgress || 0,
      },
      include: {
        block: true,
      },
    })

    return NextResponse.json(floor, { status: 201 })
  } catch (error) {
    console.error('Error creating floor:', error)
    return NextResponse.json({ error: 'Failed to create floor' }, { status: 500 })
  }
}
