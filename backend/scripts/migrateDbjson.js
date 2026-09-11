
import "dotenv/config";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";

import Doctor from "../src/models/Doctor.model.js";
import Patient from "../src/models/Patient.model.js";
import Appointment from "../src/models/Appointment.model.js";
import Prescription from "../src/models/Prescription.model.js";
import Billing from "../src/models/Billing.model.js";
import Payment from "../src/models/Payment.model.js";
import Report from "../src/models/Report.model.js";
import MedicalRecord from "../src/models/MedicalRecord.model.js";
import Department from "../src/models/Department.model.js";
import Chat from "../src/models/Chat.model.js";
import User from "../src/models/User.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
|--------------------------------------------------------------------------
| db.json location
|--------------------------------------------------------------------------
*/

const dbJsonPath = path.join(__dirname, "../data/db.json");

/*
|--------------------------------------------------------------------------
| Model map
|--------------------------------------------------------------------------
*/

const MODEL_MAP = {
  users: User,
  user: User,

  doctors: Doctor,
  doctor: Doctor,

  patients: Patient,
  patient: Patient,

  appointments: Appointment,
  appointment: Appointment,

  prescriptions: Prescription,
  prescription: Prescription,

  billings: Billing,
  billing: Billing,
  bills: Billing,

  payments: Payment,
  payment: Payment,

  reports: Report,
  report: Report,

  medicalrecords: MedicalRecord,
  medicalRecords: MedicalRecord,
  medical_records: MedicalRecord,
  medicalRecord: MedicalRecord,

  departments: Department,
  department: Department,

  chats: Chat,
  chat: Chat,
};

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function normalizeCollectionName(name) {
  return String(name)
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .toLowerCase();
}

function findModel(collectionName) {
  const normalized = normalizeCollectionName(collectionName);

  const entry = Object.entries(MODEL_MAP).find(
    ([key]) => normalizeCollectionName(key) === normalized,
  );

  return entry ? entry[1] : null;
}

function cleanDocument(document) {
  if (!document || typeof document !== "object") {
    return {};
  }

  const cleaned = { ...document };

  /*
  |--------------------------------------------------------------------------
  | Never migrate MongoDB _id from JSON
  |--------------------------------------------------------------------------
  */

  delete cleaned._id;

  /*
  |--------------------------------------------------------------------------
  | Preserve old JSON id
  |--------------------------------------------------------------------------
  */

  if (
    cleaned.id !== undefined &&
    cleaned.id !== null &&
    cleaned.id !== ""
  ) {
    cleaned.legacyId = String(cleaned.id);
  }

  return cleaned;
}

/*
|--------------------------------------------------------------------------
| Find legacy ID
|--------------------------------------------------------------------------
*/

function getLegacyId(document) {
  if (!document || typeof document !== "object") {
    return null;
  }

  const possibleIds = [
    document.id,
    document.legacyId,
    document.userId,
    document.patientId,
    document.doctorId,
    document.appointmentId,
    document.prescriptionId,
    document.billId,
    document.paymentId,
    document.reportId,
    document.recordId,
    document.departmentId,
    document.chatId,
  ];

  for (const value of possibleIds) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value);
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| Connect MongoDB
|--------------------------------------------------------------------------
*/

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing in your .env file.",
    );
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("✅ MongoDB connected");
}

/*
|--------------------------------------------------------------------------
| Read db.json
|--------------------------------------------------------------------------
*/

async function readDbJson() {
  try {
    const file = await fs.readFile(
      dbJsonPath,
      "utf-8",
    );

    const data = JSON.parse(file);

    if (!data || typeof data !== "object") {
      throw new Error(
        "db.json must contain a JSON object.",
      );
    }

    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        `db.json not found at:\n${dbJsonPath}`,
      );
    }

    if (error instanceof SyntaxError) {
      throw new Error(
        "db.json contains invalid JSON.",
      );
    }

    throw error;
  }
}

