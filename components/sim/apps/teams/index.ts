import type { AppModule } from "../../types";
import type { TeamsDoc } from "./types";
import { teamsCore } from "./core";
import { TeamsCanvas, TeamsStatusBar } from "./TeamsCanvas";

export const teamsApp = { ...teamsCore, Canvas: TeamsCanvas, StatusBar: TeamsStatusBar } as AppModule<TeamsDoc> as unknown as AppModule<Record<string, unknown>>;
