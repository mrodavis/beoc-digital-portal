import { Lesson } from "@/types/lesson";

export const powerpointModule3Lessons: Lesson[] = [

{
slug: "applying-themes",
title: "Applying Themes",
description:
"Learn how to quickly change the design of your presentation using built-in PowerPoint themes.",
objectives: [
  "Apply a theme and explain what it changes",
  "Choose theme variants and understand what they alter",
  "Judge a theme by legibility rather than attractiveness",
  "Keep a deck consistent with organizational branding",
],
duration: "8 min",
videoUrl: "https://www.youtube.com/embed/_gYShFl6i94",

practiceFiles: [
{
name: "Applying Themes Practice File",
url: "/practice/powerpoint/module-3/themes/Powerpoint_Themes_Practice.pptx",
},
],

sections: [

  {
     heading: "Choose a theme for the room, not for the monitor",
     blocks: [
       {
         type: "scenario",
         role: "You design the annual staff briefing at Lakeside Medical Associates.",
         text: "You pick a theme with pale grey text on a white background. It looks refined on your monitor. Projected in a room where the lights must stay on, the text is close to invisible from the fourth row.",
         task: "Evaluate a theme by whether it survives a real projector in a real room.",
       },
       {
         type: "paragraph",
         text: "A theme sets colors, fonts, and effects across every slide at once, so the whole deck stays coherent and a redesign is one click rather than forty. That is its value. Its risk is that theme choice is usually made on a bright monitor a foot from your face, under conditions nothing like a presentation.",
       },
       {
         type: "paragraph",
         text: "Projection loses contrast, and ambient light loses more. Strong contrast — genuinely dark text on a genuinely light background, or the reverse — is the single most important property of a presentation theme. Mid-grey on white, or any two mid-tones together, will fail in the room.",
       },
       {
         type: "callout",
         variant: "warning",
         text: "Test on the actual equipment when the presentation matters. Colors shift on projectors, thin fonts lose their strokes, and a subtle background gradient can turn into visible banding. Ten minutes in the room beforehand catches all of it — and is also when you discover the resolution is different from your laptop's.",
       },
     ],
   },

{
heading: "What is a Theme?",
blocks: [
{
type: "paragraph",
text:
"A theme is a predefined combination of colors, fonts, layouts, and visual effects that control the overall appearance of a presentation.",
},
{
type: "paragraph",
text:
"PowerPoint presentations use a theme by default. Even if you never choose one manually, the Office theme is already applied when you create a new presentation.",
},
{
type: "paragraph",
text:
"Applying a theme allows you to instantly change the design of every slide while keeping the presentation consistent and professional.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_example.png",
alt: "Two slides showing different PowerPoint themes applied",
},
],
},

{
heading: "Theme Elements",
blocks: [
{
type: "paragraph",
text:
"Every PowerPoint theme includes a set of design elements that work together to control the appearance of your slides.",
},
{
type: "paragraph",
text:
"These elements ensure that colors, fonts, and design effects remain consistent throughout the entire presentation.",
},
{
type: "paragraph",
text:
"The three main theme elements are theme colors, theme fonts, and theme effects.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_theme_colors.png",
alt: "Theme colors menu in PowerPoint",
},
{
type: "paragraph",
text:
"Theme colors define the color palette used throughout the presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_theme_fonts.png",
alt: "Theme fonts shown in PowerPoint font menu",
},
{
type: "paragraph",
text:
"Theme fonts determine the default fonts used for headings and body text.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_theme_effects.png",
alt: "Theme effects and shape styles in PowerPoint",
},
{
type: "paragraph",
text:
"Theme effects control the appearance of shapes, SmartArt graphics, and other design elements.",
},
],
},

{
heading: "Applying a Theme",
blocks: [
{
type: "paragraph",
text:
"All themes in PowerPoint are located on the Design tab in the Themes group.",
},
{
type: "paragraph",
text:
"You can apply a theme at any time, and PowerPoint will automatically update every slide in the presentation.",
},
{
type: "paragraph",
text:
"To apply a theme, open the Design tab and locate the Themes group.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_more_themes.png",
alt: "Themes group on the PowerPoint Design tab",
},
{
type: "paragraph",
text:
"Click the More arrow to view the complete gallery of available themes.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_desired_themes.png",
alt: "PowerPoint theme gallery",
},
{
type: "paragraph",
text:
"Select the theme you want and it will immediately be applied to the entire presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_applied_theme.png",
alt: "Theme applied to PowerPoint presentation",
},
],
},

{
heading: "Using Theme Variants",
blocks: [
{
type: "paragraph",
text:
"After applying a theme, you can change the appearance of that theme by choosing a variant.",
},
{
type: "paragraph",
text:
"Variants adjust the color scheme while keeping the same overall theme layout and design.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_variant_theme.png",
alt: "Theme variants options in PowerPoint",
},
{
type: "paragraph",
text:
"This allows you to quickly explore different design options without changing the entire theme.",
},
],
},

{
heading: "Completed Presentation Example",
blocks: [
{
type: "paragraph",
text:
"After applying a theme and selecting a variant, your slides will have a consistent design and professional appearance.",
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_final_result.jpeg",
alt: "Final presentation with applied theme",
},
],
},

{
heading: "Knowledge Check",
blocks: [
{
type: "knowledge-check",
question: "What does applying a theme to a presentation do?",
options: [
"Changes only the font used in the presentation",
"Adds animations to every slide automatically",
"Changes the overall visual design including colors, fonts, and backgrounds",
"Replaces all slide content with placeholder text",
],
correctIndex: 2,
explanation: "A theme applies a coordinated set of colors, fonts, backgrounds, and effects across every slide, so the deck stays visually consistent and can be redesigned in one action.",
optionRationales: [
  "Fonts are one part of a theme. It also changes colors, backgrounds, and effects.",
  "Themes are static design. Animation is applied separately from the Animations tab.",
  "Correct. A theme changes the overall visual design — colors, fonts, and backgrounds — across the deck.",
  "Themes never alter content. Only the design changes.",
],
},
],
},

],

challenge: [
{
type: "paragraph",
text: "Complete the following tasks using the practice presentation:",
},
{
type: "list",
ordered: true,
items: [
"Open the practice presentation.",
"Select the Design tab.",
"Open the Themes gallery.",
"Apply the Gallery theme.",
"Select a different theme variant.",
],
},
{
type: "image",
src: "/images/powerpoint/module-3/themes/applying-themes_final_result.jpeg",
alt: "Final result after applying a theme",
},
],

},
{
slug: "modifying-themes",
title: "Modifying Themes",
description:
"Learn how to customize PowerPoint themes by changing theme colors, fonts, effects, and background styles.",
objectives: [
  "Change theme colors, fonts, and effects independently",
  "Create and save a custom theme for reuse",
  "Check color contrast for legibility",
  "Apply organizational branding consistently",
],
duration: "10 min",
videoUrl: "https://www.youtube.com/embed/UH7Gzjd3rGA",

practiceFiles: [
{
name: "Modifying Themes Practice File",
url: "/practice/powerpoint/module-3/modifying/Powerpoint_ModifyingThemes_Practice.pptx",
},
],

sections: [

  {
     heading: "Build the practice's theme once",
     blocks: [
       {
         type: "scenario",
         role: "You standardize presentations across Lakeside Medical Associates.",
         text: "Five staff produce decks and all five look different. Patients and partners see materials that do not appear to come from the same organization. Everyone is choosing colors from scratch each time, because there is nothing to choose from.",
         task: "Define the practice's colors and fonts once as a saved theme, so consistency is the easy path.",
       },
       {
         type: "paragraph",
         text: "Theme colors, fonts, and effects can each be changed independently from the Design tab's Variants dropdown. Set the practice's palette and typefaces, then Save Current Theme — the theme appears in the gallery for everyone it is shared with, in PowerPoint, Word, and Excel alike.",
       },
       {
         type: "paragraph",
         text: "Once the theme exists, staff choose from theme colors rather than inventing them, and every deck matches without anyone needing to remember a hex code. Making the consistent choice the easy one is what actually produces consistency.",
       },
       {
         type: "callout",
         variant: "warning",
         text: "Check contrast when you set the palette, not afterwards. Body text should reach at least a 4.5:1 contrast ratio against its background; large display text can go to 3:1. Free checkers online will give you the number from two hex values. Building the palette to pass means no one downstream has to think about it.",
       },
     ],
   },

{
heading: "Modifying PowerPoint Themes",
blocks: [
{
type: "paragraph",
text:
"PowerPoint themes control the overall appearance of your presentation, including colors, fonts, and visual effects.",
},
{
type: "paragraph",
text:
"If you like the general design of a theme but want to adjust certain elements, you can modify the theme instead of choosing a completely different one.",
},
{
type: "paragraph",
text:
"You can change theme colors, fonts, effects, and background styles while keeping the overall layout of the theme.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_variant_dropdown.png",
alt: "Variants dropdown menu in PowerPoint",
},
],
},

{
heading: "Changing Theme Colors",
blocks: [
{
type: "paragraph",
text:
"If you don't like the colors of a theme, you can quickly apply a different color set while keeping the rest of the theme unchanged.",
},
{
type: "paragraph",
text:
"Theme colors control the color palette used for text, shapes, charts, and other design elements in your presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_variant_colors.png",
alt: "Theme color options in PowerPoint",
},
{
type: "paragraph",
text:
"To change theme colors, open the Design tab, click the Variants drop-down arrow, select Colors, and choose the desired color set.",
},
],
},

{
heading: "Customizing Theme Colors",
blocks: [
{
type: "paragraph",
text:
"If none of the built-in color sets match your design needs, you can create your own custom theme colors.",
},
{
type: "paragraph",
text:
"Custom colors allow you to control the exact colors used for text backgrounds, accents, and hyperlinks.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_customize_colors.png",
alt: "Customize theme colors dialog box",
},
{
type: "paragraph",
text:
"Open Design → Variants → Colors → Customize Colors, then choose new colors and give your custom theme a name before saving it.",
},
],
},

{
heading: "Changing Theme Fonts",
blocks: [
{
type: "paragraph",
text:
"Theme fonts define the default fonts used for headings and body text across the entire presentation.",
},
{
type: "paragraph",
text:
"Changing theme fonts helps keep text consistent throughout all slides.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_variant_font.png",
alt: "Theme fonts menu in PowerPoint",
},
{
type: "paragraph",
text:
"To change fonts, open the Design tab, click Variants, select Fonts, and choose a font pair from the list.",
},
],
},

{
heading: "Customizing Theme Fonts",
blocks: [
{
type: "paragraph",
text:
"If you want to use specific fonts, you can create your own custom theme font combination.",
},
{
type: "paragraph",
text:
"This allows you to choose one font for headings and another for body text.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_customize_fonts.png",
alt: "Customize fonts dialog box in PowerPoint",
},
{
type: "paragraph",
text:
"Select Design → Variants → Fonts → Customize Fonts, choose the heading and body fonts, then save the custom font theme.",
},
],
},

{
heading: "Changing Theme Effects",
blocks: [
{
type: "paragraph",
text:
"Theme effects control the appearance of shapes, SmartArt graphics, and other visual objects in your presentation.",
},
{
type: "paragraph",
text:
"Changing theme effects can adjust elements such as shadows, glows, reflections, and shape styles.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_theme_effects.jpeg",
alt: "Theme effects options in PowerPoint",
},
{
type: "paragraph",
text:
"To apply a different effect style, open the Design tab, click Variants, select Effects, and choose the desired effect.",
},
],
},

{
heading: "Changing Background Styles",
blocks: [
{
type: "paragraph",
text:
"You can also change the background style of your slides to further customize the appearance of your presentation.",
},
{
type: "paragraph",
text:
"Background styles depend on the current theme and color settings.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_background_styles.png",
alt: "Background styles options in PowerPoint",
},
{
type: "paragraph",
text:
"Open Design → Variants → Background Styles and choose a new background. For additional options, select Format Background.",
},
],
},

{
heading: "Saving a Custom Theme",
blocks: [
{
type: "paragraph",
text:
"After customizing colors, fonts, and effects, you can save your theme and reuse it in future presentations.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_save_current_theme.jpeg",
alt: "Save current theme option in PowerPoint",
},
{
type: "paragraph",
text:
"Open the Themes gallery on the Design tab and select Save Current Theme.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_save_dialog.png",
alt: "Save theme dialog box",
},
{
type: "paragraph",
text:
"Enter a name for the theme and click Save. The theme will appear in the Custom section of the theme gallery.",
},
],
},

{
heading: "Completed Presentation Example",
blocks: [
{
type: "paragraph",
text:
"After modifying theme colors, fonts, effects, and background styles, your presentation will have a customized and consistent design.",
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_final_result.png",
alt: "Final presentation after modifying theme",
},
],
},

{
heading: "Knowledge Check",
blocks: [
{
type: "knowledge-check",
question: "Which element of a theme controls the color palette used throughout the presentation?",
options: [
"Theme effects",
"Theme fonts",
"Background styles",
"Theme colors",
],
correctIndex: 3,
explanation: "Theme colors define the palette applied across the presentation — backgrounds, text, accents, chart series, and shape fills all draw from it.",
optionRationales: [
  "Theme effects control shadows, reflections, and 3-D treatments on shapes.",
  "Theme fonts set the heading and body typefaces.",
  "Background styles are variations built from the theme colors, so they follow the palette rather than defining it.",
  "Correct. Theme colors define the palette used throughout the presentation.",
],
},
],
},

],

challenge: [
{
type: "paragraph",
text: "Complete the following tasks using the practice presentation:",
},
{
type: "list",
ordered: true,
items: [
"Open the practice presentation.",
"Change the theme colors.",
"Customize the fonts so the heading font is Garamond and the body font is Arial.",
"Change the background style.",
"Optional: Save your customized theme.",
],
},
{
type: "image",
src: "/images/powerpoint/module-3/modifying/modifying-themes_final_result.png",
alt: "Final result after modifying a theme",
},
],

},

{
  slug: "slide-master-view",
  title: "Slide Master View",
  description:
    "Learn how to use Slide Master view to make global design changes, create custom layouts, manage placeholders, and keep an entire presentation consistent.",
  objectives: [
    "Open Slide Master view and explain what it controls",
    "Distinguish the master from the layouts beneath it",
    "Add a logo or standing element to every slide at once",
    "Edit a layout without affecting the rest of the deck",
  ],
  duration: "16 min",
  videoUrl: "https://www.youtube.com/embed/h6ARCTypPTg",

  practiceFiles: [
    {
      name: "Slide Master View Practice File",
      url: "/practice/powerpoint/module-3/slide-master-view/Powerpoint_SlideMaster_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "One change instead of forty",
       blocks: [
         {
           type: "scenario",
           role: "You maintain the standard deck at Lakeside Medical Associates.",
           text: "The practice logo must appear on every slide of a forty-slide deck. Pasted onto each slide by hand, it lands in forty slightly different positions and takes twenty minutes. Placed on the Slide Master, it appears once on every slide, in exactly the same place, in about fifteen seconds.",
           task: "Use the master for anything that should appear on every slide.",
         },
         {
           type: "paragraph",
           text: "Slide Master view (View > Slide Master) shows a hierarchy. The master is at the top, and every layout beneath inherits from it. A change to the master reaches all layouts; a change to one layout affects only slides using that layout. This is the same inheritance idea as styles in Word, applied to slide design.",
         },
         {
           type: "table",
           caption: "Where to make a change",
           columns: [
             "You want to change",
             "Edit",
             "Effect",
           ],
           rows: [
             [
               "Logo on every slide",
               "The master",
               "Appears on all layouts at once",
             ],
             [
               "Title font throughout",
               "The master's title placeholder",
               "Every layout's title updates",
             ],
             [
               "The title slide only",
               "The Title Slide layout",
               "Other slides are unaffected",
             ],
             [
               "Add a new arrangement",
               "Insert Layout",
               "Becomes available in the New Slide gallery",
             ],
           ],
         },
         {
           type: "worked-example",
           title: "Putting the practice logo on every slide",
           task: "Add the logo to a forty-slide deck so it sits identically on every slide and stays there as slides are added.",
           steps: [
             {
               move: "View > Slide Master, and select the top thumbnail — the master itself.",
               why: "The top thumbnail is larger and sits above the indented layouts. Selecting a layout instead is the usual mistake, and it puts the logo on only the slides using that one layout.",
             },
             {
               move: "Insert the logo and position it, allowing clear space from the edges.",
               why: "Projectors and video calls sometimes crop the outer edge of a slide. Keeping the logo a little inside the boundary means it survives that, and it looks deliberate rather than jammed into the corner.",
             },
             {
               move: "Close Master View and check several slides, including the title slide.",
               why: "The Title Slide layout often has its own background and may position or hide the logo differently. Checking a few slides of different layouts confirms the change reached them as intended.",
             },
             {
               move: "Add a new slide and confirm the logo appears on it too.",
               why: "This is the actual test of whether you edited the master rather than individual slides. A logo that appears on new slides automatically is inherited; one that does not was pasted onto existing slides.",
             },
           ],
           result: "The logo on every slide, in one position, appearing automatically on any slide added later.",
           takeaway: "Edit the master for what belongs everywhere and a layout for what belongs on one kind of slide. Never paste a standing element onto individual slides.",
         },
       ],
     },
    {
      heading: "What Slide Master View Does",
      blocks: [
        {
          type: "paragraph",
          text:
            "Slide Master view allows you to control the overall design and layout structure of an entire presentation. Instead of editing slides one by one, you can update the master and its layouts so that design changes appear everywhere they are used.",
        },
        {
          type: "paragraph",
          text:
            "This is especially useful when you want consistent branding, repeated logos, matching fonts, and reusable slide layouts throughout a presentation.",
        },
      ],
    },

    {
      heading: "Opening Slide Master View",
      blocks: [
        {
          type: "paragraph",
          text:
            "To begin working with slide masters, go to the View tab and select Slide Master. PowerPoint will switch from the normal editing view into the master editing workspace.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_ribbon_view.png",
          alt: "View tab with Slide Master command in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "Once Slide Master view opens, the left pane will display the large master slide at the top and the related layouts below it.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_slide_master_select.png",
          alt: "Slide Master selected in the left pane",
        },
      ],
    },

    {
      heading: "Understanding the Master Slide and Layouts",
      blocks: [
        {
          type: "paragraph",
          text:
            "The top slide in Slide Master view is the master slide. It controls global elements such as theme fonts, background styling, and repeated objects like logos.",
        },
        {
          type: "paragraph",
          text:
            "The smaller slides beneath it are layouts. Each layout controls the structure of a specific slide type such as title slides, content slides, or image-based slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_slide_master.png",
          alt: "Slide Master view showing hierarchy",
        },
        {
          type: "paragraph",
          text:
            "When you apply a layout to a slide, that slide inherits all formatting and structure from that layout.",
        },
      ],
    },

    {
      heading: "Editing Master Text and Branding",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can format text on the master or layouts just like regular slides, including font style, size, and alignment.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_text_formatting.png",
          alt: "Formatting text in Slide Master",
        },
        {
          type: "paragraph",
          text:
            "You can also insert logos or branding elements so they automatically appear on multiple slides.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_resize_move_logo.png",
          alt: "Logo placement",
        },
      ],
    },

    {
      heading: "Using Theme Fonts in Slide Master",
      blocks: [
        {
          type: "paragraph",
          text:
            "Slide Master view works closely with themes. Changing theme fonts will update text across all layouts instantly.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_theme_font.png",
          alt: "Theme fonts",
        },
        {
          type: "paragraph",
          text:
            "This ensures consistency and helps maintain a professional appearance.",
        },
      ],
    },

    {
      heading: "Inserting and Managing Placeholders",
      blocks: [
        {
          type: "paragraph",
          text:
            "Placeholders define where content such as text, images, charts, and media will appear on a slide.",
        },
        {
          type: "paragraph",
          text:
            "Use Insert Placeholder from the Slide Master tab to add placeholders to layouts.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_placeholders.png",
          alt: "Insert placeholder menu",
        },
        {
          type: "paragraph",
          text:
            "Once placed, you can resize and position placeholders to create structured layouts.",
        },
      ],
    },

    {
      heading: "Creating a Custom Layout",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can create your own layouts to standardize how slides are structured across a presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_ribbon.png",
          alt: "Slide Master ribbon",
        },
        {
          type: "paragraph",
          text:
            "Custom layouts are useful for things like product slides, team slides, or image-focused content.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_select_layout.png",
          alt: "Selecting layout",
        },
      ],
    },

    {
      heading: "Renaming Layouts",
      blocks: [
        {
          type: "paragraph",
          text:
            "Renaming layouts makes them easier to identify and reuse later.",
        },
        {
          type: "paragraph",
          text:
            "Click Rename and assign a meaningful name such as Product Slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_rename_layout.png",
          alt: "Rename layout",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_rename_dialog.png",
          alt: "Rename dialog",
        },
      ],
    },

    {
      heading: "Showing and Hiding Master Elements",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can control whether titles, footers, and background elements appear on specific layouts.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_titles_footers.png",
          alt: "Footer options",
        },
      ],
    },

    {
      heading: "Applying Custom Layouts to Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "Apply layouts from the Home tab to instantly update slide structure and formatting.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_use_custom_layout.png",
          alt: "Applying layout",
        },
      ],
    },

    {
      heading: "Saving the Theme",
      blocks: [
        {
          type: "paragraph",
          text:
            "Save your customized theme to reuse it in future presentations.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_save_current_theme.png",
          alt: "Save theme",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_save_theme.png",
          alt: "Save dialog",
        },
      ],
    },

    {
      heading: "Closing Slide Master View",
      blocks: [
        {
          type: "paragraph",
          text:
            "Click Close Master View to return to the normal editing environment.",
        },
      ],
    },

    {
      heading: "Completed Presentation Example",
      blocks: [
        {
          type: "image",
          src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_slides_updated.jpeg",
          alt: "Final slides",
        },
      ],
    },

    // ✅ PRO TIP
    {
      heading: "Pro Tip",
      blocks: [
        {
          type: "callout",
          variant: "success",
          text:
            "If you find yourself repeating the same formatting changes across multiple slides, switch to Slide Master view. One change there updates every slide automatically.",
        },
      ],
    },

    // ✅ KNOWLEDGE CHECK
    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What does Slide Master control?",
          options: [
            "Only one slide",
            "The entire presentation design",
            "Animations only",
          ],
          correctIndex: 1,
          explanation: "The Slide Master sits at the top of the design hierarchy: changes there flow down to every layout and therefore to the whole presentation.",
          optionRationales: [
            "A single slide is edited directly in Normal view. The master's purpose is precisely that it is not limited to one slide.",
            "Correct. The master controls the design for the entire presentation through the layouts that inherit from it.",
            "Animation is applied per object from the Animations tab. The master governs design and layout.",
          ],
        },
        {
          type: "knowledge-check",
          question: "What is a layout?",
          options: [
            "A color theme",
            "A slide structure template",
            "A font style",
          ],
          correctIndex: 1,
          explanation: "A layout is a slide structure template — a named arrangement of placeholders that inherits its design from the master. Choosing a layout decides where content sits on that slide.",
          optionRationales: [
            "A color theme is part of the theme, set from the Design tab.",
            "Correct. A layout is a slide structure template defining the placeholder arrangement.",
            "Font styles come from the theme fonts, not from a layout.",
          ],
        },
        {
          type: "knowledge-check",
          question: "Why are placeholders important?",
          options: [
            "To lock slides",
            "To define content areas",
            "To animate slides",
          ],
          correctIndex: 1,
          explanation: "Placeholders define where content belongs on a slide. Because their position comes from the master, typing into placeholders rather than free text boxes is what keeps every slide aligned consistently.",
          optionRationales: [
            "Placeholders do not lock anything. Restricting changes is a separate feature.",
            "Correct. Placeholders define the content areas, which is what keeps slides consistent.",
            "Animation is applied separately. A placeholder can be animated, but that is not its purpose.",
          ],
        },
      ],
    },
  ],

  challenge: [
    {
      type: "paragraph",
      text: "Complete the following tasks using the practice presentation:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Open the practice presentation.",
        "Go to the View tab and open Slide Master view.",
        "Select one of the layouts and rename it Product Slide.",
        "Insert a Picture placeholder on a custom layout.",
        "Move and resize the logo so it is aligned consistently on the layout.",
        "Change the theme font used for the layout.",
        "Return to Normal view.",
        "Apply the custom Product Slide layout to an existing slide.",
        "Save the current theme for future use.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-3/slide-master-view/slide-master-view_slides_updated.jpeg",
      alt: "Final result",
    },
  ],
},



];