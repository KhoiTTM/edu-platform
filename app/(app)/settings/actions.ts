"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserGrades(grades: number[]) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (grades.length === 0) {
    throw new Error("At least one grade must be selected");
  }

  // Update profiles table. 
  // We keep the first grade in the 'grade' column for legacy compatibility.
  const { error } = await supabase
    .from("profiles")
    .update({ 
      grades: grades,
      grade: grades[0] 
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating grades:", error);
    throw new Error("Failed to update grades");
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/hoc-tap");
  revalidatePath("/settings");

  return { success: true };
}
