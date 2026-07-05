import { z } from "zod";

/**
 * Core domain interfaces for the Universal Learning Engine.
 * These map to the schema defined in migration 016.
 */

export interface Subject {
  id: string;
  slug: string;
  name_vi: string;
  name_en?: string;
  description?: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentSource {
  id: string;
  subject_id: string;
  slug: string;
  name: string;
  provider?: string;
  version?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CanonicalConcept {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Concept {
  id: string;
  source_id?: string;
  slug: string;
  title: string;
  description?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  concept_id: string;
  slug: string;
  title: string;
  level: number;
  created_at: string;
  updated_at: string;
}

export type CurriculumNodeType = 'course' | 'module' | 'unit' | 'lesson' | 'step';

export interface CurriculumNode {
  id: string;
  source_id: string;
  parent_id?: string;
  type: CurriculumNodeType;
  slug: string;
  title: string;
  path: string; // Materialized path (LTree format: 'root.parent.child')
  depth: number;
  sort_key: number;
  metadata: Record<string, any>;
  assessment_config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Recursive tree structure for curriculum navigation
 */
export type TreeNode = CurriculumNode & {
  children?: TreeNode[];
};

export interface ExerciseSet {
  id: string;
  title: string;
  description?: string;
  type: 'quiz' | 'practice' | 'exam';
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Assessment & Review Engine Interfaces

export interface AssessmentTemplate {
  id: string;
  subject_id?: string;
  assessment_type: string;
  name: string;
  generation_rules: Record<string, any>;
  scoring_rules: Record<string, any>;
  review_rules: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AssessmentSession {
  id: string;
  user_id: string;
  template_id?: string;
  curriculum_node_id?: string;
  assessment_type: string;
  generated_by: string;
  generated_context: Record<string, any>;
  status: 'draft' | 'in_progress' | 'completed' | 'cancelled';
  score?: number;
  max_score?: number;
  mastery_delta: Record<string, any>;
  weak_concepts: string[];
  time_spent_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface AssessmentItem {
  id: string;
  session_id: string;
  question_id?: string;
  concept_id?: string;
  source_type: 'bank' | 'ai_generated';
  difficulty: 'easy' | 'medium' | 'hard';
  position: number;
  user_answer?: any;
  is_correct?: boolean;
  time_spent_seconds: number;
  hints_used: number;
  created_at: string;
}

export interface ConceptReview {
  id: string;
  user_id: string;
  concept_id: string;
  next_review_at: string;
  review_interval_days: number;
  review_strength: number;
  retention_score: number;
  last_reviewed_at?: string;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewSession {
  id: string;
  user_id: string;
  review_type: 'spaced_repetition' | 'targeted_weakness' | 'custom';
  generated_from: string;
  status: 'in_progress' | 'completed';
  score?: number;
  concepts_reviewed: string[];
  created_at: string;
  updated_at: string;
}

export interface ReviewItem {
  id: string;
  session_id: string;
  question_id?: string;
  concept_id?: string;
  priority_score: number;
  user_answer?: any;
  is_correct?: boolean;
  reviewed_at: string;
}

export interface UserConceptMastery {
  id: string;
  user_id: string;
  concept_id: string;
  subject_slug?: string;
  mastery_score: number;
  confidence_score: number;
  attempts: number;
  correct_attempts: number;
  last_reviewed_at: string;
  last_attempt_at?: string;
  next_review_at?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Zod Schemas for Runtime Validation

export const CurriculumNodeSchema = z.object({
  id: z.string().uuid(),
  source_id: z.string().uuid(),
  parent_id: z.string().uuid().optional(),
  type: z.enum(['course', 'module', 'unit', 'lesson', 'step']),
  slug: z.string(),
  title: z.string(),
  path: z.string(),
  depth: z.number().int().min(0),
  sort_key: z.number().int(),
  metadata: z.record(z.string(), z.any()),
  assessment_config: z.record(z.string(), z.any()),
});

export const ConceptSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.any()),
});
