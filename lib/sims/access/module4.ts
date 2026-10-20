import type { SimDefinition } from "@/types/sim";
import { accessDoc, type AccQuery } from "@/components/sim/apps/access/types";
import { DATE_SAMPLES } from "@/components/sim/apps/access/dialogs";
import { cell, cmd, ctl, dlg, fld, prop, saveAs, saveObj, table, tableOrSheet, typed, viewSwitch } from "@/components/sim/apps/access/simkit";
import { supplies } from "./lakeside";

/*
 * Microsoft Office (INFO3033), Access Module 4: Forms and reports.
 * Lakeside Medical Associates; every person and number is fictional.
 */

const formSupplies = supplies();
// One text column, so the combo box's bound column stores the name that Supplies.Category already holds.
const categories = () => table("Categories", [fld.text("CategoryName", 20, { required: true })], [["Medical"], ["Office"], ["Cleaning"], ["Lab"]], { pk: ["CategoryName"] });

const supplyCosts = (): AccQuery => ({
  name: "Supply Costs",
  type: "Select",
  tables: ["Supplies"],
  cols: [
    { field: "ItemName", table: "Supplies", show: true },
    { field: "Category", table: "Supplies", show: true },
    { field: "Vendor", table: "Supplies", show: true },
    { field: "Quantity", table: "Supplies", show: true },
    { field: "UnitCost", table: "Supplies", show: true },
    { field: "TotalCost: [Quantity]*[UnitCost]", table: "Supplies", show: true, format: "Currency" },
  ],
  saved: true,
});

const REPORT = "Quarterly Supply Report";

