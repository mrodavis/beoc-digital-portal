import type { PptSlide, SimDefinition } from "@/types/sim";
import { googleDoc, type GFile } from "@/components/sim/apps/google/types";
import { EMAIL, GW_ME, GW_ORG, GW_PEOPLE } from "./people";

/** Google Workspace, Module 5 (Google Slides) sims, on the Google engine. Keys are "module-5::<lessonSlug>". */
const L = (n: string) => `module-5::${n}`;

const BASE = { me: GW_ME, org: GW_ORG, people: GW_PEOPLE };

const WELCOME_SLIDES: PptSlide[] = [
  { id: "s1", layout: "Title slide", title: "Welcome to Riverside Commons", subtitle: "Parkview Property Management" },
  { id: "s2", layout: "Title and body", title: "Your First Week", body: ["Pick up your keys and key fob at the office", "Set up online rent payment", "Walk through your apartment and note any damage"] },
  { id: "s3", layout: "Title and body", title: "Who to Call", body: ["Office: (555) 019-2400, Monday to Friday, 9:00 AM to 5:00 PM", "Maintenance requests: the online form or the office", "Emergencies after hours: the number on your key tag"] },
  { id: "s4", layout: "Title and body", title: "Laundry and Trash", body: ["Laundry room: basement, 7:00 AM to 10:00 PM", "Trash and recycling: bins behind Building B", "Bulk pickup: call the office to schedule"] },
];

function deckFile(slides: PptSlide[], extra: Partial<GFile> = {}): GFile {
  return {
    id: "f1",
    name: "New Tenant Welcome - Riverside Commons",
    kind: "slides",
    parent: "fR",
    modified: "Oct 20, 2026",
    sharing: { people: [{ email: EMAIL.denise, role: "Editor" }] },
    content: { active: "s1", theme: "Streamline", slides },
    ...extra,
  };
}

const FOLDERS: GFile[] = [
  { id: "fR", name: "Riverside Commons", kind: "folder", parent: "root", modified: "Oct 12, 2026" },
  { id: "fE", name: "Elm Street Apartments", kind: "folder", parent: "root", modified: "Oct 9, 2026" },
];

