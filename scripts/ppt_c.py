import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from enrich import apply

M5 = {
"inserting-pictures": {
  "objectives": [
    "Insert pictures from your computer, online sources, and screen captures",
    "Use Screen Clipping to capture part of the screen",
    "Choose images that carry meaning rather than decorate",
    "Respect licensing when using images you did not create",
  ],
  "opening": {
    "heading": "An image should do a job",
    "blocks": [
      {"type": "scenario",
       "role": "You build a training deck at Lakeside Medical Associates.",
       "text": "You add a stock photo of smiling people in scrubs to every slide because the slides looked bare. None of the photos relate to what the slides say. They add nothing, they cost the audience a moment of attention each time, and the file is now 40 MB.",
       "task": "Use images that carry information, and leave slides alone when they do not need one."},
      {"type": "paragraph",
       "text": "A picture earns its place when it shows something words handle poorly — what a form looks like, where a control sits, how a workflow branches, what a trend does. A screenshot of the actual EHR screen teaches. A stock photo of anonymous clinicians does not."},
      {"type": "callout", "variant": "warning",
       "text": "Images found through a web search are not free to use. Most are copyrighted, and using one in materials your organization distributes creates real exposure. Use PowerPoint's built-in stock images, photographs your practice owns, or sources with an explicit license that permits your use — and keep a note of where each came from."},
      {"type": "callout", "variant": "warning",
       "text": "Screenshots of clinical systems are a particular risk. Before capturing any screen showing patient data, use a training or demo environment, or fully redact the information — and redact by editing the image itself, not by covering it with a shape. A shape laid over a name in PowerPoint can simply be dragged aside by anyone who opens the file."},
    ],
  },
  "checks": [{"explanation": "Screen Clipping, on the Screenshot dropdown, dims the screen and lets you drag a rectangle around just the region you want, inserting that area alone.",
    "rationales": [
      "Screenshot inserts a whole available window. Screen Clipping is the option on its menu for capturing a region.",
      "Correct. Screen Clipping captures only the part of the screen you drag around.",
      "Online Pictures searches the web for images rather than capturing your own screen.",
      "Insert Object embeds a file or another application's content, which is a different feature.",
    ]}],
},
"formatting-pictures": {
  "objectives": [
    "Crop, resize, and adjust images without distorting them",
    "Compress images to control presentation file size",
    "Remove a background to isolate a subject",
    "Add alt text so images are accessible",
  ],
  "opening": {
    "heading": "Never resize an image by dragging a side handle",
    "blocks": [
      {"type": "scenario",
       "role": "You finish the orientation deck at Lakeside Medical Associates.",
       "text": "You widen a staff photo by dragging the right-hand handle to fill the space. Everyone in the photo is now noticeably stretched. The file is also 60 MB, because eleven phone photos are embedded at full resolution, and it bounces from the practice's email.",
       "task": "Resize proportionally and compress deliberately."},
      {"type": "paragraph",
       "text": "Dragging a side or top handle changes one dimension only, which distorts the image — obvious and unflattering on any photo containing a face. Always drag a corner handle, which preserves the aspect ratio, and hold Shift if you want to be certain."},
      {"type": "paragraph",
       "text": "Compression is the other habit. Picture Format > Compress Pictures reduces embedded images to a resolution appropriate for the output. For a projected presentation, 150 ppi is ample and will typically cut the file size by an order of magnitude. Uncheck 'Apply only to this picture' to compress the whole deck at once."},
      {"type": "callout", "variant": "warning",
       "text": "Check 'Delete cropped areas of pictures' when compressing. Cropping only hides the removed region — the pixels remain in the file, and anyone can drag the crop handles back out to reveal them. If you cropped a photo to remove a patient in the background, that person is still in the file until you delete the cropped areas."},
      {"type": "tip",
       "text": "Add alt text to every meaningful image: right-click > Edit Alt Text. Describe what the image conveys rather than what it depicts. Mark purely decorative images as decorative so screen readers skip them."},
    ],
  },
  "checks": [{"explanation": "Compress Pictures reduces the resolution of embedded images to what the output actually needs, which is usually the largest single reduction available to a presentation's file size.",
    "rationales": [
      "Picture Styles add frames and effects. They change appearance and can slightly increase file size.",
      "Cropping hides part of an image but leaves the hidden pixels in the file unless you also delete cropped areas during compression.",
      "Correct. Compress Pictures lowers embedded image resolution and can discard cropped regions.",
      "Corrections adjusts brightness and sharpness without reducing the stored data.",
    ]}],
},
"shapes-in-powerpoint": {
  "objectives": [
    "Insert, resize, and rotate shapes precisely",
    "Change one shape into another without rebuilding it",
    "Use shape styles consistently across a diagram",
    "Build simple diagrams that explain a process",
  ],
  "opening": {
    "heading": "Shapes make relationships visible",
    "blocks": [
      {"type": "scenario",
       "role": "You explain the referral workflow at Lakeside Medical Associates.",
       "text": "Described in bullets, the workflow takes three slides and still leaves people unsure where the decision point sits. Drawn as boxes, a diamond, and arrows, it fits on one slide and needs no explanation at all.",
       "task": "Use shapes where the relationship between steps is the actual content."},
      {"type": "paragraph",
       "text": "Diagrams are worth building when structure is the point — a sequence, a branch, a hierarchy. Bullets flatten all of these into a list of equal-looking items, which is exactly what loses the structure."},
      {"type": "table",
       "caption": "Handles on a selected shape",
       "columns": ["Handle", "Appearance", "Does"],
       "rows": [
         ["Sizing", "White squares at corners and edges", "Resizes — use corners to keep proportions"],
         ["Rotation", "Circular arrow above the shape", "Rotates; hold Shift for 15° increments"],
         ["Adjustment", "Yellow dot", "Changes the shape's proportions, such as an arrow's head size"],
         ["Connection", "Grey dots on the outline", "Anchors a connector so it follows the shape when moved"],
       ]},
      {"type": "tip",
       "text": "Edit Shape > Change Shape converts an existing shape to a different one while keeping its size, position, text, and formatting. When a rectangle should have been a diamond, this is one command instead of rebuilding and re-styling it."},
    ],
  },
  "checks": [
    {"explanation": "The circular arrow handle above a selected shape rotates it. Holding Shift while dragging constrains rotation to 15-degree increments.",
     "rationales": [
       "The yellow adjustment handle changes a shape's internal proportions, such as the thickness of an arrow.",
       "Corner sizing handles resize the shape while preserving its proportions.",
       "Correct. The circular handle above the shape rotates it.",
       "The center point is not a handle. Dragging inside a shape moves it.",
     ]},
    {"explanation": "Edit Shape > Change Shape swaps the shape's geometry while preserving its size, position, text, and formatting — so you never have to rebuild and re-style it.",
     "rationales": [
       "Shape Fill changes the interior color, not the geometry.",
       "Shape Effects adds shadows and reflections, leaving the shape itself unchanged.",
       "Picture Border applies to pictures rather than shapes.",
       "Correct. Edit Shape > Change Shape converts one shape into another, keeping everything else.",
     ]},
  ],
},
"aligning-grouping-objects": {
  "objectives": [
    "Align and distribute objects precisely",
    "Group objects so they move and scale together",
    "Use guides and smart guides for consistent placement",
    "Diagnose why the Group command is sometimes unavailable",
  ],
  "opening": {
    "heading": "Alignment is what the audience notices without noticing",
    "blocks": [
      {"type": "scenario",
       "role": "You finish the workflow diagram at Lakeside Medical Associates.",
       "text": "Five boxes positioned by dragging. Projected at three metres wide, the small misalignments become very visible, and the diagram reads as careless — which is not a good impression for a document describing a clinical process.",
       "task": "Use alignment and distribution so the layout is exact, then group it so it stays that way."},
      {"type": "paragraph",
       "text": "Select several objects and use Shape Format > Align. Align Left puts every left edge on the same coordinate; Distribute Horizontally makes the gaps mathematically equal. Both are exact, and projection magnifies every error that dragging leaves behind."},
      {"type": "paragraph",
       "text": "Group (Ctrl+G) then binds the finished diagram into one object, so moving or resizing it preserves every internal relationship. Without grouping, moving a diagram means moving each piece and re-aligning at the destination."},
      {"type": "callout", "variant": "info",
       "text": "If Group is greyed out, the usual cause is that one selected item is a placeholder rather than a free object. Placeholders belong to the layout and cannot be grouped with ordinary shapes. Either build the diagram entirely from inserted shapes, or copy the placeholder's content into a text box first."},
    ],
  },
  "checks": [
    {"explanation": "Distribute Horizontally makes the horizontal gaps between selected objects equal. It needs at least three objects to be meaningful, since it adjusts the ones between the outermost two.",
     "rationales": [
       "Align Middle lines objects up on a shared horizontal axis. It aligns rather than spaces them.",
       "Correct. Distribute Horizontally equalizes the horizontal spacing between the selected objects.",
       "Send Backward changes stacking order, which controls what sits on top of what.",
       "Group combines objects into one unit but does not reposition them.",
     ]},
    {"explanation": "Placeholders belong to the slide layout rather than to the slide, so they cannot be grouped with ordinary shapes. Selecting one alongside free shapes disables Group.",
     "rationales": [
       "Object size has no effect on whether Group is available.",
       "A read-only file disables editing altogether, not the Group command specifically.",
       "Correct. A placeholder in the selection prevents grouping, because placeholders belong to the layout.",
       "Rotation is unrelated to grouping.",
     ]},
  ],
},
}

