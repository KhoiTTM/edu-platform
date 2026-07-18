import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("=== Finding Rio student profile ===");
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .or("display_name.ilike.%rio%,email.ilike.%rio%");

  if (!profiles || profiles.length === 0) {
    console.log("No student 'Rio' found.");
    return;
  }

  const rio = profiles[0];

  console.log("=== Querying ALL events for Rio ===");
  const { data: events, error } = await supabase
    .from('learning_events')
    .select('*')
    .eq('user_id', rio.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
    return;
  }

  // Filter for English related events (subject slugs might be 'english' or 'tieng-anh' or 'tieng_anh')
  const englishEvents = (events || []).filter(e => 
    e.subject_slug?.toLowerCase().includes('eng') ||
    e.subject_slug?.toLowerCase().includes('anh')
  );

  console.log(`Found ${englishEvents.length} English-related events.`);
  englishEvents.slice(0, 50).forEach((evt: any) => {
    console.log(`[${evt.created_at}] Subject: ${evt.subject_slug} | EventType: ${evt.event_type} | Metadata:`, evt.metadata);
  });
}

run();
