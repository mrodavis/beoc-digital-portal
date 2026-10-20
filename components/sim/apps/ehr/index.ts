import type { AppModule } from "../../types";
import type { EhrDoc } from "./types";
import { ehrCore } from "./core";
import { EhrCanvas, EhrStatusBar } from "./EhrCanvas";

/** Northstar EHR practice engine (bare chrome; the canvas draws the workstation). */
export const ehrApp: AppModule<EhrDoc> = { ...ehrCore, Canvas: EhrCanvas, StatusBar: EhrStatusBar };
