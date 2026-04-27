import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all blocks for a project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: blocks, error } = await supabase
      .from('blocks')
      .select('*')
      .eq('project_id', params.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch blocks', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ blocks: blocks || [] })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST create new block
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data: block, error } = await supabase
      .from('blocks')
      .insert({
        project_id: params.id,
        name: body.name,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create block', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ block }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}
