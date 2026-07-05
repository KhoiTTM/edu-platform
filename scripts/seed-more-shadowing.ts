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

interface LessonPayload {
  title: string;
  slug: string;
  sort_key: number;
  path: string;
  parentSlug: string;
  parentTitle: string;
  parentSortKey: number;
  vocab: string[];
  summary: string;
}

const itemsToSeed: LessonPayload[] = [
  {
    title: "Buổi 9: [CAM12 - T1] Family Excursions",
    slug: "family-excursions",
    sort_key: 9,
    path: "4.9",
    parentSlug: "mindset-unit-4",
    parentTitle: "Unit 4: Travel",
    parentSortKey: 4,
    vocab: ["excursion", "cruise", "departure"],
    summary: "A conversation about booking family excursions, boat cruises, and activities for young children."
  },
  {
    title: "Buổi 10: [CAM13 - T1] Cookery Classes",
    slug: "job-inquiry", // Keep original slug or let it match job-inquiry so it matches route
    sort_key: 10,
    path: "5.10",
    parentSlug: "mindset-unit-5",
    parentTitle: "Unit 5: Food",
    parentSortKey: 5,
    vocab: ["cookery", "vegetarian", "lecture"],
    summary: "A phone call inquiring about seasonal cookery classes, healthy menus, and vegetarian schools."
  },
  {
    title: "Buổi 11: [CAM14 - T1] Crime Report Form",
    slug: "university-language-centre", // Keep original slug to match route
    sort_key: 11,
    path: "8.11",
    parentSlug: "mindset-unit-8",
    parentTitle: "Unit 8: Health",
    parentSortKey: 8,
    vocab: ["theft", "stolen", "resident"],
    summary: "Louise Taylor reports a theft and wallet loss to a police officer."
  }
];

async function seedLessons() {
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

  for (const item of itemsToSeed) {
    console.log(`Checking if parent unit ${item.parentTitle} exists...`);
    let { data: unitNode } = await supabase
      .from('curriculum_nodes')
      .select('id')
      .eq('source_id', source.id)
      .eq('slug', item.parentSlug)
      .maybeSingle();

    if (!unitNode) {
      console.log(`Creating parent unit ${item.parentTitle}...`);
      const { data: newUnit } = await supabase
        .from('curriculum_nodes')
        .insert({
          source_id: source.id,
          title: item.parentTitle,
          slug: item.parentSlug,
          type: "unit",
          sort_key: item.parentSortKey,
          path: `${item.parentSortKey}`,
          depth: 1,
          metadata: {
            skill_focus: "shadowing",
            page_hint: item.parentTitle
          }
        })
        .select()
        .single();
      unitNode = newUnit;
    }

    if (!unitNode) {
      console.error(`Failed to locate or create parent unit: ${item.parentTitle}`);
      continue;
    }

    console.log(`Checking if lesson ${item.title} exists...`);
    const { data: existingLesson } = await supabase
      .from('curriculum_nodes')
      .select('id')
      .eq('source_id', source.id)
      .eq('slug', item.slug)
      .maybeSingle();

    if (existingLesson) {
      console.log(`Removing old node for ${item.slug} to re-seed...`);
      await supabase.from('curriculum_nodes').delete().eq('id', existingLesson.id);
    }

    console.log(`Inserting lesson ${item.title}...`);
    const { data: newLesson, error: err } = await supabase
      .from('curriculum_nodes')
      .insert({
         source_id: source.id,
         parent_id: unitNode.id,
         title: item.title,
         slug: item.slug,
         type: "lesson",
         sort_key: item.sort_key,
         path: item.path,
         depth: 2,
         metadata: {
           youtube_id: "N/A",
           skill_focus: "shadowing",
           page_hint: `Section 1 Listening`,
           summary: item.summary,
           vocab: item.vocab
         }
      })
      .select()
      .single();

    if (err) {
      console.error(`Error inserting ${item.slug}:`, err);
    } else {
      console.log(`Successfully seeded ${item.slug}:`, newLesson.title);
    }
  }
}

seedLessons().catch(console.error);
