import type { AppModule } from "../../types";
import type { AccessDoc } from "./types";
import { accessCore } from "./core";
import { AccessCanvas, AccessStatusBar } from "./AccessCanvas";
import { AccessBackstage } from "./Backstage";

/** Microsoft Access (Microsoft 365) practice engine. */
export const accessApp: AppModule<AccessDoc> = {
  ...accessCore,
  Canvas: AccessCanvas,
  StatusBar: AccessStatusBar,
  BackstageView: AccessBackstage,
};
