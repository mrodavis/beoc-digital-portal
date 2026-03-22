import { Lesson } from "@/types/lesson";

export const powerpointModule5Lessons: Lesson[] = [

  {
    slug: "inserting-pictures",
    title: "Inserting Pictures",
    description:
      "Learn how to insert images from your computer and online sources, then resize and position them on your slides.",
    duration: "13 min",
    videoUrl: "https://www.youtube.com/embed/PLACEHOLDER",

    practiceFiles: [
      {
        name: "Inserting Pictures Practice File",
        url: "/practice/powerpoint/module-5/inserting-pictures/PowerPoint_InsertingPictures_Practice.pptx",
      },
    ],

    sections: [
      {
        heading: "Inserting Pictures into Slides",
        blocks: [
          {
            type: "paragraph",
            text:
              "Images help make presentations more engaging and visually appealing. PowerPoint allows you to insert pictures from your computer or online sources.",
          },
          {
            type: "image",
            src: "/images/powerpoint/module-5/inserting-pictures/inserting-pictures_command.png",
            alt: "Insert picture command",
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
          "Insert a picture from your device.",
          "Resize the image proportionally.",
          "Move the image to a new position on the slide.",
        ],
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