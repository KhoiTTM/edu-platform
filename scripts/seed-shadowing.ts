import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { shadowingLessons } from "../lib/shadowingData.ts";

const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join("=").trim().replace(/^"|"$/g, "");
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Starting shadowing data migration to Supabase...");
  
  // Clear old data to avoid duplicates
  console.log("Clearing old shadowing data...");
  const { error: clearErr } = await supabase.from("shadowing_lessons").delete().neq("slug", "");
  if (clearErr) {
    console.warn("Could not clear old data (tables might not exist yet):", clearErr.message);
    console.log("\n=====================================================================");
    console.log("CRITICAL: Tables do not exist on Supabase yet.");
    console.log("Please copy the SQL content from the following file and execute it in your Supabase SQL Editor:");
    console.log("-> supabase/migrations/056_create_shadowing_tables.sql");
    console.log("=====================================================================\n");
    process.exit(1);
  }

  for (const [slug, lesson] of Object.entries(shadowingLessons) as any) {
    console.log(`Inserting lesson: ${lesson.title} (${slug})...`);
    const { data: insertedLesson, error: lessonErr } = await supabase
      .from("shadowing_lessons")
      .insert({
        slug,
        title: lesson.title,
        audio_url: lesson.audio_url,
        repeat_offset: lesson.repeat_offset
      })
      .select("id")
      .single();

    if (lessonErr || !insertedLesson) {
      console.error(`Error inserting lesson ${slug}:`, lessonErr?.message);
      continue;
    }

    const sentencesToInsert = lesson.sentences.map((s: any) => ({
      lesson_id: insertedLesson.id,
      sentence_index: s.index,
      start_time_ms: s.start,
      end_time_ms: s.end,
      content: s.content,
      content_vi: s.contentVi,
      words_jsonb: s.words
    }));

    // Batch insert sentences
    console.log(`Inserting ${sentencesToInsert.length} sentences for ${slug}...`);
    const { error: sentencesErr } = await supabase
      .from("shadowing_sentences")
      .insert(sentencesToInsert);

    if (sentencesErr) {
      console.error(`Error inserting sentences for ${slug}:`, sentencesErr.message);
    } else {
      console.log(`Successfully seeded shadowing lesson: ${slug}`);
    }
  }

  console.log("All shadowing data seeded successfully!");
}

seed();
