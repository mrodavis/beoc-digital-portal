import type { Metadata } from "next";
import Eng0300Nav from "@/components/eng0300/Eng0300Nav";
import { eng0300Course } from "@/lib/content/eng0300/course";

export const metadata: Metadata = {
  title: `${eng0300Course.title} | BEOC Digital`,
  description: `${eng0300Course.subtitle} — the Academic Bridge reading lab for ${eng0300Course.courseTitle}.`,
};

/** Wraps every ENG0300 route with the section navigation. */
export default function Eng0300Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-eng-navy-50/40">
      <Eng0300Nav />
      {children}
    </div>
  );
}
