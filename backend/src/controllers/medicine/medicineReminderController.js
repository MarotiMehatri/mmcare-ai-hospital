import * as medicineService from "../../services/medicine/medicineReminderService.js";
import {
  parseMedicineTextWithGemini,
  generateAdherenceSummaryWithGemini,
} from "../../services/geminiService.js";

const ok = (res, message, data = {}, status = 200) =>
  res.status(status).json({
    success: true,
    message,
    ...data,
  });

const fail = (res, message, status = 400) =>
  res.status(status).json({
    success: false,
    message,
  });

export const getPatientReminders = async (req, res, next) => {
  try {
    const reminders = await medicineService.getPatientReminders(
      req.params.patientId,
    );
    return ok(res, "Patient reminders fetched", { reminders });
  } catch (error) {
    next(error);
  }
};

export const getReminderById = async (req, res, next) => {
  try {
    const reminder = await medicineService.getReminderById(req.params.id);

    if (!reminder) return fail(res, "Reminder not found", 404);

    return ok(res, "Reminder fetched", { reminder });
  } catch (error) {
    next(error);
  }
};

export const createReminder = async (req, res, next) => {
  try {
    const {
      patientId,
      medicineName,
      dosage,
      frequency,
      times,
      startDate,
      endDate,
    } = req.body;

    if (
      !patientId ||
      !medicineName ||
      !dosage ||
      !frequency ||
      !times?.length ||
      !startDate ||
      !endDate
    ) {
      return fail(
        res,
        "patientId, medicineName, dosage, frequency, times, startDate, endDate are required",
        400,
      );
    }

    const reminder = await medicineService.createReminder(req.body);
    return ok(res, "Reminder created successfully", { reminder }, 201);
  } catch (error) {
    next(error);
  }
};

export const updateReminder = async (req, res, next) => {
  try {
    const reminder = await medicineService.updateReminder(
      req.params.id,
      req.body,
    );

    if (!reminder) return fail(res, "Reminder not found", 404);

    return ok(res, "Reminder updated successfully", { reminder });
  } catch (error) {
    next(error);
  }
};

export const deleteReminder = async (req, res, next) => {
  try {
    const deleted = await medicineService.deleteReminder(req.params.id);

    if (!deleted) return fail(res, "Reminder not found", 404);

    return ok(res, "Reminder deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const logReminderAction = async (req, res, next) => {
  try {
    const { patientId, time, action } = req.body;

    if (!patientId || !time || !action) {
      return fail(res, "patientId, time, action are required", 400);
    }

    if (!["taken", "skipped", "missed"].includes(action)) {
      return fail(res, "action must be taken, skipped, or missed", 400);
    }

    const log = await medicineService.logReminderAction(
      req.params.id,
      req.body,
    );
    return ok(res, "Reminder action saved", { log }, 201);
  } catch (error) {
    next(error);
  }
};

export const getReminderLogs = async (req, res, next) => {
  try {
    const logs = await medicineService.getReminderLogs(req.params.id);
    return ok(res, "Reminder logs fetched", { logs });
  } catch (error) {
    next(error);
  }
};

export const getTodaySchedule = async (req, res, next) => {
  try {
    const schedule = await medicineService.getTodaySchedule(
      req.params.patientId,
    );
    return ok(res, "Today schedule fetched", { schedule });
  } catch (error) {
    next(error);
  }
};

export const getAdherenceStats = async (req, res, next) => {
  try {
    const stats = await medicineService.getPatientAdherence(
      req.params.patientId,
    );
    return ok(res, "Adherence stats fetched", { stats });
  } catch (error) {
    next(error);
  }
};

export const getRefillAlerts = async (req, res, next) => {
  try {
    const refillAlerts = await medicineService.getPatientRefillAlerts(
      req.params.patientId,
    );
    return ok(res, "Refill alerts fetched", { refillAlerts });
  } catch (error) {
    next(error);
  }
};

export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await medicineService.getDashboardSummary(
      req.params.patientId,
    );
    return ok(res, "Dashboard summary fetched", { summary });
  } catch (error) {
    next(error);
  }
};

export const aiParseMedicineText = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return fail(res, "Medicine text is required", 400);
    }

    const parsed = await parseMedicineTextWithGemini(text);
    return ok(res, "Medicine text parsed successfully", { parsed });
  } catch (error) {
    next(error);
  }
};

export const aiAdherenceSummary = async (req, res, next) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return fail(res, "patientId is required", 400);
    }

    const stats = await medicineService.getPatientAdherence(patientId);

    const summary = await generateAdherenceSummaryWithGemini({
      patientId,
      ...stats,
    });

    return ok(res, "AI adherence summary generated", {
      stats,
      summary,
    });
  } catch (error) {
    next(error);
  }
};
