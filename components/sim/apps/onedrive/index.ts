import type { AppModule } from "../../types";
import { onedriveCore } from "./core";
import { OneDriveCanvas, OneDriveStatusBar } from "./OneDriveCanvas";
import type { OneDriveDoc } from "./types";

export const onedriveApp: AppModule<OneDriveDoc> = { ...onedriveCore, Canvas: OneDriveCanvas, StatusBar: OneDriveStatusBar };
