import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { IssueUpdate } from '@/types/supabase'

// PATCH /api/issues/[id] - Update an issue
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const updateData: IssueUpdate = body

    const { data: issue, error } = await supabase
      .from('issues')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(issue)
  } catch (error: any) {
    console.error('Error updating issue:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update issue' },
      { status: 500 }
    )
  }
}

// DELETE /api/issues/[id] - Delete an issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('issues')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting issue:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete issue' },
      { status: 500 }
    )
  }
}
