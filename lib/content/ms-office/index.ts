import { powerpointModules } from "./powerpoint/modules";
import { excelModules } from "./excel/modules";
import { wordModules } from "./word/modules";
import { accessModules } from "./access/modules";
import { outlookModules } from "./outlook/modules";
import { teamsModules } from "./teams/modules";
import { onedriveModules } from "./onedrive/modules";

export const officeApps = {
  powerpoint: powerpointModules,
  excel: excelModules,
  word: wordModules,
  access: accessModules,
  outlook: outlookModules,
  teams: teamsModules,
  onedrive: onedriveModules,
};

export const officeAppTitles: Record<string, string> = {
  word: "Microsoft Word",
  excel: "Microsoft Excel",
  powerpoint: "Microsoft PowerPoint",
  access: "Microsoft Access",
  outlook: "Microsoft Outlook",
  teams: "Microsoft Teams",
  onedrive: "Microsoft OneDrive",
};
