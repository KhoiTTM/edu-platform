import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addLesson() {
  console.log("Looking for Mindset Foundation content source...");
  const { data: source } = await supabase
    .from('content_sources')
    .select('id')
    .eq('slug', 'mindset-foundation')
    .maybeSingle();

  if (!source) {
    console.error("Mindset Foundation content source not found!");
    return;
  }

  // 1. Create a unit parent node if it doesn't exist
  // We want to add it under Unit 2: House and Home (to match the topic of "Advice on family visit")
  console.log("Checking if Unit 2 node exists...");
  let { data: unitNode } = await supabase
    .from('curriculum_nodes')
    .select('id')
    .eq('source_id', source.id)
    .eq('slug', 'mindset-unit-2')
    .maybeSingle();

  if (!unitNode) {
     console.log("Creating Unit 2 node...");
     const { data: newUnit } = await supabase
       .from('curriculum_nodes')
       .insert({
         source_id: source.id,
         title: "Unit 2: House & Home",
         slug: "mindset-unit-2",
         type: "unit",
         sort_key: 2,
         path: "2",
         depth: 1,
         metadata: {
           skill_focus: "listening",
           page_hint: "Unit 2"
         }
       })
       .select()
       .single();
     unitNode = newUnit;
  }

  if (!unitNode) {
    console.error("Failed to find or create Unit 2 node!");
    return;
  }

  console.log("Checking if the Lesson exists...");
  const { data: existingLesson } = await supabase
    .from('curriculum_nodes')
    .select('id')
    .eq('source_id', source.id)
    .eq('slug', 'advice-on-family-visit')
    .maybeSingle();

  if (existingLesson) {
     console.log("Lesson already exists. Removing to re-seed...");
     await supabase.from('curriculum_nodes').delete().eq('id', existingLesson.id);
  }

  console.log("Seeding Advice on family visit lesson node...");
  const { data: newLesson, error: err } = await supabase
    .from('curriculum_nodes')
    .insert({
       source_id: source.id,
       parent_id: unitNode.id,
       title: "Buổi 8: [CAM20 - T4] Advice on family visit",
       slug: "advice-on-family-visit",
       type: "lesson",
       sort_key: 8,
       path: `2.8`,
       depth: 2,
       metadata: {
         youtube_id: "T4S1", // Maps directly to the transcript key in ieltsTranscripts.ts
         skill_focus: "shadowing",
         page_hint: "Cam 20 Test 4 Section 1",
         summary: "Sandra shares advice on where to take family visitors, including recommending King's Hotel and nearby attractions.",
         vocab: ["accommodation", "recommend", "central"]
       }
    })
    .select()
    .single();

  if (err) {
    console.error("Error inserting lesson node:", err);
  } else {
    console.log("Successfully seeded new lesson node:", newLesson.title);
  }
}

addLesson().catch(console.error);
