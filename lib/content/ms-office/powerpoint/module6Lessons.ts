import { Lesson } from "@/types/lesson";

export const powerpointModule6Lessons: Lesson[] = [ 

{
slug: "applying-transitions",
title: "Applying Slide Transitions",
description:
"Learn how to add visual effects between slides, preview transitions, and control timing in PowerPoint.",
objectives: [
  "Apply transitions and control their duration",
  "Explain the difference between a transition and an animation",
  "Choose transitions that support rather than distract",
  "Apply a consistent transition across a whole deck",
],
duration: "9 min",
videoUrl: "https://www.youtube.com/embed/Ey1atEavZ-M",

practiceFiles: [
{
name: "Applying Transitions Practice File",
url: "/practice/powerpoint/module-6/transitions/Powerpoint_Transitions_Practice.pptx",
},
],

sections: [

  {
     heading: "Restraint is the whole skill here",
     blocks: [
       {
         type: "scenario",
         role: "You present to the board at Lakeside Medical Associates.",
         text: "You give each slide a different transition — one spins, one checkerboards, one flips in three dimensions. The board remembers the effects and not a single figure. Each transition also adds a second and a half, which across forty slides is a minute of watching animation.",
         task: "Use one subtle transition throughout, or none at all.",
       },
       {
         type: "paragraph",
         text: "A transition is the effect between slides; an animation is the effect applied to an object on a slide. Both cost attention, and attention is the scarcest thing in a presentation.",
       },
       {
         type: "paragraph",
         text: "The working guidance is: pick one subtle transition — Fade or Push — apply it to every slide with Apply To All, and set the duration to around 0.5 seconds. Consistency makes the transition invisible, which is exactly what you want. Anything the audience notices is competing with your content.",
       },
       {
         type: "tip",
         text: "Reserve a distinct transition for genuine structural breaks — the move from one section to the next. Used sparingly it becomes a signal that the topic is changing, which is real communication rather than decoration.",
       },
     ],
   },

{
heading: "What are Slide Transitions?",
blocks: [
{
type: "paragraph",
text:
"A slide transition is a visual effect that occurs when moving from one slide to the next during a presentation.",
},
{
type: "paragraph",
text:
"Transitions can be simple effects like fading between slides or more dynamic animations that add movement and energy to your presentation.",
},
{
type: "paragraph",
text:
"When used appropriately, transitions can give your presentation a polished and professional appearance.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_subtle.png",
alt: "Examples of subtle transitions in PowerPoint",
},
],
},

{
heading: "Transition Categories",
blocks: [
{
type: "paragraph",
text:
"PowerPoint groups transitions into three categories: Subtle, Exciting, and Dynamic Content.",
},
{
type: "paragraph",
text:
"Subtle transitions use simple animations and are the most commonly used for professional presentations.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_subtle.png",
alt: "Subtle transitions in PowerPoint",
},
{
type: "paragraph",
text:
"Exciting transitions contain more complex animations. These can add visual interest but should be used sparingly.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_exciting.png",
alt: "Exciting transitions in PowerPoint",
},
{
type: "paragraph",
text:
"Dynamic Content transitions animate only slide elements instead of the entire slide, helping maintain visual continuity between slides.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_dynamic_content.png",
alt: "Dynamic content transitions in PowerPoint",
},
],
},

{
heading: "Applying a Transition",
blocks: [
{
type: "paragraph",
text:
"Transitions are applied from the Transitions tab on the PowerPoint ribbon.",
},
{
type: "paragraph",
text:
"To apply a transition, first select the slide that you want the transition to appear on.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_desired_slide.png",
alt: "Selecting a slide to apply a transition",
},
{
type: "paragraph",
text:
"Open the Transitions tab and locate the Transition to This Slide group.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_more_dropdown.png",
alt: "Transitions gallery in PowerPoint",
},
{
type: "paragraph",
text:
"Click a transition to apply it to the selected slide. PowerPoint will automatically preview the transition.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_preview_ribbon.png",
alt: "Preview transition button in PowerPoint",
},
],
},

{
heading: "Previewing Transitions",
blocks: [
{
type: "paragraph",
text:
"You can preview transitions at any time to see how they will appear during your slideshow.",
},
{
type: "paragraph",
text:
"Click the Preview button on the Transitions tab to watch the effect.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_preview_ribbon.png",
alt: "Preview button on the transitions tab",
},
{
type: "paragraph",
text:
"You can also preview the transition by clicking the Play Animations button beside a slide in the slide navigation pane.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_play_animations.png",
alt: "Play animations preview in slide pane",
},
],
},

{
heading: "Applying Transitions to All Slides",
blocks: [
{
type: "paragraph",
text:
"If you want every slide to use the same transition, you can apply it to all slides at once.",
},
{
type: "paragraph",
text:
"After selecting a transition, click Apply to All in the Timing group.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_apply_to_all.png",
alt: "Apply to All button in PowerPoint",
},
],
},

{
heading: "Changing Transition Effects",
blocks: [
{
type: "paragraph",
text:
"Some transitions allow you to customize the direction or style of the effect.",
},
{
type: "paragraph",
text:
"Click Effect Options to choose different variations such as From Left, From Right, From Top, or From Bottom.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_effect_options.png",
alt: "Effect options menu for transitions",
},
],
},

{
heading: "Adjusting Duration and Sound",
blocks: [
{
type: "paragraph",
text:
"You can control how fast a transition plays by adjusting the duration setting.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_duration_timing.png",
alt: "Transition duration setting",
},
{
type: "paragraph",
text:
"PowerPoint also allows you to add sound effects to transitions. However, these should be used sparingly to avoid distracting the audience.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_add_sound.png",
alt: "Transition sound options",
},
],
},

{
heading: "Automatically Advancing Slides",
blocks: [
{
type: "paragraph",
text:
"Normally slides advance when you click the mouse during a presentation.",
},
{
type: "paragraph",
text:
"You can configure slides to automatically advance after a set amount of time.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_after_timing.png",
alt: "Automatic slide timing settings",
},
{
type: "paragraph",
text:
"This feature is useful for presentations that run automatically, such as kiosk displays or trade show presentations.",
},
],
},

{
heading: "Removing Transitions",
blocks: [
{
type: "paragraph",
text:
"If you decide you no longer want a transition on a slide, you can remove it easily.",
},
{
type: "paragraph",
text:
"Select the slide, open the Transitions tab, and choose None from the transition gallery.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_remove_transition.png",
alt: "Removing a transition in PowerPoint",
},
],
},

{
heading: "Completed Slideshow Example",
blocks: [
{
type: "paragraph",
text:
"When transitions are applied consistently and used in moderation, they can improve the flow and professionalism of your presentation.",
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_final_result.gif",
alt: "Example slideshow with transitions applied",
},
],
},

{
heading: "Knowledge Check",
blocks: [
{
type: "knowledge-check",
question: "What is a slide transition?",
options: [
"An animation that moves text onto a slide",
"A sound effect that plays during a presentation",
"A visual effect that plays when moving from one slide to the next",
"A way to hide certain slides during a presentation",
],
correctIndex: 2,
explanation: "A transition is the visual effect that plays as one slide replaces the next. Effects applied to objects on a single slide are animations, which are a separate tab.",
optionRationales: [
  "That describes an animation, which applies to an object on a slide.",
  "Transitions can include a sound, but the transition itself is the visual effect between slides.",
  "Correct. A transition plays when moving from one slide to the next.",
  "Hiding slides is done with right-click > Hide Slide and is unrelated to transitions.",
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
"Apply the Push transition to the first slide.",
"Change the Effect Options to push From Right.",
"Change the transition duration to 2 seconds.",
"Set slides to automatically advance after 3 seconds.",
"Click Apply to All.",
],
},
{
type: "image",
src: "/images/powerpoint/module-6/transitions/transitions_final_result.gif",
alt: "Final slideshow with transitions applied",
},
],

},


{
  slug: "animating-text-and-objects",
  title: "Animating Text and Objects",
  description:
    "Learn how to apply animation effects to text and objects, customize timing, use the Animation Pane, and control the order animations play.",
  objectives: [
    "Apply entrance, emphasis, and exit animations",
    "Control animation order and start timing",
    "Use the Animation Pane to manage a sequence",
    "Judge when animation clarifies and when it distracts",
  ],
  duration: "11 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Animations Practice File",
      url: "/practice/powerpoint/module-6/animations/Powerpoint_Animations_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Animate to control attention, not to decorate",
       blocks: [
         {
           type: "scenario",
           role: "You explain a four-stage process at Lakeside Medical Associates.",
           text: "All four stages appear at once and the audience reads ahead to stage four while you are still on stage one. Revealing each stage as you reach it keeps everyone with you — which is the one thing animation genuinely does well.",
           task: "Use animation to control when information arrives, and leave it alone otherwise.",
         },
         {
           type: "paragraph",
           text: "The legitimate use of animation is sequencing: revealing points as you discuss them so the audience attends to the one you are on. Almost every other use costs attention without returning any.",
         },
         {
           type: "table",
           caption: "Start timing options",
           columns: [
             "Setting",
             "Plays",
             "Use for",
           ],
           rows: [
             [
               "On Click",
               "When you click",
               "Revealing points at your own pace",
             ],
             [
               "With Previous",
               "At the same time as the previous animation",
               "Two elements that belong together",
             ],
             [
               "After Previous",
               "Automatically when the previous one finishes",
               "A self-running sequence with no clicking",
             ],
           ],
         },
         {
           type: "callout",
           variant: "info",
           text: "The Animation Pane (Animations > Animation Pane) lists every animation on the slide in order, with its trigger and duration. On any slide with more than two animations it is the only practical way to see and reorder the sequence — dragging entries in the pane is far easier than guessing from the numbered markers on the slide.",
         },
       ],
     },

    {
      heading: "What Are Animations?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Animations in PowerPoint control how individual objects — text, images, and shapes — appear, move, or disappear on a slide.",
        },
        {
          type: "paragraph",
          text:
            "Unlike transitions, which affect the entire slide, animations target specific objects. This makes them useful for revealing bullet points one at a time or drawing attention to a key graphic.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Use animations purposefully. Too many competing effects on a single slide can distract your audience instead of helping them follow along.",
        },
      ],
    },

    {
      heading: "Animation Categories",
      blocks: [
        {
          type: "paragraph",
          text:
            "PowerPoint organizes animations into four categories based on what they do to an object.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Entrance — controls how an object appears on the slide (e.g., Fade, Fly In, Appear).",
            "Emphasis — draws attention to an object that is already visible (e.g., Pulse, Spin, Grow/Shrink).",
            "Exit — controls how an object leaves the slide (e.g., Fade Out, Fly Out).",
            "Motion Paths — moves an object along a defined path on the slide.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_categories.png",
          alt: "Four animation categories in PowerPoint",
        },
      ],
    },

    {
      heading: "Applying an Animation",
      blocks: [
        {
          type: "paragraph",
          text:
            "To apply an animation, select an object on the slide and open the Animations tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_tab.png",
          alt: "Animations tab on the PowerPoint ribbon",
        },
        {
          type: "paragraph",
          text:
            "Click an effect from the Animation gallery. PowerPoint will immediately preview the animation on your slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_gallery.png",
          alt: "Animation gallery showing entrance, emphasis, and exit effects",
        },
        {
          type: "paragraph",
          text:
            "A number badge appears next to the object, indicating its animation order on the slide.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_number_badge.png",
          alt: "Animation number badge on a slide object",
        },
      ],
    },

    {
      heading: "Effect Options",
      blocks: [
        {
          type: "paragraph",
          text:
            "Many animations offer additional variations through Effect Options. For example, a text box can fade in all at once, or paragraph by paragraph.",
        },
        {
          type: "paragraph",
          text:
            "Click Effect Options on the Animations tab to see the available choices for the selected animation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_effect_options.png",
          alt: "Effect Options menu for animations",
        },
      ],
    },

    {
      heading: "The Animation Pane",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Animation Pane gives you a detailed list of every animation on the current slide and the order in which they play.",
        },
        {
          type: "paragraph",
          text:
            "To open it, click Animation Pane on the Animations tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_pane_open.png",
          alt: "Animation Pane open in PowerPoint",
        },
        {
          type: "paragraph",
          text:
            "You can drag items up or down in the pane to reorder them, and click the Play All button at the top to preview the full sequence.",
        },
      ],
    },

    {
      heading: "Start, Duration, and Delay",
      blocks: [
        {
          type: "paragraph",
          text:
            "Every animation has three timing settings that control when and how fast it plays.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Start — On Click (default), With Previous (plays at the same time as the animation before it), or After Previous (plays automatically after the previous animation ends).",
            "Duration — how long the animation takes to complete.",
            "Delay — how many seconds to wait before the animation begins.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_timing_controls.png",
          alt: "Start, Duration, and Delay timing controls on the Animations tab",
        },
        {
          type: "tip",
          text:
            "Set multiple animations to With Previous or After Previous so the sequence plays automatically without requiring extra clicks.",
        },
      ],
    },

    {
      heading: "Reordering Animations",
      blocks: [
        {
          type: "paragraph",
          text:
            "To change the order that animations play, select an animation in the Animation Pane and use the Move Earlier or Move Later buttons on the Animations tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_reorder.png",
          alt: "Move Earlier and Move Later buttons for reordering animations",
        },
      ],
    },

    {
      heading: "Removing an Animation",
      blocks: [
        {
          type: "paragraph",
          text:
            "To remove an animation, select the object on the slide or select the animation entry in the Animation Pane, then press the Delete key.",
        },
        {
          type: "paragraph",
          text:
            "You can also select the object and choose None from the Animation gallery to clear all animations from that object.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_remove.png",
          alt: "Removing an animation in PowerPoint",
        },
      ],
    },

    {
      heading: "Completed Slide Example",
      blocks: [
        {
          type: "paragraph",
          text:
            "When animations are applied consistently and sequenced correctly, they guide the audience through your content in a controlled and professional way.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/animations/animations_final_result.gif",
          alt: "Slide demonstrating an animated sequence",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which animation start setting causes an animation to play automatically after the previous one ends?",
          options: [
            "On Click",
            "With Previous",
            "After Previous",
            "Delayed Start",
          ],
          correctIndex: 2,
          explanation: "After Previous starts the animation automatically once the preceding one finishes, requiring no click. With Previous starts it simultaneously with the preceding animation instead.",
          optionRationales: [
            "On Click waits for you to click before playing.",
            "With Previous plays at the same time as the previous animation rather than after it.",
            "Correct. After Previous plays automatically once the preceding animation completes.",
            "There is no 'Delayed Start' option. Delay is a separate timing field applied to any of the three start settings.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Select the title text box on slide 2.",
        "Apply the Fly In entrance animation.",
        "Change the Effect Options so the text flies in From Left.",
        "Select the content placeholder on the same slide and apply the Fade entrance animation.",
        "Change the Start setting to After Previous so it plays automatically after the title.",
        "Open the Animation Pane to verify the sequence looks correct.",
        "Preview the animations by clicking Play All.",
      ],
    },
    {
      type: "image",
      src: "/images/powerpoint/module-6/animations/animations_final_result.gif",
      alt: "Final animated slide result",
    },
  ],

},