M6 = {
"applying-transitions": {
  "objectives": [
    "Apply transitions and control their duration",
    "Explain the difference between a transition and an animation",
    "Choose transitions that support rather than distract",
    "Apply a consistent transition across a whole deck",
  ],
  "opening": {
    "heading": "Restraint is the whole skill here",
    "blocks": [
      {"type": "scenario",
       "role": "You present to the board at Lakeside Medical Associates.",
       "text": "You give each slide a different transition — one spins, one checkerboards, one flips in three dimensions. The board remembers the effects and not a single figure. Each transition also adds a second and a half, which across forty slides is a minute of watching animation.",
       "task": "Use one subtle transition throughout, or none at all."},
      {"type": "paragraph",
       "text": "A transition is the effect between slides; an animation is the effect applied to an object on a slide. Both cost attention, and attention is the scarcest thing in a presentation."},
      {"type": "paragraph",
       "text": "The working guidance is: pick one subtle transition — Fade or Push — apply it to every slide with Apply To All, and set the duration to around 0.5 seconds. Consistency makes the transition invisible, which is exactly what you want. Anything the audience notices is competing with your content."},
      {"type": "tip",
       "text": "Reserve a distinct transition for genuine structural breaks — the move from one section to the next. Used sparingly it becomes a signal that the topic is changing, which is real communication rather than decoration."},
    ],
  },
  "checks": [{"explanation": "A transition is the visual effect that plays as one slide replaces the next. Effects applied to objects on a single slide are animations, which are a separate tab.",
    "rationales": [
      "That describes an animation, which applies to an object on a slide.",
      "Transitions can include a sound, but the transition itself is the visual effect between slides.",
      "Correct. A transition plays when moving from one slide to the next.",
      "Hiding slides is done with right-click > Hide Slide and is unrelated to transitions.",
    ]}],
},
"animating-text-and-objects": {
  "objectives": [
    "Apply entrance, emphasis, and exit animations",
    "Control animation order and start timing",
    "Use the Animation Pane to manage a sequence",
    "Judge when animation clarifies and when it distracts",
  ],
  "opening": {
    "heading": "Animate to control attention, not to decorate",
    "blocks": [
      {"type": "scenario",
       "role": "You explain a four-stage process at Lakeside Medical Associates.",
       "text": "All four stages appear at once and the audience reads ahead to stage four while you are still on stage one. Revealing each stage as you reach it keeps everyone with you — which is the one thing animation genuinely does well.",
       "task": "Use animation to control when information arrives, and leave it alone otherwise."},
      {"type": "paragraph",
       "text": "The legitimate use of animation is sequencing: revealing points as you discuss them so the audience attends to the one you are on. Almost every other use costs attention without returning any."},
      {"type": "table",
       "caption": "Start timing options",
       "columns": ["Setting", "Plays", "Use for"],
       "rows": [
         ["On Click", "When you click", "Revealing points at your own pace"],
         ["With Previous", "At the same time as the previous animation", "Two elements that belong together"],
         ["After Previous", "Automatically when the previous one finishes", "A self-running sequence with no clicking"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "The Animation Pane (Animations > Animation Pane) lists every animation on the slide in order, with its trigger and duration. On any slide with more than two animations it is the only practical way to see and reorder the sequence — dragging entries in the pane is far easier than guessing from the numbered markers on the slide."},
    ],
  },
  "checks": [{"explanation": "After Previous starts the animation automatically once the preceding one finishes, requiring no click. With Previous starts it simultaneously with the preceding animation instead.",
    "rationales": [
      "On Click waits for you to click before playing.",
      "With Previous plays at the same time as the previous animation rather than after it.",
      "Correct. After Previous plays automatically once the preceding animation completes.",
      "There is no 'Delayed Start' option. Delay is a separate timing field applied to any of the three start settings.",
    ]}],
},
"working-with-audio": {
  "objectives": [
    "Insert audio and control how it plays",
    "Set audio to continue across multiple slides",
    "Hide the audio icon during a show",
    "Consider accessibility when a presentation relies on sound",
  ],
  "opening": {
    "heading": "Audio that stops at the slide boundary",
    "blocks": [
      {"type": "scenario",
       "role": "You build a self-running display for the waiting room at Lakeside Medical Associates.",
       "text": "You add background music to the first slide. It stops the moment the deck advances, because by default audio belongs to the slide it was inserted on.",
       "task": "Configure audio playback so it behaves the way the presentation requires."},
      {"type": "paragraph",
       "text": "Select the audio icon and use the Playback tab. 'Play Across Slides' lets it continue as the deck advances; 'Loop until Stopped' repeats it; 'Hide During Show' removes the speaker icon from view. For a looping waiting-room display you generally want all three."},
      {"type": "callout", "variant": "warning",
       "text": "Never let audio be the only way information is conveyed. Deaf and hard-of-hearing viewers, and anyone watching with the sound off — which is most people in a waiting room — receive nothing. Any narration needs on-screen text carrying the same content. Music must be licensed for the use; commercial recordings are not free to play in a public waiting area."},
    ],
  },
  "checks": [{"explanation": "Play Across Slides lets the audio continue as the presentation advances, instead of stopping when the slide it belongs to is replaced.",
    "rationales": [
      "Loop until Stopped repeats the clip, but it still stops when the slide changes unless Play Across Slides is also set.",
      "Hide During Show only conceals the speaker icon. It has no effect on playback.",
      "Correct. Play Across Slides keeps the audio playing as you move between slides.",
      "When Clicked On means the audio starts on a click rather than automatically.",
    ]}],
},
"working-with-video": {
  "objectives": [
    "Insert video from a file or an online source",
    "Trim a video and set a poster frame",
    "Control playback options",
    "Prepare video so it works on another machine",
  ],
  "opening": {
    "heading": "Video is where presentations fail on unfamiliar hardware",
    "blocks": [
      {"type": "scenario",
       "role": "You present a training deck at Lakeside Medical Associates.",
       "text": "Your video plays perfectly at your desk. On the conference room machine the slide shows a black rectangle, because the deck was linked to a file still sitting on your computer, and the guest network cannot reach the online copy either.",
       "task": "Embed and optimize media so the deck is genuinely self-contained."},
      {"type": "paragraph",
       "text": "Video inserted from your PC is embedded in the file, which is what makes the deck portable — at the cost of size. Online video is linked, so it needs a working connection and an unblocked site at presentation time. Conference room networks frequently block video platforms."},
      {"type": "paragraph",
       "text": "A poster frame is the still image shown before the video plays. By default it is the first frame, which is often black. Playback > Poster Frame lets you choose a meaningful frame, so the slide looks intentional rather than broken while you introduce it."},
      {"type": "callout", "variant": "warning",
       "text": "Before presenting from another machine, run File > Info > Optimize Media Compatibility. It embeds and re-encodes media into formats that play reliably elsewhere. Then test the deck on the actual presentation machine — media is the most common single point of failure in a presentation, and it fails silently until you are standing in front of people."},
    ],
  },
  "checks": [{"explanation": "The poster frame is the still image displayed on the slide before the video plays. Setting a meaningful one avoids the black rectangle that the default first frame often produces.",
    "rationales": [
      "The final frame is simply where playback ends. It is not a separate setting.",
      "Correct. The poster frame is the still image shown before playback begins.",
      "A picture placed behind the video would be a separate object on the slide.",
      "Border styling is applied from Video Format. The poster frame is the preview image.",
    ]}],
},
}

M7 = {
"inserting-tables": {
  "objectives": [
    "Insert and format a table on a slide",
    "Navigate a table and add rows efficiently",
    "Use table style options to aid reading",
    "Judge when a table belongs on a slide at all",
  ],
  "opening": {
    "heading": "Most tables do not belong on a slide",
    "blocks": [
      {"type": "scenario",
       "role": "You present budget figures at Lakeside Medical Associates.",
       "text": "You paste a twelve-column, thirty-row table from Excel onto a slide. At the back of the room it is a grey texture. Nobody reads a single figure, and the two numbers that actually mattered are lost among four hundred that did not.",
       "task": "Put the few figures that matter on the slide, and give the full table out as a handout."},
      {"type": "paragraph",
       "text": "A slide is glanced at from a distance. A table with more than about five columns and six rows exceeds what that allows. If the audience needs the full data set, it belongs in a handout or an appendix — and the slide should carry the three numbers your point actually rests on."},
      {"type": "tip",
       "text": "Banded rows are the highest-value table formatting on a slide: alternating shading lets the eye track across a row without losing its place, which matters much more at a distance than up close. Turn on Header Row as well, so the labels are visibly distinct from the data."},
    ],
  },
  "checks": [
    {"explanation": "Tab in the last cell adds a new row and moves the cursor into it, so you can keep typing without deciding the row count in advance.",
     "rationales": [
       "The table stays selected and active.",
       "Tab never adds columns; columns are added from the Table Layout tab.",
       "That is what Ctrl+Home does. Tab moves forward.",
       "Correct. A new row is added at the bottom and the cursor moves into it.",
     ]},
    {"explanation": "Banded Rows applies alternating shading to rows, which helps the eye track across a row — particularly valuable when the table is being read from a distance.",
     "rationales": [
       "Header Row formats the first row distinctly as column labels.",
       "Total Row emphasizes a summary row at the bottom.",
       "Correct. Banded Rows shades alternate rows to aid horizontal tracking.",
       "First Column emphasizes the leftmost column, usually the row labels.",
     ]},
  ],
},
"inserting-charts": {
  "objectives": [
    "Insert a chart and edit its underlying data",
    "Choose a chart type that answers the audience's question",
    "Simplify a chart so it reads from the back of a room",
    "Update a chart when the source figures change",
  ],
  "opening": {
    "heading": "A presentation chart needs to be simpler than a report chart",
    "blocks": [
      {"type": "scenario",
       "role": "You present spending trends at Lakeside Medical Associates.",
       "text": "You paste the chart from your Excel report: eight series, gridlines, a legend on the right, and axis labels at nine point. In the report, where a reader can study it, it works. Projected, it is a coloured tangle.",
       "task": "Rebuild the chart for a glance from six metres away, not for a reader at a desk."},
      {"type": "paragraph",
       "text": "A report chart is read; a presentation chart is glanced at. That difference means fewer series — two or three, not eight — larger type, no gridlines, and direct labels on the lines rather than a legend the eye has to travel to and match by colour."},
      {"type": "table",
       "caption": "Choosing a chart type",
       "columns": ["The question", "Chart"],
       "rows": [
         ["How did this change over time?", "Line"],
         ["How do these categories compare?", "Column or bar"],
         ["What share of the whole is each part?", "Pie, five or fewer slices"],
         ["Are these two measures related?", "Scatter"],
       ]},
      {"type": "callout", "variant": "warning",
       "text": "Start a column chart's value axis at zero. Readers judge bar length, so a truncated axis makes a small difference look dramatic. Presenting a misleading chart damages your credibility even when the distortion was accidental — and it usually is."},
    ],
  },
  "checks": [
    {"explanation": "A line chart shows change over a continuous period. The connecting line is read as continuity, which makes the shape of the trend immediately visible.",
     "rationales": [
       "Pie charts show composition at one moment and cannot express change over time.",
       "Column charts compare discrete categories well and can show time, but a line expresses a continuous trend more directly.",
       "Correct. Line charts show trends over time.",
       "Scatter charts show the relationship between two measures rather than a trend over time.",
     ]},
    {"explanation": "Right-clicking the chart and choosing Edit Data opens the embedded worksheet holding the chart's values. Change them there and the chart redraws immediately.",
     "rationales": [
       "Deleting and rebuilding discards all your formatting for no reason.",
       "Correct. Edit Data opens the underlying worksheet.",
       "The Format tab styles the chart's appearance; it does not hold the values.",
       "Double-clicking the legend opens legend formatting options.",
     ]},
  ],
},
"using-smartart": {
  "objectives": [
    "Insert SmartArt and choose a category that fits the relationship",
    "Add and reorder items using the Text Pane",
    "Convert bullet lists into SmartArt",
    "Recognize when SmartArt clarifies and when it merely decorates",
  ],
  "opening": {
    "heading": "SmartArt is only useful when the shape means something",
    "blocks": [
      {"type": "scenario",
       "role": "You present the referral process at Lakeside Medical Associates.",
       "text": "Six sequential steps as bullets read as six equal items. The same six in a Process graphic show direction, order, and where the flow branches — the structure becomes visible rather than merely stated.",
       "task": "Choose the SmartArt category that matches the actual relationship in your content."},
      {"type": "paragraph",
       "text": "SmartArt builds a diagram from text you type, keeping every element aligned and consistently styled. Its value is that the layout carries meaning — but only if you choose the category that matches your content's real structure. A Cycle graphic applied to a linear process tells the audience something untrue."},
      {"type": "table",
       "caption": "SmartArt categories",
       "columns": ["Category", "Shows", "Use for"],
       "rows": [
         ["Process", "A sequence with direction", "Steps in a workflow"],
         ["Cycle", "A repeating loop", "A process that genuinely returns to its start"],
         ["Hierarchy", "Levels of reporting or containment", "Org charts, classification"],
         ["Relationship", "Connection between items", "Overlaps, opposing forces"],
         ["Matrix", "Parts of a whole in quadrants", "Two-axis categorization"],
         ["List", "Grouped items, no sequence", "Bullets that need visual grouping"],
       ]},
      {"type": "tip",
       "text": "Type in the Text Pane rather than clicking each shape. Enter adds an item, Tab demotes it, Shift+Tab promotes it — and SmartArt re-lays out and resizes everything automatically. Building a diagram this way takes a fraction of the time of positioning shapes by hand."},
    ],
  },
  "checks": [
    {"explanation": "Process graphics show a sequence with direction, which is exactly what a workflow is. The arrows communicate order — something a bulleted list cannot do.",
     "rationales": [
       "Cycle shows a repeating loop returning to its start, which misrepresents a linear workflow.",
       "Hierarchy shows levels of reporting or containment, as in an org chart.",
       "Correct. Process graphics show sequential steps with direction.",
       "Matrix shows parts of a whole arranged in quadrants.",
     ]},
    {"explanation": "In the Text Pane, pressing Enter creates a new bullet and SmartArt adds a corresponding shape, re-laying out the whole graphic automatically.",
     "rationales": [
       "Insert > Shape adds a free shape to the slide, which is not part of the SmartArt graphic.",
       "Correct. Enter in the Text Pane adds an item and SmartArt creates the shape for it.",
       "Shapes cannot be dragged in from the Format tab.",
       "The slide title is a separate placeholder and has no connection to the SmartArt.",
     ]},
  ],
},
}

M8 = {
"checking-spelling-and-comments": {
  "objectives": [
    "Run spell check across a presentation",
    "Add, reply to, and resolve comments",
    "Remove comments before presenting or distributing",
    "Proofread the things spell check cannot catch",
  ],
  "opening": {
    "heading": "Errors are magnified by a projector",
    "blocks": [
      {"type": "scenario",
       "role": "You present to external partners at Lakeside Medical Associates.",
       "text": "Slide four carries a typo in a heading, three inches tall on the screen. A reviewer's comment is also still attached — 'is this number even right?' — visible to the room.",
       "task": "Clear comments and proofread properly before anything is projected."},
      {"type": "paragraph",
       "text": "Spell check catches misspellings and nothing else. It will not notice 'from' where you meant 'form,' a title that is wrong, or a number that contradicts the previous slide. Reading the deck through once in Reading View is what catches those, and it takes a few minutes."},
      {"type": "callout", "variant": "warning",
       "text": "Comments are visible in Normal view and can appear in Presenter View, so a frank internal remark can end up in front of an audience or a client. Delete every comment before presenting or distributing, and run File > Info > Check for Issues > Inspect Document to confirm none remain — along with any presentation notes or metadata you would not want shared."},
    ],
  },
  "checks": [{"explanation": "Comments should be deleted or resolved before presenting so no internal remark can appear on screen or in Presenter View. Inspect Document confirms none remain.",
    "rationales": [
      "Printing internal comments as handouts distributes exactly what should not be shared.",
      "PowerPoint has no footnotes, and converting would not remove the content anyway.",
      "Correct. Delete or resolve comments so they cannot be seen during the presentation.",
      "Moving comments to the Notes pane keeps them in the file, and notes are visible in Presenter View.",
    ]}],
},
"presenting-your-slideshow": {
  "objectives": [
    "Start a slide show from the beginning or the current slide",
    "Use Presenter View during a live presentation",
    "Use pen, highlighter, and screen blanking",
    "Set up a self-running presentation",
  ],
  "opening": {
    "heading": "Know the controls before you are standing up",
    "blocks": [
      {"type": "scenario",
       "role": "You present at the staff meeting at Lakeside Medical Associates.",
       "text": "Someone asks about slide 22 while you are on slide 8. You either click forward fourteen times while everyone watches, or you know that typing 22 and pressing Enter jumps straight there.",
       "task": "Learn the handful of controls that let you respond to a room instead of fighting the software."},
      {"type": "table",
       "caption": "Presentation controls",
       "columns": ["Key", "Does"],
       "rows": [
         ["F5", "Starts from the beginning"],
         ["Shift + F5", "Starts from the current slide"],
         ["Number then Enter", "Jumps to that slide"],
         ["B / W", "Blanks the screen black or white"],
         ["Ctrl + P", "Pen; Ctrl+A returns to the arrow"],
         ["Esc", "Ends the show"],
       ]},
      {"type": "tip",
       "text": "Shift+F5 starts from the slide you are on, which is what you want when rehearsing a single section. Restarting from slide one every time you want to check slide 30 is a surprisingly large waste of a rehearsal."},
    ],
  },
  "checks": [
    {"explanation": "F5 starts the slide show from the first slide. Shift+F5 starts from the slide you are currently on, which is the one to use when rehearsing a section.",
     "rationales": [
       "Ctrl+P opens the print dialog outside a show, and switches to the pen during one.",
       "Correct. F5 starts the presentation from the beginning.",
       "Shift+F5 starts from the current slide rather than the beginning.",
       "Ctrl+F5 is not a PowerPoint presentation shortcut.",
     ]},
    {"explanation": "Presenter View shows your speaker notes, the next slide, and an elapsed timer on your screen, while the audience display shows only the current slide.",
     "rationales": [
       "The theme is visible to everyone — it is how the slides look.",
       "Animations play on the audience display as designed.",
       "Correct. Presenter View privately shows notes, the next slide, and a timer.",
       "File details are not shown in Presenter View.",
     ]},
  ],
},
"sharing-and-exporting": {
  "objectives": [
    "Export a presentation to PDF, video, and other formats",
    "Package a presentation with its media for another machine",
    "Share by link with appropriate permissions",
    "Choose a distribution format based on the recipient's need",
  ],
  "opening": {
    "heading": "Decide what the recipient needs to do with it",
    "blocks": [
      {"type": "scenario",
       "role": "You distribute the orientation deck at Lakeside Medical Associates.",
       "text": "Three audiences: new hires who need to watch it, a colleague who must update it next quarter, and a partner organization that only needs to read it. One format cannot serve all three.",
       "task": "Match the export format to what each recipient actually needs to do."},
      {"type": "table",
       "caption": "Distribution formats",
       "columns": ["Recipient needs to", "Send", "Why"],
       "rows": [
         ["Watch it without you", "MP4 video", "Preserves animation, timing, and narration"],
         ["Edit it", ".pptx via OneDrive link", "Editable, and everyone stays on one version"],
         ["Read it", "PDF", "Opens anywhere and cannot be altered casually"],
         ["Present it elsewhere", "Package for CD", "Bundles fonts and media into a portable folder"],
       ]},
      {"type": "callout", "variant": "info",
       "text": "Package Presentation for CD is badly named — it produces a folder, and CDs are long gone. What it actually does is still useful: it bundles the presentation with all linked media and embedded fonts, so the whole thing works on a machine that has neither. Copy that folder to a USB drive when you are presenting somewhere unfamiliar."},
    ],
  },
  "checks": [
    {"explanation": "PDF preserves layout and fonts exactly and opens on any device without PowerPoint. It loses animation, transitions, and embedded media, so it suits reading rather than presenting.",
     "rationales": [
       ".pptx requires PowerPoint or a compatible viewer and remains fully editable.",
       ".docx is a Word document format and is not a presentation export.",
       "Correct. PDF preserves formatting and opens without PowerPoint.",
       ".xlsx is an Excel workbook format, unrelated to presentations.",
     ]},
    {"explanation": "Package Presentation for CD bundles the presentation with its linked media and embedded fonts into one folder, so it plays correctly on a computer that lacks those fonts or media files.",
     "rationales": [
       "It usually increases total size, since it gathers all linked files together.",
       "Correct. It bundles the presentation and its media into a portable folder for use on other machines.",
       "Converting to video is a separate option under File > Export > Create a Video.",
       "Sharing on OneDrive is done with the Share button.",
     ]},
  ],
},
}

apply("lib/content/ms-office/powerpoint/module5Lessons.ts", M5)
apply("lib/content/ms-office/powerpoint/module6Lessons.ts", M6)
apply("lib/content/ms-office/powerpoint/module7Lessons.ts", M7)
apply("lib/content/ms-office/powerpoint/module8Lessons.ts", M8)
