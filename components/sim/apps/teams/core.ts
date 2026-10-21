import type { AppCore } from "../../types";
import type { TeamsDoc } from "./types";
import { applyTeams, describeTeams, teamsInitialUi, teamsSelectionExists } from "./model";

/**
 * Microsoft Teams (new Teams). Bare chrome: the canvas draws the title bar,
 * app rail, lists, conversations, calendar, pre-join screen and meeting window.
 *
 * Judged commands (see types.ts for selection keys and type targets):
 *   msg.react (Like | Heart | Laugh | Surprised | Sad | Angry | Check mark | Eyes | Clap | Thank you),
 *   msg.delete, msg.pin, msg.unpin, msg.markUnread, msg.save, msg.copyLink,
 *   chat.pin, chat.unpin, chat.markUnread, chat.markRead, chat.mute, chat.unmute, chat.hide,
 *   chat.call (video | audio), channel.notifications (All new posts | Mentions and replies | Off), channel.pin,
 *   compose.attach (file name), status.set (Available | Busy | Do not disturb | Be right back | Appear away | Appear offline | Reset status),
 *   status.clearMessage, files.upload (file name), files.copyLink, files.pin, files.delete, files.download,
 *   compose.delivery (Important | Standard), compose.loop (Task list | Table | Paragraph), team.join (team id),
 *   tab.add (app name), settings.layout (Combined | Separate), settings.theme (Follow operating system theme | Light | Dark),
 *   settings.notify ("<Type>=<Activity feed and banner | Activity feed only | Off>"), planner.complete (task id),
 *   apps.pin (planner | approvals), meeting.role ("<person id>=Presenter | Attendee"),
 *   files.move (folder id), event.rsvp (Accept | Tentative | Decline),
 *   av.camera (on | off), av.mic (on | off), av.background (None | Blur | background name),
 *   av.audio (Computer audio | Room audio | Phone audio | Don't use audio), av.speaker, av.microphone,
 *   av.cameraDevice, av.noise (Auto | High | Low | Off), settings.testCall, meeting.joinNow,
 *   meeting.raiseHand (raise | lower), meeting.react (Like | Heart | Applause | Laugh | Surprised),
 *   meeting.share (window or screen label), meeting.stopShare, meeting.record (start | stop),
 *   meeting.transcribe (start | stop), meeting.captions (on | off), meeting.admit (person id | all),
 *   meeting.deny, meeting.muteAll, meeting.mutePerson, meeting.leave, meeting.end, calls.call (person id).
 * Free commands (never a miss): opening the pre-join screen, closing it, meeting panels and views,
 * Meet now, opening files and activity items, Immersive Reader, Open in (desktop app/browser).
 * Rail, list and tab navigation is selection only.
 */
export const teamsCore: AppCore<TeamsDoc> = {
  name: "Microsoft Teams",
  accent: "#5b5fc7",
  chrome: "bare",
  autosave: false,
  ribbon: [{ id: "home", label: "Home", groups: [] }],
  dialogs: {},
  backstage: { templates: [], recent: [], formats: [], ext: "" },
  shortcuts: {},
  canvasCommands: [
    "msg.react", "msg.delete", "msg.undoDelete", "msg.pin", "msg.unpin", "msg.markUnread", "msg.save", "msg.copyLink",
    "chat.pin", "chat.unpin", "chat.markUnread", "chat.markRead", "chat.mute", "chat.unmute", "chat.hide", "chat.call",
    "channel.notifications", "channel.pin", "compose.attach", "compose.detach",
    "status.set", "status.clearMessage",
    "files.upload", "files.copyLink", "files.pin", "files.delete", "files.download", "files.move",
    "event.rsvp",
    "av.camera", "av.mic", "av.background", "av.audio", "av.speaker", "av.microphone", "av.cameraDevice", "av.noise",
    "settings.testCall", "meeting.joinNow",
    "meeting.raiseHand", "meeting.react", "meeting.share", "meeting.stopShare", "meeting.record", "meeting.transcribe",
    "meeting.captions", "meeting.admit", "meeting.deny", "meeting.muteAll", "meeting.mutePerson", "meeting.leave", "meeting.end",
    "calls.call", "meeting.prejoin", "meeting.cancel", "meeting.panel", "meeting.view", "calendar.meetNow", "files.open", "files.close", "activity.open",
    "compose.delivery", "compose.loop", "compose.unloop", "msg.immersiveReader", "reader.close", "team.join", "tab.add",
    "settings.layout", "settings.theme", "settings.notify", "planner.complete", "apps.pin", "apps.open", "files.openIn", "meeting.role",
  ],
  freeCommands: [
    "meeting.prejoin", "meeting.cancel", "meeting.panel", "meeting.view", "calendar.meetNow", "files.open", "files.close", "activity.open",
    "compose.detach", "msg.undoDelete", "compose.unloop", "msg.immersiveReader", "reader.close", "apps.open", "files.openIn",
  ],
  initialUi: teamsInitialUi,
  apply: applyTeams,
  ribbonState: () => ({}),
  selectionExists: teamsSelectionExists,
  describeSelection: describeTeams,
};
