import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "midterm-exam",
    title: "Midterm Exam",
    description:
      "Assessment covering patient workflow, revenue cycle, ICD, CPT, and HCPCS coding concepts from Modules 1–4.",
    objectives: [
      "Demonstrate what you have learned in the first half of the course",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Before you start",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The midterm is administered through Brightspace. Read each question fully before answering — coding questions frequently turn on a single qualifier such as 'outpatient', 'same day', or 'documented'. Where a question gives you a scenario, decide what the documentation supports before you look at the options.",
          },
        ],
      },
      {
        heading: "Exam Information",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The midterm exam is taken in class on Brightspace. It includes multiple choice, true/false, and short answer sections covering all material from Modules 1–4.",
          },
          {
            type: "paragraph",
            text: "The midterm counts for 20% of your final grade. Make sure you have reviewed the Module 4 study materials and completed the EHR Simulator midterm skills review lab.",
          },
        ],
      },
    ],
  },
  {
    slug: "patient-centered-care-and-cpoe-part-1",
    title: "Patient-Centered Medical Home, FQHC & CPOE Part 1",
    description:
      "Explore patient-centered care models and begin learning Computerized Provider Order Entry (CPOE) systems.",
    objectives: [
      "Describe the patient-centered medical home model",
      "Explain what a Federally Qualified Health Center is and who it serves",
      "Describe computerized provider order entry and the errors it prevents",
      "Explain how CPOE changes the work of clinical support staff",
    ],
    duration: "25 min",
    sections: [
      {
        heading: "Two models and one system",
        blocks: [
          {
            type: "scenario",
            role: "You are working in a community health center.",
            text: "The clinic is a Federally Qualified Health Center operating as a patient-centered medical home, and every order is entered through CPOE. Three pieces of jargon describe, respectively, how it is funded, how care is organized, and how orders are placed.",
            task: "Learn what each term actually means, because all three shape the work you will do.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Patient-centered medical home (PCMH)",
                definition: "A model in which a primary care team coordinates all of a patient's care, with an emphasis on access, continuity, and follow-through. Recognition is commonly awarded by NCQA.",
              },
              {
                term: "Federally Qualified Health Center (FQHC)",
                definition: "A community-based provider receiving federal funding to serve underserved populations. FQHCs must offer a sliding fee scale based on income and see patients regardless of ability to pay.",
              },
              {
                term: "CPOE",
                definition: "Computerized Provider Order Entry — providers enter medication, lab, imaging, and referral orders directly into the EHR rather than writing or dictating them.",
              },
              {
                term: "Clinical decision support (CDS)",
                definition: "Rules built into the EHR that alert a provider to a possible problem — a drug interaction, an allergy, a duplicate order.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "CPOE removes an entire class of error. A handwritten order had to be read by someone else and transcribed, and both steps could go wrong — illegible handwriting, a misread decimal point, an ambiguous abbreviation. An order entered directly by the provider is legible by construction and reaches the pharmacy or lab without an intermediate copy.",
          },
          {
            type: "callout",
            variant: "info",
            text: "CPOE changes what support staff do rather than reducing it. Verbal and telephone orders still occur and still require read-back and provider countersignature. Orders still need tracking to completion — an order placed is not a result received. And when an order is entered against the wrong patient, the audit trail shows who entered it, which is why patient verification before order entry matters as much as it ever did.",
          },
        ],
      },
      {
        heading: "Patient-Centered Medical Home (PCMH)",
        blocks: [
          {
            type: "paragraph",
            text: "The Patient-Centered Medical Home is a care delivery model that coordinates comprehensive primary care across specialties and settings. It emphasizes continuous, coordinated care and patient engagement.",
          },
          {
            type: "list",
            items: [
              "Accessible, team-based primary care",
              "Whole-person approach to health",
              "Coordinated referrals and follow-up",
              "Quality measurement and improvement",
            ],
          },
        ],
      },
      {
        heading: "Federally Qualified Health Centers (FQHCs)",
        blocks: [
          {
            type: "paragraph",
            text: "FQHCs are community-based healthcare providers that receive federal funding to provide primary care in underserved areas. They follow specific billing rules under Medicare and Medicaid.",
          },
        ],
      },
      {
        heading: "Introduction to CPOE",
        blocks: [
          {
            type: "paragraph",
            text: "Computerized Provider Order Entry (CPOE) allows clinicians to enter medical orders directly into the EHR system, replacing handwritten orders. CPOE reduces medication errors and improves workflow efficiency.",
          },
          {
            type: "callout",
            variant: "success",
            text: "CPOE was a core objective of the original Meaningful Use program, the EHR incentive payments created by the HITECH Act. That program is now called Promoting Interoperability. The last incentive payments were made in 2021, and Medicare now reduces payments to hospitals that do not meet the program's requirements. CPOE is no longer one of the program's objectives, which are electronic prescribing, health information exchange, patient access to their own data, and public health reporting. CPOE did not go away: it is now simply how orders are placed in a certified EHR.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "knowledge-check",
        question: "What is the primary benefit of Computerized Provider Order Entry (CPOE)?",
        options: [
          "It replaces the need for insurance verification",
          "It allows patients to order their own lab tests",
          "It reduces medication errors by eliminating handwritten orders",
          "It automates claim submission to insurance companies",
        ],
        correctIndex: 2,
        explanation: "CPOE eliminates the handwriting and transcription steps where a large share of medication errors originated. The provider enters the order directly, so it is legible by construction and reaches the pharmacy without an intermediate copy.",
        optionRationales: [
          "Insurance verification is a separate front-end process and is unaffected by how orders are entered.",
          "Patients do not place their own orders. Patient portals may allow requests, but an order requires a provider.",
          "Correct. Removing handwriting and transcription removes a major source of medication error.",
          "Claim submission is a back-end billing function, separate from order entry.",
        ],
      },
    ],
  },
  {
    slug: "provider-order-entry-lab",
    title: "EHR Simulator Lab: Provider Order Entry & Patient Chart Review",
    description:
      "Work as the provider in the BEOC EHR Simulator: verify the patient, enter and sign orders from the catalog, and review a chart and its results.",
    objectives: [
      "Verify patient identity before entering an order",
      "Enter and sign orders: search, configure, review, sign",
      "Review a chart and its results before deciding what to order",
    ],
    duration: "80 min",
    sections: [
      {
        heading: "Right patient, right order, every time",
        blocks: [
          {
            type: "scenario",
            role: "You are working the order entry lab in the BEOC EHR Simulator.",
            text: "Two charts are open in adjacent tabs. This is the single most common way an order reaches the wrong patient, and it happens to careful people working quickly.",
            task: "Build the verification habit while the patients are fictional.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Verify two identifiers against the chart you are actually in before entering anything — name and date of birth, never room or bed number. Close charts you are finished with rather than leaving them open. An order entered on the wrong patient is attributed to whoever was logged in, and the audit trail is unambiguous about that.",
          },
        ],
      },
      {
        heading: "In the Simulator",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Mr. Davis leads this hands-on lab focused on CPOE and chart review in the BEOC EHR Simulator. Today you work as the provider.",
          },
          {
            type: "simulator",
            title: "Review a chart before you order",
            path: "/ehr/patients",
            role: "Provider",
            steps: [
              "Switch to Provider. Search for Tamika Sorensen and open her chart. Read only; her chart is shared with the whole class.",
              "In Chart Review, read her recent encounters. In Problems, Medications, and Allergies, note what an ordering provider has to know before ordering anything.",
              "Open Results and read her Complete Blood Count. Check each value against its reference range and note any flag.",
              "Write two sentences: what you would want to know next, and what in the chart supports it.",
            ],
            done: "You can name her active problems and allergies without looking.",
          },
          {
            type: "simulator",
            title: "Enter and sign orders on your practice patient",
            path: "/ehr/patients",
            role: "Provider",
            steps: [
              "Search for your practice patient and open the chart. Before ordering, compare two identifiers in the header — name and date of birth — with the patient you meant to open.",
              "Open Orders. Search the catalog for Complete Blood Count, select it, and configure it: choose a priority and add a short detail, such as the reason for the order.",
              "Review the order, then sign it. The sequence is the lesson: search, configure, review, sign. An order is not an order until it is signed.",
              "Enter a second order from a different category — Chest X-Ray, 2 Views, or a Cardiology Consultation — and sign it.",
              "Find both orders on the Orders list and read their status.",
            ],
            done: "Your practice patient has two signed orders, and you checked the header before each one.",
          },
        ],
      },
    ],
  },
];
