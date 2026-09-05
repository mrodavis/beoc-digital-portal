import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * OSHA 30 with Site Safety and Flagging — EXAM AND CONCEPT PREPARATION ONLY.
 *
 * The OSHA 30-Hour card can only be issued through an OSHA-authorized trainer
 * delivering the full authorized curriculum with verified contact hours. This
 * coursework cannot and does not do that, and the credential note says so
 * plainly. It exists to make the authorized course easier to absorb and to
 * teach the underlying safety reasoning.
 */

const m1: Lesson[] = [
  {
    slug: "how-osha-works",
    title: "How OSHA Works and What Rights You Have",
    description:
      "The law behind workplace safety, what an employer must provide, and the rights that protect you for raising a concern.",
    duration: "24 min",
    objectives: [
      "Describe what OSHA is and what the General Duty Clause requires",
      "State the rights every worker has under the OSH Act",
      "Explain how to report a hazard and what protects you afterwards",
      "Identify what an employer must provide at no cost to you",
    ],
    sections: [
      {
        heading: "The rights are the part most workers do not know",
        blocks: [
          {
            type: "scenario",
            role: "You are new on a site and the guardrail on a scaffold is missing.",
            text: "Your foreman says it is fine for one day. You need this job. Raising it feels like a risk to your employment, and staying quiet feels like a risk to your body. Most workers in that position say nothing, and most do not know the law is on their side.",
            task: "Learn what you are entitled to, because the protection only works if you know it exists.",
          },
          {
            type: "paragraph",
            text: "The Occupational Safety and Health Act of 1970 created OSHA and established a basic principle: employers must provide a workplace free from recognized hazards likely to cause death or serious physical harm. That sentence is the General Duty Clause, and it applies even where no specific standard covers the hazard.",
          },
          {
            type: "table",
            caption: "Your rights under the OSH Act",
            columns: ["Right", "What it means"],
            rows: [
              ["A safe workplace", "Free from recognized serious hazards"],
              ["Training", "In a language and vocabulary you understand"],
              ["Information", "Access to injury and illness records, and to hazard information for chemicals you work with"],
              ["To report a hazard", "To your employer or to OSHA, and to request an inspection"],
              ["Protection from retaliation", "It is illegal to fire, demote, or punish you for raising a safety concern"],
              ["To speak to an inspector", "Privately, during an OSHA inspection"],
              ["Free protective equipment", "Most required PPE is provided by the employer at no cost to you"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Retaliation for raising a safety concern is illegal, and there is a deadline. A complaint about retaliation under the OSH Act must generally be filed within 30 days of the retaliatory act — that window is short and it is not widely known. If you are disciplined or dismissed after raising a hazard, act quickly rather than waiting to see whether things settle down.",
          },
          {
            type: "paragraph",
            text: "You may file a safety complaint with OSHA and request that your name not be revealed to your employer. Complaints can be filed online, by phone, by mail, or in person at an area office. You do not need to prove the violation — describing what you have seen is enough to prompt a review.",
          },
          {
            type: "knowledge-check",
            question:
              "Your employer tells you that you must buy your own hard hat and safety glasses. Is that correct?",
            options: [
              "Yes — PPE is a personal expense",
              "No — most required PPE must be provided by the employer at no cost, with limited exceptions such as ordinary safety-toe footwear and prescription eyewear",
              "Yes, but only for temporary workers",
              "It depends entirely on the state",
            ],
            correctIndex: 1,
            explanation:
              "OSHA requires employers to pay for most PPE needed to comply with its standards. There are narrow exceptions — notably everyday safety-toe boots and prescription safety eyewear that employees take off-site — but hard hats and general safety glasses are the employer's responsibility.",
            optionRationales: [
              "The general rule is the opposite: the employer pays.",
              "Correct, including the limited exceptions.",
              "The requirement does not turn on employment status.",
              "This is a federal standard, though some state plans are stricter.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find the real documents. OSHA publishes everything free." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the OSHA Workers' Rights publication and read the section on retaliation.",
          "Find out whether your state has its own OSHA-approved state plan, and note what that changes.",
          "Locate your nearest OSHA area office and record how a complaint is filed.",
          "Write out what you would say to a supervisor about a missing guardrail, in three sentences, without being confrontational.",
        ],
      },
    ],
  },
  {
    slug: "the-focus-four",
    title: "The Focus Four Hazards",
    description:
      "Falls, struck-by, caught-in, and electrocution account for most construction deaths. These four are where the attention goes.",
    duration: "26 min",
    objectives: [
      "Name the Focus Four and why they are singled out",
      "Describe fall protection requirements and when they trigger",
      "Identify struck-by and caught-in hazards on a site",
      "Apply basic electrical safety, including lockout/tagout",
    ],
    sections: [
      {
        heading: "Four hazards, most of the fatalities",
        blocks: [
          {
            type: "scenario",
            role: "You are walking a site for the first time.",
            text: "There is a lot to look at. Focusing on everything means focusing on nothing — so start with the four categories that account for the majority of construction deaths, because if those are controlled the site is usually being run properly.",
            task: "Learn the four, and learn what each looks like before it causes harm.",
          },
          {
            type: "table",
            caption: "The Focus Four",
            columns: ["Hazard", "Typical cause", "Primary control"],
            rows: [
              ["Falls", "Unprotected edges, holes, improper ladder and scaffold use", "Guardrails, covers, personal fall arrest"],
              ["Struck-by", "Vehicles, falling objects, swinging loads", "High-visibility clothing, hard hats, exclusion zones, toe boards"],
              ["Caught-in / between", "Trench collapse, unguarded machinery, pinch points", "Protective systems, machine guarding, lockout/tagout"],
              ["Electrocution", "Contact with power lines, damaged cords, missing grounding", "De-energizing, GFCI, clearance distances, lockout/tagout"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Falls are the leading cause of death in construction, and the trigger height in construction is generally six feet above a lower level. General industry uses four feet. That difference matters and is commonly confused — verify the standard for the work you are actually doing rather than assuming one figure covers everything.",
          },
          {
            type: "paragraph",
            text: "Trenching deserves specific mention because it kills quickly and the danger is not intuitive. A cubic yard of soil weighs roughly as much as a small car, and a collapse gives no warning and no time to escape. Protective systems — sloping, shoring, or shielding — are generally required at five feet, and a competent person must inspect the excavation daily and after any rain.",
          },
          {
            type: "worked-example",
            title: "Assessing a work-at-height task",
            task: "You are asked to work on a flat roof eighteen feet up with an unprotected edge.",
            steps: [
              {
                move: "Ask whether the fall hazard can be removed rather than protected against.",
                why: "The hierarchy of controls puts elimination first. Doing the work from the ground, or from a lift, removes the hazard entirely — which is always better than managing it. This question is skipped far too often.",
              },
              {
                move: "If it cannot, check what protection is in place at the edge.",
                why: "Guardrails protect everyone passively, with nothing to put on and nothing to remember. That makes them more reliable than equipment depending on each worker using it correctly every time.",
              },
              {
                move: "If personal fall arrest is the answer, check the whole system, not the harness.",
                why: "A harness is one part. You need an anchor rated for the load, a lanyard or lifeline, and enough clearance below that you stop before hitting anything. A correctly worn harness with insufficient fall clearance does not save you.",
              },
              {
                move: "Inspect your equipment before every use.",
                why: "Cuts, fraying, chemical damage, or evidence a component has already arrested a fall all mean the equipment is out of service. A harness that has taken a fall is discarded, not reused.",
              },
              {
                move: "If protection is absent, stop and raise it.",
                why: "This is what the rights in the previous lesson are for. An unprotected leading edge at eighteen feet is a fatality waiting for a moment of inattention, and you are entitled to say so.",
              },
            ],
            result: "Either the hazard is removed, or a complete and inspected protective system is in place before work starts.",
            takeaway: "Eliminate first, protect passively second, and treat personal fall arrest as a whole system rather than a harness.",
          },
          {
            type: "knowledge-check",
            question:
              "In construction, at what height does fall protection generally become required?",
            options: ["Four feet", "Six feet", "Ten feet", "Whenever the worker feels unsafe"],
            correctIndex: 1,
            explanation:
              "Construction generally requires fall protection at six feet above a lower level. General industry uses four feet, which is why the two are often confused — check the standard that applies to the work being done.",
            optionRationales: [
              "Four feet is the general industry trigger, not construction.",
              "Correct for construction, with scaffolding and steel erection having their own provisions.",
              "Ten feet is not a general trigger height.",
              "Worker judgment is important, but the requirement is a defined height.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "OSHA publishes the standards and the fatality data free." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find OSHA's construction fall protection standard and note the trigger height and the acceptable methods.",
          "Research the hierarchy of controls and write out all five levels in order.",
          "Find the trenching requirements: the depth at which protective systems are required, and who must inspect.",
          "For a workplace you know, identify one hazard in each Focus Four category and the control that applies to it.",
        ],
      },
    ],
  },
];

const m2: Lesson[] = [
  {
    slug: "site-safety-and-hazard-communication",
    title: "Site Safety and Hazard Communication",
    description:
      "PPE, chemical safety, and the labelling system every site uses.",
    duration: "22 min",
    objectives: [
      "Select PPE appropriate to a task",
      "Read a safety data sheet and find what you need quickly",
      "Interpret GHS pictograms and signal words",
      "Describe what a site safety orientation should cover",
    ],
    sections: [
      {
        heading: "Hazard communication has one purpose: you can find out what you are working with",
        blocks: [
          {
            type: "scenario",
            role: "You are handed a container to use on site.",
            text: "The label is worn and the drum was decanted from something larger. Nobody can tell you exactly what is in it. Every chemical on a site is required to be identified and documented, and this one is not.",
            task: "Learn what the system requires, so you can tell when it has failed.",
          },
          {
            type: "paragraph",
            text: "OSHA's Hazard Communication Standard gives workers the right to know what chemicals they work with. It requires labelled containers, accessible safety data sheets, and training. The system was aligned with the Globally Harmonized System, which is why labels now carry standard pictograms and a consistent 16-section data sheet format.",
          },
          {
            type: "table",
            caption: "The SDS sections you will actually use",
            columns: ["Section", "Tells you"],
            rows: [
              ["1 — Identification", "What it is and who makes it"],
              ["2 — Hazards", "The pictograms, signal word, and hazard statements"],
              ["4 — First aid", "What to do on exposure — the section to find in an emergency"],
              ["7 — Handling and storage", "How to use and store it safely"],
              ["8 — Exposure controls / PPE", "What protection is required"],
              ["Signal word", "DANGER for more severe hazards, WARNING for less"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "An unlabelled container is itself a violation, and it is also a practical danger — an SDS is useless if nobody knows which sheet applies. Never use a chemical from a container you cannot identify, and never decant into an unlabelled secondary container. Learn where the SDS binder or terminal is on day one, not on the day someone is splashed.",
          },
          {
            type: "table",
            caption: "PPE by hazard",
            columns: ["Hazard", "Protection"],
            rows: [
              ["Falling objects", "Hard hat"],
              ["Flying particles, splash", "Safety glasses, goggles, or face shield"],
              ["Noise above the action level", "Ear plugs or muffs, with hearing conservation"],
              ["Dust, fumes, vapors", "Respirator — requires fit testing, medical clearance, and training"],
              ["Cuts, chemicals, heat", "Gloves matched to the specific hazard"],
              ["Vehicle traffic", "High-visibility garment of the correct class"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Respirators are not simply PPE you put on. Using one requires a medical evaluation, a fit test for the specific make and model, and training — because an unfitted respirator provides far less protection than its rating suggests while feeling entirely adequate. Facial hair that crosses the seal breaks it regardless of fit testing.",
          },
          {
            type: "knowledge-check",
            question:
              "You need to know what to do if a chemical splashes in someone's eyes. Which SDS section do you go to?",
            options: ["Section 1, Identification", "Section 2, Hazards", "Section 4, First aid measures", "Section 8, Exposure controls"],
            correctIndex: 2,
            explanation:
              "Section 4 gives first aid measures by route of exposure. Because the sixteen sections are in a fixed order on every SDS, you can go straight to the number without reading the document — which is the point of standardizing the format.",
            optionRationales: [
              "Section 1 identifies the product and supplier.",
              "Section 2 describes the hazards but not the response.",
              "Correct — Section 4 is first aid, and its position is the same on every SDS.",
              "Section 8 covers PPE and exposure limits, which is prevention rather than response.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Work with a real SDS — they are freely available for almost any product." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find an SDS for a common product and locate sections 2, 4, and 8. Note how long it took.",
          "Learn the nine GHS pictograms and what each signifies.",
          "Research what a respirator fit test involves and how often it must be repeated.",
          "For a job you have done, list every PPE item required and the specific hazard each addresses.",
        ],
      },
    ],
  },
  {
    slug: "flagging-and-work-zone-safety",
    title: "Flagging and Work Zone Safety",
    description:
      "Directing traffic safely, and why flagging carries its own certification requirement.",
    duration: "22 min",
    objectives: [
      "Describe the parts of a temporary traffic control zone",
      "State the standard flagging signals and equipment",
      "Explain what makes a flagger station safe or unsafe",
      "Identify the certification flagging usually requires",
    ],
    sections: [
      {
        heading: "The flagger is the most exposed person on the site",
        blocks: [
          {
            type: "scenario",
            role: "You are assigned to flag on a two-lane road.",
            text: "Your protection consists of a vest, a sign, and drivers paying attention. Two of those three are reliable. Flaggers are struck and killed every year, and the position of your station is most of what determines whether that risk is managed.",
            task: "Learn what a properly set up flagging operation looks like, and what to do when yours is not.",
          },
          {
            type: "paragraph",
            text: "Temporary traffic control is governed by the Manual on Uniform Traffic Control Devices, which most states adopt or adapt. It defines the zones a work area is divided into, and the distances between them are calculated from the speed of approaching traffic — not estimated on site.",
          },
          {
            type: "table",
            caption: "The parts of a traffic control zone",
            columns: ["Zone", "Purpose"],
            rows: [
              ["Advance warning area", "Tells drivers what is ahead, before they can see it"],
              ["Transition area", "Moves traffic out of its normal path, using a taper"],
              ["Buffer space", "Empty space giving an errant vehicle room to stop before reaching workers"],
              ["Activity area", "Where the work happens"],
              ["Termination area", "Returns traffic to normal"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "The buffer space is deliberately empty and it is not storage. Parking a vehicle, stacking materials, or standing in it removes the margin that exists for a driver who is not paying attention. A buffer space being used for anything is one of the clearest signs a work zone is not being run correctly.",
          },
          {
            type: "table",
            caption: "Standard flagging equipment and signals",
            columns: ["Item / signal", "Detail"],
            rows: [
              ["STOP/SLOW paddle", "The primary device. A red flag is for emergencies only"],
              ["High-visibility apparel", "Class 2 or 3 depending on speed and conditions; Class 3 for night or high speed"],
              ["To stop traffic", "Face traffic, hold the STOP face toward them, raise the free arm palm out"],
              ["To let traffic proceed", "Show the SLOW face and motion with the free hand"],
              ["To slow traffic", "Show SLOW and lower the free hand in a slowing motion"],
              ["Escape route", "Planned before work starts — where you go if a vehicle does not stop"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "Two things distinguish a safe flagger station: it is visible to approaching drivers with enough distance to stop, and it is never in the path of traffic. Stand on the shoulder or in a closed lane, not in a live one. And know your escape route before you need it — a flagger who has to decide where to go in the moment does not have time to decide.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Flagger certification is a separate requirement from OSHA training, and most states require it. It is typically issued through an approved provider — ATSSA or a state DOT program are common — and usually carries an expiry. Completing OSHA 30 does not make you a certified flagger, and this coursework does not either.",
          },
          {
            type: "knowledge-check",
            question:
              "What is the buffer space in a work zone for?",
            options: [
              "Storing equipment and materials close to the work",
              "Empty space giving an errant vehicle room to stop before it reaches workers",
              "Parking for the work crew's vehicles",
              "The area where the flagger stands",
            ],
            correctIndex: 1,
            explanation:
              "The buffer space exists specifically to be empty. It is the margin for a driver who does not slow or stop in time, and putting anything in it — vehicles, materials, or people — removes the protection it provides.",
            optionRationales: [
              "Storing materials there defeats its entire purpose.",
              "Correct. It is deliberately empty space.",
              "Parking in the buffer removes the margin and creates a struck-by hazard.",
              "The flagger station is positioned separately, out of the path of traffic.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Traffic control is governed by published standards — work from them." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your state's flagger certification requirement: who issues it, what it costs, and how long it lasts.",
          "Look up the MUTCD taper length formula and calculate the required taper for a 45 mph road.",
          "Find the high-visibility apparel class required for night work on a highway.",
          "Observe a real work zone from a safe distance and identify each of the five zones. Note anything that does not match the standard.",
        ],
      },
    ],
  },
];

export const osha30: Program = {
  slug: "osha-30",
  group: "Technical Programs",
  title: "OSHA 30 with Site Safety and Flagging",
  shortTitle: "OSHA 30 & Site Safety",
  icon: "🦺",
  accent: "from-orange-700 to-orange-900",
  description:
    "Concept preparation for the OSHA 30-Hour Construction course: worker rights, the Focus Four hazards, hazard communication, PPE, and work zone flagging.",
  overview:
    "This is preparation for an authorized OSHA 30 course, not the course itself — see the note below, which matters. It covers the reasoning behind the standards: why fall protection triggers where it does, why the buffer space in a work zone is deliberately empty, why an unlabelled container is both a violation and a practical danger. It also covers the part workers most often do not know, which is what rights they have and how short the deadline is for acting on retaliation.",
  outcomes: [
    "Describe the General Duty Clause and the rights workers hold under the OSH Act",
    "Recognize retaliation and know the deadline for acting on it",
    "Identify the Focus Four hazards and the primary control for each",
    "State the fall protection trigger height and distinguish construction from general industry",
    "Apply the hierarchy of controls, starting with elimination",
    "Read a safety data sheet and go straight to the section you need",
    "Select PPE by hazard, and explain why respirators require fit testing",
    "Describe the five parts of a traffic control zone and what the buffer space is for",
    "State the standard flagging signals and what makes a station safe",
  ],
  careerRoles: [
    "Construction laborer and skilled trades",
    "Site safety support",
    "Traffic control flagger, once certified",
    "Warehouse, maintenance, and industrial roles",
  ],
  credentialNote:
    "IMPORTANT — this coursework does not issue an OSHA card and cannot. The OSHA 30-Hour Construction Outreach card is only available through an OSHA-authorized trainer delivering the full authorized curriculum with verified contact hours, and there is no equivalent, challenge exam, or online substitute outside an authorized provider. Anyone selling you a card without that is selling a card that will not stand up. Flagger certification is separate again, is usually required by your state, and comes through an approved provider such as ATSSA or a state DOT program. Use this course to arrive at the authorized training already understanding the material — not in place of it. Standards, trigger heights, and state requirements change; OSHA's published standards and your state plan are always the authority.",
  relatedCertifications: [
    { name: "OSHA 30-Hour Construction Outreach card", body: "OSHA-authorized trainers only", note: "Requires the full authorized course with verified hours. Cannot be earned from this coursework." },
    { name: "Flagger certification", body: "ATSSA, state DOT, or another approved provider", note: "Separate from OSHA training, required by most states, and typically time-limited." },
    { name: "OSHA 10-Hour Construction", body: "OSHA-authorized trainers only", note: "The shorter entry-level card, with the same authorized-provider requirement." },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "OSHA & the Focus Four",
      emoji: "⚠️",
      description:
        "The law, your rights, and the four hazards that account for most construction deaths.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 50,
      whatYoullLearn: [
        "The General Duty Clause and the seven rights every worker holds",
        "Retaliation protection, and the short deadline for acting on it",
        "Falls, struck-by, caught-in, and electrocution — and the control for each",
        "The hierarchy of controls, and treating fall arrest as a whole system",
      ],
      scenario:
        "A guardrail is missing on a scaffold and your foreman says it is fine for one day. You need the job. Most workers in that position say nothing — and most do not know the law is on their side, or that the deadline for acting on retaliation is thirty days.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Site Safety & Flagging",
      emoji: "🚧",
      description:
        "Hazard communication, PPE selection, and running a work zone that protects the person directing traffic.",
      lessons: m2,
      level: "Intermediate",
      estimatedMinutes: 44,
      whatYoullLearn: [
        "Reading an SDS and going straight to the section you need",
        "Selecting PPE by hazard, and why respirators need fit testing",
        "The five parts of a traffic control zone",
        "Standard flagging signals, station placement, and planning an escape route",
      ],
      scenario:
        "You are handed a decanted container nobody can identify. Later you are assigned to flag a two-lane road, protected by a vest, a sign, and drivers paying attention — and only two of those three are reliable.",
    },
  ],
};
