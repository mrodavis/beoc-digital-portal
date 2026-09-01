import { Lesson } from "@/types/lesson";

/** INFO 3035 Module 5 — The internet and networking: LAN, WAN, and how they work. */
export const cloudModule5Lessons: Lesson[] = [
  {
    slug: "understanding-the-internet",
    title: "Understanding the Internet",
    description:
      "Learn what actually happens between clicking a link and seeing a page, and use that model to diagnose problems accurately.",
    duration: "22 min",
    objectives: [
      "Describe what happens when you request a web page",
      "Explain the roles of IP addresses, DNS, and protocols",
      "Distinguish the internet from the World Wide Web",
      "Use the model to diagnose common connection problems",
    ],
    sections: [
      {
        heading: "What happens when you click a link",
        blocks: [
          {
            type: "scenario",
            role: "You are the first person staff ask when something breaks at Lakeside Medical Associates.",
            text: "A colleague says 'the internet is down.' The EHR will not load, but Outlook is receiving mail and a colleague's phone loads pages fine on the office wireless. Something is wrong, and 'the internet' is too vague to act on.",
            task: "Understand the steps well enough to isolate which one is failing.",
          },
          {
            type: "paragraph",
            text: "Requesting a web page involves several distinct steps, and knowing them turns a vague complaint into a specific diagnosis. Each step can fail independently, and each failure looks different.",
          },
          {
            type: "table",
            caption: "The steps in a page request",
            columns: ["Step", "What happens", "Failure looks like"],
            rows: [
              [
                "1. DNS lookup",
                "The name is translated to a numeric IP address",
                "Site not found, but the numeric address works",
              ],
              [
                "2. Connection",
                "Your device opens a connection to that address",
                "Timeout, or connection refused",
              ],
              [
                "3. Request",
                "Your browser asks for the specific page over HTTPS",
                "404 not found, or 403 forbidden",
              ],
              [
                "4. Server processing",
                "The server assembles the response",
                "500 server error, or a very slow page",
              ],
              [
                "5. Response and rendering",
                "Data returns in packets and the browser draws the page",
                "Partial page, missing images",
              ],
            ],
          },
          {
            type: "worked-example",
            title: "Diagnosing 'the internet is down'",
            task: "The EHR will not load. Outlook works. A phone on the same wireless loads pages fine.",
            steps: [
              {
                move: "Note what does work, not only what does not.",
                why: "Outlook receiving mail proves the machine has a working internet connection. That single observation eliminates the router, the ISP, and the wireless in one step — which is most of what 'the internet is down' would have implied.",
              },
              {
                move: "Check whether another device reaches the same service.",
                why: "The phone loading pages confirms general connectivity but does not test the EHR specifically. Try the EHR on the phone: if it fails there too, the problem is the EHR service rather than the workstation.",
              },
              {
                move: "Try the service by IP address if you have it, or try a different site.",
                why: "This separates a DNS failure from a service failure. If the name fails but the address works, DNS is the problem — a genuinely common cause that looks exactly like the site being down.",
              },
              {
                move: "Check the vendor's status page from a working device.",
                why: "Hosted services fail at the vendor's end regularly, and their status page will say so. Five seconds here can save an hour of investigating a problem that is not yours and that you cannot fix.",
              },
              {
                move: "Report it precisely.",
                why: "'The EHR times out from all workstations while other sites load normally, and the vendor status page shows an incident' is actionable. 'The internet is down' sends someone to check the router, which you already know is fine.",
              },
            ],
            result:
              "The failure is isolated to the EHR service, with evidence, before anyone touches the network.",
            takeaway:
              "Establish what works before investigating what does not. Each working thing eliminates whole categories of cause.",
          },
          {
            type: "knowledge-check",
            question:
              "A workstation cannot load any website by name, but loads a site correctly when its numeric IP address is typed directly. What is failing?",
            options: [
              "The internet connection itself",
              "DNS — name resolution is failing, though connectivity is fine",
              "The web browser needs reinstalling",
              "The websites are all down simultaneously",
            ],
            correctIndex: 1,
            explanation:
              "Reaching a site by IP proves the connection works end to end. What fails is translating names into addresses, which is DNS. This is a common and very recognizable failure once you know the symptom.",
            optionRationales: [
              "The connection is demonstrably working, since the numeric address loads the site.",
              "Correct. Connectivity is fine; name resolution is broken.",
              "The browser is functioning — it successfully loaded a page by address.",
              "Every site failing at once while direct addresses work points to name resolution, not to the sites themselves.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Observe the mechanism rather than reading about it.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a command prompt and run 'ping google.com'. Record the IP address returned and what the timings mean.",
          "Run 'tracert google.com' and count the hops between you and the destination. Note where the largest delay occurs.",
          "Run 'ipconfig /all' and find your device's IP address, default gateway, and DNS servers. Write one sentence on what each does.",
          "Write a five-step troubleshooting checklist for a colleague reporting that 'the internet is down', ordered so each step eliminates the most possibilities.",
        ],
      },
    ],
  },
  {
    slug: "lan-wan-and-networking",
    title: "Networking: LAN, WAN, and How They Connect",
    description:
      "Distinguish local from wide area networks, understand how a LAN moves data, and see how the two connect to reach the internet.",
    duration: "22 min",
    objectives: [
      "Distinguish a LAN from a WAN",
      "Explain how devices on a LAN communicate",
      "Describe the equipment connecting a LAN to the internet",
      "Compare wired and wireless connections and choose appropriately",
    ],
    sections: [
      {
        heading: "Two scales of network",
        blocks: [
          {
            type: "scenario",
            role: "Lakeside Medical Associates operates two locations.",
            text: "Each office has its own local network of workstations, printers, and wireless. The two offices need to share systems, and both need the internet. Three different kinds of connection are involved, and calling all of them 'the network' makes every conversation about them confusing.",
            task: "Distinguish the scales of network so you can describe where a problem or a requirement sits.",
          },
          {
            type: "paragraph",
            text: "A LAN is a local area network — the devices in one location, connected to each other, typically owned and managed by the organization. A WAN is a wide area network spanning locations, usually over infrastructure someone else owns. The internet is the largest WAN there is.",
          },
          {
            type: "table",
            caption: "LAN against WAN",
            columns: ["Property", "LAN", "WAN"],
            rows: [
              ["Covers", "One building or site", "Cities, countries, or globally"],
              ["Owned by", "The organization", "Telecom carriers and service providers"],
              ["Speed", "1 Gbps and upward, typically", "Limited by the purchased connection"],
              ["Latency", "Under a millisecond", "Tens of milliseconds or more"],
              ["Cost", "Equipment purchase", "Recurring service charges"],
              ["Example", "The workstations in one office", "The link between the two offices"],
            ],
          },
          {
            type: "paragraph",
            text: "Inside a LAN, each device has an IP address. A switch forwards traffic to the intended recipient rather than broadcasting it to everyone, which is what makes a switched network both fast and reasonably private. The router is the boundary — it connects the LAN to everything beyond it and decides what may cross.",
          },
          {
            type: "table",
            caption: "Wired against wireless",
            columns: ["Consideration", "Wired (Ethernet)", "Wireless (Wi-Fi)"],
            rows: [
              ["Speed", "Consistently fast", "Varies with distance and interference"],
              ["Reliability", "Very high", "Subject to interference and congestion"],
              ["Security", "Requires physical access", "Reachable from outside the building"],
              ["Mobility", "None", "The entire point"],
              ["Best for", "Workstations, printers, servers", "Laptops, tablets, phones, visitors"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The two offices are connected across the internet using a VPN, which encrypts traffic so it crosses public infrastructure safely. This gives the practice a private link at a fraction of the cost of a dedicated line — and for traffic that may include patient information, the encryption is a requirement rather than an optimization.",
          },
          {
            type: "knowledge-check",
            question:
              "Two Lakeside offices are connected over the internet using a VPN. What does the VPN provide?",
            options: [
              "A faster connection than the internet alone",
              "An encrypted tunnel across public infrastructure, so the two LANs can exchange traffic privately",
              "A separate physical cable between the offices",
              "Free internet access at both locations",
            ],
            correctIndex: 1,
            explanation:
              "A VPN encrypts traffic travelling over the public internet, so the two networks can communicate as though privately connected. It provides confidentiality, not additional bandwidth, and uses the existing connections rather than new cabling.",
            optionRationales: [
              "A VPN adds encryption overhead, so it is marginally slower rather than faster.",
              "Correct. It creates an encrypted tunnel over public infrastructure.",
              "No new cabling is involved — that is precisely the cost advantage over a dedicated line.",
              "Each office still pays for its own internet service.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Map a real network and reason about its structure.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Draw the network of a place you know. Show the modem, router, switch, access points, and every connected device, and label which are wired and which wireless.",
          "Mark the boundary between the LAN and the WAN on your diagram, and explain what crosses it.",
          "For each device, state whether wired or wireless is the better choice and why.",
          "Explain in three sentences why the two Lakeside offices need a VPN rather than simply connecting over the internet.",
        ],
      },
    ],
  },
];
