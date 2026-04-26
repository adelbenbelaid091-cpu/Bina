import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const {
      floorNumber,
      floorName,
      notes,
      concreteDate,
      concreteReview,
      groOeuvreProgress,
      cetProgress,
      cesProgress,
    } = body

    const floor = await db.floor.update({
      where: { id: params.id },
      data: {
        ...(floorNumber !== undefined && { floorNumber }),
        ...(floorName !== undefined && { floorName: floorName || null }),
        ...(notes !== undefined && { notes: notes || null }),
        ...(concreteDate !== undefined && {
          concreteDate: concreteDate ? new Date(concreteDate) : null,
        }),
        ...(concreteReview !== undefined && {
          concreteReview: concreteReview || null,
        }),
        ...(groOeuvreProgress !== undefined && { groOeuvreProgress }),
        ...(cetProgress !== undefined && { cetProgress }),
        ...(cesProgress !== undefined && { cesProgress }),
      },
      include: {
        block: true,
      },
    })

    return NextResponse.json(floor)
  } catch (error) {
    console.error('Error updating floor:', error)
    return NextResponse.json({ error: 'Failed to update floor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.floor.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting floor:', error)
    return NextResponse.json({ error: 'Failed to delete floor' }, { status: 500 })
  }
}
