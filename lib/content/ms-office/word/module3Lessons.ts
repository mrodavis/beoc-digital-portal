import { Lesson } from "@/types/lesson";

export const wordModule3Lessons: Lesson[] = [
{
  slug: "pictures-text-wrapping",
  title: "Pictures & Text Wrapping",
  description:
    "Learn how to insert images, resize them properly, and control how text wraps around pictures in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/sqkEDw99szg",

  practiceFiles: [
    {
      name: "Word Pictures & Text Wrapping Practice File",
      url: "/practice/word/module-3/pictures-text-wrapping/word_picturestextwrapping_practice.docx",
    },
  ],

  sections: [

    // ---------------- INSERT FROM DEVICE ----------------
    {
      heading: "Inserting a Picture from Your Computer",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a picture from your computer, go to the Insert tab and click Pictures. Then choose This Device and select your image.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_insert.jpg",
          alt: "Insert picture from device",
        },
      ],
    },

    // ---------------- INSERT ONLINE ----------------
    {
      heading: "Inserting an Online Picture",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can also insert images from online sources. Click Insert → Online Pictures, search for a keyword, select an image, and click Insert.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_search.jpg",
          alt: "Online picture search window",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/pictures_onedrive.jpg",
          alt: "Online pictures category screen",
        },
      ],
    },

    // ---------------- RESIZING ----------------
    {
      heading: "Resizing a Picture",
      blocks: [
        {
          type: "paragraph",
          text:
            "To resize a picture, click the image and drag a corner handle. Dragging from the corner keeps the image proportional and prevents distortion.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/insert_picture_resize.png",
          alt: "Resize image using corner handles",
        },
      ],
    },

    // ---------------- WRAP TEXT INTRO ----------------
    {
      heading: "Understanding Text Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "By default, pictures are inserted In Line with Text. To freely move and position a picture, you must change its wrapping style.",
        },
        {
          type: "paragraph",
          text:
            "Select the image, then click the Layout Options icon or go to Picture Format → Wrap Text.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-23-34.png",
          alt: "Layout options button",
        },
      ],
    },

    // ---------------- WRAP OPTIONS ----------------
    {
      heading: "Wrap Text Options",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word provides several wrapping options: In Line with Text, Square, Tight, Through, Top and Bottom, Behind Text, and In Front of Text.",
        },
        {
          type: "paragraph",
          text:
            "Square wrapping is commonly used in newsletters because it allows text to flow neatly around the image.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-24-44.png",
          alt: "Wrap text menu options",
        },
      ],
    },

    // ---------------- SQUARE WRAP ----------------
    {
      heading: "Using Square Text Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "After selecting Square wrapping, drag the image to position it. The surrounding text will automatically adjust around the picture.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-26-17.png",
          alt: "Square wrapping applied",
        },
      ],
    },

    // ---------------- TOP AND BOTTOM ----------------
    {
      heading: "Using Top and Bottom Wrapping",
      blocks: [
        {
          type: "paragraph",
          text:
            "Top and Bottom wrapping places text above and below the image only. This is useful when separating content sections.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-27-19.png",
          alt: "Top and bottom wrapping example",
        },
      ],
    },

    // ---------------- MOVE VS FIX ----------------
    {
      heading: "Move with Text vs Fix Position",
      blocks: [
        {
          type: "paragraph",
          text:
            "When using wrapping styles, you can choose Move with Text or Fix Position on Page. Move with Text keeps the image connected to surrounding content.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-27-59.png",
          alt: "Move with text option",
        },
      ],
    },

    // ---------------- POSITION PRESETS ----------------
    {
      heading: "Using Position Presets",
      blocks: [
        {
          type: "paragraph",
          text:
            "Instead of manually dragging images, use Picture Format → Position to choose preset layout options.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-12_09-50-34.png",
          alt: "Position preset menu",
        },
      ],
    },

    // ---------------- ALIGN TOOLS ----------------
    {
      heading: "Aligning Images",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Picture Format → Align to align images precisely. Alignment guides help create professional layouts.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/2016-01-11_10-50-52.png",
          alt: "Align tools in picture format",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Result",
      blocks: [
        {
          type: "paragraph",
          text:
            "After inserting and wrapping images properly, your newsletter should have balanced spacing, clear structure, and professional image placement.",
        },
        {
          type: "image",
          src: "/images/word/pictures-text-wrapping/word2016_pictureswrapping2_img.png",
          alt: "Completed newsletter with wrapped images",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a picture from your computer.",
        "Apply Square text wrapping.",
        "Insert an online image.",
        "Apply Top and Bottom wrapping to one image.",
        "Use Position presets to adjust layout.",
        "Align the image using alignment tools.",
        "Ensure images are set to Move with Text.",
      ],
    },
  ],
},

