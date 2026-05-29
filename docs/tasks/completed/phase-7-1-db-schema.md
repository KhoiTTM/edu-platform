# TASK: PHASE 7.1 — ASSESSMENT STUDIO DATABASE SCHEMA

# GOAL
Implement the foundational database tables required to support the Assessment Studio's data model in Supabase.

# BACKGROUND CONTEXT
The Assessment Studio needs to store metadata about collections, specific exam instances, and the source materials used to generate them. It also requires junction tables to link these to the centralized `question_bank`.

# FILES INVOLVED
- `supabase/migrations/xxxx_assessment_studio_schema.sql`

# DB CHANGES
New tables to create:
1. `assessment_collections`: Metadata for groups of exams.
2. `exams`: Individual generated assessments.
3. `exam_questions`: Links exams to `question_bank` with order and point values.
4. `assessment_sources`: Registry of reference materials (PDFs, teacher notes).

# IMPLEMENTATION CHECKLIST
- [ ] Create `assessment_collections` table with RLS.
- [ ] Create `exams` table with RLS.
- [ ] Create `exam_questions` table with cascade deletes.
- [ ] Create `assessment_sources` table.
- [ ] Add indexes on `grade`, `subject`, and `collection_id` for performance.
- [ ] Add `status` enum support ('draft', 'published', 'archived').

# VALIDATION CHECKLIST
- [ ] Run migration in local Supabase or staging.
- [ ] Verify RLS policies prevent unauthorized access.
- [ ] Verify foreign key constraints between `exam_questions` and `question_bank`.

# FUTURE EXTENSION NOTES
The schema is designed to scale to multi-subject by using generic `subject` and `grade` fields.
