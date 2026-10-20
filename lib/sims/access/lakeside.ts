import type { AccTable } from "@/components/sim/apps/access/types";
import { fld, table } from "@/components/sim/apps/access/simkit";

/*
 * Sample data for the Access practice sims: Lakeside Medical Associates, a
 * fictional Brooklyn practice. Every person, phone number (555-01xx) and
 * insurance ID here is invented.
 */

export const PHONE_MASK = '!\\(999") "000\\-0000;0;_';

/** Providers: ProviderID, LastName, FirstName, Specialty. */
export const providers = (): AccTable =>
  table(
    "Providers",
    [fld.auto("ProviderID"), fld.text("LastName", 50, { required: true }), fld.text("FirstName", 50), fld.text("Specialty", 50)],
    [
      [1, "Walsh", "Karen", "Family Medicine"],
      [2, "Rivera", "Daniel", "Internal Medicine"],
      [3, "Okafor", "Emeka", "Pediatrics"],
      [4, "Chen", "Lisa", "Cardiology"],
    ],
  );

const PATIENT_ROWS: (string | number | boolean)[][] = [
  [1001, "Rodriguez", "Maria", "1985-03-14", "(718) 555-0142", "Brooklyn", "BlueCross", "BCX448120", true],
  [1002, "Thompson", "James", "1972-11-02", "(347) 555-0177", "Queens", "Aetna", "AET300915", true],
  [1003, "Nguyen", "Linh", "1990-07-21", "(718) 555-0103", "Brooklyn", "Medicare", "MCR771204", true],
  [1004, "Patel", "Priya", "1968-01-30", "(917) 555-0188", "Manhattan", "BlueCross", "BCX559301", true],
  [1005, "Delgado", "Rosa", "1955-09-09", "(718) 555-0121", "Brooklyn", "Medicare", "MCR118842", true],
  [1006, "Kim", "Daniel", "1999-04-17", "(646) 555-0135", "Manhattan", "Aetna", "AET442210", true],
  [1007, "Brooks", "Tanya", "1981-12-05", "(718) 555-0164", "Brooklyn", "BlueCross", "BCX660173", false],
  [1008, "Haddad", "Omar", "1977-06-28", "(347) 555-0110", "Queens", "Aetna", "AET129904", true],
  [1009, "Fischer", "Anna", "1963-02-11", "(718) 555-0199", "Staten Island", "Medicare", "MCR904417", true],
  [1010, "Mensah", "Kwame", "1994-08-03", "(929) 555-0156", "Bronx", "BlueCross", "BCX237765", true],
  [1011, "Russo", "Gina", "1988-10-26", "(718) 555-0148", "Brooklyn", "Aetna", "AET875520", true],
  [1012, "Clarke", "Devon", "2001-05-19", "(347) 555-0182", "Queens", "BlueCross", "BCX318846", true],
];

/**
 * Patients: PatientID, LastName, FirstName, DateOfBirth, Phone, City,
 * InsurancePlan, InsuranceID, IsActivePatient.
 */
export const patients = (opts: { phoneMask?: boolean } = {}): AccTable =>
  table(
    "Patients",
    [
      fld.auto("PatientID"),
      fld.text("LastName", 50, { required: true }),
      fld.text("FirstName", 50, { required: true }),
      fld.date("DateOfBirth", { required: true }),
      fld.text("Phone", 14, opts.phoneMask ? { inputMask: PHONE_MASK } : {}),
      fld.text("City", 30),
      fld.text("InsurancePlan", 50),
      fld.text("InsuranceID", 15),
      fld.yes("IsActivePatient", { defaultValue: "Yes" }),
    ],
    PATIENT_ROWS,
  );

/** Visit types used across the appointment data. */
export const VISIT_TYPES = ["Annual Physical", "Follow-Up", "Sick Visit", "New Patient", "Consultation"];

const APPT_ROWS: (string | number | null)[][] = [
  // AppointmentID, PatientID, ProviderID, AppointmentDate, VisitType, Copay, BilledDate
  [1, 1001, 1, "2026-09-02", "Annual Physical", 25, "2026-09-03"],
  [2, 1002, 2, "2026-09-03", "Follow-Up", 40, "2026-09-04"],
  [3, 1003, 1, "2026-09-08", "Sick Visit", 0, null],
  [4, 1004, 4, "2026-09-09", "Consultation", 50, "2026-09-10"],
  [5, 1005, 2, "2026-09-11", "Follow-Up", 0, null],
  [6, 1006, 3, "2026-09-15", "New Patient", 30, "2026-09-16"],
  [7, 1008, 1, "2026-09-17", "Sick Visit", 40, null],
  [8, 1009, 4, "2026-09-22", "Follow-Up", 0, "2026-09-23"],
  [9, 1010, 2, "2026-09-24", "Annual Physical", 25, null],
  [10, 1011, 1, "2026-09-29", "Follow-Up", 40, "2026-09-30"],
  [11, 1001, 2, "2026-10-01", "Follow-Up", 25, "2026-10-02"],
  [12, 1012, 3, "2026-10-05", "Sick Visit", 25, null],
  [13, 1003, 1, "2026-10-07", "Follow-Up", 0, null],
  [14, 1004, 4, "2026-10-13", "Follow-Up", 50, null],
  [15, 1002, 2, "2026-10-20", "Consultation", 40, null],
  [16, 1006, 1, "2026-10-20", "Annual Physical", 30, null],
];

