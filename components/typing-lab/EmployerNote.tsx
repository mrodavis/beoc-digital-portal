/** What "typing speed" means on a job posting. Sources: federal job announcements on usajobs.gov. */
export default function EmployerNote() {
  return (
    <aside className="rounded-xl border-l-4 border-primary-600 bg-primary-50 p-4 text-gray-900">
      <h3 className="font-bold">Which number do employers want?</h3>
      <p className="mt-1 leading-relaxed">
        When a job application or an employment typing test asks for your typing speed, give your <strong>net WPM</strong> and your accuracy. Net WPM already takes off your uncorrected errors, so it is the honest measure of usable work. Some employers set a speed together with an error limit instead. For example, U.S. federal job postings for office jobs often say a qualified typist can type 40 words per minute on a 5-minute sample with three or fewer errors. Every employer sets its own requirement, so read each posting.
      </p>
    </aside>
  );
}
