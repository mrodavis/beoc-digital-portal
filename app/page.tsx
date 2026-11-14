import Link from "next/link";
import HomeCatalog from "@/components/HomeCatalog";
import { officeApps } from "@/lib/content/ms-office";
import {
  msOfficePath,
  googleWorkspacePath,
  ehrSimulatorPath,
  academicPrograms,
  technicalPrograms,
} from "@/lib/content/catalog";

export default function Home() {
  const officeModules = Object.values(officeApps).reduce((n, mods) => n + mods.length, 0);

  return (
    <div className="pb-4">
      {/* Hero */}
      <section className="container-x flex flex-col gap-12 pb-10 pt-14 lg:flex-row lg:items-center lg:pt-20">
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-white px-3 py-1.5 text-[13px] font-semibold text-ink-soft">
            <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
            SUNY Brooklyn Educational Opportunity Center
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.0] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[68px]">
            Learn the skills
            <br />
            employers <span className="text-primary-600">ask for.</span>
          </h1>
          <p className="mt-6 max-w-[540px] text-lg leading-relaxed text-ink-soft sm:text-[19px]">
            Academic programs, technical certifications, and career-ready pathways across healthcare, business, and
            public safety. Practice in real tools, at your own pace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#programs" className="rounded-[14px] bg-ink px-6 py-4 font-semibold text-white transition-colors hover:bg-[#162a4a]">
              Explore programs
            </a>
            <Link href="/ehr-simulator" className="rounded-[14px] border border-[#D0D5DD] bg-white px-6 py-4 font-semibold text-ink transition-colors hover:border-ink/40">
              Open the EHR Simulator
            </Link>
          </div>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-4">
          <Link href="/ehr-simulator" className="col-span-2 rounded-[24px] bg-ink p-6 text-white transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-300">EHR Simulator · Training hospital</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">Fictional patients</span>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-2xl bg-primary-600 font-display text-xl font-bold">EHR</span>
              <div>
                <p className="font-display text-[22px] font-semibold">Patient chart</p>
                <p className="mt-1 text-sm text-[#B9C3D6]">Vitals · Orders · Results · Scheduling · Billing</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                ["BP", "118/76"],
                ["Pulse", "72"],
                ["Temp", "98.4°"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[14px] bg-white/[0.06] p-3.5">
                  <p className="text-xs text-[#B9C3D6]">{k}</p>
                  <p className="mt-1.5 text-xl font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Link>
          <Link href="/typing-lab" className="surface p-5 transition-transform hover:-translate-y-0.5">
            <p className="text-[13px] font-semibold text-ink-soft">Typing Lab</p>
            <p className="mt-2.5 font-display text-[28px] font-bold leading-tight tracking-tight text-ink">Speed + accuracy drills</p>
            <div className="mt-4 h-2 rounded-full bg-[#EEF1F6]">
              <div className="h-2 w-[70%] rounded-full bg-accent-400" />
            </div>
          </Link>
          <Link href="/learning-paths/ms-office" className="surface p-5 transition-transform hover:-translate-y-0.5">
            <p className="text-[13px] font-semibold text-ink-soft">Microsoft Office</p>
            <p className="mt-2.5 font-display text-[44px] font-bold leading-none tracking-tight text-ink">
              {officeModules}
              <span className="text-lg text-ink-soft"> modules</span>
            </p>
            <p className="mt-3 text-[13px] text-ink-muted">Word, Excel, PowerPoint, Access, Outlook, Teams, OneDrive</p>
          </Link>
        </div>
      </section>

      <HomeCatalog technical={technicalPrograms} academic={academicPrograms} />

      {/* Featured tools */}
      <section className="container-x pt-16">
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink">Practice tools</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[msOfficePath, googleWorkspacePath, ehrSimulatorPath].map((p) => (
            <Link key={p.title} href={p.href} className="surface card-hover block p-6">
              <p className="font-display text-[22px] font-semibold tracking-tight text-ink">{p.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container-x pt-16">
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Choose your path", "Pick the program that matches your class and your career goals."],
            ["02", "Practice in real tools", "Simulations of the software offices and clinics actually use, from Excel to patient charts."],
            ["03", "Track every step", "See your progress across every path, and know exactly what to review before the exam."],
          ].map(([n, t, d]) => (
            <div key={n} className="surface p-6">
              <p className="font-display text-[15px] font-bold text-primary-600">{n}</p>
              <p className="mt-3.5 font-display text-[22px] font-semibold tracking-tight text-ink">{t}</p>
              <p className="mt-2 leading-relaxed text-ink-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
