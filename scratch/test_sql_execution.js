const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('--- Testing universal_subjects insert/upsert ---');
  const { data: subjectData, error: subjectErr } = await supabase
    .from('universal_subjects')
    .upsert({
      slug: 'pre-a1-starter',
      name_vi: 'Pre A1 Starter',
      name_en: 'Pre A1 Starter',
      icon: '⭐'
    }, { onConflict: 'slug' })
    .select();

  console.log('universal_subjects upsert result:', subjectData, subjectErr);

  console.log('--- Testing SQL execution through custom RPCs if any ---');
  
  // Let's check what functions/RPCs are available by trying to call some common debugging RPCs
  const sql = `
    CREATE OR REPLACE FUNCTION public.get_subjects_by_grade(p_grade INTEGER)
    RETURNS TABLE(id UUID, slug TEXT, name_vi TEXT, name_en TEXT, description TEXT, icon TEXT) AS $$
    BEGIN
        RETURN QUERY 
        SELECT DISTINCT
            s.id,
            s.slug,
            s.name_vi,
            s.name_en,
            s.description,
            s.icon
        FROM 
            public.universal_subjects s
        WHERE 
            -- System A: Canonical Curriculum Units (Phase 2)
            EXISTS (
                SELECT 1 FROM public.curriculum_units u 
                WHERE (u.subject_id = s.id OR u.subject = s.slug) AND u.grade = p_grade
            )
            OR
            -- System B: Universal Learning Engine Nodes (Phase 7)
            EXISTS (
                SELECT 1 FROM public.content_sources cs
                JOIN public.curriculum_nodes cn ON cn.source_id = cs.id
                WHERE cs.subject_id = s.id AND (cn.slug = 'lop-' || p_grade OR cn.slug = 'grade-' || p_grade)
            )
            OR
            -- System C: IELTS / Universal Content (Grade 0)
            (p_grade = 0 AND s.slug IN ('mindset-ielts', 'pre-a1-starter'))
            OR
            -- System D: Legacy subjects check (if any remain)
            EXISTS (
                SELECT 1 FROM public.universal_subjects us WHERE us.id = s.id AND p_grade = 3 AND us.slug IN ('toan', 'tieng_anh')
            );
    END;
    $$ LANGUAGE plpgsql;
  `;

  // Try some RPC names
  const rpcNames = ['exec_sql', 'execute_sql', 'run_sql', 'inspect_sql'];
  for (const name of rpcNames) {
    const { data, error } = await supabase.rpc(name, { sql_query: sql });
    console.log(`RPC ${name} call result:`, { data, error });
    if (!error) {
      console.log(`Successfully executed SQL using RPC: ${name}`);
      break;
    }
  }
}

run();
