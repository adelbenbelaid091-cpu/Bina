import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// DELETE block
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; blockId: string } }
) {
  try {
    const { error } = await supabase
      .from('blocks')
      .delete()
      .eq('id', params.blockId)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete block', details: error.message },
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
