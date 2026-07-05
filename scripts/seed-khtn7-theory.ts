/**
 * Seed KHTN 7 lý thuyết: grammar_tutorial cho tất cả bài còn thiếu
 * + tạo curriculum_nodes cho Vật lý (bài 8-20) và Sinh học (bài 21-42)
 * Run: npx tsx scripts/seed-khtn7-theory.ts
 */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SOURCE_ID = "4504385a-9c92-45ac-9943-b31b9c378044";
const COURSE_ID = "cd5768aa-6745-44f7-b5e8-5eca8f1cec12";

async function rpc(path: string, method: string, body?: any) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: method === "POST" ? "return=representation" : "return=minimal",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path}: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}
