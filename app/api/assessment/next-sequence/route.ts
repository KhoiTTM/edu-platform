import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/assessment/next-sequence
 * Calculates the next available sequence number for a curriculum coordinate.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');
    const volume = searchParams.get('volume');
    const units = searchParams.get('units'); // expects comma string

    if (!subject || !grade) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();
    
    let query = supabase
      .from('assessment_collections')
      .select('sequence_number')
      .eq('subject_slug', subject)
      .eq('grade', parseInt(grade));

    // Handle volume 0 (None) correctly by checking for null/undefined instead of truthy
    if (volume !== null && volume !== undefined) {
        query = query.eq('volume', parseInt(volume));
    }
    
    // For units, we look for an EXACT match of the unit array to define the unique "Map Slot"
    if (units) {
        const unitArr = units.split(',').map(n => parseInt(n.trim())).sort((a, b) => a - b);
        query = query.eq('units', unitArr);
    }

    const { data, error } = await query.order('sequence_number', { ascending: false }).limit(1);

    if (error) throw error;

    const nextSequence = data && data.length > 0 ? (data[0].sequence_number + 1) : 1;

    return NextResponse.json({ nextSequence });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
