import type { AppModule } from "../../types";
import { gmailCore } from "./core";
import { GmailCanvas, GmailStatusBar } from "./GmailCanvas";
import type { GmailDoc } from "./types";

export const gmailApp: AppModule<GmailDoc> = { ...gmailCore, Canvas: GmailCanvas, StatusBar: GmailStatusBar };
