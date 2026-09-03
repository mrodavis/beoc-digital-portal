import { Lesson } from "@/types/lesson";

export const powerpointModule2Lessons: Lesson[] = [

{
  slug: "powerpoint-text-basics",
  title: "PowerPoint Text Basics",
  description:
    "Learn how to select text, cut, copy, paste, drag text, and format text using the tools on the Home tab.",
  objectives: [
    "Add and edit text in placeholders and text boxes",
    "Select text efficiently with keyboard shortcuts",
    "Apply formatting that stays consistent with the deck's theme",
    "Recognize when a slide is carrying too much text",
  ],
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
       heading: "The word limit is the design",
       blocks: [
         {
           type: "scenario",
           role: "You present quarterly results at Lakeside Medical Associates.",
           text: "Your key slide holds ninety words in five bullets. You watch the room read it, and by the time you reach your second sentence they have finished and are checking their phones. The information was delivered. The point was not.",
           task: "Reduce each slide to what genuinely benefits from being seen, and move the rest to the notes.",
         },
         {
           type: "paragraph",
           text: "A commonly cited guide is roughly six words per line and six lines per slide. The number matters less than the principle behind it: a slide is glanced at, not read. Anything requiring sustained reading belongs in a handout or in the notes pane.",
         },
         {
           type: "paragraph",
           text: "Font size is the other half. Twenty-four point is a sensible floor for body text — not for aesthetics, but because it is what remains legible from the back of a room. If your content only fits at eighteen point, the slide has too much on it, and shrinking the type just makes it unreadable as well as crowded.",
         },
         {
           type: "table",
           caption: "Where content belongs",
           columns: [
             "Content",
             "Put it",
             "Because",
           ],
           rows: [
             [
               "The single point of the slide",
               "The slide, as a short phrase",
               "It anchors what you are saying",
             ],
             [
               "Your supporting explanation",
               "The notes pane",
               "You say it; the audience listens rather than reads",
             ],
             [
               "Detailed figures and tables",
               "A handout",
               "Detail needs reading time a live audience does not have",
             ],
             [
               "The source of a statistic",
               "A small line on the slide",
               "It establishes credibility without being read aloud",
             ],
           ],
         },
       ],
     },

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
"Dragging works, and there are faster ways worth knowing: double-click selects a word, triple-click selects a paragraph, and Ctrl+A selects everything in the placeholder. Precise selection matters because PowerPoint applies formatting to exactly what is highlighted — a stray trailing space picked up in the selection is how one word ends up a different size.",
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
"Copy leaves the original in place; cut removes it. The keyboard versions are worth using — Ctrl+C, Ctrl+X, Ctrl+V — because they work identically in Word, Excel, and your browser.",
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
"Pasting normally brings the source formatting with it, which is why text copied from a web page arrives in the wrong font on a coloured background. Ctrl+Shift+V, or Paste Options > Keep Text Only, brings the words and leaves the formatting behind. On a slide, where consistency is most of what looks professional, that is almost always what you want.",
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
"Emphasis works by contrast, which makes it a budget. Bold one phrase on a slide and the eye goes there; bold six and you have emphasized nothing. Before formatting anything, decide which single thing the audience should see first.",
},
{
type: "paragraph",
text:
"Prefer the placeholder's own styling to manual formatting wherever you can. Text typed into a layout placeholder inherits size, font, and position from the Slide Master, so it matches every other slide automatically. Formatting applied by hand has to be repeated, and it drifts.",
},
{
type: "image",
src: "/images/powerpoint/module-2/text-basics/text-basics_ribbon_commands.png",
alt: "Font and paragraph commands in the PowerPoint ribbon",
},
{
type: "paragraph",
text:
"Bold for emphasis, and use it sparingly. Avoid underline entirely on a slide: readers read underlined text as a hyperlink and some will wait for it to do something. Italic is harder to read when projected, so keep italic runs short.",
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

{
heading: "Knowledge Check",
blocks: [
{
  type: "knowledge-check",
  question: "How do you select all text in a text box in PowerPoint?",
  options: [
    "Right-click the text box and choose Select All",
    "Click the text box, then press Ctrl + A",
    "Double-click the text box border",
    "Go to Home → Select → Select All Text",
  ],
  correctIndex: 1,
  explanation: "Clicking the text box places your cursor inside it, and Ctrl+A then selects all the text within that box rather than every object on the slide.",
  optionRationales: [
    "PowerPoint's right-click menu for a text box has no Select All command.",
    "Correct. Click into the box to place the cursor, then Ctrl+A selects all the text inside it.",
    "Double-clicking the border selects the text box as an object, which lets you format the box rather than edit its text. Useful, but not the same thing.",
    "Home > Select offers Select All for objects on the slide, not for text inside one box.",
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
objectives: [
  "Create bulleted and numbered lists and change their levels",
  "Choose between bullets and numbers based on whether order matters",
  "Explain why long bulleted lists undermine a presentation",
  "Convert a list into a stronger visual when appropriate",
],
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
     heading: "The bullet list is the default, and rarely the best choice",
     blocks: [
       {
         type: "scenario",
         role: "You explain the referral workflow at Lakeside Medical Associates.",
         text: "Six bullets describing six sequential steps. The audience sees six equal-looking items and cannot tell that order matters, that step three depends on step two, or where the decision point is. A simple diagram would have shown all three instantly.",
         task: "Use numbers when sequence matters, and consider whether a list is the right form at all.",
       },
       {
         type: "paragraph",
         text: "Bullets signal a set with no order. Numbers signal sequence. Using bullets for a procedure actively misinforms, because readers take the formatting as meaning — the same rule that applies in Word applies here, and matters more, because a slide gets a glance rather than a careful read.",
       },
       {
         type: "paragraph",
         text: "It is also worth asking whether a list is the right form at all. A sequence is usually clearer as a process diagram, a comparison as a two-column table, and a proportion as a chart. Bullets are the default because they are easy to type, not because they communicate well.",
       },
       {
         type: "tip",
         text: "Tab demotes a bullet to the next level and Shift+Tab promotes it, which works as you type. If you find yourself needing a third or fourth level on a slide, the content has outgrown the format — split it into several slides or move it to a handout.",
       },
     ],
   },

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

{
heading: "Knowledge Check",
blocks: [
{
  type: "knowledge-check",
  question: "When should you use a numbered list on a slide?",
  options: [
    "When you want to add visual variety with different bullet symbols",
    "When the order of items does not matter",
    "When the order of items matters",
    "When you have more than five items to list",
  ],
  correctIndex: 2,
  explanation: "Numbers communicate sequence. Use them whenever steps must happen in a particular order; bullets tell the audience the order does not matter, which misleads them on a procedure.",
  optionRationales: [
    "Visual variety is not a reason to change list type. The list type carries meaning, and choosing it for looks misinforms.",
    "That is exactly when bullets are appropriate — numbers would imply an order that does not exist.",
    "Correct. Numbers signal sequence, so use them whenever order matters.",
    "Item count has no bearing on the choice. If anything, more than five or six items suggests the slide should be split.",
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
objectives: [
  "Adjust line spacing and paragraph spacing in a placeholder",
  "Use indent levels to show hierarchy",
  "Explain how whitespace affects legibility from a distance",
  "Recognize when spacing changes are hiding a content problem",
],
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
     heading: "Whitespace is what makes a slide readable from the back",
     blocks: [
       {
         type: "scenario",
         role: "You prepare a training slide at Lakeside Medical Associates.",
         text: "You cram five bullets in by cutting line spacing to 0.8. On your monitor it is fine. Projected in a room with the lights on, the lines run together into a grey block and the people at the back read none of it.",
         task: "Use spacing to aid legibility, and treat crowding as a signal to cut content.",
       },
       {
         type: "paragraph",
         text: "Line spacing between about 1.0 and 1.2 suits most slide text. Tighter than that and lines start to merge visually at a distance, particularly with a projector's reduced contrast. Space between paragraphs matters more on a slide than in a document, because it is what separates one idea from the next at a glance.",
       },
       {
         type: "callout",
         variant: "warning",
         text: "Reducing line spacing to fit more content is treating the symptom. Crowding means the slide is carrying more than a slide can carry — the fix is to split it or move detail to the notes. A slide that only fits at 0.8 spacing and 16 point will not be read by anyone beyond the second row.",
       },
     ],
   },

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

{
heading: "Knowledge Check",
blocks: [
{
  type: "knowledge-check",
  question: "What does increasing line spacing do?",
  options: [
    "Increases the font size of the selected text",
    "Adds more space between lines of text, improving readability",
    "Moves the text box higher on the slide",
    "Changes the indent level of bullet points",
  ],
  correctIndex: 1,
  explanation: "Line spacing controls the vertical gap between lines within a paragraph. On a slide, adequate spacing is what keeps lines from merging visually when projected at a distance.",
  optionRationales: [
    "Font size is a separate setting. Line spacing changes the gaps between lines, not the size of the characters.",
    "Correct. It adds space between lines, which improves legibility — especially when projected.",
    "Position on the slide is controlled by moving the placeholder. Line spacing works inside it.",
    "Indent level is changed with Tab and Shift+Tab or the indent buttons. Spacing and indentation are independent.",
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
objectives: [
  "Find text across all slides in a presentation",
  "Replace text throughout a deck",
  "Use Replace Fonts to swap a typeface everywhere",
  "Check that a replacement has not broken anything",
],
duration: "7 min",
videoUrl: "https://www.youtube.com/embed/TEqzwdC4x58",

practiceFiles: [
{
name: "Find and Replace Practice File",
url: "/practice/powerpoint/module-2/find-replace/Powerpoint_FindReplace_Practice.pptx",
},
],

sections: [

  {
     heading: "One command for a change that touches every slide",
     blocks: [
       {
         type: "scenario",
         role: "You update the orientation deck at Lakeside Medical Associates.",
         text: "The practice changes its name. The old name appears on thirty-one of forty slides, including several inside diagrams. Slide by slide, this is half an hour and a guarantee of missing two.",
         task: "Replace throughout the deck in one action, then verify the result.",
       },
       {
         type: "paragraph",
         text: "Replace (Ctrl+H) works across every slide at once. Match case is available and worth using for a proper noun, so you change the practice name without touching an ordinary word that happens to contain the same letters.",
       },
       {
         type: "callout",
         variant: "info",
         text: "Replace Fonts, on the Replace dropdown, swaps one typeface for another everywhere in the deck. It is the correct fix when you inherit a presentation using a font your machine does not have, and far faster than selecting text on every slide. Check the deck afterwards — different fonts have different widths, so text that fitted before may now overflow its placeholder.",
       },
       {
         type: "tip",
         text: "Find and Replace does not reach text inside images or embedded objects. After a replacement, use Outline View to confirm the old text is gone from all the real text, and then look through the slides for any that appears in a picture or a screenshot.",
       },
     ],
   },

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

{
heading: "Knowledge Check",
blocks: [
{
  type: "knowledge-check",
  question: "What is the main use of Replace in PowerPoint?",
  options: [
    "To format all instances of a word with bold or italic",
    "To delete a word or phrase from every slide",
    "To swap one word or phrase for another throughout the whole presentation",
    "To move text from one slide to another",
  ],
  correctIndex: 2,
  explanation: "Replace swaps one word or phrase for another throughout the entire presentation in a single action, rather than requiring you to edit each slide.",
  optionRationales: [
    "Replace changes the text itself, not its formatting. Formatting every instance is a separate task.",
    "Deleting is possible by replacing with nothing, but that is a special case rather than what Replace is for.",
    "Correct. It swaps one word or phrase for another across every slide at once.",
    "Moving text between slides is done by cutting and pasting. Replace changes text in place.",
  ],
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



];