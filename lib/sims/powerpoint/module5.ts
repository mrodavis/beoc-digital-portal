import type { SimDefinition } from "@/types/sim";

/** PowerPoint Module 5: Images and Objects. Keys are `${moduleSlug}::${lessonSlug}`. */
export const pptModule5Sims: Record<string, SimDefinition[]> = {
  "module-5::inserting-pictures": [
    {
      id: "ppt-m5-inserting-pictures-1",
      app: "powerpoint",
      title: "Add pictures that teach to the patient guide",
      scenario: "You are building a healthy habits guide for the Lakeside Medical Associates waiting room. Use your own photos, PowerPoint's licensed stock images, and Creative Commons pictures, never random web images.",
      fileName: "Healthy Habits Patient Guide.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        theme: "Facet",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Healthy Habits", subtitle: "A Patient Guide from Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "Build a Healthy Plate" },
          { id: "s3", layout: "Two Content", title: "Stay Active", body: ["Aim for 150 minutes a week", "Walking counts", "Take the stairs"] },
          { id: "s4", layout: "Title Only", title: "Find What You Enjoy" },
        ],
      },
      tasks: [
        {
          instruction: "On slide 2, insert the picture healthy-plate.jpg from your computer into the content placeholder.",
          hint: "Go to slide 2 and click the Pictures icon in the middle of the placeholder (or Insert tab › Pictures › This Device…). Choose healthy-plate.jpg, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "insertPicture", values: { file: "healthy-plate.jpg" } }, requires: { slide: "s2" }, selectHint: "Go to slide 2 first." }],
        },
        {
          instruction: "On slide 3, insert the stock image “Person jogging in a park” into the empty right placeholder.",
          hint: "Go to slide 3 and click the Stock Images icon in the right placeholder (or Insert tab › Pictures › Stock Images…). Choose Person jogging in a park, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "stockImages", values: { image: "Person jogging in a park" } }, requires: { slide: "s3" }, selectHint: "Go to slide 3 first." }],
        },
        {
          instruction: "On slide 4, insert the Creative Commons online picture walking-for-health.jpg.",
          hint: "Go to slide 4. Insert tab › Pictures › Online Pictures…. Keep Creative Commons only checked, choose walking-for-health.jpg, then click Insert.",
          steps: [{ action: { kind: "dialog", id: "onlinePictures", values: { image: "walking-for-health.jpg (Creative Commons)" } }, requires: { slide: "s4" }, selectHint: "Go to slide 4 first." }],
        },
        {
          instruction: "Resize the walking picture on slide 4 to 6\" wide so it fills most of the slide without stretching.",
          hint: "With the picture selected: Picture Format tab › Size group › Width: 6. The height adjusts to keep the proportions.",
          steps: [{ action: { kind: "command", id: "object.size", value: "6" }, alt: [{ kind: "dialog", id: "rotation", values: { width: 6 } }], requires: { slide: "s4", selection: "s4.o1" }, selectHint: "Click the walking picture on slide 4 first." }],
        },
        {
          instruction: "After slide 4, add a new slide with the Title Only layout.",
          hint: "With slide 4 selected: Home tab › New Slide arrow › Title Only.",
          steps: [{ action: { kind: "command", id: "slides.new", value: "Title Only" }, requires: { slide: "s4" }, selectHint: "Click slide 4 in the thumbnails first." }],
        },
        {
          instruction: "Type the title “Learn More at Fitness.gov” on the new slide.",
          hint: "Click “Click to add title”, type the title, then click outside the placeholder.",
          steps: [{ action: { kind: "type", target: "s5.title", value: "Learn More at Fitness.gov" } }],
        },
        {
          instruction: "On the new slide, insert a screen clipping of the Fitness.gov website that is open in your browser.",
          hint: "Insert tab › Images › Screenshot › Screen Clipping (the Fitness.gov - Microsoft Edge window under Available Windows also works).",
          steps: [{ action: { kind: "command", id: "insert.screenshot", value: "Screen Clipping" }, alt: [{ kind: "command", id: "insert.screenshot", value: "Fitness.gov - Microsoft Edge" }], requires: { slide: "s5" }, selectHint: "Stay on the new slide 5." }],
        },
      ],
    },
  ],

  "module-5::formatting-pictures": [
    {
      id: "ppt-m5-formatting-pictures-1",
      app: "powerpoint",
      title: "Polish the wellness center photos and shrink the file",
      scenario: "The Lakeside wellness center tour deck is 60 MB because of full-size phone photos, and it keeps bouncing from email. Clean up the pictures, compress them, and make them accessible.",
      fileName: "Wellness Center Tour.pptx",
      minutes: 6,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Lakeside Wellness Center", subtitle: "Take the Tour" },
          { id: "s2", layout: "Title Only", title: "Our Cardio Room", objects: [{ id: "o1", kind: "image", label: "treadmill-room.jpg", glyph: "🏃", x: 18, y: 24, w: 64, h: 70 }] },
          { id: "s3", layout: "Title Only", title: "Healthy Cooking Classes", objects: [{ id: "o1", kind: "image", label: "cooking-class.jpg", glyph: "🥗", x: 30, y: 24, w: 40, h: 70 }] },
          {
            id: "s4",
            layout: "Title Only",
            title: "Meet the Wellness Team",
            objects: [
              { id: "o1", kind: "image", label: "care-team.jpg", glyph: "🧑‍⚕️", x: 25, y: 24, w: 50, h: 60 },
              { id: "o2", kind: "image", label: "leaf-divider.png", glyph: "🌿", x: 5, y: 87, w: 90, h: 9 },
            ],
          },
        ],
      },
      tasks: [
        {
          instruction: "On slide 2, crop the treadmill picture so the treadmills fill more of the frame.",
          hint: "Click the picture. Picture Format tab › Size group › Crop. (In PowerPoint you then drag the black crop handles inward and click Crop again.)",
          steps: [{ action: { kind: "command", id: "picture.crop" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the treadmill picture on slide 2 first." }],
        },
        {
          instruction: "Apply the Drop Shadow Rectangle picture style to the treadmill picture.",
          hint: "With the picture selected: Picture Format tab › Picture Styles gallery › Drop Shadow Rectangle.",
          steps: [{ action: { kind: "command", id: "picture.style", value: "Drop Shadow Rectangle" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the treadmill picture on slide 2 first." }],
        },
        {
          instruction: "Brighten the treadmill picture by 20% without changing its contrast.",
          hint: "Picture Format tab › Adjust group › Corrections › Brightness: +20% Contrast: 0% (Normal).",
          steps: [{ action: { kind: "command", id: "picture.corrections", value: "Brightness: +20% Contrast: 0% (Normal)" }, requires: { slide: "s2", selection: "s2.o1" }, selectHint: "Click the treadmill picture on slide 2 first." }],
        },
        {
          instruction: "Compress every picture in the presentation for email and delete the cropped areas.",
          hint: "With any picture selected: Picture Format tab › Adjust › Compress Pictures. Clear Apply only to this picture, keep Delete cropped areas of pictures checked, choose E-mail (96 ppi), then click OK.",
          steps: [{
            action: { kind: "dialog", id: "compressPictures", values: { applyOnly: false, deleteCropped: true, resolution: "E-mail (96 ppi)" } },
            requires: { selection: ["s2.o1", "s3.o1", "s4.o1", "s4.o2"] },
            selectHint: "Select any picture first so the Picture Format tab appears.",
          }],
        },
        {
          instruction: "On slide 3, crop the cooking class picture to an oval.",
          hint: "Click the picture on slide 3. Picture Format tab › Crop arrow › Crop to Shape › Oval.",
          steps: [{ action: { kind: "command", id: "picture.cropShape", value: "Oval" }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the cooking class picture on slide 3 first." }],
        },
        {
          instruction: "Add the alt text “Patients preparing a vegetable stir-fry in the teaching kitchen” to the cooking class picture.",
          hint: "Right-click the picture › View Alt Text… (or Picture Format tab › Alt Text). Type the description, then click OK.",
          steps: [{ action: { kind: "dialog", id: "altText", values: { text: "Patients preparing a vegetable stir-fry in the teaching kitchen" } }, requires: { slide: "s3", selection: "s3.o1" }, selectHint: "Click the cooking class picture on slide 3 first." }],
        },
        {
          instruction: "On slide 4, mark the leaf divider at the bottom of the slide as decorative so screen readers skip it.",
          hint: "Right-click the leaf divider › View Alt Text… (or Picture Format tab › Alt Text). Check Mark as decorative, then click OK.",
          steps: [{ action: { kind: "dialog", id: "altText", values: { decorative: true } }, requires: { slide: "s4", selection: "s4.o2" }, selectHint: "Click the thin leaf divider picture at the bottom of slide 4 first." }],
        },
      ],
    },
  ],

  "module-5::shapes-in-powerpoint": [
    {
      id: "ppt-m5-shapes-1",
      app: "powerpoint",
      title: "Draw the stress relief callout",
      scenario: "You are finishing the stress management workshop deck for Lakeside Medical Associates staff. The closing slide needs one bold callout that people remember.",
      fileName: "Stress Management Workshop.pptx",
      minutes: 5,
      initial: {
        active: "s1",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Stress Management Workshop", subtitle: "Staff Wellness Series" },
          { id: "s2", layout: "Title and Content", title: "Signs of Stress", body: ["Trouble sleeping", "Headaches or tight shoulders", "Short temper with coworkers"] },
          { id: "s3", layout: "Title and Content", title: "Quick Resets at Work", body: ["Box breathing for one minute", "A five-minute walk", "Step away from the screen"] },
          { id: "s4", layout: "Title and Content", title: "Build Better Habits", body: ["Protect your lunch break", "Move every day", "Keep a regular sleep schedule"] },
          { id: "s5", layout: "Title and Content", title: "Where to Get Support", body: ["Employee Assistance Program: ext. 4500", "Talk with your supervisor"] },
          { id: "s6", layout: "Title Only", title: "Make Time to Recharge" },
        ],
      },
      tasks: [
        {
          instruction: "On slide 6, insert a Folded Corner shape.",
          hint: "Go to slide 6. Insert tab › Illustrations › Shapes › Folded Corner.",
          steps: [{ action: { kind: "command", id: "insert.shape", value: "Folded Corner" }, requires: { slide: "s6" }, selectHint: "Go to slide 6 first." }],
        },
        {
          instruction: "Type “Make stress relief a priority!” inside the shape.",
          hint: "With the shape selected, just start typing (or double-click the shape). Click outside the shape when you finish.",
          steps: [{ action: { kind: "type", target: "s6.o1", value: "Make stress relief a priority!" } }],
        },
        {
          instruction: "Change the shape fill to Gold, Accent 4.",
          hint: "Shape Format tab › Shape Styles › Shape Fill › Gold, Accent 4 (top row of Theme Colors).",
          steps: [{ action: { kind: "command", id: "shape.fill", value: "#FFC000" }, requires: { slide: "s6", selection: "s6.o1" }, selectHint: "Click the folded corner shape first." }],
        },
        {
          instruction: "Remove the outline from the shape.",
          hint: "Shape Format tab › Shape Outline › No Outline.",
          steps: [{ action: { kind: "command", id: "shape.outline", value: "No Outline" }, requires: { slide: "s6", selection: "s6.o1" }, selectHint: "Click the folded corner shape first." }],
        },
        {
          instruction: "Apply a Glow effect to the shape so it stands out.",
          hint: "Shape Format tab › Shape Effects › Glow.",
          steps: [{ action: { kind: "command", id: "shape.effects", value: "Glow" }, requires: { slide: "s6", selection: "s6.o1" }, selectHint: "Click the folded corner shape first." }],
        },
        {
          instruction: "Rotate the shape to 350° so it sits at a slight angle.",
          hint: "Shape Format tab › Arrange › Rotate › More Rotation Options… (or the Size group launcher). Set Rotation to 350, then click OK.",
          steps: [{ action: { kind: "dialog", id: "rotation", values: { degrees: 350 } }, requires: { slide: "s6", selection: "s6.o1" }, selectHint: "Click the folded corner shape first." }],
        },
        {
          instruction: "Change the shape to a Rectangle: Rounded Corners without losing its text or formatting.",
          hint: "Shape Format tab › Insert Shapes › Edit Shape › Change Shape › Rectangle: Rounded Corners.",
          steps: [{ action: { kind: "command", id: "shape.change", value: "Rectangle: Rounded Corners" }, requires: { slide: "s6", selection: "s6.o1" }, selectHint: "Click the folded corner shape first." }],
        },
      ],
    },
  ],

  "module-5::aligning-grouping-objects": [
    {
      id: "ppt-m5-aligning-1",
      app: "powerpoint",
      title: "Line up the balanced day pictures",
      scenario: "On the nutrition class slide, three meal pictures were placed by dragging and they sit at slightly different heights. Align and space them exactly, fix the layering, and group them so they stay put.",
      fileName: "Nutrition Basics.pptx",
      minutes: 5,
      initial: {
        active: "s4",
        slides: [
          { id: "s1", layout: "Title Slide", title: "Nutrition Basics", subtitle: "Patient Class · Lakeside Medical Associates" },
          { id: "s2", layout: "Title and Content", title: "What a Balanced Plate Looks Like", body: ["Half vegetables and fruit", "A quarter lean protein", "A quarter whole grains"] },
          { id: "s3", layout: "Title and Content", title: "Smart Swaps", body: ["Water instead of soda", "Baked instead of fried", "Fruit instead of dessert"] },
          {
            id: "s4",
            layout: "Title Only",
            title: "Build a Balanced Day",
            objects: [
              { id: "o1", kind: "image", label: "oatmeal-breakfast.jpg", glyph: "🥣", x: 6, y: 30, w: 24, h: 40 },
              { id: "o4", kind: "shape", label: "Diamond", shape: "rect", fill: "#70AD47", x: 3, y: 25, w: 9, h: 16 },
              { id: "o2", kind: "image", label: "salad-lunch.jpg", glyph: "🥗", x: 37, y: 38, w: 24, h: 40 },
              { id: "o5", kind: "shape", label: "Diamond", shape: "rect", fill: "#70AD47", x: 34, y: 33, w: 9, h: 16 },
              { id: "o3", kind: "image", label: "hamburger-dinner.jpg", glyph: "🍔", x: 69, y: 26, w: 24, h: 40 },
              { id: "o6", kind: "shape", label: "Diamond", shape: "rect", fill: "#70AD47", x: 66, y: 21, w: 9, h: 16 },
            ],
          },
        ],
      },
      tasks: [
        {
          instruction: "Rotate the hamburger picture left 90°.",
          hint: "Click the hamburger picture. Picture Format tab › Arrange › Rotate › Rotate Left 90°.",
          steps: [{ action: { kind: "command", id: "object.rotate", value: "Rotate Left 90°" }, requires: { slide: "s4", selection: "s4.o3" }, selectHint: "Click the hamburger picture first." }],
        },
        {
          instruction: "Select the three meal pictures (not the green diamonds) and align them to the middle of the slide.",
          hint: "Click the first picture, then Shift+click the other two. Picture Format tab › Align › Align to Slide, then Align › Align Middle.",
          steps: [
            { action: { kind: "command", id: "object.align", value: "Align to Slide" }, requires: { slide: "s4", selection: ["s4.o1.o2.o3", "s4.o1,s4.o2,s4.o3"] }, selectHint: "Select only the three meal pictures: click one, then Shift+click the other two." },
            { action: { kind: "command", id: "object.align", value: "Align Middle" }, requires: { slide: "s4", selection: ["s4.o1.o2.o3", "s4.o1,s4.o2,s4.o3"] }, selectHint: "Keep only the three meal pictures selected." },
          ],
        },
        {
          instruction: "With the three pictures still selected, space them evenly across the slide.",
          hint: "Picture Format tab › Arrange › Align › Distribute Horizontally.",
          steps: [{ action: { kind: "command", id: "object.align", value: "Distribute Horizontally" }, requires: { slide: "s4", selection: ["s4.o1.o2.o3", "s4.o1,s4.o2,s4.o3"] }, selectHint: "Select the three meal pictures (Shift+click) first." }],
        },
        {
          instruction: "Send the first green diamond behind the breakfast picture.",
          hint: "Click the green diamond at the top left of the breakfast picture. Shape Format tab › Arrange › Send Backward (Send to Back also works).",
          steps: [{ action: { kind: "command", id: "object.sendBackward" }, alt: [{ kind: "command", id: "object.sendToBack" }], requires: { slide: "s4", selection: "s4.o4" }, selectHint: "Click the green diamond next to the breakfast picture first." }],
        },
        {
          instruction: "Group the three meal pictures so they move together.",
          hint: "Select the three pictures (click one, Shift+click the others). Picture Format tab › Arrange › Group › Group (or press Ctrl+G).",
          steps: [{ action: { kind: "command", id: "object.group" }, requires: { slide: "s4", selection: ["s4.o1.o2.o3", "s4.o1,s4.o2,s4.o3"] }, selectHint: "Select only the three meal pictures (Shift+click) first." }],
        },
        {
          instruction: "Open the Selection Pane to check the order of the objects on the slide.",
          hint: "Home tab › Editing › Select › Selection Pane… (or Picture Format tab › Arrange › Selection Pane).",
          steps: [{ action: { kind: "command", id: "view.selectionPane" } }],
        },
      ],
    },
  ],
};
