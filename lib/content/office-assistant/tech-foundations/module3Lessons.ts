import { Lesson } from "@/types/lesson";

export const module3Lessons: Lesson[] = [
  {
    slug: "how-the-internet-works",
    title: "How the Internet Works",
    description:
      "Understand what the internet actually is, how websites load, and the difference between the internet and your local network — essential context for every task you do online.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The internet is down at Lakeside Medical Associates — and your supervisor asks you to check whether it is a local Wi-Fi problem, an issue with the office's router, or the internet provider's outage. Without understanding how the internet works, these all sound like the same thing. With a basic understanding of internet infrastructure, you know exactly what to check first and what to report to IT.",
          },
        ],
      },
      {
        heading: "What the Internet Is",
        blocks: [
          {
            type: "paragraph",
            text: "The internet is a global network of interconnected computers that communicate using a shared set of rules called protocols. Understanding its basic structure helps you troubleshoot connectivity problems and communicate clearly with IT support:",
          },
          {
            type: "list",
            items: [
              "Your local network (LAN) is the network inside your office — the computers, printers, and other devices connected to the office's router and switch via Wi-Fi or ethernet cables. Devices on the local network can communicate with each other even when the internet is down. If you can print to the office printer but cannot reach Gmail, the local network is working — the problem is the internet connection itself.",
              "Your internet connection is provided by an ISP (Internet Service Provider) — a company like Comcast, AT&T, or a regional provider that connects your office's router to the wider internet. The router receives internet service from the ISP's network and distributes it to devices in your office via Wi-Fi and ethernet ports. If the ISP has an outage, no device in your office can reach the internet, but local network functions (file sharing, local printing) still work.",
              "IP addresses are the identification numbers computers use to find each other on a network — similar to a mailing address. Your computer has a local IP address (like 192.168.1.5) that identifies it on your office's local network. Websites also have IP addresses, but we access them using domain names (like google.com) because names are easier to remember. The DNS (Domain Name System) translates domain names into IP addresses behind the scenes.",
              "A website is just a file (or collection of files) stored on a remote computer called a web server — when you type a URL in your browser, the browser requests those files from the server, the server sends them to your computer, and your browser displays them as a webpage. If a website is slow, the problem could be with the server (overloaded), your internet connection (slow), or your browser (a bug or extension conflict).",
            ],
          },
        ],
      },
      {
        heading: "Wi-Fi vs. Ethernet",
        blocks: [
          {
            type: "paragraph",
            text: "In an office setting, understanding the difference between Wi-Fi and wired ethernet connections affects speed, reliability, and security — all three matter in a medical office:",
          },
          {
            type: "list",
            items: [
              "Ethernet (wired) connections are faster and more reliable than Wi-Fi — a physical cable connects your computer directly to the office network switch. Wired connections do not suffer from interference, signal degradation through walls, or competition from other wireless devices. For workstations that stay in one place — such as a front desk computer — ethernet is preferred. The EHR system and other clinical software typically run better on wired connections.",
              "Wi-Fi (wireless) is convenient but more variable — signal strength depends on distance from the router, physical obstacles (walls, metal furniture), and interference from other wireless devices. If your computer shows full Wi-Fi bars but internet pages load slowly, try an ethernet connection as a diagnostic test. In a multi-story medical building, a Wi-Fi extender or access point on each floor ensures consistent coverage.",
              "Guest Wi-Fi vs. office Wi-Fi — many offices run two separate wireless networks: a private network for staff devices and office computers, and a public/guest network for the waiting room. Never connect office computers containing patient data to the guest network, and never share the staff network password with patients or visitors. The two networks are intentionally isolated for security.",
            ],
          },
        ],
      },
      {
        heading: "Troubleshooting Basic Connectivity",
        blocks: [
          {
            type: "paragraph",
            text: "When something is not connecting, following a simple diagnostic sequence helps you identify the problem quickly rather than calling IT for every connectivity issue:",
          },
          {
            type: "list",
            items: [
              "Step 1 — Check if only your computer is affected or if it affects all computers. Ask a colleague if they can reach the internet. If only your computer is affected, the issue is specific to your workstation (check your Wi-Fi or ethernet connection, try toggling airplane mode, or restart your network adapter: right-click the network icon in the taskbar > Troubleshoot). If multiple computers are affected, the problem is the router or ISP.",
              "Step 2 — Restart the computer and the router. Most temporary connectivity issues resolve with a restart. For the router, unplug it from the wall for 30 seconds, then plug it back in and wait 2 minutes for it to fully reconnect. The router should not need to be restarted more than once a month — if it does, there is an underlying problem to report to IT.",
              "Step 3 — Check the ISP status page from a phone on cellular data to determine whether there is a known outage. Most ISPs have a status page or app. If a known outage is listed, the only action is to wait and notify your supervisor so they can manage patient appointments accordingly.",
              "Step 4 — Report to IT with specifics. 'The internet is not working' is not actionable. 'All workstations in the front office cannot reach the internet but local network printing works. We restarted the router 10 minutes ago with no change. The ISP status page shows no outage in our area' gives IT exactly what they need to diagnose the problem remotely.",
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
            text: "The office internet connection is a business resource intended for work-related tasks. Using it for personal streaming, heavy downloads, or online gaming during clinic hours slows the connection for everyone — including clinical staff accessing the EHR system and billing staff processing insurance claims. Most office networks are monitored by IT, and internet usage logs can be reviewed. Keep personal internet use to your break time and use your personal device's cellular data rather than the office Wi-Fi for personal browsing during the workday.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'The internet is not working at my medical office and I need to troubleshoot it before calling IT. Walk me through a step-by-step diagnostic process, starting from the simplest possible cause and ending with what information I should give IT if I cannot resolve it myself.' Print the response and keep it at your workstation for the next time connectivity goes out.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "All office computers cannot reach the internet, but the local network printer still works. What does this most likely indicate?",
            options: [
              "All computers have a virus",
              "The office Wi-Fi password has changed",
              "The problem is with the internet connection (router or ISP), not the local network",
              "The printer is blocking internet access",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a simple Internet Troubleshooting Checklist for Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Check your workstation's current IP address: open Command Prompt (search 'cmd' in the Start menu) and type 'ipconfig'. Record your IPv4 address. Note whether it starts with 192.168 (local network) or something else.",
          "Test your internet connection by opening a web browser and navigating to three different websites. Note which ones load and which do not. Open one from a well-known provider (google.com) and one from a medical professional site.",
          "In a Word document, write a 5-step Internet Connectivity Troubleshooting Checklist for Lakeside Medical Associates — one sentence per step, written clearly enough for a non-technical new hire to follow.",
          "Save the checklist as 'LMA_InternetTroubleshooting_2025-05.docx' and export as a PDF. This is a real deliverable your office could use.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit the PDF version of your troubleshooting checklist to your instructor. It will be evaluated on whether the steps are logical, complete, and written clearly enough for a first-day employee to follow without prior IT knowledge.",
      },
    ],
  },

  {
    slug: "web-browsing",
    title: "Using a Web Browser Effectively",
    description:
      "Navigate the web confidently using browser features like tabs, bookmarks, history, and settings — and understand how to get the most out of the tools built into every browser.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Your supervisor at Lakeside Medical Associates asks you to find the current coding guidelines from CMS (Centers for Medicare & Medicaid Services), bookmark the page for the whole team, open the practice's insurance portal in a separate tab, and clear the browser history from last week that is slowing down the browser. All of this happens in your first 10 minutes online. Knowing your browser inside and out makes these tasks take seconds instead of minutes.",
          },
        ],
      },
      {
        heading: "Browser Essentials",
        blocks: [
          {
            type: "paragraph",
            text: "A web browser is the application you use to access the internet — Microsoft Edge, Google Chrome, and Mozilla Firefox are the most common in office environments. While they look slightly different, they share the same core features:",
          },
          {
            type: "list",
            items: [
              "The address bar (URL bar) at the top of the browser serves two purposes — type a website address (URL) to navigate directly to a specific page, or type a search query and press Enter to search Google (or your default search engine). If you type a full website address like 'cms.gov' and press Enter, the browser goes directly to that site. If you type 'medicare coding guidelines 2025,' the browser opens a search results page.",
              "Tabs allow you to have multiple websites open simultaneously without opening multiple browser windows — Ctrl+T opens a new tab, Ctrl+W closes the current tab, and Ctrl+Tab cycles through open tabs. In a medical office workflow, you might have the EHR web portal in one tab, the insurance billing site in another, a reference page in a third, and Outlook web in a fourth. Managing tabs effectively means you switch between tasks in one click rather than reopening pages constantly.",
              "Bookmarks (also called Favorites) save a page's URL so you can return to it instantly without remembering the address — Ctrl+D saves the current page as a bookmark. Organize bookmarks into folders in the Bookmarks Manager for important sites you visit regularly: create folders like 'Insurance Portals,' 'Medical References,' 'CMS & Regulatory,' and 'Practice Management.' Share the bookmark folder with new staff by exporting bookmarks: Menu > Bookmarks > Import/Export.",
              "Browser history records every page you have visited — press Ctrl+H to view it. History is useful for returning to a site you forgot to bookmark. Clear your history periodically (Ctrl+Shift+Delete) for privacy and browser performance — a browser history file that has grown to millions of entries can slow down the browser. At a shared workstation, clear history at the end of each shift.",
            ],
          },
        ],
      },
      {
        heading: "Search Effectively",
        blocks: [
          {
            type: "paragraph",
            text: "The ability to find accurate information quickly online is a core professional skill. Most people type a few words and hope the first result is correct — skilled searchers use techniques that reliably surface the most relevant, authoritative information:",
          },
          {
            type: "list",
            items: [
              "Use specific terms, not vague questions — 'flu vaccine schedule 2025 CDC' returns more precise results than 'when should I get the flu vaccine.' In professional research, include the source you want (CDC, CMS, WHO), the specific topic, and the year when recency matters.",
              "Use quotation marks for exact phrases — searching 'HIPAA Notice of Privacy Practices' (with quotes) returns only pages containing that exact phrase, not pages that contain those words scattered separately. This is highly useful when searching for official titles of documents, regulations, or procedures.",
              "Filter by recency — in Google, click Tools > Any time > Past year to filter results to content published in the last 12 months. Medical and regulatory information changes frequently; a search result from 2019 may be outdated guidance. Always check the publication or update date on any page you are citing as a reference.",
              "Prefer .gov and .org domains for medical and regulatory information — websites ending in .gov (government) and .org (established organizations like AHA, AMA, CDC) are typically the most authoritative sources for healthcare information. Be more skeptical of .com sources, especially when researching clinical guidelines, billing codes, or compliance requirements.",
            ],
          },
        ],
      },
      {
        heading: "Browser Settings and Maintenance",
        blocks: [
          {
            type: "paragraph",
            text: "A well-configured browser runs faster, is more secure, and does not interrupt your work with pop-ups or slow load times. Key settings to know:",
          },
          {
            type: "list",
            items: [
              "Keep your browser updated — browsers release frequent updates that fix security vulnerabilities. Chrome and Edge update automatically when you close and reopen the browser. If you see an 'Update available' icon in the browser toolbar, click it and update during a break.",
              "Enable pop-up blocking — most insurance portals and EHR systems open new windows for certain functions, but random pop-ups from websites are almost always nuisance ads or worse. Make sure pop-up blocking is enabled (it is on by default in all major browsers) and add exceptions only for sites you trust that need pop-ups to function.",
              "Manage browser extensions carefully — extensions are small programs that add features to your browser. Only install extensions approved by IT. Malicious browser extensions can steal login credentials, redirect your searches to phishing sites, and monitor your activity. If IT asks you to remove a specific extension, do it promptly.",
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
            text: "Never save passwords for medical practice portals, EHR systems, or insurance websites in your browser's built-in password manager on a shared workstation. Anyone who uses that computer after you can access saved passwords. Use a password manager approved by your IT department instead, or log in manually each time for sensitive systems. If a browser prompt asks 'Save password?' on a shared workstation, always click 'Never for this site' for any system that accesses patient data.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Give me a list of the 10 most useful keyboard shortcuts for Google Chrome or Microsoft Edge that an office assistant would use daily, with a brief explanation of when each one is most helpful.' Memorize at least 5 of these and use them consistently for one week to build muscle memory.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You need to find the current CMS reimbursement rate for a specific procedure code, published in 2024 or 2025. Which search approach gives you the most reliable result?",
            options: [
              "Search 'procedure code payment' and click the first result",
              "Search '\"CMS physician fee schedule\" 2025 site:cms.gov' and filter results to the past year",
              "Ask a colleague and rely on their memory",
              "Search in Wikipedia for the procedure code",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a professional bookmark library for Lakeside Medical Associates and practice advanced search techniques.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "In your browser, create a Bookmarks folder called 'Lakeside Medical References.' Inside it, create four subfolders: Government & Regulatory, Insurance Portals, Medical References, and Practice Tools.",
          "Bookmark at least two real websites in each subfolder. Use your search skills to find relevant, authoritative sites for each category (e.g., cms.gov and cdc.gov for Government & Regulatory).",
          "Search for 'HIPAA Privacy Rule summary site:hhs.gov' and locate the official HHS summary page. Bookmark it in your Government & Regulatory folder. Write one sentence on why this is a more reliable source than a general Google result.",
          "Export your Bookmarks folder as an HTML file (Menu > Bookmarks > Export): this creates a file you could share with a colleague. Save the export file with a professional name and submit it as your deliverable.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your exported Bookmarks HTML file and your one-sentence source evaluation note to your instructor. The bookmark library will be evaluated for appropriate organization and authoritative site selection. This is a practical deliverable a new employer might genuinely ask you to set up on your first week.",
      },
    ],
  },

  {
    slug: "safe-browsing",
    title: "Safe Browsing Practices",
    description:
      "Recognize unsafe websites, protect your login credentials online, and adopt browsing habits that keep the office network and patient data secure.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You receive an email with a link to 'update your Outlook password.' The page that opens looks exactly like Microsoft's login page. Before you type your credentials, you notice the URL is 'microsoft-security-update.biz' — not microsoft.com. You close the tab, report the phishing attempt, and save the clinic from a potential credential theft. That split-second decision — checking the URL before entering a password — is the skill this lesson builds.",
          },
        ],
      },
      {
        heading: "Recognizing Unsafe Websites",
        blocks: [
          {
            type: "paragraph",
            text: "Not all websites are what they appear to be. Criminals create fake websites that look identical to real ones in order to steal login credentials, install malware, or collect sensitive information. Here is how to identify warning signs before it is too late:",
          },
          {
            type: "list",
            items: [
              "Check the URL before entering any information — the domain name is the part just before the first single slash in the URL. 'https://cms.gov/billing-guide' has the domain 'cms.gov' — a real government site. 'https://cms-gov.billing-help.net/update' has the domain 'billing-help.net' — a completely different site with no connection to CMS. Attackers use domains that look similar to real ones: microsofft.com, cms-gov.net, paypaI.com (that is a capital 'I' not an 'l'). Always verify the exact domain before entering credentials.",
              "HTTPS (the padlock icon in the address bar) means the connection is encrypted — not that the site is safe. Many phishing sites now use HTTPS to appear legitimate. A padlock means no one can intercept the data between you and the site — but it says nothing about whether the site itself is honest. Do not trust a site simply because it has a padlock.",
              "Watch for urgent or threatening language — websites that say 'Your account has been compromised! Click here immediately to restore access' or 'Your computer is infected — call this number now' are almost always scams. Legitimate services do not demand immediate action through alarming popup messages. Close such pages without clicking anything and report them to IT.",
              "Pop-up windows claiming you have a virus are always fake — no website can scan your computer for viruses through a browser. These pop-ups are designed to frighten you into calling a fake 'support' number or downloading malware disguised as security software. Close the browser tab (use Task Manager if the tab will not close) and report the site to IT.",
            ],
          },
        ],
      },
      {
        heading: "Protecting Your Login Credentials Online",
        blocks: [
          {
            type: "paragraph",
            text: "Your login credentials — username and password — are the keys to every system you access. Protecting them online is one of the highest-impact security habits you can develop:",
          },
          {
            type: "list",
            items: [
              "Never enter a password on a page you reached by clicking a link in an email — instead, open a new browser tab and type the website address directly. This ensures you are on the real site, not a fake one designed to look like it. This single habit prevents the vast majority of credential phishing attacks.",
              "Use a unique password for every work system — if you use the same password for your EHR login and your email, and one of those systems is breached, attackers immediately have access to both. Many healthcare data breaches are traced to credential reuse. Use a password manager (covered in Module 8) to manage unique passwords without memorizing all of them.",
              "Log out of sensitive systems when you finish — especially on a shared workstation. Leaving the EHR, insurance portal, or email logged in while you go to lunch means anyone who sits at that workstation can access patient data. Most clinical systems have short auto-logout timers, but you should always log out manually when you leave a workstation unattended.",
            ],
          },
        ],
      },
      {
        heading: "Downloads and Attachments",
        blocks: [
          {
            type: "paragraph",
            text: "Downloading files from the internet or opening email attachments are the most common vectors for malware entering an office network. Here is how to handle downloads safely:",
          },
          {
            type: "list",
            items: [
              "Only download files from sources you trust and have verified — the vendor's official website, an email from a known contact at a known organization, or a file shared through your organization's official system. If you are unsure about a download, ask IT before opening it.",
              "Be suspicious of unexpected files — if you receive an unexpected email with an attachment (even from a known sender), call or text the sender to confirm they actually sent it before opening. Attackers can spoof email addresses and compromise email accounts to send malware to your contacts.",
              "The file extension matters — .pdf and .docx files from trusted sources are usually safe to open. .exe, .bat, .vbs, .zip containing .exe, and .js files are higher risk and should only be opened if IT or your supervisor has specifically authorized them. A fake invoice in a .exe file is a common malware delivery method.",
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
            text: "In a medical office, your online behavior affects not just your own security but the security of every patient's records in the system. A single malware infection from an unsafe download can encrypt every file on the network drive, demanding a ransom to restore access. These ransomware attacks have shut down hospitals and medical practices for days, causing delayed care and significant financial loss. Safe browsing is not a personal preference — it is a professional obligation when you have access to protected health information.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a one-page Safe Browsing Quick Reference guide for medical office staff. It should cover: how to check if a website URL is legitimate, why HTTPS does not mean a site is safe, what to do if you see a virus warning popup, how to handle unexpected email attachments, and the login habit that prevents phishing. Keep each item to 2-3 sentences.' Review the guide and compare it to the content of this lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You receive an email from 'billing@insurance-claims-cms.net' asking you to log in to update your account. The login page looks exactly like CMS's real site. What should you do?",
            options: [
              "Log in — the page looks real and the email came from a billing address",
              "Do not log in — open a new browser tab and navigate to cms.gov directly to check your account",
              "Forward the email to the whole office team so they are aware",
              "Call the number provided in the email to verify it is legitimate",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Practice URL analysis and build a Safe Browsing Quick Reference for your workstation.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Analyze the following five URLs and identify which are legitimate and which are suspicious. Write one sentence explaining your reasoning for each: (1) https://www.cms.gov/Medicare/Billing (2) https://cms-medicare-update.net/login (3) https://mybenefits.bcbs.com/provider/login (4) https://bcbs-provider-portal.com/update-credentials (5) https://oig.hhs.gov/fraud/consumer-alerts/",
          "Search for 'URL phishing checker' and use a reputable free tool (such as Google Safe Browsing or URLVoid) to check two of the suspicious URLs above. Screenshot the results.",
          "In a Word document, write a 5-point Safe Browsing Checklist for Lakeside Medical Associates front desk staff. Each point should be one actionable sentence.",
          "Save the checklist as 'LMA_SafeBrowsing_2025-05.docx' and export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your URL analysis (5 sentences), screenshots from the phishing checker, and your Safe Browsing Checklist PDF to your instructor. The analysis will be graded on accuracy and reasoning, and the checklist on clarity and completeness.",
      },
    ],
  },
];
