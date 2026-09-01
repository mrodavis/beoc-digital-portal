import { Lesson } from "@/types/lesson";

/**
 * INFO 3035 — AI foundations.
 *
 * Deliberately conceptual. The applied "which button to press" material lives
 * in the Modern Office course's AI Productivity module; this one explains what
 * the technology is, so that the tool lessons rest on an accurate model rather
 * than on folklore.
 */
export const cloudModule6Lessons: Lesson[] = [
  {
    slug: "what-ai-actually-is",
    title: "What AI Actually Is",
    description:
      "Separate artificial intelligence, machine learning, and large language models, and understand what these systems do rather than what they appear to do.",
    duration: "24 min",
    objectives: [
      "Distinguish AI, machine learning, and large language models",
      "Explain in plain terms how a language model produces text",
      "Describe what training data is and why it determines a model's limits",
      "Explain why these systems are delivered as cloud services",
    ],
    sections: [
      {
        heading: "Three words that are not synonyms",
        blocks: [
          {
            type: "scenario",
            role: "You evaluate a vendor's claims at Lakeside Medical Associates.",
            text: "A scheduling vendor says its product is 'AI-powered.' That could mean a large language model reading appointment requests, a statistical model predicting no-shows, or a set of if-then rules someone wrote in 2015. All three are marketed the same way, and they carry very different risks.",
            task: "Understand the terms precisely enough to ask a vendor what their product actually does.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Artificial intelligence",
                definition:
                  "The broad field of building systems that perform tasks normally requiring human intelligence. An umbrella term, not a specific technology.",
              },
              {
                term: "Machine learning",
                definition:
                  "A subset of AI where a system learns patterns from data rather than following rules a person wrote. The system is trained, not programmed.",
              },
              {
                term: "Large language model (LLM)",
                definition:
                  "A machine learning model trained on very large amounts of text to predict likely continuations. ChatGPT, Claude, and Gemini are LLM-based products.",
              },
              {
                term: "Training data",
                definition:
                  "The material a model learned from. It determines what the model knows, what it is good at, and which biases it carries.",
              },
              {
                term: "Generative AI",
                definition:
                  "Models that produce new content — text, images, code — rather than only classifying or predicting.",
              },
              {
                term: "Prompt",
                definition:
                  "The input you give a model. With generative systems, the quality of the prompt substantially determines the quality of the output.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "A large language model works by predicting likely next words, over and over, given everything before them. That description sounds reductive, and it genuinely is how these systems operate. The output is fluent because the patterns it learned are fluent — not because the system checked whether the content is true.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "This is the single most important fact about these tools: a language model optimizes for plausible text, not for accurate text. It has no mechanism that distinguishes a fact it learned from a fluent invention. When it states a drug interaction, a policy citation, or a date with total confidence, that confidence carries no information about whether the statement is correct. Everything in the next lesson about verification follows from this.",
          },
          {
            type: "table",
            caption: "What each kind of system is suited to",
            columns: ["Type", "Good at", "Poor at"],
            rows: [
              [
                "Rule-based system",
                "Consistent, auditable decisions with known logic",
                "Anything its author did not anticipate",
              ],
              [
                "Machine learning classifier",
                "Predicting categories from many examples — spam, no-show risk",
                "Explaining why; handling cases unlike its training data",
              ],
              [
                "Large language model",
                "Drafting, summarizing, rephrasing, explaining",
                "Facts, arithmetic, citations, anything needing to be verifiably true",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "These models are delivered as cloud services for a straightforward reason: training and running them requires hardware far beyond a workstation. This is the IaaS/PaaS/SaaS stack from Module 2 in its newest form — you consume AI as SaaS, over the internet, with all the shared-responsibility implications that carries. Your prompt leaves your building.",
          },
          {
            type: "knowledge-check",
            question:
              "An AI assistant states a specific drug interaction with complete confidence. What does that confidence tell you about the accuracy of the claim?",
            options: [
              "It indicates high accuracy, since the model was trained on medical literature",
              "Nothing — the model generates fluent text regardless of whether the content is correct",
              "It means the claim came from a verified medical source",
              "It indicates the model checked the claim before answering",
            ],
            correctIndex: 1,
            explanation:
              "Confidence in an LLM's output is a property of its language generation, not of its factual grounding. The model produces plausible-sounding text whether or not the underlying claim is true, and it has no internal step that verifies anything. Clinical information must always be confirmed against an authoritative source.",
            optionRationales: [
              "Training on medical text improves fluency about medicine. It does not make individual generated claims reliable.",
              "Correct. Fluency and confidence are independent of accuracy in these systems.",
              "The model does not retrieve from or cite a verified source unless it is specifically built to, and even then citations can be fabricated.",
              "There is no verification step. The model predicts text; it does not check it.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Test the claim rather than accepting it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Ask a free AI assistant a factual question in an area you know well. Assess the answer for accuracy and note anything subtly wrong.",
          "Ask it for three sources supporting a claim. Attempt to locate each one. Record how many actually exist.",
          "Ask the same question three times in separate conversations. Compare the answers and note where they differ.",
          "Write a paragraph explaining to a colleague why 'it sounded very confident' is not evidence that an AI answer is correct.",
        ],
      },
    ],
  },
  {
    slug: "ai-as-a-cloud-service",
    title: "AI as a Cloud Service",
    description:
      "See how AI fits the cloud service models you already know, and what that means for where your data goes.",
    duration: "20 min",
    objectives: [
      "Place AI services within the IaaS, PaaS, and SaaS framework",
      "Explain what happens to a prompt after you submit it",
      "Distinguish consumer AI products from enterprise agreements",
      "Identify what must never be entered into a consumer AI tool",
    ],
    sections: [
      {
        heading: "Your prompt is an upload",
        blocks: [
          {
            type: "scenario",
            role: "You draft a difficult letter at Lakeside Medical Associates.",
            text: "To get help with the wording, you paste the draft into a free AI assistant. The draft contains a patient's name, date of birth, and diagnosis. That content has now left the practice, been transmitted to a third party, and may be retained — and under the free tier's terms, may be used to improve the service.",
            task: "Understand where your input actually goes, before you decide what may be put into these tools.",
          },
          {
            type: "paragraph",
            text: "AI services sit squarely in the models from Module 2. A consumer chat assistant is SaaS — a finished application you simply use. An API a developer builds against is closer to PaaS. Renting GPU capacity to run your own model is IaaS. The same shared responsibility applies at every level: the provider secures the infrastructure, and your data remains yours to govern.",
          },
          {
            type: "table",
            caption: "What happens to a prompt",
            columns: ["Step", "What occurs", "Implication"],
            rows: [
              [
                "You submit the prompt",
                "Text is transmitted over the internet to the provider",
                "It has left your network",
              ],
              [
                "The provider processes it",
                "The model runs in the provider's data center",
                "The content exists on their systems",
              ],
              [
                "The response returns",
                "Generated text comes back to you",
                "Fast, and easy to forget a transmission occurred",
              ],
              [
                "Retention",
                "Depends entirely on the terms you agreed to",
                "Consumer tiers commonly retain, and may train on, your input",
              ],
            ],
          },
          {
            type: "table",
            caption: "Consumer against enterprise AI",
            columns: ["Consideration", "Consumer / free tier", "Enterprise agreement"],
            rows: [
              ["Data used for training", "Often yes by default", "Contractually excluded"],
              ["Retention", "Varies; often indefinite", "Defined and limited by contract"],
              ["Business associate agreement", "Not available", "Available from some vendors"],
              ["Administrative control", "None", "Central policy and audit"],
              ["Appropriate for PHI", "Never", "Only under a signed BAA and an approved configuration"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Never enter protected health information into a consumer AI tool. Not a patient name, not a date of birth, not a diagnosis attached to any identifiable person — and not a document you have skimmed rather than read. Doing so is a disclosure of PHI to a third party without authorization, and it is reportable. If a task genuinely needs AI applied to patient data, that requires an enterprise agreement, a business associate agreement, and your employer's explicit approval. When in doubt, de-identify completely or do not use the tool.",
          },
          {
            type: "worked-example",
            title: "Getting AI help without disclosing anything",
            task: "Improve the wording of a difficult letter to a patient about a missed follow-up, without transmitting any patient information.",
            steps: [
              {
                move: "Decide what you actually need help with.",
                why: "You need help with tone and structure, not with this patient's specifics. Naming the real need reveals that the identifying details are not required for the task at all — which is usually the case.",
              },
              {
                move: "Write the request generically, with no identifiers.",
                why: "'Help me phrase a letter to a patient who missed a follow-up appointment, warm but clear about the importance of rescheduling' contains no PHI whatsoever and gets you the same quality of help.",
              },
              {
                move: "If you need structural feedback on your own draft, replace every identifier with a placeholder first.",
                why: "[PATIENT NAME], [DATE], [CONDITION]. Do this in a separate scratch copy, not in the real letter, so there is no chance of sending the placeholder version. And read the whole draft while doing it — identifiers hide in sentences you did not write.",
              },
              {
                move: "Apply the suggested wording to the real letter yourself, in your own system.",
                why: "The AI output is a template. Merging the real details happens inside the practice's systems, where the data belongs. The identifying information never crosses the boundary.",
              },
            ],
            result:
              "Better wording, with nothing identifiable transmitted to a third party.",
            takeaway:
              "Ask for the general help you actually need. The specifics almost never have to leave the building, and taking thirty seconds to strip them is the whole discipline.",
          },
          {
            type: "knowledge-check",
            question:
              "You want help rewording a letter about a patient's missed appointment. What is the appropriate approach?",
            options: [
              "Paste the letter in — AI providers have strong security",
              "Ask for help with the general situation using no identifiers, then apply the wording yourself",
              "Paste it but delete the conversation afterwards",
              "Change only the patient's surname and paste the rest",
            ],
            correctIndex: 1,
            explanation:
              "The tool can help with tone and structure without knowing anything about the specific patient. Requesting general guidance and applying it yourself keeps every identifier inside the practice, which is both the safe and the equally effective route.",
            optionRationales: [
              "Provider security is not the issue. The disclosure occurs the moment PHI is transmitted to a third party without authorization.",
              "Correct. Get generic help and merge the specifics yourself, inside your own systems.",
              "Deleting a conversation does not undo the transmission, and does not guarantee deletion from the provider's systems or logs.",
              "Changing a surname leaves date of birth, dates of service, condition, and other identifiers. Partial redaction is not de-identification.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Read the terms you have already agreed to.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the data usage policy for an AI tool you use. Determine whether your input is retained and whether it may be used for training. Note how hard it was to find.",
          "Check whether that vendor offers a business associate agreement, and on which tier.",
          "Take a realistic workplace request containing sensitive details and rewrite it as a generic prompt that gets the same help with nothing identifiable.",
          "Draft a three-rule policy for your practice on AI use, covering what may never be entered, what requires approval, and who to ask.",
        ],
      },
    ],
  },
];
