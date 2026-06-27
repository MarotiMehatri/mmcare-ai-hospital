import { readJsonFile, writeJsonFile } from "../../utils/fileDb.js";
import {
  generateId,
  getTodayDate,
  isDateInRange,
  sortByTime,
  calculateAdherence,
  getNextDose,
} from "../../utils/reminderHelpers.js";

const REMINDERS_FILE = "medicineReminders.json";
const LOGS_FILE = "medicineLogs.json";

export const getAllReminders = async () => {
  return await readJsonFile(REMINDERS_FILE, []);
};

export const saveAllReminders = async (reminders) => {
  await writeJsonFile(REMINDERS_FILE, reminders);
};

export const getAllLogs = async () => {
  return await readJsonFile(LOGS_FILE, []);
};

export const saveAllLogs = async (logs) => {
  await writeJsonFile(LOGS_FILE, logs);
};

export const getPatientReminders = async (patientId) => {
  const reminders = await getAllReminders();
  return reminders.filter(
    (item) => String(item.patientId) === String(patientId),
  );
};

export const getReminderById = async (id) => {
  const reminders = await getAllReminders();
  return reminders.find((item) => String(item.id) === String(id));
};

export const createReminder = async (payload) => {
  const reminders = await getAllReminders();

  const newReminder = {
    id: generateId(),
    patientId: payload.patientId,
    medicineName: payload.medicineName,
    dosage: payload.dosage,
    frequency: payload.frequency,
    times: payload.times || [],
    mealTiming: payload.mealTiming || "After Food",
    startDate: payload.startDate,
    endDate: payload.endDate,
    instructions: payload.instructions || "",
    prescribedBy: payload.prescribedBy || "",
    refillCount: Number(payload.refillCount || 0),
    lowStockThreshold: Number(payload.lowStockThreshold || 3),
    status: payload.status || "active",
    createdAt: new Date().toISOString(),
  };

  reminders.push(newReminder);
  await saveAllReminders(reminders);

  return newReminder;
};

export const updateReminder = async (id, payload) => {
  const reminders = await getAllReminders();
  const index = reminders.findIndex((item) => String(item.id) === String(id));

  if (index === -1) return null;

  reminders[index] = {
    ...reminders[index],
    ...payload,
    id: reminders[index].id,
    updatedAt: new Date().toISOString(),
  };

  await saveAllReminders(reminders);
  return reminders[index];
};

export const deleteReminder = async (id) => {
  const reminders = await getAllReminders();
  const filtered = reminders.filter((item) => String(item.id) !== String(id));

  if (filtered.length === reminders.length) return false;

  await saveAllReminders(filtered);
  return true;
};

export const logReminderAction = async (reminderId, payload) => {
  const logs = await getAllLogs();

  const log = {
    id: generateId(),
    reminderId: Number(reminderId),
    patientId: payload.patientId,
    date: payload.date || getTodayDate(),
    time: payload.time,
    action: payload.action,
    notes: payload.notes || "",
    loggedAt: new Date().toISOString(),
  };

  logs.push(log);
  await saveAllLogs(logs);

  return log;
};

export const getReminderLogs = async (reminderId) => {
  const logs = await getAllLogs();
  return logs.filter((item) => String(item.reminderId) === String(reminderId));
};

export const getTodaySchedule = async (patientId) => {
  const reminders = await getPatientReminders(patientId);
  const today = getTodayDate();

  const schedule = reminders
    .filter(
      (item) =>
        item.status === "active" &&
        isDateInRange(today, item.startDate, item.endDate),
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

  return sortByTime(schedule);
};

export const getPatientAdherence = async (patientId) => {
  const logs = await getAllLogs();
  const patientLogs = logs.filter(
    (item) => String(item.patientId) === String(patientId),
  );

  return calculateAdherence(patientLogs);
};

export const getPatientRefillAlerts = async (patientId) => {
  const reminders = await getPatientReminders(patientId);

  return reminders.filter(
    (item) =>
      item.status === "active" &&
      Number(item.refillCount) <= Number(item.lowStockThreshold),
  );
};

export const getDashboardSummary = async (patientId) => {
  const schedule = await getTodaySchedule(patientId);
  const adherence = await getPatientAdherence(patientId);
  const refillAlerts = await getPatientRefillAlerts(patientId);

  return {
    totalMedicinesToday: schedule.length,
    nextDose: getNextDose(schedule),
    missedDoses: adherence.missed,
    refillDue: refillAlerts.length,
  };
};
