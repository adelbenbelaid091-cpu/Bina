import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// DELETE floor
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; floorId: string } }
) {
  try {
    const { error } = await supabase
      .from('floors')
      .delete()
      .eq('id', params.floorId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete floor', details: error.message },
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
