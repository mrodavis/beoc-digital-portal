import type { SimAction, SimDefinition, SimStep } from "@/types/sim";
import { winDoc, type WebPage, type WinItem, type WinRoot } from "@/components/sim/apps/windows/types";
import { outlookDoc } from "@/components/sim/apps/outlook/types";
import { msg, person, recipients } from "@/components/sim/apps/outlook/simkit";
import { teamsDoc } from "@/components/sim/apps/teams/types";

/**
 * Challenge Labs (role: "challenge") for Tech Foundations modules 8-10
 * (cybersecurity, applications, IoT), keyed "module-N::lesson-slug".
 * See docs/SIMULATIONS.md, Challenge Labs. Each lab mirrors its lesson's
 * Challenge steps, in order, for students on locked-down school computers.
 * Lakeside Medical Associates scenario; fictional people and companies.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const F = (name: string, modified = "10/14/2026 10:12 AM", size = "36 KB", extra: Partial<WinItem> = {}): WinItem => ({ name, modified, size, ...extra });
const D = (name: string, children: WinItem[] = []): WinItem => ({ name, folder: true, children, modified: "10/12/2026 9:05 AM" });

function pc(o: { desktop?: WinItem[]; documents?: WinItem[]; downloads?: WinItem[] }): WinRoot[] {
  return [
    { name: "Desktop", root: "desktop", folder: true, children: o.desktop ?? [{ name: "Microsoft Edge", app: "edge" }] },
    { name: "Documents", root: "documents", folder: true, children: o.documents ?? [] },
    { name: "Downloads", root: "downloads", folder: true, children: o.downloads ?? [] },
    { name: "Pictures", root: "pictures", folder: true, children: [D("Screenshots")] },
    { name: "Music", root: "music", folder: true, children: [] },
    { name: "Videos", root: "videos", folder: true, children: [] },
    { name: "Local Disk (C:)", root: "drive", folder: true, capacity: "476 GB", free: "301 GB", children: [D("Program Files"), D("Users"), D("Windows")] },
  ];
}

const cmd = (id: string, value?: string): SimStep => ({ action: { kind: "command", id, ...(value !== undefined ? { value } : {}) } });
const set = (kv: string): SimStep => cmd("settings.set", kv);
/** A web form submitted with these values ("Label: value | Label: value", in field order). */
const form = (id: string, value: string): SimStep => ({ action: { kind: "type", target: `form:${id}`, value, match: "includes" } });
const click = (id: string): SimStep => ({ action: { kind: "click", target: `web:${id}` } });
const nav = (url: string, ...alts: string[]): SimStep => ({ action: { kind: "command", id: "edge.nav", value: url }, ...(alts.length ? { alt: alts.map((u) => ({ kind: "command" as const, id: "edge.nav", value: u })) } : {}) });

/**
 * Typed text that must contain one alternative from every group (match "all").
 * `sample` is the main action so the validator can replay it.
 */
function anyOf(target: string, sample: string, groups: string[][], extra: Omit<SimStep, "action" | "alt"> = {}): SimStep {
  const norm = (x: string) => x.toLowerCase().replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
  let combos: string[][] = [[]];
  for (const g of groups) combos = combos.flatMap((c) => g.map((o) => [...c, o]));
  if (combos.length > 400) throw new Error(`anyOf ${target}: too many combinations (${combos.length})`);
  if (!combos.some((c) => c.every((k) => norm(sample).includes(norm(k))))) throw new Error(`anyOf sample for ${target} misses a group: ${sample}`);
  const alt: SimAction[] = combos.map((c) => ({ kind: "type", target, value: c, match: "all" }));
  return { action: { kind: "type", target, value: sample, match: "includes" }, alt, ...extra };
}

const JORDAN = { name: "Jordan Rivera", email: "jrivera@lakesidemed.example", org: "Lakeside Medical Associates" };

/* ------------------------------------------------------------------ */
/* Module 8: password lab web pages                                    */
/* ------------------------------------------------------------------ */

const PASSPHRASE = "tundra-velvet-harbor-cactus-orbit";
const OLD_PW = "Biscuit2019!";

