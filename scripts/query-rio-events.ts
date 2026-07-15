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
  const todayStr = new Date().toISOString().split('T')[0];
  console.log(`=== Querying learning_events for today (${todayStr}) for Rio ===`);

  const { data: events, error } = await supabase
    .from('learning_events')
    .select('*')
    .eq('user_id', rio.id)
    .gte('created_at', `${todayStr}T00:00:00.000Z`)
    .lte('created_at', `${todayStr}T23:59:59.999Z`)
    .order('created_at', { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return;
  }

  console.log(`Found ${events?.length || 0} events.`);
  events?.forEach((evt: any) => {
    console.log(`[${evt.created_at}] EventType: ${evt.event_type} | Subject: ${evt.subject_slug} | Metadata:`, evt.metadata);
  });
}

run();
