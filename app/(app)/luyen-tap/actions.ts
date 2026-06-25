"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSubjectCurriculum(subjectSlug: string) {
  console.log(`
--- [ACTION] getSubjectCurriculum for: ${subjectSlug} ---`);
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("  [ACTION-LOG] User not found. Aborting.");
    return [];
  }
  console.log(`  [ACTION-LOG] User ID: ${user.id}`);

  const { data: profile } = await supabase.from('profiles').select('grade').eq('id', user.id).single();
  const grade = profile?.grade || 3;
  console.log(`  [ACTION-LOG] User grade is ${profile?.grade}. Querying for grade: ${grade}.`);

  // First, try to fetch lessons for the user's actual grade
  console.log(`  [ACTION-LOG] Attempting to fetch lessons for grade ${grade}...`);
  let { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, title, topic_label, lesson_index, subject_slug, grade")
    .eq("grade", grade)
    .eq("subject_slug", subjectSlug)
    .order("lesson_index", { ascending: true });

  if (error) {
    // Log error but don't return yet, allow fallback
    console.error(`  [ACTION-LOG] Error on initial fetch for grade ${grade}:`, error.message);
  }
  console.log(`  [ACTION-LOG] Initial fetch found ${lessons?.length || 0} lessons.`);

  // If no lessons found for the user's grade, fall back to grade 3
  if (!lessons || lessons.length === 0) {
    console.log(`  [ACTION-LOG] No lessons found for grade ${grade}. Triggering fallback to grade 3.`);
    const { data: fallbackLessons, error: fallbackError } = await supabase
      .from("lessons")
      .select("id, title, topic_label, lesson_index, subject_slug, grade")
      .eq("grade", 3)
      .eq("subject_slug", subjectSlug)
      .order("lesson_index", { ascending: true });
    
    if (fallbackError) {
      console.error(`  [ACTION-LOG] Error on fallback fetch for grade 3:`, fallbackError.message);
      return [];
    }
    lessons = fallbackLessons;
    console.log(`  [ACTION-LOG] Fallback fetch found ${lessons?.length || 0} lessons.`);
  }

  if (!lessons || lessons.length === 0) {
    console.warn("  [ACTION-LOG] No lessons found after initial fetch and fallback. Returning empty array.");
    return [];
  }

  const completedLessonIds = new Set(); // Simplified for now
  console.log(`  [ACTION-LOG] Processing ${lessons.length} lessons to create map units.`);

  const orderedTopics: string[] = [];
  const groups: Record<string, any[]> = {};
  
  lessons.forEach(lesson => {
    const label = lesson.topic_label || "Other";
    if (!groups[label]) {
      groups[label] = [];
      orderedTopics.push(label);
    }
    groups[label].push(lesson);
  });

  let foundCurrent = false;

  const units = orderedTopics.map((title, unitIndex) => {
    const levels = groups[title].map((l, i) => {
        const isCompleted = completedLessonIds.has(l.id);
        let status: 'completed' | 'current' | 'locked' = 'locked';
        if (isCompleted) {
            status = 'completed';
        } else if (!foundCurrent) {
            status = 'current';
            foundCurrent = true;
        }
        let type = i === 0 ? 'start' : (i === groups[title].length - 1 ? 'practice' : 'lesson');
        return { id: l.id, type, status };
    });

    const colors = ["bg-emerald-400", "bg-pink-400", "bg-sky-400", "bg-amber-400"];
    const shadows = ["shadow-[0_6px_0_rgb(16,185,129)]", "shadow-[0_6px_0_rgb(236,72,153)]", "shadow-[0_6px_0_rgb(56,189,248)]", "shadow-[0_6px_0_rgb(251,191,36)]"];
    return {
      id: `unit-${unitIndex}`,
      title: title,
      levels: levels,
      color: colors[unitIndex % colors.length],
      shadow: shadows[unitIndex % shadows.length],
    };
  });
  console.log(`  [ACTION-LOG] Successfully created ${units.length} units. Returning to client.`);
  console.log("--- [ACTION] Finished getSubjectCurriculum ---");
  return units;
}

