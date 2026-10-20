import type { PptDeck } from "@/types/sim";
import type { AppModule } from "../../types";
import { pptCore } from "./core";
import { PptCanvas, PptStatusBar } from "./PptCanvas";

export const pptApp: AppModule<PptDeck> = { ...pptCore, Canvas: PptCanvas, StatusBar: PptStatusBar };
