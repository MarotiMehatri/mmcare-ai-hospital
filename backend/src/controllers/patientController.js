// import axios from "axios";
// import fs from "fs/promises";
// import path from "path";

// const DB = process.env.JSON_SERVER_URL || "http://localhost:5000";

// /* =========================
//    PATIENT CONTROLLER
// ========================= */

// /* GET ALL PATIENTS */
// // export const getPatients = async (req, res) => {
// //   try {
// //     const response = await axios.get(`${DB}/patients`);

// //     res.json({
// //       success: true,
// //       count: response.data.length,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch patients",
// //     });
// //   }
// // };
// const DB_FILE = path.join(process.cwd(), "db.json");

// export const getPatients = async (req, res) => {
//   try {
//     const db = JSON.parse(await fs.readFile(DB_FILE, "utf-8"));
//     let patients = db.patients || [];

//     if (req.query.userId) {
//       patients = patients.filter(
//         (p) => String(p.userId) === String(req.query.userId)
//       );
//     }

//     res.json({
//       success: true,
//       count: patients.length,
//       data: patients,
//     });
//   } catch (error) {
//     console.error("PATIENT FETCH ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch patients",
//       error: error.message,
//     });
//   }
// };

// /* GET PATIENT BY ID */
// export const getPatientById = async (req, res) => {
//   try {
//     const response = await axios.get(`${DB}/patients/${req.params.id}`);

//     res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(404).json({
//       success: false,
//       message: "Patient not found",
//     });
//   }
// };

// /* GET PATIENT BY EMAIL */
// export const getPatientByEmail = async (req, res) => {
//   try {
//     const email = req.query.email?.trim().toLowerCase();

//     const response = await axios.get(`${DB}/patients?email=${email || ""}`);

//     res.json({
//       success: true,
//       count: response.data.length,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch patient",
//     });
//   }
// };

// /* CREATE PATIENT */
// export const createPatient = async (req, res) => {
//   try {
//     const response = await axios.post(`${DB}/patients`, {
//       ...req.body,
//       email: req.body.email?.trim().toLowerCase(),
//       createdAt: new Date().toISOString(),
//     });

//     res.status(201).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create patient",
//     });
//   }
// };

// /* UPDATE PATIENT */
// export const updatePatient = async (req, res) => {
//   try {
//     const response = await axios.put(
//       `${DB}/patients/${req.params.id}`,
//       req.body,
//     );

//     res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update patient",
//     });
//   }
// };

// /* DELETE PATIENT */
// export const deletePatient = async (req, res) => {
//   try {
//     await axios.delete(`${DB}/patients/${req.params.id}`);

//     res.json({
//       success: true,
//       message: "Patient deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete patient",
//     });
//   }
// };

import fs from "fs/promises";
import path from "path";

const DB_FILE = path.join(process.cwd(), "db.json");

const readDB = async () => {
  const data = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(data);
};

const writeDB = async (db) => {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
};

/* GET ALL / FILTER PATIENTS */
export const getPatients = async (req, res) => {
  try {
    const db = await readDB();
    let patients = db.patients || [];

    if (req.query.userId) {
      patients = patients.filter(
        (p) => String(p.userId) === String(req.query.userId),
      );
    }

    if (req.query.patientID) {
      patients = patients.filter(
        (p) => String(p.patientID) === String(req.query.patientID),
      );
    }

    if (req.query.email) {
      const email = req.query.email.trim().toLowerCase();
      patients = patients.filter(
        (p) => p.email?.trim().toLowerCase() === email,
      );
    }

    res.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
      error: error.message,
    });
  }
};

/* GET PATIENT BY ID */
export const getPatientById = async (req, res) => {
  try {
    const db = await readDB();
    const patient = (db.patients || []).find(
      (p) => String(p.id) === String(req.params.id),
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

/* GET PATIENT BY EMAIL */
export const getPatientByEmail = async (req, res) => {
  try {
    const db = await readDB();
    const email = req.query.email?.trim().toLowerCase();

    const patients = (db.patients || []).filter(
      (p) => p.email?.trim().toLowerCase() === email,
    );

    res.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patient",
      error: error.message,
    });
  }
};

/* CREATE PATIENT */
export const createPatient = async (req, res) => {
  try {
    const db = await readDB();

    const patients = db.patients || [];
    const newPatient = {
      ...req.body,
      id: patients.length
        ? Math.max(...patients.map((p) => Number(p.id) || 0)) + 1
        : 1,
      email: req.body.email?.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    db.patients = [...patients, newPatient];
    await writeDB(db);

    res.status(201).json({
      success: true,
      data: newPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
};

/* UPDATE PATIENT */
export const updatePatient = async (req, res) => {
  try {
    const db = await readDB();
    const patients = db.patients || [];

    const index = patients.findIndex(
      (p) => String(p.id) === String(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const updatedPatient = {
      ...patients[index],
      ...req.body,
      email: req.body.email
        ? req.body.email.trim().toLowerCase()
        : patients[index].email,
      updatedAt: new Date().toISOString(),
    };

    db.patients[index] = updatedPatient;
    await writeDB(db);

    res.json({
      success: true,
      data: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update patient",
      error: error.message,
    });
  }
};

/* DELETE PATIENT */
export const deletePatient = async (req, res) => {
  try {
    const db = await readDB();
    const patients = db.patients || [];

    db.patients = patients.filter(
      (p) => String(p.id) !== String(req.params.id),
    );

    await writeDB(db);

    res.json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete patient",
      error: error.message,
    });
  }
};
