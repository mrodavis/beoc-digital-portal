import { Lesson } from "@/types/lesson";

export const module4Lessons: Lesson[] = [
  {
    slug: "charts-and-visualization",
    title: "Charts and Data Visualization",
    description:
      "Learn to create professional charts in Excel 2019 — choosing the right chart type for your data, formatting chart elements, adding sparklines, and presenting visual data that drives decisions at Lakeside Medical Associates.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/_Wu7jYTr1Pk",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-01.jpg",
        alt: "Choosing the Right Chart Type — column, bar, line, pie, and scatter chart decision guide",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-02.jpg",
        alt: "Inserting a Chart — selecting data and choosing chart type from the Insert tab",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-03.jpg",
        alt: "Chart Elements — title, axes, legend, data labels, and gridlines explained",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-04.jpg",
        alt: "Formatting Chart Elements — colors, fonts, borders, and chart styles gallery",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-05.jpg",
        alt: "Moving Charts to Their Own Sheet — keeping dashboards clean and printable",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-06.jpg",
        alt: "Updating Chart Data Range — adding new months or categories without rebuilding the chart",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-07.jpg",
        alt: "Sparklines — in-cell mini-charts for showing trends at a glance",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-08.jpg",
        alt: "Chart Templates — saving a formatted chart style for reuse across monthly reports",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/slide-09.jpg",
        alt: "Knowledge Check — identifying the correct chart type for a given data comparison task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates is preparing for the quarterly provider meeting and needs three charts ready by Thursday: a column chart showing monthly supply expenses by department, a line chart showing patient appointment volume over the past 6 months by provider, and a pie chart breaking down total spending by category. Raw data in a spreadsheet is hard to discuss in a meeting — charts make the same information instantly understandable. Your job is to build professional, accurate charts that will appear in the quarterly report and on the projected screen during the meeting.",
          },
        ],
      },
      {
        heading: "Choosing the Right Chart Type",
        blocks: [
          {
            type: "paragraph",
            text: "The most important chart decision is not how to format it — it is which type to use. The wrong chart type makes data confusing or misleading, even if the design is beautiful. Every chart type is designed to answer a specific type of question about data:",
          },
          {
            type: "list",
            items: [
              "Column and bar charts are for comparisons — use a column chart (vertical bars) when comparing discrete categories side by side, such as monthly supply costs by department or patient counts by provider. Use a bar chart (horizontal bars) when category names are long and would overlap on a horizontal axis, or when the comparison benefits from a horizontal visual flow. Column charts are the most common chart type in business reporting and the default choice when you need to show 'which is biggest.'",
              "Line charts are for trends over time — use a line chart when your data has a time axis (months, quarters, years) and the important story is whether values are going up, going down, or staying flat. A line chart of monthly appointment counts from January through June tells a trend story that a column chart would obscure. If you have multiple series (one line per provider), line charts efficiently show multiple trends on one visual without the clutter of grouped columns.",
              "Pie charts show proportional composition — use a pie chart only when you want to show each category's share of a total, and only when you have 5 or fewer categories. A pie chart showing that Medical Supplies represent 45%, Office Supplies 30%, and Cleaning Supplies 25% of total spending answers the composition question clearly. Do not use a pie chart to compare absolute values across categories — use a column chart instead. Never use a pie chart with more than 6 slices; too many slices make the chart unreadable.",
              "Scatter charts show correlations between two numeric variables — they plot data points at the intersection of two values and reveal whether the variables are correlated (do higher appointment counts correlate with higher supply usage?). Scatter charts are less common in routine medical office reporting but essential for data analysis tasks where you are exploring relationships between variables.",
            ],
          },
        ],
      },
      {
        heading: "Inserting and Formatting Charts",
        blocks: [
          {
            type: "paragraph",
            text: "Creating a chart in Excel is straightforward — the professional quality of the chart comes from the formatting decisions you make after the initial insertion. Here is the complete workflow from data selection to a publication-ready chart:",
          },
          {
            type: "list",
            items: [
              "Select your data before inserting a chart — include both the data values AND the labels (category names in one column, numeric values in adjacent columns). For a monthly expense chart, select the month names in column A and the expense values in column B — both columns, including their headers. Click Insert > Charts and choose your chart type, or use the 'Recommended Charts' button (Insert > Recommended Charts) to let Excel suggest appropriate chart types for your data.",
              "Chart Elements are the building blocks of every chart — access them via the '+' button that appears when you click the chart, or through the Chart Design and Format tabs. The chart title should describe exactly what the chart shows ('Lakeside Medical Associates — Monthly Supply Expenses by Department'). Axis titles label what each axis represents (e.g., 'Month' on the x-axis, 'Total Expense ($)' on the y-axis). Data labels show the exact value on each bar or data point — use them when precision matters more than a clean visual.",
              "Chart styles and color schemes can be applied from the Chart Design tab gallery — a professionally colored chart with a clean, uncluttered style communicates data more effectively than one with heavy gridlines, 3D effects, or a distracting gradient background. For Lakeside Medical Associates reports, use a simple flat style with the practice's colors. Avoid 3D charts — they distort the apparent proportions of bars and make the chart harder to read accurately.",
              "Moving a chart to its own chart sheet produces a full-page, print-ready chart — right-click the chart, choose 'Move Chart,' and select 'New sheet.' Name the sheet 'Monthly Expenses Chart.' When placed on its own sheet, the chart expands to fill the entire page and can be printed independently or presented on screen at full resolution without competing with the surrounding data table.",
              "Updating a chart's data range allows you to add new data without rebuilding the chart — right-click the chart, choose 'Select Data,' and adjust the data range to include additional rows or columns. If your expense data runs through row 13 (12 months) and you add a 13th row for December, drag the range selector to include row 14. For charts linked to an Excel Table, new rows added to the table automatically extend the chart — another reason Tables are the professional choice for data that grows over time.",
            ],
          },
        ],
      },
      {
        heading: "Sparklines and Chart Templates",
        blocks: [
          {
            type: "paragraph",
            text: "Sparklines and chart templates extend Excel's visualization capabilities for specific professional use cases — sparklines for dense data summaries and templates for maintaining visual consistency across multiple reports:",
          },
          {
            type: "list",
            items: [
              "Sparklines are tiny charts displayed inside a single cell — they show the shape of a trend (up, down, volatile) at a glance without taking up the space of a full chart. Insert sparklines via Insert > Sparklines > Line, Column, or Win/Loss. Select the data range for the sparkline and the output cell where the mini-chart will display. A sparkline next to each supply category in the Summary sheet instantly shows whether spending in that category is trending up or down month over month — without the viewer needing to read a separate chart.",
              "Saving a chart as a template preserves all your formatting choices — colors, fonts, axis labels, gridlines — for reuse in future charts without reformatting from scratch. Right-click a finished, formatted chart and choose 'Save as Template.' Give it a name like 'Lakeside Medical Monthly Report.' The next time you insert a chart, go to Insert > Charts > All Charts > Templates and choose your saved template — the new chart will have the same professional formatting applied instantly.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Charts and Visualization",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-4/charts-and-visualization/infographic.png",
            alt: "Charts and Visualization Quick Reference — chart type decision matrix, chart element labels diagram, formatting workflow steps, sparkline insertion guide, and chart template save and reuse steps",
            caption: "Charts and Visualization Quick Reference — from raw data to professional visual reports",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Charts that mislead are more dangerous than no chart at all — a y-axis that does not start at zero can make a small difference look dramatic, and a poorly chosen chart type can reverse the apparent message of the data. Before presenting any chart in a Lakeside Medical Associates provider or staff meeting, verify that the chart accurately represents the underlying data and that the scale is not distorted. Never use a chart to make a trend look more positive or more alarming than the data actually shows — clinical and operational decisions may be based on these visuals, and visual misrepresentation in a healthcare context can have real patient and financial consequences.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am creating a quarterly expense dashboard for a small medical office. I have monthly expense data by department (Medical, Nursing, Administration, Facilities) for January through June. What combination of charts should I include in the dashboard, what chart type should each be, and why? Also describe what chart elements (title, axis labels, data labels, legend) should be included in each chart for maximum clarity in a meeting presentation.' Use the response to plan the chart layout for your Module 4 capstone dashboard.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Your supervisor wants to show how patient appointment volume has changed each month from January through June across three providers. Which chart type is most appropriate?",
            options: [
              "Pie chart — to show each provider's share of total appointments",
              "Scatter chart — to show the correlation between provider experience and appointment count",
              "Line chart — to show appointment volume trends over time for each provider",
              "Column chart — to show which month had the single highest appointment count",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build three professional charts for a Lakeside Medical Associates quarterly report — one for each of the three comparison types covered in this lesson. All charts must be correctly labeled, professionally formatted, and based on realistic sample data.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a new Excel workbook. On Sheet1 named 'Data,' build three data tables: (1) Monthly Supply Expenses by Department — 6 months across 4 departments (Medical, Nursing, Administration, Facilities). (2) Provider Appointment Volume — 6 months across 3 providers (Dr. Patel, Dr. Chen, Dr. Okafor). (3) Total Spending by Category — 5 categories with total amounts for the quarter.",
          "From table 1, create a clustered column chart showing all 4 departments across 6 months. Title it 'Quarterly Supply Expenses by Department.' Add axis titles (Month and Expense ($)), a legend showing department colors, and data labels on one department's bars only. Apply a clean, flat chart style (no 3D). Move the chart to its own sheet named 'Department Chart.'",
          "From table 2, create a line chart with 3 lines (one per provider) showing appointment volume over 6 months. Title it 'Patient Appointment Volume by Provider — Q2 2025.' Add a legend, axis titles, and markers on each data point. Move to a sheet named 'Appointment Chart.'",
          "From table 3, create a pie chart showing each category's percentage of total spending. Title it 'Total Supply Spending by Category — Q2 2025.' Add percentage data labels on each slice and a legend. Move to a sheet named 'Category Chart.'",
          "On the Data sheet, add sparklines in column I next to the Department Expenses table showing the 6-month trend for each department as a line sparkline. Save the workbook as 'Quarterly Charts – Lakeside Medical.xlsx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook (with 5 sheets: Data, Department Chart, Appointment Chart, Category Chart, and sparklines visible on the Data sheet) to your instructor or course folder. Each chart will be evaluated on: correct chart type for the data question, accurate data representation, required chart elements (title, axis titles, legend, data labels), professional formatting, and placement on its own chart sheet. These three charts are ready to copy into a PowerPoint presentation for Thursday's provider meeting.",
      },
    ],
  },

  {
    slug: "pivottables",
    title: "PivotTables and PivotCharts",
    description:
      "Master Excel's most powerful analysis tool — PivotTables — to summarize, group, and explore large datasets interactively, and connect PivotCharts for dynamic visual analysis.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/N4K3xjM76kI",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-01.jpg",
        alt: "What a PivotTable Is — summarizing 300 rows of data into a meaningful cross-tab in seconds",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-02.jpg",
        alt: "Creating a PivotTable — selecting the data range and choosing where to place the PivotTable",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-03.jpg",
        alt: "The Four PivotTable Areas — Rows, Columns, Values, and Filters and how each works",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-04.jpg",
        alt: "Field Placement — dragging fields to understand the data from different angles",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-05.jpg",
        alt: "Summarizing by Sum, Count, and Average — changing the Value Field Settings",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-06.jpg",
        alt: "Grouping Dates — summarizing data by month, quarter, and year automatically",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-07.jpg",
        alt: "Slicers — interactive filter buttons for exploring PivotTable data without editing",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-08.jpg",
        alt: "PivotCharts — creating a chart that responds to PivotTable filter changes",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/pivottables/slide-09.jpg",
        alt: "Refreshing a PivotTable — updating the analysis when source data changes",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates gives you a spreadsheet with 350 rows of expense records — date, department, category, vendor, and amount — and asks: 'Can you tell me what we spent per department last month, what our top spending categories are, which vendors we paid the most, and how May compares to April?' This data question cannot be answered by a single formula or a simple sort. You could manually create summary tables for each question, or you could build one PivotTable and answer all four questions in about 3 minutes. PivotTables are the reason power Excel users can do in minutes what others do in hours.",
          },
        ],
      },
      {
        heading: "What PivotTables Do and Why They Matter",
        blocks: [
          {
            type: "paragraph",
            text: "A PivotTable is an interactive summary table that organizes and aggregates data from a larger dataset based on the categories you choose. The word 'pivot' reflects the fact that you can instantly restructure the summary by dragging fields to different positions — exploring the data from entirely different angles without touching the original data:",
          },
          {
            type: "list",
            items: [
              "PivotTables summarize large datasets instantly — a 350-row expense ledger with one row per transaction can be summarized as a department-by-month totals table in seconds. No formulas, no manual copy-paste, no creating separate summary tables for each question. The PivotTable scans all 350 rows, groups them by your chosen categories, and calculates the summary values automatically.",
              "PivotTables are non-destructive — the original data is never touched. The PivotTable is a separate analysis view that references the source data. You can build 10 different PivotTables from the same dataset, each exploring a different question, without altering any source records. If you make an analysis mistake, simply clear the PivotTable and start fresh.",
              "PivotTables update with one click when source data changes — when May's last week of expense records is added to the data table, right-click the PivotTable and choose 'Refresh' to instantly update every PivotTable that references that data. No need to rewrite formulas or rebuild summary tables — the analysis updates in seconds.",
              "PivotTables are the foundation of Excel dashboards — most professional Excel dashboards consist of 2–4 PivotTables with PivotCharts and Slicers connected to them. Learning PivotTables well is the single most leveraged Excel skill for anyone whose job involves data reporting.",
            ],
          },
        ],
      },
      {
        heading: "Creating and Configuring a PivotTable",
        blocks: [
          {
            type: "paragraph",
            text: "Creating a PivotTable from a well-structured data source takes less than 60 seconds — the power comes from understanding how to configure it to answer your specific question:",
          },
          {
            type: "list",
            items: [
              "To create a PivotTable: click any cell in your data range (Excel will automatically detect the full data region), then click Insert > PivotTable. The Create PivotTable dialog asks you to confirm the data range and choose where to place the PivotTable — select 'New Worksheet' to keep the analysis separate from your source data. Click OK. A blank PivotTable framework appears on the new sheet with the PivotTable Field List panel open on the right.",
              "The four PivotTable areas determine the structure of your analysis — Rows (the row headers of the summary table), Columns (the column headers), Values (the data being aggregated), and Filters (applied to limit which source records are included). Drag field names from the field list at the top of the panel into the four areas at the bottom. The PivotTable updates in real time as you drop fields.",
              "To answer 'What did we spend per department last month?': drag Department to the Rows area, Amount to the Values area. The PivotTable immediately shows total spending per department. To break it down by month as well: drag Date (or Month) to the Columns area — the table now shows a grid of Department vs Month with spending totals at each intersection. This two-dimensional view is the classic cross-tab that justifies PivotTables' existence.",
              "The Values area defaults to Sum for numeric fields and Count for text fields — to change how a value is aggregated, right-click the value field in the Values area and choose 'Value Field Settings.' You can change Sum to Count, Average, Min, Max, or other options. 'Show Values As' lets you display values as percentages of row total, column total, or grand total — instantly converting dollar amounts to percentage breakdowns without writing a single formula.",
              "Grouping dates allows you to summarize by month, quarter, or year even when your data has specific dates in each row — right-click any date value in the Row or Column area and choose 'Group.' Choose 'Months' and 'Years' (hold Ctrl to select multiple levels). Excel groups all January dates together, all February dates together, etc., and shows Month names as the row or column headers.",
            ],
          },
        ],
      },
      {
        heading: "Slicers and PivotCharts",
        blocks: [
          {
            type: "paragraph",
            text: "Slicers and PivotCharts transform a static PivotTable analysis into an interactive exploration tool — making it possible for non-Excel users like physicians and office managers to explore the data themselves without needing to understand PivotTable mechanics:",
          },
          {
            type: "list",
            items: [
              "Slicers are visual filter buttons — each slicer shows all unique values in a field as clickable buttons. Click a button to filter the PivotTable to show only that value; Ctrl+Click multiple buttons to show data for multiple values; click the 'X' button to clear the filter. Insert a slicer via PivotTable Analyze > Insert Slicer. For an expense dashboard at Lakeside Medical Associates, slicers for Department and Category let the office manager filter the data with two clicks instead of navigating the PivotTable filter panel.",
              "Multiple slicers can be connected to multiple PivotTables on the same sheet — right-click a slicer and choose 'Report Connections' to select which PivotTables the slicer controls. When connected, clicking a slicer button simultaneously filters all connected PivotTables and PivotCharts — creating a true interactive dashboard from a simple set of tools.",
              "PivotCharts are charts connected to a PivotTable that automatically update when the PivotTable's data or filter changes — click any cell in a PivotTable, then click PivotTable Analyze > PivotChart. Choose a chart type and format it as you would a regular chart. When you click a slicer button or drag a field in the PivotTable, the PivotChart updates automatically to reflect the new view. PivotCharts connected to slicers are the core building block of professional Excel dashboards.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: PivotTables and PivotCharts",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-4/pivottables/infographic.png",
            alt: "PivotTables Quick Reference — PivotTable creation steps, the four areas diagram, Value Field Settings options, date grouping guide, slicer insertion steps, PivotChart creation workflow, and Refresh steps when source data changes",
            caption: "PivotTables and PivotCharts Quick Reference — turning 350 rows into instant insights",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "PivotTables do not validate the accuracy of their source data — if the source expense ledger contains duplicate entries, incorrectly categorized transactions, or data entry errors, the PivotTable will summarize those errors faithfully. A PivotTable that shows 'Department: Administration — Total Spend: $15,230' is only as accurate as the underlying data. Before presenting PivotTable results to the physician owner or leadership team at Lakeside Medical Associates, spot-check the source data for obvious errors (duplicate rows, missing department tags, implausibly large single transactions) and verify that the PivotTable grand totals match what you would expect based on known expense patterns. Presenting incorrect financial summaries with the confidence that a polished dashboard projects is one of the most dangerous professional mistakes you can make.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Generate 30 rows of realistic expense data for a small medical office with the following columns: Date (between January 1 and June 30, 2025), Department (Medical, Nursing, Administration, Facilities), Category (Supplies, Equipment, Services, Utilities, Staff Training), Vendor (use 8 realistic vendor names), and Amount (realistic dollar amounts from $25 to $2,500). Format as a table I can paste directly into Excel.' Use this data to build your Module 4 PivotTable capstone and practice all the PivotTable skills from this lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You have a PivotTable summarizing expense amounts by Department. The source data file just received 15 new expense entries for last week. How do you update the PivotTable to include those new entries?",
            options: [
              "Delete the PivotTable and create a new one from scratch",
              "Manually add the new totals to the PivotTable cells",
              "Right-click the PivotTable and choose Refresh",
              "Copy the new rows and paste them into the PivotTable",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build a PivotTable analysis of expense data for Lakeside Medical Associates that answers four distinct business questions — then connect a PivotChart and Slicers to create a mini interactive dashboard.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Use the 30-row expense dataset you generated with ChatGPT (or create your own with columns: Date, Department, Category, Vendor, Amount). Convert it to an Excel Table on a sheet named 'Expense Data.' Ensure all dates are date values and all amounts are numbers.",
          "Create PivotTable 1 on a new sheet named 'PT Analysis': Department in Rows, Month (grouped from Date) in Columns, Sum of Amount in Values. This answers 'What did we spend per department each month?' Format all values as Currency.",
          "Add a second PivotTable below the first on the same sheet: Category in Rows, Sum of Amount in Values. Sort by Amount descending (largest to smallest). This answers 'What are our top spending categories?'",
          "Create a PivotChart from PivotTable 1: a clustered column chart showing department spending by month. Title it 'Monthly Expenses by Department — Lakeside Medical Associates.' Add a Slicer for Department (to filter both PivotTables) and a Slicer for Category. Connect both slicers to both PivotTables via Report Connections.",
          "Test the interactive dashboard: click the 'Medical' button on the Department slicer and confirm both PivotTables and the PivotChart update to show only Medical Department data. Then clear the slicer and click 'Supplies' in the Category slicer to confirm category filtering works. Save as 'PivotTable Analysis – Lakeside Medical.xlsx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook to your instructor or course folder. Your work will be evaluated on: correctly configured PivotTable 1 (department by month), correctly configured PivotTable 2 (by category, sorted), connected PivotChart, two working Slicers connected to both PivotTables, and verified interactivity. Take a screenshot of the filtered dashboard state (with Medical selected in the Department slicer) and include it with your submission.",
      },
    ],
  },

  {
    slug: "advanced-functions",
    title: "Advanced Functions: VLOOKUP, IF, SUMIF, COUNTIF",
    description:
      "Learn Excel's most powerful analytical functions — VLOOKUP for data lookup, nested IF for conditional logic, SUMIF and COUNTIF for conditional aggregation — applied to real medical office scenarios.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/iDg9s7BJ2m4",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-01.jpg",
        alt: "VLOOKUP Syntax — lookup_value, table_array, col_index_num, range_lookup explained",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-02.jpg",
        alt: "Exact vs Approximate Match — when to use 0 vs 1 in the range_lookup argument",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-03.jpg",
        alt: "Common VLOOKUP Errors — #N/A, #REF!, and how to fix each one",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-04.jpg",
        alt: "Nested IF — building multi-condition logic with up to two levels of nesting",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-05.jpg",
        alt: "AND and OR with IF — combining multiple conditions in a single IF formula",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-06.jpg",
        alt: "SUMIF — summing values that meet a single condition",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-07.jpg",
        alt: "SUMIFS and COUNTIFS — handling multiple conditions simultaneously",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-08.jpg",
        alt: "IFERROR — wrapping formulas to show a friendly message instead of error codes",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/advanced-functions/slide-09.jpg",
        alt: "Knowledge Check — selecting the correct function for a given data lookup or aggregation task",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has given you four separate tasks this week that all require advanced Excel functions: (1) look up the billing rate for each provider from a rate table; (2) flag each appointment as 'New Patient,' 'Follow-Up,' or 'Specialist Referral' based on multiple conditions; (3) sum total appointment revenue for each specific provider; and (4) count how many appointments of each type were completed in May. You could solve each one with VLOOKUP, nested IF, SUMIF, and COUNTIF respectively — but only if you know how to write each function correctly. This lesson builds those skills with direct medical office examples.",
          },
        ],
      },
      {
        heading: "VLOOKUP: Looking Up Values from a Reference Table",
        blocks: [
          {
            type: "paragraph",
            text: "VLOOKUP (Vertical Lookup) searches the first column of a table for a value you specify, then returns the corresponding value from a different column in the same row. It is the function for connecting two tables through a shared key — the same concept as a database join:",
          },
          {
            type: "list",
            items: [
              "VLOOKUP syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]). The lookup_value is what you are searching for (e.g., the provider name in the appointments table). The table_array is the lookup table (the provider rate table). The col_index_num is which column in the table to return (1 for the first column, 2 for the second, etc.). Range_lookup should almost always be 0 or FALSE for exact match in office data work.",
              "Practical medical office example: your appointment log has a Provider column with names like 'Dr. Patel.' Your rate table (on a separate sheet) has provider names in column A and billing rates in column B. In your appointment log, the formula =VLOOKUP(A2, RateTable!$A:$B, 2, 0) looks up 'Dr. Patel' in the rate table and returns the corresponding rate. Use absolute references ($A:$B) for the table_array so the formula does not shift when copied down the column.",
              "Exact match (range_lookup = 0 or FALSE) is the correct setting for almost all lookup tasks in a medical office — you want to find Dr. Patel exactly, not the closest alphabetical match. Approximate match (range_lookup = 1 or TRUE) is only used for numeric range lookups (e.g., tax brackets or commission tiers) where values fall within ranges. Using approximate match with text data produces random incorrect results.",
              "Common VLOOKUP errors: #N/A means the lookup_value was not found in the first column of the table_array — check for typos in either table, extra spaces, or mismatched capitalization. Wrap with IFERROR to return a blank or 'Not Found' message instead: =IFERROR(VLOOKUP(A2, RateTable!$A:$B, 2, 0), 'Rate Not Found'). #REF! means the col_index_num is larger than the number of columns in the table_array — reduce the column index number.",
            ],
          },
        ],
      },
      {
        heading: "Nested IF, AND, and OR",
        blocks: [
          {
            type: "paragraph",
            text: "The IF function evaluates a condition and returns different values depending on whether the condition is true or false. Nested IF functions chain multiple conditions together. AND and OR allow you to test multiple conditions in a single logical test:",
          },
          {
            type: "list",
            items: [
              "Basic IF syntax: =IF(logical_test, value_if_true, value_if_false). For a simple appointment flag: =IF(B2='New', 'New Patient', 'Returning Patient') returns 'New Patient' if B2 contains 'New,' and 'Returning Patient' for any other value. The logical_test can use any comparison operator: = (equal), <> (not equal), > (greater than), < (less than), >= (greater than or equal), <= (less than or equal).",
              "Nested IF handles more than two outcomes — =IF(B2='New', 'New Patient', IF(B2='Followup', 'Follow-Up', 'Specialist Referral')) evaluates the first condition, and if false, evaluates a second condition before returning the final value. In Excel 2019, you can nest up to 64 IFs, but more than 2–3 levels quickly becomes unreadable. For complex multi-condition logic, consider using IFS (a flatter alternative) or VLOOKUP with a lookup table.",
              "AND requires ALL conditions to be true — =IF(AND(B2='Dr. Patel', C2='New'), 'Patel New Patient', 'Other') returns 'Patel New Patient' only when both conditions are met simultaneously. This is useful when you need to combine provider AND appointment type filters in a single formula. OR requires ANY condition to be true — =IF(OR(B2='OUT', B2='LOW'), 'Needs Reorder', 'OK') returns 'Needs Reorder' when status is either OUT or LOW.",
            ],
          },
        ],
      },
      {
        heading: "SUMIF, SUMIFS, COUNTIF, and COUNTIFS",
        blocks: [
          {
            type: "paragraph",
            text: "SUMIF and COUNTIF are among the most practically useful Excel functions for office work — they let you calculate totals and counts for a specific subset of your data without filtering or building a PivotTable:",
          },
          {
            type: "list",
            items: [
              "SUMIF syntax: =SUMIF(range, criteria, [sum_range]). The range is the column to check the condition against, criteria is the value to match, and sum_range is the column to sum. For total revenue from Dr. Chen: =SUMIF(B2:B100, 'Dr. Chen', E2:E100) checks each row's Provider column (B) and sums the Revenue column (E) for all rows where Provider equals 'Dr. Chen.' If the sum_range is the same as the range (checking and summing the same column), you can omit the third argument.",
              "SUMIFS handles multiple conditions — =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2). For Dr. Chen's revenue in May 2025: =SUMIFS(E2:E100, B2:B100, 'Dr. Chen', C2:C100, '>=5/1/2025', C2:C100, '<=5/31/2025') sums revenue for rows where Provider is Dr. Chen AND date is within May. SUMIFS is strictly more flexible than SUMIF — it can handle one condition or many.",
              "COUNTIF counts rows matching a condition — =COUNTIF(B2:B100, 'Dr. Chen') counts how many rows have 'Dr. Chen' in the Provider column. =COUNTIF(D2:D100, 'New Patient') counts all new patient appointment rows. This is the function for answering 'how many' questions: how many appointments this month, how many LOW-status items, how many vendors used.",
              "COUNTIFS handles multiple conditions — =COUNTIFS(B2:B100, 'Dr. Patel', D2:D100, 'New Patient') counts rows where Provider is Dr. Patel AND appointment type is New Patient. Like SUMIFS, COUNTIFS accepts as many condition pairs as you need. Use COUNTIFS whenever you need to count within a specific segment of your data (a specific month, provider, department, or status).",
              "IFERROR wraps any formula to prevent error codes from appearing in your spreadsheet — =IFERROR(VLOOKUP(A2, RateTable!$A:$B, 2, 0), 0) returns 0 instead of #N/A if the lookup fails. =IFERROR(SUMIF(...),'No Data') returns a descriptive message instead of an error. Use IFERROR on any formula that might encounter missing data, as error codes in a shared dashboard look unprofessional and cause confusion.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Advanced Functions",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-4/advanced-functions/infographic.png",
            alt: "Advanced Functions Quick Reference — VLOOKUP syntax diagram with argument labels, nested IF structure template, AND/OR with IF examples, SUMIF vs SUMIFS vs COUNTIF vs COUNTIFS comparison table, IFERROR wrapping pattern",
            caption: "Advanced Functions Quick Reference — VLOOKUP, nested IF, SUMIF, and COUNTIF for medical office data",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "VLOOKUP formulas that return incorrect values without triggering an error code are more dangerous than visible errors — an #N/A error is immediately obvious, but a VLOOKUP that returns the wrong provider's rate because a name was entered inconsistently ('Dr Chen' vs 'Dr. Chen') produces a plausible-looking number that is silently wrong. In a medical billing context, VLOOKUP errors on provider rates can result in incorrect claim submissions, revenue calculation errors, and audit findings. Always validate VLOOKUP results by spot-checking 5–10 rows against the source lookup table before the formula is used in any financial or billing calculation. Add data validation (Module 4, Lesson 4) to the lookup key columns to prevent inconsistent entry from causing lookup failures.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I have an Excel appointment log for a medical office with columns: A=AppointmentID, B=ProviderName, C=AppointmentDate, D=AppointmentType (New/Follow-Up/Specialist), E=Revenue. Write the following formulas for me: (1) VLOOKUP to get the provider billing rate from a separate rate table (columns: ProviderName, BillingRate), (2) A nested IF formula to categorize revenue as High (>$300), Medium ($100-$300), or Low (<$100), (3) SUMIFS for total revenue by provider AND appointment type, (4) COUNTIFS for count of appointments by provider AND month.' Test each formula in your own appointment log spreadsheet.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want to sum the Revenue column (E) only for rows where the Provider (column B) is 'Dr. Okafor' AND the Appointment Type (column D) is 'New Patient.' Which function is correct?",
            options: [
              "=SUMIF(B2:B100, 'Dr. Okafor', E2:E100)",
              "=SUMIFS(E2:E100, B2:B100, 'Dr. Okafor', D2:D100, 'New Patient')",
              "=IF(AND(B2='Dr. Okafor', D2='New Patient'), SUM(E2:E100), 0)",
              "=COUNTIFS(E2:E100, B2:B100, 'Dr. Okafor')",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build an advanced function analysis sheet for the Lakeside Medical Associates appointment log using all four function families from this lesson. Each formula must be correctly written, copied down all rows, and produce results that have been spot-checked for accuracy.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create or use the appointment log from your earlier practice (or generate a new 30-row dataset with columns: AppointmentID, ProviderName, AppointmentDate, AppointmentType, Revenue). Also create a 5-row Provider Rate Table on a separate sheet with ProviderName and BillingRate columns.",
          "In a new column F named 'Lookup Rate,' write a VLOOKUP formula to retrieve each provider's billing rate from the Rate Table. Use an absolute reference for the table_array and exact match. Wrap with IFERROR to return 'Not Found' if the provider is missing from the rate table. Copy down all 30 rows.",
          "In column G named 'Revenue Category,' write a nested IF formula to classify each appointment's revenue as 'High' (>$400), 'Medium' ($200–$400), or 'Low' (<$200). Copy down all 30 rows and verify the categories look correct.",
          "Create a summary table below the data (rows 35–45): use SUMIFS to calculate total revenue for each of the 3 providers for New Patient appointments only. Use COUNTIFS to count how many appointments each provider had in each month represented in your data.",
          "Wrap each SUMIFS formula with IFERROR to return $0.00 if no matching records exist. Format all revenue totals as Currency. Save as 'Advanced Functions – Lakeside Medical.xlsx.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook to your instructor or course folder. Your work will be evaluated on: VLOOKUP with correct absolute reference and IFERROR wrap, nested IF with three correct outcomes, SUMIFS correctly filtering by two criteria, COUNTIFS correctly counting by two criteria, and all formulas producing verifiably correct results (spot-check 3 rows of each formula type manually to confirm). This function set forms the analytical backbone of the capstone dashboard.",
      },
    ],
  },

  {
    slug: "data-validation-protection",
    title: "Data Validation and Sheet Protection",
    description:
      "Learn to prevent data entry errors with Excel's validation tools, restrict editing with sheet and workbook protection, and create secure, professional spreadsheets for shared use at Lakeside Medical Associates.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/STTYxT6iFio",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-01.jpg",
        alt: "What Data Validation Does — restricting cell entries to prevent errors before they happen",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-02.jpg",
        alt: "List Validation — creating dropdown menus for controlled category selection",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-03.jpg",
        alt: "Number and Date Validation — restricting entries to specific ranges",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-04.jpg",
        alt: "Input Messages and Error Alerts — guiding users and preventing invalid entries",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-05.jpg",
        alt: "Protecting a Worksheet — locking specific cells while leaving data entry cells editable",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-06.jpg",
        alt: "Password-Protecting a Sheet — preventing unauthorized changes to formulas and structure",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-07.jpg",
        alt: "Workbook Protection — preventing sheet additions, deletions, and renaming",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/data-validation-protection/slide-08.jpg",
        alt: "Knowledge Check — choosing the correct validation or protection setting for a given scenario",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supply tracker is now being used by three different staff members at Lakeside Medical Associates — the receptionist, the nurse manager, and the billing coordinator. Last week, someone entered 'office' instead of 'Office' in the Category column, breaking the COUNTIF formulas. Someone else typed a negative quantity (-5) in the Quantity column, and another person accidentally deleted a Total Cost formula. You need to prevent all three types of errors before they happen again — through data validation and sheet protection. This lesson shows you how.",
          },
        ],
      },
      {
        heading: "Data Validation: Preventing Entry Errors",
        blocks: [
          {
            type: "paragraph",
            text: "Data validation restricts what a user can enter into a cell — if an entry does not meet your validation criteria, Excel rejects it (or warns about it) before it can corrupt your data. This is prevention, not correction — far more effective than finding errors after the fact:",
          },
          {
            type: "list",
            items: [
              "To apply data validation: select the cells you want to validate, click Data > Data Validation > Data Validation. The Data Validation dialog has three tabs — Settings (define the rule), Input Message (show a helpful tooltip when the cell is selected), and Error Alert (define what happens when an invalid entry is attempted). Always configure all three tabs for a professional, user-friendly validation experience.",
              "List validation creates a dropdown menu restricting the entry to a predefined set of values — in the Settings tab, choose 'Allow: List' and in the Source field, either type the allowed values separated by commas (Medical,Office,Cleaning,Break Room) or reference a range on a separate sheet that contains the list. The dropdown arrow appears in the validated cell, and the user can only select from the listed options. This completely eliminates the 'office' vs 'Office' inconsistency problem.",
              "Whole Number and Decimal validation restricts entries to numbers within a range — choose 'Allow: Whole Number' and set Minimum and Maximum values (e.g., Minimum: 0, Maximum: 9999) to prevent negative quantities. Choose 'Allow: Decimal' for cost fields where decimal values are valid. The Date validation type restricts date entries to a specific range — for example, allowing only dates within the current fiscal year.",
              "Input messages display a helpful tooltip when a validated cell is selected — click the 'Input Message' tab, enter a title (e.g., 'Category Entry') and a message (e.g., 'Select a category from the dropdown list. Do not type custom values.'). This guides the user before they attempt an entry rather than surprising them with an error after the fact.",
              "Error alerts control what happens when an invalid entry is attempted — the Alert style can be 'Stop' (prevents the entry entirely), 'Warning' (allows the user to override with a confirmation), or 'Information' (allows the entry with no override needed, but displays a message). For critical fields like Category that power COUNTIF formulas, use 'Stop' so incorrect entries are impossible. For advisory validations, use 'Warning.'",
            ],
          },
        ],
      },
      {
        heading: "Sheet Protection: Locking Formulas and Structure",
        blocks: [
          {
            type: "paragraph",
            text: "Sheet protection prevents users from editing cells you designate as protected — specifically, it prevents accidental deletion of formulas, changes to structural elements, and modification of headers or labels that the spreadsheet's calculations depend on:",
          },
          {
            type: "list",
            items: [
              "Protection works in two steps: first, unlock the cells users should be able to edit; then protect the sheet. By default, ALL cells in Excel are 'Locked' (but this has no effect until you protect the sheet). Before protecting: select the data entry cells (Quantity, Unit Cost, Reorder Level, Date columns), right-click > Format Cells > Protection tab > uncheck 'Locked.' Leave formula cells (Total Cost, Status), header cells, and label cells as Locked. Now when you protect the sheet, only the explicitly unlocked cells can be edited.",
              "To protect the sheet: click Review > Protect Sheet. Choose which actions are allowed even when the sheet is protected — at minimum, check 'Select unlocked cells' and 'Select locked cells' so users can still navigate. Enter an optional password. Click OK. Now any attempt to edit a locked cell shows a message explaining the sheet is protected — users can only edit the unlocked data entry cells.",
              "Hiding formulas adds an additional layer of protection — with cells selected, right-click > Format Cells > Protection tab > check 'Hidden.' When the sheet is protected, the formula bar shows blank for any cell whose formula is marked Hidden — users can see the calculated result but cannot see the formula logic. Use this for proprietary formulas or to simplify the experience for non-Excel users who might be confused by visible formula syntax.",
              "Workbook protection prevents changes to the workbook structure — adding, deleting, renaming, hiding, or unhiding sheets. Use Review > Protect Workbook to enable this with an optional password. This is appropriate for a finalized, shared workbook where the sheet structure must remain stable. Users can still edit content within sheets (subject to sheet-level protection) but cannot alter the workbook's sheet organization.",
            ],
          },
        ],
      },
      {
        heading: "Protecting Ranges for Specific Users",
        blocks: [
          {
            type: "paragraph",
            text: "For complex shared workbooks where different staff members need editing access to different parts of the same sheet, Excel provides range-level protection with user-specific permissions:",
          },
          {
            type: "list",
            items: [
              "Allow Users to Edit Ranges (Review > Allow Users to Edit Ranges) lets you define specific cell ranges that can be unlocked with a unique password — different from the sheet protection password. For example, the nurse manager gets the password for the Medical Supplies range, while the billing coordinator gets the password for the Budget Totals range. Neither can access the other's range. This provides granular access control without needing multiple separate workbooks.",
              "In practice for Lakeside Medical Associates: the supply tracker might allow the receptionist to edit Item and Date columns, the nurse manager to edit Quantity and Reorder Level, and the billing coordinator to edit Unit Cost — with sheet protection preventing anyone from accidentally editing formulas or headers. This level of setup takes extra time but prevents months of accumulating data errors in a multi-user workbook.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Data Validation and Protection",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-4/data-validation-protection/infographic.png",
            alt: "Data Validation and Protection Quick Reference — Data Validation dialog settings for List, Number, and Date types; Input Message and Error Alert configuration; two-step sheet protection workflow (unlock then protect); workbook protection steps; and protected vs unprotected cell indicator guide",
            caption: "Data Validation and Protection Quick Reference — preventing errors in shared spreadsheets",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Sheet protection passwords at Lakeside Medical Associates must be documented and stored in the practice's secure password manager — not written on sticky notes, not saved in the workbook's own properties, and not shared by email. If the sheet protection password is lost, the sheet cannot be unprotected without third-party tools, and the formulas cannot be updated if the practice's needs change. Designate one person (your supervisor or the office manager) as the keeper of all spreadsheet protection passwords, and document them in the same secure system used for other practice credentials. Also remember that sheet protection prevents accidental edits — it is not a security tool for sensitive data. A protected sheet's password can be circumvented with specialized software. For sensitive patient financial data, use the practice's secured network storage and file-level encryption, not just sheet protection.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I manage an Excel supply tracker used by 3 staff members at a medical office. The tracker has formula columns (Total Cost, Status) that should never be edited, and data entry columns (Item, Category, Quantity, Unit Cost, Reorder Level, Date) that staff must be able to update. Walk me through exactly how to: (1) unlock only the data entry columns, (2) protect the sheet so formulas are locked, (3) add a dropdown validation list for the Category column with 4 options, and (4) add a whole-number validation to the Quantity column that prevents negative values. Give me step-by-step instructions for Excel 2019.' Follow the steps on your supply tracker.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You want to protect the Total Cost formula column from accidental edits, while still allowing staff to update the Quantity column. What is the correct sequence of steps?",
            options: [
              "Protect the sheet first, then select Quantity cells and unlock them",
              "Select only the Total Cost cells and lock them, then protect the sheet",
              "Select the Quantity cells and unlock them first (Format Cells > Protection > uncheck Locked), then protect the sheet via Review > Protect Sheet",
              "Protect the workbook at the workbook level and select 'Lock formula cells'",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Finalize your Lakeside Medical Associates supply tracker with professional data validation and sheet protection so it is safe for shared multi-user use. Every data entry column must have appropriate validation, and all formula columns must be protected.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Apply dropdown list validation to the Category column — allow only: Medical, Office, Cleaning, Break Room. Set a Stop error alert with the message 'Category must be selected from the dropdown list only.' Add an Input Message that says 'Select a category for this supply item.' Test by typing an invalid category and confirming the Stop alert appears.",
          "Apply whole number validation (minimum: 0, maximum: 9999) to the Quantity column with a Stop error alert ('Quantity cannot be negative. Enter 0 for out-of-stock items'). Apply decimal validation (minimum: 0.01) to the Unit Cost column with a Warning alert (users can override but are warned). Test both validations.",
          "Select all data entry cells (Item, Category, Quantity, Unit Cost, Reorder Level, Date Ordered). Right-click > Format Cells > Protection > uncheck 'Locked.' Leave all formula cells (Total Cost, Status) and the header row as Locked.",
          "Protect the sheet using Review > Protect Sheet. Allow: 'Select locked cells' and 'Select unlocked cells.' Use the password 'LakesideMedical2025.' Test that clicking a formula cell in the Total Cost column shows the 'Sheet is protected' message, while Quantity cells remain editable.",
          "Apply workbook protection (Review > Protect Workbook) to prevent sheet renaming or deletion. Save as 'Supply Tracker – Protected – Lakeside Medical.xlsx.' Document the sheet protection password in a separate text file named 'Password Documentation – Lakeside Medical.txt' (simulating secure password storage).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your protected .xlsx workbook and the password documentation text file to your instructor or course folder. Your work will be evaluated on: working dropdown validation for Category (Stop alert), working number validation for Quantity (Stop alert), formula cells protected and confirmed non-editable, data entry cells confirmed editable, and workbook structure protected. Take two screenshots: one showing the Stop error alert triggered by an invalid Category entry, and one showing the protection error when you attempt to click in a formula cell.",
      },
    ],
  },

  {
    slug: "excel-advanced-capstone",
    title: "Hands-On: Build a Monthly Expense Dashboard",
    description:
      "Apply all Excel Advanced skills in a single capstone project — build a complete, interactive monthly expense dashboard for Lakeside Medical Associates with PivotTables, charts, SUMIF analysis, data validation, and formula protection.",
    duration: "30 min",
    videoUrl: "https://www.youtube.com/embed/FVzX4I88DBs",

    slides: [
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-01.jpg",
        alt: "Dashboard Design Planning — what sheets to build and how they connect",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-02.jpg",
        alt: "Setting Up the Data Sheet — 20+ expense rows with Department, Category, Date, Amount, Vendor",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-03.jpg",
        alt: "PivotTable by Department and Category — the core analysis view",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-04.jpg",
        alt: "Column Chart from the PivotTable — visualizing department spending at a glance",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-05.jpg",
        alt: "SUMIF Summary Table by Department — an alternative formula-based analysis view",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-06.jpg",
        alt: "Data Validation on the Department Column — preventing inconsistent entries",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-07.jpg",
        alt: "Protecting Formula Cells — locking the dashboard while keeping data entry cells editable",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-08.jpg",
        alt: "Dashboard Layout on a Separate Sheet — bringing all elements together professionally",
      },
      {
        src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/slide-09.jpg",
        alt: "Knowledge Check — reviewing the complete Excel Advanced dashboard workflow",
      },
    ],

    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates has given you your most important Excel project so far: build a monthly expense tracking and analysis dashboard that the physician owner will review at next month's leadership meeting. The dashboard must show expenses by department and category (PivotTable and chart), provide a formula-based summary that does not require the physician to interact with PivotTable fields, prevent data entry errors in the shared expense log, and protect all formulas and summary structures from accidental editing. This is a real professional deliverable — the complete capstone that integrates every skill from this module.",
          },
        ],
      },
      {
        heading: "Dashboard Architecture: Three Sheets",
        blocks: [
          {
            type: "paragraph",
            text: "Professional Excel dashboards separate raw data, analysis, and presentation into distinct sheets. This architecture keeps the data clean, the analysis flexible, and the presentation professional — three goals that cannot be achieved on a single worksheet:",
          },
          {
            type: "list",
            items: [
              "The Expense Data sheet is the only place where raw expense records live — each row is one transaction with columns: Date, Department, Category, Vendor, Amount. This sheet has validation on the Department and Category columns (dropdown lists) and a whole-number validation on the Amount column to prevent negative entries. This is the only sheet where staff can enter new data. No charts, no PivotTables, no summary tables appear here — just clean, validated data.",
              "The Analysis sheet contains the PivotTables, SUMIF summary table, and PivotChart — this is where the data is interrogated and summarized. The physician or office manager opens this sheet to explore the data from different angles. PivotTable filters and Slicers live here. Formula cells are protected so the analysis structure cannot be accidentally broken. Staff do not directly edit this sheet.",
              "The Dashboard sheet is the executive presentation view — a clean, visually organized layout that shows the most important summary numbers (total monthly spend, top category, biggest vendor, month-over-month change) alongside the PivotChart, formatted as a professional one-page report. This is what appears on the projected screen during the leadership meeting. It references cells from the Analysis sheet using cross-sheet formulas and contains no editable cells.",
            ],
          },
        ],
      },
      {
        heading: "Building the Analysis Layer",
        blocks: [
          {
            type: "paragraph",
            text: "The analysis layer is the core of the dashboard — it transforms the raw expense data into structured summaries that answer the leadership team's questions before they ask them:",
          },
          {
            type: "list",
            items: [
              "PivotTable 1 — Department vs Category cross-tab: create a PivotTable from the Expense Data table with Department in Rows, Category in Columns, and Sum of Amount in Values. Format all values as Currency. Add a Grand Total row and Grand Total column. This one PivotTable shows the complete spending matrix — what each department spent in each category — which is the most information-dense summary the leadership team needs.",
              "PivotChart — column chart from PivotTable 1: insert a clustered column chart from the PivotTable showing total spending by Department (one bar per department). Title it 'Monthly Expenses by Department — [Month Year].' Format with the practice's color scheme, clean flat style, no 3D effects, currency data labels on each bar. Place the chart adjacent to the PivotTable on the Analysis sheet.",
              "SUMIF Summary Table — formula-based alternative: below the PivotTable, build a static summary table using SUMIF: =SUMIF(ExpenseData[Department], 'Medical', ExpenseData[Amount]) for each department. This table serves the physician who prefers to see clean labeled totals rather than interacting with PivotTable fields. Format as an Excel table with a professional style, Currency formatting, and a total row using SUM.",
              "Add a Slicer for Month — connect it to PivotTable 1 so the physician can filter the analysis to a specific month during the meeting without needing to understand PivotTable mechanics. Place the slicer prominently above the PivotTable with a clear label.",
            ],
          },
        ],
      },
      {
        heading: "Protection and Validation",
        blocks: [
          {
            type: "paragraph",
            text: "The dashboard is only as reliable as the data and formulas it is built on — protection and validation ensure both remain intact as the file is shared and used over time:",
          },
          {
            type: "list",
            items: [
              "On the Expense Data sheet: apply dropdown validation to the Department column (Medical, Nursing, Administration, Facilities) and the Category column (Supplies, Equipment, Services, Utilities, Staff Training). Apply whole-number validation (minimum 1) to the Amount column to prevent zero or negative entries. Use Stop error alerts on both dropdown columns. Leave the data entry cells (Date, Department, Category, Vendor, Amount) unlocked and protect the sheet — staff can add new expense rows but cannot change the column headers.",
              "On the Analysis sheet: lock all cells (the default state) and protect the sheet with a password so PivotTable configuration and SUMIF formulas cannot be accidentally edited. Allow 'Select unlocked cells' so users can click the Slicer buttons and interact with the PivotTable's row/column fields without typing into cells. PivotTable interaction (dragging fields, clicking filter arrows) works even on a protected sheet — only direct cell editing is blocked.",
              "On the Dashboard sheet: protect all cells with no exceptions — the dashboard is read-only. All values on this sheet come from cross-sheet formulas that pull from the Analysis sheet. Users view but cannot edit. This preserves the professional presentation layout regardless of how the underlying data is updated.",
            ],
          },
        ],
      },
      {
        heading: "Quick Reference: Dashboard Build Workflow",
        blocks: [
          {
            type: "image",
            src: "/images/office-assistant/office-apps/module-4/excel-advanced-capstone/infographic.png",
            alt: "Excel Advanced Capstone Quick Reference — three-sheet architecture diagram, PivotTable configuration checklist, SUMIF summary table formula template, data validation setup for expense log, protection workflow for all three sheets, and Dashboard layout template",
            caption: "Excel Advanced Dashboard Quick Reference — building a physician-ready monthly expense dashboard",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "The monthly expense dashboard you build will be viewed by the physician owner of Lakeside Medical Associates during the leadership meeting. This means every number must be accurate, every chart must be correctly scaled, and every label must be professional. Before delivering the dashboard, have your supervisor review it and independently verify 3–5 expense totals against the source records. A dashboard that shows incorrect financial totals in a leadership meeting damages your professional credibility and may lead to incorrect financial decisions. Never present data you have not personally verified. Include a visible 'Data as of [Date]' label on the Dashboard sheet so leadership knows the time period the analysis covers and can request an update if needed.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Generate 25 realistic expense records for a small medical practice for May 2025. Use these columns: Date (within May 1–31, 2025), Department (Medical, Nursing, Administration, Facilities), Category (Supplies, Equipment, Services, Utilities, Staff Training), Vendor (use 8 realistic vendor names), Amount (between $50 and $2,500). Include a realistic mix of departments and categories, and make some departments spend significantly more than others to create an interesting analysis. Format as a table I can paste into Excel.' Use this data to populate your Expense Data sheet for the capstone project.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In the three-sheet dashboard architecture for Lakeside Medical Associates, which sheet is the only place where staff should enter new expense records?",
            options: [
              "The Dashboard sheet — because it is the most visible",
              "The Analysis sheet — because the PivotTables need to be close to the data",
              "The Expense Data sheet — the only sheet with unlocked data entry cells and validation",
              "Any sheet — users can enter data wherever they prefer",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Build the complete Lakeside Medical Associates monthly expense dashboard — three sheets, fully functional PivotTables and charts, formula-based summary, data validation, and protection. This is your Excel Advanced capstone and must meet all specifications below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a workbook with three sheets: 'Expense Data,' 'Analysis,' and 'Dashboard.' On the Expense Data sheet, enter 25 expense records (use AI-generated data or create your own) with columns: Date, Department, Category, Vendor, Amount. Convert to an Excel Table. Apply dropdown validation to Department (4 options) and Category (5 options) with Stop error alerts. Apply validation to Amount (minimum: 1). Protect the sheet leaving only data entry cells editable.",
          "On the Analysis sheet, create a PivotTable (Department in Rows, Category in Columns, Sum of Amount in Values) formatted as Currency with Grand Totals. Add a PivotChart (clustered column by Department) with a title, axis labels, and currency data labels. Add a Month slicer connected to the PivotTable. Below the PivotTable, build a SUMIF summary table showing total spend per department using structured table references. Protect the sheet.",
          "On the Dashboard sheet, build a professional one-page summary layout: a title ('Lakeside Medical Associates — Monthly Expense Report — May 2025'), five KPI cells showing Grand Total Spend, Top Department (manual label based on data), Highest Category Spend, Number of Transactions, and Average Transaction Amount — all using cross-sheet formulas from the Analysis sheet. Copy or link the PivotChart to this sheet. Apply a professional visual layout with alternating colored header sections. Protect all cells.",
          "Test the complete dashboard: add 3 new expense rows to the Expense Data table, go to the Analysis sheet, right-click the PivotTable and choose Refresh, and confirm the PivotTable, PivotChart, SUMIF summary, and Dashboard KPIs all update to reflect the new data.",
          "Save the workbook as 'Monthly Expense Dashboard – Lakeside Medical – May 2025.xlsx.' Export the Dashboard sheet as a PDF named 'Executive Expense Report – May 2025.pdf.'",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your .xlsx workbook and the PDF export to your instructor or course folder. Your dashboard will be graded on: validated Expense Data sheet (dropdown and amount validation working), Analysis PivotTable (Department × Category cross-tab with Grand Totals), PivotChart correctly visualizing department totals, SUMIF summary table with correct formulas, Dashboard sheet with 5 cross-sheet KPI formulas, working Refresh functionality (confirmed with screenshot), and all three sheets correctly protected. A perfect score means this dashboard is ready to be projected at a Lakeside Medical Associates leadership meeting today.",
      },
    ],
  },
];
