import type { SimDefinition } from "@/types/sim";
import { googleDoc, type GFile } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

/**
 * Google Workspace, Module 2 (Google Drive: Organize and Share) sims. Keys are "module-2::<lessonSlug>".
 * Parkview Property Management; the learner is Jordan Lee. All fictional.
 */

const base = { me: GW_ME, org: GW_ORG, people: GW_PEOPLE };

const para = (id: string, text: string) => ({ id, text });

export const gwModule2Sims: Record<string, SimDefinition[]> = {
  /* ================================================================ */
  "module-2::the-drive-screen-and-uploading": [
    {
      id: "gw-m2-upload",
      app: "google",
      title: "Get the scanned forms into Drive",
      scenario:
        "Signed tenant forms are piling up on the front desk computer's desktop, where nobody else can see them. Upload them into Parkview's Forms folder, check a file's details, and look around Drive so you know where everything is.",
      fileName: "My Drive - Google Drive",
      minutes: 5,
      initial: googleDoc({
        surface: "drive",
        ...base,
        drive: { location: "root", layout: "list" },
        computer: ["Parking Permit - Elm 2C.pdf", "Pet Policy Signed - River 114.pdf", "Lobby Photo.jpg"],
        files: [
          { id: "fd1", name: "Elm Street Apartments", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "fd2", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "fd3", name: "Forms", kind: "folder", parent: "root", modified: "Oct 13, 2026", sharing: { people: [{ email: EMAIL.denise, role: "Editor" }, { email: EMAIL.andre, role: "Editor" }] } },
          { id: "f1", name: "Blank Parking Permit Form", kind: "doc", parent: "fd3", modified: "Sep 3, 2026" },
          { id: "f2", name: "Tenant Welcome Letter", kind: "doc", parent: "root", modified: "Oct 15, 2026" },
          { id: "f3", name: "Riverside Boiler Inspection.pdf", kind: "pdf", owner: EMAIL.kim, modified: "Oct 17, 2026", modifiedBy: EMAIL.kim, size: "1.1 MB", sharing: { people: [{ email: EMAIL.jordan, role: "Viewer" }] } },
        ],
      }),
      tasks: [
        {
          instruction: "Open the Forms folder.",
          hint: "Double-click Forms in the file list (or click it on the left side if you have it there).",
          steps: [{ action: { kind: "command", id: "g.go", value: "fd3" } }],
        },
        {
          instruction: "Upload the scan “Parking Permit - Elm 2C.pdf” from the computer into the Forms folder.",
          hint: "With Forms open, click New › File upload. Click Parking Permit - Elm 2C.pdf and click Open.",
          steps: [{ action: { kind: "command", id: "g.upload", value: "Parking Permit - Elm 2C.pdf" } }],
        },
        {
          instruction: "Upload “Pet Policy Signed - River 114.pdf” into the Forms folder too.",
          hint: "New › File upload again, choose Pet Policy Signed - River 114.pdf, and click Open. (On a real computer you can also drag files from the desktop into the open folder.)",
          steps: [{ action: { kind: "command", id: "g.upload", value: "Pet Policy Signed - River 114.pdf" } }],
        },
        {
          instruction: "Switch the folder to grid layout.",
          hint: "Click Grid layout (the four squares) at the top right of the file list.",
          steps: [{ action: { kind: "command", id: "g.layout", value: "grid" } }],
        },
        {
          instruction: "Select “Parking Permit - Elm 2C.pdf” and open its details.",
          hint: "Click the file once to select it. Then click View details (the i in a circle) at the top right of the list.",
          steps: [{ action: { kind: "command", id: "g.details" }, requires: { selection: "file:new1" }, selectHint: "Click Parking Permit - Elm 2C.pdf once to select it first." }],
        },
        {
          instruction: "Kim shared the Riverside boiler inspection with you. Go to Shared with me and open “Riverside Boiler Inspection.pdf”.",
          hint: "Click Shared with me on the left side, then double-click Riverside Boiler Inspection.pdf. It opens in a preview.",
          steps: [
            { action: { kind: "command", id: "g.go", value: "shared" } },
            { action: { kind: "command", id: "g.open", value: "f3" } },
          ],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-2::organizing-files-and-folders": [
    {
      id: "gw-m2-organize",
      app: "google",
      title: "Organize the Elm Street files",
      scenario:
        "Files for Elm Street Apartments are loose in My Drive and one is still called Untitled document. Build the folder Denise asked for, move and rename files, and make the important ones easy to find.",
      fileName: "My Drive - Google Drive",
      minutes: 7,
      initial: googleDoc({
        surface: "drive",
        ...base,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fdE", name: "Elm Street Apartments", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "fdR", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "f1", name: "Elm Street Tenant List", kind: "sheet", parent: "fdE", modified: "Oct 12, 2026" },
          { id: "f2", name: "Elm Street Laundry Schedule", kind: "doc", parent: "root", modified: "Oct 6, 2026", content: { paragraphs: [para("p1", "Laundry Room Schedule"), para("p2", "The laundry room is open every day from 7:00 AM to 10:00 PM.")] } },
          { id: "f3", name: "Untitled document", kind: "doc", parent: "root", modified: "Oct 16, 2026", content: { paragraphs: [para("p1", "Boiler inspection notes, Elm Street"), para("p2", "Pressure normal. Replace the left pump within six months.")] } },
          { id: "f4", name: "Vendor Contact List", kind: "sheet", parent: "root", owner: EMAIL.denise, modified: "Sep 28, 2026", sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } },
        ],
      }),
      tasks: [
        {
          instruction: "Inside the Elm Street Apartments folder, create a folder named “Maintenance”.",
          hint: "Double-click Elm Street Apartments to open it. Click New › New folder, type Maintenance, and click Create.",
          steps: [{ action: { kind: "type", target: "newfolder:fdE", value: "Maintenance" } }],
        },
        {
          instruction: "Go back to My Drive and move “Elm Street Laundry Schedule” into the Elm Street Apartments folder.",
          hint: "Click My Drive on the left side. Drag Elm Street Laundry Schedule onto the Elm Street Apartments folder, or right-click it › Organize › Move, choose Elm Street Apartments, and click Move.",
          steps: [{ action: { kind: "dialog", id: "g.move", values: { file: "f2", folder: "Elm Street Apartments" } } }],
        },
        {
          instruction: "Rename “Untitled document” to “Elm Street Boiler Notes”.",
          hint: "Right-click Untitled document › Rename (or click it once and press N). Type Elm Street Boiler Notes and click OK.",
          steps: [{ action: { kind: "type", target: "rename:f3", value: "Elm Street Boiler Notes" } }],
        },
        {
          instruction: "Move “Elm Street Boiler Notes” into the new Maintenance folder.",
          hint: "Right-click Elm Street Boiler Notes › Organize › Move. Open Elm Street Apartments, click Maintenance, and click Move.",
          steps: [{ action: { kind: "dialog", id: "g.move", values: { file: "f3", folder: "Maintenance" } } }],
        },
        {
          instruction: "Give the Elm Street Apartments folder a green color.",
          hint: "Right-click Elm Street Apartments › Organize, then click the green color in the folder colors.",
          steps: [{ action: { kind: "command", id: "g.color", value: "fdE|#16a765" } }],
        },
        {
          instruction: "Star the Riverside Commons folder.",
          hint: "Right-click Riverside Commons › Organize › Add to starred, or click it once and press S.",
          steps: [{ action: { kind: "command", id: "g.star", value: "fdR" } }],
        },
        {
          instruction: "Add a shortcut to “Vendor Contact List” in the Elm Street Apartments folder, so it stays one list.",
          hint: "Right-click Vendor Contact List › Organize › Add shortcut. Choose Elm Street Apartments and click Add shortcut.",
          steps: [{ action: { kind: "dialog", id: "g.shortcut", values: { file: "f4", folder: "Elm Street Apartments" } } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-2::finding-files-fast": [
    {
      id: "gw-m2-search",
      app: "google",
      title: "Find the files Denise needs",
      scenario:
        "Denise is on the phone from Riverside Commons and needs three files right now. Search and filter Drive instead of clicking through folders.",
      fileName: "My Drive - Google Drive",
      minutes: 5,
      initial: googleDoc({
        surface: "drive",
        ...base,
        drive: { location: "home", layout: "list" },
        files: [
          { id: "fdE", name: "Elm Street Apartments", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "fdR", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "f1", name: "Lease - River 210.pdf", kind: "pdf", parent: "fdR", modified: "Aug 30, 2026", size: "410 KB" },
          { id: "f2", name: "Lease Renewal Notice", kind: "doc", parent: "root", modified: "Oct 19, 2026" },
          { id: "f3", name: "Lease - Elm 3B.pdf", kind: "pdf", parent: "fdE", modified: "Jul 12, 2026", size: "392 KB" },
          { id: "f4", name: "Lease Signing Checklist", kind: "doc", parent: "root", owner: EMAIL.andre, modified: "Oct 2, 2026", sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } },
          { id: "f5", name: "October Rent Tracker", kind: "sheet", parent: "root", owner: EMAIL.priya, modified: "Oct 20, 2026", modifiedBy: EMAIL.priya, sharing: { people: [{ email: EMAIL.jordan, role: "Viewer" }] } },
          { id: "f6", name: "September Rent Tracker", kind: "sheet", parent: "root", owner: EMAIL.priya, modified: "Oct 1, 2026", sharing: { people: [{ email: EMAIL.jordan, role: "Viewer" }] } },
          { id: "f7", name: "Maintenance Request Log", kind: "sheet", parent: "root", owner: EMAIL.kim, modified: "Oct 19, 2026", sharing: { people: [{ email: EMAIL.jordan, role: "Editor" }] } },
          { id: "f8", name: "Supply Order", kind: "sheet", parent: "root", modified: "Oct 14, 2026" },
          { id: "f9", name: "Water Shutoff Notice", kind: "doc", parent: "root", modified: "Oct 15, 2026", starred: true },
          { id: "f10", name: "Lobby Photo.jpg", kind: "image", parent: "root", modified: "Sep 18, 2026", size: "2.4 MB" },
        ],
      }),
      tasks: [
        {
          instruction: "Search Drive for “lease”.",
          hint: "Click Search in Drive at the top, type lease, and press Enter.",
          steps: [{ action: { kind: "command", id: "g.search", value: "lease" } }],
        },
        {
          instruction: "Narrow the results to PDFs only, so you see just the signed leases.",
          hint: "Click the Type chip under the search box and choose PDFs.",
          steps: [{ action: { kind: "command", id: "g.filter", value: "Type=PDFs" } }],
        },
        {
          instruction: "Clear the search box, then use the Type chip to show only spreadsheets.",
          hint: "Click the X at the right end of the search box. Then click the Type chip (it shows PDFs) and choose Spreadsheets.",
          steps: [
            { action: { kind: "command", id: "g.search", value: "" } },
            { action: { kind: "command", id: "g.filter", value: "Type=Spreadsheets" } },
          ],
        },
        {
          instruction: "Narrow the spreadsheets to the ones Priya Shah owns.",
          hint: "Click the People chip and choose Priya Shah.",
          steps: [{ action: { kind: "command", id: "g.filter", value: `People=${EMAIL.priya}` } }],
        },
        {
          instruction: "Open “October Rent Tracker”.",
          hint: "Double-click October Rent Tracker in the results.",
          steps: [{ action: { kind: "command", id: "g.open", value: "f5" } }],
        },
        {
          instruction: "Go back to Drive and open Starred to find the notice you starred last week.",
          hint: "Click the first browser tab (Drive), then click Starred on the left side.",
          steps: [{ action: { kind: "command", id: "g.go", value: "starred" } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-2::sharing-files-and-folders": [
    {
      id: "gw-m2-share",
      app: "google",
      title: "Share Parkview's files the right way",
      scenario:
        "Several people need access to Parkview files, each for a different reason, and an old contractor folder is still open to anyone with the link. Give each person the least access they need, and close what nobody needs anymore.",
      fileName: "My Drive - Google Drive",
      minutes: 8,
      initial: googleDoc({
        surface: "drive",
        ...base,
        people: [...GW_PEOPLE, { name: "Lena Ortiz", email: "lena@brightpaint.example", color: "#e52592" }],
        drive: { location: "root", layout: "list" },
        files: [
          { id: "f1", name: "Tenant Handbook", kind: "doc", parent: "root", modified: "Oct 16, 2026", content: { paragraphs: [para("p1", "Parkview Tenant Handbook"), para("p2", "This handbook explains how to reach the office, report repairs, and use shared spaces.")] } },
          { id: "fdM", name: "Maintenance", kind: "folder", parent: "root", modified: "Oct 18, 2026" },
          { id: "f2", name: "Faucet Repair Photos - Elm 3B", kind: "folder", parent: "fdM", modified: "Oct 14, 2026" },
          { id: "f3", name: "Water Shutoff Notice", kind: "doc", parent: "root", modified: "Oct 15, 2026" },
          {
            id: "fdP",
            name: "Bright Paint Co. - Hallway Painting",
            kind: "folder",
            parent: "root",
            modified: "Mar 4, 2026",
            sharing: { access: "Anyone with the link", linkRole: "Editor", people: [{ email: "lena@brightpaint.example", role: "Editor" }] },
          },
          { id: "f4", name: "Paint Color Choices", kind: "doc", parent: "fdP", modified: "Feb 20, 2026", owner: "lena@brightpaint.example" },
        ] as GFile[],
      }),
      tasks: [
        {
          instruction: "Share “Tenant Handbook” with Marcus Reyes as an Editor.",
          hint: "Click Tenant Handbook once, then click Share (the person with a plus) in the bar above the list. Type Marcus, pick Marcus Reyes, keep the role Editor, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: EMAIL.marcus, role: "Editor" } } }],
        },
        {
          instruction: "Share “Tenant Handbook” with Priya Shah as a Viewer.",
          hint: "Open Share for Tenant Handbook again. Add Priya Shah, change the role on the right to Viewer, and click Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: EMAIL.priya, role: "Viewer" } } }],
        },
        {
          instruction: "Share the Maintenance folder with Tony Russo (tony@russoplumbing.example) as a Viewer, so he can see the repair photos.",
          hint: "Right-click Maintenance › Share › Share. Type tony@russoplumbing.example and press Enter, set the role to Viewer, and click Send. Drive warns that the address is outside Parkview.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "fdM", email: EMAIL.tony, role: "Viewer" } } }],
        },
        {
          instruction: "Set Tony Russo's access to the Maintenance folder to expire on November 30, 2026.",
          hint: "Open Share for Maintenance. Next to Tony Russo, open the role menu › Add expiration, pick November 30, 2026, and click Save.",
          steps: [{ action: { kind: "dialog", id: "g.expiry", values: { file: "fdM", email: EMAIL.tony, date: "2026-11-30" } } }],
        },
        {
          instruction: "Change the general access of “Water Shutoff Notice” so everyone at Parkview Property Management can view it.",
          hint: "Open Share for Water Shutoff Notice. Under General access, click Restricted and choose Parkview Property Management. Keep the role Viewer.",
          steps: [{ action: { kind: "dialog", id: "g.access", values: { file: "f3", access: "Organization" } } }],
        },
        {
          instruction: "The Bright Paint Co. folder is still open to anyone with the link. Change its general access to Restricted.",
          hint: "Right-click Bright Paint Co. - Hallway Painting › Share › Share. Under General access, click Anyone with the link and choose Restricted.",
          steps: [{ action: { kind: "dialog", id: "g.access", values: { file: "fdP", access: "Restricted" } } }],
        },
        {
          instruction: "Remove Lena Ortiz's access to the Bright Paint Co. folder. The painting job is finished.",
          hint: "In the folder's Share box, open the role menu next to Lena Ortiz and choose Remove access.",
          steps: [{ action: { kind: "dialog", id: "g.permission", values: { file: "fdP", email: "lena@brightpaint.example", role: "Remove access" } } }],
        },
      ],
    },
  ],

  /* ================================================================ */
  "module-2::trash-storage-and-recovery": [
    {
      id: "gw-m2-trash",
      app: "google",
      title: "Clean up Drive without losing anything",
      scenario:
        "My Drive is full of copies of copies, an old flyer draft, and a huge lobby video, and someone deleted the Riverside pool rules by mistake yesterday. Clean up, recover the pool rules, and free some storage.",
      fileName: "My Drive - Google Drive",
      minutes: 5,
      initial: googleDoc({
        surface: "drive",
        ...base,
        drive: { location: "root", layout: "list" },
        files: [
          { id: "fdR", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
          { id: "f1", name: "Copy of Copy of Laundry Schedule", kind: "doc", parent: "root", modified: "Sep 2, 2026", size: "4 KB" },
          { id: "f2", name: "Laundry Schedule", kind: "doc", parent: "root", modified: "Oct 6, 2026", size: "5 KB" },
          { id: "f3", name: "Riverside Pool Rules", kind: "doc", parent: "fdR", modified: "Oct 19, 2026", trashed: true, size: "6 KB" },
          { id: "f4", name: "Old Flyer Draft", kind: "doc", parent: "root", modified: "May 11, 2026", trashed: true, size: "3 KB" },
          { id: "f5", name: "Lobby Video - Full Resolution.mp4", kind: "video", parent: "root", modified: "Jun 3, 2026", size: "1.8 GB" },
          { id: "f6", name: "Lobby Video - Web.mp4", kind: "video", parent: "root", modified: "Jun 3, 2026", size: "96 MB" },
          { id: "f7", name: "Move-In Photos - River 114.pdf", kind: "pdf", parent: "fdR", modified: "Aug 20, 2026", size: "14 MB" },
        ],
      }),
      tasks: [
        {
          instruction: "Move “Copy of Copy of Laundry Schedule” to the trash.",
          hint: "Click the file once, then click Move to trash (the trash can) in the bar above the list. Right-click › Move to trash, or the Delete key, works too.",
          steps: [{ action: { kind: "command", id: "g.trash", value: "f1" } }],
        },
        {
          instruction: "Open the Trash.",
          hint: "Click Trash on the left side of Drive.",
          steps: [{ action: { kind: "command", id: "g.go", value: "trash" } }],
        },
        {
          instruction: "Restore “Riverside Pool Rules” so Andre has it back.",
          hint: "Right-click Riverside Pool Rules › Restore. It goes back to the Riverside Commons folder.",
          steps: [{ action: { kind: "command", id: "g.restore", value: "f3" } }],
        },
        {
          instruction: "Delete “Old Flyer Draft” forever. Nobody needs it.",
          hint: "In Trash, right-click Old Flyer Draft › Delete forever. This cannot be undone, so check the name first.",
          steps: [{ action: { kind: "command", id: "g.deleteForever", value: "f4" } }],
        },
        {
          instruction: "Open Storage to see which files use the most space.",
          hint: "Click Storage on the left side. The files are listed by Storage used, largest first.",
          steps: [{ action: { kind: "command", id: "g.go", value: "storage" } }],
        },
        {
          instruction: "Move the largest file, “Lobby Video - Full Resolution.mp4”, to the trash. Parkview keeps the smaller web version.",
          hint: "Click Lobby Video - Full Resolution.mp4 once, then click Move to trash (or right-click › Move to trash).",
          steps: [{ action: { kind: "command", id: "g.trash", value: "f5" } }],
        },
      ],
    },
  ],
};
