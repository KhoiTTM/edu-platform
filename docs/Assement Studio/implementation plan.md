# IMPLEMENTATION PLAN V3

# Curriculum-Driven EdTech Platform

# (English Grade 3 First)

> This implementation plan replaces older AI-first architectures.
>
> The platform MUST be curriculum-first, deterministic-first, validation-first.
>
> AI is ONLY an enhancement layer.

---

# CORE PHILOSOPHY

The system architecture MUST follow:

```text id="ow0rzd"
CURRICULUM
→ CONCEPTS
→ BLUEPRINTS
→ DETERMINISTIC GENERATION
→ VALIDATION
→ QUESTION BANK
→ GAMEPLAY / ASSESSMENT
```

NOT:

```text id="7x0n8d"
PROMPT
→ AI
→ RANDOM QUESTIONS
```

---

# PRIMARY GOALS

Build:

* curriculum-aligned learning system
* reusable question bank
* Duolingo-style gameplay
* Assessment Studio
* scalable educational infrastructure

---

# CURRENT IMPLEMENTATION PRIORITY

Current scope:

```text id="k4xj7s"
English Grade 3
Global Success
Vietnamese Ministry Curriculum
```

DO NOT overbuild:

* multi-subject systems
* generalized AI agents
* enterprise infra

Prepare extension boundaries only.

---

# FINAL PLATFORM ARCHITECTURE

```text id="v4mkxy"
SGK PDF
↓
Curriculum Extraction Layer
↓
Canonical Curriculum Database
↓
Concept Graph System
↓
Question Blueprint Engine
↓
Deterministic Question Generators
↓
Validation Engine
↓
Question Bank
↓
 ┌───────────────────────┬───────────────────────┐
 │                       │                       │
English World            Assessment Studio       Adaptive Engine
```

---

# MOST IMPORTANT RULES

# RULE 1

Gameplay runtime MUST NEVER depend on realtime AI generation.

---

# RULE 2

All questions MUST be:

* generated offline
* validated
* saved permanently
* reusable forever

---

# RULE 3

AI MUST NEVER:

* invent curriculum
* invent unsupported grammar
* invent vocabulary outside lesson scope

---

# RULE 4

AI SHOULD ONLY:

* generate distractors
* paraphrase
* generate explanations
* generate safe variations

---

# RULE 5

Question quality is MORE IMPORTANT than generation quantity.

---

# PHASE 1 — CURRICULUM EXTRACTION FOUNDATION

STATUS:
FIRST CRITICAL FOUNDATION

---

# GOAL

Build canonical curriculum infrastructure.

---

# IMPORTANT

Questions MUST NOT be generated directly from PDF.

Correct flow:

```text id="8d1u5o"
PDF
→ extraction
→ review
→ canonical curriculum JSON
→ database
```

---

# REQUIRED SYSTEMS

## 1. Curriculum Extractor

Purpose:
Extract structured curriculum data from textbook PDFs.

---

# Initial Extraction Strategy

DO NOT fully automate initially.

Use:

```text id="i5vph5"
AI-assisted extraction
+
human review
```

---

# Extract:

* units
* lessons
* activities
* vocabulary
* sentence patterns
* grammar scope
* learning objectives
* dialogues
* phonics

---

# Example Extracted Object

```json id="4oc2q0"
{
  "unit": 1,
  "lesson": 1,
  "activity": "Look, listen and repeat",
  "vocabulary": [
    "hello",
    "hi"
  ]
}
```

---

# Source Anchors (MANDATORY)

EVERY extracted concept MUST contain:

```json id="f61m08"
{
  "book": "Global Success 3",
  "unit": 1,
  "lesson": 1,
  "page": 10,
  "activity": "Look, listen and repeat"
}
```

Questions without source anchors are INVALID.

---

# PHASE 2 — CANONICAL CURRICULUM DATABASE

STATUS:
CRITICAL FOUNDATION

---

# GOAL

Build reusable curriculum infrastructure.

---

# TABLES

## curriculum_units

```sql id="jlwmty"
id
subject
grade
curriculum
book_name
unit_number
title
metadata_json
```

---

## curriculum_lessons

```sql id="kvdv7k"
id
unit_id
lesson_number
title
page_start
page_end
summary
metadata_json
```

---

## curriculum_concepts

```sql id="pgnnfa"
id
lesson_id
concept_type
content_json
difficulty
source_anchor
metadata_json
```

---

# Concept Types

Initial English Grade 3 support:

```text id="tx42if"
vocabulary
sentence_pattern
dialogue
phonics
listening
grammar_micro_pattern
```

---

## concept_dependencies

Purpose:
Create concept graph system.

```sql id="k9k0nd"
id
concept_id
depends_on_concept_id
relationship_type
```

---

# IMPORTANT

This dependency graph will later power:

* adaptive learning
* mastery tracking
* spaced repetition
* personalized review

---

# PHASE 3 — QUESTION BLUEPRINT ENGINE

STATUS:
CORE EDUCATIONAL ARCHITECTURE

---

# GOAL

