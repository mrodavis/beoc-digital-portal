import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "printers-scanners-copiers",
    title: "Printers, Scanners, and Copiers in the Office",
    description:
      "Operate and troubleshoot the printers, scanners, and copiers that every medical office relies on daily — from loading paper to resolving jams and configuring scan-to-email.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/-2vShNF3cYU",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is 8:55 AM at Lakeside Medical Associates — five minutes before the first patient arrives. The waiting room printer jams mid-print on intake forms. The scanner at the front desk says it cannot connect to the network. And someone printed 200 copies of the wrong version of a document to the shared copier. You are the only staff member currently available. This lesson gives you the skills to handle all three situations calmly and independently.",
          },
        ],
      },
      {
        heading: "Printer Basics and Print Management",
        blocks: [
          {
            type: "paragraph",
            text: "Understanding how printers work and how to manage the print queue is the foundation of keeping office printing running smoothly:",
          },
          {
            type: "list",
            items: [
              "The print queue is the list of pending print jobs waiting to reach the printer — open it from Settings > Bluetooth & devices > Printers & scanners: select the printer, then Open print queue. A job stays in the queue only while it is waiting or printing; finished jobs disappear. If the printer is not printing, check the queue first. A stalled or paused job at the top of the queue blocks all subsequent jobs. Right-click a stalled job and select Cancel to remove it and allow the queue to resume.",
              "Default printer settings — every Windows computer has a default printer that receives print jobs when you click Print without specifying a printer. At Lakeside Medical Associates, your default printer should be set to the correct local printer, not a cloud printer or a printer in another room. Change it in Settings > Bluetooth & devices > Printers & scanners: first turn off Let Windows manage my default printer (under Printer preferences; when it is on, Windows picks the printer you used most recently), then select the correct printer and select Set as default.",
              "Print dialog options every professional should know: Copies (how many), Pages (all, current, or a page range), Print One Sided vs. Duplex (both sides — saves paper), and Orientation (portrait or landscape). Always preview before printing a multi-page document with complex formatting. Use Ctrl+P to open the print dialog from any application.",
              "Managing paper — different printers accept different paper sizes and types. Most office printers use 8.5×11 inch standard copy paper (letter size), 20 lb weight. When loading paper, align it properly in the tray — paper that is not square causes paper jams. Do not overfill the tray beyond the maximum fill line. When refilling, check that the paper guides are touching the paper edges without squeezing — loose guides allow paper to skew and jam.",
            ],
          },
        ],
      },
      {
        heading: "Resolving Paper Jams",
        blocks: [
          {
            type: "paragraph",
            text: "Paper jams are the most common printer problem in any office and can almost always be resolved without IT. Here is the correct procedure:",
          },
          {
            type: "list",
            items: [
              "Open all printer panels to locate the jam — most multifunction printers have a front panel, a rear access panel, and a duplexing unit. The printer's display usually indicates which panel contains the jam. Open the indicated panel first but check all panels — torn paper fragments in any section prevent the jam from clearing.",
              "Remove jammed paper slowly and completely — grip the paper firmly and pull it out gently in the direction of the paper path. Never pull against the paper path direction — this tears the paper and leaves fragments inside the printer. If the paper tears, carefully remove every fragment before closing the panels. Even a small torn piece left inside will cause a new jam on the next print job.",
              "Check for paper fragments after clearing — open every access panel after removing the obvious jam and look carefully for small torn pieces. Use a flashlight if needed. The printer will not function correctly until every fragment is removed.",
              "Never use sharp objects to remove jammed paper — scissors, pens, or screwdrivers can damage the printer's rollers, the drum, or the fuser unit, turning a $0 paper jam into a $300 repair bill. Use only your hands, follow the jam instructions on the printer's display or in its manual, and keep your hands away from the fuser area of a laser printer, which gets very hot.",
            ],
          },
        ],
      },
      {
        heading: "Scanners and Scan-to-Email",
        blocks: [
          {
            type: "paragraph",
            text: "Scanners convert physical documents to digital files — an essential workflow in medical offices for patient intake forms, insurance cards, referral documents, and signed consent forms:",
          },
          {
            type: "list",
            items: [
              "Document feeder vs. flatbed scanning — most office multifunction printers have both. The automatic document feeder (ADF) accepts a stack of pages and scans each one automatically — use it for multi-page documents where the original condition does not matter. The flatbed (the glass surface) scans one page at a time but handles fragile, wrinkled, or bound documents that cannot go through the ADF. Always use the flatbed for original insurance cards, passports, and any document that cannot be damaged.",
              "Scan resolution for medical offices — 200–300 DPI (dots per inch) produces a clear, readable scan of most documents at a manageable file size. Higher resolutions (600+ DPI) are for detailed graphics or when text must be very small. Scanning at 600 DPI creates files 4× larger than 300 DPI for no practical improvement in readability for standard documents. Set the scanner's default to 300 DPI PDF output (on the multifunction printer or in its scanning software) for consistent, efficient document handling. The free Windows Scan app is simpler: it saves JPEG, PNG, TIFF, or Bitmap files, by default to Pictures › Scans.",
              "Scan-to-email routes the scanned file directly to an email address without a computer — set up on the printer's touchscreen by entering a scan destination email address. At Lakeside Medical Associates, scan-to-email is typically configured to send scanned documents to a shared email inbox or directly to your workstation email. If scan-to-email stops working, the most common causes are an expired email password (update it in the printer's network settings) or a change in the email server settings (notify IT).",
              "Scan-to-folder sends the scanned file directly to a network folder — a common and efficient setup in medical offices where scanned patient documents should go directly to a specific folder on the network drive. This avoids the email attachment workflow entirely. If your printer supports it, ask IT to configure scan-to-folder destinations for the most common document types you handle.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Clear a paper jam in the right order",
            prompt: "Drag the steps into the order you would follow when the front desk printer jams.",
            items: [
              { id: "j1", text: "Read the printer's display to see where the jam is" },
              { id: "j2", text: "Open the panel it names (and check the other panels too)" },
              { id: "j3", text: "Pull the paper out slowly in the direction the paper travels" },
              { id: "j4", text: "Look for torn scraps in every panel, keeping clear of the hot fuser" },
              { id: "j5", text: "Close the panels and print a test page" },
            ],
            explanation: "Find the jam, open the right panel, remove the paper in the paper path direction, check for scraps (the usual cause of a repeat jam), then confirm with a test print.",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Scanned patient documents — especially insurance cards, intake forms, and consent forms — are Protected Health Information and must be handled with HIPAA-level care from the moment they leave the scanner. Do not scan patient documents to your personal email, a personal USB drive, or an unapproved cloud storage location. Confirm before scanning that the scan destination (email address or network folder) is the correct, approved location for that document type. Once scanned, the original paper document should be handled per your office's document management policy — typically stored securely or shredded if the digital version is the official record.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a one-page Printer and Scanner Troubleshooting Guide for medical office front desk staff. Include sections for: print queue jams (computer-side), paper jams (printer-side), scanner not connecting, and scan-to-email failures. Each section should have 3–4 clear steps a non-technical staff member can follow before calling IT.' Customize the guide for your specific printer model if known.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "After clearing an obvious paper jam, the printer immediately jams again on the next print job. What is the most likely cause?",
            options: [
              "The paper is the wrong size",
              "A small torn piece of paper was left inside the printer during the first jam removal",
              "The printer needs to be restarted",
              "The print queue is set to the wrong printer",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a printer and scanner assessment for a workstation.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do steps 1 to 3 with your printer and scanner. On a school computer, printer settings and scanning are blocked, so do steps 1 to 3 in the Challenge Lab below. Step 4 is a Word document and works on any computer.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings › Bluetooth & devices › Printers & scanners and list the printers and scanners installed. Identify the default printer (it says Default under its name). In the Challenge Lab, the default is the wrong printer: turn off Let Windows manage my default printer and set Front Desk Printer as the default.",
          "Open a one-page Word document and print it with Ctrl+P. Then open the print queue (select the printer › Open print queue) and find your job while it is waiting or printing.",
          "Scan one sample document and check where it saved and its file size. With the Windows Scan app, choose the scanner, the Source (Flatbed or Feeder), and the File type; scans save to Pictures › Scans. If your scanner's own software offers PDF at 300 DPI, use that. Note the file size.",
          "Write a 5-step Paper Jam Resolution Procedure for Lakeside Medical Associates, formatted as a numbered list that could be laminated and attached to the printer. Save it as 'LMA_PaperJamProcedure_YYYY-MM.docx' (use the current year and month).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or, if you used your own computer, screenshots of Printers & scanners and the print queue plus your scan file size note. Add your Paper Jam Procedure document and submit everything to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "monitors-peripherals-ergonomics",
    title: "Monitors, Peripherals, and Ergonomic Setup",
    description:
      "Set up a workstation that supports high performance and long-term comfort — correct monitor position, ergonomic peripherals, and a setup that prevents strain injuries.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/58d4h9yCDc8",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "After three months working at Lakeside Medical Associates, a front desk staff member develops persistent neck pain and headaches. An occupational health assessment reveals that their monitor is positioned too low, their chair height is incorrect, and their keyboard is at a height that causes wrist flexion during typing. These are all preventable with correct setup — and correcting them requires no special equipment, only knowledge. This lesson gives you that knowledge before problems develop.",
          },
        ],
      },
      {
        heading: "Monitor Setup and Positioning",
        blocks: [
          {
            type: "paragraph",
            text: "Incorrect monitor positioning is one of the leading causes of eye strain, headaches, and neck and shoulder pain in office workers. Proper setup takes five minutes and prevents cumulative injury:",
          },
          {
            type: "list",
            items: [
              "Monitor height — the top of the monitor (the top line of the screen) should be at or slightly below eye level when you are sitting in your normal working posture. If the monitor is too low, you tilt your head down and strain the back of your neck. If it is too high, you tilt your head back and strain the front of the neck and upper back. Adjust using the monitor's height adjustment stand, or place the monitor on a riser or monitor arm.",
              "Monitor distance — OSHA's preferred viewing distance is 20 to 40 inches from your eyes to the screen, and at least 20 inches. Too close increases eye fatigue; too far causes squinting and leaning forward. If you find yourself leaning toward the screen to read, increase the font size or zoom level in your application rather than moving closer.",
              "Monitor tilt — keep the screen perpendicular to your line of sight, which usually means tilting it back no more than 10 to 20 degrees, so it faces your eyes without you tilting your head. Most monitors have a tilt adjustment on the base stand.",
              "Dual monitor setup — if you use two monitors, position the primary monitor directly in front of you and the secondary monitor to the side. If you use both equally, position them symmetrically with a slight inward angle. Avoid twisting to view the secondary monitor for extended periods — this causes neck strain. Use Alt+Tab to move between applications rather than constantly turning your neck to look at the secondary screen.",
            ],
          },
        ],
      },
      {
        heading: "Keyboard and Mouse Positioning",
        blocks: [
          {
            type: "paragraph",
            text: "Keyboard and mouse positioning affects your wrists, forearms, and shoulders — three common sites of repetitive strain injury in office workers:",
          },
          {
            type: "list",
            items: [
              "Keyboard height — your elbows should stay close to your body and be bent between 90 and 120 degrees when your hands rest on the keyboard, with your hands, wrists, and forearms straight, in line, and roughly parallel to the floor — never bent upward (extended) or downward (flexed). If your keyboard is on a standard desk and your chair is at the correct height, your wrists may be in an unnatural position — a keyboard tray that drops the keyboard below desk level corrects this.",
              "Mouse position — the mouse should be at the same height as the keyboard and as close to the keyboard as possible so you do not have to reach for it. A mouse positioned too far to the side causes shoulder strain from holding the arm out. Consider a compact keyboard (without a numeric keypad) if the full-size keyboard pushes the mouse too far to the right.",
              "Wrist position while typing — keep your wrists hovering slightly above the keyboard surface while actively typing, not resting on the desk or a wrist pad. Rest on the wrist pad only during pauses. Resting on the pad while typing bends the wrist and compresses the carpal tunnel.",
              "Touchpad vs. mouse — laptop touchpads are convenient but not ergonomic for extended office use. A separate external mouse with natural grip reduces strain for staff who do significant mouse work. Consider a vertical mouse (angled to keep the forearm in a more neutral rotation) if you experience forearm fatigue or pain.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Neutral working positions",
            prompt: "Match each part of the setup to OSHA's guidance for computer workstations.",
            items: [
              { id: "top", text: "Top line of the screen", match: "At or slightly below eye level" },
              { id: "dist", text: "Eyes to screen", match: "20 to 40 inches (at least 20)" },
              { id: "tilt", text: "Screen tilt", match: "No more than 10 to 20 degrees back" },
              { id: "elb", text: "Elbows", match: "Close to the body, bent 90 to 120 degrees" },
              { id: "wr", text: "Hands, wrists, and forearms", match: "Straight, in line, roughly parallel to the floor" },
              { id: "feet", text: "Feet", match: "Flat on the floor, or on a footrest" },
            ],
            explanation: "These come from OSHA's Computer Workstations eTool. Small changes, like raising the monitor or adding a footrest, move you back into these neutral positions.",
          },
        ],
      },
      {
        heading: "Chair and Posture",
        blocks: [
          {
            type: "paragraph",
            text: "The correct chair setup supports productive posture throughout an 8-hour shift — incorrect chair height is at the root of most workstation discomfort complaints:",
          },
          {
            type: "list",
            items: [
              "Seat height — adjust the seat height so your feet rest flat on the floor (or on a footrest) with your knees at approximately 90 degrees. If you raise the seat high enough for good keyboard height but your feet dangle, add a footrest. Do not slouch forward or backwards — sit with your back against the chair back.",
              "Lumbar support — the chair's lumbar support should press against your lower back at approximately the level of your belt. Lumbar support that is too high pushes the upper back forward; too low provides no benefit. If your chair has an adjustable lumbar, position it to feel supported when sitting back naturally.",
              "Break schedule — no matter how well your workstation is set up, sitting in any position for hours without movement causes discomfort. Take a 2-minute break every 30–60 minutes: stand up, walk a few steps, and stretch your neck and wrists. Standing desks and sit-stand converters allow alternating between sitting and standing throughout the day.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "If you experience persistent pain, tingling, numbness, or discomfort in your hands, wrists, forearms, neck, or back related to workstation use, report it to your supervisor immediately. Early intervention — an ergonomic workstation assessment, different equipment, or modified duties — resolves most problems before they become injuries. Staying silent about pain and hoping it gets better on its own often results in injuries that require time off work and medical treatment. Your employer is responsible for providing an ergonomically appropriate workstation — reporting discomfort is not a complaint, it is your right.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I am an office assistant who sits at a computer for 7–8 hours a day. Design a complete ergonomic workstation setup checklist that I can use to evaluate and adjust my current setup, including: monitor height and distance, keyboard and mouse position, chair height and lumbar support, and lighting conditions. Format it as a checklist I can print and use for self-assessment.' Use the checklist to evaluate your current workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You notice that you frequently lean forward toward your monitor to read the screen clearly. What is the most correct ergonomic solution?",
            options: [
              "Move the monitor closer to your eyes",
              "Increase the font size or zoom level in your applications so you can read comfortably from the recommended 20 to 40 inch distance",
              "Tilt the monitor further back",
              "Reduce your screen resolution so text appears larger",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Conduct a complete ergonomic assessment and adjustment of a workstation, at home or at school.",
      },
      {
        type: "callout",
        variant: "info",
        text: "Steps 1 to 3 use a ruler and the furniture, so they work on any computer (at school, ask before moving equipment). Step 4 changes Windows display settings: on your own computer, do it in Settings; on a school computer, do it in the Challenge Lab below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Using a ruler or measuring tape, measure: the monitor's top edge height compared with your seated eye level, the distance from your eyes to the screen, and your keyboard height compared with your elbows. Record these measurements.",
          "Based on the measurements, identify the adjustments needed. Make at least two ergonomic adjustments (chair height, monitor height or tilt, keyboard position), then measure again.",
          "Sit at the adjusted workstation for 10 minutes and type a paragraph. Write 2 to 3 sentences describing how the adjusted position feels compared with the previous setup.",
          "Adjust the display so you can read from 20 to 40 inches away instead of leaning in: in Settings › System › Display, use the recommended Display resolution and set Scale (for example, 125%); if a second monitor is connected but dark, select Detect and choose Extend these displays; if text is still small, raise Settings › Accessibility › Text size.",
          "Create a 10-item Workstation Ergonomics Checklist for Lakeside Medical Associates new hires, formatted for printing. Save it as 'LMA_ErgonomicsChecklist_YYYY-MM.docx' (use the current year and month).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your before and after measurements, your comfort description, your Challenge Lab results page for step 4 (enter your name on the lab's finish screen and select Print or save results) or a note of the display settings you chose on your own computer, and your Ergonomics Checklist. Submit them to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "hardware-troubleshooting",
    title: "Troubleshooting Common Hardware Issues",
    description:
      "Diagnose and resolve the most frequent hardware problems that occur in office environments — reducing downtime and IT tickets for issues you can solve independently.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/j-OAa1JSXhc",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "At 2 PM on a Friday at Lakeside Medical Associates, three things happen simultaneously: a workstation's monitor goes dark, the wireless keyboard stops responding, and the copier displays an error code. IT is off-site and will not be available until Monday. You need to resolve as much as possible independently — this lesson gives you the systematic approach to do exactly that.",
          },
        ],
      },
      {
        heading: "A Systematic Approach to Troubleshooting",
        blocks: [
          {
            type: "paragraph",
            text: "Effective troubleshooting is a methodical process — not random trying of different things until something works. This systematic approach resolves most hardware problems faster and more reliably:",
          },
          {
            type: "list",
            items: [
              "Step 1: Identify the symptom precisely — 'it does not work' is not a useful problem description. 'The monitor displays no image when the computer is on, the power light is amber, and it worked correctly this morning' gives you specific, actionable information. Document the exact symptom before attempting any fix.",
              "Step 2: Check the simple things first — is it plugged in? Is the power on? Is it connected? Are the cables secure? Most hardware issues in office environments are connection or power problems. Before assuming a device is broken, physically inspect every cable and connection. Reseat (unplug and replug) any cable that is involved in the problem.",
              "Step 3: Restart and test — restart the computer and test the device again. Many driver-level hardware issues resolve with a restart. If the device has its own power, turn it off, wait 30 seconds, and turn it back on. This is the troubleshooting step most often skipped and most often effective.",
              "Step 4: Test with known-good components — if you have a spare cable, try replacing the suspect cable. If you have another monitor, connect it to the same computer to determine whether the problem is the monitor or the computer. Isolation testing tells you exactly which component is faulty.",
              "Step 5: Document and escalate — if the simple steps do not resolve the issue, document exactly what you tried and what happened, then escalate to IT with that documentation. 'I have tried X, Y, and Z and the behavior is still [specific symptom]' tells IT exactly where to start, saving time for everyone.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "The five-step method",
            prompt: "Put the troubleshooting steps in order.",
            items: [
              { id: "t1", text: "Identify the symptom precisely" },
              { id: "t2", text: "Check the simple things: power, cables, connections" },
              { id: "t3", text: "Restart the computer or the device and test again" },
              { id: "t4", text: "Test with known-good parts to isolate the problem" },
              { id: "t5", text: "Document what you tried and escalate to IT" },
            ],
            explanation: "Each step either fixes the problem or narrows it down, so by the time you reach IT you can tell them exactly what is and is not the cause.",
          },
        ],
      },
      {
        heading: "Common Hardware Problems and Solutions",
        blocks: [
          {
            type: "paragraph",
            text: "These are the most frequently occurring hardware issues in office environments — and most can be resolved without IT:",
          },
          {
            type: "list",
            items: [
              "Monitor no image: Check that the monitor power light is on (if not, check the power cable and outlet). Check that the video cable (HDMI or DisplayPort) is securely connected at both the monitor and computer ends. Try pressing a key or moving the mouse (the monitor may be in sleep mode). If the computer has multiple video outputs, try a different port. If the computer shows on a different monitor, the original monitor may need replacement.",
              "Keyboard or mouse not responding (wired): Disconnect and reconnect the USB cable. Try a different USB port on the computer. Restart the computer with the device connected. If still not working, try the device on another computer — this tells you if the device or the computer's USB port is the problem.",
              "Keyboard or mouse not responding (wireless): Check the battery level (replace batteries even if recently installed — a battery may fail unexpectedly). Check that the USB receiver dongle is firmly plugged in and try a different USB port. Power off the keyboard/mouse, wait 10 seconds, power on. Check the pairing button if the device uses Bluetooth.",
              "USB device not recognized: Try the device in a different USB port. Restart the computer. Check Device Manager (right-click Start > Device Manager) for a yellow warning icon on the device, which means Windows found a problem; select the device to read its status (for example, a Code 43 error). Uninstalling the device (right-click it › Uninstall device) and restarting lets Windows reinstall its driver. If a USB hub is in use, plug the device directly into the computer to rule out the hub as the problem.",
            ],
          },
        ],
      },
      {
        heading: "When to Escalate to IT",
        blocks: [
          {
            type: "paragraph",
            text: "Knowing when to escalate is as important as knowing how to troubleshoot — attempting to fix things beyond your authorization can cause more damage:",
          },
          {
            type: "list",
            items: [
              "Escalate hardware issues you cannot resolve after the five-step process — if the device still does not work after systematic troubleshooting, it likely needs repair or replacement by IT. Do not continue attempting fixes beyond the connection, restart, and cable-swap level.",
              "Escalate issues that require opening hardware — do not open a computer case, replace internal components, or attempt to repair printer internals. These tasks require technical training and may void warranties.",
              "Escalate network connectivity problems beyond the basic check — if the internet is down for the whole office after checking the router (as covered in Module 3), that is an IT or ISP issue requiring their intervention. Do not attempt to reconfigure the router.",
              "Write a clear incident report for IT — include: the device name/model, what exactly is happening, what you already tried, and when the problem started. A clear incident report means IT does not have to spend the first 10 minutes of their engagement re-gathering information you already have.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Opening computer cases, replacing internal components, modifying hardware configurations, or attempting to repair office equipment beyond basic cable management and jam clearing is outside the scope of a front desk professional's role at Lakeside Medical Associates. Unauthorized hardware modifications can void warranties, create safety hazards (high-voltage components in printers and computers can cause electrical shock), and create liability. Know where your troubleshooting responsibility ends and IT's begins — that line is 'cable swap and restart.'",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a Hardware Troubleshooting Decision Tree for a medical office front desk assistant. It should cover: monitor issues, keyboard/mouse issues (both wired and wireless), printer connectivity issues, and USB device problems. Each branch should lead to a clear action or an IT escalation point.' Use the decision tree as the basis for a laminated reference card for your workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Your wireless mouse stops working. You replace the batteries and the problem persists. What is the next troubleshooting step?",
            options: [
              "Open the mouse and inspect the circuit board",
              "Call IT immediately — this is beyond front desk troubleshooting",
              "Check that the USB receiver dongle is firmly connected, try a different USB port, and power-cycle the mouse",
              "Purchase a new mouse",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Apply the troubleshooting framework to two hardware scenarios.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer (with permission from whoever owns it), do the physical versions of Scenarios 1 and 2. On a school computer, do not unplug anything: do Scenarios 1 and 2 in the Challenge Lab below, where the keyboard and the second monitor have stopped working. Steps 3 and 4 are Word documents and work on any computer.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Scenario 1, keyboard. Own computer: unplug the keyboard's USB cable, note what happens, reconnect it to a different USB port, and confirm it types again. Challenge Lab: check the keyboard's status in Settings › Bluetooth & devices, open Device Manager, read the keyboard's error code, uninstall the device, restart, and confirm it shows as connected. Document each step and what happened.",
          "Scenario 2, monitor. Own computer: turn the monitor off with its power button, note what the screen shows, and turn it back on; then disconnect the video cable briefly at the monitor end, note what the computer shows, and reconnect. Challenge Lab: detect the dark second monitor in Settings › System › Display and set Extend these displays. Document each step and observation.",
          "Based on your two scenarios, write a Hardware Incident Report as if you were reporting to IT: device, symptom, steps taken, result, and recommendation (resolved or needs IT follow-up).",
          "Create a one-page Hardware Troubleshooting Quick Reference Card for Lakeside Medical Associates covering the 4 device types from this lesson (monitor, wired keyboard/mouse, wireless keyboard/mouse, USB device). Format it for printing and save it as 'LMA_HardwareTroubleshooting_YYYY-MM.docx' (use the current year and month).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or your notes from the physical scenarios, your Hardware Incident Report, and your Quick Reference Card to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "video-conferencing",
    title: "Video Conferencing Setup and Professional Use",
    description:
      "Set up, test, and present yourself professionally in Microsoft Teams and Zoom meetings — the video conferencing tools now standard in every healthcare office environment.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/u_KAbrb0aGk",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates holds a weekly all-staff meeting on Microsoft Teams, a monthly billing review with the insurance liaison on Zoom, and periodic telehealth visits where the front desk coordinates the setup and waiting room experience for patients. All three require you to be competent with video conferencing software — not just knowing how to join, but knowing how to present professionally, troubleshoot audio and video problems, and maintain the clinic's professionalism on screen.",
          },
        ],
      },
      {
        heading: "Hardware Requirements for Video Calls",
        blocks: [
          {
            type: "paragraph",
            text: "Before joining any professional video call, verify that your hardware is working correctly:",
          },
          {
            type: "list",
            items: [
              "Webcam — most modern laptops have a built-in webcam adequate for professional calls. For desktop workstations, an external USB webcam (1080p resolution is standard for professional use) provides clear video. Position the webcam at eye level — a camera positioned too low (below the desk level pointing upward) is unflattering and unprofessional. A camera at eye level simulates a natural face-to-face conversation.",
              "Microphone — the built-in laptop microphone or webcam microphone is adequate for most calls, but can pick up background noise in a busy front office environment. A headset (USB or 3.5mm headset with a close-range microphone) significantly reduces background noise and produces clearer audio for other participants. In a medical office where patient sounds may be in the background, a headset is the professional choice for any call involving sensitive topics.",
              "Headphones or speakers — wearing headphones or a headset eliminates echo (when your own audio is picked up by the microphone and re-transmitted to participants). On a call with speakers, any noise near your microphone — including other participants' voices from the speakers — can create feedback loops or distracting echo for everyone else.",
              "Test hardware before every meeting — in Microsoft Teams, select Settings and more (…) › Settings › Devices, choose your speaker, microphone, and camera, and select Make a test call. In Zoom, use the pre-meeting video and audio check. Testing takes 60 seconds and prevents the 5-minute delay of 'Can you hear me? We cannot hear you' that opens too many professional meetings.",
            ],
          },
        ],
      },
      {
        heading: "Professional Conduct in Video Meetings",
        blocks: [
          {
            type: "paragraph",
            text: "Video meetings require the same professional standards as in-person meetings — and because participants can see your environment and body language, some preparation is needed:",
          },
          {
            type: "list",
            items: [
              "Background and setting — ensure your background is professional: a plain wall, a neutral office background, or a professional virtual background (available in Teams and Zoom). Remove visible clutter, personal items, and anything in the frame that does not belong in a professional setting. Patient intake paperwork, medical records, or any PHI must never be visible in your video background.",
              "Lighting — you should be facing a light source, not sitting with a window behind you (backlit backgrounds make you appear as a dark silhouette). A desk lamp positioned in front of you and slightly above eye level produces flattering, professional lighting. Ring lights provide excellent even lighting for regular video meeting participants.",
              "Mute when not speaking — background office noise (phones ringing, doors closing, patient conversations) is amplified through microphones in ways that disrupt the meeting for everyone else. When not actively speaking, keep yourself muted. In Teams, press Ctrl+Shift+M to turn your mic on or off, or turn on Settings › Privacy › Keyboard shortcut to unmute and then hold Ctrl+Spacebar to talk while you are muted.",
              "Camera position and composure — look at the camera, not at your own video on screen — eye contact in video calls is created by looking at the camera, not at the participant's face. Sit upright, not reclined. Show your face clearly — do not sit so far from the camera that participants cannot read your expression.",
            ],
          },
        ],
      },
      {
        heading: "Managing Meetings in Teams and Zoom",
        blocks: [
          {
            type: "paragraph",
            text: "As a front desk professional, you may be responsible for setting up, managing, or facilitating video meetings — not just attending them:",
          },
          {
            type: "list",
            items: [
              "Scheduling a Teams meeting — in the new Outlook, go to Calendar, select New event, and turn on the Teams meeting toggle next to the title; in classic Outlook, create a Meeting and select Teams Meeting. You can also use New meeting in the Teams calendar. Add attendees, set the date and time, add an agenda, and send. Recipients receive a calendar invitation with a Join button that opens the Teams meeting at the scheduled time.",
              "Meeting controls during the call — as a host or presenter, you can: Mute all participants (to stop background noise during a presentation), manage the participant list (Participants panel), share your screen (Share > select window or desktop), and record the meeting (Record — with participant notification as required by policy and law).",
              "Screen sharing — press the Share button in Teams or Zoom to share your entire screen or a specific window. Best practice: share a specific window (not your entire screen) to avoid accidentally showing other open content. Before sharing, close any tabs or windows that should not be visible, and check that no patient records or PHI are open.",
            ],
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Video calls that involve patient care discussions — such as telehealth appointments or case consultations — must meet HIPAA requirements. During the COVID-19 public health emergency, HHS temporarily allowed everyday video apps such as FaceTime for telehealth, but that flexibility ended in 2023 (with a transition period through August 9, 2023). Patient video visits now belong on a platform the practice has approved, from a vendor that signs a HIPAA business associate agreement (BAA) with the practice. Lakeside Medical Associates uses an approved telehealth platform for patient-facing video sessions. For internal staff meetings, standard Teams or Zoom is acceptable. Always confirm which platform is appropriate for the type of meeting before scheduling.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a Video Meeting Preparation Checklist for medical office staff. Include sections for: hardware check (camera, microphone, speakers), environment check (background, lighting, noise), platform check (software updated, settings configured), and conduct reminders (mute, camera position, screen sharing safety). Format it as a printable checklist.' Customize and print the checklist for use before every video meeting.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "During a video meeting with a referring physician's office, your phone rings loudly in the background. What should you have done to prevent this?",
            options: [
              "Used a different video platform",
              "Set your phone to silent or Do Not Disturb before joining the meeting, and used a headset to prevent microphone pickup of background noise",
              "Asked the physician to mute their microphone",
              "Recorded the meeting for review later",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a video conferencing setup and conduct test.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do steps 1 to 3 in Microsoft Teams. On a school computer, Teams, the camera, or the microphone may be blocked, so do steps 1 to 3 in the Challenge Lab below, a simulated Teams app. Step 4 is a Word document and works on any computer.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In Teams, select Settings and more (…) › Settings › Devices. Choose your speaker and microphone (a headset if you have one) and select Make a test call. Note the result.",
          "Schedule a practice meeting with only yourself (in the Teams calendar, select New meeting, add a title, and send). Open it, select Join, and on the pre-join screen check your video preview: camera at eye level, facing a light source, nothing confidential or PHI in the frame. Blur your background.",
          "Join the meeting and practice screen sharing by sharing a single Word document window, not your entire screen. Then stop sharing and leave.",
          "Write a 5-item Video Meeting Conduct Guide for Lakeside Medical Associates staff covering the five most important professional behaviors before and during video calls. Save it as 'LMA_VideoMeetingGuide_YYYY-MM.docx' (use the current year and month).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or, if you used your own computer, screenshots of the test call, your video preview, and the window you shared. Add your Video Meeting Conduct Guide and submit them to your instructor or course folder.",
      },
    ],
  },
];
