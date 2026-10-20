import type { AppModule } from "../../types";
import type { TypingDoc } from "./types";
import { typingCore } from "./core";
import { TypingCanvas, TypingStatusBar } from "./TypingCanvas";

export const typingApp = { ...typingCore, Canvas: TypingCanvas, StatusBar: TypingStatusBar } as AppModule<TypingDoc> as unknown as AppModule<Record<string, unknown>>;
