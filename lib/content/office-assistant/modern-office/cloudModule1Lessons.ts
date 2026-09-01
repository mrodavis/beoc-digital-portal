import { Lesson } from "@/types/lesson";

/**
 * INFO 3035 — Cloud Technology with AI.
 * Module 1: Computer basics and the virtual computer exercise.
 */
export const cloudModule1Lessons: Lesson[] = [
  {
    slug: "what-a-computer-is",
    title: "What a Computer Is and What It Does",
    description:
      "Identify the components of a computer, distinguish hardware from software, and understand the input-process-output model everything else is built on.",
    duration: "20 min",
    objectives: [
      "Define what a computer is and identify its main components",
      "Distinguish hardware from software",
      "Explain the input-process-output-storage model",
      "Describe what each major component contributes to performance",
    ],
    sections: [
      {
        heading: "One model explains every computer",
        blocks: [
          {
            type: "scenario",
            role: "You are starting the Cloud Technology with AI course at BEOC.",
            text: "Before you can reason about where computing happens in the cloud, you need a clear picture of where it happens on a machine in front of you. The cloud is not magic — it is somebody else's computers, in a building, running the same components sitting on your desk.",
            task: "Build a precise mental model of a computer, so 'the cloud' becomes a location rather than a mystery.",
          },
          {
            type: "paragraph",
            text: "A computer is a device that accepts input, processes it according to instructions, produces output, and stores data for later. Every computer follows this model — a phone, a laptop, a server in a data center, the machine in a vaccine refrigerator. What changes between them is scale, not structure.",
          },
          {
            type: "table",
            caption: "The four stages",
            columns: ["Stage", "Does", "Example components"],
            rows: [
              ["Input", "Accepts data and commands", "Keyboard, mouse, scanner, microphone, sensors"],
              ["Processing", "Executes instructions on that data", "CPU, and RAM as its working space"],
              ["Output", "Presents results", "Monitor, printer, speakers"],
              ["Storage", "Retains data when power is off", "SSD, hard drive, USB drive, cloud storage"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Hardware",
                definition: "The physical parts you could pick up — the components themselves.",
              },
              {
                term: "Software",
                definition: "The instructions telling the hardware what to do. It has no physical form.",
              },
              {
                term: "CPU",
                definition:
                  "The central processing unit, which executes instructions. More cores and higher clock speed mean more work done at once.",
              },
              {
                term: "RAM",
                definition:
                  "Temporary working memory holding what is currently in use. Its contents vanish when power is lost.",
              },
              {
                term: "Storage",
                definition:
                  "Permanent retention of files and programs. An SSD is far faster than a traditional hard drive.",
              },
              {
                term: "Motherboard",
                definition: "The main board every other component connects to.",
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The distinction between RAM and storage is the one worth getting right early. RAM is the desk you work on — fast, limited, and cleared when you leave. Storage is the filing cabinet — slower, much larger, and it keeps its contents. A machine that feels slow with many programs open usually needs more RAM; one that takes a long time to start up usually needs a faster drive.",
          },
          {
            type: "knowledge-check",
            question:
              "A workstation takes ninety seconds to start up and slows badly with several applications open. Which two upgrades address these two symptoms?",
            options: [
              "A larger monitor for startup and a faster CPU for multitasking",
              "An SSD for startup speed, and more RAM for running several applications at once",
              "More storage capacity for both symptoms",
              "A faster internet connection for both symptoms",
            ],
            correctIndex: 1,
            explanation:
              "Slow startup points to a mechanical hard drive, which an SSD fixes dramatically. Slowing down with many applications open points to insufficient RAM, since the system starts swapping data to disk when working memory runs out. Two symptoms, two different causes.",
            optionRationales: [
              "A monitor is an output device and affects neither symptom. The CPU is rarely the bottleneck for ordinary office multitasking.",
              "Correct. An SSD addresses startup time; additional RAM addresses multitasking.",
              "More capacity gives you room for more files. It does not make an existing slow drive faster.",
              "Both symptoms occur entirely on the local machine and are unaffected by network speed.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "The syllabus builds toward a virtual computer project. This is the specification stage.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Find the specifications of a computer you use: CPU model, RAM, storage type and size. On Windows, Settings > System > About shows most of it.",
          "Classify each component you found as input, processing, output, or storage.",
          "Specify a workstation for a medical office front desk running an EHR, a browser with many tabs, and Office. Justify each choice in a sentence.",
          "Specify a second machine for the same budget optimized for a different job — say, a machine that mostly displays a waiting-room slideshow. Explain what you changed and why.",
        ],
      },
    ],
  },
  {
    slug: "building-a-virtual-computer",
    title: "Building a Virtual Computer",
    description:
      "Specify a complete computer for a defined purpose and budget, and defend every component choice.",
    duration: "25 min",
    objectives: [
      "Match component specifications to a stated use case",
      "Read and compare technical specifications",
      "Work within a budget constraint and justify trade-offs",
      "Explain why the fastest component is not always the right one",
    ],
    sections: [
      {
        heading: "Specification is a series of trade-offs",
        blocks: [
          {
            type: "scenario",
            role: "Lakeside Medical Associates is replacing four workstations.",
            text: "The budget is $900 per machine. They run an EHR, Office, and a browser with a dozen tabs, all day, for five years. A gaming machine at that price would be poor value here, and so would the cheapest available laptop. The right specification comes from the workload, not from the price.",
            task: "Learn to specify a machine from the job it must do.",
          },
          {
            type: "paragraph",
            text: "Every specification is a trade-off within a budget. Money spent on one component is not available for another, so the skill is knowing which components affect the workload you actually have.",
          },
          {
            type: "table",
            caption: "What each component affects",
            columns: ["Component", "Affects", "For office work"],
            rows: [
              ["CPU", "Overall speed; how much runs at once", "A current mid-range chip is ample; high-end is wasted"],
              ["RAM", "How many programs and tabs before slowdown", "16 GB is the comfortable target; 8 GB is a floor"],
              ["Storage type", "Startup and file-opening speed", "An SSD is essential; this is the most noticeable upgrade"],
              ["Storage size", "How much you can keep locally", "Modest if files live on a server or in the cloud"],
              ["Graphics", "Visual rendering", "Integrated graphics are fine; a dedicated card is wasted"],
              ["Monitor", "Comfort and how much fits on screen", "Two modest monitors beat one expensive one for most office work"],
            ],
          },
          {
            type: "worked-example",
            title: "Specifying the front-desk workstation",
            task: "Specify a machine for EHR, Office, and heavy browser use, at $900, expected to last five years.",
            steps: [
              {
                move: "Start from the workload, not the price list.",
                why: "The workload is many applications open simultaneously, none of them computationally heavy. That immediately says RAM matters more than CPU here — and knowing that before looking at prices stops you being sold a fast processor you cannot use.",
              },
              {
                move: "Fix the non-negotiables first: an SSD and 16 GB of RAM.",
                why: "These two produce the largest felt difference for this workload. Spending here is the difference between a machine that feels fast for five years and one that frustrates people from month one.",
              },
              {
                move: "Choose a current mid-range CPU rather than the fastest affordable.",
                why: "This workload never saturates a modern processor. Money moved from CPU to RAM and a second monitor buys far more actual productivity, which is the point of the purchase.",
              },
              {
                move: "Add a second monitor rather than upgrading the first.",
                why: "Front-desk staff work across the EHR and a browser constantly. Two screens removes continuous window-switching — usually the single most valuable thing you can buy at this budget, and the one most often left out.",
              },
              {
                move: "Check the warranty and support terms before finalizing.",
                why: "A five-year expected life against a one-year warranty is a real risk. Business lines typically offer three-year on-site support for modest extra cost, and a failed workstation at the front desk is not a minor inconvenience.",
              },
            ],
            result:
              "A specification with an SSD, 16 GB RAM, mid-range CPU, dual monitors, and a warranty matching the expected life.",
            takeaway:
              "Specify from the workload. The fastest component is only the right one if the workload can actually use it.",
          },
          {
            type: "knowledge-check",
            question:
              "For a front-desk workstation running an EHR, Office, and many browser tabs, which upgrade delivers the most noticeable improvement for the money?",
            options: [
              "A high-end dedicated graphics card",
              "Increasing RAM from 8 GB to 16 GB",
              "The fastest available CPU",
              "A larger hard drive",
            ],
            correctIndex: 1,
            explanation:
              "This workload is defined by many applications open at once, which is precisely what RAM governs. When RAM runs out the system swaps to disk and everything slows noticeably. Graphics and CPU headroom go unused by office software.",
            optionRationales: [
              "Office applications and an EHR make no meaningful use of a dedicated GPU. Integrated graphics handle them completely.",
              "Correct. Many concurrent applications is a RAM-bound workload.",
              "A top-end CPU would sit idle. This workload does not stress the processor.",
              "More capacity does not make anything faster, and files here largely live on the server or in the cloud.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Produce a real specification you could hand to a purchaser.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Using a real retailer's site, specify a complete workstation for the front-desk scenario at $900 including monitors. List every component with its actual price.",
          "Write one sentence per component justifying the choice against the workload.",
          "Specify a second build at $600 and state exactly what you gave up and what that costs the user day to day.",
          "Identify the one component you would upgrade first if the budget rose by $150, and explain why that one.",
        ],
      },
    ],
  },
];
