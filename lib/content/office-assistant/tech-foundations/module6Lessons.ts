import { Lesson } from "@/types/lesson";

export const module6Lessons: Lesson[] = [
  {
    slug: "printers-scanners-copiers",
    title: "Printers, Scanners, and Copiers in the Office",
    description:
      "Operate and troubleshoot the printers, scanners, and copiers that every medical office relies on daily — from loading paper to resolving jams and configuring scan-to-email.",
    duration: "20 min",
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
              "The print queue is the list of pending print jobs waiting to reach the printer — access it by double-clicking the printer icon in the taskbar notification area, or through Settings > Devices > Printers & Scanners > Open Queue. If the printer is not printing, check the queue first. A stalled or paused job at the top of the queue blocks all subsequent jobs. Right-click a stalled job and select Cancel to remove it and allow the queue to resume.",
              "Default printer settings — every Windows computer has a default printer that receives print jobs when you click Print without specifying a printer. At Lakeside Medical Associates, your default printer should be set to the correct local printer, not a cloud printer or a printer in another room. Change it in Settings > Devices > Printers & Scanners — click the correct printer and select 'Set as default.'",
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
              "Never use sharp objects to remove jammed paper — scissors, pens, or screwdrivers can damage the printer's rollers, the drum, or the fuser unit, turning a $0 paper jam into a $300 repair bill. Use only your hands, and only when the printer is powered on (so the fuser has fully cooled for laser printers — they operate at very high temperatures internally).",
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
              "Scan resolution for medical offices — 200–300 DPI (dots per inch) produces a clear, readable scan of most documents at a manageable file size. Higher resolutions (600+ DPI) are for detailed graphics or when text must be very small. Scanning at 600 DPI creates files 4× larger than 300 DPI for no practical improvement in readability for standard documents. Set your scanner's default to 300 DPI PDF output for consistent, efficient document handling.",
              "Scan-to-email routes the scanned file directly to an email address without a computer — set up on the printer's touchscreen by entering a scan destination email address. At Lakeside Medical Associates, scan-to-email is typically configured to send scanned documents to a shared email inbox or directly to your workstation email. If scan-to-email stops working, the most common causes are an expired email password (update it in the printer's network settings) or a change in the email server settings (notify IT).",
              "Scan-to-folder sends the scanned file directly to a network folder — a common and efficient setup in medical offices where scanned patient documents should go directly to a specific folder on the network drive. This avoids the email attachment workflow entirely. If your printer supports it, ask IT to configure scan-to-folder destinations for the most common document types you handle.",
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
        text: "Complete a printer and scanner assessment for your workstation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings > Devices > Printers & Scanners and list all printers and scanners currently installed on your workstation. Identify which is the default printer. Screenshot the Printers & Scanners page.",
          "Print a one-page test document (any Word document) using Ctrl+P. Confirm it prints correctly. Then open the print queue, locate your print job in Completed status, and screenshot it.",
          "If you have access to a scanner, scan one sample document at 300 DPI to PDF and confirm the file saves to the correct location. Note the file size of the resulting PDF.",
          "Write a 5-step Paper Jam Resolution Procedure for Lakeside Medical Associates, formatted as a numbered list that could be laminated and attached to the printer. Save as 'LMA_PaperJamProcedure_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Printers & Scanners screenshot, your print queue screenshot, your scanner file size note, and your Paper Jam Procedure document to your instructor. This exercise confirms you can independently assess and operate office printing and scanning equipment.",
      },
    ],
  },

  {
    slug: "monitors-peripherals-ergonomics",
    title: "Monitors, Peripherals, and Ergonomic Setup",
    description:
      "Set up a workstation that supports high performance and long-term comfort — correct monitor position, ergonomic peripherals, and a setup that prevents strain injuries.",
    duration: "15 min",
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
              "Monitor height — the top of the monitor should be at or slightly below eye level when you are sitting in your normal working posture. If the monitor is too low, you tilt your head down and strain the back of your neck. If it is too high, you tilt your head back and strain the front of the neck and upper back. Adjust using the monitor's height adjustment stand, or place the monitor on a riser or monitor arm.",
              "Monitor distance — your eyes should be approximately 20–28 inches from the screen (roughly arm's length). Too close increases eye fatigue; too far causes squinting and leaning forward. If you find yourself leaning toward the screen to read, increase the font size or zoom level in your application rather than moving closer.",
              "Monitor tilt — the monitor should be tilted slightly back (5–15 degrees) so the screen faces your eyes naturally without requiring you to tilt your head. Most monitors have a tilt adjustment on the base stand.",
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
              "Keyboard height — your elbows should be at approximately 90 degrees (or slightly more open — 100–110 degrees) when your hands rest on the keyboard in a natural typing position. Your wrists should be straight or very slightly inclined — never bent upward (extended) or downward (flexed). If your keyboard is on a standard desk and your chair is at the correct height, your wrists may be in an unnatural position — a keyboard tray that drops the keyboard below desk level corrects this.",
              "Mouse position — the mouse should be at the same height as the keyboard and as close to the keyboard as possible so you do not have to reach for it. A mouse positioned too far to the side causes shoulder strain from holding the arm out. Consider a compact keyboard (without a numeric keypad) if the full-size keyboard pushes the mouse too far to the right.",
              "Wrist position while typing — keep your wrists hovering slightly above the keyboard surface while actively typing, not resting on the desk or a wrist pad. Rest on the wrist pad only during pauses. Resting on the pad while typing bends the wrist and compresses the carpal tunnel.",
              "Touchpad vs. mouse — laptop touchpads are convenient but not ergonomic for extended office use. A separate external mouse with natural grip reduces strain for staff who do significant mouse work. Consider a vertical mouse (angled to keep the forearm in a more neutral rotation) if you experience forearm fatigue or pain.",
            ],
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
              "Increase the font size or zoom level in your applications so you can read comfortably from the correct 20–28 inch distance",
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
        text: "Conduct a complete ergonomic assessment and adjustment of your own workstation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Using a ruler or measuring tape, measure: your current monitor's top edge height vs. your seated eye level, the distance from your eyes to the screen, and your keyboard height relative to your elbow position. Record these measurements.",
          "Based on the measurements, identify any adjustments needed. Make at least two ergonomic adjustments to your workstation (chair height, monitor height or tilt, keyboard position). Re-measure after adjusting.",
          "Sit in your adjusted workstation for 10 minutes and type a paragraph. Write 2–3 sentences describing how the adjusted position feels compared to your previous setup.",
          "Create a 10-item Workstation Ergonomics Checklist for Lakeside Medical Associates new hires, formatted for printing. Save as 'LMA_ErgonomicsChecklist_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your before/after measurements, your comfort description, and your Ergonomics Checklist to your instructor. This exercise demonstrates both practical ergonomic knowledge and the ability to create a training resource that could be used with real new hires.",
      },
    ],
  },

  {
    slug: "hardware-troubleshooting",
    title: "Troubleshooting Common Hardware Issues",
    description:
      "Diagnose and resolve the most frequent hardware problems that occur in office environments — reducing downtime and IT tickets for issues you can solve independently.",
    duration: "15 min",
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
              "USB device not recognized: Try the device in a different USB port. Restart the computer. Check Device Manager (right-click Start > Device Manager) for any yellow warning triangles indicating a driver problem. If a USB hub is in use, plug the device directly into the computer to rule out the hub as the problem.",
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
        text: "Apply the troubleshooting framework to two simulated hardware scenarios.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Scenario 1 — Keyboard: Deliberately unplug your keyboard's USB cable. Note what happens on screen. Reconnect it to a different USB port. Confirm the keyboard responds again. Document the steps you took and what happened at each step.",
          "Scenario 2 — Monitor: Turn off your monitor using the power button (not the computer). Note what the screen shows. Turn it back on. Then disconnect the video cable briefly at the monitor end. Note what the computer shows. Reconnect. Document each step and observation.",
          "Based on your two scenarios, write a Hardware Incident Report as if you were reporting to IT: device, symptom, steps taken, result, and recommendation (resolved or needs IT follow-up).",
          "Create a one-page Hardware Troubleshooting Quick Reference Card for Lakeside Medical Associates covering the 4 device types from this lesson (monitor, wired keyboard/mouse, wireless keyboard/mouse, USB device). Format for printing. Save as 'LMA_HardwareTroubleshooting_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your two scenario documentation reports and your Hardware Troubleshooting Quick Reference Card to your instructor. These exercises demonstrate methodical troubleshooting and professional documentation — two skills that make you a more self-sufficient employee and a better communicator with IT when escalation is necessary.",
      },
    ],
  },

  {
    slug: "video-conferencing",
    title: "Video Conferencing Setup and Professional Use",
    description:
      "Set up, test, and present yourself professionally in Microsoft Teams and Zoom meetings — the video conferencing tools now standard in every healthcare office environment.",
    duration: "15 min",
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
              "Test hardware before every meeting — in Microsoft Teams, go to Settings > Devices and run the microphone and speaker test before joining. In Zoom, use the pre-meeting video/audio check. Testing takes 60 seconds and prevents the 5-minute delay of 'Can you hear me? We cannot hear you' that opens too many professional meetings.",
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
              "Mute when not speaking — background office noise (phones ringing, doors closing, patient conversations) is amplified through microphones in ways that disrupt the meeting for everyone else. When not actively speaking, keep yourself muted. Use the spacebar in both Teams and Zoom as a push-to-talk key (hold to unmute, release to mute) for quick responses.",
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
              "Scheduling a Teams meeting — in Outlook Calendar, click New Teams Meeting to create a meeting invitation that includes an automatic Teams meeting link. Add recipients in the To field, set the date and time, add an agenda in the body, and send. Recipients receive a calendar invitation with a Join button that opens the Teams meeting at the scheduled time.",
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
            text: "Video calls that involve patient care discussions — such as telehealth appointments or case consultations — must use HIPAA-compliant video platforms. Standard Zoom (non-Business Associate Agreement version) and consumer video apps (FaceTime, WhatsApp Video) are NOT HIPAA-compliant and must not be used for clinical conversations. Lakeside Medical Associates uses approved telehealth platforms for patient-facing video sessions. For internal staff meetings, standard Teams or Zoom is acceptable. Always confirm which platform is appropriate for the type of meeting before scheduling.",
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
        type: "list",
        ordered: true,
        items: [
          "Open Microsoft Teams (or Zoom) and navigate to Settings > Devices. Run the microphone and speaker test. Screenshot the successful device test results.",
          "Set up your background: position your camera at eye level, ensure you are facing a light source, and confirm no PHI or confidential information is visible in your frame. Take a screenshot of your video preview showing your setup.",
          "Schedule a practice Teams meeting with yourself (send an invitation to your own email) for 5 minutes from now. Join the meeting, test screen sharing by sharing a specific Word document window (not your full screen). Screenshot the meeting in progress with screen sharing active.",
          "Write a 5-item Video Meeting Conduct Guide for Lakeside Medical Associates staff — covering the five most important professional behaviors before and during video calls. Save as 'LMA_VideoMeetingGuide_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your three screenshots (device test, video setup, and screen sharing) and your Video Meeting Conduct Guide to your instructor. This exercise confirms that you can independently set up and participate professionally in video meetings — a skill that is now a basic requirement for virtually every office role.",
      },
    ],
  },
];
