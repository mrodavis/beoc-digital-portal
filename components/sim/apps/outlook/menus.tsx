"use client";

import type { Ctx } from "./ctx";
import type { OlContact, OlFolder, OlGroup, OlMessage, OlTask } from "./types";
import type { MenuEntry } from "./parts";
import { OIcon } from "./parts";
import { CATEGORY_COLORS, CATEGORY_SLOTS, DEFAULT_QUICK_STEPS, SHOW_AS, SYSTEM_FOLDERS, catName, folderTree, type Occurrence } from "./model";
import { fmtDate } from "./dates";

const ic = (n: string) => <OIcon name={n} size={14} />;

export function categorizeSub(ctx: Ctx, cmd = "item.categorize", current: string[] = []): MenuEntry[] {
  return [
    ...CATEGORY_SLOTS.map((s) => ({ label: catName(ctx.doc, s), color: CATEGORY_COLORS[s], checked: current.includes(s), onPick: () => ctx.cmd(cmd, s) })),
    { separator: true },
    { label: "All Categories...", onPick: () => ctx.openDialog("colorCategories") },
    { label: "Clear All Categories", onPick: () => ctx.cmd(cmd, "Clear All Categories") },
  ];
}

export function followUpSub(ctx: Ctx, cmd = "item.followUp", dialogs = true): MenuEntry[] {
  return [
    ...["Today", "Tomorrow", "This Week", "Next Week", "No Date"].map((v) => ({ label: v, icon: ic("flag"), onPick: () => ctx.cmd(cmd, v) })),
    ...(dialogs ? [{ label: "Custom...", icon: ic("flag"), onPick: () => ctx.openDialog("customFlag") }, { label: "Add Reminder...", icon: ic("bell"), onPick: () => ctx.openDialog("customFlag") }] : []),
    { label: "Mark Complete", icon: ic("check"), onPick: () => ctx.cmd(cmd, "Mark Complete") },
    { label: "Clear Flag", onPick: () => ctx.cmd(cmd, "Clear Flag") },
  ];
}

export function moveSub(ctx: Ctx): MenuEntry[] {
  const tree = folderTree(ctx.doc).filter((x) => !["outbox", "drafts", "sent"].includes(x.folder.id));
  return [
    ...tree.map((x) => ({ label: "  ".repeat(x.depth) + x.folder.name, icon: ic("folder"), onPick: () => ctx.cmd("mail.move", x.folder.name) })),
    { separator: true },
    { label: "Other Folder...", onPick: () => ctx.openDialog("moveTo") },
    { label: "Copy to Folder...", onPick: () => ctx.openDialog("copyTo") },
  ];
}

