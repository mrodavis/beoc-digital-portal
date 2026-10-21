import type { SimDefinition, WordPara } from "@/types/sim";
import { googleDoc } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

/**
 * Google Workspace, Module 1 (Getting Started) sims. Keys are "module-1::<lessonSlug>".
 * Parkview Property Management; the learner is Jordan Lee. All fictional.
 */

const WELCOME: WordPara[] = [
  { id: "p1", text: "Welcome to Parkview Property Management" },
  { id: "p2", text: "We are glad you chose to live at Elm Street Apartments. This letter explains how to reach the office, report a repair, and pay rent." },
  { id: "p3", text: "Office hours are Monday through Friday, 9:00 AM to 5:00 PM." },
];

const LOG_CELLS = {
  A1: { v: "Date", fmt: { bold: true } },
  B1: { v: "Apartment", fmt: { bold: true } },
  C1: { v: "Problem", fmt: { bold: true } },
  D1: { v: "Status", fmt: { bold: true } },
  A2: { v: "10/14" }, B2: { v: "Elm 3B" }, C2: { v: "Leaking kitchen faucet" }, D2: { v: "Done" },
  A3: { v: "10/16" }, B3: { v: "River 210" }, C3: { v: "Heater not working" }, D3: { v: "In progress" },
  A4: { v: "10/19" }, B4: { v: "Elm 1A" }, C4: { v: "Broken mailbox lock" }, D4: { v: "New" },
};

const NOTICE: WordPara[] = [
  { id: "p1", text: "Lease Renewal Notice" },
  { id: "p2", text: "Dear Resident," },
  { id: "p3", text: "Your lease at Elm Street Apartments ends soon. To renew, sign the enclosed renewal form and return it to the Parkview office." },
  { id: "p4", text: "Questions? Call the office at (555) 019-2400." },
];

