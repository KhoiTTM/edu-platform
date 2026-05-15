/**
 * URL public cho file trong bucket Supabase Storage "textbooks".
 * Ví dụ path: grade3/toan-tap1.pdf
 */
export function textbookPublicUrl(storagePath: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return "";
  const path = storagePath.replace(/^\//, "");
  return `${base}/storage/v1/object/public/textbooks/${path}`;
}
