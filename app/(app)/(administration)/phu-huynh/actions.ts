"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Helper to create admin client with service role to bypass RLS for parent operations
async function getAdminClient() {
  const access = await checkParentAccess();
  if (!access.hasAccess) {
    throw new Error("Unauthorized access to parent admin client");
  }
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
}

// ─── Types ─────────────────────────────────────────────────────────────────

export type StudentProfile = {
  id: string;
  display_name: string;
  email: string;
  grade: number;
};

export type ParentTask = {
  id: string;
  parent_id: string;
  student_id: string;
  subject_slug: string;
  unit_numbers: number[];
  frequency: "daily" | "weekdays" | "weekly";
  active_days: number[];
  is_active: boolean;
  created_at: string;
  exam_id?: string | null;
  exam_title?: string;
  lesson_node_id?: string | null;
  lesson_title?: string;
  student?: StudentProfile;
};

export type DailyTask = {
  id: string;
  task_id: string;
  student_id: string;
  exam_id: string | null;
  lesson_node_id: string | null;
  task_date: string;
  completed_at: string | null;
  created_at: string;
  exam?: {
    id: string;
    title: string;
    total_questions: number;
    collection?: {
      subject_slug: string;
      title: string;
    };
  };
  lesson_node?: {
    id: string;
    title: string;
    slug: string;
    source?: {
      subject?: {
        slug: string;
      };
    };
  };
  task?: ParentTask;
};

export type LearningHistoryEntry = {
  id: string;
  subject_slug: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number;
  summary_metrics: Record<string, any>;
};

// ─── Queries ───────────────────────────────────────────────────────────────

export async function checkParentAccess(): Promise<{ hasAccess: boolean; role?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { hasAccess: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "student";
  return {
    hasAccess: role === "admin" || role === "parent",
    role
  };
}

/** Get all student profiles (for parent to pick from) */
export async function getStudentList(): Promise<StudentProfile[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, email, grade")
    .eq("role", "student")
    .order("display_name", { ascending: true });

  if (error) {
    console.error("[getStudentList] Error:", error);
    return [];
  }

  return (data || []) as StudentProfile[];
}

/** Get learning history for a specific student */
export async function getStudentHistory(
  studentId: string
): Promise<LearningHistoryEntry[]> {
  try {
    const adminClient = await getAdminClient();
    const { data, error } = await adminClient
      .from("learning_sessions")
      .select("id, subject_slug, started_at, ended_at, duration_seconds, summary_metrics")
      .eq("user_id", studentId)
      .order("started_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[getStudentHistory] Error:", error);
      return [];
    }

    return (data || []) as LearningHistoryEntry[];
  } catch (e) {
    console.error("[getStudentHistory] Authorization error:", e);
    return [];
  }
}

/** Get all parent tasks created by the current user */
export async function getMyParentTasks(): Promise<ParentTask[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("parent_tasks")
    .select("*")
    .eq("parent_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getMyParentTasks] Error:", error);
    return [];
  }

  const tasks = (data || []) as ParentTask[];

  // Enrich with student & exam & lesson info
  if (tasks.length > 0) {
    const studentIds = [...new Set(tasks.map((t) => t.student_id))];
    const examIds = [...new Set(tasks.map((t) => t.exam_id).filter(Boolean))] as string[];
    const nodeIds = [...new Set(tasks.map((t) => t.lesson_node_id).filter(Boolean))] as string[];

    const [profilesRes, examsRes, nodesRes] = await Promise.all([
      supabase.from("profiles").select("id, display_name, email, grade").in("id", studentIds),
      examIds.length > 0
        ? supabase.from("exams").select("id, title").in("id", examIds)
        : Promise.resolve({ data: [] }),
      nodeIds.length > 0
        ? supabase.from("curriculum_nodes").select("id, title").in("id", nodeIds)
        : Promise.resolve({ data: [] })
    ]);

    const profileMap = new Map((profilesRes.data || []).map((p) => [p.id, p]));
    const examMap = new Map((examsRes.data || []).map((e) => [e.id, e]));
    const nodeMap = new Map((nodesRes.data || []).map((n) => [n.id, n]));

    tasks.forEach((task) => {
      task.student = profileMap.get(task.student_id) as StudentProfile;
      if (task.exam_id) {
        task.exam_title = examMap.get(task.exam_id)?.title || "Đề thi cụ thể";
      }
      if (task.lesson_node_id) {
        task.lesson_title = nodeMap.get(task.lesson_node_id)?.title || "Bài học cụ thể";
      }
    });
  }

  return tasks;
}

