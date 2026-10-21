import type { SimDefinition } from "@/types/sim";
import { assistantDoc, typeAll } from "@/components/sim/apps/assistant/types";

/** tech-foundations sims that run in the assistant engine. Keys are "<moduleSlug>::<lessonSlug>". */

const CARD_INTRO = "## HIPAA Privacy Quick Reference: Front Desk\n\n**What PHI is:** any information that can identify a patient and relates to their health, care, or payment, such as a name with an appointment reason, a date of birth, an insurance ID number, a photo, or a record number.\n\n**5 common front desk mistakes**\n1. Leaving a schedule or intake form where patients can see it. Turn papers face down and lock your screen (Windows+L) when you step away.\n2. Emailing the wrong \"Smith.\" Check every recipient address before you select Send.\n3. Discussing a patient's visit in the waiting room. Confirm identity quietly and keep details private.\n4. Leaving printed PHI in the printer tray. Collect printouts right away and shred what you don't need.\n5. Opening a neighbor's or a celebrity's chart out of curiosity. Open only the records your work requires.\n\n";
const CARD_END = "\n\n**If you share PHI with the wrong person:** stop any further disclosure if you can, tell your supervisor right away, and write down what happened.\n\n**Reporting a possible breach:** report it to your supervisor and the Privacy Officer immediately. The Privacy Officer completes the risk assessment and sends any required notices.";
const CARD_WRONG = `${CARD_INTRO}**Records requests:** patients can get copies of their records, and the practice has 60 days to act on a request.${CARD_END}`;
const CARD_FIXED = `You're right, thank you. Here's the corrected card:\n\n${CARD_INTRO}**Records requests:** patients can get copies of their records, and the practice must act on a request within 30 days (with one 30-day extension if it tells the patient in writing why).${CARD_END}`;

export const assistantSims: Record<string, SimDefinition[]> = {
  /* ============================ Module 8 ============================ */
  "module-8::hipaa-data-security": [
    {
      id: "tf-m8-hipaa-ai-card-1",
      app: "assistant",
      title: "Use AI for a HIPAA reference card, safely",
      scenario:
        "The lesson's AI Assist task, in a practice copy of Microsoft 365 Copilot Chat signed in with your Lakeside Medical Associates work account. A coworker suggests pasting Ms. Ellis's intake note into the prompt so the card \"looks realistic.\" Don't. Ask without patient details, check every rule the AI writes against the lesson, get the mistake fixed, and only then copy the card.",
      fileName: "Copilot",
      minutes: 5,
      initial: assistantDoc({
        accounts: [{ id: "work", name: "Jordan Rivera", email: "jrivera@lakesidemed.example", work: true, org: "Lakeside Medical Associates" }],
        account: "work",
        thread: [],
        suggestions: ["Create a quick reference card for front desk staff", "Explain HIPAA's minimum necessary standard", "Draft a reminder about locking screens"],
        history: [{ id: "h-old1", title: "Flu clinic sign-up sheet", when: "Mon" }],
        policy: {
          blockTerms: ["Ellis", "MRN", "04/22/1958", "4/22/1958"],
          message: "Lakeside policy tip: this prompt looks like it contains patient information (a name, a date of birth, or a record number). Remove it and describe what you need in general terms.",
        },
        rules: [
          {
            id: "r-card",
            match: [["quick reference", "reference card", "cheat sheet"], ["hipaa", "privacy"], ["front desk"]],
            response: CARD_WRONG,
            followups: ["Make it fit on one page", "Add a section on phone calls"],
            error: {
              claim: "The card says the practice has 60 days to act on a records request.",
              correction: "HIPAA gives the practice 30 days, with one 30-day extension if it tells the patient in writing why. Deadlines and penalty amounts are where AI answers most often go wrong, so check each one.",
            },
          },
          {
            id: "r-fix",
            after: "r-card",
            match: [["30 days", "30-day", "thirty days"]],
            response: CARD_FIXED,
          },
        ],
      }),
      tasks: [
        {
          instruction: "Ask Copilot for a HIPAA privacy quick reference card for front desk staff. Leave out every patient detail.",
          hint: "Click Message Copilot and type a general request, for example: \"Create a HIPAA privacy quick reference card for front desk staff at a medical office. Keep it to one page.\" Press Enter. If a policy tip appears, remove the patient details.",
          steps: [
            typeAll("prompt", "Create a HIPAA privacy quick reference card for front desk staff at a medical office. Keep it to one page.", [["quick reference", "reference card", "cheat sheet"], ["hipaa", "privacy"], "front desk"], { requires: { selection: "chat" }, selectHint: "Ask in the main Copilot chat." }),
          ],
        },
        {
          instruction: "Check the card against the lesson. One rule is wrong. Report the response as Inaccurate.",
          hint: "Read the Records requests line. Under the response, select Dislike (thumbs down), choose Inaccurate, and select Submit.",
          steps: [{ action: { kind: "command", id: "response.feedback", value: "Inaccurate" }, requires: { selection: "msg:r1" }, selectHint: "Give feedback on the quick reference card." }],
        },
        {
          instruction: "Ask Copilot to fix it: \"The practice must act on a records request within 30 days, with one 30-day extension. Please correct the card.\"",
          hint: "Type the correction in the same chat and press Enter.",
          steps: [typeAll("prompt", "The practice must act on a records request within 30 days, with one 30-day extension. Please correct the card.", [["30 days", "30-day", "thirty days"], ["correct", "fix", "update"]], { requires: { selection: "chat" }, selectHint: "Ask in the same Copilot chat." })],
        },
        {
          instruction: "Copy the corrected card so you can paste it into your Word document.",
          hint: "Under the corrected card, select Copy.",
          steps: [{ action: { kind: "command", id: "response.copy" }, requires: { selection: "msg:r2" }, selectHint: "Copy the corrected card, not the first one." }],
        },
      ],
    },
  ],
};
