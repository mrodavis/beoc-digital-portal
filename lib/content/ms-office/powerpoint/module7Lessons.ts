import { Lesson } from "@/types/lesson";

export const powerpointModule7Lessons: Lesson[] = [

{
  slug: "inserting-tables",
  title: "Inserting Tables",
  description:
    "Learn how to create and insert tables in PowerPoint, add and remove rows and columns, merge cells, and apply table styles to organize data clearly.",
  objectives: [
    "Insert and format a table on a slide",
    "Navigate a table and add rows efficiently",
    "Use table style options to aid reading",
    "Judge when a table belongs on a slide at all",
  ],
  duration: "10 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Tables Practice File",
      url: "/practice/powerpoint/module-7/tables/Powerpoint_Tables_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Most tables do not belong on a slide",
       blocks: [
         {
           type: "scenario",
           role: "You present budget figures at Lakeside Medical Associates.",
           text: "You paste a twelve-column, thirty-row table from Excel onto a slide. At the back of the room it is a gray texture. Nobody reads a single figure, and the two numbers that actually mattered are lost among four hundred that did not.",
           task: "Put the few figures that matter on the slide, and give the full table out as a handout.",
         },
         {
           type: "paragraph",
           text: "A slide is glanced at from a distance. A table with more than about five columns and six rows exceeds what that allows. If the audience needs the full data set, it belongs in a handout or an appendix — and the slide should carry the three numbers your point actually rests on.",
         },
         {
           type: "tip",
           text: "Banded rows are the highest-value table formatting on a slide: alternating shading lets the eye track across a row without losing its place, which matters much more at a distance than up close. Turn on Header Row as well, so the labels are visibly distinct from the data.",
         },
       ],
     },

    {
      heading: "When to Use Tables",
      blocks: [
        {
          type: "paragraph",
          text:
            "Tables are useful whenever you need to present structured data in rows and columns — schedules, comparison charts, pricing tiers, contact lists, and similar content.",
        },
        {
          type: "paragraph",
          text:
            "A well-formatted table helps an audience absorb organized information quickly without requiring them to read through long paragraphs.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Keep tables simple. Avoid cramming so much data into a table that it becomes difficult to read at presentation size.",
        },
      ],
    },

    {
      heading: "Inserting a Table",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and click Table. A grid appears where you can drag to choose the number of columns and rows you need.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_insert_grid.png",
          alt: "Table insertion grid on the Insert tab",
        },
        {
          type: "paragraph",
          text:
            "Release the mouse to insert the table. PowerPoint places it on the slide and opens the Table Design and Layout tabs.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_inserted.png",
          alt: "Blank table inserted on a slide",
        },
        {
          type: "tip",
          text:
            "If you need more rows or columns than the grid allows, select Insert Table from the Table menu to enter exact numbers.",
        },
      ],
    },

    {
      heading: "Entering and Navigating Table Content",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside any cell to begin typing. Press Tab to move to the next cell, or Shift+Tab to move backwards.",
        },
        {
          type: "paragraph",
          text:
            "Pressing Tab in the last cell of the last row automatically adds a new row to the table.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_data_entered.png",
          alt: "Table with data entered across multiple cells",
        },
      ],
    },

    {
      heading: "Adding and Removing Rows and Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "To add a row or column, click inside the table near where you want to insert. Then open the Layout tab and use the Insert Above, Insert Below, Insert Left, or Insert Right buttons.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_insert_row_col.png",
          alt: "Insert row and column options on the Layout tab",
        },
        {
          type: "paragraph",
          text:
            "To delete a row or column, click inside it, then use the Delete Rows or Delete Columns button on the Layout tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_delete_row_col.png",
          alt: "Delete row and column options on the Layout tab",
        },
      ],
    },

    {
      heading: "Merging and Splitting Cells",
      blocks: [
        {
          type: "paragraph",
          text:
            "Merging combines multiple adjacent cells into a single cell. This is commonly used for header rows that span all columns.",
        },
        {
          type: "paragraph",
          text:
            "Select the cells you want to merge, then click Merge Cells on the Layout tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_merge_cells.png",
          alt: "Merge Cells button on the Layout tab",
        },
        {
          type: "paragraph",
          text:
            "To reverse a merge, select the merged cell and click Split Cells. Enter the number of rows and columns you want to split it into.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_split_cells.png",
          alt: "Split Cells dialog in PowerPoint",
        },
      ],
    },

    {
      heading: "Resizing Columns and Rows",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can resize columns and rows by dragging the border between cells. Position your cursor over the border until it changes to a resize arrow, then drag.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_resize_column.png",
          alt: "Resizing a table column by dragging",
        },
        {
          type: "paragraph",
          text:
            "For precise sizing, enter exact values in the Width and Height fields on the Layout tab.",
        },
        {
          type: "paragraph",
          text:
            "Use Distribute Columns or Distribute Rows on the Layout tab to make all columns or rows the same size instantly.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_distribute.png",
          alt: "Distribute Rows and Columns options",
        },
      ],
    },

    {
      heading: "Applying Table Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Table Design tab offers a gallery of pre-built styles that apply colors, shading, and borders matching your presentation's theme.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_style_gallery.png",
          alt: "Table Design style gallery in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Use the Table Style Options checkboxes — such as Header Row, Banded Rows, and Total Row — to emphasize specific parts of the table.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_style_options.png",
          alt: "Table Style Options checkboxes",
        },
      ],
    },

    {
      heading: "Aligning Text in Cells",
      blocks: [
        {
          type: "paragraph",
          text:
            "Text inside table cells can be aligned horizontally (left, center, right) and vertically (top, middle, bottom) using the alignment buttons on the Layout tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_text_alignment.png",
          alt: "Text alignment options on the Table Layout tab",
        },
        {
          type: "tip",
          text:
            "Center-aligning text both horizontally and vertically in header cells gives tables a cleaner, more polished look.",
        },
      ],
    },

    {
      heading: "Completed Table Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "A formatted table with a styled header row, banded rows, and properly aligned content is much easier to read during a presentation than raw data.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/tables/tables_final_result.png",
          alt: "Completed and formatted table on a slide",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What happens when you press Tab in the last cell of a table?",
          options: [
            "The table is deselected",
            "A new column is inserted to the right",
            "The cursor moves back to the first cell",
            "A new row is added at the bottom of the table",
          ],
          correctIndex: 3,
          explanation: "Tab in the last cell adds a new row and moves the cursor into it, so you can keep typing without deciding the row count in advance.",
          optionRationales: [
            "The table stays selected and active.",
            "Tab never adds columns; columns are added from the Table Layout tab.",
            "That is what Ctrl+Home does. Tab moves forward.",
            "Correct. A new row is added at the bottom and the cursor moves into it.",
          ],
        },
        {
          type: "knowledge-check",
          question: "Which Table Style Option emphasizes alternating rows with different shading?",
          options: [
            "Header Row",
            "Total Row",
            "Banded Rows",
            "First Column",
          ],
          correctIndex: 2,
          explanation: "Banded Rows applies alternating shading to rows, which helps the eye track across a row — particularly valuable when the table is being read from a distance.",
          optionRationales: [
            "Header Row formats the first row distinctly as column labels.",
            "Total Row emphasizes a summary row at the bottom.",
            "Correct. Banded Rows shades alternate rows to aid horizontal tracking.",
            "First Column emphasizes the leftmost column, usually the row labels.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a new slide with a Title and Content layout.",
        "Add the title: Quarterly Schedule.",
        "Insert a table with 4 columns and 5 rows.",
        "Type Quarter, Region, Sales Rep, and Status as the header row content.",
        "Fill in at least three more rows with sample data.",
        "Merge the top-left cell with the cell to its right to create a wide header.",
        "Apply a table style that includes banded rows.",
        "Distribute the columns evenly so they are all the same width.",
        "When finished, your table should look organized and easy to read at presentation size.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-7/tables/tables_final_result.png",
      alt: "Completed table challenge result",
    },
  ],

},

