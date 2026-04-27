import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all floors for a project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: floors, error } = await supabase
      .from('floors')
      .select('*')
      .eq('block_id', params.id)
      .order('floor_number', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch floors', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ floors: floors || [] })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST create new floor
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data: floor, error } = await supabase
      .from('floors')
      .insert({
        block_id: params.id,
        floor_number: body.floorNumber,
        floor_name: body.floorName || null,
        notes: body.notes || null,
        concrete_date: body.concreteDate || null,
        concrete_review: body.concreteReview || null,
        gro_oeuvre_progress: body.groOeuvreProgress || 0,
        cet_progress: body.cetProgress || 0,
        ces_progress: body.cesProgress || 0,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create floor', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ floor }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}
