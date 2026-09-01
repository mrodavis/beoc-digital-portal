import { Lesson } from "@/types/lesson";

export const wordModule3Lessons: Lesson[] = [
{
  slug: "pictures-text-wrapping",
  title: "Pictures & Text Wrapping",
  description:
    "Learn how to insert images, resize them properly, and control how text wraps around pictures in Microsoft Word.",
  objectives: [
    "Insert images from your computer and from online sources",
    "Choose a text wrapping mode that matches how the image relates to the text",
    "Explain the difference between In Line with Text and the floating wrap modes",
    "Anchor an image so it stays with the content it illustrates",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/sqkEDw99szg",

  practiceFiles: [
    {
      name: "Word Pictures & Text Wrapping Practice File",
      url: "/practice/word/module-3/pictures-text-wrapping/word_picturestextwrapping_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Wrapping decides whether an image behaves like a letter or like a sticker",
       blocks: [
         {
           type: "scenario",
           role: "You are laying out a wellness newsletter at Lakeside Medical Associates.",
           text: "You place a photo beside a paragraph about flu season. You add two sentences higher up the page and the photo leaps to page three, landing beside an unrelated article about parking. You drag it back. You add another sentence. It jumps again.",
           task: "Understand anchoring and wrapping well enough that images stay where you put them.",
         },
         {
           type: "paragraph",
           text: "There are really only two behaviors, and everything else is a variation. In Line with Text treats the image as an enormous character — it sits in the line, moves when text moves, and cannot have text beside it. Every other mode makes the image floating: it sits in its own layer, text flows around it according to the mode you choose, and it is tied to a paragraph by an anchor.",
         },
         {
           type: "paragraph",
           text: "The anchor is the part almost nobody is taught, and it explains the jumping. A floating image is attached to a specific paragraph; when that paragraph moves to another page, the image follows. Turn on the anchor symbol display and you can see which paragraph owns the image — and drag the anchor to a different paragraph if it is attached to the wrong one.",
         },
         {
           type: "table",
           caption: "Wrap modes and what they are for",
           columns: [
             "Mode",
             "Behavior",
             "Use for",
           ],
           rows: [
             [
               "In Line with Text",
               "Sits in the text line like a character",
               "Icons, signatures, anything in a table cell",
             ],
             [
               "Square",
               "Text flows around the bounding box",
               "A photo beside a paragraph — the common newsletter case",
             ],
             [
               "Tight",
               "Text follows the image's actual shape",
               "Cut-out images with transparent backgrounds",
             ],
             [
               "Top and Bottom",
               "Text stops above and resumes below",
               "A wide figure that should own its horizontal band",
             ],
             [
               "Behind Text",
               "Image sits under the text",
               "Watermarks and background graphics",
             ],
             [
               "In Front of Text",
               "Image covers the text",
               "Callout arrows and annotations over a screenshot",
             ],
           ],
         },
         {
           type: "tip",
           text: "If an image will not stop moving, select it, open Layout Options, and choose 'Fix position on page.' The image stays put on that page regardless of text edits. Use it sparingly — it is right for a masthead and wrong for a figure that must stay next to its caption.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which text wrapping style keeps an image on the same line as surrounding text?",
          options: [
            "In Line with Text",
            "Square",
            "Tight",
            "Behind Text",
          ],
          correctIndex: 0,
          explanation: "In Line with Text places the image inside the text flow itself, as though it were a very large character. This is why text cannot appear beside it — the image occupies the whole line. Every other mode makes the image float in its own layer.",
          optionRationales: [
            "Correct. The image sits in the line like a character, moving with the text and preventing text from appearing beside it.",
            "Square floats the image and flows text around its rectangular bounding box, which places text beside it rather than on the same line.",
            "Tight floats the image and flows text around its actual contours, so it also places text alongside rather than in line.",
            "Behind Text floats the image on a lower layer, with text running over the top of it.",
          ],
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
  objectives: [
    "Crop an image to improve its composition, and crop to a shape",
    "Adjust brightness, contrast, and color to make an image usable",
    "Compress images to keep file size manageable",
    "Judge when a picture style helps and when it distracts",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/eC4bRXx9k6g?si=9Y7ajF4Ato7_DjyJ",

  practiceFiles: [
    {
      name: "Word Formatting Pictures Practice File",
      url: "/practice/word/module-3/formatting-pictures/word_formatpictures_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Cropping is editing, not trimming",
       blocks: [
         {
           type: "scenario",
           role: "You are building a staff directory at Lakeside Medical Associates.",
           text: "Eleven staff photos arrive from eleven different phones. Some are portrait, some landscape, some show the whole waiting room with a person somewhere in it. Dropped into the directory as-is, they make the page look like a scrapbook. The document is going to new patients.",
           task: "Crop and adjust the photos so they read as one consistent set.",
         },
         {
           type: "paragraph",
           text: "Cropping serves composition, not just size. Cropping every headshot to the same aspect ratio and framing each face in roughly the same position makes eleven unrelated photos read as one deliberate set. Resizing alone cannot do that — a wide photo scaled down is still a wide photo of a waiting room.",
         },
         {
           type: "paragraph",
           text: "Compression is the practical companion. A modern phone photo can be several megabytes; eleven of them produce a document too large to email. Picture Format > Compress Pictures reduces resolution to what the output actually needs. Use 220 ppi for something that will be printed, 150 ppi for on-screen reading, and 96 ppi for email. Always uncheck 'Apply only to this picture' when you want the whole document reduced.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Cropping hides the cropped-away area; it does not delete it by default. Anyone who receives the file can drag the crop handles back out and reveal what you removed. If you cropped to hide something — another patient in the background, a name badge, a screen with data on it — you must also run Compress Pictures with 'Delete cropped areas of pictures' checked. Otherwise you have concealed it visually while still shipping the pixels.",
         },
         {
           type: "tip",
           text: "Crop to Shape (Crop dropdown > Crop to Shape) trims the image to a circle or rounded rectangle in one step. Circular headshots are a quick, reliable way to make photos of mixed quality look coordinated.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What tool would you use to remove the outer edge of an image?",
          options: [
            "Corrections",
            "Artistic Effects",
            "Crop",
            "Picture Styles",
          ],
          correctIndex: 2,
          explanation: "Crop trims away the outer parts of an image so you keep only the region you want. Note that by default Word hides rather than discards the cropped area — use Compress Pictures with 'Delete cropped areas' to remove it for good.",
          optionRationales: [
            "Corrections adjusts sharpness, brightness, and contrast. It changes how the existing image looks, not how much of it is visible.",
            "Artistic Effects applies stylized filters such as pencil sketch or blur. It restyles the whole image rather than trimming it.",
            "Correct. Crop removes the outer edges of the image, letting you keep only the part you want to show.",
            "Picture Styles apply frames, shadows, and borders around the image. They decorate the edge rather than remove it.",
          ],
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
  objectives: [
    "Insert and resize shapes, and constrain proportions while drawing",
    "Add and format text inside a shape",
    "Apply fills, outlines, and effects consistently across several shapes",
    "Understand stacking order and how it affects what is visible",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/6OJRvC1C7-U?si=ecqD5EXs5t_XiW_e",

  practiceFiles: [
    {
      name: "Word Shapes Practice File",
      url: "/practice/word/module-3/shapes/word_shapes_practice.docx",
    },
  ],

  sections: [

    {
       heading: "Shapes are for showing relationships",
       blocks: [
         {
           type: "scenario",
           role: "You are documenting the referral process at Lakeside Medical Associates.",
           text: "The referral workflow has six steps and two decision points. Written as a paragraph, it takes four readings to follow. Drawn as six boxes with arrows and two diamonds, it takes about eight seconds — and new staff stop asking which form goes where.",
           task: "Use shapes to make a process visible instead of describing it.",
         },
         {
           type: "paragraph",
           text: "A diagram earns its place when the relationship between things is the point. A sequence, a hierarchy, a decision with branches — these are genuinely hard to hold in your head from prose and immediately obvious as a drawing. A shape added because the page looked plain earns nothing and costs the reader attention.",
         },
         {
           type: "paragraph",
           text: "Text goes directly inside a shape: click the shape and start typing. There is no need to lay a separate text box over it, and doing so creates two objects that must be moved together and inevitably drift apart. Text typed inside the shape moves with it, wraps within it, and stays centered automatically.",
         },
         {
           type: "table",
           caption: "Conventional shape meanings in a process diagram",
           columns: [
             "Shape",
             "Means",
             "Example",
           ],
           rows: [
             [
               "Rectangle",
               "A step or action",
               "Verify insurance eligibility",
             ],
             [
               "Diamond",
               "A decision with branches",
               "Referral requires prior authorization?",
             ],
             [
               "Rounded rectangle / oval",
               "Start or end point",
               "Referral received",
             ],
             [
               "Arrow",
               "Flow from one step to the next",
               "Connects each step in order",
             ],
             [
               "Parallelogram",
               "Input or output — a document or form",
               "Completed referral form",
             ],
           ],
         },
         {
           type: "tip",
           text: "Hold Shift while drawing to constrain proportions — a perfect circle from the oval tool, a true square from the rectangle, or a straight line locked to 15-degree increments. Hold Ctrl while dragging an existing shape to duplicate it, which is the fastest way to build six identical process boxes.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What must you do to add text inside a shape in Word?",
          options: [
            "Insert a text box first, then place it over the shape",
            "Click the shape and start typing",
            "Use the Insert > Text > Text Box command",
            "Right-click the shape and select Add Text from a dialog box",
          ],
          correctIndex: 1,
          explanation: "Shapes accept text directly — select the shape and type. The text becomes part of the shape, so it moves, resizes, and rotates with it. Overlaying a separate text box creates two objects that will eventually separate.",
          optionRationales: [
            "This works visually but creates two independent objects. Move the shape and the text box stays behind, which is why the approach falls apart in any document that gets edited.",
            "Correct. Click the shape and type — the text belongs to the shape and travels with it.",
            "That command inserts a standalone text box, which is a different object. It is the right tool for free-floating text, not for labeling a shape.",
            "Right-clicking a shape does offer Add Text on the context menu, but it opens no dialog — and simply clicking and typing achieves the same thing in one step.",
          ],
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
  objectives: [
    "Insert built-in and custom text boxes and position them precisely",
    "Format text box fills, borders, and internal margins",
    "Explain when a text box is the right tool and when a table or paragraph is better",
    "Keep text boxes accessible for screen reader users",
  ],
  duration: "10 min",
  videoUrl: "https://www.youtube.com/embed/LRGZEi7lSnA?si=HO6IryaHGHU_-Ss6",

  practiceFiles: [
    {
      name: "Word Text Boxes Practice File",
      url: "/practice/word/module-3/textboxes/word_textboxes_practice.docx",
    },
  ],

  sections: [

    {
       heading: "A text box breaks text out of the flow",
       blocks: [
         {
           type: "scenario",
           role: "You are designing a patient information sheet at Lakeside Medical Associates.",
           text: "The sheet needs a bordered box in the margin holding the after-hours number, visible no matter which paragraph a patient is reading. Ordinary paragraphs cannot do that — they sit in the flow and move as text is added above them.",
           task: "Use a text box to place content precisely, and know when not to reach for one.",
         },
         {
           type: "paragraph",
           text: "A text box is a container that floats independently of the main text flow, so you can put words anywhere on the page — in a margin, over an image, in a sidebar. That independence is the whole point, and also the reason to be careful with it.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Screen readers may read text boxes out of order, or skip them entirely, because they sit outside the main document flow. Never put essential information only in a text box. If the after-hours number matters, it also belongs in the body text — the box is emphasis, not the sole delivery mechanism. Run Review > Check Accessibility before distributing any document that uses text boxes heavily.",
         },
         {
           type: "table",
           columns: [
             "You want",
             "Use",
             "Why",
           ],
           rows: [
             [
               "A pull quote or sidebar",
               "Text box",
               "Needs to sit outside the flow, in a fixed place",
             ],
             [
               "Aligned rows and columns of data",
               "Table",
               "Tables handle alignment and stay accessible",
             ],
             [
               "An indented block quotation",
               "Paragraph with indents",
               "Stays in the flow and in the reading order",
             ],
             [
               "A label over a screenshot",
               "Text box, In Front of Text",
               "Must sit on top of an image at an exact spot",
             ],
           ],
         },
         {
           type: "tip",
           text: "Right-click a text box and choose Format Shape > Text Options > Text Box to set internal margins. The default padding is often too tight when you add a border — a little breathing room between the border and the text is most of what makes a box look professional rather than cramped.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is the purpose of a text box in Word?",
          options: [
            "To insert a table with formatted cells",
            "To apply a border to a paragraph",
            "To place text anywhere on the page, independent of the main text flow",
            "To create a hyperlink around a block of text",
          ],
          correctIndex: 2,
          explanation: "A text box floats independently of the main text flow, so you can position words anywhere on the page — a margin, a sidebar, or on top of an image. That independence is exactly why screen readers may miss it, so never let a text box be the only place important information appears.",
          optionRationales: [
            "Tables organize content into rows and columns within the text flow. That is a different tool with different behavior.",
            "Paragraph borders (Home > Borders) put a box around a paragraph while it stays in the flow. Useful, but it cannot be positioned freely.",
            "Correct. A text box floats independently of the text flow, so it can be placed anywhere on the page.",
            "Hyperlinks are created with Ctrl+K on selected text. A text box is a container, not a linking tool.",
          ],
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
  objectives: [
    "Align and distribute multiple objects precisely instead of by eye",
    "Control stacking order with Bring Forward and Send Backward",
    "Use the Selection pane to find and select objects that are hidden behind others",
    "Group objects so they move and scale as a unit",
  ],
  duration: "12 min",
  videoUrl: "https://www.youtube.com/embed/6nx5H8yhhWo?si=RWGfiWZfjcgClgPM",

  practiceFiles: [
    {
      name: "Word Align & Group Practice File",
      url: "/practice/word/module-3/align/word2016_align_order_group_img.docx",
    },
  ],

  sections: [

    {
       heading: "Aligning by eye is why layouts look almost right",
       blocks: [
         {
           type: "scenario",
           role: "You are finishing the referral workflow diagram at Lakeside Medical Associates.",
           text: "Six process boxes, positioned by dragging. On screen at 100% they look fine. Printed and pinned by the front desk, three of them are visibly two millimetres out of line, and the diagram reads as sloppy — which is what people then assume about the process it describes.",
           task: "Use the alignment tools so the layout is actually correct rather than approximately correct.",
         },
         {
           type: "paragraph",
           text: "Human eyes are good at detecting misalignment and bad at preventing it. Select several objects, then Shape Format > Align > Align Left, and Word puts every left edge on precisely the same coordinate. Align > Distribute Horizontally makes the gaps between them mathematically equal. Both take one click and are exact in a way dragging never is.",
         },
         {
           type: "paragraph",
           text: "Grouping is the follow-up. Once a diagram is aligned, select every piece and press Ctrl+G to group them into a single object. From then on, moving or resizing the group preserves every internal relationship. Without grouping, moving a six-box diagram means moving six objects and re-aligning them at the destination.",
         },
         {
           type: "tip",
           text: "The Selection pane (Home > Select > Selection Pane, or Alt+F10) lists every object on the page. It is the only practical way to select something completely hidden behind another object, and you can rename entries — 'Step 3 box' rather than 'Rectangle 47' — which makes a complex diagram far easier to maintain.",
         },
         {
           type: "worked-example",
           title: "Turning six dragged boxes into a clean diagram",
           task: "Take six roughly positioned process boxes and make them exactly aligned, evenly spaced, and movable as one object.",
           steps: [
             {
               move: "Click the first box, then Shift+click the other five.",
               why: "Shift+click adds to a selection rather than replacing it. Every alignment command works on the current selection, so getting all six selected is the prerequisite for everything that follows.",
             },
             {
               move: "Shape Format > Align > Align Left.",
               why: "Word moves every selected object so its left edge sits at the leftmost edge in the selection. This is exact to the pixel, which is the difference between a diagram that looks intentional and one that looks hand-placed.",
             },
             {
               move: "Shape Format > Align > Distribute Vertically.",
               why: "This equalizes the vertical gaps between all six. Distribution needs at least three objects to be meaningful, and it fixes the uneven spacing that dragging always produces.",
             },
             {
               move: "With all six still selected, press Ctrl+G to group.",
               why: "The diagram becomes one object. It can now be moved, resized, or wrapped as a unit without any internal drift. Ctrl+Shift+G ungroups again when you need to edit an individual box.",
             },
           ],
           result: "A precisely aligned, evenly distributed diagram that behaves as a single object.",
           takeaway: "Align, distribute, then group. Three commands convert an approximate layout into an exact one, and stop it from degrading the next time someone edits the page.",
         },
       ],
     },

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
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does grouping multiple objects do in Word?",
          options: [
            "Locks the objects so they cannot be moved",
            "Merges their fill colors together",
            "Applies the same style to all selected objects",
            "Lets you move and resize them together as one unit",
          ],
          correctIndex: 3,
          explanation: "Grouping combines several objects into one, so moving, resizing, or rotating the group applies to everything inside it and preserves the relationships between the pieces. Ctrl+Shift+G ungroups them again.",
          optionRationales: [
            "Grouping does not lock anything — the group moves freely. You are thinking of 'Fix position on page,' which is a layout option rather than grouping.",
            "Grouping leaves every object's fill exactly as it was. It changes how they are selected and moved, not how they look.",
            "Grouping applies no formatting at all. To style several objects identically, select them all and apply the style, which is a separate operation.",
            "Correct. The objects behave as a single unit, so the diagram keeps its internal alignment wherever you move it.",
          ],
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