export type ExamOption = {
  id: string;
  title: string;
  total_questions: number;
  collection_id: string;
  subject_slug: string;
  grade: number;
  units: number[];
  exam_type?: string;
};

/** Get all exams for a subject and grade */
export async function getExamsForSubject(
  subjectSlug: string,
  grade: number
): Promise<ExamOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exams")
    .select(`
      id,
      title,
      total_questions,
      collection:assessment_collections!inner (
        id,
        subject_slug,
        grade,
        units,
        exam_type
      )
    `)
    .eq("assessment_collections.subject_slug", subjectSlug)
    .eq("assessment_collections.grade", grade);

  if (error) {
    console.error("[getExamsForSubject] Error:", error);
    return [];
  }

  return (data || []).map((e: any) => ({
    id: e.id,
    title: e.title,
    total_questions: e.total_questions || 0,
    collection_id: e.collection?.id || "",
    subject_slug: e.collection?.subject_slug || "",
    grade: e.collection?.grade || 3,
    units: e.collection?.units || [],
    exam_type: e.collection?.exam_type || "lesson",
  })) as ExamOption[];
}

export type LessonOption = {
  id: string;
  title: string;
  slug: string;
  unit_title?: string;
  unit_number?: number;
};

/** Get all lessons for a subject and grade */
export async function getLessonsForSubject(
  subjectSlug: string,
  grade: number
): Promise<LessonOption[]> {
  const supabase = await createClient();

  const { data: subject } = await supabase
    .from("universal_subjects")
    .select("id")
    .eq("slug", subjectSlug)
    .maybeSingle();

  if (!subject) {
    return [];
  }

  const { data: sources } = await supabase
    .from("content_sources")
    .select("id")
    .eq("subject_id", subject.id);

  if (!sources || sources.length === 0) {
    return [];
  }

  const matchedSourceIds = [];
  for (const source of sources) {
    const { data: rootNode } = await supabase
      .from("curriculum_nodes")
      .select("slug")
      .eq("source_id", source.id)
      .is("parent_id", null)
      .maybeSingle();
    
    if (rootNode) {
      if (grade === 0) {
        matchedSourceIds.push(source.id);
      } else if (rootNode.slug === `lop-${grade}` || rootNode.slug === `grade-${grade}`) {
        matchedSourceIds.push(source.id);
      }
    }
  }

  if (matchedSourceIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("curriculum_nodes")
    .select(`
      id,
      title,
      slug,
      parent:parent_id (
        title
      )
    `)
    .eq("type", "lesson")
    .in("source_id", matchedSourceIds);

  if (error) {
    console.error("[getLessonsForSubject] Error:", error);
    return [];
  }

  return (data || []).map((n: any) => {
    const unitTitle = n.parent?.title || "";
    const match = unitTitle.match(/(?:unit|chủ đề|chương)\s+(\d+)/i);
    const unitNumber = match ? parseInt(match[1], 10) : undefined;

    return {
      id: n.id,
      title: n.title,
      slug: n.slug,
      unit_title: unitTitle,
      unit_number: unitNumber,
    };
  }) as LessonOption[];
}

export type SubjectOption = {
  slug: string;
  name: string;
  icon: string;
  color: string;
};

/** Get dynamically active subjects for a given grade */
export async function getSubjectsForGrade(grade: number): Promise<SubjectOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_subjects_by_grade", { p_grade: grade });
  if (error) {
    console.error("Error get_subjects_by_grade:", error);
    return [];
  }
  
  const { data: g0Data } = await supabase.rpc("get_subjects_by_grade", { p_grade: 0 });
  const combined = [...(data || []), ...(g0Data || [])];
  
  const unique = [];
  const slugs = new Set();
  for (const s of combined) {
    if (!slugs.has(s.slug)) {
      slugs.add(s.slug);
      unique.push(s);
    }
  }
  
  const colors: Record<string, string> = {
    toan: "sky",
    tieng_viet: "amber",
    tieng_anh: "emerald",
    "tieng-anh-7": "emerald",
    "mindset-ielts": "violet",
    "pre-a1-starter": "pink",
    khtn: "rose"
  };
  
  return unique.map(s => ({
    slug: s.slug,
    name: s.name_vi || s.name_en || s.slug,
    icon: s.icon || "📖",
    color: colors[s.slug] || "slate"
  }));
}

