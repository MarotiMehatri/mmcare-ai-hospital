const triageHistory = [];

export const addTriageRecord = (record) => {
  triageHistory.unshift(record);
  return record;
};

export const getTriageHistoryByPatientId = (patientId) => {
  return triageHistory.filter(
    (item) => String(item.patientId) === String(patientId),
  );
};

export const getAllTriageHistory = () => triageHistory;