/*
|--------------------------------------------------------------------------
| USER MIGRATION
|
| Important:
| We migrate users first because patients need
| MongoDB User._id.
|--------------------------------------------------------------------------
*/

async function migrateUsers(records) {
  console.log("");
  console.log("👤 Migrating users...");

  if (!Array.isArray(records)) {
    console.log("⚠️ users is not an array.");
    return {
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const rawRecord of records) {
    try {
      const document = cleanDocument(rawRecord);

      const legacyId = getLegacyId(rawRecord);

      if (!legacyId) {
        await User.create(document);

        inserted++;

        continue;
      }

      const existing = await User.findOne({
        legacyId: String(legacyId),
      });

      if (existing) {
        /*
        |--------------------------------------------------------------------------
        | Do not overwrite MongoDB _id
        |--------------------------------------------------------------------------
        */

        Object.assign(existing, document);

        existing.legacyId = String(legacyId);

        await existing.save();

        updated++;
      } else {
        await User.create({
          ...document,
          legacyId: String(legacyId),
        });

        inserted++;
      }
    } catch (error) {
      skipped++;

      console.error(
        `❌ User migration error:`,
        error.message,
      );
    }
  }

  console.log(
    `✅ users: ${inserted} inserted, ${updated} updated, ${skipped} skipped`,
  );

  return {
    inserted,
    updated,
    skipped,
  };
}

/*
|--------------------------------------------------------------------------
| BUILD USER LEGACY ID MAP
|
| Example:
|
| JSON user id "5"
|       ↓
| MongoDB user _id
|
|--------------------------------------------------------------------------
*/

async function buildUserMap() {
  console.log("");
  console.log("🔗 Building user ID mapping...");

  const users = await User.find({})
    .select("_id id legacyId userId email")
    .lean();

  const userMap = new Map();

  for (const user of users) {
    const possibleIds = [
      user.legacyId,
      user.id,
      user.userId,
    ];

    for (const value of possibleIds) {
      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        userMap.set(
          String(value),
          user._id,
        );
      }
    }
  }

  console.log(
    `✅ User mappings created: ${userMap.size}`,
  );

  return userMap;
}

/*
|--------------------------------------------------------------------------
| PATIENT MIGRATION
|
| Special handling because:
|
| Patient.userId → MongoDB ObjectId
|--------------------------------------------------------------------------
*/

