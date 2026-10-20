/** Power Automate-style triggers and actions the flow designer offers. */

export type ParamDef = { name: string; type?: "text" | "select" | "textarea"; options?: string[]; required?: boolean; placeholder?: string };

export type ActionDef = { name: string; connector: string; params: ParamDef[]; trigger?: boolean; flowType?: "Automated" | "Instant" | "Scheduled"; description?: string };

export const CONNECTOR_COLOR: Record<string, string> = {
  Schedule: "#1f85ff",
  "Office 365 Outlook": "#0078d4",
  "Microsoft Teams": "#5b5fc7",
  Approvals: "#0f7b6c",
  "Excel Online (Business)": "#107c41",
  "OneDrive for Business": "#0364b8",
  "Microsoft Forms": "#008272",
  "Manually trigger a flow": "#5c2d91",
  Control: "#484f58",
  Notifications: "#d83b01",
};

export const CONNECTOR_GLYPH: Record<string, string> = {
  Schedule: "⏰",
  "Office 365 Outlook": "✉",
  "Microsoft Teams": "T",
  Approvals: "✓",
  "Excel Online (Business)": "X",
  "OneDrive for Business": "☁",
  "Microsoft Forms": "F",
  "Manually trigger a flow": "☝",
  Control: "◇",
  Notifications: "🔔",
};

const YESNO = ["Yes", "No"];

export const ACTIONS: ActionDef[] = [
  /* triggers */
  {
    name: "Recurrence",
    connector: "Schedule",
    trigger: true,
    flowType: "Scheduled",
    description: "Runs the flow on a schedule.",
    params: [
      { name: "Interval", required: true },
      { name: "Frequency", type: "select", options: ["Minute", "Hour", "Day", "Week", "Month"], required: true },
      { name: "On these days" },
      { name: "At these hours" },
      { name: "At these minutes" },
      { name: "Time zone", type: "select", options: ["(UTC-05:00) Eastern Time (US & Canada)", "(UTC-06:00) Central Time (US & Canada)", "(UTC-08:00) Pacific Time (US & Canada)"] },
    ],
  },
  {
    name: "When a new email arrives (V3)",
    connector: "Office 365 Outlook",
    trigger: true,
    flowType: "Automated",
    description: "Triggers when a new email arrives in a folder.",
    params: [
      { name: "Folder", type: "select", options: ["Inbox", "Billing", "Archive"], required: true },
      { name: "From" },
      { name: "Subject Filter" },
      { name: "Include Attachments", type: "select", options: YESNO },
      { name: "Only with Attachments", type: "select", options: YESNO },
    ],
  },
  {
    name: "When a new response is submitted",
    connector: "Microsoft Forms",
    trigger: true,
    flowType: "Automated",
    description: "Triggers when someone submits a form.",
    params: [{ name: "Form Id", required: true }],
  },
  {
    name: "When a file is created",
    connector: "OneDrive for Business",
    trigger: true,
    flowType: "Automated",
    description: "Triggers when a file is added to a folder.",
    params: [{ name: "Folder", required: true }],
  },
  {
    name: "Manually trigger a flow",
    connector: "Manually trigger a flow",
    trigger: true,
    flowType: "Instant",
    description: "Runs when you select Run.",
    params: [],
  },
  /* actions */
  {
    name: "Send an email (V2)",
    connector: "Office 365 Outlook",
    description: "Sends an email message.",
    params: [
      { name: "To", required: true, placeholder: "Specify email addresses separated by semicolons" },
      { name: "Subject", required: true },
      { name: "Body", type: "textarea", required: true },
    ],
  },
  {
    name: "Start and wait for an approval",
    connector: "Approvals",
    description: "Sends an approval request and waits for the response.",
    params: [
      { name: "Approval type", type: "select", options: ["Approve/Reject - First to respond", "Approve/Reject - Everyone must approve", "Custom Responses - Wait for one response"], required: true },
      { name: "Title", required: true },
      { name: "Assigned to", required: true },
      { name: "Details", type: "textarea" },
    ],
  },
  {
    name: "Post message in a chat or channel",
    connector: "Microsoft Teams",
    description: "Posts a message to a chat or a channel.",
    params: [
      { name: "Post as", type: "select", options: ["Flow bot", "User"], required: true },
      { name: "Post in", type: "select", options: ["Channel", "Group chat", "Chat with Flow bot"], required: true },
      { name: "Team" },
      { name: "Channel" },
      { name: "Message", type: "textarea", required: true },
    ],
  },
  {
    name: "Add a row into a table",
    connector: "Excel Online (Business)",
    description: "Adds a new row to an Excel table.",
    params: [
      { name: "File", required: true },
      { name: "Table", required: true },
      { name: "Row", type: "textarea" },
    ],
  },
  {
    name: "Create file",
    connector: "OneDrive for Business",
    description: "Creates a file in OneDrive.",
    params: [
      { name: "Folder Path", required: true },
      { name: "File Name", required: true },
      { name: "File Content", type: "textarea" },
    ],
  },
  {
    name: "Condition",
    connector: "Control",
    description: "Runs different actions depending on a rule.",
    params: [
      { name: "Choose a value", required: true },
      { name: "Operator", type: "select", options: ["is equal to", "contains", "is greater than", "is less than"], required: true },
      { name: "Compare to", required: true },
    ],
  },
  {
    name: "Delay",
    connector: "Control",
    description: "Waits a set amount of time.",
    params: [
      { name: "Count", required: true },
      { name: "Unit", type: "select", options: ["Minute", "Hour", "Day", "Week"], required: true },
    ],
  },
  {
    name: "Send me a mobile notification",
    connector: "Notifications",
    description: "Sends a push notification to the Power Automate mobile app.",
    params: [{ name: "Text", required: true }],
  },
];

export function actionDef(name: string): ActionDef | undefined {
  return ACTIONS.find((a) => a.name.toLowerCase() === name.toLowerCase());
}

export const TRIGGERS = ACTIONS.filter((a) => a.trigger);
export const STEP_ACTIONS = ACTIONS.filter((a) => !a.trigger);
