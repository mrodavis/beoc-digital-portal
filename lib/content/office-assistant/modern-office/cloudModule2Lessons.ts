import { Lesson } from "@/types/lesson";

/** INFO 3035 Module 2 — Cloud computing basics: IaaS, PaaS, SaaS. */
export const cloudModule2Lessons: Lesson[] = [
  {
    slug: "what-cloud-technology-is",
    title: "What Cloud Computing Actually Is",
    description:
      "Understand what the cloud is, what changes when computing moves off your machine, and what it costs as well as what it saves.",
    duration: "22 min",
    objectives: [
      "Define cloud computing and its essential characteristics",
      "Explain what changes when computing moves off local hardware",
      "Distinguish public, private, and hybrid cloud",
      "Identify the genuine trade-offs of moving to the cloud",
    ],
    sections: [
      {
        heading: "Somebody else's computers, rented by the hour",
        blocks: [
          {
            type: "scenario",
            role: "Lakeside Medical Associates is deciding where its systems should run.",
            text: "The practice currently owns a server in a closet. It needs replacing, needs backups nobody has tested in a year, and stops the practice working entirely when it fails. A vendor proposes moving everything to the cloud. The manager wants to know what that actually means and what it would cost.",
            task: "Understand cloud computing precisely enough to explain the trade-off, not just the sales pitch.",
          },
          {
            type: "paragraph",
            text: "Cloud computing means using computing resources — servers, storage, applications — over the internet, provided and maintained by someone else, and paid for as you use them. The defining shift is from owning capacity to renting it.",
          },
          {
            type: "table",
            caption: "The characteristics that define cloud computing",
            columns: ["Characteristic", "Means"],
            rows: [
              ["On-demand self-service", "You provision resources yourself, without a purchase order"],
              ["Broad network access", "Reachable from any device with a connection"],
              ["Resource pooling", "Providers serve many customers from shared infrastructure"],
              ["Rapid elasticity", "Capacity scales up and down as demand changes"],
              ["Measured service", "You are billed for what you consume"],
            ],
          },
          {
            type: "table",
            caption: "Owning versus renting",
            columns: ["Consideration", "On-premises", "Cloud"],
            rows: [
              ["Upfront cost", "High — you buy the hardware", "Low — you pay as you go"],
              ["Ongoing cost", "Lower, but plus maintenance and staff", "Continuous subscription, forever"],
              ["Maintenance", "Yours: patching, backups, replacement", "The provider's"],
              ["Scaling", "Buy more hardware and wait", "Change a setting"],
              ["Works without internet", "Yes", "Generally not"],
              ["Physical control of data", "Complete", "Contractual rather than physical"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "The cloud is not automatically cheaper, and vendors rarely lead with that. It converts a large upfront purchase into a permanent operating cost, which is often the right trade for a small practice that cannot maintain a server properly — but over five years the total can exceed buying outright. Evaluate it on reliability, maintenance burden, and expertise you do not have, and treat any cost saving as something to verify rather than assume.",
          },
          {
            type: "table",
            caption: "Deployment models",
            columns: ["Model", "Means", "Suits"],
            rows: [
              ["Public cloud", "Shared infrastructure from a provider", "Most small organizations"],
              ["Private cloud", "Infrastructure dedicated to one organization", "Strict regulatory or control requirements"],
              ["Hybrid cloud", "A combination, with data moving between them", "Keeping sensitive data in-house while using public capacity"],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "What is the most accurate description of the change a practice makes when it moves from an on-premises server to the cloud?",
            options: [
              "It eliminates its technology costs entirely",
              "It exchanges owning and maintaining hardware for renting managed capacity, trading a large upfront cost for a permanent operating cost",
              "It makes its data more secure automatically",
              "It removes any dependence on its internet connection",
            ],
            correctIndex: 1,
            explanation:
              "The essential change is from owning capacity to renting it. That shifts maintenance to the provider and replaces a capital purchase with a continuing subscription. It is a real trade-off rather than a pure gain.",
            optionRationales: [
              "Costs do not disappear; they change shape from capital to operating expenditure and continue indefinitely.",
              "Correct. Owning and maintaining is exchanged for renting managed capacity.",
              "Providers offer strong infrastructure security, but misconfiguration by the customer is a leading cause of cloud breaches. Security is shared, not automatic.",
              "The opposite is true. Cloud services increase dependence on the connection, because without it nothing is reachable.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Evaluate a real decision rather than describing the concept.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List five cloud services you personally use. For each, note what it replaced.",
          "For Lakeside's server replacement, list four arguments for moving to the cloud and four for buying a new server.",
          "Estimate five-year costs both ways using real prices, stating your assumptions.",
          "Write a one-paragraph recommendation naming the deciding factor. It should not be cost alone.",
        ],
      },
    ],
  },
  {
    slug: "iaas-paas-saas",
    title: "IaaS, PaaS, and SaaS",
    description:
      "Learn the three cloud service models, what you manage in each, and how to tell which one a product actually is.",
    duration: "24 min",
    objectives: [
      "Define IaaS, PaaS, and SaaS and give examples of each",
      "Identify what the customer manages versus the provider in each model",
      "Choose the appropriate model for a given need",
      "Explain the shared responsibility model for security",
    ],
    sections: [
      {
        heading: "Three models, one question: how much do you manage?",
        blocks: [
          {
            type: "scenario",
            role: "You review vendor proposals at Lakeside Medical Associates.",
            text: "Three vendors all describe their product as 'cloud-based.' One provides virtual servers the practice must configure and patch. One provides a platform for building an application. One provides a finished scheduling application accessed in a browser. Calling all three 'the cloud' obscures the only thing that matters: who is responsible for what.",
            task: "Distinguish the three service models by what the customer is left managing.",
          },
          {
            type: "paragraph",
            text: "The three models form a stack. At each level upward, the provider manages more and you manage less — gaining convenience and losing control. There is no best model; there is only the right amount of responsibility for what you are trying to do.",
          },
          {
            type: "table",
            caption: "Who manages what",
            columns: ["Layer", "On-premises", "IaaS", "PaaS", "SaaS"],
            rows: [
              ["Application", "You", "You", "You", "Provider"],
              ["Data", "You", "You", "You", "You"],
              ["Runtime", "You", "You", "Provider", "Provider"],
              ["Operating system", "You", "You", "Provider", "Provider"],
              ["Virtualization", "You", "Provider", "Provider", "Provider"],
              ["Servers and storage", "You", "Provider", "Provider", "Provider"],
              ["Networking", "You", "Provider", "Provider", "Provider"],
            ],
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "IaaS — Infrastructure as a Service",
                definition:
                  "Rented virtual machines, storage, and networking. You install and maintain everything above the hardware. Examples: Amazon EC2, Azure Virtual Machines.",
              },
              {
                term: "PaaS — Platform as a Service",
                definition:
                  "A managed environment for running applications you write, without managing the servers or operating system. Examples: Azure App Service, Google App Engine.",
              },
              {
                term: "SaaS — Software as a Service",
                definition:
                  "A finished application you simply use. Examples: Google Workspace, Microsoft 365, most EHR systems.",
              },
            ],
          },
          {
            type: "paragraph",
            text: "A useful analogy is transport. IaaS is leasing a car — you drive, fuel, and maintain it. PaaS is a rental with servicing included — you drive, someone else maintains. SaaS is a taxi — you state a destination and someone else handles everything. The analogy also captures the trade: the taxi is easiest and gives you the least control over the route.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Notice that data is the customer's responsibility in every model, including SaaS. The provider secures the infrastructure; you remain responsible for who has access, whether sharing is configured correctly, and whether the data should be there at all. Most cloud breaches are customer misconfiguration rather than provider failure — an open storage bucket or an over-shared document, not a hacked data center.",
          },
          {
            type: "knowledge-check",
            question:
              "A practice uses a browser-based scheduling application. The vendor manages the servers, the operating system, and the application itself. What remains the practice's responsibility?",
            options: [
              "Nothing — the vendor manages everything in a SaaS model",
              "Its data, and who has access to it — including whether accounts and sharing are configured correctly",
              "Patching the operating system the application runs on",
              "Maintaining the physical servers in the vendor's data center",
            ],
            correctIndex: 1,
            explanation:
              "Under the shared responsibility model, data and access control always remain the customer's, in every service model. The vendor secures the infrastructure and the application; the practice decides who has accounts, what they can see, and whether departing staff are removed.",
            optionRationales: [
              "Data and access governance never transfer to the provider, whatever the model.",
              "Correct. Data and access control remain the customer's responsibility in every cloud model.",
              "In SaaS, the operating system is entirely the provider's responsibility.",
              "Physical infrastructure is the provider's in every cloud model.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Classify real products and reason about responsibility.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Classify each as IaaS, PaaS, or SaaS: Google Docs, Amazon EC2, Microsoft 365, Azure App Service, Dropbox, a hosted EHR.",
          "For the three vendor proposals in the scenario, identify each model and say what the practice would need to staff for in each case.",
          "Draw the responsibility table for a SaaS EHR, marking each layer as practice or vendor.",
          "List four things a practice must do to secure a SaaS application, given that the vendor secures the infrastructure.",
        ],
      },
    ],
  },
];
