import { Lesson } from "@/types/lesson";

/**
 * INFO 3023 Module 2 — New Technology, sessions 8-10.
 *
 * Syllabus objectives: describe the history of the internet and of computing
 * devices, and understand the timeline over which they evolved.
 */
export const module9Lessons: Lesson[] = [
  {
    slug: "history-of-the-internet",
    title: "How the Internet Came to Exist",
    description:
      "Trace the internet from a research network to global infrastructure, and understand why its original design decisions still shape how it behaves today.",
    duration: "22 min",
    objectives: [
      "Outline the major stages in the internet's development",
      "Explain what packet switching is and why it was chosen",
      "Distinguish the internet from the World Wide Web",
      "Connect early design decisions to problems visible today",
    ],
    sections: [
      {
        heading: "Why the history is worth knowing",
        blocks: [
          {
            type: "scenario",
            role: "You support staff technology at Lakeside Medical Associates.",
            text: "A colleague asks why email arrives unencrypted by default, why phishing works so well, and why the practice needs so many security add-ons for something that 'just works.' The honest answer is historical: the network was built by a small group of researchers who trusted each other, and security was not among its original requirements.",
            task: "Learn the sequence well enough to explain why today's internet behaves the way it does.",
          },
          {
            type: "paragraph",
            text: "The internet was not designed as a consumer product. It began as a research project to connect a handful of universities and defense laboratories, and its founding assumptions — a small number of known, trusted participants — are visible in almost every security problem we have now.",
          },
          {
            type: "table",
            caption: "The major stages",
            columns: ["Period", "Development", "Why it mattered"],
            rows: [
              [
                "1960s",
                "Packet switching proposed; ARPANET funded",
                "Data split into packets routed independently, so no single failure stops delivery",
              ],
              [
                "1969",
                "ARPANET's first node-to-node message",
                "Four connected sites — the first working version of the idea",
              ],
              [
                "1970s",
                "TCP/IP developed",
                "A common protocol letting different networks interconnect — the actual birth of an 'internet'",
              ],
              [
                "1983",
                "ARPANET adopts TCP/IP",
                "Often treated as the internet's birthday",
              ],
              [
                "1984",
                "Domain Name System introduced",
                "Names instead of numeric addresses, which made the network usable by people",
              ],
              [
                "1989-1991",
                "Tim Berners-Lee proposes and releases the World Wide Web",
                "HTTP, HTML, and URLs — a way to link documents across the network",
              ],
              [
                "1993",
                "The Mosaic browser",
                "Images alongside text; the web becomes something non-specialists want to use",
              ],
              [
                "Late 1990s",
                "Commercial internet, search engines, e-commerce",
                "The network becomes public infrastructure",
              ],
              [
                "2000s",
                "Broadband, social platforms, smartphones",
                "Always-on and always-carried, rather than a place you went to",
              ],
              [
                "2010s onward",
                "Cloud computing, mobile-first, IoT",
                "Computing moves off the device and into data centers",
              ],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "Packet switching",
                definition:
                  "Splitting data into packets routed independently and reassembled at the destination. Chosen because it survives the loss of any single route.",
              },
              {
                term: "TCP/IP",
                definition:
                  "The protocol suite that lets dissimilar networks interoperate. IP routes packets; TCP ensures they arrive complete and in order.",
              },
              {
                term: "DNS",
                definition:
                  "The Domain Name System, which translates a name like beoc.cuny.edu into the numeric address computers actually use.",
              },
              {
                term: "The World Wide Web",
                definition:
                  "One service that runs on the internet — linked documents delivered over HTTP. Not a synonym for the internet.",
              },
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The internet and the web are not the same thing, and the distinction is genuinely useful. The internet is the network — the cables, routers, and protocols. The web is one application running on it, alongside email, video calls, file transfer, and the traffic your practice's EHR generates. When a colleague says 'the internet is down,' the useful diagnostic question is which of those has actually stopped.",
          },
          {
            type: "knowledge-check",
            question:
              "Why was packet switching chosen over a dedicated end-to-end connection for the early network?",
            options: [
              "It was cheaper to build with the hardware available at the time",
              "Packets route independently, so the network keeps working when a route fails",
              "It made messages more secure by encrypting each packet separately",
              "It allowed more users to be connected at the same time",
            ],
            correctIndex: 1,
            explanation:
              "Packet switching splits data into pieces that find their own way to the destination. If a link goes down, packets route around it. That resilience was the founding requirement — and note that security was not, which is why encryption had to be added later.",
            optionRationales: [
              "Cost was a consideration but not the driving one. Resilience was the design goal.",
              "Correct. Independent routing means no single failure stops the delivery.",
              "Packet switching provides no encryption at all. Security was added decades afterwards, which is precisely the historical point.",
              "It does use capacity more efficiently, but the reason it was chosen was survivability rather than user count.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Connect the history to something you can observe.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Build a timeline of eight events from this lesson. For each, write one sentence on what became possible that had not been before.",
          "Explain the difference between the internet and the web to someone non-technical, in three sentences, without using either word's definition circularly.",
          "Identify two security problems your practice faces that trace back to the network's original assumption of trusted participants. Explain the connection.",
          "Research one internet technology introduced in the last five years and write a paragraph on what problem it was created to solve.",
        ],
      },
    ],
  },
  {
    slug: "evolution-of-computing-devices",
    title: "The Evolution of Computing Devices",
    description:
      "Follow computing from room-sized machines to devices worn on the wrist, and understand the trend that explains where technology is heading next.",
    duration: "20 min",
    objectives: [
      "Describe the major generations of computing hardware",
      "Explain the trend toward smaller, cheaper, more connected devices",
      "Relate device evolution to how work is done in an office today",
      "Evaluate a new technology by what problem it solves",
    ],
    sections: [
      {
        heading: "One trend, repeated",
        blocks: [
          {
            type: "scenario",
            role: "You are asked to advise on equipment at Lakeside Medical Associates.",
            text: "The practice manager asks whether to replace the aging desktop workstations with laptops, tablets, or thin clients running everything from the cloud. Each option reflects a different stage of the same fifty-year trend, and knowing that trend is what makes the recommendation more than a guess.",
            task: "Understand the direction computing has moved, so you can reason about what comes next rather than only what exists now.",
          },
          {
            type: "paragraph",
            text: "The history of computing devices is essentially one trend expressed repeatedly: computing gets smaller, cheaper, and more connected, and each time it does, it reaches people who could not use it before. Every generation below is that same movement at a different scale.",
          },
          {
            type: "table",
            caption: "Generations of computing",
            columns: ["Era", "Device", "Who could use it"],
            rows: [
              [
                "1940s-50s",
                "Mainframes filling a room, using vacuum tubes",
                "Governments and large institutions; operated by specialists",
              ],
              [
                "1960s-70s",
                "Minicomputers, transistors, then integrated circuits",
                "Universities and larger businesses",
              ],
              [
                "1970s-80s",
                "The microprocessor and the personal computer",
                "Small businesses and, for the first time, individuals",
              ],
              [
                "1990s",
                "Networked PCs, laptops, the consumer internet",
                "Most offices and many households",
              ],
              [
                "2000s",
                "Smartphones — a connected computer in a pocket",
                "Effectively everyone",
              ],
              [
                "2010s",
                "Tablets, cloud services, wearables",
                "Computing without a computer in front of you",
              ],
              [
                "2020s",
                "IoT devices, edge computing, AI assistants",
                "Objects that compute without being thought of as computers",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "The trend has a consequence worth naming: as devices became connected, the important resource stopped being the machine and became the data and the network. A modern workstation is largely a window onto services running elsewhere, which is why a practice can lose a computer without losing any work — and why losing network access stops everything.",
          },
          {
            type: "worked-example",
            title: "Evaluating a new technology",
            task: "The practice manager asks whether Lakeside should adopt smart-watch notifications so clinical staff see alerts without checking a workstation.",
            steps: [
              {
                move: "Ask what problem it solves, specifically.",
                why: "'Staff miss alerts while away from a workstation' is a real problem worth solving. 'Everyone has smart watches now' is not a problem statement. A technology without a named problem is a purchase looking for a justification.",
              },
              {
                move: "Ask what it would replace or add to.",
                why: "If it adds a fourth notification channel to three that already exist, it likely increases noise rather than reducing missed alerts. Technology that adds rather than replaces usually adds work.",
              },
              {
                move: "Ask what new risk it introduces.",
                why: "A watch displaying patient information is a screen visible to anyone standing nearby, and it leaves the building on someone's wrist. That is a genuine privacy exposure requiring its own controls, and it is the question most likely to be skipped.",
              },
              {
                move: "Ask who supports it when it fails.",
                why: "Every device needs configuration, updates, and a person to call. A pilot with two users reveals the support burden cheaply; a practice-wide rollout discovers it expensively.",
              },
            ],
            result:
              "A recommendation grounded in the problem, the risk, and the support cost rather than in novelty.",
            takeaway:
              "Name the problem, name what it replaces, name the new risk, name who supports it. A technology that cannot answer all four is not ready to adopt.",
          },
          {
            type: "knowledge-check",
            question:
              "What single trend best describes the evolution of computing devices from mainframes to smartphones?",
            options: [
              "Devices became steadily more difficult to operate as they gained features",
              "Devices became smaller, cheaper, and more connected, reaching progressively more people",
              "Processing power moved from individuals back toward centralized institutions",
              "Each generation replaced the previous one completely",
            ],
            correctIndex: 1,
            explanation:
              "The consistent movement is toward smaller, cheaper, more connected devices, each generation reaching people the previous one could not. Mainframes needed trained operators; smartphones are used by billions with no training at all.",
            optionRationales: [
              "The opposite happened. Each generation became more usable, which is why the audience widened.",
              "Correct. Smaller, cheaper, more connected — and therefore accessible to progressively more people.",
              "Cloud computing does re-centralize processing, but access is now universal rather than institutional. The direction of access has been consistently outward.",
              "Generations overlap rather than replace. Mainframes still run banking and airline systems today.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Apply the evaluation framework to a real decision.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List every computing device you used yesterday, including ones you would not normally call computers. For each, note what it connects to.",
          "Pick one technology released in the last three years. Answer the four evaluation questions from the worked example for it.",
          "Write a recommendation to the practice manager on whether Lakeside should replace desktops with laptops, tablets, or thin clients. Name the trade-off in each option.",
          "Describe one task in a medical office that is done the same way it was twenty years ago, and explain why technology has not changed it.",
        ],
      },
    ],
  },
];
