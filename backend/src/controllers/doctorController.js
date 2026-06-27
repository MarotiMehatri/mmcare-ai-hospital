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

/* GET ALL DOCTORS */
export const getDoctors = async (req, res) => {
  try {
    const db = await readDB();
    let doctors = db.doctors || [];

    if (req.query.email) {
      doctors = doctors.filter(
        (d) =>
          d.email?.trim().toLowerCase() ===
          req.query.email.trim().toLowerCase(),
      );
    }

    if (req.query.userId) {
      doctors = doctors.filter(
        (d) => String(d.userId) === String(req.query.userId),
      );
    }

    res.json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

/* GET DOCTOR BY ID */
export const getDoctorById = async (req, res) => {
  try {
    const db = await readDB();

    const doctor = (db.doctors || []).find(
      (d) => String(d.id) === String(req.params.id),
    );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

/* GET DOCTOR BY EMAIL */
export const getDoctorByEmail = async (req, res) => {
  try {
    const db = await readDB();
    const email = req.query.email?.trim().toLowerCase();

    const doctors = (db.doctors || []).filter(
      (d) => d.email?.trim().toLowerCase() === email,
    );

    res.json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
      error: error.message,
    });
  }
};

/* CREATE DOCTOR */
export const createDoctor = async (req, res) => {
  try {
    const db = await readDB();
    const doctors = db.doctors || [];

    const newDoctor = {
      ...req.body,
      id: doctors.length
        ? Math.max(...doctors.map((d) => Number(d.id) || 0)) + 1
        : 1,
      email: req.body.email?.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    db.doctors = [...doctors, newDoctor];
    await writeDB(db);

    res.status(201).json({
      success: true,
      data: newDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

/* UPDATE DOCTOR */
export const updateDoctor = async (req, res) => {
  try {
    const db = await readDB();
    const doctors = db.doctors || [];

    const index = doctors.findIndex(
      (d) => String(d.id) === String(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const updatedDoctor = {
      ...doctors[index],
      ...req.body,
      email: req.body.email
        ? req.body.email.trim().toLowerCase()
        : doctors[index].email,
      updatedAt: new Date().toISOString(),
    };

    db.doctors[index] = updatedDoctor;
    await writeDB(db);

    res.json({
      success: true,
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
      error: error.message,
    });
  }
};

/* DELETE DOCTOR */
export const deleteDoctor = async (req, res) => {
  try {
    const db = await readDB();

    db.doctors = (db.doctors || []).filter(
      (d) => String(d.id) !== String(req.params.id),
    );

    await writeDB(db);

    res.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
};
