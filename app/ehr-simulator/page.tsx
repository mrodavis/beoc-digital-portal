import type { Metadata } from "next";
import Link from "next/link";
import {
  EHR_SIMULATOR_URL,
  SIMULATOR_PATHS,
  SIMULATOR_SCENARIOS,
  simulatorSignInUrl,
  simulatorSignUpUrl,
} from "@/lib/ehr-simulator";

export const metadata: Metadata = {
  title: "EHR Simulator · BEOC Digital Skills Portal",
  description:
    "How to join your class in the BEOC EHR Simulator, what you will practice, how your work is graded, and what to do when something goes wrong.",
};

const simulatorHost = EHR_SIMULATOR_URL.replace(/^https?:\/\//, "");

const STEPS = [
  {
    title: "Get your class code",
    body: "Your instructor gives each class its own code. It looks like XXXX-XXXX and is posted in Brightspace or written on the board. Capital or lowercase letters both work.",
  },
  {
    title: "Create your account",
    body: `Go to ${simulatorHost}/signup, enter the code, and check that the class shown is yours. Then enter your name the way your instructor knows it, your email, and a password of at least 10 characters.`,
  },
  {
    title: "Open your assignments",
    body: "You land in the simulator signed in. Open Assignments in the left menu and press Start simulation on the one your instructor has assigned. The simulator switches you to the right role for it.",
  },
];

const TRACKS = [
  {
    program: "Electronic Health Records",
    href: "/learning-paths/ehr/intro-to-ehr",
    roles: "Front Desk · Medical Assistant · Provider · Billing",
    practice:
      "Registration and insurance, chart review, vitals and notes, provider order entry, results, and charge capture — one seat at a time, lab by lab.",
  },
  {
    program: "Medical Assisting",
    href: "/learning-paths/programs/medical-assisting",
    roles: "Medical Assistant · Front Desk",
    practice:
      "Rooming, vital signs, medication reconciliation, the intake flowsheet, routing results to the provider, and signed intake notes.",
  },
  {
    program: "Medical Billing & Coding",
    href: "/learning-paths/programs/medical-billing-coding",
    roles: "Billing / Coding · Front Desk",
    practice:
      "Coverage verification at check-in, charge capture with diagnosis pointers, the claim scrub, payer responses and denial codes, and payment posting.",
  },
  {
    program: "Patient Care Technician",
    href: "/learning-paths/programs/patient-care-technician",
    roles: "CNA / Patient Care Technician",
    practice:
      "Starting a shift from the patient list, flowsheet vital signs, fall-risk screening, reading the MAR, and reporting to the nurse.",
  },
];

const TRANSFER = [
  ["Patient Lists", "Census and patient-list views that a shift starts from"],
  ["Persistent Patient Header", "The patient banner you check before you type"],
  ["Chart Sections", "Activity-based chart navigation"],
  ["Flowsheets", "Time-column documentation of vitals and assessments"],
  ["MAR and Med Rec", "Medication administration and reconciliation workflows"],
  ["Order Entry", "Computerized provider order entry (CPOE)"],
  ["Results and Inbox", "Results review and in-basket style work queues"],
  ["Registration and Schedule", "Coverage verification and visit status"],
  ["Census & Beds", "Admission, discharge, and transfer (ADT)"],
  ["Billing", "Charge capture, claims, and payer adjudication"],
];

const FAQ = [
  {
    q: "It says my class code was not recognized.",
    a: "Check the code with your instructor; letters that look alike (O and 0, I and 1) are never used, so if you see one, it is the other. If the class has been closed or the code was changed, your instructor can give you the new one.",
  },
  {
    q: "It says my email cannot be used for a new account.",
    a: "You already have an account. Sign in instead. If you are in a second class, your instructor can add you to it from their roster.",
  },
  {
    q: "I forgot my password.",
    a: "There is no email reset. Ask your instructor: they can issue you a temporary password. After you sign in with it, click your name in the top bar and choose a new one under My Account.",
  },
  {
    q: "It says I have made too many attempts.",
    a: "After 10 wrong passwords the account locks for 15 minutes. Wait it out, or ask your instructor to clear the lock.",
  },
  {
    q: "A simulation says I am in the wrong role.",
    a: "Use the role selector in the top bar to switch to the role the assignment names. If the role is not in the list, your class does not include it; tell your instructor.",
  },
  {
    q: "Which device should I use?",
    a: "A laptop or desktop with a current Chrome, Edge, or Safari. Like real hospital software, the simulator is built for a full-size screen. A tablet works; a phone is too small.",
  },
];

export default function EhrSimulatorGuidePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/learning-paths/ehr" className="hover:text-gray-900">
          Electronic Health Records
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">EHR Simulator</span>
      </div>

      {/* Header */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-slate-300 shadow-md">
        <div className="flex items-center justify-center gap-2 bg-orange-800 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange-50">
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-orange-300" />
          Training Environment · Synthetic Patient Data · Not for Clinical Use
        </div>
        <div className="bg-slate-900 p-8 text-white md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-400">
            Student Guide
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">BEOC EHR Simulator</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            A working electronic health record at Northstar Medical Center, a training hospital
            with fictional patients. You sign in, open charts, and do the job — and your
            instructor sees every step you took, in order.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={simulatorSignUpUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              Join your class
            </a>
            <a
              href={simulatorSignInUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Sign in
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            The simulator opens at <span className="font-mono text-slate-200">{simulatorHost}</span>{" "}
            in a new tab.
          </p>
        </div>
      </div>

      {/* Getting started */}
      <section className="mb-14" aria-labelledby="start">
        <h2 id="start" className="mb-6 text-3xl font-bold text-gray-900">
          Getting in, the first time
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="leading-relaxed text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 rounded-xl border-l-4 border-blue-400 bg-blue-50 p-4 leading-relaxed text-gray-800">
          After the first time, just sign in with your email and password. You can change your
          password any time: click your name in the simulator&rsquo;s top bar and open{" "}
          <span className="font-semibold">My Account</span>.
        </p>
      </section>

      {/* What you'll practice */}
      <section className="mb-14" aria-labelledby="practice">
        <h2 id="practice" className="mb-2 text-3xl font-bold text-gray-900">
          What you will practice
        </h2>
        <p className="mb-6 max-w-3xl text-gray-600">
          Your class decides which roles you hold. You only work as one role at a time, and the
          simulator only lets each role do what that job is allowed to do — finding out that a
          medical assistant cannot sign an order is part of the lesson.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {TRACKS.map((track) => (
            <Link
              key={track.program}
              href={track.href}
              className="card-hover block rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-1 text-xl font-bold text-gray-900">{track.program}</h3>
              <p className="mb-3 text-sm font-medium text-primary-700">{track.roles}</p>
              <p className="leading-relaxed text-gray-600">{track.practice}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Graded simulations */}
      <section className="mb-14" aria-labelledby="graded">
        <h2 id="graded" className="mb-2 text-3xl font-bold text-gray-900">
          The graded simulations
        </h2>
        <p className="mb-6 max-w-3xl text-gray-600">
          Your instructor assigns these to your class, with a due date and a set number of
          attempts. They appear under <span className="font-semibold">Assignments</span>.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Simulation</th>
                <th className="px-4 py-3 font-semibold">Work as</th>
                <th className="px-4 py-3 font-semibold">About</th>
                <th className="px-4 py-3 font-semibold">What you do</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SIMULATOR_SCENARIOS.map((s) => (
                <tr key={s.title} className="align-top">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">{s.role}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">{s.minutes} min</td>
                  <td className="px-4 py-3 leading-relaxed text-gray-600">{s.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How grading works */}
      <section className="mb-14 grid gap-6 lg:grid-cols-2" aria-labelledby="grading">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 id="grading" className="mb-4 text-2xl font-bold text-gray-900">
            How your work is graded
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-primary-600">✓</span>
              <span>
                The simulator scores the <em>order</em> of your work, not just the result. Checking
                allergies before reconciling medications counts; checking them afterwards does not.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-primary-600">✓</span>
              <span>
                Safety steps are critical. Skipping the two-identifier check, for example, can
                fail an attempt even when everything else is right.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-primary-600">✓</span>
              <span>
                When you complete a simulation you get a debrief: your score, what you missed, and
                why it matters. Your history is under <span className="font-semibold">My Performance</span>.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-primary-600">✓</span>
              <span>
                Your instructor can replay your attempt step by step, with the time of every action.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border-l-4 border-amber-400 bg-amber-50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Work like it is real</h2>
          <ul className="space-y-3 text-gray-800">
            <li>
              <span className="font-semibold">Every patient is fictional.</span> Never type
              information about a real person into the simulator — not yourself, not family, not
              someone from a clinical site.
            </li>
            <li>
              <span className="font-semibold">Everything you open is logged.</span> Open only the
              charts your assignment needs, exactly as you will on the job, where the audit trail
              is reviewed.
            </li>
            <li>
              <span className="font-semibold">Your login is yours.</span> Do not share it or work
              under someone else&rsquo;s. Sign out when you leave a shared computer.
            </li>
          </ul>
        </div>
      </section>

      {/* Skills that transfer */}
      <section className="mb-14" aria-labelledby="transfer">
        <h2 id="transfer" className="mb-2 text-3xl font-bold text-gray-900">
          Skills that transfer to the job
        </h2>
        <p className="mb-6 max-w-3xl text-gray-600">
          Hospitals and clinics use different EHR products, but they share the same working
          patterns. The simulator is built around those patterns, so the first day on a real
          system feels familiar. Inside the simulator, the{" "}
          <a
            href={simulatorSignInUrl(SIMULATOR_PATHS.workflowTranslation)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-700 underline-offset-2 hover:underline"
          >
            Workflow Translation guide
          </a>{" "}
          explains each one.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {TRANSFER.map(([concept, pattern]) => (
            <div key={concept} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-1 font-semibold text-gray-900">{concept}</div>
              <div className="text-sm leading-snug text-gray-600">{pattern}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">
          The BEOC EHR Simulator is an original educational application. It is not affiliated
          with, endorsed by, or certified by Epic Systems Corporation or any other EHR vendor.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-14" aria-labelledby="help">
        <h2 id="help" className="mb-6 text-3xl font-bold text-gray-900">
          When something goes wrong
        </h2>
        <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                <span className="mr-2 inline-block text-primary-600 transition-transform group-open:rotate-90">
                  ›
                </span>
                {item.q}
              </summary>
              <p className="mt-3 pl-5 leading-relaxed text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section
        aria-labelledby="instructors"
        className="rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-8"
      >
        <h2 id="instructors" className="mb-3 text-2xl font-bold text-gray-900">
          For instructors
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-gray-700 marker:font-semibold">
          <li>
            Sign in and open <span className="font-semibold">Instructor → Classes → New class</span>.
            Pick the track — it decides which roles your students receive.
          </li>
          <li>
            Share the class link from the class page:{" "}
            <span className="font-mono text-sm">{simulatorHost}/signup?code=XXXX-XXXX</span>. It
            fills the code in for students.
          </li>
          <li>
            Assign simulations from <span className="font-semibold">Instructor → Assignments → New</span>,
            then follow results on the class roster and replay any attempt.
          </li>
        </ol>
        <a
          href={simulatorSignInUrl(SIMULATOR_PATHS.home)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-lg bg-primary-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700"
        >
          Instructor sign in
        </a>
      </section>
    </div>
  );
}
