import type { WordDoc } from "@/types/sim";
import type { AppModule } from "../../types";
import { wordCore } from "./core";
import { WordCanvas, WordStatusBar } from "./WordCanvas";

export const wordApp: AppModule<WordDoc> = { ...wordCore, Canvas: WordCanvas, StatusBar: WordStatusBar };
