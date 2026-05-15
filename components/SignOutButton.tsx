"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
        router.push("/login");
      }}
    >
      Sign out
    </button>
  );
}
