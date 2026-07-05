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

async function check() {
  const { data: nodes, error } = await supabase.from('curriculum_nodes').select('id, title, slug, type, parent_id');
  if (error) {
    console.error(error);
    return;
  }
  const types = new Set(nodes.map(n => n.type));
  console.log("Unique Node Types:", Array.from(types));
  const examNodes = nodes.filter(n => n.type === 'exam');
  console.log("Exam nodes:", examNodes.length);
  const otherTypes = nodes.filter(n => n.type !== 'unit' && n.type !== 'lesson' && n.type !== 'exam' && n.type !== 'course');
  console.log("Other nodes:", otherTypes.length, otherTypes.slice(0, 10));
}
check();