/** Get available units for a subject + grade combo (for wizard step 3) */
export async function getUnitsForSubject(
  subjectSlug: string,
  grade: number
): Promise<{ unit: number; title: string; examCount: number }[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assessment_collections")
    .select("units, title, exams(id)")
    .eq("subject_slug", subjectSlug)
    .eq("grade", grade)
    .eq("status", "published")
    .eq("exam_type", "lesson");

  if (error) {
    console.error("[getUnitsForSubject] Error:", error);
    return [];
  }

  // Aggregate unique unit numbers
  const unitMap = new Map<number, { title: string; examCount: number }>();

  (data || []).forEach((col: any) => {
    const units: number[] = col.units || [];
    const examCount = col.exams?.length || 0;
    units.forEach((u) => {
      const existing = unitMap.get(u);
      if (existing) {
        existing.examCount += examCount;
      } else {
        unitMap.set(u, { title: `Unit ${u}`, examCount });
      }
    });
  });

  return Array.from(unitMap.entries())
    .map(([unit, info]) => ({ unit, title: info.title, examCount: info.examCount }))
    .sort((a, b) => a.unit - b.unit);
}

/** Get daily tasks for the current student (today) */
export async function getTodayTasks(): Promise<DailyTask[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Generate tasks first (idempotent RPC)
  await supabase.rpc("generate_daily_tasks_for_student", {
    p_student_id: user.id,
  });

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("daily_tasks")
    .select(`
      id,
      task_id,
      student_id,
      exam_id,
      lesson_node_id,
      task_date,
      completed_at,
      created_at,
      exam:exams (
        id,
        title,
        total_questions,
        collection:assessment_collections (
          subject_slug,
          title
        )
      ),
      lesson_node:curriculum_nodes (
        id,
        title,
        slug,
        source:content_sources (
          subject:universal_subjects (
            slug
          )
        )
      ),
      task:parent_tasks (
        subject_slug,
        unit_numbers
      )
    `)
    .eq("student_id", user.id)
    .eq("task_date", today)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getTodayTasks] Error:", error);
    return [];
  }

  return (data || []) as unknown as DailyTask[];
}

/** Get ALL pending daily tasks for the current student (not yet completed) */
export async function getPendingTasks(): Promise<DailyTask[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("daily_tasks")
    .select(`
      id,
      task_id,
      student_id,
      exam_id,
      lesson_node_id,
      task_date,
      completed_at,
      created_at,
      exam:exams (
        id,
        title,
        total_questions,
        collection:assessment_collections (
          subject_slug,
          title
        )
      ),
      lesson_node:curriculum_nodes (
        id,
        title,
        slug,
        source:content_sources (
          subject:universal_subjects (
            slug
          )
        )
      ),
      task:parent_tasks (
        subject_slug,
        unit_numbers
      )
    `)
    .eq("student_id", user.id)
    .is("completed_at", null)
    .order("task_date", { ascending: true })
    .limit(10);

  if (error) {
    console.error("[getPendingTasks] Error:", error);
    return [];
  }

  return (data || []) as unknown as DailyTask[];
}

// ─── Exam Bank Explorer (read-only) ─────────────────────────────────────────

export type ExamBankQuestion = {
  id: string;
  type: string;
  difficulty: number | null;
  order_index: number;
  metadata_json: Record<string, any>;
};

export type ExamBankExam = {
  id: string;
  exam_number: number;
  title: string;
  total_questions: number;
  questions: ExamBankQuestion[];
};

export type ExamBankCollection = {
  id: string;
  title: string;
  subject_slug: string;
  grade: number;
  volume: number | null;
  units: number[];
  exam_type: string | null;
  status: string;
  exams: ExamBankExam[];
};

/**
 * Đọc toàn bộ cây exam-bank theo (môn, lớp): collections -> exams -> questions.
 * Đọc câu hỏi qua junction exam_questions->question_bank (đúng đường runtime),
 * nên hiển thị chính xác những gì học sinh sẽ làm. Read-only.
 */
