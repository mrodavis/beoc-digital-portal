import { Lesson } from "@/types/lesson";

export const powerpointModule5Lessons: Lesson[] = [

  {
  slug: "inserting-pictures",
  title: "Inserting Pictures",
  description:
    "Learn how to insert pictures from your computer, online sources, screenshots, and screen clippings, then resize and position them on your slides.",
  objectives: [
    "Insert pictures from your computer, online sources, and screen captures",
    "Use Screen Clipping to capture part of the screen",
    "Choose images that carry meaning rather than decorate",
    "Respect licensing when using images you did not create",
  ],
  duration: "13 min",
  videoUrl: "https://www.youtube.com/embed/I-xlLwC4ERc",

  practiceFiles: [
    {
      name: "Inserting Pictures Practice File",
      url: "/practice/powerpoint/module-5/inserting-pictures/Powerpoint_InsertingPictures_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "An image should do a job",
       blocks: [
         {
           type: "scenario",
           role: "You build a training deck at Lakeside Medical Associates.",
           text: "You add a stock photo of smiling people in scrubs to every slide because the slides looked bare. None of the photos relate to what the slides say. They add nothing, they cost the audience a moment of attention each time, and the file is now 40 MB.",
           task: "Use images that carry information, and leave slides alone when they do not need one.",
         },
         {
           type: "paragraph",
           text: "A picture earns its place when it shows something words handle poorly — what a form looks like, where a control sits, how a workflow branches, what a trend does. A screenshot of the actual EHR screen teaches. A stock photo of anonymous clinicians does not.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Images found through a web search are not free to use. Most are copyrighted, and using one in materials your organization distributes creates real exposure. Use PowerPoint's built-in stock images, photographs your practice owns, or sources with an explicit license that permits your use — and keep a note of where each came from.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Screenshots of clinical systems are a particular risk. Before capturing any screen showing patient data, use a training or demo environment, or fully redact the information — and redact by editing the image itself, not by covering it with a shape. A shape laid over a name in PowerPoint can simply be dragged aside by anyone who opens the file.",
         },
       ],
     },

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
          explanation: "Screen Clipping, on the Screenshot dropdown, dims the screen and lets you drag a rectangle around just the region you want, inserting that area alone.",
          optionRationales: [
            "Screenshot inserts a whole available window. Screen Clipping is the option on its menu for capturing a region.",
            "Correct. Screen Clipping captures only the part of the screen you drag around.",
            "Online Pictures searches the web for images rather than capturing your own screen.",
            "Insert Object embeds a file or another application's content, which is a different feature.",
          ],
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
    objectives: [
      "Crop, resize, and adjust images without distorting them",
      "Compress images to control presentation file size",
      "Remove a background to isolate a subject",
      "Add alt text so images are accessible",
    ],
    duration: "14 min",
    videoUrl: "https://www.youtube.com/embed/LD52XcAhL3s",

    practiceFiles: [
      {
        name: "Formatting Pictures Practice File",
        url: "/practice/powerpoint/module-5/formatting-pictures/Powerpoint_FormattingPictures_Practice.pptx",
      },
    ],

    sections: [

      {
         heading: "Never resize an image by dragging a side handle",
         blocks: [
           {
             type: "scenario",
             role: "You finish the orientation deck at Lakeside Medical Associates.",
             text: "You widen a staff photo by dragging the right-hand handle to fill the space. Everyone in the photo is now noticeably stretched. The file is also 60 MB, because eleven phone photos are embedded at full resolution, and it bounces from the practice's email.",
             task: "Resize proportionally and compress deliberately.",
           },
           {
             type: "paragraph",
             text: "Dragging a side or top handle changes one dimension only, which distorts the image — obvious and unflattering on any photo containing a face. Always drag a corner handle, which preserves the aspect ratio, and hold Shift if you want to be certain.",
           },
           {
             type: "paragraph",
             text: "Compression is the other habit. Picture Format > Compress Pictures reduces embedded images to a resolution appropriate for the output. For a projected presentation, 150 ppi is ample and will typically cut the file size by an order of magnitude. Uncheck 'Apply only to this picture' to compress the whole deck at once.",
           },
           {
             type: "callout",
             variant: "warning",
             text: "Check 'Delete cropped areas of pictures' when compressing. Cropping only hides the removed region — the pixels remain in the file, and anyone can drag the crop handles back out to reveal them. If you cropped a photo to remove a patient in the background, that person is still in the file until you delete the cropped areas.",
           },
           {
             type: "tip",
             text: "Add alt text to every meaningful image: right-click > Edit Alt Text. Describe what the image conveys rather than what it depicts. Mark purely decorative images as decorative so screen readers skip them.",
           },
         ],
       },

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
            explanation: "Compress Pictures reduces the resolution of embedded images to what the output actually needs, which is usually the largest single reduction available to a presentation's file size.",
            optionRationales: [
              "Picture Styles add frames and effects. They change appearance and can slightly increase file size.",
              "Cropping hides part of an image but leaves the hidden pixels in the file unless you also delete cropped areas during compression.",
              "Correct. Compress Pictures lowers embedded image resolution and can discard cropped regions.",
              "Corrections adjusts brightness and sharpness without reducing the stored data.",
            ],
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
    "Learn how to insert, format, resize, rotate, and customize shapes to make your slides more visually engaging and professional.",
  objectives: [
    "Insert, resize, and rotate shapes precisely",
    "Change one shape into another without rebuilding it",
    "Use shape styles consistently across a diagram",
    "Build simple diagrams that explain a process",
  ],
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/lwBSCkmhwJA",

  practiceFiles: [
    {
      name: "Shapes in PowerPoint Practice File",
      url: "/practice/powerpoint/module-5/shapes/Powerpoint_Shapes_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Shapes make relationships visible",
       blocks: [
         {
           type: "scenario",
           role: "You explain the referral workflow at Lakeside Medical Associates.",
           text: "Described in bullets, the workflow takes three slides and still leaves people unsure where the decision point sits. Drawn as boxes, a diamond, and arrows, it fits on one slide and needs no explanation at all.",
           task: "Use shapes where the relationship between steps is the actual content.",
         },
         {
           type: "paragraph",
           text: "Diagrams are worth building when structure is the point — a sequence, a branch, a hierarchy. Bullets flatten all of these into a list of equal-looking items, which is exactly what loses the structure.",
         },
         {
           type: "table",
           caption: "Handles on a selected shape",
           columns: [
             "Handle",
             "Appearance",
             "Does",
           ],
           rows: [
             [
               "Sizing",
               "White squares at corners and edges",
               "Resizes — use corners to keep proportions",
             ],
             [
               "Rotation",
               "Circular arrow above the shape",
               "Rotates; hold Shift for 15° increments",
             ],
             [
               "Adjustment",
               "Yellow dot",
               "Changes the shape's proportions, such as an arrow's head size",
             ],
             [
               "Connection",
               "Grey dots on the outline",
               "Anchors a connector so it follows the shape when moved",
             ],
           ],
         },
         {
           type: "tip",
           text: "Edit Shape > Change Shape converts an existing shape to a different one while keeping its size, position, text, and formatting. When a rectangle should have been a diamond, this is one command instead of rebuilding and re-styling it.",
         },
       ],
     },

    {
      heading: "Why Shapes Matter",
      blocks: [
        {
          type: "paragraph",
          text:
            "Shapes are more than decorative objects. In PowerPoint, they can be used to highlight important ideas, create visual emphasis, build diagrams, and make slides feel more polished and intentional.",
        },
        {
          type: "paragraph",
          text:
            "A simple shape can help direct attention to key content or add personality to a slide. In this lesson, shapes are used to support a wellness presentation by turning plain slides into more visually appealing ones.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Shapes are one of the fastest ways to add structure and visual interest to a slide without needing outside graphics.",
        },
      ],
    },

    {
      heading: "Inserting a Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "To insert a shape, go to the Insert tab and click Shapes. PowerPoint includes lines, rectangles, arrows, stars, banners, callouts, and many other built-in shape options.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_select_shape.png",
          alt: "Shapes menu on the Insert tab in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "After selecting a shape, click and drag on the slide to draw it. The size and proportions of the shape will depend on how far you drag.",
        },
        {
          type: "paragraph",
          text:
            "In this example, a sun shape is inserted onto the slide as a starting point for a visual callout.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_sizing_shape.png",
          alt: "A newly inserted sun shape on a PowerPoint slide",
        },
      ],
    },

    {
      heading: "Resizing and Rotating Shapes",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once a shape is inserted, you can resize it using the sizing handles around the border. Drag a corner handle to scale the shape larger or smaller.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_sizing_shape.png",
          alt: "Resizing a shape in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "To rotate a shape, drag the circular rotation handle above it. This allows you to angle the shape to better fit your design.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_rotate_shape.png",
          alt: "Rotating a shape in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Resizing and rotating are basic but important adjustments. Even a simple angle change can make a shape look more dynamic and eye-catching.",
        },
      ],
    },

    {
      heading: "Using the Yellow Adjustment Handle",
      blocks: [
        {
          type: "paragraph",
          text:
            "Some shapes include one or more yellow adjustment handles. These allow you to modify the appearance of the shape itself.",
        },
        {
          type: "paragraph",
          text:
            "For example, with the sun shape, the yellow handle changes the length and spacing of the rays. Other shapes may use this handle to alter corners, arrowheads, banner folds, or other design details.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_yellow_handles.png",
          alt: "Yellow adjustment handle on a shape in PowerPoint",
        },
        {
          type: "tip",
          text:
            "If a shape looks close to what you want but not quite right, check for a yellow handle before replacing it with a different shape.",
        },
      ],
    },

    {
      heading: "Applying Shape Styles",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint includes built-in Shape Styles that instantly apply combinations of fill colors, outlines, and effects.",
        },
        {
          type: "paragraph",
          text:
            "To use them, select the shape and go to the Drawing Tools Format tab. In the Shape Styles group, choose a preset style from the gallery.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_shape_style.png",
          alt: "Shape Styles gallery on the Format tab",
        },
        {
          type: "paragraph",
          text:
            "Applying a style is a quick way to improve the appearance of a shape without manually adjusting every setting.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_style_selected.png",
          alt: "A selected style applied to a sun shape",
        },
      ],
    },

    {
      heading: "Changing Shape Fill",
      blocks: [
        {
          type: "paragraph",
          text:
            "Shape Fill controls the interior color or appearance of a shape. You can apply a solid fill, gradient, texture, picture fill, or choose No Fill.",
        },
        {
          type: "paragraph",
          text:
            "To change the fill, select the shape, go to the Format tab, and click Shape Fill.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_select_color.png",
          alt: "Shape Fill color options in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "You can use one of the theme colors for consistency, or choose More Fill Colors for additional customization.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_more_fill_colors.png",
          alt: "More fill color options in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "In this example, changing the fill color helps transform the sun from a simple green shape into a brighter, more attention-grabbing graphic.",
        },
      ],
    },

    {
      heading: "Changing Shape Outline",
      blocks: [
        {
          type: "paragraph",
          text:
            "Shape Outline controls the border around a shape. You can change its color, thickness, dashes, or remove it entirely.",
        },
        {
          type: "paragraph",
          text:
            "To change the outline, select the shape and click Shape Outline on the Format tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_formatting_options.png",
          alt: "Shape Outline menu with color and weight options",
        },
        {
          type: "paragraph",
          text:
            "Increasing the outline weight makes the border thicker and more visible. Removing the outline creates a cleaner, flatter look.",
        },
        {
          type: "paragraph",
          text:
            "In this lesson, outline changes help define the shape and make it coordinate more effectively with the slide theme.",
        },
      ],
    },

    {
      heading: "Applying Shape Effects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Shape Effects add visual enhancements such as shadows, glows, reflections, bevels, and 3-D rotation.",
        },
        {
          type: "paragraph",
          text:
            "To apply an effect, select the shape, go to Shape Effects, and choose the effect you want to use.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_shape_effects.png",
          alt: "Shape Effects menu in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Glow effects are especially useful when you want a shape to stand out from the background.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_shape_options.png",
          alt: "Format Shape pane showing glow options",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Effects can make a shape pop, but too many effects at once can make a slide feel cluttered or dated. Use them on purpose.",
        },
      ],
    },

    {
      heading: "Editing and Changing a Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You are not locked into the original shape you insert. PowerPoint allows you to change a shape into a different one while keeping much of its formatting.",
        },
        {
          type: "paragraph",
          text:
            "Select the shape, go to Edit Shape, and choose Change Shape. Then select a new shape from the gallery.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_edit_shape.png",
          alt: "Edit Shape and Change Shape menu in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "This is useful when you like the color, size, and effects you already applied, but want the object to take on a different form.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_new_shape.png",
          alt: "A changed shape on the slide after using Change Shape",
        },
      ],
    },

    {
      heading: "Adding Text to a Shape",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can type directly inside most shapes. Simply select the shape and start typing, or right-click and choose Edit Text.",
        },
        {
          type: "paragraph",
          text:
            "Once text is added, you can format it using the usual font, color, size, alignment, and WordArt options.",
        },
        {
          type: "paragraph",
          text:
            "Adding text makes shapes especially useful for labels, callouts, banners, and highlighted messages on a slide.",
        },
      ],
    },

    {
      heading: "Completed Slide Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "After inserting a shape, adjusting its size, rotating it, changing its fill and outline, applying effects, and adding text, the slide becomes much more visually dynamic.",
        },
        {
          type: "paragraph",
          text:
            "In this example, a plain shape evolves into a bold visual element that reinforces the message of the slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/shapes/shapes_final_result.png",
          alt: "Completed slide showing a fully formatted shape with text",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question:
            "Which handle allows you to rotate a shape in PowerPoint?",
          options: [
            "The yellow adjustment handle",
            "The corner sizing handle",
            "The circular rotation handle above the shape",
            "The center point of the shape",
          ],
          correctIndex: 2,
          explanation: "The circular arrow handle above a selected shape rotates it. Holding Shift while dragging constrains rotation to 15-degree increments.",
          optionRationales: [
            "The yellow adjustment handle changes a shape's internal proportions, such as the thickness of an arrow.",
            "Corner sizing handles resize the shape while preserving its proportions.",
            "Correct. The circular handle above the shape rotates it.",
            "The center point is not a handle. Dragging inside a shape moves it.",
          ],
        },
        {
          type: "knowledge-check",
          question:
            "Which command lets you turn one shape into a different shape without starting over?",
          options: [
            "Shape Fill",
            "Shape Effects",
            "Picture Border",
            "Edit Shape → Change Shape",
          ],
          correctIndex: 3,
          explanation: "Edit Shape > Change Shape swaps the shape's geometry while preserving its size, position, text, and formatting — so you never have to rebuild and re-style it.",
          optionRationales: [
            "Shape Fill changes the interior color, not the geometry.",
            "Shape Effects adds shadows and reflections, leaving the shape itself unchanged.",
            "Picture Border applies to pictures rather than shapes.",
            "Correct. Edit Shape > Change Shape converts one shape into another, keeping everything else.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Download and open the practice presentation.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select slide 6.",
        "Insert a Folded Corner shape onto the slide.",
        "Rotate the shape so it is slightly angled.",
        "Change the shape fill to a gold or yellow color.",
        "Change the outline settings or remove the outline to improve the appearance.",
        "Apply a shadow or glow effect to make the shape stand out.",
        "Type a short wellness message inside the shape, such as Make stress relief a priority!",
        "Optional: Use Edit Shape → Change Shape to transform the object into a different shape while keeping the formatting.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-5/shapes/shapes_final_result.png",
      alt: "Final challenge result for the shapes lesson",
    },
  ],
},

