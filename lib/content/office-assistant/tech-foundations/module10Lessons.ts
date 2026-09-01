import { Lesson } from "@/types/lesson";

/**
 * INFO 3023 Module 4 — Applications: Internet of Things, sessions 13-14.
 *
 * Syllabus objectives: understand basic principles of application development,
 * describe the features of apps versus OEM software, and design a simple SOHO
 * network.
 */
export const module10Lessons: Lesson[] = [
  {
    slug: "apps-and-how-software-is-built",
    title: "Applications, OEM Software, and How Software Gets Built",
    description:
      "Understand the basic principles of application development, and the real differences between an app, OEM software, and a web application.",
    duration: "22 min",
    objectives: [
      "Describe the stages of the software development lifecycle",
      "Distinguish native apps, web apps, and OEM software",
      "Explain why software requires updates throughout its life",
      "Evaluate an application before recommending it for workplace use",
    ],
    sections: [
      {
        heading: "What 'an app' actually is",
        blocks: [
          {
            type: "scenario",
            role: "You are asked to evaluate software at Lakeside Medical Associates.",
            text: "A vendor demonstrates a scheduling app. It looks excellent. Before the practice commits, someone needs to ask where the data is stored, who supports it, what happens when the vendor is acquired, and whether it will still work after the next operating system update. Nobody at the practice currently asks those questions.",
            task: "Understand how software is built and maintained well enough to evaluate it responsibly.",
          },
          {
            type: "paragraph",
            text: "An application is a program written to do a specific job for a user, as distinct from system software, which runs the machine itself. The word 'app' usually implies something smaller and installed from a store, but the distinction is one of convention rather than kind.",
          },
          {
            type: "table",
            caption: "Kinds of application software",
            columns: ["Type", "Runs", "Trade-off"],
            rows: [
              [
                "Native app",
                "Installed on the device, written for its operating system",
                "Fast, works offline, full device access — but must be built per platform and updated on each",
              ],
              [
                "Web app",
                "In a browser, on a remote server",
                "Any device, always current, nothing to install — but needs a connection",
              ],
              [
                "OEM software",
                "Shipped with hardware by its manufacturer",
                "Guaranteed to work with that hardware; often cannot be removed and may be neglected after release",
              ],
              [
                "Enterprise software",
                "On organizational servers or a vendor's cloud",
                "Built for scale and compliance; expensive and slow to change",
              ],
            ],
          },
          {
            type: "paragraph",
            text: "OEM stands for original equipment manufacturer. OEM software is what arrives on a device from whoever made it — the printer utility, the manufacturer's support tool, the preloaded trial suites. It is written for that specific hardware, which is its advantage, and it is frequently abandoned once the hardware generation is superseded, which is its risk.",
          },
        ],
      },
      {
        heading: "How software is made, and why it is never finished",
        blocks: [
          {
            type: "table",
            caption: "The software development lifecycle",
            columns: ["Stage", "What happens"],
            rows: [
              ["Requirements", "Establish what the software must do, and for whom"],
              ["Design", "Decide how it will be structured and how it will look"],
              ["Development", "Write the code"],
              ["Testing", "Verify it does what was specified and fails safely when it does not"],
              ["Deployment", "Release it to the people who will use it"],
              ["Maintenance", "Fix defects, patch security holes, adapt to platform changes"],
            ],
          },
          {
            type: "paragraph",
            text: "Maintenance is where most of a program's life is spent, and it is the stage people forget when evaluating software. Operating systems change, security vulnerabilities are discovered, and regulations shift. Software that is not actively maintained does not stay still — it decays, because the world around it moves.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Any software that touches patient information needs a specific set of answers before adoption: where the data is stored, whether the vendor will sign a business associate agreement, how access is controlled, what happens to the data if the practice stops using the product, and how long the vendor commits to security updates. A demonstration answers none of these. Ask them in writing.",
          },
          {
            type: "knowledge-check",
            question:
              "A practice is choosing between a native app installed on each workstation and a web app used in a browser. Staff need to work during brief internet outages. Which factor matters most?",
            options: [
              "The native app can work offline, while the web app requires a connection",
              "The web app is always faster because it runs on a server",
              "Native apps are inherently more secure than web apps",
              "Web apps cannot store data permanently",
            ],
            correctIndex: 0,
            explanation:
              "Offline capability is the decisive difference given the stated requirement. A native app runs locally and can continue working without a connection; a web app generally cannot. Every other consideration is secondary to the requirement that was actually named.",
            optionRationales: [
              "Correct. The stated need is working through outages, and only the native app does that.",
              "Server-side processing does not imply speed; network latency often makes web apps feel slower.",
              "Security depends on how each is built and configured, not on which category it belongs to.",
              "Web apps store data permanently on servers. That is where their data normally lives.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Evaluate real software the way a practice should.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List five applications you use regularly and classify each as native, web, OEM, or enterprise.",
          "Choose one and research: who maintains it, how often it is updated, and where it stores your data. Note anything you could not find out — that gap is itself a finding.",
          "Write five questions you would put to a vendor before your practice adopted software handling patient information.",
          "Find one piece of OEM software on a computer you use. Determine whether it is still supported, and write two sentences on the risk if it is not.",
        ],
      },
    ],
  },
  {
    slug: "internet-of-things",
    title: "The Internet of Things",
    description:
      "Understand what makes a device 'smart,' where IoT genuinely helps in a workplace, and the security problem these devices introduce.",
    duration: "20 min",
    objectives: [
      "Define the Internet of Things and give workplace examples",
      "Explain how an IoT device differs from a conventional appliance",
      "Identify the security risks IoT devices bring to a network",
      "Apply basic controls that reduce those risks",
    ],
    sections: [
      {
        heading: "A computer inside something that is not a computer",
        blocks: [
          {
            type: "scenario",
            role: "You manage office technology at Lakeside Medical Associates.",
            text: "The practice installs a smart thermostat, two network cameras, a connected refrigerator monitoring vaccine temperatures, and a smart doorbell. Each solves a real problem. Each is also a small computer on the practice's network, running software that may never be updated, sitting on the same network as the systems holding patient records.",
            task: "Understand what these devices are, so their benefits can be gained without opening the network.",
          },
          {
            type: "paragraph",
            text: "The Internet of Things describes everyday objects with a processor, a network connection, and usually sensors — devices that collect and transmit data without anyone operating them. The vaccine refrigerator is the clearest example of why this matters in healthcare: it monitors temperature continuously and alerts staff before a temperature excursion spoils inventory, which is a genuinely better outcome than someone checking a dial twice a day.",
          },
          {
            type: "table",
            caption: "IoT in a medical office",
            columns: ["Device", "Solves", "Risk it brings"],
            rows: [
              [
                "Vaccine refrigerator monitor",
                "Continuous temperature logging and alerts before loss",
                "Alerts depend on the network and the vendor's cloud being up",
              ],
              [
                "Smart thermostat",
                "Energy cost and comfort scheduling",
                "Often weak default credentials",
              ],
              [
                "Network cameras",
                "Physical security and after-hours monitoring",
                "A compromised camera is a live view inside the practice",
              ],
              [
                "Badge and door access",
                "Controlled entry with an audit trail",
                "A failure can lock staff out or let anyone in",
              ],
              [
                "Connected medical devices",
                "Readings flowing straight into the record",
                "Regulated; may transmit patient data",
              ],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "IoT devices are the weakest security link on most small networks. They frequently ship with default passwords, receive updates rarely or never, and are rarely inventoried — nobody thinks of a thermostat as a computer requiring patching. An attacker who compromises one is inside the network, and from there can reach anything else on it. This is the reason network segmentation, covered in the next lesson, matters so much.",
          },
          {
            type: "table",
            caption: "Basic IoT controls",
            columns: ["Control", "Why"],
            rows: [
              [
                "Change every default password at installation",
                "Default credentials are published and are the most common way these devices are compromised",
              ],
              [
                "Put IoT devices on a separate network from workstations",
                "A compromised device then cannot reach the systems holding patient records",
              ],
              [
                "Keep an inventory of every connected device",
                "You cannot secure or patch what nobody has written down",
              ],
              [
                "Check whether the vendor still issues updates",
                "An unsupported device is a permanent open vulnerability",
              ],
              [
                "Disable features you do not use",
                "Remote access left enabled by default is a common entry point",
              ],
            ],
          },
          {
            type: "knowledge-check",
            question:
              "Why is a smart thermostat considered a meaningful security risk on a medical office network?",
            options: [
              "It can overheat the server room and damage equipment",
              "It is a networked computer that is often unpatched and unmonitored, and a compromise puts an attacker inside the network",
              "It consumes bandwidth that the EHR system needs",
              "Thermostats are not a security risk, since they hold no patient data",
            ],
            correctIndex: 1,
            explanation:
              "The thermostat's own data is uninteresting; its network position is the problem. It is a small computer, often with default credentials and no update path, sitting on the same network as systems holding patient records. Compromising it gives an attacker a foothold from which to reach far more valuable systems.",
            optionRationales: [
              "A physical concern, and not the security issue in question.",
              "Correct. The risk is the foothold it provides, not the data the thermostat itself holds.",
              "Bandwidth use is negligible and is not a security matter.",
              "Holding no patient data does not make a device safe. Its value to an attacker is as an entry point.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Inventory and assess, the way a practice should before adding devices.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List every connected device in a home or workplace you know, including ones not normally thought of as computers.",
          "For three of them, find out whether the manufacturer still issues security updates. Note where you looked.",
          "Write a short IoT policy for a small medical office covering passwords, network placement, inventory, and end-of-support devices. Keep it to one page.",
          "Explain in three sentences why a compromised camera is more serious than a compromised thermostat, and why both still matter.",
        ],
      },
    ],
  },
  {
    slug: "designing-a-soho-network",
    title: "Designing a Simple SOHO Network",
    description:
      "Plan a small office network: the equipment, how the pieces connect, and the segmentation that keeps sensitive systems separate.",
    duration: "24 min",
    objectives: [
      "Identify the components of a small office network and what each does",
      "Distinguish LAN from WAN, and wired from wireless",
      "Design a segmented network appropriate to a small medical practice",
      "Explain why guest and IoT traffic must be separated from clinical systems",
    ],
    sections: [
      {
        heading: "The equipment and what each piece does",
        blocks: [
          {
            type: "scenario",
            role: "Lakeside Medical Associates is opening a second location.",
            text: "The new office needs eight workstations, two printers, wireless for staff, wireless for patients in the waiting room, four IoT devices, and a connection to the main office's systems. The vendor quote is one router, one switch, and a single wireless network for everyone. That design would put a patient's phone on the same network as the workstation holding patient records.",
            task: "Design a network where the pieces are separated according to what they are trusted with.",
          },
          {
            type: "key-terms",
            terms: [
              {
                term: "LAN",
                definition:
                  "Local Area Network — the devices in one location, connected to each other.",
              },
              {
                term: "WAN",
                definition:
                  "Wide Area Network — connections spanning locations. The internet is the largest WAN.",
              },
              {
                term: "Modem",
                definition:
                  "Connects your network to the internet service provider's line.",
              },
              {
                term: "Router",
                definition:
                  "Directs traffic between networks and between your LAN and the internet. It is the boundary of your network.",
              },
              {
                term: "Switch",
                definition:
                  "Connects wired devices within the LAN and forwards traffic only to the intended recipient.",
              },
              {
                term: "Access point",
                definition:
                  "Provides the wireless network. Often built into the router in a small office.",
              },
              {
                term: "Firewall",
                definition:
                  "Filters traffic by rule. Usually built into the router in a small office.",
              },
              {
                term: "VLAN",
                definition:
                  "A logical division of one physical network into separate segments that cannot reach each other by default.",
              },
            ],
          },
          {
            type: "worked-example",
            title: "Designing the second location's network",
            task: "Produce a network design for eight workstations, two printers, staff and guest wireless, four IoT devices, and a link to the main office.",
            steps: [
              {
                move: "Start from the internet connection and work inward: modem, then router.",
                why: "The router is the boundary and the place where separation is enforced. Designing outward from the devices tends to produce a flat network where everything can reach everything, which is exactly the vendor's proposal.",
              },
              {
                move: "Separate the network into segments by trust level.",
                why: "Four segments: clinical workstations, staff wireless, guest wireless, and IoT. Each holds devices trusted with different things. A patient's phone and a workstation with the EHR open have no business being able to reach each other, and segmentation is what makes that structural rather than a matter of hoping.",
              },
              {
                move: "Wire the workstations and printers; reserve wireless for devices that must move.",
                why: "Wired connections are faster, more reliable, and cannot be intercepted from the parking lot. A workstation that never moves has nothing to gain from wireless and something real to lose.",
              },
              {
                move: "Give the guest network internet access only, with no route to any internal segment.",
                why: "Waiting-room patients need the internet, not the practice's systems. Guest isolation is a standard router feature and takes minutes to enable — and skipping it is one of the most common small-office mistakes.",
              },
              {
                move: "Connect the two offices with a VPN over the internet.",
                why: "A VPN encrypts traffic across the public internet so the link behaves like a private connection at a fraction of the cost of a dedicated line. For traffic that may include patient information, the encryption is not optional.",
              },
              {
                move: "Document the design and label the physical equipment.",
                why: "The person troubleshooting at 7am will not be you, and an unlabeled rack costs an hour before any diagnosis starts. Documentation is part of the design, not an afterthought.",
              },
            ],
            result:
              "A segmented network where guest and IoT devices cannot reach clinical systems, and the two offices are linked over an encrypted connection.",
            takeaway:
              "Segment by trust level. The question is never only 'can these devices connect' but 'which devices should be able to reach which others.'",
          },
          {
            type: "callout",
            variant: "warning",
            text: "A flat network — everything on one segment — means any compromised device can reach every other. A patient's malware-infected phone on the same network as a workstation with the EHR open is a direct path to protected health information. Segmentation is the single most valuable network security measure available to a small practice, and on most business routers it costs nothing but configuration time.",
          },
          {
            type: "knowledge-check",
            question:
              "Why should patient wireless in the waiting room be on a separate network segment from clinical workstations?",
            options: [
              "To give clinical systems more bandwidth during busy periods",
              "So that a compromised patient device cannot reach systems holding patient records",
              "Because wireless and wired devices cannot share a network",
              "To reduce the practice's internet service cost",
            ],
            correctIndex: 1,
            explanation:
              "Segmentation is a containment measure. Devices the practice does not control — and cannot patch or inspect — must not be able to reach systems holding protected health information. Bandwidth is a real secondary benefit, but containment is the reason.",
            optionRationales: [
              "Bandwidth management is a genuine benefit but a secondary one. The primary reason is security.",
              "Correct. Untrusted devices are contained so they cannot reach clinical systems.",
              "Wired and wireless devices routinely share a network. That is not a technical constraint.",
              "Segmentation does not change what the practice pays for its connection.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Produce a design document, not just a diagram.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Draw a network diagram for the second location described in this lesson. Show the modem, router, switch, access points, and every device, and mark which segment each belongs to.",
          "Write a one-paragraph justification for each segment: what is on it, what it may reach, and what it may not.",
          "Identify the single point of failure in your design and propose a mitigation.",
          "List what you would document and label so that someone else could troubleshoot the network without you.",
        ],
      },
    ],
  },
];
