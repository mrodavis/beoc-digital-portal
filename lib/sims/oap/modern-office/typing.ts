import type { SimDefinition } from "@/types/sim";
import { typeAll, typingDoc, type TypingFormExercise } from "@/components/sim/apps/typing/types";

/** modern-office sims that run in the typing engine. Keys are "<moduleSlug>::<lessonSlug>". */

function crmForm(id: string, record: string, source: TypingFormExercise["source"]): TypingFormExercise {
  return {
    id,
    kind: "form",
    title: "Log an Interaction",
    system: "TOR Tech CRM",
    record,
    verifyLabel: "I read the log back against the source and every field is complete.",
    submitLabel: "Save interaction",
    source,
    sections: [
      {
        id: "s1",
        heading: "Interaction",
        fields: [
          { name: "interactionDate", label: "Date", type: "date", span: 2, required: true },
          { name: "interactionType", label: "Interaction Type", type: "select", options: ["Email", "Meeting", "Phone call", "Video call"], span: 2, required: true },
          { name: "followUp", label: "Follow-up Due", type: "date", span: 2, required: true },
          { name: "participants", label: "Participants", span: 6, required: true },
        ],
      },
      {
        id: "s2",
        heading: "Details",
        fields: [
          { name: "summary", label: "Summary (at least 3 sentences)", type: "textarea", span: 6, required: true },
          { name: "nextSteps", label: "Next Steps (owner and due date)", type: "textarea", span: 6, required: true },
        ],
      },
    ],
  };
}

const HINT_FORM = "Work in the Log an Interaction form.";

