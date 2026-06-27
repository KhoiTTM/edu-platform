import { NextResponse } from "next/server";
import workbookData from "@/content/khtn-7-workbook.json";

export async function GET() {
  try {
    // Transform workbook data into assessment map format matching UI expectations
    const units: any[] = [];

    for (const [key, data] of Object.entries(workbookData)) {
      const match = key.match(/bai-(\d+)/);
      if (!match) continue;

      const baiNum = parseInt(match[1]);
      const workbook = data as any;
      const questionCount = workbook.questions?.length || 0;

      units.push({
        id: key,
        unit: baiNum,
        title: workbook.title || `Bài ${baiNum}`,
        exams: [{
          id: key,
          title: workbook.title || `Bài ${baiNum}`,
          total_questions: questionCount,
          exam_number: baiNum,
          is_completed: false
        }]
      });
    }

    // Sort by unit number
    units.sort((a, b) => a.unit - b.unit);

    return NextResponse.json({
      success: true,
      lessons: [{
        id: 'volume-1',
        title: 'KHTN 7 - Luyện tập',
        units: units
      }],
      reviews: [],
      reflex: []
    });
  } catch (error) {
    console.error("Error fetching workbook map:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch workbook data" },
      { status: 500 }
    );
  }
}
