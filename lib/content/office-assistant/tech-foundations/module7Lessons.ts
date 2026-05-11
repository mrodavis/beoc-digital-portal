import { Lesson } from "@/types/lesson";

export const module7Lessons: Lesson[] = [
  {
    slug: "cloud-storage-onedrive",
    title: "Understanding Cloud Storage: OneDrive and Beyond",
    description:
      "Learn what cloud storage is, how OneDrive integrates with your Windows workstation and Microsoft 365, and how to use it safely for professional file management.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates just migrated from a traditional file server to Microsoft 365 with OneDrive and SharePoint. Your supervisor explains that all documents should now be saved in OneDrive or the shared SharePoint library — not on the local C: drive. You need to understand what that means, how it works, and what changes in your day-to-day workflow.",
          },
        ],
      },
      {
        heading: "What Is Cloud Storage?",
        blocks: [
          {
            type: "paragraph",
            text: "Cloud storage saves your files on remote servers accessible via the internet — rather than on the physical hard drive of your local computer. For professionals, this means several important capabilities:",
          },
          {
            type: "list",
            items: [
              "Access from anywhere — files saved in OneDrive are accessible from any device with your Microsoft 365 account: your office workstation, a colleague's computer, or the OneDrive web portal at onedrive.com. This means you can access a document from home in an emergency, from another clinic location, or from a tablet in a meeting room.",
              "Automatic backup — files saved in OneDrive are automatically backed up to Microsoft's servers. If your workstation is stolen, fails, or is replaced, all your OneDrive files are immediately accessible on a new device after logging in. Unlike the local C: drive, OneDrive is not dependent on any single piece of hardware.",
              "Version history — OneDrive maintains a history of previous versions of every file for 30+ days. If you accidentally overwrite content or want to restore a file to how it looked last week, right-click the file in File Explorer or in the OneDrive web interface and select 'Version History.' This eliminates the need for manual 'save as v2' backup copies.",
              "Sync with File Explorer — the OneDrive app (built into Windows 10/11) creates a folder on your computer that looks and works like any other folder. Files saved to OneDrive appear in File Explorer under your user folders. They sync automatically to the cloud whenever you save, and any changes made on another device sync back to your computer when you are connected to the internet.",
            ],
          },
        ],
      },
      {
        heading: "OneDrive vs. SharePoint",
        blocks: [
          {
            type: "paragraph",
            text: "Both are cloud storage solutions included with Microsoft 365, but they serve different purposes in a professional setting:",
          },
          {
            type: "list",
            items: [
              "OneDrive is personal cloud storage — it is your individual file space, accessible only to you (unless you specifically share something). Use OneDrive for documents you are working on that belong to you: your draft emails, your personal notes, your in-progress reports. Think of it as your personal work desk drawer.",
              "SharePoint is organizational shared storage — it is shared with the whole team (or specific groups). Documents that all staff need access to — templates, policies, patient intake forms, billing records — live in SharePoint, not in anyone's personal OneDrive. SharePoint libraries appear in File Explorer as mapped locations when your IT department has set them up. Think of it as the shared filing cabinet in the break room.",
              "Know which to use for each document type — a draft report you are working on alone: OneDrive. The final approved staff handbook that everyone accesses: SharePoint. A patient record that billing and clinical staff both need: SharePoint (if HIPAA requirements are met by your organization's setup). When in doubt, ask your supervisor — using the wrong storage location can affect who can access a file and whether it is included in the correct backup.",
            ],
          },
        ],
      },
      {
        heading: "Sync Status and Offline Access",
        blocks: [
          {
            type: "paragraph",
            text: "Understanding OneDrive's sync status indicators prevents confusion about whether your files are safely backed up:",
          },
          {
            type: "list",
            items: [
              "Blue cloud icon (cloud with up arrow): the file exists in the cloud but has not been downloaded to your device — it is available online but not locally cached. It will download on demand when you open it, but requires an internet connection.",
              "Green checkmark: the file is synced — both the local copy and the cloud copy are identical and up to date. This is the target state for all your files.",
              "Blue sync arrows (circular): the file is currently syncing — a change was made and it is being uploaded to the cloud. Do not power off your computer while files are in this state, or you may interrupt the sync.",
              "Red X: sync failed — this file has not been uploaded to the cloud due to a conflict, a permission issue, or a connectivity problem. Click the OneDrive icon in the taskbar (bottom right) to see the error details and resolve it. A file showing a red X is at risk of being lost if your local drive fails — resolve sync errors promptly.",
              "Always-keep-on-device: right-click any file or folder in OneDrive and choose 'Always keep on this device' to ensure it is locally cached regardless of internet connectivity. Do this for files you need to access even when offline.",
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
            text: "OneDrive and SharePoint access is tied to your Microsoft 365 account — meaning all files are accessible from the web if someone has your username and password. Never share your Microsoft 365 credentials with anyone, including a colleague who 'just needs to check one file.' Use the proper sharing features (covered in the next lesson) instead. Additionally, confirm with your IT department which SharePoint libraries are HIPAA-compliant before saving any patient information to cloud storage. Not all cloud configurations meet HIPAA's Business Associate Agreement requirements.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Explain the difference between OneDrive Personal, OneDrive for Business, and SharePoint in Microsoft 365, in plain language for a medical office front desk assistant who is new to cloud storage. Include: what each is used for, who can see each type of storage, and when to use each in a typical medical office workflow.' Use this explanation to confirm your understanding before the next lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A file in your OneDrive folder shows a red X icon. What does this mean and what should you do?",
            options: [
              "The file is deleted — restore it from the Recycle Bin",
              "The file failed to sync to the cloud — click the OneDrive icon to see the error and resolve it promptly",
              "The file is marked as private — only you can access it",
              "The file is too large to upload — delete it and save a smaller version",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Explore your OneDrive setup and practice understanding sync status.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open File Explorer and navigate to your OneDrive folder. Identify at least three files and note the sync status icon next to each (green check, blue cloud, or other). Screenshot the folder view showing sync status icons.",
          "Create a new folder called 'LMA Cloud Practice' in your OneDrive. Create a Word document inside it called 'CloudTest_[YourName]_2025-05.docx'. Watch the sync status icon change from the uploading arrows to the green checkmark. Screenshot the green checkmark state.",
          "Right-click your new folder and select 'Always keep on this device.' Confirm the icon updates. Then right-click and select 'Free up space' to see the behavior change. Screenshot both states.",
          "Go to onedrive.com in your browser, sign in with your Microsoft 365 account, and confirm your 'LMA Cloud Practice' folder and document appear there. Screenshot the web view showing your folder.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your four screenshots (sync status in File Explorer, green checkmark after upload, always-on-device and free-up-space states, and web portal view) to your instructor. This exercise confirms you understand OneDrive sync behavior and can navigate between local and web access — the foundational cloud storage skill for modern office work.",
      },
    ],
  },

  {
    slug: "sharing-collaborating",
    title: "Sharing and Collaborating on Documents Online",
    description:
      "Share files professionally, co-author documents in real time, and manage permissions so that colleagues access exactly what they need — and nothing more.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor needs to review a patient communication template you drafted before it goes live. The billing manager needs editing access to the monthly expense report. And a referring physician's office has requested that you share the updated referral form — but only for viewing, not editing. All three require different sharing permissions, and all three must be handled without attaching files to email. This lesson teaches you the correct way to share through Microsoft 365.",
          },
        ],
      },
      {
        heading: "Sharing Files from OneDrive",
        blocks: [
          {
            type: "paragraph",
            text: "Sharing from OneDrive sends a link rather than a file attachment — this has several important advantages for professional workflows:",
          },
          {
            type: "list",
            items: [
              "To share a file from OneDrive: right-click the file in File Explorer (or in the OneDrive web portal), select Share. In the sharing dialog, type the recipient's name or email address, choose the permission level (Can edit or Can view), add an optional message, and click Send. The recipient receives an email with a secure link that opens the file in their browser or desktop app.",
              "Link-sharing is better than email attachment for collaboration — when you email an attachment, recipients each have their own copy, and version control becomes impossible if multiple people edit simultaneously. When you share a OneDrive link, everyone accesses the same single file. All changes are synchronized in real time and a single version history is maintained.",
              "Permission levels control what recipients can do — 'Can view' allows the recipient to read the file but not make changes (use this for external parties who should only read the document, such as the referring physician's office in the scenario above). 'Can edit' allows full editing rights (use this for internal colleagues who need to make changes). Never grant edit access to an external party for a document containing patient information without supervisor approval.",
              "Link expiration and password protection — in the OneDrive sharing dialog, click the settings icon (gear) to set a link expiration date (the link stops working after that date) and optionally require a password to open the link. For sensitive documents shared externally, always set an expiration date. A link that never expires continues to work even after the recipient has no legitimate need to access the file.",
            ],
          },
        ],
      },
      {
        heading: "Real-Time Co-Authoring",
        blocks: [
          {
            type: "paragraph",
            text: "When a file is saved in OneDrive or SharePoint and shared with edit access, multiple people can edit it simultaneously — this is called co-authoring. Understanding how it works prevents conflicts and confusion:",
          },
          {
            type: "list",
            items: [
              "Co-authoring works in Word, Excel, and PowerPoint when the file is in OneDrive or SharePoint — each co-author's cursor appears in a different color so you can see where others are editing in real time. Changes appear on your screen within seconds of another user making them. This eliminates the 'which version is current?' problem completely.",
              "AutoSave replaces manual saving in co-authored files — when a file is in OneDrive and co-authoring is active, AutoSave (shown in the top-left corner of Word or Excel) saves your changes continuously. There is no need to press Ctrl+S. However, if AutoSave turns off unexpectedly, check your OneDrive sync status — a sync problem disables AutoSave.",
              "Use comments rather than direct edits for feedback — when reviewing someone else's document, use the Insert > Comment feature (Ctrl+Alt+M in Word) to add a comment in the margin rather than directly changing the text. This allows the document owner to review, accept, or reject suggestions rather than discovering mysterious changes to their document.",
              "Resolve conflicts gracefully — if two people edit the same sentence at exactly the same time, Word creates a conflict resolution prompt. Read both versions carefully and choose the correct one, or merge them manually. In a well-coordinated team, conflicts are rare because team members communicate about which sections they are editing before starting.",
            ],
          },
        ],
      },
      {
        heading: "Managing Access to Shared Files",
        blocks: [
          {
            type: "paragraph",
            text: "Sharing permissions can be modified or revoked at any time — this ongoing management is as important as the initial sharing setup:",
          },
          {
            type: "list",
            items: [
              "To view and manage who has access to a file: right-click the file in OneDrive, select 'Manage Access.' This shows a list of everyone who has been granted access, their permission level, and the sharing links that have been created. You can change permission levels or revoke access from this panel.",
              "Revoke access when it is no longer needed — when a staff member leaves the practice, is reassigned, or when an external collaboration concludes, remove their access to shared files immediately. In a medical office, former employees retaining access to shared files is a potential data breach. Your IT department typically handles account deactivation, but knowing to request it is important.",
              "Audit sharing regularly — quarterly, review the Manage Access panel for your most sensitive shared documents and confirm that all current access holders still have a legitimate need. Remove any who do not. This practice is a component of HIPAA's minimum necessary access principle.",
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
            text: "Sharing a OneDrive or SharePoint link to a file containing PHI with an external party — even a referring physician — may require a Business Associate Agreement to be in place between your practice and the recipient's organization. Do not share files containing patient information externally without confirming with your supervisor that the appropriate agreements and security controls are in place. The convenience of link sharing does not override HIPAA sharing restrictions. When in doubt, route the file through your organization's secure messaging or fax system instead.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Explain Microsoft 365 file sharing best practices for a medical office. Include: when to share via link vs. email attachment, how to set appropriate permissions for different recipients (internal staff vs. external physicians vs. vendors), when to set link expiration dates, and how to revoke access. Make the guidance practical and specific to healthcare.' Compare the response to your office's current sharing practices and identify any gaps.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A referring physician's office asks you to share the updated referral form so they can see the latest version at any time. What is the correct sharing approach?",
            options: [
              "Email the referral form as a PDF attachment — do not share live links externally",
              "Share a OneDrive link with 'Can view' permission and set an expiration date, after confirming with your supervisor that this is compliant with your data sharing agreements",
              "Share a OneDrive link with 'Can edit' permission so they can add patient information directly",
              "Print the form and mail it to the physician's office",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice sharing files with appropriate permission levels.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the 'CloudTest' document you created in the previous lesson. Share it with a classmate or family member using the 'Can view' permission. Screenshot the sharing dialog showing the recipient and permission level before clicking Send.",
          "Ask your sharing recipient to attempt to edit the document. Confirm they receive a 'view only' restriction. Screenshot their view showing the document is not editable.",
          "Change the permission to 'Can edit,' ask your recipient to make a one-word change, and observe the co-authoring indicator (their cursor) appearing in your document in real time. Screenshot the co-authoring view.",
          "Open Manage Access for the same file and revoke your recipient's access. Confirm the file now shows no external shares. Screenshot the Manage Access panel showing the access removed.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your four screenshots (sharing dialog, view-only restriction, co-authoring, and access revoked) to your instructor. This exercise confirms you can share files with appropriate permissions and manage access throughout a document's lifecycle — a core skill for modern cloud-based office environments.",
      },
    ],
  },

  {
    slug: "teams-meetings",
    title: "Microsoft Teams: Chat, Calls, and Meetings",
    description:
      "Use Microsoft Teams as a complete communication hub — chat, call, meet, and collaborate in the tool that has become the backbone of modern office communication.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates uses Microsoft Teams for all internal communication. Staff message each other instead of walking across the office. Providers join patient care discussions from their exam rooms. The billing team holds weekly review calls without leaving their desks. Your supervisor expects you to be fully functional in Teams by end of your first week — this lesson gets you there.",
          },
        ],
      },
      {
        heading: "Teams Navigation and Chat",
        blocks: [
          {
            type: "paragraph",
            text: "Teams organizes communication into several key areas — understanding the layout is the first step to using it effectively:",
          },
          {
            type: "list",
            items: [
              "Activity feed (bell icon, left sidebar) — shows all mentions of your name (@yourname), replies to your messages, and notifications from channels you follow. Check the Activity feed at the start of each shift to catch anything urgent from the previous hours.",
              "Chat (speech bubble icon) — one-on-one and small group conversations. Click New Chat (pencil icon) and type a colleague's name to start a private message. Teams chat replaces a significant portion of internal email for quick questions, status updates, and real-time coordination. Messages in chat are searchable and persistent — unlike a phone call, the conversation is recorded and findable later.",
              "Teams and Channels (grid icon) — a Team is a group workspace (e.g., 'Lakeside Medical Associates Front Desk') and Channels are topic-organized sections within that Team (e.g., General, Scheduling, Billing, Announcements). Post to a Channel when the information is relevant to the whole group. Use Chat for private one-on-one communication.",
              "Mentions (@name) — type @followed by a colleague's name in any chat or channel post to send them a direct notification. Use @channel to notify all channel members. In a busy Teams environment, using @mentions correctly ensures important messages do not get lost. Do not @everyone or @channel for non-urgent announcements — this triggers notifications for all members and feels intrusive when overused.",
            ],
          },
        ],
      },
      {
        heading: "Starting and Joining Meetings",
        blocks: [
          {
            type: "paragraph",
            text: "Teams is the primary meeting platform for Lakeside Medical Associates — knowing how to schedule, join, and manage meetings in Teams is a core competency:",
          },
          {
            type: "list",
            items: [
              "Joining a scheduled meeting — click the Join button in the Teams calendar or in your Outlook calendar invitation. You are placed in a lobby (waiting room) until the host admits you. Before joining, Teams gives you a preview screen to check your camera and microphone — use this every time to prevent audio/video problems in the meeting itself.",
              "Starting an instant meeting — in any Chat or Channel, click the Video Call (camera) or Audio Call (phone) button to start an impromptu meeting with that person or group. This is faster than scheduling a formal meeting for quick consultations.",
              "Scheduling a Teams meeting from Outlook — in Outlook Calendar, click New Teams Meeting. This inserts a Teams meeting link automatically into the invitation. Add your attendees, set the time, add an agenda to the body, and send. Recipients can join from the Outlook calendar invite or from their Teams calendar.",
              "Meeting features during a call: use the meeting toolbar at the bottom of the screen to mute/unmute (microphone icon), turn camera on/off (camera icon), share screen (arrow in box icon), view participant list (people icon), access chat (chat bubble icon), and use reactions (smiley icon). The Chat panel in a meeting allows sharing links, files, and written notes without interrupting the spoken conversation.",
            ],
          },
        ],
      },
      {
        heading: "Files and Integration with Microsoft 365",
        blocks: [
          {
            type: "paragraph",
            text: "Teams integrates directly with SharePoint and OneDrive — making document collaboration seamless within the Teams environment:",
          },
          {
            type: "list",
            items: [
              "Files tab in Teams channels — every Team channel has a Files tab that connects directly to a SharePoint document library. Files uploaded here are stored in SharePoint and accessible to all team members with appropriate permissions. This is the correct place to store shared documents like templates, schedules, and policy documents that all front desk staff need.",
              "Uploading and editing files directly in Teams — you can upload files to the Files tab by dragging and dropping, or clicking Upload. Clicking a Word, Excel, or PowerPoint file in the Files tab opens it in Teams for online editing — no need to download and re-upload. Changes save automatically to SharePoint.",
              "Sharing files in chat — in any Teams chat or channel message, click the paper clip (Attach) icon to share a file from your OneDrive or SharePoint rather than attaching it as an email attachment. Recipients get a link to the live file rather than a static copy.",
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
            text: "Teams messages and meeting recordings are stored and may be retained as part of your organization's communication records. Do not use Teams chat for personal conversations, complaints about colleagues, or any communication that would be inappropriate in a formal written memo — because Teams messages are just as retrievable as email for compliance and HR investigations. In a medical office context, do not share patient PHI in Teams unless your IT department has confirmed that your Teams environment meets HIPAA security requirements and is covered by a Business Associate Agreement.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a Microsoft Teams Quick Start Guide for a new medical office front desk assistant who has never used Teams before. Include: how to send a chat message, how to join a scheduled meeting, how to share a file in a channel, how to use @mentions correctly, and 3 important etiquette rules for a professional healthcare environment.' Customize the guide with your team name and channel names from your actual Teams workspace.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to send a quick question to your supervisor in Teams that is just for them and does not need to be visible to the whole front desk team. Which Teams feature should you use?",
            options: [
              "Post in the General channel so everyone is aware",
              "Start a private Chat with your supervisor directly",
              "Send an email through Outlook instead",
              "@mention your supervisor in the Announcements channel",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a guided exploration of Microsoft Teams' core features.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Send a private chat message to yourself in Teams (or to a classmate): type a professional message as if checking in about a patient appointment, and @mention the recipient. Screenshot the sent message showing the @mention.",
          "Upload your 'LMA_FileManagementGuide' document (from Module 2) to a Teams channel Files tab. Screenshot the Files tab showing the uploaded document.",
          "Schedule a 5-minute test Teams meeting with yourself or a classmate. Join it, test your camera and microphone using the preview screen, and take a screenshot of the meeting lobby view before joining.",
          "Find and use the background blur feature in Teams during your test meeting (click the three dots > Apply Background Effects > Blur). Screenshot the blurred background in the active meeting. This is a professional alternative to a virtual background when your physical background is not ideal.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your four screenshots (chat message with @mention, Files tab, meeting lobby, and blurred background) to your instructor. These exercises confirm that you can use Teams' core features for professional communication, file sharing, and meeting participation — the three most important use cases for front desk staff.",
      },
    ],
  },

  {
    slug: "cloud-security",
    title: "Cloud Security and Best Practices",
    description:
      "Apply the security habits that keep cloud-stored files, shared documents, and online accounts safe in a medical office environment.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A staff member at a nearby clinic signed into their work Microsoft 365 account from a personal laptop at a coffee shop using the coffee shop's public Wi-Fi. Their account was later compromised — a hacker used the session to access shared patient files in Teams and export a list of patient names and appointment dates. The breach affected 400 patients and triggered a HIPAA notification process that cost the clinic over $40,000 to manage. Every decision in this lesson is about preventing exactly this kind of incident.",
          },
        ],
      },
      {
        heading: "Account Security for Cloud Services",
        blocks: [
          {
            type: "paragraph",
            text: "Your Microsoft 365 credentials are the key to your entire cloud environment — email, files, Teams, and any connected applications. Protecting these credentials is your highest-priority security responsibility:",
          },
          {
            type: "list",
            items: [
              "Multi-Factor Authentication (MFA) is mandatory for cloud accounts in healthcare — MFA requires a second verification step beyond your password when logging in (typically a code sent to your phone or an authenticator app notification). Even if a hacker obtains your password, they cannot access your account without the second factor. If your organization offers optional MFA, enable it immediately. In a compliant healthcare environment, MFA should be required by policy.",
              "Never log into your work Microsoft 365 account from a public or shared computer — computers in libraries, hotel business centers, or other shared environments may have keyloggers or cached session tokens that expose your credentials after you log out. If you must access work files remotely from a non-work device, use a personal device on a private network, not a shared or public one.",
              "Sign out of cloud accounts when done on a non-work device — in Outlook web, Teams web, or SharePoint, click your account icon and select Sign Out. Close the browser after signing out. This prevents session persistence that can be exploited on a shared or family device.",
              "Change your password immediately if you suspect a compromise — if you notice unfamiliar sign-in activity (Microsoft sends security alerts for sign-ins from new locations or devices), change your password immediately and notify IT. Speed matters in credential compromise scenarios — the faster the password changes, the shorter the attacker's window.",
            ],
          },
        ],
      },
      {
        heading: "Secure Network Use for Cloud Access",
        blocks: [
          {
            type: "paragraph",
            text: "The network you use to access cloud services affects the security of that connection — public Wi-Fi has known security risks that affect professional cloud access:",
          },
          {
            type: "list",
            items: [
              "Avoid accessing work cloud services on public Wi-Fi — public networks in coffee shops, airports, and hotels are unencrypted and potentially monitored by other users on the same network. A technique called 'man-in-the-middle' allows attackers on the same public network to intercept unencrypted web traffic. While HTTPS provides some protection, the combination of public Wi-Fi and credential entry creates unnecessary risk.",
              "Use a VPN (Virtual Private Network) if you must access work systems remotely — a VPN encrypts your internet traffic and tunnels it through a secure server, protecting your connection even on a public network. Many organizations provide a VPN for remote access to clinical systems. If your office provides one, use it whenever accessing work systems from outside the office.",
              "The office Wi-Fi is more secure than public Wi-Fi, but is not impenetrable — avoid transmitting sensitive information over the waiting room guest Wi-Fi (which is the same network patients use). All clinical and administrative work should use the staff-only network.",
            ],
          },
        ],
      },
      {
        heading: "File Permissions and the Principle of Least Access",
        blocks: [
          {
            type: "paragraph",
            text: "The 'principle of least access' means giving each person access to only the files they need for their specific job — and nothing more. Applying this principle in your sharing decisions significantly reduces the risk of unauthorized data exposure:",
          },
          {
            type: "list",
            items: [
              "Audit your shared files regularly — check the Manage Access panel for any file you have shared (as covered in the previous lesson) every quarter. Remove access from anyone who no longer needs it. In a medical practice with staff turnover, outdated sharing permissions accumulate quickly.",
              "Use 'View' access by default for external sharing — when in doubt about which permission level to grant an external party, always start with 'Can view.' Upgrade to 'Can edit' only when you have a specific, confirmed need. It is easy to upgrade permissions; it is harder to undo damage from edit access that should not have been granted.",
              "Report accidental sharing immediately — if you accidentally shared a file with the wrong person (especially a file containing PHI), notify your supervisor and IT immediately. Do not wait to see if the recipient noticed. In a HIPAA breach scenario, the timeliness of the notification and response is a factor in regulatory assessment. Early, transparent reporting is always the correct response to accidental disclosure.",
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
            text: "Cloud storage is not a reason to be less careful about what you save and where — it is a reason to be more intentional. The accessibility that makes cloud storage useful also makes poor security decisions more consequential. A file you accidentally share on a traditional file server affects people who can physically reach that server. A file you accidentally share in cloud storage can be accessed from anywhere in the world by anyone with the link. Apply stricter sharing controls for cloud files than you would for files on a local network drive.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'What are the top 10 cloud security habits that a medical office assistant should practice every day to protect patient data and work files stored in Microsoft 365? Include habits for account security, network safety, file sharing, and responding to security incidents. Make each habit one actionable sentence.' Review the list and identify which habits you are already following and which you need to start doing.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You are working from home and need to access a shared patient schedule in SharePoint. What is the most secure approach?",
            options: [
              "Connect to the coffee shop Wi-Fi near your home since it is faster than your home internet",
              "Access from a personal computer at home using a secure home Wi-Fi connection (and VPN if your organization provides one), with MFA enabled on your account",
              "Ask a colleague to read the schedule to you over the phone",
              "Disable MFA temporarily to make sign-in faster",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a cloud security audit of your own Microsoft 365 account.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Sign in to your Microsoft 365 account at office.com and navigate to Account Settings > Security Info. Confirm that MFA is enabled and that your authentication methods (phone, authenticator app) are up to date. Screenshot the Security Info page showing MFA enrollment.",
          "Navigate to My Account > Sign-in Activity (or equivalent in your organization's setup). Review recent sign-in events. Note any unfamiliar locations or devices. Screenshot the sign-in activity list.",
          "Review the sharing permissions on three files in your OneDrive by right-clicking each and checking Manage Access. Note the permission level and whether any shares are with external parties. Document your findings in a table (File Name, Shared With, Permission Level, Expiration Date if any).",
          "Write a 5-point Cloud Security Checklist for Lakeside Medical Associates staff, formatted as a printable reference card. Save as 'LMA_CloudSecurity_Checklist_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your MFA screenshot, sign-in activity screenshot, sharing permissions table, and Cloud Security Checklist to your instructor. This cloud security audit is the type of regular review that HIPAA Security Rule compliance programs require — and completing it once builds the habit of doing it regularly.",
      },
    ],
  },
];
