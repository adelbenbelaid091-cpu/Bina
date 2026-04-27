import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all issues
export async function GET() {
  try {
    const { data: issues, error } = await supabase
      .from('issues')
      .select(`
        *,
        projects (
          id,
          name,
          project_code
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch issues', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ issues: issues || [] })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST create new issue
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: issue, error } = await supabase
      .from('issues')
      .insert({
        project_id: body.projectId,
        title: body.title,
        description: body.description || null,
        type: body.type || 'other',
        severity: body.severity || 'medium',
        status: body.status || 'open',
        floor: body.floor || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create issue', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ issue }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}
