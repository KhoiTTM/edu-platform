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

async function run() {
  const url = `${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
  console.log('Fetching OpenAPI from:', url);
  
  const res = await fetch(url, {
    headers: {
      'apikey': env.SUPABASE_SERVICE_ROLE_KEY!
    }
  });
  
  const json = await res.json();
  fs.writeFileSync('openapi-debug.json', JSON.stringify(json, null, 2));
  console.log('OpenAPI definitions saved to openapi-debug.json');
  
  // Print paths starting with /rpc/
  const paths = Object.keys(json.paths || {}).filter(p => p.startsWith('/rpc/'));
  console.log('Exposed RPCs:', paths);
}

run().catch(console.error);