{
  slug: "working-with-audio",
  title: "Working with Audio",
  description:
    "Learn how to insert audio files into your presentation, control playback settings, trim audio clips, and configure music to play across multiple slides.",
  objectives: [
    "Insert audio and control how it plays",
    "Set audio to continue across multiple slides",
    "Hide the audio icon during a show",
    "Consider accessibility when a presentation relies on sound",
  ],
  duration: "8 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Working with Audio Practice File",
      url: "/practice/powerpoint/module-6/audio/Powerpoint_Audio_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Audio that stops at the slide boundary",
       blocks: [
         {
           type: "scenario",
           role: "You build a self-running display for the waiting room at Lakeside Medical Associates.",
           text: "You add background music to the first slide. It stops the moment the deck advances, because by default audio belongs to the slide it was inserted on.",
           task: "Configure audio playback so it behaves the way the presentation requires.",
         },
         {
           type: "paragraph",
           text: "Select the audio icon and use the Playback tab. 'Play Across Slides' lets it continue as the deck advances; 'Loop until Stopped' repeats it; 'Hide During Show' removes the speaker icon from view. For a looping waiting-room display you generally want all three.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Never let audio be the only way information is conveyed. Deaf and hard-of-hearing viewers, and anyone watching with the sound off — which is most people in a waiting room — receive nothing. Any narration needs on-screen text carrying the same content. Music must be licensed for the use; commercial recordings are not free to play in a public waiting area.",
         },
       ],
     },

    {
      heading: "Why Add Audio to a Presentation?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Audio can enhance a presentation by adding background music, narration, or short sound clips that reinforce your message.",
        },
        {
          type: "paragraph",
          text:
            "Common uses include background music for kiosk displays, recorded narration for self-running presentations, and sound cues that accompany specific slides.",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Use audio with purpose. Background music or sounds that don't match your content can distract your audience.",
        },
      ],
    },

    {
      heading: "Inserting Audio from Your Computer",
      blocks: [
        {
          type: "paragraph",
          text:
            "To add an audio file, go to the Insert tab and select Audio, then choose Audio on My PC.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_insert_ribbon.png",
          alt: "Audio command on the Insert tab",
        },
        {
          type: "paragraph",
          text:
            "Browse to and select your audio file. PowerPoint supports common formats including MP3 and WAV.",
        },
        {
          type: "paragraph",
          text:
            "After inserting, a speaker icon appears on the slide along with a small audio player bar.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_icon_on_slide.png",
          alt: "Audio speaker icon and player bar on a slide",
        },
      ],
    },

    {
      heading: "The Audio Format and Playback Tabs",
      blocks: [
        {
          type: "paragraph",
          text:
            "When the audio icon is selected, two new tabs appear on the ribbon: Audio Format and Playback.",
        },
        {
          type: "paragraph",
          text:
            "The Playback tab is where you configure most audio settings including start behavior, looping, and volume.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_playback_tab.png",
          alt: "Playback tab for audio in PowerPoint",
        },
      ],
    },

    {
      heading: "Playback Settings",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Start setting controls when audio begins playing. You can set it to In Click Sequence, Automatically, or When Clicked On.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_start_options.png",
          alt: "Audio start options in PowerPoint",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "In Click Sequence — audio plays when you reach it during your click sequence.",
            "Automatically — audio starts as soon as the slide appears.",
            "When Clicked On — audio only plays when the audience clicks the icon.",
          ],
        },
        {
          type: "paragraph",
          text:
            "You can also enable Loop until Stopped to repeat the audio continuously, and Hide During Show to keep the speaker icon invisible during the presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_loop_hide.png",
          alt: "Loop until Stopped and Hide During Show options",
        },
      ],
    },

    {
      heading: "Playing Audio Across Slides",
      blocks: [
        {
          type: "paragraph",
          text:
            "By default, audio stops when you move to the next slide. To have music continue across multiple slides, check Play Across Slides in the Playback tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_play_across_slides.png",
          alt: "Play Across Slides option in PowerPoint",
        },
        {
          type: "tip",
          text:
            "Combine Play Across Slides with Hide During Show and Loop until Stopped for seamless background music throughout a presentation.",
        },
      ],
    },

    {
      heading: "Trimming Audio",
      blocks: [
        {
          type: "paragraph",
          text:
            "If an audio clip is longer than you need, you can trim it without leaving PowerPoint.",
        },
        {
          type: "paragraph",
          text:
            "Click Trim Audio on the Playback tab. Drag the green start marker and red end marker to define the portion you want to keep.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_trim_dialog.png",
          alt: "Trim Audio dialog with start and end markers",
        },
        {
          type: "paragraph",
          text:
            "Click OK to apply the trim. The audio clip will now start and stop at the points you selected.",
        },
      ],
    },

    {
      heading: "Adjusting Volume",
      blocks: [
        {
          type: "paragraph",
          text:
            "Use the Volume button on the Playback tab to set the default playback level to Low, Medium, High, or Mute.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/audio/audio_volume_control.png",
          alt: "Volume control on the Playback tab",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "Which setting keeps audio playing as you advance through multiple slides?",
          options: [
            "Loop until Stopped",
            "Hide During Show",
            "Play Across Slides",
            "When Clicked On",
          ],
          correctIndex: 2,
          explanation: "Play Across Slides lets the audio continue as the presentation advances, instead of stopping when the slide it belongs to is replaced.",
          optionRationales: [
            "Loop until Stopped repeats the clip, but it still stops when the slide changes unless Play Across Slides is also set.",
            "Hide During Show only conceals the speaker icon. It has no effect on playback.",
            "Correct. Play Across Slides keeps the audio playing as you move between slides.",
            "When Clicked On means the audio starts on a click rather than automatically.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "Insert an audio file onto slide 1 using Audio on My PC.",
        "Set the Start option to Automatically.",
        "Enable Play Across Slides so the music continues as you advance slides.",
        "Enable Hide During Show so the speaker icon is not visible during the presentation.",
        "Enable Loop until Stopped.",
        "Use Trim Audio to shorten the clip to approximately 30 seconds.",
        "Preview your presentation from slide 1 to confirm the audio plays correctly.",
      ],
    },
  ],

},