{
  slug: "formatting-pictures",
  title: "Formatting Pictures",
  description:
    "Learn how to crop images, apply picture styles, add borders, adjust color and corrections, and compress images in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/eC4bRXx9k6g?si=9Y7ajF4Ato7_DjyJ",

  practiceFiles: [
    {
      name: "Word Formatting Pictures Practice File",
      url: "/practice/word/module-3/formatting-pictures/word_formatpictures_practice.docx",
    },
  ],

  sections: [

    // ---------------- INTRO ----------------
    {
      heading: "Introduction to Formatting Pictures",
      blocks: [
        {
          type: "paragraph",
          text:
            "Microsoft Word provides powerful tools for formatting pictures. You can crop images, apply artistic effects, adjust brightness and color, add borders, and compress pictures to reduce file size.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_adjust_all.png",
          alt: "Format tab with picture tools",
        },
      ],
    },

    // ---------------- CROP ----------------
    {
      heading: "Cropping an Image",
      blocks: [
        {
          type: "paragraph",
          text:
            "Cropping removes unwanted areas of an image. Select the image, go to the Format tab, and click Crop.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_crop_command2.png",
          alt: "Crop command",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_crop_handles2.png",
          alt: "Crop handles",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_crop_result.png",
          alt: "Cropped image result",
        },
      ],
    },

    // ---------------- CROP TO SHAPE ----------------
    {
      heading: "Crop to Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can crop a picture into a specific shape. Click Crop → Crop to Shape and select a shape such as circle, star, or banner.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_shape_command.png",
          alt: "Crop to shape menu",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_shape_result.png",
          alt: "Cropped to shape result",
        },
      ],
    },

    // ---------------- BORDERS ----------------
    {
      heading: "Adding a Picture Border",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can add a colored border to any image. Use Picture Border to choose a color, weight (thickness), and line style.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_border_command.png",
          alt: "Picture border options",
        },
      ],
    },

    // ---------------- CORRECTIONS ----------------
    {
      heading: "Using Corrections",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Corrections tool allows you to sharpen or soften an image and adjust brightness and contrast.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_adjust_corrections.png",
          alt: "Picture corrections menu",
        },
      ],
    },

    // ---------------- COLOR ----------------
    {
      heading: "Adjusting Color",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Color tool allows you to adjust saturation (vibrancy), tone (warm or cool), and recolor the entire image.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_adjust_color.png",
          alt: "Color adjustments menu",
        },
      ],
    },

    // ---------------- ARTISTIC EFFECTS ----------------
    {
      heading: "Applying Artistic Effects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Artistic Effects apply stylized filters such as pastel, watercolor, or glow. These should be used carefully in professional documents.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_adjust_artistic.png",
          alt: "Artistic effects gallery",
        },
      ],
    },

    // ---------------- PICTURE STYLES ----------------
    {
      heading: "Using Picture Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Picture Styles are predefined formats that quickly apply frames, shadows, and visual effects without manually adjusting settings.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_adjust_styles.png",
          alt: "Picture styles gallery",
        },
      ],
    },

    // ---------------- COMPRESS ----------------
    {
      heading: "Compressing Pictures",
      blocks: [
        {
          type: "paragraph",
          text:
            "Large images increase document size. Use Compress Pictures to reduce resolution and delete cropped areas.",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_compress_command.png",
          alt: "Compress pictures command",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/formatpics_compress_dialog.png",
          alt: "Compress pictures dialog box",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Result",
      blocks: [
        {
          type: "paragraph",
          text:
            "After applying picture styles, cropping to shapes, recoloring elements, and compressing images, your finished document should look like this:",
        },
        {
          type: "image",
          src: "/images/word/format-pictures/word2016_formatpictures_img.png",
          alt: "Completed formatted document example",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Change the sailboat image to the 'Simple Frame, White' style.",
        "Crop the sailboat image to the Double Wave shape.",
        "Recolor the anchor to Gold, Accent 2 Light.",
        "Apply an artistic effect to one image.",
        "Compress all pictures using the Email (96 ppi) setting.",
      ],
    },
  ],
},

{
  slug: "shapes",
  title: "Shapes",
  description:
    "Learn how to insert, resize, rotate, reorder, and format shapes in Microsoft Word, including fill, outline, styles, and special effects.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/6OJRvC1C7-U?si=ecqD5EXs5t_XiW_e",

  practiceFiles: [
    {
      name: "Word Shapes Practice File",
      url: "/practice/word/module-3/shapes/word_shapes_practice.docx",
    },
  ],

  sections: [

    // ---------------- INSERT SHAPES ----------------
    {
      heading: "Inserting a Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a shape, go to the Insert tab and click Shapes. Choose a shape from the dropdown menu, then click and drag on the page to draw it.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_insert_menu2.png",
          alt: "Insert shapes menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_insert_in_document3.png",
          alt: "Shape inserted in document",
        },
      ],
    },

    // ---------------- ADD TEXT ----------------
    {
      heading: "Adding Text to a Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can type directly inside most shapes. After inserting the shape, simply begin typing. Use the Home tab to adjust font, size, color, and alignment.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_insert_text.jpg",
          alt: "Typing inside a shape",
        },
      ],
    },

    // ---------------- RESIZE ROTATE ----------------
    {
      heading: "Resizing and Rotating Shapes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select a shape to display sizing handles. Drag corner handles to resize proportionally. Use the circular rotation handle at the top to rotate the shape.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_resize_select.jpg",
          alt: "Shape selected with handles",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_resize_handle.jpg",
          alt: "Resizing shape using handles",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_resize_rotate.jpg",
          alt: "Rotating a shape",
        },
        {
          type: "paragraph",
          text:
            "Some shapes include yellow adjustment handles. These allow you to modify specific parts of the shape, such as banner folds.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_resize_yellow.jpg",
          alt: "Yellow adjustment handle",
        },
      ],
    },

    // ---------------- ORDERING ----------------
    {
      heading: "Changing Shape Order",
      blocks: [
        {
          type: "paragraph",
          text:
            "When shapes overlap, you can control which appears in front. Right-click the shape and choose Bring to Front or Send to Back.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_order_menu.jpg",
          alt: "Bring to front or send to back menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_order_result.jpg",
          alt: "Shape ordering result",
        },
        {
          type: "paragraph",
          text:
            "For complex documents, use the Selection Pane (Format tab → Selection Pane) to select and manage overlapping shapes.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_order_selection_pane.jpg",
          alt: "Selection pane",
        },
      ],
    },

    // ---------------- SHAPE STYLES ----------------
    {
      heading: "Applying Shape Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Shape Styles on the Format tab to quickly apply preset combinations of fill, outline, and effects.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_style_command.png",
          alt: "Shape styles command",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_style_menu.png",
          alt: "Shape styles gallery",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_style_result.jpg",
          alt: "Shape style applied",
        },
      ],
    },

    // ---------------- SHAPE FILL ----------------
    {
      heading: "Changing Shape Fill",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Shape Fill to change the interior color of a shape. You can choose theme colors, gradients, textures, or select No Fill for transparency.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_fill_menu.png",
          alt: "Shape fill menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_fill_result.jpg",
          alt: "Shape fill result",
        },
      ],
    },

    // ---------------- SHAPE OUTLINE ----------------
    {
      heading: "Changing Shape Outline",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Shape Outline to change border color, thickness (weight), dashes, or remove the outline entirely.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_outline_menu.png",
          alt: "Shape outline menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_outline_lines.png",
          alt: "Outline weight options",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_outline_result.jpg",
          alt: "Outline result",
        },
      ],
    },

    // ---------------- SHAPE EFFECTS ----------------
    {
      heading: "Adding Shape Effects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select Shape Effects to add shadows, reflections, glow, bevel, or 3-D rotation effects.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_effects_menu.png",
          alt: "Shape effects menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_effects_result.jpg",
          alt: "Shape effects applied",
        },
        {
          type: "paragraph",
          text:
            "For advanced customization, open the Format Shape pane to fine-tune bevel size, depth, lighting, and more.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_effects_format.jpg",
          alt: "Format shape pane",
        },
      ],
    },

    // ---------------- CHANGE SHAPE ----------------
    {
      heading: "Changing to a Different Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can convert one shape into another without deleting it. Go to Format → Edit Shape → Change Shape and choose a new option.",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_edit_menu.png",
          alt: "Edit shape menu",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_edit_result.jpg",
          alt: "Changed shape result",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "After inserting, formatting, layering, and applying effects, your completed design might look like this:",
        },
        {
          type: "image",
          src: "/images/word/shapes/shapes_effects_result.jpg",
          alt: "Completed shapes design",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks. Your finished result should resemble the example shown below:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a Cloud shape on the right side of the page.",
        "Change the shape fill to white.",
        "Change the outline color to gray.",
        "Apply a Circle Bevel effect from Shape Effects.",
        "Insert a Sun shape and apply a Gold style.",
        "Send the Sun backward so it appears behind the Cloud.",
        "Adjust positioning so the sun peeks out from behind the cloud.",
      ],
    },
    {
      type: "image",
      src: "/images/word/shapes/word2016_shapes_img_edited2.png",
      alt: "Completed cloud and sun shapes example",
    },
  ],
},

