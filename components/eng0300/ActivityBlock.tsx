import { Activity } from "@/types/eng0300";
import PassageBlock from "./PassageBlock";
import QuestionCard from "./QuestionCard";

/** A passage (or paired passages) followed by its questions. */
export default function ActivityBlock({ activity }: { activity: Activity }) {
  return (
    <div className="space-y-6">
      {activity.intro && (
        <p className="max-w-[68ch] text-base leading-relaxed text-eng-navy-700">
          {activity.intro}
        </p>
      )}

      {activity.passages.map((passage) => (
        <PassageBlock key={passage.id} passage={passage} />
      ))}

      <div className="space-y-4">
        {activity.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} number={index + 1} />
        ))}
      </div>
    </div>
  );
}
