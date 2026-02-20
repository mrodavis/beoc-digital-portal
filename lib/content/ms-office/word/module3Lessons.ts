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
  slug: "text-boxes",
  title: "Text Boxes",
  description:
    "Learn how to insert built-in text boxes, draw custom text boxes, resize, move, format, apply styles, and change shapes in Microsoft Word.",
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/LRGZEi7lSnA?si=HO6IryaHGHU_-Ss6",

  practiceFiles: [
    {
      name: "Word Text Boxes Practice File",
      url: "/practice/word/module-3/textboxes/word_textboxes_practice.docx",
    },
  ],

  sections: [

    // ---------------- INSERT BUILT-IN ----------------
    {
      heading: "Inserting a Built-In Text Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and click Text Box. Choose from the built-in text box gallery to quickly add styled text areas to your document.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_insert_command.png",
          alt: "Insert text box command",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_insert_built_in.png",
          alt: "Built-in text box gallery",
        },
      ],
    },

    // ---------------- DRAW CUSTOM ----------------
    {
      heading: "Drawing a Custom Text Box",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select Draw Text Box from the Text Box dropdown. Click and drag anywhere in the document to create a custom-sized text box.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_insert_draw.png",
          alt: "Draw text box option",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_insert_drag.png",
          alt: "Dragging to create text box",
        },
      ],
    },

    // ---------------- TYPING & FORMATTING ----------------
    {
      heading: "Typing and Formatting Text",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click inside the text box and begin typing. Use the Home tab to change font style, size, color, and alignment.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_insert_format.png",
          alt: "Formatting text inside text box",
        },
      ],
    },

    // ---------------- MOVE & RESIZE ----------------
    {
      heading: "Moving and Resizing Text Boxes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click the border of the text box to select it. Drag from the border to move it. Use the corner sizing handles to resize proportionally.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_move2.png",
          alt: "Moving text box",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_resize.png",
          alt: "Resizing text box",
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
            "When a text box is selected, the Format tab appears. Use Shape Styles to quickly apply preset fill, outline, and effect combinations.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_shape_style_command.png",
          alt: "Shape styles command",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_shape_style_menu.png",
          alt: "Shape styles gallery",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_shape_style_result.png",
          alt: "Shape style applied to text box",
        },
      ],
    },

    // ---------------- EDIT SHAPE ----------------
    {
      heading: "Changing the Text Box Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can convert a text box into another shape. Go to Format → Edit Shape → Change Shape and select a new shape.",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_edit_shape_command.png",
          alt: "Edit shape command",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_edit_shape_menu.png",
          alt: "Change shape menu",
        },
        {
          type: "image",
          src: "/images/word/textboxes/textboxes_edit_shape_result.png",
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
            "After inserting, styling, resizing, and changing shapes, your final promotional layout might look like this:",
        },
        {
          type: "image",
          src: "/images/word/textboxes/word2016_textbox_img.png",
          alt: "Completed text box promotional layout",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert a built-in text box.",
        "Resize and position it over the image.",
        "Change the fill color to orange.",
        "Change the text to: Up to 75% off!",
        "Apply a Shape Style from the gallery.",
        "Change the text box shape to an Oval.",
      ],
    },
  ],
},
{
  slug: "align-order-group",
  title: "Align, Order & Group Objects",
  description:
    "Learn how to align objects, distribute spacing, change object order, flip images, group items, and use the Selection Pane in Microsoft Word.",
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/6nx5H8yhhWo?si=RWGfiWZfjcgClgPM",

  practiceFiles: [
    {
      name: "Word Align & Group Practice File",
      url: "/practice/word/module-3/align/word2016_align_order_group_img.docx",
    },
  ],

  sections: [

    // ---------------- ALIGN OBJECTS ----------------
    {
      heading: "Aligning Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select multiple objects by holding Ctrl and clicking each one. Go to Format → Align to align objects left, center, right, top, middle, or bottom.",
        },
        {
          type: "image",
          src: "/images/word/align/align_select.png",
          alt: "Selecting multiple objects",
        },
        {
          type: "image",
          src: "/images/word/align/align_command.png",
          alt: "Align command dropdown",
        },
        {
          type: "image",
          src: "/images/word/align/align_right_done.png",
          alt: "Objects aligned right",
        },
      ],
    },

    // ---------------- DISTRIBUTE ----------------
    {
      heading: "Distributing Objects Evenly",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use Distribute Horizontally or Distribute Vertically to evenly space selected objects.",
        },
        {
          type: "image",
          src: "/images/word/align/align_vertically_command.png",
          alt: "Distribute vertically command",
        },
        {
          type: "image",
          src: "/images/word/align/align_vertically_done.png",
          alt: "Objects evenly distributed",
        },
      ],
    },

    // ---------------- FLIP & ROTATE ----------------
    {
      heading: "Flipping and Rotating Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Rotate dropdown in the Format tab to rotate or flip objects horizontally or vertically.",
        },
        {
          type: "image",
          src: "/images/word/align/align_flip_command.png",
          alt: "Flip horizontal command",
        },
        {
          type: "image",
          src: "/images/word/align/align_flip_done.png",
          alt: "Object flipped horizontally",
        },
      ],
    },

    // ---------------- CHANGE ORDER ----------------
    {
      heading: "Changing Object Order",
      blocks: [
        {
          type: "paragraph",
          text:
            "When objects overlap, use Bring Forward, Send Backward, Send to Back, or Bring to Front to control layering.",
        },
        {
          type: "image",
          src: "/images/word/align/align_order_intro.png",
          alt: "Overlapping objects example",
        },
        {
          type: "image",
          src: "/images/word/align/align_order_sendbackward.png",
          alt: "Send backward command",
        },
        {
          type: "image",
          src: "/images/word/align/align_order_sendtoback.png",
          alt: "Send to back command",
        },
      ],
    },

    // ---------------- SELECTION PANE ----------------
    {
      heading: "Using the Selection Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "Open the Selection Pane (Format → Selection Pane) to view, rename, hide, or reorder objects easily.",
        },
        {
          type: "image",
          src: "/images/word/align/align_order_selectionpane_splat.png",
          alt: "Selection pane open",
        },
      ],
    },

    // ---------------- GROUPING ----------------
    {
      heading: "Grouping and Ungrouping Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Select multiple objects and click Group to combine them into one unit. Use Ungroup to separate them again.",
        },
        {
          type: "image",
          src: "/images/word/align/align_group_command.png",
          alt: "Group command",
        },
        {
          type: "image",
          src: "/images/word/align/align_group_done.png",
          alt: "Grouped objects",
        },
        {
          type: "image",
          src: "/images/word/align/align_ungroup_command.png",
          alt: "Ungroup command",
        },
        {
          type: "image",
          src: "/images/word/align/align_ungroup_done.png",
          alt: "Ungrouped objects",
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
            "After aligning, ordering, and grouping objects, your completed layout should look clean, balanced, and professional.",
        },
        {
          type: "image",
          src: "/images/word/align/word2016_align_order_group_img.png",
          alt: "Final aligned and grouped layout",
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Using the practice file, complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select the four service buttons and align them to the right.",
        "Distribute the buttons vertically so spacing is even.",
        "Group the four buttons together.",
        "Flip the banner image horizontally.",
        "Send the background image to the back.",
        "Use the Selection Pane to confirm object order.",
      ],
    },
    {
      type: "image",
      src: "/images/word/align/word2016_align_order_group_img.png",
      alt: "Completed alignment challenge result",
    },
  ],
},


  
];
