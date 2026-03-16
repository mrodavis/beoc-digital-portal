import { Lesson } from "@/types/lesson";

export const powerpointModule4Lessons: Lesson[] = [
{
slug: "applying-themes",
title: "Applying Themes",
description:
"Learn how to quickly change the design of your presentation using built-in PowerPoint themes.",
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


];