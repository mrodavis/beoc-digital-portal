import { redirect } from "next/navigation";

/** The Typing Lab is site-wide so any course can use it; this course path forwards there. */
export default function TechFoundationsTypingLab() {
  redirect("/typing-lab");
}