Create reusable pedagogy-driven exercise blueprints.

---

# IMPORTANT

Question type != UI component.

Blueprints MUST be:

* pedagogy-driven
* curriculum-aware
* reusable

---

# EXAMPLE BLUEPRINT

```json id="z0wz13"
{
  "blueprint_id": "vocab_recall_tap",

  "pedagogy_type": "recall",

  "interaction_type": "tap",

  "supported_concepts": [
    "vocabulary"
  ],

  "difficulty_scaling": true
}
```

---

# PEDAGOGY TYPES

```text id="2zdkb7"
recall
recognition
comprehension
application
sequencing
classification
```

---

# INTERACTION TYPES

```text id="16uqmr"
tap
drag
reorder
match
type
speak
```

---

# INITIAL BLUEPRINTS

## Vocabulary

* vocab_to_image
* image_to_vocab
* tap_correct_word
* listen_choose_word
* match_word_meaning

---

## Sentence Patterns

* sentence_reorder
* fill_blank
* dialogue_completion
* choose_correct_response

---

## Listening

* listen_and_choose
* audio_sequence

---

## Review

* mixed_review
* boss_challenge

---

# PHASE 4 — DETERMINISTIC QUESTION GENERATORS

STATUS:
MOST IMPORTANT CONTENT SYSTEM

---

# GOAL

Generate stable curriculum-aligned questions WITHOUT relying on AI creativity.

---

# IMPORTANT

The SYSTEM generates structure.

AI only enhances.

---

# CORRECT FLOW

```text id="0x4nrz"
Concept
→ Blueprint Selection
→ Deterministic Generator
→ AI Enhancement
→ Validation
→ Question Bank
```

---

# WRONG FLOW

```text id="s5jlwm"
Context
→ Gemini
→ Raw Questions
```

---

# REQUIRED GENERATORS

Create:

```text id="z0rdqk"
lib/question-bank/generators/
```

---

# Generator Functions

```ts id="q28p8u"
generateTapWordQuestion()
generateMatchPairQuestion()
generateSentenceReorderQuestion()
generateDialogueQuestion()
generateFillBlankQuestion()
```

---

# EXAMPLE

## Input Concept

```json id="utklw8"
{
  "word": "dog"
}
```

---

## Blueprint

```text id="w4j2vs"
tap_correct_word
```

---

## Output

```json id="jfqk5z"
{
  "type": "tap_correct_word",

  "instruction": "Tap the word for dog",

  "choices": [
    "dog",
    "cat",
    "bird",
    "fish"
  ],

  "correct_answer": "dog"
}
```

Generated primarily by deterministic logic.

NOT AI imagination.

---

# PHASE 5 — VALIDATION ENGINE

STATUS:
CRITICAL SYSTEM

---

# GOAL

Reject hallucinations and low-quality questions.

---

# REQUIRED VALIDATION LAYERS

## 1. Structural Validation

Validate:

* schema correctness
* malformed JSON
* required fields

Use:

* Zod

---

## 2. Curriculum Validation

Validate:

* vocabulary belongs to lesson
* grammar belongs to lesson
* concept belongs to unit

---

## 3. Lexical Scope Validation

VERY IMPORTANT.

Question MUST ONLY use:

* allowed vocabulary
* allowed sentence patterns
* allowed grammar scope

---

# Example Invalid Case

Lesson vocabulary:

* hello
* name

Generated question contains:

* elephant

→ REJECT.

---

## 4. Semantic Validation

Validate:

* correct answer exists
* distractors unique
* no ambiguous options

---

## 5. Grade-Level Validation

For Grade 3:

* short instructions
* simple wording
* minimal reading load

---

## 6. Duplicate Detection

Prevent:

* repeated questions
* repeated distractors
* near-duplicate exercises

---

# QUESTIONS FAILING VALIDATION MUST NEVER BE SAVED.

---

# PHASE 6 — QUESTION BANK SYSTEM

STATUS:
CORE CONTENT INFRASTRUCTURE

---

# GOAL

Create reusable validated educational content.

---

# IMPORTANT RULE

Question bank is the SINGLE SOURCE OF TRUTH.

---

# TABLE

## question_bank

```sql id="ysf1x9"
id
subject
grade
curriculum
unit_id
lesson_id
concept_ids
blueprint_id
difficulty
question_data
source_anchor
validation_score
generated_by
approved_by
status
created_at
```

---

# QUESTION LIFECYCLE

```text id="6h4gqj"
Generated
→ Validated
→ Draft
→ Human Review
→ Approved
→ Saved
→ Reused Forever
```

---

# IMPORTANT

NO gameplay runtime generation.

EVER.

---

# PHASE 7 — ASSESSMENT STUDIO

STATUS:
TEACHER TOOLING SYSTEM

---

# GOAL

Build AI-assisted curriculum-aware exam generation.

---

# ROUTE

```text id="99gt2m"
/assessment-studio
```

---

# PURPOSE

Allow:

* AI-assisted exam generation
* teacher review
* exam storage
* question bank reuse
* curriculum-aware testing

