import type { SimDefinition, WordPara } from "@/types/sim";

/** Word Module 3: Styles, Media & Themes (pictures, shapes, text boxes, arranging objects). */

const STEP_BOXES = ["shp1", "shp2", "shp3", "shp4"].join(",");

export const wordModule3Sims: Record<string, SimDefinition[]> = {
  "module-3::pictures-text-wrapping": [
    {
      id: "word-m3-pictures-wrapping-1",
      app: "word",
      title: "Place the photos in the wellness newsletter",
      scenario:
        "You are laying out the November wellness newsletter for Lakeside Medical Associates. Last month a photo jumped to page three every time someone added a sentence. This time, insert the pictures and set their wrapping and anchoring so they stay where they belong.",
      fileName: "Lakeside Wellness News - November.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Lakeside Wellness News" },
          { id: "p2", style: "Subtitle", text: "November 2026 · For patients and families" },
          { id: "p3", style: "Heading 1", text: "Flu Shots Are Here" },
          {
            id: "p4",
            text: "Flu season usually peaks between December and February, and it takes about two weeks after the shot for protection to build. Walk in any weekday morning, or come to our Saturday clinic on November 7.",
          },
          { id: "p5", text: "The shot is free with most insurance plans. If you are 65 or older, ask about the higher-dose vaccine designed for older adults." },
          { id: "p6", style: "Heading 1", text: "Finding Our New Entrance" },
          { id: "p7", text: "The Harbor Street entrance is closed for repairs until January. Please use the side entrance on Pine Street, next to the pharmacy." },
          { id: "img1", kind: "image", object: { label: "map-directions.png", glyph: "🗺️", wrap: "square", align: "left", width: 40 } },
          { id: "p8", style: "Heading 1", text: "Wash Your Hands" },
          { id: "p9", text: "Washing your hands for 20 seconds with soap and water is still one of the best ways to avoid catching or spreading the flu." },
          { id: "p10", text: "Need a reminder? Ask for the hand-washing card at the front desk, or follow the steps below." },
        ],
      },
      tasks: [
        {
          instruction: "Insert the picture flu-shot-clinic.jpg from this device directly below the heading “Flu Shots Are Here”.",
          hint: "Click the heading “Flu Shots Are Here”. Insert tab › Illustrations group › Pictures › This Device… › flu-shot-clinic.jpg › Insert.",
          steps: [
            {
              action: { kind: "dialog", id: "insertPicture", values: { file: "flu-shot-clinic.jpg" } },
              requires: { selection: "p3" },
              selectHint: "Click the heading “Flu Shots Are Here” first, so the picture goes right below it.",
            },
          ],
        },
        {
          instruction: "Apply Square text wrapping to the flu clinic photo so the paragraph text flows around it.",
          hint: "Click the photo. Picture Format tab › Arrange group › Wrap Text › Square. (Layout tab › Wrap Text works too.)",
          steps: [
            {
              action: { kind: "command", id: "picture.wrap", value: "Square" },
              requires: { selection: "img2" },
              selectHint: "Click the flu clinic photo first.",
            },
          ],
        },
        {
          instruction: "Position the flu clinic photo at the top right of the page.",
          hint: "With the photo selected: Picture Format tab › Arrange group › Position › Position in Top Right with Square Text Wrapping.",
          steps: [
            {
              action: { kind: "command", id: "picture.position", value: "Position in Top Right" },
              requires: { selection: "img2" },
              selectHint: "Click the flu clinic photo first.",
            },
          ],
        },
        {
          instruction: "Make sure the flu clinic photo moves with its paragraph when text is added above it.",
          hint: "With the photo selected: Picture Format tab › Arrange group › Wrap Text › Move with Text.",
          steps: [
            {
              action: { kind: "command", id: "picture.wrap", value: "Move with Text" },
              requires: { selection: "img2" },
              selectHint: "Click the flu clinic photo first.",
            },
          ],
        },
        {
          instruction: "The entrance map should sit on its own between paragraphs. Apply Top and Bottom text wrapping to the map.",
          hint: "Click the map. Picture Format tab › Arrange group › Wrap Text › Top and Bottom.",
          steps: [
            {
              action: { kind: "command", id: "picture.wrap", value: "Top and Bottom" },
              requires: { selection: "img1" },
              selectHint: "Click the map picture first.",
            },
          ],
        },
        {
          instruction: "Center the map horizontally on the page.",
          hint: "With the map selected: Picture Format tab › Arrange group › Align › Align Center.",
          steps: [
            {
              action: { kind: "command", id: "object.align", value: "Align Center" },
              requires: { selection: "img1" },
              selectHint: "Click the map picture first.",
            },
          ],
        },
        {
          instruction: "Below the paragraph that begins “Need a reminder?”, insert the online picture “Hand washing steps (icon set)”.",
          hint: "Click the paragraph that begins “Need a reminder?”. Insert tab › Pictures › Online Pictures… › choose Hand washing steps (icon set) › Insert.",
          steps: [
            {
              action: { kind: "dialog", id: "onlinePictures", values: { image: "Hand washing steps (icon set)" } },
              requires: { selection: "p10" },
              selectHint: "Click the paragraph that begins “Need a reminder?” first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::formatting-pictures": [
    {
      id: "word-m3-formatting-pictures-1",
      app: "word",
      title: "Make the staff directory photos match",
      scenario:
        "The staff directory for new patients has photos from four different phones: one is too dark, one is the wrong shape, and none of them look like a set. Crop and adjust them so the page looks professional, then shrink the file so it can be emailed.",
      fileName: "Staff Directory.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Meet Your Care Team" },
          { id: "p2", style: "Subtitle", text: "Lakeside Medical Associates · Staff Directory for New Patients" },
          { id: "p3", style: "Heading 2", text: "Dr. Lena Ortiz, Primary Care" },
          { id: "img1", kind: "image", object: { label: "ortiz-headshot.jpg", glyph: "👩‍⚕️", wrap: "inline", width: 28 } },
          { id: "p4", text: "Dr. Ortiz has cared for Brooklyn families for twelve years and leads our diabetes prevention program." },
          { id: "p5", style: "Heading 2", text: "Marcus Bell, RN, Nurse Manager" },
          { id: "img2", kind: "image", object: { label: "bell-photo.jpg", glyph: "👨‍⚕️", wrap: "inline", width: 34 } },
          { id: "p6", text: "Marcus coordinates vaccines, referrals, and the follow-up calls patients get after a hospital stay." },
          { id: "p7", style: "Heading 2", text: "Grace Kim, Front Desk Coordinator" },
          { id: "img3", kind: "image", object: { label: "kim-photo.jpg", glyph: "🧑‍💼", wrap: "inline", width: 28 } },
          { id: "p8", text: "Grace schedules appointments and can help you sign up for the patient portal." },
          { id: "p9", style: "Heading 2", text: "Our Waiting Room" },
          { id: "img4", kind: "image", object: { label: "waiting-room.jpg", glyph: "🛋️", wrap: "inline", width: 50 } },
          { id: "p10", text: "The waiting room has free Wi-Fi, a children's corner, and a water station." },
        ],
      },
      tasks: [
        {
          instruction: "Crop Dr. Ortiz's photo to an Oval shape.",
          hint: "Click the photo. Picture Format tab › Size group › Crop arrow › Crop to Shape › Oval.",
          steps: [
            {
              action: { kind: "command", id: "picture.crop", value: "Oval" },
              requires: { selection: "img1" },
              selectHint: "Click Dr. Ortiz's photo first.",
            },
          ],
        },
        {
          instruction: "Crop Marcus Bell's photo to a square, 1:1 aspect ratio.",
          hint: "Click the photo. Picture Format tab › Size group › Crop arrow › Aspect Ratio › 1:1.",
          steps: [
            {
              action: { kind: "command", id: "picture.crop", value: "1:1" },
              requires: { selection: "img2" },
              selectHint: "Click Marcus Bell's photo first.",
            },
          ],
        },
        {
          instruction: "Marcus Bell's photo is too dark. Apply the Brightness: +20% Contrast: 0% correction.",
          hint: "With the photo selected: Picture Format tab › Adjust group › Corrections › Brightness: +20% Contrast: 0%.",
          steps: [
            {
              action: { kind: "command", id: "picture.corrections", value: "Brightness: +20% Contrast: 0%" },
              requires: { selection: "img2" },
              selectHint: "Click Marcus Bell's photo first.",
            },
          ],
        },
        {
          instruction: "Apply the Simple Frame, White picture style to Grace Kim's photo.",
          hint: "Click the photo. Picture Format tab › Picture Styles gallery › Simple Frame, White.",
          steps: [
            {
              action: { kind: "command", id: "picture.style", value: "Simple Frame, White" },
              requires: { selection: "img3" },
              selectHint: "Click Grace Kim's photo first.",
            },
          ],
        },
        {
          instruction: "Add a Blue picture border to Dr. Ortiz's photo.",
          hint: "Click the photo. Picture Format tab › Picture Styles group › Picture Border arrow › Standard Colors › Blue.",
          steps: [
            {
              action: { kind: "command", id: "picture.border", value: "#0070C0" },
              requires: { selection: "img1" },
              selectHint: "Click Dr. Ortiz's photo first.",
            },
          ],
        },
        {
          instruction: "Compress every picture in the document to E-mail (96 ppi) resolution so the directory is small enough to email.",
          hint: "Click any photo. Picture Format tab › Adjust group › Compress Pictures › clear Apply only to this picture › E-mail (96 ppi) › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "compressPictures", values: { resolution: "E-mail (96 ppi)", onlyThis: false } },
              requires: { selection: ["img1", "img2", "img3", "img4"] },
              selectHint: "Click any of the photos first so the Picture Format tab appears.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::shapes": [
    {
      id: "word-m3-shapes-1",
      app: "word",
      title: "Draw the referral workflow",
      scenario:
        "New staff at Lakeside Medical Associates keep asking which referral form goes where. You are turning the referral process into a simple diagram. A decision step is drawn as an ordinary box, and the last step is missing.",
      fileName: "Referral Workflow Diagram.docx",
      minutes: 6,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Referral Workflow" },
          { id: "p2", text: "How a specialist referral moves through Lakeside Medical Associates. Each shape is one step; the diamond is a yes-or-no decision." },
          { id: "shp1", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "center", width: 45, shapeFill: "#4472C4", text: "1. Provider orders the referral" } },
          { id: "shp2", kind: "shape", object: { label: "Rectangle", wrap: "topBottom", align: "center", width: 45, shapeFill: "#4472C4", text: "2. Is a prior authorization required?" } },
          { id: "shp3", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "center", width: 45, shapeFill: "#4472C4", text: "3. Request authorization from the insurer" } },
          { id: "shp4", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "center", width: 45, shapeFill: "#4472C4", text: "4. Schedule with the specialist" } },
          { id: "p3", text: "Questions about a referral? Call the referral coordinator at extension 230." },
        ],
      },
      tasks: [
        {
          instruction: "Change the box “2. Is a prior authorization required?” to a Diamond, the flowchart symbol for a decision.",
          hint: "Click the box. Shape Format tab › Insert Shapes group › Edit Shape › Change Shape › Diamond.",
          steps: [
            {
              action: { kind: "command", id: "shape.change", value: ["Diamond", "Flowchart: Decision"] },
              requires: { selection: "shp2" },
              selectHint: "Click the box “2. Is a prior authorization required?” first.",
            },
          ],
        },
        {
          instruction: "Fill the decision shape with Gold, Accent 4.",
          hint: "With the diamond selected: Shape Format tab › Shape Styles group › Shape Fill arrow › Gold, Accent 4.",
          steps: [
            {
              action: { kind: "command", id: "shape.fill", value: "#FFC000" },
              requires: { selection: "shp2" },
              selectHint: "Click the decision shape first.",
            },
          ],
        },
        {
          instruction: "Give the decision shape a Black outline.",
          hint: "With the diamond selected: Shape Format tab › Shape Outline arrow › Black.",
          steps: [
            {
              action: { kind: "command", id: "shape.outline", value: "#000000" },
              requires: { selection: "shp2" },
              selectHint: "Click the decision shape first.",
            },
          ],
        },
        {
          instruction: "Add a Shadow effect to the decision shape.",
          hint: "With the diamond selected: Shape Format tab › Shape Styles group › Shape Effects › Shadow.",
          steps: [
            {
              action: { kind: "command", id: "shape.effects", value: "Shadow" },
              requires: { selection: "shp2" },
              selectHint: "Click the decision shape first.",
            },
          ],
        },
        {
          instruction: "Add the missing last step: insert a Rounded Rectangle shape below the box “4. Schedule with the specialist”.",
          hint: "Click the box “4. Schedule with the specialist”. Insert tab › Illustrations group › Shapes › Rounded Rectangle.",
          steps: [
            {
              action: { kind: "command", id: "insert.shape", value: "Rounded Rectangle" },
              requires: { selection: "shp4" },
              selectHint: "Click the box “4. Schedule with the specialist” first, so the new shape goes below it.",
            },
          ],
        },
        {
          instruction: "Type “5. Send visit notes back to our office” in the new shape.",
          hint: "Double-click the new shape, type 5. Send visit notes back to our office, and press Enter.",
          steps: [{ action: { kind: "type", target: "shp5", value: "5. Send visit notes back to our office" } }],
        },
        {
          instruction: "Apply the Colored Fill - Blue, Accent 1 shape style to the new shape so it matches the other steps.",
          hint: "Click the new shape. Shape Format tab › Shape Styles gallery › Colored Fill - Blue, Accent 1.",
          steps: [
            {
              action: { kind: "command", id: "shape.style", value: "Colored Fill - Blue, Accent 1" },
              requires: { selection: "shp5" },
              selectHint: "Click the new shape first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::text-boxes": [
    {
      id: "word-m3-text-boxes-1",
      app: "word",
      title: "Add the after-hours callout to the visit sheet",
      scenario:
        "The patient visit sheet needs the after-hours number in a box that stands apart from the instructions, so a patient can find it at a glance on any part of the page. A text box is the right tool, as long as a screen reader can still describe it.",
      fileName: "Your Visit at Lakeside.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Your Visit at Lakeside" },
          { id: "p2", style: "Heading 1", text: "Before Your Visit" },
          { id: "p3", text: "Bring your photo ID, your insurance card, and a list of every medication you take, including vitamins. Arrive 15 minutes early to complete any forms." },
          { id: "p4", style: "Heading 1", text: "During Your Visit" },
          { id: "p5", text: "Your medical assistant will check your vital signs and review your medications. Write down your questions so you remember to ask them." },
          { id: "p6", style: "Heading 1", text: "After Your Visit" },
          { id: "p7", text: "Test results appear in the patient portal within five business days. We will call you sooner if a result needs attention." },
        ],
      },
      tasks: [
        {
          instruction: "Insert a Simple Text Box after the paragraph that begins “Bring your photo ID”.",
          hint: "Click the paragraph that begins “Bring your photo ID”. Insert tab › Text group › Text Box › Simple Text Box.",
          steps: [
            {
              action: { kind: "command", id: "insert.textBox", value: "Simple Text Box" },
              requires: { selection: "p3" },
              selectHint: "Click the paragraph that begins “Bring your photo ID” first.",
            },
          ],
        },
        {
          instruction: "Replace the text in the text box with “After hours? Call (718) 555-0199 to reach the on-call provider.”",
          hint: "Double-click the text box, replace the sample text with the new text, and press Enter.",
          steps: [{ action: { kind: "type", target: "tb1", value: "After hours? Call (718) 555-0199 to reach the on-call provider." } }],
        },
        {
          instruction: "Position the text box at the top right of the page.",
          hint: "Click the text box border. Shape Format tab › Arrange group › Position › Position in Top Right.",
          steps: [
            {
              action: { kind: "command", id: "shape.position", value: "Position in Top Right" },
              requires: { selection: "tb1" },
              selectHint: "Click the text box first.",
            },
          ],
        },
        {
          instruction: "Fill the text box with Orange, Accent 2.",
          hint: "With the text box selected: Shape Format tab › Shape Styles group › Shape Fill arrow › Orange, Accent 2.",
          steps: [
            {
              action: { kind: "command", id: "shape.fill", value: "#ED7D31" },
              requires: { selection: "tb1" },
              selectHint: "Click the text box first.",
            },
          ],
        },
        {
          instruction: "Give the text box a Dark Blue outline.",
          hint: "With the text box selected: Shape Format tab › Shape Outline arrow › Standard Colors › Dark Blue.",
          steps: [
            {
              action: { kind: "command", id: "shape.outline", value: "#002060" },
              requires: { selection: "tb1" },
              selectHint: "Click the text box first.",
            },
          ],
        },
        {
          instruction: "Change the shape of the text box to an Oval.",
          hint: "With the text box selected: Shape Format tab › Insert Shapes group › Edit Shape › Change Shape › Oval.",
          steps: [
            {
              action: { kind: "command", id: "shape.change", value: "Oval" },
              requires: { selection: "tb1" },
              selectHint: "Click the text box first.",
            },
          ],
        },
        {
          instruction: "Add the alt text “After-hours phone number for the on-call provider” to the text box.",
          hint: "With the text box selected: Shape Format tab › Accessibility group › Alt Text (or right-click › Edit Alt Text…) › type the description › OK.",
          steps: [
            {
              action: { kind: "dialog", id: "altText", values: { text: "After-hours phone number for the on-call provider" } },
              requires: { selection: "tb1" },
              selectHint: "Click the text box first.",
            },
          ],
        },
      ],
    },
  ],

  "module-3::align-order-group": [
    {
      id: "word-m3-align-group-1",
      app: "word",
      title: "Line up the referral workflow diagram",
      scenario:
        "The referral workflow diagram pinned at the front desk was positioned by dragging, and one box sits visibly out of line. Use the arrange tools to make the layout exact, fix an arrow that points the wrong way, and put the background panel behind everything.",
      fileName: "Referral Workflow - Front Desk Copy.docx",
      minutes: 5,
      initial: {
        paragraphs: [
          { id: "p1", style: "Title", text: "Referral Workflow (Front Desk Copy)" },
          { id: "p2", text: "Follow the steps from top to bottom. Each box is one step." },
          { id: "bg1", kind: "shape", object: { label: "Rectangle", wrap: "topBottom", align: "left", width: 100, shapeFill: "#DEEAF6", text: "Front desk referral steps" } },
          { id: "shp1", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "left", width: 40, shapeFill: "#4472C4", text: "1. Referral ordered" } },
          { id: "shp2", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "left", width: 40, shapeFill: "#4472C4", text: "2. Authorization checked" } },
          { id: "shp3", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "center", width: 40, shapeFill: "#4472C4", text: "3. Specialist scheduled" } },
          { id: "shp4", kind: "shape", object: { label: "Rounded Rectangle", wrap: "topBottom", align: "left", width: 40, shapeFill: "#4472C4", text: "4. Visit notes received" } },
          // The arrow was flipped by accident and points back toward the start.
          { id: "arr1", kind: "shape", object: { label: "Right Arrow", wrap: "topBottom", align: "left", width: 20, shapeFill: "#70AD47", flipH: true } } as WordPara,
          { id: "p3", text: "When all four steps are done, file the referral packet in the patient's chart." },
        ],
      },
      tasks: [
        {
          instruction: "Select the four numbered step boxes and align them to the left.",
          hint: "Click “1. Referral ordered”, then Shift+click “4. Visit notes received” (or Ctrl+click each box). Shape Format tab › Arrange group › Align › Align Left.",
          steps: [
            {
              action: { kind: "command", id: "object.align", value: "Align Left" },
              requires: { selection: STEP_BOXES },
              selectHint: "Select all four numbered boxes first: click the first box, then Shift+click the fourth.",
            },
          ],
        },
        {
          instruction: "With the four boxes still selected, distribute them vertically so the spacing between them is even.",
          hint: "Shape Format tab › Arrange group › Align › Distribute Vertically.",
          steps: [
            {
              action: { kind: "command", id: "object.align", value: "Distribute Vertically" },
              requires: { selection: STEP_BOXES },
              selectHint: "Select all four numbered boxes first.",
            },
          ],
        },
        {
          instruction: "Group the four step boxes so they move and resize as one object.",
          hint: "With all four selected: Shape Format tab › Arrange group › Group › Group (or right-click › Group).",
          steps: [
            {
              action: { kind: "command", id: "object.group", value: "Group" },
              requires: { selection: STEP_BOXES },
              selectHint: "Select all four numbered boxes first.",
            },
          ],
        },
        {
          instruction: "The green arrow points back toward the start. Flip it horizontally.",
          hint: "Click the arrow. Shape Format tab › Arrange group › Rotate › Flip Horizontal.",
          steps: [
            {
              action: { kind: "command", id: "shape.rotate", value: "Flip Horizontal" },
              requires: { selection: "arr1" },
              selectHint: "Click the green arrow first.",
            },
          ],
        },
        {
          instruction: "Send the light blue background panel to the back, behind every other object.",
          hint: "Click the light blue panel. Shape Format tab › Arrange group › Send Backward arrow › Send to Back.",
          steps: [
            {
              action: { kind: "command", id: "object.sendBackward", value: "Send to Back" },
              requires: { selection: "bg1" },
              selectHint: "Click the light blue background panel first.",
            },
          ],
        },
        {
          instruction: "Open the Selection Pane to check the stacking order of the objects.",
          hint: "Shape Format tab (or Layout tab) › Arrange group › Selection Pane.",
          steps: [{ action: { kind: "command", id: "object.selectionPane" } }],
        },
      ],
    },
  ],
};
