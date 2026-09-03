import type { Metadata } from "next";
import PortalProgress from "@/components/progress/PortalProgress";

export const metadata: Metadata = {
  title: "My Progress | BEOC Digital Skills Portal",
  description:
    "Track which lessons you have completed across every course in the portal.",
};

export default function ProgressPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
        My Progress
      </h1>
      <p className="max-w-3xl text-xl leading-relaxed text-gray-600">
        Everything you have marked complete, across every course. This is here
        so you can see where you are and pick up where you left off.
      </p>
      <PortalProgress />
    </div>
  );
}