export async function getExamBankData(
  subjectSlug: string,
  grade: number
): Promise<ExamBankCollection[]> {
  const supabase = await createClient();

  // Chỉ admin/parent được xem
  const access = await checkParentAccess();
  if (!access.hasAccess) return [];

  const { data: collections, error: colErr } = await supabase
    .from("assessment_collections")
    .select("id, title, subject_slug, grade, volume, units, exam_type, status")
    .eq("subject_slug", subjectSlug)
    .eq("grade", grade)
    .order("volume", { ascending: true })
    .order("sequence_number", { ascending: true });

  if (colErr || !collections || collections.length === 0) {
    if (colErr) console.error("[getExamBankData] collections:", colErr);
    return [];
  }

  const collectionIds = collections.map((c) => c.id);

  const { data: exams, error: examErr } = await supabase
    .from("exams")
    .select("id, collection_id, exam_number, title, total_questions")
    .in("collection_id", collectionIds)
    .order("exam_number", { ascending: true });

  if (examErr) {
    console.error("[getExamBankData] exams:", examErr);
    return [];
  }

  const examIds = (exams || []).map((e) => e.id);

  // Lấy câu hỏi cho TỪNG đề riêng (giống hệt runtime getExamQuestions) thay vì
  // gộp mọi đề vào 1 query — tránh giới hạn 1000 dòng & join lồng bị rớt câu.
  const questionsByExam = new Map<string, ExamBankQuestion[]>();
  await Promise.all(
    examIds.map(async (examId) => {
      const { data: links, error: linkErr } = await supabase
        .from("exam_questions")
        .select(`
          order_index,
          question_bank (
            id,
            type,
            difficulty,
            metadata_json
          )
        `)
        .eq("exam_id", examId)
        .order("order_index", { ascending: true });

      if (linkErr) {
        console.error(`[getExamBankData] questions exam ${examId}:`, linkErr);
        return;
      }

      const arr: ExamBankQuestion[] = (links || [])
        .map((l: any) => {
          const qb = l.question_bank;
          if (!qb) return null;
          return {
            id: qb.id,
            type: qb.type,
            difficulty: qb.difficulty ?? null,
            order_index: l.order_index,
            metadata_json: qb.metadata_json || {},
          } as ExamBankQuestion;
        })
        .filter((x): x is ExamBankQuestion => x !== null);

      questionsByExam.set(examId, arr);
    })
  );

  const examsByCollection = new Map<string, ExamBankExam[]>();
  (exams || []).forEach((e: any) => {
    const arr = examsByCollection.get(e.collection_id) || [];
    arr.push({
      id: e.id,
      exam_number: e.exam_number,
      title: e.title,
      total_questions: e.total_questions || 0,
      questions: questionsByExam.get(e.id) || [],
    });
    examsByCollection.set(e.collection_id, arr);
  });

  return collections.map((c: any) => ({
    id: c.id,
    title: c.title,
    subject_slug: c.subject_slug,
    grade: c.grade,
    volume: c.volume ?? null,
    units: c.units || [],
    exam_type: c.exam_type ?? null,
    status: c.status || "draft",
    exams: examsByCollection.get(c.id) || [],
  })) as ExamBankCollection[];
}

// ─── Mutations ─────────────────────────────────────────────────────────────

type CreateTaskInput = {
  student_id: string;
  subject_slug: string;
  unit_numbers: number[];
  frequency: "daily" | "weekdays" | "weekly";
  active_days: number[];
  exam_id?: string | null;
  lesson_node_id?: string | null;
};

/** Create a new parent task */
export async function createParentTask(input: CreateTaskInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase.from("parent_tasks").insert({
    parent_id: user.id,
    student_id: input.student_id,
    subject_slug: input.subject_slug,
    unit_numbers: input.unit_numbers,
    frequency: input.frequency,
    active_days: input.active_days,
    exam_id: input.exam_id || null,
    lesson_node_id: input.lesson_node_id || null,
    is_active: true,
  });

  if (error) {
    console.error("[createParentTask] Error:", error);
    return { error: error.message };
  }

  revalidatePath("/phu-huynh");
  return { success: true };
}

/** Toggle active/inactive state of a task */
export async function toggleParentTask(taskId: string, isActive: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("parent_tasks")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", taskId)
    .eq("parent_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/phu-huynh");
  return { success: true };
}

/** Delete a parent task */
export async function deleteParentTask(taskId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("parent_tasks")
    .delete()
    .eq("id", taskId)
    .eq("parent_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/phu-huynh");
  return { success: true };
}

/** Mark a daily task completed (called after exam submission) */
export async function completeDailyTask(examId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  await supabase.rpc("complete_daily_task_by_exam", {
    p_student_id: user.id,
    p_exam_id: examId,
  });

  revalidatePath("/dashboard");
  return { success: true };
}
