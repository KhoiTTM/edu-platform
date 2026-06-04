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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!);

async function run() {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, display_name')
    .ilike('display_name', '%cherry%')
    .single();

  if (!profile) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: sessions } = await supabase
    .from('learning_sessions')
    .select('*')
    .eq('user_id', profile.id)
    .gte('started_at', today.toISOString());

  console.log("Learning sessions today:", sessions?.length);
  if (sessions && sessions.length > 0) {
    console.log(sessions);
  }
  
  const { data: events } = await supabase
    .from('learning_events')
    .select('event_type, subject_slug, metadata, created_at')
    .eq('user_id', profile.id)
    .gte('created_at', today.toISOString())
    .limit(10);
    
  console.log("Learning events today:", events?.length);
  if (events && events.length > 0) {
    console.log(events);
  }
}
run();
