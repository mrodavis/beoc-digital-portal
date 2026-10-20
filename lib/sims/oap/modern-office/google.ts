import type { SimDefinition, WordPara } from "@/types/sim";
import { googleDoc, type GPerson } from "@/components/sim/apps/google/types";

/**
 * modern-office sims that run in the Google Workspace engine. Keys are "<moduleSlug>::<lessonSlug>".
 *
 * Module 4 (SaaS in action: Google cloud applications and sharing). Set at
 * Lakeside Medical Associates, which has a main office and a second site in
 * Riverside. All people and addresses are fictional.
 */

const ORG = { name: "Lakeside Medical Associates", domain: "lakesidemedical.example" };
const PEOPLE: GPerson[] = [
  { name: "Renee Alvarez", email: "ralvarez@lakesidemedical.example", color: "#188038" },
  { name: "Tasha Morales", email: "tmorales@lakesidemedical.example", color: "#d93025" },
  { name: "Marcus Bell", email: "marcus.bell@lakesidemedical.example", color: "#1a73e8" },
  { name: "Devon Hale", email: "devon.hale@brightpath.example.com", color: "#b06000" },
  { name: "Jordan Kim", email: "jordan.kim@brightpath.example.com", color: "#9334e6" },
];

/* ---------- SaaS in action: one checklist, two sites ---------- */

const step = (id: string, text: string): WordPara => ({ id, list: "number", text });
const CHECKLIST_FULL: WordPara[] = [
  { id: "p1", style: "Title", text: "Front Desk Opening Checklist" },
  { id: "p2", text: "Complete these steps in order before the first patient arrives." },
  step("p3", "Unlock the front door at 7:45 AM."),
  step("p4", "Turn on the check-in kiosk and the lobby TV."),
  step("p5", "Check the voicemail and the fax tray."),
  step("p6", "Print the day's schedule for each provider."),
  step("p7", "Count the cash drawer with a second staff member."),
];
const CHECKLIST_NOW: WordPara[] = CHECKLIST_FULL.filter((p) => p.id !== "p5");

/* ---------- Sharing: the draft photo policy ---------- */

const POLICY: WordPara[] = [
  { id: "p1", style: "Title", text: "Patient Photo Policy (Draft)" },
  { id: "p2", text: "This policy covers photos taken anywhere in the clinic, including the lobby, hallways, and exam rooms." },
  { id: "p3", runs: [{ text: "Staff " }, { id: "r2", text: "may post" }, { text: " photos of patients on their personal social media accounts." }] },
  { id: "p4", style: "Heading 1", text: "Who Can Approve Photos" },
  { id: "p5", text: "The practice manager or the medical director must approve every photo before the practice uses it." },
  { id: "p6", style: "Heading 1", text: "Storing Photos" },
  { id: "p7", text: "Store approved photos only in the Marketing shared folder. Never keep patient photos on a personal phone." },
];