{
  slug: "aligning-grouping-objects",
  title: "Aligning, Ordering, and Grouping Objects",
  description:
    "Learn how to align objects, distribute them evenly, group and ungroup items, control object layering, and rotate objects to create cleaner, more professional slides.",
  objectives: [
    "Align and distribute objects precisely",
    "Group objects so they move and scale together",
    "Use guides and smart guides for consistent placement",
    "Diagnose why the Group command is sometimes unavailable",
  ],
  duration: "13 min",
  videoUrl: "https://www.youtube.com/embed/2GyjYgr-tSM",

  practiceFiles: [
    {
      name: "Aligning & Grouping Practice File",
      url: "/practice/powerpoint/module-5/aligning-grouping/Powerpoint_Aligning_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Alignment is what the audience notices without noticing",
       blocks: [
         {
           type: "scenario",
           role: "You finish the workflow diagram at Lakeside Medical Associates.",
           text: "Five boxes positioned by dragging. Projected at three metres wide, the small misalignments become very visible, and the diagram reads as careless — which is not a good impression for a document describing a clinical process.",
           task: "Use alignment and distribution so the layout is exact, then group it so it stays that way.",
         },
         {
           type: "paragraph",
           text: "Select several objects and use Shape Format > Align. Align Left puts every left edge on the same coordinate; Distribute Horizontally makes the gaps mathematically equal. Both are exact, and projection magnifies every error that dragging leaves behind.",
         },
         {
           type: "paragraph",
           text: "Group (Ctrl+G) then binds the finished diagram into one object, so moving or resizing it preserves every internal relationship. Without grouping, moving a diagram means moving each piece and re-aligning at the destination.",
         },
         {
           type: "callout",
           variant: "info",
           text: "If Group is greyed out, the usual cause is that one selected item is a placeholder rather than a free object. Placeholders belong to the layout and cannot be grouped with ordinary shapes. Either build the diagram entirely from inserted shapes, or copy the placeholder's content into a text box first.",
         },
       ],
     },

    // --------------------------------------------------
    // WHY THIS LESSON MATTERS
    // --------------------------------------------------
    {
      heading: "Why Object Arrangement Matters",
      blocks: [
        {
          type: "paragraph",
          text:
            "A slide can have great colors, strong images, and useful content, but still look messy if the objects are poorly arranged. In PowerPoint, pictures, shapes, and text boxes can be aligned, spaced, layered, grouped, and rotated so the slide looks intentional instead of random.",
        },
        {
          type: "paragraph",
          text:
            "This lesson focuses on the arrangement tools that help you clean up your layouts. These tools are especially useful when working with multiple pictures or overlapping objects.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Design is not only about what you place on a slide. It is also about where you place it and how each object relates to the others.",
        },
      ],
    },

    // --------------------------------------------------
    // ALIGNING OBJECTS
    // --------------------------------------------------
    {
      heading: "Aligning Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "When you move objects manually, PowerPoint displays alignment guides and spacing guides to help you line them up. These guides are useful, but they are not always enough when several objects need to line up perfectly.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_single_object.jpeg",
          alt: "Pictures on a slide with alignment guides visible",
        },
        {
          type: "paragraph",
          text:
            "To align two or more objects, first select them together. Hold the Shift key while clicking each object so PowerPoint knows they should be treated as a set.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_align_two_or_more.jpeg",
          alt: "Selecting multiple pictures in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Once the objects are selected, open the Format tab and click the Align command. Then choose Align Selected Objects so PowerPoint aligns the objects relative to one another instead of to the slide itself.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_align_to_slide_option.png",
         
          alt: "Align Selected Objects option in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "After that, open the Align menu again and choose one of the six alignment options. These include Align Left, Align Center, Align Right, Align Top, Align Middle, and Align Bottom.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_align_bottom.png",
          alt: "Align Bottom option in the Align menu",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_align_middle.png",
          alt: "Align Middle option in the Align menu",
        },
        {
          type: "paragraph",
          text:
            "In this example, the pictures are aligned so they share a consistent position. This immediately makes the slide feel cleaner and easier to read.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_objects_aligned.jpeg",
          alt: "Objects aligned evenly on a slide",
        },
      ],
    },

    // --------------------------------------------------
    // ALIGN TO SLIDE
    // --------------------------------------------------
    {
      heading: "Aligning Objects to the Slide",
      blocks: [
        {
          type: "paragraph",
          text:
            "Sometimes you do not want objects aligned to each other. Instead, you want them aligned to a specific area of the slide, such as the top, middle, or bottom.",
        },
        {
          type: "paragraph",
          text:
            "To do this, open the Align menu and switch from Align Selected Objects to Align to Slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_align_to_slide_checked.png",
          alt: "Align to Slide checked in the Align menu",
        },
        {
          type: "paragraph",
          text:
            "Once Align to Slide is selected, choose an alignment command such as Align Middle or Align Bottom. PowerPoint will position the selected objects relative to the slide itself.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_objects_middle_aligned.jpeg",
          alt: "Objects aligned to the middle of the slide",
        },
        {
          type: "paragraph",
          text:
            "This is especially helpful when you want several objects to sit neatly across a slide without guessing at their vertical position.",
        },
        {
          type: "tip",
          text:
            "Use Align Selected Objects when objects should line up with each other. Use Align to Slide when objects should line up with the slide.",
        },
      ],
    },

    // --------------------------------------------------
    // DISTRIBUTING OBJECTS
    // --------------------------------------------------
    {
      heading: "Distributing Objects Evenly",
      blocks: [
        {
          type: "paragraph",
          text:
            "Even after objects are aligned, they may still have uneven spacing between them. Distribution commands solve that problem by placing equal distance between each selected object.",
        },
        {
          type: "paragraph",
          text:
            "If your objects are arranged in a row, use Distribute Horizontally. If they are arranged in a column, use Distribute Vertically.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_distribute_horizontal.png",
          alt: "Distribute Horizontally option in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "You can use distribution with either Align to Slide or Align Selected Objects, depending on whether the spacing should be based on the full slide or just the selected items.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_objects_distributed.jpeg",
          alt: "Pictures distributed evenly across a slide",
        },
        {
          type: "paragraph",
          text:
            "This is one of the fastest ways to make a row of pictures or icons look professionally arranged.",
        },
      ],
    },

    // --------------------------------------------------
    // GROUPING OBJECTS
    // --------------------------------------------------
    {
      heading: "Grouping Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "Grouping lets you combine multiple objects into one object. After grouping, the objects can be moved or resized together instead of one at a time.",
        },
        {
          type: "paragraph",
          text:
            "This is useful when you have finished arranging several objects and want them to stay together as a unit.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_group_ribbon.png",
          alt: "Group command on the PowerPoint Format tab",
        },
        {
          type: "paragraph",
          text:
            "Select the objects you want to group, then go to Format and choose Group. PowerPoint will place a single selection box around the entire set.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_grouped_objects.jpeg",
          alt: "Objects grouped into one selection box",
        },
        {
          type: "paragraph",
          text:
            "Once grouped, the pictures behave like one larger object. You can move them together, resize them together, and rotate them together.",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Placeholders cannot be grouped. If the Group command is disabled, one or more of the selected items may still be inside a placeholder.",
        },
        {
          type: "paragraph",
          text:
            "If that happens, reinsert the images using the Pictures command on the Insert tab instead of the placeholder picture icon.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_pictures_command.png",
          alt: "Pictures command on the Insert tab",
        },
      ],
    },

    // --------------------------------------------------
    // UNGROUPING OBJECTS
    // --------------------------------------------------
    {
      heading: "Ungrouping Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you need to edit one object inside a group, you can ungroup the set. This separates the objects so each item can be selected individually again.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_ungroup_command.png",
          alt: "Ungroup command in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "After ungrouping, the objects return to individual items and can be moved, resized, or reformatted independently.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_objects_ungroupped.jpeg",
          alt: "Objects after being ungrouped",
        },
      ],
    },

    // --------------------------------------------------
    // ORDERING OBJECTS
    // --------------------------------------------------
    {
      heading: "Ordering Objects and Understanding Layers",
      blocks: [
        {
          type: "paragraph",
          text:
            "When objects overlap on a slide, their order determines what appears in front and what appears behind. PowerPoint stacks objects in levels based on the order in which they were inserted.",
        },
        {
          type: "paragraph",
          text:
            "In this example, a large arrow shape sits on top of the pictures. That means it is currently on a higher layer than the images behind it.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_single_object_overlap.jpeg",
          alt: "Large arrow shape overlapping pictures",
        },
        {
          type: "paragraph",
          text:
            "To change the order by one level, select the object and use Bring Forward or Send Backward on the Format tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_send_backward.png",
          alt: "Send Backward command on the Format tab",
        },
        {
          type: "paragraph",
          text:
            "This is useful when you want gradual control over layering and only need to move the object one step.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_objects_reordered.jpeg",
          alt: "Object reordered behind some slide content",
        },
      ],
    },

    // --------------------------------------------------
    // SEND TO BACK / SELECTION PANE
    // --------------------------------------------------
    {
      heading: "Sending Objects to the Back and Using the Selection Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "If an object needs to move behind several other objects, it is usually faster to use the drop-down menu and select Send to Back instead of clicking Send Backward multiple times.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_send_to_back.png",
          alt: "Send to Back option in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "After sending the arrow backward, the pictures become more visible and the design begins to make more sense visually.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_reordered_send_back.jpeg",
          alt: "Arrow moved behind pictures on a slide",
        },
        {
          type: "paragraph",
          text:
            "When several objects overlap, selecting the right one can become difficult. The Selection Pane gives you a list of all objects on the slide so you can select and reorder them more precisely.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_selection_pane.jpeg",
          alt: "Selection Pane showing slide objects",
        },
        {
          type: "paragraph",
          text:
            "This is especially helpful in layered slides where clicking directly on the object is difficult.",
        },
      ],
    },

    // --------------------------------------------------
    // ROTATING OBJECTS
    // --------------------------------------------------
    {
      heading: "Rotating Objects",
      blocks: [
        {
          type: "paragraph",
          text:
            "In addition to aligning and ordering objects, PowerPoint also allows you to rotate them. Rotation is useful when an image or shape needs to face a different direction or better match the design of the slide.",
        },
        {
          type: "paragraph",
          text:
            "Select the object, go to the Format tab, click Rotate, and choose the option you want. You can rotate left, rotate right, or flip the object horizontally or vertically.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_rotate.jpeg",
          alt: "Rotate menu in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "In this lesson, the food image is rotated so it better fits the final slide layout and makes the arrangement feel more dynamic.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_object_rotated.jpeg",
          alt: "Object rotated on the slide",
        },
      ],
    },

    // --------------------------------------------------
    // COMPLETED EXAMPLES
    // --------------------------------------------------
    {
      heading: "Completed Slide Examples",
      blocks: [
        {
          type: "paragraph",
          text:
            "Once alignment, distribution, grouping, ordering, and rotation are all working together, the slide becomes much cleaner and easier to follow.",
        },
        {
          type: "paragraph",
          text:
            "This example shows how orderly spacing and correct layering make the design feel more intentional and professional.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-5/aligning-grouping/alignment_final_result.jpeg",
          alt: "Completed final slide after aligning and arranging objects",
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
            "Which PowerPoint command spaces selected objects evenly across a slide?",
          options: [
            "Align Middle",
            "Distribute Horizontally",
            "Send Backward",
            "Group",
          ],
          correctIndex: 1,
          explanation: "Distribute Horizontally makes the horizontal gaps between selected objects equal. It needs at least three objects to be meaningful, since it adjusts the ones between the outermost two.",
          optionRationales: [
            "Align Middle lines objects up on a shared horizontal axis. It aligns rather than spaces them.",
            "Correct. Distribute Horizontally equalizes the horizontal spacing between the selected objects.",
            "Send Backward changes stacking order, which controls what sits on top of what.",
            "Group combines objects into one unit but does not reposition them.",
          ],
        },
        {
          type: "knowledge-check",
          question:
            "If the Group command is unavailable, what is a likely reason?",
          options: [
            "The objects are too large",
            "The file is read-only",
            "One of the selected objects is inside a placeholder",
            "You must rotate the objects first",
          ],
          correctIndex: 2,
          explanation: "Placeholders belong to the slide layout rather than to the slide, so they cannot be grouped with ordinary shapes. Selecting one alongside free shapes disables Group.",
          optionRationales: [
            "Object size has no effect on whether Group is available.",
            "A read-only file disables editing altogether, not the Group command specifically.",
            "Correct. A placeholder in the selection prevents grouping, because placeholders belong to the layout.",
            "Rotation is unrelated to grouping.",
          ],
        },
      ],
    },

  ],

  // --------------------------------------------------
  // CHALLENGE (MATCHED TO LEARNFREE FLOW)
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
        "On the last slide, select the picture of the hamburger and Rotate Left 90°.",
        "Hold down the Shift key and select all three food pictures. Make sure you do not select the green diamonds.",
        "Check Align to Slide under the Align command, then Align to Middle.",
        "With the pictures still selected, Distribute Horizontally.",
        "Select the first green diamond and send it behind the breakfast picture.",
        "When you're finished, your slide should look like this:",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-5/aligning-grouping/alignment_final_result.jpeg",
      alt: "Final challenge result for aligning, ordering, and grouping objects",
    },
  ],
},

];