export const gwMailM5: Record<string, SimDefinition[]> = {
  [L("start-a-presentation")]: [
    {
      id: "gw-m5-start-a-presentation-1",
      app: "google",
      title: "Start the new tenant welcome presentation",
      scenario: "Denise wants a short slideshow for new tenants at Riverside Commons, shown on the lobby screen and emailed to each new tenant. You start it from scratch in Google Slides.",
      fileName: "Google Drive",
      minutes: 5,
      initial: googleDoc({ ...BASE, surface: "drive", drive: { location: "root" }, files: [...FOLDERS] }),
      tasks: [
        { instruction: "Create a new, blank Google Slides presentation.", hint: "In Drive, select New › Google Slides (or New › Google Slides › Blank presentation).", steps: [{ action: { kind: "command", id: "g.new", value: "Google Slides" } }] },
        { instruction: "Rename the presentation “New Tenant Welcome - Riverside Commons”.", hint: "Click the title “Untitled presentation” at the top left, type the new name, and press Enter.", steps: [{ action: { kind: "type", target: "rename:new1", value: "New Tenant Welcome - Riverside Commons" } }] },
        { instruction: "Apply the Streamline theme.", hint: "In the Themes panel on the right (or Slide › Change theme), select Streamline.", steps: [{ action: { kind: "command", id: "design.theme", value: "Streamline" } }] },
        { instruction: "On slide 1, type the title “Welcome to Riverside Commons”.", hint: "Click Click to add title on the slide, type the title, then click outside the box.", steps: [{ action: { kind: "type", target: "s1.title", value: "Welcome to Riverside Commons" } }] },
        {
          instruction: "Add a new slide that uses the Title and body layout.",
          hint: "Select the arrow next to New slide (+) on the toolbar and choose Title and body. (Slide › New slide also adds one.)",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Title and body" } }],
        },
        { instruction: "On the new slide, type the title “Your First Week”.", hint: "Click Click to add title on slide 2, type, then click outside the box.", steps: [{ action: { kind: "type", target: "s2.title", value: "Your First Week" } }] },
        {
          instruction: "Change slide 2's layout to Title and two columns.",
          hint: "Click slide 2 in the filmstrip (so no text box is selected), then select Layout on the toolbar (or Slide › Apply layout) and choose Title and two columns.",
          steps: [{ action: { kind: "command", id: "slides.layout", value: "Title and two columns" }, requires: { slide: "s2" }, selectHint: "Click slide 2 in the filmstrip first." }],
        },
      ],
    },
  ],

  [L("design-with-images-and-backgrounds")]: [
    {
      id: "gw-m5-design-with-images-and-backgrounds-1",
      app: "google",
      title: "Make the welcome deck look finished",
      scenario: "The welcome deck has the right words but looks plain. Denise sent a photo of the Riverside Commons lobby to use, and wants the contact slide to stand out.",
      fileName: "New Tenant Welcome - Riverside Commons",
      minutes: 5,
      initial: googleDoc({ ...BASE, surface: "slides", open: "f1", tabs: ["f1"], computer: ["Riverside Commons Lobby.jpg", "Laundry Room.jpg", "Parkview Logo.png"], files: [...FOLDERS, deckFile(WELCOME_SLIDES)] }),
      tasks: [
        {
          instruction: "On slide 1, insert the picture Riverside Commons Lobby.jpg from the computer.",
          hint: "With slide 1 selected, select Insert › Image › Upload from computer (or Insert image on the toolbar), choose Riverside Commons Lobby.jpg, and select Insert.",
          steps: [{ action: { kind: "dialog", id: "g.image", values: { file: "Riverside Commons Lobby.jpg" } }, requires: { slide: "s1" }, selectHint: "Click slide 1 in the filmstrip first." }],
        },
        {
          instruction: "Give slide 3 (“Who to Call”) the background color light cyan 3, on that slide only.",
          hint: "Click slide 3 in the filmstrip › Slide › Change background (or Background on the toolbar). Click the box to the right of Color, pick light cyan 3, and select Done. (Add to theme would change every slide.)",
          steps: [{ action: { kind: "dialog", id: "g.background", values: { color: "#d0e0e3", addToTheme: false } }, requires: { slide: "s3" }, selectHint: "Click slide 3 in the filmstrip first." }],
        },
        {
          instruction: "On slide 4, insert a Rounded rectangle shape.",
          hint: "Click slide 4 › Insert › Shape › Rounded rectangle (or Shape on the toolbar).",
          steps: [{ action: { kind: "command", id: "insert.shape", value: "Rounded rectangle" }, requires: { slide: "s4" }, selectHint: "Click slide 4 in the filmstrip first." }],
        },
        {
          instruction: "Duplicate slide 2 so you can make a version for Elm Street Apartments.",
          hint: "Right-click slide 2 in the filmstrip › Duplicate slide. (Or Slide › Duplicate slide.)",
          steps: [{ action: { kind: "command", id: "slides.duplicate" }, requires: { slide: "s2" }, selectHint: "Click slide 2 in the filmstrip first." }],
        },
        {
          instruction: "Move the copy (now slide 3) to the end of the presentation.",
          hint: "Right-click the copy in the filmstrip › Move slide to end. (Or Slide › Move slide › Slide to end, or drag it.)",
          steps: [{ action: { kind: "command", id: "slides.move", value: ["s5@end", "s5@5"] }, requires: { slide: "s5" }, selectHint: "Click the copy (slide 3) in the filmstrip first." }],
        },
      ],
    },
  ],

  [L("transitions-animations-and-notes")]: [
    {
      id: "gw-m5-transitions-animations-and-notes-1",
      app: "google",
      title: "Add motion and speaker notes",
      scenario: "The deck will loop on the Riverside Commons lobby display, and Denise will also present it at the tenant orientation. It needs gentle motion and notes for whoever presents.",
      fileName: "New Tenant Welcome - Riverside Commons",
      minutes: 5,
      initial: googleDoc({ ...BASE, surface: "slides", open: "f1", tabs: ["f1"], flags: { "view:notes": false }, files: [...FOLDERS, deckFile(WELCOME_SLIDES)] }),
      tasks: [
        {
          instruction: "Give slide 2 the Dissolve transition.",
          hint: "Click slide 2 › Slide › Transition (or Transition on the toolbar). In the Motion panel, choose Dissolve under Slide Transition.",
          steps: [{ action: { kind: "command", id: "transition.apply", value: "Dissolve" }, requires: { slide: "s2" }, selectHint: "Click slide 2 in the filmstrip first." }],
        },
        { instruction: "Use the same transition on every slide.", hint: "In the Motion panel, select Apply to all slides.", steps: [{ action: { kind: "command", id: "transition.applyAll" } }] },
        {
          instruction: "Animate the bulleted text on slide 2 with Fade in.",
          hint: "Click the bulleted text on slide 2 › Insert › Animation (or View › Motion). Under Object Animations, select Add animation: a new animation starts as Appear (On click). Then change Appear to Fade in in the animation drop-down.",
          steps: [
            { action: { kind: "command", id: "animation.apply", value: "Appear" }, requires: { selection: "s2.body" }, selectHint: "Click the bulleted text on slide 2 first." },
            { action: { kind: "command", id: "animation.apply", value: "Fade in" }, requires: { selection: "s2.body" }, selectHint: "Click the bulleted text on slide 2 first." },
          ],
        },
        {
          instruction: "Make that animation start After previous instead of On click.",
          hint: "In the Motion panel, open the start menu under the animation and choose After previous.",
          steps: [{ action: { kind: "command", id: "animation.start", value: "After previous" }, requires: { selection: "s2.body" }, selectHint: "Click the bulleted text on slide 2 first." }],
        },
        { instruction: "Show the speaker notes area.", hint: "View › Show speaker notes.", steps: [{ action: { kind: "command", id: "g.view", value: "notes" } }] },
        { instruction: "Add the speaker note “Hand out the key fob form here.” to slide 2.", hint: "Click Click to add speaker notes under slide 2, type the note, and press Enter.", steps: [{ action: { kind: "type", target: "s2.notes", value: "Hand out the key fob form here." } }] },
      ],
    },
  ],

  [L("present-share-and-download")]: [
    {
      id: "gw-m5-present-share-and-download-1",
      app: "google",
      title: "Present, share, and download the welcome deck",
      scenario: "The deck is ready for Thursday's orientation. A draft slide isn't approved yet, Andre wants to suggest changes, and the lobby screen needs a PowerPoint copy.",
      fileName: "New Tenant Welcome - Riverside Commons",
      minutes: 5,
      initial: googleDoc({
        ...BASE,
        surface: "slides",
        open: "f1",
        tabs: ["f1"],
        files: [...FOLDERS, deckFile([...WELCOME_SLIDES.map((s) => (s.id === "s2" ? { ...s, notes: "Hand out the key fob form here." } : s)), { id: "s5", layout: "Title and body", title: "DRAFT: Parking rules", body: ["Waiting for Denise to approve"] }])],
      }),
      tasks: [
        {
          instruction: "Skip slide 5 (“DRAFT: Parking rules”) so it doesn't appear when you present.",
          hint: "Right-click slide 5 in the filmstrip › Skip slide. (Or Slide › Skip slide.)",
          steps: [{ action: { kind: "command", id: "slides.hide" }, requires: { slide: "s5" }, selectHint: "Click slide 5 in the filmstrip first." }],
        },
        { instruction: "Rehearse in presenter view so you can see your speaker notes.", hint: "Select the arrow next to Slideshow at the top right › Presenter view. When you're done looking, select End show.", steps: [{ action: { kind: "command", id: "slideshow.presenterStart" } }] },
        { instruction: "Start the slideshow from the beginning.", hint: "End presenter view first (End show). Then select the arrow next to Slideshow › Present from beginning. Press Esc to stop.", steps: [{ action: { kind: "command", id: "slideshow.fromBeginning" } }] },
        {
          instruction: "Share the presentation with Andre Wallace as a Commenter so he can suggest changes without editing.",
          hint: "Press Esc to leave the slideshow. Select Share (top right), type Andre's address, choose Commenter, and select Send.",
          steps: [{ action: { kind: "dialog", id: "g.share", values: { file: "f1", email: EMAIL.andre, role: "Commenter" } } }],
        },
        { instruction: "Download a PDF copy to email to new tenants.", hint: "File › Download › PDF Document (.pdf).", steps: [{ action: { kind: "command", id: "g.download", value: "PDF Document (.pdf)" } }] },
        { instruction: "Download a PowerPoint copy for the lobby screen.", hint: "File › Download › Microsoft PowerPoint (.pptx).", steps: [{ action: { kind: "command", id: "g.download", value: "Microsoft PowerPoint (.pptx)" } }] },
      ],
    },
  ],
};
