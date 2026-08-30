# ENG0300 Source Material Audit

**Course:** ENG0300 – Reading for Academics (Academic Bridge)
**Source location (local, outside the repository):** `~/Downloads/Academic Bridge Materials/`
**Audit date:** 2026-08-30
**Auditor:** Development audit performed while building the ENG0300 Reading Lab.

---

## 1. Audit method and scope

All 14 source files were located by recursive inspection of the source directory. For each file:

- page counts were read with `pdfinfo`;
- a text-layer extraction was attempted with `pdftotext -layout`;
- representative pages were rendered to images and read visually, because no PDF has a text layer.

**Important limitation:** this audit is based on a **structural review plus a page sample**, not a page-by-page reading of all ~274 pages. Unit scope was determined from unit-opener pages, strategy headers, and the Answer Key's own strategy/page index, then cross-checked against the page ranges assigned in the syllabus. Where a conclusion rests on inference rather than direct observation, it is marked as such.

### Finding that applies to every PDF

**All 13 PDFs are scanned images with no text layer.** `pdftotext` returns only form-feed characters (one byte per page) for every file. Practical consequences:

- The PDFs are **not searchable, not selectable, and not screen-reader accessible**. Serving them to students would create an accessibility problem independent of the copyright problem.
- They cannot be programmatically parsed, so no automated content extraction was possible or attempted.
- They are scans of print publications, which is itself relevant to the copyright analysis below.

---

## 2. File-by-file audit

### 2.1 Syllabus

| Field | Finding |
|---|---|
| **File** | `ENG0300 Syllabus - Academic Bridge (v5).docx` (22 KB) |
| **Contains** | SUNY/BEOC course syllabus: course description, 12 learning outcomes, textbooks section (blank), course structure, make-up and attendance policy, accommodations, academic integrity, out-of-class work policy, netiquette, instructional methodology, grading breakdown (Classwork 55% / Homework 30% / Attendance 15%), the grade-point table, and a 7-week / 14-meeting course outline with in-class activities and homework. |
| **Student-safe** | **Yes.** This is the students' own syllabus, authored by BEOC. |
| **Copyright concern** | None. Institutional document. |
| **Competency supported** | **All ten.** This is the authoritative source for outcomes and sequence. |
| **Contains answer keys** | No. |
| **Contains assessments** | No. It references a diagnostic and a progress practice test but contains neither. |
| **Instructor-only storage** | Not required. |
| **Recommendation** | **Used as the authoritative source.** Outcomes are reproduced in `lib/content/eng0300/course.ts` and the 14-meeting outline in `lib/content/eng0300/roadmap/index.ts`. Three fields were left blank in the source (term, textbooks, technical/tutoring contacts) and are **not** invented anywhere in the build. |

---

### 2.2 Scoreboost for TABE — Reading, Level M (New Readers Press)

Publisher confirmed by the copyright line printed on the pages sampled: **"© New Readers Press. All rights reserved."**

| File | Pages | Contents (verified) | Student-safe | Answer key | Assessment | Instructor-only |
|---|---|---|---|---|---|---|
| `Tabe Unit 1.pdf` | 14 | Unit 1 *Word Recognition*. Strategy 1 Read Multisyllable Words (pp. 4–6), Strategy 2 Define Words and Phrases (pp. 7–11), Strategy 3 Understand Figurative Language (pp. 12–15), Unit 1 Review (pp. 16–18). Instructional prose, reference tables, worked examples, "Test Tip" boxes, practice items. | **No** | No | Practice items only | Not required, but do not publish |
| `Tabe Unit 2.pdf` | 24 | Unit 2 *Main Ideas and Details*, beginning at p. 19 with Strategy 4 *Use Details to Explain Meaning*. Literary and informational passages with item sets. | **No** | No | Practice items only | Not required, but do not publish |
| `Tabe Unit 3.pdf` | 20 | Unit 3 *Structure and Point of View*, beginning at p. 43 with Strategy 9 *Describe and Compare Text Structures* (five-structure table with clue words; "Workplace Connection" box). Point-of-view strategies follow. | **No** | No | Practice items only | Not required, but do not publish |
| `Tabe Unit 4.pdf` | 16 | Unit 4 *Interpretation and Evidence*, beginning at p. 63 with Strategy 12 *Interpret Information* (maps, graphs, charts, diagrams, timelines, video, interactive media). Strategies 13 *Find and Combine Information* and 14 *Use Reason and Evidence* follow. | **No** | No | Practice items only | Not required, but do not publish |
| `Tabe Pactice Test.pdf` *(filename misspelled in source)* | 11 | A full TABE-style Reading practice test. | **No** | No | **Yes — full practice test** | **Yes** |
| `Answer Key.pdf` | 6 | **Complete answer key** for the Scoreboost units, organized by strategy and page range, with correct answers *and* full answer explanations. Page 90 of the print book onward. | **No — never** | **Yes** | Keys to all unit items | **Yes — highest sensitivity** |