async function migratePatients(records, userMap) {
  console.log("");
  console.log("🏥 Migrating patients...");

  if (!Array.isArray(records)) {
    console.log("⚠️ patients is not an array.");

    return {
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const rawRecord of records) {
    try {
      const document = cleanDocument(rawRecord);

      const legacyId = getLegacyId(rawRecord);

      /*
      |--------------------------------------------------------------------------
      | Resolve old userId → MongoDB User._id
      |--------------------------------------------------------------------------
      */

      const oldUserId =
        rawRecord.userId !== undefined &&
        rawRecord.userId !== null
          ? String(rawRecord.userId)
          : null;

      if (oldUserId) {
        const mongoUserId = userMap.get(oldUserId);

        if (mongoUserId) {
          document.userId = mongoUserId;

          console.log(
            `🔗 Patient ${legacyId || "unknown"}: userId ${oldUserId} → ${mongoUserId}`,
          );
        } else {
          /*
          |--------------------------------------------------------------------------
          | User does not exist
          |--------------------------------------------------------------------------
          */

          console.warn(
            `⚠️ Patient ${legacyId || "unknown"}: User "${oldUserId}" not found.`,
          );

          /*
          |--------------------------------------------------------------------------
          | Do NOT send invalid "5" into ObjectId field
          |--------------------------------------------------------------------------
          */

          delete document.userId;
        }
      }

      /*
      |--------------------------------------------------------------------------
      | Find existing patient
      |--------------------------------------------------------------------------
      */

      let existing = null;

      if (legacyId) {
        existing = await Patient.findOne({
          legacyId: String(legacyId),
        });
      }

      if (existing) {
        Object.assign(existing, document);

        if (legacyId) {
          existing.legacyId = String(legacyId);
        }

        await existing.save();

        updated++;

        console.log(
          `♻️ Patient updated: ${legacyId}`,
        );
      } else {
        const patient = await Patient.create({
          ...document,
          ...(legacyId
            ? { legacyId: String(legacyId) }
            : {}),
        });

        inserted++;

        console.log(
          `✅ Patient inserted: ${patient.legacyId || patient._id}`,
        );
      }
    } catch (error) {
      skipped++;

      console.error(
        `❌ Patient migration error:`,
        error.message,
      );

      if (rawRecord?.id !== undefined) {
        console.error(
          `   Patient legacy id: ${rawRecord.id}`,
        );
      }
    }
  }

  console.log(
    `✅ patients: ${inserted} inserted, ${updated} updated, ${skipped} skipped`,
  );

  return {
    inserted,
    updated,
    skipped,
  };
}

/*
|--------------------------------------------------------------------------
| GENERIC COLLECTION MIGRATION
|--------------------------------------------------------------------------
*/

async function migrateCollection(
  collectionName,
  records,
) {
  const Model = findModel(collectionName);

  if (!Model) {
    console.log(
      `⚠️ Skipping unknown collection: ${collectionName}`,
    );

    return {
      collection: collectionName,
      inserted: 0,
      updated: 0,
      skipped: Array.isArray(records)
        ? records.length
        : 0,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | Users and patients have special migration logic
  |--------------------------------------------------------------------------
  */

  if (
    normalizeCollectionName(collectionName) ===
    "users"
  ) {
    return {
      collection: collectionName,
      ...(await migrateUsers(records)),
    };
  }

  if (
    normalizeCollectionName(collectionName) ===
    "patients"
  ) {
    /*
    |--------------------------------------------------------------------------
    | Patients are handled separately in migrate()
    |--------------------------------------------------------------------------
    */

    return {
      collection: collectionName,
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  if (!Array.isArray(records)) {
    console.log(
      `⚠️ ${collectionName} is not an array. Skipping.`,
    );

    return {
      collection: collectionName,
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  if (records.length === 0) {
    console.log(
      `ℹ️ ${collectionName}: empty collection`,
    );

    return {
      collection: collectionName,
      inserted: 0,
      updated: 0,
      skipped: 0,
    };
  }

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const rawRecord of records) {
    try {
      const document = cleanDocument(rawRecord);

      const legacyId = getLegacyId(rawRecord);

      /*
      |--------------------------------------------------------------------------
      | No legacy ID
      |--------------------------------------------------------------------------
      */

      if (!legacyId) {
        await Model.create(document);

        inserted++;

        continue;
      }

      /*
      |--------------------------------------------------------------------------
      | Find existing document
      |--------------------------------------------------------------------------
      */

      const existing = await Model.findOne({
        legacyId: String(legacyId),
      });

      if (existing) {
        Object.assign(existing, document);

        existing.legacyId = String(legacyId);

        await existing.save();

        updated++;
      } else {
        await Model.create({
          ...document,
          legacyId: String(legacyId),
        });

        inserted++;
      }
    } catch (error) {
      skipped++;

      console.error(
        `❌ Error migrating ${collectionName} record:`,
        error.message,
      );
    }
  }

  console.log(
    `✅ ${collectionName}: ${inserted} inserted, ${updated} updated, ${skipped} skipped`,
  );

  return {
    collection: collectionName,
    inserted,
    updated,
    skipped,
  };
}

/*
|--------------------------------------------------------------------------
| MAIN MIGRATION
|--------------------------------------------------------------------------
*/

async function migrate() {
  console.log("");
  console.log("========================================");
  console.log(
    "   MMCARE HOSPITAL DB.JSON MIGRATION",
  );
  console.log("========================================");
  console.log("");

  const data = await readDbJson();

  const collectionNames = Object.keys(data);

  console.log(
    `📦 Collections found: ${collectionNames.length}`,
  );

  console.log(
    `📄 Source file: ${dbJsonPath}`,
  );

  console.log("");

  /*
  |--------------------------------------------------------------------------
  | STEP 1
  | Migrate USERS first
  |--------------------------------------------------------------------------
  */

  if (Array.isArray(data.users)) {
    await migrateUsers(data.users);
  } else if (Array.isArray(data.user)) {
    await migrateUsers(data.user);
  } else {
    console.log("⚠️ No users collection found.");
  }

  /*
  |--------------------------------------------------------------------------
  | STEP 2
  | Build User legacy ID → MongoDB ObjectId map
  |--------------------------------------------------------------------------
  */

  const userMap = await buildUserMap();

  /*
  |--------------------------------------------------------------------------
  | STEP 3
  | Migrate patients using userMap
  |--------------------------------------------------------------------------
  */

  if (Array.isArray(data.patients)) {
    await migratePatients(
      data.patients,
      userMap,
    );
  } else if (Array.isArray(data.patient)) {
    await migratePatients(
      data.patient,
      userMap,
    );
  } else {
    console.log(
      "⚠️ No patients collection found.",
    );
  }

  /*
  |--------------------------------------------------------------------------
  | STEP 4
  | Migrate all remaining collections
  |--------------------------------------------------------------------------
  */

  const results = [];

  for (const collectionName of collectionNames) {
    const normalized =
      normalizeCollectionName(collectionName);

    /*
    |--------------------------------------------------------------------------
    | Users already migrated
    |--------------------------------------------------------------------------
    */

    if (
      normalized === "users" ||
      normalized === "user"
    ) {
      continue;
    }

    /*
    |--------------------------------------------------------------------------
    | Patients already migrated
    |--------------------------------------------------------------------------
    */

    if (
      normalized === "patients" ||
      normalized === "patient"
    ) {
      continue;
    }

    const result = await migrateCollection(
      collectionName,
      data[collectionName],
    );

    results.push(result);
  }

  /*
  |--------------------------------------------------------------------------
  | SUMMARY
  |--------------------------------------------------------------------------
  */

  console.log("");
  console.log("========================================");
  console.log(
    "           MIGRATION SUMMARY",
  );
  console.log("========================================");

  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const result of results) {
    totalInserted += result.inserted;
    totalUpdated += result.updated;
    totalSkipped += result.skipped;

    console.log(
      `${result.collection}: inserted=${result.inserted}, updated=${result.updated}, skipped=${result.skipped}`,
    );
  }

  console.log("----------------------------------------");

  console.log(
    `Inserted: ${totalInserted}`,
  );

  console.log(
    `Updated:  ${totalUpdated}`,
  );

  console.log(
    `Skipped:  ${totalSkipped}`,
  );

  console.log("----------------------------------------");

  /*
  |--------------------------------------------------------------------------
  | Verify patients
  |--------------------------------------------------------------------------
  */

  const patientCount =
    await Patient.countDocuments();

  const userCount =
    await User.countDocuments();

  console.log("");
  console.log(
    `👤 MongoDB users count: ${userCount}`,
  );

  console.log(
    `🏥 MongoDB patients count: ${patientCount}`,
  );

  console.log("");

  if (patientCount > 0) {
    console.log(
      "🎉 Patient migration successful!",
    );
  } else {
    console.log(
      "⚠️ No patients found in MongoDB.",
    );
  }

  console.log("");
  console.log(
    "✅ Migration completed.",
  );

  console.log(
    "✅ db.json was NOT deleted.",
  );

  console.log("");
}

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

async function main() {
  try {
    await connectDatabase();

    await migrate();

    await mongoose.connection.close();

    console.log(
      "🔌 MongoDB connection closed.",
    );

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error(
      "❌ Migration failed.",
    );

    console.error(error.message);

    console.error("");

    try {
      await mongoose.connection.close();
    } catch {
      // Ignore connection close errors.
    }

    process.exit(1);
  }
}

main();