{
  slug: "working-with-video",
  title: "Working with Video",
  description:
    "Learn how to insert videos from your computer or online, control playback settings, trim clips, and format the video frame on your slides.",
  objectives: [
    "Insert video from a file or an online source",
    "Trim a video and set a poster frame",
    "Control playback options",
    "Prepare video so it works on another machine",
  ],
  duration: "10 min",
  videoUrl: "",

  practiceFiles: [
    {
      name: "Working with Video Practice File",
      url: "/practice/powerpoint/module-6/video/Powerpoint_Video_Practice.pptx",
    },
  ],

  sections: [

    {
       heading: "Video is where presentations fail on unfamiliar hardware",
       blocks: [
         {
           type: "scenario",
           role: "You present a training deck at Lakeside Medical Associates.",
           text: "Your video plays perfectly at your desk. On the conference room machine the slide shows a black rectangle, because the deck was linked to a file still sitting on your computer, and the guest network cannot reach the online copy either.",
           task: "Embed and optimize media so the deck is genuinely self-contained.",
         },
         {
           type: "paragraph",
           text: "Video inserted from your PC is embedded in the file, which is what makes the deck portable — at the cost of size. Online video is linked, so it needs a working connection and an unblocked site at presentation time. Conference room networks frequently block video platforms.",
         },
         {
           type: "paragraph",
           text: "A poster frame is the still image shown before the video plays. By default it is the first frame, which is often black. Playback > Poster Frame lets you choose a meaningful frame, so the slide looks intentional rather than broken while you introduce it.",
         },
         {
           type: "callout",
           variant: "warning",
           text: "Before presenting from another machine, run File > Info > Optimize Media Compatibility. It embeds and re-encodes media into formats that play reliably elsewhere. Then test the deck on the actual presentation machine — media is the most common single point of failure in a presentation, and it fails silently until you are standing in front of people.",
         },
       ],
     },

    {
      heading: "Why Embed Video in a Presentation?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Videos can make a presentation far more engaging than static slides. A short clip can demonstrate a process, share a testimonial, or show a product in action.",
        },
        {
          type: "paragraph",
          text:
            "Embedding video directly into your presentation keeps everything in one file, so you don't need to switch applications during a live presentation.",
        },
        {
          type: "callout",
          variant: "info",
          text:
            "Keep embedded videos short. Long clips can increase file size significantly and may slow down your presentation.",
        },
      ],
    },

    {
      heading: "Inserting Video from Your Computer",
      blocks: [
        {
          type: "paragraph",
          text:
            "Go to the Insert tab, click Video, then select This Device.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_insert_ribbon.png",
          alt: "Video command on the Insert tab",
        },
        {
          type: "paragraph",
          text:
            "Browse to your video file and click Insert. PowerPoint supports common formats including MP4, MOV, and AVI.",
        },
        {
          type: "paragraph",
          text:
            "The video appears on the slide as a preview image with a playback bar beneath it.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_on_slide.png",
          alt: "Inserted video on a slide with playback bar",
        },
      ],
    },

    {
      heading: "Inserting an Online Video",
      blocks: [
        {
          type: "paragraph",
          text:
            "You can also embed a video from an online source such as YouTube without downloading it first.",
        },
        {
          type: "paragraph",
          text:
            "Go to Insert → Video → Online Video. Paste the video URL into the search box and click Insert.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_online_insert.png",
          alt: "Online Video dialog in PowerPoint",
        },
        {
          type: "callout",
          variant: "warning",
          text:
            "Online videos require an internet connection during your presentation. If connectivity is uncertain, use a locally saved video file instead.",
        },
      ],
    },

    {
      heading: "The Video Format and Playback Tabs",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a video is selected, the Video Format and Playback tabs appear on the ribbon.",
        },
        {
          type: "paragraph",
          text:
            "Video Format lets you apply styles, adjust borders, and crop the video frame. Playback controls how the video behaves during the presentation.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_playback_tab.png",
          alt: "Playback tab for video in PowerPoint",
        },
      ],
    },

    {
      heading: "Playback Settings",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Start setting works the same as audio — In Click Sequence, Automatically, or When Clicked On.",
        },
        {
          type: "paragraph",
          text:
            "Additional useful options include:",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Play Full Screen — expands the video to fill the entire screen during playback.",
            "Hide While Not Playing — hides the video frame until it starts playing.",
            "Loop until Stopped — repeats the video continuously.",
            "Rewind after Playing — returns the video to the first frame when it ends.",
          ],
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_playback_options.png",
          alt: "Video playback options in PowerPoint",
        },
      ],
    },

    {
      heading: "Trimming Video",
      blocks: [
        {
          type: "paragraph",
          text:
            "To use only part of a video, click Trim Video on the Playback tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_trim_ribbon.png",
          alt: "Trim Video button on the Playback tab",
        },
        {
          type: "paragraph",
          text:
            "Drag the green start marker and the red end marker to define the clip you want to keep, then click OK.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_trim_dialog.png",
          alt: "Trim Video dialog with start and end markers",
        },
        {
          type: "tip",
          text:
            "Trimming is non-destructive — the original video file is not modified. You can re-open the dialog and adjust the markers at any time.",
        },
      ],
    },

    {
      heading: "Adding a Video Poster Frame",
      blocks: [
        {
          type: "paragraph",
          text:
            "A poster frame is the still image shown on the video before it plays. By default, PowerPoint shows the first frame.",
        },
        {
          type: "paragraph",
          text:
            "To set a custom poster frame, play the video to the frame you want, pause it, then click Poster Frame → Current Frame on the Video Format tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_poster_frame.png",
          alt: "Poster Frame options on the Video Format tab",
        },
      ],
    },

    {
      heading: "Formatting the Video Frame",
      blocks: [
        {
          type: "paragraph",
          text:
            "Just like images, videos can be styled with borders, shadows, and reflections using the Video Styles gallery on the Video Format tab.",
        },
        {
          type: "image",
          src: "/images/powerpoint/module-6/video/video_styles_gallery.png",
          alt: "Video Styles gallery on the Video Format tab",
        },
        {
          type: "paragraph",
          text:
            "You can also resize and reposition the video frame on the slide the same way you would resize an image.",
        },
      ],
    },

    {
      heading: "Knowledge Check",
      blocks: [
        {
          type: "knowledge-check",
          question: "What is a video poster frame?",
          options: [
            "The final frame that plays when the video ends",
            "The still image displayed on the video before it plays",
            "A picture inserted behind the video on the slide",
            "A style applied to the video border",
          ],
          correctIndex: 1,
          explanation: "The poster frame is the still image displayed on the slide before the video plays. Setting a meaningful one avoids the black rectangle that the default first frame often produces.",
          optionRationales: [
            "The final frame is simply where playback ends. It is not a separate setting.",
            "Correct. The poster frame is the still image shown before playback begins.",
            "A picture placed behind the video would be a separate object on the slide.",
            "Border styling is applied from Video Format. The poster frame is the preview image.",
          ],
        },
      ],
    },

  ],

  challenge: [
    {
      type: "paragraph",
      text: "Open the practice presentation and complete the following tasks:",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "On slide 3, insert a video from your computer.",
        "Resize and reposition the video so it fits neatly within the slide content area.",
        "Set the Start option to Automatically.",
        "Enable Rewind after Playing.",
        "Use Trim Video to remove the first 5 seconds and last 5 seconds of the clip.",
        "Apply a video style from the Video Format tab to give the frame a polished appearance.",
        "Set a poster frame using a frame from inside the clip.",
        "Preview the slide to confirm the video plays and rewinds correctly.",
      ],
    },
  ],

},

];