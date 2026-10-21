import type { SimApp, SimDoc } from "@/types/sim";
import type { AppModule } from "../types";

type Loader = () => Promise<AppModule<SimDoc>>;
const as = (m: unknown) => m as AppModule<SimDoc>;

/**
 * Each engine is its own chunk, loaded only when a lesson shows one of its
 * sims (a Word lesson never downloads the Excel or Windows engine).
 */
export const APP_LOADERS: Record<SimApp, Loader> = {
  word: () => import("./word").then((m) => as(m.wordApp)),
  excel: () => import("./excel").then((m) => as(m.excelApp)),
  powerpoint: () => import("./powerpoint").then((m) => as(m.pptApp)),
  windows: () => import("./windows").then((m) => as(m.windowsApp)),
  outlook: () => import("./outlook").then((m) => as(m.outlookApp)),
  teams: () => import("./teams").then((m) => as(m.teamsApp)),
  typing: () => import("./typing").then((m) => as(m.typingApp)),
  assistant: () => import("./assistant").then((m) => as(m.assistantApp)),
  access: () => import("./access").then((m) => as(m.accessApp)),
  google: () => import("./google").then((m) => as(m.googleApp)),
  ehr: () => import("./ehr").then((m) => as(m.ehrApp)),
  "outlook-new": () => import("./outlook/new").then((m) => as(m.newOutlookApp)),
  onedrive: () => import("./onedrive").then((m) => as(m.onedriveApp)),
};
