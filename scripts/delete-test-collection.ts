import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const title = "Thử nghiệm Phản xạ từ vựng"; // Wait, user said "Pre A1 - Thử nghiệm phản xạ từ vựng" or something similar.
  // Let's search for collections with 'Thử nghiệm'
  const { data: collections, error: err1 } = await supabase
    .from('assessment_collections')
    .select('id, title')
    .ilike('title', '%Thử nghiệm%phản xạ%');

  if (err1) {
    console.error("Lỗi lấy collections:", err1);
    return;
  }

  if (!collections || collections.length === 0) {
    console.log("Không tìm thấy collection nào có chữ Thử nghiệm phản xạ.");
    // Wait, let's search just 'thử nghiệm'
    const { data: c2 } = await supabase.from('assessment_collections').select('id, title').ilike('title', '%Thử nghiệm%');
    console.log("Các collection có chữ 'Thử nghiệm':", c2);
    return;
  }

  console.log("Tìm thấy collections:", collections);

  for (const c of collections) {
    console.log(`Đang xoá collection: ${c.title} (${c.id})`);
    
    const { error: err2 } = await supabase.from('assessment_collections').delete().eq('id', c.id);
    if (err2) {
       console.error("Lỗi xoá collection:", err2);
    } else {
       console.log("Đã xoá collection thành công!");
    }
  }
}

run();
