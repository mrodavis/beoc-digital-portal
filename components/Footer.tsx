import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-ink text-[#B9C3D6]">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white font-display text-lg font-bold text-ink">B</span>
              <span className="font-display text-lg font-bold text-white">BEOC Digital</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              The digital skills portal of the Brooklyn Educational Opportunity Center. Practice in real tools and build
              the skills employers ask for.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">Learn</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/learning-paths/ms-office" className="hover:text-white">Microsoft Office</Link></li>
              <li><Link href="/learning-paths/google-workspace" className="hover:text-white">Google Workspace</Link></li>
              <li><Link href="/eng0300" className="hover:text-white">ENG0300 Reading Lab</Link></li>
              <li><Link href="/learning-paths/certification" className="hover:text-white">Certification Prep</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">Support</h3>
            <p className="mt-4 text-sm leading-relaxed">
              For technical support or questions about the platform, contact your program coordinator.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/ehr-simulator" className="rounded-full border border-white/15 px-3.5 py-2 text-sm text-white hover:bg-white/10">EHR Simulator</Link>
              <Link href="/typing-lab" className="rounded-full border border-white/15 px-3.5 py-2 text-sm text-white hover:bg-white/10">Typing Lab</Link>
              <Link href="/progress" className="rounded-full border border-white/15 px-3.5 py-2 text-sm text-white hover:bg-white/10">My Progress</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>&copy; {year} Brooklyn Educational Opportunity Center. All rights reserved.</p>
          <p className="text-white/50">SUNY Brooklyn EOC · Digital Skills Portal</p>
        </div>
      </div>
    </footer>
  );
}
