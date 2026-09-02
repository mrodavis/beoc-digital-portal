# ENGL0150 — Authored additions

The ENGL0150 build specification (Section 9) said not to fabricate course
content, and to mark gaps `[INSTRUCTOR TO CONFIRM]` instead. The course was
first built that way, with 12 visible placeholders. It was then decided to
complete them so the site could run as a full course.

This file records **everything on the site that did not come from the
Instructor's Guide or the syllabus**, so Prof. Dascher and Prof. Davis can
review, keep, or override any of it. Each item names what was missing, what
was written, and the reasoning.

Everything listed here is a small edit in one data file. None of it is
structural.

---

## 1. Topic 1 — Essential Question

**Missing:** the guide supplies no Essential Question for the orientation
session, though every other topic has one and Section 3 makes the seven-section
template non-negotiable.

**Written:** *"Why does writing matter in healthcare, and how does anyone
actually get better at it?"*

**Reasoning:** built from the guide's own "Questions to think about" for Topic
1, which pair a purpose question with a growth question. The second half
carries the session's reassurance — that writing is learnable — which the
guide's closing line also states.

**File:** `lib/content/engl0150/topics/topic1.ts`

---

## 2. Topic 1 — Grammar Focus

**Missing:** the guide assigns no grammar to Topic 1; explicit instruction
begins with the Topic 2 diagnostic.

**Written:** a preview section listing the diagnostic categories students will
meet next session, plus a short explanation of how spiraling works.

**Reasoning:** this introduces no grammar scope that is not already in the
guide — every item listed is a Topic 2 diagnostic category. It fills the
section without inventing content, and it sets the expectation that skills
recur rather than being taught once. If you would rather Topic 1 carry no
Grammar Focus at all, delete the array.

**File:** `lib/content/engl0150/topics/topic1.ts`

---

## 3. Topic 1 — Cumulative Workplace Product

**Missing:** the guide describes a writing warm-up rather than a workplace
product, though the course map names "Professional self-introduction (writing
warm-up)" as this session's product.

**Written:** a two-part product — a self-introduction to the class, and the
guide's verbatim warm-up prompt.

**Reasoning:** the course map already names the product; this writes it up in
the template's shape. The warm-up prompt is quoted exactly as the guide gives
it, including "This is not a grammar test."

**File:** `lib/content/engl0150/topics/topic1.ts`

---

## 4. Topic 7 — Grammar Focus items

**Missing:** the guide directs this topic to "revisit earlier grammar topics"
without naming which.

**Written:** four items — subject–verb agreement (Topic 2), clear pronoun
reference (Topic 3), fragments and run-ons (Topics 2 and 6), and commonly
confused words.

**Reasoning:** these were selected as the errors most likely to reach a patient
in a short message. A long document gives a reader context to recover an
ambiguous pronoun from; a two-line portal message does not. Short messages are
also written fastest and proofread least.

**File:** `lib/content/engl0150/topics/topic7.ts`

---

## 5. Topic 8 — session count

**The conflict:** the guide's summary table says 1 session; its detailed
outline heading says 2.

**Resolved to:** 1 session.

**Reasoning:** two considerations, and this is a curriculum decision rather
than a source finding.

First, the calendar. Against the Fall 2026 BEOC calendar — Sept 7, Sept 21, and
Oct 12 closed — Aug 31 to Oct 26 on a Monday/Wednesday pattern yields roughly
14 sessions against the guide's recommended 15–16. A session has to come from
somewhere.

Second, of the three Unit 3 products, the referral is the most self-contained.
Its required elements are a checklist rather than a craft judgment, which is
exactly what the missing-information exercise is built around. Patient
instructions (Topic 6) and patient messages (Topic 7) both need drafting and
revision time that a referral does not.

**If you disagree,** change `sessions` to `"2"` in the topic file. The other
compression options the build spec names are folding Topic 2 into Topic 1's
session, or moving the Advanced topics off the calendar entirely — which is
where they already sit.

**File:** `lib/content/engl0150/topics/topic8.ts`

---

## 6. Advanced topics A–D — session counts

**Missing:** the guide supplies no session counts for the optional additional
topics.

**Written:** 1 session each.

**Reasoning:** each has a single cumulative product and a single grammar focus,
which is the shape of every one-session topic in the guide. They are marked
optional and are not on the Fall 1 calendar, so this figure is for planning
rather than scheduling.

**File:** `lib/content/engl0150/topics/advanced.ts`

---

## 7. Topic 10 — spelling list

**Missing:** the guide lists no spelling words for Topic 10.

**Written:** Word Bank List 14 — revision, proofread, accuracy, evaluate,
suggestion, responsibility, confidentiality.

**Reasoning:** every word is drawn from Topic 10's own concept list in the
guide. Nothing here introduces vocabulary the topic does not already teach.

**File:** `lib/content/engl0150/wordLists.ts`

---

## 8. Final Assessment — Part 2 quiz

**Missing:** the guide specifies "a short grammar and spelling assessment" as
Part 2 without stating length, format, or item pool.

**Written:** 12 grammar items — three from each of the four categories in
Topic 10's spiraling error checklist — plus a spelling review across all 14
Word Bank lists.

**Reasoning:** the checklist categories are the guide's own, and drawing evenly
from them makes the review proportionate to what the course actually taught.
Twelve items is short enough to complete in a session alongside Part 1.

The page states plainly that this review is practice and that the graded
assessment is administered in class through Brightspace, so nothing here can be
mistaken for the real thing.

**File:** `lib/content/engl0150/final.ts`

---

## 9. Grading table — the Quizzes / Final disagreement

**The conflict:** the syllabus lists QUIZZES at 20%. The Brightspace gradebook
has no QUIZZES category and instead shows FINAL at 20%.

**Resolved to:** the site displays QUIZZES 20%, per the syllabus.

**Reasoning:** the build specification's own rule — the syllabus PDF is the
single source of truth for policy, and where the site and the syllabus
disagree, the syllabus wins. So the site shows the syllabus figure and the
**gradebook is what needs correcting**, not this page.

This remains an open item for the instructors, and it is Brightspace work
rather than repo work. It is listed in Section 8 of the build specification
alongside the two category typos (`CLASSWOR_ HOMEWORK`, `WRTING PORTFOLIO`).

**File:** `lib/content/engl0150/course.ts`

---

## Still genuinely open — not resolvable from the repo

These were not filled because nothing in the repo can settle them:

- **The overall session count.** ~14 available against 15–16 recommended.
  Resolving Topic 8 to 1 session closes part of the gap; the rest is a
  scheduling decision for the two instructors.
- **The Brightspace remediation list** in Section 8 of the build specification —
  stale spring quiz dates, quizzes not linked to grade items, the empty
  discussion description, the duplicate Amplify/discussion warm-up, and the
  category typos. All of it is LMS work in org unit 2883710.
- **Amplify activities.** Topic 1 references them; the site links out and
  describes them but cannot embed them.

---

## Practice item authorship

Separately from the placeholders above: the guide specifies formative activity
*types* (grammar drills, sorters, tone exercises) but supplies almost no
item-level content. All practice items across the course — drill sentences,
sorter statements, rewrite samples, tone samples, referral gaps, error-hunt
paragraphs — are authored to implement the guide's specified grammar points,
vocabulary, and concepts.

Every scenario is fictional. No real patient data, names, or facility names
appear anywhere in the course, including in test fixtures.
