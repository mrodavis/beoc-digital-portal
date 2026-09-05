import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/** Tourism and Hospitality Operations. */

const m1: Lesson[] = [
  {
    slug: "guest-service-fundamentals",
    title: "Guest Service Fundamentals",
    description:
      "What guests actually judge, why the recovery matters more than the mistake, and how to handle a complaint.",
    duration: "24 min",
    objectives: [
      "Describe the moments that shape a guest's overall impression",
      "Apply a service recovery sequence to a complaint",
      "Handle a request you cannot fulfill without losing the guest",
      "Explain why the recovery often matters more than the original failure",
    ],
    sections: [
      {
        heading: "Guests remember how it was fixed",
        blocks: [
          {
            type: "scenario",
            role: "You are at the front desk of a hotel.",
            text: "A guest's room was not ready at check-in, and they waited forty minutes. That is a genuine failure and you cannot undo it. What happens in the next three minutes determines whether they tell people about the wait or about how it was handled.",
            task: "Learn the recovery sequence, because failures are inevitable and recoveries are not.",
          },
          {
            type: "paragraph",
            text: "There is a well-observed pattern in hospitality: guests who experience a problem that is resolved well often rate their stay higher than guests who had no problem at all. That is not a reason to create problems, but it does mean a complaint is an opportunity rather than a disaster — and that how staff respond in the first minute matters more than the failure itself.",
          },
          {
            type: "table",
            caption: "A service recovery sequence",
            columns: ["Step", "What it does", "Sounds like"],
            rows: [
              ["Listen without interrupting", "Being heard defuses more than any offer", "Let them finish, even if you know the answer"],
              ["Acknowledge the impact", "Addresses the feeling before the facts", "“Forty minutes after a long flight — I'm sorry, that's not what we want.”"],
              ["Apologize without blaming", "Owns it for the property, not a colleague", "“I'm sorry” — not “housekeeping is behind today”"],
              ["Say what you will do, and when", "Replaces uncertainty with a specific", "“Your room is ready now, and I'm sending coffee up.”"],
              ["Do it, and follow up", "The promise is worthless without this", "Check back before the end of your shift"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Two things reliably make a complaint worse. Explaining why it happened before apologizing sounds like an excuse, however true it is — the guest hears you defending the property rather than acknowledging them. And blaming another department tells a guest that the organization does not function, which is a bigger problem than their room being late.",
          },
          {
            type: "paragraph",
            text: "When you cannot give a guest what they want, the technique is the same one that works everywhere: say what you can do rather than what you cannot. “We're fully booked tonight, but I can put you first on the upgrade list for tomorrow and I'll call you the moment anything opens” is the same refusal as “sorry, we're full”, and it lands completely differently.",
          },
          {
            type: "knowledge-check",
            question:
              "A guest complains angrily that their room was not ready. What should you do first?",
            options: [
              "Explain that housekeeping is short-staffed today",
              "Let them finish, then acknowledge the impact and apologize before explaining anything",
              "Offer a discount immediately to end the conversation",
              "Call a manager to handle it",
            ],
            correctIndex: 1,
            explanation:
              "Being heard defuses a complaint more effectively than any compensation. Explaining first sounds like an excuse and makes the guest feel their experience is being argued with. Acknowledge, apologize, then act — the explanation, if it is needed at all, comes last.",
            optionRationales: [
              "An explanation offered before an apology reads as a defense, whatever its accuracy.",
              "Correct. Listen, acknowledge, apologize, then resolve.",
              "Leading with compensation skips the acknowledgment, which is the part that actually resolves the feeling.",
              "Escalate when it is warranted, but a manager fetched immediately signals you cannot help them.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Recovery is a script you should have before you need it." },
      {
        type: "list",
        ordered: true,
        items: [
          "Write out the five recovery steps in your own words with a sentence you would actually say at each.",
          "Rewrite these as what-you-can-do statements: “We're fully booked.” “Check-in isn't until three.” “That's not included in your rate.”",
          "Recall a time you complained as a customer. Write down what the response got right or wrong against the five steps.",
          "Write a four-line response to a guest complaining about noise from an adjacent room at 2am.",
        ],
      },
    ],
  },
  {
    slug: "front-desk-and-reservations",
    title: "Front Desk and Reservations",
    description:
      "The operational core of a property: reservations, check-in, occupancy, and the money.",
    duration: "24 min",
    objectives: [
      "Describe the guest cycle from reservation to departure",
      "Explain overbooking and how a walk is handled",
      "Interpret the core occupancy and revenue metrics",
      "Handle payment and personal data appropriately",
    ],
    sections: [
      {
        heading: "The guest cycle, and where it goes wrong",
        blocks: [
          {
            type: "scenario",
            role: "You are working the front desk on a full night.",
            text: "The property is at 100% and two more guests arrive with confirmed reservations. This is overbooking, it is deliberate, and how you handle the next ten minutes is the difference between a guest who returns and one who posts about it.",
            task: "Understand the operational reasons behind the situations you will be asked to manage.",
          },
          {
            type: "table",
            caption: "The guest cycle",
            columns: ["Stage", "What happens", "Where it fails"],
            rows: [
              ["Pre-arrival", "Reservation, confirmation, special requests", "Requests recorded but never actioned"],
              ["Arrival", "Check-in, identification, payment authorization", "Room not ready; rate disputed"],
              ["Occupancy", "Housekeeping, service requests, issues", "Requests not passed on or not followed up"],
              ["Departure", "Check-out, folio review, payment", "Charges the guest does not recognize"],
              ["Post-departure", "Feedback, loyalty, follow-up", "A complaint arriving publicly rather than to you"],
            ],
          },
          {
            type: "paragraph",
            text: "Properties overbook deliberately, because a predictable percentage of reservations do not arrive and an empty room earns nothing. When the prediction is wrong, a guest is walked — relocated to a comparable property. Done properly, that means the property pays for the room and the transport, arranges it before telling the guest it is settled, and the guest leaves feeling looked after rather than turned away.",
          },
          {
            type: "table",
            caption: "The metrics a property runs on",
            columns: ["Metric", "Means", "Calculated as"],
            rows: [
              ["Occupancy", "Share of rooms sold", "Rooms sold ÷ rooms available"],
              ["ADR", "Average daily rate", "Room revenue ÷ rooms sold"],
              ["RevPAR", "Revenue per available room", "Room revenue ÷ rooms available, or occupancy × ADR"],
              ["Length of stay", "Average nights per booking", "Room nights ÷ number of bookings"],
              ["No-show rate", "Reservations that never arrive", "Drives how much the property overbooks"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "RevPAR is the one to understand, because it exposes a trade-off occupancy alone hides. A property at 90% occupancy with a low rate can earn less per available room than one at 70% with a higher rate. It is why management sometimes declines business that would fill rooms — the room is sold, but not profitably.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "Front desk staff handle payment cards and identity documents constantly. Never write a full card number anywhere, never store one outside the property management system, and never read a card number aloud where it can be overheard. Under PCI DSS, mishandling card data is a serious matter for the property, and a guest's passport or license details deserve the same care.",
          },
          {
            type: "knowledge-check",
            question:
              "A property is at 90% occupancy with an ADR of $100. Another is at 70% with an ADR of $150. Which has the higher RevPAR?",
            options: [
              "The first, because occupancy is higher",
              "The second — 70% × $150 = $105, against 90% × $100 = $90",
              "They are equal",
              "RevPAR cannot be compared between properties",
            ],
            correctIndex: 1,
            explanation:
              "RevPAR is occupancy multiplied by ADR, so it captures both how full a property is and what it earns per room. The second property is emptier and earns $15 more per available room, which is exactly why occupancy alone is a misleading measure of performance.",
            optionRationales: [
              "High occupancy at a low rate can and often does underperform.",
              "Correct — $105 against $90.",
              "They differ by $15 per available room.",
              "RevPAR exists precisely to make properties comparable.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Work with the real numbers — they are how the industry talks." },
      {
        type: "list",
        ordered: true,
        items: [
          "A 200-room property sells 150 rooms for $30,000. Calculate occupancy, ADR, and RevPAR.",
          "Research how a walk should be handled and write down what the property should pay for.",
          "Look up PCI DSS basics and note three rules that apply directly to a front desk.",
          "Map the five stages of the guest cycle for a property you have stayed at, and note where your experience broke down if it did.",
        ],
      },
    ],
  },
];

export const tourismHospitality: Program = {
  slug: "tourism-hospitality",
  group: "Technical Programs",
  title: "Tourism and Hospitality Operations",
  shortTitle: "Tourism & Hospitality",
  icon: "🏨",
  accent: "from-sky-700 to-sky-900",
  description:
    "Guest service and the operational core of a property: service recovery, the guest cycle, overbooking, and the occupancy and revenue metrics the industry runs on.",
  overview:
    "Hospitality is judged on moments rather than averages, and the moment that matters most is usually the one where something went wrong. This coursework covers the recovery sequence that turns a complaint into a returning guest, and then the operations behind the desk — why properties overbook deliberately, what happens when the prediction is wrong, and why a property at 70% occupancy can out-earn one at 90%.",
  outcomes: [
    "Apply a five-step service recovery sequence to a complaint",
    "Acknowledge and apologize before explaining, and know why the order matters",
    "Say what you can do rather than what you cannot",
    "Describe the five stages of the guest cycle and where each typically fails",
    "Explain why properties overbook and how a walk should be handled",
    "Calculate occupancy, ADR, and RevPAR, and interpret what each reveals",
    "Handle payment cards and identity documents appropriately",
  ],
  careerRoles: [
    "Front desk agent",
    "Guest services and concierge",
    "Reservations agent",
    "Housekeeping and operations supervision",
    "Events and banquet staff",
  ],
  credentialNote:
    "This is coursework rather than a credential. Hospitality roles are generally entered without formal certification, though optional industry credentials exist through bodies such as the American Hotel & Lodging Educational Institute. Where a role involves serving alcohol, most states require separate certified training, and food handling roles usually require a food handler card or manager certification — both are state or local requirements this course does not provide. Property management systems, brand standards, and metrics vary; the concepts here are general and your employer's procedures govern.",
  relatedCertifications: [
    { name: "Certified Guest Service Professional (CGSP)", body: "American Hotel & Lodging Educational Institute", note: "An entry-level guest service credential." },
    { name: "Food handler card", body: "State or local health authority", note: "Commonly required for any role handling food." },
    { name: "Responsible alcohol service", body: "State-approved providers", note: "Required in most states for serving alcohol; names vary by state." },
  ],
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "Guest Service & Front Desk Operations",
      emoji: "🛎️",
      description:
        "Service recovery, the guest cycle, overbooking and walks, and the metrics a property is measured on.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 48,
      whatYoullLearn: [
        "A five-step recovery sequence, and why explaining before apologizing backfires",
        "Turning a refusal into what you can do",
        "The guest cycle and the point in each stage where it usually fails",
        "Occupancy, ADR, and RevPAR — and why occupancy alone misleads",
      ],
      scenario:
        "A guest waited forty minutes for a room after a long flight. You cannot undo it, and the next three minutes decide what they tell people. Later that night the property is full and two more confirmed reservations walk through the door.",
    },
  ],
};
