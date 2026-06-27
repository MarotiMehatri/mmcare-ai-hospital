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

export const getAppointments = async (req, res) => {
  try {
    const db = await readDB();
    let appointments = db.appointments || [];

    const { patientId, doctorId, appointmentDate, appointmentTime } = req.query;

    if (patientId) {
      appointments = appointments.filter(
        (a) => String(a.patientId) === String(patientId),
      );
    }

    if (doctorId) {
      appointments = appointments.filter(
        (a) => String(a.doctorId) === String(doctorId),
      );
    }

    if (appointmentDate) {
      appointments = appointments.filter(
        (a) => a.appointmentDate === appointmentDate,
      );
    }

    if (appointmentTime) {
      appointments = appointments.filter(
        (a) => a.appointmentTime === appointmentTime,
      );
    }

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const db = await readDB();

    if (!db.appointments) {
      db.appointments = [];
    }

    const newAppointment = {
      id: Date.now().toString(),
      ...req.body,
    };

    db.appointments.push(newAppointment);
    await writeDB(db);

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const db = await readDB();

    const { id } = req.params;

    const appointmentIndex = db.appointments.findIndex(
      (a) => String(a.id) === String(id),
    );

    if (appointmentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    db.appointments[appointmentIndex] = {
      ...db.appointments[appointmentIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    await writeDB(db);

    res.json({
      success: true,
      message: "Appointment updated successfully",
      data: db.appointments[appointmentIndex],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};
