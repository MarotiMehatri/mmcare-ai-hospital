export const parseBloodPressure = (bp = "0/0") => {
  const [systolic, diastolic] = bp.split("/").map((item) => Number(item) || 0);
  return { systolic, diastolic };
};

export const formatVitalsForCharts = (vitalsHistory = []) => {
  return vitalsHistory.map((item) => {
    const { systolic, diastolic } = parseBloodPressure(item.bloodPressure);

    return {
      ...item,
      bpTop: systolic,
      bpBottom: diastolic,
    };
  });
};

export const getLatestVitals = (vitalsHistory = []) => {
  if (!vitalsHistory.length) return null;
  return vitalsHistory[vitalsHistory.length - 1];
};

export const getTrendDirection = (firstValue, lastValue) => {
  if (lastValue > firstValue) return "up";
  if (lastValue < firstValue) return "down";
  return "stable";
};
