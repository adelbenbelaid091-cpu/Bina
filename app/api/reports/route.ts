import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all reports
export async function GET() {
  try {
    const { data: reports, error } = await supabase
      .from('reports')
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
        { error: 'Failed to fetch reports', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ reports: reports || [] })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST create new report
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: report, error } = await supabase
      .from('reports')
      .insert({
        project_id: body.projectId,
        type: body.type,
        title: body.title,
        description: body.description || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create report', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ report }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Server error', details: error.message },
      { status: 500 }
    )
  }
}
