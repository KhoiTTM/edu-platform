import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

function countQuestions(unitData: any): number {
  let count = 0;
  for (const section of unitData.sections || []) {
    for (const ex of section.exercises || []) {
      if (Array.isArray(ex.questions)) count += ex.questions.length;
      else if (Array.isArray(ex.items)) count += ex.items.length;
      else count += 1;
    }
  }
  return count;
}

export async function GET() {
  const dir = path.join(process.cwd(), "content", "workbooks");
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return NextResponse.json({ units: [] });
  }

  const unitFiles = files.filter((f) => /^tienganh7-sbt-unit\d+\.json$/.test(f));

  const units = await Promise.all(
    unitFiles.map(async (f) => {
      const raw = await fs.readFile(path.join(dir, f), "utf-8");
      const data = JSON.parse(raw);
      return {
        unit: data.unit as number,
        title: data.title as string,
        total_questions: countQuestions(data),
      };
    })
  );

  units.sort((a, b) => a.unit - b.unit);

  return NextResponse.json({ units });
}
