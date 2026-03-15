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
"Learn how to create bulleted and numbered lists to organize information clearly on slides.",
duration: "8 min",
videoUrl: "https://www.youtube.com/embed/hL5XQGFdmDo",

practiceFiles: [
{
name: "Lists Practice File",
url: "/practice/powerpoint/module-2/lists/Powerpoint_Lists_Practice.pptx",
},
],

sections: [

{
heading: "Bulleted Lists",
blocks: [
{
type: "paragraph",
text:
"Bulleted lists are commonly used in PowerPoint to organize information into clear and easy-to-read points.",
},
{
type: "paragraph",
text:
"To add bullets, select the text you want to format and click the Bullets command in the Paragraph group on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_bullet_command.png",
alt: "Bullets command in the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"You can also click the drop-down arrow next to the Bullets command to choose from different bullet styles.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_bullets_dropdown.png",
alt: "Bullet style dropdown menu",
},
],
},

{
heading: "Choosing a Bullet Style",
blocks: [
{
type: "paragraph",
text:
"PowerPoint includes several built-in bullet styles such as circles, squares, arrows, and checkmarks.",
},
{
type: "paragraph",
text:
"Selecting a style immediately updates the appearance of the list.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_bullet_style.png",
alt: "Selecting a bullet style in PowerPoint",
},
],
},

{
heading: "Customizing Bullets",
blocks: [
{
type: "paragraph",
text:
"If you want more control over the appearance of your bullets, you can open the Bullets and Numbering dialog box.",
},
{
type: "paragraph",
text:
"From here you can change the bullet style, adjust the size, or select a different color.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_bullets_and_numbering.png",
alt: "Bullets and Numbering dialog box",
},
{
type: "paragraph",
text:
"You can also click Customize to choose symbols or other bullet characters.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_symbol_dialog.png",
alt: "Symbol dialog used for custom bullets",
},
],
},

{
heading: "Numbered Lists",
blocks: [
{
type: "paragraph",
text:
"Numbered lists are useful when presenting steps, instructions, or information that should appear in a specific order.",
},
{
type: "paragraph",
text:
"To apply numbering, select the text and click the Numbering command on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_numbering_command.png",
alt: "Numbering command in PowerPoint",
},
{
type: "paragraph",
text:
"Click the drop-down arrow next to the Numbering button to choose from different numbering formats.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_number_options.png",
alt: "Numbered list formatting options",
},
],
},

{
heading: "Continuing Numbering",
blocks: [
{
type: "paragraph",
text:
"When you create numbered lists across multiple slides or sections, PowerPoint can continue numbering automatically.",
},
{
type: "paragraph",
text:
"You can adjust where numbering starts by opening the Bullets and Numbering dialog box and changing the Start At value.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_continued_numbering.png",
alt: "Changing numbering start value",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_continued_numbering_displayed.png",
alt: "Numbering continued across a list",
},
],
},

{
heading: "Completed Slide Example",
blocks: [
{
type: "paragraph",
text:
"After applying bullets or numbering and customizing the formatting, your slide will look more organized and easier for your audience to read.",
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_final_result.png",
alt: "Final result of formatted lists on a PowerPoint slide",
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
"Select the slide that contains the agenda list.",
"Convert the list into a numbered list.",
"Change the numbering so the list starts at 5.",
"Customize the bullet style for another list on the slide.",
],
},
{
type: "image",
src: "/images/powerpoint/module-2/lists/powerpoint-lists_final_result.png",
alt: "Final result for the lists challenge",
},
],
},

