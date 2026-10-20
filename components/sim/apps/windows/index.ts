import type { AppModule } from "../../types";
import type { WinDoc } from "./types";
import { windowsCore } from "./core";
import { WindowsCanvas, WindowsStatusBar } from "./Shell";

/** Windows 11 practice simulator (bare chrome: the canvas draws the whole desktop). */
export const windowsApp: AppModule<WinDoc> = { ...windowsCore, Canvas: WindowsCanvas, StatusBar: WindowsStatusBar };