export const typingSims: Record<string, SimDefinition[]> = {
  /* ---------------------------------------------------------------- */
  /* Module 15: Multi-Tool Integration Challenge                       */
  /* ---------------------------------------------------------------- */
  "module-15::multi-tool-challenge": [
    {
      id: "mo-m15-multi-tool-crm-1",
      app: "typing",
      title: "Log Friday's call with Marcus Webb in the CRM",
      scenario:
        "Last item on Renee's Monday list: log Friday's phone call with Marcus Webb of Webb & Lowe Accounting. Your call notes are on the left. Fill in all six required fields in the CRM, spell every name exactly as it appears everywhere else, then read it back and save.",
      fileName: "TOR Tech CRM",
      minutes: 6,
      initial: typingDoc({
        product: "KeyPath Data Entry Trainer",
        learner: "Jordan Rivera",
        exercises: [
          crmForm("crm1", "Webb & Lowe Accounting › Activity log", {
            kind: "digital",
            org: "OneNote · Call notes",
            title: "Call notes: Marcus Webb, Webb & Lowe Accounting",
            header: [
              { label: "Date", value: "Friday, 10/16/2026, 3:40 PM" },
              { label: "Type", value: "Phone call (inbound)" },
              { label: "On the call", value: "Marcus Webb (Webb & Lowe Accounting), Dana Cole (TOR Tech)" },
            ],
            sections: [
              {
                heading: "Notes",
                rows: [
                  { label: "Reason", value: "Wants to renew the managed IT contract for another year" },
                  { label: "Question", value: "Will the price change if they add two more workstations?" },
                  { label: "Offer", value: "Dana offered a Q3 Contract Review on Wednesday to go over renewal pricing" },
                  { label: "Next step", value: "Dana Cole will send the renewal quote by 10/21/2026" },
                  { label: "Follow up", value: "Check in with Marcus by 10/22/2026 if he hasn't confirmed" },
                ],
              },
            ],
            footer: "Remember: names in the CRM must match the email and the tracker exactly.",
          }),
        ],
      }),
      tasks: [
        {
          instruction: "Enter the date of the call and the participants (both names).",
          hint: "Type “10/16/2026” in Date. In Participants, type “Marcus Webb, Dana Cole” and press Tab.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:interactionDate", value: ["10/16/2026", "10/16/26"] }, requires: { selection: "ex:crm1" }, selectHint: HINT_FORM },
            typeAll("field:participants", "Marcus Webb, Dana Cole", ["marcus webb", "dana cole"], { requires: { selection: "ex:crm1" }, selectHint: HINT_FORM }),
          ],
        },
        {
          instruction: "Select Phone call as the interaction type.",
          hint: "Interaction Type list › Phone call.",
          steps: [{ action: { kind: "type", target: "field:interactionType", value: "Phone call" }, requires: { selection: "ex:crm1" }, selectHint: HINT_FORM }],
        },
        {
          instruction: "Write a summary of at least three sentences. It must mention the renewal, the two added workstations, and the Q3 Contract Review on Wednesday.",
          hint: "Click Summary and type three sentences from the notes, for example: “Marcus Webb called to renew the managed IT contract for another year. He asked whether the price changes if Webb & Lowe adds two workstations. Dana Cole offered a Q3 Contract Review on Wednesday to go over renewal pricing.” Then press Tab.",
          steps: [
            typeAll(
              "field:summary",
              "Marcus Webb called to renew the managed IT contract for another year. He asked whether the price changes if Webb & Lowe adds two workstations. Dana Cole offered a Q3 Contract Review on Wednesday to go over renewal pricing.",
              ["renew", ["two workstations", "2 workstations", "two more workstations", "two added workstations"], "contract review", "wednesday"],
              { requires: { selection: "ex:crm1" }, selectHint: HINT_FORM },
            ),
          ],
        },
        {
          instruction: "Enter the next step with its owner and due date: “Dana Cole will send the renewal quote by 10/21/2026.”",
          hint: "Click Next Steps, type the sentence, and press Tab.",
          steps: [typeAll("field:nextSteps", "Dana Cole will send the renewal quote by 10/21/2026.", ["dana cole", "renewal quote", "10/21/2026"], { requires: { selection: "ex:crm1" }, selectHint: HINT_FORM })],
        },
        {
          instruction: "Set the follow-up due date to 10/22/2026.",
          hint: "Click Follow-up Due, type “10/22/2026”, and press Tab.",
          steps: [{ action: { kind: "type", target: "field:followUp", value: ["10/22/2026", "10/22/26"] }, requires: { selection: "ex:crm1" }, selectHint: HINT_FORM }],
        },
        {
          instruction: "Read the log back against your notes, confirm it, and save the interaction.",
          hint: "Check the box “I read the log back against the source and every field is complete,” then select Save interaction.",
          steps: [
            { action: { kind: "command", id: "form.verify", value: "on" }, requires: { selection: "ex:crm1" }, selectHint: HINT_FORM },
            { action: { kind: "command", id: "form.submit" }, requires: { selection: "ex:crm1" }, selectHint: HINT_FORM },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------- */
  /* Module 15: Capstone                                               */
  /* ---------------------------------------------------------------- */
  "module-15::capstone-simulation": [
    {
      id: "mo-m15-capstone-crm-1",
      app: "typing",
      title: "Capstone part 2: log the client email thread",
      scenario:
        "The capstone's CRM task: log yesterday's email thread with Marcus Webb. A coworker started the record and misspelled the client's name. Make every field match the email exactly, complete all six fields, and save.",
      fileName: "TOR Tech CRM",
      minutes: 6,
      initial: typingDoc({
        product: "KeyPath Data Entry Trainer",
        learner: "Jordan Rivera",
        values: { participants: "Markus Webb, Dana Cole" },
        exercises: [
          crmForm("crm2", "Webb & Lowe Accounting › Activity log", {
            kind: "digital",
            org: "Email · Outlook",
            title: "RE: Renewal questions",
            header: [
              { label: "From", value: "Marcus Webb <marcus.webb@webblowe.example>" },
              { label: "To", value: "Dana Cole <dana.cole@tortech.example>" },
              { label: "Cc", value: "Jordan Rivera <jordan.rivera@tortech.example>" },
              { label: "Date", value: "Wed 10/21/2026 4:05 PM" },
            ],
            sections: [
              {
                heading: "Marcus Webb, Wed 10/21/2026 4:05 PM",
                rows: [{ label: "Message", value: "Thanks for the meeting today. We'd like to go ahead with the renewal if the quote stays under $18,000. Can you also include setup for the two new workstations?" }],
              },
              {
                heading: "Dana Cole, Wed 10/21/2026 2:30 PM",
                rows: [{ label: "Message", value: "Hi Marcus, here is a summary of today's Q3 Contract Review. I'll send the final quote, with workstation setup, by Friday, 10/23/2026." }],
              },
            ],
            footer: "Follow up with Marcus on Monday, 10/26/2026 if the quote hasn't been signed.",
          }),
        ],
      }),
      tasks: [
        {
          instruction: "A coworker started this log. Fix the client's name in Participants so it matches the email exactly.",
          hint: "The email is from Marcus Webb (with a c). Select the Participants text, type “Marcus Webb, Dana Cole”, and press Tab.",
          steps: [typeAll("field:participants", "Marcus Webb, Dana Cole", ["marcus webb", "dana cole"], { requires: { selection: "ex:crm2" }, selectHint: HINT_FORM })],
        },
        {
          instruction: "Enter the date of Marcus's latest email and select Email as the interaction type.",
          hint: "Type “10/21/2026” in Date and choose Email in the Interaction Type list.",
          anyOrder: true,
          steps: [
            { action: { kind: "type", target: "field:interactionDate", value: ["10/21/2026", "10/21/26"] }, requires: { selection: "ex:crm2" }, selectHint: HINT_FORM },
            { action: { kind: "type", target: "field:interactionType", value: "Email" }, requires: { selection: "ex:crm2" }, selectHint: HINT_FORM },
          ],
        },
        {
          instruction: "Write a summary of at least three sentences that mentions the renewal, the $18,000 limit, and the two new workstations.",
          hint: "Click Summary and type, for example: “Marcus Webb confirmed that Webb & Lowe wants to renew. The quote must stay under $18,000. He asked us to include setup for the two new workstations.” Then press Tab.",
          steps: [
            typeAll(
              "field:summary",
              "Marcus Webb confirmed that Webb & Lowe wants to renew. The quote must stay under $18,000. He asked us to include setup for the two new workstations.",
              ["renew", ["18,000", "18000"], ["two new workstations", "2 new workstations"]],
              { requires: { selection: "ex:crm2" }, selectHint: HINT_FORM },
            ),
          ],
        },
        {
          instruction: "Enter the next step with its owner and due date: “Dana Cole will send the final quote with workstation setup by 10/23/2026.”",
          hint: "Click Next Steps, type the sentence, and press Tab.",
          steps: [typeAll("field:nextSteps", "Dana Cole will send the final quote with workstation setup by 10/23/2026.", ["dana cole", "final quote", "10/23/2026"], { requires: { selection: "ex:crm2" }, selectHint: HINT_FORM })],
        },
        {
          instruction: "Set the follow-up due date to Monday, 10/26/2026.",
          hint: "Click Follow-up Due, type “10/26/2026”, and press Tab.",
          steps: [{ action: { kind: "type", target: "field:followUp", value: ["10/26/2026", "10/26/26"] }, requires: { selection: "ex:crm2" }, selectHint: HINT_FORM }],
        },
        {
          instruction: "Check that no field is empty, read the log back against the email, confirm it, and save.",
          hint: "Check the box “I read the log back against the source and every field is complete,” then select Save interaction.",
          steps: [
            { action: { kind: "command", id: "form.verify", value: "on" }, requires: { selection: "ex:crm2" }, selectHint: HINT_FORM },
            { action: { kind: "command", id: "form.submit" }, requires: { selection: "ex:crm2" }, selectHint: HINT_FORM },
          ],
        },
      ],
    },
  ],
};
