import type { AppModule } from "../../../types";
import type { OutlookDoc } from "../types";
import { newOutlookCore } from "./core";
import { NewOutlookCanvas, NewOutlookStatusBar } from "./NewOutlookCanvas";

/** New Outlook for Windows (app "outlook-new"). */
export const newOutlookApp: AppModule<OutlookDoc> = { ...newOutlookCore, Canvas: NewOutlookCanvas, StatusBar: NewOutlookStatusBar };
