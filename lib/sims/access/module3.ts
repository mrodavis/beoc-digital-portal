import type { SimDefinition } from "@/types/sim";
import { accessDoc } from "@/components/sim/apps/access/types";
import { addQField, cmd, prop, qcell, runQuery, saveAs, spaced, viewSwitch } from "@/components/sim/apps/access/simkit";
import { supplies } from "./lakeside";

/*
 * Microsoft Office (INFO3033), Access Module 3: Queries.
 * Lakeside Medical Associates; every person and number is fictional.
 */

const TOTAL_COST = spaced("TotalCost: [Quantity]*[UnitCost]", "TotalCost: [UnitCost]*[Quantity]");
const newQuery = () => [cmd("create.queryDesign"), cmd("query.addTable", "Supplies")];

export const accessModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::building-queries": [
    {
      id: "access-ms-m3-building-queries-1",
      app: "access",
      title: "Answer the reorder question",
      scenario:
        "The practice manager keeps asking which supplies are running low. Scrolling the table gives a different answer every time, so you build saved queries that answer it, and a second one that asks which category to show.",
      fileName: "Lakeside Supplies.accdb",
      minutes: 9,
      initial: accessDoc({ tables: [supplies()] }),
      tasks: [
        {
          instruction: "Start a new query in Design View that uses only the Supplies table.",
          hint: "Create › Queries › Query Design, then double-click Supplies in the Add Tables pane.",
          anyOrder: true,
          steps: newQuery(),
        },
        {
          instruction: "Add ItemName, Category, Quantity and ReorderLevel to the grid.",
          hint: "Double-click each field in the Supplies field list.",
          anyOrder: true,
          steps: ["ItemName", "Category", "Quantity", "ReorderLevel"].map((f) => addQField("Query1", "Supplies", f)),
        },
        {
          instruction: "Show only items whose Quantity is less than their own ReorderLevel, and sort the results by Category from A to Z.",
          hint: "In the Criteria row under Quantity, type <[ReorderLevel]. In the Sort row under Category, choose Ascending.",
          anyOrder: true,
          steps: [qcell("Query1", "Quantity", "Criteria", "<[ReorderLevel]"), qcell("Query1", "Category", "Sort", "Ascending")],
        },
        {
          instruction: "Run the query and save it as Below Reorder Level.",
          hint: "Query Design › Results › Run, then press Ctrl+S, type Below Reorder Level, and click OK.",
          anyOrder: true,
          steps: [runQuery(), saveAs("Below Reorder Level")],
        },
        {
          instruction: "Switch to SQL View to read the statement Access wrote for this query.",
          hint: "Home › Views › View › SQL View.",
          steps: [viewSwitch("SQL View")],
        },
        {
          instruction: "Start another Supplies query with ItemName, Category and Quantity that prompts for a category with [Enter category:].",
          hint: "Create › Queries › Query Design, double-click Supplies, add the three fields, then type [Enter category:] in the Criteria row under Category.",
          anyOrder: true,
          steps: [...newQuery(), ...["ItemName", "Category", "Quantity"].map((f) => addQField("Query1", "Supplies", f)), qcell("Query1", "Category", "Criteria", "[Enter category:]")],
        },
        {
          instruction: "Run the query for the Office category, then save it as Supplies by Category.",
          hint: "Click Run, type Office in the Enter Parameter Value box, and click OK. Then press Ctrl+S, type Supplies by Category, and click OK.",
          anyOrder: true,
          steps: [runQuery(), cmd("query.parameter", "Office"), saveAs("Supplies by Category")],
        },
      ],
    },
  ],

  "module-3::calculated-fields-and-totals": [
    {
      id: "access-ms-m3-calculated-fields-1",
      app: "access",
      title: "Calculate totals instead of storing them",
      scenario:
        "A stored total cost goes stale the moment a price changes. You calculate each item's total in a query, then build a totals query that summarizes spending by category for this year.",
      fileName: "Lakeside Supplies.accdb",
      minutes: 10,
      initial: accessDoc({ tables: [supplies()] }),
      tasks: [
        {
          instruction: "Start a new query in Design View on Supplies with the ItemName, Category, Quantity and UnitCost fields.",
          hint: "Create › Queries › Query Design, double-click Supplies, then double-click each of the four fields.",
          anyOrder: true,
          steps: [...newQuery(), ...["ItemName", "Category", "Quantity", "UnitCost"].map((f) => addQField("Query1", "Supplies", f))],
        },
        {
          instruction: "Add a calculated field named TotalCost that multiplies Quantity by UnitCost.",
          hint: "In the first empty Field cell, type TotalCost: [Quantity]*[UnitCost] and press Enter.",
          steps: [qcell("Query1", "new", "Field", TOTAL_COST)],
        },
        {
          instruction: "Format the TotalCost column as Currency.",
          hint: "Click in the TotalCost column, open the Property Sheet (Query Design › Show/Hide › Property Sheet), and choose Currency in Format.",
          steps: [prop("Format", "Currency", "qcol:Query1.5", "Click in the TotalCost column first.")],
        },
        {
          instruction: "Run the query and save it as Supply Totals.",
          hint: "Query Design › Results › Run, then press Ctrl+S, type Supply Totals, and click OK.",
          anyOrder: true,
          steps: [runQuery(), saveAs("Supply Totals")],
        },
        {
          instruction: "Start a new totals query on Supplies with the Category and ItemName fields.",
          hint: "Create › Queries › Query Design, double-click Supplies, add Category and ItemName, then Query Design › Show/Hide › Totals.",
          anyOrder: true,
          steps: [...newQuery(), addQField("Query1", "Supplies", "Category"), addQField("Query1", "Supplies", "ItemName"), cmd("query.totals")],
        },
        {
          instruction: "Add the TotalCost calculated field again. Then count ItemName and sum TotalCost, keeping Group By on Category.",
          hint: "Type TotalCost: [Quantity]*[UnitCost] in the first empty Field cell. In the Total row, choose Count under ItemName and Sum under TotalCost.",
          anyOrder: true,
          steps: [qcell("Query1", "new", "Field", TOTAL_COST), qcell("Query1", "ItemName", "Total", "Count"), qcell("Query1", "TotalCost", "Total", "Sum")],
        },
        {
          instruction: "Count only items ordered on or after 1/1/2026: add OrderDate with Where in its Total row and >=#1/1/2026# as its criteria. Run the query and save it as Spending by Category.",
          hint: "Double-click OrderDate, choose Where in its Total row, and type >=#1/1/2026# in its Criteria row. Click Run, then press Ctrl+S and name it Spending by Category.",
          anyOrder: true,
          steps: [
            addQField("Query1", "Supplies", "OrderDate"),
            qcell("Query1", "OrderDate", "Total", "Where"),
            qcell("Query1", "OrderDate", "Criteria", [">=#1/1/2026#", "Between #1/1/2026# And #12/31/2026#"]),
            runQuery(),
            saveAs("Spending by Category"),
          ],
        },
      ],
    },
  ],
};
