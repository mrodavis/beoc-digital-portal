import { Lesson } from "@/types/lesson";

export const module5Lessons: Lesson[] = [
  {
    slug: "data-validation-rules",
    title: "Data Validation Rules in Access",
    description:
      "Set up validation rules that prevent common data entry errors — enforcing correct date formats, value ranges, required fields, and consistent text patterns.",
    duration: "18 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Six months after going live, the Access database at Lakeside Medical Associates has developed three recurring problems: the Date of Birth field contains entries like '01-15-1990', '1/15/90', and 'January 15 1990' — all meaning the same date but stored inconsistently. The InsurancePlan field has 'BlueCross', 'Blue Cross', 'BCBS', and 'BC/BS' all referring to the same plan. And several appointment records have a blank PatientID field, making them impossible to link to a patient. This lesson shows you how to lock down the database so these errors cannot happen in the first place.",
          },
        ],
      },
      {
        heading: "Types of Validation in Access",
        blocks: [
          {
            type: "paragraph",
            text: "Access provides three levels of data validation, each catching a different class of error:",
          },
          {
            type: "list",
            items: [
              "Field-level data type enforcement: When you set a field's data type (Date/Time, Number, Currency, Yes/No), Access automatically rejects values that do not match. A Date/Time field will not accept 'January 15 1990' — Access requires it to be entered in a recognized date format and stores it internally in a consistent way regardless of how it was typed.",
              "Field-level Validation Rule: A rule you write in Table Design View that restricts what values are acceptable. For example, a Validation Rule of >=Date() on an AppointmentDate field prevents staff from entering past dates when scheduling future appointments. A rule of Between 1 And 120 on an Age field prevents impossible age values.",
              "Required fields: Setting a field's Required property to Yes in Table Design View means Access will refuse to save the record until that field has a value. PatientID on the Appointments table should be Required — no appointment should exist without a patient linked to it.",
              "Lookup / Combo Box in forms: Replacing a free-text field with a combo box (dropdown) in a Form is the most effective way to enforce consistency — staff pick from a list of valid values instead of typing. This eliminates the BlueCross vs. Blue Cross vs. BCBS problem entirely.",
            ],
          },
        ],
      },
      {
        heading: "Setting a Validation Rule in Table Design View",
        blocks: [
          {
            type: "paragraph",
            text: "Validation rules are set at the table level in Design View, which means they apply regardless of whether data is entered through a form or directly into the table:",
          },
          {
            type: "list",
            items: [
              "Open the table in Design View: Right-click the table in the Navigation Pane and choose Design View. You see the list of fields with their data types.",
              "Select the field you want to validate: Click on the row for the field — for example, DateOfBirth.",
              "In the Field Properties panel at the bottom, find the Validation Rule row: Type the rule. For DateOfBirth, a reasonable rule is <=Date() (date of birth must be today or in the past — a patient cannot be born in the future). For an InsurancePlan field that must be one of three values: 'BlueCross' Or 'Aetna' Or 'Medicare'.",
              "Set the Validation Text: In the Validation Text row below Validation Rule, type the message Access should show when the rule is violated. Make it clear and helpful: 'Date of birth must be a past date. Please check the entry.' Staff will see this message in a popup dialog if they enter an invalid value.",
              "Save and test: Press Ctrl+S to save the table design. Access warns that the new rule will be checked against all existing records — click Yes. Then open the table in Datasheet View and try to enter an invalid value to confirm the rule and message work correctly.",
            ],
          },
        ],
      },
      {
        heading: "Required Fields",
        blocks: [
          {
            type: "paragraph",
            text: "A Required field prevents records from being saved without a value — the database equivalent of a mandatory field on a paper form:",
          },
          {
            type: "list",
            items: [
              "Set Required to Yes in Design View: Click the field row (e.g., PatientID in the Appointments table), and in the Field Properties panel, change the Required property from No to Yes.",
              "Combine with Indexed: For foreign key fields like PatientID, also set Indexed to Yes (Duplicates OK) to improve query performance. For primary key fields, Access sets Required and No Duplicates automatically.",
              "Test required fields during form design: Required fields that are not visible on a form will cause confusing errors — the form tries to save but fails, and the staff member cannot tell why. Make sure all Required fields are either visible on the form or populated automatically (e.g., a date-stamp field populated by a default value).",
            ],
          },
          {
            type: "tip",
            text: "Set Required to Yes conservatively — only on fields where a blank value is genuinely impossible and always harmful. If there is any real-world scenario where the field might legitimately be empty (e.g., a secondary phone number), leave Required as No. Over-constraining a database frustrates staff and creates workarounds ('N/A' entered as a fake required value) that are worse than the original problem.",
          },
        ],
      },
      {
        heading: "Input Masks for Format Consistency",
        blocks: [
          {
            type: "paragraph",
            text: "An Input Mask is a template that guides staff to enter data in exactly the right format by showing placeholder characters — like a form field pre-formatted with dashes for a phone number:",
          },
          {
            type: "list",
            items: [
              "Open the Input Mask Wizard: In Table Design View, select the PhoneNumber field. In the Field Properties panel, click the Input Mask row and then click the small builder button (...) at the right end of the row.",
              "Choose a mask: The wizard offers common masks — Phone Number (!(999) 000-0000), Zip Code (00000-9999), Social Security Number (000-00-0000). Select Phone Number.",
              "How it works: After the mask is applied, when staff type in the phone number field, the cursor automatically positions inside a pre-formatted template: (___) ___-____. They type only the digits; Access fills in the parentheses and dash automatically.",
              "Storage option: The wizard asks whether to store the formatting characters (parentheses, dashes) in the table. Generally, choose to store them — it makes the data easier to read directly from the table and in reports.",
            ],
          },
          {
            type: "knowledge-check",
            question: "Staff are entering appointment dates in inconsistent formats — some type '4/15/2025' and others type 'April 15 2025'. What is the most effective fix?",
            options: [
              "Add a Validation Rule that rejects any date before 2020",
              "Set the AppointmentDate field data type to Short Text so any format is accepted",
              "Set the AppointmentDate field data type to Date/Time — Access enforces a consistent date format and stores dates consistently regardless of how they are typed",
              "Add a note in the staff handbook asking everyone to use the same format",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    slug: "backing-up-data",
    title: "Backing Up and Protecting Your Database",
    description:
      "Protect the database from hardware failure, accidental deletion, and file corruption — with practical backup strategies, file protection, and recovery procedures.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Last Tuesday, the workstation used as the shared drive host at Lakeside Medical Associates failed to boot after a power outage. The Access database file — containing 18 months of patient appointment records — was stored only on that machine's local hard drive. IT recovered the drive three days later, but the six hours of patient records entered on the day of the failure were corrupted and unreadable. The practice manager is now asking what backup system should have been in place to prevent this. This lesson answers that question.",
          },
        ],
      },
      {
        heading: "Why Database Backups Are Critical",
        blocks: [
          {
            type: "paragraph",
            text: "An Access database is a single .accdb file. If that file is lost, corrupted, or deleted, all data in it — every patient record, appointment, billing entry — is gone. Database backup is not optional:",
          },
          {
            type: "list",
            items: [
              "Hardware failure is common and unpredictable — hard drives fail, power surges corrupt files, computers overheat. Any workstation or server can fail without warning. Data stored only on one machine has no redundancy.",
              "Accidental deletion happens: A staff member working in Design View can accidentally delete a table or relationship. A wrong update query can overwrite hundreds of records. Without a recent backup, these mistakes are permanent.",
              "File corruption can occur without obvious warning: An Access database that is not properly closed (e.g., power cut while the file is open) can become partially corrupted. The file may open but produce errors, or simply stop opening at all.",
              "In a medical office, HIPAA requires you to protect patient data from loss: The Security Rule under HIPAA mandates that covered entities implement policies to protect against 'reasonably anticipated threats to the security or integrity of the information.' Regular backups are a compliance requirement, not just best practice.",
            ],
          },
        ],
      },
      {
        heading: "The Built-In Access Backup Tool",
        blocks: [
          {
            type: "paragraph",
            text: "Access includes a built-in backup command that creates a clean copy of the database file. This is the safest way to back up an Access database because it copies the file while Access handles any open connections cleanly:",
          },
          {
            type: "list",
            items: [
              "With the database open, go to File > Save As. Under Advanced options, choose Back Up Database.",
              "Access suggests a file name with today's date automatically appended: Lakeside_Appointments_2025-05-11.accdb. This date-stamped naming convention is excellent — keep it.",
              "Choose the backup destination: Save the backup to a different physical location than the original file — a network drive, an external hard drive, or a cloud storage folder (OneDrive or SharePoint). Never save the backup to the same folder as the original on the same machine.",
              "Access creates a complete copy of the database at that moment, including all tables, queries, forms, reports, and data. The backup file is a full, independent database — if the original is destroyed, you can open the backup directly in Access and resume work.",
            ],
          },
        ],
      },
      {
        heading: "A Practical Backup Schedule",
        blocks: [
          {
            type: "paragraph",
            text: "A backup is only valuable if it is current enough to restore from. Define a backup schedule based on how much data loss is acceptable:",
          },
          {
            type: "list",
            items: [
              "Daily backups for active databases: If staff enter records throughout the day, a backup taken at end of business each day ensures that at most one day of data can be lost. Name daily backups with the date: Lakeside_DB_2025-05-11.accdb.",
              "Keep at least two weeks of daily backups: Hard drive corruption is sometimes detected days after it occurs. If you overwrite your only backup with a corrupted file, you have no recovery option. Keep rolling daily backups for at least 14 days before deleting the oldest.",
              "Take an extra backup before any structural change: Before you modify a table's design, change a relationship, or run an update query that will modify many records, take a manual backup first. Label it clearly: Lakeside_DB_BeforeSchemaChange_2025-05-11.accdb.",
              "Test your backups: Once a month, open the oldest backup in Access and confirm the tables open and records are readable. A backup that cannot be restored is worthless. Verification is the step most offices skip.",
            ],
          },
          {
            type: "tip",
            text: "Store backups in OneDrive or SharePoint automatically by setting the database file location to a synced folder. Every time the .accdb file is saved, OneDrive syncs a copy to the cloud. OneDrive also maintains version history — you can recover earlier versions of the file if the current version becomes corrupted.",
          },
        ],
      },
      {
        heading: "File Protection and Access Control",
        blocks: [
          {
            type: "paragraph",
            text: "Beyond backups, protecting the database from unauthorized access and accidental modification requires file-level and Access-level controls:",
          },
          {
            type: "list",
            items: [
              "Store the database on a network share with appropriate permissions: Only staff who need access to the database file should have read/write permissions on the folder. Staff who only need to view reports should have read-only access to the file.",
              "Use Access passwords for sensitive databases: In Access, go to File > Info > Encrypt with Password. This requires anyone who opens the .accdb file to enter a password. Important: document this password securely. A password-protected database that no one can open is useless.",
              "Split the database into front-end and back-end: For databases accessed by multiple staff simultaneously, database administrators use a 'split' design — the back-end (.accdb file with the tables) stays on the shared network drive, and each staff member has their own front-end (.accdb file with queries, forms, and reports) linked to the shared back-end. This reduces file corruption risk from multiple simultaneous writers.",
            ],
          },
          {
            type: "knowledge-check",
            question: "The Access database file is stored on a single workstation's local hard drive. A staff member accidentally deletes a table and closes the database before anyone notices. There are no backups. What happens?",
            options: [
              "Access automatically keeps a 30-day undo history for tables",
              "The table and all its records are permanently gone with no recovery option",
              "IT can recover the table from the Windows Recycle Bin",
              "Access can rebuild the table from the query definitions",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "records-retention",
    title: "Records Retention in a Medical Office",
    description:
      "Understand how long to keep different types of records, what HIPAA and state law require, and how to build an organized archiving and deletion process.",
    duration: "18 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The practice manager at Lakeside Medical Associates prints a question from a compliance checklist and sets it on your desk: 'How long must patient medical records be retained under federal law? What about billing records? When can we delete them?' The database is growing — five years of records, thousands of patient entries — and the manager wants to know when it is safe to archive or delete old data. This lesson gives you the framework to answer her question.",
          },
        ],
      },
      {
        heading: "What Is Records Retention?",
        blocks: [
          {
            type: "paragraph",
            text: "Records retention refers to the policies and legal requirements governing how long different types of records must be kept, in what form, and under what access conditions before they can be archived or destroyed:",
          },
          {
            type: "list",
            items: [
              "Retention requirements vary by record type: A patient's medical chart has different requirements than a billing statement, an employment record, or a vendor invoice. Every type of document has its own retention period, often set by a combination of federal law, state law, and professional standards.",
              "Retention is a legal requirement, not a storage preference: Destroying records before their required retention period expires can expose a medical practice to liability in malpractice litigation (the chart no longer exists to prove what care was given), insurance audits (billing records cannot be produced), and HIPAA investigations.",
              "Retention does not mean keeping everything forever: Holding records longer than required creates its own risks — unnecessary data increases breach exposure under HIPAA. A security incident that exposes records you were legally required to have already destroyed is still a breach, and the unnecessary retention may increase regulatory penalties.",
            ],
          },
        ],
      },
      {
        heading: "HIPAA and Federal Requirements",
        blocks: [
          {
            type: "paragraph",
            text: "HIPAA establishes federal minimums for certain record types. State law often sets longer periods, and state law prevails when it is more protective of patients:",
          },
          {
            type: "list",
            items: [
              "HIPAA Privacy Rule — policies and records of compliance: HIPAA requires covered entities to retain documentation of their privacy policies and procedures, training records, and authorization records for at least 6 years from the date of creation or the date it was last in effect, whichever is later.",
              "Medical records — not set by HIPAA directly: Despite common belief, HIPAA does not specify how long medical records must be kept. The obligation comes from state medical practice acts and Medicare/Medicaid participation agreements. Most states require 7–10 years for adult patients; most require longer periods for minor patients.",
              "Medicare billing records: Providers participating in Medicare must retain records supporting claims for a minimum of 7 years from the date of service.",
              "Minor patients: Many states require records for minor patients to be retained until the patient reaches adulthood plus an additional period (often 3–7 years). This can mean records must be kept 25+ years for a patient seen in childhood.",
            ],
          },
          {
            type: "callout",
            variant: "warning",
            text: "Records retention law varies significantly by state. The minimums listed here are federal starting points. Always consult state medical practice guidelines and legal counsel to confirm the specific retention requirements for your state and practice type. As an office assistant, your role is to implement the policy set by management and compliance staff — not to set it yourself.",
          },
        ],
      },
      {
        heading: "Common Record Types and Retention Periods",
        blocks: [
          {
            type: "paragraph",
            text: "While specific periods vary by state, the following framework reflects common professional standards for medical office records:",
          },
          {
            type: "list",
            items: [
              "Patient medical records (adult): 7–10 years from last date of service, or longer if state law requires.",
              "Patient medical records (minor): Until the patient's 18th birthday plus the adult retention period — effectively may require retention until the patient's mid-20s.",
              "Billing and claims records: 7 years from date of service (Medicare minimum; state law may require longer).",
              "Appointment records: Typically considered part of the medical record and retained on the same schedule — 7–10 years.",
              "Employee records: Retained according to employment law, typically 7 years after termination.",
              "Vendor contracts and invoices: 7 years is a common standard, aligned with tax audit exposure periods.",
              "HIPAA compliance documentation: 6 years from creation date or last effective date.",
            ],
          },
        ],
      },
      {
        heading: "Archiving vs. Deletion",
        blocks: [
          {
            type: "paragraph",
            text: "When records have reached the end of their required retention period, the practice has two options — archive or destroy. These are not interchangeable:",
          },
          {
            type: "list",
            items: [
              "Archiving means moving records to secure, lower-cost storage where they are retained but not actively used: Archived patient records might be moved from the active Access database to a separate archive database, a secure off-site storage facility, or a HIPAA-compliant long-term cloud storage service. Archived records must still be accessible for legal or compliance purposes — they are not deleted.",
              "Destruction means permanently and irreversibly removing records: For physical paper records, destruction means cross-cut shredding using a HIPAA-compliant shredding service. For digital records (database entries, scanned files), destruction means permanent deletion and confirmation that no backup copies remain — including cloud sync copies and email attachments.",
              "Document every destruction: HIPAA requires that when protected health information is destroyed, the method and date of destruction are documented. Keep a destruction log that records: what was destroyed, when, by what method, and who authorized it.",
            ],
          },
          {
            type: "knowledge-check",
            question: "A patient was seen at Lakeside Medical Associates in 2015. The practice uses a 7-year retention policy for adult patient records. It is now 2025. What is the correct action regarding this patient's records?",
            options: [
              "Delete the records immediately — they are past the 7-year minimum",
              "The records may be eligible for destruction, but the practice should verify state law, confirm no active legal holds, document the destruction, and ensure all backup copies are also removed",
              "Archive the records to an external drive and delete the archive password",
              "Keep the records indefinitely — there is no maximum retention period",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "office-data-management-system",
    title: "Building a Complete Office Data Management System",
    description:
      "Put it all together — design a practical, sustainable data management system for a medical office that combines Excel and Access, enforces data quality, and keeps staff efficient.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "After five modules of learning, you have been asked to summarize your recommendations for the practice manager at Lakeside Medical Associates in a 'Data Management Plan' — a practical document describing what tools they will use, what data will be managed where, who is responsible for what, and how data quality will be maintained. This lesson walks through the thinking behind a complete, practical system.",
          },
        ],
      },
      {
        heading: "Starting with the Inventory",
        blocks: [
          {
            type: "paragraph",
            text: "Before designing any data management system, catalog what data the practice actually has, where it currently lives, and what problems each location creates:",
          },
          {
            type: "list",
            items: [
              "List every type of data the practice manages: Patient demographics, insurance information, appointment scheduling, clinical notes, billing and claims, provider schedules, payroll, vendor invoices, equipment logs, compliance records. Each type has different access requirements, retention rules, and volume characteristics.",
              "Identify where each type currently lives: Is it in a spreadsheet? A dedicated EHR system? Paper files? Email? Sticky notes? Many medical offices have data scattered across all of these. The inventory reveals the gaps and redundancies.",
              "Note who accesses each type and how often: Front desk staff access appointment scheduling dozens of times per day. The practice manager looks at financial summaries monthly. The billing coordinator runs reports weekly. Access frequency informs tool choice — heavily accessed data needs a more efficient tool than data reviewed once a year.",
            ],
          },
        ],
      },
      {
        heading: "Choosing the Right Tool for Each Data Type",
        blocks: [
          {
            type: "paragraph",
            text: "Not all data belongs in the same tool. A complete data management system uses each tool for what it does best:",
          },
          {
            type: "list",
            items: [
              "Access for multi-user, relational, operational data: Patient registration, appointment scheduling, and billing entries belong in Access because they are updated by multiple staff members simultaneously, they are related to each other (appointments link to patients, billing links to appointments), and they need query and reporting capabilities. Access handles concurrent access with record locking; Excel does not.",
              "Excel for analysis, reporting, and standalone reference data: Monthly summary analysis, year-over-year comparisons, charts for presentations, and reference tables like provider fee schedules belong in Excel. These are typically used by one or two people, are not updated concurrently, and benefit from Excel's charting and formula capabilities.",
              "SharePoint or network drives for document storage: Signed consent forms, insurance cards, referral letters, and compliance policies are documents — not database records. Store them in organized SharePoint folders or network drive directories, not embedded in the database.",
              "EHR systems for clinical records: Clinical documentation — encounter notes, diagnoses, prescriptions, lab results — belongs in the practice's EHR system (if one exists), not in a general-purpose Access database. The Access database handles the administrative layer; the EHR handles the clinical layer.",
            ],
          },
        ],
      },
      {
        heading: "Naming Conventions and Data Standards",
        blocks: [
          {
            type: "paragraph",
            text: "Consistency in how data is entered and stored is the foundation of a usable system. Establish and document standards before staff begin using the system:",
          },
          {
            type: "list",
            items: [
              "Field naming conventions for tables: Use consistent, descriptive names without spaces — PatientFirstName, DateOfBirth, InsurancePlanID. Avoid abbreviations that staff may interpret differently (DOB is fine; AcctTyp is not). Use CamelCase or underscores consistently across all tables.",
              "Controlled vocabulary for categorical fields: Where a field has a limited set of valid values — InsurancePlan, AppointmentType, ProviderSpecialty — define the exact list of valid values and enforce them with combo boxes on forms. Document the list. When a new insurance plan is added, update the list in the source table and the combo box simultaneously.",
              "Date format standards: Access stores dates consistently regardless of input format, but outputs may vary. In reports and forms, set date format properties explicitly (mm/dd/yyyy) so all outputs are consistent. Train staff to enter dates consistently even though Access normalizes them.",
              "Patient name entry standard: Decide whether names are stored as 'DAVIS' or 'Davis' — all caps or title case. All caps is traditional in many medical systems; title case is more readable. Pick one and document it. Mixed-case variation within the same database makes sorting and searching unreliable.",
            ],
          },
        ],
      },
      {
        heading: "Roles and Responsibilities",
        blocks: [
          {
            type: "paragraph",
            text: "A data management system is only as good as the people who maintain it. Define explicit roles:",
          },
          {
            type: "list",
            items: [
              "Data entry staff: Front desk personnel who enter patient registrations, schedule appointments, and update records through forms. They should access the database only through the forms designed for their tasks — not directly through Datasheet View.",
              "Report consumers: Practice managers and billing coordinators who run saved queries and open saved reports. They need read access to the database but should not have the ability to modify table design.",
              "Database administrator: One designated person (or a small team) who manages the database structure — creating new tables, modifying field definitions, building new queries, and performing backups. In a small practice, this may be the office manager with additional training.",
              "Compliance officer: The person responsible for ensuring the retention schedule is followed, destruction is documented, and the system meets HIPAA requirements. In a small practice, this is often the practice manager.",
            ],
          },
        ],
      },
      {
        heading: "Maintenance and Review Cadence",
        blocks: [
          {
            type: "paragraph",
            text: "A data management system requires ongoing maintenance — it is not a build-once-and-forget project:",
          },
          {
            type: "list",
            items: [
              "Daily: Verify that the automated backup ran (or perform it manually). Confirm the morning appointment schedule loaded correctly. Address any error reports from the previous day.",
              "Weekly: Run the standard weekly reports (provider schedules, outstanding billing). Review any validation error logs if the system tracks them. Check that all appointment records have a PatientID (run the Is Null query).",
              "Monthly: Run the monthly summary report and distribute to the practice manager. Review data quality — spot-check 20 random records for missing or inconsistent values. Archive monthly backups to long-term storage.",
              "Annually: Review the retention schedule and identify records eligible for archiving or destruction. Review the database structure with the database administrator — are new fields needed? Are any tables no longer relevant? Update the staff data entry training materials if procedures have changed.",
            ],
          },
          {
            type: "callout",
            variant: "success",
            text: "A well-designed data management system becomes invisible over time — staff enter data quickly through clean forms, managers get their reports in seconds, and the practice operates efficiently without anyone thinking about the underlying database. Reaching that state requires the investment of thoughtful design, consistent standards, and regular maintenance. Everything in this course has been preparation for building exactly that system.",
          },
          {
            type: "knowledge-check",
            question: "The practice is adding a new insurance plan to their accepted payers. Which parts of the Access system need to be updated?",
            options: [
              "Nothing — staff can just start typing the new plan name in the InsurancePlan field",
              "Only the data entry form needs updating",
              "The reference table (or list) of valid InsurancePlan values, the combo box on the patient registration form, and any related reports that filter or group by insurance plan",
              "The entire database should be rebuilt to accommodate the new plan",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
];