export const accessModule4Sims: Record<string, SimDefinition[]> = {
  "module-4::creating-forms": [
    {
      id: "access-ms-m4-creating-forms-1",
      app: "access",
      title: "Build a supply entry form",
      scenario:
        "Three staff share the supply database and have been typing straight into the table; two rows have already been overwritten. You build a form that shows one item at a time, in delivery-slip order, with a drop-down list for categories.",
      fileName: "Lakeside Supplies.accdb",
      minutes: 10,
      initial: accessDoc({ tables: [formSupplies, categories()] }),
      tasks: [
        {
          instruction: "Create a form for the Supplies table in one click.",
          hint: "Click Supplies in the Navigation Pane, then Create › Forms › Form.",
          steps: [cmd("create.form", undefined, { requires: { selection: tableOrSheet(formSupplies) }, selectHint: "Click the Supplies table in the Navigation Pane first." })],
        },
        {
          instruction: "Delivery slips list the quantity before the category. Move the Quantity box above Category.",
          hint: "In Layout View, click the Quantity box, then Arrange › Move › Move Up (or right-click › Move Up).",
          steps: [cmd("arrange.moveUp", undefined, { requires: { selection: ctl("Supplies", "Quantity") }, selectHint: "Click the Quantity box first." })],
        },
        {
          instruction: "Change the Category text box to a combo box that gets its values from the Categories table, and limit entries to the list.",
          hint: "Right-click the Category box and choose Change To › Combo Box. Open the Property Sheet (F4); on the Data tab, type Categories in Row Source and set Limit To List to Yes.",
          anyOrder: true,
          steps: [
            cmd("form.changeTo", "Combo Box", { requires: { selection: "ctl:Supplies.Category" }, selectHint: "Click the Category box itself, not its label, first." }),
            typed("prop:Row Source", "Categories", { match: "includes", requires: { selection: "ctl:Supplies.Category" }, selectHint: "Click the Category combo box first." }),
            prop("Limit To List", "Yes", "ctl:Supplies.Category", "Click the Category combo box first."),
          ],
        },
        {
          instruction: "Lock the ItemID box so staff cannot change it.",
          hint: "Click the ItemID box. In the Property Sheet, on the Data tab, set Locked to Yes.",
          steps: [prop("Locked", "Yes", "ctl:Supplies.ItemID", "Click the ItemID box first.")],
        },
        {
          instruction: "Tab order does not follow a rearranged layout on its own. Switch to Design View and set the tab order to match the new layout.",
          hint: "Home › Views › View › Design View. Then Form Design › Tools › Tab Order, click Auto Order, and click OK.",
          steps: [viewSwitch("Design View"), dlg("backstage:tabOrder", { order: "ItemID,ItemName,Quantity,Category,UnitCost,ReorderLevel,Vendor,OrderDate" })],
        },
        {
          instruction: "Save the form as Supply Entry.",
          hint: "Press Ctrl+S (or File › Save), type Supply Entry, and click OK.",
          steps: [saveAs("Supply Entry")],
        },
        {
          instruction: "Switch to Form View and add a new item: ItemName Label Printer Tape, Quantity 12, Category Office.",
          hint: "Home › Views › View › Form View. Click New (blank) record on the navigation bar, type the item name and quantity, and pick Office in the Category list.",
          anyOrder: true,
          steps: [
            viewSwitch("Form View"),
            cell("Supplies", "r15", "ItemName", "Label Printer Tape"),
            cell("Supplies", "r15", "Quantity", "12"),
            cell("Supplies", "r15", "Category", "Office"),
          ],
        },
      ],
    },
  ],

  "module-4::creating-reports": [
    {
      id: "access-ms-m4-creating-reports-1",
      app: "access",
      title: "Produce the quarterly supply report",
      scenario:
        "The manager wants a supply report she can take into a meeting: grouped by category, sorted by item, with subtotals and a grand total, and each category on its own page so it can be handed to that department.",
      fileName: "Lakeside Supplies.accdb",
      minutes: 9,
      initial: accessDoc({ tables: [supplies()], queries: [supplyCosts()] }),
      tasks: [
        {
          instruction: `Use the Report Wizard on the Supply Costs query with Category, ItemName, Quantity and TotalCost, in that order. Group by Category, sort by ItemName, sum TotalCost, and title the report ${REPORT}.`,
          hint: "Create › Reports › Report Wizard. Pick Query: Supply Costs and move the four fields over. Add Category as a grouping level, choose ItemName in the first sort box, click Summary Options and check Sum for TotalCost, then type the title and click Finish.",
          steps: [
            dlg("backstage:reportWizard", {
              source: "Query: Supply Costs",
              fields: "Category,ItemName,Quantity,TotalCost",
              groups: "Category",
              sorts: "ItemName:asc",
              summary: "TotalCost:Sum",
              title: REPORT,
            }),
          ],
        },
        {
          instruction: "Switch to Design View and make each category start on a new page.",
          hint: "Close Print Preview › Close Print Preview opens Design View. Click the Category Header bar, open the Property Sheet (F4), and set Force New Page to Before Section.",
          steps: [
            { ...viewSwitch("Design View"), alt: [{ kind: "command", id: "preview.close" }] },
            prop("Force New Page", "Before Section", `sec:${REPORT}.Category Header`, "Click the Category Header section bar first."),
          ],
        },
        {
          instruction: "Add a label to the Report Header that reads Lakeside Medical Associates",
          hint: "Report Design › Controls › Label, click an empty spot in the Report Header, type Lakeside Medical Associates, and press Enter.",
          steps: [cmd("form.tool", "Label"), typed(`section:${REPORT}.Report Header`, "Lakeside Medical Associates")],
        },
        {
          instruction: "Show today's date in the short format (like 10/20/2026) without the time.",
          hint: "Report Design › Header / Footer › Date and Time. Check Include Date and choose the 10/20/2026 format, clear Include Time, and click OK.",
          steps: [dlg("dateTime", { includeDate: true, dateFormat: DATE_SAMPLES[2], includeTime: false })],
        },
        {
          instruction: "Check the layout in Print Preview and go to page 2.",
          hint: "Home › Views › View › Print Preview, then click Next Page on the page bar at the bottom.",
          steps: [viewSwitch("Print Preview"), cmd("preview.page", "2")],
        },
        {
          instruction: "Save the report.",
          hint: "Press Ctrl+S, or click Save on the Quick Access Toolbar.",
          steps: [saveObj()],
        },
      ],
    },
  ],
};
