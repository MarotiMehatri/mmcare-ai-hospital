import express from "express";

const router = express.Router();

// Temporary in-memory storage
let reminders = [];
let logs = [];

// Get all reminders for patient
router.get("/patient/:patientId", (req, res) => {
  const { patientId } = req.params;

  const patientReminders = reminders.filter(
    (item) => String(item.patientId) === String(patientId),
  );

  res.status(200).json({
    success: true,
    reminders: patientReminders,
  });
});

// Today schedule
router.get("/patient/:patientId/today", (req, res) => {
  const { patientId } = req.params;

  const today = new Date().toISOString().split("T")[0];

  const schedule = reminders
    .filter(
      (item) =>
        String(item.patientId) === String(patientId) &&
        item.status === "active" &&
        item.startDate <= today &&
        item.endDate >= today,
    )
    .flatMap((item) =>
      (item.times || []).map((time) => ({
        reminderId: item.id,
        medicineName: item.medicineName,
        dosage: item.dosage,
        mealTiming: item.mealTiming,
        time,
        instructions: item.instructions,
        refillCount: item.refillCount,
      })),
    );

  res.status(200).json({
    success: true,
    schedule,
  });
});

// Adherence stats
router.get("/patient/:patientId/adherence", (req, res) => {
  const { patientId } = req.params;

  const patientLogs = logs.filter(
    (item) => String(item.patientId) === String(patientId),
  );

  const total = patientLogs.length;
  const taken = patientLogs.filter((item) => item.action === "taken").length;
  const skipped = patientLogs.filter(
    (item) => item.action === "skipped",
  ).length;
  const missed = patientLogs.filter((item) => item.action === "missed").length;

  res.status(200).json({
    success: true,
    stats: {
      total,
      taken,
      skipped,
      missed,
      adherencePercent: total ? Math.round((taken / total) * 100) : 0,
    },
  });
});

// Refill alerts
router.get("/patient/:patientId/refill-alerts", (req, res) => {
  const { patientId } = req.params;

  const refillAlerts = reminders.filter(
    (item) =>
      String(item.patientId) === String(patientId) &&
      item.status === "active" &&
      Number(item.refillCount || 0) <= Number(item.lowStockThreshold || 3),
  );

  res.status(200).json({
    success: true,
    refillAlerts,
  });
});

// Dashboard summary
router.get("/patient/:patientId/dashboard-summary", (req, res) => {
  const { patientId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  const patientReminders = reminders.filter(
    (item) => String(item.patientId) === String(patientId),
  );

  const todaySchedule = patientReminders
    .filter(
      (item) =>
        item.status === "active" &&
        item.startDate <= today &&
        item.endDate >= today,
    )
    .flatMap((item) =>
      (item.times || []).map((time) => ({
        reminderId: item.id,
        medicineName: item.medicineName,
        time,
      })),
    )
    .sort((a, b) => a.time.localeCompare(b.time));

  const patientLogs = logs.filter(
    (item) => String(item.patientId) === String(patientId),
  );

  const missedDoses = patientLogs.filter(
    (item) => item.action === "missed",
  ).length;

  const refillDue = patientReminders.filter(
    (item) =>
      item.status === "active" &&
      Number(item.refillCount || 0) <= Number(item.lowStockThreshold || 3),
  ).length;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;

  const nextDose =
    todaySchedule.find((item) => item.time >= currentTime) || null;

  res.status(200).json({
    success: true,
    summary: {
      totalMedicinesToday: todaySchedule.length,
      nextDose,
      missedDoses,
      refillDue,
    },
  });
});

// Create reminder
router.post("/", (req, res) => {
  const newReminder = {
    id: Date.now(),
    patientId: req.body.patientId,
    medicineName: req.body.medicineName,
    dosage: req.body.dosage,
    frequency: req.body.frequency,
    times: req.body.times || [],
    mealTiming: req.body.mealTiming || "After Food",
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    instructions: req.body.instructions || "",
    prescribedBy: req.body.prescribedBy || "",
    refillCount: Number(req.body.refillCount || 0),
    lowStockThreshold: Number(req.body.lowStockThreshold || 3),
    status: req.body.status || "active",
    createdAt: new Date().toISOString(),
  };

  reminders.push(newReminder);

  res.status(201).json({
    success: true,
    message: "Reminder created successfully",
    reminder: newReminder,
  });
});

// Update reminder
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const index = reminders.findIndex((item) => String(item.id) === String(id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Reminder not found",
    });
  }

  reminders[index] = {
    ...reminders[index],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    reminder: reminders[index],
  });
});

// Delete reminder
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  reminders = reminders.filter((item) => String(item.id) !== String(id));

  res.status(200).json({
    success: true,
    message: "Reminder deleted successfully",
  });
});

// Log action
router.post("/:id/log", (req, res) => {
  const newLog = {
    id: Date.now(),
    reminderId: Number(req.params.id),
    patientId: req.body.patientId,
    time: req.body.time,
    action: req.body.action,
    date: new Date().toISOString().split("T")[0],
    notes: req.body.notes || "",
  };

  logs.push(newLog);

  res.status(201).json({
    success: true,
    log: newLog,
  });
});

export default router;
