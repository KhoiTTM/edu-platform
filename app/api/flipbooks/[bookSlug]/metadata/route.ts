import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookSlug: string }> }
) {
  try {
    const { bookSlug } = await params;

    // Fetch flipbook metadata
    const { data: flipbook, error: fbError } = await supabase
      .from('flipbooks')
      .select('id, slug, title, grade, subject_slug, total_pages')
      .eq('slug', bookSlug)
      .single();

    if (fbError || !flipbook) {
      return NextResponse.json(
        { error: 'Flipbook not found' },
        { status: 404 }
      );
    }

    // Fetch all pages for this flipbook
    const { data: pages, error: pError } = await supabase
      .from('flipbook_pages')
      .select('page_number, image_url')
      .eq('flipbook_id', flipbook.id)
      .order('page_number', { ascending: true });

    if (pError) throw pError;

    return NextResponse.json({
      bookId: flipbook.id,
      bookSlug: flipbook.slug,
      title: flipbook.title,
      grade: flipbook.grade,
      subjectSlug: flipbook.subject_slug,
      pageWidth: 511.0,
      pageHeight: 726.0,
      pages: pages.map((p) => ({
        id: p.page_number,
        image: p.image_url,
        width: 511.0,
        height: 726.0
      }))
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
