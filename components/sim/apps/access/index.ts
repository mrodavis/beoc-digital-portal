import type { AppModule } from "../../types";
import type { AccessDoc } from "./types";
import { accessCore } from "./core";
import { stubApp } from "../_stub/make";

const stub = stubApp("Access", "#a4373a");

/** Microsoft Access (Microsoft 365) practice engine. */
export const accessApp: AppModule<AccessDoc> = { ...accessCore, Canvas: stub.Canvas as unknown as AppModule<AccessDoc>["Canvas"], StatusBar: () => null };
