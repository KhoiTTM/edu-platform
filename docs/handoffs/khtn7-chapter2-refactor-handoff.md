# What was implemented
Refactored the KHTN 7 Chapter 2 implementation to follow proper architecture.

# Files changed
- scripts/seed-khtn7-chapter2-content.ts: Refactored to seed semantic concepts ('khtn7-phan-tu', 'khtn7-don-chat', etc.) and removed raw question insertion.
- scripts/generators/khtn7/chapter2-blueprints.ts: Implemented pure TypeScript `generator()` functions for deterministic question generation.

# DB migrations
None (used existing tables).

# APIs added
None.

# Validation added
- Verified concept seeding.
- Verified blueprint generators with unit tests (verified 10+ varied questions).

# Known limitations
- Generators are basic and currently only cover a small set of compounds.

# Recommended next tasks
- Expand generator logic for more compounds and complex chemistry problems.
- Integrate these blueprints into the Assessment Studio API.

# Risks / technical debt
None.
