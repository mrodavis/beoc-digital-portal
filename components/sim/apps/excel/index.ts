import type { ExcelBook } from "@/types/sim";
import type { AppModule } from "../../types";
import { excelCore } from "./core";
import { ExcelCanvas, ExcelStatusBar } from "./ExcelCanvas";

export const excelApp: AppModule<ExcelBook> = { ...excelCore, Canvas: ExcelCanvas, StatusBar: ExcelStatusBar };
