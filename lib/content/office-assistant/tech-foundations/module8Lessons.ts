import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "cybersecurity-threats",
    title: "Understanding Cybersecurity Threats",
    description:
      "Recognize the most common digital threats targeting office workers and healthcare organizations — so you can identify them before they cause harm.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/-ca2pZkCaRc",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Healthcare organizations are a favorite target for cyberattacks: they hold valuable patient data, they cannot afford to be offline (which pressures them to pay ransoms quickly), and busy staff may not have had security training. The damage can reach far beyond one office. In 2024, a ransomware attack on Change Healthcare, part of UnitedHealth Group, had what the U.S. Department of Health and Human Services (HHS) called a widespread impact on patients and health care providers nationwide, and the company later reported to HHS that about 192.7 million people were affected. Lakeside Medical Associates had its own near-miss phishing attack last year. This module ensures you understand how to recognize and avoid the threats that are aimed at offices like yours.",
          },
        ],
      },
      {
        heading: "The Cybersecurity Threat Landscape",
        blocks: [
          {
            type: "paragraph",
            text: "Understanding the types of threats that target organizations helps you recognize warning signs and respond correctly. These are the most common threats affecting medical offices today:",
          },
          {
            type: "list",
            items: [
              "Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems — it includes viruses (self-replicating code that attaches to files), worms (self-propagating malware that spreads across networks without user action), trojans (malware disguised as legitimate software), spyware (software that monitors your activity and sends data to attackers), and adware (software that generates unwanted advertisements). Most malware enters through email attachments, unsafe downloads, or exploiting unpatched software vulnerabilities.",
              "Ransomware is a particularly damaging form of malware — it encrypts the files on an infected computer and on any network drives it can reach, then demands payment (usually in cryptocurrency) for the decryption key. Many ransomware groups also copy the data before encrypting it and threaten to publish it if the victim does not pay. Healthcare ransomware attacks have shut down hospital systems for weeks and delayed patient care. Backups are the main way to recover: files kept in offline backups, or in cloud storage with version history, can be restored without paying. Backups cannot undo the theft of a copy, though, which is why stopping the attack in the first place still matters.",
              "Data breaches occur when unauthorized parties gain access to protected information — in healthcare, this typically means patient PHI (names, diagnoses, insurance information, medical records). Breaches may result from malware, stolen credentials, lost devices, or unauthorized insider access. HIPAA's Breach Notification Rule requires the practice to notify affected patients without unreasonable delay and no later than 60 days after discovering a breach. A breach affecting 500 or more people must also be reported to HHS within those 60 days (and to prominent media outlets when it affects more than 500 residents of a state); smaller breaches are reported to HHS once a year.",
              "Insider threats come from people with legitimate access who misuse it — either maliciously (intentionally stealing patient data to sell) or negligently (accidentally sharing information incorrectly). Insider threat mitigation includes access controls (only accessing what your role requires), activity monitoring (IT systems that log unusual access patterns), and training (ensuring staff know what authorized use looks like).",
            ],
          },
        ],
      },
      {
        heading: "How Attackers Target Office Workers",
        blocks: [
          {
            type: "paragraph",
            text: "Cybercriminals do not always attack computer systems directly — they frequently target the humans who use those systems, because tricking a person is often easier than breaking a security control:",
          },
          {
            type: "list",
            items: [
              "Phishing is the most common attack method — attackers send deceptive emails designed to look like legitimate communications from trusted sources (Microsoft, your bank, the IRS, a vendor, a physician). The goal is to get you to click a malicious link or open an infected attachment. In a medical office, common phishing lures include fake HIPAA compliance notices, fake insurance portal login pages, and fake IT security alerts.",
              "Spear phishing is a more targeted version of phishing — instead of sending a generic mass email, attackers research specific individuals and craft emails personalized to them. A spear phishing email to Lakeside Medical Associates might reference the practice's address, the name of a real provider, or a recent event — making it appear far more legitimate than a generic phishing email.",
              "Vishing (voice phishing) uses phone calls — attackers call claiming to be from IT support, the IRS, a vendor, or even your clinic's management, and attempt to obtain passwords, login credentials, or sensitive information verbally. Legitimate IT support will never call you and ask for your password over the phone. If you receive such a call, hang up and call IT directly using the number you already have on file.",
              "USB drops — attackers leave USB drives in parking lots or waiting rooms, or mail them to offices, labeled 'Payroll Data' or 'Important Records.' Some hold files that install malware when someone opens them out of curiosity; others are disguised devices that act like a keyboard and type commands the moment they are plugged in. Never plug an unknown USB drive into a work computer. Turn any unexplained USB drive found in or near the office over to IT without plugging it in.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Spot the warning signs",
            prompt: "Drag each warning sign to the threat it points to. These become the rows of your Threat Recognition Guide in the Challenge.",
            buckets: [
              { id: "phish", label: "Phishing email" },
              { id: "vish", label: "Vishing call" },
              { id: "usb", label: "Unknown USB device" },
              { id: "mal", label: "Malware symptoms" },
            ],
            items: [
              { id: "w1", text: "The sender's address doesn't match the company's real domain", bucket: "phish" },
              { id: "w2", text: "Pointing to the link shows it really goes to a look-alike website", bucket: "phish" },
              { id: "w3", text: "The caller says they are from IT and asks for your password or a sign-in code", bucket: "vish" },
              { id: "w4", text: "The caller pressures you to act before you can hang up and check", bucket: "vish" },
              { id: "w5", text: "A drive labeled 'Staff Payroll' left on a chair in the waiting room", bucket: "usb" },
              { id: "w6", text: "A small device arrives in the mail from a sender you don't recognize", bucket: "usb" },
              { id: "w7", text: "Pop-ups and new toolbars you never installed", bucket: "mal" },
              { id: "w8", text: "Files suddenly renamed with strange extensions, or a note demanding payment", bucket: "mal" },
              { id: "w9", text: "The computer slows to a crawl and the fan runs nonstop for no reason", bucket: "mal" },
            ],
            explanation:
              "Every threat has its own tells, but the response is the same for all four: stop, don't interact any further, and report it to IT right away.",
          },
        ],
      },
      {
        heading: "Security Incident Response",
        blocks: [
          {
            type: "paragraph",
            text: "Knowing what to do immediately after suspecting or confirming a security incident is as important as preventing incidents in the first place:",
          },
          {
            type: "list",
            items: [
              "Stop — do not continue using the computer or account if you suspect a compromise. Close suspicious applications but do not power off the computer (forensic evidence may be preserved on running systems). Disconnect from the network if you can (unplug ethernet or disable Wi-Fi) to prevent further malware spread.",
              "Report immediately — notify your supervisor and IT as soon as possible. Do not wait to see if the problem gets worse or try to fix it yourself unless specifically authorized to do so. In a HIPAA environment, early reporting is legally required in breach scenarios.",
              "Document what happened — write down (on paper, not on the potentially compromised computer) exactly what you observed: what email or website prompted the concern, what you clicked, what messages appeared, and at what time. This information is critical for IT's forensic investigation.",
              "Do not communicate about the incident via the potentially compromised system — if your email may be compromised, use a phone or another device to contact IT. Using the compromised email to report the breach may alert the attacker.",
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
            text: "If you click on a phishing link or open a malicious attachment and realize your mistake immediately — stop and report it to IT right away, even if nothing visible has happened yet. Many malware infections take time to activate, and immediate IT response can stop the malware before it causes harm. The consequences of NOT reporting a security incident are dramatically worse than the temporary embarrassment of admitting a mistake. Your organization depends on early reporting to contain incidents before they become breaches.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: In the AI assistant your school or workplace approves (for example, Microsoft 365 Copilot Chat signed in with your work or school account), ask: 'Describe three real cyberattacks on healthcare organizations from the past three years: what happened, how the attacker got in, and what front desk staff could have done to help prevent it. Include a source link for each one.' Then open every source and confirm the details yourself. AI assistants can mix up facts or cite sources that do not say what the answer claims, so a case only counts if the source backs it up. Identify which attack methods are relevant to your daily work.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You find a USB drive in the clinic parking lot labeled 'Staff Payroll - Confidential.' What should you do?",
            options: [
              "Plug it in to your workstation to check if it contains real payroll data",
              "Take it home to check on a personal computer so it cannot harm the clinic",
              "Report it to IT without plugging it in — it may be a USB drop attack",
              "Leave it where it is — it is not your responsibility",
            ],
            correctIndex: 2,
            explanation:
              "An unexplained drive is exactly what a USB drop attack looks like. Plugging it in anywhere, including a home computer, can run malware or a disguised keyboard device. Hand it to IT unplugged.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a Cybersecurity Threat Awareness Guide for Lakeside Medical Associates, and check the defenses on the computer you use.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research one real ransomware attack on a healthcare organization (use news sources like healthcareitnews.com or the breach reports HHS publishes). Write a 3-sentence summary: what happened, how the attack started, and what the organization could have done differently.",
          "Create a 'Threat Recognition Guide' with two columns: Attack Type and Warning Signs. Fill in rows for: Phishing Email, Vishing Call, Unknown USB Device, Malware Symptoms (strange pop-ups, slow computer, unexpected file changes). Each cell should have 2–3 specific warning signs. The 'Spot the warning signs' game in the lesson is a good warm-up.",
          "Check the defenses on your own Windows computer. Open Windows Security (Start › type Windows Security, or Settings › Privacy & security › Windows Security). Make sure real-time protection is on, run a Quick scan, confirm the firewall is on for every network type, confirm SmartScreen for Microsoft Edge is on under App & browser control, look at Protection history, and check for Windows updates. Take a screenshot of Security at a glance. On a work computer, report anything that is turned off to IT instead of changing it yourself. On a school computer, do this in the Challenge Lab below.",
          "Write a 4-step Security Incident Response Procedure for Lakeside Medical Associates: what to do in the first 5 minutes after suspecting a security incident, formatted as a numbered list clear enough for any staff member to follow.",
          "Combine the summary, threat guide, and incident procedure into a single Word document called 'LMA_CybersecurityAwareness.docx'. Format professionally with Heading styles. Export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your PDF, plus either your Challenge Lab results page (select Print or save results on the lab's finish screen) or your Windows Security screenshot, to your instructor or course folder. The PDF will be evaluated on accuracy (research quality), completeness (all threat types covered), and usability (could a new employee follow the incident response steps on their first day). This document represents the type of security training material a healthcare organization's compliance officer might distribute to all staff.",
      },
    ],
  },

  {
    slug: "password-security-mfa",
    title: "Password Security and Multi-Factor Authentication",
    description:
      "Create strong passwords, manage them without memorizing hundreds of them, and protect every important account with multi-factor authentication or a passkey.",
    duration: "15 min",
    videoUrl: "https://www.youtube.com/embed/2xiQlzISXeM",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A front desk employee at a neighboring clinic used the same password — 'Clinic2023!' — for their work email, the EHR portal, and the insurance billing system. When the insurance company's portal was breached and their password was exposed in the breach data, attackers used it to log into the EHR system and access over 1,000 patient records. This lesson teaches you the specific habits that would have prevented that breach entirely.",
          },
        ],
      },
      {
        heading: "What Makes a Password Strong?",
        blocks: [
          {
            type: "paragraph",
            text: "Strong passwords are difficult for both humans and computers to guess. Understanding what attackers actually do helps you understand what makes a password resistant:",
          },
          {
            type: "list",
            items: [
              "Length is the most important factor — every additional character multiplies the number of possible passwords an attacker has to try, so a 16-character password is vastly harder to crack than an 8-character one. A 20-character password of random lowercase letters is more secure than an 8-character password with symbols. The current guidelines from NIST (the National Institute of Standards and Technology), SP 800-63B-4 published in 2025, say a password that is the only thing protecting an account must be at least 15 characters (at least 8 when the account also uses multi-factor authentication), that systems should allow passwords of at least 64 characters, and that systems must not force a mix of uppercase letters, numbers, and symbols. Length beats complexity.",
              "Avoid predictable patterns — attackers use dictionaries of common and previously breached passwords, plus common substitution patterns (3 for E, @ for A, 0 for O). 'P@ssw0rd' is no more secure than 'Password' to a modern cracking tool that tests all common substitution variants, and NIST has systems reject passwords that appear on those lists. 'Tr0ub4dor&3' is famous for being hard to remember and still easy to crack. 'correct-horse-battery-staple' became famous for showing that several random common words strung together are both more memorable and more secure — but that exact phrase is now on every attacker's list, so choose your own random words.",
              "Never reuse passwords across different accounts — if any one account is breached (as in the scenario above), attackers immediately try your exposed password against every other service using the same username or email. This attack is called credential stuffing and is automated — within minutes of a breach, attackers attempt your exposed credentials against hundreds of sites. A unique password for every account limits breach damage to one account.",
              "Change passwords only when there is reason to — NIST's guidelines say systems should not force password changes on a schedule (every 90 days, for example), because scheduled changes push people toward predictable patterns ('Password1,' 'Password2'). Change a password when you know or suspect it has been compromised, such as after a service you use reports a breach. If your employer still requires scheduled changes, follow its policy.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "Keep it or replace it?",
            prompt: "Drag each password to the right group, using what you just read about length, patterns, and reuse.",
            buckets: [
              { id: "keep", label: "Strong enough to keep" },
              { id: "replace", label: "Replace it" },
            ],
            items: [
              { id: "p1", text: "Clinic2023!", bucket: "replace" },
              { id: "p2", text: "P@ssw0rd", bucket: "replace" },
              { id: "p3", text: "Summer2026", bucket: "replace" },
              { id: "p4", text: "correct-horse-battery-staple", bucket: "replace" },
              { id: "p5", text: "Lakeside1!", bucket: "replace" },
              { id: "p6", text: "A 20-character random password your password manager generated, used only for this account", bucket: "keep" },
              { id: "p7", text: "Five random words you picked yourself, used only for this account", bucket: "keep" },
              { id: "p8", text: "Your long, strong work password, reused for your personal email", bucket: "replace" },
            ],
            explanation:
              "Short passwords, a word plus a year, common substitutions, famous examples, and the name of your workplace are the first things attackers try. Even a strong password becomes weak the moment it is reused. Long and unique wins.",
          },
        ],
      },
      {
        heading: "Password Managers",
        blocks: [
          {
            type: "paragraph",
            text: "The only practical way to have a unique, strong password for every account is to use a password manager — software that generates, stores, and fills in passwords securely:",
          },
          {
            type: "list",
            items: [
              "A password manager stores all your passwords in an encrypted vault protected by one strong master password — you only need to remember one very strong master password, and the password manager handles everything else. Popular options include Bitwarden (free, open source), 1Password (business-focused), and Dashlane. Your IT department may have a specific recommendation or requirement for which password manager to use for work accounts.",
              "Password managers generate strong random passwords for new accounts — when you create a new account, use the password manager's generator to create a random password of 20 or more characters (or a passphrase of five or more random words). You never need to see, type, or remember it — the manager fills it in automatically when you log in. This is the correct solution to the password reuse problem: unique, random passwords for every account, no memorization required.",
              "Browsers have password managers too — Microsoft Edge and Google Chrome can save your passwords and sync them to your account, which is far better than reusing passwords. (Microsoft Authenticator stopped saving and filling in passwords in 2025; Microsoft moved those saved passwords to Microsoft Edge.) On a shared workstation, though, anyone using the same browser profile can use the saved passwords, so do not save work passwords in a shared browser, and follow your IT department's rule about which password manager to use for work accounts.",
              "The master password must be exceptional — since one master password protects all others, make it long (20+ characters), unique (not used anywhere else), and memorable only to you. A passphrase of five or more random words works well: 'purple-telescope-mountain-river-lantern.' Write it on paper and store it in a physically secure location (not a sticky note on your monitor), or use a backup method provided by the password manager.",
            ],
          },
        ],
      },
      {
        heading: "Multi-Factor Authentication (MFA) and Passkeys",
        blocks: [
          {
            type: "paragraph",
            text: "MFA is the single most effective security measure available to an individual user — it means that even if an attacker obtains your password, they still cannot access your account without the second factor:",
          },
          {
            type: "list",
            items: [
              "What counts as MFA: something you know (password) + something you have (phone with an authentication app or SMS code) + something you are (fingerprint or face). Any combination of two or more of these factors is MFA. The most common combination for work accounts is a password plus an authentication app.",
              "Authentication apps (Microsoft Authenticator, Google Authenticator) either send a sign-in request to your phone or show a new 6-digit code every 30 seconds. Microsoft Authenticator uses number matching: when you sign in, the sign-in screen shows a number, and you type that number into the app to approve. Even if an attacker has your password, they cannot finish signing in without your phone. App-based MFA is significantly more secure than codes sent by text message (which can be intercepted through SIM swapping attacks), though SMS MFA is far better than no MFA.",
              "Passkeys are the strongest sign-in most people can use today. A passkey replaces the password with a secret key stored on your phone or computer and unlocked with your fingerprint, face, or PIN. Your browser or phone will only use a passkey on the real website it was created for, so a fake sign-in page cannot trick you into handing it over; that is what security experts mean by phishing-resistant. Many services now offer passkeys. A work or school Microsoft account can add one from the Security info page (+ Add sign-in method › Passkey in Microsoft Authenticator) when the organization allows it.",
              "Enable MFA on every account that offers it — at minimum: your Microsoft 365 work account, any EHR or clinical system, any insurance portal, and any billing system. If a service does not offer MFA, be aware that it is more vulnerable and treat its password accordingly.",
              "MFA fatigue attacks are real — attackers who already have your password trigger sign-in request after sign-in request, hoping you approve one just to make them stop. Number matching makes this harder (you cannot type the right number for a sign-in screen you cannot see), but a sign-in request you did not start is always a warning sign. Deny it, notify IT immediately, and change your password: someone else has it.",
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
            text: "Never share passwords or sign-in codes — not with colleagues, not with supervisors, not with IT support over the phone. If a colleague needs access to a system, request that IT grant them access through the proper account provisioning process. If someone claiming to be IT calls you and asks for your password or a code from your authenticator app to 'fix a problem,' hang up and call IT back using a number you know is real. Legitimate IT staff do not need your password to work on your account — they have administrative access through other means. Password sharing is a policy violation and a security incident at Lakeside Medical Associates.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: In the AI assistant your school or workplace approves (for example, Microsoft 365 Copilot Chat signed in with your work or school account), ask: 'Using NIST's current password guidelines, evaluate these sample passwords and explain why each is strong or weak: (1) Clinic2023! (2) correct-horse-battery-staple-23 (3) P@ssw0rd (4) XkP9#mQ2!vLr7$nB8 (5) my-dogs-name-is-biscuit-born-2019.' Compare the answer with this lesson, and note anything the AI got wrong. Never type a password you actually use into an AI tool, or into any website that offers to rate it.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You receive five Microsoft Authenticator sign-in requests in a row, but you are not signing in to anything. What does this indicate and what should you do?",
            options: [
              "There is a bug in the Authenticator app — restart it",
              "Approve one of them to stop the notifications",
              "An attacker who has your password is attempting an MFA fatigue attack — deny every request, notify IT immediately, and change your password",
              "Your phone is syncing with a new device — approve the first request",
            ],
            correctIndex: 2,
            explanation:
              "A sign-in request only appears after someone enters your password. If it wasn't you, someone else has your password and is hoping you will approve out of habit or frustration. Deny, report, and change the password.",
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Conduct a password security audit and protect a key account with MFA.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List 5 accounts you use regularly (work email, EHR, insurance portal, personal email, a social or professional account). For each, answer: Is the password unique? Is it at least 15 characters? Is MFA (or a passkey) turned on? Create a simple table. Do not record the actual passwords — just rate each one Strong/Weak based on these criteria.",
          "On your own device, go to haveibeenpwned.com and check whether your personal email address appears in any known data breaches. Screenshot the results. If it appears in a breach, change that account's password right away (step 3 shows how to make a strong one).",
          "Use a password manager's generator (Bitwarden's free web vault works in any browser) to create a random password of at least 20 characters, or a passphrase of five or more random words. Screenshot the generator to show it works, and use the result for any account you need to change. Do not submit the password itself.",
          "Add Microsoft Authenticator to your Microsoft 365 work or school account: go to mysignins.microsoft.com/security-info, select + Add sign-in method, choose Microsoft Authenticator, and follow the steps on screen (your organization may also offer Passkey in Microsoft Authenticator). For a personal Microsoft account, go to account.microsoft.com/security › Manage how I sign in › Add a new way to sign in or verify. Screenshot the page that shows Authenticator listed as a method.",
          "On a school computer, do steps 2–4 in the Challenge Lab below. It walks through a breach check, a password generator, a password change, and adding Microsoft Authenticator in a simulated browser, so you never sign in to a real account on a shared machine.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your password audit table plus either your Challenge Lab results page (select Print or save results on the lab's finish screen) or your breach-check, password generator, and Security info screenshots to your instructor or course folder. Do not submit any actual passwords. This audit is the security hygiene review that every healthcare professional should complete when starting a new role.",
      },
    ],
  },

  {
    slug: "phishing-social-engineering",
    title: "Recognizing Phishing and Social Engineering",
    description:
      "Identify phishing emails, suspicious links, and social engineering attempts before they succeed — the single most important skill for preventing security incidents in a medical office.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/7B_mw5tShns",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "You receive an email that appears to be from Microsoft: 'Your Microsoft 365 account has been compromised. Please click here to verify your identity within 24 hours or your account will be suspended.' The email has the Microsoft logo, professional formatting, and a link that reads 'microsoftonline-security.com.' You know something is wrong — this lesson teaches you exactly what to look for, why this is phishing, and what to do with it.",
          },
        ],
      },
      {
        heading: "Anatomy of a Phishing Email",
        blocks: [
          {
            type: "paragraph",
            text: "Phishing emails have consistent characteristics that become easy to spot once you know what to look for. Learning to analyze each element quickly is a skill that protects you every day:",
          },
          {
            type: "list",
            items: [
              "The sender address — look at the actual email address, not just the display name. A phishing email may show 'Microsoft Security Team' as the sender name while the actual address is 'security@microsoft-alerts.biz.' In Outlook, point to or select the sender's name to see the actual address. The domain (@microsoft.com for Microsoft, @hhs.gov for HHS) must match the legitimate organization — not a look-alike.",
              "The link destination — point to any link without clicking to see its actual destination in a tooltip or at the bottom of the window. 'Click here to verify' pointing to 'microsoftonline-security.com' is not a Microsoft address. Real Microsoft sign-in pages are at login.microsoftonline.com (work or school accounts) and login.live.com (personal accounts), and Microsoft 365 apps such as Outlook and Word increasingly run on addresses ending in cloud.microsoft (Microsoft is the only registrant of the .microsoft domain). Check the root domain carefully — attackers use subdomains like 'login.microsoft-account-verify.net' where 'login.microsoft' looks right but the root domain is 'microsoft-account-verify.net.'",
              "Urgency and threats — phishing emails almost always create artificial urgency: 'within 24 hours,' 'account will be suspended,' 'immediate action required,' 'final notice.' Legitimate services do not suspend accounts without significant advance warning through multiple channels. Any email that demands immediate action with threats of account closure, legal action, or financial penalty should be treated as suspicious until verified through an independent channel.",
              "Generic greetings — phishing emails sent to large numbers of people cannot personalize each one. 'Dear Customer,' 'Dear User,' 'Dear Account Holder' in an email supposedly from a service that knows your name is a warning sign. Do not rely on spelling mistakes, though: AI writing tools let attackers send polished, error-free messages, so judge the sender, the link, and the request instead.",
              "Attachments claiming to be invoices, contracts, or important documents — Office for Windows now blocks macros in files that come from the internet by default, so attackers also use other tricks: HTML attachments that open a fake sign-in page, links to a 'shared document' that asks you to sign in, and files that tell you to select Enable Content or Unblock. Never open an attachment from an unexpected email without verifying the sender is legitimate through a separate channel (call the sender, do not reply to the email).",
              "QR codes and text messages — the same tricks arrive as texts (smishing) and as QR codes in an email or on a flyer. A QR code hides its destination until you scan it, and scanning moves you to your phone, away from the work computer's protections. Treat a QR code in an unexpected message exactly like a link.",
            ],
          },
        ],
      },
      {
        heading: "Social Engineering Techniques",
        blocks: [
          {
            type: "paragraph",
            text: "Social engineering is manipulation that exploits human psychology rather than technical vulnerabilities. Understanding the psychological levers attackers pull helps you recognize attempts in real time:",
          },
          {
            type: "list",
            items: [
              "Authority — attackers impersonate authority figures (your CEO, your IT manager, a government official, a physician) to create compliance. 'This is Dr. Walsh — I need you to transfer $500 in gift cards to cover an emergency expense and I'll reimburse you' is a common executive impersonation scam. Real authority figures follow established procedures for financial transactions — they do not ask you to break protocol in an urgent, unverifiable situation.",
              "Scarcity and urgency — creating time pressure prevents you from thinking clearly or verifying the request. 'If you do not provide this information in the next 10 minutes, the account will be deleted permanently' is designed to make you act before you can think. Slow down. Legitimate urgency is almost always verifiable — a real emergency at the clinic does not require you to bypass security procedures.",
              "Reciprocity — attackers provide something (a 'free' software tool, a helpful piece of information, a favor) to create a feeling of obligation. This is less common in email phishing but frequent in phone and chat-based social engineering: 'I noticed a problem with your account and fixed it — I just need your verification code to confirm the fix.' Nothing they 'fixed' requires your password or verification code in return.",
              "Liking and familiarity — attackers research their targets and reference familiar details (your name, your organization, a recent news event about your clinic) to seem trustworthy. A spear phishing email that references a specific provider's name, a recent procedure, or a current patient situation feels legitimate because the details are real. The attacker found this information through public sources, social media, or a prior breach. Familiarity is not verification.",
            ],
          },
        ],
      },
      {
        heading: "What to Do with a Suspicious Email",
        blocks: [
          {
            type: "paragraph",
            text: "The correct response to a suspicious email depends on what type of suspicion you have and how the email appears:",
          },
          {
            type: "list",
            items: [
              "Do not click, reply, or forward a suspicious email to coworkers — any of these actions can trigger malware, confirm your email address is active (making you a better phishing target in the future), or spread the phishing email to your colleagues.",
              "Report it to IT using your organization's reporting tool — in Outlook (the new Outlook, classic Outlook, and Outlook on the web), select the message, then Report › Report phishing. Your IT department may also provide its own reporting button. Alternatively, forward the email as an attachment (not inline) to your IT security contact. Reporting suspicious emails helps IT block the sender, warn others, and track attack campaigns targeting your organization.",
              "Verify through an independent channel if you are uncertain — if an email claiming to be from Microsoft says your account is compromised, do not click the link in the email. Open a browser tab and type an address you know yourself (myaccount.microsoft.com for a work or school account, account.microsoft.com for a personal one) to check your account. If an email claiming to be from a vendor asks you to pay an invoice, call the vendor using a number from their official website (not from the email) to verify.",
              "Delete confirmed phishing emails after reporting — once you have reported a phishing email to IT, delete it from your inbox (reporting it in Outlook usually moves it out of your inbox for you). Do not leave suspicious emails where they might be accidentally opened later.",
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
            text: "If you are ever asked to click a link, open an attachment, or provide credentials in an email and you feel uncertain — trust that uncertainty. The cost of pausing to verify is zero. The cost of a phishing click that leads to a ransomware infection at Lakeside Medical Associates could shut down the clinic for days and expose thousands of patient records. When you receive a suspicious email, you are literally the last line of defense between the attacker and the clinic's data. That responsibility matters — and so does your judgment.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: In the AI assistant your school or workplace approves (for example, Microsoft 365 Copilot Chat signed in with your work or school account), ask: 'Write three realistic but clearly fictional phishing email examples targeting a medical office front desk assistant. Each should use a different social engineering technique (urgency, authority, and familiarity). After each email, explain exactly which elements identify it as phishing and what the staff member should do.' Use these examples to practice identifying phishing indicators before encountering real ones, and check the AI's explanations against this lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You receive an email that appears to be from your IT department saying your password expires today and to click a link immediately. What is your first step?",
            options: [
              "Click the link and change your password immediately to prevent account lockout",
              "Reply to the email asking if it is legitimate",
              "Do not click the link — go to your organization's IT portal directly or call IT using a number from the official company directory to verify",
              "Forward the email to all colleagues to warn them",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Develop your phishing analysis skills with these exercises.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Analyze the following email excerpt and identify at least 5 phishing indicators: 'From: security@microsoft-365-account.net | Subject: URGENT: Your Account Will Be Suspended | Dear Microsoft User, We detected suspicious activity on your account. You must verify your identity by clicking the button below within 24 hours. Failure to do so will result in permanent account closure. [VERIFY NOW] This message was sent to ensure account security.' Write each indicator as a one-sentence explanation. To see this message the way it would arrive, open it in the Outlook Challenge Lab below, check the sender's real address and where the button really goes, then forward it to IT and report it.",
          "Play the 'Phishing or legitimate?' game below: sort all eight messages, then select Check. Write down your first score and which messages fooled you, and why.",
          "Write a one-page Phishing Recognition Guide for Lakeside Medical Associates new staff covering: 5 warning signs of a phishing email, 3 social engineering techniques to watch for, and a 3-step response procedure. Save it as 'LMA_PhishingGuide.docx' and export it as a PDF.",
          "Role-play with a classmate or supervisor: one person calls the other pretending to be IT and asks for a password, verification code, or remote access. The receiver should practice recognizing the social engineering attempt and responding correctly (refuse and verify through official channels). No partner? Do the role-play in the Teams Challenge Lab below, where someone posing as IT messages you. Write a 2-sentence reflection on what felt difficult about resisting the request.",
        ],
      },
      {
        type: "drag-drop",
        mode: "sort",
        title: "Phishing or legitimate?",
        prompt: "Drag each message to Phishing or Legitimate. Look at who sent it, what it asks you to do, and whether you expected it.",
        buckets: [
          { id: "phish", label: "Phishing" },
          { id: "legit", label: "Legitimate" },
        ],
        items: [
          { id: "m1", text: "'Microsoft 365' <no-reply@microsoft365-mailbox-renewal.net>: 'Your mailbox is full. Sign in within 12 hours to keep receiving email.'", bucket: "phish" },
          { id: "m2", text: "Your practice manager, from her usual work address, to all staff: 'Reminder: staff meeting Thursday at 8:00 AM in the break room.' No links or attachments.", bucket: "legit" },
          { id: "m3", text: "A text claiming to be from a delivery company: 'Your package is on hold. Pay a $1.99 redelivery fee at the link below.'", bucket: "phish" },
          { id: "m4", text: "'Dr. Walsh,' writing from a personal email address: 'I'm stuck in a meeting. Buy five gift cards for the staff and send me the codes. Don't call.'", bucket: "phish" },
          { id: "m5", text: "A password reset email that arrives seconds after you selected Forgot password yourself on the vendor's real website.", bucket: "legit" },
          { id: "m6", text: "An email with a QR code: 'Scan to confirm your direct deposit details before payroll runs.'", bucket: "phish" },
          { id: "m7", text: "'Your HIPAA compliance certificate expires today. Open the attached HTML file to renew it.'", bucket: "phish" },
          { id: "m8", text: "A meeting invitation from the coworker who sits next to you, for the meeting the two of you planned this morning.", bucket: "legit" },
        ],
        explanation:
          "The phishing messages all pair pressure (a deadline, a secret, an emergency) with a request for a click, a sign-in, a code, or money, and most come from an address that doesn't fit. The legitimate ones are expected, come from addresses you know, and ask for nothing risky.",
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your 5-indicator analysis, your sorting-game score with the messages that fooled you, your LMA Phishing Guide PDF, and your reflection to your instructor or course folder. If you used the Challenge Labs, add their results pages (select Print or save results on each lab's finish screen). The game shows your recognition ability today; the guide shows your ability to train others — both are valuable skills in a healthcare security environment.",
      },
    ],
  },

  {
    slug: "hipaa-data-security",
    title: "Data Security in a Medical Office (HIPAA)",
    description:
      "Understand HIPAA's data security requirements as they apply to your daily work — and develop the habits that protect patient privacy and keep the practice compliant.",
    duration: "20 min",
    videoUrl: "https://www.youtube.com/embed/Epteg96JgLw",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "During a busy Friday afternoon at Lakeside Medical Associates, a front desk employee helps a patient fill out intake paperwork at the counter. The patient's paper form with their name, date of birth, insurance number, and reason for visit is visible to other patients waiting nearby. Later, the same employee emails the patient's lab results to the wrong address because autocomplete suggested the wrong 'Smith.' Both incidents are potential HIPAA violations — and both are completely preventable with the habits you will learn in this lesson.",
          },
        ],
      },
      {
        heading: "HIPAA Basics Every Staff Member Must Know",
        blocks: [
          {
            type: "paragraph",
            text: "HIPAA (the Health Insurance Portability and Accountability Act) establishes federal standards for protecting patient health information. You do not need to be a compliance officer to understand the core obligations that apply to your role:",
          },
          {
            type: "list",
            items: [
              "Protected Health Information (PHI) is any information that can identify a patient and relates to their health condition, treatment, or payment for treatment. PHI includes: names combined with health information, addresses, dates (including birth dates), phone and fax numbers, email addresses, Social Security numbers, medical record numbers, insurance ID numbers, photographs, and any other unique identifiers. The key test: could this information identify a specific patient? If yes, treat it as PHI.",
              "The Minimum Necessary Standard requires that you access, use, and disclose only the minimum amount of PHI needed to accomplish the task — a billing staff member processing an insurance claim needs the diagnosis and insurance ID, not the patient's full medical history. If your job does not require access to certain patient information, do not access it out of curiosity, even if you technically have system access to do so. Accessing a patient record without a work reason — even a neighbor or celebrity — is a HIPAA violation.",
              "Patients have the right to their records — HIPAA gives patients the right to access and receive copies of their own health records, and the practice must act on a request within 30 days (it may take one 30-day extension if it tells the patient in writing why and when). Your practice should have a defined Records Request procedure. If a patient asks for their records, follow that procedure rather than handling it informally — the timing, format, and verification requirements are part of compliance.",
              "HIPAA violations have real consequences — civil penalties come in four tiers based on how culpable the organization was, and HHS adjusts them for inflation every year. After the January 2026 adjustment they range from $145 to $73,011 per violation, up to $2,190,294 per year for violations of the same requirement (HHS currently applies lower yearly caps to the less serious tiers). Criminal penalties apply to anyone, including an individual employee, who knowingly obtains or discloses patient information without authorization, and staff who break privacy policies face discipline up to and including termination.",
            ],
          },
          {
            type: "drag-drop",
            mode: "sort",
            title: "PHI or not?",
            prompt: "Drag each item to the right group. Ask: could this identify a specific patient, and does it relate to their health, care, or payment?",
            buckets: [
              { id: "phi", label: "PHI: protect it" },
              { id: "not", label: "Not PHI" },
            ],
            items: [
              { id: "h1", text: "A patient's name on today's appointment list", bucket: "phi" },
              { id: "h2", text: "An insurance member ID number", bucket: "phi" },
              { id: "h3", text: "A voicemail confirming Ms. Lee's MRI appointment", bucket: "phi" },
              { id: "h4", text: "A photo of a patient taken at check-in", bucket: "phi" },
              { id: "h5", text: "A date of birth on a sticky note next to a chart number", bucket: "phi" },
              { id: "h6", text: "The practice's public phone number and office hours", bucket: "not" },
              { id: "h7", text: "A count of flu shots given this week, with no patient details", bucket: "not" },
              { id: "h8", text: "The front desk staff's work schedule", bucket: "not" },
            ],
            explanation:
              "PHI is anything that ties an identifiable patient to their health, care, or payment, in any form: paper, screen, voice, or photo. Information about the practice itself, or totals with no patient details, is not PHI.",
          },
        ],
      },
      {
        heading: "Physical and Digital PHI Protection",
        blocks: [
          {
            type: "paragraph",
            text: "PHI protection applies equally to paper records, computer screens, verbal communication, and digital files. Every medium requires specific protective behaviors:",
          },
          {
            type: "list",
            items: [
              "Screen privacy — position your monitor so that patients in the waiting room or at the counter cannot read the screen. Use a privacy screen filter if your workstation faces a public area. Lock your screen (Windows+L) whenever you step away, even briefly. A patient's name and appointment information visible to other patients in the waiting room is a privacy violation.",
              "Paper PHI — print only what is necessary and retrieve printed PHI from the printer promptly — a patient's intake form or lab result left in the printer tray can be seen by anyone who walks by. Shred all paper PHI rather than placing it in a recycling bin. Post-it notes with patient names or appointment details should be secured or shredded, not stuck to a monitor or left on a desk.",
              "Verbal communication — be mindful of conversations about patients in areas where others can hear: the waiting room, hallways, and shared spaces. When calling a patient, use their name only in private or confirm their identity first without speaking their medical information publicly: 'Can you confirm your date of birth?' is better than loudly asking 'Are you the patient here about your [condition]?' in a crowded waiting room.",
              "Email and electronic messaging — as covered in Module 4, standard email is not HIPAA-compliant for sending PHI without specific security measures. Use your practice's designated secure messaging system for electronic PHI transmission. Before clicking Send on any email with patient information, verify the recipient address character by character.",
              "AI tools — never paste patient information into an AI chatbot or other online tool your practice has not approved for PHI. A vendor that handles PHI for the practice must sign a business associate agreement first, and a free consumer tool has not.",
            ],
          },
          {
            type: "callout",
            variant: "info",
            text: "The rules are still evolving. In January 2025, HHS proposed a major update to the HIPAA Security Rule that would make safeguards such as multi-factor authentication and encryption explicit requirements. It was not final when this lesson was last updated. Your practice's Privacy or Security Officer will tell you if and when it changes your daily work.",
          },
        ],
      },
      {
        heading: "Breach Response and Reporting",
        blocks: [
          {
            type: "paragraph",
            text: "Despite best efforts, breaches occur. Your response to a potential breach — how fast you act, how accurately you document, and how honestly you report — significantly affects the outcome:",
          },
          {
            type: "list",
            items: [
              "A breach is any use or disclosure of PHI that is not permitted under HIPAA — this includes sending a patient record to the wrong person, losing a device containing PHI, a ransomware attack that encrypts patient records, and even a staff member inappropriately viewing a patient record out of curiosity. Not every breach results in harm, but all must be assessed and documented.",
              "Report suspected breaches immediately to your supervisor — HIPAA requires that covered entities have a breach notification procedure, and that procedure begins with internal reporting. Do not attempt to handle a suspected breach alone or without notifying supervisors. The risk of an unnoticed or unreported breach is greater than the discomfort of reporting one.",
              "Document what you know — time, date, what PHI was involved, who was affected, how the disclosure occurred, and what steps have been taken. Written documentation from the first moments of the incident provides the foundation for the required breach risk assessment that your practice's Privacy Officer must complete.",
              "Understand that your role is to report, not investigate — the breach response process is managed by the practice's Privacy Officer and/or IT team. Your job is to identify the incident, stop any ongoing disclosure if possible (close the wrong email before sending, retrieve a document left in a public area), report immediately, and document accurately. Let the designated responders take it from there.",
            ],
          },
          {
            type: "drag-drop",
            mode: "order",
            title: "Put the breach response in order",
            prompt: "You just realized a patient's lab results went to the wrong email address. Drag the steps into the order they should happen.",
            items: [
              { id: "b1", text: "Stop any further disclosure you can (for example, ask the wrong recipient to delete the message)" },
              { id: "b2", text: "Report it to your supervisor right away" },
              { id: "b3", text: "Write down what happened: the time, what PHI was involved, who received it, and how" },
              { id: "b4", text: "The Privacy Officer completes the breach risk assessment" },
              { id: "b5", text: "If notification is required, the practice notifies the patient within 60 days of discovering the breach" },
            ],
            explanation:
              "Contain, report, document, then let the Privacy Officer lead. Your part is the first three steps, done quickly and honestly; the assessment and any required notices belong to the practice.",
          },
        ],
      },
      {
        heading: "Responsible Use",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            text: "HIPAA compliance is not a bureaucratic requirement — it exists to protect real people's most sensitive information. Your patients trust Lakeside Medical Associates with the details of their health conditions, medications, mental health history, and financial information. That trust is what makes healthcare work. Every HIPAA protection you follow is a promise kept to the patients who depend on the practice for their care. When the rules feel burdensome, remember what they protect — and why it matters.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: In the AI assistant your school or workplace approves (for example, Microsoft 365 Copilot Chat signed in with your work or school account), ask: 'Create a HIPAA Privacy Quick Reference card for medical office front desk staff. Include: a simple definition of PHI with examples, the 5 most common front desk HIPAA mistakes and how to avoid them, what to do if you accidentally share patient information with the wrong person, and the internal reporting steps for a potential breach. Keep each item to 2–3 sentences and format for printing on one page.' Do not include any real patient details in your prompt. Check every rule in the output against this lesson (deadlines and penalty amounts are where AI answers most often go wrong), then customize it for your practice. No AI assistant on your school computer? Do this in the Copilot practice simulation below.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A patient asks you to email their lab results to them. The email they give you does not match what is in the system. What should you do?",
            options: [
              "Send to the email they provided — they know their own email address",
              "Verify their identity, confirm the correct email address through your system, and send through your organization's secure messaging channel (not standard email) — or offer another delivery method",
              "Print the results and give them at the counter instead without confirming anything",
              "Tell them lab results cannot be shared by any method",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Develop a HIPAA awareness training resource for Lakeside Medical Associates new hires.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Identify three potential HIPAA risk scenarios in your own front desk workflow (or in the scenarios described in this module). For each scenario, describe: the risk, what HIPAA rule it relates to, and the correct prevention step. Format as a 3-row table.",
          "Write a HIPAA Privacy Checklist for Front Desk Staff with 10 specific daily habits (one sentence each) that prevent the most common PHI exposure scenarios. This should be actionable and specific — not just 'protect patient information' but 'shred all printed patient documents rather than placing them in the recycling bin.'",
          "Draft a Breach Response Quick Reference for Lakeside Medical Associates: a 5-step numbered procedure for what to do in the first 30 minutes after discovering a potential PHI breach. Write it clearly enough for a first-day employee to follow under stress.",
          "Combine all three deliverables into a single Word document called 'LMA_HIPAATraining_FrontDesk.docx'. Apply Heading styles for each section, use consistent formatting, and export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your HIPAA Training PDF to your instructor or course folder. It will be evaluated on accuracy (correct HIPAA concepts), specificity (actionable enough for a new hire to follow), and completeness (all three components present). This document represents the kind of training resource that a medical practice's Privacy Officer would actually distribute to new staff — and completing it demonstrates that you have internalized HIPAA requirements at a professional level.",
      },
    ],
  },
];
