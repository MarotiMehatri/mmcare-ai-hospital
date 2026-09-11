export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const isDateInRange = (today, startDate, endDate) => {
  return today >= startDate && today <= endDate;
};

export const sortByTime = (items = []) => {
  return [...items].sort((a, b) => a.time.localeCompare(b.time));
};

export const calculateAdherence = (logs = []) => {
  const total = logs.length;
  const taken = logs.filter((item) => item.action === "taken").length;
  const skipped = logs.filter((item) => item.action === "skipped").length;
  const missed = logs.filter((item) => item.action === "missed").length;

  return {
    total,
    taken,
    skipped,
    missed,
    adherencePercent: total ? Math.round((taken / total) * 100) : 0,
  };
};

export const getNextDose = (schedule = []) => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;

  return schedule.find((item) => item.time >= currentTime) || null;
};