---

# IMPORTANT

Assessment Studio is OFFLINE generation infrastructure.

NOT runtime gameplay AI.

---

# REQUIRED TABLES

## assessment_collections

```sql id="m5o2ti"
id
title
subject
grade
curriculum
semester
exam_type
difficulty
prompt
status
created_by
created_at
```

---

## exams

```sql id="h3zqwn"
id
collection_id
exam_number
title
duration_minutes
total_questions
generation_mode
created_at
```

---

## exam_questions

```sql id="l1o7z7"
id
exam_id
question_bank_id
order_index
points
```

---

## assessment_sources

```sql id="rs9ezt"
id
title
subject
grade
source_type
file_url
metadata_json
uploaded_by
created_at
```

---

# SOURCE TYPES

```text id="oywv4n"
textbook
sample_exam
worksheet
teacher_note
review_material
mock_test
```

---

# ASSESSMENT GENERATION FLOW

```text id="6nmp6v"
Teacher Prompt
→ Curriculum Retrieval
→ Question Bank Retrieval
→ Reference Retrieval
→ Blueprint Selection
→ Deterministic Structure Generation
→ AI Enhancement
→ Validation
→ Draft Exam
→ Human Review
→ Save
```

---

# IMPORTANT

DO NOT:

```text id="6isjlwm"
Prompt
→ Gemini
→ Final Exam
```

---

# REVIEW SCREEN

Teacher/admin can:

* edit question
* regenerate question
* delete question
* reorder question
* approve question

---

# PHASE 8 — ENGLISH WORLD GAMEPLAY

STATUS:
PLAYER EXPERIENCE LAYER

---

# GOAL

Build Duolingo-style learning experience.

---

# FEATURES

## World Map

* floating islands
* animated nodes
* lesson progression
* review nodes
* boss nodes

---

## Lesson Runtime

```text id="yqnigq"
Question
→ Answer
→ Feedback
→ XP
→ Next Question
```

---

# IMPORTANT

Gameplay uses ONLY:

* validated DB questions
* offline generated content

---

# NEVER:

```text id="jlwm2c"
Generate realtime AI questions during gameplay
```

---

# PHASE 9 — ADAPTIVE LEARNING ENGINE

STATUS:
POST-STABLE CONTENT SYSTEM

---

# GOAL

Personalized review and mastery tracking.

---

# REQUIRED TABLES

## mastery_tracking

```sql id="x95jqa"
user_id
concept_id
mastery_score
correct_streak
last_reviewed_at
```

---

## adaptive_review_queue

```sql id="xv8d1o"
user_id
concept_id
next_review_at
priority
```

---

# ADAPTIVE FLOW

```text id="wff4jc"
Weak Concepts
→ Review Queue
→ Review Nodes
→ Mastery Improvement
```

---

# IMPORTANT

Adaptive logic MUST rely on:

* concept graph
* concept dependencies
* validated curriculum concepts

---

# PHASE 10 — AI ENHANCEMENT LAYER

STATUS:
SAFE AI LAYER

---

# IMPORTANT

AI is NOT the core engine.

AI is only:

* enhancement
* variation
* explanation
* distractor generation

---

# AI MAY:

* generate distractors
* paraphrase
* explain answers
* create safe variants

---

# AI MUST NEVER:

* invent curriculum
* invent unsupported grammar
* create out-of-scope vocabulary

---

# SAFE AI FLOW

```text id="6ff5wn"
Deterministic Question
→ AI Enhancement
→ Re-validation
→ Save
```

---

# PHASE 11 — FUTURE MULTI-SUBJECT SUPPORT

STATUS:
FUTURE EXPANSION

---

# GOAL

Prepare scalable architecture boundaries.

---

# FUTURE SUBJECTS

* Math
* Science
* IELTS
* Vietnamese

---

# IMPORTANT

DO NOT fully build multi-subject systems now.

ONLY create clean extension boundaries.

---

# SUGGESTED STRUCTURE

```text id="qskm80"
subjects/
  english/
  math/
  science/
```

---

# PHASE 12 — ENGINEERING DISCIPLINE

STATUS:
MANDATORY OPERATIONAL RULES

---

# RULES

## ALWAYS read docs before implementation

---

## ALWAYS update docs after implementation

---

## ALWAYS create future tasks for other agents

Store tasks in:

```text id="fqiv2m"
docs/tasks/
```

---

## ALWAYS create handoff docs

Store in:

```text id="aqjlwm"
docs/handoffs/
```

---

## NEVER leave dev server running forever

Correct workflow:

```text id="e3up9m"
Run dev
→ Test
→ Stop dev
```

---

## ALWAYS use deterministic systems first

---

## ALWAYS validate before saving

---

# FINAL PLATFORM VISION

The platform should eventually become:

```text id="22jjlwm"
Curriculum Infrastructure
+
Question Bank Platform
+
Assessment Engine
+
Adaptive Learning System
+
Gamified Learning Experience
```

NOT:

```text id="6dz9kn"
Random AI Question Generator
```
