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
  console.log('Updating generate_assessment_title SQL function via exec_sql...');

  const sqlFunction = `
CREATE OR REPLACE FUNCTION public.generate_assessment_title(
    p_subject TEXT, 
    p_grade INTEGER, 
    p_volume INTEGER, 
    p_units INTEGER[], 
    p_seq INTEGER
) RETURNS TEXT AS $$
DECLARE
    v_sub_name TEXT;
    v_vol_str TEXT := '';
    v_unit_str TEXT := '';
BEGIN
    -- Subject Name mapping
    IF p_subject = 'math' OR p_subject = 'toan' THEN 
        v_sub_name := 'Toán';
    ELSIF p_subject = 'ielts' THEN 
        v_sub_name := 'IELTS';
    ELSIF p_subject = 'tieng_anh' OR p_subject = 'english' THEN 
        v_sub_name := 'Tiếng Anh';
    ELSE 
        v_sub_name := 'English';
    END IF;

    -- Volume String
    IF p_volume IS NOT NULL AND p_volume > 0 THEN 
        v_vol_str := ' - Tập ' || p_volume; 
    END IF;

    -- Units String
    IF p_units IS NOT NULL AND array_length(p_units, 1) > 0 THEN
        IF array_length(p_units, 1) > 1 THEN
            v_unit_str := ' - Bài ' || array_to_string(p_units, ', ');
        ELSE
            v_unit_str := ' - Bài ' || p_units[1];
        END IF;
    END IF;

    -- Combine
    IF p_grade IS NULL OR p_grade = 0 THEN
        RETURN v_sub_name || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
    ELSE
        RETURN v_sub_name || ' ' || p_grade || v_vol_str || v_unit_str || ' - Đề ' || COALESCE(p_seq, 1);
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger update on all existing collections to reapply titles
UPDATE public.assessment_collections 
SET title = public.generate_assessment_title(subject_slug, grade, volume, units, sequence_number);
  `;

  const { data, error } = await supabase.rpc('exec_sql', { sql: sqlFunction });

  if (error) {
    console.error('Error executing SQL:', error);
  } else {
    console.log('SQL Executed successfully. Response:', data);
  }
}

run().catch(console.error);