export const googleSims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  /* SaaS in Action: Google Cloud Applications                        */
  /* ================================================================ */

  "module-4::google-cloud-applications": [
    {
      id: "mo-google-cloud-1",
      app: "google",
      title: "Keep one current copy for two clinic sites",
      scenario:
        "You split your week between the main office and the new Riverside site. Instead of emailing files to yourself, everything lives in Google Drive. Organize Drive for the second site, recover a checklist step someone deleted, and make a separate copy to adapt for Riverside.",
      fileName: "My Drive - Google Drive",
      minutes: 6,
      initial: googleDoc({
        surface: "drive",
        org: ORG,
        people: PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fd1", name: "Main Office", kind: "folder", parent: "root", modified: "Sep 28, 2026" },
          {
            id: "f2",
            name: "Front Desk Opening Checklist",
            kind: "doc",
            parent: "root",
            modified: "Oct 19, 2026",
            modifiedBy: "marcus.bell@lakesidemedical.example",
            sharing: { people: [{ email: "marcus.bell@lakesidemedical.example", role: "Editor" }, { email: "tmorales@lakesidemedical.example", role: "Editor" }] },
            content: { paragraphs: CHECKLIST_NOW },
            current: { time: "October 19, 8:05 AM", author: "Marcus Bell" },
            versions: [
              { id: "v2", time: "October 19, 8:02 AM", author: "Marcus Bell", content: { paragraphs: CHECKLIST_NOW.map((p) => (p.id === "p6" ? { ...p, text: "Print the day's schedule." } : p)) } },
              { id: "v1", time: "October 16, 5:30 PM", author: "Tasha Morales", name: "Before Monday edits", content: { paragraphs: CHECKLIST_FULL } },
            ],
          },
          { id: "f3", name: "Clinic Hours - Both Sites", kind: "sheet", parent: "root", modified: "Oct 12, 2026" },
          { id: "f4", name: "Riverside Phone List", kind: "doc", parent: "root", modified: "Oct 15, 2026" },
          { id: "f5", name: "Patient Portal Tips", kind: "slides", parent: "fd1", modified: "Sep 3, 2026" },
          { id: "f6", name: "Staff Schedule - November", kind: "sheet", owner: "ralvarez@lakesidemedical.example", modified: "Oct 18, 2026", modifiedBy: "ralvarez@lakesidemedical.example", sharing: { people: [{ email: "bstudent@lakesidemedical.example", role: "Viewer" }] } },
        ],
      }),
      tasks: [
        {
          instruction: "In My Drive, create a folder named “Site 2 - Riverside”.",
          hint: "Click New at the top left › New folder, type Site 2 - Riverside, and click Create.",
          steps: [{ action: { kind: "type", target: "newfolder:root", value: "Site 2 - Riverside" } }],
        },
        {
          instruction: "Star the spreadsheet “Clinic Hours - Both Sites” so you can find it fast from either site.",
          hint: "Right-click Clinic Hours - Both Sites › Organize › Add to starred. You can also click the file once and press S.",
          steps: [{ action: { kind: "command", id: "g.star", value: "f3" } }],
        },
        {
          instruction: "Move “Riverside Phone List” into the Site 2 - Riverside folder.",
          hint: "Drag the file onto the folder, or right-click it › Organize › Move, pick Site 2 - Riverside, and click Move.",
          steps: [{ action: { kind: "dialog", id: "g.move", values: { file: "f4", folder: "Site 2 - Riverside" } } }],
        },
        {
          instruction: "Open “Front Desk Opening Checklist”.",
          hint: "Double-click the document. It opens in a new browser tab, and nothing is installed on this computer.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f2" } }],
        },
        {
          instruction: "A step is missing from the checklist. Restore the earlier version named “Before Monday edits”.",
          hint: "File › Version history › See version history (Ctrl+Alt+Shift+H). Click Before Monday edits in the list on the right, then click Restore this version.",
          steps: [
            {
              action: { kind: "command", id: "g.version.restore", value: "v1" },
              requires: { selection: "ver:v1" },
              selectHint: "Click the version named Before Monday edits in the Version history list first.",
            },
          ],
        },
        {
          instruction: "Make a copy of the checklist named “Opening Checklist - Riverside” to adapt for the second site.",
          hint: "File › Make a copy, type the name, and click Make a copy. The copy opens in a new tab and the original stays as it is.",
          steps: [{ action: { kind: "dialog", id: "g.makeCopy", values: { name: "Opening Checklist - Riverside" } } }],
        },
        {
          instruction: "In the copy, change the first step to “Unlock the front door at 8:15 AM.”",
          hint: "Double-click the step “Unlock the front door at 7:45 AM.”, change the text, and press Enter. There is no Save button: Google Docs saves every change on its own.",
          steps: [{ action: { kind: "type", target: "p3", value: "Unlock the front door at 8:15 AM." } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  /* Document Creation and Sharing                                    */
  /* ================================================================ */

  "module-4::document-creation-and-sharing": [
    {
      id: "mo-google-share-1",
      app: "google",
      title: "Share the draft photo policy safely",
      scenario:
        "Renee Alvarez and an outside consultant, Jordan Kim, need to review the draft patient photo policy. While you are in Drive, you also notice that the Contractor Deliverables folder is still open to anyone with the link, a year after the contractor left. Share the policy with least privilege, close the old access, and start the review in Suggesting mode.",
      fileName: "My Drive - Google Drive",
      minutes: 7,
      initial: googleDoc({
        surface: "drive",
        org: ORG,
        people: PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "f1", name: "Draft - Patient Photo Policy", kind: "doc", parent: "root", modified: "Oct 20, 2026", content: { paragraphs: POLICY } },
          {
            id: "fd2",
            name: "Contractor Deliverables",
            kind: "folder",
            parent: "root",
            modified: "Apr 9, 2025",
            sharing: { access: "Anyone with the link", linkRole: "Editor", people: [{ email: "devon.hale@brightpath.example.com", role: "Editor" }] },
          },
          { id: "f3", name: "Staff Records Export.xlsx", kind: "excel", parent: "fd2", modified: "Aug 2, 2026", size: "88 KB" },
          { id: "f4", name: "Website Photo Shoot Plan", kind: "doc", parent: "fd2", modified: "Apr 9, 2025", owner: "devon.hale@brightpath.example.com" },
          { id: "f5", name: "Front Desk Phone Script", kind: "doc", parent: "root", modified: "Oct 6, 2026" },
          { id: "f6", name: "Lobby Signage Ideas", kind: "slides", parent: "root", modified: "Sep 22, 2026" },
        ],
      }),
      tasks: [
        {
          instruction: "Share “Draft - Patient Photo Policy” with Renee Alvarez as a Commenter.",
          hint: "Click the file once, then click Share (the person icon) in the bar above the list, or right-click › Share › Share. Add Renee, set the role to Commenter, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: "ralvarez@lakesidemedical.example", role: "Commenter" } } }],
        },
        {
          instruction: "Share the same file with the outside consultant jordan.kim@brightpath.example.com as a Commenter.",
          hint: "Open Share for the policy again, type the email address and press Enter, set the role to Commenter, and click Send. Drive warns you that the address is outside your organization.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: "jordan.kim@brightpath.example.com", role: "Commenter" } } }],
        },
        {
          instruction: "Set Jordan Kim's access to the policy to expire on November 20, 2026.",
          hint: "Open Share for the policy. Next to Jordan Kim, open the role menu › Add expiration, enter November 20, 2026, and click Save.",
          steps: [{ action: { kind: "dialog", id: "g.expiry", values: { file: "f1", email: "jordan.kim@brightpath.example.com", date: "2026-11-20" } } }],
        },
        {
          instruction: "The folder “Contractor Deliverables” is open to anyone with the link. Change its general access to Restricted.",
          hint: "Right-click the folder › Share › Share. Under General access, click Anyone with the link and choose Restricted.",
          steps: [{ action: { kind: "dialog", id: "g.access", values: { file: "fd2", access: "Restricted" } } }],
        },
        {
          instruction: "Remove Devon Hale's access to the Contractor Deliverables folder. His contract ended last year.",
          hint: "In the folder's Share dialog, open the role menu next to Devon Hale and choose Remove access.",
          steps: [{ action: { kind: "dialog", id: "g.permission", values: { file: "fd2", email: "devon.hale@brightpath.example.com", role: "Remove access" } } }],
        },
        {
          instruction: "Open the policy document and switch to Suggesting mode.",
          hint: "Double-click Draft - Patient Photo Policy. Then click the Editing button at the right end of the toolbar and choose Suggesting (or View › Mode › Suggesting).",
          steps: [
            { action: { kind: "command", id: "g.open", value: "f1" } },
            { action: { kind: "command", id: "g.mode", value: "Suggesting" } },
          ],
        },
        {
          instruction: "Suggest changing the words “may post” to “may not post”.",
          hint: "Double-click the words may post, type may not post, and press Enter. In Suggesting mode the change shows as a suggestion that Renee can accept or reject.",
          steps: [{ action: { kind: "type", target: "p3.r2", value: "may not post" } }],
        },
        {
          instruction: "Comment on the heading “Who Can Approve Photos” with “@Renee Alvarez please confirm the approver list.” and assign it to Renee.",
          hint: "Click the heading, then click Add comment on the toolbar (or press Ctrl+Alt+M). Type @Ren and pick Renee Alvarez, finish the comment, check Assign to Renee Alvarez, and click Assign.",
          steps: [
            {
              action: { kind: "type", target: "assign:ralvarez@lakesidemedical.example", value: "@Renee Alvarez please confirm the approver list." },
              requires: { selection: "p4" },
              selectHint: "Click the heading “Who Can Approve Photos” first, so the comment is attached to it.",
            },
          ],
        },
      ],
    },
  ],
};
