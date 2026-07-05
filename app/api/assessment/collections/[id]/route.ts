import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PATCH /api/assessment/collections/[id]
 * Updates metadata for a specific assessment collection.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('assessment_collections')
      .update({
        title: body.title,
        grade: body.grade,
        subject_slug: body.subject_slug,
        volume: body.volume,
        units: body.units,
        sequence_number: body.sequence_number,
        exam_type: body.exam_type,
        status: body.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Update Collection API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