{
  slug: "breaks",
  title: "Breaks (Page, Column & Section)",
  description:
    "Learn how to insert, manage, and delete page breaks, column breaks, and section breaks in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/78fvQ9Ks8DA",

  practiceFiles: [
    {
      name: "Word Breaks Practice File",
      url: "/practice/word/module-3/breaks/word_breaks_practice.docx",
    },
  ],

  sections: [

    // ---------------- INTRO TO BREAKS ----------------
    {
      heading: "Understanding Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Breaks allow you to control how content flows in your document. You can force text onto a new page, start a new column, or create a new section with different formatting.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_intro.png",
          alt: "Break types overview",
        },
      ],
    },

    // ---------------- PAGE BREAK ----------------
    {
      heading: "Inserting a Page Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "A page break forces content to begin on the next page. Go to the Insert tab and click Page Break, or press Ctrl + Enter.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_command.png",
          alt: "Insert page break command",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_done.png",
          alt: "Page break result",
        },
      ],
    },

    // ---------------- SECTION BREAK ----------------
    {
      heading: "Inserting a Section Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "Section breaks allow different formatting in different parts of the document, such as changing columns, margins, or orientation.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_command.png",
          alt: "Section break menu",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_added.png",
          alt: "Section break added",
        },
      ],
    },

    // ---------------- TYPES OF SECTION BREAKS ----------------
    {
      heading: "Types of Section Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "Word provides several types of section breaks: Next Page, Continuous, Even Page, and Odd Page. Continuous section breaks are useful when changing formatting without starting a new page.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_section_start.png",
          alt: "Section break options",
        },
      ],
    },

    // ---------------- COLUMN BREAK ----------------
    {
      heading: "Column Breaks",
      blocks: [
        {
          type: "paragraph",
          text:
            "A column break forces text to move to the next column. This is useful when working with multi-column layouts.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_other_intro.png",
          alt: "Column break option",
        },
      ],
    },

    // ---------------- SHOW HIDE ----------------
    {
      heading: "Viewing Breaks with Show/Hide",
      blocks: [
        {
          type: "paragraph",
          text:
            "Breaks are invisible by default. Click the Show/Hide ¶ button on the Home tab to display formatting marks and see where breaks are located.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_showhide.png",
          alt: "Show hide formatting marks",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_page_splat_showhide.png",
          alt: "Visible page break",
        },
      ],
    },

    // ---------------- DELETING BREAKS ----------------
    {
      heading: "Deleting a Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "To delete a break, place your cursor directly before it and press Delete. Removing a section break may change formatting in your document.",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_placeinsertion.png",
          alt: "Placing insertion point before break",
        },
        {
          type: "image",
          src: "/images/word/breaks/break_delete_done.png",
          alt: "Break removed result",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Result",
      blocks: [
        {
          type: "paragraph",
          text:
            "After inserting and managing breaks correctly, your document should have clean page transitions and properly formatted sections.",
        },
        {
          type: "image",
          src: "/images/word/breaks/word2016_breaks_img_combined.png",
          alt: "Completed breaks example",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a page break before the 'Monthly Revenue' section.",
        "Insert a section break before the 'Clients Overview' section.",
        "Change one section to a two-column layout.",
        "Use Show/Hide to display formatting marks.",
        "Delete an unnecessary page or section break.",
      ],
    },
  ],
},
{
  slug: "columns",
  title: "Columns",
  description:
    "Learn how to create, customize, and remove columns in Microsoft Word, including how to use column breaks and adjust column spacing.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/X1n2VG1yxFs?si=WLrIc_XyiWiQtSBB",

  practiceFiles: [
    {
      name: "Word Columns Practice File",
      url: "/practice/word/module-3/columns/word_columns_practice.docx",
    },
  ],

  sections: [

    // ---------------- INTRO TO COLUMNS ----------------
    {
      heading: "Adding Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "Columns allow text to flow from top to bottom in one column, then continue at the top of the next column—similar to newspapers or newsletters.",
        },
        {
          type: "paragraph",
          text:
            "To add columns, select your text, go to the Layout tab, and click Columns. Then choose Two, Three, or another preset option.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_select.png",
          alt: "Selecting text before applying columns",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_menu.png",
          alt: "Columns dropdown menu",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_add_result.png",
          alt: "Text displayed in two columns",
        },
      ],
    },

    // ---------------- COLUMN BREAKS ----------------
    {
      heading: "Inserting a Column Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "A column break forces text to move to the top of the next column immediately.",
        },
        {
          type: "paragraph",
          text:
            "Place your insertion point where you want the new column to begin. Then go to Layout → Breaks → Column.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_menu.png",
          alt: "Breaks menu showing column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_insert_callout.png",
          alt: "Inserting a column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_break_result.png",
          alt: "Column break result",
        },
      ],
    },

    // ---------------- CUSTOMIZING COLUMNS ----------------
    {
      heading: "Customizing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "To adjust column width or spacing, click Columns and choose More Columns.",
        },
        {
          type: "paragraph",
          text:
            "From the Columns dialog box, you can change the number of columns, adjust spacing, and add a line between columns.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_more_columns.png",
          alt: "More Columns dialog box",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_indent_markers.png",
          alt: "Column spacing and indent markers",
        },
      ],
    },

    // ---------------- REMOVING COLUMNS ----------------
    {
      heading: "Removing Columns",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove columns, select the text and go to Layout → Columns → One.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_menu.png",
          alt: "Columns menu showing One column",
        },
      ],
    },

    // ---------------- REMOVING COLUMN BREAKS ----------------
    {
      heading: "Removing a Column Break",
      blocks: [
        {
          type: "paragraph",
          text:
            "To delete a column break, turn on Show/Hide (¶) to reveal formatting marks. Then place your insertion point before the break and press Delete.",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_showhide.png",
          alt: "Show/Hide formatting marks",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_insertion.png",
          alt: "Selecting column break",
        },
        {
          type: "image",
          src: "/images/word/columns/columns_remove_breaks_result.png",
          alt: "Column break removed",
        },
      ],
    },

    // ---------------- FINAL RESULT ----------------
    {
      heading: "Final Result",
      blocks: [
        {
          type: "paragraph",
          text:
            "After applying columns and adjusting spacing properly, your newsletter should look clean, balanced, and professionally formatted.",
        },
        {
          type: "image",
          src: "/images/word/columns/word2016_columns2_img.png",
          alt: "Completed newsletter with two columns",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the provided practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Convert the Community Reminders section into two columns.",
        "Insert a column break after the first bullet.",
        "Adjust spacing between columns using More Columns.",
        "Add a line between columns.",
        "Remove the column break.",
        "Return the section to one column.",
      ],
    },
  ],
}


  
];
