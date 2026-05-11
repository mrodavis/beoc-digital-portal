import { Lesson } from "@/types/lesson";

export const powerpointModule7Lessons: Lesson[] = [

{
  slug: "inserting-tables",
  title: "Inserting Tables",
  description:
    "Learn how to create and insert tables in PowerPoint, add and remove rows and columns, merge cells, and apply table styles to organize data clearly.",
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
