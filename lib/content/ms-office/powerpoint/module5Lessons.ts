import { Lesson } from "@/types/lesson";

export const powerpointModule5Lessons: Lesson[] = [

  {
  slug: "inserting-pictures",
  title: "Inserting Pictures",
  description:
    "Learn how to insert pictures from your computer, online sources, screenshots, and screen clippings, then resize and position them on your slides.",
  duration: "13 min",
  videoUrl: "https://www.youtube.com/embed/I-xlLwC4ERc",

  practiceFiles: [
    {
      name: "Inserting Pictures Practice File",
      url: "/practice/powerpoint/module-5/inserting-pictures/Powerpoint_InsertingPictures_Practice.pptx",
    },
  ],

  sections: [

    // --------------------------------------------------
    // WHY PICTURES MATTER
    // --------------------------------------------------
    {
      heading: "Why Pictures Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "Pictures play a critical role in making presentations more engaging and easier to understand. Instead of relying only on text, visuals help communicate ideas faster and more clearly.",
        },
        {
          type: "paragraph",
          text:
            "In professional presentations, images are used to reinforce key points, illustrate concepts, and maintain audience attention.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "A strong presentation doesn’t just tell—it shows. Use visuals to support your message, not replace it.",
        },
      ],
    },

    // --------------------------------------------------
    // INSERT FROM COMPUTER
    // --------------------------------------------------
    {
      heading: "Inserting a Picture from Your Computer",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a picture saved on your computer, go to the Insert tab and select Pictures from the Images group.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_insert.png",
          alt: "Insert Pictures command",
        },
        {
          type: "paragraph",
          text:
            "This opens a file browser where you can locate and select your image.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_onedrive_pics.jpeg",
          alt: "Selecting an image from computer",
        },
        {
          type: "paragraph",
          text:
            "Once inserted, the image will appear directly on your slide and can be adjusted as needed.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_inserted_picture.png",
          alt: "Inserted image on slide",
        },
      ],
    },

    // --------------------------------------------------
    // PLACEHOLDERS
    // --------------------------------------------------
    {
      heading: "Using Content Placeholders",
      blocks: [
        {
          type: "paragraph",
          text:
            "Many slide layouts include content placeholders that allow you to insert images quickly without using the Ribbon.",
        },
        {
          type: "paragraph",
          text:
            "Clicking the picture icon inside the placeholder lets you insert an image while keeping it aligned with the slide layout.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_placeholder_insert.png",
          alt: "Insert picture from placeholder",
        },
        {
          type: "paragraph",
          text:
            "You can also insert online images directly from the placeholder using the Online Pictures icon.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_online_placeholder.png",
          alt: "Online pictures placeholder icon",
        },
      ],
    },

    // --------------------------------------------------
    // ONLINE PICTURES (FIXED FLOW)
    // --------------------------------------------------
    {
      heading: "Inserting Online Pictures",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you don’t already have an image saved, PowerPoint allows you to search for pictures online directly within the application.",
        },
        {
          type: "paragraph",
          text:
            "Go to the Insert tab and select Online Pictures to begin searching.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_online_pics_ribbon.png",
          alt: "Online Pictures command",
        },
        {
          type: "paragraph",
          text:
            "A search window will appear where you can browse categories or type keywords to find specific images.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_online_pictures.jpeg",
          alt: "Online picture categories",
        },
        {
          type: "paragraph",
          text:
            "For example, searching for a topic like 'exercise' or 'healthy food' will return relevant images.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_online_pics_selection.jpeg",
          alt: "Search results",
        },
        {
          type: "paragraph",
          text:
            "Select the image you want and click Insert. PowerPoint will automatically place it on your slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_online_displayed.png",
          alt: "Inserted online picture",
        },
        {
          type: "tip",
          text:
            "The more specific your search term, the better your results.",
        },
      ],
    },

    // --------------------------------------------------
    // RESIZE / MOVE / ROTATE
    // --------------------------------------------------
    {
      heading: "Resizing, Moving, and Rotating Pictures",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once a picture is inserted, you can adjust it to fit your slide layout.",
        },
        {
          type: "paragraph",
          text:
            "To move an image, click and drag it to a new position.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_move_picture.png",
          alt: "Moving image",
        },
        {
          type: "paragraph",
          text:
            "To resize an image, drag one of the corner handles. This keeps the image proportional.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_resize_picture.png",
          alt: "Resizing image",
        },
        {
          type: "paragraph",
          text:
            "To rotate an image, drag the circular rotation handle above the picture.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_rotate_picture.png",
          alt: "Rotating image",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Avoid stretching images using side handles—this will distort the picture.",
        },
      ],
    },

    // --------------------------------------------------
    // SCREENSHOT
    // --------------------------------------------------
    {
      heading: "Inserting Screenshots",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint allows you to capture screenshots of open windows directly into your slide.",
        },
        {
          type: "paragraph",
          text:
            "Go to Insert → Screenshot and choose from available windows.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_screenshot.png",
          alt: "Screenshot command",
        },
        {
          type: "paragraph",
          text:
            "The selected window will be inserted onto your slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_screenshot_displayed.png",
          alt: "Screenshot inserted",
        },
      ],
    },

    // --------------------------------------------------
    // SCREEN CLIPPING
    // --------------------------------------------------
    {
      heading: "Using Screen Clipping",
      blocks: [
        {
          type: "paragraph",
          text:
            "Screen Clipping allows you to capture a specific portion of your screen instead of an entire window.",
        },
        {
          type: "paragraph",
          text:
            "Select Screen Clipping, then click and drag to capture only the area you need.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_screen_clipping.png",
          alt: "Screen clipping tool",
        },
        {
          type: "paragraph",
          text:
            "This is especially useful when you want to highlight a specific part of a website or application.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_screen_clipping_displayed.png",
          alt: "Screen clipping result",
        },
      ],
    },

    // --------------------------------------------------
    // FINAL EXAMPLES
    // --------------------------------------------------
    {
      heading: "Completed Slide Examples",
      blocks: [
        {
          type: "paragraph",
          text:
            "By combining images, layout positioning, and resizing, you can create visually appealing slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_final_result.jpeg",
          alt: "Final slide example",
        },
      ],
    },

    // --------------------------------------------------
    // KNOWLEDGE CHECK
    // --------------------------------------------------
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question:
            "Which tool allows you to capture only part of your screen?",
          options: [
            "Screenshot",
            "Screen Clipping",
            "Online Pictures",
            "Insert Object",
          ],
          correctIndex: 1,
        },
      ],
    },

  ],

  // --------------------------------------------------
  // 🔥 FIXED CHALLENGE (EXACT MATCH)
  // --------------------------------------------------
  challenge: [
    {
      type: "paragraph",
      text: "Download and open the practice presentation.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select the last slide.",
        "Use the Online Pictures command to insert a picture of your favorite form of exercise.",
        "Resize your picture so it takes up a majority of the slide without covering the title.",
        "When you're finished, your slide should look something like this:",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_challenge_example.jpeg",
      alt: "Exercise slide result",
    },
    {
      type: "list",
      ordered: true,
      start: 6,
      items: [
        "Insert a new slide with a Title Only layout.",
        "In the Title placeholder, type Learn More at Fitness.gov.",
        "Open https://odphp.health.gov/pcfsn in your browser, then insert a screen clipping of the website onto the slide you just created.",
        "When you're finished, your slide should look something like this:",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_final_result.jpeg",
      alt: "Exercise slide result",
    },
  ],
},

  {
    slug: "formatting-pictures",
    title: "Formatting Pictures",
    description:
      "Learn how to enhance and customize images using picture styles, corrections, color adjustments, artistic effects, cropping, and compression tools in PowerPoint.",
    duration: "14 min",
    videoUrl: "https://www.youtube.com/embed/LD52XcAhL3s",

    practiceFiles: [
      {
        name: "Formatting Pictures Practice File",
        url: "/practice/powerpoint/module-5/formatting-pictures/Powerpoint_FormattingPictures_Practice.pptx",
      },
    ],

    sections: [

      // --------------------------------------------------
      // INTRO
      // --------------------------------------------------
      {
        heading: "Introduction to Formatting Pictures",
        blocks: [
          {
            type: "paragraph",
            text:
              "PowerPoint provides a wide range of tools that allow you to enhance and customize your images. These tools help you improve clarity, adjust colors, apply styles, and make your visuals more professional.",
          },
          {
            type: "paragraph",
            text:
              "All picture formatting tools are located under the Picture Tools Format tab, which appears when you select an image.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_ribbon_command.png",
            alt: "Picture Tools Format tab",
          },
          {
            type: "callout",
            variant: "info",
            text:
              "Think of formatting as polishing your image—this is where your presentation starts to look professional instead of basic.",
          },
        ],
      },

      // --------------------------------------------------
      // CROP
      // --------------------------------------------------
      {
        heading: "Cropping Pictures",
        blocks: [
          {
            type: "paragraph",
            text:
              "Cropping allows you to remove unwanted parts of an image so you can focus on the most important content.",
          },
          {
            type: "paragraph",
            text:
              "Select your image, go to the Format tab, and click Crop. Drag the black handles to trim the image.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_crop.png",
            alt: "Crop tool",
          },
          {
            type: "paragraph",
            text:
              "Once you’re done adjusting, click Crop again to apply the changes.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_image_adjustments.png",
            alt: "Cropped image result",
          },
        ],
      },

      // --------------------------------------------------
      // CROP TO SHAPE
      // --------------------------------------------------
      {
        heading: "Cropping to a Shape",
        blocks: [
          {
            type: "paragraph",
            text:
              "You can also crop images into shapes to better match your slide design.",
          },
          {
            type: "paragraph",
            text:
              "Click the Crop dropdown, choose Crop to Shape, and select a shape like a rounded rectangle or circle.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_crop_to_shape.png",
            alt: "Crop to shape menu",
          },
          {
            type: "paragraph",
            text:
              "This instantly transforms your image into the selected shape.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_image_cropped_to_shape.png",
            alt: "Cropped to shape result",
          },
        ],
      },

      // --------------------------------------------------
      // BORDERS
      // --------------------------------------------------
      {
        heading: "Adding Picture Borders",
        blocks: [
          {
            type: "paragraph",
            text:
              "Borders help your images stand out and match your presentation’s theme.",
          },
          {
            type: "paragraph",
            text:
              "Select your image, click Picture Border, then choose a color, thickness, or style.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_picture_border.png",
            alt: "Picture border options",
          },
          {
            type: "paragraph",
            text:
              "You can customize the border to match your slide’s color scheme.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_picture_border_example.png",
            alt: "Border applied example",
          },
        ],
      },

      // --------------------------------------------------
      // CORRECTIONS
      // --------------------------------------------------
      {
        heading: "Image Corrections",
        blocks: [
          {
            type: "paragraph",
            text:
              "Corrections allow you to adjust brightness, contrast, and sharpness to improve image clarity.",
          },
          {
            type: "paragraph",
            text:
              "Use this when your image looks too dark, too bright, or slightly blurry.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_corrections.png",
            alt: "Corrections menu",
          },
        ],
      },

      // --------------------------------------------------
      // COLOR
      // --------------------------------------------------
      {
        heading: "Adjusting Image Color",
        blocks: [
          {
            type: "paragraph",
            text:
              "The Color tool allows you to modify saturation, tone, and recolor your image.",
          },
          {
            type: "paragraph",
            text:
              "This is useful when you want to match your image with your presentation’s theme or create a specific mood.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_color.png",
            alt: "Color adjustments",
          },
        ],
      },

      // --------------------------------------------------
      // ARTISTIC EFFECTS
      // --------------------------------------------------
      {
        heading: "Applying Artistic Effects",
        blocks: [
          {
            type: "paragraph",
            text:
              "Artistic Effects allow you to transform your image into stylized versions like sketches, paintings, or blur effects.",
          },
          {
            type: "paragraph",
            text:
              "These are best used sparingly to enhance visual storytelling without distracting your audience.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_artistic_effects.png",
            alt: "Artistic effects options",
          },
        ],
      },

      // --------------------------------------------------
      // PICTURE STYLES
      // --------------------------------------------------
      {
        heading: "Using Picture Styles",
        blocks: [
          {
            type: "paragraph",
            text:
              "Picture Styles provide quick, pre-designed visual enhancements like frames, shadows, and reflections.",
          },
          {
            type: "paragraph",
            text:
              "These styles can instantly upgrade the appearance of your image with just one click.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_picture_styles.png",
            alt: "Picture styles gallery",
          },
        ],
      },

      // --------------------------------------------------
      // COMPRESS
      // --------------------------------------------------
      {
        heading: "Compressing Pictures",
        blocks: [
          {
            type: "paragraph",
            text:
              "Large images can make your presentation file size too big, especially when sharing via email.",
          },
          {
            type: "paragraph",
            text:
              "PowerPoint allows you to compress images to reduce file size by lowering resolution and removing cropped areas.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_compress_pictures.png",
            alt: "Compress pictures command",
          },
          {
            type: "paragraph",
            text:
              "For sharing presentations, choosing Email resolution creates the smallest file size.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_compress_email.png",
            alt: "Compression settings",
          },
        ],
      },

      // --------------------------------------------------
      // FINAL RESULT
      // --------------------------------------------------
      {
        heading: "Completed Slide Example",
        blocks: [
          {
            type: "paragraph",
            text:
              "By combining cropping, styles, borders, and adjustments, you can transform basic images into polished, professional visuals.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_final_result.jpeg",
            alt: "Final formatted slide",
          },
        ],
      },

      // --------------------------------------------------
      // KNOWLEDGE CHECK
      // --------------------------------------------------
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question:
              "Which tool helps reduce presentation file size?",
            options: [
              "Picture Styles",
              "Crop",
              "Compress Pictures",
              "Corrections",
            ],
            correctIndex: 2,
          },
        ],
      },

    ],

    // --------------------------------------------------
    // CHALLENGE (FROM SOURCE PDF)
    // --------------------------------------------------
    challenge: [
      {
        type: "paragraph",
        text: "Download and open the practice presentation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "On slide 7, select the treadmill picture.",
          "Crop the picture so it's slightly smaller and the treadmills take up a majority of the frame.",
          "Change the style of the picture.",
          "Apply a correction to the picture (for example, increase the brightness).",
          "Compress your picture and choose Email as your target output.",
          "When you're finished, your slide should look something like this:",
        ],
      },
      {
        type: "image",
        src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_final_result.jpeg",
        alt: "Final challenge result",
      },
    ],
  },

  {
    slug: "shapes-in-powerpoint",
    title: "Shapes in PowerPoint",
    description:
      "Learn how to insert shapes, format them, and use them to enhance slide design.",
    duration: "9 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Shapes Practice File",
        url: "/practice/powerpoint/module-5/shapes/PowerPoint_Shapes_Practice.pptx",
      },
    ],

    sections: [
      {
        heading: "Working with Shapes",
        blocks: [
          {
            type: "paragraph",
            text:
              "Shapes can be used to highlight information, create diagrams, and improve slide layouts.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/shapes/shapes_insert.png",
            alt: "Insert shapes menu",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Insert a shape.",
          "Change the fill color.",
          "Add text inside the shape.",
        ],
      },
    ],
  },

  {
    slug: "aligning-grouping-objects",
    title: "Aligning, Ordering, and Grouping Objects",
    description:
      "Learn how to align objects, control their layering, and group them for easier manipulation.",
    duration: "13 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Aligning & Grouping Practice File",
        url: "/practice/powerpoint/module-5/aligning-grouping/PowerPoint_AligningGrouping_Practice.pptx",
      },
    ],

    sections: [
      {
        heading: "Aligning Objects",
        blocks: [
          {
            type: "paragraph",
            text:
              "Alignment tools help you position objects precisely and create clean, professional layouts.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/aligning-grouping/align_objects.png",
            alt: "Align objects in PowerPoint",
          },
        ],
      },
    ],

    challenge: [
      {
        type: "paragraph",
        text: "Complete the following tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Align multiple objects.",
          "Change object order (bring forward/send backward).",
          "Group objects together.",
        ],
      },
    ],
  },

];