export function messageMenu(ctx: Ctx, m: OlMessage): MenuEntry[] {
  const doc = ctx.doc;
  const qs: MenuEntry[] = [
    ...DEFAULT_QUICK_STEPS.map((n) => ({ label: n, onPick: () => ctx.cmd("home.quickStep", n) })),
    ...(doc.quickSteps ?? []).map((q) => ({ label: q.name, icon: ic("send"), onPick: () => ctx.cmd("home.quickStep", q.name) })),
    { separator: true },
    { label: "New Quick Step...", onPick: () => ctx.openDialog("quickStep") },
  ];
  const items: MenuEntry[] = [];
  if (m.invite && !m.invite.response) {
    items.push(
      { label: "Accept", icon: ic("check"), sub: respondSub(ctx, "Accept") },
      { label: "Tentative", sub: respondSub(ctx, "Tentative") },
      { label: "Decline", icon: ic("close"), sub: respondSub(ctx, "Decline") },
      { label: "Propose New Time", icon: ic("clock"), sub: [{ label: "Tentative and Propose New Time...", onPick: () => ctx.openDialog("proposeTime") }, { label: "Decline and Propose New Time...", onPick: () => ctx.openDialog("proposeTimeDecline") }] },
      { separator: true },
    );
  }
  if (m.folder === "drafts") items.push({ label: "Open", bold: true, onPick: () => ctx.cmd("item.open", `msg:${m.id}`) }, { separator: true });
  items.push(
    { label: "Reply", icon: ic("reply"), shortcut: "Ctrl+R", onPick: () => ctx.cmd("mail.reply") },
    { label: "Reply All", icon: ic("replyAll"), shortcut: "Ctrl+Shift+R", onPick: () => ctx.cmd("mail.replyAll") },
    { label: "Forward", icon: ic("forward"), shortcut: "Ctrl+F", onPick: () => ctx.cmd("mail.forward") },
    { label: "Forward as Attachment", onPick: () => ctx.cmd("mail.forwardAttachment") },
    { separator: true },
    m.read ? { label: "Mark as Unread", icon: ic("mail"), shortcut: "Ctrl+U", onPick: () => ctx.cmd("mail.markUnread") } : { label: "Mark as Read", icon: ic("mailOpen"), shortcut: "Ctrl+Q", onPick: () => ctx.cmd("mail.markRead") },
    { label: "Categorize", icon: ic("tasks"), sub: categorizeSub(ctx, "item.categorize", m.categories) },
    { label: "Follow Up", icon: ic("flag"), sub: followUpSub(ctx) },
    { label: m.pinned ? "Unpin" : "Pin", icon: ic("pin"), onPick: () => ctx.cmd("mail.pin") },
    { separator: true },
    { label: "Quick Steps", sub: qs },
    {
      label: "Rules",
      icon: ic("folder"),
      sub: [
        { label: `Always Move Messages From: ${m.from.name}`, onPick: () => ctx.openDialog("alwaysMove") },
        { label: "Create Rule...", onPick: () => ctx.openDialog("createRule") },
        { label: "Manage Rules & Alerts...", onPick: () => ctx.openDialog("rulesAlerts") },
      ],
    },
    { label: "Move", icon: ic("folder"), sub: moveSub(ctx) },
    {
      label: "Junk",
      icon: ic("junk"),
      sub: [
        { label: "Block Sender", onPick: () => ctx.cmd("home.junk", "Block Sender") },
        { label: "Never Block Sender", onPick: () => ctx.cmd("home.junk", "Never Block Sender") },
        { label: "Never Block Sender's Domain (@" + (m.from.email.split("@")[1] ?? "") + ")", onPick: () => ctx.cmd("home.junk", "Never Block Sender's Domain") },
        { label: "Never Block this Group or Mailing List", onPick: () => ctx.cmd("home.junk", "Never Block this Group or Mailing List") },
        { label: "Not Junk", onPick: () => ctx.cmd("home.junk", "Not Junk") },
        { separator: true },
        { label: "Junk E-mail Options...", onPick: () => ctx.openDialog("junkOptions") },
      ],
    },
    {
      label: "Report",
      icon: ic("shield"),
      sub: [
        { label: "Report Phishing", onPick: () => ctx.cmd("home.report", "Report Phishing") },
        { label: "Report Junk", onPick: () => ctx.cmd("home.report", "Report Junk") },
        { label: "Report Not Junk", onPick: () => ctx.cmd("home.report", "Report Not Junk") },
      ],
    },
  );
  if (doc.focused && m.folder === "inbox") items.push({ label: m.other ? "Move to Focused" : "Move to Other", onPick: () => ctx.cmd(m.other ? "mail.moveToFocused" : "mail.moveToOther") });
  items.push(
    { separator: true },
    { label: "Ignore", icon: ic("close"), onPick: () => ctx.cmd("mail.ignore") },
    { label: "Delete", icon: ic("trash"), shortcut: "Delete", onPick: () => ctx.cmd("item.delete") },
    { label: "Archive...", icon: ic("archive"), shortcut: "Backspace", onPick: () => ctx.cmd("mail.archive") },
  );
  return items;
}

