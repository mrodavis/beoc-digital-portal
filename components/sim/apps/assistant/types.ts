/**
 * AI chat assistant in the style of Microsoft 365 Copilot Chat, plus a Power
 * Automate-style flow builder (the "Automate" view).
 *
 * Selection keys:
 *   "chat"              the main Copilot chat (prompt box, attach, prompt gallery)
 *   "agent:<id>"        an agent's chat
 *   "msg:<id>"          a message: responses are "r1", "r2", … and prompts "p1", "p2", …
 *                       (the Nth prompt in the thread, all chats counted, gets pN and its answer rN)
 *   "settings"          Settings › Privacy
 *   "account"           the account switcher
 *   "history:<id>"      a past conversation in the sidebar
 *   "flows"             Power Automate home, Create, Templates, My flows
 *   "flow:<flowId>"     a flow open in the designer
 *
 * Type targets:
 *   "prompt"            a prompt; the selection says which chat. The answer comes from the
 *                       first rule whose keyword groups all match (rules with `after` equal to
 *                       the previous answer's rule are tried first).
 *   "edit:<msgId>"      a response after editing it (Edit › Done)
 *   "saveprompt"        Save prompt dialog: "Title: …\nPrompt: …"
 *   "flow.create"       a Build-a-flow dialog: "Type: Scheduled|Automated|Instant\nName: …\nTrigger: …"
 *                       plus for Scheduled "Starting: MM/DD/YYYY\nAt: 8:00 AM\nRepeat every: 1 Week\nOn these days: Monday"
 *   "flow.describe"     "Describe it to design it" text, matched against `flowIdeas`
 *   "flowparam:<flowId>/<stepId>/<Param name>"   one parameter in a step's settings pane
 *                       (text fields commit when they lose focus; lists commit on change).
 *                       The trigger's step id is "trigger".
 *
 * Commands: prompt.attach (file name), prompt.detach, response.copy, response.regenerate,
 *   response.feedback (Like | Inaccurate | Not helpful | Harmful or offensive | Other),
 *   source.open (free), chat.new (free), settings.training / settings.voiceTraining /
 *   settings.personalization (on | off), history.delete (conversation id), account.switch (account id),
 *   flow.template (template name), flow.addAction (action name), flow.removeAction (step id),
 *   flow.save, flow.test (Manually), flow.turnOn, flow.turnOff, flow.delete.
 */
import type { SimValue } from "@/types/sim";

export type AssistantSource = {
  title: string;
  /** Site or file name shown under the title. */
  site?: string;
  snippet?: string;
  /** Text shown when the source is opened. */
  body?: string;
  /** The citation leads nowhere (a fabricated source). */
  missing?: boolean;
};

export type AssistantRule = {
  id: string;
  /** Keyword groups; every group needs one of its alternatives in the prompt (case-insensitive, substring). */
  match: string[][];
  /** Only right after this rule answered in the same chat (iteration chains). */
  after?: string;
  /** Only when this file is attached to the prompt. */
  needsFile?: string;
  /** Only in this chat: "chat" or an agent id. Default: any chat. */
  agent?: string;
  /** Markdown-lite: "## " headings, "- " bullets, "1. " numbers, **bold**, [1] citations, "| a | b |" tables. */
  response: string;
  /** Regenerate cycles response → variants[0] → variants[1] → … */
  variants?: string[];
  sources?: AssistantSource[];
  followups?: string[];
  /** For verify-the-output lessons: the planted mistake, revealed after the learner reports it as Inaccurate. */
  error?: { claim: string; correction: string };
};

export type AssistantMessage = {
  id: string;
  role: "user" | "assistant";
  /** "chat" or "agent:<id>". */
  ctx: string;
  text: string;
  rule?: string;
  variant?: number;
  sources?: AssistantSource[];
  attachments?: string[];
  followups?: string[];
  feedback?: string;
  copied?: boolean;
  /** Text after the learner edited the response. */
  edited?: string;
  error?: { claim: string; correction: string };
};

export type AssistantAgent = {
  id: string;
  name: string;
  description: string;
  /** Tile color. */
  color?: string;
  /** One or two letters or an emoji for the tile. */
  glyph?: string;
  greeting?: string;
  suggestions?: string[];
};

export type FlowStep = { id: string; action: string; connector: string; params: Record<string, string> };

export type AssistantFlow = {
  id: string;
  name: string;
  type: "Automated" | "Instant" | "Scheduled";
  trigger: FlowStep;
  steps: FlowStep[];
  saved?: boolean;
  on?: boolean;
  lastTest?: "Succeeded" | "Failed" | null;
  runs?: number;
  modified?: string;
};

export type FlowTemplate = {
  name: string;
  description: string;
  /** Connectors shown on the card. */
  connectors: string[];
  type: AssistantFlow["type"];
  trigger: Omit<FlowStep, "id">;
  steps: Omit<FlowStep, "id">[];
};

export type AssistantDoc = {
  /** Header name (default "Microsoft 365 Copilot Chat"). */
  product?: string;
  accounts?: { id: string; name: string; email: string; work?: boolean; org?: string }[];
  /** Active account id (default the first). */
  account?: string;
  thread: AssistantMessage[];
  rules: AssistantRule[];
  fallback?: string;
  /** Starter prompts on the empty main chat. Clicking one puts it in the prompt box. */
  suggestions?: string[];
  /** Files offered by + › Upload / attach. */
  files?: { name: string; size?: string; preview?: string }[];
  /** Files waiting in a prompt box, by chat ("chat" | "agent:<id>"). */
  attached?: Record<string, string[]>;
  agents?: AssistantAgent[];
  history?: { id: string; title: string; when: string }[];
  settings?: { training?: boolean; voiceTraining?: boolean; personalization?: boolean };
  /** Prompts containing any of these terms are blocked before they are sent (a data-loss-prevention policy tip). */
  policy?: { blockTerms: string[]; message: string };
  savedPrompts?: { title: string; text: string }[];
  /** Messages hidden by New chat, per chat: thread index where the visible chat starts. */
  cut?: Record<string, number>;
  clipboard?: string;
  start?: { view?: "chat" | "automate"; ctx?: string; page?: "home" | "create" | "templates" | "flows" | "designer"; flow?: string; settings?: boolean };
  flows?: AssistantFlow[];
  templates?: FlowTemplate[];
  /** Copilot in Power Automate: a description that matches builds this flow. */
  flowIdeas?: { match: string[][]; name: string; type: AssistantFlow["type"]; trigger: Omit<FlowStep, "id">; steps: Omit<FlowStep, "id">[] }[];
  seq?: number;
  flags?: Record<string, SimValue>;
};

export type AssistantUiState = {
  selection: string;
  view?: "chat" | "automate";
  ctx?: string;
  page?: "home" | "create" | "templates" | "flows" | "designer";
  flow?: string;
  insertAfter?: string;
  overlay?: "settings" | null;
};

export const assistantDoc = (d: AssistantDoc) => d as unknown as Record<string, unknown>;