{
  slug: "inserting-charts",
  title: "Inserting Charts",
  description:
    "Learn how to insert charts into PowerPoint, choose the right chart type, edit chart data, and format your chart to communicate information visually.",
  objectives: [
    "Insert a chart and edit its underlying data",
    "Choose a chart type that answers the audience's question",
    "Simplify a chart so it reads from the back of a room",
    "Update a chart when the source figures change",
  ],
  duration: "11 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Charts Practice File",
      url: "/practice/powerpoint/module-7/charts/Powerpoint_Charts_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "A presentation chart needs to be simpler than a report chart",
       blocks: [
         {
           type: "scenario",
           role: "You present spending trends at Lakeside Medical Associates.",
           text: "You paste the chart from your Excel report: eight series, gridlines, a legend on the right, and axis labels at nine point. In the report, where a reader can study it, it works. Projected, it is a colored tangle.",
           task: "Rebuild the chart for a glance from six meters away, not for a reader at a desk.",
         },
         {
           type: "paragraph",
           text: "A report chart is read; a presentation chart is glanced at. That difference means fewer series — two or three, not eight — larger type, no gridlines, and direct labels on the lines rather than a legend the eye has to travel to and match by color.",
         },
         {
           type: "table",
           caption: "Choosing a chart type",
           columns: [
             "The question",
             "Chart",
           ],
           rows: [
             [
               "How did this change over time?",
               "Line",
             ],
             [
               "How do these categories compare?",
               "Column or bar",
             ],
             [
               "What share of the whole is each part?",
               "Pie, five or fewer slices",
             ],
             [
               "Are these two measures related?",
               "Scatter",
             ],
           ],
         },
         {
           type: "callout",
           variant: "warning",
           text: "Start a column chart's value axis at zero. Readers judge bar length, so a truncated axis makes a small difference look dramatic. Presenting a misleading chart damages your credibility even when the distortion was accidental — and it usually is.",
         },
       ],
     },

    {
      heading: "Why Use Charts in Presentations?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Charts transform raw numbers into visuals that are far easier to interpret at a glance. A bar chart comparing sales figures communicates instantly what a table of numbers takes time to process.",
        },
        {
          type: "paragraph",
          text:
            "In professional presentations, charts are among the most effective tools for presenting data-driven arguments and trends.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Choose your chart type based on what you want to communicate, not just what looks interesting. The wrong chart type can mislead your audience.",
        },
      ],
    },

    {
      heading: "Common Chart Types",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint includes many chart types. These are the most commonly used in business presentations:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Column and Bar — compare values across categories. Column charts are vertical; bar charts are horizontal.",
            "Line — show trends over time. Best when data has a clear sequence like months or years.",
            "Pie — show proportions of a whole. Use only when you have a small number of categories.",
            "Area — similar to line charts but filled with color, emphasizing volume.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_types_overview.png",
          alt: "Common chart types in PowerPoint",
        },
      ],
    },

    {
      heading: "Inserting a Chart",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and click Chart.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_insert_ribbon.png",
          alt: "Chart command on the Insert tab",
        },
        {
          type: "paragraph",
          text:
            "The Insert Chart dialog opens. Choose a chart type from the left panel and select a specific subtype from the top row, then click OK.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_insert_dialog.png",
          alt: "Insert Chart dialog with chart types",
        },
        {
          type: "paragraph",
          text:
            "A sample chart appears on your slide alongside a small Excel-style spreadsheet where you enter your actual data.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_data_sheet.png",
          alt: "Sample chart and data spreadsheet side by side",
        },
      ],
    },

    {
      heading: "Editing Chart Data",
      blocks: [
        {
          type: "paragraph",
          text:
            "Replace the placeholder data in the spreadsheet with your own numbers. The chart on the slide updates automatically as you type.",
        },
        {
          type: "paragraph",
          text:
            "Column headers become the chart's legend labels. Row headers become the category labels along the axis.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_data_entered.png",
          alt: "Updated chart data and resulting chart",
        },
        {
          type: "paragraph",
          text:
            "Close the spreadsheet when you're done. To edit the data again later, right-click the chart and select Edit Data.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_edit_data_menu.png",
          alt: "Edit Data option in the right-click menu",
        },
      ],
    },

    {
      heading: "Chart Design and Format Tabs",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a chart is selected, the Chart Design and Format tabs appear on the ribbon. These tabs contain all chart customization tools.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_design_tab.png",
          alt: "Chart Design tab on the PowerPoint ribbon",
        },
      ],
    },

    {
      heading: "Applying a Chart Style",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Chart Design tab includes a Chart Styles gallery with pre-built color and shading combinations that coordinate with your theme.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_style_gallery.png",
          alt: "Chart Styles gallery on the Chart Design tab",
        },
        {
          type: "paragraph",
          text:
            "Click Change Colors to select a different color palette for your chart's data series.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_change_colors.png",
          alt: "Change Colors options for a chart",
        },
      ],
    },

    {
      heading: "Changing the Chart Layout",
      blocks: [
        {
          type: "paragraph",
          text:
            "Quick Layouts on the Chart Design tab let you change what elements appear on the chart — such as the title, legend, gridlines, and data labels.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_quick_layout.png",
          alt: "Quick Layout options on the Chart Design tab",
        },
        {
          type: "paragraph",
          text:
            "You can also use Add Chart Element to turn individual elements on or off, such as axis titles, data labels, and the legend.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_add_element.png",
          alt: "Add Chart Element menu",
        },
      ],
    },

    {
      heading: "Changing the Chart Type",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you decide that a different chart type would represent your data better, you don't have to start over.",
        },
        {
          type: "paragraph",
          text:
            "Click Change Chart Type on the Chart Design tab, select the new type, and click OK. Your data transfers to the new chart format.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_change_type.png",
          alt: "Change Chart Type option on the Chart Design tab",
        },
      ],
    },

    {
      heading: "Completed Chart Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "A well-chosen chart type with a matching style and clear labels can make even complex data easy to understand at a glance.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/charts/charts_final_result.png",
          alt: "Completed formatted chart on a slide",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which chart type is best suited for showing a trend over a period of time?",
          options: [
            "Pie",
            "Column",
            "Line",
            "Scatter",
          ],
          correctIndex: 2,
          explanation: "A line chart shows change over a continuous period. The connecting line is read as continuity, which makes the shape of the trend immediately visible.",
          optionRationales: [
            "Pie charts show composition at one moment and cannot express change over time.",
            "Column charts compare discrete categories well and can show time, but a line expresses a continuous trend more directly.",
            "Correct. Line charts show trends over time.",
            "Scatter charts show the relationship between two measures rather than a trend over time.",
          ],
        },
        {
          type: "knowledge-check",
          question: "How do you update the data in a chart after it has been inserted?",
          options: [
            "Delete the chart and insert a new one",
            "Right-click the chart and select Edit Data",
            "Use the Format tab to enter new values",
            "Double-click the chart legend",
          ],
          correctIndex: 1,
          explanation: "Right-clicking the chart and choosing Edit Data opens the embedded worksheet holding the chart's values. Change them there and the chart redraws immediately.",
          optionRationales: [
            "Deleting and rebuilding discards all your formatting for no reason.",
            "Correct. Edit Data opens the underlying worksheet.",
            "The Format tab styles the chart's appearance; it does not hold the values.",
            "Double-clicking the legend opens legend formatting options.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a new slide with a Title and Content layout.",
        "Add the title: Regional Sales — Q1.",
        "Insert a Clustered Column chart.",
        "Replace the placeholder data with four regions (North, South, East, West) and their sales figures.",
        "Close the data spreadsheet.",
        "Apply a chart style that uses your theme colors.",
        "Use Add Chart Element to add data labels above each column.",
        "Remove the chart legend since the data labels make it redundant.",
        "Review the result and ensure the chart is clearly readable at slide size.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-7/charts/charts_final_result.png",
      alt: "Completed chart challenge result",
    },
  ],

},