export function respondSub(ctx: Ctx, base: string, cmd = "invite.respond"): MenuEntry[] {
  return [
    { label: "Edit the Response before Sending", onPick: () => ctx.cmd(cmd, `${base} (Edit)`) },
    { label: "Send the Response Now", onPick: () => ctx.cmd(cmd, base) },
    { label: "Do Not Send a Response", onPick: () => ctx.cmd(cmd, `${base} (No Response)`) },
  ];
}

export function folderMenu(ctx: Ctx, f: OlFolder): MenuEntry[] {
  const system = SYSTEM_FOLDERS.some((s) => s.id === f.id);
  const fav = (ctx.doc.favorites ?? ["inbox", "sent", "deleted"]).includes(f.id);
  const items: MenuEntry[] = [
    { label: "Open in New Window", icon: ic("popout"), onPick: () => ctx.cmd("mail.folder", f.name) },
    { separator: true },
  ];
  if (!system)
    items.push(
      { label: "Rename Folder", icon: ic("edit"), onPick: () => ctx.cmd("folder.rename") },
      { label: "Delete Folder", icon: ic("trash"), onPick: () => ctx.cmd("folder.delete") },
    );
  items.push(
    { label: "Mark All as Read", icon: ic("mailOpen"), onPick: () => ctx.cmd("folder.markAllRead") },
    { label: "Clean Up Folder", onPick: () => ctx.cmd("mail.cleanUp", "Clean Up Folder") },
    { label: "Delete All", onPick: () => ctx.cmd("folder.deleteAll") },
  );
  if (f.id === "deleted") items.push({ label: "Empty Folder", icon: ic("trash"), onPick: () => ctx.cmd("mail.emptyDeleted") });
  items.push(
    { separator: true },
    { label: "New Folder...", icon: ic("folder"), onPick: () => ctx.cmd("folder.newInline", f.id) },
    { label: fav ? "Remove from Favorites" : "Show in Favorites", onPick: () => ctx.cmd("folder.favorite", f.id) },
    { separator: true },
    { label: "Properties...", onPick: () => ctx.cmd("folder.properties") },
  );
  return items;
}

export function eventMenu(ctx: Ctx, o: Occurrence): MenuEntry[] {
  const e = o.evt;
  const mine = !e.organizer || e.organizer.email === ctx.doc.account.email;
  const items: MenuEntry[] = [{ label: "Open", bold: true, onPick: () => ctx.cmd("item.open", o.key) }, { label: "Forward", icon: ic("forward"), onPick: () => ctx.cmd("event.forward") }, { separator: true }];
  if (e.meeting && !mine) items.push({ label: "Accept", onPick: () => ctx.cmd("evtsel.respond", "Accept") }, { label: "Tentative", onPick: () => ctx.cmd("evtsel.respond", "Tentative") }, { label: "Decline", onPick: () => ctx.cmd("evtsel.respond", "Decline") }, { separator: true });
  items.push(
    { label: "Show As", sub: SHOW_AS.map((s) => ({ label: s, checked: (e.showAs ?? "Busy") === s, onPick: () => ctx.cmd("evtsel.showAs", s) })) },
    { label: "Categorize", icon: ic("tasks"), sub: categorizeSub(ctx, "item.categorize", e.categories) },
    { label: "Private", icon: ic("lock"), checked: Boolean(e.private), onPick: () => ctx.cmd("evtsel.private") },
    { separator: true },
  );
  if (e.meeting && mine) items.push({ label: "Cancel Meeting", icon: ic("close"), onPick: () => ctx.cmd("event.cancelMeeting") });
  if (e.recurrence)
    items.push({ label: "Delete", icon: ic("trash"), sub: [{ label: "Delete Occurrence", onPick: () => ctx.cmd("item.delete", "Delete Occurrence") }, { label: "Delete Series", onPick: () => ctx.cmd("item.delete", "Delete Series") }] });
  else items.push({ label: "Delete", icon: ic("trash"), shortcut: "Delete", onPick: () => ctx.cmd("item.delete") });
  return items;
}

