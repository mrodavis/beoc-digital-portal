# Sentence Skills question bank

`bank.json` is the data behind `/eng0300/writing-lab/sentence-skills`. It is a
plain JSON file so the bank can be extended, corrected, or reordered **without
touching any component code**. Add an item to `questions`, save, rebuild.

## Provenance — read before adding items

Every item in this bank must be **original, written for BEOC Academic Bridge**.

Nothing here may be transcribed, adapted, or paraphrased from the Scoreboost
workbooks, the TABE Mastery student books, the Teacher's Manual, the Answer Key,
or any TABE practice test. Changing a few words in a workbook item produces a
derivative work and does not resolve the copyright problem. See
`docs/ENG0300_SOURCE_AUDIT.md`.

The bank is **ungraded practice**. Answers ship in the client bundle on purpose,
because immediate feedback is the point. No graded assessment, diagnostic, or
placement instrument belongs in this file.

## Shape

```jsonc
{
  "version": 1,
  "skills": [
    {
      "id": "fragments",           // stable slug, referenced by questions[].skill
      "label": "Fragments",        // shown on the filter button
      "blurb": "…"                 // one line, shown when the filter is active
    }
  ],
  "questions": [
    {
      "id": "fr-001",              // unique across the whole bank
      "skill": "fragments",        // must match a skills[].id
      "difficulty": "Foundation",  // Foundation | Developing | TABE Ready | Challenge
      "stem": "…",                 // the question as the student reads it
      "choices": ["…", "…", "…", "…"],
      "correct": 2,                // 0-based index into choices
      "why": ["…", "…", "…", "…"], // one line PER CHOICE, same length as choices
      "teach": "…"                 // the one-line rule to carry to the next item
    }
  ]
}
```

### Field rules

| Field | Rule |
|---|---|
| `id` | Unique across the file. Convention: skill prefix + three digits (`fr-001`, `ro-014`). |
| `skill` | Must match an `id` in `skills`. An unknown value makes the item unreachable by filter, so the loader drops it and logs in development. |
| `difficulty` | One of the four listed values, matching `Difficulty` in `types/eng0300.ts`. |
| `correct` | Must be a valid index into `choices`. |
| `why` | **Same length as `choices`.** This is the whole point of the engine — a bare right/wrong is not worth building. Write the entry for the correct choice as confirmation ("Correct. …"), and each wrong entry as *why that specific answer is wrong*, not a restatement of the rule. |
| `teach` | One sentence. Shown after answering, under the per-choice reasoning. |

### The `why` array is not optional

A student who picks a comma splice needs to be told *why that particular
sentence is a comma splice* — not "this is incorrect". Items whose `why`
entries only restate the stem should be rewritten before they are added.

## Validating the bank

`lib/content/eng0300/writing/sentence-skills/index.ts` validates on import and
throws on a malformed bank rather than shipping a broken practice set: unknown
skill ids, duplicate question ids, out-of-range `correct`, and a `why` array
whose length does not match `choices` are all build-time failures.

## Current coverage

`skills` carries the seven skills the course practises. Item counts per skill
are printed on the landing page and are derived from the file, so they stay
honest as the bank grows — no count is hardcoded in markup.
