import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET project by ID with blocks and floors
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        blocks (
          *,
          floors (*)
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch project', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ project })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE project
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete project', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}
