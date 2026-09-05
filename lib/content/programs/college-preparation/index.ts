import { Lesson } from "@/types/lesson";
import { Program } from "@/types/program";

/**
 * College Preparation — Academic Bridge.
 *
 * Builds on ENG0300 (reading) and ENGL0150 (writing) rather than repeating
 * them. The focus here is everything else college asks of a student:
 * navigating the institution, managing time and money, studying in ways that
 * actually work, and knowing what to do when something goes wrong.
 */

const m1: Lesson[] = [
  {
    slug: "what-college-expects",
    title: "What College Actually Expects",
    description:
      "The difference between high school and college is not difficulty — it is who is responsible for what.",
    duration: "20 min",
    objectives: [
      "Describe how responsibility shifts from the institution to the student",
      "Read a syllabus as a contract and find what it obliges you to do",
      "Estimate the out-of-class hours a course actually requires",
      "Identify the moments in a term where students most often fall behind",
    ],
    sections: [
      {
        heading: "Nobody is going to chase you",
        blocks: [
          {
            type: "scenario",
            role: "You are three weeks into your first term.",
            text: "In high school, a missed assignment produced a phone call home. Here, nothing happens. No one emails, no one asks. The assignment is simply a zero, and you find out at midterm when the grade appears. Nothing went wrong with the system — this is the system.",
            task: "Understand where responsibility now sits, so the shift does not catch you at week six.",
          },
          {
            type: "paragraph",
            text: "The single largest difference between high school and college is not that the work is harder. It is that tracking the work is now your job. Attendance may not be taken. Reminders may not come. A syllabus issued in week one is often the only time you will be told what is due, and it is assumed you will keep it.",
          },
          {
            type: "table",
            caption: "Where the responsibility moved",
            columns: ["In high school", "In college"],
            rows: [
              ["Teachers remind you what is due", "The syllabus tells you once, in week one"],
              ["Attendance is monitored and reported", "Attendance may be your own to manage"],
              ["Most work happens in class", "Most work happens outside class"],
              ["A parent is told when you fall behind", "You are told, and only if you are looking"],
              ["Extensions are often negotiable", "Late policies are published and applied"],
              ["Help is offered to you", "Help exists and you have to go and get it"],
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The standard expectation is two hours of work outside class for every hour in it. A twelve-credit schedule is therefore closer to a 36-hour week than a 12-hour one. Students who plan around class time alone are not lazy — they have been given a number that was never explained to them.",
          },
          {
            type: "key-terms",
            terms: [
              { term: "Credit hour", definition: "Roughly one hour of class per week for a term, plus about two hours of work outside it." },
              { term: "Syllabus", definition: "The course contract: what is covered, what is due, how you are graded, and what the policies are." },
              { term: "Prerequisite", definition: "A course you must pass before enrolling in another." },
              { term: "Full-time", definition: "Usually twelve or more credits a term. It affects financial aid eligibility." },
              { term: "Academic standing", definition: "Whether your GPA meets the minimum. Falling below it triggers warning, then probation." },
              { term: "Withdrawal (W)", definition: "Dropping a course after the add/drop window. It appears on your transcript but does not affect GPA." },
            ],
          },
          {
            type: "worked-example",
            title: "Reading a syllabus for what it obliges you to do",
            task: "You have four syllabi and thirty minutes. Extract what actually matters.",
            steps: [
              {
                move: "Put every due date from all four into one calendar, in one sitting.",
                why: "Four separate syllabi hide collisions. Three midterms in one week is a real and common situation, and it is only visible when the dates are in one place. Finding it in week one gives you a month to prepare; finding it in week seven does not.",
              },
              {
                move: "Find the grading breakdown and note what the largest single component is.",
                why: "If participation is 20%, missing class is expensive in a way the syllabus does not shout about. If one paper is 40%, that paper is the course. This tells you where to spend effort.",
              },
              {
                move: "Find the late policy and the attendance policy, and write them down.",
                why: "These are the two policies you will need under pressure, and that is exactly when you will not want to be searching a PDF. Knowing whether late work loses 10% or is refused outright changes what you do at 11pm.",
              },
              {
                move: "Find the instructor's office hours and put one in your calendar now.",
                why: "Going once, early, while nothing is wrong makes the second visit — when something is wrong — enormously easier. Most students never go at all, and most instructors sit through empty office hours.",
              },
            ],
            result: "One calendar, four grading structures understood, two policies known, and one office hour booked.",
            takeaway: "The syllabus is not reading. It is a document you extract from, once, in week one.",
          },
          {
            type: "knowledge-check",
            question:
              "You are enrolled in 12 credits. Roughly how many hours a week should you plan for, in total?",
            options: [
              "About 12 — that is what the credits mean",
              "About 36 — twelve hours in class plus roughly two hours outside for each",
              "About 20 — class time plus a few hours of homework",
              "It depends entirely on the subject and cannot be estimated",
            ],
            correctIndex: 1,
            explanation:
              "The standard planning figure is two hours outside class for every hour in it. Twelve credits is therefore about 36 hours a week — close to a full-time job. Students who budget only for class time are working from a number nobody explained.",
            optionRationales: [
              "Credit hours count class time only. The out-of-class expectation is separate and larger.",
              "Correct. Twelve in class plus roughly twenty-four outside.",
              "This underestimates by about half and is the assumption behind a lot of first-term trouble.",
              "It does vary, but two-to-one is the standard planning figure and is far better than no estimate.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Do this with real documents if you have them, or with sample syllabi if you do not." },
      {
        type: "list",
        ordered: true,
        items: [
          "Take every syllabus you have and build one calendar containing every due date, exam, and deadline. Note any week carrying more than one major item.",
          "For each course, write down the grading breakdown and circle the largest component.",
          "Write out the late policy and attendance policy for each course in one sentence each.",
          "Calculate your realistic weekly hours: credits × 3. Compare that against the hours you actually have free after work and family commitments, and write down what you will do if the numbers do not fit.",
        ],
      },
    ],
  },
  {
    slug: "navigating-the-institution",
    title: "Navigating the Institution",
    description:
      "Who to ask, what the offices do, and how to get a problem solved without being sent in a circle.",
    duration: "18 min",
    objectives: [
      "Identify which office handles which kind of problem",
      "Describe what an academic advisor does and when to see one",
      "Explain what disability services provide and how accommodations work",
      "Ask for help in a way that gets a useful answer",
    ],
    sections: [
      {
        heading: "The offices, and what each one actually does",
        blocks: [
          {
            type: "scenario",
            role: "Your financial aid has not arrived and you cannot register.",
            text: "You call the registrar, who sends you to financial aid, who says the hold is academic, who sends you to advising, who sends you back to the registrar. Two hours gone. The problem is real, and so is the fact that nobody told you which door it was behind.",
            task: "Learn the map, so you start at the right office.",
          },
          {
            type: "table",
            caption: "Who handles what",
            columns: ["Office", "Handles", "Go here when"],
            rows: [
              ["Advising", "Course selection, degree requirements, academic problems", "You are choosing courses, or something is going wrong in one"],
              ["Registrar", "Registration, transcripts, enrollment verification, withdrawals", "You need to add, drop, or prove you are enrolled"],
              ["Financial aid", "FAFSA, grants, loans, scholarships, aid holds", "Money is not arriving, or you need to know what you qualify for"],
              ["Bursar / student accounts", "Bills, payments, payment plans, refunds", "You owe a balance or are owed a refund"],
              ["Disability services", "Accommodations and documentation", "You have a condition affecting how you learn or test"],
              ["Tutoring / learning center", "Subject help, writing support, study skills", "The work is hard — which is what it is there for"],
              ["Counseling", "Mental health, crisis support", "Anything is affecting your ability to function"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Disability services are worth understanding before you need them. Accommodations — extra time, a quiet testing room, note-taking support — require documentation and are arranged in advance, not retroactively. A student who discovers this the week of finals has lost the term's accommodations. If you have any condition that affects reading, attention, testing, or attendance, start that conversation in week one.",
          },
          {
            type: "paragraph",
            text: "One habit makes every office easier to deal with: write down who you spoke to, when, and what they said. When you are sent in a circle, that record is what breaks it — 'I spoke to Marcus in financial aid on the 14th and he said the hold was academic' moves a conversation forward in a way that 'someone told me' does not.",
          },
          {
            type: "knowledge-check",
            question:
              "You have a documented condition and want extra time on exams. When should you contact disability services?",
            options: [
              "Before the first exam you need it for",
              "At the start of the term, before any accommodation is needed",
              "Only if you fail an exam without it",
              "At the end of the term, to have grades reconsidered",
            ],
            correctIndex: 1,
            explanation:
              "Accommodations are arranged in advance and are generally not applied retroactively. Registering early means the arrangement exists before you need it, and it costs nothing if you never use it. Waiting until an exam is imminent often means it cannot be put in place in time.",
            optionRationales: [
              "Cutting it to the first exam risks the paperwork not clearing in time.",
              "Correct. Register early — accommodations are not applied backwards.",
              "By then the exam has already been taken without the accommodation, and that grade generally stands.",
              "Accommodations are not a way to revisit past grades.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find the real answers for the institution you are attending or applying to." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find and record the location, hours, and contact for advising, the registrar, financial aid, disability services, and tutoring.",
          "Find the add/drop deadline and the withdrawal deadline for the current term. Note the difference between them.",
          "Find out what documentation disability services requires and how long processing takes.",
          "Write the email you would send to an instructor about missing a class for a genuine reason. Keep it to four sentences, and state what you will do about the missed work.",
        ],
      },
    ],
  },
];

const m2: Lesson[] = [
  {
    slug: "time-and-workload",
    title: "Managing Time and Workload",
    description:
      "Planning a term when you also work, and what to do when the plan stops working.",
    duration: "20 min",
    objectives: [
      "Build a realistic weekly schedule around fixed commitments",
      "Break a large assignment into scheduled pieces",
      "Recognize the points in a term where workload spikes",
      "Decide what to do when you genuinely cannot do everything",
    ],
    sections: [
      {
        heading: "Plan backwards from the deadline",
        blocks: [
          {
            type: "scenario",
            role: "You have a paper due in three weeks.",
            text: "You know about it from week one. You think about it occasionally. You start it the night before, because there was never a day when it was the most urgent thing — until suddenly it was the only thing.",
            task: "Learn to schedule the pieces rather than the deadline, because a deadline in a calendar is not a plan.",
          },
          {
            type: "paragraph",
            text: "A due date tells you when something ends, not when to start. Large assignments do not get done because they are remembered; they get done because pieces of them are scheduled like appointments. Working backwards from the deadline turns one intimidating task into four ordinary ones.",
          },
          {
            type: "worked-example",
            title: "Scheduling a paper due in three weeks",
            task: "Turn one deadline into a plan you can actually follow.",
            steps: [
              {
                move: "Write the deadline, then work backwards in pieces, not in hours.",
                why: "'Spend six hours on the paper' is not schedulable. 'Choose a topic and find three sources' is a task you can finish and tick off, which means you will start it.",
              },
              {
                move: "Set the draft deadline three days before the real one.",
                why: "The gap is for revision, and revision is what separates a C paper from a B. It is also your buffer — a printer failure or a shift change on the last day becomes an inconvenience rather than a disaster.",
              },
              {
                move: "Put each piece in your calendar at a specific time, in a specific place.",
                why: "'Sunday 10am at the library, find three sources' happens. 'Work on the paper sometime this week' does not. Naming the place matters more than people expect.",
              },
              {
                move: "Schedule the pieces around your work shifts first, not after them.",
                why: "Your job is fixed and your study time is not, so the study time has to fit around it. Building a plan that assumes free evenings you do not have is how a plan gets abandoned in week two.",
              },
            ],
            result: "Four scheduled tasks instead of one deadline, with three days of slack before it.",
            takeaway: "Schedule the pieces, put them somewhere specific, and build in a buffer you expect to use.",
          },
          {
            type: "callout",
            variant: "warning",
            text: "There will be a point where you genuinely cannot do everything. That is a decision, and making it deliberately is far better than letting it happen. Talk to an advisor before the withdrawal deadline — a W on a transcript is survivable and does not affect your GPA; an F is neither. Advisors would much rather have this conversation in week eight than see the result in week fifteen.",
          },
          {
            type: "knowledge-check",
            question:
              "You are failing one of four courses and cannot catch up. It is week nine, and the withdrawal deadline is week eleven. What is the best move?",
            options: [
              "Keep going and hope the final exam rescues the grade",
              "Talk to an advisor about withdrawing, so the term ends with a W rather than an F",
              "Stop attending and let the grade fall where it falls",
              "Withdraw from all four courses and restart next term",
            ],
            correctIndex: 1,
            explanation:
              "A withdrawal appears on the transcript but does not affect GPA; a failing grade does both. Speaking to an advisor first matters because withdrawal can affect financial aid and full-time status, and they can tell you how it applies to your situation before you act.",
            optionRationales: [
              "Sometimes a final does rescue a grade, but hoping is not a plan and the deadline passes either way.",
              "Correct. Talk to an advisor before the deadline and take the W deliberately.",
              "Stopping without withdrawing produces the F anyway, plus a possible financial aid problem.",
              "Withdrawing from everything is a much larger step with aid and enrollment consequences. Deal with the one course that is failing.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Build the schedule you will actually use." },
      {
        type: "list",
        ordered: true,
        items: [
          "Map one week hour by hour: work shifts, class, travel, family commitments, and sleep. Total what is left.",
          "Compare that remaining figure against credits × 2, which is your required study time. Write down what you will change if it does not fit.",
          "Take one real upcoming assignment and break it into four scheduled pieces with dates and locations.",
          "Find the withdrawal deadline for your term and put it in your calendar now, while nothing is wrong.",
        ],
      },
    ],
  },
  {
    slug: "studying-that-works",
    title: "Studying in Ways That Actually Work",
    description:
      "Why rereading feels productive and is not, and what to do instead.",
    duration: "20 min",
    objectives: [
      "Explain why retrieval beats review",
      "Use spaced practice instead of cramming",
      "Take notes that are usable later",
      "Prepare for a specific exam format rather than in general",
    ],
    sections: [
      {
        heading: "The most common study method is the least effective",
        blocks: [
          {
            type: "scenario",
            role: "You have an exam in four days.",
            text: "You reread the chapter twice and your notes once. It all looks familiar and you feel prepared. In the exam you recognize every question and can answer almost none of them. Familiarity is not the same as recall, and rereading only produces the first one.",
            task: "Replace the method that feels productive with the ones that are.",
          },
          {
            type: "table",
            caption: "What works, and what only feels like it does",
            columns: ["Method", "Effect", "Why"],
            rows: [
              ["Rereading", "Weak", "Produces familiarity, which is easily mistaken for knowing"],
              ["Highlighting", "Weak", "Feels like processing; it is mostly decorating"],
              ["Retrieval practice", "Strong", "Closing the book and recalling is what the exam actually asks for"],
              ["Spaced practice", "Strong", "Four one-hour sessions beat one four-hour session, reliably"],
              ["Explaining it aloud", "Strong", "Exposes the gaps instantly — you stop mid-sentence where you do not know"],
              ["Practice questions", "Strong", "Rehearses the exact task, under the exact format"],
            ],
          },
          {
            type: "paragraph",
            text: "The principle behind all the effective methods is the same: studying should feel harder than reviewing. If it feels comfortable, you are probably recognizing rather than recalling, and recognition is not what an exam tests.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Prepare for the format, not just the content. A multiple-choice exam rewards recognizing correct answers among distractors. An essay exam rewards constructing an argument from memory. A problem set rewards working through procedures under time pressure. Ask what the format is — instructors will tell you — and practice that.",
          },
          {
            type: "knowledge-check",
            question:
              "You have four hours to prepare for an exam. Which use of them is most effective?",
            options: [
              "One four-hour session rereading the chapters and notes",
              "Four one-hour sessions across four days, each closing the book and recalling before checking",
              "Four hours highlighting the most important passages",
              "One four-hour session copying your notes out neatly",
            ],
            correctIndex: 1,
            explanation:
              "Two effects combine here: spacing the sessions across days beats massing them, and retrieval — recalling before checking — beats review. The same four hours produce substantially more durable learning when used this way.",
            optionRationales: [
              "Massed rereading is the least effective option, and the one that feels the most productive.",
              "Correct. Spacing plus retrieval, which is the strongest combination available.",
              "Highlighting is a sorting activity, not a learning one.",
              "Copying notes is transcription. It occupies the hands and very little else.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Test the difference on yourself — it is more convincing than being told." },
      {
        type: "list",
        ordered: true,
        items: [
          "Take a topic you have studied. Close everything and write down everything you can recall for five minutes. Then check what you missed. That gap is your actual study list.",
          "For an upcoming exam, find out the format and write down how you will practice that specific format.",
          "Convert one set of notes into ten questions with answers, then answer them two days later without looking.",
          "Explain one concept out loud to someone who does not know it. Note where you stopped or hedged — those are the parts you do not know yet.",
        ],
      },
    ],
  },
];

const m3: Lesson[] = [
  {
    slug: "academic-integrity-and-ai",
    title: "Academic Integrity and AI",
    description:
      "What counts as your own work, how to cite honestly, and where AI sits in that.",
    duration: "20 min",
    objectives: [
      "Define plagiarism, including the accidental kind",
      "Cite a source correctly and know when a citation is required",
      "Explain your institution's position on AI use",
      "Use AI in ways that support learning rather than replace it",
    ],
    sections: [
      {
        heading: "Most plagiarism is not cheating",
        blocks: [
          {
            type: "scenario",
            role: "You are writing your first college paper.",
            text: "You find a passage that explains something better than you could, change a few words, and include it. You are not trying to cheat — you did not know that counts. The consequence is the same as if you had been.",
            task: "Learn what the rules actually are, since intent is not the test.",
          },
          {
            type: "table",
            caption: "What requires a citation",
            columns: ["Situation", "Cite?", "Note"],
            rows: [
              ["Direct quotation", "Yes", "Quotation marks and a citation, both"],
              ["Paraphrase in your own words", "Yes", "The idea is still someone else's"],
              ["A statistic or specific fact", "Yes", "Even if you found it in three places"],
              ["Common knowledge", "No", "Widely known and uncontested facts"],
              ["Your own prior work", "Yes", "Reusing it without saying so is self-plagiarism"],
              ["An idea AI helped you develop", "Follow your institution's policy", "Policies vary, and they are usually explicit"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Changing a few words in someone else's sentence is still plagiarism. A genuine paraphrase means reading the passage, closing it, and writing the idea in your own construction — and it still needs a citation. If your paraphrase has the same sentence shape as the original, it is not one.",
          },
          {
            type: "paragraph",
            text: "AI policies differ by institution, by course, and sometimes by assignment. Some prohibit it, some permit it with disclosure, some encourage it for specific tasks. There is no general rule to fall back on, so read the policy for each course and ask when it is unclear. Asking is never held against you; assuming is.",
          },
          {
            type: "callout",
            variant: "info",
            text: "Where AI is permitted, the useful framing is the one ENGL0150 uses: AI can suggest, you decide. Asking it to explain a concept you are stuck on, or to identify what is unclear in your draft, supports your learning. Asking it to write the paper produces work you cannot defend in a conversation with your instructor — and being unable to explain your own submission is its own problem, separate from any policy.",
          },
          {
            type: "knowledge-check",
            question:
              "You read a passage, rewrite the idea in your own words, and include it in your paper. Do you need a citation?",
            options: [
              "No — you wrote the sentences yourself",
              "Yes — the idea is still someone else's, and paraphrase requires citation",
              "Only if your instructor asks for one",
              "Only if it is more than one sentence",
            ],
            correctIndex: 1,
            explanation:
              "Citation credits the idea, not the wording. A paraphrase in your own words still uses someone else's thinking, so it requires a citation — just without quotation marks. Paraphrasing without citing is one of the most common forms of unintentional plagiarism.",
            optionRationales: [
              "Writing the sentences yourself addresses the wording, not the source of the idea.",
              "Correct. Paraphrase requires a citation; only the quotation marks are dropped.",
              "The requirement does not depend on being reminded.",
              "Length is irrelevant. One borrowed idea needs a citation.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find your actual policies, not the general principle." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find your institution's academic integrity policy and write down the penalties for a first offence.",
          "Find the AI policy for each course you are taking. Note where they differ.",
          "Take a paragraph from any article, paraphrase it properly, and write the citation in the style your course requires.",
          "Write three sentences explaining the difference between a paraphrase and a close rewording, using an example of each.",
        ],
      },
    ],
  },
  {
    slug: "paying-for-college",
    title: "Paying for College",
    description:
      "Aid, loans, and the deadlines that decide whether you get either.",
    duration: "20 min",
    objectives: [
      "Describe the main types of financial aid",
      "Explain what the FAFSA is and why the date matters",
      "Distinguish subsidized from unsubsidized loans",
      "Identify what puts aid at risk mid-term",
    ],
    sections: [
      {
        heading: "The money has deadlines, and they are earlier than you think",
        blocks: [
          {
            type: "scenario",
            role: "You are planning next year.",
            text: "You file the FAFSA in July, before the term starts, which feels early. Several state and institutional grants ran out in March. You were eligible for money that no longer exists, and nothing about the federal deadline told you that.",
            task: "Understand which deadline actually governs, because it is rarely the federal one.",
          },
          {
            type: "table",
            caption: "Types of aid",
            columns: ["Type", "Repaid?", "Note"],
            rows: [
              ["Grants", "No", "Need-based. Pell is the largest federal one"],
              ["Scholarships", "No", "Merit, need, or category-based. Many go unclaimed"],
              ["Work-study", "No", "You earn it in a part-time job, often on campus"],
              ["Subsidized loan", "Yes", "Federal; interest does not accrue while enrolled at least half-time"],
              ["Unsubsidized loan", "Yes", "Federal; interest accrues from disbursement"],
              ["Private loan", "Yes", "From a bank. Generally worse terms and fewer protections"],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "File the FAFSA as early as the cycle opens, every year. Some aid is awarded until it runs out rather than to everyone eligible, so state and institutional deadlines are often months before the federal one — and missing them costs you money you qualified for. It is also not once: it is filed annually, and students lose aid in year two by assuming otherwise.",
          },
          {
            type: "paragraph",
            text: "Aid also has conditions after it is awarded. Satisfactory academic progress requirements mean grades and completion rate affect continued eligibility. Dropping below full-time can reduce or cancel an award. Withdrawing after aid has disbursed can create a balance you owe back. None of this is a reason to avoid withdrawing when it is right — it is a reason to ask financial aid first.",
          },
          {
            type: "knowledge-check",
            question:
              "What is the practical difference between a subsidized and an unsubsidized federal loan?",
            options: [
              "Subsidized loans never have to be repaid",
              "Interest does not accrue on a subsidized loan while you are enrolled at least half-time; on an unsubsidized loan it accrues from disbursement",
              "Unsubsidized loans are only available to graduate students",
              "Subsidized loans have a higher borrowing limit",
            ],
            correctIndex: 1,
            explanation:
              "Both are repaid. The difference is who pays the interest while you are in school: on a subsidized loan the government covers it during enrollment, so the balance does not grow. On an unsubsidized loan interest accrues from the day it is disbursed, so you graduate owing more than you borrowed.",
            optionRationales: [
              "Both types are loans and both are repaid. Grants and scholarships are the ones that are not.",
              "Correct — the difference is interest accrual during enrollment.",
              "Unsubsidized loans are available to undergraduates as well.",
              "Limits vary by year and status, and this is not the defining difference.",
            ],
          },
        ],
      },
    ],
    challenge: [
      { type: "paragraph", text: "Find your own numbers and dates." },
      {
        type: "list",
        ordered: true,
        items: [
          "Find when the FAFSA opens for the next cycle, and find your state's and your institution's priority deadlines. Note how far apart they are.",
          "Look up the satisfactory academic progress requirements at your institution — the minimum GPA and completion rate.",
          "Find three scholarships you are eligible for and record their deadlines.",
          "Write down what would happen to your aid if you dropped from full-time to part-time mid-term, and who you would ask to confirm it.",
        ],
      },
    ],
  },
];

export const collegePreparation: Program = {
  slug: "college-preparation",
  group: "Academic Programs",
  title: "College Preparation",
  shortTitle: "College Preparation",
  icon: "🎓",
  accent: "from-amber-700 to-amber-900",
  description:
    "Everything college asks of you besides the coursework: reading a syllabus as a contract, navigating the institution, managing a term around a job, studying in ways that work, and understanding aid.",
  overview:
    "This course does not teach reading or writing — ENG0300 and ENGL0150 do that. It covers what surrounds them. The largest difference between high school and college is not that the work is harder; it is that tracking the work becomes your responsibility, and nobody announces the change. Students rarely leave college because they could not do the work. They leave because of a deadline nobody flagged, an office they did not know existed, a term planned around class hours alone, or an aid form filed three months too late.",
  outcomes: [
    "Read a syllabus as a contract and extract what it obliges you to do",
    "Estimate the real weekly hours a course load requires",
    "Identify which office handles which problem, and ask in a way that gets an answer",
    "Register for accommodations before you need them",
    "Break a large assignment into scheduled pieces with a buffer",
    "Decide deliberately between withdrawing and failing, before the deadline",
    "Study using retrieval and spacing rather than rereading",
    "Cite honestly, including paraphrase, and follow your course's AI policy",
    "File aid on the deadline that actually governs, and protect eligibility",
  ],
  careerRoles: [
    "Prepared for degree or certificate programs",
    "Transfer to a community or four-year college",
    "Continuing education alongside employment",
  ],
  credentialNote:
    "This is preparation, not a credential, and it carries no college credit. Policies, deadlines, offices, and aid rules differ at every institution and change from year to year — everything here tells you what to look for and where to look, and your own institution's published policy is always the authority. Confirm specifics with an advisor rather than relying on this course.",
  modules: [
    {
      moduleNumber: 1,
      moduleSlug: "module-1",
      title: "The Shift to College",
      emoji: "🧭",
      description:
        "How responsibility moves to you, what a syllabus obliges you to do, and which office handles which problem.",
      lessons: m1,
      level: "Beginner",
      estimatedMinutes: 38,
      whatYoullLearn: [
        "Where responsibility shifts from the institution to you",
        "How to extract what matters from four syllabi in thirty minutes",
        "The real weekly hours a credit load requires",
        "Which office handles which problem, and how to avoid being sent in a circle",
      ],
      scenario:
        "You are three weeks in. A missed assignment produced a phone call home in high school; here nothing happens at all, and you find out at midterm. Later, a financial aid hold sends you between four offices in two hours.",
    },
    {
      moduleNumber: 2,
      moduleSlug: "module-2",
      title: "Time & Study Skills",
      emoji: "⏱️",
      description:
        "Planning a term around a job, breaking assignments into scheduled pieces, and studying in ways that actually produce recall.",
      lessons: m2,
      level: "Beginner",
      estimatedMinutes: 40,
      whatYoullLearn: [
        "Building a weekly schedule around fixed work and family commitments",
        "Working backwards from a deadline into scheduled pieces",
        "When to withdraw rather than fail, and who to talk to first",
        "Why retrieval and spacing beat rereading, and how to use them",
      ],
      scenario:
        "A paper is due in three weeks. You think about it occasionally and start it the night before, because there was never a day when it was the most urgent thing — until it was the only thing.",
    },
    {
      moduleNumber: 3,
      moduleSlug: "module-3",
      title: "Integrity & Paying for College",
      emoji: "⚖️",
      description:
        "What counts as your own work, where AI fits, and the aid deadlines that decide whether you can enroll.",
      lessons: m3,
      level: "Beginner",
      estimatedMinutes: 40,
      whatYoullLearn: [
        "What requires a citation, including paraphrase and your own prior work",
        "Why changing a few words is still plagiarism",
        "How AI policies vary by course, and how to use AI without producing work you cannot defend",
        "Grants, scholarships, subsidized and unsubsidized loans, and what puts aid at risk",
      ],
      scenario:
        "You rewrite a passage in your own words without citing it, because you did not know that counts. Separately, you file the FAFSA in July — and find that state and institutional grants ran out in March.",
    },
  ],
};
