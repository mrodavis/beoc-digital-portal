import type { AppModule } from "../../types";
import type { AssistantDoc } from "./types";
import { assistantCore } from "./core";
import { AssistantCanvas, AssistantStatusBar } from "./AssistantCanvas";

export const assistantApp = { ...assistantCore, Canvas: AssistantCanvas, StatusBar: AssistantStatusBar } as AppModule<AssistantDoc> as unknown as AppModule<Record<string, unknown>>;
