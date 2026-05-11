import { Lesson } from "@/types/lesson";

export const module1Lessons: Lesson[] = [
  {
    slug: "what-is-data",
    title: "What Is Data? Understanding Information in the Modern Office",
    description:
      "Define data, understand the difference between raw data and useful information, and recognize why structured data management is foundational to a well-run medical office.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "Lakeside Medical Associates has 1,200 active patients. Their appointment histories, insurance information, billing records, and contact details exist in some combination of paper forms, sticky notes, a spreadsheet, two email inboxes, and a third-party scheduling app. When a patient calls to ask about a past charge, finding the answer takes 15 minutes of searching. When the billing team needs to identify which insurance plans require prior authorization, there is no reliable list. This is what unstructured data looks like in practice — and this module explains why it matters and what to do about it.",
          },
        ],
      },
      {
        heading: "Data vs. Information",
        blocks: [
          {
            type: "paragraph",
            text: "The terms 'data' and 'information' are often used interchangeably, but they have distinct meanings that matter in a professional context:",
          },
          {
            type: "list",
            items: [
              "Data is raw facts or observations — numbers, names, dates, codes, and values that have not yet been processed or organized into a meaningful context. '07/22/1978,' 'Rodriguez,' 'BlueCross,' '90210' are data points. Individually, they do not tell you much without context.",
              "Information is data that has been organized, processed, and given context — it answers a question or supports a decision. 'Patient Maria Rodriguez, born July 22, 1978, covered by BlueCross, resides in ZIP 90210, has an appointment on May 20' is information. The same underlying data points now form a complete, actionable picture.",
              "In a medical office, the transformation from raw data to useful information requires structure — a consistent format, a defined place for each piece of information, and a system for retrieving it reliably. Without structure, data becomes noise. With structure, it becomes a powerful operational tool.",
              "Data quality directly affects practice performance — inaccurate data (wrong insurance ID) causes claim rejections. Missing data (no phone number) prevents patient contact. Duplicate data (the same patient entered twice) creates confusion in records and double-billing. Every professional who enters, maintains, or retrieves data contributes to or degrades the quality of the practice's information system.",
            ],
          },
        ],
      },
      {
        heading: "Types of Data in a Medical Office",
        blocks: [
          {
            type: "paragraph",
            text: "Medical offices generate and use several distinct categories of data, each with its own handling requirements and management challenges:",
          },
          {
            type: "list",
            items: [
              "Patient demographic data — name, date of birth, address, phone number, email, emergency contact, and Social Security number. This data changes (people move, change phone numbers) and must be verified at regular intervals. It is the foundation for everything else: billing cannot work without accurate patient identification data.",
              "Clinical data — diagnoses (ICD-10 codes), procedures performed (CPT codes), medications, allergies, lab results, and clinical notes. This data is entered primarily by clinical staff and providers, but front desk staff often help with intake data that feeds into clinical records (reason for visit, previous provider, referring physician).",
              "Billing and financial data — insurance plan and member ID, claims submitted and their status, payments received and outstanding balances, remittance explanations from insurers. This data must reconcile accurately or the practice cannot operate financially.",
              "Scheduling and operational data — appointment dates and times, provider assignments, visit types (new patient vs. follow-up), cancellations, and no-shows. Scheduling data supports patient flow management and provider productivity analysis.",
              "Administrative data — staff information, vendor contracts, policy documents, and compliance records. This data supports office operations and is subject to its own retention requirements.",
            ],
          },
        ],
      },
      {
        heading: "Why Data Management Matters",
        blocks: [
          {
            type: "paragraph",
            text: "Poor data management has real operational, financial, and legal consequences — and good data management creates concrete competitive and quality advantages:",
          },
          {
            type: "list",
            items: [
              "Operational efficiency — when data is organized and accessible, staff spend less time searching and more time serving patients. A well-managed patient database means any staff member can answer a patient question in seconds rather than minutes.",
              "Revenue cycle impact — accurate billing data directly affects payment. A claim submitted with a wrong insurance ID, incorrect date of birth, or outdated group number will be rejected. Each rejection requires staff time to investigate, correct, and resubmit — and some rejections result in permanent non-payment. Clean data is the foundation of a healthy revenue cycle.",
              "Compliance and audit readiness — HIPAA, Medicare, Medicaid, and private insurers all have record-keeping requirements. A practice with organized, complete, retrievable records is audit-ready at any time. A practice with scattered, incomplete records faces significant risk in a regulatory audit.",
              "Patient safety — accurate medication lists, allergy records, and medical histories prevent clinical errors. Data management is not just an administrative function — it is a patient safety issue.",
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
            text: "Every piece of data you handle in a medical office — entering, modifying, retrieving, or deleting — becomes part of an official record. Careless data entry creates errors that affect patients and the practice. Unauthorized data access violates HIPAA. Accidental deletion of records without authorization can constitute destruction of medical records, which is a serious legal violation. Treat every data entry as if you are building the foundation of a patient's permanent health record — because you are.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Explain the concept of data quality in a medical office and describe the four dimensions of data quality (accuracy, completeness, consistency, and timeliness) with a specific example of how each dimension affects patient care or billing in a small medical practice.' Use the response to evaluate the data quality in one specific data set you work with regularly.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A patient's record shows two different dates of birth in two different systems. This is an example of which data quality problem?",
            options: [
              "Timeliness — the data is out of date",
              "Completeness — a required field is missing",
              "Consistency — the same data point has different values in different locations",
              "Accuracy — both entries are wrong",
            ],
            correctIndex: 2,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Conduct a data quality assessment of a real or practice data set.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a Word table with 5 columns: Data Type, Example Value, Accuracy Issue?, Completeness Issue?, Consistency Issue?. Fill in 8 rows using fictional patient data you create — deliberately include at least 3 rows with data quality problems.",
          "For each problem row, write a one-sentence description of the problem and its potential consequence (claim rejection, patient contact failure, duplicate record, etc.).",
          "Write a 2-paragraph Data Quality Summary as if reporting to your supervisor: describe what you found in the data and recommend two specific process improvements that would prevent the most common errors going forward.",
          "Save as 'DataQualityAssessment_[YourName]_2025-05.docx' and export as PDF.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your Data Quality Assessment PDF to your instructor. It will be evaluated on whether your identified problems are realistic, whether your consequences are accurate, and whether your recommendations are specific and actionable. This is the kind of analysis a practice manager would ask a trusted office assistant to perform.",
      },
    ],
  },

  {
    slug: "types-of-office-records",
    title: "Types of Office Records and How They Are Used",
    description:
      "Map the categories of records a medical office creates and manages — and understand the flow of data between them that makes the practice run.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A new patient, James Whitfield, calls to schedule his first appointment at Lakeside Medical Associates. From that single phone call, data flows through scheduling, patient registration, insurance verification, clinical intake, the provider's notes, billing, and follow-up communications. Each step creates a new record — and each record depends on data from the previous one. Understanding this flow is essential for understanding why accurate data entry at the front desk affects every other department.",
          },
        ],
      },
      {
        heading: "Patient Records: The Foundation",
        blocks: [
          {
            type: "paragraph",
            text: "Patient records are the central data category in a medical practice — all other records connect to them in some way:",
          },
          {
            type: "list",
            items: [
              "The patient master record (or patient demographic record) captures identifying information that persists across all visits: full legal name, date of birth, address, phone, email, Social Security number, emergency contact, and insurance information. This record is created once during a patient's first registration and updated whenever information changes. It serves as the anchor to which all clinical, billing, and scheduling records are linked.",
              "The medical record (or chart) accumulates over time — it includes all clinical encounters, notes, diagnoses, procedures, lab results, medications, and allergies. The medical record is the legal document of a patient's care history and must be accurate, complete, and retrievable for the lifetime of the patient relationship plus the required retention period.",
              "Encounter records document each visit — what happened on a specific date, with which provider, what was assessed and what was done. Each encounter record links to the patient master record (who) and generates a billing claim (what services, at what cost, to which insurer).",
            ],
          },
        ],
      },
      {
        heading: "Billing and Financial Records",
        blocks: [
          {
            type: "paragraph",
            text: "Billing records document the financial transaction between the practice, the patient, and the insurance company for each service provided:",
          },
          {
            type: "list",
            items: [
              "Claims are billing documents submitted to insurance companies — they include patient identifying information, the insurance policy details, the date of service, the diagnosis codes (ICD-10), and the procedure codes (CPT) for services provided. A claim creates a record of what was billed, to whom, when, and for how much. Claims management is one of the most data-intensive functions in a medical office.",
              "Remittance advice (EOB — Explanation of Benefits) is the insurer's response to a claim — it shows what was billed, what was approved for payment, what the patient owes, and any adjustments. Posting remittance data to the practice's billing system accurately is essential — a missed payment or incorrect adjustment compounds over time into significant revenue discrepancies.",
              "Patient financial records track amounts owed and paid by the patient — copays collected at the time of service, outstanding balances, payment plans, and write-offs. Keeping these records current is both a financial and patient relations function.",
            ],
          },
        ],
      },
      {
        heading: "Scheduling and Operational Records",
        blocks: [
          {
            type: "paragraph",
            text: "Scheduling data is one of the highest-volume data categories in a front desk role — and it feeds directly into clinical and billing records:",
          },
          {
            type: "list",
            items: [
              "Appointment records link a patient, a provider, a date and time, and a visit type — each appointment record should capture enough information to prepare for the visit (reason for visit, whether the patient is new or established, insurance verification status). When appointments are rescheduled or cancelled, those changes should be recorded with reasons — this data helps the practice analyze no-show rates and optimize scheduling.",
              "Provider schedules define when each provider is available, how long each appointment type should be, and which appointment types each provider sees. When scheduling conflicts arise, it is usually because provider schedule data is not being respected or is outdated. Keeping schedule templates accurate prevents double-booking and patient wait-time problems.",
              "Referral records track when a patient is sent to another provider — referral data must be documented for clinical continuity (the referring provider needs to know the outcome) and for billing purposes (some insurers require referral authorization before covering specialist visits).",
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
            text: "Understanding which records you are authorized to access, create, modify, and delete is as important as understanding the records themselves. Your role at Lakeside Medical Associates defines your data access scope. Accessing billing records if you are a scheduling coordinator, or accessing clinical notes if you are a billing specialist, may be outside your authorized scope even if the systems technically allow it. Always stay within your authorized data scope — and if you are ever uncertain whether you are authorized to access a particular record, ask your supervisor before accessing it.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Create a data flow diagram description for a new patient visit at a small medical office. Starting from the phone call to schedule the appointment, trace exactly what data is created at each step, what system it is entered into, and how it connects to the previous and next step. Cover scheduling, registration, insurance verification, clinical intake, clinical documentation, billing, and payment posting.' Draw a simple flowchart based on the response.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "A billing staff member cannot reconcile a patient's payment because the insurance ID in the billing system does not match the ID on the claim. Which record category most likely contains the source of the error?",
            options: [
              "The medical record — the clinical notes have the wrong ID",
              "The patient master record — the registration data with the insurance ID was entered incorrectly",
              "The scheduling record — the appointment type is wrong",
              "The referral record — the referring provider entered the wrong patient",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Map the data flow for a patient visit at Lakeside Medical Associates.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Create a table in Word with 4 columns: Step in Patient Visit, Record Type Created, Key Data Entered, Who Enters It. Fill in rows for: Phone scheduling, Patient check-in, Insurance verification, Clinical intake, Provider visit, Billing claim submission, Payment posting.",
          "For each row, identify one specific data field that, if entered incorrectly, would cause a problem downstream (e.g., wrong date of birth at check-in causes insurance claim rejection).",
          "Write a paragraph describing which record type you consider most critical to get right and why — use a specific example from the table to support your reasoning.",
          "Save the completed document as 'PatientDataFlow_[YourName]_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your data flow table and explanatory paragraph to your instructor. This exercise demonstrates that you understand how data flows through a practice — a mental model that makes every data entry decision more intentional and accurate.",
      },
    ],
  },

  {
    slug: "database-concepts",
    title: "From Paper to Digital: How Databases Organize Data",
    description:
      "Learn the core concepts of database design — tables, records, fields, data types, and relationships — that underlie every digital data management system.",
    duration: "20 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "A physical filing cabinet at Lakeside Medical Associates holds patient charts organized by last name. Each chart is a folder (record) containing multiple forms (fields). The cabinet itself is organized by a consistent system (table structure). The medical records retention schedule tells you how long to keep each chart (data management policy). This physical filing system is actually an excellent analog for understanding how a database works — and this lesson makes that connection explicit.",
          },
        ],
      },
      {
        heading: "Tables, Records, and Fields",
        blocks: [
          {
            type: "paragraph",
            text: "The fundamental building blocks of any database are tables, records, and fields — understanding these three concepts unlocks all the rest of database theory:",
          },
          {
            type: "list",
            items: [
              "A table is a collection of related data organized in rows and columns — like a spreadsheet, but with strict rules about what data goes in each column. A 'Patients' table contains one entry per patient. An 'Appointments' table contains one entry per appointment. Each table stores one type of entity consistently, and all rows in the table have the same structure.",
              "A record is one complete entry in a table — one row. In the Patients table, a record is all the information for one patient: their ID, name, date of birth, phone number, and insurance information. In the Appointments table, a record is one appointment: the appointment ID, the patient it belongs to, the provider, the date, and the visit type.",
              "A field is one piece of information in a record — one column. In the Patients table, fields include: PatientID, FirstName, LastName, DateOfBirth, Phone, InsuranceID. Each field has a name (which tells you what information it holds) and a data type (which tells the database what kind of data is allowed in that field).",
              "Data types define what kind of data can go in a field — Text (for names and addresses), Number (for IDs and quantities), Date/Time (for dates of birth and appointment dates), Currency (for payment amounts), and Yes/No (for true/false values like 'Is active patient?'). Using the correct data type is critical: storing dates as text makes date calculations impossible. Storing numbers as text prevents arithmetic. Data type decisions made at the table design stage affect everything the database can do.",
            ],
          },
        ],
      },
      {
        heading: "Primary Keys and Unique Identification",
        blocks: [
          {
            type: "paragraph",
            text: "Every table needs a way to uniquely identify each record — this is the role of the primary key:",
          },
          {
            type: "list",
            items: [
              "A primary key is a field (or combination of fields) whose value is unique for every record in the table — no two records can have the same primary key value, and the primary key field cannot be empty (null). In the Patients table, the PatientID field serves as the primary key. Even if two patients are named Maria Rodriguez with the same date of birth, their PatientIDs are different.",
              "Auto-number (AutoNumber) primary keys are generated automatically by the database — each new record gets the next sequential number (1, 2, 3...) without any user input. This is the most common and reliable approach for primary keys in medical office databases because it completely removes the risk of duplicate or missing key values.",
              "Natural keys vs. surrogate keys — a natural key uses a real-world identifier that is naturally unique (like a Social Security Number or an insurance member ID). A surrogate key is a system-generated identifier with no real-world meaning (like an auto-number PatientID). In medical records, auto-number surrogate keys are preferred for primary keys — SSNs can be incorrect or change in rare cases, and insurance IDs change when a patient switches plans. The surrogate key is stable.",
            ],
          },
        ],
      },
      {
        heading: "Relationships Between Tables",
        blocks: [
          {
            type: "paragraph",
            text: "The real power of a database over a single spreadsheet is the ability to relate tables to each other — answering questions that span multiple data categories:",
          },
          {
            type: "list",
            items: [
              "A relationship connects records in one table to records in another using a shared field — typically the primary key of one table appearing as a field (called the foreign key) in another table. In the Appointments table, the PatientID field is a foreign key that refers to the PatientID primary key in the Patients table. This link means every appointment record knows which patient it belongs to.",
              "One-to-many is the most common relationship type — one patient can have many appointments, but each appointment belongs to exactly one patient. The 'one' side has the primary key (Patients.PatientID), and the 'many' side has the foreign key (Appointments.PatientID). This relationship structure prevents data redundancy: patient contact information is stored once in the Patients table, not repeated in every appointment record.",
              "Referential integrity is a database rule that enforces valid relationships — it prevents you from creating an appointment record that refers to a patient ID that does not exist in the Patients table, and prevents you from deleting a patient who has existing appointment records. This rule keeps data consistent and prevents 'orphaned' records (appointments with no valid patient).",
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
            text: "Database design decisions made at the outset are difficult and expensive to change after data has been entered. If you are involved in designing or modifying a practice database — even a simple Access database — take the time to think through the structure carefully before entering data. A field added later can require updating thousands of existing records. A relationship defined incorrectly can cascade errors across the entire database. When in doubt, consult with your supervisor or IT before making structural changes to a production database.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'Design the table structure for a simple patient management database for a small medical office. For each table, list: table name, fields, data type for each field, and the primary key. Then describe the relationships between the tables. Include at minimum: Patients, Appointments, Providers, and Insurance Plans tables.' Review the design and identify how it would prevent the data quality problems you analyzed in the first lesson.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "In a medical office database, the Appointments table has a PatientID field that refers to the Patients table. What is the PatientID in the Appointments table called?",
            options: [
              "Primary key — it uniquely identifies each appointment",
              "Foreign key — it is a reference to the primary key of the Patients table",
              "Index field — it speeds up searches on the appointments table",
              "Auto-number — it is automatically assigned by the database",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Design a database structure for Lakeside Medical Associates on paper before building it in a computer system.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "On paper or in Word, design three tables for Lakeside Medical Associates: Patients, Appointments, and Providers. For each table, list all fields, their data types, and identify the primary key.",
          "Draw the relationships between the three tables with arrows showing which field connects to which. Label each relationship as 'one-to-many' and note which side is 'one' and which is 'many.'",
          "Identify one potential data quality problem your design prevents (compared to storing all data in a single spreadsheet) and explain why the relational structure prevents it.",
          "Write a brief justification (2–3 sentences) for why you chose auto-number vs. natural key for each table's primary key.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your table designs, relationship diagram, data quality observation, and primary key justification to your instructor. This paper design is exactly the kind of planning exercise database professionals complete before building any real system — thinking before building prevents costly mistakes.",
      },
    ],
  },

  {
    slug: "excel-vs-access",
    title: "Choosing the Right Tool: Excel vs. Microsoft Access",
    description:
      "Understand when to use Excel and when to use Access for office data management — making the right tool choice at the start prevents significant rework later.",
    duration: "15 min",
    sections: [
      {
        heading: "Real-World Scenario",
        blocks: [
          {
            type: "callout",
            variant: "info",
            text: "The front desk team at Lakeside Medical Associates tracks patient appointment data in Excel. It works fine with 200 patients. But as the practice grows to 800 patients with 60+ appointments per day, the spreadsheet becomes unwieldy — it crashes, data validation is impossible, and multiple staff cannot edit it simultaneously without creating conflicts. Your supervisor is asking whether to continue improving the spreadsheet or move to Access. This lesson gives you the framework to make that recommendation.",
          },
        ],
      },
      {
        heading: "What Excel Is Best For",
        blocks: [
          {
            type: "paragraph",
            text: "Excel is the right tool for a specific category of data tasks — and forcing it to do more than it is designed for creates problems:",
          },
          {
            type: "list",
            items: [
              "Excel is ideal for analysis, calculation, and reporting — when you need to sum, average, chart, or analyze a set of data, Excel's formula engine and charting tools are unmatched. A monthly expense summary, a provider productivity analysis, or a budget variance report are all appropriate Excel use cases.",
              "Excel works well for small, single-user data sets — up to a few thousand rows where one person is responsible for the data and no complex relational structure is needed. A personal log of mileage, a list of vendor contacts, or a reference table of procedure codes are all manageable in Excel.",
              "Excel is appropriate for temporary or exploratory data work — if you are analyzing data once to answer a specific question and do not need a long-term, maintained data system, Excel is faster to set up than a formal database.",
              "Excel is the output format for reports generated from databases — even when Access or an EHR system is the primary data source, Excel is often the final format for reports that managers review, because of Excel's superior charting, formatting, and distribution capabilities.",
            ],
          },
        ],
      },
      {
        heading: "Where Excel Struggles and Access Excels",
        blocks: [
          {
            type: "paragraph",
            text: "Excel starts to show limitations when data grows beyond certain scales or requires features that a proper database provides natively:",
          },
          {
            type: "list",
            items: [
              "Multiple related data categories — Excel handles one flat table well but creating relationships between multiple tables is clunky and error-prone. When your data has patients, appointments, providers, and insurance plans that all need to connect, Access (or another relational database) is the right tool.",
              "Multi-user access — multiple people trying to edit the same Excel file simultaneously creates version conflicts and file corruption risk. Access databases support multi-user access with record-level locking, allowing multiple staff members to enter data simultaneously without conflict.",
              "Data validation and enforcement — Excel can apply data validation rules, but they are easily overridden and do not enforce referential integrity. Access enforces data type rules, referential integrity, and input masks at the database level, preventing a wide category of data entry errors that Excel cannot stop.",
              "Large data volumes — Excel has a hard row limit of 1,048,576 rows, and performance degrades significantly well before that limit for complex files. For a practice with hundreds of thousands of billing records over several years, Excel is not viable. Access handles millions of records efficiently, and enterprise-level databases (SQL Server, Oracle) handle billions.",
              "Custom data entry forms and reports — Access includes form and report designers that create professional, staff-friendly data entry interfaces and formatted printed reports without requiring any programming. Creating a custom form in Excel requires VBA macros, which are complex and fragile. Access forms are simpler to build and more reliable.",
            ],
          },
        ],
      },
      {
        heading: "A Decision Framework",
        blocks: [
          {
            type: "paragraph",
            text: "Use these questions to choose between Excel and Access for a new data management task:",
          },
          {
            type: "list",
            items: [
              "How many records will this grow to? Under 5,000: Excel may work. Over 5,000 or growing continuously: Access or a purpose-built system.",
              "Will multiple people enter data simultaneously? If yes: Access. If one person maintains the data: Excel may work.",
              "Does the data involve multiple related entities (patients + appointments + providers + insurance)? If yes: Access. If one flat table: Excel.",
              "Do you need custom forms to guide data entry? If yes: Access. If the raw grid is acceptable: Excel.",
              "Is this for analysis and reporting on existing data, or for ongoing data collection? Analysis and reporting: Excel. Ongoing data collection: Access (or an integrated system).",
              "Do you need to enforce data quality rules that cannot be bypassed? If yes: Access. If basic validation is enough: Excel.",
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
            text: "Never store patient PHI in a personal Excel file on your local C: drive or personal cloud storage — regardless of whether you think Excel or Access is the right tool. Any tool used to store PHI must be on the practice's secure, backed-up, access-controlled systems. The question of Excel vs. Access is separate from the question of where files are stored and how they are secured. PHI storage location and access control must always comply with HIPAA requirements regardless of the tool.",
          },
        ],
      },
      {
        heading: "AI Assist",
        blocks: [
          {
            type: "tip",
            text: "AI Task: Ask ChatGPT — 'For each of the following scenarios in a medical office, recommend Excel or Microsoft Access and explain why in 2–3 sentences: (1) A monthly expense report for the practice manager. (2) A database tracking 2,000 patients, their appointments, and insurance information. (3) A one-time analysis of which providers saw the most patients last quarter. (4) A system where three front desk staff simultaneously enter patient registrations. (5) A simple list of vendor phone numbers for reference.' Review the recommendations and compare them to your own intuition.",
          },
        ],
      },
      {
        heading: "Knowledge Check",
        blocks: [
          {
            type: "knowledge-check",
            question: "Lakeside Medical Associates needs a system where three front desk staff can simultaneously enter patient registrations, and data must be validated to prevent wrong date formats and missing required fields. Which tool is most appropriate?",
            options: [
              "Excel — it is more familiar to staff and easier to use",
              "Microsoft Access — it supports multi-user access and enforces data validation at the database level",
              "A Word document — it is the most flexible format",
              "Email — it creates a record of each entry automatically",
            ],
            correctIndex: 1,
          },
        ],
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Complete a tool selection analysis for three real or hypothetical data management scenarios.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "For each of the following scenarios, write a recommendation (Excel or Access) and a 3-sentence justification: (A) A list of 50 vendor phone numbers and contact names for the front desk reference binder. (B) A patient appointment database that tracks 1,500 patients across 4 providers with 80 appointments per day. (C) A one-time quarterly billing summary showing total revenue by insurance payer.",
          "For scenario B, sketch the table structure you would recommend (on paper or in Word): which tables, what fields, and how they relate.",
          "Write a one-paragraph recommendation memo to your supervisor explaining which scenarios require Access and which can stay in Excel — with clear, non-technical reasoning a practice manager would find persuasive.",
          "Save as 'ToolSelectionAnalysis_[YourName]_2025-05.docx'.",
        ],
      },
      {
        type: "callout",
        variant: "success",
        text: "Deliverable: Submit your tool selection analysis, table sketch, and recommendation memo to your instructor. This exercise demonstrates that you can make informed, justified data management decisions — the kind of judgment a supervisor relies on when planning data systems.",
      },
    ],
  },
];
