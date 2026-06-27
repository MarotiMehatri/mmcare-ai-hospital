export const getTodayPrescriptions = (prescriptions = []) => {
  const today = new Date().toDateString();
  return prescriptions.filter(
    (item) => new Date(item.createdAt).toDateString() === today,
  );
};

export const getPrescriptionDashboardStats = (prescriptions = []) => {
  const todayList = getTodayPrescriptions(prescriptions);

  return {
    totalToday: todayList.length,
    pending: todayList.filter((item) => item.status === "pending").length,
    completed: todayList.filter((item) => item.status === "completed").length,
    sent: todayList.filter((item) => item.status === "sent").length,
    latestPrescription: todayList[0] || prescriptions[0] || null,
  };
};

export const generatePrescriptionId = () => {
  return `RX_${Math.floor(1000 + Math.random() * 9000)}`;
};
