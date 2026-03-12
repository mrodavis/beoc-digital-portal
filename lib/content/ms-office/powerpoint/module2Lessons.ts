import { Lesson } from "@/types/lesson";

export const powerpointModule2Lessons: Lesson[] = [

{
  slug: "powerpoint-text-basics",
  title: "PowerPoint Text Basics",
  description:
    "Learn how to select text, cut, copy, paste, drag text, and format text using the tools on the Home tab.",
  duration: "9 min",
  videoUrl: "https://www.youtube.com/embed/F9RL0Lk5cmw",

  practiceFiles: [
    {
      name: "PowerPoint Text Basics Practice File",
      url: "/practice/powerpoint/module-2/text-basics/Powerpoint_TextBasics_Practice.pptx",
    },
  ],

  sections: [

{
heading: "Selecting Text",
blocks: [
{
type: "paragraph",
text:
"Before you can edit or move text in PowerPoint, you first need to select it. Selecting text allows you to copy it, delete it, format it, or move it to another location on the slide.",
},
{
type: "paragraph",
text:
"To select text, click next to the text you want to select, then click and drag your mouse across the words.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_select_text.png",
alt: "Selecting text in a PowerPoint text box",
},
{
type: "paragraph",
text:
"Once the text is highlighted, PowerPoint knows that any commands you choose will apply to that selection.",
},
],
},

{
heading: "Copying and Pasting Text",
blocks: [
{
type: "paragraph",
text:
"Copying text allows you to duplicate information without removing the original content from the slide.",
},
{
type: "paragraph",
text:
"First select the text you want to copy. Then click the Copy command in the Clipboard group on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_copy.png",
alt: "Copy command on the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"Next place the insertion point where you want the copied text to appear and click the Paste command.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_paste_command.png",
alt: "Paste command on the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"The copied text will appear in the new location while the original text remains unchanged.",
},
],
},

{
heading: "Cutting and Pasting Text",
blocks: [
{
type: "paragraph",
text:
"If you want to move text instead of copying it, you can use the Cut command. Cutting removes the selected text and places it on the clipboard.",
},
{
type: "paragraph",
text:
"Select the text you want to move, then click the Cut command on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_cut.png",
alt: "Cut command on the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"Place the insertion point where the text should appear, then click Paste.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_paste.png",
alt: "Pasting text into a new position",
},
{
type: "paragraph",
text:
"The text will appear in its new location and will be removed from its original position.",
},
],
},

{
heading: "Dragging and Dropping Text",
blocks: [
{
type: "paragraph",
text:
"Another quick way to move text is by dragging and dropping it. This allows you to move text directly without using the Ribbon commands.",
},
{
type: "paragraph",
text:
"First select the text you want to move. Then click and drag the selected text to a new location within the text box.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_drag_select_text.png",
alt: "Dragging selected text in PowerPoint",
},
{
type: "paragraph",
text:
"When you release the mouse, the text will move to the new location.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_dragged_text.png",
alt: "Text moved to a new location on the slide",
},
],
},

{
heading: "Formatting Text",
blocks: [
{
type: "paragraph",
text:
"Formatting text helps emphasize important information and makes slides easier to read.",
},
{
type: "paragraph",
text:
"The Home tab contains several tools for formatting text, including options for font style, font size, color, and alignment.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_ribbon_commands.png",
alt: "Font and paragraph commands in the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"You can also apply styles such as bold, italic, or underline to highlight important information for your audience.",
},
],
},

{
heading: "Completed Slide Example",
blocks: [
{
type: "paragraph",
text:
"After editing and formatting the text, the slide will appear more organized and easier to read.",
},
{
type: "paragraph",
text:
"The example below shows how the slide should look after rearranging the list and formatting the text.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_final_result.jpeg",
alt: "Completed PowerPoint slide example",
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
"Select slide 4.",
"Move the text 'Lower blood pressure' so it appears between 'Companionship' and 'Social opportunities'.",
"Use either Cut and Paste or Drag and Drop.",
"Select the list of benefits and apply italics formatting.",
"Select the title 'Did You Know?' remove the bold formatting and change the font size to 36 pt.",
],
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_final_result.jpeg",
alt: "Final result for the text basics challenge",
},
],
},

{
slug: "powerpoint-lists",
title: "PowerPoint Lists",
description:
"Learn how to create bulleted and numbered lists to organize information on slides.",
duration: "8 min",

practiceFiles: [
{
name: "Lists Practice File",
url: "/practice/powerpoint/module-2/lists/lists_practice.pptx",
},
],

sections: [

{
heading: "Bulleted Lists",
blocks: [
{
type: "paragraph",
text:
"Bulleted lists help organize information into clear points that are easy for an audience to follow.",
},
{
type: "paragraph",
text:
"To create a bulleted list, click inside a text placeholder and press Enter after each item.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/bulleted_list.png",
alt: "Bulleted list in PowerPoint",
},
],
},

{
heading: "Numbered Lists",
blocks: [
{
type: "paragraph",
text:
"Numbered lists are useful when presenting steps or sequences.",
},
{
type: "paragraph",
text:
"You can apply numbering using the Numbering command on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/numbered_list.png",
alt: "Numbered list command",
},
],
},

{
heading: "Customizing Bullets",
blocks: [
{
type: "paragraph",
text:
"PowerPoint allows you to customize bullets by changing their style, size, or color.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/bullet_options.png",
alt: "Bullet customization options",
},
{
type: "paragraph",
text:
"Custom bullets can help match the visual style of your presentation.",
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
"Create a bulleted list with four items.",
"Convert the list to a numbered list.",
"Customize the bullet style.",
],
},
],
},

{
slug: "indents-and-line-spacing",
title: "Indents and Line Spacing",
description:
"Learn how to adjust paragraph indentation and spacing to improve slide readability.",
duration: "11 min",

practiceFiles: [],

sections: [

{
heading: "Using Indents",
blocks: [
{
type: "paragraph",
text:
"Indentation allows you to create hierarchy within lists and paragraphs.",
},
{
type: "paragraph",
text:
"In PowerPoint, you can increase or decrease indentation using the Indent commands on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indent_commands.png",
alt: "Indent commands in PowerPoint",
},
],
},

{
heading: "Line Spacing",
blocks: [
{
type: "paragraph",
text:
"Line spacing controls the vertical space between lines of text.",
},
{
type: "paragraph",
text:
"Increasing line spacing can make slides easier to read, especially when presenting to a large audience.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/line_spacing.png",
alt: "Line spacing menu",
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
"Create a bulleted list.",
"Increase indentation on one bullet level.",
"Adjust line spacing for better readability.",
],
},
],
},

{
slug: "using-find-and-replace",
title: "Using Find & Replace in PowerPoint",
description:
"Learn how to quickly locate text in your presentation and replace it with new content.",
duration: "7 min",

practiceFiles: [],

sections: [

{
heading: "Using Find",
blocks: [
{
type: "paragraph",
text:
"The Find feature allows you to search for specific words or phrases in your presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find_command.png",
alt: "Find command in PowerPoint",
},
{
type: "paragraph",
text:
"This is helpful when editing long presentations with many slides.",
},
],
},

{
heading: "Using Replace",
blocks: [
{
type: "paragraph",
text:
"The Replace feature searches for specific text and replaces it with new text automatically.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/replace_dialog.png",
alt: "Replace dialog box",
},
{
type: "paragraph",
text:
"This tool saves time when updating repeated information across multiple slides.",
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
"Open a presentation with multiple slides.",
"Use Find to locate a word.",
"Replace the word with a new term.",
],
},
],
},

{
slug: "managing-slides",
title: "Managing Slides",
description:
"Learn how to organize slides by duplicating, deleting, hiding, and rearranging slides.",
duration: "11 min",

practiceFiles: [],

sections: [

{
heading: "Reordering Slides",
blocks: [
{
type: "paragraph",
text:
"You can rearrange slides in the Slide Navigation Pane by clicking and dragging them to a new position.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/reorder_slides.png",
alt: "Dragging slides to reorder",
},
{
type: "paragraph",
text:
"This allows you to easily adjust the flow of your presentation.",
},
],
},

{
heading: "Duplicating Slides",
blocks: [
{
type: "paragraph",
text:
"Duplicating slides is useful when you want to reuse a slide layout or structure.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/duplicate_slide.png",
alt: "Duplicate slide command",
},
{
type: "paragraph",
text:
"Right-click a slide in the Navigation Pane and select Duplicate Slide.",
},
],
},

{
heading: "Deleting Slides",
blocks: [
{
type: "paragraph",
text:
"If a slide is no longer needed, you can remove it from the presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/delete_slide.png",
alt: "Deleting a slide",
},
{
type: "paragraph",
text:
"Right-click the slide thumbnail and choose Delete Slide.",
},
],
},

{
heading: "Hiding Slides",
blocks: [
{
type: "paragraph",
text:
"Hidden slides remain in your presentation but are skipped during the slideshow.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/hide_slide.png",
alt: "Hide slide option",
},
{
type: "paragraph",
text:
"This is useful when preparing alternate content or optional slides.",
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
"Duplicate a slide.",
"Delete an unnecessary slide.",
"Reorder slides in the Navigation Pane.",
"Hide one slide in the presentation.",
],
},
],
},

];