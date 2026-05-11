import { Lesson } from "@/types/lesson";

export const module8Lessons: Lesson[] = [
  {
    slug: "cybersecurity-threats",
    title: "Understanding Cybersecurity Threats",
    description:
      "Recognize the most common digital threats targeting office workers and healthcare organizations — so you can identify them before they cause harm.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Healthcare organizations are the most targeted sector for cyberattacks — they hold valuable patient data, have high urgency operational needs (making them likely to pay ransoms quickly), and often have staff who have not received security training. Lakeside Medical Associates experienced a near-miss phishing attack last year. This module ensures you understand how to recognize and avoid the threats that are specifically aimed at offices like yours.",
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
              "Ransomware is a particularly damaging form of malware — it encrypts all files on an infected computer and any network drives it can reach, then demands payment (usually in cryptocurrency) to provide the decryption key. Healthcare ransomware attacks have shut down hospitals for weeks, delayed patient care, and cost millions of dollars. In 2023, ransomware attacks on healthcare organizations in the US averaged over $1 million in ransom demands and significantly more in recovery costs. Backups are the primary defense — ransomware cannot encrypt files that are properly backed up offline or in cloud storage with version history.",
              "Data breaches occur when unauthorized parties gain access to protected information — in healthcare, this typically means patient PHI (names, diagnoses, insurance information, medical records). Breaches may result from malware, stolen credentials, lost devices, or unauthorized insider access. HIPAA requires healthcare organizations to notify affected patients and the Department of Health and Human Services within 60 days of discovering a breach affecting 500 or more individuals.",
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
              "USB drops — attackers leave infected USB drives in parking lots, waiting rooms, or mail them to offices labeled 'Payroll Data' or 'Important Records.' When plugged in out of curiosity, the USB installs malware automatically. Never plug an unknown USB drive into a work computer. Report any unexplained USB drives found in or near the office to IT without plugging them in.",
            ],
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
            text: "AI Task: Ask ChatGPT — 'Describe five real-world cyberattacks that targeted healthcare organizations in the past three years, including what happened, how the attacker got in, and what the organization could have done to prevent it. Focus on attacks that front desk staff could have helped prevent through better security habits.' Review the cases and identify which attack vectors are relevant to your daily work.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You find a USB drive in the clinic parking lot labeled 'Staff Payroll Q1 2025.' What should you do?",
            options: [
              "Plug it in to your workstation to check if it contains real payroll data",
              "Take it home to check on a personal computer so it cannot harm the clinic",
              "Report it to IT without plugging it in — it may be a USB drop attack",
              "Leave it where it is — it is not your responsibility",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Build a Cybersecurity Threat Awareness Guide for Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Research one real ransomware attack on a healthcare organization (use news sources like healthcareitnews.com or hhs.gov breach reports). Write a 3-sentence summary: what happened, how the attack started, and what the organization could have done differently.",
          "Create a 'Threat Recognition Guide' with two columns: Attack Type and Warning Signs. Fill in rows for: Phishing Email, Vishing Call, Unknown USB Device, Malware Symptoms (strange pop-ups, slow computer, unexpected file changes). Each cell should have 2–3 specific warning signs.",
          "Write a 4-step Security Incident Response Procedure for Lakeside Medical Associates: what to do in the first 5 minutes after suspecting a security incident, formatted as a numbered list clear enough for any staff member to follow.",
          "Combine the summary, threat guide, and incident procedure into a single Word document called 'LMA_CybersecurityAwareness_2025-05.docx'. Format professionally with Heading styles. Export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your PDF to your instructor. It will be evaluated on accuracy (research quality), completeness (all threat types covered), and usability (could a new employee follow the incident response steps on their first day). This document represents the type of security training material a healthcare organization's compliance officer might distribute to all staff.",
      },
    ],
  },

  {
    slug: "password-security-mfa",
    title: "Password Security and Multi-Factor Authentication",
    description:
      "Create strong, unbreakable passwords, manage them without memorizing hundreds of them, and enable multi-factor authentication across every important account.",
    duration: "15 min",
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
              "Length is the most important factor — a 16-character password is exponentially harder to crack than an 8-character password, regardless of complexity. Every additional character multiplies the possible combinations by the number of characters in the set. A 20-character password of random lowercase letters is more secure than an 8-character password with symbols. Current recommendations from NIST (the National Institute of Standards and Technology) prioritize length over mandatory complexity rules.",
              "Avoid predictable patterns — attackers use dictionaries of common passwords and common substitution patterns (3 for E, @ for A, 0 for O). 'P@ssw0rd' is no more secure than 'Password' to a modern cracking tool that tests all common substitution variants. 'Tr0ub4dor&3' is famous for being highly memorable to the person who invented it but still vulnerable. 'correct-horse-battery-staple' (random common words strung together) is both more memorable and more secure.",
              "Never reuse passwords across different accounts — if any one account is breached (as in the scenario above), attackers immediately try your exposed password against every other service using the same username or email. This attack is called credential stuffing and is automated — within minutes of a breach, attackers attempt your exposed credentials against hundreds of sites. A unique password for every account limits breach damage to one account.",
              "Change passwords only when there is reason to — contrary to outdated guidance, changing passwords on an arbitrary schedule (every 90 days) without a specific reason leads staff to create predictable passwords (adding a number at the end each quarter: 'Password1,' 'Password2'). The current guidance is: use a strong, unique password and only change it when you know or suspect it has been compromised, or after a service you use reports a breach.",
            ],
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
              "Password managers generate strong random passwords for new accounts — when you create a new account, click the password manager's generator to create a 20-character random password. You never need to see, type, or remember it — the manager fills it in automatically when you log in. This is the correct solution to the password reuse problem: unique, random passwords for every account, no memorization required.",
              "Never store passwords in a browser if a password manager is available — browser-built-in password managers are convenient but less secure than dedicated password managers. On shared workstations, browser-stored passwords are accessible to anyone who uses the browser on that computer. Use a dedicated password manager instead.",
              "The master password must be exceptional — since one master password protects all others, make it long (20+ characters), unique (not used anywhere else), and memorable only to you. A passphrase of four or more random words works well: 'purple-telescope-mountain-river-2025.' Write it on paper and store it in a physically secure location (not a sticky note on your monitor), or use a backup method provided by the password manager.",
            ],
          },
        ],
      },
      {
        heading: "Multi-Factor Authentication (MFA)",
        blocks: [
          {
            type: "paragraph",
            text: "MFA is the single most effective security measure available to an individual user — it means that even if an attacker obtains your password, they still cannot access your account without the second factor:",
          },
          {
            type: "list",
            items: [
              "What counts as MFA: something you know (password) + something you have (phone with an authentication app or SMS code) + something you are (fingerprint or face). Any combination of two or more of these factors is MFA. The most common combination for work accounts is password + authentication app code.",
              "Authentication apps (Microsoft Authenticator, Google Authenticator, Authy) generate a new 6-digit code every 30 seconds — when logging in, you enter your password and then the current code from the app. Even if an attacker has your password, they cannot log in without access to your physical phone. This is significantly more secure than SMS codes (which can be intercepted via SIM swapping attacks), though SMS MFA is far better than no MFA.",
              "Enable MFA on every account that offers it — at minimum: your Microsoft 365 work account, any EHR or clinical system, any insurance portal, and any billing system. If a service does not offer MFA, be aware that it is more vulnerable and treat its password accordingly.",
              "MFA fatigue attacks are real — attackers who have your password can flood you with MFA approval requests (push notifications from the authenticator app) hoping you accidentally approve one. If you receive unexpected MFA prompts you did not initiate — especially multiple in a row — deny them all, notify IT immediately, and change your password. You did not forget logging in; someone else is trying to.",
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
            text: "Never share passwords — not with colleagues, not with supervisors, not with IT support over the phone. If a colleague needs access to a system, request that IT grant them access through the proper account provisioning process. If someone claiming to be IT calls you and asks for your password to 'fix a problem,' hang up and call IT back using a number you know is real. Legitimate IT staff do not need your password to work on your account — they have administrative access through other means. Password sharing is a policy violation and a security incident at Lakeside Medical Associates.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Evaluate the strength of these passwords and explain why each is strong or weak: (1) Clinic2023! (2) correct-horse-battery-staple-23 (3) P@ssw0rd (4) XkP9#mQ2!vLr7$nB8 (5) my-dogs-name-is-biscuit-born-2019. Then recommend which password manager I should use for a healthcare organization and why.' Use the evaluation to audit your own current passwords.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "You receive five consecutive Microsoft Authenticator push notifications asking you to approve a sign-in, but you are not logging into anything. What does this indicate and what should you do?",
            options: [
              "There is a bug in the Authenticator app — restart it",
              "Approve one of them to stop the notifications",
              "An attacker who has your password is attempting an MFA fatigue attack — deny all prompts, notify IT immediately, and change your password",
              "Your phone is syncing with a new device — approve the first request",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Conduct a password security audit and implement MFA on a key account.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "List 5 accounts you use regularly (work email, EHR, insurance portal, personal email, a social or professional account). For each, answer: Is the password unique? Is it 12+ characters? Is MFA enabled? Create a simple table. Do not record the actual passwords — just rate them Strong/Weak based on these criteria.",
          "Go to haveibeenpwned.com and check whether your personal email address appears in any known data breaches. Screenshot the results. If it appears in a breach, change the password for that email immediately.",
          "Enable MFA on your Microsoft 365 work account (if not already enabled): go to office.com > Account Settings > Security Info > Add method > Authenticator App. Follow the setup steps. Screenshot the Security Info page showing the Authenticator App listed as a method.",
          "Research one free password manager (Bitwarden is recommended). Install it or sign up for the web version. Generate a new random 20-character password using the generator tool. Screenshot the generated password (it will be replaced in a moment — screenshot just to confirm the tool works, then discard this test password).",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your password audit table, haveibeenpwned screenshot, MFA enrollment screenshot, and password generator screenshot to your instructor. Do not submit any actual passwords. This audit is the security hygiene review that every healthcare professional should complete when starting a new role.",
      },
    ],
  },

  {
    slug: "phishing-social-engineering",
    title: "Recognizing Phishing and Social Engineering",
    description:
      "Identify phishing emails, suspicious links, and social engineering attempts before they succeed — the single most important skill for preventing security incidents in a medical office.",
    duration: "20 min",
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
              "The sender address — look at the actual email address, not just the display name. A phishing email may show 'Microsoft Security Team' as the sender name while the actual address is 'security@microsoft-alerts.biz.' In Outlook, hover over the sender name to see the actual address, or click the sender name to expand it. The domain (@microsoft.com for Microsoft, @hhs.gov for HHS) must match the legitimate organization — not a look-alike.",
              "The link destination — hover over any link without clicking to see its actual destination URL in the bottom of the browser or in a tooltip. 'Click here to verify' pointing to 'microsoftonline-security.com' is not a Microsoft URL. A real Microsoft link goes to microsoft.com or microsoftonline.com (the real Office 365 domain). Check the root domain carefully — attackers use subdomains like 'login.microsoft-account-verify.net' where 'login.microsoft' looks right but the root domain is 'microsoft-account-verify.net.'",
              "Urgency and threats — phishing emails almost always create artificial urgency: 'within 24 hours,' 'account will be suspended,' 'immediate action required,' 'final notice.' Legitimate services do not suspend accounts without significant advance warning through multiple channels. Any email that demands immediate action with threats of account closure, legal action, or financial penalty should be treated as suspicious until verified through an independent channel.",
              "Generic greetings — phishing emails sent to large numbers of people cannot personalize each one. 'Dear Customer,' 'Dear User,' 'Dear Account Holder' in an email supposedly from a service that knows your name is a warning sign. Your actual bank, Microsoft, or health insurance company knows your name and uses it.",
              "Attachments claiming to be invoices, contracts, or important documents — fake invoice PDFs and Word documents (.doc files with macros enabled) are the most common malware delivery method in phishing campaigns. Never open an attachment from an unexpected email without verifying the sender is legitimate through a separate channel (call the sender, do not reply to the email).",
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
              "Reciprocity — attackers provide something (a 'free' software tool, a helpful piece of information, a favor) to create a feeling of obligation. This is less common in email phishing but frequent in phone-based social engineering: 'I noticed a problem with your account and fixed it — I just need your verification code to confirm the fix.' Nothing they 'fixed' requires your password or verification code in return.",
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
              "Do not click, reply, or forward a suspicious email — any of these actions can trigger malware, confirm your email address is active (making you a better phishing target in the future), or spread the phishing email to your colleagues.",
              "Report it to IT using your organization's reporting mechanism — in Outlook, there may be a 'Report Phishing' or 'Report Junk' button added by your IT department. Alternatively, forward the email as an attachment (not inline) to your IT security contact. Reporting suspicious emails helps IT block the sender, warn others, and track attack campaigns targeting your organization.",
              "Verify through an independent channel if you are uncertain — if an email claiming to be from Microsoft says your account is compromised, do not click the link in the email. Open a browser tab and go to account.microsoft.com directly to check your account status. If an email claiming to be from a vendor asks you to pay an invoice, call the vendor using a number from their official website (not from the email) to verify.",
              "Delete confirmed phishing emails after reporting — once you have reported a phishing email to IT, delete it from your inbox. Do not leave suspicious emails in your inbox where they might be accidentally opened later.",
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
            text: "AI Task: Ask ChatGPT — 'Write three realistic phishing email examples targeting a medical office front desk assistant. Each should use a different social engineering technique (urgency, authority, and familiarity). After each email, explain exactly which elements identify it as phishing and what the staff member should do.' Use these examples to practice identifying phishing indicators before encountering real ones.",
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
          "Analyze the following email excerpt and identify at least 5 phishing indicators: 'From: security@microsoft-365-account.net | Subject: URGENT: Your Account Will Be Suspended | Dear Microsoft User, We detected suspicious activity on your account. You must verify your identity by clicking the button below within 24 hours. Failure to do so will result in permanent account closure. [VERIFY NOW] This message was sent to ensure account security.' Write each indicator as a one-sentence explanation.",
          "Visit the Google Phishing Quiz (phishingquiz.withgoogle.com) and complete the 8-question exercise. Screenshot your final score.",
          "Write a one-page Phishing Recognition Guide for Lakeside Medical Associates new staff covering: 5 warning signs of a phishing email, 3 social engineering techniques to watch for, and a 3-step response procedure. Save as 'LMA_PhishingGuide_2025-05.docx'.",
          "Role-play with a classmate or supervisor: one person calls the other pretending to be IT and asks for a password, verification code, or remote access. The receiver should practice recognizing the social engineering attempt and responding correctly (refuse and verify through official channels). Write a 2-sentence reflection on what felt difficult about resisting the request.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your 5 phishing indicator analysis, Google Phishing Quiz screenshot, LMA Phishing Guide PDF, and reflection to your instructor. The quiz score demonstrates your recognition ability today; the guide demonstrates your ability to train others — both are valuable skills in a healthcare security environment.",
      },
    ],
  },

  {
    slug: "hipaa-data-security",
    title: "Data Security in a Medical Office (HIPAA)",
    description:
      "Understand HIPAA's data security requirements as they apply to your daily work — and develop the habits that protect patient privacy and keep the practice compliant.",
    duration: "20 min",
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
              "Patients have the right to their records — HIPAA gives patients the right to access and receive copies of their own health records within 30 days of a request. Your practice should have a defined Records Request procedure. If a patient asks for their records, follow that procedure rather than handling it informally — the timing, format, and verification requirements are part of compliance.",
              "HIPAA violations have real consequences — civil penalties for HIPAA violations range from $100 to $50,000 per violation depending on culpability and harm, with an annual cap of $1.9 million per violation category. Criminal violations (willful disclosure of PHI for personal gain) can result in federal criminal charges. Staff who commit HIPAA violations can be personally liable even when acting in the scope of employment.",
            ],
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
            ],
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
            text: "AI Task: Ask ChatGPT — 'Create a HIPAA Privacy Quick Reference card for medical office front desk staff. Include: a simple definition of PHI with examples, the 5 most common front desk HIPAA mistakes and how to avoid them, what to do if you accidentally share patient information with the wrong person, and the internal reporting steps for a potential breach. Keep each item to 2–3 sentences and format for printing on one page.' Review and customize the output for your specific practice.",
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
          "Combine all three deliverables into a single Word document called 'LMA_HIPAATraining_FrontDesk_2025-05.docx'. Apply Heading styles for each section, use consistent formatting, and export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your HIPAA Training PDF to your instructor. It will be evaluated on accuracy (correct HIPAA concepts), specificity (actionable enough for a new hire to follow), and completeness (all three components present). This document represents the kind of training resource that a medical practice's Privacy Officer would actually distribute to new staff — and completing it demonstrates that you have internalized HIPAA requirements at a professional level.",
      },
    ],
  },
];