/** Appointments: AppointmentID, PatientID, ProviderID, AppointmentDate, VisitType, Copay, BilledDate. */
export const appointments = (): AccTable =>
  table(
    "Appointments",
    [
      fld.auto("AppointmentID"),
      fld.num("PatientID", { required: true, indexed: "Yes (Duplicates OK)" }),
      fld.num("ProviderID", { indexed: "Yes (Duplicates OK)" }),
      fld.date("AppointmentDate", { required: true }),
      fld.text("VisitType", 30),
      fld.cur("Copay"),
      fld.date("BilledDate"),
    ],
    APPT_ROWS,
  );

/** The usual relationships: Patients and Providers to Appointments, integrity enforced. */
export const apptRelationships = () => [
  { table: "Patients", field: "PatientID", relatedTable: "Appointments", relatedField: "PatientID", enforce: true, cascadeUpdate: false, cascadeDelete: false, join: 1 as const },
  { table: "Providers", field: "ProviderID", relatedTable: "Appointments", relatedField: "ProviderID", enforce: true, cascadeUpdate: false, cascadeDelete: false, join: 1 as const },
];

const SUPPLY_ROWS: (string | number)[][] = [
  // ItemID, ItemName, Category, Quantity, UnitCost, ReorderLevel, Vendor, OrderDate
  [1, "Gloves, Nitrile Medium", "Medical", 12, 8.95, 20, "Brightline Medical", "2026-08-14"],
  [2, "Gloves, Nitrile Large", "Medical", 25, 8.95, 20, "Brightline Medical", "2026-09-02"],
  [3, "Gauze Pads 4x4", "Medical", 40, 6.5, 30, "Brightline Medical", "2026-09-18"],
  [4, "Alcohol Prep Pads", "Medical", 18, 4.25, 25, "Brightline Medical", "2026-07-22"],
  [5, "Exam Table Paper", "Medical", 9, 22.4, 10, "Clinic Source", "2026-06-30"],
  [6, "Tongue Depressors", "Medical", 30, 3.1, 15, "Clinic Source", "2025-11-12"],
  [7, "Copy Paper (Case)", "Office", 6, 41.99, 4, "Metro Office Supply", "2026-09-25"],
  [8, "Printer Toner", "Office", 2, 89.5, 3, "Metro Office Supply", "2026-05-08"],
  [9, "Appointment Cards", "Office", 15, 12, 5, "Metro Office Supply", "2025-12-03"],
  [10, "File Folders (Box)", "Office", 7, 14.75, 5, "Metro Office Supply", "2026-03-19"],
  [11, "Disinfectant Wipes", "Cleaning", 10, 7.8, 12, "CleanPro", "2026-09-09"],
  [12, "Hand Sanitizer", "Cleaning", 22, 5.6, 10, "CleanPro", "2026-08-01"],
  [13, "Paper Towels (Case)", "Cleaning", 3, 28, 4, "CleanPro", "2025-10-15"],
  [14, "Specimen Cups", "Lab", 50, 0.85, 40, "Brightline Medical", "2026-04-11"],
];

/** Supplies: ItemID, ItemName, Category, Quantity, UnitCost, ReorderLevel, Vendor, OrderDate. */
export const supplies = (): AccTable =>
  table(
    "Supplies",
    [
      fld.auto("ItemID"),
      fld.text("ItemName", 60, { required: true }),
      fld.text("Category", 20, { defaultValue: '"Medical"' }),
      fld.num("Quantity", { required: true, validationRule: ">=0", validationText: "Quantity cannot be negative." }),
      fld.cur("UnitCost"),
      fld.num("ReorderLevel"),
      fld.text("Vendor", 50),
      fld.date("OrderDate"),
    ],
    SUPPLY_ROWS,
  );

/** Providers with prefixed names, for queries that also show patient names: ProviderID, ProviderLastName, ProviderFirstName, Specialty. */
export const providersP = (): AccTable =>
  table(
    "Providers",
    [fld.auto("ProviderID"), fld.text("ProviderLastName", 50, { required: true }), fld.text("ProviderFirstName", 50), fld.text("Specialty", 50)],
    [
      [1, "Walsh", "Karen", "Family Medicine"],
      [2, "Rivera", "Daniel", "Internal Medicine"],
      [3, "Okafor", "Emeka", "Pediatrics"],
      [4, "Chen", "Lisa", "Cardiology"],
    ],
  );

const EMAIL = (first: string, last: string) => `${first[0].toLowerCase()}${last.toLowerCase()}@example.com`;

/**
 * Patients as the registration lessons name them: PatientID, PatientFirstName,
 * PatientLastName, DateOfBirth, PhoneNumber, Email, InsurancePlan, PrimaryProviderID.
 */
export const patientsReg = (): AccTable =>
  table(
    "Patients",
    [
      fld.auto("PatientID"),
      fld.text("PatientFirstName", 50, { required: true }),
      fld.text("PatientLastName", 50, { required: true }),
      fld.date("DateOfBirth", { required: true }),
      fld.text("PhoneNumber", 14),
      fld.text("Email", 80),
      fld.text("InsurancePlan", 50),
      fld.num("PrimaryProviderID"),
    ],
    PATIENT_ROWS.map((r, i) => [r[0], r[2], r[1], r[3], r[4], EMAIL(String(r[2]), String(r[1])), r[6], (i % 4) + 1]),
  );
