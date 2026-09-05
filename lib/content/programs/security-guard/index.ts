import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * Security Guard Training — CONCEPT PREPARATION ONLY.
 *
 * NYS security guard licensure requires state-approved training delivered by
 * an approved school, with registration through DCJS. This coursework is not
 * that and says so plainly.
 */

const m1: Lesson[] = [
  {
    slug: "the-guard-role-and-authority",
    title: "The Guard Role and the Limits of Authority",
    description:
      "What a security guard is actually authorized to do, and the difference between observing and enforcing.",
    duration: "24 min",
    objectives: [
      "Describe the primary function of a security guard",
      "Distinguish a guard's authority from a police officer's",
      "Explain the risks of exceeding your authority",
      "Apply the observe-and-report principle",
    ],
    sections: [
      {
        heading: "Observe and report is the whole job description",
        blocks: [
          {
            type: "scenario",
            role: "You are working overnight at a commercial property.",
            text: "You see someone taking items from a vehicle in the lot. Every instinct says confront them. You have no arrest powers beyond those of any private citizen, no legal protection an officer has, and no backup — and a confrontation that goes wrong makes you both a victim and a defendant.",
            task: "Understand what you are there to do, because the instinct and the job are different things.",
          },
          {
            type: "paragraph",
            text: "A security guard's core function is deterrence, observation, and reporting. Presence prevents a great deal on its own. Beyond that, the job is to see accurately, record precisely, and get the right people involved — not to enforce law, which you have no special authority to do.",
          },
          {
            type: "table",
            caption: "What separates a guard from a police officer",
            columns: ["", "Security guard", "Police officer"],
            rows: [
              ["Authority", "Generally that of a private citizen", "Sworn peace officer authority"],
              ["Arrest powers", "Limited citizen's arrest, narrowly defined and risky", "Statutory arrest authority"],
              ["Use of force", "Only what a private person may lawfully use", "Governed by law and departmental policy"],
              ["Legal protection", "Personally liable for wrongful acts", "Qualified immunity in defined circumstances"],
              ["Jurisdiction", "The property you are assigned to", "Their jurisdiction"],
              ["Primary duty", "Deter, observe, report", "Investigate and enforce"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Exceeding your authority exposes you personally. A guard who detains someone without lawful grounds can face false imprisonment claims; one who uses force beyond what is justified can face assault charges and civil liability. Your employer's insurance may not cover an act outside your authorized duties, and criminal liability is never insurable. The safest and most professional response to almost any incident is to observe accurately and call.",
          },
          {
            type: "worked-example",
            title: "Responding to a theft in progress",
            task: "You observe someone removing property from a vehicle in your assigned lot.",
            steps: [
              {
                move: "Do not approach. Move to a position where you can see clearly and safely.",
                why: "Distance keeps you safe and keeps you observing. A guard who closes the distance stops being a witness and becomes a participant, and the quality of your observation drops the moment you are in a confrontation.",
              },
              {
                move: "Call police immediately, before anything else.",
                why: "They have the authority and the backup. Every second you spend deciding whether to intervene is a second they are not on their way.",
              },
              {
                move: "Record specifics while you can still see them.",
                why: "Description, clothing, direction of travel, vehicle make and plate, time. Memory degrades fast under stress, and these are the details that make a report useful rather than vague.",
              },
              {
                move: "Follow your post orders on whether to observe from a distance or withdraw.",
                why: "Post orders exist because the client and the employer have decided how this site is handled. Following them protects you; improvising does not.",
              },
              {
                move: "Write the report while it is fresh, and stick to what you saw.",
                why: "Your report may become evidence. Record observations, not conclusions — 'a man in a gray jacket removed a bag from the vehicle', not 'a thief broke into the car'.",
              },
            ],
            result: "Police are en route with a usable description, and you are safe and still a credible witness.",
            takeaway: "Do not close the distance. Call, observe, record specifics, follow post orders, and write what you saw.",
          },
          {
            type: "knowledge-check",
            question:
              "You witness someone stealing from a vehicle on the property you patrol. What is the correct response?",
            options: [
              "Detain the person until police arrive",
              "Observe from a safe distance, call police immediately, and record a detailed description",
              "Confront them and demand they return the property",
              "Follow them off the property to see where they go",
            ],
            correctIndex: 1,
            explanation:
              "A guard's authority is generally that of a private citizen, and a physical intervention creates legal and personal risk with no corresponding authority. Observing safely and providing an accurate description is both the safest response and the most useful one.",
            optionRationales: [
              "Detention without lawful grounds risks a false imprisonment claim, and citizen's arrest is narrowly defined and dangerous.",
              "Correct. Distance, a call, and a description.",
              "Confrontation escalates a property crime into a risk to your safety.",
              "Leaving your assigned post and pursuing removes you from your authority and your protection.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find what applies in your state — authority is defined by state law." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state's licensing requirements for security guards: training hours, registration, fees, and background check.",
          "Research the citizen's arrest law in your state and write down its limits in two sentences.",
          "Find out whether armed guard licensure is separate in your state and what additional requirements it carries.",
          "Write a description of a person and a vehicle in the level of detail a report would need.",
        ],
      },
    ],
  },
  {
    slug: "observation-reporting-and-conduct",
    title: "Observation, Reporting, and Professional Conduct",
    description:
      "Writing a report that holds up, and handling people without escalating.",
    duration: "24 min",
    objectives: [
      "Write an incident report that is factual and defensible",
      "Distinguish observation from conclusion",
      "De-escalate a confrontation verbally",
      "Describe conduct expectations, including on discrimination",
    ],
    sections: [
      {
        heading: "The report may be read in court",
        blocks: [
          {
            type: "scenario",
            role: "You are writing up an incident at the end of a shift.",
            text: "You write that a man was acting suspiciously and appeared intoxicated. Eighteen months later, in a deposition, you are asked what suspiciously means and how you established intoxication. Neither is a fact you observed — they are conclusions you drew, and you cannot support either.",
            task: "Learn to write reports that survive being read years later by someone looking for weaknesses.",
          },
          {
            type: "table",
            caption: "Observation versus conclusion",
            columns: ["Write this", "Not this"],
            rows: [
              ["Subject was unsteady and his speech was slurred", "Subject was drunk"],
              ["Subject walked the same aisle four times and looked toward the office repeatedly", "Subject was acting suspiciously"],
              ["Subject raised his voice and pointed at me", "Subject became aggressive"],
              ["I observed a broken window pane, approximately 30 cm across", "Someone broke in"],
              ["Subject stated, “I work here”", "Subject claimed to be an employee"],
              ["Subject declined to provide identification", "Subject refused to cooperate"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "A report that records conclusions rather than observations is worth very little and can be actively damaging. You cannot testify to someone's state of mind or their blood alcohol level, and asserting either invites the question of how you knew. Record what you saw and heard, quote what was said, and let a conclusion follow from the facts rather than replacing them.",
          },
          {
            type: "table",
            caption: "The elements of a complete report",
            columns: ["Element", "Detail"],
            rows: [
              ["Who", "People involved, described or named, and witnesses"],
              ["What", "What happened, in the order it happened"],
              ["When", "Specific times, not 'around midnight'"],
              ["Where", "Exact location on the property"],
              ["How", "The sequence, as observed"],
              ["Action taken", "What you did and who you notified, with times"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "De-escalation is a security guard's most-used skill and the least-trained one. What works: keeping your voice lower and slower than theirs, keeping your distance, letting them finish without interrupting, acknowledging the feeling before addressing the facts, and giving them a way out that does not require backing down publicly. What does not work: matching their volume, issuing orders, or standing too close.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Guards are subject to civil rights law. Stopping, following, or scrutinizing someone on the basis of race, ethnicity, religion, or national origin is unlawful discrimination and exposes both you and your employer. Suspicion must be based on observed behavior that you can describe in a report — and if you cannot write down what the person did, you do not have grounds.",
          },
          {
            type: "knowledge-check",
            question:
              "Which sentence belongs in an incident report?",
            options: [
              "The subject was clearly intoxicated and looking for trouble.",
              "The subject was unsteady on his feet, his speech was slurred, and he stated, “I only had two.”",
              "The subject seemed like he did not belong in the building.",
              "The subject was acting suspiciously near the loading dock.",
            ],
            correctIndex: 1,
            explanation:
              "It records observable behavior and quotes what was said, so anyone reading it later can evaluate the same evidence you did. The others state conclusions you cannot support — intoxication, intent, belonging, and suspicion are all judgments rather than observations.",
            optionRationales: [
              "Both halves are conclusions, and neither can be defended under questioning.",
              "Correct. Observed behavior plus a direct quotation.",
              "This is an impression, and in the wrong circumstances it is evidence of discrimination.",
              "'Suspiciously' describes your reaction, not their behavior. Write what they did.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Report writing improves fastest by rewriting bad reports." },
      {
        type: "list",
        ordered: true,
        items: [
          "Rewrite each conclusion in the table as an observation, without using the original word.",
          "Write a full incident report for an invented event covering all six elements.",
          "Research verbal de-escalation and write down five specific techniques.",
          "Write down what you would record if you had grounds to be concerned about someone, in terms that could not be read as discriminatory.",
        ],
      },
    ],
  },
];

export const securityGuard: Program = {
  slug: "security-guard",
  group: "Technical Programs",
  title: "Security Guard Training",
  shortTitle: "Security Guard",
  icon: "🛡️",
  accent: "from-slate-700 to-slate-900",
  description:
    "Concept preparation for security guard work: the limits of a guard's authority, observe-and-report, writing reports that hold up, and verbal de-escalation.",
  overview:
    "The central lesson of this coursework is the gap between instinct and authority. A guard's powers are generally those of a private citizen, so the response that feels right during an incident is frequently the one that creates legal exposure and personal risk. The job is deterrence, accurate observation, and reporting — and a report written in conclusions rather than observations is worth very little when it is read eighteen months later by someone looking for weaknesses.",
  outcomes: [
    "Describe the guard's role and how their authority differs from a police officer's",
    "Explain the personal legal exposure created by exceeding that authority",
    "Apply observe-and-report to an incident in progress",
    "Record a description with the specifics a report needs",
    "Write an incident report covering who, what, when, where, how, and action taken",
    "Distinguish an observation from a conclusion, and write only the first",
    "Apply verbal de-escalation techniques",
    "Recognize that suspicion must rest on describable behavior, not appearance",
  ],
  careerRoles: [
    "Unarmed security officer",
    "Retail loss prevention support",
    "Building and campus security",
    "Event security",
  ],
  credentialNote:
    "IMPORTANT — this coursework is not a license and does not satisfy any state training requirement. In New York, security guards must complete state-approved pre-assignment and on-the-job training delivered by an approved school, and register with the Division of Criminal Justice Services; armed guard work requires additional training and a separate firearms license. Other states have their own requirements. No online course from a non-approved provider satisfies these, and this one does not claim to. Use it to arrive at approved training already understanding the material. Nothing here is legal advice — authority, use of force, and citizen's arrest are defined by state law and vary considerably.",
  relatedCertifications: [
    { name: "NYS Security Guard Registration", body: "NYS Division of Criminal Justice Services", note: "Requires approved pre-assignment and on-the-job training, plus annual in-service." },
    { name: "State licensure elsewhere", body: "Individual state licensing authorities", note: "Requirements vary widely; check the state you will work in." },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "Authority, Reporting & Conduct",
      emoji: "🛡️",
      description:
        "What a guard may and may not do, how to respond to an incident, and how to write it up so it holds.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "How a guard's authority differs from a police officer's, and what that exposes you to",
        "Responding to a theft in progress without becoming a participant",
        "Writing observations rather than conclusions, and why it matters years later",
        "Verbal de-escalation, and the civil rights limits on who you may scrutinize",
      ],
      scenario:
        "You see someone taking items from a vehicle at 3am. Every instinct says confront them — and you have no more authority than any private citizen, no legal protection, and no backup. Later, in a deposition, you are asked what you meant by writing that someone was 'acting suspiciously'.",
    },
  ],
};
