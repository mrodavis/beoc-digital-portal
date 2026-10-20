import type { AppModule } from "../../types";
import { googleCore } from "./core";
import { GoogleCanvas, GoogleStatusBar } from "./GoogleCanvas";
import type { GoogleDoc } from "./types";

export const googleApp: AppModule<GoogleDoc> = { ...googleCore, Canvas: GoogleCanvas, StatusBar: GoogleStatusBar };
