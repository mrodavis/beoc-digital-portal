import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "hardware-basics",
    title: "Hardware Basics: Understanding Your Computer",
    description:
      "Learn the key components inside and outside a computer — CPU, RAM, storage, and peripherals — so you can speak confidently about the technology you use every day.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "It is your first morning at Lakeside Medical Associates and your supervisor asks you to move a patient file from the slow old computer at the front desk to the new workstation. The IT vendor is on the phone asking whether the old machine has an SSD or HDD and how much RAM it has. You need to be able to answer those questions, check the settings, and get the job done. This lesson gives you the foundational vocabulary and knowledge to do exactly that.",
          },
        ],
      },
      {
        heading: "The Main Components of a Computer",
        blocks: [
          {
            type: "paragraph",
            text: "Every computer — whether a desktop tower, laptop, or all-in-one — is built from the same core components. Understanding what each one does helps you use your computer more effectively and communicate with IT staff or vendors when something goes wrong.",
          },
          {
            type: "list",
            items: [
              "The CPU (Central Processing Unit) is the brain of the computer — it executes every instruction, calculation, and operation the computer performs. A faster CPU means programs open more quickly, files save faster, and the computer handles multiple tasks without slowing down. At Lakeside Medical Associates, a computer with a modern multi-core CPU can run the electronic health records system, Outlook, and Word simultaneously without freezing.",
              "RAM (Random Access Memory) is the computer's short-term working memory — it holds the data and programs that are currently in use. More RAM means you can have more programs and browser tabs open at once without the computer slowing down. Windows 11 requires at least 4 GB of RAM, but an office workstation that runs EHR software, email, and productivity tools at the same time works better with 8 GB, and 16 GB is comfortable.",
              "Storage is where your files, programs, and operating system live permanently — even when the computer is off. There are two main types: HDDs (Hard Disk Drives) which are older and slower but less expensive, and SSDs (Solid State Drives) which are significantly faster, more durable, and now the standard in modern workstations. To find out which kind your computer has, open Task Manager › Performance › Disk 0 (C:): the drive type (SSD or HDD) appears under its name.",
              "The motherboard is the main circuit board that connects all components — CPU, RAM, storage, and expansion cards all plug into the motherboard. You will rarely interact with the motherboard directly, but understanding it exists helps you understand why upgrading one component sometimes requires upgrading others.",
              "The power supply converts electricity from the wall outlet into the voltages needed by the computer's components. Desktops have a visible power supply unit (PSU); laptops have an external power adapter (brick) that does the same job. A failing power supply can cause random shutdowns and restarts — a useful thing to know when troubleshooting.",
            ],
          },
        ],
      },
      {
        heading: "Input, Output, and Peripheral Devices",
        blocks: [
          {
            type: "paragraph",
            text: "Peripheral devices are everything connected to the main computer unit — they fall into two categories: input devices (sending information to the computer) and output devices (receiving information from the computer). Office assistants work with peripherals constantly:",
          },
          {
            type: "list",
            items: [
              "Input devices send data into the computer — the keyboard types text and commands, the mouse controls the cursor and clicks, the scanner converts paper documents into digital files, and the webcam captures video for virtual meetings. At a medical office front desk, the keyboard and mouse are your primary input tools, followed by the document scanner for patient intake forms.",
              "Output devices send information from the computer to the user — the monitor displays everything visually, the printer produces physical documents, and speakers output audio for video calls and system sounds. Monitors come in different sizes and resolutions; a higher resolution (such as 1920x1080 Full HD) displays more detail and reduces eye strain during long work sessions.",
              "USB ports are the most common way to connect peripherals — keyboards, mice, printers, USB drives, and phone chargers all use USB connections. Modern computers may have USB-A ports (the standard rectangular type), USB-C ports (smaller, oval), or both. If a device is not being recognized, a different USB port on the same computer often resolves the issue.",
              "Monitors typically connect via HDMI or DisplayPort cables — both carry both video and audio signals. Older monitors may use VGA, a blue connector with screws that carries video only. If you need to connect two monitors to one computer (common in busy office environments), you will need either two video ports on the computer or a docking station. Dual monitors help staff who work across multiple applications at the same time.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Input or output?",
            prompt: "Sort each device by the direction its information travels.",
            buckets: [
              { id: "in", label: "Input (sends information into the computer)" },
              { id: "out", label: "Output (receives information from the computer)" },
            ],
            items: [
              { id: "kb", text: "Keyboard", bucket: "in" },
              { id: "mouse", text: "Mouse", bucket: "in" },
              { id: "scanner", text: "Document scanner", bucket: "in" },
              { id: "webcam", text: "Webcam", bucket: "in" },
              { id: "mic", text: "Microphone", bucket: "in" },
              { id: "monitor", text: "Monitor", bucket: "out" },
              { id: "printer", text: "Printer", bucket: "out" },
              { id: "speakers", text: "Speakers", bucket: "out" },
            ],
            explanation: "Input devices send data to the computer (typing, clicking, scanning, capturing video and sound). Output devices show or produce what the computer sends (the screen, printed pages, sound).",
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Know your ports",
            prompt: "Match each port or cable to its description. You will use this when you look at the back of your own workstation in the Challenge.",
            items: [
              { id: "usba", text: "USB-A", match: "Flat rectangular port for keyboards, mice, and USB drives" },
              { id: "usbc", text: "USB-C", match: "Small oval port that can carry data, power, and video" },
              { id: "hdmi", text: "HDMI", match: "Video and audio to a monitor or TV; wider at the top than the bottom" },
              { id: "dp", text: "DisplayPort", match: "Video and audio to a monitor; one corner is cut off" },
              { id: "vga", text: "VGA", match: "Older blue video-only connector held in with two screws" },
              { id: "eth", text: "Ethernet (RJ-45)", match: "Wired network cable with a clip, like a wide phone plug" },
            ],
            explanation: "HDMI and DisplayPort both carry video and audio; VGA carries video only. USB-C can do several jobs depending on the computer. Ethernet connects the computer to the office network with a cable.",
          },
        ],
      },
      {
        heading: "Understanding Computer Performance",
        blocks: [
          {
            type: "paragraph",
            text: "As an office professional, you do not need to be an IT expert — but understanding a few key performance concepts lets you recognize when something is wrong and describe the problem accurately to someone who can fix it:",
          },
          {
            type: "list",
            items: [
              "If your computer is running slowly, the most common causes are: not enough RAM for the programs you have open, too many programs starting automatically at login, a fragmented or nearly full HDD, malware consuming processing power, or simply needing a restart to clear temporary files. Restarting resolves surprisingly many performance issues and should always be the first step.",
              "Task Manager (press Ctrl+Shift+Esc) shows you exactly what is using your CPU, RAM, and disk space in real time — this is the single most useful diagnostic tool for performance problems. If one program is consuming 90% of CPU or RAM, that program is causing your slowdown. You can end an unresponsive app in Task Manager by right-clicking it on the Processes page and selecting End task.",
              "Regular maintenance keeps computers running well — this includes installing Windows updates (Settings > Windows Update), removing programs you no longer use (Settings > Apps > Installed apps), and emptying the Recycle Bin when it accumulates deleted files. At a healthcare office, IT typically manages scheduled maintenance, but understanding what good maintenance looks like helps you recognize when a machine has been neglected.",
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
            text: "Do not open a desktop computer case or attempt to install hardware unless you are specifically authorized to do so by IT. At Lakeside Medical Associates, unauthorized modifications to workstations can void warranties, create security vulnerabilities, and violate compliance requirements. If you believe hardware is failing, document the symptoms (what is happening, when it started, what changed recently) and report them to IT or your supervisor. Your role is to recognize and communicate hardware issues — not to repair them independently.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I work as an office assistant in a medical clinic. What are the 5 most important things I should know about my work computer to be able to describe problems accurately to IT support?' Review the response and identify which items you already know and which you need to learn about your specific workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Your computer is running very slowly when you have Outlook, the EHR system, and Word open at the same time. Which component is most likely the bottleneck?",
            options: [
              "The monitor — the resolution is too high",
              "The power supply — it cannot handle all three programs",
              "RAM — the computer does not have enough working memory for all open programs",
              "The USB ports — too many devices are connected",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete this hands-on exploration to build familiarity with a computer's specifications and performance tools.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do steps 1 to 3 in Windows 11. On a school computer, do steps 1 to 3 in the Challenge Lab below: it is a simulated Windows 11 computer, so nothing is blocked. Step 4 is a look at the hardware itself and works on any computer.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Task Manager (right-click the Start button › Task Manager, or press Ctrl+Shift+Esc) and select Performance. Record the CPU name, the total memory (RAM), and the drive type: select Disk 0 (C:) and look for SSD or HDD under its name.",
          "Open Settings › System › About and record the Windows version, installed RAM, and processor. Compare them with what you found in Task Manager; they should match.",
          "With Task Manager open, open three programs at the same time (for example Word, a web browser, and Notepad). On the Processes page, select the Memory column heading to sort by memory use. Which program uses the most? Write a one-sentence observation.",
          "Look at your physical workstation and identify how many USB ports it has and what kind of monitor connection is used (HDMI, DisplayPort, or VGA). Use the port matching activity in this lesson if you are not sure. Write a two-sentence summary of the workstation's setup.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results; it lists every task you completed) or, if you used your own computer, your notes or screenshots from steps 1 to 3. Add your two-sentence workstation summary from step 4, including the number of USB ports and the monitor connection type. Submit it to your instructor or course folder. This exercise confirms you can gather hardware information on your own, a skill you will use every time you describe a technical problem to IT support.",
      },
    ],
  },

  {
    slug: "navigating-windows",
    title: "Navigating Windows: The Desktop and Taskbar",
    description:
      "Get confident with the Windows desktop, Start menu, taskbar, and File Explorer — the everyday environment every office professional lives in.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A new front desk staff member at Lakeside Medical Associates has never used Windows before — they have only used phones and tablets. On their first day, they cannot find the EHR application, do not know how to switch between the patient record and their email, and accidentally close a document without saving it. Learning to navigate Windows fluently is not optional for office work — it is the foundation everything else is built on.",
          },
        ],
      },
      {
        heading: "The Windows Desktop and Start Menu",
        blocks: [
          {
            type: "paragraph",
            text: "The Windows desktop is your home base — the screen you see when you log in. Every element on the desktop has a specific purpose, and learning them makes navigating Windows feel natural rather than uncertain:",
          },
          {
            type: "list",
            items: [
              "The desktop is the main work surface — it can hold shortcuts (icons) to programs and files you access frequently. In an office setting, your desktop should be organized: keep only the icons you use daily (EHR system, Word, Outlook) and avoid cluttering it with dozens of unrelated shortcuts, which makes it harder to find what you need quickly.",
              "The Start menu (select the Start button, the Windows logo on the taskbar, or press the Windows key) is the central launcher for all programs on your computer. In Windows 11 the taskbar is centered by default, so Start sits at the left of the centered icons rather than in the screen's corner. You can click any pinned app to open it immediately, or type the name of any program in the search box at the top to find it instantly. Knowing that you can type to search is the most important shortcut in the Start menu — it is faster than scrolling through an alphabetical list.",
              "Pinning programs to the Start menu or taskbar is the most efficient way to access frequently used applications — search for the app (or find it in Start), right-click it, and choose Pin to Start or Pin to taskbar (in the All apps list, Pin to taskbar is under More). If the app is already open, right-click its taskbar button and select Pin to taskbar. To remove it later, right-click the pinned button and select Unpin from taskbar. At Lakeside Medical Associates, you should pin at minimum: your EHR software, Outlook, Word, and File Explorer. This saves you from searching for them dozens of times per day.",
              "The Search bar on the taskbar (or Windows key + S) searches your entire computer — installed programs, files, settings, and the web — simultaneously. If you cannot find something, search for it. Typing 'printer' opens printer settings. Typing 'sound' opens sound settings. This is faster than navigating through the Settings menu for most tasks.",
            ],
          },
        ],
      },
      {
        heading: "The Taskbar and Window Management",
        blocks: [
          {
            type: "paragraph",
            text: "The taskbar at the bottom of the screen is your real-time workspace manager — it shows what is currently open and lets you switch between programs without minimizing everything to find what you need:",
          },
          {
            type: "list",
            items: [
              "Every open program appears as a button on the taskbar — click it once to bring that window to the front, click it again to minimize it. When multiple windows of the same program are open (such as two Word documents), hovering over the taskbar button shows thumbnails of each window so you can choose the right one.",
              "Alt+Tab is the keyboard shortcut for switching between open windows — hold Alt and press Tab repeatedly to cycle through every open window. Release Alt to select the highlighted window. This is the fastest way to switch between programs during busy multi-tasking situations, such as copying data from an Excel spreadsheet into a patient record form.",
              "Snap layouts allow you to arrange two or more windows side by side on your screen — drag a window to the left edge of the screen to snap it to the left half, or drag to the right edge to snap right. Windows 11 adds snap layouts: hover over a window's maximize button or press Windows logo key + Z, then pick a spot in a preset grid. You can also press Windows logo key + Left or Right arrow to snap the window you are using. Side-by-side layouts are essential when you need to reference one document while typing in another.",
              "The system tray (bottom-right corner of the taskbar) shows background processes like antivirus, OneDrive sync status, volume, network connection, and the clock. A small icon here that you do not recognize is usually a program running in the background — right-click it to see options. The network icon tells you instantly whether you are connected to the office Wi-Fi or ethernet.",
            ],
          },
        ],
      },
      {
        heading: "File Explorer: Navigating Your Files",
        blocks: [
          {
            type: "paragraph",
            text: "File Explorer (the folder icon on the taskbar, or Windows key + E) is the tool you use to browse, open, copy, move, and organize files and folders on your computer and on network drives. Understanding its layout is essential:",
          },
          {
            type: "list",
            items: [
              "The left panel (Navigation pane) shows your computer's folder structure — Home is at the top (its Quick access section shows your pinned folders, such as Desktop, Documents, and Downloads), followed by OneDrive, This PC (your local drives), and any mapped network drives. At Lakeside Medical Associates, the shared network drive for patient documents appears here as a mapped drive with a drive letter (like Z: or P:).",
              "The right panel shows the contents of whatever folder is selected in the left panel — files and subfolders appear here. You can change the view (icons, list, or details) with View on the command bar at the top of the window. The Details view (showing file name, date modified, type, and size in columns) is the most useful view for office file management because it shows the information you need to identify the right file quickly.",
              "The address bar at the top of File Explorer shows your current location in the folder hierarchy — for example: 'This PC > Documents > Patient Files > 2025.' You can click any segment of the address bar to jump directly to that folder, or type a new path and press Enter to navigate there directly.",
              "Back and Forward buttons (left arrows at the top) work just like a web browser — press Back to return to the previous folder you were viewing. This is useful when you navigate deep into a folder structure and need to return without clicking through the left panel again.",
            ],
          },
          {
            type: "drag-drop",
            mode: "match",
            title: "Windows 11 shortcuts",
            prompt: "Match each keyboard shortcut to what it does.",
            items: [
              { id: "alttab", text: "Alt+Tab", match: "Switch between open windows" },
              { id: "wine", text: "Windows logo key + E", match: "Open File Explorer" },
              { id: "wini", text: "Windows logo key + I", match: "Open Settings" },
              { id: "wins", text: "Windows logo key + S", match: "Open search" },
              { id: "winz", text: "Windows logo key + Z", match: "Open the snap layouts" },
              { id: "winx", text: "Windows logo key + X", match: "Open the Quick Link menu" },
              { id: "tm", text: "Ctrl+Shift+Esc", match: "Open Task Manager" },
            ],
            explanation: "These shortcuts come from Microsoft's list of Windows keyboard shortcuts. Practice them in the Challenge Lab, where the keyboard button on the taskbar sends the Windows logo key shortcuts that your own computer keeps for itself.",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "At Lakeside Medical Associates, the network drive contains patient records protected by HIPAA. Browsing folders that contain patient data as a matter of curiosity — rather than for a specific work task — is a potential HIPAA violation even if you do not open any files. Access only the folders your role requires. If you accidentally navigate into a restricted folder, close it immediately and note the incident in case it needs to be reported. Your access to the network drive is logged, and IT can see which folders were opened and by whom.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'What are the 10 most useful Windows keyboard shortcuts for an office assistant who works with multiple programs open at the same time? List each shortcut and explain specifically when it is most useful.' Print or save the list and practice each shortcut while working through the challenge below.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to switch quickly from your email to a patient record in the EHR system without using the mouse. What is the fastest keyboard shortcut?",
            options: [
              "Ctrl+Tab — it cycles through open browser tabs",
              "Alt+Tab — it cycles through all open windows",
              "Windows key+D — it shows the desktop",
              "Ctrl+Alt+Delete — it opens the task switcher",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice navigating Windows with the following exercises. Each step builds a habit that will save you real time in an office setting.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do these steps in Windows 11. On a school computer, do them in the Challenge Lab below, a simulated Windows 11 computer where pinning apps and changing settings are not blocked.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open four programs at the same time (Outlook, Word, a web browser, and File Explorer). Switch between them with Alt+Tab until you have visited each window. Then snap two windows side by side (for example, File Explorer on the left and Word on the right) and note how your workspace changes.",
          "Use search on the taskbar (or Windows logo key + S) to find and open Printers & scanners. Open the printer marked Default to confirm which one it is, then close Settings. You will do this often when troubleshooting print jobs.",
          "In File Explorer, open your Documents folder and create a new folder named \"Lakeside Medical - Practice Files\".",
          "Pin three programs you use often to the taskbar (Notepad, Calculator, and Snipping Tool in the Challenge Lab). Right-click each pinned taskbar button and confirm that the menu now offers Unpin from taskbar.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or, if you used your own computer, a screenshot of the \"Lakeside Medical - Practice Files\" folder in File Explorer. Include a short written note (2 to 3 sentences) describing one keyboard shortcut you practiced and how it will change how you work. Submit it to your instructor or course folder.",
      },
    ],
  },

  {
    slug: "managing-programs",
    title: "Managing Programs and Applications",
    description:
      "Learn to install, uninstall, update, and switch between programs efficiently — keeping your workstation organized and running smoothly.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates has just subscribed to a new scheduling software. Your supervisor asks you to install it on your workstation, uninstall the old version first, and confirm the new version works before the end of the morning. An hour later, Word stops responding in the middle of an important document. You need to handle both situations calmly and competently — that is exactly what this lesson prepares you for.",
          },
        ],
      },
      {
        heading: "Installing and Uninstalling Programs",
        blocks: [
          {
            type: "paragraph",
            text: "In a professional office environment, you will occasionally need to install new software or remove software that is no longer needed. Understanding how to do this safely and correctly prevents problems:",
          },
          {
            type: "list",
            items: [
              "Installing software typically involves downloading an installer file (.exe or .msi) from the vendor's official website and running it. Double-click the downloaded file, follow the installation wizard's prompts (usually just clicking Next and then Install), and wait for completion. Always download software only from the vendor's official website or from a source your IT department has approved — downloading from unofficial sites is a major security risk.",
              "Uninstalling software is done through Settings > Apps > Installed apps — find the program you want to remove, select More (…) next to it, and select Uninstall. Do not simply delete the program's shortcut from your desktop — that only removes the shortcut, not the program itself. Proper uninstallation removes all associated files and registry entries.",
              "Running programs as Administrator is sometimes required for installation — if an installer prompts 'Do you want to allow this app to make changes to your device,' this is the User Account Control (UAC) dialog and clicking Yes is normal for legitimate software installers. If you are uncertain whether a prompt is legitimate, cancel and confirm with IT before proceeding.",
              "Some enterprise software — including EHR systems and billing software used in medical offices — may require your IT administrator to install it, because it needs elevated permissions. If an installation fails with a permissions error, stop and contact IT rather than attempting workarounds.",
            ],
          },
        ],
      },
      {
        heading: "Keeping Programs Updated",
        blocks: [
          {
            type: "paragraph",
            text: "Software updates are not optional extras — they include critical security patches that protect the clinic from cyberattacks. Here is how to manage updates responsibly in an office setting:",
          },
          {
            type: "list",
            items: [
              "Windows Update (Settings > Windows Update) downloads and installs security patches, feature updates, and driver updates for Windows itself. In a managed office environment, IT usually controls when Windows Updates are installed to minimize disruption. If you see a pending update notification, check with your supervisor before restarting, because a restart might interrupt a long-running clinical process.",
              "Application updates should be installed promptly when they include security fixes. Many apps, including Microsoft 365 apps and web browsers such as Edge and Chrome, download their updates in the background and finish installing when you close and reopen them. When an app asks you to restart it to finish updating, do so at a natural break in your work.",
              "Restart counts as maintenance — many updates do not fully apply until the computer is restarted. At Lakeside Medical Associates, restart your workstation at the start or end of each shift rather than leaving it on indefinitely. A computer that has not been restarted in weeks may have pending updates causing performance issues.",
            ],
          },
        ],
      },
      {
        heading: "Handling Frozen or Unresponsive Programs",
        blocks: [
          {
            type: "paragraph",
            text: "Every office worker eventually encounters a program that stops responding. Knowing the correct procedure prevents data loss and wasted time:",
          },
          {
            type: "list",
            items: [
              "Wait briefly before assuming a program is truly frozen — some operations (saving a large file, loading a complex document) take longer than expected and look like freezing. If the program shows 'Not Responding' in the title bar and has been that way for more than 60 seconds, it is safe to assume it is frozen.",
              "Use Task Manager to force-close frozen programs safely — press Ctrl+Shift+Esc, find the frozen program on the Processes page (its Status column says Not responding), right-click it, and select End task. The program closes immediately. Any unsaved work in that program will be lost, but the rest of your programs remain open and unaffected.",
              "Check for recovered files after a crash — Word, Excel, and PowerPoint save recovery information for open documents every few minutes. When you reopen the program after a crash, it offers the recovered version of your document. Open it and save it right away before continuing.",
              "If programs are freezing frequently, it is a sign of a deeper problem — low RAM, failing storage, overheating, or a software conflict. Note the frequency and which programs are involved, and report it to IT. Do not ignore chronic freezing because it typically gets worse over time.",
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
            text: "At Lakeside Medical Associates, you should only install software that has been approved by IT or your supervisor. Installing unauthorized software — even seemingly harmless utilities or browser extensions — can introduce malware, conflict with clinical software, or violate the practice's IT security policy. If you think a program would make your job easier, propose it to your supervisor or IT department rather than installing it on your own. The same applies to browser extensions: ask before adding them to a work computer.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'A program on my work computer keeps freezing every afternoon when I have multiple applications open. What are the most common causes of this, and what information should I gather before reporting it to IT support?' Use the response to build a simple troubleshooting checklist you can keep at your workstation.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Microsoft Word becomes unresponsive in the middle of an important patient letter. What is the correct first step?",
            options: [
              "Immediately press Ctrl+Alt+Delete and shut down the computer",
              "Wait up to 60 seconds to see if Word recovers, then use Task Manager to end the task if it does not",
              "Delete and reinstall Word immediately",
              "Unplug the computer to force it to restart",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete the following exercises to practice managing programs on a workstation.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do these steps in Windows 11. On a school computer, Settings and Task Manager are usually locked, so do the steps in the Challenge Lab below. It records your findings as you go.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings › Apps › Installed apps and scroll through the list. Identify a program you do not recognize (each app shows its publisher under its name). Write down its name and look up what it does. Do not uninstall anything without supervisor approval.",
          "Open Task Manager (right-click the Start button › Task Manager) and select Startup apps. This page lists programs that start automatically when you sign in. Note how many are Enabled. Discuss with your supervisor whether any should be disabled; do not disable them yourself.",
          "Check for updates: Settings › Windows Update › Check for updates. Note the status at the top of the page (for example, You're up to date or Updates available) and write a one-sentence summary for your supervisor.",
          "Open a Word document and save it. Then, without closing Word, open Task Manager's Processes page and find Word. Note its Memory value. This gives you a baseline for what a healthy running program looks like.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or, if you used your own computer, a short written report covering the unknown program you found, how many startup apps are enabled, your Windows Update status, and Word's memory use. Submit it to your instructor or course folder. This shows you can use built-in Windows tools to assess and document a workstation's health.",
      },
    ],
  },

  {
    slug: "system-settings",
    title: "System Settings and Keeping Windows Updated",
    description:
      "Navigate Windows Settings confidently — adjust display, sound, and accessibility options, and understand the update process that keeps your workstation secure.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A colleague at Lakeside Medical Associates is having trouble reading the small text on the clinic's billing software. Another staff member cannot hear the hold music when transferring patients. A third has a workstation that has not been updated in months. You know where to find display settings, sound settings, and Windows Update — and you help all three in under 10 minutes. That is the value of knowing your way around Windows Settings.",
          },
        ],
      },
      {
        heading: "Navigating Windows Settings",
        blocks: [
          {
            type: "paragraph",
            text: "The Settings app (Windows key + I) is the central control panel for personalizing and configuring your Windows computer. Understanding its layout saves significant time compared to searching menus:",
          },
          {
            type: "list",
            items: [
              "System settings control the most commonly needed options — Display (screen brightness, resolution, scale), Sound (volume levels, output and input devices), Notifications (which apps can send alerts, and Do not disturb), Power & battery (when the screen turns off and when the computer sleeps), and About (your computer's name, specifications, and Windows version). These are the settings you will visit most often as an office professional.",
              "Display settings are critical for comfortable extended work sessions — access them via Settings > System > Display. Adjust Brightness for your lighting environment (higher in bright rooms, lower in dim ones to reduce eye strain). Under Scale & layout, the Scale setting controls how large text, apps, and icons appear — set it to 125% or 150% if text looks too small on a high-resolution monitor. The screen Resolution setting should match your monitor's native resolution (usually 1920×1080) for the sharpest image.",
              "Sound settings control which device plays audio and captures your voice — Settings > System > Sound. Under Output, select the correct speaker or headset. Under Input, select your microphone; to test it, select > next to the microphone, then under Input settings select Start test, speak normally, and select Stop test. During a video call, if your voice cannot be heard, this is where the fix almost always lives. If sound still does not work, run the automated audio troubleshooter in the Get Help app.",
              "Personalization settings (Settings > Personalization) control the desktop background, theme colors, lock screen image, and Start menu layout. In an office environment, personal customization should be modest — use a professional desktop background (or the default), and keep the theme settings to the defaults unless your supervisor or IT has established a consistent look for all workstations.",
            ],
          },
        ],
      },
      {
        heading: "Accessibility Settings for a Comfortable Workstation",
        blocks: [
          {
            type: "paragraph",
            text: "Windows Accessibility settings (Settings > Accessibility) exist to make computers usable for people with a wide range of needs. Even without a disability, some of these settings improve comfort during long shifts:",
          },
          {
            type: "list",
            items: [
              "Text size can be increased independently of the full display scale — in Accessibility > Text size, drag the slider and select Apply to make text larger without changing icon sizes or screen resolution. This is helpful for staff who find the default font size hard to read without needing a full display scale increase.",
              "Magnifier is a built-in tool that zooms in on any part of the screen — press Windows key + Plus (+) to activate it and Windows key + Esc to close it. Useful for reading small-print sections of PDFs or zooming into a chart in the EHR system without changing any permanent settings.",
              "Contrast themes make text and interface elements much easier to distinguish for users with low vision — go to Accessibility > Contrast themes, choose a theme, and select Apply. To go back to the normal colors, choose None and select Apply. Knowing how to undo a contrast theme helps when a coworker turns one on by accident.",
              "Mouse pointer settings in Accessibility > Mouse pointer and touch let you increase the pointer size and change its color to make it easier to track on large monitors — especially useful for staff working on high-resolution displays where the default cursor can be difficult to locate quickly.",
            ],
          },
        ],
      },
      {
        heading: "Windows Update: What It Is and Why It Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Windows Update downloads and installs security patches, feature improvements, and hardware driver updates. In a medical office, keeping systems updated is not just good practice — it is a component of HIPAA security compliance:",
          },
          {
            type: "list",
            items: [
              "Security updates are released by Microsoft on the second Tuesday of every month (called Patch Tuesday) and address newly discovered vulnerabilities that attackers could exploit. A computer that is months or years behind on updates has known, documented vulnerabilities that hackers actively target. At Lakeside Medical Associates, unpatched computers are a liability to patient data security.",
              "Feature updates (new versions of Windows 11, typically released once per year) add new features. These take longer to install than security patches and may require a restart. In a managed IT environment, IT usually tests and schedules feature updates — do not install them independently if your office has an IT policy, as they can temporarily disrupt workflow.",
              "To check for and install updates: Settings > Windows Update > Check for updates. If updates are found, select Download & install. When updates require a restart, select Schedule the restart and pick a time outside clinic hours — never force a restart mid-shift without completing and saving your current work.",
              "Updates should not stay paused — on the Windows Update page, Pause updates stops updates for a set period, and when the pause limit is reached Windows makes you install the latest updates before you can pause again. If updates are paused or managed on your workstation, ask your IT department why; it may be an intentional policy.",
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
            text: "Some settings in Windows — particularly in the Control Panel, Group Policy, and registry — can break important functionality if changed incorrectly and should only be modified by IT staff. If you access Settings and see an option that is grayed out or says 'Your organization manages this setting,' that means IT has locked it intentionally. Do not attempt to bypass these restrictions. Stick to the safe, user-level settings covered in this lesson: display, sound, accessibility, and Windows Update in the Settings app.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'I work at a medical office and want to set up my Windows workstation ergonomically. What display, text size, and mouse settings should I adjust for comfortable 8-hour work days? Give me specific settings and where to find them in Windows 11.' Apply the recommendations to your own workstation and note which ones made the biggest difference.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Windows Update requires a restart to finish installing security patches. The clinic opens in 30 minutes. What should you do?",
            options: [
              "Click 'Restart Now' immediately so updates finish before patients arrive",
              "Use 'Schedule the restart' to set the restart for after clinic hours",
              "Cancel the update — security patches are optional",
              "Unplug the computer to prevent the restart",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Personalize and optimize workstation settings using the Windows Settings app. Document each change you make.",
      },
      {
        type: "callout",
        variant: "info",
        text: "On your own computer, do these steps in Windows 11 Settings. On a school computer, these settings are usually locked, so do the steps in the Challenge Lab below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings › System › Display and set Scale (under Scale & layout) to the most comfortable size for your monitor. If you are using 100% and text looks small, try 125%. Record what you changed and why.",
          "Open Settings › System › Sound and check that the correct output device (speakers or headset) and input device (microphone) are selected. Test the microphone: select > next to it, then under Input settings select Start test, speak, and select Stop test. Record which devices are set.",
          "Open Settings › Accessibility › Text size, increase the text size a little (for example, to 110%), and select Apply. Note whether this improves readability, then adjust to your preferred setting.",
          "Open Settings › Windows Update and select Check for updates. Record whether any updates are available and their type (for example, a security update or a driver). If updates are available, follow your supervisor's guidance: in the Challenge Lab, install them and use Schedule the restart to restart after clinic hours.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Challenge Lab results page (enter your name on the lab's finish screen and select Print or save results) or, if you used your own computer, your notes on each setting. Add a written summary (3 to 5 sentences) describing the display, sound, accessibility, and update status after this exercise, including what you changed and why. Submit it to your instructor or course folder.",
      },
    ],
  },
];
