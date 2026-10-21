import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "touch-typing-fundamentals",
    title: "Touch Typing Fundamentals",
    description:
      "Learn correct finger placement on the keyboard and develop the touch typing habit that makes office data entry faster, more accurate, and less tiring.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/KTv6Z0eESZ8",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The front desk at Lakeside Medical Associates checks in 40 to 60 patients a day. Each check-in means typing a name, a date of birth, an insurance member ID, and visit details. Suppose a check-in takes about 60 words of typing. At 25 words per minute (WPM), that is about 2.4 minutes of typing; at 50 WPM, about 1.2 minutes. Across 50 check-ins, the difference is about an hour a day. Speed is only half of it: a hunt-and-peck typist looks down for every key and has to find their place on the screen again after each glance, which is exactly when digits get swapped. A touch typist keeps their eyes on the screen and the source document and catches mistakes as they happen.",
          },
        ],
      },
      {
        heading: "The Home Row and Finger Placement",
        blocks: [
          {
            type: "paragraph",
            text: "Touch typing means typing without looking at the keyboard. Your fingers learn the key positions by feel and muscle memory. The foundation is the home row: the row of keys where your fingers rest when they are not pressing a key.",
          },
          {
            type: "list",
            items: [
              "The home row keys are A S D F (left hand) and J K L ; (right hand). Your fingers rest lightly on these eight keys, with your thumbs over the space bar. Most keyboards have small raised bumps on the F and J keys so you can find the home position by feel. Building the reflex to return to the home row is the single most important touch typing habit.",
              "Finger assignments: each finger is responsible for a column of keys. Left pinky: Q, A, Z, 1, Tab, Caps Lock, left Shift. Left ring: W, S, X, 2. Left middle: E, D, C, 3. Left index: R, F, V, T, G, B, 4, 5. Right index: Y, H, N, U, J, M, 6, 7. Right middle: I, K, comma, 8. Right ring: O, L, period, 9. Right pinky: P, semicolon, slash, apostrophe, 0, hyphen, Enter, Backspace, right Shift. Keeping to these assignments keeps reaches short and brings each finger straight back home.",
              "Thumbs press the space bar after every word. Use whichever thumb is comfortable, but use it consistently. Thumbs do not press letter keys.",
              "Shift uses the opposite hand: to type a capital letter with your left hand (such as A), hold the right Shift with your right pinky; for a right-hand letter (such as J), hold the left Shift with your left pinky.",
              "Return to the home row after every key. The most common beginner mistake is letting the fingers drift between keystrokes. After pressing any key, the finger goes back to its home key, which restores the reference point that makes touch typing accurate.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Which finger presses it?",
            prompt: "Sort each key into the finger that presses it in touch typing. Both hands use the same finger names.",
            buckets: [
              { id: "index", label: "Index fingers" },
              { id: "middle", label: "Middle fingers" },
              { id: "ring", label: "Ring fingers" },
              { id: "pinky", label: "Pinkies" },
            ],
            items: [
              { id: "k-r", text: "R", bucket: "index" },
              { id: "k-u", text: "U", bucket: "index" },
              { id: "k-g", text: "G", bucket: "index" },
              { id: "k-n", text: "N", bucket: "index" },
              { id: "k-e", text: "E", bucket: "middle" },
              { id: "k-i", text: "I", bucket: "middle" },
              { id: "k-c", text: "C", bucket: "middle" },
              { id: "k-comma", text: ", (comma)", bucket: "middle" },
              { id: "k-w", text: "W", bucket: "ring" },
              { id: "k-o", text: "O", bucket: "ring" },
              { id: "k-x", text: "X", bucket: "ring" },
              { id: "k-period", text: ". (period)", bucket: "ring" },
              { id: "k-q", text: "Q", bucket: "pinky" },
              { id: "k-p", text: "P", bucket: "pinky" },
              { id: "k-z", text: "Z", bucket: "pinky" },
              { id: "k-semi", text: "; (semicolon)", bucket: "pinky" },
            ],
            explanation: "Each finger owns the keys in its column, above and below its home key. The index fingers also cover the extra column toward the middle of the keyboard (G and B on the left, H and N on the right).",
          },
          {
            type: "link",
            href: "/typing-lab/lessons/home-fj",
            label: "Try it now: Typing Lab, Lesson 1 (F and J)",
            description: "The on-screen hands and keyboard show the right finger for every key. The lessons add a few keys at a time.",
          },
        ],
      },
      {
        heading: "Building Muscle Memory",
        blocks: [
          {
            type: "paragraph",
            text: "Touch typing is a physical skill built through repetition, like learning an instrument or a sport. How you practice decides how fast you improve:",
          },
          {
            type: "list",
            items: [
              "Accuracy before speed. In the early stages, focus on pressing the correct key with the correct finger, not on going fast. Speed comes as accuracy becomes automatic, while practicing faster than you can type accurately builds the wrong habits. Aim for 95% accuracy or better before you push for speed; the Typing Lab's key lessons do not pass a drill below 95%.",
              "Short, regular sessions work better than occasional long ones. Twenty minutes of focused practice on most days builds skill faster than one three-hour session a week. At Lakeside Medical Associates, new staff practice for a few minutes at the start of each shift.",
              "Practice in the Typing Lab. BEOC Digital's Typing Lab has 28 key lessons that start at the home row and add a few keys at a time, 1- to 5-minute timed tests with medical office passages, and workplace drills for data entry, the numeric keypad, and medical terms. It saves your progress in your browser, so you can see your improvement over time, and nothing you type is sent anywhere.",
              "Resist looking at the keyboard. This is the hardest discipline and the most important. Every glance down breaks the eye-to-screen flow that makes typing efficient. If you feel lost, stop, find the bumps on F and J by feel, and continue. The urge to look fades with practice.",
            ],
          },
        ],
      },
      {
        heading: "Ergonomics: Typing Without Pain",
        blocks: [
          {
            type: "paragraph",
            text: "Typing for hours a day in an awkward position can lead to discomfort and injury in the hands, wrists, arms, and shoulders. Ergonomics is arranging your workstation to reduce that strain. The U.S. Occupational Safety and Health Administration (OSHA) recommends:",
          },
          {
            type: "list",
            items: [
              "Keyboard at about elbow height. Keep your shoulders relaxed and your elbows close to your body. Your wrists should be straight and in line with your forearms, not bent up, down, or to either side. If the desk is too high, raise the chair (with a footrest if your feet no longer rest flat) or use an adjustable keyboard tray. Do not use the keyboard's feet if they make your wrists bend.",
              "Wrist rests are for pauses, not for typing. While you type, your hands should move freely above the wrist rest. When you pause, rest the heel or palm of your hand on the pad, not your wrist.",
              "Take short breaks often. Stand up, stretch your fingers and wrists, and relax your shoulders. For your eyes, the American Optometric Association recommends the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.",
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
            text: "Typing errors in patient records have real consequences. A transposed digit in a date of birth can get an insurance claim denied, and a misspelled medication name in a note can affect patient care. As your speed grows, never trade accuracy for speed in clinical data entry. A typo in a practice letter is a minor embarrassment; a typo in a patient record can become a medical error. Accuracy always comes first in EHR and billing systems.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask an AI assistant such as Microsoft Copilot or ChatGPT: 'Design a 30-day touch typing practice plan for a medical office assistant who is a beginner typist. I practice in a typing lab with key lessons (home row, top row, bottom row, numbers, then Shift and punctuation), 1- to 5-minute timed tests, and data entry drills. Include daily practice time, which keys to focus on each week, and realistic net WPM and accuracy goals.' Compare the plan's goals with your own Typing Lab results and adjust them.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Which keys make up the home row position for the left hand?",
            options: ["Q, W, E, R", "A, S, D, F", "Z, X, C, V", "1, 2, 3, 4"],
            correctIndex: 1,
            explanation: "Your left fingers rest on A S D F and your right fingers on J K L ;. The bump on F helps your left index finger find home without looking.",
          },
          {
            type: "knowledge-check",
            question: "You need to type a capital J. Which Shift key should you hold?",
            options: ["The right Shift, with your right pinky", "The left Shift, with your left pinky", "Either Shift, with your thumb", "Caps Lock, then J, then Caps Lock again"],
            correctIndex: 1,
            explanation: "J is a right-hand key, so the left pinky holds the left Shift while the right index finger presses J. Using the opposite hand keeps both hands near the home row.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Take your baseline typing test and complete your first structured practice session in the Typing Lab.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Take a 1-minute timed test in the Typing Lab (Timed Tests, 1 min). This is your starting point. Enter your name and print or save the results page.",
          "Work through the home row key lessons in order, Lesson 1 (F and J) through Lesson 6 (Home row review). A drill passes at 95% accuracy. Do not skip ahead, and do not look down.",
          "In Word or Notepad, type these entries five times each without looking at the keys: your name, the phrase 'Lakeside Medical Associates,' and the sentence 'Patient appointment confirmed for Tuesday at 10:30 AM.'",
          "Take another 1-minute timed test and print or save the results. Write a 2-sentence reflection on what changed and what you want to improve.",
        ],
      },
      {
        type: "link",
        href: "/typing-lab/tests?minutes=1",
        label: "Open the Typing Lab: 1-minute timed test",
      },
      {
        type: "link",
        href: "/typing-lab/lessons",
        label: "Open the Typing Lab: Key Lessons",
        description: "Start with Lesson 1 (F and J) and work through Lesson 6 (Home row review).",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit both Typing Lab results pages (your baseline test and your end-of-session test) and your two-sentence reflection to your instructor or course folder. Keep practicing about 20 minutes a day; the Typing Lab's My Progress page charts your net WPM and accuracy test by test.",
      },
    ],
  },

  {
    slug: "keyboard-shortcuts",
    title: "Essential Keyboard Shortcuts for Windows",
    description:
      "Learn the keyboard shortcuts that replace the most common mouse-heavy tasks and keep your hands on the keyboard.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/7BoqV7omIdQ",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The front desk at Lakeside Medical Associates moves between the EHR, Outlook, Word, and a web browser all day. Every trip from the keyboard to the mouse and back takes a second or two, and those seconds add up across hundreds of small edits, copies, and window switches. Keyboard shortcuts keep your hands on the keys and your eyes on the screen. This lesson teaches the shortcuts that matter most for the tasks you will actually perform every day.",
          },
        ],
      },
      {
        heading: "Universal Windows Shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "These shortcuts work in nearly every Windows program, so learning them once pays off everywhere:",
          },
          {
            type: "list",
            items: [
              "Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+V (Paste): the most fundamental editing shortcuts. Copy duplicates the selected text or item. Cut removes it from its current location. Paste inserts whatever you last copied or cut. Learn these three first.",
              "Ctrl+Z (Undo) and Ctrl+Y (Redo): Undo reverses your last action and can be pressed repeatedly to undo several steps. Redo brings back an action you just undid. These are your safety net for an accidental deletion, a wrong paste, or an unwanted format change, and they work in Outlook, Word, Excel, and most browsers.",
              "Ctrl+S (Save): saves the current file in Word, Excel, and most other programs. Press it every few minutes while you work so a crash or power interruption costs you nothing.",
              "Ctrl+A (Select All): selects all content in the current document or text box. In File Explorer, it selects every file in the open folder. Useful before applying a change to a whole document or copying everything in it.",
              "Ctrl+F (Find): opens the search box in Word, Excel, browsers, and most text-based programs. Type a word or phrase and press Enter to jump to it. In Word, Ctrl+H opens Find and Replace, which replaces every instance of a word in one step.",
            ],
          },
        ],
      },
      {
        heading: "Window and Application Shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "These shortcuts manage your workspace and the apps running in it, which matters when you work in several programs at once:",
          },
          {
            type: "list",
            items: [
              "Alt+Tab (Switch windows): hold Alt and press Tab to cycle through open windows; release Alt when the one you want is highlighted. It is the fastest way to move between the EHR, Outlook, and Word without touching the mouse.",
              "Windows logo key+D (Show desktop): hides all open windows to show the desktop. Press it again to bring them back.",
              "Windows logo key+L (Lock): locks your computer immediately; your password is needed to get back in. Use it every time you leave your workstation, even briefly. At Lakeside Medical Associates, an unattended, unlocked screen showing a patient record is a privacy risk.",
              "Ctrl+W (Close tab): closes the current tab in Microsoft Edge or Google Chrome without closing the whole browser. In many other programs, it closes the current document.",
              "Windows logo key+number (1-9): opens the app pinned to the taskbar in that position, or switches to it if it is already open. If Outlook is the first pinned app and Word the second, Windows+1 opens Outlook and Windows+2 opens Word.",
            ],
          },
        ],
      },
      {
        heading: "Text Editing Shortcuts",
        blocks: [
          {
            type: "paragraph",
            text: "These shortcuts speed up moving and selecting in any text: email, Word documents, EHR text fields, and web forms:",
          },
          {
            type: "list",
            items: [
              "Ctrl+Left Arrow or Ctrl+Right Arrow: moves the cursor one whole word at a time instead of one character. Add Shift to select word by word: Ctrl+Shift+Right Arrow selects the next word.",
              "Home and End: move the cursor to the start or end of the current line. Ctrl+Home goes to the very beginning of the document; Ctrl+End goes to the very end.",
              "Shift+Arrow keys: select text one character at a time. Shift+Home selects from the cursor to the start of the line. These let you select exactly the words you want without the mouse.",
              "Backspace and Delete: Backspace removes the character to the left of the cursor; Delete removes the character to the right. Ctrl+Backspace deletes the whole word to the left, and Ctrl+Delete the whole word to the right, which is much faster than pressing Backspace eight times to fix a misspelled word.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Match each shortcut to what it does",
            prompt: "Drag each action onto the shortcut that does it.",
            items: [
              { id: "s-undo", text: "Ctrl+Z", match: "Undo the last action" },
              { id: "s-lock", text: "Windows logo key+L", match: "Lock the computer" },
              { id: "s-alttab", text: "Alt+Tab", match: "Switch between open windows" },
              { id: "s-find", text: "Ctrl+F", match: "Find a word on the page" },
              { id: "s-desk", text: "Windows logo key+D", match: "Show the desktop" },
              { id: "s-ctrlback", text: "Ctrl+Backspace", match: "Delete the word to the left" },
            ],
            explanation: "These six cover the most frequent mouse trips: fixing a mistake, protecting a screen, moving between apps, finding text, getting to the desktop, and deleting a whole word.",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Windows logo key+L should become the most automatic of all your keyboard habits at Lakeside Medical Associates. Every time you stand up from your workstation, to help a patient at the window, answer a phone across the room, or grab something from the printer, lock your screen first. A patient record left visible on an unlocked, unattended screen exposes protected health information even if no one happens to look. Make Windows+L as automatic as standing up.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask an AI assistant such as Microsoft Copilot or ChatGPT: 'Create a keyboard shortcut reference card for a medical office assistant who uses Windows 11, Microsoft Outlook, Microsoft Word, Microsoft Excel, and Microsoft Edge or Google Chrome daily. Group shortcuts by category (Universal, Windows, Outlook, Word, Excel, Browser) and format it as a printable one-page reference.' Check every shortcut it lists against this lesson or Microsoft's support pages before you rely on it, then keep the card at your workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are working with a patient record in the EHR and need to lock your computer right away because you are stepping away from the desk. What is the fastest way?",
            options: [
              "Ctrl+Alt+Delete, then select Lock",
              "Windows logo key+L",
              "Alt+Tab to switch away from the patient record",
              "Ctrl+W to close the window",
            ],
            correctIndex: 1,
            explanation: "Windows logo key+L locks the computer in one step. Ctrl+Alt+Delete and then Lock also works, but it takes extra steps. Alt+Tab and Ctrl+W leave the computer unlocked.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a timed shortcut drill to build keyboard shortcut muscle memory.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open a new Word document and complete these tasks using ONLY keyboard shortcuts (no mouse): type a paragraph of text, select all (Ctrl+A), copy it (Ctrl+C), open a new document (Ctrl+N), paste (Ctrl+V), undo (Ctrl+Z), and save (Ctrl+S). Record how long this takes.",
          "Open four programs (Word, Outlook, a browser, and File Explorer). Switch between all four using only Alt+Tab 20 times without touching the mouse. Time yourself.",
          "In a Word paragraph of at least four sentences, use only the keyboard to delete the third sentence: move to the start of the sentence with Ctrl+Right Arrow (or Ctrl+Left Arrow), select it with Ctrl+Shift+Right Arrow, and press Delete. No mouse.",
          "Create a personal Keyboard Shortcut Reference Card in Word listing the shortcuts from this lesson. Format it to fit on half a page. Save it as 'KeyboardShortcuts_Reference_[YourName].docx' and save a PDF copy (File > Save a Copy, then choose PDF as the file type) to keep at your workstation.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Keyboard Shortcut Reference Card PDF and your two timing notes to your instructor or course folder. Then use at least five shortcuts from this lesson every time you work at a computer, and notice which ones become automatic and which need more practice.",
      },
    ],
  },

  {
    slug: "data-entry-accuracy",
    title: "Data Entry Best Practices",
    description:
      "Master the accuracy, consistency, and verification habits that make data entry in a medical office reliable and error-free.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/mnUsaQ5px7M",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A billing staff member at Lakeside Medical Associates submitted an insurance claim for patient John R. Martin, but the date of birth in his registration read January 12 instead of January 21. The insurance company denied the claim because the date did not match its records. The billing team had to find the mistake, correct the registration, and send a corrected claim, and the payment was delayed for weeks. The error took seconds to make and hours to fix. This lesson teaches the habits that stop errors like this before they are saved.",
          },
        ],
      },
      {
        heading: "Accuracy First: The Medical Office Standard",
        blocks: [
          {
            type: "paragraph",
            text: "In casual typing, a small error rate is acceptable. In a medical office, accurate data is a clinical and financial requirement, because errors in patient records, billing, and scheduling have real consequences:",
          },
          {
            type: "list",
            items: [
              "Double-check every number. Numbers are the most error-prone data in manual entry because transpositions (12 instead of 21) are easy to make and hard to spot. Read each number back against the source document before you move to the next field. It takes three seconds and can save hours.",
              "Verify the spelling of names. A patient named 'Gonzalez' entered as 'Gonzales' will not match the insurance company's records, and the claim can be rejected. Confirm the spelling of patient, provider, and medication names against the official source: the insurance card, the photo ID, or the prescription.",
              "Copy and paste long codes when you can. Insurance member IDs and authorization numbers are often long strings of letters and digits. (A provider's NPI, the National Provider Identifier, is always 10 digits.) If the code is available digitally, copying it removes the chance of a typing error.",
              "Enter data once and reuse it. If the same insurance ID must appear in three fields, enter it once and copy it to the others instead of retyping it three times. Data entered once stays consistent.",
            ],
          },
        ],
      },
      {
        heading: "Data Entry Workflow",
        blocks: [
          {
            type: "paragraph",
            text: "A structured workflow prevents the most common errors: rushing, skipping verification, and losing your place in a long form.",
          },
          {
            type: "list",
            items: [
              "Gather all source documents before you start. For a new patient registration, that means the photo ID, the insurance card, and the completed intake form. Starting with missing information leads to guessing, interruptions, and half-filled forms.",
              "Work left to right and top to bottom through every form. EHR and billing screens are designed to be completed in order, and jumping around makes it easy to skip a required field. If you cannot fill a field yet, flag it clearly and come back to it.",
              "Read it back. After entering critical data (patient ID, date of birth, procedure code, medication), stop and read every field back against the source document before you save. This one habit catches most data entry errors.",
              "Use the Tab key. In most forms and EHR systems, Tab moves to the next field and Shift+Tab moves back. Tab-driven entry is faster than clicking and keeps your hands in typing position.",
            ],
          },
          {
            type: "link",
            href: "/typing-lab/drills/data-entry",
            label: "Practice it: Typing Lab, patient registration data entry",
            description: "Copy five fictional patients from an intake form and insurance card into a registration screen, with a read-back check on every record.",
          },
        ],
      },
      {
        heading: "Error Correction Protocols",
        blocks: [
          {
            type: "paragraph",
            text: "When you find an error, whether you just made it or found it in an older entry, correcting it the right way matters as much as preventing it:",
          },
          {
            type: "list",
            items: [
              "In the EHR, follow your office's correction process. The history of changes is part of the medical record, so clinical systems usually do not let you simply overwrite patient data. The typical process adds a correction, marks the original entry as corrected, and records who made the change and when.",
              "For billing, a corrected claim replaces the original claim; it is not a second claim. Check with your billing supervisor before sending one so it is processed correctly and does not create a duplicate charge.",
              "Report corrections you discover. If you find an error someone else made, do not fix it silently. Tell your supervisor what was wrong and what you changed. This creates an audit trail and can reveal a training need or a system problem.",
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
            text: "Accurate data entry in a medical office is a patient safety issue, not just an efficiency issue. A wrong medication dose, a missing allergy, or a transposed date of birth can harm a patient and create liability for the practice. If you are not sure an entry is correct, do not guess and move on. Stop, verify, and ask your supervisor. An incomplete record that you flag for follow-up is far better than a complete record with a wrong value.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask an AI assistant such as Microsoft Copilot or ChatGPT: 'Create a data entry quality checklist for a medical office front desk assistant. Include separate sections for patient registration, insurance information, appointment scheduling, and billing codes, with 3 to 5 specific verification steps in each.' Edit the checklist to match what you learned in this lesson and keep it at your workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You just entered a patient's 12-digit insurance member ID into the EHR. What should you do next?",
            options: [
              "Move to the next field immediately to save time",
              "Ask the patient to read the ID aloud again",
              "Read the entered ID back against the insurance card before moving to the next field",
              "Copy the ID to your clipboard for later use",
            ],
            correctIndex: 2,
            explanation: "Reading the entry back against the source catches transposed or missed digits before the record is saved, which is when an error is cheapest to fix.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a data entry accuracy drill using the verification habits from this lesson.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the Typing Lab's patient registration data entry drill. Enter all five records from the intake form and insurance card, using Tab to move between fields. Read every field back, then check each record.",
          "Look at the fields marked ✗ on your first check. For each one, write one sentence about what caused it (a swapped digit, a capital letter, a skipped field, a misread name).",
          "Enter your name on the results screen and print or save the results page.",
          "Write a 3-step Data Entry Verification Protocol for Lakeside Medical Associates (one sentence per step) and save it as 'DataEntry_Protocol.docx'.",
        ],
      },
      {
        type: "link",
        href: "/typing-lab/drills/data-entry",
        label: "Open the Typing Lab: patient registration data entry",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Typing Lab data entry results page, your error notes, and your 3-step verification protocol to your instructor or course folder. The results page shows your first-check accuracy on a realistic registration task, and the protocol shows that you know how to prevent those errors.",
      },
    ],
  },

  {
    slug: "typing-speed-practice",
    title: "Speed and Accuracy: Building Your Typing Skills",
    description:
      "Learn how typing speed is measured, then use structured practice to raise your speed while keeping the accuracy a medical office requires.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/mzX2ClRSLTY",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates tracks how long each patient registration takes. When the office manager compared the front desk staff, the quickest registrations did not come from the people who typed in fast bursts and then went back to fix mistakes. They came from steady typists who rarely needed a correction. This lesson shows you how employers measure typing, and how to practice so that your speed and your accuracy both go up.",
          },
        ],
      },
      {
        heading: "How Typing Speed Is Measured",
        blocks: [
          {
            type: "paragraph",
            text: "Typing speed is reported in words per minute (WPM). Because words have different lengths, a typing test counts every 5 characters as one word, including letters, numbers, spaces, and punctuation. A test gives you three numbers:",
          },
          {
            type: "table",
            columns: ["Measure", "How it is figured", "Example: 2-minute test, 300 characters, 4 errors left"],
            rows: [
              ["Gross WPM", "(characters typed ÷ 5) ÷ minutes", "(300 ÷ 5) ÷ 2 = 30"],
              ["Net WPM", "Gross WPM − (uncorrected errors ÷ minutes)", "30 − (4 ÷ 2) = 28"],
              ["Accuracy", "correct characters ÷ characters typed × 100", "296 ÷ 300 × 100 = 98.7%"],
            ],
            caption: "Mistakes you fix with Backspace cost you time (which lowers both WPM numbers) but are not subtracted again.",
          },
          {
            type: "list",
            items: [
              "Net WPM is the number employers ask for. When a job application or an employment typing test asks for your typing speed, give your net WPM and your accuracy. Net WPM already takes off the errors you left behind, so it measures usable work.",
              "Requirements vary by employer. For example, U.S. federal job postings for office and clerical jobs often define a qualified typist as someone who can type 40 words per minute on a 5-minute sample with three or fewer errors. Private employers set their own requirements, so read each job posting.",
              "Accuracy matters more than raw speed. 60 WPM is about 300 keystrokes a minute; at 90% accuracy, that is about 30 wrong characters every minute to find and fix. At 45 WPM with 99% accuracy, it is about 2. In a patient record, the slower, accurate typist produces far better work.",
            ],
          },
          {
            type: "link",
            href: "/typing-lab/tests",
            label: "Take a timed test in the Typing Lab",
            description: "1, 2, 3, or 5 minutes, with medical office, front desk, customer service, and email passages. The results screen shows the math.",
          },
        ],
      },
      {
        heading: "Deliberate Practice Techniques",
        blocks: [
          {
            type: "paragraph",
            text: "Not all practice is equally effective. Deliberate practice, which targets specific weaknesses and gives immediate feedback, produces faster improvement than simply typing more:",
          },
          {
            type: "list",
            items: [
              "Find your weakest keys and drill them. The Typing Lab's test results list your problem keys and link to the key lesson for each one. Often these are reach keys far from the home row, such as the number row and the keys your pinkies reach. Spend the first few minutes of a session on them before moving to full passages.",
              "Practice with real office content. Typing real workplace text (patient names, appointment confirmations, insurance terms, and phrases like 'insurance verification required') makes your improvement show up directly at work. Every Typing Lab passage and drill is written from a medical office.",
              "Alternate speed and accuracy. Try a short burst at your top speed to push your ceiling (the Typing Lab's pace car race is good for this), then a longer session slightly slower with the goal of zero errors. The burst stretches your speed; the slower session locks in accuracy.",
              "Track progress over many tests. Take a timed test at about the same time of day a few times a week. Progress is not a straight line, and some days will be flat or lower. The trend across many tests, which the Typing Lab's My Progress page charts for you, is the true measure.",
            ],
          },
        ],
      },
      {
        heading: "Typing Medical Terminology",
        blocks: [
          {
            type: "paragraph",
            text: "Medical terminology brings its own typing challenges: long compound words, terms built from Greek and Latin parts, and abbreviations that must be exactly right.",
          },
          {
            type: "list",
            items: [
              "Common medical terms to practice: hypertension, hyperlipidemia, gastroesophageal, myocardial infarction, electrocardiogram, pharmaceutical, immunization, ophthalmology, otolaryngology, endocrinology, orthopedic, neurological, cardiovascular, and gastrointestinal. These words appear constantly in notes, billing descriptions, and referral letters.",
              "Some abbreviations are too easy to misread. The Joint Commission, which accredits hospitals, keeps an official 'Do Not Use' list of abbreviations that have caused errors. For example, 'q.d.' (daily) has been mistaken for 'q.i.d.' (four times a day), so the list says to write 'daily' instead. Use only the abbreviations your office has approved, and read abbreviations back the way you read back numbers.",
              "Let Word's AutoCorrect type long names for you. In Word for Microsoft 365, AutoCorrect can expand a short code into a full phrase, such as 'lma' into 'Lakeside Medical Associates'. Select File > Options > Proofing > AutoCorrect Options, type the code in the Replace box and the full text in the With box, then select Add. Choose codes that are not real words, so they never expand by accident.",
            ],
          },
          {
            type: "link",
            href: "/typing-lab/drills/medical-terms",
            label: "Practice these terms: Typing Lab, medical terms drill",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "Practice only with fictional data. The Typing Lab uses made-up patients and numbers and does not send what you type anywhere. Never type or paste real patient names, ID numbers, or any other protected health information (PHI) into a practice website, a typing game, or any app your employer has not approved. Putting real PHI into an unapproved site is a privacy breach, whether or not the site saves it.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask an AI assistant such as Microsoft Copilot or ChatGPT: 'Generate 20 realistic but fully fictional patient registration entries for typing practice. Each entry should include a first name, last name, date of birth, street address, phone number using the 555-01XX range, a made-up insurance company name, and a member ID. Make everything clearly fictional.' Type the list into a Word table using Tab to move between cells, then read each row back.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A medical office assistant types at 55 WPM but makes errors on 8% of keystrokes. Another types at 40 WPM with 99% accuracy. For patient registration data entry, which performance profile is preferable?",
            options: [
              "55 WPM, because speed is the priority in a busy front office",
              "40 WPM with 99% accuracy, because accuracy is critical for patient data and 40 WPM keeps up with most front desk work",
              "Both are equally acceptable for clinical data entry",
              "Neither, because both should reach 70 WPM before working with patient data",
            ],
            correctIndex: 1,
            explanation: "At 55 WPM with 8% errors, the first typist leaves about 22 wrong characters a minute to find and fix. The accurate typist produces records that can be trusted the first time.",
          },
          {
            type: "knowledge-check",
            question: "On a 2-minute typing test you type 300 characters and leave 4 errors uncorrected. What is your net WPM?",
            options: ["30", "28", "26", "32"],
            correctIndex: 1,
            explanation: "Gross WPM = (300 ÷ 5) ÷ 2 = 30. Net WPM = 30 − (4 errors ÷ 2 minutes) = 28.",
            optionRationales: [
              "30 is the gross WPM. Net WPM subtracts the uncorrected errors per minute.",
              "Correct: 30 gross WPM minus 2 errors per minute.",
              "This subtracts all 4 errors without dividing by the 2 minutes.",
              "Errors lower your speed; they are never added.",
            ],
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete your module typing assessment and create a 30-day practice plan.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Take a 3-minute timed test in the Typing Lab. Enter your name and print or save the results page. (For extra practice, also try a 5-minute test, the length federal job postings use.)",
          "In the Typing Lab's medical terms drill, type all 14 terms three times each. Print or save the results page, which shows your time and the terms where you made errors.",
          "Configure three AutoCorrect entries in Word for phrases you will type often (for example, 'lma' for 'Lakeside Medical Associates'). Take a screenshot of the AutoCorrect dialog box showing your entries.",
          "Write a personal 30-Day Typing Practice Plan: your daily practice time, which Typing Lab lessons, tests, and drills you will use, and your weekly net WPM and accuracy goals. Save it as 'MyTypingPracticePlan.docx'.",
        ],
      },
      {
        type: "link",
        href: "/typing-lab/tests?minutes=3",
        label: "Open the Typing Lab: 3-minute timed test",
      },
      {
        type: "link",
        href: "/typing-lab/drills/medical-terms",
        label: "Open the Typing Lab: medical terms drill",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Typing Lab timed test results page, your medical terms results page, your AutoCorrect screenshot, and your 30-Day Practice Plan to your instructor or course folder. As you follow the plan, retake a timed test and compare it with this one; the Typing Lab's My Progress page charts every test you take on the same browser.",
      },
    ],
  },
];