const PASSWORD_WEB: Record<string, WebPage> = {
  "breachcheck.contoso.com": {
    title: "Contoso Breach Check",
    site: "Contoso Breach Check",
    color: "#7a1f1f",
    blocks: [
      { t: "h1", text: "Has your email address been in a data breach?" },
      { t: "p", text: "Enter an email address to search the records of known data breaches. We never ask for your password." },
      { t: "form", id: "breach-check", title: "Check an email address", fields: [{ name: "email", label: "Email address", type: "email", placeholder: "name@example.com" }], submit: "Check", goto: "breachcheck.contoso.com/results" },
      { t: "small", text: "Practice site for the BEOC Digital Challenge Lab. On your own device, use haveibeenpwned.com." },
    ],
  },
  "breachcheck.contoso.com/results": {
    title: "Contoso Breach Check | Results",
    site: "Contoso Breach Check",
    color: "#7a1f1f",
    blocks: [
      { t: "alert", tone: "bad", text: "Oh no: jordan.rivera@contoso.com was found in 2 data breaches." },
      {
        t: "table",
        head: ["Breached site", "Year", "Data exposed"],
        rows: [
          ["Fabrikam Fitness", "2025", "Email addresses, names, passwords"],
          ["Contoso Coupons", "2023", "Email addresses"],
        ],
      },
      { t: "p", text: "The Fabrikam Fitness breach exposed passwords. Any account where you used the same password is at risk, because attackers try leaked passwords on other sites within minutes." },
      { t: "p", text: "You used the Fabrikam Fitness password, Biscuit2019!, for your Contoso Mail account too. Change it now to a strong password you have never used anywhere else." },
      { t: "link", text: "Make a strong password with Contoso Vault's generator", href: "vault.contoso.com" },
    ],
  },
  "vault.contoso.com": {
    title: "Contoso Vault | Generator",
    site: "Contoso Vault",
    color: "#175cd3",
    nav: [
      { text: "Vault", href: "vault.contoso.com" },
      { text: "Generator", href: "vault.contoso.com" },
    ],
    blocks: [
      { t: "h1", text: "Generator" },
      { t: "p", text: "Create a random password or passphrase. A passphrase of five or more random words is long, strong, and easier to type when you have to." },
      { t: "select", id: "gen-type", label: "What would you like to generate?", options: ["Password", "Passphrase"], value: "Password" },
      { t: "select", id: "gen-words", label: "Number of words (passphrase)", options: ["3", "4", "5", "6"], value: "3" },
      { t: "select", id: "gen-length", label: "Length (password)", options: ["14", "16", "20", "24"], value: "14" },
      { t: "button", id: "gen-go", text: "Generate", goto: "vault.contoso.com/generated" },
      { t: "small", text: "Practice password manager for the BEOC Digital Challenge Lab. On your own device, Bitwarden's free web vault has the same kind of generator." },
    ],
  },
  "vault.contoso.com/generated": {
    title: "Contoso Vault | Generator",
    site: "Contoso Vault",
    color: "#175cd3",
    blocks: [
      { t: "h1", text: "Generated passphrase" },
      { t: "alert", tone: "ok", text: PASSPHRASE },
      { t: "p", text: "5 random words, 33 characters. Use this passphrase for exactly one account. In real life the vault would save it and fill it in for you; here, type it into the Contoso Mail form." },
      { t: "link", text: "Go to Contoso Mail security settings", href: "mail.contoso.com/account/security" },
    ],
  },
  "mail.contoso.com/account/security": {
    title: "Contoso Mail | Security",
    site: "Contoso Mail",
    color: "#0e7490",
    blocks: [
      { t: "h1", text: "Security" },
      { t: "p", text: "Signed in as jordan.rivera@contoso.com" },
      {
        t: "form",
        id: "change-pw",
        title: "Change password",
        fields: [
          { name: "cur", label: "Current password", type: "password" },
          { name: "new", label: "New password", type: "password" },
          { name: "confirm", label: "Confirm new password", type: "password" },
        ],
        submit: "Change password",
        toast: "Password changed. You'll need to sign in again on your other devices.",
      },
    ],
  },
  "mysignins.microsoft.com/security-info": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    nav: [
      { text: "Overview", href: "mysignins.microsoft.com/security-info" },
      { text: "Security info", href: "mysignins.microsoft.com/security-info" },
    ],
    blocks: [
      { t: "h1", text: "Security info" },
      { t: "p", text: "These are the methods you use to sign into your account or reset your password." },
      { t: "p", text: "Signed in as jrivera@lakesidemed.example (Lakeside Medical Associates)" },
      { t: "table", head: ["Method", "Detail"], rows: [["Password", "Last updated: 2 months ago"]] },
      { t: "link", text: "+ Add sign-in method", href: "mysignins.microsoft.com/security-info/add", button: true },
    ],
  },
  "mysignins.microsoft.com/security-info/add": {
    title: "My Sign-Ins | Add a sign-in method",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Add a sign-in method" },
      {
        t: "form",
        id: "add-method",
        title: "Which method would you like to add?",
        fields: [{ name: "method", label: "Method", type: "select", options: ["Choose a method", "Passkey in Microsoft Authenticator", "Microsoft Authenticator", "Security key", "Phone", "Email"] }],
        submit: "Add",
        goto: "mysignins.microsoft.com/security-info/authenticator",
      },
    ],
  },
  "mysignins.microsoft.com/security-info/authenticator": {
    title: "My Sign-Ins | Microsoft Authenticator",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Microsoft Authenticator" },
      { t: "h3", text: "Scan the QR code" },
      { t: "p", text: "Use the Microsoft Authenticator app to scan the QR code. This will connect the Microsoft Authenticator app with your account." },
      { t: "image", label: "QR code", glyph: "▦" },
      { t: "small", text: "On your phone: open Microsoft Authenticator, select +, choose Work or school account, then Scan a QR code. (In this lab, just select Next.)" },
      { t: "button", id: "qr-next", text: "Next", goto: "mysignins.microsoft.com/security-info/test" },
    ],
  },
  "mysignins.microsoft.com/security-info/test": {
    title: "My Sign-Ins | Microsoft Authenticator",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      {
        t: "cols",
        cols: [
          [
            { t: "h2", text: "Let's try it out" },
            { t: "p", text: "Approve the notification we're sending to your app by entering the number shown below." },
            { t: "h1", text: "47" },
          ],
          [
            { t: "h3", text: "Your phone: Microsoft Authenticator" },
            { t: "p", text: "Are you trying to sign in? Lakeside Medical Associates, jrivera@lakesidemed.example" },
            { t: "form", id: "phone-approve", fields: [{ name: "num", label: "Enter the number shown to sign in", type: "number" }], submit: "Yes", goto: "mysignins.microsoft.com/security-info/approved" },
          ],
        ],
      },
    ],
  },
  "mysignins.microsoft.com/security-info/approved": {
    title: "My Sign-Ins | Microsoft Authenticator",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Microsoft Authenticator" },
      { t: "alert", tone: "ok", text: "Notification approved" },
      { t: "button", id: "auth-next", text: "Next", goto: "mysignins.microsoft.com/security-info/done" },
    ],
  },
  "mysignins.microsoft.com/security-info/done": {
    title: "My Sign-Ins | Security info",
    site: "My Sign-Ins",
    color: "#0f6cbd",
    blocks: [
      { t: "h1", text: "Security info" },
      { t: "alert", tone: "ok", text: "Microsoft Authenticator was registered. From now on you'll approve sign-ins by entering the number shown on screen into the app." },
      { t: "table", head: ["Method", "Detail"], rows: [["Password", "Last updated: 2 months ago"], ["Microsoft Authenticator", "Push multi-factor authentication (MFA)"]] },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Module 10: OEM software and IoT lab web pages                       */
/* ------------------------------------------------------------------ */

const OEM_WEB: Record<string, WebPage> = {
  "litwareinc.com/support/software": {
    title: "Litware Support | Software for your PC",
    site: "Litware Support",
    color: "#4338ca",
    blocks: [
      { t: "h1", text: "Software for Litware OptiFrame desktops" },
      { t: "p", text: "Litware maintains the software that ships on its computers. Supported apps get security fixes and compatibility updates through Litware Support Assistant." },
      {
        t: "table",
        head: ["App", "Latest version", "Support status"],
        rows: [
          ["Litware Support Assistant", "5.4.2 (September 2026)", "Supported. Updated monthly"],
          ["Litware Audio Console", "3.0.1 (June 2026)", "Supported"],
          ["Litware Display Tuner", "1.8.0 (2022)", "End of support. No further updates or security fixes"],
        ],
      },
      { t: "h2", text: "Where your data is stored" },
      { t: "p", text: "Litware Support Assistant sends device health reports (model, drivers, error logs) to Litware's cloud service in the United States. You can turn this off in the app's Privacy settings." },
      { t: "alert", tone: "warn", text: "Litware Display Tuner is no longer supported. Uninstall it; Windows Settings › System › Display does the same job." },
    ],
  },
};

const IOT_ROUTER = "192.168.20.1";

const IOT_WEB: Record<string, WebPage> = {
  [IOT_ROUTER]: {
    title: "Contoso Router | Connected devices",
    secure: false,
    site: "Contoso Router",
    color: "#334155",
    nav: [
      { text: "Connected devices", href: IOT_ROUTER },
      { text: "Wireless", href: IOT_ROUTER },
    ],
    blocks: [
      { t: "h1", text: "Connected devices" },
      { t: "p", text: "Lakeside Medical Associates, second location. 9 devices connected." },
      {
        t: "table",
        head: ["Device", "Maker", "Type", "Network"],
        rows: [
          ["LMA-FRONT-01", "Litware", "Computer", "Main network"],
          ["LMA-EXAM-02", "Litware", "Computer", "Main network"],
          ["Check-in Printer", "Fabrikam", "Printer", "Main network"],
          ["Practice manager's laptop", "Litware", "Computer", "Main network"],
          ["Dr. Okafor's phone", "Contoso", "Phone", "Main network"],
          ["Lobby TV", "Fabrikam", "Smart TV", "Main network"],
          ["Vaccine Fridge Monitor", "Contoso Sensors", "Temperature sensor", "IoT network"],
          ["Front Door Controller", "Proseware", "Door access", "IoT network"],
          ["Smart Thermostat", "Proseware", "Thermostat", "IoT network"],
        ],
      },
      { t: "h2", text: "Maker support pages" },
      { t: "link", text: "Lobby TV: Fabrikam FX-55 support", href: "support.fabrikam.com/tv/fx-55" },
      { t: "link", text: "Vaccine Fridge Monitor: Contoso Sensors TM-200 support", href: "support.contoso.com/sensors/tm-200" },
      { t: "link", text: "Front Door Controller: Proseware DoorHub support", href: "support.proseware.com/doorhub" },
      { t: "h2", text: "Move a device" },
      { t: "select", id: "net-tv", label: "Lobby TV network", options: ["Main network", "IoT network", "Guest network (internet only)"], value: "Main network" },
    ],
  },
  "support.fabrikam.com/tv/fx-55": {
    title: "Fabrikam FX-55 Smart TV | Support",
    site: "Fabrikam Support",
    color: "#b45309",
    blocks: [
      { t: "h1", text: "FX-55 Smart TV (2019)" },
      { t: "alert", tone: "bad", text: "Software updates for this model ended in March 2024. The FX-55 no longer receives security updates." },
      { t: "p", text: "Latest software: 7.2.18 (February 2024). For continued updates, see our current models." },
    ],
  },
  "support.contoso.com/sensors/tm-200": {
    title: "Contoso Sensors TM-200 | Support",
    site: "Contoso Sensors",
    color: "#0f766e",
    blocks: [
      { t: "h1", text: "TM-200 Temperature Monitor" },
      { t: "alert", tone: "ok", text: "Supported. Firmware 4.2 released September 2026. Security updates are planned through 2030." },
      { t: "p", text: "Firmware installs automatically overnight when the monitor is online." },
    ],
  },
  "support.proseware.com/doorhub": {
    title: "Proseware DoorHub | Support",
    site: "Proseware Support",
    color: "#7c3aed",
    blocks: [
      { t: "h1", text: "DoorHub Controller" },
      { t: "alert", tone: "ok", text: "Supported. Current firmware 2.9.4 (August 2026). Security updates are released quarterly." },
      { t: "p", text: "Change the default installer PIN at setup. Remote unlock is off by default." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Outlook and Teams people                                            */
/* ------------------------------------------------------------------ */

const OL_ME = person("Jordan Rivera", "jrivera@lakesidemed.example");
const OL_MARIA = person("Maria Santos", "msantos@lakesidemed.example");
const OL_SAM = person("Sam Patel", "spatel@lakesidemed.example");
const OL_SEC = person("Lakeside IT Security", "itsecurity@lakesidemed.example");
const OL_DENISE = person("Denise Park", "dpark@lakesidemed.example");
const OL_FAKE = person("Microsoft Account Team", "security@microsoft-365-account.net");

const FAKE_BODY =
  "Dear Microsoft User,\n\nWe detected suspicious activity on your account. You must verify your identity by clicking the button below within 24 hours. Failure to do so will result in permanent account closure.\n\n[VERIFY NOW](https://microsoft-365-account.net/verify-identity)\n\nThis message was sent to ensure account security.";

/* ------------------------------------------------------------------ */
/* Labs                                                                */
/* ------------------------------------------------------------------ */

export const labsSecuritySims: Record<string, SimDefinition[]> = {
  /* ============================ Module 8 ============================ */
  "module-8::cybersecurity-threats": [
    {
      id: "tf-m8-windows-security-lab",
      app: "windows",
      role: "challenge",
      title: "Check this computer's defenses",
      scenario:
        "A coworker at Lakeside Medical Associates turned off some protections on the front desk PC while installing a printer driver and never turned them back on. Do the Challenge's defense check: open Windows Security, fix every area that shows a warning, run a scan, review what Microsoft Defender has blocked, and make sure Windows is up to date.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: JORDAN,
        settings: { "sec.realtime": "off", "sec.firewall.public": "off", "sec.smartscreen": "off" },
        security: { history: ["Threat quarantined: Trojan:HTML/Phish.A (Downloads\\Invoice_Oct.htm)"] },
        notifications: [{ app: "security", title: "Windows Security", text: "Virus & threat protection: Real-time protection is off, leaving your device vulnerable.", time: "8:52 AM" }],
        fs: pc({ documents: [D("Front Desk"), D("Forms")] }),
        windows: [],
        focus: null,
      }),
      tasks: [
        {
          instruction: "Open Windows Security. Real-time protection has been turned off: turn it back on.",
          hint: "Start › type Windows Security (or Settings › Privacy & security › Windows Security › Open Windows Security). Select Virus & threat protection › Manage settings › turn Real-time protection On.",
          steps: [set("sec.realtime=on")],
        },
        {
          instruction: "Run a quick scan.",
          hint: "Virus & threat protection › Quick scan.",
          steps: [cmd("sec.scan", "quick")],
        },
        {
          instruction: "The firewall is off for one network type. Turn it back on for the Public network.",
          hint: "Firewall & network protection › turn on Microsoft Defender Firewall for Public network.",
          steps: [set("sec.firewall.public=on")],
        },
        {
          instruction: "Turn SmartScreen for Microsoft Edge back on, so Edge warns you about phishing and malware sites.",
          hint: "App & browser control › Reputation-based protection › SmartScreen for Microsoft Edge › On.",
          steps: [set("sec.smartscreen=on")],
        },
        {
          instruction: "Open Protection history to see what Microsoft Defender has already caught on this PC.",
          hint: "In Windows Security, select Protection history on the left.",
          steps: [cmd("sec.nav", "history")],
        },
        {
          instruction: "Check for Windows updates.",
          hint: "Start › Settings › Windows Update › Check for updates.",
          steps: [cmd("update.check")],
        },
      ],
    },
  ],

  "module-8::password-security-mfa": [
    {
      id: "tf-m8-password-mfa-lab",
      app: "windows",
      role: "challenge",
      title: "Breach check, strong password, and MFA",
      scenario:
        "Do steps 2–4 of the Challenge without using a real account. Check your personal email address (jordan.rivera@contoso.com) for breaches, make a strong passphrase with a password manager, replace a reused password, and add Microsoft Authenticator to your Lakeside work account.",
      fileName: "Windows",
      minutes: 7,
      initial: winDoc({
        user: JORDAN,
        web: PASSWORD_WEB,
        fs: pc({ documents: [D("Front Desk")] }),
        windows: [{ id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" }],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "Go to breachcheck.contoso.com and check whether jordan.rivera@contoso.com appears in any known data breach.",
          hint: "Click the address bar, type breachcheck.contoso.com and press Enter. Type the email address in the box and select Check.",
          steps: [nav("breachcheck.contoso.com"), form("breach-check", "Email address: jordan.rivera@contoso.com")],
        },
        {
          instruction: "The breach exposed a password you reused. Open the Contoso Vault generator at vault.contoso.com and generate a passphrase of 5 random words.",
          hint: "Select the generator link on the results page (or type vault.contoso.com). Set What would you like to generate? to Passphrase, set Number of words to 5, then select Generate.",
          steps: [nav("vault.contoso.com"), cmd("web.set", "gen-type=Passphrase"), cmd("web.set", "gen-words=5"), click("gen-go")],
        },
        {
          instruction: `Go to mail.contoso.com/account/security and change your Contoso Mail password from "${OLD_PW}" to the new passphrase "${PASSPHRASE}".`,
          hint: "Select Go to Contoso Mail security settings (or type the address). Enter the current password, then the passphrase in New password and Confirm new password, and select Change password.",
          steps: [nav("mail.contoso.com/account/security"), form("change-pw", `Current password: ${OLD_PW} | New password: ${PASSPHRASE} | Confirm new password: ${PASSPHRASE}`)],
        },
        {
          instruction: "Open your work account's Security info page at mysignins.microsoft.com/security-info and start adding Microsoft Authenticator as a sign-in method.",
          hint: "Type mysignins.microsoft.com/security-info in the address bar. Select + Add sign-in method, choose Microsoft Authenticator in the Method box, then select Add.",
          steps: [nav("mysignins.microsoft.com/security-info"), form("add-method", "Method: Microsoft Authenticator")],
        },
        {
          instruction: "Scan the QR code (in this lab, select Next), then approve the test notification by entering the number shown on screen into the phone panel.",
          hint: "Select Next under the QR code. On the next page, type the big number (47) into Enter the number shown to sign in on the phone panel, then select Yes.",
          steps: [click("qr-next"), form("phone-approve", "Enter the number shown to sign in: 47")],
        },
        {
          instruction: "Finish the setup and confirm that Microsoft Authenticator now appears on your Security info page.",
          hint: "Select Next on the Notification approved page.",
          steps: [click("auth-next")],
        },
      ],
    },
  ],

  "module-8::phishing-social-engineering": [
    {
      id: "tf-m8-phishing-inbox-lab",
      app: "outlook",
      role: "challenge",
      title: "Inspect and report the account suspension email",
      scenario:
        "The email from step 1 of the Challenge just arrived in your Lakeside Medical Associates inbox, and your coworker Maria forwarded you a copy asking whether it is real. Point to the sender's name to see the real address and point to VERIFY NOW to see where it goes, but do not click it. Then handle the message the way the lesson teaches.",
      fileName: "Inbox",
      minutes: 6,
      initial: outlookDoc({
        account: OL_ME,
        now: "2026-10-20T09:30",
        readingPane: "Right",
        directory: [OL_MARIA, OL_SAM, OL_SEC, OL_DENISE],
        messages: [
          msg("m1", OL_FAKE, "URGENT: Your Account Will Be Suspended", FAKE_BODY, "2026-10-20T09:12", { to: [OL_ME], external: true, firstTime: true, importance: "High" }),
          msg(
            "m2",
            OL_MARIA,
            "FW: URGENT: Your Account Will Be Suspended",
            "Jordan, I got this too. Is it real? Should I click Verify Now so we don't lose our email?\n\nMaria\n\n-----Original Message-----\nFrom: Microsoft Account Team <security@microsoft-365-account.net>\nSubject: URGENT: Your Account Will Be Suspended\n\n" + FAKE_BODY,
            "2026-10-20T09:21",
            { to: [OL_ME] },
          ),
          msg("m3", OL_DENISE, "Flu clinic schedule", "Hi team,\n\nThe Saturday flu clinic schedule is posted in the Front Desk folder. Let me know if you can't cover your shift.\n\nDenise", "2026-10-20T08:05", { to: [OL_ME, OL_MARIA], read: true }),
        ],
      }),
      tasks: [
        {
          instruction:
            "Forward \"URGENT: Your Account Will Be Suspended\" as an attachment to itsecurity@lakesidemed.example. In the note, name at least three warning signs: the sender's address, the 24-hour deadline, and the generic greeting.",
          hint: "Select the message › Home tab › Respond group › More › Forward as Attachment (Ctrl+Alt+F). Type the address in To, write a note such as \"Possible phishing. The sender is microsoft-365-account.net, not microsoft.com; it threatens closure in 24 hours; it says Dear Microsoft User. I did not click the link.\" and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.forwardAttachment" }, requires: { selection: "msg:m1" }, selectHint: "Select the message \"URGENT: Your Account Will Be Suspended\" first." },
            { action: { kind: "type", target: "compose.to", value: recipients(OL_SEC.email) } },
            anyOf(
              "compose.body",
              "Possible phishing. The sender is microsoft-365-account.net, not microsoft.com; it threatens permanent closure within 24 hours; and it says Dear Microsoft User instead of my name. I did not click the link.",
              [
                ["microsoft-365-account", "sender", "address", "domain"],
                ["24 hours", "24-hour", "deadline", "urgent"],
                ["dear microsoft user", "greeting", "my name", "generic"],
              ],
            ),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: "Now report the message as phishing.",
          hint: "Select the message › Home tab › Protection group › Report › Report Phishing (or right-click › Report › Report Phishing).",
          steps: [{ action: { kind: "command", id: "home.report", value: "Report Phishing" }, requires: { selection: "msg:m1" }, selectHint: "Select the message \"URGENT: Your Account Will Be Suspended\" first." }],
        },
        {
          instruction: "Reply to Maria's forwarded copy. Tell her not to click the link and to report the message as phishing.",
          hint: "Select Maria's message › Home tab › Reply (Ctrl+R). Write something like \"Don't click Verify Now. It's phishing: please use Report › Report phishing on your copy.\" and click Send.",
          steps: [
            { action: { kind: "command", id: "mail.reply" }, requires: { selection: "msg:m2" }, selectHint: "Select Maria Santos's message first." },
            anyOf("compose.body", "Don't click Verify Now. It's phishing, so please use Report › Report phishing on your copy.", [["don't click", "do not click", "dont click", "not click"], ["report"]]),
            { action: { kind: "command", id: "compose.send" } },
          ],
        },
        {
          instruction: "Delete Maria's forwarded copy, since it still contains the dangerous link.",
          hint: "Select Maria's message and press Delete (or Home tab › Delete).",
          steps: [{ action: { kind: "command", id: "item.delete" }, requires: { selection: "msg:m2" }, selectHint: "Select Maria Santos's message first." }],
        },
      ],
    },
    {
      id: "tf-m8-fake-it-chat-lab",
      app: "teams",
      role: "challenge",
      title: "Role-play: someone posing as IT asks for your code",
      scenario:
        "Step 4 of the Challenge without a partner. Someone calling themselves the Lakeside Help Desk has messaged you in Teams asking for the code from your authenticator app. The real IT manager at Lakeside is Sam Patel. Refuse, verify through a channel you already trust, and report the request.",
      fileName: "Teams",
      minutes: 4,
      initial: teamsDoc({
        org: "Lakeside Medical Associates",
        today: "2026-10-20",
        now: "10:14 AM",
        me: { name: "Jordan Rivera", title: "Front Desk Assistant", email: "jrivera@lakesidemed.example", presence: "Available" },
        people: [
          { id: "p-fake", name: "Lakeside Help Desk (External)", title: "helpdesk@lakeside-it-support.net", presence: "Available", color: "#6b7280" },
          { id: "p-sam", name: "Sam Patel", title: "IT Manager", email: "spatel@lakesidemed.example", presence: "Available" },
          { id: "p-maria", name: "Maria Santos", title: "Front Desk Assistant", presence: "Available" },
          { id: "p-denise", name: "Denise Park", title: "Practice Manager", presence: "Busy" },
        ],
        chats: [
          {
            id: "c-fake",
            members: ["p-fake"],
            unread: true,
            messages: [
              { id: "m-f1", from: "p-fake", time: "10:09 AM", text: "Hi Jordan, this is the Help Desk. We're fixing a sign-in problem on your account before it locks you out of the EHR." },
              { id: "m-f2", from: "p-fake", time: "10:10 AM", text: "I just sent a code to your Authenticator app. Reply with the 6-digit code in the next 5 minutes so I can finish the fix. Don't log off." },
            ],
          },
          { id: "c-sam", members: ["p-sam"], messages: [{ id: "m-s1", from: "p-sam", time: "Yesterday", text: "Your new monitor is set up. Call me if anything looks off." }] },
          { id: "c-maria", members: ["p-maria"], messages: [{ id: "m-m1", from: "p-maria", time: "9:40 AM", text: "Can you cover the phones at 12?" }] },
        ],
        teams: [
          {
            id: "t-lma",
            name: "Lakeside Medical Associates",
            color: "#0f6cbd",
            channels: [{ id: "ch-gen", name: "General", posts: [{ id: "m-g1", from: "p-denise", time: "Mon 8:30 AM", text: "Reminder: IT will never ask for your password or sign-in codes.", replies: [] }] }],
          },
        ],
        start: { view: "chat", conv: "c-fake" },
      }),
      tasks: [
        {
          instruction: "Reply in the Lakeside Help Desk (External) chat. Refuse to share the code, and say you will contact IT yourself.",
          hint: "Click in the Type a message box in that chat, write something like \"I can't share my code. I will contact IT directly.\" and press Enter.",
          steps: [
            anyOf(
              "chat:c-fake",
              "I can't share my code with anyone. I will contact IT directly.",
              [
                ["can't", "cannot", "can not", "won't", "will not", "not going to", "not share", "no"],
                ["code"],
                ["contact it", "call it", "it directly", "it department", "it team", "it myself", "help desk", "helpdesk", "sam", "my manager", "supervisor"],
              ],
              { requires: { selection: "chat:c-fake" }, selectHint: "Open the Lakeside Help Desk (External) chat first." },
            ),
          ],
        },
        {
          instruction: "Forward the message that asks for the 6-digit code to Sam Patel with a note saying it may be social engineering.",
          hint: "Point to the message › More options (…) › Forward. Choose Sam Patel, type a note such as \"Possible social engineering. This account asked for my Authenticator code.\" and select Forward.",
          steps: [anyOf("forward:m-f2", "To: Sam Patel\nMessage: Possible social engineering. This external account asked for my Authenticator code.", [["to: sam patel"], ["social engineering", "phishing", "scam", "fake", "suspicious", "not you", "not it"]])],
        },
        {
          instruction: "Verify through a channel you already trust: call Sam Patel in Teams.",
          hint: "Open your chat with Sam Patel and select the Audio call button (or Calls › Sam Patel › Call).",
          steps: [
            {
              action: { kind: "command", id: "chat.call", value: "audio" },
              alt: [{ kind: "command", id: "chat.call", value: "video" }, { kind: "command", id: "calls.call", value: "p-sam" }],
              requires: { selection: "chat:c-sam" },
              selectHint: "Open your chat with Sam Patel first.",
            },
          ],
        },
      ],
    },
  ],

  /* ============================ Module 10 =========================== */
  "module-10::apps-and-how-software-is-built": [
    {
      id: "tf-m10-oem-software-lab",
      app: "windows",
      role: "challenge",
      title: "Find OEM software and check its support",
      scenario:
        "Step 4 of the Challenge on the Lakeside front desk PC, a Litware OptiFrame desktop. Find the software Litware (the PC's manufacturer) installed, check Litware's support page to see which of it is still supported, record what you find in Software review.txt, and remove the app that no longer gets security fixes.",
      fileName: "Windows",
      minutes: 5,
      initial: winDoc({
        user: JORDAN,
        specs: { model: "Litware OptiFrame 5100" },
        apps: [
          { name: "Litware Support Assistant", publisher: "Litware Inc.", version: "5.4.2", size: "151 MB", installed: "2/3/2025" },
          { name: "Litware Audio Console", publisher: "Litware Inc.", version: "3.0.1", size: "38.2 MB", installed: "2/3/2025" },
          { name: "Litware Display Tuner", publisher: "Litware Inc.", version: "1.8.0", size: "22.6 MB", installed: "2/3/2025" },
        ],
        web: OEM_WEB,
        fs: pc({
          documents: [F("Software review.txt", "10/20/2026 8:40 AM", "1 KB", { text: "OEM software review - front desk PC\nOEM app: \nStill supported?: \n" })],
        }),
        windows: [{ id: "notepad", app: "notepad", file: "Documents/Software review.txt" }],
        focus: "notepad",
      }),
      tasks: [
        {
          instruction: "Open Installed apps in Settings and look for the apps whose publisher is Litware Inc., the company that made this PC.",
          hint: "Start › Settings › Apps › Installed apps. The publisher shows under each app's name.",
          steps: [cmd("settings.nav", "apps/installed")],
        },
        {
          instruction: "In Microsoft Edge, open Litware's software support page at litwareinc.com/support/software.",
          hint: "Open Edge, click the address bar, type litwareinc.com/support/software and press Enter.",
          steps: [nav("litwareinc.com/support/software")],
        },
        {
          instruction: "In Software review.txt, after \"OEM app:\" type the name of the Litware app that is no longer supported, then save.",
          hint: "Switch to Notepad, click at the end of the OEM app: line, type Litware Display Tuner, then press Ctrl+S.",
          steps: [{ action: { kind: "type", target: "notepad:Documents/Software review.txt", value: "Litware Display Tuner", match: "includes" } }],
        },
        {
          instruction: "After \"Still supported?:\" type \"No - end of support, no security fixes\", then save.",
          hint: "Click at the end of the Still supported?: line, type the text, then press Ctrl+S.",
          steps: [{ action: { kind: "type", target: "notepad:Documents/Software review.txt", value: ["end of support", "no security"], match: "all" } }],
        },
        {
          instruction: "Uninstall Litware Display Tuner, since it will never get another security fix.",
          hint: "Settings › Apps › Installed apps › … next to Litware Display Tuner › Uninstall › Uninstall.",
          steps: [cmd("app.uninstall", "Litware Display Tuner")],
        },
      ],
    },
  ],

  "module-10::internet-of-things": [
    {
      id: "tf-m10-iot-inventory-lab",
      app: "windows",
      role: "challenge",
      title: "Inventory the connected devices and check their updates",
      scenario:
        "Steps 1 and 2 of the Challenge at Lakeside's second location. The router's Connected devices page lists everything on the network, including things nobody thinks of as computers. Inventory the smart devices in IoT inventory.txt, check three makers' support pages for security updates, record what you found and where, and isolate the device that is no longer supported.",
      fileName: "Windows",
      minutes: 6,
      initial: winDoc({
        user: JORDAN,
        web: IOT_WEB,
        fs: pc({
          documents: [F("IoT inventory.txt", "10/20/2026 8:30 AM", "1 KB", { text: "IoT inventory - second location\nConnected devices that aren't computers: \nUpdates still issued?: \nWhere I looked: \n" })],
        }),
        windows: [
          { id: "notepad", app: "notepad", file: "Documents/IoT inventory.txt" },
          { id: "edge", app: "edge", tabs: [{ id: "t1", url: "edge://newtab" }], tab: "t1" },
        ],
        focus: "edge",
      }),
      tasks: [
        {
          instruction: "In Edge, open the router's Connected devices page at 192.168.20.1.",
          hint: "Click the address bar, type 192.168.20.1 and press Enter.",
          steps: [nav(IOT_ROUTER)],
        },
        {
          instruction: "In IoT inventory.txt, after \"Connected devices that aren't computers:\" list the four smart devices the router shows (the TV, the fridge monitor, the door controller, and the thermostat), then save.",
          hint: "Switch to Notepad, click at the end of that line, type \"Lobby TV, Vaccine Fridge Monitor, Front Door Controller, Smart Thermostat\" and press Ctrl+S.",
          steps: [{ action: { kind: "type", target: "notepad:Documents/IoT inventory.txt", value: ["tv", "fridge", "door", "thermostat"], match: "all" } }],
        },
        {
          instruction: "Open the support pages for the Lobby TV, the Vaccine Fridge Monitor, and the Front Door Controller to see whether each maker still issues security updates.",
          hint: "On the router page, under Maker support pages, select each link (use Back to return to the router page).",
          anyOrder: true,
          steps: [nav("support.fabrikam.com/tv/fx-55"), nav("support.contoso.com/sensors/tm-200"), nav("support.proseware.com/doorhub")],
        },
        {
          instruction: "After \"Updates still issued?:\" type \"TV: No, Fridge monitor: Yes, Door controller: Yes\" and after \"Where I looked:\" type \"maker support pages\", then save.",
          hint: "Switch to Notepad, type each answer at the end of its line, then press Ctrl+S.",
          steps: [{ action: { kind: "type", target: "notepad:Documents/IoT inventory.txt", value: ["tv: no", "fridge monitor: yes", "door controller: yes", "maker support page"], match: "all" } }],
        },
        {
          instruction: "The Lobby TV no longer gets security updates. Until it is replaced, move it to the Guest network (internet only) so it cannot reach anything else.",
          hint: "On the router page (192.168.20.1), set Lobby TV network to Guest network (internet only).",
          steps: [cmd("web.set", "net-tv=Guest network (internet only)")],
        },
      ],
    },
  ],
};
