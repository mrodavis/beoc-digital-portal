import { Lesson } from "@/types/lesson";

/** INFO 3035 — Working with AI: prompting and verification. */
export const cloudModule7Lessons: Lesson[] = [
  {
    slug: "writing-effective-prompts",
    title: "Writing Effective Prompts",
    description:
      "Get useful output from an AI tool by supplying the context, role, format, and constraints it cannot infer.",
    duration: "24 min",
    objectives: [
      "Identify the components of a well-formed prompt",
      "Supply context and constraints that shape output usefully",
      "Iterate on a prompt rather than accepting a first attempt",
      "Recognize tasks where a prompt will not help",
    ],
    sections: [
      {
        heading: "A vague prompt gets a generic answer",
        blocks: [
          {
            type: "scenario",
            role: "You draft patient communications at Lakeside Medical Associates.",
            text: "You type 'write a letter about missed appointments' and get four bland paragraphs that could belong to any organization, at a reading level most of your patients would struggle with, in a tone that sounds faintly like a debt collector. The tool was not wrong; it had nothing to work with.",
            task: "Learn to supply the context that turns a generic response into a usable draft.",
          },
          {
            type: "paragraph",
            text: "A model cannot infer your situation. It does not know your organization, your audience, your tone, or what a good answer looks like to you. Everything it does not know, it fills in with the most statistically average option — which is exactly why unspecified prompts produce bland output.",
          },
          {
            type: "table",
            caption: "The components of a useful prompt",
            columns: ["Component", "Supplies", "Example"],
            rows: [
              [
                "Role",
                "The perspective to write from",
                "You are an administrator at a small family medicine practice",
              ],
              [
                "Task",
                "What you want, specifically",
                "Draft a letter to a patient who missed a follow-up",
              ],
              [
                "Context",
                "The situation and audience",
                "The patient has a chronic condition needing regular monitoring",
              ],
              [
                "Format",
                "The shape of the output",
                "Three short paragraphs, under 200 words",
              ],
              [
                "Constraints",
                "Rules it must respect",
                "Plain language at a sixth-grade reading level; warm, never accusatory; no medical advice",
              ],
              [
                "Examples",
                "What good looks like",
                "Match the tone of this previous letter: [paste]",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Improving a prompt in three passes",
            task: "Turn 'write a letter about missed appointments' into a prompt that produces something usable.",
            steps: [
              {
                move: "Add the role and the audience.",
                why: "'You are an administrator at a small family medicine practice writing to a patient' immediately narrows register and vocabulary. Without it the model averages across every organization that has ever written about missed appointments, including debt collectors.",
              },
              {
                move: "Add the constraints that matter most to you.",
                why: "'Sixth-grade reading level, warm and non-accusatory, no medical advice, under 200 words.' Each constraint eliminates a failure mode you would otherwise have to fix by hand. The reading level constraint alone usually transforms the output.",
              },
              {
                move: "Add an example of the tone you want.",
                why: "Pasting a previous letter you were happy with communicates tone far more precisely than adjectives can. Models match demonstrated patterns much better than they follow descriptions of them.",
              },
              {
                move: "Iterate on what is still wrong, specifically.",
                why: "'The second paragraph sounds like a warning — rewrite it to emphasize that we want to help' is actionable. 'Make it better' is not. Treat it as a conversation with a competent drafter who cannot see your reaction.",
              },
            ],
            result:
              "A draft in the right register and length, needing edits rather than a rewrite.",
            takeaway:
              "Role, task, context, format, constraints. Everything you leave unstated is filled in with the most average option available.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Prompting is not a mystical skill and does not need a course of its own. It is mostly the ordinary discipline of stating what you want clearly — the same thing that makes a good email to a colleague. If you would have to explain something to a new temp before they could do the task, it belongs in the prompt.",
          },
          {
            type: "knowledge-check",
            question:
              "An AI tool returns generic, unusable text for a workplace writing task. What is the most likely cause?",
            options: [
              "The model is not capable enough for professional writing",
              "The prompt did not supply the role, audience, tone, and constraints the model cannot infer",
              "The task requires a paid subscription",
              "Generative models cannot produce workplace correspondence",
            ],
            correctIndex: 1,
            explanation:
              "Generic output is the signature of an underspecified prompt. The model fills every unstated dimension with the most average option, and the result reads like it could belong to anyone — because it was written for no one in particular.",
            optionRationales: [
              "Current models handle this task well when given adequate context. The limiting factor here is the input.",
              "Correct. Unstated context is filled in with averages, which is exactly what generic output is.",
              "Paid tiers offer more capacity, but a vague prompt produces vague output on any tier.",
              "Drafting correspondence is among the things these tools do best, given enough context.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Measure the difference context makes.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Give an AI tool a one-line prompt for a workplace writing task. Save the output.",
          "Rewrite the prompt with all six components from the table. Save that output too.",
          "Compare them and list every specific improvement. Note how much editing each would need before sending.",
          "Build a reusable prompt template for a task you do regularly, with bracketed placeholders for the parts that change.",
        ],
      },
    ],
  },
  {
    slug: "verifying-ai-output",
    title: "Verifying AI Output",
    description:
      "Build the checking habit that makes AI safe to use at work, and learn which tasks are appropriate to delegate to it at all.",
    duration: "24 min",
    objectives: [
      "Explain what a hallucination is and why it occurs",
      "Apply a verification process proportionate to the stakes",
      "Identify the categories of output that always require checking",
      "Decide which tasks are appropriate for AI assistance",
    ],
    sections: [
      {
        heading: "The failure mode is confident invention",
        blocks: [
          {
            type: "scenario",
            role: "You prepare a policy summary at Lakeside Medical Associates.",
            text: "You ask an AI tool to summarize the HIPAA requirements for records retention. The answer is well organized, appropriately hedged, and cites a specific section of the regulation with a specific retention period. The section number does not exist. Nothing in the response looked wrong.",
            task: "Build a verification habit strong enough that plausible errors do not reach anyone.",
          },
          {
            type: "paragraph",
            text: "A hallucination is output that is fluent, confident, and false. It happens because the model generates plausible continuations rather than retrieving verified facts — and a fabricated regulation citation is just as plausible-looking, statistically, as a real one. The model has no mechanism to tell the difference, which is why it presents both identically.",
          },
          {
            type: "table",
            caption: "What always needs verification",
            columns: ["Output type", "Risk", "How to verify"],
            rows: [
              [
                "Citations and sources",
                "Frequently fabricated, including plausible authors and dates",
                "Locate every source. If you cannot find it, it does not exist",
              ],
              [
                "Statistics and figures",
                "Invented or misremembered",
                "Trace to the original publication",
              ],
              [
                "Legal or regulatory claims",
                "Confidently wrong; consequences are serious",
                "Check the actual regulation, or ask compliance",
              ],
              [
                "Clinical information",
                "Potentially harmful",
                "Never rely on it. Use authoritative clinical references",
              ],
              [
                "Arithmetic",
                "Language models are unreliable at calculation",
                "Recompute it yourself",
              ],
              [
                "Names, dates, specifics",
                "Plausibly wrong",
                "Check against the source record",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Matching verification to the stakes",
            task: "Decide how much checking four different AI-assisted tasks need.",
            steps: [
              {
                move: "Rephrasing a paragraph you wrote — read it once.",
                why: "You already know the content, so you can spot a change in meaning immediately. The risk is low and the check is nearly free. This is the category where AI is most straightforwardly useful.",
              },
              {
                move: "Drafting a routine internal email — read it properly before sending.",
                why: "Low stakes, but it goes to colleagues under your name. An ordinary proofread is proportionate — the same attention you would give anything you wrote yourself.",
              },
              {
                move: "Summarizing a policy for staff — verify every specific against the source.",
                why: "Staff will act on this. Every number, deadline, and requirement must be checked against the actual policy document, because a confident wrong retention period becomes practice behavior.",
              },
              {
                move: "Anything clinical or regulatory — do not use AI output as the source at all.",
                why: "The consequences of a confident error are serious enough that AI-generated content should not be the basis of the answer. Use it to help you phrase what an authoritative source already told you, never to establish the fact.",
              },
            ],
            result:
              "Verification effort proportionate to consequence, rather than uniform or absent.",
            takeaway:
              "Ask what happens if this is wrong. The answer sets how hard you check — and sometimes says not to use the tool for it.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "You are accountable for anything you send, regardless of what produced the draft. 'The AI wrote it' is not a defense for an incorrect letter to a patient, a wrong figure in a report, or a fabricated citation in a policy. Treat AI output as a draft from a fast, confident, sometimes-wrong assistant whose work you are signing off.",
          },
          {
            type: "knowledge-check",
            question:
              "An AI summary of a regulation cites a specific section number and retention period. What should you do before circulating it to staff?",
            options: [
              "Circulate it — the citation shows it came from the actual regulation",
              "Locate the cited section in the real regulation and confirm both the section and the period exist as stated",
              "Ask the AI whether it is certain",
              "Circulate it with a note that it was AI-generated",
            ],
            correctIndex: 1,
            explanation:
              "Fabricated citations are among the most common hallucinations, and they are convincing precisely because they follow the right format. The only reliable check is to find the cited section in the actual source. Staff will act on this summary, so the specifics must be verified.",
            optionRationales: [
              "A citation's presence is not evidence of its existence. Fabricated citations look exactly like real ones.",
              "Correct. Verify the section and the figure against the actual regulation.",
              "Asking a model to assess its own certainty produces another generated answer, with no more grounding than the first.",
              "A disclaimer does not make wrong information safe. Staff would still act on an incorrect retention period.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Find a hallucination yourself. It is more convincing than being told they happen.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Ask an AI tool a detailed question in an area you know well and ask it to cite sources. Attempt to verify each source and record what you find.",
          "Ask it to perform a multi-step calculation. Check the arithmetic by hand.",
          "Build a verification checklist for your own work, with different levels for low, medium, and high stakes output.",
          "Write a short guidance note for colleagues explaining what AI is genuinely useful for at work and what it must never be trusted with.",
        ],
      },
    ],
  },
];