**Competency coverage (Scoreboost):** Unit 1 → Vocabulary in Context + Figurative Language. Unit 2 → Main Ideas & Details, Summarizing, Inferences. Unit 3 → Text Structure, Point of View & Purpose. Unit 4 → Visual/Quantitative Information, Integrating Across Sources, Evidence & Argument Quality.

---

### 2.3 TABE Mastery Reading, Level M — Student Book (New Readers Press)

Same publisher and same copyright line on sampled pages.

| File | Pages | Contents (verified) | Student-safe | Answer key | Assessment | Instructor-only |
|---|---|---|---|---|---|---|
| `Pretest.pdf` | 8 | **A scored diagnostic pretest.** Sampled page 5 shows a passage ("The Rocky Mountain Coyote," excerpted in the book from *Wild Animals of the Rockies*) with numbered multiple-choice items covering definition, vocabulary in context, detail, summary, inference, and point of view. | **No** | No (key is in the Teacher's Manual / book back matter) | **Yes — diagnostic instrument** | **Yes** |
| `Unit 1.pdf` | 24 | Unit *Word Recognition* (opens p. 13). Stated scope: letter sounds, word parts and syllable patterns; domain-specific words and phrases; defining words from context clues; identifying types of figurative language. | **No** | No | Practice items only | Not required, but do not publish |
| `Unit 2.pdf` | 42 | Unit *Main Ideas and Details*. Stated scope: theme and details in literary texts; main ideas and details in informational texts; making inferences; using quotes to support analysis; summarizing. | **No** | No | Practice items only | Not required, but do not publish |
| `Unit 3.pdf` | 25 | Unit *Structure and Point of View* (opens p. 79). Stated scope: recognizing structures in informational texts; identifying point of view in literary texts; analyzing point of view in informational texts. | **No** | No | Practice items only | Not required, but do not publish |
| `Unit 4.pdf` | 34 | Unit *Interpretation and Evidence* (opens p. 104). Stated scope: interpreting visual/oral/interactive information; explaining how it aids understanding; finding answers across more than one print or digital source; writing or speaking from several texts on one topic; explaining how an author uses reasons and evidence. | **No** | No | Practice items only | Not required, but do not publish |
| `Tabe Test Practice.pdf` | 10 | End-of-book TABE Test Practice — modeled test items. | **No** | No | **Yes — practice test** | **Yes** |

---

### 2.4 Instructor material

| Field | Finding |
|---|---|
| **File** | `Teahcer's_Manual_Tabe_Mastery_Reading_level_M.pdf` (40 pages; filename misspelled in source) |
| **Contains** | "To the Teacher" front matter for the TABE Mastery series: how the books are built, the scaffolding model (Learn the Skill → Guided Practice → Independent Practice → Lesson Review → Unit Skill Check → TABE Test Practice), alignment to TABE 13&14 blueprints and CCR standards, and pedagogical guidance. States explicitly that each book's pretest has an **answer key and diagnostic chart**, and that answer explanations accompany practice items. |
| **Student-safe** | **No — absolutely not.** |
| **Copyright concern** | **Yes.** © New Readers Press. |
| **Competency supported** | All — but as *instructional design guidance*, not as student content. |
| **Contains answer keys** | Contains and/or points to answer keys and diagnostic scoring. Treat the entire file as key-bearing. |
| **Contains assessments** | Scoring and diagnostic information for the assessments. |
| **Instructor-only storage** | **Yes — highest sensitivity, alongside the Answer Key.** |
| **Recommendation** | **Analyzed during development only.** Its scaffolding model informed the seven-stage skill-page architecture (Learn → See It → Try It → Practice → Challenge → Answer Review → Mastery Check). No text, item, key, or chart from it appears anywhere in the codebase. |

---

## 3. Copyright analysis

**Every PDF in the source set is a scan of a copyrighted commercial publication.** The copyright line "© New Readers Press. All rights reserved." was observed directly on sampled pages of the Scoreboost units, the Scoreboost Answer Key, the TABE Mastery student units, the TABE Mastery Pretest, and the Teacher's Manual. TABE® is a registered trademark referenced throughout.

Additional concerns identified:

1. **These are scans, not licensed digital editions.** Nothing in the file set indicates a digital distribution licence. Scanning a print workbook does not create a right to redistribute it.
2. **Third-party content inside the source.** The TABE Mastery Pretest passage is itself excerpted from another work (*Wild Animals of the Rockies*), so at least some passages carry a second layer of rights held by someone other than the publisher.
3. **Consumable workbooks.** Scoreboost and TABE Mastery are sold as consumables — per-student purchase is the publisher's business model, which makes redistribution the use publishers most actively enforce against.
4. **Accessibility.** As image-only scans with no text layer, these files would fail screen-reader access if published, creating a Section 504/508 exposure on top of the copyright exposure.

### Conclusion

**No file in the source set is safe to publish to students through this portal — not the units, not the practice tests, not the pretest, and certainly not the Answer Key or Teacher's Manual.** The only publishable source document is the BEOC syllabus itself.

This finding drove the implementation: **100% of student-facing passages, questions, explanations, and figures in the Reading Lab are original, written for BEOC Academic Bridge.** The commercial materials informed *which skills to teach, in what order, and in what question style* — the uncopyrightable facts of curriculum design — and nothing more.

---

## 4. Security handling implemented

| Protection | Status |
|---|---|
| No source PDF copied into the repository | ✅ Verified — `find` over the repo returns zero PDFs |
| No source PDF placed in `/public` | ✅ Verified |
| No answer key or manual text in the client bundle | ✅ Verified — no transcribed content exists in any file |
| No API route serving instructor material | ✅ No API routes were added |
| No predictable URL exposing instructor material | ✅ Nothing is served; there is no URL to guess |
| Instructor material remains outside the project | ✅ Files stay in `~/Downloads/Academic Bridge Materials/`, never copied, never modified |
| Resources page states what is withheld and why | ✅ `lib/content/eng0300/resources/index.ts` → `withheldMaterials` |
| Rule documented in code for future contributors | ✅ Header comments in `types/eng0300.ts`, `resources/index.ts`, `tabe/index.ts`, and each skill content file |

**On client-side answers.** Practice items in the Reading Lab do carry `correctAnswer` values in the client bundle. This is deliberate and is confined to **ungraded practice**, which needs immediate feedback to be useful. It is isolated from official assessment: no diagnostic, pretest, or exam key exists anywhere in this codebase, and the UI states on the dashboard, the Practice Center, and every skill page that nothing here is graded or recorded. Official assessment remains in Brightspace and under instructor administration.

---

## 5. Recommendations

1. **Keep the source files where they are.** Do not move them into the repository, even in a git-ignored folder — an ignored file is one `git add -f` away from publication.
2. **Do not build a student-facing download of any source PDF** without written permission from New Readers Press. If BEOC obtains a site licence, revisit this — and address the missing text layer before serving the files, or they will be inaccessible.
3. **Homework page ranges are safe to publish and are published.** Citing "Scoreboost for TABE Level M: Reading, pp. 31–34" is a reference, not a reproduction. Students use their own copies.
4. **If instructor-facing hosting is ever wanted,** it requires real authentication first. This application currently has **none** — no auth library, no middleware, no session handling. Building an instructor dashboard without that would be security theatre. No instructor dashboard was built.
5. **When authoring new practice content,** write original passages. Adapting a workbook passage by changing a few words is a derivative work and does not resolve the copyright issue.
6. **Verify with the publisher before any TABE-branded claim.** The Reading Lab describes itself as TABE-*aligned* preparation and never reproduces TABE items.
