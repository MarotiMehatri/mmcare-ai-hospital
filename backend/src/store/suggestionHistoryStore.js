const suggestionHistory = [];

export const addSuggestionRecord = (record) => {
  suggestionHistory.unshift(record);
  return record;
};

export const getSuggestionHistoryByPatientId = (patientId) => {
  return suggestionHistory.filter(
    (item) => String(item.patientId) === String(patientId),
  );
};

export const getLatestSuggestionByPatientId = (patientId) => {
  return suggestionHistory.find(
    (item) => String(item.patientId) === String(patientId),
  );
};