export const gwModule1Sims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  "module-1::what-is-google-workspace": [
    {
      id: "gw-m1-apps-tour",
      app: "google",
      title: "Find your way around Parkview's apps",
      scenario:
        "It is your first morning at Parkview Property Management. Denise Carter wants you to move between Drive, Sheets, and Docs without hunting. Use the Google apps menu and the app home screens to open the files you will use every day.",
      fileName: "My Drive - Google Drive",
      minutes: 5,
      initial: googleDoc({
        surface: "drive",
        me: GW_ME,
        org: GW_ORG,
        people: GW_PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fd1", name: "Elm Street Apartments", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "fd2", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "f1", name: "Tenant Welcome Letter", kind: "doc", parent: "root", modified: "Oct 15, 2026", content: { paragraphs: WELCOME } },
          { id: "f2", name: "Maintenance Request Log", kind: "sheet", parent: "root", owner: EMAIL.kim, modifiedBy: EMAIL.kim, modified: "Oct 19, 2026", sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] }, content: { active: "Requests", sheets: [{ name: "Requests", cells: LOG_CELLS, colWidths: { A: 70, B: 90, C: 200, D: 100 } }] } },
          { id: "f3", name: "Parkview Orientation", kind: "slides", parent: "root", modified: "Oct 2, 2026" },
          { id: "f4", name: "Vendor Contact List", kind: "sheet", parent: "root", modified: "Sep 28, 2026" },
        ],
      }),
      tasks: [
        {
          instruction: "Open Google Sheets from the Google apps menu.",
          hint: "Click the Google apps button (the grid of dots at the top right, next to your profile picture), then click Sheets.",
          steps: [{ action: { kind: "command", id: "g.app", value: "Sheets" } }],
        },
        {
          instruction: "Open the spreadsheet “Maintenance Request Log” from your recent spreadsheets.",
          hint: "On the Sheets home screen, look under Recent spreadsheets and click Maintenance Request Log. It opens in its own browser tab.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f2" } }],
        },
        {
          instruction: "Go back to the Sheets home screen.",
          hint: "Click the Sheets logo (the green icon) at the top left of the spreadsheet.",
          steps: [{ action: { kind: "command", id: "g.app", value: "Sheets" } }],
        },
        {
          instruction: "Use the Google apps menu to switch to Google Docs.",
          hint: "Click the Google apps button at the top right of the Sheets home screen, then click Docs.",
          steps: [{ action: { kind: "command", id: "g.app", value: "Docs" } }],
        },
        {
          instruction: "Open “Tenant Welcome Letter” from your recent documents.",
          hint: "On the Docs home screen, click Tenant Welcome Letter under Recent documents.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f1" } }],
        },
        {
          instruction: "Star the letter so you can find it quickly later.",
          hint: "Click the star next to the document name at the top left. Starred files appear under Starred in Drive.",
          steps: [{ action: { kind: "command", id: "g.star", value: "f1" } }],
        },
        {
          instruction: "Go back to the first browser tab and open Google Drive from the Google apps menu.",
          hint: "Click the first tab at the top of the window (Google Docs). Then click the Google apps button at the top right and click Drive.",
          steps: [{ action: { kind: "command", id: "g.app", value: "Drive" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-1::signing-in-and-staying-secure": [
    {
      id: "gw-m1-sign-in",
      app: "google",
      title: "Sign in at the front desk, and sign out when you leave",
      scenario:
        "You are covering the shared front desk computer. Sign in to your Parkview account with 2-Step Verification, check the key log, and leave the computer signed out for the next person. This is practice: use only the practice password in the task, never a real one.",
      fileName: "Sign in - Google Accounts",
      minutes: 4,
      initial: googleDoc({
        surface: "signin",
        me: GW_ME,
        org: GW_ORG,
        people: GW_PEOPLE,
        drive: { location: "root", layout: "list" },
        flags: { signin: "email", twoStep: true, password: "Riverside-Commons-24" },
        files: [
          { id: "fd1", name: "Front Desk", kind: "folder", parent: "root", modified: "Oct 5, 2026", sharing: { people: [{ email: EMAIL.denise, role: "Editor" }, { email: EMAIL.andre, role: "Editor" }] } },
          {
            id: "f1",
            name: "Front Desk Key Log",
            kind: "sheet",
            parent: "root",
            modified: "Oct 19, 2026",
            content: {
              active: "Keys",
              sheets: [{ name: "Keys", cells: { A1: { v: "Key", fmt: { bold: true } }, B1: { v: "Signed out to", fmt: { bold: true } }, C1: { v: "Returned", fmt: { bold: true } }, A2: { v: "Elm laundry room" }, B2: { v: "Kim Nguyen" }, C2: { v: "Yes" }, A3: { v: "River 210" }, B3: { v: "Russo Plumbing" }, C3: { v: "No" } }, colWidths: { A: 160, B: 150, C: 90 } }],
            },
          },
          { id: "f2", name: "Tenant Contact List", kind: "sheet", parent: "fd1", modified: "Oct 12, 2026" },
        ],
      }),
      tasks: [
        {
          instruction: "Sign in with your Parkview email address, “jlee@parkviewpm.example”.",
          hint: "Click in the Email or phone box, type jlee@parkviewpm.example, and press Enter (or click Next).",
          steps: [{ action: { kind: "type", target: "signin:email", value: "jlee@parkviewpm.example" } }],
        },
        {
          instruction: "Enter the practice password “Riverside-Commons-24” and continue.",
          hint: "Type Riverside-Commons-24 in the Enter your password box, exactly as shown, and press Enter (or click Next). Check Show password if you want to see what you typed.",
          steps: [{ action: { kind: "type", target: "signin:password", value: "Riverside-Commons-24" } }],
        },
        {
          instruction: "Complete 2-Step Verification by approving the sign-in on your phone.",
          hint: "The practice phone on the right asks: Are you trying to sign in? You are, so tap Yes.",
          steps: [{ action: { kind: "command", id: "g.2sv", value: "Yes" } }],
        },
        {
          instruction: "Open the spreadsheet “Front Desk Key Log”.",
          hint: "In My Drive, double-click Front Desk Key Log. It opens in a new browser tab.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f1" } }],
        },
        {
          instruction: "Your turn at the desk is over. Sign out of your Google account.",
          hint: "Click your profile picture (the J) at the top right, then click Sign out.",
          steps: [{ action: { kind: "command", id: "g.signOut" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-1::getting-around-the-apps": [
    {
      id: "gw-m1-new-files",
      app: "google",
      title: "Start your first Parkview files",
      scenario:
        "Denise asked for a letter to Russo Plumbing and a supply order spreadsheet. Start each file from the right home screen, name it clearly, and use Search the menus to find a command you cannot see.",
      fileName: "Google Docs",
      minutes: 5,
      initial: googleDoc({
        surface: "home",
        homeApp: "docs",
        me: GW_ME,
        org: GW_ORG,
        people: GW_PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "f1", name: "Tenant Welcome Letter", kind: "doc", parent: "root", modified: "Oct 15, 2026", content: { paragraphs: WELCOME } },
          { id: "f2", name: "Office Procedures", kind: "doc", parent: "root", owner: EMAIL.denise, modified: "Sep 30, 2026" },
          { id: "f3", name: "Vendor Contact List", kind: "sheet", parent: "root", modified: "Sep 28, 2026" },
        ],
      }),
      tasks: [
        {
          instruction: "Start a new document from the Letter template.",
          hint: "On the Docs home screen, under Start a new document, click Letter. (Template gallery at the right shows all templates.)",
          steps: [{ action: { kind: "command", id: "g.template", value: "Letter" } }],
        },
        {
          instruction: "Rename the document “Russo Plumbing Letter”.",
          hint: "Click the file name (Letter) at the top left, type Russo Plumbing Letter, and press Enter. File › Rename works too.",
          steps: [{ action: { kind: "type", target: "rename:new1", value: "Russo Plumbing Letter" } }],
        },
        {
          instruction: "Use Search the menus to open Word count.",
          hint: "Click Search the menus (the magnifying glass at the left of the toolbar) or press Alt+/, type word count, and press Enter. Tools › Word count and Ctrl+Shift+C open it too.",
          steps: [{ action: { kind: "command", id: "g.pane", value: "Word count" } }],
        },
        {
          instruction: "Close Word count, then go back to the Docs home screen.",
          hint: "Click OK to close Word count. Then click the Docs logo (the blue icon) at the top left.",
          steps: [{ action: { kind: "command", id: "g.app", value: "Docs" } }],
        },
        {
          instruction: "Open Google Sheets from the Google apps menu and start a blank spreadsheet.",
          hint: "Click the Google apps button (the grid of dots) at the top right and click Sheets. Then click Blank spreadsheet under Start a new spreadsheet.",
          steps: [
            { action: { kind: "command", id: "g.app", value: "Sheets" } },
            { action: { kind: "command", id: "g.new", value: "Google Sheets" } },
          ],
        },
        {
          instruction: "Rename the spreadsheet “Parkview Supply Order”.",
          hint: "Click Untitled spreadsheet at the top left, type Parkview Supply Order, and press Enter.",
          steps: [{ action: { kind: "type", target: "rename:new2", value: "Parkview Supply Order" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-1::working-with-office-files": [
    {
      id: "gw-m1-office-files",
      app: "google",
      title: "Handle the Office files people send",
      scenario:
        "The company lawyer sent the lease renewal notice as a Word file, and a tenant asked for the move-in checklist in Word. Edit the Word file in Drive, convert it to a Google Doc for Parkview, and download the formats people outside the office need.",
      fileName: "My Drive - Google Drive",
      minutes: 5,
      initial: googleDoc({
        surface: "drive",
        me: GW_ME,
        org: GW_ORG,
        people: GW_PEOPLE,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fd1", name: "Lease Documents", kind: "folder", parent: "root", modified: "Oct 1, 2026" },
          { id: "w1", name: "Lease Renewal Notice.docx", kind: "word", parent: "root", modified: "Oct 19, 2026", size: "38 KB", content: { paragraphs: NOTICE } },
          { id: "x1", name: "Russo Plumbing Invoice.xlsx", kind: "excel", parent: "root", modified: "Oct 18, 2026", size: "21 KB", content: { active: "Invoice", sheets: [{ name: "Invoice", cells: { A1: { v: "Service", fmt: { bold: true } }, B1: { v: "Amount", fmt: { bold: true } }, A2: { v: "Repair kitchen faucet, Elm 3B" }, B2: { v: 185, fmt: { numFmt: "Currency" } } }, colWidths: { A: 240, B: 100 } }] } },
          { id: "d1", name: "Move-In Checklist", kind: "doc", parent: "root", modified: "Sep 22, 2026", content: { paragraphs: [{ id: "p1", text: "Move-In Checklist" }, { id: "p2", text: "Check every room and write down anything that is damaged before you move in." }] } },
        ],
      }),
      tasks: [
        {
          instruction: "Open the Word file “Lease Renewal Notice.docx”.",
          hint: "Double-click Lease Renewal Notice.docx in My Drive. It opens in Google Docs, with a .DOCX chip next to the name.",
          steps: [{ action: { kind: "command", id: "g.open", value: "w1" } }],
        },
        {
          instruction: "Apply the Title style to the first line, “Lease Renewal Notice”.",
          hint: "Click the first line. Then open the styles box on the toolbar (it shows Normal text) and choose Title.",
          steps: [{ action: { kind: "command", id: "home.style", value: "Title" }, requires: { selection: "p1" }, selectHint: "Click the line “Lease Renewal Notice” first." }],
        },
        {
          instruction: "Convert the notice to a Google Docs file so Parkview can keep it.",
          hint: "File › Save as Google Docs. The Google copy opens in a new tab, and the Word file stays in Drive.",
          steps: [{ action: { kind: "command", id: "g.saveAsGoogle" } }],
        },
        {
          instruction: "Download the Google Doc as a PDF for a tenant to print.",
          hint: "In the Google Doc, choose File › Download › PDF Document (.pdf).",
          steps: [{ action: { kind: "command", id: "g.download", value: "PDF Document (.pdf)" } }],
        },
        {
          instruction: "Open “Move-In Checklist” and download it as a Microsoft Word file.",
          hint: "Click the first browser tab (My Drive) and double-click Move-In Checklist. Then choose File › Download › Microsoft Word (.docx).",
          steps: [
            { action: { kind: "command", id: "g.open", value: "d1" } },
            { action: { kind: "command", id: "g.download", value: "Microsoft Word (.docx)" } },
          ],
        },
      ],
    },
  ],
};
