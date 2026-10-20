import type { AppModule } from "../../types";
import type { OutlookDoc } from "./types";
import { outlookCore } from "./core";
import { OutlookCanvas, OutlookStatusBar } from "./OutlookCanvas";
import { OutlookBackstage } from "./OutlookBackstage";

export const outlookApp: AppModule<OutlookDoc> = { ...outlookCore, Canvas: OutlookCanvas, StatusBar: OutlookStatusBar, BackstageView: OutlookBackstage };
