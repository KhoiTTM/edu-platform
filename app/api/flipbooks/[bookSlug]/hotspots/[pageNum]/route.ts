import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookSlug: string; pageNum: string }> }
) {
  try {
    const { bookSlug, pageNum } = await params;
    const pageNumber = parseInt(pageNum);

    // Get flipbook ID
    const { data: flipbook, error: fbError } = await supabase
      .from('flipbooks')
      .select('id')
      .eq('slug', bookSlug)
      .single();

    if (fbError || !flipbook) {
      return NextResponse.json(
        { error: 'Flipbook not found' },
        { status: 404 }
      );
    }

    // Fetch hotspots for this page
    const { data: hotspots, error: hsError } = await supabase
      .from('flipbook_hotspots')
      .select('*')
      .eq('flipbook_id', flipbook.id)
      .eq('page_number', pageNumber);

    if (hsError) throw hsError;

    return NextResponse.json({
      page: pageNumber,
      elements: hotspots.map((h) => ({
        id: h.hotspot_id,
        type: h.type,
        bbox: h.bbox,
        label: h.label,
        correctAnswer: h.correct_answer
      }))
    });
  } catch (error) {
    console.error('Error fetching hotspots:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