{
slug: "indents-and-line-spacing",
title: "Indents and Line Spacing",
description:
"Learn how to adjust paragraph indentation and spacing to improve slide readability.",
duration: "11 min",
videoUrl: "https://www.youtube.com/embed/fhLlISfmGqA",

practiceFiles: [
{
name: "Indents and Line Spacing Practice File",
url: "/practice/powerpoint/module-2/indents/Powerpoint_IndentsLineSpacing_Practice.pptx",
},
],

sections: [

{
heading: "Why Indents and Spacing Matter",
blocks: [
{
type: "paragraph",
text:
"Indentation and line spacing help organize text so information is easier for your audience to read.",
},
{
type: "paragraph",
text:
"Indentation creates hierarchy within lists and paragraphs, while line spacing controls the vertical distance between lines of text.",
},
],
},

{
heading: "Showing the Ruler",
blocks: [
{
type: "paragraph",
text:
"The ruler provides visual controls that allow you to adjust indentation precisely.",
},
{
type: "paragraph",
text:
"If the ruler is not visible, go to the View tab and check the Ruler option.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_show_ruler.png",
alt: "Turning on the ruler in PowerPoint",
},
],
},

{
heading: "Understanding Indent Markers",
blocks: [
{
type: "paragraph",
text:
"The ruler contains several markers that control how text is indented.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_first_line_marker.png",
alt: "First line indent marker",
},
{
type: "paragraph",
text:
"The first-line indent marker controls where the first line of a paragraph begins.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_hanging_indent_marker.png",
alt: "Hanging indent marker",
},
{
type: "paragraph",
text:
"The hanging indent marker controls the indentation of every line except the first.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_left_indent_marker.png",
alt: "Left indent marker",
},
{
type: "paragraph",
text:
"The left indent marker moves the entire paragraph inward.",
},
],
},

{
heading: "Adjusting Indentation",
blocks: [
{
type: "paragraph",
text:
"You can adjust bullet alignment by dragging the indent markers on the ruler.",
},
{
type: "paragraph",
text:
"This allows you to control how far bullet points and text appear from the left side of the slide.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_left_indent_marker_example.png",
alt: "Example of adjusting the left indent marker",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_left_indent_marker_example_dragged.png",
alt: "Left indent marker dragged",
},
],
},

{
heading: "Using Hanging Indents",
blocks: [
{
type: "paragraph",
text:
"The hanging indent marker controls how lines wrap after the first line of text.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_hanging_indent_marker_example.png",
alt: "Hanging indent marker example",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_hanging_indent_marker_example_dragged.png",
alt: "Dragging the hanging indent marker",
},
],
},

{
heading: "Creating Multilevel Lists",
blocks: [
{
type: "paragraph",
text:
"Indentation can also be used to create multilevel lists that organize information into main topics and subtopics.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_list_multilevel.png",
alt: "Multilevel bullet list example",
},
],
},

{
heading: "Adjusting Line Spacing",
blocks: [
{
type: "paragraph",
text:
"Line spacing controls how much vertical space appears between lines of text.",
},
{
type: "paragraph",
text:
"To change line spacing, select the text and click the Line Spacing button in the Paragraph group on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_line_spacing_size.png",
alt: "Line spacing menu",
},
{
type: "paragraph",
text:
"You can select common spacing options such as 1.0, 1.5, or 2.0.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_line_spacing_example.png",
alt: "Line spacing example",
},
],
},

{
heading: "Using Line Spacing Options",
blocks: [
{
type: "paragraph",
text:
"For more precise control, open Line Spacing Options from the dropdown menu.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_line_spacing_options.png",
alt: "Line spacing options dialog box",
},
{
type: "paragraph",
text:
"You can adjust spacing before and after paragraphs to improve readability.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_line_spacing_adjusted.png",
alt: "Adjusted line spacing",
},
],
},

{
heading: "Completed Slide Example",
blocks: [
{
type: "paragraph",
text:
"After adjusting indentation and line spacing, the slide will appear more organized and easier to read.",
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_final_result.png",
alt: "Completed PowerPoint slide",
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
"Navigate to the slide containing the agenda.",
"Select the bulleted list.",
"Change the line spacing using Line Spacing Options.",
"Show the ruler if it is not already visible.",
"Adjust the left indent marker to align the bullet points.",
],
},
{
type: "image",
src: "/images/powerpoint/module-2/indents/indents-spacing_final_result.png",
alt: "Final result of the indents and spacing challenge",
},
],
},

{
slug: "using-find-and-replace",
title: "Using Find & Replace in PowerPoint",
description:
"Learn how to quickly locate text in your presentation and replace it with new content using the Find and Replace tools.",
duration: "7 min",
videoUrl: "https://www.youtube.com/embed/TEqzwdC4x58",

practiceFiles: [],

sections: [

{
heading: "Finding Text",
blocks: [
{
type: "paragraph",
text:
"The Find tool allows you to search for specific words or phrases within your presentation.",
},
{
type: "paragraph",
text:
"This is useful when working with presentations that contain many slides or repeated information.",
},
{
type: "paragraph",
text:
"To use Find, go to the Home tab and click the Find command in the Editing group.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_find_command.png",
alt: "Find command in PowerPoint",
},
{
type: "paragraph",
text:
"The Find dialog box will appear where you can enter the word or phrase you want to locate.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_find_next.png",
alt: "Find dialog box in PowerPoint",
},
],
},

{
heading: "Locating Text",
blocks: [
{
type: "paragraph",
text:
"After entering the search text, click Find Next to move through the presentation and locate each occurrence.",
},
{
type: "paragraph",
text:
"When PowerPoint finds the text, it will highlight the matching word or phrase on the slide.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_text_found.jpeg",
alt: "Highlighted search result in PowerPoint",
},
],
},

{
heading: "Using Replace",
blocks: [
{
type: "paragraph",
text:
"The Replace feature allows you to search for text and replace it with different text automatically.",
},
{
type: "paragraph",
text:
"This tool is especially useful when you need to update names, dates, or repeated information across multiple slides.",
},
{
type: "paragraph",
text:
"To open Replace, click the Replace command in the Editing group on the Home tab.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_replace_command.png",
alt: "Replace command in PowerPoint",
},
{
type: "paragraph",
text:
"The Replace dialog box allows you to enter both the text you want to find and the text you want to replace it with.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_replace_dialog.png",
alt: "Replace dialog box",
},
],
},

{
heading: "Replacing Text",
blocks: [
{
type: "paragraph",
text:
"Once the text is found, you can click Replace to change the highlighted occurrence.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_replace_execute.png",
alt: "Replacing text in PowerPoint",
},
{
type: "paragraph",
text:
"If you want PowerPoint to replace every occurrence of the text in the presentation, click Replace All.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_replace_finished.jpeg",
alt: "PowerPoint confirmation after replacing text",
},
],
},

{
heading: "Completed Slide Example",
blocks: [
{
type: "paragraph",
text:
"After replacing the text, the updated content will appear throughout the presentation.",
},
{
type: "paragraph",
text:
"This allows you to quickly update repeated information without manually editing each slide.",
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_final_result.png",
alt: "Completed slide after replacing text",
},
],
},

],

challenge: [
{
type: "paragraph",
text: "Complete the following tasks using the presentation:",
},
{
type: "list",
ordered: true,
items: [
"Open the presentation.",
"Use the Find command to search for the text '2015-2016'.",
"Use Replace to change it to '2016-2017'.",
"Click Replace All to update every occurrence.",
"Confirm the changes when PowerPoint displays the replacement message.",
],
},
{
type: "image",
src: "/images/powerpoint/module-2/find-replace/find-replace_final_result.png",
alt: "Final result of the Find and Replace challenge",
},
],
},

{
slug: "managing-slides",
title: "Managing Slides",
description:
"Learn how to organize slides using slide views, notes, and sections to manage large presentations more effectively.",
duration: "11 min",
videoUrl: "https://www.youtube.com/embed/UmOJXAr_riE",

practiceFiles: [
{
name: "Managing Slides Practice File",
url: "/practice/powerpoint/module-2/managing-slides/Powerpoint_ManagingSlides_Practice.pptx",
},
],

sections: [

{
heading: "Slide Views",
blocks: [
{
type: "paragraph",
text:
"PowerPoint includes several slide views that help you work with slides in different ways.",
},
{
type: "paragraph",
text:
"The slide view buttons are located in the bottom-right corner of the PowerPoint window.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_slide_views.png",
alt: "Slide view buttons in PowerPoint",
},
{
type: "paragraph",
text:
"Each view provides a different way to work with slides, including editing, organizing, and presenting your presentation.",
},
],
},

{
heading: "Normal View",
blocks: [
{
type: "paragraph",
text:
"Normal View is the default editing view used when creating and editing slides.",
},
{
type: "paragraph",
text:
"This view displays the current slide in the center, slide thumbnails on the left, and the notes pane below the slide.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_normal_view.png",
alt: "Normal view in PowerPoint",
},
{
type: "paragraph",
text:
"You can also drag slides in the navigation pane to quickly change their order.",
},
],
},

{
heading: "Slide Sorter View",
blocks: [
{
type: "paragraph",
text:
"Slide Sorter View displays all slides as thumbnails so you can easily rearrange them.",
},
{
type: "paragraph",
text:
"This view is helpful when organizing presentations with many slides.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_thumbnail.jpeg",
alt: "Slide sorter view showing slide thumbnails",
},
{
type: "paragraph",
text:
"To move a slide, simply click and drag it to a new position.",
},
],
},

{
heading: "Reading View and Slide Show View",
blocks: [
{
type: "paragraph",
text:
"Reading View shows the presentation in a window while still allowing access to PowerPoint tools.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_reading_view.png",
alt: "Reading view in PowerPoint",
},
{
type: "paragraph",
text:
"Slide Show View displays the presentation exactly as the audience will see it.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_slide_show_view.png",
alt: "Slide show view in PowerPoint",
},
],
},

{
heading: "Outline View",
blocks: [
{
type: "paragraph",
text:
"Outline View displays the text from your slides in outline form.",
},
{
type: "paragraph",
text:
"This makes it easier to review or edit the text from multiple slides at once.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_outline_view.png",
alt: "Outline view command",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_outline_edit.png",
alt: "Editing text in outline view",
},
],
},

{
heading: "Adding Notes",
blocks: [
{
type: "paragraph",
text:
"You can add notes to slides using the Notes pane below the slide.",
},
{
type: "paragraph",
text:
"Notes are often used as speaker notes to help presenters remember what to say.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_notes_pane.png",
alt: "Opening the notes pane",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_notes.png",
alt: "Typing notes in the notes pane",
},
],
},

{
heading: "Notes Page View",
blocks: [
{
type: "paragraph",
text:
"You can also view notes in Notes Page view.",
},
{
type: "paragraph",
text:
"This view shows the slide at the top with a large area below it where you can edit notes.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_notes_page_view.png",
alt: "Notes page view",
},
],
},

{
heading: "Creating Slide Sections",
blocks: [
{
type: "paragraph",
text:
"When presentations contain many slides, sections can help organize them into groups.",
},
{
type: "paragraph",
text:
"To create a section, select a slide, click the Section command on the Home tab, and choose Add Section.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_add_section.png",
alt: "Add section command",
},
{
type: "paragraph",
text:
"A new Untitled Section will appear in the slide navigation pane.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_untitled_section.png",
alt: "Untitled section in slide pane",
},
],
},

{
heading: "Renaming Sections",
blocks: [
{
type: "paragraph",
text:
"You can rename a section to better describe the slides it contains.",
},
{
type: "paragraph",
text:
"Click the Section command and choose Rename Section.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_rename_section.png",
alt: "Rename section command",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_rename_dialog.png",
alt: "Rename section dialog",
},
],
},

{
heading: "Collapsing and Removing Sections",
blocks: [
{
type: "paragraph",
text:
"Sections can be collapsed in the slide navigation pane to hide slides inside them.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_collapse_section.png",
alt: "Collapsed slide section",
},
{
type: "paragraph",
text:
"If you no longer need a section, you can remove it using the Section command.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_remove_section.png",
alt: "Remove section command",
},
],
},

{
heading: "Completed Presentation Example",
blocks: [
{
type: "paragraph",
text:
"After organizing slides into sections and adding notes, the presentation becomes easier to navigate and manage.",
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_final_result.png",
alt: "Completed slide organization",
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
"Create a section for the first slide and name it Introduction.",
"Create a section named Dogs beginning with the slide 'Man's Best Friend'.",
"Create a section named Cats & More beginning with the slide 'The Little Things in Life'.",
"Move the slide titled 'Pogo' so it appears in the Dogs section.",
"Switch to Outline View.",
"Add a note on slide 4 that says 'Move before slide 3 or delete'.",
"Switch back to Normal View.",
],
},
{
type: "image",
src: "/images/powerpoint/module-2/managing-slides/managing-slides_final_result.png",
alt: "Final challenge result",
},
],
},

];