export function slotMenu(ctx: Ctx, iso: string): MenuEntry[] {
  return [
    { label: "New Appointment", icon: ic("calendar"), onPick: () => ctx.cmd("cal.newAppointment", iso) },
    { label: "New Meeting Request", icon: ic("people"), onPick: () => ctx.cmd("cal.newMeeting", iso) },
    { label: "New Teams Meeting", icon: ic("teams"), onPick: () => ctx.cmd("cal.newTeamsMeeting", iso) },
    { separator: true },
    { label: "Go to Today", onPick: () => ctx.cmd("cal.today") },
    { label: "Day", onPick: () => ctx.cmd("cal.view", "Day") },
    { label: "Work Week", onPick: () => ctx.cmd("cal.view", "Work Week") },
    { label: "Week", onPick: () => ctx.cmd("cal.view", "Week") },
    { label: "Month", onPick: () => ctx.cmd("cal.view", "Month") },
  ];
}

export function contactMenu(ctx: Ctx, c: OlContact | OlGroup, group = false): MenuEntry[] {
  return [
    { label: "Open", bold: true, onPick: () => ctx.cmd("item.open", `${group ? "group" : "contact"}:${c.id}`) },
    { label: "Create", sub: [{ label: "Email", icon: ic("mail"), onPick: () => ctx.cmd("contact.emailTo") }, { label: "Meeting", icon: ic("calendar"), onPick: () => ctx.cmd("contact.meetingWith") }] },
    ...(group ? [] : [{ label: "Log Activity", icon: ic("notes"), onPick: () => ctx.cmd("contact.logActivity", c.id) } as MenuEntry]),
    { label: "Forward Contact", icon: ic("forward"), sub: ["As a Business Card", "In Internet Format (vCard)", "As an Outlook Contact"].map((l) => ({ label: l, onPick: () => ctx.cmd("contact.forward") })) },
    { separator: true },
    { label: "Categorize", icon: ic("tasks"), sub: categorizeSub(ctx, "item.categorize", c.categories) },
    ...(group ? [] : [{ label: "Follow Up", icon: ic("flag"), sub: followUpSub(ctx) } as MenuEntry]),
    { separator: true },
    { label: "Delete", icon: ic("trash"), shortcut: "Delete", onPick: () => ctx.cmd("item.delete") },
  ];
}

export function taskMenu(ctx: Ctx, t: OlTask): MenuEntry[] {
  return [
    { label: "Open", bold: true, onPick: () => ctx.cmd("item.open", `task:${t.id}`) },
    { label: t.status === "Completed" ? "Mark Incomplete" : "Mark Complete", icon: ic("check"), onPick: () => ctx.cmd("task.complete") },
    { label: "Follow Up", icon: ic("flag"), sub: followUpSub(ctx, "item.followUp", true) },
    { label: "Categorize", icon: ic("tasks"), sub: categorizeSub(ctx, "item.categorize", t.categories) },
    { label: "High Importance", checked: t.priority === "High", onPick: () => ctx.cmd("task.priority", "High") },
    { separator: true },
    { label: "Delete", icon: ic("trash"), shortcut: "Delete", onPick: () => ctx.cmd("item.delete") },
  ];
}

export function flaggedMenu(ctx: Ctx, m: OlMessage): MenuEntry[] {
  return [
    { label: "Open", bold: true, onPick: () => ctx.cmd("item.open", `msg:${m.id}`) },
    { label: "Mark Complete", icon: ic("check"), onPick: () => ctx.cmd("task.complete") },
    { label: "Follow Up", icon: ic("flag"), sub: followUpSub(ctx) },
    { label: "Categorize", icon: ic("tasks"), sub: categorizeSub(ctx, "item.categorize", m.categories) },
    { separator: true },
    { label: "Remove from List", onPick: () => ctx.cmd("task.removeFromList") },
    { label: `Due ${m.flag?.due ? fmtDate(m.flag.due) : "(none)"}`, disabled: true },
  ];
}
