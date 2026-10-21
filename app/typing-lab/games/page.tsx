import type { Metadata } from "next";
import PaceRace from "@/components/typing-lab/PaceRace";
import FingerZones from "@/components/typing-lab/FingerZones";

export const metadata: Metadata = {
  title: "Games · Typing Lab · BEOC Digital Skills Portal",
  description: "Race a pace car and sort keys onto the right fingers.",
};

export default function GamesPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Games</h1>
        <p className="mt-2 max-w-3xl text-lg leading-relaxed text-gray-700">Two short games for a change of pace. Neither one is timed against the clock on the wall, and both reward accuracy.</p>
      </div>
      <section aria-labelledby="race-h">
        <h2 id="race-h" className="text-2xl font-bold text-gray-900">
          Race the pace car
        </h2>
        <p className="mt-1 max-w-3xl text-gray-700">Pick a speed for the pace car, then type the passage. Your car moves only on correct keys, so accuracy wins races.</p>
        <div className="mt-4">
          <PaceRace />
        </div>
      </section>
      <section aria-labelledby="zones-h">
        <h2 id="zones-h" className="text-2xl font-bold text-gray-900">
          Finger zones
        </h2>
        <p className="mt-1 max-w-3xl text-gray-700">Drag each key onto the finger that presses it. On a touch screen or with the keyboard, select a key and then select a finger.</p>
        <div className="mt-4">
          <FingerZones />
        </div>
      </section>
    </div>
  );
}
