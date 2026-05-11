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
              "RAM (Random Access Memory) is the computer's short-term working memory — it holds the data and programs that are currently in use. More RAM means you can have more programs and browser tabs open at once without the computer slowing down. Office workstations typically need 8 GB of RAM at minimum; 16 GB is comfortable for running multiple applications including EHR software, email, and productivity tools at the same time.",
              "Storage is where your files, programs, and operating system live permanently — even when the computer is off. There are two main types: HDDs (Hard Disk Drives) which are older and slower but less expensive, and SSDs (Solid State Drives) which are significantly faster, more durable, and now the standard in modern workstations. If your computer takes more than 60 seconds to start up, it likely has an HDD. SSDs start Windows in under 15 seconds.",
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
              "Monitors typically connect via HDMI or DisplayPort cables — both carry both video and audio signals. If you need to connect two monitors to one computer (common in busy office environments), you will need either two video ports on the computer or a docking station. Dual monitors significantly increase productivity for staff who work across multiple applications simultaneously.",
            ],
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
              "Task Manager (press Ctrl+Shift+Esc) shows you exactly what is using your CPU, RAM, and disk space in real time — this is the single most useful diagnostic tool for performance problems. If one program is consuming 90% of CPU or RAM, that program is causing your slowdown. You can end unresponsive processes in Task Manager by right-clicking them and selecting 'End Task.'",
              "Regular maintenance keeps computers running well — this includes running Windows Update monthly, removing programs you no longer use (via Settings > Apps), and emptying the Recycle Bin when it accumulates deleted files. At a healthcare office, IT typically manages scheduled maintenance, but understanding what good maintenance looks like helps you recognize when a machine has been neglected.",
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
        text: "Complete this hands-on exploration to build familiarity with your own computer's specifications and performance tools.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Task Manager (Ctrl+Shift+Esc) and navigate to the Performance tab. Record your CPU name, total RAM, and the type of disk (SSD or HDD — it will say 'Disk 0: SSD' or similar). Screenshot or write down these values.",
          "Open Settings > System > About and record your Windows version, RAM, and processor. Compare this to what you found in Task Manager — they should match.",
          "With Task Manager open, open three programs simultaneously (e.g., Word, a web browser, and Notepad). Watch the CPU and RAM columns in the Processes tab. Which program uses the most RAM? Type a one-sentence observation.",
          "Look at your physical workstation and identify: how many USB ports it has, what kind of monitor connection is being used (HDMI, DisplayPort, or VGA), and whether it has an SSD or HDD. Write a two-sentence summary of your workstation's setup.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your written workstation summary to your instructor or course folder. It should include your computer's CPU, RAM, storage type, number of USB ports, and monitor connection type. This exercise confirms you can independently gather hardware information — a skill you will use every time you need to describe a technical problem to IT support.",
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
              "The Start menu (click the Windows icon in the bottom-left corner, or press the Windows key) is the central launcher for all programs on your computer. You can click any pinned app tile to open it immediately, or type the name of any program in the search bar at the top to find it instantly. Knowing that you can type to search is the most important shortcut in the Start menu — it is faster than scrolling through an alphabetical list.",
              "Pinning programs to the Start menu or taskbar is the most efficient way to access frequently used applications — right-click any app in the Start menu and choose 'Pin to Start' or 'Pin to taskbar.' At Lakeside Medical Associates, you should pin at minimum: your EHR software, Outlook, Word, and File Explorer. This saves you from searching for them dozens of times per day.",
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
              "Snap layouts allow you to arrange two or more windows side by side on your screen — drag a window to the left edge of the screen to snap it to the left half, or drag to the right edge to snap right. Windows 11 adds Snap Layouts (hover over the maximize button) for preset grid arrangements. Side-by-side layouts are essential when you need to reference one document while typing in another.",
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
              "The left panel (Navigation Pane) shows your computer's folder structure — Quick Access at the top shows your most-used folders, followed by OneDrive, This PC (your local drives), and any mapped network drives. At Lakeside Medical Associates, the shared network drive for patient documents appears here as a mapped drive with a drive letter (like Z: or P:).",
              "The right panel shows the contents of whatever folder is selected in the left panel — files and subfolders appear here. You can change the view (icons, list, or details) using the View menu. The Details view (showing file name, date modified, type, and size in columns) is the most useful view for office file management because it shows the information you need to identify the right file quickly.",
              "The address bar at the top of File Explorer shows your current location in the folder hierarchy — for example: 'This PC > Documents > Patient Files > 2025.' You can click any segment of the address bar to jump directly to that folder, or type a new path and press Enter to navigate there directly.",
              "Back and Forward buttons (left arrows at the top) work just like a web browser — press Back to return to the previous folder you were viewing. This is useful when you navigate deep into a folder structure and need to return without clicking through the left panel again.",
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
        type: "list",
        ordered: true,
        items: [
          "Open at least four programs simultaneously (Outlook, Word, a web browser, and File Explorer). Practice switching between them using Alt+Tab five times. Then snap two windows side-by-side and note how your workspace changes.",
          "Search for 'Printer settings' using the Windows search bar (Windows key + S). Open it, confirm your default printer, then close. This simulates a common task you will perform when troubleshooting print jobs.",
          "In File Explorer, navigate to your Documents folder and create a new folder called 'Lakeside Medical – Practice Files.' Take a screenshot showing the folder in File Explorer.",
          "Pin three programs you use frequently to your taskbar (if not already pinned). Right-click the taskbar button for each and confirm 'Pin to taskbar' is checked. This completes your personalized workstation setup.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your screenshot of the 'Lakeside Medical – Practice Files' folder in File Explorer to your instructor or course folder. Include a short written note (2–3 sentences) describing one keyboard shortcut you practiced and how it will change how you work. This exercise confirms you can navigate Windows confidently without relying entirely on the mouse.",
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
              "Uninstalling software is done through Settings > Apps (Windows 10/11) — scroll through the list of installed apps, click the program you want to remove, and click Uninstall. Do not simply delete the program's shortcut from your desktop — that only removes the shortcut, not the program itself. Proper uninstallation removes all associated files and registry entries.",
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
              "Windows Update (Settings > Update & Security > Windows Update) downloads and installs security patches, feature updates, and driver updates for Windows itself. In a managed office environment, IT usually controls when Windows Updates are installed to minimize disruption. If you see a pending update notification, check with your supervisor before restarting, because a restart might interrupt a long-running clinical process.",
              "Application updates should be installed promptly when they include security fixes — Microsoft Office updates through Settings > Update & Security > Windows Update as well. Browser updates (Chrome, Edge, Firefox) typically install automatically in the background and apply on the next launch. When you see 'Update available — relaunch to apply,' do so when you have a natural break in your work.",
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
              "Use Task Manager to force-close frozen programs safely — press Ctrl+Shift+Esc, find the frozen program in the Processes list (it will say 'Not Responding' in the Status column), right-click it, and select 'End Task.' The program closes immediately. Any unsaved work in that program will be lost, but the rest of your programs remain open and unaffected.",
              "Check for auto-recovered files after a crash — Word, Excel, and PowerPoint automatically save recovery versions of open documents every few minutes. When you reopen the program after a crash, a Document Recovery panel appears on the left offering to restore your most recent auto-saved version. Always accept this recovery version and immediately save it properly before continuing.",
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
        text: "Complete the following exercises to practice managing programs on your workstation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings > Apps and scroll through the list of installed programs. Identify any program you do not recognize or do not use. Write down its name and look it up to confirm what it does. (Do not uninstall anything without supervisor approval.)",
          "Open Task Manager (Ctrl+Shift+Esc) and go to the Startup tab. This shows programs that launch automatically when Windows starts. Note which programs are enabled. Discuss with your supervisor whether any should be disabled to speed up startup.",
          "Check for pending Windows Updates: Settings > Update & Security > Windows Update. Note whether any updates are waiting to be installed. Write a one-sentence summary of the status and report it to your supervisor.",
          "Open a Word document and save it. Then, without closing Word, open Task Manager and find Word in the Processes list. Note its current RAM usage. This gives you a baseline for what a healthy running program looks like in Task Manager.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a short written report (one paragraph) to your instructor covering: one unknown program you found and identified, your Windows Update status, and Word's RAM usage from Task Manager. This exercise demonstrates that you can use built-in Windows tools to assess and document your workstation's health — a real skill IT support staff will appreciate.",
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
              "System settings control the most commonly needed options — Display (screen brightness, resolution, scale), Sound (volume levels, output and input devices), Notifications & Actions (which apps can send alerts), Power & Sleep (when the screen turns off and when the computer sleeps), and About (your computer's name, specifications, and Windows version). These are the settings you will visit most often as an office professional.",
              "Display settings are critical for comfortable extended work sessions — access them via Settings > System > Display. Adjust Brightness for your lighting environment (higher in bright rooms, lower in dim ones to reduce eye strain). Scale & Layout controls how large text and icons appear — set it to 125% or 150% if text looks too small on a high-resolution monitor. The screen Resolution setting should match your monitor's native resolution (usually 1920×1080) for the sharpest image.",
              "Sound settings control which device plays audio and captures your voice — Settings > System > Sound. In the Output section, select the correct speaker or headset. In the Input section, select your microphone. During a video call, if your voice cannot be heard, this is where the fix almost always lives. The 'Troubleshoot' link at the bottom of the Sound settings page runs an automatic diagnostic that resolves most audio issues.",
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
            text: "Windows Accessibility settings (Settings > Ease of Access in Windows 10, or Settings > Accessibility in Windows 11) exist to make computers usable for people with a wide range of needs. Even without a disability, some of these settings improve comfort during long shifts:",
          },
          {
            type: "list",
            items: [
              "Text size can be increased independently of the full display scale — in Accessibility > Text Size, you can make all text larger without changing icon sizes or screen resolution. This is helpful for staff who find the default font size hard to read without needing a full display scale increase.",
              "Magnifier is a built-in tool that zooms in on any part of the screen — press Windows key + Plus (+) to activate it and Windows key + Esc to close it. Useful for reading small-print sections of PDFs or zooming into a chart in the EHR system without changing any permanent settings.",
              "High Contrast mode makes text and interface elements much easier to distinguish for users with low vision — it can be turned on quickly with Left Alt + Left Shift + Print Screen. If you accidentally activate it, press the same combination to turn it off. In a medical office, accidentally activating High Contrast can confuse staff who do not know how to reverse it — worth knowing about.",
              "Mouse settings in Accessibility > Mouse let you increase the cursor size and change its color to make it easier to track on large monitors — especially useful for staff working on high-resolution displays where the default cursor can be difficult to locate quickly.",
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
              "Feature updates (major Windows version updates released once or twice a year) install the latest version of Windows 10 or 11. These take longer to install than security patches and may require a restart. In a managed IT environment, IT usually tests and schedules feature updates — do not install them independently if your office has an IT policy, as they can temporarily disrupt workflow.",
              "To check for and install updates: Settings > Update & Security > Windows Update > Check for updates. If updates are found, click Download and Install. When updates require a restart, choose 'Schedule the restart' to pick a time outside clinic hours — never force a restart mid-shift without completing and saving your current work.",
              "Automatic updates should be enabled — Settings > Update & Security > Windows Update > Advanced options > ensure 'Receive updates for other Microsoft products' is checked and automatic updates are not paused beyond a few weeks. If automatic updates are disabled on your workstation, ask your IT department why, as this may indicate an intentional policy.",
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
            text: "Some settings in Windows — particularly in the Control Panel, Group Policy, and registry — can break important functionality if changed incorrectly and should only be modified by IT staff. If you access Settings and see an option that is grayed out or says 'Your organization manages this setting,' that means IT has locked it intentionally. Do not attempt to bypass these restrictions. Stick to the safe, user-level settings covered in this lesson: display, sound, accessibility, and Windows Update from the standard Settings app.",
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
        text: "Personalize and optimize your workstation settings using the Windows Settings app. Document each change you make.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open Settings > System > Display and adjust your Scale & Layout to the most comfortable setting for your monitor. If you are using 100% and text looks small, try 125%. Record what you changed and why.",
          "Open Settings > System > Sound and verify that the correct output device (speakers or headset) and input device (microphone) are selected. If you are unsure, test them using the 'Test your microphone' feature on the Input page. Record what devices are configured.",
          "Open Settings > Ease of Access (or Accessibility) and increase the text size by one step. Note whether this improves readability for you, then adjust to your preferred setting.",
          "Open Settings > Update & Security > Windows Update and check for updates. Record whether any updates are available and their type (Security, Feature, or Driver). If updates are available, follow your supervisor's guidance on when to install them.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit a written summary (3–5 sentences) to your instructor describing the display, sound, accessibility, and update status of your workstation after completing this exercise. Include what you changed and why. This exercise confirms you can configure your own workstation for comfort and security without IT assistance for routine settings.",
      },
    ],
  },
];
