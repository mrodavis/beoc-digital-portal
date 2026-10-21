import type { Metadata } from "next";
import ProgressView from "@/components/typing-lab/ProgressView";

export const metadata: Metadata = {
  title: "My Progress · Typing Lab · BEOC Digital Skills Portal",
  description: "Your best net WPM, accuracy history, and completed key lessons, saved in this browser.",
};

export default function ProgressPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My progress</h1>
      <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">
        Your Typing Lab history, saved in this browser only. Nothing is sent anywhere. To hand in your work, print or save a results page.
      </p>
      <div className="mt-6">
        <ProgressView />
      </div>
    </div>
  );
}