{
  slug: "using-smartart",
  title: "Using SmartArt",
  description:
    "Learn how to insert SmartArt graphics, choose the right layout for your content, add and edit text, and apply styles to create professional diagrams.",
  objectives: [
    "Insert SmartArt and choose a category that fits the relationship",
    "Add and reorder items using the Text Pane",
    "Convert bullet lists into SmartArt",
    "Recognize when SmartArt clarifies and when it merely decorates",
  ],
  duration: "9 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "SmartArt Practice File",
      url: "/practice/powerpoint/module-7/smartart/Powerpoint_SmartArt_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "SmartArt is only useful when the shape means something",
       blocks: [
         {
           type: "scenario",
           role: "You present the referral process at Lakeside Medical Associates.",
           text: "Six sequential steps as bullets read as six equal items. The same six in a Process graphic show direction, order, and where the flow branches — the structure becomes visible rather than merely stated.",
           task: "Choose the SmartArt category that matches the actual relationship in your content.",
         },
         {
           type: "paragraph",
           text: "SmartArt builds a diagram from text you type, keeping every element aligned and consistently styled. Its value is that the layout carries meaning — but only if you choose the category that matches your content's real structure. A Cycle graphic applied to a linear process tells the audience something untrue.",
         },
         {
           type: "table",
           caption: "SmartArt categories",
           columns: [
             "Category",
             "Shows",
             "Use for",
           ],
           rows: [
             [
               "Process",
               "A sequence with direction",
               "Steps in a workflow",
             ],
             [
               "Cycle",
               "A repeating loop",
               "A process that genuinely returns to its start",
             ],
             [
               "Hierarchy",
               "Levels of reporting or containment",
               "Org charts, classification",
             ],
             [
               "Relationship",
               "Connection between items",
               "Overlaps, opposing forces",
             ],
             [
               "Matrix",
               "Parts of a whole in quadrants",
               "Two-axis categorization",
             ],
             [
               "List",
               "Grouped items, no sequence",
               "Bullets that need visual grouping",
             ],
           ],
         },
         {
           type: "tip",
           text: "Type in the Text Pane rather than clicking each shape. Enter adds an item, Tab demotes it, Shift+Tab promotes it — and SmartArt re-lays out and resizes everything automatically. Building a diagram this way takes a fraction of the time of positioning shapes by hand.",
         },
       ],
     },

    {
      heading: "What is SmartArt?",
      blocks: [
        {
          type: "paragraph",
          text:
            "SmartArt lets you transform a list of items into a professional-looking diagram without any design experience.",
        },
        {
          type: "paragraph",
          text:
            "Instead of placing text and shapes manually, SmartArt handles the layout automatically. You just choose a structure and type your content.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "SmartArt works best when your content has a clear relationship — a sequence of steps, a hierarchy, a cycle, or a set of interconnected ideas.",
        },
      ],
    },

    {
      heading: "SmartArt Categories",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint organizes SmartArt layouts into categories based on the type of relationship they represent.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "List — unordered or grouped items without a directional flow.",
            "Process — steps in a sequence or workflow.",
            "Cycle — a repeating process with no defined start or end.",
            "Hierarchy — org charts and tree structures.",
            "Relationship — connections and overlapping concepts, including Venn diagrams.",
            "Matrix — how parts relate to a whole across two axes.",
            "Pyramid — proportional or foundational relationships.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_categories.png",
          alt: "SmartArt layout categories in PowerPoint",
        },
      ],
    },

    {
      heading: "Inserting SmartArt",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and click SmartArt.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_insert_ribbon.png",
          alt: "SmartArt command on the Insert tab",
        },
        {
          type: "paragraph",
          text:
            "The Choose a SmartArt Graphic dialog opens. Select a category on the left, then pick a layout from the center panel. A preview and description appear on the right.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_choose_dialog.png",
          alt: "Choose a SmartArt Graphic dialog",
        },
        {
          type: "paragraph",
          text:
            "Click OK. The SmartArt graphic appears on your slide with placeholder text.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_inserted.png",
          alt: "SmartArt graphic inserted on a slide",
        },
      ],
    },

    {
      heading: "Adding Text to SmartArt",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can type directly into the shapes, or use the Text Pane on the left side of the graphic for easier editing.",
        },
        {
          type: "paragraph",
          text:
            "To open the Text Pane, click the small arrow on the left edge of the SmartArt border or click Text Pane on the SmartArt Design tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_text_pane.png",
          alt: "SmartArt Text Pane open for editing",
        },
        {
          type: "paragraph",
          text:
            "Each bullet in the Text Pane corresponds to a shape in the graphic. Press Enter to add a new item and Tab to create a sub-level item.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_text_entered.png",
          alt: "SmartArt with text entered across all shapes",
        },
      ],
    },

    {
      heading: "Adding and Removing Shapes",
      blocks: [
        {
          type: "paragraph",
          text:
            "SmartArt automatically sizes its shapes based on how many items you have. To add a shape, click Add Shape on the SmartArt Design tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_add_shape.png",
          alt: "Add Shape button on the SmartArt Design tab",
        },
        {
          type: "paragraph",
          text:
            "To remove a shape, click it in the graphic and press Delete.",
        },
      ],
    },

    {
      heading: "Changing the SmartArt Layout",
      blocks: [
        {
          type: "paragraph",
          text:
            "If the layout you chose doesn't quite fit your content, you can switch to a different one without retyping your text.",
        },
        {
          type: "paragraph",
          text:
            "On the SmartArt Design tab, click a different layout in the Layouts gallery. Your content transfers to the new structure automatically.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_layout_gallery.png",
          alt: "SmartArt layout gallery on the Design tab",
        },
      ],
    },

    {
      heading: "Applying SmartArt Styles and Colors",
      blocks: [
        {
          type: "paragraph",
          text:
            "The SmartArt Styles gallery offers pre-built visual treatments including flat, polished, and 3D looks that coordinate with your theme.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_styles_gallery.png",
          alt: "SmartArt Styles gallery",
        },
        {
          type: "paragraph",
          text:
            "Click Change Colors to choose a color variation that matches your presentation's palette.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_change_colors.png",
          alt: "Change Colors options for SmartArt",
        },
      ],
    },

    {
      heading: "Converting a Bulleted List to SmartArt",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you already have a bulleted text placeholder, you can convert it directly into SmartArt without starting over.",
        },
        {
          type: "paragraph",
          text:
            "Select the text placeholder, right-click, and choose Convert to SmartArt. Then select a layout from the mini gallery that appears.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_convert_from_text.png",
          alt: "Convert to SmartArt option in the right-click menu",
        },
        {
          type: "tip",
          text:
            "Converting a list to SmartArt is one of the fastest ways to make a plain slide look more polished.",
        },
      ],
    },

    {
      heading: "Completed SmartArt Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "A well-chosen SmartArt layout with consistent colors and readable text can replace several plain bullet-point slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-7/smartart/smartart_final_result.png",
          alt: "Completed SmartArt graphic on a slide",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which SmartArt category is most appropriate for showing the steps in a workflow?",
          options: [
            "Cycle",
            "Hierarchy",
            "Process",
            "Matrix",
          ],
          correctIndex: 2,
          explanation: "Process graphics show a sequence with direction, which is exactly what a workflow is. The arrows communicate order — something a bulleted list cannot do.",
          optionRationales: [
            "Cycle shows a repeating loop returning to its start, which misrepresents a linear workflow.",
            "Hierarchy shows levels of reporting or containment, as in an org chart.",
            "Correct. Process graphics show sequential steps with direction.",
            "Matrix shows parts of a whole arranged in quadrants.",
          ],
        },
        {
          type: "knowledge-check",
          question: "How do you add a new item to a SmartArt graphic using the Text Pane?",
          options: [
            "Click Insert → Shape",
            "Press Enter in the Text Pane to create a new bullet",
            "Drag a shape from the Format tab",
            "Type directly in the slide title",
          ],
          correctIndex: 1,
          explanation: "In the Text Pane, pressing Enter creates a new bullet and SmartArt adds a corresponding shape, re-laying out the whole graphic automatically.",
          optionRationales: [
            "Insert > Shape adds a free shape to the slide, which is not part of the SmartArt graphic.",
            "Correct. Enter in the Text Pane adds an item and SmartArt creates the shape for it.",
            "Shapes cannot be dragged in from the Format tab.",
            "The slide title is a separate placeholder and has no connection to the SmartArt.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Navigate to the slide with the bulleted list about the onboarding process.",
        "Select the text placeholder containing the bulleted items.",
        "Right-click and use Convert to SmartArt to turn it into a Process graphic.",
        "Open the Text Pane and add one more step at the end.",
        "Apply a SmartArt style that gives the shapes a polished, 3D appearance.",
        "Use Change Colors to apply an accent color palette from your theme.",
        "Resize the SmartArt graphic so it fills the lower portion of the slide without covering the title.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-7/smartart/smartart_final_result.png",
      alt: "Completed SmartArt challenge result",
    },
  ],

},

];
