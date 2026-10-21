import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import ModuleCard from "@/components/ModuleCard";
import CourseProgress from "@/components/progress/CourseProgress";
import { googleWorkspaceModules } from "@/lib/content/google-workspace/modules";
import { simCount } from "@/lib/sims";

export const metadata = {
  title: "Google Workspace | BEOC Digital",
  description:
    "Free self-paced Google Workspace course: Drive, Docs, Sheets, Slides, Gmail, Calendar, and Meet, with practice simulations.",
};

/** Google Workspace apps and the Microsoft 365 app that does the same job. */
const APP_PAIRS: { google: string; microsoft: string; job: string }[] = [
  { google: "Google Drive", microsoft: "OneDrive (and SharePoint for team files)", job: "Store, organize, and share files in the cloud" },
  { google: "Google Docs", microsoft: "Word", job: "Letters, notices, procedures, reports" },
  { google: "Google Sheets", microsoft: "Excel", job: "Lists, logs, budgets, schedules, charts" },
  { google: "Google Slides", microsoft: "PowerPoint", job: "Presentations and training decks" },
  { google: "Gmail", microsoft: "Outlook (mail)", job: "Email" },
  { google: "Google Calendar", microsoft: "Outlook (calendar)", job: "Meetings, appointments, shared calendars" },
  { google: "Google Meet and Google Chat", microsoft: "Microsoft Teams", job: "Video meetings and team chat" },
  { google: "Google Forms", microsoft: "Microsoft Forms", job: "Sign-up forms, surveys, quizzes" },
];

const DIFFERENCES: { title: string; text: string }[] = [
  {
    title: "It runs in the browser",
    text: "Nothing to install. Sign in to your Google account in Chrome, Edge, Firefox, or Safari on any computer and your files are there.",
  },
  {
    title: "There is no Save button",
    text: "Docs, Sheets, and Slides save every change to Google Drive as you work. Version history keeps earlier versions you can go back to.",
  },
  {
    title: "You share a link, not an attachment",
    text: "Everyone works in the same file at the same time instead of emailing copies back and forth. You choose who can view, comment, or edit.",
  },
  {
    title: "It still works with Office files",
    text: "Drive opens Word, Excel, and PowerPoint files, and Docs, Sheets, and Slides download as .docx, .xlsx, and .pptx when someone needs an Office file.",
  },
];

export default function GoogleWorkspacePage() {
  // Derived from the module data so the figures cannot drift from the course.
  const modules = googleWorkspaceModules;
  const moduleCount = modules.length;
  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);
  const minutes = modules.reduce((n, m) => n + m.estimatedMinutes, 0);
  const hours = Math.max(1, Math.round(minutes / 60));
  const sims = simCount("google-workspace");

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Google Workspace</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl" aria-hidden="true">
            🟦
          </span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Google Workspace</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Work the way many offices, schools, and small businesses do every day: store and share files in
              Google Drive, write in Google Docs, track work in Google Sheets, present with Google Slides, and
              stay in touch with Gmail, Google Calendar, and Google Meet.
            </p>
            <p className="mt-3 text-sm text-gray-500 max-w-3xl">
              Google Workspace was called G Suite until October 2020. You may still hear people use the old
              name; it is the same set of apps.
            </p>
          </div>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{moduleCount}</div>
          <div className="text-sm text-gray-600">Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{lessonCount}</div>
          <div className="text-sm text-gray-600">Lessons</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{hours}+</div>
          <div className="text-sm text-gray-600">Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">{sims}</div>
          <div className="text-sm text-gray-600">Practice simulations</div>
        </div>
      </div>

      <div className="mb-12">
        <CourseProgress courseId="google-workspace" total={lessonCount} />
      </div>

      {/* Orientation: Google Workspace vs Microsoft 365 */}
      <section className="mb-14" aria-labelledby="gw-vs-m365">
        <SectionHeader
          title="Google Workspace vs Microsoft 365"
          description="If you know Word, Excel, or Outlook, you already know most of what these apps do. Here is how the two families line up."
        />
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Google Workspace apps and their Microsoft 365 equivalents</caption>
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Google Workspace
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Microsoft 365
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Used for
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {APP_PAIRS.map((p) => (
                <tr key={p.google}>
                  <th scope="row" className="px-4 py-3 font-semibold text-gray-900">
                    {p.google}
                  </th>
                  <td className="px-4 py-3 text-gray-700">{p.microsoft}</td>
                  <td className="px-4 py-3 text-gray-600">{p.job}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIFFERENCES.map((d) => (
            <div key={d.title} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">{d.title}</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Many workplaces use both. Learning the Google apps alongside the{" "}
          <Link href="/learning-paths/ms-office" className="font-semibold text-primary-600 hover:text-primary-800">
            Microsoft Office courses
          </Link>{" "}
          means you can step into either kind of office.
        </p>
      </section>

      <SectionHeader
        title="Course Modules"
        description="Work through the modules in order, at your own pace. Each lesson has a slideshow, notes, a knowledge check, practice games, a practice simulation, and a challenge."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {modules.map((m) => (
          <ModuleCard
            key={m.moduleSlug}
            num={m.moduleNumber}
            slug={m.moduleSlug}
            emoji={m.emoji}
            title={m.title}
            description={m.description}
            href={`/learning-paths/google-workspace/${m.moduleSlug}`}
            level={m.level}
            estimatedMinutes={m.estimatedMinutes}
            lessonCount={m.lessons.length}
          />
        ))}
      </div>

      {/* Before you start */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold mb-3">Before you start</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Basic computer and web browser skills.</li>
          <li>
            • A free personal Google account is enough for every challenge. A work or school Google account works
            too, though your organization may turn some features off.
          </li>
          <li>• The practice simulations run right on this site, with no account and nothing to install.</li>
          <li>
            • The company, people, and records in this course are fictional. Never practice with real customer or
            personal information.
          </li>
        </ul>
      </div>
    </div>
  );
}
