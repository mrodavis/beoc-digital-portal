import { Lesson } from "@/types/lesson";

export const powerpointModule6Lessons: Lesson[] = [ 

{
slug: "applying-transitions",
title: "Applying Slide Transitions",
description:
"Learn how to add visual effects between slides, preview transitions, and control timing in PowerPoint.",
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

];