export async function getAssessmentMap(subjectSlug: string, grade?: number) {
  console.log(`
--- [ACTION] getAssessmentMap for: ${subjectSlug}, grade: ${grade || 'auto'} ---`);
  const supabase = await createClient();

  let targetGrade = grade;
  const completedExamIds = new Set<string>();
  const completedExamTitles = new Set<string>();

  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    if (!targetGrade) {
      const { data: profile } = await supabase.from('profiles').select('grade').eq('id', user.id).single();
      targetGrade = profile?.grade || 3;
    }

    // Query learning sessions to find completed exams
    const { data: sessions } = await supabase
      .from('learning_sessions')
      .select('summary_metrics')
      .eq('user_id', user.id)
      .eq('subject_slug', subjectSlug);

    sessions?.forEach((s: any) => {
      const metrics = s.summary_metrics;
      if (metrics && metrics.type === 'exam') {
        if (metrics.exam_id) completedExamIds.add(metrics.exam_id);
        if (metrics.unit_topic) completedExamTitles.add(metrics.unit_topic);
      }
    });
  } else {
    if (!targetGrade) targetGrade = 3;
  }

  let query = supabase
    .from('assessment_collections')
    .select(`
      id,
      title,
      volume,
      units,
      sequence_number,
      exam_type,
      semester,
      exams (
        id,
        title,
        exam_number,
        total_questions
      )
    `)
    .eq('grade', targetGrade)
    .eq('status', 'published');

  if (subjectSlug === 'tieng_anh') {
    if (targetGrade === 7) {
      query = query.in('subject_slug', ['tieng_anh', 'mindset-ielts']);
    } else {
      query = query.eq('subject_slug', 'tieng_anh');
    }
  } else {
    query = query.eq('subject_slug', subjectSlug);
  }

  const { data: collections, error } = await query
    .order('volume', { ascending: true })
    .order('sequence_number', { ascending: true });

  if (error) {
    console.error('  [ACTION-LOG] Error fetching assessment map:', error);
    return { lessons: [], reviews: [], reflex: [] };
  }

  console.log(`  [ACTION-LOG] Found ${collections?.length || 0} collections.`);

  // Transform to nested structure for lessons: [ { volume: 1, units: [ { unit: 1, exams: [...] } ] } ]
  const volumesMap = new Map<number, any>();
  const reviews: any[] = [];
  const reflexVolumesMap = new Map<number, any>();

  collections.forEach((collection) => {
    // If it's a review or reflex, group it accordingly
    if (collection.exam_type && collection.exam_type !== 'lesson') {
      const exams = collection.exams.map((exam: any) => {
        const isCompleted = completedExamIds.has(exam.id) || completedExamTitles.has(exam.title);
        return {
          id: exam.id,
          title: exam.title,
          exam_number: exam.exam_number,
          total_questions: exam.total_questions,
          collection_title: collection.title,
          is_completed: isCompleted
        };
      });

      const entry = {
        id: collection.id,
        title: collection.title,
        description: collection.exam_type === 'reflex'
          ? 'Luyện tập tính nhẩm nhanh với giới hạn thời gian tự chọn.'
          : (collection.title === 'Kiểm tra giữa học kỳ 1'
            ? 'Đề ôn tập củng cố kiến thức giữa học kì 1'
            : `Đề ôn tập củng cố kiến thức ${collection.title.toLowerCase()}`),
        exams: exams,
        unit: collection.units && collection.units.length > 0 ? collection.units[0] : 101
      };

      if (collection.exam_type === 'reflex') {
        const vol = collection.volume || 1;
        if (!reflexVolumesMap.has(vol)) {
          reflexVolumesMap.set(vol, {
            volume: vol,
            title: `Toán ${targetGrade} - Tập ${vol}`,
            exams: []
          });
        }
        const volEntry = reflexVolumesMap.get(vol);
        collection.exams.forEach((exam: any) => {
          const isCompleted = completedExamIds.has(exam.id) || completedExamTitles.has(exam.title);
          volEntry.exams.push({
            id: exam.id,
            title: exam.title,
            exam_number: exam.exam_number,
            total_questions: exam.total_questions,
            collection_title: collection.title,
            is_completed: isCompleted
          });
        });
      } else {
        reviews.push(entry);
      }
      return;
    }

    const vol = collection.volume || 1;
    if (!volumesMap.has(vol)) {
      volumesMap.set(vol, { volume: vol, units: new Map<number, any>() });
    }

    const volumeEntry = volumesMap.get(vol);
    // Use the first unit in the array or 0 for "General/Review"
    const unitId = collection.units && collection.units.length > 0 ? collection.units[0] : 0;

    if (!volumeEntry.units.has(unitId)) {
      volumeEntry.units.set(unitId, { unit: unitId, exams: [] });
    }

    const unitEntry = volumeEntry.units.get(unitId);
    
    // Add exams from this collection
    collection.exams.forEach((exam: any) => {
      const isCompleted = completedExamIds.has(exam.id) || completedExamTitles.has(exam.title);
      unitEntry.exams.push({
        id: exam.id,
        title: exam.title,
        exam_number: exam.exam_number,
        total_questions: exam.total_questions,
        collection_title: collection.title,
        is_completed: isCompleted
      });
    });
  });

  // Add final exam placeholder for Grade 3 if not present
  if (targetGrade === 3 && subjectSlug === 'toan') {
    const hasFinal = reviews.some(r => r.title.includes('cuối học kỳ 1') || r.title.includes('cuối kỳ 1'));
    if (!hasFinal) {
      reviews.push({
        id: 'placeholder-final-1',
        title: 'Kiểm tra cuối học kỳ 1',
        description: 'Đề thi ôn tập củng cố kiến thức cuối học kì 1 (Đang biên soạn...)',
        exams: [],
        unit: 102
      });
    }
  }

  reviews.sort((a, b) => a.unit - b.unit);

  // Fetch actual unit names from curriculum_nodes for this subject and grade
  const unitInfoMap = new Map<number, { title: string; description?: string }>();
  try {
    let searchSlugs = [subjectSlug];
    if (subjectSlug === 'tieng_anh') {
      if (targetGrade === 7) {
        searchSlugs.push('tieng-anh-7');
        searchSlugs.push('mindset-ielts');
      }
    }

    const { data: subjectData } = await supabase
      .from('universal_subjects')
      .select('id')
      .in('slug', searchSlugs);

    if (subjectData && subjectData.length > 0) {
      const subjectIds = subjectData.map(s => s.id);
      const { data: sources } = await supabase
        .from('content_sources')
        .select('id')
        .in('subject_id', subjectIds);

      if (sources && sources.length > 0) {
        const sourceIds = sources.map(s => s.id);
        
        // Find course nodes matching the target grade to scope the units properly
        const { data: courseNodes } = await supabase
          .from('curriculum_nodes')
          .select('id')
          .in('source_id', sourceIds)
          .eq('type', 'course')
          .or(`slug.eq.lop-${targetGrade},slug.eq.grade-${targetGrade}`);

        if (courseNodes && courseNodes.length > 0) {
          const courseNodeIds = courseNodes.map(n => n.id);
          const { data: unitNodes } = await supabase
            .from('curriculum_nodes')
            .select('title, sort_key, metadata')
            .in('parent_id', courseNodeIds)
            .eq('type', 'unit');

          unitNodes?.forEach(node => {
            const key = node.sort_key || 0;
            if (key > 0) {
              unitInfoMap.set(key, {
                title: node.title,
                description: (node.metadata as any)?.description || (node.metadata as any)?.summary
              });
            }
          });
        }
      }
    }
  } catch (e) {
    console.error("Error fetching unit info:", e);
  }

  // Convert Maps to sorted arrays
  const lessonsResult = Array.from(volumesMap.values()).map(v => ({
    ...v,
    units: Array.from(v.units.values()).map((u: any) => {
      const info = unitInfoMap.get(Number(u.unit));
      return {
        ...u,
        title: info?.title || `Chủ đề ${u.unit}`,
        description: info?.description || `Các bài tập luyện tập củng cố kiến thức của chương ${u.unit}`
      };
    }).sort((a: any, b: any) => a.unit - b.unit)
  })).sort((a, b) => a.volume - b.volume);

  const reflexResult = Array.from(reflexVolumesMap.values()).map(v => ({
    ...v,
    exams: v.exams.sort((a: any, b: any) => a.exam_number - b.exam_number)
  })).sort((a, b) => a.volume - b.volume);

  return {
    lessons: lessonsResult,
    reviews: reviews,
    reflex: reflexResult
  };
}

export async function submitLesson(lessonId: string, isVictory: boolean, xp: number, streak: number) {
  // ... (rest of the function is unchanged)
  if (!isVictory) return { success: false };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };
  let { data: quiz } = await supabase.from("quizzes").select("id").eq("lesson_id", lessonId).limit(1).single();
  if (!quiz) {
    const { data: newQuiz, error: insertError } = await supabase.from("quizzes").insert({ lesson_id: lessonId, title: "Luyen Tap Runtime Quiz" }).select("id").single();
    if (insertError || !newQuiz) return { success: false, error: 'Failed to create quiz' };
    quiz = newQuiz;
  }
  await supabase.from("quiz_attempts").insert({ user_id: user.id, quiz_id: quiz.id, score: 100, total: 100 });
  await supabase.rpc('increment_xp', { user_id_param: user.id, amount: xp });
  await supabase.from('gamification_profiles').update({ streak: streak }).eq('user_id', user.id);
  return { success: true };
}
