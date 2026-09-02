import type { Metadata } from "next";
import Engl0150Nav from "@/components/engl0150/Engl0150Nav";
import { engl0150Course } from "@/lib/content/engl0150/course";

export const metadata: Metadata = {
  title: `${engl0150Course.courseTitle} | BEOC Digital`,
  description: engl0150Course.positioning,
};

/** Wraps every ENGL0150 route with the section navigation. */
export default function Engl0150Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-engl-ink-50/40">
      <Engl0150Nav />
      {children}
    </div>
  );
}
