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
      "Learn how to enhance images using picture styles, corrections, color adjustments, and artistic effects.",
    duration: "14 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Formatting Pictures Practice File",
        url: "/practice/powerpoint/module-5/formatting-pictures/PowerPoint_FormattingPictures_Practice.pptx",
      },
    ],

    sections: [
      {
        heading: "Enhancing Images",
        blocks: [
          {
            type: "paragraph",
            text:
              "PowerPoint provides tools to enhance images, including styles, color adjustments, and effects.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/formatting-pictures/formatting-pictures_styles.png",
            alt: "Picture styles in PowerPoint",
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
          "Apply a picture style.",
          "Adjust brightness or contrast.",
          "Apply a color effect.",
        ],
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