import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export const getDoctorPayments = (req, res) => {
  try {
    const db = readDB();

    res.status(200).json({
      success: true,
      data: db.doctorPayments || [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get payments",
      error: error.message,
    });
  }
};

export const createDoctorPayment = (req, res) => {
  try {
    const db = readDB();

    if (!Array.isArray(db.doctorPayments)) {
      db.doctorPayments = [];
    }

    const newPayment = {
      ...req.body,
      id: db.doctorPayments.length
        ? Number(db.doctorPayments[db.doctorPayments.length - 1].id) + 1
        : 1,
      createdAt: req.body.createdAt || new Date().toISOString(),
    };

    db.doctorPayments.push(newPayment);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: "Doctor payment created successfully",
      data: newPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Doctor payment create failed",
      error: error.message,
    });
  }
};

export const updateDoctorPayment = (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();

    const index = db.doctorPayments.findIndex(
      (item) => String(item.id) === String(id),
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Doctor payment not found",
      });
    }

    db.doctorPayments[index] = {
      ...db.doctorPayments[index],
      ...req.body,
      id: db.doctorPayments[index].id,
    };

    writeDB(db);

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: db.doctorPayments[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment update failed",
      error: error.message,
    });
  }
};
